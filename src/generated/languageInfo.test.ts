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
});
