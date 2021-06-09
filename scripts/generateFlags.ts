import download from 'download-git-repo';
import { languageInfo } from '../src/generated/languageInfo';
import * as fs from 'fs';
import path from 'path';
import { symbolToHex } from '../src/flags';

const DOWNLOAD_PATH = 'tmp/twemoji';
const ADDITIONAL_FLAGS = ['🏁'];

const flagsHex = new Set() as Set<string>;
const flagsEmoji = new Set() as Set<string>;

Object.values(languageInfo).forEach((i) => {
  i.flags.forEach((f) => {
    flagsHex.add(symbolToHex(f));
    flagsEmoji.add(f);
  });
});

ADDITIONAL_FLAGS.forEach((f) => {
  flagsHex.add(symbolToHex(f));
  flagsEmoji.add(f);
});

const generate = (err: string) => {
  if (!err) {
    flagsHex.forEach((f) => {
      try {
        fs.copyFileSync(
          path.resolve(DOWNLOAD_PATH + '/assets/svg/' + f + '.svg'),
          path.resolve('flags/' + f + '.svg')
        );
      } catch (e) {
        console.error(e);
        process.exit(1);
      }
    });

    const content =
      'export const supportedFlags = ' + JSON.stringify([...flagsEmoji]);
    fs.writeFileSync(path.resolve('src/generated/supportedFlags.ts'), content);
  }
};

download('twitter/twemoji', path.resolve(DOWNLOAD_PATH), generate);
