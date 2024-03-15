import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

// rollup.config.mjs
export default {
  input: './src/index.ts',
  output: [
    {
      file: './build/index.cjs.js',
      format: 'cjs',
    },
    {
      file: './build/index.esm.js',
      format: 'es',
    },
  ],
  plugins: [nodeResolve(), typescript({ tsconfig: './tsconfig.json' })],
};
