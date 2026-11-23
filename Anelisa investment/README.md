# Anelisa Investment Ltd website

Plain static multipage website for Anelisa Investment Ltd, Nzega, Tanzania.

## Run locally

Any static server works. From this folder:

```powershell
npx --yes serve .
```

or

```powershell
python -m http.server 4173
```

## Pages

- `index.html` — home
- `services.html` — building, civil and site coordination
- `projects.html` — project record and work types
- `about.html` — company, registration and management
- `contact.html` — office details
- `quote.html` — project enquiry form
- `404.html` — not found

## Design

The system is documented in `DESIGN.md`: Manrope only, light canvas, pill geometry, one blue accent, flat cards, and a set-out grid motif. `styles.css` holds all styling. `app.js` is progressive enhancement only: header state, mobile menu, scroll reveal, FAQ accordion, and the quote form's mailto composition.

## Photography

Images are remote Pexels photographs sized through the Pexels CDN, plus a local hero photograph from Unsplash (`assets/hero-workers.jpg`, by Wasif Ali, photo ID `fBtNXtM4o3k`). Each page has its own set and no photograph is reused across pages. They are illustrative stock, not completed Anelisa projects, and no stock portrait is presented as the managing director. The projects page states this in visible copy.

## Before launch

- The site uses `https://anelisainvestment.co.tz` as a placeholder domain in canonical tags, Open Graph tags, JSON-LD, `sitemap.xml`, and `robots.txt`. Replace it with the registered domain.
- The quote form opens the visitor's email app with the enquiry filled in. Nothing is stored on the site. Connect a form endpoint if server-side delivery is preferred, and add spam protection.
- Publish project case studies only with the scope, location, dates, photographs, and written client approval.
- Replace stock photography with the company's own site photographs when available.
