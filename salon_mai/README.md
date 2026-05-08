# couchto5k.ai — Complete Site Scrape

**Source:** https://couchto5k.ai  
**Scraped:** May 7, 2026  
**Architecture:** React Single-Page Application (SPA)

---

## About This Scrape

`couchto5k.ai` is a React SPA — every URL serves the same HTML shell (`<div id="root">`), and all content is rendered client-side via JavaScript. The site has **4 week tabs** that must be clicked to reveal their respective day content. This archive captures every piece of content by:

1. Clicking each week tab (Week 1–4) and expanding all day cards
2. Expanding all FAQ accordion items
3. Downloading all static assets (images, CSS, JS)
4. Converting all rendered HTML to clean Markdown

---

## Verification Results

| Pass | Checks | Passed | Score |
|------|--------|--------|-------|
| Pass 1 | 77 | 53 | Initial baseline |
| Pass 2 | 115 | 114 | 99.1% |
| Pass 3 | 76 | 74 | 97.4% (2 false positives) |

All 31 days (Day 0–30), all 4 weeks, all 13 FAQ answers, and all 24 static assets confirmed captured.

---

## File Structure

```
final/
├── README.md                          ← This file
│
├── markdown/                          ← Clean Markdown files
│   ├── MASTER_couchto5k_complete.md   ← COMPLETE SITE (all weeks + FAQ + privacy + terms)
│   ├── week1.md                       ← Week 1: Set the Bar High (Days 0–7)
│   ├── week2.md                       ← Week 2: Onboard Your Chief of Staff (Days 8–14)
│   ├── week3.md                       ← Week 3: Build Your First Skill (Days 15–21)
│   ├── week4.md                       ← Week 4: Put AI to Work (Days 22–30)
│   ├── faq.md                         ← FAQ section (all 13 Q&As expanded)
│   ├── privacy.md                     ← Privacy Policy page
│   ├── terms.md                       ← Terms of Service page
│   ├── index.md                       ← Homepage (Week 1 view, HTML→MD conversion)
│   └── index_clean_text.md            ← Homepage clean text version
│
├── html/                              ← Fully rendered HTML files
│   ├── week1.html                     ← Week 1 rendered HTML (96KB)
│   ├── week2.html                     ← Week 2 rendered HTML (78KB)
│   ├── week3.html                     ← Week 3 rendered HTML (61KB)
│   ├── week4.html                     ← Week 4 rendered HTML (75KB)
│   ├── faq_expanded.html              ← FAQ with all answers expanded (97KB)
│   ├── privacy.html                   ← Privacy page rendered HTML
│   ├── terms.html                     ← Terms page rendered HTML
│   ├── index_rendered.html            ← Homepage rendered HTML
│   ├── master_complete.txt            ← All content as plain text (129K chars)
│   ├── week1_text.txt                 ← Week 1 visible text
│   ├── week2_text.txt                 ← Week 2 visible text
│   ├── week3_text.txt                 ← Week 3 visible text
│   ├── week4_text.txt                 ← Week 4 visible text
│   └── faq_text.txt                   ← FAQ visible text
│
├── raw_html_shell/
│   └── index_raw_shell.html           ← Raw HTML before JS executes (1.5KB shell)
│
└── assets/                            ← Downloaded static assets (3.6MB total)
    ├── assets__index-BKYYNbwE.js      ← React app bundle (526KB)
    ├── assets__index-C8903uUm.css     ← Stylesheet (31KB)
    ├── favicon.svg                    ← Favicon
    ├── og-image.png                   ← Open Graph image
    ├── couch-to-5k-for-ai.svg         ← Logo SVG
    ├── hilary-bio-photo.webp          ← Author photo
    ├── day-1-step-2.png               ← Day 1 screenshot
    ├── day-1-step-3.png               ← Day 1 screenshot
    ├── day-7-step-*.png               ← Day 7 screenshots (6 files)
    └── thirtydays__day-7-*.png        ← Day 7 screenshots (7 files)
```

---

## Content Summary

| Section | Days | Key Topics |
|---------|------|-----------|
| Week 1: Set the Bar High | 0–7 | Prompting techniques, context, research, troubleshooting, Claude desktop app |
| Week 2: Onboard Your Chief of Staff | 8–14 | CLAUDE.md, context directory, daily notes, calendar, email, voice input |
| Week 3: Build Your First Skill | 15–21 | People profiles, manager profile, weekly update automation, feedback loops |
| Week 4: Put AI to Work | 22–30 | Custom skills, feedback tools, utility tools, self-improving systems, demo day |
| FAQ | — | 13 Q&As covering setup, concepts, tools, and tips |

---

## Quick Start

For the complete site content in one file, open:
- **Markdown:** `markdown/MASTER_couchto5k_complete.md`
- **Plain text:** `html/master_complete.txt`

For individual weeks, use the `week1.md` through `week4.md` files.
