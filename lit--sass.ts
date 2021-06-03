import fs from 'fs';
import process = require('process');
import sass = require('sass');
import postcss from 'postcss';

import autoprefixer from 'autoprefixer';
import postcssPresetEnv from 'postcss-preset-env';
import { glob } from 'glob';

const defaultOpts = {
  srcDir: './src',
  outDir: './dist',
};

const getOptions = () => {
  const options = Object.assign({}, defaultOpts);
  if (process.env.argv) {
    const srcIndex = process.env.argv.indexOf('-s');
    const distIndex = process.env.argv.indexOf('-o');
    if (srcIndex > -1) {
      options.srcDir = process.env.argv[srcIndex + 1];
    }
    if (distIndex > -1) {
      options.outDir = process.env.argv[distIndex + 1];
    }
  }
  return options;
};
/////////////////////////////////////////////

function getFiles(): Promise<string[]> {
  const filterScss = (f) => f.endsWith('.component.scss');
  return new Promise((resolve, reject) =>
    glob('src/**/*.scss', {}, (err, matches) => {
      if (err) {
        reject(err);
      } else {
        resolve(matches.filter(filterScss) as string[]);
      }
    })
  );
}
//////////////////////////////////////////////////////////
/**
 *
 * @param {String} sassFile
 * @returns {Promise<String>}
 */
const sassToCss = (sassFile) => {
  const renderOptions = {
    file: sassFile,
    outputStyle: 'expanded',
  };
  let stringifiedCss = function (resolve, reject) {
    // @ts-ignore
    sass.render(renderOptions, (err, result) => {
      err ? reject(err) : resolve(result.css.toString());
    });
  };
  return new Promise(stringifiedCss);
};

const writeFile = (outFile, data) => {
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

const sassRender = async () => {
  const template =
    "import { css } from 'lit';\n\n export const style = css`{0}`;\n";
  const options = getOptions();
  const sassFiles = await getFiles();
  for (const file of sassFiles) {
    console.log(file);
    const cssString = await sassToCss(file);
    const processedCss = await postcss([
      autoprefixer({ grid: 'autoplace' }),
      postcssPresetEnv,
    ]).process(cssString);
    const newFileName = file.replace(
      /_([\w\d\s]+).component.scss/,
      '$1.css.ts'
    );
    const cssTemplate = template.replace('{0}', processedCss.css.trim());
    await writeFile(newFileName, cssTemplate);
  }
};

sassRender().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(-1);
});
