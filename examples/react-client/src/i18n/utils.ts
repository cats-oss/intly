export const DEFAULT_LANGUAGE = 'en';

const ACCEPT_LANGUAGES = ['en', 'ja'];

export function detectLanguage(): string {
  const nav = window.navigator;
  const language =
    (nav.languages && nav.languages[0]) || nav.language || (nav as any).userLanguage || (nav as any).browserLanguage;

  return ACCEPT_LANGUAGES.indexOf(language) > -1 ? language : DEFAULT_LANGUAGE;
}
