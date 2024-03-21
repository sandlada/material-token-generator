export type TStylizableOptions = {
  prefix: string;
};

export interface IStylizable {
  ToStyleText(options?: Partial<TStylizableOptions>): string;
}
