import { languageInfo } from './languageInfo';

describe('generated info', () => {
  test('languageInfo is generated', () => {
    expect(languageInfo.en.englishName).toEqual('English');
    expect(languageInfo.cs.englishName).toEqual('Czech');
    expect(languageInfo.sk.originalName).toEqual('slovenčina');
  });

  test('returns correct language info for en', () => {
    const result = languageInfo.en;
    expect(result?.englishName).toEqual('English');
    expect(result?.originalName).toEqual('English');
    ['GB', 'US', 'IN'].forEach((region: string) => {
      expect(result?.regions).toContain(region);
    });
    ['🇬🇧', '🇺🇸', '🇮🇳'].forEach((region: string) => {
      expect(result?.flags).toContain(region);
    });
  });

  test('returns correct language info for en-US', () => {
    const result = languageInfo['en-US'];
    expect(result?.englishName).toEqual('English (United States)');
    expect(result?.originalName).toEqual('English (United States)');
    expect(result?.regions).toEqual(['US']);
    expect(result?.flags).toEqual(['🇺🇸']);
  });

  test('returns correct language info for cs', () => {
    const result = languageInfo['cs'];
    expect(result?.englishName).toEqual('Czech');
    expect(result?.originalName).toEqual('čeština');
    expect(result?.regions).toEqual(['CZ']);
    expect(result?.flags).toEqual(['🇨🇿']);
  });

  test('returns correct languages for everything', () => {
    const result = languageInfo;
    expect(Object.keys(result).length).toBeGreaterThan(300);
    expect(result['en']).toBeTruthy();
    expect(result['cs']).toBeTruthy();
    expect(result['de']).toBeTruthy();
    expect(result['sk']).toBeTruthy();
    Object.values(result).forEach((i) => {
      expect(i).toBeTruthy();
    });
  });

  describe('languages', () => {
    test('returns correct language population', () => {
      const population = languageInfo['en'].population;
      expect(population).toBeGreaterThan(1000000000);
    });

    test('returns correct language cs', () => {
      const population = languageInfo['cs'].population;
      expect(population).toBeGreaterThan(9000000);
    });

    test('returns correct language cs-CZ', () => {
      const population = languageInfo['cs-CZ'].population;
      expect(population).toBeGreaterThan(9000000);
    });

    test('returns correct language zh-Hans', () => {
      const population = languageInfo['zh-Hans'].population;
      expect(population).toBeGreaterThan(9000000);
    });

    test('returns territory by language', () => {
      const territories = languageInfo['cs'].regions;
      expect(territories).toEqual(['CZ']);
    });

    test('returns territory from parsed region', () => {
      const territories = languageInfo['en-US'].regions;
      expect(territories).toEqual(['US']);
    });

    test('returns correct territories for english', () => {
      const territories = languageInfo['en'].regions;
      expect(territories.length).toEqual(89);
      expect(territories[0]).toEqual('GB');
      expect(territories[1]).toEqual('US');
    });

    test('returns territories for spanish', () => {
      const territories = languageInfo['es'].regions;
      expect(territories.length).toEqual(23);
      expect(territories[0]).toEqual('ES');
    });

    test('returns territories for french', () => {
      const territories = languageInfo['fr'].regions;
      expect(territories.length).toEqual(45);
      expect(territories[0]).toEqual('FR');
    });
  });
});
