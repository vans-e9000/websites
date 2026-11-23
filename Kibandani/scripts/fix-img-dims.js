#!/usr/bin/env node
/* One-off: rewrite width/height attrs on every <img> to the actual JPEG
   intrinsic dimensions (keeps CLS at zero after image re-fetches). */
"use strict";
const fs = require("fs");
const path = require("path");
const ROOT = path.resolve(__dirname, "..");

function jpegDims(buf) {
  let i = 2;
  while (i < buf.length) {
    if (buf[i] !== 0xff) { i++; continue; }
    const marker = buf[i + 1];
    if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
      return { h: buf.readUInt16BE(i + 5), w: buf.readUInt16BE(i + 7) };
    }
    if (marker === 0xd8 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) { i += 2; continue; }
    i += 2 + buf.readUInt16BE(i + 2);
  }
  return null;
}

const pages = ["index.html", "services.html", "projects.html", "about.html", "contact.html"];
let changed = 0;

for (const page of pages) {
  const file = path.join(ROOT, page);
  let html = fs.readFileSync(file, "utf8");
  html = html.replace(/<img\b[^>]*>/g, (tag) => {
    const src = (tag.match(/\bsrc="([^"]+)"/) || [])[1];
    if (!src) return tag;
    const abs = path.join(ROOT, src);
    if (!fs.existsSync(abs)) { console.log("missing: " + src); return tag; }
    const d = jpegDims(fs.readFileSync(abs));
    if (!d) return tag;
    let out = tag;
    if (/\bwidth="\d+"/.test(out)) out = out.replace(/\bwidth="\d+"/, 'width="' + d.w + '"');
    else out = out.replace("<img", '<img width="' + d.w + '"');
    if (/\bheight="\d+"/.test(out)) out = out.replace(/\bheight="\d+"/, 'height="' + d.h + '"');
    else out = out.replace("<img", '<img height="' + d.h + '"');
    if (out !== tag) changed++;
    return out;
  });
  fs.writeFileSync(file, html);
}
console.log("updated " + changed + " img tags");