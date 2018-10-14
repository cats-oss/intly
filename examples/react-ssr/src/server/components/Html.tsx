// tslint:disable: react-unused-props-and-state react-no-dangerous-html
import * as React from 'react';

export interface Props {
  language: string;
  dictionary: any;
  styleTags: React.ReactNode;
  children: string;
}

export const Html = ({ language, dictionary, styleTags, children }: Props) => (
  <html lang={language}>
    <head>
      <title>Example / intly with React Server Side Rendering</title>
      {styleTags}
    </head>
    <body>
      <div id="app" dangerouslySetInnerHTML={{ __html: children }} />

      <script
        dangerouslySetInnerHTML={{
          __html: `
window.__DICTIONARY__ = ${JSON.stringify(dictionary).replace(/</g, '\\u003c')}
    `,
        }}
      />
      <script src="/assets/vendors.js" />
      <script src="/assets/bundle.js" />
    </body>
  </html>
);
