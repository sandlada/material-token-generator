import {
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
import { MaterialDynamicPalettes } from './material-dynamic-palettes'

export class MaterialPalettes extends MaterialDynamicPalettes {
    constructor(
        sourceColorHct: Hct,
        options?: Partial<{
            isDark: boolean,
            contrastLevel: TMaterialContrastLevel,
            variant: TMaterialVariant | null,
            prefix: string,
            levels: Array<number>
        }>
    ) {
        super({
            ...options,
            sourceColorHct: sourceColorHct ?? Hct.from(10, 50, 90)
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
