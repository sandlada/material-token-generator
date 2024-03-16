import {TColor} from '../color/material-colors';

export type TVariant = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export const enum EVariant {
  MONOCHROME = 0,
  NEUTRAL = 1,
  TONAL_SPOT = 2,
  VIBRANT = 3,
  EXPRESSIVE = 4,
  FIDELITY = 5,
  CONTENT = 6,
  RAINBOW = 7,
  FRUIT_SALAD = 8,
}

export type TMaterialGeneratorOptions = {
  isDark: boolean;
  contrastLevel: number | TMaterialColorContrastLevel;
  primaryPalette: TColor;
  secondaryPalette: TColor;
  tertiaryPalette: TColor;
  neutralPalette: TColor;
  neutralVariantPalette: TColor;
  variant: TVariant;
};

export interface IMaterialGenerator<TI extends Object, TR> {
  GenerateBySourceColor(sourceColor: TColor, options?: Partial<TI>): TR;
}
