import {
  DynamicScheme,
  TonalPalette,
  hexFromArgb,
} from '@material/material-color-utilities';
import {EMaterialColorContrastLevel} from '../color/contrast';
import {
  MaterialColors,
  TColor,
  TMaterialColors,
} from '../color/material-colors';
import {FromColorStringToInt, ToKebabCase} from '../utils/strings';
import {
  EVariant,
  IMaterialGenerator,
  TMaterialGeneratorOptions,
} from './IMaterialGenerator';
import {IStylizable, TStylizableOptions} from './IStylizable';
import {ISingletonable} from './ISingletonable';
import {ACssLocalStorage} from './CssLocalStorage';

class CMaterialDynamicSchemeGenerator
  extends ACssLocalStorage
  implements
    IMaterialGenerator<TMaterialGeneratorOptions, TMaterialColors>,
    IStylizable<TMaterialColors>,
    ISingletonable
{
  private static Instance: CMaterialDynamicSchemeGenerator | null = null;

  private constructor() {
    super();
  }

  public static GetInstance() {
    if (this.Instance === null)
      this.Instance = new CMaterialDynamicSchemeGenerator();
    return this.Instance;
  }

  public get value(): CMaterialDynamicSchemeGenerator {
    return CMaterialDynamicSchemeGenerator.GetInstance();
  }

  public ToStyleText(
    object: TMaterialColors,
    options?: Partial<TStylizableOptions> | undefined
  ): string {
    return Object.entries(object)
      .map(
        e =>
          `--${options?.prefix ?? 'md-sys-color'}-${ToKebabCase(e[0])}: ${
            e[1]
          };`
      )
      .reduce((l, c) => l + c);
  }

  public GenerateBySourceColor(
    sourceColor: TColor,
    options?: Partial<TMaterialGeneratorOptions>
  ): TMaterialColors {
    const colors = {
      sourceColor: FromColorStringToInt(sourceColor),
      primaryPalette: TonalPalette.fromInt(
        options?.primaryPalette
          ? FromColorStringToInt(options.primaryPalette)
          : 0xffeb0057
      ),
      secondaryPalette: TonalPalette.fromInt(
        options?.secondaryPalette
          ? FromColorStringToInt(options.secondaryPalette)
          : 0xfff46b00
      ),
      tertiaryPalette: TonalPalette.fromInt(
        options?.tertiaryPalette
          ? FromColorStringToInt(options.tertiaryPalette)
          : 0xff00ab46
      ),
      neutralPalette: TonalPalette.fromInt(
        options?.neutralPalette
          ? FromColorStringToInt(options.neutralPalette)
          : 0xff949494
      ),
      neutralVariantPalette: TonalPalette.fromInt(
        options?.neutralVariantPalette
          ? FromColorStringToInt(options.neutralVariantPalette)
          : 0xffbc8877
      ),
    };
    const scheme = new DynamicScheme({
      sourceColorArgb: colors.sourceColor,
      primaryPalette: colors.primaryPalette,
      secondaryPalette: colors.secondaryPalette,
      tertiaryPalette: colors.tertiaryPalette,
      neutralPalette: colors.neutralPalette,
      neutralVariantPalette: colors.neutralVariantPalette,
      isDark: options?.isDark ?? false,
      contrastLevel:
        options?.contrastLevel ?? EMaterialColorContrastLevel.Default,
      // @ts-ignore
      variant: options?.variant ?? EVariant.NEUTRAL,
    });
    const theme: Record<string, string> = {};
    for (const [key, value] of Object.entries(MaterialColors)) {
      theme[key] = hexFromArgb(value.getArgb(scheme));
    }
    return theme as TMaterialColors;
  }
}

export class MaterialDynamicSchemeGenerator {
  public static GenerateBySourceColor(
    sourceColor: TColor,
    options?: Partial<TMaterialGeneratorOptions>
  ) {
    return CMaterialDynamicSchemeGenerator.GetInstance().GenerateBySourceColor(
      sourceColor,
      options
    );
  }

  public static ToStyleText(
    object: TMaterialColors,
    options?: Partial<TStylizableOptions> | undefined
  ) {
    return CMaterialDynamicSchemeGenerator.GetInstance().ToStyleText(
      object,
      options
    );
  }

  public static ToCssLocalFile(fileName: string, content: string) {
    return CMaterialDynamicSchemeGenerator.GetInstance().ToCssLocalFile(
      fileName,
      content
    );
  }
}
