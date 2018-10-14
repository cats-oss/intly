// tslint:disable: max-line-length
import { nf } from 'intly';

export const dictionary = {
  // Header
  'header.title': 'The sample using React SSR and intly',
  'header.lead': (s: string) => `The current language is "${s}".`,

  // Newlines
  'newline.title': 'Statements containing newlines',
  'newline.content': `This sentence is composed of long texts including line breaks.
If you use intly with React, you can do it easily using a simple utility.
For the implementation of the utility function, please check the source code.`,

  // Translate function
  'trans.title': 'Translate function',
  'trans.fn.withoutArgs': () => 'This sentence is defined by "a function without arguments".',
  'trans.fn.string': (s: string) => `This sentence is defined by "a function with string arguments". (${s})`,
  'trans.fn.number': (n: number) => `This sentence is defined by "a function with number arguments". (${n})`,
  'trans.fn.boolean': (b: boolean) => `This sentence is defined by "a function with boolean arguments". (${b})`,
  'trans.fn.object': ({ first, second }: { first: string; second: string }) =>
    `This sentence is defined by "a function with object arguments". (first = ${first}, second = ${second})`,

  // Number format
  'nf.title': 'Number format',
  'nf.default': nf('By default the grouping of numbers is applied, like the result of "{{count}}".'),
  'nf.cancelGrouping': nf('You can also cancel grouping like "{{count}}" by specifying an option.', {
    useGrouping: false,
  }),
  'nf.replacement.content':
    'By using the "replacement" option, you can also control the output depending on the numerical value.',
  'nf.replacement.demo': nf('passed value ({{count}})', {
    replacement: {
      0: '💔',
      1: 'one',
      2: 'two',
    },
  }),
  'nf.other': nf(
    'In addition, as shown by the output result of "{{count}}" (123.45678), you can also adjust the decimal point. (Internally using Intl.NumberFormat)',
    {
      maximumFractionDigits: 2,
    },
  ),
};
