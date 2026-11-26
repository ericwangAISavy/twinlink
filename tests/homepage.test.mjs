import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import ts from 'typescript';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

const require = createRequire(import.meta.url);
const root = new URL('../', import.meta.url);
const cache = new Map();

/** Loads a reference component, transpiling its relative imports on the way. */
function load(file) {
  if (cache.has(file)) return cache.get(file);
  const mod = { exports: {} };
  cache.set(file, mod.exports);
  const { outputText } = ts.transpileModule(readFileSync(new URL(file, root), 'utf8'), { compilerOptions: { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true } });
  const resolve = (name) => {
    if (name === 'next/image') return { __esModule: true, default: ({ src, alt }) => React.createElement('img', { src, alt }) };
    const base = name.startsWith('@/') ? 'src/' + name.slice(2) : name.startsWith('./') ? file.replace(/[^/]+$/, '') + name.slice(2) : null;
    if (!base) return require(name);
    return load(existsSync(new URL(base + '.tsx', root)) ? base + '.tsx' : base + '.ts');
  };
  new Function('require', 'module', 'exports', outputText)(resolve, mod, mod.exports);
  cache.set(file, mod.exports);
  return mod.exports;
}

const render = (file, name = 'default') => renderToStaticMarkup(React.createElement(load(file)[name]));
const html = render('src/app/(reference)/page.tsx');

test('homepage renders the reference sections in order', () => {
  const titles = [...html.matchAll(/<h[12][^>]*>(.*?)<\/h[12]>/g)].map((match) => match[1].replaceAll('&#x27;', "'"));
  assert.deepEqual([...new Set(titles)], [
    'Operational intelligence for the enterprise', 'Built for a fragmented world', 'One platform. Four ways in.',
    'Proven in production.', 'Real-world research. Measured where it matters.', "What's new?", 'Start building, or see it in action.',
  ]);
});

test('every local image referenced by the homepage exists', () => {
  const images = [...html.matchAll(/src="(\/hc\/[^"]+)"/g)].map((match) => match[1]);
  assert.ok(images.length >= 6);
  for (const image of images) assert.ok(existsSync(new URL('public' + image, root)), image);
});

test('header and footer contain no dead links; unbuilt pages resolve to the reference site', () => {
  const chrome = render('src/components/reference/header.tsx', 'SiteHeader') + render('src/components/reference/footer.tsx', 'SiteFooter');
  for (const markup of [html, chrome]) {
    assert.doesNotMatch(markup, /href="#"/);
    for (const [, target] of markup.matchAll(/<a [^>]*?href="([^"]+)"/g)) assert.match(target, /^(\/$|https:\/\/)/, target);
  }
  const { href } = load('src/components/reference/links.ts');
  assert.equal(href('/'), '/');
  assert.equal(href('/pricing'), 'https://hcompany.ai/pricing');
});

test('every /hc/ asset named in the source exists, including ones only rendered after interaction', () => {
  const folders = ['src/components/reference/', 'src/app/(reference)/'];
  const sources = folders.flatMap((folder) => readdirSync(new URL(folder, root)).map((file) => readFileSync(new URL(folder + file, root), 'utf8')));
  const assets = new Set(sources.flatMap((source) => [...source.matchAll(/\/hc\/[\w\-/]+\.(?:png|jpg|woff2)/g)].map((match) => match[0])));
  assert.ok(assets.has('/hc/h-agent-cursor.png'));
  for (const asset of assets) assert.ok(existsSync(new URL('public' + asset, root)), asset);
});
