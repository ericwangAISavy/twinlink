/* eslint-disable @typescript-eslint/no-require-imports -- Standalone browser regression checks. */
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
function contrast(a, b) {
  const light = rgb => {
    const c = rgb.match(/[\d.]+/g).slice(0, 3).map(Number).map(n => { const s=n/255; return s <= .04045 ? s/12.92 : ((s+.055)/1.055)**2.4; });
    return c[0]*.2126+c[1]*.7152+c[2]*.0722;
  };
  const x=light(a), y=light(b); return (Math.max(x,y)+.05)/(Math.min(x,y)+.05);
}
(async () => {
 const b=await chromium.launch({executablePath:'/usr/bin/chromium',headless:true,args:['--no-sandbox']});
 const p=await b.newPage({viewport:{width:1440,height:900},reducedMotion:'no-preference'});const failures=[];
 try {
  await p.goto('http://127.0.0.1:3000',{waitUntil:'networkidle'});await p.waitForTimeout(1500);
  const colors=await p.locator('.foundation-account .foundation-button').evaluate(e=>({bg:getComputedStyle(e).backgroundColor,fg:getComputedStyle(e).color}));
  try { assert.ok(contrast(colors.bg,colors.fg)>=4.5, `Action contrast is ${contrast(colors.bg,colors.fg).toFixed(2)}:1`); } catch(e){ failures.push(e.message); }
  try { assert.ok(await p.locator('#site-footer a[href="/#insights"]').count(), 'Footer must retain Insights destination'); } catch(e){failures.push(e.message);}
  const dots=p.getByRole('button',{name:/^Show slide/});await p.mouse.move(10,100);await p.getByRole('button',{name:'Pause slideshow'}).focus();await p.mouse.move(10,800);
  const before=await dots.evaluateAll(es=>es.findIndex(e=>e.getAttribute('aria-current')==='true'));await p.waitForTimeout(5300);
  const after=await dots.evaluateAll(es=>es.findIndex(e=>e.getAttribute('aria-current')==='true'));
  try { assert.equal(after,before,'Keyboard focus must keep slideshow paused after pointer exits'); } catch(e){failures.push(e.message);}
  console.log(JSON.stringify({colors,contrast:contrast(colors.bg,colors.fg),before,after,failures},null,2));assert.deepEqual(failures,[]);
 } finally { await b.close(); }
})().catch(e=>{console.error(e.message);process.exitCode=1});
