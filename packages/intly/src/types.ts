import { NumberFormatter, NumberFormatArgs } from './number-format';

export type TranslateFunc<T> = (arg: T) => string;

export type PickTranslateFuncArgs<T> = T extends TranslateFunc<infer U> ? U : never;

export type TranslateArgs<T> = T extends NumberFormatter
  ? NumberFormatArgs
  : T extends TranslateFunc<any> ? PickTranslateFuncArgs<T> : never;

export interface AbstractDictionary {
  [key: string]: string | TranslateFunc<any> | NumberFormatter;
}
