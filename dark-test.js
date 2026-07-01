const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:5180');
  await page.waitForTimeout(500);
  await page.click('text=Dark');
  await page.waitForTimeout(300);
  await page.screenshot({ path: '/tmp/fuelight-dark-mode.png' });
  await browser.close();
})();
