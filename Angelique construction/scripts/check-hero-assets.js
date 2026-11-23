// Verifies that every remote hero/content image referenced by the pages
// actually resolves, and that the hero sections carry a tint layer so the
// overlaid text stays readable.
//
// Usage: node scripts/check-hero-assets.js
// Exits non-zero when any check fails.

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const pages = ['index.html', 'services.html', 'projects.html', 'about.html', 'quote.html'];

const failures = [];

function collectUrls(html) {
  const urls = new Set();
  const re = /https:\/\/images\.unsplash\.com\/[^"'\s)]+/g;
  let m;
  while ((m = re.exec(html)) !== null) urls.add(m[0]);
  return [...urls];
}

async function checkUrl(url) {
  const probe = url.replace(/([?&])w=\d+/, '$1w=64');
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await fetch(probe, { method: 'GET', redirect: 'follow' });
      if (res.status === 200) {
        const type = res.headers.get('content-type') || '';
        if (!type.startsWith('image/')) return `content-type is ${type || 'missing'}`;
        return null;
      }
      if (res.status >= 500) continue;
      return `HTTP ${res.status}`;
    } catch (err) {
      if (attempt === 2) return err.message;
    }
  }
  return 'unreachable';
}

(async () => {
  const allUrls = new Map();

  for (const page of pages) {
    const file = path.join(root, page);
    const html = fs.readFileSync(file, 'utf8');
    const urls = collectUrls(html);
    if (urls.length === 0) failures.push(`${page}: no Unsplash images referenced`);
    for (const u of urls) allUrls.set(u, [...(allUrls.get(u) || []), page]);
  }

  console.log(`Checking ${allUrls.size} unique image URL(s)...\n`);

  for (const [url, usedOn] of allUrls) {
    const problem = await checkUrl(url);
    const id = (url.match(/photo-[0-9A-Za-z_-]+/) || [url])[0];
    if (problem) {
      failures.push(`${id} -> ${problem} (used on ${usedOn.join(', ')})`);
      console.log(`FAIL  ${problem.padEnd(28)} ${id}`);
    } else {
      console.log(`ok    ${id}`);
    }
  }

  console.log('\nChecking hero tint layers in styles.css...');
  const css = fs.readFileSync(path.join(root, 'styles.css'), 'utf8');

  const tintChecks = [
    ['index hero scrim', /\.hero-gradient\s*\{[^}]*linear-gradient\([^)]*rgba\((?:23,\s*23,\s*20|36,\s*30,\s*32)[^}]*\}/],
    ['section header scrim', /\.page-header-gradient\s*\{[^}]*linear-gradient\([^)]*rgba\((?:23,\s*23,\s*20|36,\s*30,\s*32)[^}]*\}/],
    ['quote band scrim', /\.cta-band--get-quote::before\s*\{[^}]*linear-gradient\([^)]*rgba\(/],
  ];

  for (const [label, re] of tintChecks) {
    if (re.test(css)) {
      console.log(`ok    ${label}`);
    } else {
      failures.push(`styles.css: missing tint layer for ${label}`);
      console.log(`FAIL  ${label}`);
    }
  }

  console.log('');
  if (failures.length) {
    console.log(`FAILED (${failures.length}):`);
    for (const f of failures) console.log('  - ' + f);
    process.exit(1);
  }
  console.log('PASS: all hero images resolve and every hero has a tint layer.');
})();
