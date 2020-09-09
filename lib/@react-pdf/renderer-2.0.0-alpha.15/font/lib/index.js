'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var isUrl = _interopDefault(require('is-url'));
var fetch = _interopDefault(require('cross-fetch'));
var fontkit = _interopDefault(require('@react-pdf/fontkit'));

/* eslint-disable max-classes-per-file */

const fetchFont = async (src, options) => {
  const response = await fetch(src, options);
  const buffer = await (response.buffer ? response.buffer() : response.arrayBuffer());
  return buffer.constructor.name === 'Buffer' ? buffer : Buffer.from(buffer);
};

const isDataUrl = dataUrl => {
  const header = dataUrl.split(',')[0];
  const hasDataPrefix = header.substring(0, 5) === 'data:';
  const hasBase64Prefix = header.split(';')[1] === 'base64';
  return hasDataPrefix && hasBase64Prefix;
};

class FontSource {
  constructor(src, fontFamily, fontStyle, fontWeight, options) {
    this.src = src;
    this.fontFamily = fontFamily;
    this.fontStyle = fontStyle || 'normal';
    this.fontWeight = 400;
    this.data = null;
    this.loading = false;
    this.options = options;
  }

  async load() {
    this.loading = true;

    if (isDataUrl(this.src)) {
      this.data = fontkit.create(Buffer.from(this.src.split(',')[1], 'base64'));
    } else if ( isUrl(this.src)) {
      const {
        headers,
        body,
        method = 'GET'
      } = this.options;
      const data = await fetchFont(this.src, {
        method,
        body,
        headers
      });
      this.data = fontkit.create(data);
      this.loading = false;
    } else {
      this.data = await new Promise((resolve, reject) => fontkit.open(this.src, (err, data) => {
        this.loading = false;
        return err ? reject(err) : resolve(data);
      }));
    }
  }

}

class Font {
  static create(family) {
    return new Font(family);
  }

  constructor(family) {
    this.family = family;
    this.sources = [];
  }

  register({
    src,
    fontWeight,
    fontStyle,
    ...options
  }) {
    this.sources.push(new FontSource(src, this.fontFamily, fontStyle, fontWeight, options));
  }

  resolve(descriptor) {
    const {
      fontWeight = 400,
      fontStyle = 'normal'
    } = descriptor;
    const styleSources = this.sources.filter(s => s.fontStyle === fontStyle); // Weight resolution. https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight#Fallback_weights

    const exactFit = styleSources.find(s => s.fontWeight === fontWeight);
    if (exactFit) return exactFit;
    let res;

    if (fontWeight >= 400 && fontWeight <= 500) {
      const leftOffset = styleSources.filter(s => s.fontWeight <= fontWeight);
      const rightOffset = styleSources.filter(s => s.fontWeight > 500);
      const fit = styleSources.filter(s => s.fontWeight >= fontWeight && s.fontWeight < 500);
      res = fit[0] || leftOffset[leftOffset.length - 1] || rightOffset[0];
    }

    const lt = styleSources.filter(s => s.fontWeight < fontWeight);
    const gt = styleSources.filter(s => s.fontWeight > fontWeight);

    if (fontWeight < 400) {
      res = lt[lt.length - 1] || gt[0];
    }

    if (fontWeight > 500) {
      res = gt[0] || lt[lt.length - 1];
    }

    if (!res) {
      throw new Error(`Could not resolve font for ${this.fontFamily}, fontWeight ${fontWeight}`);
    }

    return res;
  }

}

var standard = ['Courier', 'Courier-Bold', 'Courier-Oblique', 'Helvetica', 'Helvetica-Bold', 'Helvetica-Oblique', 'Times-Roman', 'Times-Bold', 'Times-Italic'];

function FontStore() {
  let fonts = {};
  let emojiSource = null;
  let hyphenationCallback = null;

  this.register = data => {
    const {
      family
    } = data;

    if (!fonts[family]) {
      fonts[family] = Font.create(family);
    } // Bulk loading


    if (data.fonts) {
      for (let i = 0; i < data.fonts.length; i += 1) {
        fonts[family].register({
          family,
          ...data.fonts[i]
        });
      }
    } else {
      fonts[family].register(data);
    }
  };

  this.registerEmojiSource = ({
    url,
    format = 'png'
  }) => {
    emojiSource = {
      url,
      format
    };
  };

  this.registerHyphenationCallback = callback => {
    hyphenationCallback = callback;
  };

  this.getFont = descriptor => {
    const {
      fontFamily
    } = descriptor;
    const isStandard = standard.includes(fontFamily);
    if (isStandard) return null;

    if (!fonts[fontFamily]) {
      throw new Error(`Font family not registered: ${fontFamily}. Please register it calling Font.register() method.`);
    }

    return fonts[fontFamily].resolve(descriptor);
  };

  this.load = async descriptor => {
    const {
      fontFamily
    } = descriptor;
    const isStandard = standard.includes(fontFamily);
    if (isStandard) return;
    const f = this.getFont(descriptor); // We cache the font to avoid fetching it many times

    if (!f.data && !f.loading) {
      await f.load();
    }
  };

  this.reset = () => {
    const keys = Object.keys(fonts);

    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      fonts[key].data = null;
    }
  };

  this.clear = () => {
    fonts = {};
  };

  this.getRegisteredFonts = () => fonts;

  this.getEmojiSource = () => emojiSource;

  this.getHyphenationCallback = () => hyphenationCallback;

  this.getRegisteredFontFamilies = () => Object.keys(fonts);
}

exports.default = FontStore;
//# sourceMappingURL=index.js.map
