import download from 'download-git-repo';
import { languageInfo } from '../src/generated/languageInfo';
import * as fs from 'fs';
import path from 'path';
import { symbolToHex } from '../src/flags';
import { format } from 'prettier';

const DOWNLOAD_PATH = 'tmp/twemoji';
const ADDITIONAL_FLAGS = ['🏁', '🏳️'];

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
        const customPath: string = path.resolve('./customFlags/' + f + '.svg');
        const twitterPath: string = path.resolve(
          DOWNLOAD_PATH + '/assets/svg/' + f + '.svg'
        );
        const resultPath: string = fs.existsSync(customPath)
          ? customPath
          : twitterPath;

        fs.copyFileSync(
          path.resolve(resultPath),
          path.resolve('flags/' + f + '.svg')
        );
      } catch (e) {
        console.error(e);
        process.exit(1);
      }
    });

    const content =
      'export const supportedFlags = ' + JSON.stringify([...flagsEmoji]);
    const formattedContent = format(content, {
      parser: 'typescript',
      singleQuote: true,
    });
    fs.writeFileSync(
      path.resolve('src/generated/supportedFlags.ts'),
      formattedContent
    );
  }
};

download('twitter/twemoji', path.resolve(DOWNLOAD_PATH), generate);
