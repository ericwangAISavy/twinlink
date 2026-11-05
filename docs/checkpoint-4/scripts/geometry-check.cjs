/* eslint-disable @typescript-eslint/no-require-imports -- Standalone rendered geometry verification. */
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
(async()=>{const b=await chromium.launch({executablePath:'/usr/bin/chromium',headless:true,args:['--no-sandbox']});const p=await b.newPage({viewport:{width:1440,height:900}});const failures=[];try{
 await p.goto('http://127.0.0.1:3000/contact',{waitUntil:'networkidle'});
 const hero=await p.locator('.foundation-resource-hero').boundingBox();
 try {assert.equal(Math.round(hero.y+hero.height),585,'Shared blue panel must account for fixed header overlap');}catch(e){failures.push(e.message)}
 await p.setViewportSize({width:390,height:844});await p.goto('http://127.0.0.1:3000',{waitUntil:'networkidle'});await p.waitForTimeout(1500);
 const caption=await p.locator('.foundation-hero-caption').boundingBox();
 try {assert.equal(Math.round(caption.x),55);assert.equal(Math.round(caption.width),280);}catch(e){failures.push(e.message)}
 console.log(JSON.stringify({hero,caption,failures},null,2));assert.deepEqual(failures,[]);
}finally{await b.close()}})().catch(e=>{console.error(e.message);process.exitCode=1});
