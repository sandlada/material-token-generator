import { custom, excludeByRecordName } from "@glare-labs/jtc-lib"
import { DynamicScheme, Hct, hexFromArgb, TonalPalette, type DynamicColor } from "@material/material-color-utilities"
import { type TMaterialContrastLevel } from "../color/material-contrast-level"
import { type TMaterialVariant } from "../color/material-variant"
import { MaterialTokens, type TMaterialColorKey } from "./material-tokens"

export class MaterialDynamicTokens extends MaterialTokens {
    protected primaryPalette: TonalPalette
    protected secondaryPalette: TonalPalette
    protected tertiaryPalette: TonalPalette
    protected neutralPalette: TonalPalette
    protected neutralVariantPalette: TonalPalette

    constructor(
        options?: Partial<{
            hct: Hct,
            primaryPalette: TonalPalette,
            secondaryPalette: TonalPalette,
            tertiaryPalette: TonalPalette,
            neutralPalette: TonalPalette,
            neutralVariantPalette: TonalPalette,
            isDark: boolean,
            contrastLevel: TMaterialContrastLevel,
            variant: TMaterialVariant,
            prefix: string,
            excludedTokens: Array<TMaterialColorKey>,
            customTokens: Partial<Record<keyof TMaterialColorKey, DynamicColor>>
        }>
    ) {
        super(options?.hct ?? Hct.from(50, 50, 50), {
            ...options
        })

        this.primaryPalette = options?.primaryPalette ?? TonalPalette.fromHct(Hct.from(50, 75, 50))
        this.secondaryPalette = options?.secondaryPalette ?? TonalPalette.fromHct(Hct.from(150, 50, 50))
        this.tertiaryPalette = options?.tertiaryPalette ?? TonalPalette.fromHct(Hct.from(250, 45, 50))
        this.neutralPalette = options?.neutralPalette ?? TonalPalette.fromHct(Hct.from(350, 35, 50))
        this.neutralVariantPalette = options?.neutralVariantPalette ?? TonalPalette.fromHct(Hct.from(25, 25, 50))
    }

    public override getTokens(): Record<keyof TMaterialColorKey, string> {
        const scheme = new DynamicScheme({
            contrastLevel: this.contrastLevel,
            isDark: this.isDark,
            neutralPalette: this.neutralPalette,
            neutralVariantPalette: this.neutralVariantPalette,
            primaryPalette: this.primaryPalette,
            secondaryPalette: this.secondaryPalette,
            sourceColorArgb: this.hct.toInt(),
            tertiaryPalette: this.tertiaryPalette,
            variant: this.variant
        })

        const theme: Record<string, string> = {}
        for (const [key, value] of Object.entries(custom(excludeByRecordName(this.valueRecord, this.excludedTokens), this.customTokens))) {
            theme[key] = hexFromArgb(value.getArgb(scheme))
        }
        return theme
    }
}
