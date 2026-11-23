# ASABHI COMPANY LIMITED Website Redesign Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the ASABHI COMPANY LIMITED multi-page contractor website by strictly adopting the Quill Finance design language (canvas `#fbfbf5`, surface `#ff5500`, accent `#ffdab0`, text `#0d0b0c`, flat card-on-canvas surfaces, pill tags, 8px grid) while rigorously enforcing East African / Tanzanian geographic relevance, zero duplicate imagery, zero AI-slop (no em dashes, no forbidden words, no glowing dots), and complete on-page SEO.

**Architecture:** A static multi-page semantic web architecture (`index.html`, `services.html`, `about.html`, `contact.html`, `quote.html`) driven by a unified CSS design token system (`design-system/tokens.css` and `styles.css`) and modular vanilla JavaScript (`script.js`). All assets and layouts are structured for high-performance delivery, mobile-first responsiveness, and accessibility (WCAG AA).

**Tech Stack:** HTML5 Semantic Markup, Modern CSS3 with Design Tokens & CSS Custom Properties, Vanilla JavaScript (ES6+), Google Fonts (Plus Jakarta Sans + JetBrains Mono), Scalable SVG Iconography, Unsplash Valid CDN Photography.

---

## File Structure & Responsibilities

- `design-system/tokens.css`: The central source of truth for design tokens strictly mapped to the Quill Finance specification (colors `#fbfbf5`, `#ff5500`, `#ffdab0`, `#0d0b0c`, `#868585`; font stacks; 8px grid spacing; pill and 8px radii).
- `design-system/tokens.json`: Machine-readable token reference for design fidelity.
- `styles.css`: Complete production styling covering layout shells (1000px max container), typography hierarchy, flat card surfaces, pill buttons, ticker banner, service grids, responsive tables, forms, and accessibility states.
- `script.js`: Clean client-side interactions: mobile drawer toggle, scroll reveal via IntersectionObserver, quotation calculator/form submission feedback, and active page detection.
- `index.html`: Home page delivering contractor credibility, CRB registration badges, service matrix, execution methodology, project highlights, and call-to-action bands.
- `services.html`: Dedicated service catalog detailing Building Construction, Civil Engineering, Electrical Works, Project Management, and Quality Assurance with equipment and scope breakdowns.
- `about.html`: Corporate profile detailing Tanzanian ownership, executive leadership (Managing Directors Ibrahim Nyambacha & Ibrahim Matayi), CRB certifications, and HSE standards.
- `contact.html`: Physical headquarters (ADA Estate, Kinondoni, Dar es Salaam), postal address, direct telephone lines, department emails, and inquiry routing.
- `quote.html`: Production-grade quotation request intake with scope selectors, drawing upload simulator, site location fields, and pricing timeline commitments.
- `favicon.svg`: Brand mark SVG icon matching the `#ff5500` / `#0d0b0c` Quill palette.
- `robots.txt` & `sitemap.xml`: Technical SEO search engine crawl instructions and page indexing.

---

## Tasks

### Task 1: Update Design Tokens to Quill Finance Specification
- [ ] Update `design-system/tokens.css` with exact Quill Finance colors:
  - Canvas: `#fbfbf5`
  - Surface: `#ff5500`
  - Brand Accent: `#ffdab0`
  - Text Primary: `#0d0b0c`
  - Text Secondary: `#868585`
  - Border: `rgba(13, 11, 12, 0.18)` and `rgba(13, 11, 12, 0.4)`
  - Surface Tints: `#fff8f3`, `#fef0dd`, `#222222`
  - Font families: `"Plus Jakarta Sans", sans-serif` for display and body; `"JetBrains Mono", monospace` for labels, numbers, and technical data.
  - Container max-width: `1000px` (Quill standard).
- [ ] Update `design-system/tokens.json` to reflect the updated palette and typography.
- [ ] Verify token variables are valid and contrast compliant.

### Task 2: Re-architect Core CSS (`styles.css`) for Quill Design Language
- [ ] Implement flat card-on-canvas surfaces: no heavy drop shadows, clean crisp borders (`1px solid var(--color-border)`), 8px / 16px / 24px radii, and 9999px pills.
- [ ] Style the signature Quill top banner (`.top-banner`) in `#ff5500` with high-contrast text and CRB registration numbers.
- [ ] Build button archetypes:
  - Primary button: `#ffdab0` background, `#0d0b0c` text, 8px radius or pill, zero-shift crisp hover.
  - Secondary button: `#0d0b0c` background, `#fef0dd` text, 8px radius.
  - Ghost button: transparent background, `#0d0b0c` border and text.
- [ ] Implement the 1000px container shell with 32px card padding and 8px spacing unit.
- [ ] Implement responsive behavior for breakpoints: `<=479px`, `<=767px`, `<=991px`.
- [ ] Remove any pulsing status dots, magic sparkles, or gradient blurs to strictly comply with AI-slop eradication rules.

### Task 3: Curate 100% Unique, East Africa / Tanzania Relevant Visual Assets
- [ ] Collect a strict manifest of unique Unsplash URLs featuring authentic East African / Tanzanian construction, civil earthworks, infrastructure, building sites, and engineering teams.
- [ ] Ensure ZERO image duplicates across all pages (`index.html`, `services.html`, `about.html`, `contact.html`, `quote.html`).
- [ ] Verify every image URL is live, valid, and has no Western architectural artifacts or snow.
- [ ] Document image assignment per page to prevent cross-contamination.

### Task 4: Rebuild Home Page (`index.html`)
- [ ] Set page title: `ASABHI COMPANY LIMITED | CRB Class 1 Building & Civil Contractor Tanzania`
- [ ] Add complete meta tags, OG tags, canonical link, and JSON-LD Schema (`GeneralContractor`).
- [ ] Build Quill-inspired layout sequence:
  - Top announcement banner in `#ff5500` displaying active CRB licenses.
  - Navigation header with pill navigation and quote CTA.
  - High-impact Hero section with tight tracking display typography ("Built for precision, delivered across Tanzania"), contractor credential pills, and featured project visual.
  - Facts / Stats band highlighting Class 1 Building, Class 1 Civil, Class 3 Electrical.
  - Service grid cards styled as functional artifacts with pill tags.
  - Step-by-step project delivery flow (Enquiry -> Quotation -> Construction -> Handover).
  - CRB Registration Verification Table with official certificate codes.
  - Conversion banner with direct inquiry options.
  - 12-column Quill-style footer with operational status text (no pulsing dots), regional office links, and copyright.
- [ ] Run strict content audit: NO EM DASHES, no forbidden words ("harness", "leverage", "utilize", "delve", "robust", "seamless", etc.), no negative parallelism, no placeholder terms.

### Task 5: Rebuild Services Page (`services.html`)
- [ ] Set page title: `Construction & Engineering Services | ASABHI COMPANY LIMITED Tanzania`
- [ ] Add comprehensive on-page SEO meta tags, canonical link, and OG tags.
- [ ] Build detailed service sections covering:
  - 01 Building Construction (commercial structures, educational facilities, institutional complexes, residential blocks).
  - 02 Civil Works & Infrastructure (road formation, storm water drainage culverts, earthworks, reinforced concrete bridges).
  - 03 Electrical Contracting (Class 3 power distribution, substation installation, industrial wiring, standby power).
  - 04 Heavy Plant & Equipment Fleet (excavators, graders, compaction rollers, transit mixers).
  - 05 Quality Assurance & Testing (concrete cube crushing, soil compaction density, slump testing).
- [ ] Ensure all images are 100% unique and distinct from `index.html`.
- [ ] Enforce zero AI-slop and zero em dashes across all copy.

### Task 6: Rebuild About Us Page (`about.html`)
- [ ] Set page title: `About ASABHI COMPANY LIMITED | Tanzanian Licensed Contractor`
- [ ] Add comprehensive on-page SEO meta tags and OG preview tags.
- [ ] Structure company background:
  - Tanzanian incorporation, Contractors Registration Act compliance, head office in ADA Estate, Kinondoni, Dar es Salaam.
  - Executive Leadership: Managing Director Ibrahim Nyambacha (Building & Civil) and Managing Director Ibrahim Matayi (Electrical).
  - Safety, Health & Environmental (HSE) policy, personal protective equipment mandates, site zero-incident goals.
  - Geographic mobilization capabilities covering Dar es Salaam, Dodoma, Arusha, Mwanza, Iringa, and Morogoro.
- [ ] Ensure all photography is 100% unique, regionally authentic, and zero duplicate URLs.
- [ ] Enforce zero AI-slop and zero em dashes.

### Task 7: Rebuild Contact Page (`contact.html`)
- [ ] Set page title: `Contact Engineering Office | ASABHI COMPANY LIMITED Dar es Salaam`
- [ ] Add complete SEO meta tags, canonical link, and OG tags.
- [ ] Structure contact channels:
  - Physical address: Plot 407, ADA Estate, Kinondoni Municipality, Dar es Salaam.
  - Postal address: P.O. Box 60784, Dar es Salaam, Tanzania.
  - Direct telephone lines: +255 787 844 040 and +255 754 262 402.
  - Official email routing: tenders@asabhi.co.tz, info@asabhi.co.tz.
  - Office hours and operational emergency contact protocol.
  - Clean interactive contact form with instant validation.
- [ ] Enforce zero AI-slop and zero em dashes.

### Task 8: Rebuild Quote Request Page (`quote.html`)
- [ ] Set page title: `Request an Itemized Construction Quotation | ASABHI COMPANY LIMITED`
- [ ] Add complete SEO meta tags, canonical link, and OG tags.
- [ ] Build production-grade quotation intake interface:
  - Scope selection checkboxes (Building Construction, Civil Works, Electrical Installation, Renovation, Site Survey).
  - Project location field (Dar es Salaam, Coast Region, Dodoma, Arusha, Other regions in Tanzania).
  - Bill of Quantities (BOQ) and architectural drawing file attachment simulator with clear file type guidelines (PDF, DWG, ZIP up to 50MB).
  - Estimated budget range selector and target mobilization date.
  - Instant client validation and submission state with reference number generation.
- [ ] Enforce zero AI-slop and zero em dashes.

### Task 9: Upgrade Client-Side Interactions (`script.js`) & Favicon (`favicon.svg`)
- [ ] Refactor `script.js` for lightweight modern execution:
  - Mobile menu drawer with accessible ARIA state management.
  - Smooth scroll reveal using `IntersectionObserver` with `prefers-reduced-motion` detection.
  - Interactive quote form handler with dynamic submission feedback and reference code generator.
  - Active navigation state highlighting based on current URL path.
- [ ] Update `favicon.svg` with bold, clean geometric glyph reflecting ASABHI in `#ff5500` and `#0d0b0c`.

### Task 10: Technical SEO, Accessibility & Quality Assurance Audit
- [ ] Update `sitemap.xml` with current URLs, priority weights, and change frequencies.
- [ ] Verify `robots.txt` points cleanly to `sitemap.xml`.
- [ ] Run full automated verification script:
  - Check for ANY forbidden words ("harness", "leverage", "utilize", "delve", "tapestry", "beacon", "testament", "realm", "synergy", "paradigm", "ecosystem", "game-changer", "robust", "seamless", "cutting-edge").
  - Check for ANY em dashes (`—` or `&#8212;` or `&mdash;`).
  - Check for forbidden developer metadata ("prototype", "dummy", "sample", "placeholder", "demo", "test", "mockup", "under construction").
  - Verify every single image URL across all HTML files is 100% unique (no duplicates whatsoever).
  - Verify all links, forms, and buttons are functional and have proper accessible names and labels.
- [ ] Final visual and code review.
