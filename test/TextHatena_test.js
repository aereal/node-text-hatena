import { TextHatena } from '../built/src/';

const assert = require('power-assert');

function dereference(input) {
  return input.replace(/&#x([0-9a-fA-F]+);/g, (_, code) => { return String.fromCodePoint(parseInt(`0x${code}`)) });
}

describe('TextHatena', () => {
  it('is ok', () => {
    const parser = new TextHatena();
    const parsed = parser.process("<p>id:aereal です～。</p>");
    assert.equal(dereference(parsed), `<p><a href="http://profile.hatena.ne.jp/aereal/">id:aereal</a> です～。</p>`);
  });
});
