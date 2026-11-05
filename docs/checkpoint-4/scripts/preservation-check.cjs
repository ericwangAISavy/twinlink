/* eslint-disable @typescript-eslint/no-require-imports -- Standalone source and asset verification. */
const fs = require('fs');
const path = require('path');
const cp = require('child_process');
const crypto = require('crypto');
const assert = require('node:assert/strict');
const postcss = require('postcss');
const root = path.resolve(__dirname, '../../..');
const baseline = 'a3fa8dbf16ebf0e6a2f49e22b767cf44cc17543e';
const git = args => cp.execFileSync('git', args, { cwd: root });
const protectedFiles = git(['ls-tree', '-r', '--name-only', baseline, 'src']).toString().trim().split('\n').filter(p =>
 p.startsWith('src/server/') || p.startsWith('src/lib/') || p.startsWith('src/app/') && p !== 'src/app/(marketing)/layout.tsx' || p === 'src/middleware.ts' || p.startsWith('src/components/auth/') || p.startsWith('src/components/admin/') || p.startsWith('src/components/dashboard/') || p.startsWith('src/components/careers/') || p === 'src/components/resources/contact-form.tsx' || p === 'src/components/marketing/visitor-tracker.tsx' || p === 'src/components/marketing/privacy-preference.tsx' || p.startsWith('src/components/ui/'));
for (const name of protectedFiles) assert.deepEqual(fs.readFileSync(path.join(root, name)), git(['show', `${baseline}:${name}`]), `Protected file changed: ${name}`);
const routes = require(path.join(root, 'docs/checkpoint-3/route-map.json')).existingRoutes;
for (const r of routes) assert.ok(fs.existsSync(path.join(root, r.source)), `Route removed: ${r.route}`);
const css = fs.readFileSync(path.join(root, 'src/components/marketing/foundation.css'), 'utf8');
postcss.parse(css).walkRules(rule => {
 if (rule.parent.type === 'atrule' && rule.parent.name.endsWith('keyframes')) return;
 for (const selector of rule.selectors) assert.ok(selector.trim().startsWith('.trinity-foundation'), `Unscoped selector: ${selector}`);
});
const hash = p => crypto.createHash('sha256').update(fs.readFileSync(path.join(root, p))).digest('hex');
const assets = [
 { file: 'src/components/marketing/fonts/open-sans-latin.woff2', source: 'https://registry.npmjs.org/@fontsource-variable/open-sans/-/open-sans-5.3.0.tgz', license: 'src/components/marketing/fonts/OPEN-SANS-LICENSE.txt' },
 { file: 'src/components/marketing/fonts/roboto-latin.woff2', source: 'https://registry.npmjs.org/@fontsource-variable/roboto/-/roboto-5.3.0.tgz', license: 'src/components/marketing/fonts/ROBOTO-LICENSE.txt' },
 { file: 'public/fonts/bootstrap-icons.woff2', source: 'docs/checkpoint-2/assets/originals/css/bootstrap-icons/fonts/bootstrap-icons.woff2', license: 'public/fonts/BOOTSTRAP-ICONS-LICENSE.txt' },
 { file: 'public/images/reference/footer-map.png', source: 'docs/checkpoint-2/assets/originals/images/footer-map.png', note: 'Captured reference decoration; retained source provenance. No deployment performed.' },
 { file: 'public/images/reference/service-wave.svg', source: 'docs/checkpoint-2/assets/extracted/service-wave.svg', note: 'Exact previously extracted reference wave. No deployment performed.' },
].map(a => ({ ...a, bytes: fs.statSync(path.join(root, a.file)).size, sha256: hash(a.file) }));
for (const a of assets) if (!a.source.startsWith('http')) assert.equal(a.sha256, hash(a.source));
const result = { baseline, protectedFilesUnchanged: protectedFiles.length, existingRouteFilesRetained: routes.length, foundationSelectorsScoped: true, assets };
fs.writeFileSync(path.join(root, 'docs/checkpoint-4/evidence/preservation-results.json'), JSON.stringify(result, null, 2) + '\n');
console.log(JSON.stringify(result, null, 2));
