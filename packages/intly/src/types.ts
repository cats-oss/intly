import { NumberFormatter, NumberFormatArgs } from './number-format';

export type FuncArgs<T> = T extends (...args: infer A) => any ? A : never;

export type TranslateFunc<T extends any[]> = (...args: T) => string;

export type PickTranslateFuncArgs<T> = T extends TranslateFunc<infer U> ? U : never;

export type TranslateArgs<T> = T extends NumberFormatter
  ? [NumberFormatArgs]
  : T extends TranslateFunc<any[]>
  ? PickTranslateFuncArgs<T>
  : [];

export interface AbstractDictionary {
  [key: string]: string | TranslateFunc<any[]> | NumberFormatter;
}

export type PartialDictionary<T extends AbstractDictionary> = {
  [P in keyof T]?: T[P] extends TranslateFunc<any[]> ? (...args: PickTranslateFuncArgs<T[P]>) => string : T[P]
};
