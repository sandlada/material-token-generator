import {
    DynamicScheme,
    Hct,
    hexFromArgb,
    TonalPalette
} from '@material/material-color-utilities'
import {
    EMaterialContrastLevel
} from '../color/material-contrast-level'
import { EMaterialVariant, type TMaterialVariant } from '../color/material-variant'

import { createProperty, cssText as jtcCssText } from '@glare-labs/jtc-lib'

type TMaterialPalettes = {
    primary: Record<string, string>
    secondary: Record<string, string>
    tertiary: Record<string, string>
    error: Record<string, string>
    neutral: Record<string, string>
    neutralVariant: Record<string, string>
}

export class MaterialDynamicPalettes {
    private _sourceColorHct: Hct
    private _isDark: boolean
    private _contrastLevel: number
    private _variant: TMaterialVariant | null
    private _prefix: string

    private _primaryPalette: TonalPalette
    private _secondaryPalette: TonalPalette
    private _tertiaryPalette: TonalPalette
    private _neutralPalette: TonalPalette
    private _neutralVariantPalette: TonalPalette

    private _levels: Array<number>

    constructor (
        options?: Partial<{
            sourceColorHct: Hct,
            isDark: boolean,
            contrastLevel: EMaterialContrastLevel,
            variant: TMaterialVariant | null,
            prefix: string,
            primaryPalette: TonalPalette,
            secondaryPalette: TonalPalette,
            tertiaryPalette: TonalPalette,
            neutralPalette: TonalPalette,
            neutralVariantPalette: TonalPalette,
            levels: Array<number>
        }>
    ) {
        this._sourceColorHct = options?.sourceColorHct ?? Hct.from(10, 50, 90)
        this._contrastLevel = options?.contrastLevel ?? EMaterialContrastLevel.Default
        this._isDark = options?.isDark ?? false
        this._variant = options?.variant ?? EMaterialVariant.Content
        this._prefix = options?.prefix ?? 'md-sys-palette'
        this._primaryPalette = options?.primaryPalette ?? TonalPalette.fromHct(Hct.from(0, 60, 90))
        this._secondaryPalette = options?.secondaryPalette ?? TonalPalette.fromHct(Hct.from(10, 50, 90))
        this._tertiaryPalette = options?.tertiaryPalette ?? TonalPalette.fromHct(Hct.from(20, 40, 90))
        this._neutralPalette = options?.neutralPalette ?? TonalPalette.fromHct(Hct.from(30, 30, 90))
        this._neutralVariantPalette = options?.neutralVariantPalette ?? TonalPalette.fromHct(Hct.from(40, 20, 90))
        this._levels = options?.levels ?? [0, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 100]
    }

    public cssRecord() {
        const record = {} as Record<string, { name: string, value: string }>
        for (const [k, v] of Object.entries(this.tokens(true, true))) {
            record[k.replace('-', '')] = {
                name: `--${this.prefix}-${k}`,
                value: v
            }
        }
        return record
    }

    public cssText(): string {
        const record = this.cssRecord()
        const cssVariableRecord = Object.values(record).reduce((p, c) => ({ ...p, [c.name]: c.value }), {})
        return jtcCssText(cssVariableRecord)
    }

    public cssPropertyRecord() {
        const record = {} as Record<string, { name: string, value: PropertyDefinition }>
        for (const [k, v] of Object.entries(this.tokens(true, true))) {
            record[k.replace('-', '')] = {
                name: `--${this.prefix}-${k}`,
                value: {
                    name: `--${this.prefix}-${k}`,
                    initialValue: v,
                    inherits: false,
                    syntax: '<color>',
                }
            }
        }
        return record
    }

    public cssPropertyText(): string {
        return jtcCssText(this.cssCreatePropertyRecord())
    }

    private cssCreatePropertyRecord() {
        const record = this.cssRecord()
        const properties = Object.values(record).map(k => createProperty({
            name: k.name,
            initialValue: k.value,
            inherits: false,
            syntax: '<color>',
        }))
        return properties
    }

    public tokens(flat = false, hyphen = false) {
        const scheme = this.scheme

        if (flat) {
            const palettes = {} as Record<string, string>

            for (const level of this.levels) {
                const values = this.getValuesFromSchemeAndTone(scheme, level)
                const toneFieldName = hyphen ? `-${level}` : level
                palettes[`primary${toneFieldName}`] = values.primary
                palettes[`secondary${toneFieldName}`] = values.secondary
                palettes[`tertiary${toneFieldName}`] = values.tertiary
                palettes[`error${toneFieldName}`] = values.error
                palettes[`neutral${toneFieldName}`] = values.neutral
                palettes[`neutralVariant${toneFieldName}`] = values.neutralVariant
            }

            return palettes
        } else {
            const palettes = {
                primary: {},
                secondary: {},
                tertiary: {},
                error: {},
                neutral: {},
                neutralVariant: {},
            } as Record<string, Record<string, string>>

            for (const level of this.levels) {
                const values = this.getValuesFromSchemeAndTone(scheme, level)
                const toneFieldName = hyphen ? `-${level}` : level
                palettes['primary'][`tone${toneFieldName}`] = values.primary
                palettes['secondary'][`tone${toneFieldName}`] = values.secondary
                palettes['tertiary'][`tone${toneFieldName}`] = values.tertiary
                palettes['error'][`tone${toneFieldName}`] = values.error
                palettes['neutral'][`tone${toneFieldName}`] = values.neutral
                palettes['neutralVariant'][`tone${toneFieldName}`] = values.neutralVariant
            }

            return palettes as TMaterialPalettes
        }
    }

    private getValuesFromSchemeAndTone(scheme: DynamicScheme, tone: number) {
        return ({
            primary: hexFromArgb(scheme.primaryPalette.tone(tone)),
            secondary: hexFromArgb(scheme.secondaryPalette.tone(tone)),
            tertiary: hexFromArgb(scheme.tertiaryPalette.tone(tone)),
            error: hexFromArgb(scheme.errorPalette.tone(tone)),
            neutral: hexFromArgb(scheme.neutralPalette.tone(tone)),
            neutralVariant: hexFromArgb(scheme.neutralVariantPalette.tone(tone)),
        })
    }

    protected get scheme(): DynamicScheme {
        return new DynamicScheme({
            sourceColorArgb: this.sourceColorHct.toInt(),
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
    }

    public get sourceColorHct(): Hct {
        return this._sourceColorHct
    }
    public set sourceColorHct(value: Hct) {
        this._sourceColorHct = value
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
    public set contrastLevel(value: EMaterialContrastLevel) {
        this._contrastLevel = value
    }
    public get variant(): TMaterialVariant | null {
        return this._variant
    }
    public set variant(value: TMaterialVariant | null) {
        this._variant = value
    }
    public get primaryPalette() {
        return this._primaryPalette
    }
    public set primaryPalette(value: TonalPalette) {
        this._primaryPalette = value
    }
    public get secondaryPalette() {
        return this._secondaryPalette
    }
    public set secondaryPalette(value: TonalPalette) {
        this._secondaryPalette = value
    }
    public get tertiaryPalette() {
        return this._tertiaryPalette
    }
    public set tertiaryPalette(value: TonalPalette) {
        this._tertiaryPalette = value
    }
    public get neutralPalette() {
        return this._neutralPalette
    }
    public set neutralPalette(value: TonalPalette) {
        this._neutralPalette = value
    }
    public get neutralVariantPalette() {
        return this._neutralVariantPalette
    }
    public set neutralVariantPalette(value: TonalPalette) {
        this._neutralVariantPalette = value
    }
    public get levels() {
        return this._levels
    }
    public set levels(value: Array<number>) {
        this._levels = value
    }
    public get prefix() {
        return this._prefix
    }
    public set prefix(value: string) {
        this._prefix = value
    }
}
