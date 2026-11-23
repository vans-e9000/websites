import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const root = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(root, 'dist');
const pages = [
  ['index.html','/'],
  ['services.html','/services.html'],
  ['projects.html','/projects.html'],
  ['about.html','/about.html'],
  ['contact.html','/contact.html'],
  ['quote.html','/quote.html'],
  ['building.html','/building.html'],
  ['civil.html','/civil.html'],
  ['credentials.html','/credentials.html'],
  ['faq.html','/faq.html'],
  ['photo-credits.html','/photo-credits.html']
];
const banned = [
  /placeholder/i, /lorem ipsum/i, /start bootstrap/i, /get bootstrap/i,
  /make a website/i, /make a site/i, /create a website/i, /create a site/i,
  /scaffold/i, /template site/i, /example site/i, /demo site/i,
  /this site is/i, /this project is/i, /demo purpose/i,
  /illustrative pexels photograph/i
];
let errors = [];
for (const [file, route] of pages) {
  const body = readFileSync(path.join(dist, file), 'utf8');
  const getTag = (tagName, html) => {
    const re = new RegExp('<' + tagName + '([ >])', 'i');
    const m = html.match(re);
    if (!m) return '';
    const start = m.index + m[0].length;
    const end = html.indexOf('</' + tagName + '>', start);
    if (end < 0) return '';
    return html.slice(start, end);
  };
  const title = getTag('title', body);
  const h1s = (body.match(/<h1[ >]/gi) || []);
  const bodyText = body.replace(/<[^>]+>/g, ' ').replace(/&nbsp;/gi, ' ').replace(/\s+/g, ' ').trim();
  if (!title || title.length < 5) errors.push(file + ': title missing/short');
  if (h1s.length === 0) errors.push(file + ': no h1');
  if (!bodyText) errors.push(file + ': empty body');
  for (const re of banned) {
    const m = bodyText.match(re);
    if (m) errors.push(file + ': banned ' + m[0]);
  }
}
// alt coverage
const alts = {};
for (const [file, route] of pages) {
  const body = readFileSync(path.join(dist, file), 'utf8');
  const imgs = body.match(/<img[^>]*>/gi) || [];
  for (const img of imgs) {
    const m = img.match(/alt="([^"]*)"/i);
    const alt = m ? m[1] : '';
    if (!alts[alt]) alts[alt] = [];
    alts[alt].push(file);
  }
}
const emptyAlt = Object.entries(alts).filter(([a]) => !a.trim());
if (emptyAlt.length) {
  for (const [a, files] of emptyAlt) {
    errors.push('empty alt ' + a.slice(0, 60) + ' on ' + files.join(', '));
  }
}
// nav + cta checks
const full = readFileSync(path.join(dist, 'index.html'), 'utf8') + readFileSync(path.join(dist, 'services.html'), 'utf8');
const navLabelMatch = full.match(/<a[^>]*aria-current="page"[^>]*>([^<]*)<\/a>/);
if (!navLabelMatch || navLabelMatch[1] !== 'Home') errors.push('active nav label not Home on home page');
if (!full.includes('class="nav-cta"')) errors.push('nav-cta missing');
if (full.indexOf('Get a quote') < 0) errors.push('nav does not contain Get a quote');

// duplicate prose paragraph check across pages
const allTexts = [];
for (const [file, route] of pages) {
  const body = readFileSync(path.join(dist, file), 'utf8');
  const paragraphs = body.match(/<p[^>]*>([\s\S]*?)<\/p>/gi) || [];
  for (const p of paragraphs) {
    const t = p.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim().toLowerCase();
    if (t.length > 80) allTexts.push({file, t});
  }
}
const seen = new Map();
for (const {file, t} of allTexts) {
  if (seen.has(t)) {
    errors.push('duplicate prose on ' + file + ' and ' + seen.get(t));
  }
  seen.set(t, file);
}

// photo credits page content checks
const credits = readFileSync(path.join(dist, 'photo-credits.html'), 'utf8').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
if (!credits.includes('Pexels license')) errors.push('photo-credits: missing license mention');
if (!credits.includes('illustrative stock photography from Pexels')) errors.push('photo-credits: missing staff disclaimer');

// 404 page
const nf = readFileSync(path.join(dist, '404.html'), 'utf8');
if (!nf.includes('Page not found')) errors.push('404: missing heading');

console.log('errors:', errors.length);
errors.forEach(e => console.log(' -', e));
if (errors.length === 0) console.log('OK: all pages pass basic copy/structure checks');
