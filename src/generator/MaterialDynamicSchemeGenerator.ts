import {type TColor} from '../color/MaterialColors';
import {
  CSchemeGeneratorUsingPalette,
  CSchemeGeneratorUsingVariant,
  type TSchemeGeneratorClassConstructorOptions,
} from './internal/CMaterialScheme';

export class MaterialDynamicSchemeGenerator {
  private constructor() {}

  public static GenerateByPalette = (
    sourceColor: TColor,
    options?: Partial<TSchemeGeneratorClassConstructorOptions>
  ) => new CSchemeGeneratorUsingPalette(sourceColor, options);

  public static GenerateByVariant = (
    sourceColor: TColor,
    options?: Partial<
      Pick<TSchemeGeneratorClassConstructorOptions, 'isDark'> &
        Pick<TSchemeGeneratorClassConstructorOptions, 'contrastLevel'> &
        Pick<TSchemeGeneratorClassConstructorOptions, 'variant'>
    >
  ) => new CSchemeGeneratorUsingVariant(sourceColor, options);
}
