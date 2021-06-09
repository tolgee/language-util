import * as territoryInfoData from 'cldr-core/supplemental/territoryInfo.json';
import { parseUnicodeLanguageId } from '@formatjs/intl-getcanonicallocales';

export const getLanguagePopulation = (language: string): number => {
  const parsed = parseUnicodeLanguageId(language);
  const info = territoryInfoData.supplemental.territoryInfo;

  if (parsed.region) {
    const regionInfo = (info as { [key: string]: TerritoryInfo })[
      parsed.region
    ];
    const populationPercent =
      regionInfo?.languagePopulation?.[parsed.lang]?._populationPercent;
    const population = regionInfo?._population;
    if (population && populationPercent) {
      return (parseInt(populationPercent) / 100) * parseInt(population);
    }
    return 0;
  }

  return Object.values(info).reduce((acc, data) => {
    const typedData = data as TerritoryInfo;
    const languagePopulation = typedData.languagePopulation?.[parsed.lang];
    if (
      languagePopulation &&
      languagePopulation._populationPercent &&
      typedData._population
    ) {
      return (
        acc +
        Math.ceil(
          (parseFloat(languagePopulation._populationPercent) / 100) *
            parseInt(typedData._population)
        )
      );
    }
    return acc;
  }, 0);
};

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
