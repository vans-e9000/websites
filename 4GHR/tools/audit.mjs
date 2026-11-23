import { readFileSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";

const pages = ["index.html", "services.html", "projects.html", "about.html", "contact.html"];
const bannedWords = [
  "harness",
  "leverage",
  "utilize",
  "delve",
  "tapestry",
  "beacon",
  "testament",
  "realm",
  "synergy",
  "paradigm",
  "ecosystem",
  "game-changer",
  "robust",
  "seamless",
  "cutting-edge",
  "prototype",
  "dummy",
  "sample",
  "placeholder",
  "demo",
  "mockup",
  "under construction",
];
const bannedTransitions = [
  "here's the thing",
  "let's unpack this",
  "at the end of the day",
  "in today's fast-paced world",
  "moreover",
  "furthermore",
];

const failures = [];
const notes = [];
const imageUrls = new Map();

function check(condition, message) {
  if (!condition) failures.push(message);
}

for (const page of pages) {
  const html = readFileSync(page, "utf8");
  const text = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z]+;/gi, " ")
    .replace(/\s+/g, " ")
    .toLowerCase();

  if (html.includes("\u2014")) failures.push(page + ": contains em dash");
  if (html.includes("\u2013")) notes.push(page + ": contains en dash");

  for (const word of bannedWords) {
    if (new RegExp("\\b" + word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\b", "i").test(text)) {
      failures.push(page + ": banned word in visible text -> " + word);
    }
    if (new RegExp(word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i").test(text)) {
      notes.push(page + ": substring of banned word -> " + word);
    }
  }
  for (const phrase of bannedTransitions) {
    if (text.includes(phrase)) failures.push(page + ": banned transition -> " + phrase);
  }

  check((html.match(/<h1[\s>]/g) || []).length === 1, page + ": must have exactly one h1");
  check(/<title>[^<]{10,70}<\/title>/.test(html), page + ": title length outside 10-70");
  check(/<meta name="description" content="[^"]{80,200}"/.test(html), page + ": description missing or length issue");
  check(/<link rel="canonical" href="https:\/\/4ghrinvestment\.co\.tz\//.test(html), page + ": canonical missing");
  check(/og:image/.test(html) && /twitter:card/.test(html), page + ": social metadata missing");
  check(/<main id="main-content">/.test(html), page + ": main landmark missing");
  check(/class="skip-link"/.test(html), page + ": skip link missing");
  check(/apple-touch-icon/.test(html) && /favicon\.svg/.test(html), page + ": favicon set incomplete");

  const alts = [...html.matchAll(/<img\b[^>]*alt="([^"]*)"/g)].map((m) => m[1]);
  const altText = alts.join(" ").toLowerCase();
  for (const word of bannedWords) {
    const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    if (new RegExp("\\b" + escaped + "\\b", "i").test(altText)) {
      failures.push(page + ": banned word in image alt text -> " + word);
    }
  }

  for (const match of html.matchAll(/<img\b[^>]*>/g)) {
    const tag = match[0];
    const src = (tag.match(/src="([^"]+)"/) || [])[1];
    const alt = (tag.match(/alt="([^"]*)"/) || [])[1];
    check(Boolean(src), page + ": img without src");
    check(Boolean(alt && alt.trim()), page + ": img without alt -> " + (src || "unknown"));
    check(tag.includes('loading="lazy"') || tag.includes("fetchpriority"), page + ": img loading strategy missing");
    if (src) {
      const pexelsMatch = src.match(/images\.pexels\.com\/photos\/(\d+)\//);
      const unsplashMatch = src.match(/images\.unsplash\.com\/(photo-[^?]+)/);
      if (!pexelsMatch && !unsplashMatch) {
        failures.push(page + ": unsupported image URL -> " + src);
      }
      const id = pexelsMatch ? "pexels-" + pexelsMatch[1] : "unsplash-" + unsplashMatch[1];
      if (imageUrls.has(id)) failures.push(page + ": duplicate image id " + id + " also used on " + imageUrls.get(id));
      else imageUrls.set(id, page);
    }
  }

  for (const match of html.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>/g)) {
    const href = match[1];
    if (/^(https?:|mailto:|tel:|#)/.test(href)) continue;
    const [rawFile, hash] = href.split("#");
    const file = rawFile.split("?")[0];
    const target = file || page;
    check(existsSync(target), page + ": broken internal link -> " + href);
    if (hash && target.endsWith(".html")) {
      const targetHtml = readFileSync(target, "utf8");
      check(targetHtml.includes('id="' + hash + '"'), page + ": missing anchor #" + hash + " in " + target);
    }
  }

  for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      JSON.parse(match[1]);
    } catch (error) {
      failures.push(page + ": invalid JSON-LD -> " + error.message);
    }
  }

  const headings = [...html.matchAll(/<h([1-6])[\s>]/g)].map((m) => Number(m[1]));
  let last = 0;
  for (const level of headings) {
    if (last && level > last + 1) notes.push(page + ": heading jump h" + last + " to h" + level);
    last = level;
  }

  for (const match of html.matchAll(/<(input|select|textarea)\b[^>]*>/g)) {
    const tag = match[0];
    const id = (tag.match(/id="([^"]+)"/) || [])[1];
    if (id) check(html.includes('for="' + id + '"'), page + ": form control without label -> " + id);
  }

  const glass = (html.match(/backdrop-filter/g) || []).length;
  notes.push(page + ": " + glass + " glass surfaces");
}

const report = {
  pages: pages.length,
  uniqueImages: imageUrls.size,
  imageIds: [...imageUrls.entries()],
  failures,
  notes,
};
console.log(JSON.stringify(report, null, 2));
