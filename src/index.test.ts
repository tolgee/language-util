import { getLanguageRegions } from './index';

describe('languageData', () => {
  test('returns territory by language', () => {
    const territories = getLanguageRegions('cs');
    expect(territories).toEqual(['CZ']);
  });

  test('returns territory from parsed region', () => {
    const territories = getLanguageRegions('en-US');
    expect(territories).toEqual(['US']);
  });

  test('returns correct territories for english', () => {
    const territories = getLanguageRegions('en');
    expect(territories.length).toEqual(89);
    expect(territories[0]).toEqual('GB');
    expect(territories[1]).toEqual('US');
  });

  test('returns territories for spanish', () => {
    const territories = getLanguageRegions('es');
    expect(territories.length).toEqual(23);
    expect(territories[0]).toEqual('ES');
  });

  test('returns territories for french', () => {
    const territories = getLanguageRegions('fr');
    expect(territories.length).toEqual(45);
    expect(territories[0]).toEqual('FR');
  });
});
