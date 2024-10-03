import {
    DynamicColor,
    DynamicScheme,
    Hct,
    SchemeContent,
    SchemeExpressive,
    SchemeFidelity,
    SchemeFruitSalad,
    SchemeMonochrome,
    SchemeNeutral,
    SchemeRainbow,
    SchemeTonalSpot,
    SchemeVibrant
} from '@material/material-color-utilities'
import {
    type TMaterialContrastLevel
} from '../color/material-contrast-level'
import { EMaterialVariant, type TMaterialVariant } from '../color/material-variant'
import { type TMaterialColors } from '../material-colors/material-colors'
import { MaterialDynamicTokens } from './material-dynamic-tokens'

export class MaterialTokens extends MaterialDynamicTokens {
    constructor(
        sourceColorHct: Hct,
        options?: Partial<{
            isDark: boolean,
            contrastLevel: TMaterialContrastLevel,
            variant: TMaterialVariant,
            prefix: string,
            excludedTokens: Array<keyof TMaterialColors>,
            customTokens: Record<keyof TMaterialColors, DynamicColor> | {}
        }>
    ) {
        super({
            ...options,
            sourceColorHct,
        })
    }

    protected override get scheme(): DynamicScheme {
        let schemeClass = null
        switch (this.variant ?? EMaterialVariant.Vibrant) {
            case EMaterialVariant.Monochrome:
                schemeClass = SchemeMonochrome
                break
            case EMaterialVariant.Neutral:
                schemeClass = SchemeNeutral
                break
            case EMaterialVariant.TonalSpot:
                schemeClass = SchemeTonalSpot
                break
            case EMaterialVariant.Vibrant:
                schemeClass = SchemeVibrant
                break
            case EMaterialVariant.Expressive:
                schemeClass = SchemeExpressive
                break
            case EMaterialVariant.Fidelity:
                schemeClass = SchemeFidelity
                break
            case EMaterialVariant.Content:
                schemeClass = SchemeContent
                break
            case EMaterialVariant.FruitSalad:
                schemeClass = SchemeFruitSalad
                break
            case EMaterialVariant.Rainbow:
                schemeClass = SchemeRainbow
                break
            default:
                throw new Error(`Unaccepted parameter value [options.variant] [${this.variant}]`)
        }

        return new schemeClass(this.sourceColorHct, this.isDark, this.contrastLevel)
    }

}
