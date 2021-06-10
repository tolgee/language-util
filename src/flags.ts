import { supportedFlags } from './generated/supportedFlags';

export const symbolToHex = function (str: string) {
  const parts = [];
  for (let i = 0; i < str.length; i = i + 2) {
    parts.push(str.codePointAt(i)?.toString(16));
  }
  return parts.join('-');
};

export const getSvgNameByEmoji = (emoji: string) => {
  if (supportedFlags.indexOf(emoji) < 0) {
    throw new Error('Flag is not supported');
  }
  return symbolToHex(emoji);
};
