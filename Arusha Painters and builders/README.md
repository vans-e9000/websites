# Arusha Painters and Builders

Marketing site for **ARUSHA PAINTERS BUILDERS & GENERAL SUPPLIES CO. LTD.**, a CRB-registered local contractor in Arusha, Tanzania.

Stack: Vite, React, TypeScript, Tailwind CSS v4, React Router.

## Run

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`).

```bash
npm run build
npm run preview
```

## Deploy to Netlify

This repository is configured for Netlify in `netlify.toml`:

- Build command: `npm run build`
- Publish directory: `dist`
- Node.js: `22`
- React Router SPA fallback for direct visits to `/about`, `/services`, `/projects`, and `/contact`

To deploy, push the repository to GitHub, choose **Add new site → Import an existing project** in Netlify, select the repository, and keep the detected settings. Netlify will build and publish the site automatically on each push.

Before deploying, run:

```bash
npm ci
npm run build
```

The `dist/` folder is generated output and is intentionally excluded from Git; Netlify creates it during the build.

## CRB facts used

Sourced from [crb.go.tz contractor search](https://www.crb.go.tz/contractordetails/home/search?search=arusha+painters):

| Field | Value |
| --- | --- |
| Legal name | ARUSHA PAINTERS BUILDERS & GENERAL SUPPLIES CO. LTD. |
| Managing director | Elias Makere |
| Building | Class 6 · `B6/1341/03/2020` |
| Civil | Class 7 · `C7/2279/08/2015` |
| Category | Local |
| Address | St. Benjamini Street · P. O. Box 7083 · Arusha |
| Phones | 0784349226 · 0754568424 |
| Email | Not published on CRB detail pages |

Project case studies on the site are prototype marketing scopes, not registry contract records.

## Pages

- `/` Home
- `/about` Company and registrations
- `/services` Five service lines
- `/projects` Five strategic projects
- `/contact` Form, phones, WhatsApp
