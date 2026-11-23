const { chromium } = require('playwright');
const path = require('path');
const exe = path.join(
  process.env.LOCALAPPDATA,
  'ms-playwright',
  'chromium-1248',
  'chrome-win64',
  'chrome.exe'
);
const BASE = 'http://localhost:18085';

(async () => {
  const browser = await chromium.launch({ executablePath: exe, headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 2600 } });

  try {
    await page.goto(BASE + '/contact.html', { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2200);

    await page.evaluate(() => {
      const g = document.querySelector('.gallery-band .gallery');
      if (g) g.scrollIntoView({ block: 'center' });
    });
    await page.waitForTimeout(2200);

    const boxes = await page.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll('.gallery-band .gallery img.shot'));
      return imgs.map(img => {
        const r = img.getBoundingClientRect();
        return {
          src: img.src.split('/').pop(),
          natW: img.naturalWidth,
          natH: img.naturalHeight,
          x: Math.round(r.x), y: Math.round(r.y),
          w: Math.round(r.width), h: Math.round(r.height),
          display: getComputedStyle(img).display,
          opacity: parseFloat(getComputedStyle(img).opacity),
          loaded: img.complete,
          inView: r.bottom < window.innerHeight + 4 && r.top > -4
        };
      });
    });

    console.log('boxes:', JSON.stringify(boxes, null, 2));
    await page.screenshot({ path: 'preview-contact.png', fullPage: true });
    console.log('screenshot: preview-contact.png');
  } finally {
    await browser.close();
  }
})().catch(err => {
  console.error(err);
  process.exit(1);
});
