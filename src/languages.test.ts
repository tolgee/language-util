import { getLanguageRegions, isValidLanguageTag } from './languages';

describe('languages', () => {
  test('returns territory from parsed region', () => {
    const territories = getLanguageRegions('en-US');
    expect(territories).toEqual(['US']);
  });

  test('validates language tag', () => {
    expect(isValidLanguageTag('en')).toBeTruthy();
    expect(isValidLanguageTag('en_de')).toBeFalsy();
  });
});
