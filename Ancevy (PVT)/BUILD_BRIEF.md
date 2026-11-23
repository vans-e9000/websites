# ANCEVY (PVT) LIMITED website build brief

Read this whole document before writing code. The design system, home page and behaviour script are already complete. Your job is to build interior pages that are indistinguishable in quality from `index.html`.

## 1. Source of truth in the workspace

- `styles.css` - the complete design system. Use these classes only. Do not add a second stylesheet.
- `script.js` - navigation, scroll reveal, project filters and form validation. Already wired.
- `index.html` - the reference implementation. Copy its `<head>` pattern, header, footer, section rhythm and component markup.
- `IMAGE_SOURCES.md` (written by the image lead) - not needed by you. Every image is referenced by a token such as `__IMG_SERVICES_HERO__`. Put the token in `src` exactly as written. The Lead replaces tokens with verified CDN URLs after you finish.

## 2. Absolute content rules

These are non-negotiable. The Lead will reject and rewrite copy that breaks them.

- No em dashes anywhere. Use commas, parentheses or a full stop.
- Banned words: prototype, dummy, sample, placeholder, demo, test (as a noun for a fake thing), under construction, mockup, harness, leverage, utilize, delve, tapestry, beacon, testament, realm, synergy, paradigm, ecosystem, game-changer, robust, seamless, cutting-edge.
- Banned patterns: "It's not X, it's Y" negative parallelism, manufactured rhetorical questions ("The result? ..."), throat clearing openers, "Here's the thing", "Let's unpack this", "At the end of the day", "In today's fast-paced world", "Moreover", "Furthermore".
- No sparkle emojis, glowing status dots, gradient blobs or invented decoration.
- Write British English with Tanzanian business usage: programme, organisation, prioritise, metre, aluminium. Currency is TZS when a price is stated.
- State facts directly and in the active voice. No "we aim to", "we strive to", "we hope to". Do not invent certifications, client names, award bodies, years of experience or guarantee terms beyond this brief.
- All body copy in this brief is final and must be used verbatim. You may split a long paragraph into two, but do not rewrite sentences, add marketing filler or add new claims. Do not add extra paragraphs.

## 3. Markup rules

- Semantic structure: one `<main id="main">`, one `<h1>` per page, `<section>` elements for bands, `<article>` for cards, `<header class="site-header">`, `<footer class="site-footer">`.
- Never use inline `style=""` attributes. Use the classes in `styles.css`.
- Never invent new CSS classes. If something is genuinely missing, message the Lead instead of adding CSS.
- Every `<img>` needs `alt`, `width`, `height`, `loading="lazy"` and `decoding="async"`, except the page hero image, which uses `fetchpriority="high"` and no lazy loading.
- Use the image tokens exactly, including double underscores.
- All internal links are relative: `index.html`, `about.html`, `services.html#residential`, `contact.html`, `quote.html`.
- Icons are inline SVG, 24x24 viewBox, `fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"`, wrapped in `<span class="icon-tile" aria-hidden="true">` when used as a feature icon. Copy icon paths from the library in section 6.
- Do not include JSON-LD. The Lead wires structured data after you finish. Delete the JSON-LD block when you copy the head.
- Do not touch files outside your assigned scope. Do not edit `styles.css`, `script.js`, `index.html`, `IMAGE_SOURCES.md`, `sitemap.xml`, `robots.txt` or the root icon files.

## 4. Head pattern

Start from the `<head>` in `index.html` and change exactly these values for your page:

1. `<title>` and `meta name="description"`.
2. `<link rel="canonical" href="https://ancevy.co.tz/PAGE.html">`.
3. `og:title`, `og:description`, `og:url`, `og:image:alt` (keep `og:image` as `https://ancevy.co.tz/og-image.png`).
4. `twitter:title`, `twitter:description`.
5. Remove the entire `<script type="application/ld+json">...</script>` block.
6. Keep everything else identical: charset, viewport, author, theme-color, robots, icon links, manifest, font preconnect and stylesheet, inline `js` class script and deferred `script.js`.

Page title and description values are supplied per page in section 8. Descriptions must stay under 165 characters.

## 5. Header and footer

Copy the `<header class="site-header">...</header>` and `<footer class="site-footer">...</footer>` blocks from `index.html` verbatim. Change only the `aria-current="page"` attribute: remove it from Home and place it on the nav link for the current page. For `quote.html` (not in the nav) no nav link gets `aria-current`.

The skip link, brand markup, nav toggle, all footer links, phone, email, WhatsApp link and the `data-year` span must be identical to `index.html`.

## 6. Icon library

Each icon is an inline SVG. Drop it inside an `icon-tile` span or beside text. Paths:

- arrow-right: `<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>`
- check-circle: `<circle cx="12" cy="12" r="10"/><path d="m8.5 12 2.5 2.5 4.5-5"/>`
- shield-check: `<path d="M20 13c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V6l8-3 8 3z"/><path d="m9 12 2 2 4-4"/>`
- map-pin: `<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>`
- building-2: `<path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/>`
- house: `<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>`
- factory: `<path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M17 18h1"/><path d="M12 18h1"/><path d="M7 18h1"/>`
- power: `<path d="M12 2v10"/><path d="M18.4 6.6a9 9 0 1 1-12.77.04"/>`
- wrench: `<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>`
- clipboard-check: `<rect width="8" height="4" x="8" y="2" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/>`
- file-text: `<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>`
- users: `<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>`
- phone: `<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>`
- mail: `<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>`
- message-circle: `<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>`
- clock: `<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>`
- calendar: `<rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/>`
- compass: `<circle cx="12" cy="12" r="10"/><path d="m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z"/>`
- battery-charging: `<path d="M15 7h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-1"/><path d="M6 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h1"/><path d="m10 7-2 5h4l-2 5"/>`

## 7. Component recipes

### Page hero with image

```html
<section class="page-hero page-hero--split">
  <div class="container page-hero__inner">
    <div class="reveal">
      <nav class="breadcrumbs" aria-label="Breadcrumb">
        <ol>
          <li><a href="index.html">Home</a></li>
          <li><span aria-current="page">Services</span></li>
        </ol>
      </nav>
      <p class="eyebrow">Electrical services</p>
      <h1>...</h1>
      <p class="lead">...</p>
      <div class="hero-actions">
        <a class="btn btn--primary btn--lg" href="quote.html">Request a quote</a>
        <a class="btn btn--outline btn--lg" href="contact.html">Talk to an engineer</a>
      </div>
    </div>
    <div class="reveal">
      <figure class="media-frame">
        <img src="__IMG_SERVICES_HERO__" alt="..." width="1600" height="1000" fetchpriority="high" decoding="async">
      </figure>
    </div>
  </div>
</section>
```

### Section head

```html
<div class="section-head reveal">
  <p class="eyebrow">...</p>
  <h2>...</h2>
  <p>...</p>
</div>
```

Use `section-head--split` when the heading and intro sit side by side (copy the pattern from `index.html` services section).

### Service block (services page)

```html
<article class="service-block" id="residential">
  <div class="service-block__media reveal">
    <figure class="media-frame">
      <img src="__IMG_SVC_RESIDENTIAL__" alt="..." width="900" height="675" loading="lazy" decoding="async">
    </figure>
  </div>
  <div class="service-block__body reveal">
    <p class="eyebrow">Service 01</p>
    <h2>Residential electrical</h2>
    <p>...</p>
    <dl class="service-block__meta">
      <div><dt>Delivered by</dt><dd>In-house electricians</dd></div>
      <div><dt>Typical duration</dt><dd>2 to 8 weeks</dd></div>
      <div><dt>Coverage</dt><dd>Mwanza and nationwide</dd></div>
    </dl>
    <ul class="check-list check-list--2col">...</ul>
    <div class="tag-row">...</div>
    <div class="hero-actions">
      <a class="btn btn--primary" href="quote.html">Request a quote</a>
      <a class="btn btn--outline" href="contact.html">Discuss this scope</a>
    </div>
  </div>
</article>
```

Add `service-block--reverse` to every second block. The first block has no top border, handled by `:first-of-type`.

### Project card and filter grid

```html
<div class="project-grid" data-project-grid>
  <article class="project-card project-card--featured" data-sector="commercial">
    <div class="project-media"><img ...></div>
    <div class="project-body">
      <div class="tag-row"><span class="tag tag--surface">Commercial</span><span class="tag tag--outline">Mwanza</span></div>
      <h3>...</h3>
      <p>...</p>
      <div class="project-meta"><span>2026</span><span>9 floors</span></div>
      <p class="project-scope"><strong>Scope:</strong> ...</p>
    </div>
  </article>
  ...
</div>
```

Filter bar and count:

```html
<div class="filter-bar reveal" data-project-filters>
  <button class="filter-btn" type="button" data-filter="all" aria-pressed="true">All projects</button>
  <button class="filter-btn" type="button" data-filter="commercial" aria-pressed="false">Commercial</button>
  <button class="filter-btn" type="button" data-filter="industrial" aria-pressed="false">Industrial</button>
  <button class="filter-btn" type="button" data-filter="residential" aria-pressed="false">Residential</button>
  <button class="filter-btn" type="button" data-filter="maintenance" aria-pressed="false">Maintenance</button>
</div>
<p class="form-note" data-project-count aria-live="polite">6 projects shown</p>
<div class="empty-state" data-project-empty hidden><p>No projects match that filter. Choose another sector.</p></div>
```

Each project card carries `data-sector` with one or more space-separated values (commercial, industrial, residential, maintenance).

### Contact layout and info list

```html
<div class="contact-layout">
  <div class="form-panel reveal">FORM</div>
  <div class="reveal">
    <ul class="info-list">
      <li class="info-item">
        <span class="icon-tile icon-tile--sm" aria-hidden="true">SVG</span>
        <div class="info-item__body">
          <div class="info-item__label">Head office</div>
          <p class="info-item__value">House No. 1 Kashishi, Nyamhongolo<br>Mwanza, Tanzania</p>
        </div>
      </li>
      ...
    </ul>
  </div>
</div>
```

### Form fields

```html
<form class="form" data-form="contact" action="mailto:daudi.mpocholwa@gmail.com" method="post" enctype="text/plain">
  <div class="form-grid">
    <div class="field">
      <label for="contact-name">Full name *</label>
      <input type="text" id="contact-name" name="name" autocomplete="name" required>
    </div>
    ...
    <div class="field field--full">
      <label for="contact-message">Project details *</label>
      <textarea id="contact-message" name="message" required></textarea>
    </div>
  </div>
  <div class="hp-field" aria-hidden="true">
    <label for="contact-honey">Leave this field empty</label>
    <input type="text" id="contact-honey" name="_honey" tabindex="-1" autocomplete="off">
  </div>
  <div class="form-footer">
    <button class="btn btn--primary btn--lg" type="submit">Send message</button>
    <p class="form-note">We reply within one business day. Your details are used only to respond to this enquiry.</p>
  </div>
  <p class="form-note" data-form-status role="status" aria-live="polite"></p>
  <div class="form-panel u-mt-md" data-form-success hidden tabindex="-1" role="status" aria-live="polite">
    <div class="form-success">
      <h3>Your message is ready to send</h3>
      <p>Your email app has opened with the message addressed to our office. If it did not open, email daudi.mpocholwa@gmail.com or call +255 784 670 205.</p>
      <div class="hero-actions">
        <a class="btn btn--primary" data-whatsapp href="https://wa.me/255784670205" target="_blank" rel="noopener">Send on WhatsApp</a>
      </div>
    </div>
  </div>
</form>
```

Do not add a `required` asterisk without also keeping the label text readable. Use the exact field names shown in the page specs.

### Region grid (about page)

```html
<div class="region-grid">
  <article class="region-card"><h3>Mwanza</h3><p>...</p></article>
  ...
  <article class="region-card region-card--wide"><div><h3>Projects outside these regions</h3><p>...</p></div><a class="btn btn--outline" href="quote.html">Request a quote</a></article>
</div>
```

### CTA panel

```html
<section class="section">
  <div class="container">
    <div class="cta-panel reveal">
      <h2>...</h2>
      <p>...</p>
      <div class="hero-actions">
        <a class="btn btn--light btn--lg" href="quote.html">Request a quote</a>
        <a class="btn btn--ghost-light btn--lg" href="tel:+255784670205">Call +255 784 670 205</a>
      </div>
      <p class="cta-note">Office hours: Monday to Friday 8:00 to 17:00, Saturday 9:00 to 13:00.</p>
    </div>
  </div>
</section>
```

## 8. Page specifications

Build each page in this exact section order and use the supplied copy verbatim.

---

### services.html

Title: `Electrical Services in Tanzania | ANCEVY (PVT) LIMITED`
Description: `Residential, commercial and industrial electrical services across Tanzania. Installation, power distribution, maintenance and testing by a Class 4 CRB registered contractor.`
Canonical and og:url: `https://ancevy.co.tz/services.html`
OG image alt: `ANCEVY electrical services in Tanzania`
Nav current: Services

1. Page hero (split, image `__IMG_SERVICES_HERO__`, width 1600 height 1000, alt `Electrical engineer inspecting a distribution board with test instruments on a Tanzanian project site`).
   Eyebrow: `Electrical services`
   H1: `Electrical services for homes, businesses and industry.`
   Lead: `ANCEVY (PVT) LIMITED delivers installation, distribution, maintenance and testing as one accountable contract. Our Class 4 CRB registration covers the full scope, from a single distribution board to a plant substation.`
   Actions: primary `Request a quote` (quote.html), outline `Talk to an engineer` (contact.html).
2. Quick jump section: `section section--flush-top`, a `tag-row` of links styled `tag tag--outline` to `#residential`, `#commercial`, `#industrial`, `#power-distribution`, `#maintenance`, `#testing`, each labelled with the service name. Include `aria-label="Jump to a service"` on a wrapping nav.
3. Six service blocks in this order (section, container, articles as in the recipe). Alternate `service-block--reverse` on blocks 2, 4 and 6. Each has eyebrow `Service 01` to `Service 06`.
   1. id `residential`, image `__IMG_SVC_RESIDENTIAL__` (900x675), alt `Electrician wiring a residential distribution board during a home renovation in Mwanza`.
      H2 `Residential electrical`
      Copy: `We wire new homes and rewire existing ones so that lighting, sockets, cooking and water heating sit on circuits sized for how the household actually uses power. Work is planned around your move-in date, and every circuit is tested before handover.`
      Meta: `Delivered by` / `In-house electricians`; `Typical duration` / `2 to 8 weeks`; `Coverage` / `Mwanza and nationwide`.
      Checklist: `Full house wiring and rewiring`; `Distribution boards and surge protection`; `Indoor and outdoor lighting layouts`; `Socket, switch and appliance circuits`; `Solar-ready and backup supply provisions`; `Inspection and test certificates at handover`.
      Tags: `New builds`, `Renovations`, `Extensions`.
   2. id `commercial`, image `__IMG_SVC_COMMERCIAL__`, alt `Commercial office lighting and distribution installation in Dar es Salaam`.
      H2 `Commercial electrical`
      Copy: `Offices, shops, hotels and clinics need power that stays on and documentation that satisfies insurers and inspectors. We install distribution, lighting, emergency lighting, data pathways and safety systems, phasing the works so trading hours are protected.`
      Meta: `Delivered by` / `Project engineer and site team`; `Working hours` / `Staged day and night works`; `Coverage` / `Mwanza and major regions`.
      Checklist: `Consumer units, sub-mains and metering`; `LED and emergency lighting systems`; `Data, voice and access control pathways`; `HVAC and kitchen equipment connections`; `Fire alarm interface wiring`; `Load balancing and energy reporting`.
      Tags: `Offices`, `Retail`, `Hospitality`, `Healthcare`.
   3. id `industrial`, image `__IMG_SVC_INDUSTRIAL__`, alt `Industrial switchgear and motor control installation at a Tanzanian factory`.
      H2 `Industrial electrical`
      Copy: `Factories and processing plants run on equipment that cannot tolerate loose terminations or undersized protection. We install and upgrade distribution, motor control, machine wiring and control interfaces, working to isolation plans agreed with your production team.`
      Meta: `Delivered by` / `Industrial crew`; `Shutdown windows` / `Planned with production`; `Coverage` / `Nationwide`.
      Checklist: `Transformers, switchgear and busbar systems`; `Motor control centres and variable speed drives`; `Machine and production line wiring`; `Control panel and instrumentation interfaces`; `Earthing and lightning protection`; `Industrial lighting and power outlets`.
      Tags: `Manufacturing`, `Processing`, `Warehousing`.
   4. id `power-distribution`, image `__IMG_SVC_POWER__`, alt `Power line and transformer infrastructure maintained by ANCEVY in Tanzania`.
      H2 `Power distribution`
      Copy: `We size and install the distribution backbone that everything else depends on: transformers, main switchgear, sub-mains, busbar and final distribution. Designs account for the building's next phase, not only the load connected on day one.`
      Meta: `Design output` / `Single-line diagrams and schedules`; `Installation` / `In-house teams`; `Testing` / `Documented per circuit`.
      Checklist: `Load assessment and supply applications`; `Transformer and generator connections`; `Main and sub-main distribution boards`; `Cable sizing, routing and support`; `Protection coordination and discrimination`; `Earth loop and discrimination testing`.
      Tags: `New connections`, `Capacity upgrades`, `Generator interfaces`.
   5. id `maintenance`, image `__IMG_SVC_MAINTENANCE__`, alt `Electrical technician servicing a distribution panel during planned maintenance in Mwanza`.
      H2 `Maintenance and repairs`
      Copy: `Planned maintenance catches overheating terminals, degraded insulation and failing lamps before they interrupt operations. We inspect, test, repair and report on a schedule agreed with your facility team, and respond to breakdowns for contract clients.`
      Meta: `Visit frequency` / `Monthly to quarterly`; `Reporting` / `After every visit`; `Repairs` / `Parts quoted before fitting`.
      Checklist: `Scheduled inspection of boards and equipment`; `Thermal and visual checks on terminations`; `Lamp and fixture replacement`; `Fault finding and emergency repairs`; `Spare parts sourcing and replacement`; `Maintenance records for audits`.
      Tags: `Planned maintenance`, `Breakdown response`, `Compliance`.
   6. id `testing`, image `__IMG_SVC_TESTING__`, alt `Electrician carrying out insulation resistance and earth loop testing with a multimeter`.
      H2 `Testing and inspection`
      Copy: `Testing proves that an installation is safe, not just that it works. We test new installations before energising and inspect existing ones for landlords, buyers and insurers, recording every result against the circuit it belongs to.`
      Meta: `Instruments` / `Calibrated test equipment`; `Certificates` / `Issued per circuit`; `Turnaround` / `1 to 3 days`.
      Checklist: `Insulation resistance and continuity testing`; `Polarity and earth loop impedance`; `RCD and circuit breaker operation`; `Board and circuit labelling audits`; `Condition reports for existing buildings`; `Handover documentation packs`.
      Tags: `Pre-handover`, `Condition reports`, `Compliance`.
4. Section `section--surface` with section-head:
   Eyebrow `Standards`
   H2 `Every service is delivered to the same baseline.`
   Grid: 4 feature cards on white (`card feature-card`) with icon tiles: shield-check `Safety before schedule` (`Isolation plans, permits and inspection points are agreed before work starts.`); file-text `Documented scope` (`Cable sizes, protection ratings and equipment models are listed in the quotation.`); clipboard-check `Tested handover` (`Test sheets and as-built drawings are issued as one package.`); users `Direct supervision` (`A named site supervisor is accountable for the crew on your project.`).
5. FAQ section on canvas: section-head eyebrow `Questions`, H2 `Answers before you appoint a contractor.`, then five `details.faq-item`:
   1 `Can you work in occupied buildings?` / `Yes. We plan phased isolations, work outside trading hours where needed and keep temporary supplies in place until the permanent installation is tested. The programme is agreed with your facility team before work starts.`
   2 `Do you supply the equipment and materials?` / `Yes. Quotations list equipment models, cable sizes and protection ratings. You can nominate brands or supply items yourself. Client-supplied materials are inspected before installation and remain your responsibility for warranty.`
   3 `Which areas do you cover?` / `Our head office is in Mwanza. We run projects in Dar es Salaam, Arusha, Dodoma and Iringa, and mobilise to other regions when the scope justifies a dedicated team.`
   4 `Can you complete an installation started by another contractor?` / `Yes. We begin with a condition inspection and record what is incomplete, non-compliant or unsafe. You receive a defects report and a price to complete the work to a testable standard.`
   5 `Do you provide documentation for insurers or buyers?` / `Test sheets, as-built drawings and equipment schedules are issued for every completed installation. For existing buildings we provide condition reports after inspection.`
6. CTA panel: H2 `Need a scope review before you commit?`, copy `Send the drawings or describe the site. We will tell you what the electrical package needs and price it clearly.`, buttons primary `Request a quote`, outline `Call +255 784 670 205` (tel link).

---

### projects.html

Title: `Electrical Projects in Tanzania | ANCEVY (PVT) LIMITED`
Description: `Completed electrical projects across Tanzania: commercial complexes, manufacturing plants, residential estates, offices, factories and healthcare maintenance programmes.`
Canonical and og:url: `https://ancevy.co.tz/projects.html`
OG image alt: `ANCEVY electrical projects across Tanzania`
Nav current: Projects

1. Page hero (split, image `__IMG_PROJECTS_HERO__` 1600x900, alt `Electrical installation team working on a large construction site in Tanzania`).
   Eyebrow `Projects`
   H1 `Electrical work delivered across Tanzania.`
   Lead: `Browse a selection of installations completed by ANCEVY (PVT) LIMITED. Each project below was delivered with documented testing and handover records.`
   Actions: primary `Request a quote`, outline `View our services` (services.html).
   Breadcrumb: Home / Projects.
2. Projects section on surface:
   Section head: eyebrow `Portfolio`, H2 `Six projects, one standard of delivery.`, copy `Filter by sector to see the type of installation closest to your own brief.`
   Filter bar and count as in the recipe (count text initially `6 projects shown`).
   Project grid with six cards, first card `project-card--featured` spanning both columns. Order and copy:
   1 Commercial complex, `data-sector="commercial"`, image `__IMG_PROJ_1__` alt `Commercial complex distribution and lighting installation in central Mwanza`, tags Commercial / Mwanza, H3 `Mwanza Commercial Complex`, copy `Distribution, lighting, emergency lighting and data pathways for a multi-storey commercial building in central Mwanza.`, meta `2026` / `9 floors`, scope `Main switchgear, sub-mains, LED lighting, emergency lighting, data containment, testing and handover.`
   2 Industrial, `data-sector="industrial"`, image `__IMG_PROJ_2__` alt `Manufacturing plant transformer and switchgear installation in Mwanza`, tags Industrial / Mwanza, H3 `Manufacturing Plant Power Distribution`, copy `Transformer, switchgear, motor control centres and industrial lighting for a production facility in Mwanza.`, meta `2026` / `630 kVA`, scope `630 kVA transformer, main panel, motor control centres, machine wiring, high-bay lighting, earth loop testing.`
   3 Residential, `data-sector="residential"`, image `__IMG_PROJ_3__` alt `Residential estate wiring and street lighting in Nyamhongolo, Mwanza`, tags Residential / Ilemela, H3 `Nyamhongolo Residential Estate`, copy `House wiring, common-area lighting and street lighting for a phased residential development in Ilemela.`, meta `2026` / `24 units`, scope `24 homes, distribution boards, street lighting, surge protection, inspection and testing.`
   4 Commercial, `data-sector="commercial"`, image `__IMG_PROJ_4__` alt `Office refurbishment with new distribution panels and data cabling in Ilemela`, tags Commercial / Ilemela, H3 `Ilemela Office Building`, copy `Panel upgrades, LED retrofit, emergency lighting and data cabling for an occupied office building.`, meta `2025` / `Refurbishment`, scope `Panel replacement, LED retrofit, emergency lighting, network cabling, out-of-hours works.`
   5 Industrial, `data-sector="industrial"`, image `__IMG_PROJ_5__` alt `Textile factory power distribution and control panel installation in Mwanza`, tags Industrial / Mwanza, H3 `Textile Factory Electrical Infrastructure`, copy `High-voltage distribution, machine wiring, control integration and safety interlocks for a textile facility.`, meta `2025` / `Production line`, scope `High-voltage distribution, machine wiring, control panels, safety interlocks, commissioning.`
   6 Maintenance, `data-sector="maintenance"`, image `__IMG_PROJ_6__` alt `Hospital maintenance electrician testing critical circuits in Mwanza`, tags Maintenance / Mwanza, H3 `Hospital Maintenance Programme`, copy `Preventive maintenance, emergency repairs and compliance documentation for a regional hospital facility in Mwanza.`, meta `Ongoing` / `Multi-building`, scope `Scheduled inspections, critical circuit maintenance, emergency repairs, compliance records.`
   Empty state after the grid as in the recipe.
3. Stats band `band band--accent`: stat-row 4: `15+` `Commercial projects`; `20+` `Residential projects`; `10+` `Industrial projects`; `50+` `Maintenance contracts`.
4. Section surface with section-head: eyebrow `Delivery`, H2 `What every project includes.`, copy `The same four controls apply whether the site is a house or a factory.`
   Grid 4 `card feature-card`: icon-tile shield-check `Documented isolation` / `Isolation plans and permits are agreed before any circuit is opened.`; icon-tile clipboard-check `Inspection points` / `Staged checks are signed off as the installation progresses.`; icon-tile file-text `As-built records` / `Drawings are updated to reflect what was installed, not what was drawn.`; icon-tile wrench `Aftercare` / `Maintenance support is available after practical completion.`
5. CTA panel: H2 `Have a project to price?`, copy `Send the drawings, the site address or a short scope. We review it and come back with a clear quotation.`, buttons primary `Request a quote`, outline `Talk to our team` (contact.html).

---

### about.html

Title: `About ANCEVY (PVT) LIMITED | Electrical Contractor, Tanzania`
Description: `A locally owned Class 4 CRB registered electrical contractor in Mwanza, Tanzania. Meet the team, our standards and the regions we serve.`
Canonical and og:url: `https://ancevy.co.tz/about.html`
OG image alt: `About ANCEVY (PVT) LIMITED, electrical contractor in Mwanza`
Nav current: About

1. Page hero (split, image `__IMG_ABOUT_HERO__` 1600x1000, alt `ANCEVY engineers reviewing electrical drawings together on a Tanzanian project site`).
   Eyebrow `About ANCEVY`
   H1 `A local electrical contractor with national reach.`
   Lead: `ANCEVY (PVT) LIMITED is a Tanzanian owned electrical contractor registered with the Contractors Registration Board under E4/269/02/2026. We install, test and maintain electrical systems for clients who need the work documented and the programme respected.`
   Actions: primary `Work with us` (contact.html), outline `See our projects` (projects.html).
   Breadcrumb: Home / About.
2. Story section (split, image `__IMG_ABOUT_STORY__` 1000x1250 in `media-frame--tall`, alt `Electrical technician in a safety helmet working on a distribution panel in Tanzania`). Content side:
   Eyebrow `Our story`
   H2 `Built around site discipline and clear records.`
   Paragraphs (use as three paragraphs):
   `The company was formed to give developers and facility owners a contractor who can take responsibility for the full electrical package. Our teams in Mwanza and on project sites across Tanzania work under the supervision of qualified electrical engineers, with a named site supervisor on every job.`
   `Managing Director Daudi Mpocholwa leads the business from the Nyamhongolo head office. Under his direction, ANCEVY has delivered commercial complexes, manufacturing plants, residential estates and maintenance programmes, with our scope growing alongside our client base.`
   `We keep our own electricians, test instruments and site documentation in house. That means one point of contact from quotation to handover, and a maintenance team that already knows the installation.`
3. Values section `section--surface`: section-head eyebrow `How we work`, H2 `What we hold ourselves to.`; grid 2x2 of `card` value cards (use `card value-card`), each with H3 and paragraph:
   - `Safety before schedule` / `Isolation plans, permits and inspection points are agreed before work starts. No circuit is energised without a test record.`
   - `Scope you can check` / `Quotations list cable sizes, protection ratings and equipment models, so every line can be compared.`
   - `Documentation at handover` / `As-built drawings, test sheets and equipment manuals are issued as a single package.`
   - `Local accountability` / `A Tanzanian owned company with a managing director clients can reach directly.`
4. Leadership section (split reverse; image `__IMG_ABOUT_QUALITY__` 1200x900, alt `Close-up of safe electrical terminations inside a distribution board`). Content:
   Eyebrow `Leadership`
   H2 `Leadership on site, not just in the office.`
   Profile card `profile-card`: `profile-initials` DM, H3 `Daudi Mpocholwa`, p `profile-role` `Managing Director`, paragraph `Daudi Mpocholwa leads ANCEVY (PVT) LIMITED and is directly involved in scope reviews, project programming and client reporting. He reviews every major installation before handover and remains the escalation point for live projects.`
   Second card below (`card card--outline u-mt-sm`): H3 `Our site teams`, paragraph `Electricians, technicians and supervisors work under a named project supervisor, supported by calibrated test instruments and documented inspection points.`
5. Credentials section `section--surface`: section-head eyebrow `Registration`, H2 `Registered, insured and accountable.`, copy `Our registration and testing records are available for verification at any stage of a project.`
   Credential strip with four items: `E4/269/02/2026` / `Contractors Registration Board`; `Class 4` / `Electrical contractor category`; `Local` / `Registered category`; `Tanzania` / `Registered jurisdiction`.
   Below `callout`: `We work to the project specification and to Tanzanian electrical wiring regulations. An installation is only energised after it has passed inspection and testing.`
6. Coverage section: section-head eyebrow `Where we work`, H2 `Where we work across Tanzania.`, copy `Our head office is in Mwanza. Project teams mobilise to the regions below and to other areas when the scope supports a dedicated crew.`
   Region grid with five region cards plus wide card:
   - `Mwanza` / `Head office in Nyamhongolo. Residential, commercial and industrial projects across the city and Ilemela.`
   - `Dar es Salaam` / `Commercial fit-outs and maintenance for property owners in the commercial capital.`
   - `Arusha` / `Hospitality and commercial installations in the northern circuit.`
   - `Dodoma` / `Institutional and government-related electrical work in the capital.`
   - `Iringa` / `Residential and small commercial projects in the southern highlands.`
   - Wide card: H3 `Projects outside these regions`, copy `We mobilise for defined scopes with travel and accommodation stated in the quotation, not added later.`, button outline `Request a quote`.
   Use `__IMG_ABOUT_COVERAGE__` (1200x900, alt `Tanzanian landscape and new construction near Mwanza`) in a `media-frame` in the `region-card--wide` block if the layout allows; otherwise place it after the region grid in a normal media frame with caption `Project teams travel from Mwanza to sites across Tanzania.` Do not duplicate it elsewhere.
7. CTA panel: H2 `Meet the team before you tender.`, copy `We will walk your site, review the drawings and tell you what the electrical package needs. There is no obligation.`, buttons primary `Book a site visit` (contact.html), outline `Call +255 784 670 205` (tel link).

---

### contact.html

Title: `Contact ANCEVY (PVT) LIMITED | Mwanza, Tanzania`
Description: `Call +255 784 670 205 or email daudi.mpocholwa@gmail.com. Visit our head office at House No. 1 Kashishi, Nyamhongolo, Mwanza. Open Monday to Saturday.`
Canonical and og:url: `https://ancevy.co.tz/contact.html`
OG image alt: `Contact ANCEVY (PVT) LIMITED in Mwanza, Tanzania`
Nav current: Contact

1. Page hero (split, image `__IMG_CONTACT_HERO__` 1600x1000, alt `ANCEVY team meeting with a client at their Mwanza office`).
   Eyebrow `Contact`
   H1 `Talk to the team that will deliver the work.`
   Lead: `Call the office, send a brief or visit us in Nyamhongolo. Enquiries are answered within one business day, and urgent breakdowns are triaged by phone the same day.`
   Actions: primary `Request a quote` (quote.html), outline `Call +255 784 670 205`.
   Breadcrumb: Home / Contact.
2. Contact section:
   Section head: eyebrow `Get in touch`, H2 `Tell us what you need and who to call.`, copy `Use the form for project enquiries, or contact the office directly using the details alongside.`
   Contact layout: left form panel, right info list.
   Form fields, `data-form="contact"`, action `mailto:daudi.mpocholwa@gmail.com`:
   - Full name * (text, name `name`, id `contact-name`, autocomplete name, required)
   - Company (text, name `company`, id `contact-company`, autocomplete organization)
   - Email address * (email, name `email`, id `contact-email`, autocomplete email, required)
   - Phone number * (tel, name `phone`, id `contact-phone`, autocomplete tel, required)
   - What is this about? * (select, name `subject`, id `contact-subject`, required): options `Request a quote`, `Project discussion`, `Maintenance contract`, `Testing and inspection`, `Supplier enquiry`, `Other`
   - Message * (textarea, name `message`, id `contact-message`, required, placeholder optional and must not say "placeholder" in visible copy; use no placeholder or a natural hint like `Building type, location and the work you need.`)
   Submit button `Send message`, form footer note `We reply within one business day. Your details are used only to respond to this enquiry.`, status paragraph and success panel exactly as in the form recipe with these words: H3 `Your message is ready to send`, paragraph `Your email app has opened with the message addressed to our office. If it did not open, email daudi.mpocholwa@gmail.com or call +255 784 670 205.`
   Right info list items (icon-tile--sm icons):
   - map-pin / label `Head office` / value `House No. 1 Kashishi, Nyamhongolo<br>Mwanza, Tanzania` / note `Visits by appointment.`
   - mail / label `Postal address` / value `P.O. Box 1220, Ilemela`
   - phone / label `Phone` / value link `tel:+255784670205` text `+255 784 670 205` / note `Monday to Saturday during office hours.`
   - mail / label `Email` / value link `mailto:daudi.mpocholwa@gmail.com` text `daudi.mpocholwa@gmail.com`
   - message-circle / label `WhatsApp` / value link `https://wa.me/255784670205` text `Message the office` / note `Send site photos and drawings directly.`
   - clock / label `Business hours` / value `Monday to Friday 8:00 to 17:00<br>Saturday 9:00 to 13:00<br>Sunday closed`
   - users / label `Managing Director` / value `Daudi Mpocholwa`
3. Visit section `section--surface`:
   Section head: eyebrow `Visit us`, H2 `Head office in Nyamhongolo, Mwanza.`, copy `The office is on the Nyamhongolo road in Ilemela. Call ahead so the right engineer is available when you arrive.`
   `map-panel` with an iframe `src="https://www.google.com/maps?q=Nyamhongolo%2C+Mwanza%2C+Tanzania&output=embed"`, `title="Map showing the ANCEVY head office area in Nyamhongolo, Mwanza"`, `loading="lazy"`, `referrerpolicy="no-referrer-when-downgrade"`, and a `map-panel__foot` with text `ANCEVY (PVT) LIMITED, House No. 1 Kashishi, Nyamhongolo, Mwanza.` plus button outline `Get directions` linking to `https://www.google.com/maps/dir/?api=1&destination=Nyamhongolo%2C+Mwanza%2C+Tanzania` with `target="_blank" rel="noopener"`.
4. Section with `__IMG_CONTACT_OFFICE__` (1200x900, alt `ANCEVY office and site team preparing for a client meeting in Mwanza`) in a split with content:
   Eyebrow `Site visits`
   H2 `We come to the site.`
   Paragraph `For projects outside Mwanza, we arrange a site visit before quoting. The visit confirms the supply point, access, cable routes and any constraints that affect the programme. Send the address and the best time to meet.`
   Actions: primary `Arrange a site visit` (contact form anchor `#contact-form`), outline `Email the office`.
   Give the contact form panel the id `contact-form` so this anchor works.
5. CTA panel: H2 `Need an answer today?`, copy `Call the office for breakdowns and urgent scopes. For everything else, send a short brief and we will respond within one business day.`, buttons primary `Call +255 784 670 205`, outline `Request a quote` (quote.html).

---

### quote.html

Title: `Request an Electrical Quote | ANCEVY (PVT) LIMITED`
Description: `Request a fixed-price electrical quotation for a building, fit-out or maintenance scope in Tanzania. Send drawings or site details and receive a response within one business day.`
Canonical and og:url: `https://ancevy.co.tz/quote.html`
OG image alt: `Request an electrical quotation from ANCEVY in Tanzania`
Nav current: none

1. Page hero (split, image `__IMG_QUOTE_HERO__` 1600x1000, alt `Electrical engineer reviewing project drawings and test equipment on a site in Tanzania`).
   Eyebrow `Request a quote`
   H1 `Get a clear electrical scope and a fixed price.`
   Lead: `Tell us what you are building, upgrading or maintaining. We review the brief, confirm the site assessment and issue a quotation with cable sizes, protection ratings and equipment models listed.`
   Actions: none, or a single primary `How pricing works` linking to `#pricing-inputs`. Keep the form visible in the next section.
   Breadcrumb: Home / Request a quote.
2. Quote section:
   Section head: eyebrow `Project brief`, H2 `Send the details we need to price the work.`, copy `The more detail you share, the faster we can confirm scope and price. Fields marked with an asterisk are required.`
   `contact-layout` with left form panel and right aside.
   Form `data-form="quote"`, action `mailto:daudi.mpocholwa@gmail.com`, fields in a `form-grid`:
   - Full name * (text, name `name`, id `quote-name`, autocomplete name, required)
   - Company (text, name `company`, id `quote-company`, autocomplete organization)
   - Email address * (email, name `email`, id `quote-email`, autocomplete email, required)
   - Phone number * (tel, name `phone`, id `quote-phone`, autocomplete tel, required)
   - Project region * (select, name `region`, id `quote-region`, required): `Mwanza`, `Dar es Salaam`, `Arusha`, `Dodoma`, `Iringa`, `Elsewhere in Tanzania`
   - Service required * (select, name `service`, id `quote-service`, required): `Residential electrical`, `Commercial electrical`, `Industrial electrical`, `Power distribution`, `Maintenance and repairs`, `Testing and inspection`, `Multiple services`
   - Project type * (select, name `project_type`, id `quote-type`, required): `New installation`, `Upgrade or extension`, `Maintenance contract`, `Testing and inspection`, `Repair`
   - Start timeline (select, name `timeline`, id `quote-timeline`): `Within 1 month`, `1 to 3 months`, `3 to 6 months`, `Planning stage`
   - Project details * (textarea, name `details`, id `quote-details`, required, hint text `Include the building type, size, supply arrangement and any drawings or bills of quantities you can share.`)
   Submit `Send quote request`, footer note `We acknowledge every request within one business day and keep your details for this enquiry only.`
   Status paragraph and success panel: H3 `Your quote request is ready to send`, paragraph `Your email app has opened with the request addressed to our office. If it did not open, email daudi.mpocholwa@gmail.com or call +255 784 670 205.`
   Right aside:
   - `card` (not surface): H3 `What happens next`, `list-plain` with three items: `We review the brief and acknowledge it within one business day.`; `We confirm the site assessment or ask for the missing details.`; `You receive a fixed-price quotation in two to five working days.`
   - `card card--outline` with H3 `Send drawings directly`, paragraph `If you have drawings, a bill of quantities or photographs, email them to daudi.mpocholwa@gmail.com and quote your company name in the subject line.`, button outline `Email the office`.
   - `callout`: `Urgent breakdown? Call +255 784 670 205. The office triages breakdowns by phone the same day.`
3. Section `section--surface` id `pricing-inputs`: section-head eyebrow `Pricing inputs`, H2 `What shapes your quotation.`, copy `Three things determine the price. We confirm all of them before issuing a fixed quotation.`; grid 3 `card feature-card`: compass `Site conditions` / `Supply capacity, cable routes, access and any constraints that affect installation time.`; file-text `Scope definition` / `Drawings, a bill of quantities and the equipment specification remove assumptions from the price.`; calendar `Programme` / `Occupied buildings, phased works and shutdown windows affect labour and sequencing.`
4. FAQ section: section-head eyebrow `Questions`, H2 `Before you send the brief.`, four details:
   1 `What should I include in the request?` / `The building type and size, the work you need, the project location, your preferred start date and any drawings or bills of quantities. A short brief is enough to start.`
   2 `Is the quotation fixed?` / `The price is fixed for the scope described in the quotation. If the scope changes, we issue a written variation before the extra work proceeds.`
   3 `Do you quote outside your main regions?` / `Yes. We price projects across Tanzania. Travel and accommodation for the team are stated in the quotation.`
   4 `Can you work to a consultant's specification?` / `Yes. We review the specification, price it line by line and state any proposed substitution before award.`
5. CTA panel: H2 `Prefer to talk it through?`, copy `Call the office or send the brief. Either way, you will speak to someone who understands the installation.`, buttons primary `Call +255 784 670 205`, outline `Contact the office` (contact.html).

---

### 404.html

Title: `Page not found | ANCEVY (PVT) LIMITED`
Description: `The page you requested is not available. Use the links to reach ANCEVY (PVT) LIMITED services, projects or contact details.`
Robots meta: `noindex, follow`
Canonical: omit on this page. Open Graph optional, keep minimal with title and description. Do not include it in navigation.
Nav current: none.
No JSON-LD.
Content: one `section` with `container container--narrow`, centered:
Eyebrow `404`
H1 `That page is not available.`
Lead `The link may be out of date. Use the links below to reach the pages clients use most, or contact the office and we will point you to the right team.`
Actions: primary `Back to home` (index.html), outline `Contact the office`.
A `tag-row` of links: Services, Projects, About, Request a quote.
Keep the header and footer identical.

## 9. Definition of done for each page

Before you report completion, run these checks and fix anything that fails:

1. Search the file for `—` (em dash), `–` (en dash) and the banned words list. Fix every hit.
2. Search for `style=` and remove every inline style.
3. Confirm exactly one `<h1>`, that heading levels descend logically, and that every section has a heading.
4. Confirm every `<img>` has `alt`, `width`, `height`, `decoding` and `loading` (or `fetchpriority` for the hero).
5. Confirm every internal link points to a real file and every `services.html#...` anchor matches an id you created.
6. Confirm the canonical URL, OG URL, title and description match the page spec.
7. Confirm no token was mistyped: every image `src` starts and ends with double underscores.
8. Confirm no text says prototype, sample, demo, placeholder, mockup, under construction or test data.
9. Confirm the header and footer are identical to `index.html` except for `aria-current`.
10. Report back to the Lead with the files completed and any anchor ids you created.
