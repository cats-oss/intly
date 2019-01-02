# intly-react

> description

## Getting Started

todo

```bash
$ npm install --save intly intly-react
# or
$ yarn add intly intly-react
```

todo

```typescript
import { Intly } from 'intly';
import { createIntlyHandler } from 'intly-react';

const intly = new Intly('en', {
  hello: 'Hello, World',
});

const IntlyHandler = createIntlyHandler(intly);

ReactDOM.render(
  <IntlyHandler>
    <h1>{intly.t('hello')}</h1>
  </IntlyHandler>,
  document.getElementById('app'),
);
```

## API

todo
