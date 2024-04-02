import {
  argbFromHex,
  argbFromRgb,
  argbFromRgba,
} from '@material/material-color-utilities';

export function ToKebabCase(str: string) {
  return str
    .split('')
    .map((letter, idx) => {
      return letter.toUpperCase() === letter
        ? `${idx !== 0 ? '-' : ''}${letter.toLowerCase()}`
        : letter;
    })
    .join('');
}

export function FromColorStringToInt(sourceColor: string): number {
  // #123456
  if (sourceColor.includes('#')) {
    return argbFromHex(sourceColor);
  } 
  // rgba(1, 2, 3, 0)
  else if (sourceColor.includes('rgba(')) {
    const rgb = (
      sourceColor
        .replace('rgba(', '')
        .replace(')', '')
        .split(',') as Array<string>
    ).map(s => parseInt(s));
    return argbFromRgba({r: rgb[0], g: rgb[1], b: rgb[2], a: rgb[3]});
  }
  // rgb(1, 2, 3)
  else if (sourceColor.includes('rgb(')) {
    const rgb = (
      sourceColor
        .replace('rgb(', '')
        .replace(')', '')
        .split(',') as Array<string>
    ).map(s => parseInt(s));
    return argbFromRgb(rgb[0], rgb[1], rgb[2]);
  }
  throw new Error('The param [sourceColor] is not a color code.');
}
