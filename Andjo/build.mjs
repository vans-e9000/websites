import { cp, copyFile, mkdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(root, 'dist');
const orgName = 'Andjo Engineering Company Limited';
const company = {
  director: 'Bertha Humbe',
  location: 'Kariakoo, Ilala, Dar es Salaam, Tanzania',
  town: 'Dar es Salaam',
  postalBox: '80826',
  phone: '+255653971921',
  displayPhone: '+255 653 971 921',
  email: 'andreajoshua150@gmail.com',
  buildingRegistration: 'B6/2193/07/2026',
  civilRegistration: 'C6/2488/07/2022',
  checked: '31 October 2026',
};
const crb = {
  board: 'https://www.crb.go.tz/',
  search: 'https://www.crb.go.tz/contractordetails/home/search?search=andjo%20engineering',
  building: 'https://www.crb.go.tz/contractordetails/home/show/623',
  civil: 'https://www.crb.go.tz/contractordetails/home/show/624',
};

const photo = (id, photographer, place, subject, pageUrl, alt) => ({
  id, photographer, place, subject, pageUrl, alt,
  source: (width) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}&fit=max`,
});
const photos = {
  home: photo(38188337, 'Senyonga', 'Kampala, Uganda', 'Construction workers excavating in Kampala', 'https://www.pexels.com/photo/construction-workers-excavating-in-kampala-38188337/', 'Construction workers excavating at a site in Kampala, Uganda.'),
  services: photo(36096170, '', 'Location not specified', 'Services page hero photograph', 'https://images.pexels.com/photos/36096170/pexels-photo-36096170.jpeg', 'Construction site on the Andjo Engineering services page; illustrative Pexels photograph.'),
  projects: photo(32132510, '', 'Location not specified', 'Projects page hero photograph', 'https://images.pexels.com/photos/32132510/pexels-photo-32132510.jpeg', 'Construction site on the Andjo Engineering projects page; illustrative Pexels photograph.'),
  about: photo(38706755, '', 'Location not specified', 'About page hero photograph', 'https://images.pexels.com/photos/38706755/pexels-photo-38706755.jpeg', 'Construction site on the Andjo Engineering about page; illustrative Pexels photograph.'),
  contact: photo(12314551, '', 'Location not specified', 'Contact page hero photograph', 'https://images.pexels.com/photos/12314551/pexels-photo-12314551.jpeg', 'Construction site on the Andjo Engineering contact page; illustrative Pexels photograph.'),
  quote: photo(35641136, '', 'Location not specified', 'Quote page hero photograph', 'https://images.pexels.com/photos/35641136/pexels-photo-35641136.jpeg', 'Construction site on the Andjo Engineering quote page; illustrative Pexels photograph.'),
  building: photo(5298215, 'Jerome Govender', 'South Africa', 'Construction workers collaborating outdoors', 'https://www.pexels.com/photo/construction-workers-working-together-5298215/', 'Construction workers collaborating on a site in South Africa; illustrative Pexels photograph.'),
  civil: photo(35340757, 'Yg pixel', 'Lagos, Nigeria', 'Construction workers at a roadwork site', 'https://www.pexels.com/photo/road-construction-crew-working-outdoors-35340757/', 'Construction workers at a roadwork site in Lagos, Nigeria; illustrative Pexels photograph.'),
  credentials: photo(37198884, 'Harrun Muhammad', 'Abuja, Nigeria', 'Engineers reviewing blueprints indoors', 'https://www.pexels.com/photo/team-of-engineers-discuss-construction-plans-37198884/', 'Engineers reviewing blueprints on a site in Abuja, Nigeria; illustrative Pexels photograph.'),
  faq: photo(30934425, 'Omar Photographer', 'Rwanda', 'Construction worker at an active site', 'https://www.pexels.com/photo/young-man-at-construction-site-in-rwanda-30934425/', 'Construction worker at a site in Rwanda; illustrative Pexels photograph.'),
  credits: photo(30380875, 'Alex Levis', 'Dar es Salaam, Tanzania', 'Aerial view of the Dar es Salaam cityscape', 'https://www.pexels.com/photo/aerial-view-of-dar-es-salaam-cityscape-30380875/', 'Aerial view of Dar es Salaam, Tanzania; illustrative Pexels photograph.'),
  ctaBackground: photo(10421754, '', 'Location not specified', 'Shared project enquiry CTA background', 'https://images.pexels.com/photos/10421754/pexels-photo-10421754.jpeg', 'Construction site on the Andjo Engineering project enquiry card; illustrative Pexels photograph.'),
};

const faqItems = [
  { q: "What services does Andjo Engineering provide?", a: "Andjo Engineering Company Limited takes on Building and Civil contracting packages in Dar es Salaam under Local Class 6. Each category is recorded separately on the Contractors Registration Board register, and each enquiry is reviewed against the issued drawings, quantities and key dates." },
  { q: "Which CRB registrations does Andjo Engineering hold?", a: "Building: B6/2193/07/2026. Civil: C6/2488/07/2022. Both entries are recorded under Class 6, Local category, and were checked against the live register on 31 October 2026." },
  { q: "What should I include in a project enquiry?", a: "Include the project location, contracting organization, work package, quantities, current drawing revisions, specifications, tender reference and key dates. Name the required category, Building or Civil, so the enquiry reaches the right registration." },
  { q: "Can I request a Building or Civil quotation?", a: "Yes. Select the relevant category on the review request form and send the package details, or email them to andreajoshua150@gmail.com with the category in the subject line. Telephone enquiries: +255 653 971 921." },
  { q: "How does Andjo assess a project package?", a: "The review starts with the scope boundaries, site conditions, quantities, issued documents, programme and the required contractor category. These define the work under consideration and the registration class it must match." },
  { q: "Where is Andjo Engineering located?", a: "Andjo Engineering Company Limited operates from Kariakoo, Ilala, Dar es Salaam, Tanzania, with postal address P.O. Box 80826. Managing Director Bertha Humbe is the named contact on both CRB entries." },
  { q: "How do I contact Andjo Engineering?", a: "Call +255 653 971 921 or email andreajoshua150@gmail.com. Include the project location and category in the first message so the enquiry arrives ready to review." },
  { q: "Does the CRB entry show an expiry date or status?", a: "The pages examined on 31 October 2026 publish no expiry date and no separate active-status field. Confirm current standing directly on the live CRB register when a tender requires it." },
];

const prose = (eyebrow, title, paragraphs, options = {}) => ({
  type: 'prose', eyebrow, title, paragraphs, tone: options.tone || '', link: options.link || '',
});
const cta = (eyebrow, title, text, label = 'Request a project quotation', href = '/quote.html') => ({ type: 'cta', eyebrow, title, text, label, href });
const pages = [
  {
    file: 'index.html', route: '/', nav: 'Home', photo: photos.home,
    title: "Andjo Engineering | Building and Civil Contractor in Dar es Salaam",
    description: "Andjo Engineering Company Limited is CRB-registered for Building and Civil contracting in Dar es Salaam. Send the issued drawings, quantities and key dates for a package review.",
    eyebrow: "BUILDING & CIVIL CONTRACTING · DAR ES SALAAM",
    h1: "Registered Building and Civil contractor in Dar es Salaam.",
    lead: "Andjo Engineering Company Limited holds separate CRB registrations for Building and Civil work, both at Local Class 6, and operates from Kariakoo in Dar es Salaam. Send the issued drawings, quantities and program dates; the review establishes whether the category matches the package before any commercial position is taken.",
    actions: [["Request an engineering review","/quote.html","primary"],["View registrations","/credentials.html","text"]],
    sections: [
      prose("BUILDING CONTRACTING", "Structural and finishing work under registration B6/2193/07/2026.", [
        "Building packages run from the issued architectural and structural drawings: setting out, structure, envelope and finishes, with the inspection points that gate each stage written down before work starts.",
        "The CRB records this category as Building, Class 6, Local. Match the tender’s required category and class to this entry before the invitation is issued."
      ]),
      prose("CIVIL CONTRACTING", "Earthworks, services and interfaces under registration C6/2488/07/2022.", [
        "Civil packages are defined by the site: access, ground conditions, existing services and the sequence that keeps adjacent trades moving. Work to the issued drawings and specification clauses with quantities, inspection holds and completion dates fixed in the package documents.",
        "The CRB records this category as Civil, Class 6, Local, under number C6/2488/07/2022. Confirm the category the scope requires, then send the site details with the enquiry."
      ], { tone: "surface" }),
      prose("PROJECT INTAKE", "What we need before the review starts.", [
        "Send the project location, contracting organization, work package and its boundaries, the current drawing revisions, the bill of quantities or estimated quantities, the tender reference and the key dates.",
        "Enquiries reach us on +255 653 971 921 or andreajoshua150@gmail.com. Use the review request form when the documents are already held; call directly when the scope is still being assembled."
      ]),
      cta("DIRECT PROJECT ENQUIRY", "Put the package in front of the registration that fits.", "Attach the issued documents or list what is still outstanding; either way the conversation starts with facts.", "Request an engineering review", "/quote.html"),
    ],
  },
  {
    file: 'services.html', route: '/services.html', nav: 'Services', photo: photos.services,
    title: "Building and Civil Contracting | Andjo Engineering",
    description: "Building and Civil contracting scope, registration categories and project intake requirements at Andjo Engineering, Dar es Salaam.",
    eyebrow: "BUILDING & CIVIL CONTRACTING",
    h1: "Services scoped to the category your tender requires.",
    lead: "Andjo Engineering accepts Building and Civil packages under Local Class 6 registration. Scope, site conditions, quantities and program establish the basis of every review; the issued documents decide what the company commits to.",
    actions: [["Request an engineering review","/quote.html","primary"],["Open CRB Building record","https://www.crb.go.tz/contractordetails/home/show/623","text",true],["Open CRB Civil record","https://www.crb.go.tz/contractordetails/home/show/624","text",true]],
    sections: [
      prose("BUILDING", "What a Building package covers.", [
        "Architectural and structural drawings, specifications, quantities and site information define the Building scope. The review then holds the commercial discussion against those same documents and the inspection points they specify.",
        "Registration B6/2193/07/2026, Class 6, Local. Open the <a href=\"/building.html\">Building package page</a> for the full document list."
      ]),
      prose("CIVIL", "What a Civil package covers.", [
        "Access, ground conditions, existing services, interfaces with adjacent contracts and inspection holds define the Civil scope. Work is to the issued drawings and specification clauses, with quantities and completion dates as the fixed reference points.",
        "Registration C6/2488/07/2022, Class 6, Local. Open the <a href=\"/civil.html\">Civil package page</a> for the full document list."
      ], { tone: "surface" }),
      prose("ISSUED DOCUMENTS", "Documents that move the review forward.", [
        "Reference drawing numbers and revision dates, specification clauses, bill-of-quantities items, addenda and tender clarifications. State the site location, access constraints and required key dates.",
        "Where the document set is incomplete, send the register of what exists; the review then proceeds against the category and flags the gaps before pricing."
      ]),
      cta("CATEGORY CHECK", "Confirm the category, then send the package.", "State whether the work sits under Building, Civil or both, then attach the issued documents.", "Request an engineering review", "/quote.html"),
    ],
  },
  {
    file: 'projects.html', route: '/projects.html', nav: 'Projects', photo: photos.projects,
    title: "Project Brief Requirements | Andjo Engineering",
    description: "What to include in a project brief for Andjo Engineering: scope, site conditions, drawings, quantities, tender reference and key dates.",
    eyebrow: "PROJECT BRIEF PREPARATION",
    h1: "What your project brief must contain.",
    lead: "Andjo Engineering reviews Building and Civil packages against issued documents. Send the project location, scope boundaries, current drawing revisions, quantities, tender reference and key dates together; a brief assembled in one issue moves faster than an exchange of partial emails.",
    actions: [["Request an engineering review","/quote.html","primary"],["Contact Andjo Engineering","/contact.html","text"]],
    sections: [
      prose("SCOPE", "State the package and its boundaries.", [
        "Name the project, site location, contracting organization, package title and quantities in scope. Mark the interfaces with other contractors and any exclusions; a boundary written down once is harder to reopen at every meeting."
      ]),
      prose("TECHNICAL INFORMATION", "Issue current documents with the brief.", [
        "Send drawings with their revision dates, specifications by clause, bill-of-quantities items or estimated quantities, addenda and tender clarifications. Record site access conditions, working constraints, inspection requirements and handover criteria alongside them.",
      ], { tone: "surface" }),
      prose("PROGRAMME", "Fix the dates that govern the work.", [
        "State the required start, the key milestones, the tender or submission deadline and the dependencies on other packages. Where the programme is not yet fixed, say which dates are firm and which remain open."
      ]),
      cta("BRIEF SUBMISSION", "Send the brief with the documents attached.", "One issue with the scope, revisions, quantities and dates is enough to start the review.", "Request an engineering review", "/quote.html"),
    ],
  },
  {
    file: 'about.html', route: '/about.html', nav: 'About', photo: photos.about,
    title: "About Andjo Engineering Company Limited",
    description: "Andjo Engineering Company Limited: Dar es Salaam base, Managing Director Bertha Humbe, and CRB Building and Civil registrations under Local Class 6.",
    eyebrow: "COMPANY PROFILE · DAR ES SALAAM",
    h1: "Registered for Building and Civil contracting in Dar es Salaam.",
    lead: "Andjo Engineering Company Limited operates from Kariakoo, Ilala, Dar es Salaam, under Managing Director Bertha Humbe. The CRB lists the company twice, once for Building and once for Civil, both at Local Class 6.",
    actions: [["View registrations","/credentials.html","primary"],["Contact Andjo Engineering","/contact.html","text"]],
    sections: [
      prose("COMPANY", "Andjo Engineering Company Limited.", [
        "The company works from Kariakoo in Ilala, Dar es Salaam, with postal address P.O. Box 80826. Direct lines: +255 653 971 921 and andreajoshua150@gmail.com. Managing Director Bertha Humbe is the named contact on both CRB entries."
      ]),
      prose("REGISTRATION", "Building B6/2193/07/2026. Civil C6/2488/07/2022.", [
        "Both entries are recorded under Class 6, Local category, and were verified against the live register on 31 October 2026. The pages examined publish no expiry date and no separate active-status field, so the register itself remains the source for current standing.",
        "A registration category establishes eligibility to tender in that class; it does not by itself evidence past performance. Evaluate the package, the team assigned to it and the references you hold alongside the register entry."
      ], { tone: "surface" }),
      prose("WORKING APPROACH", "How the company takes on a package.", [
        "Work is from issued documents: drawings, specifications, quantities and dates. The review establishes what is in scope, what the site demands and which category the work falls under before the commercial discussion opens.",
        "Send the package through the review request form, by email or by phone; the route matters less than the completeness of what arrives."
      ]),
      cta("DIRECT COMPANY CONTACT", "Speak with the named contact on the register.", "Call +255 653 971 921 or email andreajoshua150@gmail.com with the category and site location.", "Contact Andjo Engineering", "/contact.html"),
    ],
  },
  {
    file: 'contact.html', route: '/contact.html', nav: 'Contact', photo: photos.contact,
    title: "Contact Andjo Engineering | Dar es Salaam",
    description: "Call +255 653 971 921 or email andreajoshua150@gmail.com for Building and Civil project enquiries. Office in Kariakoo, Ilala, Dar es Salaam.",
    eyebrow: "DIRECT COMPANY CONTACT",
    h1: "Speak with Andjo Engineering directly.",
    lead: "Telephone +255 653 971 921 and email andreajoshua150@gmail.com reach the company directly from Kariakoo, Ilala, Dar es Salaam. Include the project location, category and key dates in the first message so the enquiry arrives ready to review.",
    actions: [["Request an engineering review","/quote.html","primary"],["View registrations","/credentials.html","text"]],
    sections: [
      prose("DIRECT CHANNELS", "Direct channels, published on the register.", [
        "Telephone: +255 653 971 921. Email: andreajoshua150@gmail.com. Office: Kariakoo, Ilala, Dar es Salaam, Tanzania. Postal: P.O. Box 80826. These are the details displayed on both CRB entries, so the channel used is the channel of record."
      ], { tone: "surface" }),
      prose("PROJECT ENQUIRY", "What to include when you write.", [
        "State the site location, contracting organization, whether the work is Building, Civil or both, the package scope and quantities, the tender or procurement reference and the key dates. Attach the current drawings and specifications, or list them by revision number.",
        "For an urgent clarification on a live tender, call. For a document package, email it with the reference in the subject line."
      ]),
      cta("REVIEW REQUEST", "Prefer to structure the enquiry in one pass?", "The review request form gathers location, category, documents and dates in one place.", "Request an engineering review", "/quote.html"),
    ],
  },
  {
    file: 'quote.html', route: '/quote.html', nav: 'Get a quote', photo: photos.quote,
    title: "Request an Engineering Review | Andjo Engineering",
    description: "Send Andjo Engineering the project location, scope, technical documents and delivery requirements for a Building or Civil package review.",
    eyebrow: "ENGINEERING REVIEW REQUEST",
    h1: "Put the project scope on record.",
    lead: "Provide the site, package scope, quantities, contractor category, technical documents and key dates. The form opens an email to andreajoshua150@gmail.com with the entries ready to send.",
    actions: [["View Building and Civil services","/services.html","text"]],
    sections: [
      prose("PROJECT SCOPE", "Describe the work and its boundaries.", [
        "Name the contracting organization, project location, package title, scope boundaries, quantities and key milestones. Select the relevant Building or Civil category and include the procurement or tender reference where the enquiry relates to an issued package."
      ]),
      prose("TECHNICAL DOCUMENTS", "Reference the information issued for the package.", [
        "List the drawings, specifications, bill of quantities, addenda and current revision dates. State site access conditions, project interfaces, working constraints and the required delivery dates."
      ], { tone: "surface" }),
      { type: "form" },
      cta("DIRECT CONTACT", "Need to clarify the scope first?", "Call +255 653 971 921 or email andreajoshua150@gmail.com before you send the package.", "View contact details", "/contact.html"),
    ],
  },
  {
    file: 'building.html', route: '/building.html', nav: 'Services', photo: photos.building,
    title: "Building Contracting | Andjo Engineering",
    description: "Andjo Engineering’s CRB Building registration B6/2193/07/2026, Class 6 Local, and the information a Building package enquiry must include.",
    eyebrow: "BUILDING · LOCAL CLASS 6",
    h1: "Building contracting under CRB registration B6/2193/07/2026.",
    lead: "The CRB lists Andjo Engineering Company Limited as a Building contractor, Class 6, Local category, under registration B6/2193/07/2026. Send the architectural and structural documents, quantities and site details for a package review.",
    actions: [["Open CRB Building record","https://www.crb.go.tz/contractordetails/home/show/623","primary",true],["View Civil services","/civil.html","text"],["View Building and Civil services","/services.html","text"]],
    sections: [
      prose("BUILDING REGISTRATION", "B6/2193/07/2026 — what the entry shows.", [
        "The Building record names Andjo Engineering Company Limited, contractor type Building, Class 6, Local category, Managing Director Bertha Humbe, the Kariakoo address, P.O. Box 80826, telephone and email. The reviewed page publishes no expiry date and no separate active-status field."
      ]),
      prose("PACKAGE INFORMATION", "Documents that define the Building scope.", [
        "Architectural and structural drawings with revision dates, specifications by clause, bill-of-quantities items, site information, access requirements and handover criteria. Add the package boundaries, interfaces with other trades, programme milestones and the tender reference.",
        "Send the document register when the full set is not yet available, with the expected issue date for each outstanding item."
      ], { tone: "surface" }),
      prose("PROJECT ENQUIRY", "Start the Building discussion with the category fixed.", [
        "State the location, contracting organization, scope and current document revisions. Confirm that the tender requires the Building category at Class 6 Local, then cite the registration number in the pre-qualification file."
      ]),
      cta("BUILDING PACKAGE", "Request a Building package review.", "Send the drawing set, quantities and key dates with the tender reference.", "Request an engineering review", "/quote.html"),
    ],
  },
  {
    file: 'civil.html', route: '/civil.html', nav: 'Services', photo: photos.civil,
    title: "Civil Contracting | Andjo Engineering",
    description: "Andjo Engineering’s CRB Civil registration C6/2488/07/2022, Class 6 Local, and the information a Civil package enquiry must include.",
    eyebrow: "CIVIL · LOCAL CLASS 6",
    h1: "Civil contracting under CRB registration C6/2488/07/2022.",
    lead: "The CRB lists Andjo Engineering Company Limited as a Civil contractor, Class 6, Local category, under registration C6/2488/07/2022. Send the site conditions, access details, quantities and issued documents for a package review.",
    actions: [["Open CRB Civil record","https://www.crb.go.tz/contractordetails/home/show/624","primary",true],["View Building services","/building.html","text"],["View Building and Civil services","/services.html","text"]],
    sections: [
      prose("CIVIL REGISTRATION", "C6/2488/07/2022 — what the entry shows.", [
        "The Civil record names Andjo Engineering Company Limited, contractor type Civil, Class 6, Local category, the Kariakoo address, P.O. Box 80826, telephone and email. The reviewed page publishes no expiry date and no separate active-status field."
      ]),
      prose("SITE INFORMATION", "Conditions that shape the Civil scope.", [
        "Access routes, ground conditions, existing services, connections to adjacent packages, working constraints and inspection points. Include delivery milestones, handover criteria and required completion dates so the sequence can be reviewed against the site.",
        "Where a site investigation or service survey exists, reference it by date. Where it does not, say so; the review then treats unknown ground conditions as an open item."
      ], { tone: "surface" }),
      prose("PROJECT ENQUIRY", "Fix the category before the enquiry.", [
        "State the location, contracting organization, work package and current document revisions. Include the tender or procurement reference where the enquiry relates to an issued package, and note any constraints on site access."
      ]),
      cta("CIVIL PACKAGE", "Request a Civil package review.", "Send the site details, drawing set, quantities and completion dates.", "Request an engineering review", "/quote.html"),
    ],
  },
  {
    file: 'credentials.html', route: '/credentials.html', nav: 'About', photo: photos.credentials,
    title: "Andjo Engineering Registrations | Building and Civil",
    description: "View Andjo Engineering’s Contractors Registration Board records for Local Class 6 Building and Civil contracting.",
    eyebrow: "CONTRACTORS REGISTRATION BOARD",
    h1: "Building B6/2193/07/2026. Civil C6/2488/07/2022.",
    lead: "The Contractors Registration Board lists Andjo Engineering Company Limited in two categories, both at Class 6, Local. The entries were checked against the live register on 31 October 2026; the pages examined publish no expiry date and no separate active-status field.",
    actions: [["Open CRB company search","https://www.crb.go.tz/contractordetails/home/search?search=andjo%20engineering","primary",true],["Contact Andjo Engineering","/contact.html","text"]],
    sections: [
      prose("BUILDING · LOCAL CLASS 6", "B6/2193/07/2026.", [
        "Contractor type Building, Class 6, Local category. Managing Director Bertha Humbe, Kariakoo, Ilala, P.O. Box 80826, Dar es Salaam, with the published telephone and email. Open the source record to review the entry as the board displays it.",
        "Open the <a href=\"/building.html\">Building package page</a> for the full document list."
      ]),
      prose("CIVIL · LOCAL CLASS 6", "C6/2488/07/2022.", [
        "Contractor type Civil, Class 6, Local category, with the same published company contact details. Each category is recorded separately, so cite the entry that matches the tender’s required category.",
        "Open the <a href=\"/civil.html\">Civil package page</a> for the full document list."
      ], { tone: "surface" }),
      prose("PROJECT FIT", "What a registration establishes, and what it does not.", [
        "The register establishes the category and class under which the company may tender. It does not publish project history, contract values or client references, and the reviewed pages expose no expiry or status field.",
        "Confirm current standing on the live register when a tender requires it, and evaluate the package on its own documents."
      ]),
      cta("PROJECT INTAKE", "Match the category, then open the review.", "State the required category, site location, scope and key dates in your enquiry.", "Request an engineering review", "/quote.html"),
    ],
  },
  {
    file: 'faq.html', route: '/faq.html', nav: 'Services', photo: photos.faq,
    title: "Andjo Engineering FAQs | Services and Enquiries",
    description: "Building and Civil services, CRB registration numbers, project information requirements and direct company contacts.",
    eyebrow: "SERVICES AND PROJECT ENQUIRIES",
    h1: "Answers to the questions procurement asks first.",
    lead: "Service categories, registration numbers, project information requirements and direct contact details, answered from the CRB records reviewed on 31 October 2026.",
    actions: [["View services","/services.html","primary"],["Request an engineering review","/quote.html","text"]],
    faq: faqItems,
    sections: [
      { type: "faq" },
      cta("PROJECT INTAKE", "Send the package details with your question.", "Attach the location, scope, documents and key dates so the answer can be specific.", "Request an engineering review", "/quote.html"),
    ],
  },
  {
    file: 'photo-credits.html', route: '/photo-credits.html', nav: 'About', photo: photos.credits,
    title: "Photography Credits | Andjo Engineering",
    description: "Photographer credits and source links for photographs used across the Andjo Engineering website.",
    eyebrow: "PHOTOGRAPHY CREDITS",
    h1: "Photographs and credited photographers.",
    lead: "Every image used across the Andjo Engineering website comes from Pexels under the Pexels license. Open a photographer’s name to view the original listing.",
    actions: [["Return to Andjo Engineering","/","text"]],
    sections: [
      { type: "credits" },
      prose("IMAGE LICENCE", "Pexels photography.", [
        "The photographs listed here are published under the Pexels license, with attribution shown as a courtesy. They are illustrative stock photography from Pexels and do not depict Andjo Engineering staff or completed work. Each photographer name links to the original image page."
      ], { tone: "surface" }),
    ],
  },
];

function esc(value) {
  return String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');
}
function safeJson(value) {
  return JSON.stringify(value).replaceAll('<', '\\u003c').replaceAll('>', '\\u003e').replaceAll('&', '\\u0026');
}
function originFromEnv() {
  const raw = process.env.SITE_URL?.trim();
  if (!raw) return null;
  let parsed;
  try { parsed = new URL(raw); } catch { throw new Error('SITE_URL must be a valid HTTPS origin.'); }
  if (parsed.protocol !== 'https:' || parsed.username || parsed.password || parsed.search || parsed.hash || !['', '/'].includes(parsed.pathname)) {
    throw new Error('SITE_URL must be the confirmed public HTTPS origin alone, without a path, credentials, query or fragment.');
  }
  return parsed.origin;
}
function absUrl(origin, route) { return new URL(route.replace(/^\//, ''), `${origin}/`).href; }
function photoUrl(image, width = 1440) { return image.source(width); }
function imageFigure(image, isHome = false) {
  const sourceWidths = [480, 800, 1200, 1600];
  const srcset = sourceWidths.map((width) => `${esc(photoUrl(image, width))} ${width}w`).join(', ');
  return `<figure class="hero-figure"><img src="${esc(photoUrl(image, 1200))}" srcset="${srcset}" sizes="(max-width: 991px) 100vw, 51vw" width="1200" height="900" alt="${esc(image.alt)}" ${isHome ? 'fetchpriority="high"' : 'loading="eager" fetchpriority="high"'} decoding="async"></figure>`;
}
function actionMarkup(actions = []) {
  return `<div class="hero-actions">${actions.map(([label, href, style = 'text', external = false]) => `<a class="${style === 'primary' ? 'button' : 'text-link'}" href="${esc(href)}"${external ? ' target="_blank" rel="noopener"' : ''}>${esc(label)}${style === 'primary' ? '<span aria-hidden="true">↗</span>' : '<span aria-hidden="true">→</span>'}</a>`).join('')}</div>`;
}
const navItems = [
  ['Home', '/'], ['Services', '/services.html'], ['Projects', '/projects.html'],
  ['About', '/about.html'], ['Contact', '/contact.html'], ['Get a quote', '/quote.html'],
];
function navMarkup(active) {
  return navItems.map(([label, href]) => `<a href="${href}"${label === active ? ' aria-current="page"' : ''}${label === 'Get a quote' ? ' class="nav-cta"' : ''}>${label}</a>`).join('');
}
function header(active) {
  return `<a class="skip-link" href="#main">Skip to content</a><header class="site-header"><div class="container header-inner"><a class="wordmark" href="/" aria-label="Andjo Engineering home"><span class="wordmark-mark" aria-hidden="true">A</span><span class="wordmark-text">ANDJO <small>ENGINEERING</small></span></a><button class="menu-toggle" type="button" aria-expanded="false" aria-controls="primary-navigation" aria-label="Open navigation"><span></span><span></span></button><nav id="primary-navigation" class="nav-links" aria-label="Primary navigation">${navMarkup(active)}</nav></div></header>`;
}
function footer() {
  const whatsappNumber = company.phone.replace(/D/g, '');
  const year = new Date().getFullYear();
  return `<footer class="site-footer"><div class="container"><div class="footer">
    <div class="footer-intro">
      <p class="footer-intro-tagline">Andjo Engineering Company Limited works from Kariakoo in Ilala, Dar es Salaam, under Managing Director Bertha Humbe. The Contractors Registration Board lists the company for Building and Civil contracting, both under Local Class 6.</p>
      <div class="footer-social-row"><a class="footer-social-link" href="https://wa.me/${whatsappNumber}" target="_blank" rel="noopener noreferrer" aria-label="Contact Andjo Engineering on WhatsApp" title="WhatsApp"><span class="sr-only">WhatsApp</span><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 3a8.7 8.7 0 0 0-7.5 13.1L3.3 20.8l4.8-1.2A8.7 8.7 0 1 0 12 3Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"/><path d="M9 8.2c-.3 0-.6.1-.8.4-.3.3-.7.8-.7 1.7s.7 2 1 2.4c.2.3 1.8 2.8 4.5 3.8 2.2.9 2.7.7 3.2.6.5-.1 1.6-.7 1.8-1.3.2-.6.2-1.1.1-1.2-.1-.1-.3-.2-.6-.3l-1.7-.8c-.2-.1-.4-.1-.6.2l-.8 1c-.1.2-.3.2-.6.1-.3-.1-1.2-.4-2.2-1.3-.8-.7-1.3-1.6-1.5-1.9-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.8-1.8c-.2-.4-.4-.4-.6-.4H9Z" fill="currentColor"/></svg><span>WhatsApp</span></a></div>
    </div>
    <nav class="footer-nav" aria-label="Footer navigation">
      <ul class="footer-nav-primary">${navItems.map(([label, href]) => `<li><a href="${href}"${label === 'Get a quote' ? ' aria-current="page"' : ''}${label === 'Get a quote' ? ' class="nav-cta"' : ''}>${label}</a></li>`).join('')}
    </nav>
    <div class="footer-sitemap">
      <div><h3 id="footer-services">Services</h3><ul>
        <li><a href="/services.html">Building and Civil contracting</a></li>
        <li><a href="/building.html">Building package scope</a></li>
        <li><a href="/civil.html">Civil package scope</a></li>
        <li><a href="/faq.html">Services and enquiries</a></li>
      </ul></div>
      <div><h3 id="footer-registrations">Registrations</h3><ul>
        <li><a href="/credentials.html">CRB registration records</a></li>
        <li><a href="/building.html">Building · B6/2193/07/2026</a></li>
        <li><a href="/civil.html">Civil · C6/2488/07/2022</a></li>
        <li><a href="${crb.board}" target="_blank" rel="noopener noreferrer">Verify on the Contractors Registration Board ↗</a></li>
      </ul></div>
      <div><h3 id="footer-company">Company</h3><ul>
        <li><a href="/about.html">About Andjo Engineering</a></li>
        <li><a href="/contact.html">Contact Andjo Engineering</a></li>
        <li><a href="/quote.html">Request an engineering review</a></li>
      </ul></div>
    </div>
    <div class="footer-wordmark-band">
      <a class="wordmark" href="/" aria-label="Andjo Engineering home"><span class="wordmark-mark" aria-hidden="true">A</span><span class="footer-wordmark-text" data-wordmark="ANDJO ENGINEERING" aria-hidden="true">ANDJO ENGINEERING</span></a>
    </div>
    <div class="footer-legal">
      <p class="footer-legal-copy">© ${year} ${esc(orgName)} · Kariakoo, Dar es Salaam, Tanzania · P.O. Box ${company.postalBox} · ${company.displayPhone} · ${company.email}</p>
      <nav class="footer-legal-links" aria-label="Footer legal links"><a href="/credentials.html">Registration records</a><a href="/404.html">Page not available</a></nav>
    </div>
  </div></div></footer>`;
}

function hero(page) {
  return `<section class="hero" aria-labelledby="page-title"><div class="container hero-grid"><div class="hero-copy"><p class="eyebrow">${esc(page.eyebrow)}</p><h1 id="page-title">${esc(page.h1)}</h1><p class="hero-lead">${page.lead}</p>${actionMarkup(page.actions)}</div>${imageFigure(page.photo, page.route === '/')}</div></section>`;
}
function proseSection(section, index) {
  return `<section class="content-section${section.tone === 'surface' ? ' content-section--surface' : ''}" data-reveal><div class="container editorial-grid"><div class="editorial-heading"><p class="eyebrow">${section.eyebrow}</p><h2>${section.title}</h2></div><div class="editorial-copy">${section.paragraphs.map((p) => `<p>${p}</p>`).join('')}${section.link ? `<p class="editorial-action">${section.link}</p>` : ''}</div></div></section>`;
}
function ctaSection(section) {
  return `<section class="cta-section" data-reveal><div class="container cta-inner"><div><p class="eyebrow">${section.eyebrow}</p><h2>${section.title}</h2><p>${section.text}</p></div><a class="button button--light" href="${section.href}">${section.label}<span aria-hidden="true">↗</span></a></div></section>`;
}
function quoteForm() {
  return `<section class="form-section" data-reveal><div class="container"><div class="form-intro"><p class="eyebrow">Engineering review request</p><h2>Nine fields, one email, a scoped review.</h2><p>State the project location, work scope, quantities, site conditions and delivery requirements, and identify the Building or Civil category. Reference the current drawings, specifications, bill of quantities, tender reference and key dates.</p><p>Contact Andjo at <a href="mailto:${company.email}">${company.email}</a> or <a href="tel:${company.phone}">${company.displayPhone}</a> if the scope is still being assembled.</p></div><form class="quote-form" data-email="${company.email}"><div class="field"><label for="full-name">Contact name</label><input id="full-name" name="Full name" autocomplete="name" required></div><div class="field"><label for="organization">Company or organisation</label><input id="organization" name="Organisation" autocomplete="organization"></div><div class="field"><label for="email">Business email address</label><input id="email" name="Email address" type="email" autocomplete="email" required></div><div class="field"><label for="telephone">Direct telephone</label><input id="telephone" name="Telephone" type="tel" autocomplete="tel"></div><div class="field"><label for="category">Required contractor category</label><select id="category" name="Contractor category" required><option value="" selected disabled>Select a category</option><option>Building</option><option>Civil</option><option>Building and Civil</option></select></div><div class="field"><label for="location">Project site or district</label><input id="location" name="Project location" autocomplete="address-level2" required></div><div class="field"><label for="reference">Tender or procurement reference</label><input id="reference" name="Tender or enquiry reference"></div><div class="field"><label for="deadline">Tender submission deadline</label><input id="deadline" name="Submission deadline"></div><div class="field"><label for="scope">Scope and technical requirements</label><textarea id="scope" name="Project scope" rows="5" required></textarea></div><div class="form-submit-wrap"><button class="button form-submit" type="submit">Request an engineering review <span aria-hidden="true">↗</span></button></div></form></div></section>`;
}
function faqSection() {
  return `<section class="faq-section" data-reveal><div class="container faq-layout"><div class="faq-intro"><p class="eyebrow">Services and project enquiries</p><h2>Building, Civil and project intake.</h2><p>Find the service categories, registration numbers, project information requirements and company contact details.</p></div><div class="faq-list">${faqItems.map((item, i) => `<details class="faq-item"${i === 0 ? ' open' : ''}><summary>${esc(item.q)}<span aria-hidden="true">+</span></summary><div class="faq-answer"><p>${esc(item.a)}</p></div></details>`).join('')}</div></div></section>`;
}
function creditsSection() {
  const unique = [...new Map(Object.values(photos).filter((image) => image.photographer).map((image) => [image.id, image])).values()];
  return `<section class="credits-section" data-reveal><div class="container credits-copy"><p class="eyebrow">Photography credits</p><h2>Photographs and source links.</h2><p>Open a photographer’s name to view the original Pexels listing.</p>${unique.map((image) => `<p class="credit-line"><strong>${esc(image.subject)}</strong>${image.photographer ? ` · Photograph by ${esc(image.photographer)}` : ''}. <a href="${esc(image.pageUrl)}" target="_blank" rel="noopener">View image source ↗</a></p>`).join('')}</div></section>`;
}
function renderSections(page) {
  return page.sections.map((section, index) => {
    if (section.type === 'cta') return ctaSection(section);
    if (section.type === 'form') return quoteForm();
    if (section.type === 'faq') return faqSection();
    if (section.type === 'credits') return creditsSection();
    return proseSection(section, index);
  }).join('');
}
function getOrigin() {
  const raw = process.env.SITE_URL?.trim();
  if (!raw) return null;
  let parsed;
  try { parsed = new URL(raw); } catch { throw new Error('SITE_URL must be a valid HTTPS origin.'); }
  if (parsed.protocol !== 'https:' || parsed.username || parsed.password || parsed.search || parsed.hash || !['', '/'].includes(parsed.pathname)) {
    throw new Error('SITE_URL must be the owner’s real public HTTPS origin only, without a path, credentials, query or fragment.');
  }
  return parsed.origin;
}
function absoluteUrl(origin, route) { return new URL(route.replace(/^\//, ''), `${origin}/`).href; }
function schemaFor(page, origin) {
  const business = {
    '@type': 'GeneralContractor',
    '@id': origin ? `${origin}/#business` : undefined,
    name: orgName,
    legalName: orgName,
    telephone: company.phone,
    email: company.email,
    address: { '@type': 'PostalAddress', streetAddress: 'Kariakoo, Ilala', addressLocality: company.town, addressCountry: 'TZ', postOfficeBoxNumber: company.postalBox },
    employee: { '@type': 'Person', name: company.director, jobTitle: 'Managing Director' },
    identifier: [
      { '@type': 'PropertyValue', propertyID: 'CRB Building registration', value: company.buildingRegistration },
      { '@type': 'PropertyValue', propertyID: 'CRB Civil registration', value: company.civilRegistration },
    ],
    sameAs: [crb.search, crb.building, crb.civil],
    ...(origin ? { url: `${origin}/`, image: photoUrl(page.photo, 1200) } : {}),
  };
  const graph = [business, {
    '@type': 'WebPage', name: page.title, description: page.description,
    ...(origin ? { '@id': `${absoluteUrl(origin, page.route)}#webpage`, url: absoluteUrl(origin, page.route), isPartOf: { '@id': `${origin}/#website` } } : {}),
    inLanguage: 'en-TZ',
  }];
  if (origin) {
    graph.push({ '@type': 'WebSite', '@id': `${origin}/#website`, url: `${origin}/`, name: orgName, publisher: { '@id': `${origin}/#business` }, inLanguage: 'en-TZ' });
    if (page.route !== '/') graph.push({ '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${origin}/` },
      { '@type': 'ListItem', position: 2, name: page.nav || page.title.split('|')[0].trim(), item: absoluteUrl(origin, page.route) },
    ] });
  }
  if (page.faq) graph.push({ '@type': 'FAQPage', mainEntity: page.faq.map((item) => ({ '@type': 'Question', name: item.q, acceptedAnswer: { '@type': 'Answer', text: item.a } })) });
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }, null, 0).replaceAll('<', '\\u003c').replaceAll('>', '\\u003e').replaceAll('&', '\\u0026');
}
function render(page, origin) {
  const canonical = origin ? `<link rel="canonical" href="${absoluteUrl(origin, page.route)}">` : '';
  const ogUrl = origin ? `<meta property="og:url" content="${absoluteUrl(origin, page.route)}">` : '';
  const socialImage = photoUrl(page.photo, 1600);
  const schema = schemaFor(page, origin);
  return `<!doctype html>
<html lang="en-TZ">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(page.title)}</title>
<meta name="description" content="${esc(page.description)}">
<meta name="theme-color" content="#FFFFFF">
<meta property="og:site_name" content="${esc(orgName)}">
<meta property="og:type" content="website">
<meta property="og:locale" content="en_TZ">
<meta property="og:title" content="${esc(page.title)}">
<meta property="og:description" content="${esc(page.description)}">
<meta property="og:image" content="${esc(socialImage)}">
${ogUrl}
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(page.title)}">
<meta name="twitter:description" content="${esc(page.description)}">
<meta name="twitter:image" content="${esc(socialImage)}">
${canonical}
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&family=Onest:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/styles.css">
<script type="application/ld+json">${schema}</script>
</head>
<body>
${header(page.nav)}
<main id="main">
${hero(page)}
${renderSections(page)}
</main>
${footer()}
<script src="/script.js" defer></script>
</body>
</html>`;
}

const origin = getOrigin();
await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });
for (const filename of ['styles.css', 'script.js', 'favicon.svg']) await copyFile(path.join(root, filename), path.join(dist, filename));
await copyFile(path.join(root, 'manus-routes.json'), path.join(dist, 'manus-routes.json'));
for (const page of pages) await writeFile(path.join(dist, page.file), render(page, origin), 'utf8');
await writeFile(path.join(dist, '404.html'), `<!doctype html><html lang="en-TZ"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><title>Page not available | Andjo Engineering</title><link rel="stylesheet" href="/styles.css"></head><body>${header('')}<main id="main" class="not-found"><p class="eyebrow">404</p><h1>Page not found.</h1><p>Return to Andjo Engineering or request a project quotation.</p><a class="button" href="/">Back to home <span aria-hidden="true">↗</span></a></main>${footer()}<script src="/script.js" defer></script></body></html>`, 'utf8');
if (origin) {
  const urls = pages.map((page) => `  <url><loc>${esc(absoluteUrl(origin, page.route))}</loc></url>`).join('\n');
  await writeFile(path.join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`, 'utf8');
  await writeFile(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`, 'utf8');
}
console.log(`Built ${pages.length} routes in dist/${origin ? ` for ${origin}` : ' without guessed canonical URLs; configure SITE_URL with the real public HTTPS origin for release SEO files'}`);
