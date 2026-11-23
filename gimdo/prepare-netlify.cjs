const fs = require('node:fs');
const path = require('node:path');

const root = __dirname;
const output = path.join(root, 'dist');
const requiredFiles = ['styles.css', 'script.js', 'robots.txt', '404.html'];
const htmlFiles = fs.readdirSync(root)
  .filter((name) => /^[a-z0-9-]+\.html$/i.test(name))
  .sort();

if (!htmlFiles.includes('index.html')) {
  throw new Error('Missing index.html at the project root.');
}

fs.rmSync(output, { recursive: true, force: true });
fs.mkdirSync(output, { recursive: true });

function copyRequired(relativePath) {
  const source = path.resolve(root, relativePath);
  const rootPrefix = path.resolve(root) + path.sep;
  if (!source.startsWith(rootPrefix) || !fs.existsSync(source) || !fs.statSync(source).isFile()) {
    throw new Error(`Required deployment file is missing: ${relativePath}`);
  }
  const destination = path.join(output, path.relative(root, source));
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.copyFileSync(source, destination);
}

for (const file of [...htmlFiles, ...requiredFiles]) {
  copyRequired(file);
}

const siteFiles = [...htmlFiles, 'styles.css', 'script.js']
  .map((file) => fs.readFileSync(path.join(root, file), 'utf8'))
  .join('\n');
const assetPattern = /assets\/[A-Za-z0-9_./-]+\.(?:webp|jpe?g|png|svg|woff2?)/gi;
const referencedAssets = new Set(siteFiles.match(assetPattern) || []);

for (const asset of referencedAssets) {
  copyRequired(asset);
}

const creditsFile = 'assets/pexels/credits.txt';
if (fs.existsSync(path.join(root, creditsFile))) {
  copyRequired(creditsFile);
}

const configuredUrl = process.env.SITE_URL || process.env.URL || '';
let siteUrl = '';
if (configuredUrl) {
  const parsed = new URL(configuredUrl);
  if (!['https:', 'http:'].includes(parsed.protocol)) {
    throw new Error('SITE_URL or Netlify URL must use http or https.');
  }
  siteUrl = parsed.origin.replace(/\/$/, '');
}

function escapeXml(value) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&apos;');
}

if (siteUrl) {
  for (const file of htmlFiles) {
    if (file === '404.html') continue;
    const destination = path.join(output, file);
    let html = fs.readFileSync(destination, 'utf8');
    html = html.replace(/\s*<link\s+rel=["']canonical["'][^>]*>/gi, '');
    const canonicalPath = file === 'index.html' ? '/' : `/${file}`;
    const canonicalTag = `  <link rel="canonical" href="${siteUrl}${canonicalPath}">`;
    html = html.replace(/<\/head>/i, `${canonicalTag}\n</head>`);
    html = html.replace(
      /((?:property|name)=["'](?:og:image|twitter:image)["']\s+content=["'])([^"']+)(["'])/gi,
      (_match, before, imagePath, after) => {
        const absoluteImage = /^https?:\/\//i.test(imagePath)
          ? imagePath
          : `${siteUrl}/${imagePath.replace(/^\/+/, '')}`;
        return `${before}${absoluteImage}${after}`;
      },
    );
    fs.writeFileSync(destination, html);
  }

  const sitemapPaths = ['/', ...htmlFiles.filter((file) => !['index.html', '404.html'].includes(file)).map((file) => `/${file}`)];
  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...sitemapPaths.map((pagePath) => `  <url><loc>${escapeXml(`${siteUrl}${pagePath}`)}</loc></url>`),
    '</urlset>',
    '',
  ].join('\n');
  fs.writeFileSync(path.join(output, 'sitemap.xml'), sitemap);

  let robots = fs.readFileSync(path.join(output, 'robots.txt'), 'utf8');
  robots = robots.replace(/^Sitemap:.*$/gim, '').trimEnd();
  robots += `\n\nSitemap: ${siteUrl}/sitemap.xml\n`;
  fs.writeFileSync(path.join(output, 'robots.txt'), robots);
} else {
  let robots = fs.readFileSync(path.join(output, 'robots.txt'), 'utf8');
  robots = robots.replace(/^Sitemap:.*\r?\n?/gim, '').trimEnd() + '\n';
  fs.writeFileSync(path.join(output, 'robots.txt'), robots);
}

console.log(`Netlify bundle prepared at dist/ (${htmlFiles.length} HTML pages, ${referencedAssets.size} referenced local assets).`);
if (siteUrl) {
  console.log(`Canonical URLs and sitemap generated for ${siteUrl}.`);
} else {
  console.log('No site URL was available. Netlify will add production canonical URLs and a sitemap when it runs this build with its URL environment variable.');
}
