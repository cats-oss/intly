# intly

[![CircleCI](https://img.shields.io/circleci/project/github/cats-oss/intly.svg?style=flat-square)](https://circleci.com/gh/cats-oss/intly)
[![npm](https://img.shields.io/npm/v/intly.svg?style=flat-square)](https://www.npmjs.com/package/intly)

**:construction: This library is still alpha version! (active development)**

> intly is Type-safe (TS friendly) i18n library.

_todo_

## Table of Contents

- [todo](#)

## Features

- _todo_

## Getting Started

_todo_

```bash
$ npm install --save intly
# or
$ yarn add intly
```

_todo_

```typescript
import { Intly, nf } from 'intly';

const intly = new Intly('en', {
  'text.hello': 'Hello World!',
  'fn.default': (): string => 'A function without arguments.',
  'fn.string': (s: string) => `"${s}"`,
  'fn.boolean': (b: boolean): string => (b ? 'true' : 'false'),
  'fn.object': ({ first, last }: { first: string; last: string }) => `Hi, ${first} ${last}!`,
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
});

// Translation
intly.t('text.hello'); // <-- Hello World!
intly.t('fn.default'); // <-- A function without arguments.
intly.t('fn.string', 'string value'); // <-- "string value"
intly.t('fn.boolean', true); // <-- true
intly.t('fn.boolean', false); // <-- false
intly.t('fn.object', { first: 'firstname', last: 'lastname' }); // <-- Hi, firstname lastname!

// Number format
intly.t('num.days', { count: 1 }); // <-- a day
intly.t('num.days', { count: 3 }); // <-- 3 days
intly.t('num.days', { count: 10000 }); // <-- 10000 days

intly.t('num.currency', { count: 10 }); // <-- $10
intly.t('num.currency', { count: 1234 }); // <-- $1,234

intly.t('num.point', { count: 0 }); // <-- 💔
intly.t('num.point', { count: 1000 }); // <-- 1,000.0pt
intly.t('num.point', { count: 12300.12345 }); // <-- 12,300.1pt
intly.t('num.point', { count: 12300.987 }); // <-- 12,301.0pt

// Type-safe!
intly.t('not.exists_key'); // <-- Argument of type '"not.exists_key"' is not assignable to parameter of type '"text.hello" | "fn.default" | "fn.string" | "fn.boolean" | "fn.object" | "num.days" | "num.currency" | "num.point"'.
```

_todo_

## API

_todo_

## Contribution

We are always welcoming your contribution :clap:

1. Fork it ! :tada:
1. Create your feature branch: `$ git checkout -b my-new-feature` :coffee:
1. Commit your changes: `$ git commit -am 'Add some feature'` :memo:
1. Push to the branch: `$ git push origin my-new-feature` :bulb:
1. Rebase your local changes against the `master` branch :muscle:
1. Create new Pull Request :love_letter:

Bugs, feature requests and comments are more than welcome in the [issues](https://github.com/cats-oss/intly/issues).

### Development scripts

_todo_

#### `yarn bootstrap`

_todo_

#### `yarn build`

_todo_

#### `yarn test`

_todo_

#### `yarn lint`

_todo_

## CHANGELOG

See [CHANGELOG.md](./CHANGELOG.md)

## License

[MIT © Cyberagent, Inc](./LICENSE)
