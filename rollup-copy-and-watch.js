const fs = require('fs');

export default function litScssToCss(fileIn, fileOut) {
  return {
    name: 'buildStart',
    async buildStart() {},
    async generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'src/index.html',
        source: fs.readFileSync(fileIn),
      });
    },
  };
}
