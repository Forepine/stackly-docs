# Writing the Stackly Help Center

**Readers:** Stackly customers who are not technical: shop owners, marketers, freelancers, event hosts and agency staff. Many read on a phone, and English may be their second language. They want to get a task done and leave.

## Voice

- Write to the reader as "you", in short sentences with everyday words ("link", "page", "button", "turn off").
- Write button, tab and menu names **exactly as they appear on screen**, in bold: click **New link**.
- Avoid developer words. Say "the part after the slash" (then call it the back-half) instead of "slug", and "link" instead of "URL" where you can. Don't use "API", "endpoint", "payload" or "token". The API keys page is the one exception; it says it's for developers.
- Explain **when** someone would use a feature, with a quick real example: a bakery, a yoga class, an agency, a creator.
- Only describe what the app really does. Check the code if you're unsure.
- Indian context is fine: ₹, WhatsApp, GST, Pune.

## Keep it compact

- Pages are short: one or two intro lines, then tasks. Aim for 150–500 words. No filler and no marketing.
- Each task is a heading that starts with a verb ("Create an event", "Turn a link off"), followed by numbered steps with one action per step.
- Use bullets for anything that isn't a step. Use tables for comparisons such as plans, statuses or options.
- Finish with **Good to know** (limits, plan notes) and, where useful, **Troubleshooting** as short "Problem → fix" bullets.
- Keep callouts (`:::tip`, `:::note`, `:::caution`) short. Use `:::caution` for anything that can't be undone.

## Page template

```mdx
---
title: Event pages
description: One sentence for search results.
---

A page for your event: date, place, RSVP and add-to-calendar, on one short link.

<Shot id="events/list" title="Event pages list with upcoming events" />

## When to use it
- …

## Create an event page
1. In the left menu, click **Event Pages**.
2. Click **New event**.
   <Shot id="events/new-form" title="The new event form" />
3. …

## Good to know
- …

## Troubleshooting
- **Guests say the link doesn't open** → …
```

## Components (no import needed)

| Component | Use |
|---|---|
| `<Shot id="module/name" title="what to capture" caption? device="phone"? />` | Image slot. Save the screenshot as `static/img/docs/<id>.png` (or `.webp` / `.jpg`) and it appears automatically. Until then it shows a labelled placeholder. Use 1–4 per page. Ids are lowercase with dashes, starting with the module: `links/create-form`. |
| `<PlanBadge plan="Starter" />` | Small "Starter+" pill. Put it after a heading when a feature needs a plan. |
| `<CardGrid cards={[{ icon: 'Link2', title, to, description }]} />` | Linked cards. `icon` is a [lucide](https://lucide.dev/icons) icon name. |

Write keyboard keys as `<kbd>Ctrl</kbd> + <kbd>K</kbd>`. Link to other guides with relative paths: `[custom domains](../workspace/custom-domains)`.

## Adding screenshots

Each page lists its image slots. To add one:

1. Take the screenshot (a desktop browser window about 1440px wide looks best).
2. Save it under `static/img/docs/` using the path shown in the placeholder. When you run `npm start`, the placeholder shows the exact file name.

The image replaces the placeholder automatically; no code change is needed.
