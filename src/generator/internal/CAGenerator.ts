import type {IStylizable, TStylizableOptions} from './IStylizable';

interface IMaterialGenerator<T> {
  Generate: () => NonNullable<T>;
}

abstract class CAMaterialGenerator<TokenType>
  extends Object
  implements IMaterialGenerator<TokenType>
{
  protected abstract tokens: TokenType;
  public abstract Generate(): NonNullable<TokenType>;
}

export abstract class CAGeneratorLiteralizer<TokenType>
  extends CAMaterialGenerator<TokenType>
  implements IStylizable
{
  public abstract ToStyleText(options?: Partial<TStylizableOptions>): string;
  public abstract toString(): string;
}
