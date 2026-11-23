import { readFile } from "node:fs/promises";

const pages = [
  "index.html",
  "services.html",
  "projects.html",
  "about.html",
  "contact.html",
  "quote.html"
];

const requiredMeta = [
  "description",
  "robots",
  "og:title",
  "og:description",
  "og:image",
  "og:url",
  "twitter:card",
  "twitter:title",
  "twitter:description",
  "twitter:image"
];

let problems = 0;
const report = [];

const titles = new Map();
const descriptions = new Map();
const canonicals = new Map();

for (const page of pages) {
  const html = await readFile(page, "utf8");
  const head = html.slice(0, html.indexOf("</head>"));
  const issue = (msg) => {
    problems += 1;
    report.push(`${page}: ${msg}`);
  };

  const title = (/<title>([^<]+)<\/title>/.exec(head) || [])[1];
  if (!title) issue("missing title");
  else if (titles.has(title)) issue(`duplicate title with ${titles.get(title)}`);
  else titles.set(title, page);
  if (title && title.length > 70) issue(`title is ${title.length} chars`);

  for (const name of requiredMeta) {
    const pattern = new RegExp(`<meta (?:name|property)="${name}" content="([^"]+)"`);
    if (!pattern.test(head)) issue(`missing meta ${name}`);
  }

  const desc = (/<meta name="description" content="([^"]+)"/.exec(head) || [])[1];
  if (desc) {
    if (descriptions.has(desc)) issue(`duplicate description with ${descriptions.get(desc)}`);
    else descriptions.set(desc, page);
    if (desc.length > 175) issue(`description is ${desc.length} chars`);
  }

  const canonical = (/<link rel="canonical" href="([^"]+)"/.exec(head) || [])[1];
  if (!canonical) issue("missing canonical");
  else {
    if (canonicals.has(canonical)) issue(`duplicate canonical with ${canonicals.get(canonical)}`);
    else canonicals.set(canonical, page);
    if (!canonical.startsWith("https://miteteconstruction.co.tz/")) issue("canonical is not on the production domain");
  }

  const h1s = (html.match(/<h1\b/g) || []).length;
  if (h1s !== 1) issue(`${h1s} h1 elements`);

  const ld = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  for (const block of ld) {
    try {
      JSON.parse(block[1]);
    } catch (error) {
      issue(`invalid JSON-LD: ${error.message}`);
    }
  }
  if (ld.length === 0) issue("no JSON-LD");

  if (!html.includes('lang="en"')) issue("missing lang attribute");
  if (!/name="viewport" content="width=device-width, initial-scale=1"/.test(head)) issue("viewport problem");
  if (html.includes("\u2014")) issue("em dash present");

  const imgs = [...html.matchAll(/<img\b[^>]*>/g)].map((m) => m[0]);
  for (const img of imgs) {
    if (!/alt="[^"]+"/.test(img)) issue("image without alt");
    if (!/loading="(lazy|eager)"/.test(img)) issue("image without loading attribute");
    if (!/width="\d+"/.test(img) || !/height="\d+"/.test(img)) issue("image without dimensions");
  }
}

const sitemap = await readFile("sitemap.xml", "utf8");
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
for (const page of pages) {
  const expected = page === "index.html" ? "https://miteteconstruction.co.tz/" : `https://miteteconstruction.co.tz/${page}`;
  if (!locs.includes(expected)) {
    problems += 1;
    report.push(`sitemap: missing ${expected}`);
  }
}
if (!sitemap.includes("<lastmod>")) {
  problems += 1;
  report.push("sitemap: no lastmod");
}

const robots = await readFile("robots.txt", "utf8");
if (!robots.includes("Sitemap:")) {
  problems += 1;
  report.push("robots: no sitemap line");
}
if (/Disallow: \/(?!\s*$)/.test(robots)) {
  problems += 1;
  report.push("robots: blocks a path");
}

const llms = await readFile("llms.txt", "utf8");
if (!llms.startsWith("# ")) {
  problems += 1;
  report.push("llms.txt: no h1");
}
if (!llms.includes("## Pages")) {
  problems += 1;
  report.push("llms.txt: no page list");
}

const headers = await readFile("_headers", "utf8");
for (const header of ["Content-Security-Policy", "Strict-Transport-Security", "X-Content-Type-Options"]) {
  if (!headers.includes(header)) {
    problems += 1;
    report.push(`_headers: missing ${header}`);
  }
}

report.forEach((line) => console.log(line));
console.log(problems === 0 ? "all checks passed" : `${problems} problems found`);
process.exit(problems === 0 ? 0 : 1);
