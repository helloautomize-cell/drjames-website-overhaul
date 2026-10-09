/**
 * Markdown content pipeline. Files live in resources/content/ and carry
 * Zod-validated frontmatter. Every medical page is a draft for the doctor
 * until he signs it off (status: draft-for-doctor-review).
 *
 * Posts additionally support :::-directives (see _template.md):
 *   :::margin    -> a margin note by Dr. James
 *   :::emergency -> the alert callout (red flags)
 *   :::tip       -> a "Good to know" box
 * Unknown directives fail the build with the file and directive named.
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";
import { unified, type Plugin } from "unified";
import remarkParse from "remark-parse";
import remarkDirective from "remark-directive";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";

const CONTENT_DIR = path.join(process.cwd(), "resources", "content");

/** True on Vercel production builds; drafts and [CONFIRM] chips hide there. */
export const IS_PROD = process.env.VERCEL_ENV === "production";

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

/** The five condition groups a guide can belong to (see lib/conditions.ts). */
export const TOPIC_IDS = [
  "diabetes-metabolism",
  "heart-blood-pressure",
  "lungs-sleep-infections",
  "kidney-liver-gut",
  "whole-person",
] as const;
export type TopicId = (typeof TOPIC_IDS)[number];

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "expected ISO date YYYY-MM-DD");

const postFrontmatter = baseFrontmatter
  .extend({
    kind: z.literal("post"),
    heading: z.string(),
    /** Lede shown under the H1 and on every card. */
    standfirst: z.string().min(60).max(240),
    description: z.string().max(155).optional(),
    topic: z.enum(TOPIC_IDS),
    /** "YYYY-MM-DD" or the literal "draft" (visible on previews only). */
    date: z.union([isoDate, z.literal("draft")]),
    updated: isoDate.nullable().default(null),
    featured: z.boolean().default(false),
    image: z
      .string()
      .regex(/^\/images\/library\//, "covers live under /public/images/library/")
      .nullable()
      .default(null),
    imageAlt: z.string().nullable().default(null),
    imageCaption: z.string().nullable().default(null),
    imageCredit: z.string().nullable().default(null),
    imageFocus: z.string().default("50% 40%"),
    quickAnswer: z.string().min(120).max(420),
    keyTakeaways: z.array(z.string()).min(3).max(7),
    questionsToAsk: z.array(z.string()).max(8).default([]),
    faqs: z.array(faq).max(6).default([]),
    sources: z.array(z.object({ name: z.string(), url: z.string().url() })).max(12).default([]),
    /** Condition slugs; the first is the guide's main condition. */
    related: z.array(z.string()).min(1).max(6),
    localSection: z.boolean().default(true),
  })
  .superRefine((v, ctx) => {
    if (v.image && !v.imageAlt) {
      ctx.addIssue({ code: "custom", message: "imageAlt is required when image is set" });
    }
  });

const legalFrontmatter = baseFrontmatter.extend({
  kind: z.literal("legal"),
  heading: z.string(),
});

export type Faq = z.infer<typeof faq>;
export type ConditionMeta = z.infer<typeof conditionFrontmatter> & { slug: string };
export type ConditionDoc = ConditionMeta & { html: string };
export type PostMeta = z.infer<typeof postFrontmatter> & {
  slug: string;
  /** Computed from the body at 220 words per minute (min 2). */
  readingMinutes: number;
};
export type PostDoc = PostMeta & { html: string };
export type LegalMeta = z.infer<typeof legalFrontmatter> & { slug: string };
export type LegalDoc = LegalMeta & { html: string };

/* ---------- :::-directives ---------- */

type MdNode = {
  type: string;
  name?: string;
  children?: MdNode[];
  data?: Record<string, unknown>;
};

const ALERT_SVG =
  '<svg class="gd-em-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
  'stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
  '<path d="M12 3l9 16H3L12 3z"/><path d="M12 10v4M12 17h.01"/></svg>';

const DIRECTIVES: Record<
  string,
  { tag: string; className: string; props?: Record<string, string>; prepend?: string }
> = {
  margin: {
    tag: "aside",
    className: "gd-note",
    props: { role: "note", "aria-label": "Note from Dr. James" },
  },
  emergency: {
    tag: "div",
    className: "callout gd-em",
    props: { role: "note", "aria-label": "Emergency" },
    prepend: ALERT_SVG,
  },
  tip: {
    tag: "aside",
    className: "gd-tip",
    props: { role: "note", "aria-label": "Good to know" },
  },
};

/** Turns container directives into hast wrappers; unknown names fail the build. */
function directiveBlocks(file: string): Plugin {
  const walk = (node: MdNode) => {
    if (node.type === "containerDirective") {
      const conf = DIRECTIVES[node.name ?? ""];
      if (!conf) {
        throw new Error(
          `resources/content/posts/${file}.md: unknown markdown directive "::${node.name}"`,
        );
      }
      node.data = {
        hName: conf.tag,
        hProperties: { className: [conf.className], ...conf.props },
      };
      if (conf.prepend) {
        node.children?.unshift({ type: "html", value: conf.prepend } as MdNode);
      }
    }
    node.children?.forEach(walk);
  };
  return () => (tree) => walk(tree as MdNode);
}

const pipeline = (file: string) =>
  unified()
    .use(remarkParse)
    .use(remarkDirective)
    .use(directiveBlocks(file))
    .use(remarkRehype)
    .use(rehypeStringify);

function readDir(sub: string): { slug: string; raw: string }[] {
  const dir = path.join(CONTENT_DIR, sub);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md") && !f.startsWith("_"))
    .map((f) => ({ slug: f.replace(/\.md$/, ""), raw: fs.readFileSync(path.join(dir, f), "utf8") }));
}

function split(raw: string) {
  const { data, content } = matter(raw);
  return { data, content };
}

/** ~220 wpm, rounded up, minimum 2 — replaces the old front-matter field. */
function readingMinutes(markdown: string): number {
  const words = markdown.split(/\s+/).filter(Boolean).length;
  return Math.max(2, Math.ceil(words / 220));
}

/** Zod errors must name the file and field so the build failure is actionable. */
function parseFrontmatter<T>(file: { slug: string; raw: string }, schema: z.ZodType<T>): T {
  try {
    return schema.parse(split(file.raw).data);
  } catch (e) {
    if (e instanceof z.ZodError) {
      const lines = e.issues.map(
        (i) => `  ${file.slug}.md: ${i.path.join(".") || "(root)"} — ${i.message}`,
      );
      throw new Error(`Invalid front matter:\n${lines.join("\n")}`);
    }
    throw e;
  }
}

function meta<T>(file: { slug: string; raw: string }, schema: z.ZodType<T>): T & { slug: string } {
  return { ...parseFrontmatter(file, schema), slug: file.slug };
}

async function doc<T>(
  file: { slug: string; raw: string } | undefined,
  schema: z.ZodType<T>,
): Promise<(T & { slug: string; html: string }) | null> {
  if (!file) return null;
  const { data, content } = split(file.raw);
  const html = String(await pipeline(file.slug).process(content)).replace(
    /\[CONFIRM[^\]]*\]/g,
    (m) => (process.env.VERCEL_ENV === "production" ? "" : `<span class="confirm">${m}</span>`),
  );
  return { ...parseFrontmatter(file, schema), slug: file.slug, html };
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

export const postMeta = (): PostMeta[] =>
  files.posts().map((f) => {
    const { content } = split(f.raw);
    return {
      ...parseFrontmatter(f, postFrontmatter),
      slug: f.slug,
      readingMinutes: readingMinutes(content),
    };
  });
export const postDoc = async (slug: string): Promise<PostDoc | null> => {
  const file = files.posts().find((f) => f.slug === slug);
  const d = await doc(file, postFrontmatter);
  return d ? { ...d, readingMinutes: readingMinutes(split(file!.raw).content) } : null;
};

/** A guide with date "draft" or a future date is preview-only. */
export function isDraftPost(p: { date: string }): boolean {
  if (p.date === "draft") return true;
  return p.date > new Date().toISOString().slice(0, 10);
}

/** Guides shown in listings, sitemap, RSS and static params. */
export const publishedPostMeta = (): PostMeta[] =>
  IS_PROD ? postMeta().filter((p) => !isDraftPost(p)) : postMeta();

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
