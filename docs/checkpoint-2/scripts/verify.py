from pathlib import Path
from PIL import Image
import json,re,hashlib,subprocess,xml.etree.ElementTree as ET,collections
root=Path(__file__).resolve().parents[1];manifest=json.loads((root/'assets/manifest.json').read_text());saved=[a for a in manifest if a['status']=='saved']
for a in saved:
 p=root/a['localPath'];b=p.read_bytes();assert len(b)==a['bytes'],a['localPath'];assert hashlib.sha256(b).hexdigest()==a['sha256'],a['localPath']
for p in root.rglob('*.json'):json.loads(p.read_text())
images=list(root.rglob('*.png'))+list(root.rglob('*.jpg'))+list(root.rglob('*.jpeg'))
for p in images:
 with Image.open(p) as im:im.verify()
ET.parse(root/'assets/extracted/service-wave.svg')
for p in root.glob('*.md'):
 text=p.read_text()
 for t in re.findall(r'\]\(([^)]+)\)|src="([^"]+)"',text):
  target=next(x for x in t if x)
  if not target.startswith(('http','mailto','#')):assert (p.parent/target).resolve().exists(),(p,target)
pages=json.loads((root/'evidence/visual-measurements.json').read_text());assert len(pages)==30;assert len({p['route'] for p in pages})==15
boundaries=json.loads((root/'evidence/responsive-boundaries.json').read_text());assert len(boundaries)==30;assert not any(p['overflow'] for p in boundaries)
rt=json.loads((root/'evidence/runtime-checks.json').read_text());assert rt['menu']['background']=='rgba(0, 0, 0, 0.9)',rt['menu'];assert rt['runtime']['deviceQuery']
changed=subprocess.check_output(['git','diff','--name-only','37349d6'],cwd=root.parents[1],text=True).splitlines();assert all(p.startswith('docs/checkpoint-2/') for p in changed),changed
report={'checks':{'savedAssetHashes':'pass','JSONParsing':'pass','imageDecoding':'pass','extractedSVG':'pass','relativeReportLinks':'pass','routeCoverage':'pass','breakpointProbes':'pass','settledMobileMenu':'pass','applicationDiff':'none'},'pageRecords':len(pages),'distinctRoutes':15,'responsiveProbes':len(boundaries),'assetEntries':len(manifest),'savedAssetEntries':len(saved),'uniqueSavedAssetFiles':len({a['localPath'] for a in saved}),'assetStatuses':dict(collections.Counter(a['status'] for a in manifest)),'rasterFilesDecoded':len(images),'screenshotFiles':len(list((root/'evidence').glob('*.png'))),'baseline':'37349d6f9bd6cc870869a872917d0b48ece5c859'}
(root/'evidence/verification.json').write_text(json.dumps(report,indent=2)+'\n');print(json.dumps(report,indent=2))
