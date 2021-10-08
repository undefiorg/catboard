import tokens from './tokens.json';
import tokenColors from './tokenColors.json';

export const symbolColorMap = (symbol: string): string => {
  // @ts-ignore
  if (tokenColors[symbol]) return tokenColors[symbol];

  // @ts-ignore
  const address = tokens[symbol] || 'black'
  const chars = address.split('')

  // Get color from character
  let color = '#'
  for (let i = 0; i < chars.length; i += 7) {
    color += chars[i]
  }

  return color
}
