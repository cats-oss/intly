import { PostProcessor } from '../middlewares';
import { nf } from '../number-format';
import { Intly } from '../intly';

describe('intly', () => {
  test('getLanguage()', () => {
    const tests = ['en', 'ja'];

    for (const language of tests) {
      const intly = new Intly(language, {});

      expect(intly.getLanguage()).toBe(language);
    }
  });

  test('getLanguages()', () => {
    const tests = ['en', 'ja'];

    for (const language of tests) {
      const intly = new Intly(
        language,
        {},
        {
          fallbackLanguage: ['de'],
        },
      );

      expect(intly.getLanguages()).toEqual([language, 'de']);
    }
  });

  test('setLanguage()', () => {
    const intly = new Intly('en', {});
    const fn = jest.fn();

    expect(intly.getLanguage()).toBe('en');

    intly
      .on('languageChanged', fn)
      .addDictionary('ja', {})
      .setLanguage('ja');

    expect(intly.getLanguage()).toBe('ja');
    expect(fn.mock.calls).toEqual([
      [
        {
          intly,
          language: 'ja',
        },
      ],
    ]);

    expect(() => {
      intly.setLanguage('de');
    }).toThrow(/'de' does not exist/);
  });

  test('addDictionary()', () => {
    const dict = { key: 'value' };
    const intly = new Intly('en', dict);
    const fn = jest.fn();

    intly.on('added', fn).addDictionary('ja', dict);

    expect(intly.getLanguage()).toBe('en');
    expect(fn.mock.calls).toEqual([
      [
        {
          intly,
          dictionary: dict,
          language: 'ja',
        },
      ],
    ]);
  });

  test('use()', () => {
    class PP1 extends PostProcessor {
      public process(value: string, key: string, _intly: Intly<any>): string {
        return `1-${key}-${value}`;
      }
    }

    class PP2 extends PostProcessor {
      public process(value: string, key: string, _intly: Intly<any>): string {
        return `2-${key}-${value}`;
      }
    }

    const intly = new Intly('en', {});
    const pp1 = new PP1();
    const pp2 = new PP2();

    intly.use(pp1).use(pp2);

    expect((intly as any).postProcessors).toEqual([pp1, pp2]);
  });

  test('t()', () => {
    const intly = new Intly(
      'en',
      {
        'text.hello': 'Hello World!',
        'fn.default': () => 'A function without arguments.',
        'fn.string': (s: string) => `"${s}"`,
        'fn.boolean': (b: boolean) => (b ? 'true' : 'false'),
        'fn.object': ({ first, last }: { first: string; last: string }) => `Hi, ${first} ${last}!`,
        'fn.args': (x: number, y: number) => `x=${x}, y=${y}`,
        'num.days': nf('{{count}} days', {
          replacement: {
            1: 'a day',
          },
          useGrouping: false,
        }),
        'num.currency': nf('{{count}}', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
        }),
        'num.point': nf('{{count}}pt', {
          replacement: {
            0: '💔',
          },
          minimumFractionDigits: 1,
          maximumFractionDigits: 1,
        }),
      },
      {
        fallbackLanguage: ['en'],
      },
    );

    // for `en`
    expect(intly.t('text.hello')).toBe('Hello World!');
    expect(intly.t('fn.default')).toBe('A function without arguments.');
    expect(intly.t('fn.string', 'string value')).toBe('"string value"');
    expect(intly.t('fn.boolean', true)).toBe('true');
    expect(intly.t('fn.boolean', false)).toBe('false');
    expect(intly.t('fn.object', { first: 'firstname', last: 'lastname' })).toBe('Hi, firstname lastname!');
    expect(intly.t('fn.args', 10, 20)).toBe('x=10, y=20');
    expect(intly.t('num.days', { count: 1 })).toBe('a day');
    expect(intly.t('num.days', { count: 3 })).toBe('3 days');
    expect(intly.t('num.days', { count: 10000 })).toBe('10000 days');
    expect(intly.t('num.currency', { count: 10 })).toBe('$10');
    expect(intly.t('num.currency', { count: 1234 })).toBe('$1,234');
    expect(intly.t('num.point', { count: 0 })).toBe('💔');
    expect(intly.t('num.point', { count: 1000 })).toBe('1,000.0pt');
    expect(intly.t('num.point', { count: 12300.12345 })).toBe('12,300.1pt');
    expect(intly.t('num.point', { count: 12300.987 })).toBe('12,301.0pt');

    // for `ja`
    intly
      .addDictionary('ja', {
        'text.hello': 'こんにちは世界!',
        'fn.boolean': (b: boolean) => (b ? '真' : '偽'),
      })
      .setLanguage('ja');

    expect(intly.t('text.hello')).toBe('こんにちは世界!');
    expect(intly.t('fn.boolean', true)).toBe('真');
    expect(intly.t('fn.boolean', false)).toBe('偽');

    // fallback
    expect(intly.t('fn.default')).toBe('A function without arguments.');
  });

  test('n()', () => {
    const intly = new Intly('en', {});

    expect(intly.n(12345)).toBe('12,345');
    expect(intly.n(12345, { useGrouping: false })).toBe('12345');
    expect(intly.n(123.123, { maximumFractionDigits: 2 })).toBe('123.12');
    expect(intly.n(123.987, { maximumFractionDigits: 2 })).toBe('123.99');
  });

  test('middleware - post process', () => {
    class DebugPostProcessor extends PostProcessor {
      public process(value: string, key: string, _intly: Intly<any>): string {
        return `(#${key}) ${value}`;
      }
    }

    const intly = new Intly('en', {
      key1: 'value1',
      key2: 'value2',
      key3: 'value3',
    });

    intly.use(new DebugPostProcessor());

    expect(intly.t('key1')).toBe('(#key1) value1');
    expect(intly.t('key2')).toBe('(#key2) value2');
    expect(intly.t('key3')).toBe('(#key3) value3');
  });
});
