import { Intly } from 'intly';
import { createIntlyHandler } from 'intly-react';
import { dictionary as defaultDictionary } from './locales/en';
import { detectLanguage, DEFAULT_LANGUAGE } from './utils';

export type DefaultDictionary = typeof defaultDictionary;
export const intly = new Intly(DEFAULT_LANGUAGE, defaultDictionary);
export const IntlyHandler = createIntlyHandler(intly);

export async function loadDictionaryIfNeeded() {
  try {
    const language = detectLanguage();
    if (language === DEFAULT_LANGUAGE) {
      return;
    }

    const { dictionary } = await import(`./locales/${language}`);

    intly.addDictionary(language, dictionary).setLanguage(language);
  } catch (e) {
    console.error(e);
  }
}
