import { nf, NumberFormatArgs, NumberFormatOptions, NumberFormatter } from '../number-format';

describe('number-format', () => {
  test('NumberFormat#format() with basic', () => {
    const tests: [string, NumberFormatOptions, NumberFormatArgs, string][] = [
      ['{{count}}', {}, { count: 0, language: 'en' }, '0'],
      ['{{count}}', {}, { count: 0, language: 'jp' }, '0'],
      ['{{count}}', {}, { count: 123456789, language: 'en' }, '123,456,789'],
      ['{{count}}', {}, { count: 123456789, language: 'jp' }, '123,456,789'],
      ['{{count}}', {}, { count: 123456.789, language: 'en' }, '123,456.789'],
      ['{{count}}', {}, { count: 123456.789, language: 'jp' }, '123,456.789'],
      ['{{count}}pt', {}, { count: 123456789, language: 'en' }, '123,456,789pt'],
      ['{{count}}pt', {}, { count: 123456789, language: 'jp' }, '123,456,789pt'],
      ['{{count}}', { style: 'currency', currency: 'USD' }, { count: 123456789, language: 'en' }, '$123,456,789.00'],
      ['{{count}}', { minimumFractionDigits: 1 }, { count: 123456789, language: 'en' }, '123,456,789.0'],
      ['{{count}}', { minimumFractionDigits: 1 }, { count: 123456789, language: 'jp' }, '123,456,789.0'],
    ];

    for (const [tpl, opts, args, expected] of tests) {
      expect(new NumberFormatter(tpl, opts).format(args)).toBe(expected);
    }
  });

  test('NumberFormat#format() with replacement', () => {
    const tests: [NumberFormatOptions, [number, string][]][] = [
      [
        {
          replacement: {},
        },
        [[0, 'default 0'], [1, 'default 1'], [2, 'default 2'], [3, 'default 3']],
      ],
      [
        {
          replacement: {
            0: 'zero',
            3: 'three',
          },
        },
        [[0, 'zero'], [1, 'default 1'], [2, 'default 2'], [3, 'three'], [4, 'default 4']],
      ],
      [
        {
          replacement: {
            '-1': 'minus 1',
            '-2': 'minus 2',
          },
        },
        [[-1, 'minus 1'], [-2, 'minus 2'], [-3, 'default -3']],
      ],
    ];

    for (const [opts, values] of tests) {
      const formatter = new NumberFormatter('default {{count}}', opts);

      for (const [count, expected] of values) {
        expect(formatter.format({ count })).toBe(expected);
      }
    }
  });

  test('nf()', () => {
    const tpl = 'tpl';
    const opts = { minimumFractionDigits: 2 };
    const result = nf(tpl, opts);

    expect(result instanceof NumberFormatter).toBe(true);
    expect((result as any).tpl).toEqual(tpl);
    expect((result as any).options).toEqual(opts);
  });
});
