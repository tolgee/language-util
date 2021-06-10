import { isStructurallyValidLanguageTag } from '@formatjs/intl-getcanonicallocales';
import { languageInfo } from './generated/languageInfo';

export const isValidLanguageTag = (tag: string) => {
  return isStructurallyValidLanguageTag(tag);
};

export const getLanguageRegions = (language: string): string[] =>
  languageInfo[language as keyof typeof languageInfo]?.regions || [];

export interface TerritoryInfo {
  languagePopulation?: {
    [key: string]: LanguagePopulation;
  };
  _population?: string;
}

export interface LanguagePopulation {
  _populationPercent?: string;
  _officialStatus?: 'official' | 'official_regional' | 'de_facto_official';
}

export interface TerritoryPopulation {
  territoryTotalPopulation?: string;
}
