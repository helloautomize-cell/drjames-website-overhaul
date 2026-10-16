---
# Copy this file to <slug>.md and fill every field. Files starting with "_"
# are ignored by the content loader.
kind: post
# Page <title> (max 60 chars). May include the phrase patients search for.
title: "Short SEO title"
# Meta description (max 155 chars). Optional: standfirst is used if omitted.
description: "One-sentence meta description."
# The H1 shown on the page and on every card.
heading: "The question or promise the guide delivers on"
# 60-240 chars. Under the H1 and on cards.
standfirst: "One or two sentences that tell the reader exactly what this guide covers and for whom."
# One of: diabetes-metabolism | heart-blood-pressure | lungs-sleep-infections | kidney-liver-gut | whole-person
topic: heart-blood-pressure
# "draft-for-doctor-review" until Dr. James approves; "published" needs all
# three: this status, reviewedBy naming him, and a reviewedOn ISO date.
status: draft-for-doctor-review
# Exact name of the reviewer once approved: "Dr. James Kumar Pallivathukkal".
reviewedBy: null
# ISO date YYYY-MM-DD of that review; null until then.
reviewedOn: null
# "YYYY-MM-DD" to publish, or the literal "draft" to keep it preview-only.
date: "draft"
# ISO date or null. When set, the byline shows "Updated <date>".
updated: null
# ISO date once Dr. James has reviewed it; "[CONFIRM]" until then.
lastReviewed: "[CONFIRM]"
# true pins it as the featured guide on the index and home (newest wins if several).
featured: false
# Cover in /public/images/library/<slug>.jpg (landscape, 2000px+ wide) or null for the designed fallback.
image: null
# Required when image is set. Describe what is in the photo, not the topic.
imageAlt: null
# Optional caption line shown under the cover.
imageCaption: null
# Photo credit/licence line, e.g. "Name, licensed under CC BY".
imageCredit: null
# object-position for crops, e.g. "50% 40%".
imageFocus: "50% 40%"
# 120-420 chars. Answers the H1 in 2 to 3 sentences, shown in the Quick answer box.
quickAnswer: "The direct answer to the heading, two or three sentences."
# 3 to 7 bullets, one idea each (was: inBrief).
keyTakeaways:
  - "The single most important point."
  - "The second thing to remember."
  - "A third takeaway."
# 0 to 8 questions a patient can bring to the visit.
questionsToAsk:
  - "A question a patient would actually ask?"
# Common questions accordion + FAQPage structured data (max 6).
faqs:
  - q: "A real patient question?"
    a: "A plain, honest answer."
# 0 to 12 named sources. Every statistic needs one.
sources:
  - name: "Organisation: page name"
    url: "https://example.org/page"
# Condition slugs from lib/conditions.ts. The first is the guide's main condition
# (drives the sidebar card, the local section and structured data).
related: [high-blood-pressure]
# true renders "<Topic> in Muscat: when to see an internist" before the footer blocks.
localSection: true
---

<!--
Checklist before opening the PR:
- One cover image, landscape, at least 2000px wide, alt text written
- Every H2 is a question a patient would ask
- Quick answer answers the H1 in 2 to 3 sentences
- Reviewed by Dr. James, lastReviewed filled
- No statistic without a source in sources
- No brand names, no cure claims, no comparisons
- :::emergency directive if the topic has red flags (point to the emergency department, no phone numbers)

Body markdown notes:
- Use ## for sections (they become the "In this guide" list and get ids).
- :::margin ... :::   = a margin note signed by Dr. James
- :::emergency ... ::: = the red callout (same as condition pages)
- :::tip ... :::      = a pearl "Good to know" box
- Unknown :::names fail the build, naming the file and directive.
-->

Intro paragraph: what this guide covers and who it is for.

## Question-shaped H2?

Body text.

:::tip
A practical aside that helps but is not essential to the main text.
:::

## Another section?

:::margin
A short personal note from Dr. James beside the text.
:::

:::emergency
The red-flag sentence, with the instruction to go to the nearest emergency department.
:::
