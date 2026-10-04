/**
 * 410 Gone for the old site's Elementor demo paths (/elements/,
 * /elements/blog/). A route handler returns the status directly,
 * because Next.js redirects() only supports redirect status codes.
 */
export function GET() {
  return new Response("Gone. This page was part of the old website and no longer exists.", {
    status: 410,
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
