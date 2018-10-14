import { RecursiveRequired } from './utils';

export interface PartialOptions {
  fallbackLanguage?: string | string[];
  debug?: boolean;
}

export interface Options extends RecursiveRequired<PartialOptions> {
  fallbackLanguage: string[];
}

export const defaultOptions: Partial<Options> = {
  debug: false,
  fallbackLanguage: [],
};
