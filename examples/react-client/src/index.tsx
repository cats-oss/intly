import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { IntlyHandler, loadDictionaryIfNeeded } from './i18n';

function render(): void {
  ReactDOM.render(
    <IntlyHandler>
      <App />
    </IntlyHandler>,
    document.getElementById('root') as HTMLElement,
  );
}

if (window.location.search.indexOf('loaded=0') > -1) {
  loadDictionaryIfNeeded().catch(console.error);
  render();
} else {
  loadDictionaryIfNeeded()
    .then(() => {
      render();
    })
    .catch(console.error);
}

registerServiceWorker();
