import {type TColor} from '../color/MaterialColors';
import {
  CPaletteGeneratorUsingPalette,
  CPaletteGeneratorUsingVariant,
  type TPaletteGeneratorClassConstructorOptions,
} from './internal/CMaterialPalette';
import {
  CSchemeGeneratorUsingPalette,
  CSchemeGeneratorUsingVariant,
  type TSchemeGeneratorClassConstructorOptions,
} from './internal/CMaterialScheme';

export class MaterialDynamicSchemeGenerator {
  private constructor() {}

  public static generateByPalette(
    sourceColor: TColor,
    options?: Partial<TSchemeGeneratorClassConstructorOptions>
  ) {
    return new CSchemeGeneratorUsingPalette(sourceColor, options);
  }

  public static generateByVariant(
    sourceColor: TColor,
    options?: Partial<
      Pick<TSchemeGeneratorClassConstructorOptions, 'isDark'> &
        Pick<TSchemeGeneratorClassConstructorOptions, 'contrastLevel'> &
        Pick<TSchemeGeneratorClassConstructorOptions, 'variant'>
    >
  ) {
    return new CSchemeGeneratorUsingVariant(sourceColor, options);
  }
}

export class MaterialPaletteGenerator {
  private constructor() {}

  public static generateByPalette(
    sourceColor: TColor,
    options?: Partial<TPaletteGeneratorClassConstructorOptions>
  ) {
    return new CPaletteGeneratorUsingPalette(sourceColor, options);
  }

  public static generateByVariant(
    sourceColor: TColor,
    options?: Partial<
      Pick<TPaletteGeneratorClassConstructorOptions, 'cl'> &
        Pick<TPaletteGeneratorClassConstructorOptions, 'isDark'> &
        Pick<TPaletteGeneratorClassConstructorOptions, 'contrastLevel'> &
        Pick<TPaletteGeneratorClassConstructorOptions, 'variant'>
    >
  ) {
    return new CPaletteGeneratorUsingVariant(sourceColor, options);
  }
}
