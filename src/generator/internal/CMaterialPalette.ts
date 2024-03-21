import {
  TonalPalette,
  DynamicScheme,
  hexFromArgb,
  SchemeMonochrome,
  Hct,
  SchemeContent,
  SchemeExpressive,
  SchemeFidelity,
  SchemeNeutral,
  SchemeTonalSpot,
  SchemeVibrant,
} from '@material/material-color-utilities';
import {
  type TMaterialContrastLevel,
  EMaterialContrastLevel,
} from '../../color/Contrast';
import {EMaterialVariant, type TMaterialVariant} from '../../color/Variant';
import type {TColor} from '../../color/MaterialColors';
import {FromColorStringToInt} from '../../utils/strings';
import {CAGeneratorLiteralizer} from './CAGenerator';
import type {TStylizableOptions} from './IStylizable';
import type {TMaterialPalettes} from '../../color/MaterialPalette';

abstract class CAPaletteGeneratorLiteralizer extends CAGeneratorLiteralizer<TMaterialPalettes> {
  public ToStyleText(options?: Partial<TStylizableOptions>): string {
    return Object.entries(this._tokens)
      .map(e =>
        Object.entries(e[1])
          .map(i => {
            const isNpV = i[0][1] === 'V';
            if (isNpV) {
              return `--${options?.prefix ?? 'md-sys-palette'}-${i[0]
                .slice(0, 2)
                .toLowerCase()}-${i[0].slice(2)}: ${i[1]};`;
            } else {
              return `--${
                options?.prefix ?? 'md-sys-palette'
              }-${i[0][0].toLowerCase()}-${i[0].slice(1)}: ${i[1]};`;
            }
          })
          .reduce((p, c) => p + c)
      )
      .reduce((p, c) => p + c);
  }
}

export type TPaletteGeneratorClassConstructorOptions = {
  isDark: boolean;
  contrastLevel: number | TMaterialContrastLevel;
  primaryPalette: TColor;
  secondaryPalette: TColor;
  tertiaryPalette: TColor;
  neutralPalette: TColor;
  neutralVariantPalette: TColor;
  variant: TMaterialVariant;
  cl: Array<number>;
};
export class CPaletteGeneratorUsingPalette extends CAPaletteGeneratorLiteralizer {
  protected override _tokens: TMaterialPalettes;

  public constructor(
    public sourceColor: TColor,
    public options?: Partial<TPaletteGeneratorClassConstructorOptions>
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

  protected override _Generate() {
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

    const palettes = {
      primary: {},
      secondary: {},
      tertiary: {},
      error: {},
      neutral: {},
      neutralVariant: {},
    } as Record<string, Record<string, string>>;

    for (const l of this.options?.cl ?? [
      0, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 100,
    ]) {
      palettes.primary[`P${l}`] = hexFromArgb(scheme.primaryPalette.tone(l));
      palettes.secondary[`S${l}`] = hexFromArgb(
        scheme.secondaryPalette.tone(l)
      );
      palettes.tertiary[`T${l}`] = hexFromArgb(scheme.tertiaryPalette.tone(l));
      palettes.error[`E${l}`] = hexFromArgb(scheme.errorPalette.tone(l));
      palettes.neutral[`N${l}`] = hexFromArgb(scheme.neutralPalette.tone(l));
      palettes.neutralVariant[`NV${l}`] = hexFromArgb(
        scheme.neutralVariantPalette.tone(l)
      );
    }

    return palettes as TMaterialPalettes;
  }

  public override value(): TMaterialPalettes {
    return this._tokens;
  }
}

export class CPaletteGeneratorUsingVariant extends CAPaletteGeneratorLiteralizer {
  protected override _tokens: TMaterialPalettes;

  public constructor(
    public sourceColor: TColor,
    public options?: Partial<
      Pick<TPaletteGeneratorClassConstructorOptions, 'cl'> &
        Pick<TPaletteGeneratorClassConstructorOptions, 'isDark'> &
        Pick<TPaletteGeneratorClassConstructorOptions, 'contrastLevel'> &
        Pick<TPaletteGeneratorClassConstructorOptions, 'variant'>
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

  protected override _Generate() {
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
    const palettes = {
      primary: {},
      secondary: {},
      tertiary: {},
      error: {},
      neutral: {},
      neutralVariant: {},
    } as Record<string, Record<string, string>>;

    for (const l of this.options?.cl ?? [
      0, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 100,
    ]) {
      palettes.primary[`P${l}`] = hexFromArgb(scheme.primaryPalette.tone(l));
      palettes.secondary[`S${l}`] = hexFromArgb(
        scheme.secondaryPalette.tone(l)
      );
      palettes.tertiary[`T${l}`] = hexFromArgb(scheme.tertiaryPalette.tone(l));
      palettes.error[`E${l}`] = hexFromArgb(scheme.errorPalette.tone(l));
      palettes.neutral[`N${l}`] = hexFromArgb(scheme.neutralPalette.tone(l));
      palettes.neutralVariant[`NV${l}`] = hexFromArgb(
        scheme.neutralVariantPalette.tone(l)
      );
    }

    return palettes as TMaterialPalettes;
  }

  public override value(): TMaterialPalettes {
    return this._tokens;
  }
}
