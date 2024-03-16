export type TStylizableOptions = {
  prefix: string;
};

export interface IStylizable<T extends Object> {
  ToStyleText(object: T, options?: Partial<TStylizableOptions>): string;
}
