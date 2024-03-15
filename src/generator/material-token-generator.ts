import {
  SchemeContent,
  Hct,
  hexFromArgb,
  DynamicScheme,
} from '@material/material-color-utilities';
import {
  EMaterialColorContrastLevel,
  TMaterialColorContrastLevel,
} from '../color/contrast';
import {
  MaterialColors,
  TColor,
  TMaterialColors,
} from '../color/material-colors';
import {FromColorStringToInt, ToKebabCase} from '../utils/strings';

interface IMaterialTokensGeneratorOptions {
  isDark: boolean;
  contrastLevel: number | TMaterialColorContrastLevel;
}

export class MaterialTokenGenerator {
  /**
   * @param options {sourceColor, isDark, contrastLevel}, [sourceColor] is required
   * @returns TMaterialColors
   */
  public static GenerateBySourceColor(
    sourceColor: TColor,
    options?: Partial<IMaterialTokensGeneratorOptions>
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

  public static GenerateByScheme(scheme: DynamicScheme): TMaterialColors {
    const theme: Record<string, string> = {};
    for (const [key, value] of Object.entries(MaterialColors)) {
      theme[key] = hexFromArgb(value.getArgb(scheme));
    }
    return theme as TMaterialColors;
  }

  public static ToStyleText(
    theme: TMaterialColors,
    options?: {
      prefix: string;
    }
  ) {
    return Object.entries(theme)
      .map(
        e =>
          `--${options?.prefix ?? 'md-sys-color'}-${ToKebabCase(e[0])}: ${
            e[1]
          };`
      )
      .reduce((l, c) => l + c);
  }
}
