// tslint:disable: max-line-length
import { nf } from 'intly';
import { DefaultDictionary } from '../';

export const dictionary: DefaultDictionary = {
  // Header
  'header.title': 'intly を使った React SSR のサンプル',
  'header.lead': (s: string) => `現在の言語は "${s}" です`,

  // Newlines
  'newline.title': '改行を含む文',
  'newline.content': `この文は改行を含む長いテキストで構成されています。
React で intly を使用する場合は、簡単なユーティリティを使用して対応することができます。
ユーティリティ関数の実装はソースコードをご確認ください。`,

  // Translate function
  'trans.title': 'Translate function',
  'trans.fn.withoutArgs': () => 'この文は "引数を持たない関数" によって定義されています',
  'trans.fn.string': (s: string) => `この文は "文字列を引数に取る関数" によって定義されています (${s})`,
  'trans.fn.number': (n: number) => `この文は "数値を引数に取る関数" によって定義されています (${n})`,
  'trans.fn.boolean': (b: boolean) => `この文は "真偽値を引数に取る関数" によって定義されています (${b})`,
  'trans.fn.object': ({ first, second }: { first: string; second: string }) =>
    `この文は "オブジェクトを引数に取る関数" によって定義されています (first = ${first}, second = ${second})`,

  // Number format
  'nf.title': 'Number format',
  'nf.default': nf('デフォルトでは "{{count}}" のように数値のグループ化が適用されます。'),
  'nf.cancelGrouping': nf('オプションの指定を行うことで、グループかのキャンセルを行うことができます。', {
    useGrouping: false,
  }),
  'nf.replacement.content':
    '"replacement" オプションを使用することで、数値に応じた出力のコントロールを行うことができます。',
  'nf.replacement.demo': nf('渡ってきた値 ({{count}})', {
    replacement: {
      0: '💔',
      1: '①',
      2: '②',
    },
  }),
  'nf.other': nf(
    'さらに "{{count}}" (123.45678) の出力結果が示すように、小数点の調整を行うこともできます。(内部的に Intl.NumberFormat を使用しています)',
    {
      maximumFractionDigits: 2,
    },
  ),
};
