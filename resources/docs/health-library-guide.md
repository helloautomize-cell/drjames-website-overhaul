# How to add a Health Library guide

A "guide" is one markdown file in `resources/content/posts/`.

1. **Copy the template.** `cp resources/content/posts/_template.md resources/content/posts/<slug>.md` (the loader ignores files starting with `_`).
2. **Write it.** Fill every front-matter field; write each `##` heading as a question a patient would ask; use `:::margin`, `:::tip` and `:::emergency` directives where useful (see the template for syntax). Dates are `YYYY-MM-DD` or the literal `draft`.
3. **Add the cover.** Put a landscape photo (2000px+ wide) at `public/images/library/<slug>.jpg` and set `image`, `imageAlt` and `imageCredit`. With `image: null` the page renders the designed fallback cover (night + contours + condition icon).
4. **Set the date.** `date: "draft"` keeps the guide visible only on localhost and Vercel previews with a yellow Draft chip; a real date (or `featured: true`, `updated`, `lastReviewed`) publishes it.
5. **Open a PR.** The build fails with a named file and field on any missing/invalid front matter or unknown directive, so `npm run build` is the check.

Rules: no em or en dashes; no brand names, cure claims or comparisons; every statistic needs a named `sources` entry; emergency guidance uses 9999; topics are the five ids listed in the template.
