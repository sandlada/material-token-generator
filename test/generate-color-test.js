/* eslint-disable node/no-unpublished-import */
import { argbFromHex } from '@material/material-color-utilities';
import {MaterialTokensGenerator} from 'src';

const colors = MaterialTokensGenerator.ToStyleText(
  MaterialDynamicColorGenerator.GenerateBySourceColor(argbFromHex('#1212ab'))
);

console.log(colors);
