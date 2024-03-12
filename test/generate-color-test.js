/* eslint-disable node/no-unpublished-import */
import {MaterialTokensGenerator} from '../build/index.esm.js';

const colors = MaterialTokensGenerator.ToStyleText(
  MaterialTokensGenerator.GenerateBySourceColor('rgba(111,12,133, 0.2)')
);

console.log(colors);
