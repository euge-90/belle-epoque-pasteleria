const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

(async () => {
  const baseUrl = process.env.SITE_URL || 'https://euge-90.github.io/belle-epoque-pasteleria/';
  const outDir = path.join(__dirname, '..', 'images', 'screenshots');
  fs.mkdirSync(outDir, { recursive: true });

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox','--disable-setuid-sandbox']
  });

  const viewports = [
    { name: 'desktop', width: 1280, height: 800 },
    { name: 'mobile', width: 390, height: 844 }, // iPhone 13-ish
  ];

  const colorSchemes = [
    { name: 'light', media: 'light' },
    { name: 'dark', media: 'dark' }
  ];

  const page = await browser.newPage();
  await page.setCacheEnabled(false);

  for (const vp of viewports) {
    await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 1 });
    for (const cs of colorSchemes) {
      await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: cs.media }]);
      await page.goto(baseUrl, { waitUntil: 'networkidle2', timeout: 120000 });
      // Esperar a que la navbar y la galería de productos estén listas
      await page.waitForSelector('nav.navbar', { timeout: 20000 });
      await page.waitForSelector('.product-gallery', { timeout: 20000 }).catch(() => {});
      const file = path.join(outDir, `home-${vp.name}-${cs.name}.png`);
      await page.screenshot({ path: file, fullPage: true });
      console.log('Saved', file);
    }
  }

  await browser.close();
})();
