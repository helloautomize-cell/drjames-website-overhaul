/* eslint-disable @typescript-eslint/no-require-imports */
const {chromium}=require('playwright');
(async()=>{
const b=await chromium.launch({channel:'chrome'});
const L=[];
// --- overflow: all widths x all routes ---
for(const w of [390,768,1024,1440]){
for(const route of ['/','/thank-you/','/nonexistent/']){
const c=await b.newContext({viewport:{width:w,height:844}});
const p=await c.newPage();
await p.goto('http://localhost:4811'+route);
await p.waitForTimeout(1300);
const so=await p.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
L.push((so===0?'PASS':'FAIL')+' overflow '+route+' @'+w+' = '+so+'px');
await c.close();}}
// --- desktop shell @1440 ---
let c=await b.newContext({viewport:{width:1440,height:900}});
let p=await c.newPage();
await p.goto('http://localhost:4811/');
await p.waitForTimeout(1400);
await p.locator('.cookie-live .btn-s').click().catch(()=>{});
const trig=p.locator('.nav-item.mega .nav-btn');
const panel=p.locator('#menu-conditions');
await trig.hover();await p.waitForTimeout(60);
L.push((await panel.isVisible()?'FAIL':'PASS')+' hover 60ms closed');
await p.waitForTimeout(220);
L.push((await panel.isVisible()?'PASS':'FAIL')+' hover 220ms open');
await p.mouse.move(30,700);await p.waitForTimeout(500);
L.push((await panel.isVisible()?'FAIL':'PASS')+' leave closes');
await trig.focus();await p.keyboard.press('ArrowDown');await p.waitForTimeout(120);
L.push((await panel.isVisible()?'PASS':'FAIL')+' ArrowDown opens');
await p.keyboard.press('Escape');await p.waitForTimeout(120);
const fo=await p.evaluate(()=>document.activeElement.textContent.trim());
L.push((fo==='Conditions'?'PASS':'FAIL')+' Esc closes, focus -> '+fo);
await p.locator('.nav-item:not(.mega) .nav-btn').focus();
await p.waitForTimeout(150);
L.push((await p.locator('#menu-visit').isVisible()?'PASS':'FAIL')+' visit opens on focus');
await p.keyboard.press('Enter');await p.waitForTimeout(150);
L.push((await p.locator('#menu-visit').isVisible()?'FAIL':'PASS')+' Enter toggles visit closed');
await c.close();
// --- mobile @390 ---
c=await b.newContext({viewport:{width:390,height:844}});
p=await c.newPage();
await p.goto('http://localhost:4811/');
await p.waitForTimeout(1500);
await p.locator('.cookie-live .btn-s').click();await p.waitForTimeout(200);
const stored=await p.evaluate(()=>localStorage.getItem('dj-consent-v1'));
L.push(((stored||'').includes('"analytics":false')?'PASS':'FAIL')+' decline stores '+stored);
await p.locator('button.flink',hasText='Cookie settings').click();await p.waitForTimeout(300);
L.push((await p.locator('.cookie-live').isVisible()?'PASS':'FAIL')+' settings reopens banner');
await p.locator('.consent-row input').check();await p.waitForTimeout(120);
await p.locator('.cookie-live .btn-p').first().click();await p.waitForTimeout(200);
const st2=await p.evaluate(()=>localStorage.getItem('dj-consent-v1'));
L.push(((st2||'').includes('"analytics":true')?'PASS':'FAIL')+' accept stores true');
L.push((await p.locator('.abar').isVisible()?'PASS':'FAIL')+' abar visible @390');
await p.evaluate(()=>{const i=document.createElement('input');i.id='tst';document.body.prepend(i);i.focus();});
await p.waitForTimeout(400);
const hid=await p.locator('.abar').evaluate(e=>getComputedStyle(e).transform!=='none'||getComputedStyle(e).visibility==='hidden'||getComputedStyle(e).display==='none'||e.classList.contains('hide'));
L.push((hid?'PASS':'FAIL')+' abar hides while typing');
await p.evaluate(()=>document.getElementById('tst').blur());
await p.waitForTimeout(400);
L.push((await p.locator('.abar').isVisible()?'PASS':'FAIL')+' abar returns after blur');
await p.locator('.mtrigger').click();await p.waitForTimeout(400);
L.push((await p.locator('.mnav').isVisible()?'PASS':'FAIL')+' mnav opens');
const accs=await p.locator('.mnav .acc-g').count();
const alinks=await p.locator('.mnav .acc-g a').count();
L.push((accs===2&&alinks>=5?'PASS':'FAIL')+' mnav accordions:'+accs+' links:'+alinks);
await p.keyboard.press('Escape');await p.waitForTimeout(350);
const navGone=await p.locator('.mnav').count()===0||!(await p.locator('.mnav').isVisible());
L.push((navGone?'PASS':'FAIL')+' Esc closes mnav');
await p.goto('http://localhost:4811/thank-you/');await p.waitForTimeout(1000);
L.push(((await p.locator('.abar.off').count()===1)?'PASS':'FAIL')+' abar hidden (.off) on /thank-you');
await c.close();
// fwa on desktop + styleguide
c=await b.newContext({viewport:{width:1440,height:900}});
p=await c.newPage();await p.goto('http://localhost:4811/');await p.waitForTimeout(1200);
const fwa=await p.locator('.wa').getAttribute('href');
L.push(((fwa||'').includes('wa.me')?'PASS':'FAIL')+' fwa href='+fwa);
await p.goto('http://localhost:4811/styleguide');await p.waitForTimeout(1500);
const demoBook=await p.locator('.hdr .book .lb').first().isVisible().catch(()=>false);
L.forEach(x=>console.log(x));
console.log((demoBook?'PASS':'INFO')+' styleguide demo book label visible');
await c.close();await b.close();})().catch(e=>{console.log('ERR',e.message);process.exit(1);});
