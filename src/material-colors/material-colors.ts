import { DynamicColor, MaterialDynamicColors } from "@material/material-color-utilities"

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
export class MaterialColors implements Iterable<DynamicColor, DynamicColor | undefined, DynamicColor | undefined> {
    private static readonly primaryPaletteKeyColor = MaterialDynamicColors.primaryPaletteKeyColor
    private static readonly secondaryPaletteKeyColor = MaterialDynamicColors.secondaryPaletteKeyColor
    private static readonly tertiaryPaletteKeyColor = MaterialDynamicColors.tertiaryPaletteKeyColor
    private static readonly neutralPaletteKeyColor = MaterialDynamicColors.neutralPaletteKeyColor
    private static readonly neutralVariantPaletteKeyColor = MaterialDynamicColors.neutralVariantPaletteKeyColor
    private static readonly background = MaterialDynamicColors.background
    private static readonly onBackground = MaterialDynamicColors.onBackground
    private static readonly surface = MaterialDynamicColors.surface
    private static readonly surfaceDim = MaterialDynamicColors.surfaceDim
    private static readonly surfaceBright = MaterialDynamicColors.surfaceBright
    private static readonly surfaceContainerLowest = MaterialDynamicColors.surfaceContainerLowest
    private static readonly surfaceContainerLow = MaterialDynamicColors.surfaceContainerLow
    private static readonly surfaceContainer = MaterialDynamicColors.surfaceContainer
    private static readonly surfaceContainerHigh = MaterialDynamicColors.surfaceContainerHigh
    private static readonly surfaceContainerHighest = MaterialDynamicColors.surfaceContainerHighest
    private static readonly onSurface = MaterialDynamicColors.onSurface
    private static readonly surfaceVariant = MaterialDynamicColors.surfaceVariant
    private static readonly onSurfaceVariant = MaterialDynamicColors.onSurfaceVariant
    private static readonly inverseSurface = MaterialDynamicColors.inverseSurface
    private static readonly inverseOnSurface = MaterialDynamicColors.inverseOnSurface
    private static readonly outline = MaterialDynamicColors.outline
    private static readonly outlineVariant = MaterialDynamicColors.outlineVariant
    private static readonly shadow = MaterialDynamicColors.shadow
    private static readonly scrim = MaterialDynamicColors.scrim
    private static readonly surfaceTint = MaterialDynamicColors.surfaceTint
    private static readonly primary = MaterialDynamicColors.primary
    private static readonly onPrimary = MaterialDynamicColors.onPrimary
    private static readonly primaryContainer = MaterialDynamicColors.primaryContainer
    private static readonly onPrimaryContainer = MaterialDynamicColors.onPrimaryContainer
    private static readonly inversePrimary = MaterialDynamicColors.inversePrimary
    private static readonly secondary = MaterialDynamicColors.secondary
    private static readonly onSecondary = MaterialDynamicColors.onSecondary
    private static readonly secondaryContainer = MaterialDynamicColors.secondaryContainer
    private static readonly onSecondaryContainer = MaterialDynamicColors.onSecondaryContainer
    private static readonly tertiary = MaterialDynamicColors.tertiary
    private static readonly onTertiary = MaterialDynamicColors.onTertiary
    private static readonly tertiaryContainer = MaterialDynamicColors.tertiaryContainer
    private static readonly onTertiaryContainer = MaterialDynamicColors.onTertiaryContainer
    private static readonly error = MaterialDynamicColors.error
    private static readonly onError = MaterialDynamicColors.onError
    private static readonly errorContainer = MaterialDynamicColors.errorContainer
    private static readonly onErrorContainer = MaterialDynamicColors.onErrorContainer
    private static readonly primaryFixed = MaterialDynamicColors.primaryFixed
    private static readonly primaryFixedDim = MaterialDynamicColors.primaryFixedDim
    private static readonly onPrimaryFixed = MaterialDynamicColors.onPrimaryFixed
    private static readonly onPrimaryFixedVariant = MaterialDynamicColors.onPrimaryFixedVariant
    private static readonly secondaryFixed = MaterialDynamicColors.secondaryFixed
    private static readonly secondaryFixedDim = MaterialDynamicColors.secondaryFixedDim
    private static readonly onSecondaryFixed = MaterialDynamicColors.onSecondaryFixed
    private static readonly onSecondaryFixedVariant = MaterialDynamicColors.onSecondaryFixedVariant
    private static readonly tertiaryFixed = MaterialDynamicColors.tertiaryFixed
    private static readonly tertiaryFixedDim = MaterialDynamicColors.tertiaryFixedDim
    private static readonly onTertiaryFixed = MaterialDynamicColors.onTertiaryFixed
    private static readonly onTertiaryFixedVariant = MaterialDynamicColors.onTertiaryFixedVariant

    public static get values(): TMaterialColors {
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

    private static get array() {
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
        ]
    }

    private static get iterator(): () => Iterator<DynamicColor, DynamicColor | undefined, DynamicColor | undefined> {
        return () => {
            let index = 0
            return ({
                next: () => {
                    if (index >= Object.keys(MaterialColors.values).length) {
                        return ({
                            value: undefined,
                            done: true,
                        })
                    }
                    return ({
                        value: MaterialColors.array[index++],
                        done: false
                    })
                },
                return: (value?: DynamicColor) => {
                    index = 0
                    return ({
                        value: undefined,
                        done: true
                    })
                }
            })
        }
    }

    public [Symbol.iterator]() {
        return MaterialColors.iterator()
    }

    public static [Symbol.iterator]() {
        return MaterialColors.iterator()
    }

    public static get json() {
        return JSON.stringify(MaterialColors.values)
    }
}
