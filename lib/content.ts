/**
 * Markdown content pipeline. Files live in resources/content/ and carry
 * Zod-validated frontmatter. Every medical page is a draft for the doctor
 * until he signs it off (status: draft-for-doctor-review).
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";

const CONTENT_DIR = path.join(process.cwd(), "resources", "content");

const faq = z.object({ q: z.string(), a: z.string() });

const baseFrontmatter = z.object({
  title: z.string().max(60),
  description: z.string().max(155),
  status: z.literal("draft-for-doctor-review").default("draft-for-doctor-review"),
  lastReviewed: z.string().default("[CONFIRM]"),
});

const conditionFrontmatter = baseFrontmatter.extend({
  kind: z.literal("condition"),
  heading: z.string(),
  intro: z.string().min(40).max(400),
  badge: z.string(),
  emergency: z.boolean().default(false),
  faqs: z.array(faq).min(4).max(6),
  related: z.array(z.string()).min(1).max(6),
  relatedPost: z.string().nullable().default(null),
});

const postFrontmatter = baseFrontmatter.extend({
  kind: z.literal("post"),
  heading: z.string(),
  category: z.string(),
  date: z.string(),
  updated: z.string().nullable().default(null),
  readingMinutes: z.number().int().min(1).max(30),
  inBrief: z.array(z.string()).min(2).max(5),
  faqs: z.array(faq).max(6).default([]),
  related: z.array(z.string()).min(1).max(6),
  cover: z.string().nullable().default(null),
});

const legalFrontmatter = baseFrontmatter.extend({
  kind: z.literal("legal"),
  heading: z.string(),
});

export type Faq = z.infer<typeof faq>;
export type ConditionMeta = z.infer<typeof conditionFrontmatter> & { slug: string };
export type ConditionDoc = ConditionMeta & { html: string };
export type PostMeta = z.infer<typeof postFrontmatter> & { slug: string };
export type PostDoc = PostMeta & { html: string };
export type LegalMeta = z.infer<typeof legalFrontmatter> & { slug: string };
export type LegalDoc = LegalMeta & { html: string };

const md = unified().use(remarkParse).use(remarkRehype).use(rehypeStringify);

function readDir(sub: string): { slug: string; raw: string }[] {
  const dir = path.join(CONTENT_DIR, sub);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => ({ slug: f.replace(/\.md$/, ""), raw: fs.readFileSync(path.join(dir, f), "utf8") }));
}

function split(raw: string) {
  const { data, content } = matter(raw);
  return { data, content };
}

function meta<T>(file: { slug: string; raw: string }, schema: z.ZodType<T>): T & { slug: string } {
  return { ...schema.parse(split(file.raw).data), slug: file.slug };
}

async function doc<T>(
  file: { slug: string; raw: string } | undefined,
  schema: z.ZodType<T>,
): Promise<(T & { slug: string; html: string }) | null> {
  if (!file) return null;
  const { data, content } = split(file.raw);
  const html = String(await md.process(content)).replace(
    /\[CONFIRM[^\]]*\]/g,
    (m) => `<span class="confirm">${m}</span>`,
  );
  return { ...schema.parse(data), slug: file.slug, html };
}

const files = {
  conditions: () => readDir("conditions"),
  posts: () => readDir("posts"),
  legal: () => readDir("legal"),
};

export const conditionMeta = (): ConditionMeta[] =>
  files.conditions().map((f) => meta(f, conditionFrontmatter));
export const conditionDoc = (slug: string): Promise<ConditionDoc | null> =>
  doc(files.conditions().find((f) => f.slug === slug), conditionFrontmatter);

export const postMeta = (): PostMeta[] => files.posts().map((f) => meta(f, postFrontmatter));
export const postDoc = (slug: string): Promise<PostDoc | null> =>
  doc(files.posts().find((f) => f.slug === slug), postFrontmatter);

export const legalMeta = (): LegalMeta[] => files.legal().map((f) => meta(f, legalFrontmatter));
export const legalDoc = (slug: string): Promise<LegalDoc | null> =>
  doc(files.legal().find((f) => f.slug === slug), legalFrontmatter);

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

/** Adds id attributes to h2s and returns them for the TOC. */
export function withHeadingIds(html: string): {
  html: string;
  headings: { id: string; text: string }[];
} {
  const headings: { id: string; text: string }[] = [];
  const out = html.replace(/<h2>(.*?)<\/h2>/g, (_m, inner: string) => {
    const id = slugify(inner);
    headings.push({ id, text: inner.replace(/<[^>]+>/g, "") });
    return `<h2 id="${id}">${inner}</h2>`;
  });
  return { html: out, headings };
}
