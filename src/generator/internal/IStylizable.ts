export type TStylizableOptions = {
    prefix: string;
};

export interface IStylizable {
    ToStyleText(options?: Partial<TStylizableOptions>): string;
}

export abstract class CALiteralizer implements IStylizable {
    public abstract ToStyleText(options?: Partial<TStylizableOptions>): string;
}