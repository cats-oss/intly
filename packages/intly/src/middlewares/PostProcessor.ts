import { Intly } from '../intly';
import { AbstractDictionary } from '../types';

export abstract class PostProcessor<T extends AbstractDictionary = {}> {
  public abstract process(value: string, key: string, intly: Intly<T>): string;
}
