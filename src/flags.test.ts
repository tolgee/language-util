import { getCountryFlagEmoji, getSvgNameByEmoji, symbolToHex } from './flags';
import * as availableLocales from 'cldr-core/availableLocales.json';
import { getLanguageRegions } from './languages';

describe('flags', () => {
  test('returns correct flag for CZ', () => {
    const flag = getCountryFlagEmoji('CZ');
    expect(flag).toEqual('🇨🇿');
  });

  test('returns flags for available locales', () => {
    const result = availableLocales.availableLocales.modern.reduce(
      (acc, curr) => ({
        ...acc,
        [curr]: getLanguageRegions(curr).map((r) => getCountryFlagEmoji(r)),
      }),
      {}
    ) as { [key: string]: any };
    expect(result['en'][0]).toEqual('🇬🇧');
    expect(result['en'][1]).toEqual('🇺🇸');
  });

  test('returns correct symbol to hex', () => {
    expect(symbolToHex('🇬🇧')).toEqual('1f1ec-1f1e7');
    expect(symbolToHex('🏴󠁧󠁢󠁥󠁮󠁧󠁿󠁧󠁢󠁥󠁮󠁧󠁿')).toEqual(
      '1f3f4-e0067-e0062-e0065-e006e-e0067-e007f-e0067-e0062-e0065-e006e-e0067-e007f'
    );
    expect(symbolToHex('🔟')).toEqual('1f51f');
  });

  test('returns correct svg name by emoji', () => {
    expect(getSvgNameByEmoji('🇺🇸')).toEqual('1f1fa-1f1f8');
  });

  test('returns correct svg name by emoji', () => {
    expect(() => getSvgNameByEmoji('🏴󠁧󠁢󠁥󠁮󠁧󠁿󠁧󠁢󠁥󠁮󠁧󠁿')).toThrow(
      'Flag is not supported'
    );
  });
});
