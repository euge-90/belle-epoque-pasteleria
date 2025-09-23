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

  // Simple auto-scroll to trigger lazy content
  const autoScroll = async () => {
    try {
      await page.evaluate(async () => {
        const delay = (ms) => new Promise(r => setTimeout(r, ms));
        const vh = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        let y = 0;
        while (y + vh < document.body.scrollHeight) {
          y += Math.floor(vh * 0.8);
          window.scrollTo({ top: y, behavior: 'smooth' });
          await delay(300);
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    } catch {}
  };

  const gotoWithRetry = async (page, url, attempts = 3) => {
    let lastErr;
    for (let i = 0; i < attempts; i++) {
      try {
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 120000 });
        return;
      } catch (e) {
        lastErr = e;
        console.warn(`Navegación fallida (intento ${i+1}/${attempts}). Reintentando...`);
        await new Promise(r => setTimeout(r, 2000));
      }
    }
    throw lastErr;
  };

  for (const vp of viewports) {
    await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 1 });
    for (const cs of colorSchemes) {
      await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: cs.media }]);
  await gotoWithRetry(page, baseUrl, 3);
      // Esperar a que la navbar y la galería de productos estén listas
  await page.waitForSelector('nav.navbar', { timeout: 30000 });
  await page.waitForSelector('.product-gallery', { timeout: 30000 }).catch(() => {});
  // Desplazar para activar cargas perezosas y esperar 30s antes de capturar
  await autoScroll();
  await page.waitForTimeout(30000);
      const file = path.join(outDir, `home-${vp.name}-${cs.name}.png`);
      await page.screenshot({ path: file, fullPage: true });
      console.log('Saved', file);
    }
  }

  await browser.close();
})();
