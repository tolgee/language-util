import { getSvgNameByEmoji, symbolToHex } from './flags';

describe('flags', () => {
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
