#!/usr/bin/env node
/* ============================================================
   Image uniqueness gate
   Extracts every <img src> from each page and asserts:
     1. Every referenced file exists on disk.
     2. Every page has >= MIN_PER_PAGE unique images.
     3. The five pages' image sets are pairwise disjoint
        (no image appears on more than one page).
   Exit code 0 = pass, 1 = fail.
   ============================================================ */
"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const PAGES = ["index.html", "services.html", "projects.html", "about.html", "contact.html"];
const MIN_PER_PAGE = 4;

function extractImages(html) {
  const srcs = [];
  const re = /<img\b[^>]*\bsrc\s*=\s*["']([^"']+)["']/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    // strip query strings, keep relative path
    srcs.push(m[1].split("?")[0]);
  }
  return [...new Set(srcs)];
}

let failed = false;
const problems = [];
const pageSets = new Map();

// --- collect per-page sets ---
for (const page of PAGES) {
  const file = path.join(ROOT, page);
  if (!fs.existsSync(file)) {
    problems.push(`MISSING PAGE: ${page}`);
    failed = true;
    continue;
  }
  const html = fs.readFileSync(file, "utf8");
  const imgs = extractImages(html);
  pageSets.set(page, new Set(imgs));

  // 1. existence on disk
  for (const src of imgs) {
    const abs = path.join(ROOT, src.replace(/^\.\//, ""));
    if (!fs.existsSync(abs)) {
      problems.push(`${page}: references missing file ${src}`);
      failed = true;
    }
  }

  // 2. minimum count
  if (imgs.length < MIN_PER_PAGE) {
    problems.push(`${page}: only ${imgs.length} images (minimum ${MIN_PER_PAGE})`);
    failed = true;
  }
}

// 3. pairwise disjointness
const pages = [...pageSets.keys()];
for (let i = 0; i < pages.length; i++) {
  for (let j = i + 1; j < pages.length; j++) {
    const a = pages[i];
    const b = pages[j];
    for (const src of pageSets.get(a)) {
      if (pageSets.get(b).has(src)) {
        problems.push(`REUSED IMAGE: ${src} appears on both ${a} and ${b}`);
        failed = true;
      }
    }
  }
}

// --- report ---
console.log("Image uniqueness check");
console.log("======================");
for (const [page, set] of pageSets) {
  console.log(`  ${page.padEnd(16)} ${String(set.size).padStart(2)} images`);
}
const all = new Set();
for (const set of pageSets.values()) set.forEach((s) => all.add(s));
console.log(`  ${"TOTAL (unique)".padEnd(16)} ${String(all.size).padStart(2)} images`);

if (problems.length) {
  console.log("\nFAILURES:");
  for (const p of problems) console.log("  ✗ " + p);
}

if (failed) {
  console.log("\nRESULT: FAIL");
  process.exit(1);
}
console.log("\nRESULT: PASS — all pages meet the minimum and no image repeats across pages.");