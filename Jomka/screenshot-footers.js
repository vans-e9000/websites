const { chromium } = require('playwright');
const path = require('path');
const exe = path.join(process.env.LOCALAPPDATA, 'ms-playwright', 'chromium-1248', 'chrome-win64', 'chrome.exe');
const BASE = 'http://localhost:8124';

(async () => {
  const browser = await chromium.launch({ executablePath: exe, headless: true });
  const results = [];

  try {
    for (const pageName of ['index.html', 'services.html', 'about.html', 'contact.html']) {
      const page = await browser.newPage({ viewport: { width: 1440, height: 2600 } });
      try {
        await page.goto(BASE + '/' + pageName, { waitUntil: 'networkidle', timeout: 30000 });
        await page.waitForTimeout(2200);
        const footer = page.locator('.site-footer');
        if (!(await footer.count())) {
          results.push({ page: pageName, ok: false, why: 'no .site-footer' });
          continue;
        }
        const box = await footer.boundingBox();
        if (!box) {
          results.push({ page: pageName, ok: false, why: 'footer no box' });
          continue;
        }
        const scrollY = box.y + box.height - 1900;
        if (scrollY > 0) await page.evaluate(y => window.scrollTo(0, y), scrollY);
        await page.waitForTimeout(600);
        const imgPath = 'footer-' + pageName.replace(/\.html$/, '') + '.png';
        await page.screenshot({ path: imgPath, fullPage: false });
        results.push({ page: pageName, ok: true, img: imgPath });
      } finally {
        await page.close();
      }
    }
  } finally {
    await browser.close();
  }

  console.log('screenshots:');
  for (const r of results) console.log(JSON.stringify(r));
})().catch(err => { console.error(err); process.exit(1); });
