import { supportedFlags } from './supportedFlags';
import * as fs from 'fs';
import * as path from 'path';

describe('supported flags', () => {
  test('supported flags are generated correctly', () => {
    expect(supportedFlags.length).toBeGreaterThan(240);
    expect(supportedFlags).toContain('🇬🇧');
  });

  test('each supported flag has corresponding file', () => {
    supportedFlags.forEach((f) => {
      fs.existsSync(path.resolve('./flags/' + f + '.svg'));
    });
  });
});
