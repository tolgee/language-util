import { compare, getItemWithPopulation, suggest } from './suggesting';
import { languageInfo } from './generated/languageInfo';

describe('suggesting', () => {
  test('it suggest with empty string', () => {
    const suggestions = suggest('');
    expect(suggestions[0].englishName).toEqual('English');
    expect(suggestions[0].originalName).toEqual('English');
    expect(suggestions).toHaveLength(10);
  });

  test('it suggest for cs', () => {
    expect(suggest('cs')[0].englishName).toEqual('Czech');
    expect(suggest('cs')[0].originalName).toEqual('čeština');
  });

  test('it suggest for malformed', () => {
    expect(suggest('cs__asdaíšáěý')[0].englishName).toEqual('English');
  });

  test('it suggest for original name', () => {
    expect(suggest('češ')[0].englishName).toContain('Czech');
  });

  test('it suggest for english name', () => {
    expect(suggest('Czech')[0].englishName).toContain('Czech');
  });

  test('it ignores case', () => {
    expect(suggest('czech')[0].englishName).toContain('Czech');
  });

  test('it ignores latin', () => {
    expect(suggest('cestina')[0].englishName).toEqual('Czech');
  });

  test('it orders by diffLength', () => {
    const suggestions = suggest('est');
    expect(suggestions[1].languageId).toEqual('et');
  });

  test('it orders by population', () => {
    const suggestions = suggest('it');
    expect(suggestions[0].languageId).toEqual('it');
    expect(suggestions[1].languageId).toEqual('it-IT');
  });

  test('it orders by population', () => {
    const suggestions = suggest('it');
    expect(suggestions[0].languageId).toEqual('it');
    expect(suggestions[1].languageId).toEqual('it-IT');
  });
});
