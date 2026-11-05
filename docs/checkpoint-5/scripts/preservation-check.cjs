/* eslint-disable @typescript-eslint/no-require-imports -- Standalone source and asset verification. */
const fs = require('fs');
const path = require('path');
const cp = require('child_process');
const crypto = require('crypto');
const assert = require('node:assert/strict');
const postcss = require('postcss');
const root = path.resolve(__dirname, '../../..');
const baseline = '2f590ac6d05750b3c145c81686f21dfd590e890c';
const git = args => cp.execFileSync('git', args, { cwd: root });
const protectedFiles = git(['ls-tree', '-r', '--name-only', baseline, 'src']).toString().trim().split('\n').filter(p =>
 p.startsWith('src/server/') || p.startsWith('src/lib/') || p.startsWith('src/app/') && p !== 'src/app/(marketing)/page.tsx' || p === 'src/middleware.ts' || p.startsWith('src/components/auth/') || p.startsWith('src/components/admin/') || p.startsWith('src/components/dashboard/') || p.startsWith('src/components/careers/') || p === 'src/components/resources/contact-form.tsx' || p === 'src/components/marketing/visitor-tracker.tsx' || p === 'src/components/marketing/privacy-preference.tsx' || p.startsWith('src/components/ui/'));
for (const name of protectedFiles) assert.deepEqual(fs.readFileSync(path.join(root, name)), git(['show', `${baseline}:${name}`]), `Protected file changed: ${name}`);
const routes = require(path.join(root, 'docs/checkpoint-3/route-map.json')).existingRoutes;
for (const r of routes) assert.ok(fs.existsSync(path.join(root, r.source)), `Route removed: ${r.route}`);
const css = fs.readFileSync(path.join(root, 'src/components/marketing/home.css'), 'utf8');
postcss.parse(css).walkRules(rule => {
 if (rule.parent.type === 'atrule' && rule.parent.name.endsWith('keyframes')) return;
 for (const selector of rule.selectors) assert.ok(selector.trim().startsWith('.trinity-foundation .home-reference'), `Unscoped selector: ${selector}`);
});
const hash = p => crypto.createHash('sha256').update(fs.readFileSync(path.join(root,p))).digest('hex');
const assets = require(path.join(root,'docs/checkpoint-5/assets.json'));
for (const a of assets) { assert.equal(hash(a.file),a.sha256); assert.equal(hash(a.source),a.sha256); }
const result = { baseline, protectedFilesUnchanged: protectedFiles.length, existingRouteFilesRetained: routes.length, homepageSelectorsScoped:true, originalAssetsVerified:assets.length };
fs.writeFileSync(path.join(root,'docs/checkpoint-5/evidence/preservation-results.json'),JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify(result,null,2));
