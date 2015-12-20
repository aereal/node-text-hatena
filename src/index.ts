/// <reference path="../typings/bundle.d.ts" />

import * as cheerio from 'cheerio';

export class TextHatena {
  process(input: string): string {
    const $ = cheerio.load(input);

    $('*').each((_, el) => {
      const $el = $(el);
      const html = $el.text().replace(/\bid:([a-zA-Z][a-zA-Z0-9_\-]+)\b/, (_: string, name: string) => {
        return `<a href="http://profile.hatena.ne.jp/${name}/">id:${name}</a>`;
      });
      $el.html(html);
    });

    return $.html();
  }
}
