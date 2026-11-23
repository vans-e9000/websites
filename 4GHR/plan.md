# 4GHR Investment Limited Website

## Product direction
A five-page static website for 4GHR Investment Limited, a Tanzanian contractor registered with the Contractors Registration Board in Electrical Class 5, Specialist Electrical Class 3, and Civil Class 5. The site presents active contracting services, verified registration records, project-sector capability, direct contact details, and one project brief form on the Contact page.

## Design system
The visual system follows the supplied light, editorial reference and adapts it to the contractor brand.

- Canvas `#f5f5f7`, primary text `#1d1d1f`, secondary text `#67676c`, request-specified muted accent `#de322d`.
- White surfaces, hairline borders, minimal elevation, and a fully rounded pill language for buttons, tags, inputs, and labels.
- Inter Tight with system fallbacks. Display scale from 76px down to 11px labels.
- 1100px maximum content width, 21px page gutter, 15.2px card radius, 19.76px media radius.
- Flat card-on-canvas separation, a floating glass navigation bar that hides on downward scroll and returns on upward scroll, a black CTA band, and a black footer.
- Split media blocks use a shared 521:514 image frame with the image nudged by -2px on the top and left. Media captions are visually hidden so photography stays clean.
- Icons use a saturated `#e01b1a` on a soft red tint inside rounded icon pills.
- Motion uses 200ms interactions, 450ms one-time reveals, and a slow registration ticker. Reduced-motion preferences disable the ticker and transitions.

## Page architecture
- `index.html`: hero, CRB record card, capability ticker, services, delivery approach, company stats, process, sectors, reasons to choose 4GHR, FAQ, and conversion band.
- `services.html`: three detailed service sections, combined-scope delivery, process, priced-scope guidance, FAQ, and conversion band.
- `projects.html`: six filterable capability profiles, delivery sequence, brief guidance, FAQ, and conversion band.
- `about.html`: company profile, CRB records table, working principles, working area, FAQ, and conversion band.
- `contact.html`: direct contact cards, the complete project brief form, direct-line section, process, complete-brief guidance, FAQ, and direct contact band.

The Contact page is the single conversion route. Service and project links pass `?service=` to preselect the relevant service in the form.

## Forms
The Contact page carries one project brief form. It validates in the browser, creates a structured 10-field brief, opens a pre-filled email to `ceo_4ghri@outlook.com`, and renders a summary with a copy action and a mailto draft link. The form includes a mailto fallback for users without JavaScript, visible validation messages, and a live status region.

## Image policy
All photography comes from Pexels and Unsplash direct CDN URLs. The site uses 19 unique photographs across the five pages, each set in a Tanzanian, East African, or wider African construction context, apart from the requested power-line image on the home page. No photo repeats across pages. Alt text is descriptive, keyword-relevant, and free of location names taken from stock metadata. Copy references Tanzania as the operating country and Dar es Salaam as the registered base. No other regional locations are claimed.

## SEO and accessibility
Every page has a unique title, description, canonical link, hreflang declarations, Open Graph and Twitter metadata, a branded social image, and page-specific JSON-LD. The structured data includes the contractor organization, service catalogue, FAQs, contact point, and website relationships. Local SEO metadata covers the country, region, and city. The site includes a sitemap, robots file, skip link, semantic landmarks, one H1 per page, descriptive alt text, keyboard-visible focus, labelled fields, and reduced-motion support. A 404 page is included and marked noindex. Automated axe checks report zero violations on the five indexed pages, including the Contact form's submitted summary state.

## Assets
- Favicon set: SVG, ICO, 16px, 32px, 48px, 96px PNG, Apple touch icon, 144px and 150px tile images, 192px and 512px app icons, plus `browserconfig.xml` and `site.webmanifest`.
- Social preview images in `assets/og/`, one per page.
- Inline Lucide-style SVG icons for service and contact cards.

## Rebuild
The delivered HTML is static and production ready. To regenerate after editing content in `tools/build.mjs`, run from the project root:

```text
node tools/build.mjs
```

Regenerate favicons and social images with:

```text
python tools/build-assets.py
```

Run the static audit with:

```text
node tools/audit.mjs
```

Check page, metadata, sitemap, and asset integrity with:

```text
python tools/final-check.py
```

## Performance
- Photography is delivered through responsive `srcset` and `sizes` values, so phones request smaller files than desktop displays.
- The home hero image is preloaded with matching responsive sources and `fetchpriority="high"`.
- Below-the-fold images are lazy loaded and decoded asynchronously.
- Fonts use `display=swap` with preconnect hints, and the image CDNs are preconnected.
- Netlify caching rules keep static assets cached for a week while HTML stays revalidated.

## Netlify deployment
The site is ready for static hosting on Netlify.

- Publish directory: `.` (the project root).
- Build command: none.
- `netlify.toml` handles the index redirect, favicon rewrites, private-file blocking, security headers, and cache headers.
- `404.html` is served automatically for missing routes and is marked `noindex`.
- `tools/`, `preview/`, and project notes are blocked from public access at the edge.
- Set the primary domain to `https://4ghrinvestment.co.tz` and enable managed HTTPS in Netlify.
- If the production domain changes, update `SITE.url` in `tools/build.mjs`, rerun the build, and redeploy.
- Submit `https://4ghrinvestment.co.tz/sitemap.xml` in Google Search Console and Bing Webmaster Tools after launch.

## Delivery
Plain static hosting. No build step is required to serve the site, no server-side dependency, no authentication, and no analytics or tracking code.
