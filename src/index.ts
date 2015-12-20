/// <reference path="../typings/bundle.d.ts" />

import * as cheerio from 'cheerio';

type FilterFunction = (element: CheerioElement, $: CheerioStatic) => string; // XXX Return value must be a type that represents HTML

export class TextHatena {
  private filters: FilterFunction[];

  constructor() {
    this.filters = [];
  }

  pipe(filter: FilterFunction): this {
    this.filters.push(filter);
    return this;
  }

  process(input: string): string {
    const $ = cheerio.load(input);

    $('*').each((_, el) => {
      this.filters.forEach(f => {
        const filteredHTML = f(el, $);
        $(el).html(filteredHTML);
      });
    });

    return $.html();
  }
}
