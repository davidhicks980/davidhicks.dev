export class ColorConverter {
  constructor() {}
  private _result = [] as any;
  get result() {
    return this._result;
  }
  hexToHSL(hex: string, shift = 0) {
    if (this.result.length > 0) {
      hex = this.result;
    }
    // Convert hex to RGB first
    let r = 0,
      g = 0,
      b = 0;
    if (hex.length === 4) {
      r = '0x' + hex[1] + hex[1];
      g = '0x' + hex[2] + hex[2];
      b = '0x' + hex[3] + hex[3];
    } else if (hex.length === 7) {
      r = '0x' + hex[1] + hex[2];
      g = '0x' + hex[3] + hex[4];
      b = '0x' + hex[5] + hex[6];
    }
    // Then to HSL
    r /= 255;
    g /= 255;
    b /= 255;
    let cmin = Math.min(r, g, b),
      cmax = Math.max(r, g, b),
      delta = cmax - cmin,
      h = 0,
      s = 0,
      l = 0;

    if (delta == 0) h = 0;
    else if (cmax == r) h = ((g - b) / delta) % 6;
    else if (cmax == g) h = (b - r) / delta + 2;
    else h = (r - g) / delta + 4;

    h = Math.round(h * 60);

    if (h < 0) h += 360;

    l = (cmax + cmin) / 2;
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);
    let hue = (h + shift) % 360;
    this._result = [hue, s, l];
    return this;
  }
  hslToHex(h = 0, s = 0, l = 0) {
    if (this._result.length > 0) {
      h = this._result[0];
      s = this._result[1];
      l = this._result[2];
    }
    l /= 100;
    const a = (s * Math.min(l, 1 - l)) / 100;
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color)
        .toString(16)
        .padStart(2, '0'); // convert to Hex and prefix "0" if needed
    };
    this._result = `#${f(0)}${f(8)}${f(4)}`;
    return this;
  }
}
