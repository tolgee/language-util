import * as fs from 'fs';
import * as path from 'path';
import { getLanguageInfoForAvailableLanguages } from './languageInfo/languageInfo';
import { format } from 'prettier';

const data = getLanguageInfoForAvailableLanguages();
const content = 'export const languageInfo = ' + JSON.stringify(data);

const formattedContent = format(content, {
  parser: 'typescript',
  singleQuote: true,
});

fs.writeFileSync(
  path.resolve('src/generated/languageInfo.ts'),
  formattedContent
);
