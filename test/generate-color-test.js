/* eslint-disable node/no-unpublished-import */
import {MaterialDynamicColorGenerator} from '../build/src/index.js';

const colors = MaterialDynamicColorGenerator.ToStyleText(
  MaterialDynamicColorGenerator.GenerateBySourceColor('#12be40'),
  {toKebabcase: true}
);

console.log(colors);
