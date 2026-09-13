import { chromium } from 'playwright';
import assert from 'node:assert/strict';

// Override to verify the published site after deployment.
const base = process.env.PAGES_URL || 'http://127.0.0.1:4180/rsm/';
const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage();
  const errors = [];
  const failed = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('response', r => { if (r.status() >= 400) failed.push(`${r.status()} ${r.url()}`); });
  const response = await page.goto(base);
  assert.equal(response.status(), 200);
  await page.getByRole('heading', { name: /Make the invisible/ }).waitFor();
  await page.getByRole('link', { name: 'Start with the foundations' }).click();
  await page.getByRole('heading', { name: 'Meet the vessel', exact: true }).waitFor();
  await page.goto(`${base}#/lesson/rsm-equation`);
  const citation = page.locator('a').filter({ hasText: '[RSM p.' }).first();
  assert.match(await citation.getAttribute('href'), /^\/rsm\/sources\/rsm\.pdf#page=/);
  await page.getByText('Show full RSM model · Eqs. 1 / 21', { exact: true }).click();
  assert.equal(await page.locator('.katex-error').count(), 0);
  await page.goto(`${base}#/sources`);
  const pdfLinks = await page.getByRole('link', { name: 'Open provided PDF' }).evaluateAll(es => es.map(e => e.href));
  assert.equal(pdfLinks.length, 2);
  for (const url of pdfLinks) {
    assert.ok(url.startsWith(`${new URL(base).origin}/rsm/sources/`));
    const pdf = await page.request.head(url.split('#')[0]);
    assert.equal(pdf.status(), 200);
    assert.match(pdf.headers()['content-type'], /application\/pdf/);
  }
  await page.evaluate(() => document.fonts.ready);
  assert.equal(await page.evaluate(() => document.fonts.check('14px "DM Sans Variable"')), true);
  assert.deepEqual(errors, []);
  assert.deepEqual(failed, []);
  console.log(`Pages production checks passed at ${base}`);
} finally { await browser.close(); }
