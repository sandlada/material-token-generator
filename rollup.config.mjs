import terser from '@rollup/plugin-terser'
import typescript from '@rollup/plugin-typescript'

// rollup.config.mjs
export default {
    input: {
        'index': './src/index.ts',
        'create-tokens': './src/create-tokens.ts',
        'material-colors': './src/material/material-colors.ts',
        'material-contrast-level': './src/material/material-contrast-level.ts',
        'material-variant': './src/material/material-variant.ts',
        'to-kebab-case': './src/string-utils/to-kebab-case.ts',

    },
    format: 'es',
    output: {
        dir: 'build'
    },
    plugins: [
        typescript({ tsconfig: './tsconfig.json' }),
        terser()
    ],
    external: '@material/material-color-utilities'
}
