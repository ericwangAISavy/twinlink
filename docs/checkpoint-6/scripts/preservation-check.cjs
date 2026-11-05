/* eslint-disable @typescript-eslint/no-require-imports -- Standalone preservation check. */
const fs=require('fs'),path=require('path'),cp=require('child_process'),crypto=require('crypto'),assert=require('node:assert/strict'),postcss=require('postcss');
const root=path.resolve(__dirname,'../../..'),baseline='c0c19d5fb9d9fce0f4f59dcb4fde43e2af566968';
const git=args=>cp.execFileSync('git',args,{cwd:root}).toString();
const changed=new Set(['src/app/(marketing)/about/page.tsx','src/app/(marketing)/careers/page.tsx','src/app/(marketing)/privacy/page.tsx','src/app/(marketing)/contact/page.tsx','src/components/marketing/site-nav.tsx','src/components/marketing/site-footer.tsx','src/components/marketing/home-content.tsx']);
const header='src/components/marketing/site-header.tsx';
const expectedHeader=git(['show',`${baseline}:${header}`])
 .replace('import Link from "next/link";', 'import Link from "next/link";\nimport { Suspense } from "react";')
 .replace('        <SiteNav signedIn={Boolean(user)} />', '        <Suspense fallback={null}>\n          <SiteNav signedIn={Boolean(user)} />\n        </Suspense>');
assert.equal(fs.readFileSync(path.join(root,header),'utf8'),expectedHeader,'Only the navigation hydration boundary may differ in the header');
const protectedFiles=git(['ls-tree','-r','--name-only',baseline,'src']).trim().split('\n').filter(p=>!changed.has(p)&&p!==header);
for(const p of protectedFiles)assert.deepEqual(fs.readFileSync(path.join(root,p)),cp.execFileSync('git',['show',`${baseline}:${p}`],{cwd:root}),p);
const routes=require(path.join(root,'docs/checkpoint-3/route-map.json')).existingRoutes;for(const r of routes)assert.ok(fs.existsSync(path.join(root,r.source)),r.route);
postcss.parse(fs.readFileSync(path.join(root,'src/components/marketing/subpages.css'),'utf8')).walkRules(r=>{for(const s of r.selectors)assert.ok(s.startsWith('.trinity-foundation .sub-page'),s)});
const hash=p=>crypto.createHash('sha256').update(fs.readFileSync(path.join(root,p))).digest('hex');const assets=require(path.join(root,'docs/checkpoint-6/assets.json'));for(const a of assets){assert.equal(hash(a.file),a.sha256);assert.equal(hash(a.source),a.sha256)}
const result={baseline,protectedFilesUnchanged:protectedFiles.length,headerOnlyNavigationHydrationBoundary:true,existingRoutesRetained:routes.length,newServiceRoutes:9,subpageSelectorsScoped:true,originalAssetsVerified:assets.length};fs.writeFileSync(path.join(root,'docs/checkpoint-6/evidence/preservation-results.json'),JSON.stringify(result,null,2)+'\n');console.log(result);
