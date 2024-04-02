import { CALiteralizer } from "./IStylizable";

export abstract class CAMaterialGenerator<TokenType> extends CALiteralizer {
  protected abstract _tokens: TokenType;
  protected abstract _Generate(): NonNullable<TokenType>;
}