import {
  Hct,
  SchemeContent,
  hexFromArgb,
  DynamicScheme,
  SchemeTonalSpot,
} from '@material/material-color-utilities';
import { MaterialColors } from './material-colors';
import { ToKebabCase } from './strings';

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



export enum EMaterialContrastLevel {
  Reduced = -1.0,
  Default = 0,
  Medium = 0.5,
  High = 1.0,
}
export interface IMaterialGeneratorOptions {
  isDark: boolean;
  contrastLevel: number | EMaterialContrastLevel;
}




