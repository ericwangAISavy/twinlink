"""Verify checkpoint documentation against source without running application code."""
from pathlib import Path
import hashlib
import json
import re
import subprocess

root = Path(__file__).resolve().parents[1]
repo = root.parents[1]
data = json.loads((root / 'route-map.json').read_text())
baseline = data['baseline']
inventory = json.loads((repo / 'docs/checkpoint-1/evidence/inventory.json').read_text())
assert {p['referencePath'] for p in data['referencePages']} == {p['route'] for p in inventory}
assert len(data['referencePages']) == 15
extra = json.loads((repo / 'docs/checkpoint-1/evidence/extra-checks.json').read_text())
assert {p['referencePath'] for p in data['referenceAliases']} == {p['route'] for p in extra if p['step'] == 'PHP alias'}
assert len(data['referenceAliases']) == 6
actual = {}
for p in (repo / 'src/app').rglob('*'):
    if p.name in ('page.tsx', 'route.ts'):
        parts = p.relative_to(repo / 'src/app').parts[:-1]
        route = '/' + '/'.join(x for x in parts if not x.startswith('('))
        actual[str(p.relative_to(repo))] = route
assert {r['source']: r['route'] for r in data['existingRoutes']} == actual
marketing = {r['route']: r['source'] for r in data['existingRoutes'] if r['group'] == 'marketing'}
assert len(marketing) == 12
slugs = data['proposedServiceSlugs']
assert len(slugs) == len(set(slugs)) == 9
assert all(re.fullmatch('[a-z0-9]+(?:-[a-z0-9]+)*', s) for s in slugs)
for page in data['referencePages']:
    assert page['approvedForImplementation'] is False
    path, _, anchor = page['twinlinkTarget'].partition('#')
    if page['status'].startswith('new-'):
        assert path == '/services/' + path.split('/')[-1]
        assert path.split('/')[-1] in slugs
        assert not (repo / page['proposedImplementation']).exists()
    else:
        assert path in marketing, path
        if anchor:
            assert f'id="{anchor}"' in (repo / marketing[path]).read_text(), anchor
    assert all((repo / s).is_file() for s in page['sourceFiles'])
for alias in data['referenceAliases']:
    page = next(p for p in data['referencePages'] if p['referencePath'] == alias['sameContentAs'])
    assert alias['target'] == page['twinlinkTarget']
index = json.loads((root / 'source-index.json').read_text())
for row in index:
    p = repo / row['file']
    assert hashlib.sha256(p.read_bytes()).hexdigest() == row['sha256'], row['file']
    lines = p.read_text().splitlines()
    for anchor in row['anchors']:
        assert lines[anchor['line'] - 1].strip()[:180] == anchor['text'], row['file']
for p in root.glob('*.md'):
    for match in re.finditer(r'\]\((?:<([^>]+)>|([^\s)]+))\)', p.read_text()):
        target = match.group(1) or match.group(2)
        if target.startswith(('https://', 'http://', '#')):
            continue
        target = target.split('#')[0]
        resolved = (p.parent / target).resolve()
        if resolved != root / 'verification.json':
            assert resolved.exists(), target
# Existing anchor contracts are checked in the file where each is defined.
anchors = {
    'src/app/(marketing)/page.tsx': ['solutions', 'how-we-help', 'people', 'insights'],
    'src/app/(marketing)/about/page.tsx': ['values', 'culture'],
    'src/components/marketing/privacy-preference.tsx': ['preferences'],
    'src/components/resources/resource-detail.tsx': ['interest'],
}
for name, values in anchors.items():
    text = (repo / name).read_text()
    assert all(f'id="{v}"' in text for v in values), name
changed = subprocess.check_output(['git', 'diff', '--name-only', baseline], cwd=repo, text=True).splitlines()
assert changed and all(p.startswith('docs/checkpoint-3/') for p in changed), changed
# Verify tracked executable/config/assets/schema files have no differences at all.
protected = subprocess.check_output(['git', 'diff', '--name-only', baseline, '--', '.', ':!docs/checkpoint-3'], cwd=repo, text=True).splitlines()
assert not protected, protected
report = {
    'baseline': baseline,
    'referencePagesMapped': 15,
    'referenceAliasesMapped': 6,
    'existingRoutePatterns': len(actual),
    'existingMarketingPatterns': len(marketing),
    'proposedServiceDestinations': len(slugs),
    'sourceFilesVerified': len(index),
    'checks': {
        'referenceInventoryCoverage': 'pass',
        'existingRouteCoverage': 'pass',
        'existingTargetsAndAnchors': 'pass',
        'plannedRoutesRemainUnimplemented': 'pass',
        'sourceHashesAndLineAnchors': 'pass',
        'documentLinks': 'pass',
        'documentationOnlyDiff': 'pass',
    },
    'limitations': 'Static source/document verification only; no live database or role-based browser tests.',
}
(root / 'verification.json').write_text(json.dumps(report, indent=2) + '\n')
print(json.dumps(report, indent=2))
