import { getLanguagePopulation } from './languages';

describe('languages', () => {
  test('returns correct language population', () => {
    const population = getLanguagePopulation('en');
    expect(population).toBeGreaterThan(1000000000);
  });

  test('returns correct language cs', () => {
    const population = getLanguagePopulation('cs');
    expect(population).toBeGreaterThan(9000000);
  });

  test('returns correct language cs-CZ', () => {
    const population = getLanguagePopulation('cs-CZ');
    expect(population).toBeGreaterThan(9000000);
  });

  test('returns correct language zh-Hans', () => {
    const population = getLanguagePopulation('zh-Hans');
    expect(population).toBeGreaterThan(9000000);
  });
});
