import {
    DynamicScheme,
    Hct,
    hexFromArgb,
    TonalPalette
} from '@material/material-color-utilities'
import {
    EMaterialContrastLevel,
    type TMaterialContrastLevel,
} from '../color/material-contrast-level'
import { EMaterialVariant, type TMaterialVariant } from '../color/material-variant'

import { createProperty, cssText, toKebabCase } from '@glare-labs/jtc-lib'

type TMaterialPalettes = {
    primary: Record<string, string>
    secondary: Record<string, string>
    tertiary: Record<string, string>
    error: Record<string, string>
    neutral: Record<string, string>
    neutralVariant: Record<string, string>
}

export class MaterialPalettes {
    private _hct: Hct
    private _isDark: boolean
    private _contrastLevel: number
    private _variant: TMaterialVariant | null

    private prefix: string

    private primaryPalette: TonalPalette
    private secondaryPalette: TonalPalette
    private tertiaryPalette: TonalPalette
    private neutralPalette: TonalPalette
    private neutralVariantPalette: TonalPalette

    private level: Array<number>

    constructor(
        hct: Hct,
        options?: Partial<{
            isDark: boolean,
            contrastLevel: TMaterialContrastLevel,
            variant: TMaterialVariant | null,
            prefix: string,
            primaryPalette: TonalPalette,
            secondaryPalette: TonalPalette,
            tertiaryPalette: TonalPalette,
            neutralPalette: TonalPalette,
            neutralVariantPalette: TonalPalette,
            level: Array<number>
        }>
    ) {
        this._hct = hct ?? Hct.from(10, 50, 90)
        this._contrastLevel = options?.contrastLevel ?? EMaterialContrastLevel.Default
        this._isDark = options?.isDark ?? false
        this._variant = options?.variant ?? EMaterialVariant.Content,

            this.prefix = options?.prefix ?? 'md-sys-palette'
        this.primaryPalette = options?.primaryPalette ?? TonalPalette.fromHct(Hct.from(0, 60, 90))
        this.secondaryPalette = options?.secondaryPalette ?? TonalPalette.fromHct(Hct.from(10, 50, 90))
        this.tertiaryPalette = options?.tertiaryPalette ?? TonalPalette.fromHct(Hct.from(20, 40, 90))
        this.neutralPalette = options?.neutralPalette ?? TonalPalette.fromHct(Hct.from(30, 30, 90))
        this.neutralVariantPalette = options?.neutralVariantPalette ?? TonalPalette.fromHct(Hct.from(40, 20, 90))

        this.level = options?.level ?? [0, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 100]
    }

    public getCssText(): string {
        return Object.entries(this.getTokens()).map(e => Object.entries(e[1]).map(i => `--${this.prefix}-${toKebabCase(e[0])}-${i[0]}: ${i[1]};`).reduce((p, c) => p + c)).reduce((p, c) => p + c)
    }

    public getCssPropertyText(): string {
        let tokens: Record<string, PropertyDefinition> = {}
        for (const [serial, values] of Object.entries(this.getTokens())) {
            for (const [tone, value] of Object.entries(values)) {
                tokens[`${serial}${tone}`] = createProperty({
                    name: `--${this.prefix}-${tone}`,
                    inherits: false,
                    initialValue: value,
                    syntax: "<color>"
                })
            }
        }
        return cssText(tokens)
    }

    public getPropertyRecord(): Record<string, Record<string, PropertyDefinition>> {
        const tokens: Record<string, Record<string, PropertyDefinition>> = {}

        for (const [serial, values] of Object.entries(this.getTokens())) {
            const toneRecord: Record<string, PropertyDefinition> = {}

            for (const [tone, value] of Object.entries(values)) {
                toneRecord[`${serial}${tone}`] = createProperty({
                    name: `--${this.prefix} - ${tone}`,
                    inherits: false,
                    initialValue: value,
                    syntax: "<color>"
                }).data

            }
            tokens[serial] = toneRecord
        }

        return tokens
    }

    public getTokens() {
        const scheme = new DynamicScheme({
            sourceColorArgb: this.hct.toInt(),
            primaryPalette: this.primaryPalette,
            secondaryPalette: this.secondaryPalette,
            tertiaryPalette: this.tertiaryPalette,
            neutralPalette: this.neutralPalette,
            neutralVariantPalette: this.neutralVariantPalette,
            isDark: this.isDark,
            contrastLevel: this.contrastLevel ?? EMaterialContrastLevel.Default,
            // @ts-ignore
            variant: this.variant
        })

        const palettes = {
            primary: {},
            secondary: {},
            tertiary: {},
            error: {},
            neutral: {},
            neutralVariant: {},
        } as Record<string, Record<string, string>>
        console.log(scheme)

        for (const l of this.level) {
            palettes.primary[`${l}`] = hexFromArgb(scheme.primaryPalette.tone(l))
            palettes.secondary[`${l}`] = hexFromArgb(scheme.secondaryPalette.tone(l))
            palettes.tertiary[`${l}`] = hexFromArgb(scheme.tertiaryPalette.tone(l))
            palettes.error[`${l}`] = hexFromArgb(scheme.errorPalette.tone(l))
            palettes.neutral[`${l}`] = hexFromArgb(scheme.neutralPalette.tone(l))
            palettes.neutralVariant[`${l}`] = hexFromArgb(scheme.neutralVariantPalette.tone(l))
        }

        return palettes as TMaterialPalettes
    }

    public get hct(): Hct {
        return this._hct
    }
    public set hct(value: Hct) {
        this._hct = value
    }
    public get isDark(): boolean {
        return this._isDark
    }
    public set isDark(value: boolean) {
        this._isDark = value
    }
    public get contrastLevel(): number {
        return this._contrastLevel
    }
    public set contrastLevel(value: TMaterialContrastLevel) {
        this._contrastLevel = value
    }
    public get variant(): TMaterialVariant | null {
        return this._variant
    }
    public set variant(value: TMaterialVariant | null) {
        this._variant = value
    }
}
