import {existsSync, writeFileSync} from 'fs';
import {ICssLocalizable} from './ICssLocalizable';

export abstract class ACssLocalStorage implements ICssLocalizable {
  public ToCssLocalFile(fileName: string, content: string) {
    const fullPath = `${fileName}.css`;
    const fullContent = `:host {${content}}`;

    // Check if file exists, and then prepare to write to file,
    if (existsSync(fullPath)) {
      console.warn(
        `File ${fullPath} already exists. Please try removing existing file.`
      );
      return;
    } else {
      console.log(`- Creating file ${fullPath}.`);
      writeFileSync(fullPath, fullContent, {
        encoding: 'utf-8',
      });
      console.log('- File created.');
    }
  }
}
