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

abstract class CASchemeGeneratorLiteralizer extends CAGeneratorLiteralizer<TMaterialColors | null> {
  protected override tokens: TMaterialColors | null = null;
  public abstract Generate(): TMaterialColors;

  public ToStyleText(options?: Partial<TStylizableOptions>): string {
    if (this.tokens === null) {
      console.warn(
        'Please make sure to call [Generate] correctly before calling [ToStyleText].'
      );
      return '';
    }
    return Object.entries(this.tokens)
      .map(
        e =>
          `--${options?.prefix ?? 'md-sys-color'}-${ToKebabCase(e[0])}: ${
            e[1]
          };`
      )
      .reduce((l, c) => l + c);
  }

  public override toString(): string {
    return this.ToStyleText();
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
  public constructor(
    public sourceColor: TColor,
    public options?: Partial<TSchemeGeneratorClassConstructorOptions>
  ) {
    super();
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

  private _Generate(): TMaterialColors {
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
      variant: this.options?.variant ?? EVariant.VIBRANT,
    });

    const theme: Record<string, string> = {};
    for (const [key, value] of Object.entries(MaterialColors)) {
      theme[key] = hexFromArgb(value.getArgb(scheme));
    }
    return theme as TMaterialColors;
  }

  public override Generate() {
    this.tokens = this._Generate();
    return this.tokens;
  }
}

export class CSchemeGeneratorUsingVariant extends CASchemeGeneratorLiteralizer {
  public constructor(
    public sourceColor: TColor,
    public options?: Partial<
      Pick<TSchemeGeneratorClassConstructorOptions, 'isDark'> &
        Pick<TSchemeGeneratorClassConstructorOptions, 'contrastLevel'> &
        Pick<TSchemeGeneratorClassConstructorOptions, 'variant'>
    >
  ) {
    super();
  }

  private _TransformColorsToInts() {
    return {
      sourceColor: FromColorStringToInt(this.sourceColor),
    };
  }

  private _Generate(): TMaterialColors {
    const colors = this._TransformColorsToInts();

    const initVariant = () =>
      [
        () =>
          new SchemeMonochrome(
            Hct.fromInt(colors.sourceColor),
            this.options?.isDark ?? false,
            this.options?.contrastLevel ?? EMaterialContrastLevel.Default
          ),
        () =>
          new SchemeNeutral(
            Hct.fromInt(colors.sourceColor),
            this.options?.isDark ?? false,
            this.options?.contrastLevel ?? EMaterialContrastLevel.Default
          ),
        () =>
          new SchemeTonalSpot(
            Hct.fromInt(colors.sourceColor),
            this.options?.isDark ?? false,
            this.options?.contrastLevel ?? EMaterialContrastLevel.Default
          ),
        () =>
          new SchemeVibrant(
            Hct.fromInt(colors.sourceColor),
            this.options?.isDark ?? false,
            this.options?.contrastLevel ?? EMaterialContrastLevel.Default
          ),
        () =>
          new SchemeExpressive(
            Hct.fromInt(colors.sourceColor),
            this.options?.isDark ?? false,
            this.options?.contrastLevel ?? EMaterialContrastLevel.Default
          ),
        () =>
          new SchemeFidelity(
            Hct.fromInt(colors.sourceColor),
            this.options?.isDark ?? false,
            this.options?.contrastLevel ?? EMaterialContrastLevel.Default
          ),
        () =>
          new SchemeContent(
            Hct.fromInt(colors.sourceColor),
            this.options?.isDark ?? false,
            this.options?.contrastLevel ?? EMaterialContrastLevel.Default
          ),
      ][this.options?.variant ?? EMaterialVariant.VIBRANT];

    const scheme = initVariant()();

    const theme: Record<string, string> = {};
    for (const [key, value] of Object.entries(MaterialColors)) {
      theme[key] = hexFromArgb(value.getArgb(scheme));
    }
    return theme as TMaterialColors;
  }

  public Generate(): TMaterialColors {
    this.tokens = this._Generate();
    return this.tokens;
  }
}
