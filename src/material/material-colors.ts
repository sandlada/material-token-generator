import { type DynamicColor, MaterialDynamicColors } from "@material/material-color-utilities"

export type TMaterialColors = {
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
export abstract class MaterialColors {

    public static ToRecord() {
        return ({
            primaryPaletteKeyColor       : MaterialDynamicColors.primaryPaletteKeyColor,
            secondaryPaletteKeyColor     : MaterialDynamicColors.secondaryPaletteKeyColor,
            tertiaryPaletteKeyColor      : MaterialDynamicColors.tertiaryPaletteKeyColor,
            neutralPaletteKeyColor       : MaterialDynamicColors.neutralPaletteKeyColor,
            neutralVariantPaletteKeyColor: MaterialDynamicColors.neutralVariantPaletteKeyColor,
            background                   : MaterialDynamicColors.background,
            onBackground                 : MaterialDynamicColors.onBackground,
            surface                      : MaterialDynamicColors.surface,
            surfaceDim                   : MaterialDynamicColors.surfaceDim,
            surfaceBright                : MaterialDynamicColors.surfaceBright,
            surfaceContainerLowest       : MaterialDynamicColors.surfaceContainerLowest,
            surfaceContainerLow          : MaterialDynamicColors.surfaceContainerLow,
            surfaceContainer             : MaterialDynamicColors.surfaceContainer,
            surfaceContainerHigh         : MaterialDynamicColors.surfaceContainerHigh,
            surfaceContainerHighest      : MaterialDynamicColors.surfaceContainerHighest,
            onSurface                    : MaterialDynamicColors.onSurface,
            surfaceVariant               : MaterialDynamicColors.surfaceVariant,
            onSurfaceVariant             : MaterialDynamicColors.onSurfaceVariant,
            inverseSurface               : MaterialDynamicColors.inverseSurface,
            inverseOnSurface             : MaterialDynamicColors.inverseOnSurface,
            outline                      : MaterialDynamicColors.outline,
            outlineVariant               : MaterialDynamicColors.outlineVariant,
            shadow                       : MaterialDynamicColors.shadow,
            scrim                        : MaterialDynamicColors.scrim,
            surfaceTint                  : MaterialDynamicColors.surfaceTint,
            primary                      : MaterialDynamicColors.primary,
            onPrimary                    : MaterialDynamicColors.onPrimary,
            primaryContainer             : MaterialDynamicColors.primaryContainer,
            onPrimaryContainer           : MaterialDynamicColors.onPrimaryContainer,
            inversePrimary               : MaterialDynamicColors.inversePrimary,
            secondary                    : MaterialDynamicColors.secondary,
            onSecondary                  : MaterialDynamicColors.onSecondary,
            secondaryContainer           : MaterialDynamicColors.secondaryContainer,
            onSecondaryContainer         : MaterialDynamicColors.onSecondaryContainer,
            tertiary                     : MaterialDynamicColors.tertiary,
            onTertiary                   : MaterialDynamicColors.onTertiary,
            tertiaryContainer            : MaterialDynamicColors.tertiaryContainer,
            onTertiaryContainer          : MaterialDynamicColors.onTertiaryContainer,
            error                        : MaterialDynamicColors.error,
            onError                      : MaterialDynamicColors.onError,
            errorContainer               : MaterialDynamicColors.errorContainer,
            onErrorContainer             : MaterialDynamicColors.onErrorContainer,
            primaryFixed                 : MaterialDynamicColors.primaryFixed,
            primaryFixedDim              : MaterialDynamicColors.primaryFixedDim,
            onPrimaryFixed               : MaterialDynamicColors.onPrimaryFixed,
            onPrimaryFixedVariant        : MaterialDynamicColors.onPrimaryFixedVariant,
            secondaryFixed               : MaterialDynamicColors.secondaryFixed,
            secondaryFixedDim            : MaterialDynamicColors.secondaryFixedDim,
            onSecondaryFixed             : MaterialDynamicColors.onSecondaryFixed,
            onSecondaryFixedVariant      : MaterialDynamicColors.onSecondaryFixedVariant,
            tertiaryFixed                : MaterialDynamicColors.tertiaryFixed,
            tertiaryFixedDim             : MaterialDynamicColors.tertiaryFixedDim,
            onTertiaryFixed              : MaterialDynamicColors.onTertiaryFixed,
            onTertiaryFixedVariant       : MaterialDynamicColors.onTertiaryFixedVariant,
        }) as const
    }

    public static ToArray() {
        return [
            MaterialColors.primaryPaletteKeyColor,
            MaterialColors.secondaryPaletteKeyColor,
            MaterialColors.tertiaryPaletteKeyColor,
            MaterialColors.neutralPaletteKeyColor,
            MaterialColors.neutralVariantPaletteKeyColor,
            MaterialColors.background,
            MaterialColors.onBackground,
            MaterialColors.surface,
            MaterialColors.surfaceDim,
            MaterialColors.surfaceBright,
            MaterialColors.surfaceContainerLowest,
            MaterialColors.surfaceContainerLow,
            MaterialColors.surfaceContainer,
            MaterialColors.surfaceContainerHigh,
            MaterialColors.surfaceContainerHighest,
            MaterialColors.onSurface,
            MaterialColors.surfaceVariant,
            MaterialColors.onSurfaceVariant,
            MaterialColors.inverseSurface,
            MaterialColors.inverseOnSurface,
            MaterialColors.outline,
            MaterialColors.outlineVariant,
            MaterialColors.shadow,
            MaterialColors.scrim,
            MaterialColors.surfaceTint,
            MaterialColors.primary,
            MaterialColors.onPrimary,
            MaterialColors.primaryContainer,
            MaterialColors.onPrimaryContainer,
            MaterialColors.inversePrimary,
            MaterialColors.secondary,
            MaterialColors.onSecondary,
            MaterialColors.secondaryContainer,
            MaterialColors.onSecondaryContainer,
            MaterialColors.tertiary,
            MaterialColors.onTertiary,
            MaterialColors.tertiaryContainer,
            MaterialColors.onTertiaryContainer,
            MaterialColors.error,
            MaterialColors.onError,
            MaterialColors.errorContainer,
            MaterialColors.onErrorContainer,
            MaterialColors.primaryFixed,
            MaterialColors.primaryFixedDim,
            MaterialColors.onPrimaryFixed,
            MaterialColors.onPrimaryFixedVariant,
            MaterialColors.secondaryFixed,
            MaterialColors.secondaryFixedDim,
            MaterialColors.onSecondaryFixed,
            MaterialColors.onSecondaryFixedVariant,
            MaterialColors.tertiaryFixed,
            MaterialColors.tertiaryFixedDim,
            MaterialColors.onTertiaryFixed,
            MaterialColors.onTertiaryFixedVariant,
        ] as const
    }

    public static readonly primaryPaletteKeyColor        = MaterialDynamicColors.primaryPaletteKeyColor
    public static readonly secondaryPaletteKeyColor      = MaterialDynamicColors.secondaryPaletteKeyColor
    public static readonly tertiaryPaletteKeyColor       = MaterialDynamicColors.tertiaryPaletteKeyColor
    public static readonly neutralPaletteKeyColor        = MaterialDynamicColors.neutralPaletteKeyColor
    public static readonly neutralVariantPaletteKeyColor = MaterialDynamicColors.neutralVariantPaletteKeyColor
    public static readonly background                    = MaterialDynamicColors.background
    public static readonly onBackground                  = MaterialDynamicColors.onBackground
    public static readonly surface                       = MaterialDynamicColors.surface
    public static readonly surfaceDim                    = MaterialDynamicColors.surfaceDim
    public static readonly surfaceBright                 = MaterialDynamicColors.surfaceBright
    public static readonly surfaceContainerLowest        = MaterialDynamicColors.surfaceContainerLowest
    public static readonly surfaceContainerLow           = MaterialDynamicColors.surfaceContainerLow
    public static readonly surfaceContainer              = MaterialDynamicColors.surfaceContainer
    public static readonly surfaceContainerHigh          = MaterialDynamicColors.surfaceContainerHigh
    public static readonly surfaceContainerHighest       = MaterialDynamicColors.surfaceContainerHighest
    public static readonly onSurface                     = MaterialDynamicColors.onSurface
    public static readonly surfaceVariant                = MaterialDynamicColors.surfaceVariant
    public static readonly onSurfaceVariant              = MaterialDynamicColors.onSurfaceVariant
    public static readonly inverseSurface                = MaterialDynamicColors.inverseSurface
    public static readonly inverseOnSurface              = MaterialDynamicColors.inverseOnSurface
    public static readonly outline                       = MaterialDynamicColors.outline
    public static readonly outlineVariant                = MaterialDynamicColors.outlineVariant
    public static readonly shadow                        = MaterialDynamicColors.shadow
    public static readonly scrim                         = MaterialDynamicColors.scrim
    public static readonly surfaceTint                   = MaterialDynamicColors.surfaceTint
    public static readonly primary                       = MaterialDynamicColors.primary
    public static readonly onPrimary                     = MaterialDynamicColors.onPrimary
    public static readonly primaryContainer              = MaterialDynamicColors.primaryContainer
    public static readonly onPrimaryContainer            = MaterialDynamicColors.onPrimaryContainer
    public static readonly inversePrimary                = MaterialDynamicColors.inversePrimary
    public static readonly secondary                     = MaterialDynamicColors.secondary
    public static readonly onSecondary                   = MaterialDynamicColors.onSecondary
    public static readonly secondaryContainer            = MaterialDynamicColors.secondaryContainer
    public static readonly onSecondaryContainer          = MaterialDynamicColors.onSecondaryContainer
    public static readonly tertiary                      = MaterialDynamicColors.tertiary
    public static readonly onTertiary                    = MaterialDynamicColors.onTertiary
    public static readonly tertiaryContainer             = MaterialDynamicColors.tertiaryContainer
    public static readonly onTertiaryContainer           = MaterialDynamicColors.onTertiaryContainer
    public static readonly error                         = MaterialDynamicColors.error
    public static readonly onError                       = MaterialDynamicColors.onError
    public static readonly errorContainer                = MaterialDynamicColors.errorContainer
    public static readonly onErrorContainer              = MaterialDynamicColors.onErrorContainer
    public static readonly primaryFixed                  = MaterialDynamicColors.primaryFixed
    public static readonly primaryFixedDim               = MaterialDynamicColors.primaryFixedDim
    public static readonly onPrimaryFixed                = MaterialDynamicColors.onPrimaryFixed
    public static readonly onPrimaryFixedVariant         = MaterialDynamicColors.onPrimaryFixedVariant
    public static readonly secondaryFixed                = MaterialDynamicColors.secondaryFixed
    public static readonly secondaryFixedDim             = MaterialDynamicColors.secondaryFixedDim
    public static readonly onSecondaryFixed              = MaterialDynamicColors.onSecondaryFixed
    public static readonly onSecondaryFixedVariant       = MaterialDynamicColors.onSecondaryFixedVariant
    public static readonly tertiaryFixed                 = MaterialDynamicColors.tertiaryFixed
    public static readonly tertiaryFixedDim              = MaterialDynamicColors.tertiaryFixedDim
    public static readonly onTertiaryFixed               = MaterialDynamicColors.onTertiaryFixed
    public static readonly onTertiaryFixedVariant        = MaterialDynamicColors.onTertiaryFixedVariant
}
