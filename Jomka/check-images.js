const http = require('http');
const fs = require('fs');
const path = require('path');
const fetchPage = () => new Promise((resolve, reject) => {
  http.get('http://127.0.0.1:18084/contact.html', res => {
    let d = '';
    res.on('data', c => d += c);
    res.on('end', () => resolve(d));
  }).on('error', reject);
});

(async () => {
  const html = await fetchPage();
  console.log('HTML length', html.length);
  const bodyStart = html.indexOf('<body');
  const bodyEnd = html.indexOf('</body>');
  const body = html.slice(bodyStart, bodyEnd);
  const imgRe = /<img\b[^>]*>/gi;
  let m;
  const imgs = [];
  while ((m = imgRe.exec(body))) {
    const s = m[0];
    const src = (s.match(/src="([^"]+)"/i) || [])[1];
    const width = (s.match(/width="([^"]+)"/i) || [])[1];
    const height = (s.match(/height="([^"]+)"/i) || [])[1];
    const alt = (s.match(/alt="([^"]+)"/i) || [])[1];
    const loading = (s.match(/loading="([^"]+)"/i) || [])[1];
    imgs.push({ src, width, height, alt, loading, raw: s });
  }
  console.log('imgs found in body:', imgs.length);
  for (const i of imgs) {
    console.log(JSON.stringify(i));
  }
  const hero = body.match(/atmos-hero-media[^>]*src="([^"]+)"/i);
  console.log('hero src:', hero && hero[1]);
})().catch(e => { console.error(e); process.exit(1); });
