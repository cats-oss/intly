import * as React from 'react';
import { intly } from '../i18n';
import '../styles'; // tslint:disable-line: no-import-side-effect
import { Container } from './Container';

const NEWLINE_REG = /(\r\n|\r|\n)/g;

function nl2br(str: string): React.ReactNode {
  return <>{str.split(NEWLINE_REG).map((line, index) => (line.match(NEWLINE_REG) ? <br key={index} /> : line))}</>;
}

const year = new Date().getFullYear();

export const App = () => (
  <main>
    <header>
      <Container>
        <h1>{intly.t('header.title')}</h1>
        <p>{intly.t('header.lead', intly.getLanguage())}</p>
      </Container>
    </header>

    <Container>
      <article>
        <section>
          <h2>{intly.t('newline.title')}</h2>
          <p>{nl2br(intly.t('newline.content'))}</p>
        </section>

        <section>
          <h2>{intly.t('trans.title')}</h2>
          <ul>
            <li>{intly.t('trans.fn.withoutArgs')}</li>
            <li>{intly.t('trans.fn.string', '🐶')}</li>
            <li>{intly.t('trans.fn.number', 123)}</li>
            <li>{intly.t('trans.fn.boolean', true)}</li>
            <li>{intly.t('trans.fn.object', { first: '🐕', second: '💨' })}</li>
          </ul>
        </section>

        <section>
          <h2>{intly.t('nf.title')}</h2>
          <p>{intly.t('nf.default', { count: 10000 })}</p>
          <p>{intly.t('nf.cancelGrouping', { count: 10000 })}</p>
          <p>{intly.t('nf.replacement.content')}</p>
          <ul>
            <li>0 = {intly.t('nf.replacement.demo', { count: 0 })}</li>
            <li>1 = {intly.t('nf.replacement.demo', { count: 1 })}</li>
            <li>2 = {intly.t('nf.replacement.demo', { count: 2 })}</li>
            <li>3 = {intly.t('nf.replacement.demo', { count: 3 })}</li>
            <li>5 = {intly.t('nf.replacement.demo', { count: 5 })}</li>
            <li>10000 = {intly.t('nf.replacement.demo', { count: 10000 })}</li>
          </ul>
          <p>{intly.t('nf.other', { count: 123.45678 })}</p>
        </section>
      </article>
    </Container>

    <footer>
      <Container>
        <p>Copyright {year} © Cyberagent, Inc.</p>
      </Container>
    </footer>
  </main>
);
