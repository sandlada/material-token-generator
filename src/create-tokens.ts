import { DislikeAnalyzer, DynamicScheme, Hct, hexFromArgb, SchemeContent, SchemeExpressive, SchemeFidelity, SchemeFruitSalad, SchemeMonochrome, SchemeNeutral, SchemeRainbow, SchemeTonalSpot, SchemeVibrant, TemperatureCache, TonalPalette } from "@material/material-color-utilities"
import { MaterialColors, type TMaterialColors } from "./material/material-colors"
import { MaterialContrastLevel, type TMaterialContrastLevel } from "./material/material-contrast-level"
import { MaterialVariant, type TMaterialVariant } from "./material/material-variant"
import { toKebabCase } from "./string-utils/to-kebab-case"

type TOption = {
    primaryPalette       ?: TonalPalette
    secondaryPalette     ?: TonalPalette
    tertiaryPalette      ?: TonalPalette
    neutralPalette       ?: TonalPalette
    neutralVariantPalette?: TonalPalette
}

type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N ? Acc[number] : Enumerate<N, [...Acc, Acc['length']]>
type NumberRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>

function GetVariantScheme(variant: TMaterialVariant, hct: Hct, isDark: boolean, contrast: number) {
    switch(variant) {
        case MaterialVariant.Monochrome: return new SchemeMonochrome(hct, isDark, contrast)
        case MaterialVariant.Neutral   : return new SchemeNeutral(hct, isDark, contrast)
        case MaterialVariant.TonalSpot : return new SchemeTonalSpot(hct, isDark, contrast)
        case MaterialVariant.Vibrant   : return new SchemeVibrant(hct, isDark, contrast)
        case MaterialVariant.Expressive: return new SchemeExpressive(hct, isDark, contrast)
        case MaterialVariant.Fidelity  : return new SchemeFidelity(hct, isDark, contrast)
        case MaterialVariant.Content   : return new SchemeContent(hct, isDark, contrast)
        case MaterialVariant.Rainbow   : return new SchemeRainbow(hct, isDark, contrast)
        case MaterialVariant.FruitSalad: return new SchemeFruitSalad(hct, isDark, contrast)
        default                        : throw new Error(`Non-Supported Variant Parameter: ${variant}.`)
    }
}

export function createTokens(sourceColorHct: Hct, contrastLevel: TMaterialContrastLevel = 0, variant: TMaterialVariant | -1 = -1, options?: Partial<TOption>) {
    let lightScheme
    let darkScheme
    if(typeof variant === 'number' && variant !== -1) {
        lightScheme = GetVariantScheme(variant, sourceColorHct, false, contrastLevel)
        darkScheme  = GetVariantScheme(variant, sourceColorHct, true, contrastLevel)
    } else {
        lightScheme = new DynamicScheme({
            isDark               : false,
            contrastLevel        : MaterialContrastLevel.Default,
            sourceColorArgb      : Hct.from(120, 75, 50).toInt(),
            primaryPalette       : TonalPalette.fromHueAndChroma(sourceColorHct.hue, sourceColorHct.chroma),
            secondaryPalette     : TonalPalette.fromHueAndChroma(sourceColorHct.hue, Math.max(sourceColorHct.chroma - 32.0, sourceColorHct.chroma * 0.5)),
            tertiaryPalette      : TonalPalette.fromInt(DislikeAnalyzer.fixIfDisliked(new TemperatureCache(sourceColorHct).analogous(3, 6)[2]).toInt()),
            neutralPalette       : TonalPalette.fromHueAndChroma(sourceColorHct.hue, sourceColorHct.chroma / 8.0),
            neutralVariantPalette: TonalPalette.fromHueAndChroma(sourceColorHct.hue, sourceColorHct.chroma / 8.0 + 4.0),
            ...options,
            // variant is an invalid parameter, ignore it
            variant              : 0,
        })
        darkScheme = new DynamicScheme({
            isDark               : true,
            contrastLevel        : MaterialContrastLevel.Default,
            sourceColorArgb      : Hct.from(120, 75, 50).toInt(),
            primaryPalette       : TonalPalette.fromHueAndChroma(sourceColorHct.hue, sourceColorHct.chroma),
            secondaryPalette     : TonalPalette.fromHueAndChroma(sourceColorHct.hue, Math.max(sourceColorHct.chroma - 32.0, sourceColorHct.chroma * 0.5)),
            tertiaryPalette      : TonalPalette.fromInt(DislikeAnalyzer.fixIfDisliked(new TemperatureCache(sourceColorHct).analogous(3, 6)[2]).toInt()),
            neutralPalette       : TonalPalette.fromHueAndChroma(sourceColorHct.hue, sourceColorHct.chroma / 8.0),
            neutralVariantPalette: TonalPalette.fromHueAndChroma(sourceColorHct.hue, sourceColorHct.chroma / 8.0 + 4.0),
            ...options,
            // variant is an invalid parameter, ignore it
            variant              : 0,
        })
    }

    
    const colors: Record<'light' | 'dark', Record<keyof TMaterialColors, string>> = ({
        light: Object.entries(MaterialColors.ToRecord()).reduce((p, [k, v]) => ({...p, [k]: hexFromArgb(v.getArgb(lightScheme))}), {}) as Record<keyof TMaterialColors, string>,
        dark: Object.entries(MaterialColors.ToRecord()).reduce((p, [k, v]) => ({...p, [k]: hexFromArgb(v.getArgb(darkScheme))}), {}) as Record<keyof TMaterialColors, string>,
    })

    const lightColorCssText = (prefix: `--${string}` = '--md-sys-color-') => Object.entries(colors.light).reduce((p, [k, v]) => p + `${prefix}${toKebabCase(k)}:${v};`, '')
    const darkColorCssText = (prefix: `--${string}` = '--md-sys-color-') => Object.entries(colors.dark).reduce((p, [k, v]) => p + `${prefix}${toKebabCase(k)}:${v};`, '')

    const tones = (levels: Array<number> = [...Array(101).keys()])=> {
        const p      = levels.map(level => ({level: level, tone: hexFromArgb(lightScheme.primaryPalette.tone(level))})).reduce((p, c) => ({...p, [`primary${c.level}`]: c.tone}), {})
        const s      = levels.map(level => ({level: level, tone: hexFromArgb(lightScheme.secondaryPalette.tone(level))})).reduce((p, c) => ({...p, [`secondary${c.level}`]: c.tone}), {})
        const t      = levels.map(level => ({level: level, tone: hexFromArgb(lightScheme.tertiaryPalette.tone(level))})).reduce((p, c) => ({...p, [`tertiary${c.level}`]: c.tone}), {})
        const n      = levels.map(level => ({level: level, tone: hexFromArgb(lightScheme.neutralPalette.tone(level))})).reduce((p, c) => ({...p, [`neutral${c.level}`]: c.tone}), {})
        const nv     = levels.map(level => ({level: level, tone: hexFromArgb(lightScheme.neutralVariantPalette.tone(level))})).reduce((p, c) => ({...p, [`neutralVariant${c.level}`]: c.tone}), {})
        const e      = levels.map(level => ({level: level, tone: hexFromArgb(lightScheme.errorPalette.tone(level))})).reduce((p, c) => ({...p, [`error${c.level}`]: c.tone}), {})
        return {
            primary: p as Record<`primary${NumberRange<0, 101>}`, string>,
            secondary: s as Record<`secondary${NumberRange<0, 101>}`, string>,
            tertiary: t as Record<`tertiary${NumberRange<0, 101>}`, string>,
            error: e as Record<`error${NumberRange<0, 101>}`, string>,
            neutral: n as Record<`neutral${NumberRange<0, 101>}`, string>,
            neutralVariant: nv as Record<`neutralVariant${NumberRange<0, 101>}`, string>,
        }
    }

    const toneCssText = (prefix: `--${string}` = '--md-sys-palette-', levels: Array<number> = [...Array(101).keys()]) => Object.values(tones(levels)).map(ts => Object.entries(ts).map(([k,v]) => `${prefix}${toKebabCase(k)}:${v};`).join('')).reduce((p, c) => p+c, '')

    return ({
        colors,
        lightColorCssText,
        darkColorCssText,
        tones,
        toneCssText,
    })
}
