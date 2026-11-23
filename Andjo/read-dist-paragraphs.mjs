import { readFileSync } from 'node:fs';
import path from 'node:path';
const dist = path.join(process.cwd(), 'dist');
const pages = ['index.html', 'services.html', 'about.html', 'faq.html'];
const allTexts = [];
for (const file of pages) {
  const body = readFileSync(path.join(dist, file), 'utf8');
  const paragraphs = body.match(/<p[^>]*>([\s\S]*?)<\/p>/gi) || [];
  for (const p of paragraphs) {
    const t = p.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim().toLowerCase();
    if (t.length > 80) allTexts.push({ file, t });
  }
}
const seen = new Map();
for (const { file, t } of allTexts) {
  if (seen.has(t)) {
    console.log('DUP', file, '<->', seen.get(t));
    console.log('   TEXT:', t.slice(0, 200));
  }
  seen.set(t, file);
}
console.log('total long paragraphs:', allTexts.length);
