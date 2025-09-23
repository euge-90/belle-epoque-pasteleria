const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

(async () => {
  const baseUrl = process.env.SITE_URL || 'https://euge-90.github.io/belle-epoque-pasteleria/';
  const outDir = path.join(__dirname, '..', 'images', 'screenshots');
  fs.mkdirSync(outDir, { recursive: true });
  const localIndexUrl = 'file://' + path.resolve(__dirname, '..', 'index.html').replace(/\\/g, '/');

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-gpu',
        '--no-zygote',
        '--disable-dev-shm-usage',
        '--window-size=1280,800'
      ]
    });
  } catch (e) {
    console.error('Error lanzando Puppeteer/Chromium:', e && e.stack ? e.stack : e);
    process.exit(1);
  }

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
  page.setDefaultNavigationTimeout(120000);
  page.setDefaultTimeout(60000);
  // Log de consola del navegador en el workflow
  page.on('console', (msg) => {
    try {
      console.log('[browser]', msg.type().toUpperCase(), msg.text());
    } catch {}
  });
  page.on('pageerror', (err) => {
    console.error('[browser] PAGEERROR', err && err.message ? err.message : err);
  });

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

  const gotoWithRetry = async (page, url, attempts = 5) => {
    let lastErr;
    for (let i = 0; i < attempts; i++) {
      try {
        // Usar domcontentloaded para evitar bloqueos por recursos externos
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 120000 });
        // Asegurar que al menos el body esté listo
        await page.waitForSelector('body', { timeout: 15000 }).catch(() => {});
        return;
      } catch (e) {
        lastErr = e;
        console.warn(`Navegación fallida (intento ${i+1}/${attempts}). Reintentando...`);
        const backoff = 1000 * Math.pow(2, i); // 1s,2s,4s,8s,16s
        await new Promise(r => setTimeout(r, backoff));
      }
    }
    throw lastErr;
  };

  const navigateWithFallback = async () => {
    try {
      await gotoWithRetry(page, baseUrl, 5);
      console.log(`[nav] Usando URL remota: ${baseUrl}`);
      return baseUrl;
    } catch (e) {
      console.warn(`[nav] Falló URL remota (${baseUrl}). Probando local file://`);
      await gotoWithRetry(page, localIndexUrl, 3);
      console.log(`[nav] Usando URL local: ${localIndexUrl}`);
      return localIndexUrl;
    }
  };

  let savedCount = 0;
  const failures = [];

  for (const vp of viewports) {
    await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 1 });
    for (const cs of colorSchemes) {
      try {
        await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: cs.media }]);
  const usedUrl = await navigateWithFallback();

        // Intentar encontrar elementos clave (sin fallar si no aparecen)
        await page.waitForSelector('nav.navbar', { timeout: 30000 })
          .catch(() => console.warn('nav.navbar no encontrado antes del timeout, se continúa de todas formas.'));
        await page.waitForSelector('.product-gallery', { timeout: 30000 })
          .catch(() => console.warn('.product-gallery no encontrado antes del timeout, se continúa de todas formas.'));

  // Desplazar para activar cargas perezosas y esperar 30s antes de capturar
        await autoScroll();
  await new Promise(res => setTimeout(res, 30000));

  const srcTag = /^(file:\/\/)/.test(usedUrl) ? 'local' : 'remote';
  const file = path.join(outDir, `home-${vp.name}-${cs.name}-${srcTag}.png`);
        // Intentar captura fullPage, si falla, caer a viewport-only
        try {
          await page.screenshot({ path: file, fullPage: true });
        } catch (capErr) {
          console.warn(`Fallo captura fullPage para ${vp.name}/${cs.name}, intentando viewport-only.`, capErr && capErr.message ? capErr.message : capErr);
          await page.screenshot({ path: file, fullPage: false });
        }
        console.log('Saved', file);
        savedCount++;
      } catch (err) {
        const msg = `Fallo capturando ${vp.name}/${cs.name}: ${err && err.message ? err.message : err}`;
        failures.push(msg);
        console.error(msg);
        // Continuar con el siguiente combo sin abortar todo el proceso
      }
    }
  }

  await browser.close();

  if (savedCount === 0) {
    // Si no se guardó ninguna captura, marcar fallo total
    throw new Error(`No se pudo generar ninguna captura. Detalles: ${failures.join(' | ')}`);
  } else if (failures.length > 0) {
    console.warn(`Capturas completadas parcialmente: ${savedCount} ok, ${failures.length} fallidas.`);
  } else {
    console.log(`Todas las capturas completadas: ${savedCount} imágenes.`);
  }
})().catch((err) => {
  console.error('Fallo general en el script de capturas:', err && err.stack ? err.stack : err);
  process.exit(1);
});
