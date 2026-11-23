const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const publishDir = path.join(root, 'dist');
const pages = ['index.html', 'about.html', 'services.html', 'projects.html', 'contact.html'];

// Recreate only this generated output directory; never copy the workspace wholesale.
fs.rmSync(publishDir, { recursive: true, force: true });
fs.mkdirSync(publishDir, { recursive: true });

for (const page of pages) {
  const source = path.join(root, page);
  if (!fs.existsSync(source)) throw new Error(`Required page is missing: ${page}`);
  fs.copyFileSync(source, path.join(publishDir, page));
}

for (const required of ['assets/css/styles.css', 'assets/js/main.js']) {
  if (!fs.existsSync(path.join(root, required))) {
    throw new Error(`Required site asset is missing: ${required}`);
  }
}
fs.cpSync(path.join(root, 'assets'), path.join(publishDir, 'assets'), { recursive: true });
fs.copyFileSync(path.join(root, 'robots.txt'), path.join(publishDir, 'robots.txt'));

console.log(`Prepared ${pages.length} HTML pages and assets in ${publishDir}`);
