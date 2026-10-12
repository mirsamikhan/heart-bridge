import { test } from 'node:test';
import assert from 'node:assert/strict';
import { transformSync } from '@babel/core';
import { pagesAttributes } from './pages-paths.mjs';

test('Pages URLs preserve external links/hashes and prefix literal and dynamic local assets once', () => {
  const { code } = transformSync('const view = <><img src="/logo.png" /><img src={photo} /><a href={link} /><a href="#sites" /></>;', {
    configFile: false, babelrc: false, parserOpts: { plugins: ['jsx'] },
    plugins: [pagesAttributes('/heart-bridge/')],
  });
  const helper = code.slice(0, code.indexOf('const view'));
  const name = /const (\w+) =/.exec(helper)[1];
  const url = new Function('url', `${helper}; return ${name}(url);`);
  for (const original of ['/logo.png', '/officers/sami.jpg', '/about?x=1#title'])
    assert.equal(url(original), '/heart-bridge' + original);
  for (const original of ['#sites', 'https://example.com/a.pdf', '//example.com/a.png',
    'sms:+18664909361', 'mailto:test@example.com', '/heart-bridge/', '/heart-bridge/logo.png', undefined])
    assert.equal(url(original), original);
  assert(code.includes(`${name}(photo)`));
  assert(code.includes(`${name}(link)`));
});
