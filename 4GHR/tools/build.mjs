import { readFileSync, writeFileSync } from "node:fs";

const SITE = {
  name: "4GHR Investment Limited",
  shortName: "4GHR",
  url: "https://4ghrinvestment.co.tz/",
  phone: "+255 754 711 801",
  phoneHref: "+255754711801",
  email: "ceo_4ghri@outlook.com",
  address: "Plot No. 24, Block D, Tembo Street, Wazo Hill Road, Dar es Salaam",
  postal: "P. O. Box 68331",
  md: "Haikamen Mshiu",
  registrations: [
    { discipline: "Electrical", class: "Class 5", number: "E5/472/11/2024" },
    { discipline: "Specialist Electrical", class: "Class 3", number: "SPE3/802/07/2023" },
    { discipline: "Civil", class: "Class 5", number: "C5/1760/11/2024" },
  ],
};

const bank = JSON.parse(readFileSync("tools/image-bank.json", "utf8"));
const IMG = new Map(bank.map((item) => [item.slot, item]));

const ALT = {
  "home-hero": "Aerial view of a newly built glass office tower beside a highway in an East African coastal city",
  "home-approach": "Utility worker in a bucket lift repairing overhead power lines",
  "home-sector-commercial": "High-rise buildings being built, with tower cranes and exposed concrete cores",
  "home-sector-electrical": "Technician in a hard hat working on an industrial electrical control panel and switchgear",
  "home-sector-civil": "Road construction crew grading a new carriageway with an excavator and tipper truck",
  "services-electrical": "Electrician feeding cables into ceiling conduit during an interior electrical installation",
  "services-specialist": "Electricians working on control panels in an industrial electrical room",
  "services-civil": "Construction plant and an industrial building frame on a civil works site",
  "services-coordination": "Engineers in hard hats reviewing construction drawings around a site table",
  "projects-commercial": "Aerial view of a high-rise building being built, with exposed floor plates and a tower crane",
  "projects-institutional": "Aerial view of a modern educational campus with red-roofed buildings and landscaped grounds",
  "projects-industrial": "Interior of a large warehouse with stacked materials and a high steel roof",
  "projects-power": "Line crew servicing an electricity pole from a bucket truck on a rural road",
  "projects-civil": "Construction worker in a reflective vest on a rural access road at sunset",
  "projects-fitout": "Completed commercial office fit-out with a reception desk and lounge seating",
  "about-team": "Group of construction workers in high-visibility vests and hard hats on an active site",
  "about-site": "Construction workers on scaffolding during a site inspection",
  "contact-team": "Group of construction workers in high-visibility vests and hard hats standing together on site",
  "quote-engineer": "Two engineers in hard hats and safety vests standing together on a construction site",
};

function img(slot, options = {}) {
  const item = IMG.get(slot);
  if (!item) throw new Error("Missing image slot: " + slot);
  if (!ALT[slot]) throw new Error("Missing alt text for slot: " + slot);
  const loading = options.eager
    ? 'fetchpriority="high" decoding="async"'
    : 'loading="lazy" decoding="async"';
  const className = options.className ? ' class="' + options.className + '"' : "";
  const cardSlot = /^(home-sector-|projects-)/.test(slot);
  const widths =
    slot === "home-hero" ? [480, 800, 1200, 1600] : cardSlot ? [400, 640, 900] : [480, 800, 1200, 1600];
  const fallbackWidth = slot === "home-hero" ? 1600 : cardSlot ? 900 : 1200;
  const width = options.width || fallbackWidth;
  const withWidth = (value) => item.url.replace(/([?&])w=\d+/, "$1w=" + value);
  const srcset = widths.map((value) => `${withWidth(value)} ${value}w`).join(", ");
  const sizes =
    slot === "home-hero"
      ? "(max-width: 900px) 100vw, 47vw"
      : cardSlot
        ? "(max-width: 640px) calc(100vw - 32px), (max-width: 1024px) 45vw, 355px"
        : "(max-width: 900px) calc(100vw - 32px), 521px";
  const url = withWidth(width);
  return `<img src="${url}" srcset="${srcset}" sizes="${sizes}" alt="${ALT[slot]}" ${loading}${className}>`;
}

function icon(name, className = "icon") {
  const paths = {
    zap: '<path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z"/>',
    circuit:
      '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M11 9h4a2 2 0 0 0 2-2V3"/><circle cx="9" cy="9" r="2"/><path d="M7 21v-4a2 2 0 0 1 2-2h4"/><circle cx="15" cy="15" r="2"/>',
    hardhat:
      '<path d="M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1z"/><path d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5"/><path d="M4 15v-3a6 6 0 0 1 6-6"/><path d="M14 6a6 6 0 0 1 6 6v3"/>',
    building:
      '<path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/>',
    shield:
      '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
    pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    phone:
      '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
    mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
    clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
    file: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>',
    clipboard:
      '<rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    arrow: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
    arrowUp: '<path d="M7 17 17 7"/><path d="M7 7h10v10"/>',
    chevron: '<path d="m9 18 6-6-6-6"/>',
    users:
      '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    message: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    route:
      '<circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/><circle cx="18" cy="5" r="3"/>',
    layers:
      '<path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/>',
    ruler:
      '<path d="M21.3 8.7 8.7 21.3a1 1 0 0 1-1.4 0L2.7 16.7a1 1 0 0 1 0-1.4L15.3 2.7a1 1 0 0 1 1.4 0l4.6 4.6a1 1 0 0 1 0 1.4Z"/><path d="m7.5 10.5 2 2"/><path d="m10.5 7.5 2 2"/><path d="m13.5 4.5 2 2"/><path d="m4.5 13.5 2 2"/>',
  };
  return `<svg class="${className}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${paths[name]}</svg>`;
}

function head({ title, description, path, og, jsonld, ogAlt, robots }) {
  const canonical = SITE.url + path;
  const ogUrl = SITE.url + "assets/og/" + og;
  const robotsContent =
    robots ||
    "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";
  const hero = IMG.get("home-hero");
  const heroWidths = [480, 800, 1200, 1600];
  const heroPreload =
    path === "" && hero
      ? `  <link rel="preload" as="image" href="${hero.url.replace(/([?&])w=\d+/, "$1w=1600")}" imagesrcset="${heroWidths.map((value) => `${hero.url.replace(/([?&])w=\d+/, "$1w=" + value)} ${value}w`).join(", ")}" imagesizes="(max-width: 900px) 100vw, 47vw" fetchpriority="high">\n`
      : "";
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <link rel="canonical" href="${canonical}">
  <link rel="alternate" hreflang="en-TZ" href="${canonical}">
  <link rel="alternate" hreflang="x-default" href="${canonical}">
  <link rel="sitemap" type="application/xml" href="${SITE.url}sitemap.xml">
  <meta name="robots" content="${robotsContent}">
  <meta name="author" content="${SITE.name}">
  <meta name="application-name" content="${SITE.name}">
  <meta name="theme-color" content="#1d1d1f">
  <meta name="msapplication-TileColor" content="#1d1d1f">
  <meta name="msapplication-config" content="browserconfig.xml">
  <meta name="apple-mobile-web-app-title" content="4GHR">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="default">
  <meta name="geo.region" content="TZ-02">
  <meta name="geo.placename" content="Dar es Salaam">
  <meta name="format-detection" content="telephone=no">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="${SITE.name}">
  <meta property="og:locale" content="en_TZ">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${ogUrl}">
  <meta property="og:image:secure_url" content="${ogUrl}">
  <meta property="og:image:type" content="image/png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="${ogAlt}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${description}">
  <meta name="twitter:image" content="${ogUrl}">
  <meta name="twitter:image:alt" content="${ogAlt}">
  <link rel="icon" href="assets/favicon.ico" sizes="any">
  <link rel="icon" type="image/svg+xml" href="assets/favicon.svg">
  <link rel="icon" type="image/png" sizes="48x48" href="assets/favicon-48.png">
  <link rel="icon" type="image/png" sizes="32x32" href="assets/favicon-32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="assets/favicon-16.png">
  <link rel="icon" type="image/png" sizes="96x96" href="assets/favicon-96.png">
  <link rel="apple-touch-icon" sizes="180x180" href="assets/apple-touch-icon.png">
  <link rel="manifest" href="site.webmanifest">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="preconnect" href="https://images.pexels.com" crossorigin>
  <link rel="preconnect" href="https://images.unsplash.com" crossorigin>
  <link rel="dns-prefetch" href="https://images.pexels.com">
  <link rel="dns-prefetch" href="https://images.unsplash.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@500;600;700&display=swap" rel="stylesheet">
${heroPreload}  <link rel="stylesheet" href="assets/styles.css">
${jsonld.map((item) => "  " + ldScript(item)).join("\n")}
</head>`;
}

function ldScript(data) {
  return `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, "\\u003c")}</script>`;
}

function header(active) {
  const links = [
    ["index.html", "Home"],
    ["services.html", "Services"],
    ["projects.html", "Projects"],
    ["about.html", "About"],
  ];
  const items = links
    .map(([href, label]) => {
      const current = active === href ? ' aria-current="page"' : "";
      return `<a href="${href}"${current}>${label}</a>`;
    })
    .join("");
  return `<a class="skip-link" href="#main-content">Skip to content</a>
<header class="site-header" data-header>
  <div class="container">
    <div class="nav-shell">
      <a class="brand" href="index.html" aria-label="4GHR Investment Limited home">
        <span class="brand-mark">4G</span>
        <span class="brand-text">4GHR<small>Investment Limited</small></span>
      </a>
      <button class="nav-toggle" type="button" data-nav-toggle aria-expanded="false" aria-controls="site-nav" aria-label="Open navigation"><span></span><span></span><span></span></button>
      <nav class="nav" id="site-nav" data-nav aria-label="Primary navigation">
        ${items}
        <a class="btn btn--dark" href="contact.html"${active === "contact.html" ? ' aria-current="page"' : ""}>Contact ${icon("arrowUp")}</a>
      </nav>
    </div>
  </div>
</header>`;
}

function footer() {
  return `<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <a class="brand" href="index.html" aria-label="4GHR Investment Limited home">
          <span class="brand-mark">4G</span>
          <span class="brand-text">4GHR<small>Investment Limited</small></span>
        </a>
        <p>Electrical, specialist electrical, and civil contracting for projects across Tanzania. Registered with the Contractors Registration Board as a local contractor.</p>
      </div>
      <div class="footer-col">
        <h2>Navigate</h2>
        <a href="index.html">Home</a>
        <a href="services.html">Services</a>
        <a href="projects.html">Projects</a>
        <a href="about.html">About</a>
        <a href="contact.html">Contact</a>
      </div>
      <div class="footer-col">
        <h2>Services</h2>
        <a href="services.html#electrical">Electrical works</a>
        <a href="services.html#specialist">Specialist electrical</a>
        <a href="services.html#civil">Civil contracting</a>
        <a href="services.html#coordination">Combined scopes</a>
      </div>
      <div class="footer-col">
        <h2>Contact</h2>
        <a href="tel:${SITE.phoneHref}">${SITE.phone}</a>
        <a href="mailto:${SITE.email}">${SITE.email}</a>
        <address>${SITE.address}. ${SITE.postal}.</address>
        <p class="footer-reg-title">CRB registrations</p>
        <div class="footer-regs" aria-label="CRB registrations">
          ${SITE.registrations
            .map(
              (reg) =>
                `<div class="footer-reg"><span>${reg.discipline} ${reg.class}</span><span>${reg.number}</span></div>`
            )
            .join("")}
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; <span data-year></span> ${SITE.name}. All rights reserved.</p>
      <p>CRB registered local contractor &middot; Tanzania</p>
    </div>
  </div>
</footer>`;
}

function layout({ title, description, path, og, ogAlt, active, jsonld, main, robots }) {
  return `${head({ title, description, path, og, ogAlt, jsonld, robots })}
<body>
${header(active)}
  <main id="main-content">
${main}
  </main>
${footer()}
  <script src="assets/site.js"></script>
</body>
</html>
`;
}

function breadcrumb(label) {
  return `<nav class="breadcrumb" aria-label="Breadcrumb">
  <a href="index.html">Home</a>
  ${icon("chevron")}
  <span aria-current="page">${label}</span>
</nav>`;
}

function pageHero({ label, eyebrow, title, lede, tags = [] }) {
  return `<section class="page-hero">
  <div class="container">
    <p class="eyebrow" data-reveal>${eyebrow}</p>
    <h1 data-reveal>${title}</h1>
    <p class="lede" data-reveal>${lede}</p>
    ${
      tags.length
        ? `<div class="page-hero__meta" data-reveal>${tags
            .map((tag) => `<span class="tag">${tag}</span>`)
            .join("")}</div>`
        : ""
    }
  </div>
</section>`;
}

function sectionHead(eyebrow, title, copy, { plain = false } = {}) {
  return `<div class="section-head">
  <div class="section-head__copy" data-reveal>
    <p class="eyebrow${plain ? " eyebrow--plain" : ""}">${eyebrow}</p>
    <h2>${title}</h2>
  </div>
  ${copy ? `<div data-reveal><p>${copy}</p></div>` : ""}
</div>`;
}

function faqBlock(items) {
  return `<div class="faq" data-reveal>
  ${items
    .map(
      (item) =>
        `<details><summary>${item.q}</summary><p>${item.a}</p></details>`
    )
    .join("")}
</div>`;
}

function faqSchema(items, path = "") {
  return {
    "@type": "FAQPage",
    "@id": SITE.url + path + "#faq",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

function organizationSchema() {
  return {
    "@type": ["GeneralContractor", "LocalBusiness"],
    "@id": SITE.url + "#organization",
    name: SITE.name,
    alternateName: "4GHR",
    url: SITE.url,
    logo: SITE.url + "assets/icon-512.png",
    image: SITE.url + "assets/og/og-home.png",
    legalName: SITE.name,
    description:
      "CRB registered electrical, specialist electrical, and civil contractor based in Dar es Salaam, Tanzania.",
    telephone: SITE.phone,
    email: SITE.email,
    founder: { "@type": "Person", name: SITE.md },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Plot No. 24, Block D, Tembo Street, Wazo Hill Road",
      addressLocality: "Dar es Salaam",
      addressRegion: "Dar es Salaam",
      addressCountry: "TZ",
      postOfficeBoxNumber: "68331",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: SITE.phone,
      email: SITE.email,
      contactType: "customer service",
      areaServed: "TZ",
      availableLanguage: ["English", "Swahili"],
    },
    knowsLanguage: ["English", "Swahili"],
    areaServed: [
      { "@type": "Country", name: "Tanzania" },
      { "@type": "City", name: "Dar es Salaam" },
    ],
    knowsAbout: [
      "Electrical installation",
      "Specialist electrical systems",
      "Civil contracting",
      "Power distribution",
      "Site preparation",
    ],
    identifier: SITE.registrations.map((reg) => ({
      "@type": "PropertyValue",
      name: "CRB " + reg.discipline + " " + reg.class,
      value: reg.number,
    })),
  };
}

function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": SITE.url + "#website",
    url: SITE.url,
    name: SITE.name,
    publisher: { "@id": SITE.url + "#organization" },
    inLanguage: "en",
  };
}

function serviceSchemas() {
  const services = [
    {
      name: "Electrical works",
      description:
        "Power distribution, lighting, containment, earthing, testing, and handover for commercial, institutional, and industrial buildings.",
      url: SITE.url + "services.html#electrical",
    },
    {
      name: "Specialist electrical",
      description:
        "Control panels, protection and metering, low-voltage systems, equipment connections, and documented testing for technical packages.",
      url: SITE.url + "services.html#specialist",
    },
    {
      name: "Civil contracting",
      description:
        "Site preparation, excavation, concrete works, drainage, access, and external works for project sites.",
      url: SITE.url + "services.html#civil",
    },
  ];
  return services.map((service) => ({
    "@type": "Service",
    "@id": service.url,
    name: service.name,
    description: service.description,
    serviceType: service.name,
    provider: { "@id": SITE.url + "#organization" },
    areaServed: { "@type": "Country", name: "Tanzania" },
    url: service.url,
  }));
}

function breadcrumbSchema(label, path) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: label,
        item: SITE.url + path,
      },
    ],
  };
}

function ctaBand() {
  return `<section class="cta-band" aria-labelledby="cta-title">
  <div class="container cta-band__grid">
    <div data-reveal>
      <p class="eyebrow">Start the conversation</p>
      <h2 id="cta-title">Send the scope. We will return a clear next step.</h2>
      <p>Project briefs are reviewed within one working day. Include drawings, site notes, or programme dates if you have them.</p>
      <div class="cta-band__meta">
        <span class="tag">Electrical</span>
        <span class="tag">Specialist electrical</span>
        <span class="tag">Civil</span>
      </div>
    </div>
    <div class="cta-band__actions" data-reveal>
      <a class="btn btn--light" href="contact.html">Send the brief ${icon("arrowUp")}</a>
      <a class="btn btn--outline-light" href="tel:${SITE.phoneHref}">Call ${SITE.phone}</a>
    </div>
  </div>
</section>`;
}

function ticker() {
  const items = [
    "Electrical works",
    "Specialist electrical",
    "Civil contracting",
    "CRB registered",
    "Tanzania",
    "Dar es Salaam",
    "Commercial buildings",
    "Institutional facilities",
  ];
  const group = `<div class="ticker__group" aria-hidden="true">${items
    .map((item) => `<span class="ticker__item">${item}</span>`)
    .join("")}</div>`;
  return `<div class="ticker">
  <p class="sr-only">Working across Tanzania from the Dar es Salaam base.</p>
  <div class="ticker__track">${group}${group}</div>
</div>`;
}

function processSteps(steps) {
  return `<div class="process">
  ${steps
    .map(
      (step, index) => `<div class="step" data-reveal>
    <span class="step__num">0${index + 1}</span>
    <h3>${step.title}</h3>
    <p>${step.copy}</p>
  </div>`
    )
    .join("")}
</div>`;
}

/* ------------------------------------------------------------------ Home */

const homeFaqs = [
  {
    q: "Which work can 4GHR take on?",
    a: "Registered scope covers electrical works, specialist electrical works, and civil contracting. A single project can combine the three where the interfaces need one team.",
  },
  {
    q: "Where does 4GHR operate?",
    a: "The company works from Dar es Salaam and takes projects across Tanzania.",
  },
  {
    q: "How does a project brief work?",
    a: "Send the location, scope, drawings or notes, and programme. We review the information and reply within one working day with the next step or a request for missing detail.",
  },
  {
    q: "Can 4GHR join a project that is already on site?",
    a: "Yes, where access, documentation, and the remaining scope can be assessed. Share the current position and we will confirm what can be taken on.",
  },
  {
    q: "What happens at handover?",
    a: "Completed works are handed over with test results, as-built notes, and a list of outstanding items where applicable.",
  },
];

const homeMain = `
<section class="hero">
  <div class="container hero-grid">
    <div class="hero-copy">
      <p class="eyebrow hero-eyebrow" data-reveal>CRB registered local contractor &middot; Tanzania</p>
      <h1 data-reveal>Electrical and civil contracting for projects across Tanzania.</h1>
      <p class="lede hero-lede" data-reveal>4GHR Investment Limited installs power, lighting, and specialist electrical systems and delivers civil works for commercial, institutional, and industrial projects. One registered contractor carries the scope from the first site review to handover.</p>
      <div class="hero-actions" data-reveal>
        <a class="btn btn--dark" href="contact.html">Send the brief ${icon("arrowUp")}</a>
        <a class="btn btn--ghost" href="services.html">Explore services ${icon("arrow")}</a>
      </div>
      <div class="hero-notes" data-reveal>
        <span class="tag">Electrical Class 5</span>
        <span class="tag">Specialist Electrical Class 3</span>
        <span class="tag">Civil Class 5</span>
      </div>
    </div>
    <div class="hero-media" data-reveal>
      <div class="hero-media__frame">
        ${img("home-hero", { eager: true })}
        <span class="hero-badge">${icon("shield")} CRB registered</span>
        <div class="crb-card">
          <div class="crb-card__head"><span>Registration record</span><span>CRB Tanzania</span></div>
          <dl class="crb-list">
            ${SITE.registrations
              .map(
                (reg) =>
                  `<div class="crb-row"><dt>${reg.discipline}</dt><dd>${reg.number}</dd></div>`
              )
              .join("")}
          </dl>
        </div>
      </div>
    </div>
  </div>
</section>
${ticker()}
<section class="section">
  <div class="container">
    ${sectionHead(
      "What we do",
      "Three registered disciplines, one delivery team.",
      "Electrical, specialist electrical, and civil scopes are planned together, so interfaces, access, and sequencing are resolved before crews mobilise."
    )}
    <div class="grid-3">
      <article class="card service-card" data-reveal>
        <div class="card__top"><span class="icon-pill">${icon("zap")}</span><span class="card__num">01</span></div>
        <h3>Electrical works</h3>
        <p>Power distribution, lighting, containment, earthing, and building electrical installations, coordinated with the structure and the trades working around them.</p>
        <a class="link-arrow" href="services.html#electrical">Electrical scope ${icon("arrow")}</a>
      </article>
      <article class="card service-card card--field" data-reveal>
        <div class="card__top"><span class="icon-pill">${icon("circuit")}</span><span class="card__num">02</span></div>
        <h3>Specialist electrical</h3>
        <p>Technical packages that need tighter design review, documented testing, and controlled installation across control, protection, and low-voltage systems.</p>
        <a class="link-arrow" href="services.html#specialist">Specialist scope ${icon("arrow")}</a>
      </article>
      <article class="card service-card" data-reveal>
        <div class="card__top"><span class="icon-pill">${icon("hardhat")}</span><span class="card__num">03</span></div>
        <h3>Civil contracting</h3>
        <p>Site preparation, groundworks, concrete, drainage, and access works that give the electrical programme a reliable base.</p>
        <a class="link-arrow" href="services.html#civil">Civil scope ${icon("arrow")}</a>
      </article>
    </div>
  </div>
</section>
<section class="section section--tight">
  <div class="container split">
    <div class="media media--landscape" data-reveal>
      ${img("home-approach")}
      <div class="media__caption"><span>The site team</span><span>Local delivery</span></div>
    </div>
    <div class="split__copy" data-reveal>
      <p class="eyebrow">How we work</p>
      <h2>The scope is settled before the site gets busy.</h2>
      <p class="lede">Every package starts with a review of drawings, site conditions, programme, and the decisions that still sit open. We price and plan against the information that exists, and we record what changes.</p>
      <p>That review happens before materials are ordered and before crews are committed, which keeps the programme honest from the first week.</p>
      <ul class="check-list">
        <li>${icon("check")}<span><strong>Single point of contact.</strong> The managing director stays accountable for scope, programme, and close-out.</span></li>
        <li>${icon("check")}<span><strong>Interfaces settled early.</strong> Containment, trenches, equipment access, and other trades are coordinated before work starts.</span></li>
        <li>${icon("check")}<span><strong>Records that survive handover.</strong> Test results, as-built notes, and outstanding items are compiled as the work progresses.</span></li>
      </ul>
      <div class="split__actions">
        <a class="btn btn--dark" href="projects.html">See how we deliver ${icon("arrow")}</a>
        <a class="btn btn--ghost" href="about.html">About 4GHR</a>
      </div>
    </div>
  </div>
</section>
<section class="section--white section--tight section">
  <div class="container">
    ${sectionHead(
      "Company at a glance",
      "A Dar es Salaam base with a national working area.",
      "The company works from Plot No. 24, Block D, Tembo Street, Wazo Hill Road and mobilises to projects across Tanzania."
    )}
    <div class="stats" data-reveal>
      <div class="stat"><strong>3</strong><span>CRB registrations across electrical, specialist electrical, and civil work</span></div>
      <div class="stat"><strong>TZ</strong><span>Registered local contractor, based in Dar es Salaam</span></div>
      <div class="stat"><strong>1</strong><span>Accountable contact from the first brief through to handover</span></div>
    </div>
    <div class="page-hero__meta" style="margin-top:28px" data-reveal>
      <span class="tag">Dar es Salaam</span>
      <span class="tag">Tanzania</span>
      <span class="tag">Projects nationwide</span>
    </div>
  </div>
</section>
<section class="section">
  <div class="container">
    ${sectionHead(
      "Delivery sequence",
      "A sequence that keeps decisions visible.",
      "The same four stages apply to a single installation and to a multi-discipline package."
    )}
    ${processSteps([
      {
        title: "Brief review",
        copy: "Drawings, site conditions, programme, and the decisions already made are reviewed together.",
      },
      {
        title: "Scope and price",
        copy: "The package is defined with inclusions, exclusions, interfaces, and the information still required.",
      },
      {
        title: "Coordinated delivery",
        copy: "Materials, access, labour, and testing are scheduled around the site and the other trades.",
      },
      {
        title: "Handover record",
        copy: "Test results, as-built information, and outstanding items are issued with the completed works.",
      },
    ])}
  </div>
</section>
<section class="section section--tight">
  <div class="container">
    ${sectionHead(
      "Project sectors",
      "Where our disciplines fit.",
      "Three project environments where electrical and civil scopes meet. Each one is planned around access, occupancy, and the programme you are working to."
    )}
    <div class="sector-grid">
      <a class="sector-card" href="projects.html" data-reveal>
        <div class="sector-card__media">
          ${img("home-sector-commercial")}
          <span class="tag tag--glass">Commercial</span>
        </div>
        <div class="sector-card__body">
          <h3>Commercial buildings</h3>
          <p>Offices, retail, and mixed-use buildings where distribution, lighting, and fit-out need to be sequenced around occupation.</p>
          <span class="link-arrow">Commercial capability ${icon("arrow")}</span>
        </div>
      </a>
      <a class="sector-card" href="projects.html" data-reveal>
        <div class="sector-card__media">
          ${img("home-sector-electrical")}
          <span class="tag tag--glass">Electrical</span>
        </div>
        <div class="sector-card__body">
          <h3>Electrical and control systems</h3>
          <p>Control panels, switchgear, lighting, and power distribution for buildings that need reliable electrical infrastructure.</p>
          <span class="link-arrow">Electrical capability ${icon("arrow")}</span>
        </div>
      </a>
      <a class="sector-card" href="projects.html" data-reveal>
        <div class="sector-card__media">
          ${img("home-sector-civil")}
          <span class="tag tag--glass">Civil</span>
        </div>
        <div class="sector-card__body">
          <h3>Civil and site works</h3>
          <p>Ground preparation, access, concrete bases, and drainage that release the site for the trades that follow.</p>
          <span class="link-arrow">Civil capability ${icon("arrow")}</span>
        </div>
      </a>
    </div>
    <div style="margin-top:30px" data-reveal>
      <a class="btn btn--ghost" href="projects.html">View all capability profiles ${icon("arrow")}</a>
    </div>
  </div>
</section>
<section class="section--white section section--tight">
  <div class="container">
    ${sectionHead(
      "Why 4GHR",
      "What a local contractor should make easier.",
      "The value is in how the work is set up, priced, coordinated, and closed."
    )}
    <div class="grid-3">
      <article class="card card--solid" data-reveal>
        <span class="icon-pill">${icon("shield")}</span>
        <h3>Registration you can verify</h3>
        <p>Electrical Class 5, Specialist Electrical Class 3, and Civil Class 5 records are held with the Contractors Registration Board.</p>
      </article>
      <article class="card card--solid" data-reveal>
        <span class="icon-pill">${icon("pin")}</span>
        <h3>Local mobilisation</h3>
        <p>Our base in Dar es Salaam keeps labour, materials, and site attendance close to the work.</p>
      </article>
      <article class="card card--solid" data-reveal>
        <span class="icon-pill">${icon("clipboard")}</span>
        <h3>Scope held in one place</h3>
        <p>The same team reviews the drawings, prices the works, runs the site, and closes the package.</p>
      </article>
    </div>
  </div>
</section>
<section class="section">
  <div class="container container--narrow">
    ${sectionHead("Common questions", "Before the first site visit.", "", { plain: true })}
    ${faqBlock(homeFaqs)}
  </div>
</section>
${ctaBand()}
`;

/* -------------------------------------------------------------- Services */

const serviceFaqs = [
  {
    q: "How do I know which service applies?",
    a: "Send the project location, a short description of the work, and any drawings or photographs available. The first review confirms whether electrical, specialist electrical, or civil should lead, or whether the scope should be combined.",
  },
  {
    q: "Can electrical and civil work be priced together?",
    a: "Yes. When the workstreams share trenches, access, or a commissioning date, a combined package makes the interfaces and the programme easier to control.",
  },
  {
    q: "What should a request for pricing include?",
    a: "Include the scope, drawings or specifications, quantities where available, site location, programme dates, procurement status, and any condition that affects access or working hours.",
  },
  {
    q: "Who tests and commissions the electrical installation?",
    a: "4GHR carries out the testing defined in the scope and supports third-party commissioning where the project requires it. Results and outstanding items are issued at handover.",
  },
];

const servicesMain = `
${pageHero({
  label: "Services",
  eyebrow: "Electrical, specialist electrical, civil",
  title: "Electrical, specialist electrical, and civil services.",
  lede: "Three registered disciplines, delivered as separate packages or as one coordinated scope. Each service sets out what is included, what we need from you, and how the work is handed over.",
  tags: ["CRB Electrical Class 5", "Specialist Electrical Class 3", "Civil Class 5"],
})}
<section class="section" id="electrical">
  <div class="container split">
    <div class="media media--landscape" data-reveal>
      ${img("services-electrical")}
      <div class="media__caption"><span>Distribution and lighting</span><span>Service 01</span></div>
    </div>
    <div class="split__copy" data-reveal>
      <p class="eyebrow">Service 01 &middot; CRB Electrical Class 5</p>
      <h2>Electrical works</h2>
      <p class="lede">4GHR installs the electrical systems that make a building usable: distribution boards, sub-mains, final circuits, lighting, containment, earthing, and the testing that proves the installation.</p>
      <p>Work is coordinated with the structural and services trades from the first site visit, so routes, penetrations, and access are agreed before containment goes in.</p>
      <ul class="check-list">
        <li>${icon("check")}Power distribution and sub-main installation</li>
        <li>${icon("check")}Internal and external lighting systems</li>
        <li>${icon("check")}Cable containment, trunking, and support systems</li>
        <li>${icon("check")}Earthing, bonding, and protection checks</li>
        <li>${icon("check")}Testing, commissioning support, and handover records</li>
      </ul>
      <div class="split__actions">
        <a class="btn btn--dark" href="contact.html?service=Electrical%20works">Send the electrical scope ${icon("arrowUp")}</a>
        <a class="btn btn--ghost" href="#coordination">Combined scopes</a>
      </div>
    </div>
  </div>
</section>
<section class="section--white section section--tight" id="specialist">
  <div class="container split split--reverse">
    <div class="split__copy" data-reveal>
      <p class="eyebrow">Service 02 &middot; CRB Specialist Electrical Class 3</p>
      <h2>Specialist electrical</h2>
      <p class="lede">Specialist packages carry more technical risk than a standard fit-out. 4GHR takes on control panels, protection systems, low-voltage installations, and equipment connections where design intent, testing, and documentation need to be held together.</p>
      <p>The package is reviewed against the drawings before mobilisation. Any gap between design and site conditions is raised while it can still be resolved on paper.</p>
      <ul class="check-list">
        <li>${icon("check")}Control and distribution panel installation</li>
        <li>${icon("check")}Protection, metering, and low-voltage systems</li>
        <li>${icon("check")}Equipment power connections and isolation</li>
        <li>${icon("check")}Factory and site acceptance test support</li>
        <li>${icon("check")}Technical records for commissioning and handover</li>
      </ul>
      <div class="split__actions">
        <a class="btn btn--dark" href="contact.html?service=Specialist%20electrical">Send the specialist scope ${icon("arrowUp")}</a>
        <a class="btn btn--ghost" href="projects.html">See project sectors</a>
      </div>
    </div>
    <div class="media media--landscape" data-reveal>
      ${img("services-specialist")}
      <div class="media__caption"><span>Control and protection</span><span>Service 02</span></div>
    </div>
  </div>
</section>
<section class="section" id="civil">
  <div class="container split">
    <div class="media media--landscape" data-reveal>
      ${img("services-civil")}
      <div class="media__caption"><span>Ground and concrete works</span><span>Service 03</span></div>
    </div>
    <div class="split__copy" data-reveal>
      <p class="eyebrow">Service 03 &middot; CRB Civil Class 5</p>
      <h2>Civil contracting</h2>
      <p class="lede">Civil works prepare the ground and the structure for everything that follows. 4GHR delivers site clearance, excavation, concrete works, drainage, access, and external works for commercial and institutional projects.</p>
      <p>Sequencing is set with the electrical programme where trenches, ducts, and equipment bases share the same ground.</p>
      <ul class="check-list">
        <li>${icon("check")}Site preparation and clearance</li>
        <li>${icon("check")}Excavation, backfill, and compaction</li>
        <li>${icon("check")}Concrete foundations, bases, and slabs</li>
        <li>${icon("check")}Drainage, ducts, and service trenches</li>
        <li>${icon("check")}Access roads, hardstanding, and external works</li>
      </ul>
      <div class="split__actions">
        <a class="btn btn--dark" href="contact.html?service=Civil%20contracting">Send the civil scope ${icon("arrowUp")}</a>
        <a class="btn btn--ghost" href="#coordination">Combined scopes</a>
      </div>
    </div>
  </div>
</section>
<section class="section--white section section--tight" id="coordination">
  <div class="container split split--reverse">
    <div class="split__copy" data-reveal>
      <p class="eyebrow">Combined scopes</p>
      <h2>One programme when the disciplines meet.</h2>
      <p class="lede">Electrical and civil work often share trenches, access routes, and commissioning dates. Running both under one contractor removes the gap between two programmes that were never set against each other.</p>
      <ul class="check-list">
        <li>${icon("check")}One joint site inspection before pricing</li>
        <li>${icon("check")}One programme covering trenches, bases, containment, and testing</li>
        <li>${icon("check")}One close-out file with the records for both disciplines</li>
      </ul>
      <div class="split__actions">
        <a class="btn btn--dark" href="contact.html?service=Combined%20scope">Send the combined scope ${icon("arrowUp")}</a>
      </div>
    </div>
    <div class="media media--landscape" data-reveal>
      ${img("services-coordination")}
      <div class="media__caption"><span>Coordinated delivery</span><span>Interfaces</span></div>
    </div>
  </div>
</section>
<section class="section">
  <div class="container">
    ${sectionHead(
      "Delivery stages",
      "How a service package moves from brief to handover.",
      "The sequence is fixed. The detail inside each stage changes with the scope."
    )}
    ${processSteps([
      {
        title: "Review",
        copy: "Drawings, specifications, site access, and the programme are reviewed in one pass.",
      },
      {
        title: "Price",
        copy: "The priced scope sets out inclusions, exclusions, assumptions, and the information still needed.",
      },
      {
        title: "Deliver",
        copy: "Materials, labour, testing, and site coordination follow the agreed sequence.",
      },
      {
        title: "Hand over",
        copy: "Test results, as-built notes, and outstanding items are issued with the completed package.",
      },
    ])}
  </div>
</section>
<section class="section--white section section--tight">
  <div class="container">
    ${sectionHead(
      "Priced scope",
      "What a 4GHR priced scope contains.",
      "A useful priced scope answers the questions that appear on site as well as the question of price."
    )}
    <div class="grid-3">
      <article class="card card--solid" data-reveal>
        <span class="card__num">01</span>
        <h3>Defined inclusions</h3>
        <p>The work items, quantities, materials, and responsibilities that sit inside the package.</p>
      </article>
      <article class="card card--solid" data-reveal>
        <span class="card__num">02</span>
        <h3>Stated assumptions</h3>
        <p>Site conditions, access, working hours, and information that the price relies on.</p>
      </article>
      <article class="card card--solid" data-reveal>
        <span class="card__num">03</span>
        <h3>Programme and payment</h3>
        <p>Key dates, procurement lead times, testing stages, and the payment milestones attached to them.</p>
      </article>
    </div>
  </div>
</section>
<section class="section">
  <div class="container container--narrow">
    ${sectionHead("Service questions", "Choose the right starting point.", "", { plain: true })}
    ${faqBlock(serviceFaqs)}
  </div>
</section>
${ctaBand()}
`;

/* -------------------------------------------------------------- Projects */

const projectFaqs = [
  {
    q: "Does this page list completed projects?",
    a: "This page sets out the sectors and scopes 4GHR takes on. Project references are shared on request once the scope and client permission are confirmed.",
  },
  {
    q: "Can 4GHR work inside a main contractor's programme?",
    a: "Yes. The package is set against the main programme, with access, hold points, and handover dates agreed before mobilisation.",
  },
  {
    q: "How are interfaces with other trades priced?",
    a: "Interfaces are listed in the scope with the assumed division of responsibility. The priced scope states what 4GHR provides and what must come from other parties.",
  },
  {
    q: "What if the drawings are incomplete?",
    a: "Send what exists. We identify the missing information, price the defined work, and note the items that need a decision before work starts.",
  },
];

function projectCard({ category, tags, title, copy, scope, slot, service }) {
  return `<article class="project-card" data-category="${category}" data-reveal>
  <div class="project-card__media">
    ${img(slot)}
    <div class="project-card__tags">${tags
      .map((tag) => `<span class="tag tag--glass">${tag}</span>`)
      .join("")}</div>
  </div>
  <div class="project-card__body">
    <h3>${title}</h3>
    <p>${copy}</p>
    <div class="project-card__scope">${scope
      .map((item) => `<span>${item}</span>`)
      .join("")}</div>
    <a class="link-arrow" href="contact.html?service=${encodeURIComponent(service)}">Discuss this scope ${icon("arrow")}</a>
  </div>
</article>`;
}

const projectsMain = `
${pageHero({
  label: "Projects",
  eyebrow: "Project capability",
  title: "Project sectors where electrical and civil scopes meet.",
  lede: "Capability profiles for the environments we work in. Use them to check fit, then send the site information for a scoped response.",
  tags: ["Commercial", "Institutional", "Industrial", "Power", "Civil", "Technical fit-out"],
})}
<section class="section" id="sectors">
  <div class="container">
    <div class="section-head">
      <div class="section-head__copy" data-reveal>
        <p class="eyebrow">Capability profiles</p>
        <h2>Six project environments, three registered disciplines.</h2>
      </div>
      <div data-reveal>
        <p>Use the filter to narrow the profiles by discipline. Each card lists the scope 4GHR can carry and the route to a priced response.</p>
      </div>
    </div>
    <div class="filter" role="group" aria-label="Filter capability profiles by discipline">
      <button class="filter__btn" type="button" data-filter-value="all" aria-pressed="true">All profiles</button>
      <button class="filter__btn" type="button" data-filter-value="electrical" aria-pressed="false">Electrical</button>
      <button class="filter__btn" type="button" data-filter-value="specialist" aria-pressed="false">Specialist electrical</button>
      <button class="filter__btn" type="button" data-filter-value="civil" aria-pressed="false">Civil</button>
    </div>
    <p class="filter-status" data-filter-status aria-live="polite">6 of 6 capability profiles shown</p>
    <div class="project-grid">
      ${projectCard({
        category: "electrical specialist",
        tags: ["Commercial"],
        title: "Commercial buildings",
        copy: "Offices, retail, and mixed-use buildings where distribution, lighting, and tenant fit-out need to be sequenced around occupation.",
        scope: ["Distribution", "Lighting", "Containment"],
        slot: "projects-commercial",
        service: "Electrical works",
      })}
      ${projectCard({
        category: "electrical civil",
        tags: ["Institutional"],
        title: "Institutional facilities",
        copy: "Schools, clinics, and public buildings where works must respect operating hours, security, and the safety of building users.",
        scope: ["Power", "Earthing", "External works"],
        slot: "projects-institutional",
        service: "Combined scope",
      })}
      ${projectCard({
        category: "specialist electrical",
        tags: ["Industrial"],
        title: "Industrial and warehouse",
        copy: "Production and storage sites where equipment connections, protection, and high-bay lighting are planned around operating plant.",
        scope: ["Low-voltage systems", "Equipment power", "Testing"],
        slot: "projects-industrial",
        service: "Specialist electrical",
      })}
      ${projectCard({
        category: "electrical specialist",
        tags: ["Power"],
        title: "Power and distribution",
        copy: "Sub-main distribution, transformer connections, and metering packages delivered with the documentation needed for energisation.",
        scope: ["Sub-mains", "Metering", "Commissioning"],
        slot: "projects-power",
        service: "Specialist electrical",
      })}
      ${projectCard({
        category: "civil",
        tags: ["Civil"],
        title: "Site and civil works",
        copy: "Clearance, excavation, concrete bases, drainage, and access works that release the site for the trades that follow.",
        scope: ["Groundworks", "Concrete", "Drainage"],
        slot: "projects-civil",
        service: "Civil contracting",
      })}
      ${projectCard({
        category: "specialist",
        tags: ["Fit-out"],
        title: "Commercial fit-out",
        copy: "Office and retail interiors where power, lighting, containment, and equipment connections are installed around an occupied building.",
        scope: ["Power", "Lighting", "Containment"],
        slot: "projects-fitout",
        service: "Specialist electrical",
      })}
    </div>
  </div>
</section>
<section class="section--white section">
  <div class="container">
    ${sectionHead(
      "Delivery sequence",
      "From site review to completion record.",
      "The sequence is set before mobilisation so the site team, the other trades, and the client work to the same dates."
    )}
    ${processSteps([
      {
        title: "Site and scope review",
        copy: "Access, existing services, occupied areas, and the work that must be protected are recorded.",
      },
      {
        title: "Package definition",
        copy: "The scope, interfaces, responsibilities, and documentation are confirmed with the project team.",
      },
      {
        title: "Coordinated delivery",
        copy: "Materials, labour, testing, and access are scheduled against the main programme.",
      },
      {
        title: "Completion records",
        copy: "Test results, as-built notes, and outstanding items are issued at handover.",
      },
    ])}
  </div>
</section>
<section class="section">
  <div class="container split">
    <div class="split__copy" data-reveal>
      <p class="eyebrow">A useful brief</p>
      <h2>Information that turns a request into a priced scope.</h2>
      <p class="lede">The fastest route to a useful response is a brief that covers the site, the work, and the dates. You do not need a finished package to start the conversation.</p>
      <div class="split__actions">
        <a class="btn btn--dark" href="contact.html">Send the brief ${icon("arrowUp")}</a>
        <a class="btn btn--ghost" href="contact.html">Ask a question</a>
      </div>
    </div>
    <div class="grid-2" data-reveal>
      <article class="card card--solid">
        <span class="icon-pill">${icon("pin")}</span>
        <h3>Site and access</h3>
        <p>Location, access routes, working hours, security, and any restriction on deliveries.</p>
      </article>
      <article class="card card--solid">
        <span class="icon-pill">${icon("file")}</span>
        <h3>Drawings and specifications</h3>
        <p>Layouts, single-line diagrams, schedules, and specifications with their revision status.</p>
      </article>
      <article class="card card--solid">
        <span class="icon-pill">${icon("clock")}</span>
        <h3>Programme and procurement</h3>
        <p>Start date, milestones, procurement route, and the decisions already approved.</p>
      </article>
      <article class="card card--solid">
        <span class="icon-pill">${icon("ruler")}</span>
        <h3>Budget and constraints</h3>
        <p>Approved budget range, payment terms, and any site condition that affects cost.</p>
      </article>
    </div>
  </div>
</section>
<section class="section--white section section--tight">
  <div class="container container--narrow">
    ${sectionHead("Project questions", "Useful answers before mobilisation.", "", { plain: true })}
    ${faqBlock(projectFaqs)}
  </div>
</section>
${ctaBand()}
`;

/* ----------------------------------------------------------------- About */

const aboutFaqs = [
  {
    q: "Is 4GHR a local contractor?",
    a: "Yes. The company is registered in the local contractor category with the Contractors Registration Board.",
  },
  {
    q: "What do the three registrations cover?",
    a: "The records cover Electrical Class 5, Specialist Electrical Class 3, and Civil Class 5. Each record carries its own registration number.",
  },
  {
    q: "Who is accountable for a project?",
    a: "Managing Director Haikamen Mshiu is the direct point of contact for scope, programme, and commercial decisions.",
  },
  {
    q: "Can clients verify the registrations?",
    a: "Yes. The records can be checked in the Contractors Registration Board directory before award.",
  },
];

const aboutMain = `
${pageHero({
  label: "About",
  eyebrow: "Company profile",
  title: "A local contractor organised around accountability.",
  lede: "4GHR Investment Limited holds three Contractors Registration Board records and works from Dar es Salaam on electrical, specialist electrical, and civil packages across Tanzania.",
  tags: ["Local contractor category", "Dar es Salaam", "Managing Director: Haikamen Mshiu"],
})}
<section class="section">
  <div class="container split">
    <div class="media media--landscape" data-reveal>
      ${img("about-team")}
      <div class="media__caption"><span>Project team review</span><span>4GHR</span></div>
    </div>
    <div class="split__copy" data-reveal>
      <p class="eyebrow">The company</p>
      <h2>Registered locally. Set up to coordinate.</h2>
      <p class="lede">The company is led by Managing Director Haikamen Mshiu. Its registration records cover Electrical Class 5, Specialist Electrical Class 3, and Civil Class 5 under the local contractor category.</p>
      <p>That spread is deliberate. Electrical and civil work interact on most sites, and one contractor can settle trenches, bases, containment, and access before those decisions become site problems.</p>
      <ul class="check-list">
        <li>${icon("check")}<span><strong>Company:</strong> 4GHR Investment Limited</span></li>
        <li>${icon("check")}<span><strong>Managing Director:</strong> Haikamen Mshiu</span></li>
        <li>${icon("check")}<span><strong>Category:</strong> Local contractor</span></li>
        <li>${icon("check")}<span><strong>Base:</strong> Dar es Salaam, Tanzania</span></li>
        <li>${icon("check")}<span><strong>Postal address:</strong> ${SITE.postal}</span></li>
      </ul>
      <div class="split__actions">
        <a class="btn btn--dark" href="contact.html">Contact the team ${icon("arrowUp")}</a>
        <a class="btn btn--ghost" href="services.html">View services</a>
      </div>
    </div>
  </div>
</section>
<section class="section--white section section--tight">
  <div class="container">
    ${sectionHead(
      "Verified registration",
      "Three CRB records behind the work.",
      "Each record carries its own discipline, class, and registration number. Clients can check current status in the Contractors Registration Board directory before award."
    )}
    <div class="table-wrap" data-reveal>
      <table class="table">
        <caption>Contractors Registration Board records for 4GHR Investment Limited</caption>
        <thead>
          <tr><th scope="col">Discipline</th><th scope="col">Class</th><th scope="col">Registration number</th><th scope="col">Category</th></tr>
        </thead>
        <tbody>
          ${SITE.registrations
            .map(
              (reg) =>
                `<tr><td>${reg.discipline}</td><td>${reg.class}</td><td>${reg.number}</td><td>Local contractor</td></tr>`
            )
            .join("")}
        </tbody>
      </table>
    </div>
    <div style="margin-top:24px" data-reveal>
      <a class="btn btn--ghost" href="https://www.crb.go.tz/" target="_blank" rel="noopener noreferrer">Check the CRB directory ${icon("arrowUp")}</a>
    </div>
  </div>
</section>
<section class="section">
  <div class="container">
    ${sectionHead(
      "Working principles",
      "Four habits that hold a package together.",
      "The way the company works is consistent across every discipline and every project size."
    )}
    <div class="grid-4">
      <article class="card card--solid" data-reveal>
        <div class="card__top"><span class="icon-pill">${icon("users")}</span><span class="card__num">01</span></div>
        <h3>Listen first</h3>
        <p>Site conditions, building use, and the decisions already made are reviewed before a price is offered.</p>
      </article>
      <article class="card card--solid" data-reveal>
        <div class="card__top"><span class="icon-pill">${icon("file")}</span><span class="card__num">02</span></div>
        <h3>Make scope visible</h3>
        <p>Inclusions, exclusions, interfaces, and assumptions are written into the priced scope in plain language.</p>
      </article>
      <article class="card card--solid" data-reveal>
        <div class="card__top"><span class="icon-pill">${icon("message")}</span><span class="card__num">03</span></div>
        <h3>Communicate directly</h3>
        <p>One accountable contact answers questions and records the decisions that change the work.</p>
      </article>
      <article class="card card--solid" data-reveal>
        <div class="card__top"><span class="icon-pill">${icon("clipboard")}</span><span class="card__num">04</span></div>
        <h3>Close with a record</h3>
        <p>Test results, as-built notes, and outstanding items are issued as part of handover.</p>
      </article>
    </div>
  </div>
</section>
<section class="section--white section section--tight">
  <div class="container split split--reverse">
    <div class="split__copy" data-reveal>
      <p class="eyebrow">Working area</p>
      <h2>Dar es Salaam base. Tanzanian working area.</h2>
      <p class="lede">Projects outside Dar es Salaam are planned around travel, supervision, material delivery, and the sequence the site can support.</p>
      <p>The first step is a site visit or a documented site review. The mobilisation plan follows, covering accommodation, transport, and delivery lead times.</p>
      <div class="page-hero__meta" style="margin-top:24px">
        <span class="tag">Dar es Salaam</span>
        <span class="tag">Tanzania</span>
      </div>
      <div class="split__actions">
        <a class="btn btn--dark" href="contact.html">Discuss a project ${icon("arrowUp")}</a>
        <a class="btn btn--ghost" href="tel:${SITE.phoneHref}">Call ${SITE.phone}</a>
      </div>
    </div>
    <div class="media media--landscape" data-reveal>
      ${img("about-site")}
      <div class="media__caption"><span>Site review</span><span>Mobilisation planning</span></div>
    </div>
  </div>
</section>
<section class="section">
  <div class="container container--narrow">
    ${sectionHead("About questions", "Company details and verification.", "", { plain: true })}
    ${faqBlock(aboutFaqs)}
  </div>
</section>
${ctaBand()}
`;

/* --------------------------------------------------------------- Contact */

const contactFaqs = [
  {
    q: "How quickly will I hear back?",
    a: "Every project brief is reviewed within one working day. If the scope needs a site visit, the first reply confirms the visit date and what to prepare.",
  },
  {
    q: "Can I send drawings after the brief?",
    a: "Yes. Send the brief first, then reply to the email with drawings, schedules, or photographs. The scope is updated when the information arrives.",
  },
  {
    q: "Does 4GHR work outside Dar es Salaam?",
    a: "Yes. Projects elsewhere in Tanzania are priced with mobilisation, travel, and delivery costs stated separately.",
  },
  {
    q: "What if the scope is not defined yet?",
    a: "Send the project stage and the decision you need to make. The first response defines the information required before a price is issued.",
  },
  {
    q: "Can I call instead of sending the form?",
    a: "Yes. Call +255 754 711 801 or email ceo_4ghri@outlook.com if the project information is already available.",
  },
  {
    q: "Where is the office?",
    a: "Plot No. 24, Block D, Tembo Street, Wazo Hill Road, Dar es Salaam. The postal address is P. O. Box 68331.",
  },
];

const contactMain = `
${pageHero({
  label: "Contact",
  eyebrow: "Contact and project brief",
  title: "Talk to the team that will run the work.",
  lede: "Send the project location, scope, and timing in one pass. Every project brief is reviewed within one working day and answered with a clear next step.",
  tags: ["Phone", "Email", "Dar es Salaam office", "Response within one working day"],
})}
<section class="section">
  <div class="container contact-grid">
    <div data-reveal>
      <p class="eyebrow">Reach the team</p>
      <h2>Details for a direct conversation.</h2>
      <div class="contact-cards" style="margin-top:26px">
        <div class="contact-card">
          <span class="icon-pill">${icon("phone")}</span>
          <h3>Phone</h3>
          <a href="tel:${SITE.phoneHref}">${SITE.phone}</a>
        </div>
        <div class="contact-card">
          <span class="icon-pill">${icon("mail")}</span>
          <h3>Email</h3>
          <a href="mailto:${SITE.email}">${SITE.email}</a>
        </div>
        <div class="contact-card">
          <span class="icon-pill">${icon("pin")}</span>
          <h3>Office</h3>
          <p>${SITE.address}</p>
        </div>
        <div class="contact-card">
          <span class="icon-pill">${icon("file")}</span>
          <h3>Postal address</h3>
          <p>${SITE.postal}</p>
        </div>
        <div class="contact-card contact-card--wide">
          <span class="icon-pill">${icon("route")}</span>
          <h3>Working area</h3>
          <p>Tanzania. The office is in Dar es Salaam.</p>
        </div>
      </div>
      <div class="contact-direct">
        <a class="btn btn--dark" href="tel:${SITE.phoneHref}">Call the office ${icon("phone")}</a>
        <a class="btn btn--ghost" href="mailto:${SITE.email}">Email the team ${icon("mail")}</a>
      </div>
      <div class="aside-card" style="margin-top:12px" data-reveal>
        <h3>What speeds up a priced response</h3>
        <ul class="aside-list">
          <li>${icon("file")}<span>Drawings, schedules, and specifications with revision status</span></li>
          <li>${icon("pin")}<span>Site location, access notes, and any occupied areas</span></li>
          <li>${icon("clock")}<span>Start date, milestones, and procurement route</span></li>
          <li>${icon("clipboard")}<span>The decisions already approved and the items still open</span></li>
        </ul>
      </div>
    </div>
    <form class="form-card" data-form data-form-kind="Project brief" data-email="${SITE.email}" action="mailto:${SITE.email}" method="post" enctype="text/plain" novalidate>
      <p class="eyebrow">Project brief</p>
      <h2>Tell us what the work needs.</h2>
      <p class="form-card__intro">Submitting prepares an email addressed to ${SITE.email}. The summary stays on this page so you can check it before sending.</p>
      <div class="field-row">
        <div class="field">
          <label for="contact-name">Full name <span class="req">*</span></label>
          <input id="contact-name" name="name" type="text" autocomplete="name" required>
        </div>
        <div class="field">
          <label for="contact-company">Company</label>
          <input id="contact-company" name="company" type="text" autocomplete="organization">
        </div>
      </div>
      <div class="field-row">
        <div class="field">
          <label for="contact-email">Email address <span class="req">*</span></label>
          <input id="contact-email" name="email" type="email" autocomplete="email" required>
        </div>
        <div class="field">
          <label for="contact-phone">Phone number <span class="req">*</span></label>
          <input id="contact-phone" name="phone" type="tel" autocomplete="tel" required>
        </div>
      </div>
      <div class="field">
        <label for="contact-service">Primary service <span class="req">*</span></label>
        <select id="contact-service" name="service" required>
          <option value="">Select a service</option>
          <option>Electrical works</option>
          <option>Specialist electrical</option>
          <option>Civil contracting</option>
          <option>Combined scope</option>
          <option>Not sure yet</option>
        </select>
      </div>
      <div class="field-row">
        <div class="field">
          <label for="contact-location">Project location <span class="req">*</span></label>
          <select id="contact-location" name="location" required>
            <option value="">Select a location</option>
            <option>Dar es Salaam</option>
            <option>Elsewhere in Tanzania</option>
          </select>
        </div>
        <div class="field">
          <label for="contact-stage">Project stage</label>
          <select id="contact-stage" name="stage">
            <option value="">Select a stage</option>
            <option>Planning and budgeting</option>
            <option>Design in progress</option>
            <option>Tender or procurement</option>
            <option>Work ready to start</option>
            <option>Already on site</option>
          </select>
        </div>
      </div>
      <div class="field-row">
        <div class="field">
          <label for="contact-programme">Programme window</label>
          <input id="contact-programme" name="programme" type="text" placeholder="Start on site in March 2027">
        </div>
        <div class="field">
          <label for="contact-budget">Budget range</label>
          <select id="contact-budget" name="budget">
            <option value="">Select a range</option>
            <option>Below TZS 25 million</option>
            <option>TZS 25 to 75 million</option>
            <option>TZS 75 to 250 million</option>
            <option>Above TZS 250 million</option>
            <option>Not yet defined</option>
          </select>
        </div>
      </div>
      <div class="field">
        <label for="contact-scope">Scope description <span class="req">*</span></label>
        <textarea id="contact-scope" name="scope" required placeholder="Work to be installed, building type, site conditions, and the outcome you need."></textarea>
      </div>
      <div class="field">
        <label for="contact-drawings">Drawings or site photographs</label>
        <input id="contact-drawings" name="drawings" type="url" placeholder="Link to drawings, schedules, or site photographs">
      </div>
      <label class="consent">
        <input type="checkbox" name="consent" value="agreed" required>
        <span>I agree to be contacted about this project brief. <span class="req">*</span></span>
      </label>
      <div class="form-actions">
        <button class="btn btn--dark" type="submit">Prepare the project brief ${icon("arrowUp")}</button>
        <a class="btn btn--ghost" href="tel:${SITE.phoneHref}">Call instead</a>
      </div>
      <div class="brief-summary" data-brief-summary hidden></div>
      <p class="form-status" data-form-status role="status" aria-live="polite"></p>
    </form>
  </div>
</section>
<section class="section section--tight">
  <div class="container split split--reverse">
    <div class="split__copy" data-reveal>
      <p class="eyebrow">Direct line</p>
      <h2>The people who price the work answer the questions.</h2>
      <p class="lede">Project briefs reach the team that reviews the scope and runs the site. The first reply comes from the same group that will price and deliver the package.</p>
      <ul class="check-list">
        <li>${icon("check")}Scope questions answered directly by the project team</li>
        <li>${icon("check")}Site visits arranged from the Dar es Salaam office</li>
        <li>${icon("check")}Written responses with a clear next action</li>
      </ul>
      <div class="split__actions">
        <a class="btn btn--dark" href="tel:${SITE.phoneHref}">Call the team ${icon("phone")}</a>
        <a class="btn btn--ghost" href="mailto:${SITE.email}">Email the team ${icon("mail")}</a>
      </div>
    </div>
    <div class="media media--landscape" data-reveal>
      ${img("contact-team")}
      <div class="media__caption"><span>The project team</span><span>Direct contact</span></div>
    </div>
  </div>
</section>
<section class="section--white section section--tight">
  <div class="container">
    ${sectionHead(
      "From brief to price",
      "A short path to a scoped response.",
      "Every brief receives a named response and a clear next action."
    )}
    ${processSteps([
      {
        title: "Review",
        copy: "The brief is read against the service, location, stage, and programme.",
      },
      {
        title: "Clarify",
        copy: "The team confirms missing information, site access, and the decision timeline.",
      },
      {
        title: "Visit",
        copy: "A site visit or documented review is arranged where the scope requires it.",
      },
      {
        title: "Price",
        copy: "A written scope, programme, and price are issued with the assumptions stated.",
      },
    ])}
  </div>
</section>
<section class="section section--tight">
  <div class="container split">
    <div class="media media--landscape" data-reveal>
      ${img("quote-engineer")}
      <div class="media__caption"><span>Project team</span><span>Brief review</span></div>
    </div>
    <div class="split__copy" data-reveal>
      <p class="eyebrow">A complete brief</p>
      <h2>The details that shorten the path to a price.</h2>
      <p class="lede">A priced scope moves faster when the drawings, site access, budget range, and decision dates arrive together. If some items are missing, send what exists and mark what is still open.</p>
      <ul class="check-list">
        <li>${icon("check")}Drawings and specifications with revision status</li>
        <li>${icon("check")}Site access, working hours, and occupied areas</li>
        <li>${icon("check")}Programme dates and procurement route</li>
      </ul>
      <div class="split__actions">
        <a class="btn btn--dark" href="tel:${SITE.phoneHref}">Call the team ${icon("phone")}</a>
        <a class="btn btn--ghost" href="mailto:${SITE.email}">Email the team ${icon("mail")}</a>
      </div>
    </div>
  </div>
</section>
<section class="section">
  <div class="container container--narrow">
    ${sectionHead("Contact questions", "Before you send the brief.", "", { plain: true })}
    ${faqBlock(contactFaqs)}
  </div>
</section>
<section class="cta-band">
  <div class="container cta-band__grid">
    <div data-reveal>
      <p class="eyebrow">Direct contact</p>
      <h2>Prefer to talk it through?</h2>
      <p>Call or email the team if the scope is easier to explain in a conversation. The same team reviews every project brief.</p>
    </div>
    <div class="cta-band__actions" data-reveal>
      <a class="btn btn--light" href="tel:${SITE.phoneHref}">Call ${SITE.phone}</a>
      <a class="btn btn--outline-light" href="mailto:${SITE.email}">Email the team</a>
    </div>
  </div>
</section>
`;

/* ----------------------------------------------------------------- Build */

const pages = [
  {
    file: "index.html",
    path: "",
    active: "index.html",
    title: "4GHR Investment Limited | Electrical and Civil Contractor, Tanzania",
    description:
      "CRB registered Tanzanian contractor delivering electrical systems, specialist electrical packages, and civil works for commercial and industrial projects.",
    og: "og-home.png",
    ogAlt: "4GHR Investment Limited, electrical and civil contracting in Tanzania",
    jsonld: [
      { "@context": "https://schema.org", "@graph": [organizationSchema(), websiteSchema(), faqSchema(homeFaqs)] },
    ],
    main: homeMain,
  },
  {
    file: "services.html",
    path: "services.html",
    active: "services.html",
    title: "Electrical and Civil Services in Tanzania | 4GHR",
    description:
      "Electrical installations, specialist electrical packages, and civil contracting across Tanzania. See the scope, delivery stages, and what to send for a priced scope.",
    og: "og-services.png",
    ogAlt: "4GHR electrical, specialist electrical, and civil services in Tanzania",
    jsonld: [
      {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "CollectionPage",
            "@id": SITE.url + "services.html",
            name: "Electrical, specialist electrical, and civil services",
            description:
              "Service scopes, delivery stages, and brief requirements for 4GHR Investment Limited.",
            inLanguage: "en",
            isPartOf: { "@id": SITE.url + "#website" },
            about: { "@id": SITE.url + "#organization" },
          },
          organizationSchema(),
          websiteSchema(),
          ...serviceSchemas(),
          faqSchema(serviceFaqs, "services.html"),
        ],
      },
    ],
    main: servicesMain,
  },
  {
    file: "projects.html",
    path: "projects.html",
    active: "projects.html",
    title: "Project Sectors and Capability | 4GHR Investment",
    description:
      "Commercial, institutional, industrial, power, civil, and technical fit-out environments where 4GHR delivers electrical and civil scopes across Tanzania.",
    og: "og-projects.png",
    ogAlt: "4GHR project sectors and contracting capability in Tanzania",
    jsonld: [
      {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "CollectionPage",
            "@id": SITE.url + "projects.html",
            name: "Project sectors and capability",
            description:
              "Capability profiles for commercial, institutional, industrial, power, civil, and technical fit-out projects.",
            inLanguage: "en",
            isPartOf: { "@id": SITE.url + "#website" },
            about: { "@id": SITE.url + "#organization" },
          },
          organizationSchema(),
          websiteSchema(),
          faqSchema(projectFaqs, "projects.html"),
        ],
      },
    ],
    main: projectsMain,
  },
  {
    file: "about.html",
    path: "about.html",
    active: "about.html",
    title: "About 4GHR Investment Limited | Tanzanian Contractor",
    description:
      "Company profile, CRB registrations, leadership, and working principles of 4GHR Investment Limited, a local contractor based in Dar es Salaam, Tanzania.",
    og: "og-about.png",
    ogAlt: "About 4GHR Investment Limited, a local contractor in Tanzania",
    jsonld: [
      {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "AboutPage",
            "@id": SITE.url + "about.html",
            name: "About 4GHR Investment Limited",
            description:
              "Company profile, registrations, leadership, and working principles.",
            inLanguage: "en",
            isPartOf: { "@id": SITE.url + "#website" },
            about: { "@id": SITE.url + "#organization" },
            mainEntity: { "@id": SITE.url + "#organization" },
          },
          organizationSchema(),
          websiteSchema(),
          faqSchema(aboutFaqs, "about.html"),
        ],
      },
    ],
    main: aboutMain,
  },
  {
    file: "contact.html",
    path: "contact.html",
    active: "contact.html",
    title: "Contact 4GHR Investment Limited | Dar es Salaam",
    description:
      "Talk to 4GHR Investment Limited about electrical, specialist electrical, or civil works in Tanzania. Send the project location, scope, and timing for a priced response.",
    og: "og-contact.png",
    ogAlt: "Contact 4GHR Investment Limited in Dar es Salaam",
    jsonld: [
      {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "ContactPage",
            "@id": SITE.url + "contact.html",
            name: "Contact 4GHR Investment Limited",
            description: "Phone, email, office address, and project brief form.",
            inLanguage: "en",
            isPartOf: { "@id": SITE.url + "#website" },
            about: { "@id": SITE.url + "#organization" },
            mainEntity: { "@id": SITE.url + "#organization" },
          },
          organizationSchema(),
          websiteSchema(),
          faqSchema(contactFaqs, "contact.html"),
        ],
      },
    ],
    main: contactMain,
  },
];

for (const page of pages) {
  const html = layout(page);
  writeFileSync(page.file, html, "utf8");
  console.log("wrote", page.file, html.length, "bytes");
}

const notFoundMain = `
<section class="page-hero">
  <div class="container">
    <p class="eyebrow" data-reveal>404</p>
    <h1 data-reveal>This page is not available.</h1>
    <p class="lede" data-reveal>The address may have changed, or the page has been removed. Use the links below to continue.</p>
    <div class="hero-actions" data-reveal>
      <a class="btn btn--dark" href="index.html">Back to home ${icon("arrow")}</a>
      <a class="btn btn--ghost" href="contact.html">Contact the team</a>
    </div>
  </div>
</section>
<section class="section section--tight">
  <div class="container">
    <div class="grid-3">
      <a class="card card--solid" href="services.html">
        <span class="card__num">01</span>
        <h3>Services</h3>
        <p>Electrical, specialist electrical, and civil contracting across Tanzania.</p>
        <span class="link-arrow">View services ${icon("arrow")}</span>
      </a>
      <a class="card card--solid" href="projects.html">
        <span class="card__num">02</span>
        <h3>Projects</h3>
        <p>Capability profiles for the sectors where electrical and civil scopes meet.</p>
        <span class="link-arrow">View capability ${icon("arrow")}</span>
      </a>
      <a class="card card--solid" href="contact.html">
        <span class="card__num">03</span>
        <h3>Contact</h3>
        <p>Send the project location, scope, and timing for a scoped response.</p>
        <span class="link-arrow">Contact 4GHR ${icon("arrow")}</span>
      </a>
    </div>
  </div>
</section>
`;

const notFound = layout({
  title: "Page not found | 4GHR Investment Limited",
  description:
    "The requested page is not available. Return to the 4GHR home page or contact the team for project support.",
  path: "404.html",
  og: "og-home.png",
  ogAlt: "4GHR Investment Limited",
  active: "",
  jsonld: [],
  robots: "noindex, follow",
  main: notFoundMain,
});
writeFileSync("404.html", notFound, "utf8");
console.log("wrote 404.html");

const today = "2026-11-04";
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) => `  <url>
    <loc>${SITE.url + page.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${page.file === "index.html" ? "1.0" : page.file === "contact.html" ? "0.9" : "0.8"}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;
writeFileSync("sitemap.xml", sitemap, "utf8");

const robots = `User-agent: *
Allow: /

Disallow: /404.html
Disallow: /tools/
Disallow: /preview/
Disallow: /DESIGN.txt
Disallow: /plan.md
Disallow: /TODO.md
Disallow: /.manus/

Sitemap: ${SITE.url}sitemap.xml
`;
writeFileSync("robots.txt", robots, "utf8");
console.log("wrote sitemap.xml and robots.txt");
