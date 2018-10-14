import mitt from 'mitt';
import { EventHandler, IntlyEvent } from './events';
import { NumberFormatter, NumberFormatArgs, NumberFormatOptions } from './number-format';
import { IntlyMiddleware, PostProcessor } from './middlewares';
import { Options, PartialOptions, defaultOptions } from './options';
import { AbstractDictionary, TranslateArgs, TranslateFunc, PickTranslateFuncArgs } from './types';
import { toArray } from './utils';

type DictionaryMap<T> = { [language: string]: T };

export class Intly<T extends AbstractDictionary> {
  private emitter: mitt.Emitter = (mitt as any)();
  private options: Options;
  private language: string;
  private languages: string[];
  private dictionaryMap: DictionaryMap<T> = {};
  private postProcessors: PostProcessor<T>[] = [];

  public constructor(language: string, dictionary: T, options: PartialOptions = {}) {
    this.options = {
      ...defaultOptions,
      ...(options as Options),
      fallbackLanguage: options.fallbackLanguage == null ? [] : toArray(options.fallbackLanguage),
    };

    this.language = language;
    this.languages = [language, ...this.options.fallbackLanguage];

    this.dictionaryMap = {
      ...this.options.fallbackLanguage.reduce(
        (acc, cur) => ({
          ...acc,
          [cur]: {},
        }),
        {},
      ),
      [language]: dictionary,
    };
  }

  public on<K extends keyof IntlyEvent<T>>(type: K, handler: EventHandler<IntlyEvent<T>[K]>): Intly<T> {
    this.emitter.on(type, handler);

    return this;
  }

  public off<K extends keyof IntlyEvent<T>>(type: K, handler: EventHandler<IntlyEvent<T>[K]>): Intly<T> {
    this.emitter.off(type, handler);

    return this;
  }

  private emit<K extends keyof IntlyEvent<T>>(type: K, e: IntlyEvent<T>[K]): Intly<T> {
    this.emitter.emit(type, e);

    return this;
  }

  public getLanguage(): string {
    return this.language;
  }

  public getLanguages(): string[] {
    return this.languages;
  }

  public setLanguage(language: string): Intly<T> {
    if (this.dictionaryMap[language] == null) {
      // TODO: `debug` mode
      throw new Error(`The language '${language}' does not exist`);
    }

    this.language = language;

    this.emit('languageChanged', {
      intly: this,
      language,
    });

    return this;
  }

  public addDictionary(language: string, dictionary: Partial<T>): Intly<T> {
    const dict = dictionary as T;

    this.dictionaryMap[language] = dict;

    this.emit('added', {
      intly: this,
      language,
      dictionary: dict,
    });

    return this;
  }

  public use(middleware: IntlyMiddleware): Intly<T> {
    if (middleware instanceof PostProcessor) {
      this.postProcessors.push(middleware);
    }

    return this;
  }

  public t<K extends keyof T>(key: K, args?: TranslateArgs<T[K]>): string {
    const value = this.getTranslate(key);
    let result: string;

    if (value instanceof NumberFormatter) {
      if (args == null) {
        // TODO: `debug` mode
        throw new Error('To translate numbers you need `NumberFormatArgs` containing `count`.');
      }

      result = value.format({
        language: this.languages,
        ...(args as NumberFormatArgs),
      });
    } else if (typeof value === 'function') {
      result = (value as TranslateFunc<T[K]>)(args as PickTranslateFuncArgs<T[K]>);
    } else {
      result = value as string;
    }

    return this.postProcess(key as string, result);
  }

  public n(count: number, options: NumberFormatOptions = {}): string {
    return new NumberFormatter('{{count}}', options).format({
      language: this.languages,
      count,
    });
  }

  private postProcess(key: string, value: string): string {
    return this.postProcessors.reduce((acc, processor) => processor.process(acc, key, this), value);
  }

  private getTranslate<K extends keyof T>(key: K): T[K] {
    const { fallbackLanguage } = this.options;
    const language = this.language;
    const map = this.dictionaryMap;

    if (map[language][key] != null) {
      return map[language][key];
    }

    const fallback = fallbackLanguage.find((lang) => map[lang][key] != null);

    if (fallback == null) {
      // TODO: `debug` mode
      throw new Error(`The key '${key}' does not exist`);
    }

    return map[fallback][key];
  }
}
