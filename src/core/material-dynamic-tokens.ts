import { createProperty, custom, excludeByRecordName, cssText as jtcCssText, toKebabCase } from "@glare-labs/jtc-lib"
import { DynamicScheme, Hct, hexFromArgb, TonalPalette, type DynamicColor } from "@material/material-color-utilities"
import { EMaterialContrastLevel, type TMaterialContrastLevel } from "../color/material-contrast-level"
import { EMaterialVariant, type TMaterialVariant } from "../color/material-variant"
import { MaterialColors, type TMaterialColors } from "../material-colors/material-colors"

export class MaterialDynamicTokens {
    protected _sourceColorHct: Hct
    protected _isDark: boolean
    protected _contrastLevel: number
    protected _variant: TMaterialVariant
    protected _prefix: string
    protected _excludedTokens: Array<keyof TMaterialColors>
    protected _customTokens: Record<keyof TMaterialColors, DynamicColor> | {}

    protected _primaryPalette: TonalPalette
    protected _secondaryPalette: TonalPalette
    protected _tertiaryPalette: TonalPalette
    protected _neutralPalette: TonalPalette
    protected _neutralVariantPalette: TonalPalette

    constructor(
        options?: Partial<{
            sourceColorHct: Hct,
            primaryPalette: TonalPalette,
            secondaryPalette: TonalPalette,
            tertiaryPalette: TonalPalette,
            neutralPalette: TonalPalette,
            neutralVariantPalette: TonalPalette,
            isDark: boolean,
            contrastLevel: TMaterialContrastLevel,
            variant: TMaterialVariant,
            prefix: string,
            excludedTokens: Array<keyof TMaterialColors>,
            customTokens: Record<keyof TMaterialColors, DynamicColor> | {}
        }>
    ) {
        this._sourceColorHct = options?.sourceColorHct ?? Hct.from(10, 50, 90)
        this._contrastLevel = options?.contrastLevel ?? EMaterialContrastLevel.Default
        this._isDark = options?.isDark ?? false
        this._variant = options?.variant ?? EMaterialVariant.Content
        this._prefix = options?.prefix ?? 'md-sys-color'
        this._excludedTokens = options?.excludedTokens ?? []
        this._customTokens = options?.customTokens ?? {}
        this._primaryPalette = options?.primaryPalette ?? TonalPalette.fromHct(Hct.from(50, 75, 50))
        this._secondaryPalette = options?.secondaryPalette ?? TonalPalette.fromHct(Hct.from(150, 50, 50))
        this._tertiaryPalette = options?.tertiaryPalette ?? TonalPalette.fromHct(Hct.from(250, 45, 50))
        this._neutralPalette = options?.neutralPalette ?? TonalPalette.fromHct(Hct.from(350, 35, 50))
        this._neutralVariantPalette = options?.neutralVariantPalette ?? TonalPalette.fromHct(Hct.from(25, 25, 50))
    }

    public cssRecord() {
        const record = {} as Record<string, { name: string, value: string }>
        for (const [k, v] of Object.entries(this.tokens())) {
            record[k] = {
                name: `--${this.prefix}-${toKebabCase(k)}`,
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
        for (const [k, v] of Object.entries(this.tokens())) {
            record[k] = {
                name: `--${this.prefix}-${toKebabCase(k)}`,
                value: {
                    name: `--${this.prefix}-${toKebabCase(k)}`,
                    initialValue: v,
                    inherits: false,
                    syntax: '<color>',
                }
            }
        }
        return record
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

    public cssPropertyText(): string {
        return jtcCssText(this.cssCreatePropertyRecord())
    }

    public tokens() {
        const scheme = this.scheme
        return this.generate(scheme)
    }

    private generate(scheme: DynamicScheme) {
        const theme: Record<string, string> = {}
        for (const [key, value] of Object.entries(custom(excludeByRecordName(MaterialColors.values, this.excludedTokens), this.customTokens))) {
            theme[key] = hexFromArgb(value.getArgb(scheme))
        }
        return theme
    }

    protected get scheme() {
        return new DynamicScheme({
            contrastLevel: this.contrastLevel,
            isDark: this.isDark,
            variant: this.variant,
            sourceColorArgb: this.sourceColorHct.toInt(),
            primaryPalette: this.primaryPalette,
            secondaryPalette: this.secondaryPalette,
            tertiaryPalette: this.tertiaryPalette,
            neutralPalette: this.neutralPalette,
            neutralVariantPalette: this.neutralVariantPalette,
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
    public set contrastLevel(value: TMaterialContrastLevel) {
        this._contrastLevel = value
    }
    public get variant(): TMaterialVariant {
        return this._variant
    }
    public set variant(value: TMaterialVariant) {
        this._variant = value
    }
    public get prefix() {
        return this._prefix
    }
    public set prefix(value: string) {
        this._prefix = value
    }
    public get excludedTokens() {
        return this._excludedTokens
    }
    public set excludedTokens(value: Array<keyof TMaterialColors>) {
        this._excludedTokens = value
    }
    public get customTokens() {
        return this._customTokens
    }
    public set customTokens(value: Record<keyof TMaterialColors, DynamicColor> | {}) {
        this._customTokens = value
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
}
