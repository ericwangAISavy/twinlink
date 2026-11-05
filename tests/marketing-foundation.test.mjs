import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import ts from 'typescript';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
const require = createRequire(import.meta.url);
function component(path, dependencies) {
  const mod = { exports: {} };
  const { outputText } = ts.transpileModule(readFileSync(new URL('../' + path, import.meta.url), 'utf8'), {
    compilerOptions: { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
  });
  new Function('require', 'module', 'exports', outputText)(name => dependencies[name] ?? require(name), mod, mod.exports);
  return mod.exports;
}
const { ReferenceIcon } = component('src/components/marketing/reference-icon.tsx', {});
const { SiteNav } = component('src/components/marketing/site-nav.tsx', {
  'next/link': { __esModule: true, default: ({ href, children, ...rest }) => React.createElement('a', { href, ...rest }, children) },
  'next/navigation': { usePathname: () => '/' },
  './reference-icon': { ReferenceIcon },
});
test('public navigation keeps anonymous entry points without linking unfinished services', () => {
  const html = renderToStaticMarkup(React.createElement(SiteNav, { signedIn: false }));
  assert.match(html, /href="\/login"/);
  assert.match(html, /href="\/register"/);
  assert.doesNotMatch(html, /href="\/dashboard"/);
  assert.doesNotMatch(html, /href="\/services\//);
  for (const path of ['/careers', '/contact', '/privacy', '/about#culture', '/case-studies', '/blog', '/events', '/#insights']) {
    assert.ok(html.includes(`href="${path}"`), `Missing destination ${path}`);
  }
});
test('signed-in public navigation offers the role-router entry instead of public signup', () => {
  const html = renderToStaticMarkup(React.createElement(SiteNav, { signedIn: true }));
  assert.match(html, /href="\/dashboard"/);
  assert.doesNotMatch(html, /href="\/(?:login|register)"/);
});
