#!/usr/bin/env node
/* ============================================================
   Page-weight budget check (performance skill budgets)
     total page  < 1.5 MB
     JS          < 300 KB
     CSS         < 100 KB
     above-fold images < 500 KB
   Sums each page's HTML + shared CSS + shared JS + every image
   it references. Exits 1 if any budget is exceeded.
   ============================================================ */
"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const PAGES = ["index", "services", "projects", "about", "contact"];

const BUDGETS = {
  totalKB: 1536, // 1.5 MB
  jsKB: 300,
  cssKB: 100,
  aboveFoldKB: 500,
};

const kb = (n) => (n / 1024).toFixed(1) + " KB";

const cssSize = fs.statSync(path.join(ROOT, "assets/css/styles.css")).size;
const jsSize = fs.statSync(path.join(ROOT, "assets/js/main.js")).size;

let failures = 0;
let worstTotal = 0;

console.log(
  "page".padEnd(11) +
    "html".padStart(8) +
    "css".padStart(9) +
    "js".padStart(9) +
    "images".padStart(13) +
    "above-fold".padStart(13) +
    "TOTAL".padStart(12)
);

for (const p of PAGES) {
  const htmlPath = path.join(ROOT, p + ".html");
  const html = fs.readFileSync(htmlPath, "utf8");
  const htmlSize = fs.statSync(htmlPath).size;

  const tags = [...html.matchAll(/<img\b[^>]*>/g)].map((m) => m[0]);
  let imgTotal = 0;
  let aboveFold = 0;

  for (const tag of tags) {
    const src = (tag.match(/\bsrc="([^"]+)"/) || [])[1];
    if (!src) continue;
    const abs = path.join(ROOT, src);
    if (!fs.existsSync(abs)) {
      console.log("  missing image: " + src);
      failures++;
      continue;
    }
    const size = fs.statSync(abs).size;
    imgTotal += size;
    const eager = !/loading="lazy"/.test(tag);
    if (eager) aboveFold += size;
  }

  const total = htmlSize + cssSize + jsSize + imgTotal;
  worstTotal = Math.max(worstTotal, total);

  console.log(
    p.padEnd(11) +
      kb(htmlSize).padStart(8) +
      kb(cssSize).padStart(9) +
      kb(jsSize).padStart(9) +
      kb(imgTotal).padStart(13) +
      kb(aboveFold).padStart(13) +
      kb(total).padStart(12)
  );

  if (total > BUDGETS.totalKB * 1024) {
    console.log("  ✗ " + p + " total exceeds 1.5 MB");
    failures++;
  }
  if (aboveFold > BUDGETS.aboveFoldKB * 1024) {
    console.log("  ✗ " + p + " above-fold images exceed 500 KB");
    failures++;
  }
}

console.log("");
const line = (label, ok, detail) =>
  console.log("  " + (ok ? "PASS" : "FAIL") + "  " + label + " — " + detail);

line("total page < 1.5 MB", worstTotal <= BUDGETS.totalKB * 1024, "worst " + kb(worstTotal));
line("JS < 300 KB", jsSize <= BUDGETS.jsKB * 1024, kb(jsSize));
line("CSS < 100 KB", cssSize <= BUDGETS.cssKB * 1024, kb(cssSize));

if (failures > 0) {
  console.log("\nRESULT: FAIL (" + failures + ")");
  process.exit(1);
}
console.log("\nRESULT: PASS — all budgets met.");