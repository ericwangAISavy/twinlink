/* eslint-disable @typescript-eslint/no-require-imports -- Reproducible visual evidence. */
const sharp = require('sharp');
(async () => {
  for (const mode of ['desktop', 'mobile']) {
    const width = mode === 'desktop' ? 1440 : 390;
    const source = `docs/checkpoint-1/evidence/01-home-${mode}-full.png`;
    const render = `docs/checkpoint-5/evidence/${mode}-full.png`;
    const a = await sharp(source).resize({width: mode === 'desktop' ? 500 : 250}).jpeg().toBuffer();
    const b = await sharp(render).resize({width: mode === 'desktop' ? 500 : 250}).jpeg().toBuffer();
    const ma = await sharp(a).metadata(), mb = await sharp(b).metadata();
    await sharp({create:{width:ma.width+mb.width,height:Math.max(ma.height,mb.height),channels:3,background:'#ddd'}})
      .composite([{input:a,left:0,top:0},{input:b,left:ma.width,top:0}]).jpeg().toFile(`docs/checkpoint-5/evidence/compare-${mode}-overview.jpg`);
    for (const [name,top,height] of mode === 'desktop' ? [['about',567,544],['tech',1111,986]] : [['about',591,847],['tech',1438,600]]) {
      const one = await sharp(source).extract({left:0,top,width,height}).toBuffer();
      const two = await sharp(render).extract({left:0,top,width,height}).toBuffer();
      await sharp({create:{width:width*2,height,channels:3,background:'#ddd'}})
        .composite([{input:one,left:0,top:0},{input:two,left:width,top:0}]).jpeg().toFile(`docs/checkpoint-5/evidence/compare-${mode}-${name}.jpg`);
    }
  }
})().catch(e=>{console.error(e);process.exitCode=1});
