import latinize from 'latinize';
import { languageInfo } from './generated/languageInfo';

export type SuggestResult = {
  languageId: keyof typeof languageInfo;
  originalName: string;
  englishName: string;
  flags: string[];
};

export type SuggestResultWithPopulation = SuggestResult & {
  population?: number;
};

export const suggest = (input: string, limit = 10): SuggestResult[] => {
  const result = Object.entries(languageInfo).map(([languageId, value]) =>
    getItemWithPopulation(languageId, value)
  );

  input = latinize(input).replace('_', '-').toLowerCase();
  result.sort(compare(input));
  return result.slice(0, limit).map((i) => {
    delete i.population;
    return i;
  });
};

export const getItemWithPopulation = (
  languageId: string,
  value: typeof languageInfo[keyof typeof languageInfo]
): SuggestResultWithPopulation => {
  return {
    languageId: languageId as keyof typeof languageInfo,
    originalName: value.originalName,
    englishName: value.englishName,
    flags: value.flags,
    population: value.population,
  };
};

export const compare =
  (input: string) =>
  (a: SuggestResultWithPopulation, b: SuggestResultWithPopulation) => {
    const aNormalized = normalizeResult(a);
    const bNormalized = normalizeResult(b);
    if (
      aNormalized.languageId.indexOf(input) === 0 &&
      bNormalized.languageId.indexOf(input) !== 0
    ) {
      return -1;
    }

    if (
      bNormalized.languageId.indexOf(input) === 0 &&
      aNormalized.languageId.indexOf(input) !== 0
    ) {
      return 1;
    }

    if (
      aNormalized.originalName.indexOf(input) === 0 &&
      bNormalized.originalName.indexOf(input) !== 0
    ) {
      return -1;
    }
    if (
      bNormalized.originalName.indexOf(input) === 0 &&
      aNormalized.originalName.indexOf(input) !== 0
    ) {
      return 1;
    }

    if (
      aNormalized.englishName.indexOf(input) === 0 &&
      bNormalized.englishName.indexOf(input)
    ) {
      return -1;
    }

    if (
      bNormalized.englishName.indexOf(input) === 0 &&
      aNormalized.englishName.indexOf(input)
    ) {
      return 1;
    }

    //if both tags start with user input, let population win, since tags are short and result is then more relevant
    if (
      aNormalized.languageId.indexOf(input) === 0 &&
      bNormalized.languageId.indexOf(input) === 0 &&
      bNormalized.population &&
      aNormalized.population
    ) {
      return bNormalized.population - aNormalized.population;
    }

    const samePartDifferences = {
      englishName:
        samePartLength(bNormalized.englishName, input) -
        samePartLength(aNormalized.englishName, input),
      originalName:
        samePartLength(bNormalized.originalName, input) -
        samePartLength(aNormalized.originalName, input),
      languageId:
        samePartLength(bNormalized.languageId, input) -
        samePartLength(aNormalized.languageId, input),
    };

    if (samePartDifferences.englishName !== 0) {
      return samePartDifferences.englishName;
    }

    if (samePartDifferences.originalName !== 0) {
      return samePartDifferences.originalName;
    }

    if (samePartDifferences.languageId !== 0) {
      return samePartDifferences.languageId;
    }

    return (
      languageInfo[b.languageId].population -
      languageInfo[a.languageId].population
    );
  };

const normalizeResult = (
  result: SuggestResultWithPopulation
): Omit<SuggestResultWithPopulation, 'languageId'> & { languageId: string } => {
  return {
    ...result,
    originalName: latinize(result.originalName).toLowerCase(),
    englishName: latinize(result.englishName).toLowerCase(),
    languageId: result.languageId.toLowerCase(),
  };
};

const diff = (diffMe: string, diffBy: string) => diffMe.split(diffBy).join('');
const samePartLength = (diffMe: string, diffBy: string) =>
  diffMe.length - diff(diffMe, diffBy).length;
