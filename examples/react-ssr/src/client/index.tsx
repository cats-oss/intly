import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { DefaultDictionary, intly, IntlyHandler } from '../i18n';
import { App } from '../components/App';

function getLanguage(): string {
  return (document.documentElement as HTMLElement).lang;
}

function getDictionary(lang: string): DefaultDictionary {
  return require(`../i18n/locales/${lang}`).dictionary as DefaultDictionary; // tslint:disable-line: non-literal-require
}

const language = getLanguage();

intly.addDictionary(language, getDictionary(language)).setLanguage(language);

ReactDOM.render(
  <IntlyHandler>
    <App />
  </IntlyHandler>,
  document.getElementById('app'),
);
