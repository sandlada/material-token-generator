import type {IStylizable, TStylizableOptions} from './IStylizable';

abstract class CAMaterialGenerator<TokenType> {
  protected abstract _tokens: TokenType;
  protected abstract _Generate(): NonNullable<TokenType>;
  public abstract value(): NonNullable<TokenType>;
}

export abstract class CAGeneratorLiteralizer<TokenType>
  extends CAMaterialGenerator<TokenType>
  implements IStylizable
{
  public abstract ToStyleText(options?: Partial<TStylizableOptions>): string;
  public abstract toString(): string;
}
