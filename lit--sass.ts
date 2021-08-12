import fs = require('fs');
import sass = require('sass');
import postcss = require('postcss');

import autoprefixer = require('autoprefixer');
import postcssPresetEnv = require('postcss-preset-env');
import postcssNesting = require('postcss-nesting');
/////////////////////////////////////////////

//////////////////////////////////////////////////////////
/**
 *
 * @param {String} sassFile
 * @returns {Promise<String>}
 */
export const sassToCss = (sassFile) => {
  const renderOptions = {
    file: sassFile,
    outputStyle: 'expanded',
    includePaths: ['src', 'src/styles'],
  };
  let stringifiedCss = function (resolve, reject) {
    // @ts-ignore
    sass.render(renderOptions, (err, result) => {
      err ? reject(err) : resolve(result.css.toString());
    });
  };
  return new Promise(stringifiedCss);
};

export const writeFile = (outFile, data) => {
  // eslint-disable-next-line no-console
  console.log(`Creating file ${outFile}...`);
  return new Promise((resolve, reject) => {
    fs.writeFile(outFile, data, { encoding: 'utf-8' }, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(true);
      }
    });
  });
};

export const sassRender = async (file: string) => {
  if (/([\w\d\s-]+).component.scss/.test(file)) {
    const template =
      "import { css } from 'lit';\n\n export const style = css`{0}`;\n";
    // const sassFiles = await getFiles();
    //for (const file of sassFiles) {
    const cssString = (await sassToCss(file)) as string;
    const processedCss = await postcss([
      autoprefixer({ grid: 'autoplace' }),
      postcssPresetEnv,
    ]).process(cssString);
    const newFileName = file.replace(
      /([\w\d\s-]+).component.scss/,
      '$1.css.ts'
    );
    const cssTemplate = template.replace('{0}', processedCss.css.trim());
    await writeFile(newFileName, cssTemplate);
  } else {
    throw new Error('File does not match syntax _FILENAME.component.scss ');
  }

  // }
};
