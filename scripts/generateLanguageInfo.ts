import * as fs from 'fs';
import * as path from 'path';
import { getLanguageInfoForAvailableLanguages } from './languageInfo/languageInfo';

const data = getLanguageInfoForAvailableLanguages();
const content = 'export const languageInfo = ' + JSON.stringify(data);

fs.writeFileSync(path.resolve('src/generated/languageInfo.ts'), content);
