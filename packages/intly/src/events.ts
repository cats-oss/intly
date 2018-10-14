import { Intly } from './intly';
import { AbstractDictionary } from './types';

export type EventHandler<T> = (e: T) => void;

export interface EventHandlerArgs<T extends AbstractDictionary> {
  intly: Intly<T>;
}

export interface LanguageChangedHandlerArgs<T extends AbstractDictionary> extends EventHandlerArgs<T> {
  language: string;
}

export interface AddedHandlerArgs<T extends AbstractDictionary> extends EventHandlerArgs<T> {
  language: string;
  dictionary: T;
}

export interface IntlyEvent<T extends AbstractDictionary> {
  languageChanged: LanguageChangedHandlerArgs<T>;
  added: AddedHandlerArgs<T>;
}
