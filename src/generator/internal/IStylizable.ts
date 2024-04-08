export type TStylizableOptions = {
    prefix: string;
};

export interface IStylizable {
    toStyleText(options?: Partial<TStylizableOptions>): string;
}

export abstract class CALiteralizer implements IStylizable {
    public abstract toStyleText(options?: Partial<TStylizableOptions>): string;
}