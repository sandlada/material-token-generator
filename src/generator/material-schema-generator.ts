import {
  Hct,
  hexFromArgb,
  SchemeTonalSpot,
} from '@material/material-color-utilities';
import {EMaterialColorContrastLevel} from '../color/contrast';
import {TColor, TMaterialColors} from '../color/material-colors';
import {FromColorStringToInt} from '../utils/strings';
import {
  IMaterialGenerator,
  TMaterialGeneratorOptions,
} from './IMaterialGenerator';
import {IStylizable, TStylizableOptions} from './IStylizable';
import {ISingletonable} from './ISingletonable';

/**
 *
 * MaterialSchemaGenerator can create a group of material schema tokens(P, S, T, E, N, NV),
 * e.g.
 *      P0 P5 P10 P20 ... P100
 *      S0 ...
 *      T0 ...
 *
 *
 * MaterialDynamicThemeGenerator can transform tokens from schema to color tokens,
 * e.g.
 *      shadow -> MaterialDynamicColors.shadow -> N0 -> #000000 -> --md-sys-color-shadow: #000000;
 *
 */

export type TMaterialSchemas = {
  primary: {
    P0: string;
    P5: string;
    P10: string;
    P20: string;
    P30: string;
    P40: string;
    P50: string;
    P60: string;
    P70: string;
    P80: string;
    P90: string;
    P95: string;
    P100: string;
  };
  secondary: {
    S0: string;
    S5: string;
    S10: string;
    S20: string;
    S30: string;
    S40: string;
    S50: string;
    S60: string;
    S70: string;
    S80: string;
    S90: string;
    S95: string;
    S100: string;
  };
  tertiary: {
    T0: string;
    T5: string;
    T10: string;
    T20: string;
    T30: string;
    T40: string;
    T50: string;
    T60: string;
    T70: string;
    T80: string;
    T90: string;
    T95: string;
    T100: string;
  };
  error: {
    E0: string;
    E5: string;
    E10: string;
    E20: string;
    E30: string;
    E40: string;
    E50: string;
    E60: string;
    E70: string;
    E80: string;
    E90: string;
    E95: string;
    E100: string;
  };
  neutral: {
    N0: string;
    N5: string;
    N10: string;
    N20: string;
    N30: string;
    N40: string;
    N50: string;
    N60: string;
    N70: string;
    N80: string;
    N90: string;
    N95: string;
    N100: string;
  };
  neutralVariant: {
    NV0: string;
    NV5: string;
    NV10: string;
    NV20: string;
    NV30: string;
    NV40: string;
    NV50: string;
    NV60: string;
    NV70: string;
    NV80: string;
    NV90: string;
    NV95: string;
    NV100: string;
  };
};

class CMaterialSchemasGenerator
  implements
    IMaterialGenerator<
      TMaterialGeneratorOptions & {cl: Array<number>},
      TMaterialSchemas
    >,
    IStylizable<TMaterialSchemas>,
    ISingletonable
{
  private static readonly cl = [
    0, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 100,
  ];

  private static Instance: CMaterialSchemasGenerator | null = null;

  private constructor() {}

  public static GetInstance() {
    if (this.Instance === null) this.Instance = new CMaterialSchemasGenerator();
    return this.Instance;
  }

  public get value() {
    return CMaterialSchemasGenerator.GetInstance();
  }

  ToStyleText(
    object: TMaterialSchemas,
    options?: Partial<TStylizableOptions> | undefined
  ): string {
    return Object.entries(object)
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

  GenerateBySourceColor(
    sourceColor: TColor,
    options?:
      | Partial<TMaterialGeneratorOptions & {cl: Array<number>}>
      | undefined
  ): TMaterialSchemas {
    const color = FromColorStringToInt(sourceColor);
    const scheme = new SchemeTonalSpot(
      Hct.fromInt(color),
      options?.isDark ?? false,
      options?.contrastLevel ?? EMaterialColorContrastLevel.Default
    );

    const r = {
      primary: {},
      secondary: {},
      tertiary: {},
      error: {},
      neutral: {},
      neutralVariant: {},
    } as Record<string, Record<string, string>>;

    for (const l of options?.cl ?? CMaterialSchemasGenerator.cl) {
      r.primary[`P${l}`] = hexFromArgb(scheme.primaryPalette.tone(l));
      r.secondary[`S${l}`] = hexFromArgb(scheme.secondaryPalette.tone(l));
      r.tertiary[`T${l}`] = hexFromArgb(scheme.tertiaryPalette.tone(l));
      r.error[`E${l}`] = hexFromArgb(scheme.errorPalette.tone(l));
      r.neutral[`N${l}`] = hexFromArgb(scheme.neutralPalette.tone(l));
      r.neutralVariant[`NV${l}`] = hexFromArgb(
        scheme.neutralVariantPalette.tone(l)
      );
    }

    return r as TMaterialSchemas;
  }
}

export class MaterialSchemasGenerator {
  public static GenerateBySourceColor(
    sourceColor: TColor,
    options?:
      | Partial<TMaterialGeneratorOptions & {cl: Array<number>}>
      | undefined
  ) {
    return CMaterialSchemasGenerator.GetInstance().GenerateBySourceColor(
      sourceColor,
      options
    );
  }

  public static ToStyleText(
    object: TMaterialSchemas,
    options?: Partial<TStylizableOptions> | undefined
  ) {
    return CMaterialSchemasGenerator.GetInstance().ToStyleText(object, options);
  }
}
