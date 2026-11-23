const fs = require('fs');
const path = require('path');

const root = __dirname;
const requiredFiles = [
  'index.html',
  'services.html',
  'about.html',
  'contact.html',
  'assets/css/styles.css',
  'assets/js/main.js',
  'netlify.toml',
  '_headers',
  'robots.txt'
];

const failures = [];
for (const relative of requiredFiles) {
  if (!fs.existsSync(path.join(root, relative))) failures.push(`Missing ${relative}`);
}

for (const page of ['index.html', 'services.html', 'about.html', 'contact.html']) {
  const file = path.join(root, page);
  const html = fs.readFileSync(file, 'utf8');
  if (!/^<!DOCTYPE html>/i.test(html.trim())) failures.push(`${page}: missing doctype`);
  if (!/<meta name="viewport"[^>]+width=device-width/i.test(html)) failures.push(`${page}: missing mobile viewport`);
  if (!/<title>[^<]+<\/title>/i.test(html)) failures.push(`${page}: missing title`);

  for (const match of html.matchAll(/(?:src|href)="(assets\/[^"]+)"/gi)) {
    const asset = match[1].split(/[?#]/)[0];
    if (!fs.existsSync(path.join(root, asset))) failures.push(`${page}: missing ${asset}`);
  }
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log('Netlify deployment check passed.');
console.log('Pages: index.html, services.html, about.html, contact.html');
console.log('Static assets and Netlify configuration are present.');
