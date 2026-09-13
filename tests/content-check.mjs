import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const browser=await chromium.launch({headless:true});const page=await browser.newPage({viewport:{width:1440,height:1000}});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.goto('http://127.0.0.1:4178');
const lessons=await page.evaluate(async()=>{const data=await import('/src/content/index.ts');return data.lessons});
assert.equal(new Set(lessons.map(l=>l.id)).size,lessons.length);
let references=0, equations=0;
for(const l of lessons){
 for(const id of l.prerequisites||[])assert.ok(lessons.some(l=>l.id===id),`missing prerequisite ${id}`);
 assert.equal(l.takeaways.length,3);
 for(const s of l.sections)for(const r of s.refs||[]){references++;assert.ok(r.page>=1&&r.page<=(r.doc==='rsm'?13:213));if(r.end)assert.ok(r.end>=r.page&&r.end<=(r.doc==='rsm'?13:213));}
 await page.goto(`http://127.0.0.1:4178/#/lesson/${l.id}`);await page.locator('h1').waitFor();
 await page.locator('details').evaluateAll(es=>es.forEach(e=>e.open=true));
 assert.equal(await page.locator('.katex-error').count(),0,`math error ${l.id}`);
 equations+=await page.locator('.katex').count();
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,`desktop overflow ${l.id}`);
 const oversizedIcons=await page.locator('svg.lucide').evaluateAll(es=>es.filter(e=>e.getBoundingClientRect().width>40).length);assert.equal(oversizedIcons,0,`oversized icon ${l.id}`);
 const links=await page.locator('a[href^="#/lesson/"]').evaluateAll(es=>es.map(e=>e.getAttribute('href').split('/')[2]));for(const id of links)assert.ok(lessons.some(l=>l.id===id),`missing link ${id}`);
}
await page.goto('http://127.0.0.1:4178/#/lesson/ch5-inverse');await page.locator('.figure-shell').screenshot({path:'tmp/inverse-detail.png'});
await page.goto('http://127.0.0.1:4178/#/lesson/rsm-equation');await page.getByText('Show full RSM model · Eqs. 1 / 21',{exact:true}).click();await page.locator('.figure-shell').screenshot({path:'tmp/equation-detail.png'});
await page.goto('http://127.0.0.1:4178/#/lesson/ch5-geometry');await page.locator('.figure-shell').screenshot({path:'tmp/mesh-detail.png'});
await page.goto('http://127.0.0.1:4178/#/lesson/comsol-exercise');await page.locator('.figure-shell').screenshot({path:'tmp/comsol-desktop.png'});
await page.emulateMedia({reducedMotion:'reduce'});await page.setViewportSize({width:390,height:844});await page.goto('http://127.0.0.1:4178/#/home');await page.screenshot({path:'tmp/mobile-viewport.png'});
for(const l of lessons){await page.goto(`http://127.0.0.1:4178/#/lesson/${l.id}`);await page.locator('details').evaluateAll(es=>es.forEach(e=>e.open=true));assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,`mobile overflow ${l.id}`);}
assert.equal(errors.length,0,errors.join('\n'));
fs.writeFileSync('tmp/content-results.json',JSON.stringify({lessons:lessons.length,references,equations,errors,checked:'All lesson routes, prerequisite links, PDF page ranges, 3 takeaways, expanded KaTeX, icon sizes, desktop and mobile overflow'},null,2));
console.log(`Passed: ${lessons.length} lessons, ${references} section citations, ${equations} rendered equation blocks; desktop/mobile checks.`);await browser.close();
