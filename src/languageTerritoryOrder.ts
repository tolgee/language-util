/**
 * Keys are either a language ("en") or a language with script ("zh-Hant").
 * The key with script takes precedence.
 */
export const languageTerritoryOrder: Record<string, string[]> = {
  en: ['GB', 'US'],
  es: ['ES'],
  pt: ['PT'],
  'zh-Hant': ['TW', 'HK', 'MO'],
};
