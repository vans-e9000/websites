# GIMDO Engineering Works Limited website

Plain-local, responsive multi-page website for GIMDO Engineering Works Limited. Its dark interface, lime accent, pill navigation and type scale follow `design.md`. Hero images use full-width photo backdrops with text overlaid for contrast. Supporting photography uses rectangular crops.

## Run locally

From this folder, start a static server:

```powershell
py -m http.server 4173
```

Open `http://localhost:4173/index.html`.

## Pages

- `index.html` — home / overview
- `services.html` — mechanical contracting services
- `projects.html` — illustrative capabilities gallery; stock imagery is not represented as completed GIMDO work
- `company.html` — company profile and registration details
- `contact.html` — direct contact details and enquiry form

## Deploy to Netlify

The repository includes `netlify.toml` and a dependency-free build script. When this folder is connected to a Git repository in Netlify, Netlify reads the configuration, runs `node prepare-netlify.cjs`, and publishes the clean `dist/` folder. The bundle contains the HTML pages, shared CSS and JavaScript, the local images used by the pages, the Pexels credits, and a branded 404 page. Local-only working files and unused original image downloads are excluded.

During Netlify builds, the script uses Netlify’s primary site URL to generate absolute canonical URLs, Open Graph and Twitter image URLs, `sitemap.xml`, and the sitemap entry in `robots.txt`. If you build locally for a manual deploy, set `SITE_URL` to the site’s primary HTTPS URL before generating `dist/`:

```powershell
$env:SITE_URL = "https://your-site-name.netlify.app"
node prepare-netlify.cjs
```

Then upload the generated `dist/` folder. If you add a custom domain, set it as the primary Netlify domain or set `SITE_URL` to that HTTPS address before rebuilding.

Netlify serves `404.html` for missing pages. Basic security response headers are configured in `netlify.toml`.

The enquiry form currently uses the visitor’s configured email application via `mailto`; it does not store submissions in the Netlify dashboard.

## Sources

Public company details are based on the Contractors Registration Board record: https://www.crb.go.tz/contractordetails/home/show/4235

Local photography is sourced from Pexels. Photo source links and license information are recorded in `assets/pexels/credits.txt`.
