import {
  TonalPalette,
  DynamicScheme,
  hexFromArgb,
  SchemeMonochrome,
  Hct,
  SchemeNeutral,
  SchemeTonalSpot,
  SchemeVibrant,
  SchemeExpressive,
  SchemeFidelity,
  SchemeContent,
} from '@material/material-color-utilities';
import {
  type TMaterialContrastLevel,
  EMaterialContrastLevel,
} from '../../color/Contrast';
import {type TMaterialVariant, EMaterialVariant} from '../../color/Variant';
import {
  MaterialColors,
  type TColor,
  type TMaterialColors,
} from '../../color/MaterialColors';
import {FromColorStringToInt, ToKebabCase} from '../../utils/strings';
import {CAGeneratorLiteralizer} from './CAGenerator';
import type {TStylizableOptions} from './IStylizable';

abstract class CASchemeGeneratorLiteralizer extends CAGeneratorLiteralizer<TMaterialColors> {
  public ToStyleText(options?: Partial<TStylizableOptions>): string {
    return Object.entries(this._tokens)
      .map(
        e =>
          `--${options?.prefix ?? 'md-sys-color'}-${ToKebabCase(e[0])}: ${
            e[1]
          };`
      )
      .reduce((l, c) => l + c);
  }
}

export type TSchemeGeneratorClassConstructorOptions = {
  isDark: boolean;
  contrastLevel: number | TMaterialContrastLevel;
  primaryPalette: TColor;
  secondaryPalette: TColor;
  tertiaryPalette: TColor;
  neutralPalette: TColor;
  neutralVariantPalette: TColor;
  variant: TMaterialVariant;
};

export class CSchemeGeneratorUsingPalette extends CASchemeGeneratorLiteralizer {
  protected override _tokens: TMaterialColors;

  public constructor(
    public sourceColor: TColor,
    public options?: Partial<TSchemeGeneratorClassConstructorOptions>
  ) {
    super();
    this._tokens = this._Generate();
  }

  private _TransformColorsToInts() {
    return {
      sourceColor: FromColorStringToInt(this.sourceColor),
      primaryPalette: TonalPalette.fromInt(
        this.options?.primaryPalette
          ? FromColorStringToInt(this.options.primaryPalette)
          : 0xffeb0057
      ),
      secondaryPalette: TonalPalette.fromInt(
        this.options?.secondaryPalette
          ? FromColorStringToInt(this.options.secondaryPalette)
          : 0xfff46b00
      ),
      tertiaryPalette: TonalPalette.fromInt(
        this.options?.tertiaryPalette
          ? FromColorStringToInt(this.options.tertiaryPalette)
          : 0xff00ab46
      ),
      neutralPalette: TonalPalette.fromInt(
        this.options?.neutralPalette
          ? FromColorStringToInt(this.options.neutralPalette)
          : 0xff949494
      ),
      neutralVariantPalette: TonalPalette.fromInt(
        this.options?.neutralVariantPalette
          ? FromColorStringToInt(this.options.neutralVariantPalette)
          : 0xffbc8877
      ),
    };
  }

  protected override _Generate(): TMaterialColors {
    const colors = this._TransformColorsToInts();

    const scheme = new DynamicScheme({
      sourceColorArgb: colors.sourceColor,
      primaryPalette: colors.primaryPalette,
      secondaryPalette: colors.secondaryPalette,
      tertiaryPalette: colors.tertiaryPalette,
      neutralPalette: colors.neutralPalette,
      neutralVariantPalette: colors.neutralVariantPalette,
      isDark: this.options?.isDark ?? false,
      contrastLevel:
        this.options?.contrastLevel ?? EMaterialContrastLevel.Default,
      // @ts-ignore
      variant: this.options?.variant ?? EMaterialVariant.VIBRANT,
    });

    const theme: Record<string, string> = {};
    for (const [key, value] of Object.entries(MaterialColors)) {
      theme[key] = hexFromArgb(value.getArgb(scheme));
    }
    return theme as TMaterialColors;
  }

  public override value(): TMaterialColors {
    return this._tokens;
  }
}

export class CSchemeGeneratorUsingVariant extends CASchemeGeneratorLiteralizer {
  protected override _tokens: TMaterialColors;

  constructor(
    public sourceColor: TColor,
    public options?: Partial<
      Pick<TSchemeGeneratorClassConstructorOptions, 'isDark'> &
        Pick<TSchemeGeneratorClassConstructorOptions, 'contrastLevel'> &
        Pick<TSchemeGeneratorClassConstructorOptions, 'variant'>
    >
  ) {
    super();
    this._tokens = this._Generate();
  }

  private _TransformColorsToInts() {
    return {
      sourceColor: FromColorStringToInt(this.sourceColor),
    };
  }

  protected override _Generate(): TMaterialColors {
    const colors = this._TransformColorsToInts();

    let scheme = null;

    switch (this.options?.variant ?? EMaterialVariant.VIBRANT) {
      case EMaterialVariant.MONOCHROME:
        scheme = new SchemeMonochrome(
          Hct.fromInt(colors.sourceColor),
          this.options?.isDark ?? false,
          this.options?.contrastLevel ?? EMaterialContrastLevel.Default
        );
        break;
      case EMaterialVariant.NEUTRAL:
        scheme = new SchemeNeutral(
          Hct.fromInt(colors.sourceColor),
          this.options?.isDark ?? false,
          this.options?.contrastLevel ?? EMaterialContrastLevel.Default
        );
        break;
      case EMaterialVariant.TONAL_SPOT:
        scheme = new SchemeTonalSpot(
          Hct.fromInt(colors.sourceColor),
          this.options?.isDark ?? false,
          this.options?.contrastLevel ?? EMaterialContrastLevel.Default
        );
        break;
      case EMaterialVariant.VIBRANT:
        scheme = new SchemeVibrant(
          Hct.fromInt(colors.sourceColor),
          this.options?.isDark ?? false,
          this.options?.contrastLevel ?? EMaterialContrastLevel.Default
        );
        break;
      case EMaterialVariant.EXPRESSIVE:
        scheme = new SchemeExpressive(
          Hct.fromInt(colors.sourceColor),
          this.options?.isDark ?? false,
          this.options?.contrastLevel ?? EMaterialContrastLevel.Default
        );
        break;
      case EMaterialVariant.FIDELITY:
        scheme = new SchemeFidelity(
          Hct.fromInt(colors.sourceColor),
          this.options?.isDark ?? false,
          this.options?.contrastLevel ?? EMaterialContrastLevel.Default
        );
        break;
      case EMaterialVariant.CONTENT:
        scheme = new SchemeContent(
          Hct.fromInt(colors.sourceColor),
          this.options?.isDark ?? false,
          this.options?.contrastLevel ?? EMaterialContrastLevel.Default
        );
        break;
      default:
        throw new Error(
          `Unaccepted parameter value [options.variant] [${this.options?.variant}]`
        );
    }

    const theme: Record<string, string> = {};
    for (const [key, value] of Object.entries(MaterialColors)) {
      theme[key] = hexFromArgb(value.getArgb(scheme));
    }
    return theme as TMaterialColors;
  }

  public override value(): TMaterialColors {
    return this._tokens;
  }
}
