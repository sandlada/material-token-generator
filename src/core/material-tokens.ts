import { createProperty, createStyle, cssText, custom, excludeByRecordName, toKebabCase } from '@glare-labs/jtc-lib'
import {
    DynamicColor,
    Hct,
    hexFromArgb,
    MaterialDynamicColors,
    SchemeContent,
    SchemeExpressive,
    SchemeFidelity,
    SchemeMonochrome,
    SchemeNeutral,
    SchemeTonalSpot,
    SchemeVibrant
} from '@material/material-color-utilities'
import {
    type TMaterialContrastLevel,
    EMaterialContrastLevel,
} from '../color/material-contrast-level'
import { type TMaterialVariant, EMaterialVariant } from '../color/material-variant'

interface IMaterialTokens {
    hct: Hct
    isDark: boolean
    contrastLevel: TMaterialContrastLevel
    variant: TMaterialVariant
}
export type TMaterialColorKey = {
    primaryPaletteKeyColor: DynamicColor
    secondaryPaletteKeyColor: DynamicColor
    tertiaryPaletteKeyColor: DynamicColor
    neutralPaletteKeyColor: DynamicColor
    neutralVariantPaletteKeyColor: DynamicColor
    background: DynamicColor
    onBackground: DynamicColor
    surface: DynamicColor
    surfaceDim: DynamicColor
    surfaceBright: DynamicColor
    surfaceContainerLowest: DynamicColor
    surfaceContainerLow: DynamicColor
    surfaceContainer: DynamicColor
    surfaceContainerHigh: DynamicColor
    surfaceContainerHighest: DynamicColor
    onSurface: DynamicColor
    surfaceVariant: DynamicColor
    onSurfaceVariant: DynamicColor
    inverseSurface: DynamicColor
    inverseOnSurface: DynamicColor
    outline: DynamicColor
    outlineVariant: DynamicColor
    shadow: DynamicColor
    scrim: DynamicColor
    surfaceTint: DynamicColor
    primary: DynamicColor
    onPrimary: DynamicColor
    primaryContainer: DynamicColor
    onPrimaryContainer: DynamicColor
    inversePrimary: DynamicColor
    secondary: DynamicColor
    onSecondary: DynamicColor
    secondaryContainer: DynamicColor
    onSecondaryContainer: DynamicColor
    tertiary: DynamicColor
    onTertiary: DynamicColor
    tertiaryContainer: DynamicColor
    onTertiaryContainer: DynamicColor
    error: DynamicColor
    onError: DynamicColor
    errorContainer: DynamicColor
    onErrorContainer: DynamicColor
    primaryFixed: DynamicColor
    primaryFixedDim: DynamicColor
    onPrimaryFixed: DynamicColor
    onPrimaryFixedVariant: DynamicColor
    secondaryFixed: DynamicColor
    secondaryFixedDim: DynamicColor
    onSecondaryFixed: DynamicColor
    onSecondaryFixedVariant: DynamicColor
    tertiaryFixed: DynamicColor
    tertiaryFixedDim: DynamicColor
    onTertiaryFixed: DynamicColor
    onTertiaryFixedVariant: DynamicColor
}

/**
 * A Mapping of color token name to MCU HCT color function generator.
 */
class MaterialColors {
    private primaryPaletteKeyColor = MaterialDynamicColors.primaryPaletteKeyColor
    private secondaryPaletteKeyColor = MaterialDynamicColors.secondaryPaletteKeyColor
    private tertiaryPaletteKeyColor = MaterialDynamicColors.tertiaryPaletteKeyColor
    private neutralPaletteKeyColor = MaterialDynamicColors.neutralPaletteKeyColor
    private neutralVariantPaletteKeyColor = MaterialDynamicColors.neutralVariantPaletteKeyColor
    private background = MaterialDynamicColors.background
    private onBackground = MaterialDynamicColors.onBackground
    private surface = MaterialDynamicColors.surface
    private surfaceDim = MaterialDynamicColors.surfaceDim
    private surfaceBright = MaterialDynamicColors.surfaceBright
    private surfaceContainerLowest = MaterialDynamicColors.surfaceContainerLowest
    private surfaceContainerLow = MaterialDynamicColors.surfaceContainerLow
    private surfaceContainer = MaterialDynamicColors.surfaceContainer
    private surfaceContainerHigh = MaterialDynamicColors.surfaceContainerHigh
    private surfaceContainerHighest = MaterialDynamicColors.surfaceContainerHighest
    private onSurface = MaterialDynamicColors.onSurface
    private surfaceVariant = MaterialDynamicColors.surfaceVariant
    private onSurfaceVariant = MaterialDynamicColors.onSurfaceVariant
    private inverseSurface = MaterialDynamicColors.inverseSurface
    private inverseOnSurface = MaterialDynamicColors.inverseOnSurface
    private outline = MaterialDynamicColors.outline
    private outlineVariant = MaterialDynamicColors.outlineVariant
    private shadow = MaterialDynamicColors.shadow
    private scrim = MaterialDynamicColors.scrim
    private surfaceTint = MaterialDynamicColors.surfaceTint
    private primary = MaterialDynamicColors.primary
    private onPrimary = MaterialDynamicColors.onPrimary
    private primaryContainer = MaterialDynamicColors.primaryContainer
    private onPrimaryContainer = MaterialDynamicColors.onPrimaryContainer
    private inversePrimary = MaterialDynamicColors.inversePrimary
    private secondary = MaterialDynamicColors.secondary
    private onSecondary = MaterialDynamicColors.onSecondary
    private secondaryContainer = MaterialDynamicColors.secondaryContainer
    private onSecondaryContainer = MaterialDynamicColors.onSecondaryContainer
    private tertiary = MaterialDynamicColors.tertiary
    private onTertiary = MaterialDynamicColors.onTertiary
    private tertiaryContainer = MaterialDynamicColors.tertiaryContainer
    private onTertiaryContainer = MaterialDynamicColors.onTertiaryContainer
    private error = MaterialDynamicColors.error
    private onError = MaterialDynamicColors.onError
    private errorContainer = MaterialDynamicColors.errorContainer
    private onErrorContainer = MaterialDynamicColors.onErrorContainer
    private primaryFixed = MaterialDynamicColors.primaryFixed
    private primaryFixedDim = MaterialDynamicColors.primaryFixedDim
    private onPrimaryFixed = MaterialDynamicColors.onPrimaryFixed
    private onPrimaryFixedVariant = MaterialDynamicColors.onPrimaryFixedVariant
    private secondaryFixed = MaterialDynamicColors.secondaryFixed
    private secondaryFixedDim = MaterialDynamicColors.secondaryFixedDim
    private onSecondaryFixed = MaterialDynamicColors.onSecondaryFixed
    private onSecondaryFixedVariant = MaterialDynamicColors.onSecondaryFixedVariant
    private tertiaryFixed = MaterialDynamicColors.tertiaryFixed
    private tertiaryFixedDim = MaterialDynamicColors.tertiaryFixedDim
    private onTertiaryFixed = MaterialDynamicColors.onTertiaryFixed
    private onTertiaryFixedVariant = MaterialDynamicColors.onTertiaryFixedVariant

    protected get valueRecord(): Record<string, DynamicColor> {
        return ({
            primaryPaletteKeyColor: this.primaryPaletteKeyColor,
            secondaryPaletteKeyColor: this.secondaryPaletteKeyColor,
            tertiaryPaletteKeyColor: this.tertiaryPaletteKeyColor,
            neutralPaletteKeyColor: this.neutralPaletteKeyColor,
            neutralVariantPaletteKeyColor: this.neutralVariantPaletteKeyColor,
            background: this.background,
            onBackground: this.onBackground,
            surface: this.surface,
            surfaceDim: this.surfaceDim,
            surfaceBright: this.surfaceBright,
            surfaceContainerLowest: this.surfaceContainerLowest,
            surfaceContainerLow: this.surfaceContainerLow,
            surfaceContainer: this.surfaceContainer,
            surfaceContainerHigh: this.surfaceContainerHigh,
            surfaceContainerHighest: this.surfaceContainerHighest,
            onSurface: this.onSurface,
            surfaceVariant: this.surfaceVariant,
            onSurfaceVariant: this.onSurfaceVariant,
            inverseSurface: this.inverseSurface,
            inverseOnSurface: this.inverseOnSurface,
            outline: this.outline,
            outlineVariant: this.outlineVariant,
            shadow: this.shadow,
            scrim: this.scrim,
            surfaceTint: this.surfaceTint,
            primary: this.primary,
            onPrimary: this.onPrimary,
            primaryContainer: this.primaryContainer,
            onPrimaryContainer: this.onPrimaryContainer,
            inversePrimary: this.inversePrimary,
            secondary: this.secondary,
            onSecondary: this.onSecondary,
            secondaryContainer: this.secondaryContainer,
            onSecondaryContainer: this.onSecondaryContainer,
            tertiary: this.tertiary,
            onTertiary: this.onTertiary,
            tertiaryContainer: this.tertiaryContainer,
            onTertiaryContainer: this.onTertiaryContainer,
            error: this.error,
            onError: this.onError,
            errorContainer: this.errorContainer,
            onErrorContainer: this.onErrorContainer,
            primaryFixed: this.primaryFixed,
            primaryFixedDim: this.primaryFixedDim,
            onPrimaryFixed: this.onPrimaryFixed,
            onPrimaryFixedVariant: this.onPrimaryFixedVariant,
            secondaryFixed: this.secondaryFixed,
            secondaryFixedDim: this.secondaryFixedDim,
            onSecondaryFixed: this.onSecondaryFixed,
            onSecondaryFixedVariant: this.onSecondaryFixedVariant,
            tertiaryFixed: this.tertiaryFixed,
            tertiaryFixedDim: this.tertiaryFixedDim,
            onTertiaryFixed: this.onTertiaryFixed,
            onTertiaryFixedVariant: this.onTertiaryFixedVariant,
        })
    }
}

export class MaterialTokens extends MaterialColors implements IMaterialTokens {
    protected _hct: Hct
    protected _isDark: boolean
    protected _contrastLevel: number
    protected _variant: TMaterialVariant

    protected prefix: string

    protected excludedTokens: Array<TMaterialColorKey>
    protected customTokens: Partial<Record<keyof TMaterialColorKey, DynamicColor>>

    constructor(
        hct: Hct,
        options?: Partial<{
            isDark: boolean,
            contrastLevel: TMaterialContrastLevel,
            variant: TMaterialVariant,
            prefix: string,
            excludedTokens: Array<TMaterialColorKey>,
            customTokens: Partial<Record<keyof TMaterialColorKey, DynamicColor>>
        }>
    ) {
        super()

        this._hct = hct ?? Hct.from(10, 50, 90)
        this._contrastLevel = options?.contrastLevel ?? EMaterialContrastLevel.Default
        this._isDark = options?.isDark ?? false
        this._variant = options?.variant ?? EMaterialVariant.Content

        this.prefix = options?.prefix ?? 'md-sys-color'

        this.excludedTokens = options?.excludedTokens ?? []
        this.customTokens = options?.customTokens ?? {}
    }

    public getCssText(): string {
        const styles = Object.entries(this.getTokens()).map(e => createStyle(`--${this.prefix ?? 'md-sys-color'}-${toKebabCase(e[0])}`, e[1]))
        return cssText(styles)
    }

    public getCssPropertyText(): string {
        const styles = Object.entries(this.getTokens()).map(e => createProperty({
            name: `--${this.prefix ?? 'md-sys-color'}-${toKebabCase(e[0])}`,
            initialValue: e[1],
            inherits: false,
            syntax: '<color>'
        }))
        return cssText(styles)
    }

    public getPropertyArray(): Array<PropertyDefinition> {
        return Object.entries(this.getTokens()).map(e => (createProperty({
            name: `--${this.prefix ?? 'md-sys-color'}-${toKebabCase(e[0])}`,
            initialValue: e[1],
            inherits: true,
            syntax: '<color>'
        }).data))
    }

    public getTokens(): Record<keyof TMaterialColorKey, string> {
        let scheme = null

        switch (this.variant ?? EMaterialVariant.Vibrant) {
            case EMaterialVariant.Monochrome:
                scheme = new SchemeMonochrome(this.hct, this.isDark, this.contrastLevel)
                break
            case EMaterialVariant.Neutral:
                scheme = new SchemeNeutral(this.hct, this.isDark, this.contrastLevel)
                break
            case EMaterialVariant.TonalSpot:
                scheme = new SchemeTonalSpot(this.hct, this.isDark, this.contrastLevel)
                break
            case EMaterialVariant.Vibrant:
                scheme = new SchemeVibrant(this.hct, this.isDark, this.contrastLevel)
                break
            case EMaterialVariant.Expressive:
                scheme = new SchemeExpressive(this.hct, this.isDark, this.contrastLevel)
                break
            case EMaterialVariant.Fidelity:
                scheme = new SchemeFidelity(this.hct, this.isDark, this.contrastLevel)
                break
            case EMaterialVariant.Content:
                scheme = new SchemeContent(this.hct, this.isDark, this.contrastLevel)
                break
            default:
                throw new Error(`Unaccepted parameter value [options.variant] [${this.variant}]`)
        }

        const theme: Record<string, string> = {}
        for (const [key, value] of Object.entries(custom(excludeByRecordName(this.valueRecord, this.excludedTokens), this.customTokens))) {
            theme[key] = hexFromArgb(value.getArgb(scheme))
        }
        return theme
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
    public get variant(): TMaterialVariant {
        return this._variant
    }
    public set variant(value: TMaterialVariant) {
        this._variant = value
    }
}
