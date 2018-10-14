import * as path from 'path';
import * as glob from 'glob';
import express from 'express';
import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import { DEFAULT_LANGUAGE, DefaultDictionary, intly, IntlyHandler } from '../i18n';
import { App } from '../components/App';
import { Html } from './components/Html';

const PORT = 3000;

const app = express();

app.use('/assets', express.static(path.join(__dirname, '../public')));

app.get('/favicon.ico', (_req, res) => {
  res.send('');
});

app.get('/', (req, res) => {
  // Get language & dictionary
  const language =
    req.acceptsLanguages(
      glob.sync(`${path.join(__dirname, '../i18n/locales')}/*.js`).map((file) => path.basename(file, '.js')),
    ) || DEFAULT_LANGUAGE;

  // tslint:disable-next-line: non-literal-require
  const dictionary = require(`../i18n/locales/${language}`).dictionary as DefaultDictionary;

  intly.addDictionary(language, dictionary).setLanguage(language);

  // Render components
  const sheet = new ServerStyleSheet();
  const body = ReactDOMServer.renderToString(
    sheet.collectStyles(
      <IntlyHandler>
        <App />
      </IntlyHandler>,
    ),
  );

  const content = ReactDOMServer.renderToStaticMarkup(
    <Html language={language} dictionary={dictionary} styleTags={sheet.getStyleElement()}>
      {body}
    </Html>,
  );

  res.send(`<!doctype html>${content}`);
});

app.listen(PORT, () => {
  console.log(`Server listeing on ${PORT}`); // tslint:disable-line: no-console
});
