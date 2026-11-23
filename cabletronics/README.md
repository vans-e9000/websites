# Cabletronics Technical Services Tanzania Limited — website

A five-page static website for a CRB-registered contractor in Dar es Salaam.
No build step, no framework, no runtime dependencies.

## Run locally

```bash
node serve.mjs 4173
# open http://localhost:4173
```

`serve.mjs` is a dependency-free static server with correct MIME types for
WebP and WOFF2 plus gzip for text assets — the same conditions a static host
serves. Any static host works for deployment; there is no build step.

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Hero, CRB record strip, disciplines, five project lines, delivery process |
| `about.html` | Company position, full CRB registration table, principles, coverage, FAQ |
| `services.html` | Five capability lines with scope lists, engagement models, FAQ |
| `projects.html` | Five strategic project lines in detail |
| `contact.html` | Verified contact details and an email-composing enquiry form |

## Facts and sources

Company details, contact information and registration numbers are taken from the
Contractors Registration Board public register:

- https://www.crb.go.tz/contractordetails/home/search?search=cabletronics
- https://www.crb.go.tz/contractordetails/home/show/1759 (Specialist Mechanical, C3)
- https://www.crb.go.tz/contractordetails/home/show/1760 (Electrical, C7)
- https://www.crb.go.tz/contractordetails/home/show/1761 (Building, C6)
- https://www.crb.go.tz/contractordetails/home/show/1762 (Civil, C5)

The five project lines and their scopes come from the company's own project
narrative. They are presented as capability lines, not as named client contracts.
Photography is representative stock imagery — see `assets/img/credits.md`.

## Structure

```
assets/
  css/styles.css      design tokens + all components
  js/main.js          header, menu, reveal, mailto form
  fonts/              Inter Tight latin variable (woff2)
  img/                14 photographs, 1600px + 800px WebP
```

## Design direction

Dark near-monochrome canvas (`#000`), one grotesque family, large radii
(32px cards / 99px pills), restrained lime signal accent, soft light bands,
350–700ms eased motion with a `prefers-reduced-motion` guard.
