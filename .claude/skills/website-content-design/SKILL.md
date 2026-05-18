---
name: website-content-design
description: Apply the salon-ai.eu editorial/design system when adding or rewriting copy, sections, or layout on the website. Use whenever the user asks to update marketing copy, redesign a section, add a new page, improve visual hierarchy, or "make it more elegant / conversion-focused / mobile-first". Captures the design rules and content patterns iterated on across May 2026.
---

# Salon AI · Website + Content Design

A working checklist for editorial-quality web design on **salon-ai.eu**. Built from real iteration cycles — each rule traces back to a moment we had to fix something.

## Trigger

Apply this skill whenever the user asks to:
- Add a new section, page, or invitation
- Rewrite copy on an existing page
- Improve visual hierarchy ("the date gets lost", "this is too aggressive", "make it more elegant")
- Mirror or pair two UI elements (cards, columns, options)
- Move a CTA, change conversion flow, or clean clutter
- Re-evaluate a design for mobile

Do NOT apply for: pure tooling work (locales-only translations, analytics keys, technical infrastructure) — those are content-mechanic, not design.

## The design system

### Tokens (already in `index.html`)

```css
--navy:        #1B2E4A    /* body text, primary headings */
--navy-deep:   #0F1E33    /* emphasized headings (subpages) */
--sky-deep:    #6B90AD    /* labels, muted accents */
--sky-light:   #EDF4FA    /* pale-blue backgrounds */
--accent:      #003399    /* CTAs, links, single bold highlights */
--muted-blue:  #637385    /* secondary copy */
--border:      #D8E5EF    /* subtle dividers */
```

Spacing: 8px scale (`--s1`…`--s6` = 8, 16, 24, 32, 48, 64).

### Type

- **Headings + italic accents**: `Playfair Display` serif (400 + 700, italic variants)
- **Body, labels, buttons**: `DM Sans` sans (300–700)
- **Section h2 canonical size**: `clamp(1.85rem, 4.2vw, 2.4rem)` — used by all `.tr-h2`, `.plan-h2`, `.cohost-h2`, `.faq-h2`, `.skills-h2`. Keep this consistent across sections.
- **Use italic for de-emphasis**, bold for emphasis. A single-color (navy) headline with italic + roman contrast is more elegant than two-color combos.

### Eyebrow pattern

Dot-prefixed, used canonically on `.tr-eyebrow`, `.plan-eyebrow`, `.cohost-eyebrow`:

```css
font-size: 10.5px; text-transform: uppercase; letter-spacing: 2.2px;
font-weight: 700; color: var(--sky-deep);
display: inline-flex; align-items: center; gap: 8px;
::before { content: ''; width: 5px; height: 5px; border-radius: 50%; background: var(--accent); }
```

## Content rules

1. **Cut workshop clichés.** "You leave with…" was replaced with collective output ("By the end, the room has produced X"). Reason: the March salon literally produces a shared artifact (Europa 2041) — leaning into that beats the takeaway frame.
2. **Don't repeat the same info twice.** The 3 stats lived in (a) plan section, (b) invitation card, and (c) announcement banner across iterations. Pick one home. Putting it in 2 places is clutter, not emphasis.
3. **Single primary CTA per block.** Secondary actions become text-links, not pill buttons. The salon-invite has 1 big "Ticket kaufen" + 2 inline text-link secondaries.
4. **Date is the visual anchor of an invitation.** Make the day-number huge (4.5–6rem clamp). Month + year are subordinated.
5. **Captions tell people what they're looking at.** Past-event photos got "Tischkonzept by Tatjana Mallinckrodt" / "Natur trifft Tech…" — without them the photos read as decoration.
6. **Mirror paired UI.** Cohost cards both have identical structure: title → FÜR WEN → CTA. Original asymmetry (one had 2 paragraphs, the other 1) made them feel mismatched even though content was fine.
7. **Range > list** for who-it's-for. "Führungskräfte und Teams — von Politik & Architektur bis Private Equity." beats a flat list because it signals breadth + selectivity.
8. **One-line meta strings on conversion cards.** "Luitpoldblock · 18:00 · Dinner & Drinks inkl." beats "Luitpoldblock · 18:00 Einlass · 18:15 Start · Modern Middle Eastern Cuisine · Drinks inklusive" when space is tight.
9. **Don't name-drop unconfirmed invitees** on public/semi-public pages. Signal caliber via host bios + "by invitation" framing. Reason: credibility hit if they don't show.

## Layout rules

10. **Mobile-first CSS.** Base styles target mobile; use `@media (min-width: …)` to enhance. Avoid `max-width` queries unless reducing prominence on small screens (e.g. hiding secondary nav links below 820px).
11. **`text-wrap: balance`** on all hero headlines, pull-quotes, and short captions. Free quality.
12. **`text-wrap: balance` + matched word counts** for mirrored cards. To get parallel 2-line cards, write both texts to similar character counts.
13. **Hero CTA group**: stack on mobile, row on `min-width: 640px`. Primary white-filled, secondary ghost-outline. Used in the homepage hero.
14. **Stockholm / private-event subpage pattern**: small hero image OR inline interstitial image (NOT a giant top banner). Page is text-driven, image is editorial detail.

## Banner / urgency strip pattern

- **Top page banner** (the persistent strip above the nav): use `var(--accent)` background with white text when the message is urgency-driven AND visible on every page.
- **In-card banner** (inside an event invitation card): use a soft tint (e.g. `#BAD0E0`) with navy text. Same message structure, less visual aggression because the card itself is already a focal element.
- Rule: never two accent-blue banners stacked. If both want emphasis, pick the structurally higher one.

## When in doubt

- **Cleanness > completeness.** Cut a sentence rather than wrap to 4 lines.
- **One emphasis per block.** Bold "Salon AI" OR bold "mehr Gespräch" — not both, plus italic, plus color.
- **The italic Playfair is doing more than you think.** Use it for the conceptual hook ("mehr Gespräch", "have it all", the rotating question). Don't waste it on filler.
- **Test on a real 375px viewport** before declaring done. The desktop screenshot lies.

## Reference files in this repo

- [Homepage tokens + components](index.html) — main design system source
- [Stockholm invitation pattern](stockholm_13082026/index.html) — editorial subpage pattern with hero-image-OR-interstitial + phase timeline
- [Use-cases page](anwendungsfaelle.html) — minimal subpage that reuses homepage skill slider
- [`locales.js`](locales.js) — i18n keys; EN fallback is stamped across all non-DE locales

## Verification before "live"

1. **Mobile** at 375px — no horizontal scroll, CTAs ≥44px touch, headings don't wrap awkwardly
2. **Desktop** at 1024px — multi-column layouts kick in, no orphaned single words at line ends
3. **DE + EN switch** — translations exist for new i18n keys; fallback graceful otherwise
4. **No console errors** in preview
5. **Hard-refresh** the live site to bypass CDN cache before reporting "live"
