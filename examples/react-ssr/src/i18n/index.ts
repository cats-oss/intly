import { Intly } from 'intly';
import { createIntlyHandler } from 'intly-react';
import { dictionary as defaultDictionary } from './locales/en';

export type DefaultDictionary = typeof defaultDictionary;
export const DEFAULT_LANGUAGE = 'en';

export const intly = new Intly(DEFAULT_LANGUAGE, {} as DefaultDictionary);
export const IntlyHandler = createIntlyHandler(intly);
