import { DislikeAnalyzer, DynamicScheme, Hct, hexFromArgb, sanitizeDegreesDouble, SchemeContent, SchemeExpressive, SchemeFidelity, SchemeFruitSalad, SchemeMonochrome, SchemeNeutral, SchemeRainbow, SchemeTonalSpot, SchemeVibrant, TemperatureCache, TonalPalette } from "@material/material-color-utilities"
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

const SchemeVibrantConfig = {
    hues: [
        0.0,
        41.0,
        61.0,
        101.0,
        131.0,
        181.0,
        251.0,
        301.0,
        360.0,
    ],
    secondaryRotations: [
        18.0,
        15.0,
        10.0,
        12.0,
        15.0,
        18.0,
        15.0,
        12.0,
        12.0,
    ],
    tertiaryRotations: [
        35.0,
        30.0,
        20.0,
        25.0,
        30.0,
        35.0,
        30.0,
        25.0,
        25.0,
    ]
}
const SchemeExpressiveConfig = {
    hues: [
        0.0,
        21.0,
        51.0,
        121.0,
        151.0,
        191.0,
        271.0,
        321.0,
        360.0,
    ],
    secondaryRotations: [
        45.0,
        95.0,
        45.0,
        20.0,
        45.0,
        90.0,
        45.0,
        45.0,
        45.0,
    ],
    tertiaryRotations: [
        120.0,
        120.0,
        20.0,
        45.0,
        20.0,
        15.0,
        20.0,
        120.0,
        120.0,
    ],
}

function GetVariantPalette(variant: TMaterialVariant) {
    switch(variant) {
        case MaterialVariant.Monochrome: return (sourceColorHct: Hct) => ({
            primaryPalette       : TonalPalette.fromHueAndChroma(sourceColorHct.hue, 0.0),
            secondaryPalette     : TonalPalette.fromHueAndChroma(sourceColorHct.hue, 0.0),
            tertiaryPalette      : TonalPalette.fromHueAndChroma(sourceColorHct.hue, 0.0),
            neutralPalette       : TonalPalette.fromHueAndChroma(sourceColorHct.hue, 0.0),
            neutralVariantPalette: TonalPalette.fromHueAndChroma(sourceColorHct.hue, 0.0),
        })
        case MaterialVariant.Neutral   : return (sourceColorHct: Hct) => ({
            primaryPalette       : TonalPalette.fromHueAndChroma(sourceColorHct.hue, 12.0),
            secondaryPalette     : TonalPalette.fromHueAndChroma(sourceColorHct.hue, 8.0),
            tertiaryPalette      : TonalPalette.fromHueAndChroma(sourceColorHct.hue, 16.0),
            neutralPalette       : TonalPalette.fromHueAndChroma(sourceColorHct.hue, 2.0),
            neutralVariantPalette: TonalPalette.fromHueAndChroma(sourceColorHct.hue, 2.0),
        })
        case MaterialVariant.TonalSpot : return (sourceColorHct: Hct) => ({
            primaryPalette       : TonalPalette.fromHueAndChroma(sourceColorHct.hue, 36.0),
            secondaryPalette     : TonalPalette.fromHueAndChroma(sourceColorHct.hue, 16.0),
            tertiaryPalette      : TonalPalette.fromHueAndChroma(sanitizeDegreesDouble(sourceColorHct.hue + 60.0), 24.0),
            neutralPalette       : TonalPalette.fromHueAndChroma(sourceColorHct.hue, 6.0),
            neutralVariantPalette: TonalPalette.fromHueAndChroma(sourceColorHct.hue, 8.0),
        })
        case MaterialVariant.Vibrant   : return (sourceColorHct: Hct) => ({
            primaryPalette       : TonalPalette.fromHueAndChroma(sourceColorHct.hue, 200.0),
            secondaryPalette     : TonalPalette.fromHueAndChroma(DynamicScheme.getRotatedHue(sourceColorHct, SchemeVibrantConfig.hues, SchemeVibrantConfig.secondaryRotations), 24.0),
            tertiaryPalette      : TonalPalette.fromHueAndChroma(DynamicScheme.getRotatedHue(sourceColorHct, SchemeVibrantConfig.hues, SchemeVibrantConfig.tertiaryRotations), 32.0),
            neutralPalette       : TonalPalette.fromHueAndChroma(sourceColorHct.hue, 10.0),
            neutralVariantPalette: TonalPalette.fromHueAndChroma(sourceColorHct.hue, 12.0),
        })
        case MaterialVariant.Expressive: return (sourceColorHct: Hct) => ({
            primaryPalette       : TonalPalette.fromHueAndChroma(sanitizeDegreesDouble(sourceColorHct.hue + 240.0), 40.0),
            secondaryPalette     : TonalPalette.fromHueAndChroma(DynamicScheme.getRotatedHue(sourceColorHct, SchemeExpressiveConfig.hues, SchemeExpressiveConfig.secondaryRotations), 24.0),
            tertiaryPalette      : TonalPalette.fromHueAndChroma(DynamicScheme.getRotatedHue(sourceColorHct, SchemeExpressiveConfig.hues, SchemeExpressiveConfig.tertiaryRotations), 32.0),
            neutralPalette       : TonalPalette.fromHueAndChroma(sourceColorHct.hue + 15, 8.0),
            neutralVariantPalette: TonalPalette.fromHueAndChroma(sourceColorHct.hue + 15, 12.0),
        })
        case MaterialVariant.Fidelity  : return (sourceColorHct: Hct) => ({
            primaryPalette       : TonalPalette.fromHueAndChroma(sourceColorHct.hue, sourceColorHct.chroma),
            secondaryPalette     : TonalPalette.fromHueAndChroma(sourceColorHct.hue, Math.max(sourceColorHct.chroma - 32.0, sourceColorHct.chroma * 0.5)),
            tertiaryPalette      : TonalPalette.fromInt(DislikeAnalyzer.fixIfDisliked(new TemperatureCache(sourceColorHct).complement).toInt()),
            neutralPalette       : TonalPalette.fromHueAndChroma(sourceColorHct.hue, sourceColorHct.chroma / 8.0),
            neutralVariantPalette: TonalPalette.fromHueAndChroma(sourceColorHct.hue, sourceColorHct.chroma / 8.0 + 4.0),
        })
        case MaterialVariant.Content   : return (sourceColorHct: Hct) => ({
            primaryPalette       : TonalPalette.fromHueAndChroma(sourceColorHct.hue, sourceColorHct.chroma),
            secondaryPalette     : TonalPalette.fromHueAndChroma(sourceColorHct.hue, Math.max(sourceColorHct.chroma - 32.0, sourceColorHct.chroma * 0.5)),
            tertiaryPalette      : TonalPalette.fromInt(DislikeAnalyzer.fixIfDisliked(new TemperatureCache(sourceColorHct).analogous(3, 6)[2]).toInt()),
            neutralPalette       : TonalPalette.fromHueAndChroma(sourceColorHct.hue, sourceColorHct.chroma / 8.0),
            neutralVariantPalette: TonalPalette.fromHueAndChroma(sourceColorHct.hue, sourceColorHct.chroma / 8.0 + 4.0),
        })
        case MaterialVariant.Rainbow   : return (sourceColorHct: Hct) => ({
            primaryPalette       : TonalPalette.fromHueAndChroma(sourceColorHct.hue, 48.0),
            secondaryPalette     : TonalPalette.fromHueAndChroma(sourceColorHct.hue, 16.0),
            tertiaryPalette      : TonalPalette.fromHueAndChroma(sanitizeDegreesDouble(sourceColorHct.hue + 60.0), 24.0),
            neutralPalette       : TonalPalette.fromHueAndChroma(sourceColorHct.hue, 0.0),
            neutralVariantPalette: TonalPalette.fromHueAndChroma(sourceColorHct.hue, 0.0),
        })
        case MaterialVariant.FruitSalad: return (sourceColorHct: Hct) => ({
            primaryPalette       : TonalPalette.fromHueAndChroma(sanitizeDegreesDouble(sourceColorHct.hue - 50.0), 48.0),
            secondaryPalette     : TonalPalette.fromHueAndChroma(sanitizeDegreesDouble(sourceColorHct.hue - 50.0), 36.0),
            tertiaryPalette      : TonalPalette.fromHueAndChroma(sourceColorHct.hue, 36.0),
            neutralPalette       : TonalPalette.fromHueAndChroma(sourceColorHct.hue, 10.0),
            neutralVariantPalette: TonalPalette.fromHueAndChroma(sourceColorHct.hue, 16.0),
        })
        default: throw new Error(`Non-Supported Variant Parameter: ${variant}.`)
    }
}

export function createTokens(sourceColorHct: Hct, contrastLevel: TMaterialContrastLevel = 0, variant: TMaterialVariant = 1, options?: Partial<TOption>) {
    let lightScheme
    let darkScheme
    if(typeof options === 'object' && Object.keys(options).length === 0) {
        lightScheme = GetVariantScheme(variant, sourceColorHct, false, contrastLevel)
        darkScheme  = GetVariantScheme(variant, sourceColorHct, true, contrastLevel)
    } else {
        const defaultPalettes = GetVariantPalette(variant)(sourceColorHct)
        lightScheme = new DynamicScheme({
            isDark               : false,
            contrastLevel        : MaterialContrastLevel.Default,
            sourceColorArgb      : Hct.from(120, 75, 50).toInt(),
            ...defaultPalettes,
            ...options,
            // variant is an invalid parameter, ignore it
            variant              : 0,
        })
        darkScheme = new DynamicScheme({
            isDark               : true,
            contrastLevel        : MaterialContrastLevel.Default,
            sourceColorArgb      : Hct.from(120, 75, 50).toInt(),
            ...defaultPalettes,
            ...options,
            // variant is an invalid parameter, ignore it
            variant              : 0,
        })
    }

    
    const colors: Record<'light' | 'dark', Record<keyof TMaterialColors, string>> = ({
        light: Object.entries(MaterialColors.ToRecord()).reduce((p, [k, v]) => ({...p, [k]: hexFromArgb(v.getArgb(lightScheme))}), {}) as Record<keyof TMaterialColors, string>,
        dark: Object.entries(MaterialColors.ToRecord()).reduce((p, [k, v]) => ({...p, [k]: hexFromArgb(v.getArgb(darkScheme))}), {}) as Record<keyof TMaterialColors, string>,
    })

    const lightCssText = (prefix: `--${string}` = '--md-sys-color-') => Object.entries(colors.light).reduce((p, [k, v]) => p + `${prefix}${toKebabCase(k)}:${v};`, '')
    const darkCssText = (prefix: `--${string}` = '--md-sys-color-') => Object.entries(colors.dark).reduce((p, [k, v]) => p + `${prefix}${toKebabCase(k)}:${v};`, '')

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
        lightCssText,
        darkCssText,
        tones,
        toneCssText,
    })
}
