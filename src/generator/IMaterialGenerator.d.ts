import {TColor} from '../color/material-colors';

export type TMaterialGeneratorOptions = {
  isDark: boolean;
  contrastLevel: number | TMaterialColorContrastLevel;
};

export interface IMaterialGenerator<TI extends Object, TR> {
  GenerateBySourceColor(sourceColor: TColor, options?: Partial<TI>): TR;
}
