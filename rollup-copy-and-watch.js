const fs = require('fs');

export default function litScssToCss(fileIn, fileOut) {
  return {
    name: 'litScssToCss',
    async buildStart() {
      this.lit - s(fileIn);
    },
    async generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'src/index.html',
        source: fs.readFileSync(fileIn),
      });
    },
  };
}
