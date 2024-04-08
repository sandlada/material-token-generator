type TColorHex = `#${string}`
type TMaterialBasePalettes = {
  '0': TColorHex;
  '5': TColorHex;
  '10': TColorHex;
  '20': TColorHex;
  '30': TColorHex;
  '40': TColorHex;
  '50': TColorHex;
  '60': TColorHex;
  '70': TColorHex;
  '80': TColorHex;
  '90': TColorHex;
  '95': TColorHex;
  '100': TColorHex;
}

export type TMaterialPalettes = {
  primary: TMaterialBasePalettes;
  secondary: TMaterialBasePalettes;
  tertiary: TMaterialBasePalettes;
  error: TMaterialBasePalettes;
  neutral: TMaterialBasePalettes;
  neutralVariant: TMaterialBasePalettes;
};
