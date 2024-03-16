import {
  DynamicScheme,
  Hct,
  SchemeContent,
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
  IMaterialGenerator,
  TMaterialGeneratorOptions,
} from './IMaterialGenerator';
import {IStylizable, TStylizableOptions} from './IStylizable';
import {ISingletonable} from './ISingletonable';
import {ACssLocalStorage} from './CssLocalStorage';

class CMaterialTokensGenerator
  extends ACssLocalStorage
  implements
    IMaterialGenerator<TMaterialGeneratorOptions, TMaterialColors>,
    IStylizable<TMaterialColors>,
    ISingletonable
{
  private static Instance: CMaterialTokensGenerator | null = null;

  private constructor() {
    super();
  }

  public static GetInstance() {
    if (this.Instance === null) this.Instance = new CMaterialTokensGenerator();
    return this.Instance;
  }

  public get value(): CMaterialTokensGenerator {
    return CMaterialTokensGenerator.GetInstance();
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
    const color = FromColorStringToInt(sourceColor);
    const scheme = new SchemeContent(
      Hct.fromInt(color),
      options?.isDark ?? false,
      options?.contrastLevel ?? EMaterialColorContrastLevel.Default
    );
    const theme: Record<string, string> = {};
    for (const [key, value] of Object.entries(MaterialColors)) {
      theme[key] = hexFromArgb(value.getArgb(scheme));
    }
    return theme as TMaterialColors;
  }

  public GenerateByScheme(scheme: DynamicScheme): TMaterialColors {
    const theme: Record<string, string> = {};
    for (const [key, value] of Object.entries(MaterialColors)) {
      theme[key] = hexFromArgb(value.getArgb(scheme));
    }
    return theme as TMaterialColors;
  }
}

export class MaterialTokensGenerator {
  public static GenerateBySourceColor(
    sourceColor: TColor,
    options?: Partial<TMaterialGeneratorOptions>
  ) {
    return CMaterialTokensGenerator.GetInstance().GenerateBySourceColor(
      sourceColor,
      options
    );
  }

  public static ToStyleText(
    object: TMaterialColors,
    options?: Partial<TStylizableOptions> | undefined
  ) {
    return CMaterialTokensGenerator.GetInstance().ToStyleText(object, options);
  }

  public static GenerateByScheme(scheme: DynamicScheme) {
    return CMaterialTokensGenerator.GetInstance().GenerateByScheme(scheme);
  }

  public static ToCssLocalFile(fileName: string, content: string) {
    return CMaterialTokensGenerator.GetInstance().ToCssLocalFile(
      fileName,
      content
    );
  }
}
