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
const anchor = { __esModule: true, default: ({ href, children, ...rest }) => React.createElement('a', { href, ...rest }, children) };
const image = { __esModule: true, default: ({ src, alt }) => React.createElement('img', { src, alt }) };

/** Loads a reference component, transpiling its relative imports on the way. */
function load(file) {
  if (cache.has(file)) return cache.get(file);
  const mod = { exports: {} };
  cache.set(file, mod.exports);
  const { outputText } = ts.transpileModule(readFileSync(new URL(file, root), 'utf8'), { compilerOptions: { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true } });
  const resolve = (name) => {
    if (name === 'next/image') return image;
    if (name === 'next/link') return anchor;
    const base = name.startsWith('@/') ? 'src/' + name.slice(2) : name.startsWith('./') ? file.replace(/[^/]+$/, '') + name.slice(2) : null;
    if (!base) return require(name);
    if (base.endsWith('.json')) return { __esModule: true, default: JSON.parse(readFileSync(new URL(base, root), 'utf8')) };
    return load(existsSync(new URL(base + '.tsx', root)) ? base + '.tsx' : base + '.ts');
  };
  new Function('require', 'module', 'exports', outputText)(resolve, mod, mod.exports);
  cache.set(file, mod.exports);
  return mod.exports;
}

const render = (file, name = 'default') => renderToStaticMarkup(React.createElement(load(file)[name]));
const html = render('src/app/(reference)/page.tsx');
const chrome = render('src/components/reference/header.tsx', 'SiteHeader') + render('src/components/reference/footer.tsx', 'SiteFooter');

const contentDir = new URL('src/content/reference/', root);
const pages = readdirSync(contentDir).map((file) => JSON.parse(readFileSync(new URL(file, contentDir), 'utf8')));
const routes = new Set(['/', '/coming-soon', ...pages.map((page) => page.path)]);
const renderContent = (page) => renderToStaticMarkup(React.createElement(React.Fragment, null, ...page.tree.map(load('src/components/reference/render.tsx').render)));

/** Fails for links into hcompany.ai or to local pages that do not exist, and for missing local assets. */
function checkMarkup(markup, where) {
  for (const [, target] of markup.matchAll(/<a [^>]*?href="([^"]*)"/g)) {
    assert.doesNotMatch(target, /^https?:\/\/([\w-]+\.)*hcompany\.ai/, where + ' ' + target);
    if (target.startsWith('/') && !target.startsWith('/hc/')) assert.ok(routes.has(target.split(/[?#]/)[0]), where + ' -> ' + target);
  }
  for (const [, source] of markup.matchAll(/(?:src|poster|href)="(\/hc\/[^"?#]+)/g)) assert.ok(existsSync(new URL('public' + source, root)), where + ' ' + source);
}

test('homepage renders the reference sections in order', () => {
  const titles = [...html.matchAll(/<h[12][^>]*>(.*?)<\/h[12]>/g)].map((match) => match[1].replaceAll('&#x27;', "'"));
  assert.deepEqual([...new Set(titles)], [
    'Operational intelligence for the enterprise', 'Built for a fragmented world', 'One platform. Four ways in.',
    'Proven in production.', 'Real-world research. Measured where it matters.', "What's new?", 'Start building, or see it in action.',
  ]);
});

test('homepage, header and footer link only to pages in this site', () => {
  checkMarkup(html, 'home');
  checkMarkup(chrome, 'header and footer');
  const { href } = load('src/components/reference/links.ts');
  assert.equal(href('/careers'), '/careers');
  assert.equal(href('https://hcompany.ai/about?x=1'), '/about?x=1');
  assert.equal(href('https://hub.hcompany.ai/'), '/coming-soon');
  assert.equal(href('https://github.com/x'), 'https://github.com/x');
});

test('every captured page renders with a heading, working local links and existing assets', () => {
  assert.ok(pages.length >= 70, String(pages.length));
  for (const page of pages) {
    assert.ok(page.title, page.path);
    const markup = renderContent(page);
    assert.match(markup, /<h[1-3][ >]/, page.path);
    checkMarkup(markup, page.path);
  }
});

test('captured forms cannot submit anywhere', () => {
  for (const page of pages) assert.doesNotMatch(renderContent(page), /<form[^>]*\saction=/, page.path);
});

test('scorecard verdicts match the results observed on the reference', () => {
  const { scoreQueue } = load('src/components/reference/tools.tsx');
  const run = (answers) => scoreQueue([...answers].map(Number));
  const cases = [
    ['000000000000', 0, 'no'], ['111111111111', 14, 'close', 'Volume'], ['222222222222', 24, 'ready'], ['000000012222', 9, 'no'],
    ['000000122222', 11, 'close', 'Volume'], ['022222222222', 22, 'close', 'Volume'], ['222022222222', 22, 'ready'],
    ['222222222022', 22, 'close', 'Readiness'], ['222222222202', 22, 'ready'], ['220022111211', 15, 'close', 'Variety'],
    ['222200111211', 15, 'close', 'Systems'], ['222211000222', 17, 'close', 'Judgment'], ['222222111100', 16, 'close', 'Readiness'],
    ['022222222022', 20, 'close', 'Volume'], ['221111111211', 17, 'close', 'Judgment'], ['220000000210', 7, 'no'],
  ];
  for (const [answers, total, verdict, gap] of cases) {
    const result = run(answers);
    assert.equal(result.total, total, answers);
    assert.equal(result.verdict, verdict, answers);
    if (gap) assert.ok(result.gap.startsWith(gap), answers + ' ' + result.gap);
  }
  const partial = scoreQueue([2, 2, 2]);
  assert.deepEqual([partial.total, partial.verdict, partial.remaining], [6, 'empty', 9]);
});
