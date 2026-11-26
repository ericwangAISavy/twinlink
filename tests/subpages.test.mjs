import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import ts from 'typescript';
const require=createRequire(import.meta.url);
function load(file,deps={}){const mod={exports:{}};const {outputText}=ts.transpileModule(readFileSync(new URL('../'+file,import.meta.url),'utf8'),{compilerOptions:{jsx:ts.JsxEmit.ReactJSX,module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,esModuleInterop:true}});new Function('require','module','exports',outputText)(n=>n in deps?deps[n]:require(n),mod,mod.exports);return mod.exports;}
const serviceLinks=()=>load('src/components/marketing/service-links.ts',{});
test('five consolidated services have outcomes, capabilities, and safe allowlisted lookup',()=>{
 const {SERVICES,getService,LEGACY_SERVICE_REDIRECTS}=load('src/components/marketing/service-content.ts',{'./service-links':serviceLinks()});
 assert.equal(SERVICES.length,5);assert.equal(new Set(SERVICES.map(s=>s.slug)).size,5);
 for(const s of SERVICES){assert.equal(getService(s.slug),s);assert.ok(s.title&&s.summary&&s.Icon);assert.ok(s.intro.length>=1);assert.ok(s.capabilities.length>=3);for(const related of s.related)assert.ok(getService(related),related);}
 for(const target of Object.values(LEGACY_SERVICE_REDIRECTS))assert.ok(getService(target),target);
 for(const slug of ['unknown','toString','__proto__','../about','SAP-SERVICES','cloud-services'])assert.equal(getService(slug),undefined);
});

const React = (await import('react')).default;
const {renderToStaticMarkup} = await import('react-dom/server');
const shell={SubPage:({children})=>React.createElement('div',{},children),PhotoBanner:()=>null,WaveBanner:({title})=>React.createElement('h1',{},title),SubHeading:({children})=>React.createElement('h2',{},children)};
const link={__esModule:true,default:({href,children})=>React.createElement('a',{href},children)};
test('careers passes every published role field into the existing board and keeps empty results authoritative',async()=>{
 for(const jobs of [[],[{id:'42',slug:'real-role',title:'Real role',department:'Platform',location:'China',employmentType:'Full-time',workplaceType:'Remote',publishedAt:'2026-11-01'}]]){
  const {default:Page}=load('src/app/(marketing)/careers/page.tsx',{'next/link':link,'@/components/marketing/subpage-shell':shell,'@/server/queries/jobs':{getPublishedJobs:async()=>jobs},'@/components/careers/open-roles-board':{OpenRolesBoard:({roles})=>React.createElement('output',{},JSON.stringify(roles))}});
  const html=renderToStaticMarkup(await Page());assert.match(html,/Open roles/);const encoded=html.match(/<output>(.*?)<\/output>/s)[1].replace(/&quot;/g,'"');assert.deepEqual(JSON.parse(encoded),jobs);
 }
});
test('contact preserves current company email, fallback and query failure behavior',async()=>{
 for(const email of ['current@example.com','']){const {default:Page}=load('src/app/(marketing)/contact/page.tsx',{'@/components/marketing/subpage-shell':shell,'@/components/resources/resource-shell':{ResourceLinks:()=>null},'@/components/resources/contact-form':{ContactForm:({email})=>React.createElement('output',{},email)},'@/server/queries/company':{getCompanyProfile:async()=>({email})}});const html=renderToStaticMarkup(await Page());assert.ok(html.includes(`<output>${email||'hello@twinlink.com'}</output>`));assert.ok(html.includes(`mailto:${email||'hello@twinlink.com'}`));}
 const {default:Page}=load('src/app/(marketing)/contact/page.tsx',{'@/components/marketing/subpage-shell':shell,'@/components/resources/resource-shell':{ResourceLinks:()=>null},'@/components/resources/contact-form':{ContactForm:()=>null},'@/server/queries/company':{getCompanyProfile:async()=>{throw Error('company failure')}}});await assert.rejects(Page(),/company failure/);
});

test('service page renders canonical content and related links while rejecting unknown slugs',async()=>{
 const data=load('src/components/marketing/service-content.ts',{'./service-links':serviceLinks()});
 const {default:Page,generateStaticParams,generateMetadata,dynamicParams}=load('src/app/(marketing)/services/[slug]/page.tsx',{'next/image':{__esModule:true,default:({src,alt})=>React.createElement('img',{src,alt})},'next/link':link,'next/navigation':{notFound:()=>{throw Error('not-found')}},'@/components/marketing/service-content':data,'@/components/marketing/subpage-shell':shell,'@/components/marketing/reveal':{Reveal:({children})=>React.createElement('div',{},children)}});
 assert.equal(dynamicParams,false);assert.equal(generateStaticParams().length,5);
 for(const service of data.SERVICES){const props={params:Promise.resolve({slug:service.slug})};const html=renderToStaticMarkup(await Page(props));assert.ok(html.includes(service.title.replace(/&/g,'&amp;')));assert.match(html,/href="\/contact"/);assert.equal((await generateMetadata(props)).title,service.title);}
 await assert.rejects(Page({params:Promise.resolve({slug:'unknown'})}),/not-found/);
});
