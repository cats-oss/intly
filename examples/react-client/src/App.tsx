import * as React from 'react';
import { intly } from './i18n';
import './App.css';
import logo from './logo.svg';

export const App = () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt={intly.t('alt.title')} />
      <h1 className="App-title">{intly.t('text.title')}</h1>
    </header>
    <p className="App-intro">{intly.t('text.intro')}</p>
    <p className="App-lang">{intly.t('text.lang', intly.getLanguage())}</p>
  </div>
);
