import { nodeResolve } from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'
import typescript from '@rollup/plugin-typescript'

// rollup.config.mjs
export default {
  input: './src/index.ts',
  output: [
    {
      file: './build/index.js',
      format: 'esm',
    },
  ],
  plugins: [
    nodeResolve({
      resolveOnly: ["@glare-labs/jtc-lib"]
    }), 
    typescript({tsconfig: './tsconfig.json'}), 
    terser()
  ],
};
