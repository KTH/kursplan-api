'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var fs = _interopDefault(require('fs'));
var BlobStream = _interopDefault(require('blob-stream'));
var PDFDocument = require('@react-pdf/pdfkit');
var PDFDocument__default = _interopDefault(PDFDocument);
var isUrl = _interopDefault(require('is-url'));
var fontkit = _interopDefault(require('@react-pdf/fontkit'));
var fetch = _interopDefault(require('cross-fetch'));
var R = require('ramda');
var runWidth = _interopDefault(require('@react-pdf/textkit/run/advanceWidth'));
var lineWidth = _interopDefault(require('@react-pdf/textkit/attributedString/advanceWidth'));
var absPath = _interopDefault(require('abs-svg-path'));
var parsePath = _interopDefault(require('parse-svg-path'));
var arcToCurve = _interopDefault(require('svg-arc-to-cubic-bezier'));
var PDFRenderer = _interopDefault(require('@react-pdf/textkit/renderers/pdf'));
var layoutEngine = _interopDefault(require('@react-pdf/textkit/layout'));
var linebreaker = _interopDefault(require('@react-pdf/textkit/engines/linebreaker'));
var justification = _interopDefault(require('@react-pdf/textkit/engines/justification'));
var textDecoration = _interopDefault(require('@react-pdf/textkit/engines/textDecoration'));
var scriptItemizer = _interopDefault(require('@react-pdf/textkit/engines/scriptItemizer'));
var wordHyphenation = _interopDefault(require('@react-pdf/textkit/engines/wordHyphenation'));
var AttributedString = _interopDefault(require('@react-pdf/textkit/attributedString'));
var colorString = _interopDefault(require('color-string'));
var hlsToHex = _interopDefault(require('hsl-to-hex'));
var url = _interopDefault(require('url'));
var path = _interopDefault(require('path'));
var PNG = _interopDefault(require('@react-pdf/png-js'));
var emojiRegex = _interopDefault(require('emoji-regex'));
var matchMedia = _interopDefault(require('media-engine'));
var Yoga = _interopDefault(require('yoga-layout-prebuilt'));
var ReactFiberReconciler = _interopDefault(require('react-reconciler'));
var scheduler = require('scheduler');

const VIEW = 'VIEW';
const TEXT = 'TEXT';
const LINK = 'LINK';
const PAGE = 'PAGE';
const NOTE = 'NOTE';
const IMAGE = 'IMAGE';
const DOCUMENT = 'DOCUMENT';
const CANVAS = 'CANVAS';
const TEXT_INSTANCE = 'TEXT_INSTANCE';
const SVG = 'SVG';
const GROUP = 'G';
const PATH = 'PATH';
const RECT = 'RECT';
const LINE = 'LINE';
const CIRCLE = 'CIRCLE';
const ELLIPSE = 'ELLIPSE';
const POLYGON = 'POLYGON';
const POLYLINE = 'POLYLINE';
const DEFS = 'DEFS';
const TSPAN = 'TSPAN';
const CLIP_PATH = 'CLIP_PATH';
const STOP = 'STOP';
const LINEAR_GRADIENT = 'LINEAR_GRADIENT';
const RADIAL_GRADIENT = 'RADIAL_GRADIENT';
const DPI = 72; // 72pt per inch.
// https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight#Common_weight_name_mapping

const FONT_WEIGHTS = {
  thin: 100,
  hairline: 100,
  ultralight: 200,
  extralight: 200,
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  demibold: 600,
  bold: 700,
  ultrabold: 800,
  extrabold: 800,
  heavy: 900,
  black: 900
};
const PAGE_SIZES = {
  '4A0': [4767.87, 6740.79],
  '2A0': [3370.39, 4767.87],
  A0: [2383.94, 3370.39],
  A1: [1683.78, 2383.94],
  A2: [1190.55, 1683.78],
  A3: [841.89, 1190.55],
  A4: [595.28, 841.89],
  A5: [419.53, 595.28],
  A6: [297.64, 419.53],
  A7: [209.76, 297.64],
  A8: [147.4, 209.76],
  A9: [104.88, 147.4],
  A10: [73.7, 104.88],
  B0: [2834.65, 4008.19],
  B1: [2004.09, 2834.65],
  B2: [1417.32, 2004.09],
  B3: [1000.63, 1417.32],
  B4: [708.66, 1000.63],
  B5: [498.9, 708.66],
  B6: [354.33, 498.9],
  B7: [249.45, 354.33],
  B8: [175.75, 249.45],
  B9: [124.72, 175.75],
  B10: [87.87, 124.72],
  C0: [2599.37, 3676.54],
  C1: [1836.85, 2599.37],
  C2: [1298.27, 1836.85],
  C3: [918.43, 1298.27],
  C4: [649.13, 918.43],
  C5: [459.21, 649.13],
  C6: [323.15, 459.21],
  C7: [229.61, 323.15],
  C8: [161.57, 229.61],
  C9: [113.39, 161.57],
  C10: [79.37, 113.39],
  RA0: [2437.8, 3458.27],
  RA1: [1729.13, 2437.8],
  RA2: [1218.9, 1729.13],
  RA3: [864.57, 1218.9],
  RA4: [609.45, 864.57],
  SRA0: [2551.18, 3628.35],
  SRA1: [1814.17, 2551.18],
  SRA2: [1275.59, 1814.17],
  SRA3: [907.09, 1275.59],
  SRA4: [637.8, 907.09],
  EXECUTIVE: [521.86, 756.0],
  FOLIO: [612.0, 936.0],
  LEGAL: [612.0, 1008.0],
  LETTER: [612.0, 792.0],
  TABLOID: [792.0, 1224.0]
};
const PORTRAIT = 'portrait';
const LANDSCAPE = 'landscape';
const INHERITED_PROPERTIES = ['color', 'fontFamily', 'fontSize', 'fontStyle', 'fontWeight', 'letterSpacing', 'opacity', 'textDecoration', 'lineHeight', 'textAlign', 'visibility', 'wordSpacing'];
const SVG_INHERITED_PROPS = ['x', 'y', 'clipPath', 'clipRule', 'opacity', 'fill', 'fillOpacity', 'fillRule', 'stroke', 'strokeLinecap', 'strokeLinejoin', 'strokeOpacity', 'strokeWidth', 'textAnchor', ...INHERITED_PROPERTIES];
const RULER_WIDTH = 13;
const RULER_COLOR = 'white';
const RULER_FONT_SIZE = 6;
const DEFAULT_RULER_STEPS = 50;
const LINE_WIDTH = 0.5;
const LINE_COLOR = 'gray';
const GRID_COLOR = '#ababab';

const BOX_MODEL_REGEX = /\d+(px|in|mm|cm|pt|%|vw|vh|px)?/g;
const OBJECT_POSITION_REGEX = /\d+(px|in|mm|cm|pt|%|vw|vh|px)?/g;
const BORDER_SHORTHAND_REGEX = /(\d+(px|in|mm|cm|pt|vw|vh|px)?)\s(\S+)\s(\S+)/;
const TRANSFORM_ORIGIN_REGEX = /(-?\d+(px|in|mm|cm|pt|%|vw|vh|px)?)|top|right|bottom|left|center/g;
const matchBoxModel = R.match(BOX_MODEL_REGEX);
const matchObjectPosition = R.match(OBJECT_POSITION_REGEX);
const matchBorderShorthand = R.match(BORDER_SHORTHAND_REGEX);
const matchTransformOrigin = R.match(TRANSFORM_ORIGIN_REGEX);
const isNumber = R.is(Number);

const isFontWeightStyle = key => key.match(/^fontWeight/);

const isBorderStyle = (key, value) => key.match(/^border(Top|Right|Bottom|Left)(Color|Width|Style)/) && typeof value === 'string';

const isBoxModelStyle = (key, value) => key.match(/^(margin)|(padding)/) && typeof value === 'string';

const isObjectPositionStyle = (key, value) => key.match(/^objectPosition/) && typeof value === 'string';

const isTransformOriginStyle = (key, value) => key.match(/^transformOrigin/) && typeof value === 'string';

const isFlexGrow = key => key === 'flexGrow';

const isFlexShrink = key => key === 'flexShrink';

const isFlexBasis = key => key === 'flexBasis';

const processBorders = (key, value) => {
  const match = matchBorderShorthand(value);

  if (match) {
    if (key.match(/Color$/)) {
      return match[4] || value;
    } else if (key.match(/Style$/)) {
      return match[3] || value;
    } else if (key.match(/Width$/)) {
      return match[1] || value;
    } else {
      throw new Error(`StyleSheet: Invalid '${value}' for '${key}'`);
    }
  }

  return value;
};

const processBoxModel = (key, value) => {
  const match = matchBoxModel(value);

  if (match) {
    if (key.match(/Top$/)) {
      return match[0];
    } else if (key.match(/Right$/)) {
      return match[1] || match[0];
    } else if (key.match(/Bottom$/)) {
      return match[2] || match[0];
    } else if (key.match(/Left$/)) {
      return match[3] || match[1] || match[0];
    } else {
      throw new Error(`StyleSheet: Invalid '${value}' for '${key}'`);
    }
  }

  return value;
};

const processFontWeight = (key, value) => {
  if (!value) return FONT_WEIGHTS.normal;
  if (typeof value === 'number') return value;
  return FONT_WEIGHTS[value.toLowerCase()];
};
const processObjectPosition = (key, value) => {
  const match = matchObjectPosition(value);

  if (match) {
    if (key.match(/X$/)) {
      return match[0] || value;
    } else if (key.match(/Y$/)) {
      return match[1] || value;
    } else {
      throw new Error(`StyleSheet: Invalid '${value}' for '${key}'`);
    }
  }

  return value;
};

const transformOffsetKeywords = value => {
  switch (value) {
    case 'top':
    case 'left':
      return '0%';

    case 'right':
    case 'bottom':
      return '100%';

    case 'center':
      return '50%';

    default:
      return value;
  }
}; // Transforms shorthand transformOrigin values


const processTransformOrigin = (key, value) => {
  const match = matchTransformOrigin(value);

  if (match) {
    let result;

    if (key.match(/X$/)) {
      result = match[0] || value;
    } else if (key.match(/Y$/)) {
      result = match[1] || match[0] || value;
    } else {
      throw new Error(`StyleSheet: Invalid '${value}' for '${key}'`);
    }

    return transformOffsetKeywords(result);
  }

  return value;
};

const processFlexGrow = (key, value) => {
  if (isNumber(value)) return value;
  const matches = value.split(' ');
  return matches[0];
};

const processFlexShrink = (key, value) => {
  if (isNumber(value)) return value;
  const matches = value.split(' ');
  return matches[1];
};

const processFlexBasis = (key, value) => {
  if (isNumber(value)) return value;
  const matches = value.split(' ');
  return matches[2];
};

const keepSame = (key, value) => value;

const matchNumber = R.when(R.is(String), R.test(/^-?\d*\.?\d*$/));
const castFloat = R.when(matchNumber, v => parseFloat(v, 10));
/**
 * Transforms style key-value
 *
 * @param {String} key style key
 * @param {String} value style value
 * @returns {String | Number} transformed style values
 */

const transformStyle = R.compose(castFloat, R.cond([[isBorderStyle, processBorders], [isBoxModelStyle, processBoxModel], [isObjectPositionStyle, processObjectPosition], [isTransformOriginStyle, processTransformOrigin], [isFontWeightStyle, processFontWeight], [isFlexGrow, processFlexGrow], [isFlexShrink, processFlexShrink], [isFlexBasis, processFlexBasis], [R.T, keepSame]]));
/**
 * Transforms already expanded styles shortcuts into appropiate values
 * Ex. marginTopWidth: '2 solid red' -> marginTopWidth: 2
 *
 * @param {Object} styles expanded object
 * @returns {Object} transformed styles
 */

const transformStyles = R.mapObjIndexed(R.flip(transformStyle));

const fetchFont = async (src, options) => {
  const response = await fetch(src, options);
  const buffer = await (response.buffer ? response.buffer() : response.arrayBuffer());
  return buffer.constructor.name === 'Buffer' ? buffer : Buffer.from(buffer);
};

class FontSource {
  constructor(src, fontFamily, fontStyle, fontWeight, options) {
    this.src = src;
    this.fontFamily = fontFamily;
    this.fontStyle = fontStyle || 'normal';
    this.fontWeight = processFontWeight(fontWeight) || 400;
    this.data = null;
    this.loading = false;
    this.options = options;
  }

  async load() {
    this.loading = true;

    if (isUrl(this.src)) {
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
    } else {
      this.data = await new Promise((resolve, reject) => fontkit.open(this.src, (err, data) => err ? reject(err) : resolve(data)));
    }

    this.loading = false;
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

let emojiSource;
const registerEmojiSource = ({
  url,
  format = 'png'
}) => {
  emojiSource = {
    url,
    format
  };
};
const getEmojiSource = () => emojiSource;
var emoji = {
  registerEmojiSource,
  getEmojiSource
};

var standardFonts = ['Courier', 'Courier-Bold', 'Courier-Oblique', 'Helvetica', 'Helvetica-Bold', 'Helvetica-Oblique', 'Times-Roman', 'Times-Bold', 'Times-Italic'];

let hyphenationCallback;
const registerHyphenationCallback = callback => {
  hyphenationCallback = callback;
};
const getHyphenationCallback = () => hyphenationCallback;
var hyphenation = {
  registerHyphenationCallback,
  getHyphenationCallback
};

let fonts = {};

const register = data => {
  const {
    family
  } = data;

  if (!fonts[family]) {
    fonts[family] = Font.create(family);
  } // Bulk loading


  if (data.fonts) {
    for (let i = 0; i < data.fonts.length; i++) {
      fonts[family].register({
        family,
        ...data.fonts[i]
      });
    }
  } else {
    fonts[family].register(data);
  }
};

const getRegisteredFonts = () => fonts;

const getRegisteredFontFamilies = () => Object.keys(fonts);

const getFont = descriptor => {
  const {
    fontFamily
  } = descriptor;
  const isStandard = standardFonts.includes(fontFamily);
  if (isStandard) return null;

  if (!fonts[fontFamily]) {
    throw new Error(`Font family not registered: ${fontFamily}. Please register it calling Font.register() method.`);
  }

  return fonts[fontFamily].resolve(descriptor);
};

const load = async function (descriptor) {
  const {
    fontFamily
  } = descriptor;
  const isStandard = standardFonts.includes(fontFamily);
  if (isStandard) return;
  const font = getFont(descriptor); // We cache the font to avoid fetching it many times

  if (!font.data && !font.loading) {
    await font.load();
  }
};

const reset = function () {
  for (const font in fonts) {
    if (fonts.hasOwnProperty(font)) {
      fonts[font].data = null;
    }
  }
};

const clear = function () {
  fonts = {};
};

var Font$1 = {
  register,
  getRegisteredFonts,
  getRegisteredFontFamilies,
  getFont,
  load,
  clear,
  reset,
  ...emoji,
  ...hyphenation
};

const save = (ctx, node) => {
  ctx.save();
  return node;
};

var save$1 = R.curryN(2, save);

const PROTOCOL_REGEXP = /^([a-z]+\:(\/\/)?)/i;
const DEST_REGEXP = /^#.+/;
/**
 * Add protocol th URL if valid
 *
 * @param {String} value url
 * @returns {String} corrected url
 */

const getURL = value => {
  if (!value) return '';
  if (isSrcId(value)) return value; // don't modify it if it is an id

  if (typeof value === 'string' && !value.match(PROTOCOL_REGEXP)) {
    return `http://${value}`;
  }

  return value;
};
const isSrcId = src => src.match(DEST_REGEXP);

const DEST_REGEXP$1 = /^#.+/;
const isSrcId$1 = R.test(DEST_REGEXP$1);
const getSource = R.compose(R.either(R.path(['props', 'src']), R.path(['props', 'href'])));

const setLink = (ctx, node) => {
  const {
    top,
    left,
    width,
    height
  } = node.box;
  const src = getSource(node);
  const instanceMethod = isSrcId$1(src) ? 'goTo' : 'link';
  const value = isSrcId$1(src) ? src.slice(1) : getURL(src);

  if (value) {
    ctx[instanceMethod](left, top, width, height, value);
  }

  return node;
};

var setLink$1 = R.curryN(2, setLink);

const restore = (ctx, node) => {
  ctx.restore();
  return node;
};

var restore$1 = R.curryN(2, restore);

/**
 * Checks if node is svg
 *
 * @param {Object} node
 * @returns {Boolean} is node svg?
 */

const isSvg = R.propEq('type', SVG);

/**
 * Checks if node is text
 *
 * @param {Object} node
 * @returns {Boolean} is node text?
 */

const isText = R.propEq('type', TEXT);

/**
 * Checks if node is page
 *
 * @param {Object} node
 * @returns {Boolean} is node page?
 */

const isPage = R.propEq('type', PAGE);

/**
 * Checks if node has valid source prop
 *
 * @param {Object} node
 * @returns {Boolean} does node have source prop?
 */

const hasSource = R.either(R.hasPath(['props', 'src']), R.hasPath(['props', 'href']));
/**
 * Checks if node is link
 *
 * @param {Object} node
 * @returns {Boolean} is node link?
 */

const isLink = R.either(R.propEq('type', LINK), R.both(R.propEq('type', TEXT), hasSource));

/**
 * Checks if node is note
 *
 * @param {Object} node
 * @returns {Boolean} is node note?
 */

const isNote = R.propEq('type', NOTE);

/**
 * Checks if node is image
 *
 * @param {Object} node
 * @returns {Boolean} is node image?
 */

const isImage = R.propEq('type', IMAGE);

/**
 * Checks if node is canvas
 *
 * @param {Object} node
 * @returns {Boolean} is node canvas?
 */

const isCanvas = R.propEq('type', CANVAS);

// Bezier curve.

const KAPPA = 4.0 * ((Math.sqrt(2) - 1.0) / 3.0);

const clipNode = (ctx, node) => {
  const {
    top,
    left,
    width,
    height
  } = node.box;
  const {
    borderTopLeftRadius = 0,
    borderTopRightRadius = 0,
    borderBottomRightRadius = 0,
    borderBottomLeftRadius = 0
  } = node.style; // Border top

  const rtr = Math.min(borderTopRightRadius, 0.5 * width, 0.5 * height);
  const ctr = rtr * (1.0 - KAPPA);
  ctx.moveTo(left + rtr, top);
  ctx.lineTo(left + width - rtr, top);
  ctx.bezierCurveTo(left + width - ctr, top, left + width, top + ctr, left + width, top + rtr); // Border right

  const rbr = Math.min(borderBottomRightRadius, 0.5 * width, 0.5 * height);
  const cbr = rbr * (1.0 - KAPPA);
  ctx.lineTo(left + width, top + height - rbr);
  ctx.bezierCurveTo(left + width, top + height - cbr, left + width - cbr, top + height, left + width - rbr, top + height); // Border bottom

  const rbl = Math.min(borderBottomLeftRadius, 0.5 * width, 0.5 * height);
  const cbl = rbl * (1.0 - KAPPA);
  ctx.lineTo(left + rbl, top + height);
  ctx.bezierCurveTo(left + cbl, top + height, left, top + height - cbl, left, top + height - rbl); // Border left

  const rtl = Math.min(borderTopLeftRadius, 0.5 * width, 0.5 * height);
  const ctl = rtl * (1.0 - KAPPA);
  ctx.lineTo(left, top + rtl);
  ctx.bezierCurveTo(left, top + ctl, left + ctl, top, left + rtl, top);
  ctx.closePath();
  ctx.clip();
  return node;
};

var clipNode$1 = R.curryN(2, clipNode);

const renderPath = ctx => R.tap(node => {
  const d = R.path(['props', 'd'], node);
  if (d) ctx.path(node.props.d);
});

const KAPPA$1 = 4.0 * ((Math.sqrt(2) - 1.0) / 3.0);

const getProp = (d, p, v) => R.pathOr(d, ['props', p], v);

const renderRect = ctx => node => {
  const x = getProp(0, 'x', node);
  const y = getProp(0, 'y', node);
  const rx = getProp(0, 'rx', node);
  const ry = getProp(0, 'ry', node);
  const width = getProp(0, 'width', node);
  const height = getProp(0, 'height', node);
  if (!width || !height) return node;

  if (rx && ry) {
    const krx = rx * KAPPA$1;
    const kry = ry * KAPPA$1;
    ctx.moveTo(x + rx, y);
    ctx.lineTo(x - rx + width, y);
    ctx.bezierCurveTo(x - rx + width + krx, y, x + width, y + ry - kry, x + width, y + ry);
    ctx.lineTo(x + width, y + height - ry);
    ctx.bezierCurveTo(x + width, y + height - ry + kry, x - rx + width + krx, y + height, x - rx + width, y + height);
    ctx.lineTo(x + rx, y + height);
    ctx.bezierCurveTo(x + rx - krx, y + height, x, y + height - ry + kry, x, y + height - ry);
    ctx.lineTo(x, y + ry);
    ctx.bezierCurveTo(x, y + ry - kry, x + rx - krx, y, x + rx, y);
  } else {
    ctx.moveTo(x, y);
    ctx.lineTo(x + width, y);
    ctx.lineTo(x + width, y + height);
    ctx.lineTo(x, y + height);
  }

  ctx.closePath();
  return node;
};

const getProp$1 = (p, v) => R.path(['props', p], v);

const renderLine = ctx => node => {
  const x1 = getProp$1('x1', node);
  const y1 = getProp$1('y1', node);
  const x2 = getProp$1('x2', node);
  const y2 = getProp$1('y2', node);
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  return node;
};

const KAPPA$2 = 4.0 * ((Math.sqrt(2) - 1.0) / 3.0);

const getProp$2 = (p, v) => R.path(['props', p], v);

const drawEllipse = (ctx, cx, cy, rx, ry) => {
  const x = cx - rx;
  const y = cy - ry;
  const ox = rx * KAPPA$2;
  const oy = ry * KAPPA$2;
  const xe = x + rx * 2;
  const ye = y + ry * 2;
  const xm = x + rx;
  const ym = y + ry;
  ctx.moveTo(x, ym);
  ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
  ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
  ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
  ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
  ctx.closePath();
};

const renderEllipse = ctx => R.tap(node => {
  const cx = getProp$2('cx', node);
  const cy = getProp$2('cy', node);
  const rx = getProp$2('rx', node);
  const ry = getProp$2('ry', node);
  drawEllipse(ctx, cx, cy, rx, ry);
});

const getProp$3 = (p, v) => R.path(['props', p], v);

const renderCircle = ctx => R.tap(node => {
  const cx = getProp$3('cx', node);
  const cy = getProp$3('cy', node);
  const r = getProp$3('r', node);
  drawEllipse(ctx, cx, cy, r, r);
});

const renderRun = (ctx, run) => {
  const runAdvanceWidth = runWidth(run);
  const {
    font,
    fontSize,
    color,
    opacity
  } = run.attributes;
  ctx.fillColor(color);
  ctx.fillOpacity(opacity);

  if (font.sbix || font.COLR && font.CPAL) {
    ctx.save();
    ctx.translate(0, -run.ascent);

    for (let i = 0; i < run.glyphs.length; i++) {
      const position = run.positions[i];
      const glyph = run.glyphs[i];
      ctx.save();
      ctx.translate(position.xOffset, position.yOffset);
      glyph.render(ctx, fontSize);
      ctx.restore();
      ctx.translate(position.xAdvance, position.yAdvance);
    }

    ctx.restore();
  } else {
    ctx.font(typeof font.name === 'string' ? font.name : font, fontSize);

    try {
      ctx._addGlyphs(run.glyphs, run.positions, 0, 0);
    } catch (error) {
      console.log(error);
    }
  }

  ctx.translate(runAdvanceWidth, 0);
};

const renderSpan = (ctx, line, textAnchor) => {
  ctx.save();
  const x = R.pathOr(0, ['box', 'x'], line);
  const y = R.pathOr(0, ['box', 'y'], line);
  const width = lineWidth(line);

  switch (textAnchor) {
    case 'middle':
      ctx.translate(x - width / 2, y);
      break;

    case 'end':
      ctx.translate(x - width, y);
      break;

    default:
      ctx.translate(x, y);
      break;
  }

  for (const run of line.runs) {
    renderRun(ctx, run);
  }

  ctx.restore();
};

const renderSvgText = ctx => node => {
  for (const span of node.children) {
    renderSpan(ctx, span.lines[0], span.props.textAnchor);
  }

  return node;
};

const isOdd = x => x % 2 !== 0;

const lengthIsOdd = R.o(isOdd, R.prop('length'));
const parsePoints = R.compose(R.splitEvery(2), R.map(parseFloat), R.when(lengthIsOdd, R.slice(0, -1)), R.split(/\s+/), R.replace(/(\d)-(\d)/g, '$1 -$2'), R.replace(/,/g, ' '), R.trim);

const drawPolyline = ctx => points => {
  if (points.length > 0) {
    ctx.moveTo(points[0][0], points[0][1]);
    points.slice(1).forEach(p => ctx.lineTo(p[0], p[1]));
  }
};

const renderPolyline = ctx => R.tap(R.compose(drawPolyline(ctx), parsePoints, R.pathOr('', ['props', 'points'])));

const closePath = ctx => R.tap(() => ctx.closePath());

const renderPolygon = ctx => R.compose(closePath(ctx), renderPolyline(ctx));

function printWarning(format, ...args) {
  let argIndex = 0;
  const message = 'Warning: ' + format.replace(/%s/g, () => args[argIndex++]);

  if (typeof console !== 'undefined') {
    console.error(message);
  }

  try {
    throw new Error(message);
  } catch (x) {}
}

const __DEV__ = process.env.NODE_ENV !== 'production';

const warning = __DEV__ ? (condition, format, ...args) => {
  if (format === undefined) {
    throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
  }

  if (!condition) {
    printWarning(format, ...args);
  }
} : () => {};

const drawImage = ctx => node => {
  const {
    x,
    y
  } = node.props;
  const {
    width,
    height,
    opacity
  } = node.style;
  const paddingTop = node.box.paddingLeft || 0;
  const paddingLeft = node.box.paddingLeft || 0;

  if (node.image.data) {
    if (width !== 0 && height !== 0) {
      ctx.fillOpacity(opacity || 1).image(node.image.data, x + paddingLeft, y + paddingTop, {
        width,
        height
      });
    } else {
      warning(false, `Image with src '${node.props.href}' skipped due to invalid dimensions`);
    }
  }

  return node;
};

const renderImage = (ctx, node) => {
  R.compose(restore$1(ctx), drawImage(ctx), save$1(ctx))(node);
  return node;
};

var renderSvgImage = R.curryN(2, renderImage);

const getRotation = transform => {
  const match = /rotate\((-?\d+.?\d+)(.+)\)/g.exec(transform);

  if (match && match[1] && match[2]) {
    const value = match[1];
    return match[2] === 'rad' ? value * 180 / Math.PI : value;
  }

  return 0;
};

const getTranslateX = transform => {
  const matchX = /translateX\((-?\d+\.?d*)\)/g.exec(transform);
  const matchGeneric = /translate\((-?\d+\.?d*).*(,|\s)\s*(-?\d+\.?d*).*\)/g.exec(transform);
  if (matchX && matchX[1]) return matchX[1];
  if (matchGeneric && matchGeneric[1]) return matchGeneric[1];
  return 0;
};

const getTranslateY = transform => {
  const matchY = /translateY\((-?\d+\.?\d*)\)/g.exec(transform);
  const matchGeneric = /translate\((-?\d+\.?\d*).*(,|\s)\s*(-?\d+\.?\d*).*\)/g.exec(transform);
  if (matchY && matchY[1]) return matchY[1];
  if (matchGeneric && matchGeneric[3]) return matchGeneric[3];
  return 0;
};

const getScaleX = transform => {
  const matchX = /scaleX\((-?\d+\.?\d*)\)/g.exec(transform);
  const matchGeneric = /scale\((-?\d+\.?\d*).*,?\s*(-?\d+\.?\d*).*\)/g.exec(transform);
  if (matchX && matchX[1]) return matchX[1];
  if (matchGeneric && matchGeneric[1]) return matchGeneric[1];
  return 1;
};

const getScaleY = transform => {
  const matchY = /scaleY\((-?\d+\.?\d*)\)/g.exec(transform);
  const matchGeneric = /scale\((-?\d+\.?\d*).*,?\s*(-?\d+\.?\d*).*\)/g.exec(transform);
  if (matchY && matchY[1]) return matchY[1];
  if (matchGeneric && matchGeneric[2]) return matchGeneric[2];
  return 1;
};

const getMatrix = transform => {
  const match = /matrix\(([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+)\)/g.exec(transform);
  if (match) return match.slice(1, 7);
  return null;
};

const applySingleTransformation = (ctx, transform, origin) => {
  if (/rotate/g.test(transform)) {
    ctx.rotate(getRotation(transform), {
      origin
    });
  } else if (/scaleX/g.test(transform)) {
    ctx.scale(getScaleX(transform), 1, {
      origin
    });
  } else if (/scaleY/g.test(transform)) {
    ctx.scale(1, getScaleY(transform), {
      origin
    });
  } else if (/scale/g.test(transform)) {
    ctx.scale(getScaleX(transform), getScaleY(transform), {
      origin
    });
  } else if (/translateX/g.test(transform)) {
    ctx.translate(getTranslateX(transform), 1, {
      origin
    });
  } else if (/translateY/g.test(transform)) {
    ctx.translate(1, getTranslateY(transform), {
      origin
    });
  } else if (/translate/g.test(transform)) {
    ctx.translate(getTranslateX(transform), getTranslateY(transform), {
      origin
    });
  } else if (/matrix/g.test(transform)) {
    ctx.transform(...getMatrix(transform));
  }
};

const applyTransformations = (ctx, node) => {
  if (!node.origin) return node;
  let match;
  const re = /[a-zA-Z]+\([^)]+\)/g;
  const origin = [node.origin.left, node.origin.top];
  const transform = node.style && node.style.transform || node.props && node.props.transform || '';

  while ((match = re.exec(transform)) != null) {
    applySingleTransformation(ctx, match[0], origin);
  }

  return node;
};

var applyTransformations$1 = R.curryN(2, applyTransformations);

/**
 * Checks if node is path
 *
 * @param {Object} node
 * @returns {Boolean} is node path?
 */

const isPath = R.propEq('type', PATH);

/**
 * Checks if node is rect
 *
 * @param {Object} node
 * @returns {Boolean} is node rect?
 */

const isRect = R.propEq('type', RECT);

/**
 * Checks if node is line
 *
 * @param {Object} node
 * @returns {Boolean} is node line?
 */

const isLine = R.propEq('type', LINE);

/**
 * Checks if node is tspan
 *
 * @param {Object} node
 * @returns {Boolean} is node tspan?
 */

const isTspan = R.propEq('type', TSPAN);

/**
 * Checks if node is group
 *
 * @param {Object} node
 * @returns {Boolean} is node group?
 */

const isGroup = R.propEq('type', GROUP);

/**
 * Checks if node is circle
 *
 * @param {Object} node
 * @returns {Boolean} is node circle?
 */

const isCircle = R.propEq('type', CIRCLE);

/**
 * Checks if node is text intance
 *
 * @param {Object} node
 * @returns {Boolean} is node text intance?
 */

const isTextInstance = R.propEq('type', TEXT_INSTANCE);

const renderGroup = () => R.identity;

/**
 * Checks if node is ellipse
 *
 * @param {Object} node
 * @returns {Boolean} is node ellipse?
 */

const isEllipse = R.propEq('type', ELLIPSE);

/**
 * Checks if node is polygon
 *
 * @param {Object} node
 * @returns {Boolean} is node polygon?
 */

const isPolygon = R.propEq('type', POLYGON);

/**
 * Checks if node is polyline
 *
 * @param {Object} node
 * @returns {Boolean} is node polyline?
 */

const isPolyline = R.propEq('type', POLYLINE);

// Copied here because an import issue with 'svg-arc-to-cubic-bezier'

const normalizePath = path => {
  const result = [];
  let prev;
  let bezierX = 0;
  let bezierY = 0;
  let startX = 0;
  let startY = 0;
  let quadX = null;
  let quadY = null;
  let x = 0;
  let y = 0;

  for (let i = 0, len = path.length; i < len; i++) {
    let seg = path[i];
    const command = seg[0];

    switch (command) {
      case 'M':
        startX = seg[1];
        startY = seg[2];
        break;

      case 'A':
        const curves = arcToCurve({
          px: x,
          py: y,
          cx: seg[6],
          cy: seg[7],
          rx: seg[1],
          ry: seg[2],
          xAxisRotation: seg[3],
          largeArcFlag: seg[4],
          sweepFlag: seg[5]
        }); // null-curves

        if (!curves.length) continue;

        for (let j = 0, c; j < curves.length; j++) {
          c = curves[j];
          seg = ['C', c.x1, c.y1, c.x2, c.y2, c.x, c.y];
          if (j < curves.length - 1) result.push(seg);
        }

        break;

      case 'S':
        // default control point
        let cx = x;
        let cy = y;

        if (prev === 'C' || prev === 'S') {
          cx += cx - bezierX; // reflect the previous command's control

          cy += cy - bezierY; // point relative to the current point
        }

        seg = ['C', cx, cy, seg[1], seg[2], seg[3], seg[4]];
        break;

      case 'T':
        if (prev === 'Q' || prev === 'T') {
          quadX = x * 2 - quadX; // as with 'S' reflect previous control point

          quadY = y * 2 - quadY;
        } else {
          quadX = x;
          quadY = y;
        }

        seg = quadratic(x, y, quadX, quadY, seg[1], seg[2]);
        break;

      case 'Q':
        quadX = seg[1];
        quadY = seg[2];
        seg = quadratic(x, y, seg[1], seg[2], seg[3], seg[4]);
        break;

      case 'L':
        seg = line(x, y, seg[1], seg[2]);
        break;

      case 'H':
        seg = line(x, y, seg[1], y);
        break;

      case 'V':
        seg = line(x, y, x, seg[1]);
        break;

      case 'Z':
        seg = line(x, y, startX, startY);
        break;

      default:
        break;
    } // update state


    prev = command;
    x = seg[seg.length - 2];
    y = seg[seg.length - 1];

    if (seg.length > 4) {
      bezierX = seg[seg.length - 4];
      bezierY = seg[seg.length - 3];
    } else {
      bezierX = x;
      bezierY = y;
    }

    result.push(seg);
  }

  return result;
};

const line = (x1, y1, x2, y2) => {
  return ['C', x1, y1, x2, y2, x2, y2];
};

const quadratic = (x1, y1, cx, cy, x2, y2) => {
  return ['C', x1 / 3 + 2 / 3 * cx, y1 / 3 + 2 / 3 * cy, x2 / 3 + 2 / 3 * cx, y2 / 3 + 2 / 3 * cy, x2, y2];
};

const getPathBoundingBox = node => {
  const path = R.compose(normalizePath, absPath, parsePath, R.pathOr('', ['props', 'd']))(node);
  if (!path.length) return [0, 0, 0, 0];
  const bounds = [Infinity, Infinity, -Infinity, -Infinity];

  for (let i = 0, l = path.length; i < l; i++) {
    const points = path[i].slice(1);

    for (let j = 0; j < points.length; j += 2) {
      if (points[j + 0] < bounds[0]) bounds[0] = points[j + 0];
      if (points[j + 1] < bounds[1]) bounds[1] = points[j + 1];
      if (points[j + 0] > bounds[2]) bounds[2] = points[j + 0];
      if (points[j + 1] > bounds[3]) bounds[3] = points[j + 1];
    }
  }

  return bounds;
};

const getCircleBoundingBox = node => {
  const r = R.pathOr(0, ['props', 'r'], node);
  const cx = R.pathOr(0, ['props', 'cx'], node);
  const cy = R.pathOr(0, ['props', 'cy'], node);
  return [cx - r, cy - r, cx + r, cy + r];
};

const getEllipseBoundingBox = node => {
  const cx = R.pathOr(0, ['props', 'cx'], node);
  const cy = R.pathOr(0, ['props', 'cy'], node);
  const rx = R.pathOr(0, ['props', 'rx'], node);
  const ry = R.pathOr(0, ['props', 'ry'], node);
  return [cx - rx, cy - ry, cx + rx, cy + ry];
};

const getLineBoundingBox = node => {
  const x1 = R.pathOr(0, ['props', 'x1'], node);
  const y1 = R.pathOr(0, ['props', 'y1'], node);
  const x2 = R.pathOr(0, ['props', 'x2'], node);
  const y2 = R.pathOr(0, ['props', 'y2'], node);
  return [R.min(x1, x2), R.min(y1, y2), R.max(x1, x2), R.max(y1, y2)];
};

const getRectBoundingBox = node => {
  const x = R.pathOr(0, ['props', 'x'], node);
  const y = R.pathOr(0, ['props', 'y'], node);
  const width = R.pathOr(0, ['props', 'width'], node);
  const height = R.pathOr(0, ['props', 'height'], node);
  return [x, y, x + width, y + height];
};

const max = R.reduce(R.max, -Infinity);
const min = R.reduce(R.min, Infinity);

const getPolylineBoundingBox = node => {
  const points = R.compose(parsePoints, R.pathOr([], ['props', 'points']))(node);
  const xValues = R.pluck(0, points);
  const yValues = R.pluck(1, points);
  return [min(xValues), min(yValues), max(xValues), max(yValues)];
};

const getBoundingBox = R.cond([[isRect, getRectBoundingBox], [isLine, getLineBoundingBox], [isPath, getPathBoundingBox], [isCircle, getCircleBoundingBox], [isEllipse, getEllipseBoundingBox], [isPolygon, getPolylineBoundingBox], [isPolyline, getPolylineBoundingBox], [R.T, R.always([0, 0, 0, 0])]]);

const warnUnsupportedNode = R.tap(node => {
  console.warn(`SVG node of type ${node.type} is not currenty supported`);
});

const getProp$4 = (d, p, v) => R.pathOr(d, ['props', p], v);

const setStrokeWidth = ctx => node => {
  const lineWidth = getProp$4(0, 'strokeWidth', node);
  if (lineWidth) ctx.lineWidth(lineWidth);
  return node;
};

const setStrokeColor = ctx => node => {
  const strokeColor = getProp$4(null, 'stroke', node);
  if (strokeColor) ctx.strokeColor(strokeColor);
  return node;
};

const setOpacity = ctx => node => {
  const opacity = getProp$4(null, 'opacity', node);
  if (opacity) ctx.opacity(opacity);
  return node;
};

const setFillOpacity = ctx => node => {
  const fillOpacity = getProp$4(null, 'fillOpacity', node);
  if (fillOpacity) ctx.fillOpacity(fillOpacity);
  return node;
};

const setStrokeOpacity = ctx => node => {
  const strokeOpacity = getProp$4(null, 'strokeOpacity', node);
  if (strokeOpacity) ctx.strokeOpacity(strokeOpacity);
  return node;
};

const setLineJoin = ctx => node => {
  const lineJoin = getProp$4(null, 'strokeLinejoin', node);
  if (lineJoin) ctx.lineJoin(lineJoin);
  return node;
};

const setLineCap = ctx => node => {
  const lineCap = getProp$4(null, 'strokeLinecap', node);
  if (lineCap) ctx.lineCap(lineCap);
  return node;
};

const setLineDash = ctx => node => {
  const value = getProp$4(null, 'strokeDasharray', node);

  if (value) {
    const dashArray = R.compose(R.map(R.o(parseFloat, R.trim)), R.split(','))(value);
    ctx.dash(dashArray[0], {
      space: dashArray[1]
    });
  }

  return node;
};

const hasLinearGradientFill = R.pathEq(['props', 'fill', 'type'], LINEAR_GRADIENT);
const hasRadialGradientFill = R.pathEq(['props', 'fill', 'type'], RADIAL_GRADIENT); // Math simplified from https://github.com/devongovett/svgkit/blob/master/src/elements/SVGGradient.js#L104

const setLinearGradientFill = ctx => R.tap(node => {
  const bbox = getBoundingBox(node);
  const gradient = getProp$4(null, 'fill', node);
  const x1 = R.pathOr(0, ['props', 'x1'], gradient);
  const y1 = R.pathOr(0, ['props', 'y1'], gradient);
  const x2 = R.pathOr(1, ['props', 'x2'], gradient);
  const y2 = R.pathOr(0, ['props', 'y2'], gradient);
  const m0 = bbox[2] - bbox[0];
  const m3 = bbox[3] - bbox[1];
  const m4 = bbox[0];
  const m5 = bbox[1];
  const gx1 = m0 * x1 + m4;
  const gy1 = m3 * y1 + m5;
  const gx2 = m0 * x2 + m4;
  const gy2 = m3 * y2 + m5;
  const grad = ctx.linearGradient(gx1, gy1, gx2, gy2);
  gradient.children.forEach(stop => {
    grad.stop(stop.props.offset, stop.props.stopColor, stop.props.stopOpacity);
  });
  ctx.fill(grad);
}); // Math simplified from https://github.com/devongovett/svgkit/blob/master/src/elements/SVGGradient.js#L155


const setRadialGradientFill = ctx => R.tap(node => {
  const bbox = getBoundingBox(node);
  const gradient = getProp$4(null, 'fill', node);
  const cx = R.pathOr(0.5, ['props', 'cx'], gradient);
  const cy = R.pathOr(0.5, ['props', 'cy'], gradient);
  const fx = R.pathOr(cx, ['props', 'fx'], gradient);
  const fy = R.pathOr(cy, ['props', 'fy'], gradient);
  const r = R.pathOr(0.5, ['props', 'r'], gradient);
  const m0 = bbox[2] - bbox[0];
  const m3 = bbox[3] - bbox[1];
  const m4 = bbox[0];
  const m5 = bbox[1];
  const gr = r * m0;
  const gcx = m0 * cx + m4;
  const gcy = m3 * cy + m5;
  const gfx = m0 * fx + m4;
  const gfy = m3 * fy + m5;
  const grad = ctx.radialGradient(gfx, gfy, 0, gcx, gcy, gr);
  gradient.children.forEach(stop => {
    grad.stop(stop.props.offset, stop.props.stopColor, stop.props.stopOpacity);
  });
  ctx.fill(grad);
});

const setFillColor = ctx => R.tap(node => {
  const fillColor = getProp$4(null, 'fill', node);
  if (fillColor) ctx.fillColor(fillColor);
});

const setFill = ctx => R.cond([[hasLinearGradientFill, setLinearGradientFill(ctx)], [hasRadialGradientFill, setRadialGradientFill(ctx)], [R.T, setFillColor(ctx)]]);

const draw = ctx => node => {
  const props = R.propOr({}, 'props', node);

  if (props.fill && props.stroke) {
    ctx.fillAndStroke(props.fillRule);
  } else if (props.fill) {
    ctx.fill(props.fillRule);
  } else if (props.stroke) {
    ctx.stroke();
  } else {
    ctx.save();
    ctx.opacity(0);
    ctx.fill(null);
    ctx.restore();
  }

  return node;
};

const renderNode = ctx => R.cond([[isTspan, R.identity], [isTextInstance, R.identity], [isPath, renderPath(ctx)], [isRect, renderRect(ctx)], [isLine, renderLine(ctx)], [isGroup, renderGroup(ctx)], [isText, renderSvgText(ctx)], [isCircle, renderCircle(ctx)], [isImage, renderSvgImage(ctx)], [isEllipse, renderEllipse(ctx)], [isPolygon, renderPolygon(ctx)], [isPolyline, renderPolyline(ctx)], [R.T, warnUnsupportedNode]]);

const drawNode = ctx => R.compose(draw(ctx), renderNode(ctx), applyTransformations$1(ctx), setOpacity(ctx), setFillOpacity(ctx), setStrokeOpacity(ctx), setFill(ctx), setStrokeColor(ctx), setStrokeWidth(ctx), setLineJoin(ctx), setLineDash(ctx), setLineCap(ctx));

const clipPath = ctx => node => {
  const value = R.path(['props', 'clipPath'], node);

  if (value) {
    R.compose(() => ctx.clip(), R.forEach(renderNode(ctx)), R.propOr([], 'children'))(value);
  }

  return node;
};

const drawChildren = ctx => node => R.compose(R.map(R.compose(restore$1(ctx), drawChildren(ctx), drawNode(ctx), clipPath(ctx), save$1(ctx))), R.propOr([], 'children'))(node);

const defaultsZero = R.pathOr(0);

const preserveAspectRatio = ctx => node => {
  const {
    width,
    height
  } = node.box;
  const {
    viewBox,
    preserveAspectRatio = {}
  } = node.props;
  const {
    meetOrSlice = 'meet',
    align = 'xMidYMid'
  } = preserveAspectRatio;
  if (viewBox == null || width == null || height == null) return node;
  const x = viewBox ? viewBox.minX : 0;
  const y = viewBox ? viewBox.minY : 0;
  const logicalWidth = viewBox ? viewBox.maxX : width;
  const logicalHeight = viewBox ? viewBox.maxY : height;
  const logicalRatio = logicalWidth / logicalHeight;
  const physicalRatio = width / height;
  const scaleX = width / logicalWidth;
  const scaleY = height / logicalHeight;

  if (align === 'none') {
    ctx.scale(scaleX, scaleY);
    ctx.translate(-x, -y);
    return node;
  }

  if (logicalRatio < physicalRatio && meetOrSlice === 'meet' || logicalRatio >= physicalRatio && meetOrSlice === 'slice') {
    ctx.scale(scaleY, scaleY);

    switch (align) {
      case 'xMinYMin':
      case 'xMinYMid':
      case 'xMinYMax':
        ctx.translate(-x, -y);
        break;

      case 'xMidYMin':
      case 'xMidYMid':
      case 'xMidYMax':
        ctx.translate(-x - (logicalWidth - width * logicalHeight / height) / 2, -y);
        break;

      default:
        ctx.translate(-x - (logicalWidth - width * logicalHeight / height), -y);
    }
  } else {
    ctx.scale(scaleX, scaleX);

    switch (align) {
      case 'xMinYMin':
      case 'xMidYMin':
      case 'xMaxYMin':
        ctx.translate(-x, -y);
        break;

      case 'xMinYMid':
      case 'xMidYMid':
      case 'xMaxYMid':
        ctx.translate(-x, -y - (logicalHeight - height * logicalWidth / width) / 2);
        break;

      default:
        ctx.translate(-x, -y - (logicalHeight - height * logicalWidth / width));
    }
  }

  return node;
};

const moveToOrigin = ctx => node => {
  const {
    top,
    left
  } = node.box;
  const paddingLeft = defaultsZero('paddingLeft', node.box);
  const paddingTop = defaultsZero('paddingTop', node.box);
  ctx.translate(left + paddingLeft, top + paddingTop);
  return node;
};

const renderSvg = (ctx, node) => {
  R.compose(restore$1(ctx), drawChildren(ctx), preserveAspectRatio(ctx), moveToOrigin(ctx), clipNode$1(ctx), save$1(ctx))(node);
  return node;
};

var renderSvg$1 = R.curryN(2, renderSvg);

const renderText = (ctx, node) => {
  const {
    top,
    left
  } = node.box;
  const paddingTop = R.pathOr(0, ['box', 'paddingTop'], node);
  const paddingLeft = R.pathOr(0, ['box', 'paddingLeft'], node);
  const initialY = node.lines[0] ? node.lines[0].box.y : 0;
  ctx.save();
  ctx.translate(left + paddingLeft, top + paddingTop - initialY);
  PDFRenderer.render(ctx, [node.lines]);
  ctx.restore();
  return node;
};

var renderText$1 = R.curryN(2, renderText);

const renderPage = (ctx, node) => {
  const {
    width,
    height
  } = node.box;
  ctx.addPage({
    size: [width, height],
    margin: 0
  });
  return node;
};

var renderPage$1 = R.curryN(2, renderPage);

const renderNote = (ctx, node) => {
  const {
    top,
    left
  } = node.box;
  const value = node.children[0] ? node.children[0].value : '';
  ctx.note(left, top, 0, 0, value);
  return node;
};

var renderNote$1 = R.curryN(2, renderNote);

const isPercent = value => /((-)?\d+\.?\d*)%/g.exec(value);
/**
 * Get percentage value of input
 *
 * @param {String} value
 * @returns {Object} percent value (if matches)
 */


const matchPercent = value => {
  const match = isPercent(value);

  if (match) {
    const value = parseFloat(match[1], 10);
    const percent = value / 100;
    return {
      value,
      percent,
      absValue: Math.abs(value),
      absPercent: Math.abs(percent)
    };
  }

  return null;
};

const isNumeric = n => {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

const applyContainObjectFit = (cw, ch, iw, ih, px, py) => {
  const cr = cw / ch;
  const ir = iw / ih;
  const pxp = matchPercent(px);
  const pyp = matchPercent(py);
  const pxv = pxp ? pxp.percent : 0.5;
  const pyv = pyp ? pyp.percent : 0.5;

  if (cr > ir) {
    const height = ch;
    const width = height * ir;
    const yOffset = isNumeric(py) ? py : 0;
    const xOffset = isNumeric(px) ? px : (cw - width) * pxv;
    return {
      width,
      height,
      xOffset,
      yOffset
    };
  } else {
    const width = cw;
    const height = width / ir;
    const xOffset = isNumeric(px) ? px : 0;
    const yOffset = isNumeric(py) ? py : (ch - height) * pyv;
    return {
      width,
      height,
      yOffset,
      xOffset
    };
  }
};

const applyNoneObjectFit = (cw, ch, iw, ih, px, py) => {
  const width = iw;
  const height = ih;
  const pxp = matchPercent(px);
  const pyp = matchPercent(py);
  const pxv = pxp ? pxp.percent : 0.5;
  const pyv = pyp ? pyp.percent : 0.5;
  const xOffset = isNumeric(px) ? px : (cw - width) * pxv;
  const yOffset = isNumeric(py) ? py : (ch - height) * pyv;
  return {
    width,
    height,
    xOffset,
    yOffset
  };
};

const applyCoverObjectFit = (cw, ch, iw, ih, px, py) => {
  const ir = iw / ih;
  const cr = cw / ch;
  const pxp = matchPercent(px);
  const pyp = matchPercent(py);
  const pxv = pxp ? pxp.percent : 0.5;
  const pyv = pyp ? pyp.percent : 0.5;

  if (cr > ir) {
    const width = cw;
    const height = width / ir;
    const xOffset = isNumeric(px) ? px : 0;
    const yOffset = isNumeric(py) ? py : (ch - height) * pyv;
    return {
      width,
      height,
      yOffset,
      xOffset
    };
  } else {
    const height = ch;
    const width = height * ir;
    const xOffset = isNumeric(px) ? px : (cw - width) * pxv;
    const yOffset = isNumeric(py) ? py : 0;
    return {
      width,
      height,
      xOffset,
      yOffset
    };
  }
};

const applyScaleDownObjectFit = (cw, ch, iw, ih, px, py) => {
  const containDimension = applyContainObjectFit(cw, ch, iw, ih, px, py);
  const noneDimension = applyNoneObjectFit(cw, ch, iw, ih, px, py);
  return containDimension.width < noneDimension.width ? containDimension : noneDimension;
};

const applyFillObjectFit = (cw, ch, px, py) => {
  return {
    width: cw,
    height: ch,
    xOffset: matchPercent(px) ? 0 : px || 0,
    yOffset: matchPercent(py) ? 0 : py || 0
  };
};

const resolveObjectFit = (type = 'fill', cw, ch, iw, ih, px, py) => {
  switch (type) {
    case 'contain':
      return applyContainObjectFit(cw, ch, iw, ih, px, py);

    case 'cover':
      return applyCoverObjectFit(cw, ch, iw, ih, px, py);

    case 'none':
      return applyNoneObjectFit(cw, ch, iw, ih, px, py);

    case 'scale-down':
      return applyScaleDownObjectFit(cw, ch, iw, ih, px, py);

    default:
      return applyFillObjectFit(cw, ch, px, py);
  }
};

const drawImage$1 = ctx => node => {
  const {
    left,
    top
  } = node.box;
  const {
    opacity,
    objectPositionX,
    objectPositionY
  } = node.style;
  const paddingTop = node.box.paddingLeft || 0;
  const paddingRight = node.box.paddingRight || 0;
  const paddingBottom = node.box.paddingBottom || 0;
  const paddingLeft = node.box.paddingLeft || 0;
  const {
    width,
    height,
    xOffset,
    yOffset
  } = resolveObjectFit(node.style.objectFit, node.box.width - paddingLeft - paddingRight, node.box.height - paddingTop - paddingBottom, node.image.width, node.image.height, objectPositionX, objectPositionY);

  if (node.image.data) {
    if (width !== 0 && height !== 0) {
      ctx.fillOpacity(opacity || 1).image(node.image.data, left + paddingLeft + xOffset, top + paddingTop + yOffset, {
        width,
        height
      });
    } else {
      warning(false, `Image with src '${node.props.src}' skipped due to invalid dimensions`);
    }
  }

  return node;
};

const renderImage$1 = (ctx, node) => {
  R.compose(restore$1(ctx), drawImage$1(ctx), clipNode$1(ctx), save$1(ctx))(node);
  return node;
};

var renderImage$2 = R.curryN(2, renderImage$1);

const availableMethods = ['dash', 'clip', 'save', 'path', 'fill', 'font', 'text', 'rect', 'scale', 'moveTo', 'lineTo', 'stroke', 'rotate', 'circle', 'lineCap', 'opacity', 'ellipse', 'polygon', 'restore', 'lineJoin', 'fontSize', 'fillColor', 'lineWidth', 'translate', 'miterLimit', 'strokeColor', 'fillOpacity', 'roundedRect', 'strokeOpacity', 'bezierCurveTo', 'quadraticCurveTo', 'linearGradient', 'radialGradient'];

const painter = function (ctx) {
  const p = availableMethods.reduce((acc, prop) => ({ ...acc,
    [prop]: (...args) => {
      ctx[prop](...args);
      return p;
    }
  }), {});
  return p;
};

const defaultsZero$1 = R.pathOr(0);

const renderCanvas = (ctx, node) => {
  const {
    top,
    left,
    width,
    height
  } = node.box;
  const paddingLeft = defaultsZero$1('paddingLeft', node.box);
  const paddingRight = defaultsZero$1('paddingRight', node.box);
  const paddingTop = defaultsZero$1('paddingTop', node.box);
  const paddingBottom = defaultsZero$1('paddingBottom', node.box);
  const availableWidth = width - paddingLeft - paddingRight;
  const availableHeight = height - paddingTop - paddingBottom;
  warning(availableWidth && availableHeight, 'Canvas element has null width or height. Please provide valid values via the `style` prop in order to correctly render it.');
  ctx.save().translate(left + paddingLeft, top + paddingTop);

  if (node.props.paint) {
    node.props.paint(painter(ctx), availableWidth, availableHeight);
  }

  ctx.restore();
  return node;
};

var renderCanvas$1 = R.curryN(2, renderCanvas);

/**
 * Checks if page should render vertical ruler
 *
 * @param {Object} page
 * @returns {boolean} has vertical ruler
 */

const hasVerticalRuler = R.either(R.hasPath(['props', 'ruler']), R.hasPath(['props', 'verticalRuler']));

/**
 * Checks if page should render horizontal ruler
 *
 * @param {Object} page
 * @returns {boolean} has horizontal ruler
 */

const hasHorizontalRuler = R.either(R.hasPath(['props', 'ruler']), R.hasPath(['props', 'horizontalRuler']));

const range = (max, steps) => Array.from({
  length: Math.ceil(max / steps)
}, (_, i) => i * steps);

const matchPercentage = value => {
  const match = matchPercent(value);
  return match ? 100 / match.value : null;
};

const getVerticalSteps = page => {
  const value = page.props.horizontalRulerSteps || page.props.rulerSteps || DEFAULT_RULER_STEPS;

  if (typeof value === 'string') {
    const percentage = matchPercentage(value);

    if (percentage) {
      const width = page.box.width - (hasVerticalRuler(page) ? RULER_WIDTH : 0);
      return width / percentage;
    }

    throw new Error('Page: Invalid horizontal steps value');
  }

  return value;
};

const getHorizontalSteps = page => {
  const value = page.props.verticalRulerSteps || page.props.rulerSteps || DEFAULT_RULER_STEPS;

  if (typeof value === 'string') {
    const percentage = matchPercentage(value);

    if (percentage) {
      const height = page.box.height - (hasVerticalRuler(page) ? RULER_WIDTH : 0);
      return height / percentage;
    }

    throw new Error('Page: Invalid horizontal steps value');
  }

  return value;
};

const renderVerticalRuler = ctx => page => {
  const width = page.box.width;
  const height = page.box.height;
  const offset = hasHorizontalRuler(page) ? RULER_WIDTH : 0;
  const hRange = range(width, getVerticalSteps(page));
  ctx.rect(offset, 0, width, RULER_WIDTH).fill(RULER_COLOR).moveTo(offset, RULER_WIDTH).lineTo(width, RULER_WIDTH).stroke(LINE_COLOR);
  hRange.map(step => {
    ctx.moveTo(offset + step, 0).lineTo(offset + step, RULER_WIDTH).stroke(LINE_COLOR).fillColor('black').text(`${Math.round(step)}`, offset + step + 1, 1);

    if (step !== 0) {
      ctx.moveTo(offset + step, RULER_WIDTH).lineTo(offset + step, height).stroke(GRID_COLOR);
    }
  });
  return page;
};

const renderHorizontalRuler = ctx => page => {
  const width = page.box.width;
  const height = page.box.height;
  const offset = hasVerticalRuler(page) ? RULER_WIDTH : 0;
  const hRange = range(height, getHorizontalSteps(page));
  ctx.rect(0, offset, RULER_WIDTH, height).fill(RULER_COLOR).moveTo(RULER_WIDTH, hasHorizontalRuler(page) ? RULER_WIDTH : 0).lineTo(RULER_WIDTH, height).stroke(LINE_COLOR);
  hRange.map(step => {
    ctx.moveTo(0, offset + step).lineTo(RULER_WIDTH, offset + step).stroke(LINE_COLOR).fillColor('black').text(`${Math.round(step)}`, 1, offset + step + 1);

    if (step !== 0) {
      ctx.moveTo(RULER_WIDTH, offset + step).lineTo(width, offset + step).stroke(GRID_COLOR);
    }
  });
  return page;
};

const renderRulers = (ctx, page) => {
  ctx.save().lineWidth(LINE_WIDTH).fontSize(RULER_FONT_SIZE).opacity(1);
  R.compose(R.when(hasVerticalRuler, renderVerticalRuler(ctx)), R.when(hasHorizontalRuler, renderHorizontalRuler(ctx)))(page);
  ctx.restore();
  return page;
};

var renderRulers$1 = R.curryN(2, renderRulers);

const getDocumentProp = target => (or, prop) => R.pathOr(or, ['props', prop], target);

const setPDFMetadata = target => (key, value) => {
  if (value) target.info[key] = value;
};
/**
 * Set document instance metadata
 *
 * @param {Object} ctx document instance
 * @param {Object} doc document root
 */


const addMetadata = (ctx, doc) => {
  const getProp = getDocumentProp(doc);
  const setProp = setPDFMetadata(ctx);
  const title = getProp(null, 'title');
  const author = getProp(null, 'author');
  const subject = getProp(null, 'subject');
  const keywords = getProp(null, 'keywords');
  const creator = getProp('react-pdf', 'creator');
  const producer = getProp('react-pdf', 'producer');
  setProp('Title', title);
  setProp('Author', author);
  setProp('Subject', subject);
  setProp('Keywords', keywords);
  setProp('Creator', creator);
  setProp('Producer', producer);
  return doc;
};

var addMetadata$1 = R.curryN(2, addMetadata);

const CONTENT_COLOR = '#a1c6e7';
const PADDING_COLOR = '#c4deb9';
const MARGIN_COLOR = '#f8cca1';
const shouldDebug = R.pathEq(['props', 'debug'], true); // TODO: Draw debug boxes using clipping to enhance quality

const debugContent = ctx => R.tap(node => {
  const {
    left,
    top,
    width,
    height,
    paddingLeft,
    paddingTop,
    paddingRight,
    paddingBottom,
    borderLeftWidth,
    borderTopWidth,
    borderRightWidth,
    borderBottomWidth
  } = node.box;
  ctx.fillColor(CONTENT_COLOR).opacity(0.5).rect(left + paddingLeft + borderLeftWidth, top + paddingTop + borderTopWidth, width - paddingLeft - paddingRight - borderRightWidth - borderLeftWidth, height - paddingTop - paddingBottom - borderTopWidth - borderBottomWidth).fill();
});

const debugPadding = ctx => R.tap(node => {
  const {
    left,
    top,
    width,
    height,
    paddingLeft,
    paddingTop,
    paddingRight,
    paddingBottom,
    borderLeftWidth,
    borderTopWidth,
    borderRightWidth,
    borderBottomWidth
  } = node.box;
  ctx.fillColor(PADDING_COLOR).opacity(0.5); // Padding top

  ctx.rect(left + paddingLeft + borderLeftWidth, top + borderTopWidth, width - paddingRight - paddingLeft - borderLeftWidth - borderRightWidth, paddingTop).fill(); // Padding left

  ctx.rect(left + borderLeftWidth, top + borderTopWidth, paddingLeft, height - borderTopWidth - borderBottomWidth).fill(); // Padding right

  ctx.rect(left + width - paddingRight - borderRightWidth, top + borderTopWidth, paddingRight, height - borderTopWidth - borderBottomWidth).fill(); // Padding bottom

  ctx.rect(left + paddingLeft + borderLeftWidth, top + height - paddingBottom - borderBottomWidth, width - paddingRight - paddingLeft - borderLeftWidth - borderRightWidth, paddingBottom).fill();
});

const debugMargin = ctx => R.tap(node => {
  const {
    left,
    top,
    width,
    height,
    marginLeft,
    marginTop,
    marginRight,
    marginBottom
  } = node.box;
  ctx.fillColor(MARGIN_COLOR).opacity(0.5); // Margin top

  ctx.rect(left, top - marginTop, width, marginTop).fill(); // Margin left

  ctx.rect(left - marginLeft, top - marginTop, marginLeft, height + marginTop + marginBottom).fill(); // Margin right

  ctx.rect(left + width, top - marginTop, marginRight, height + marginTop + marginBottom).fill(); // Margin bottom

  ctx.rect(left, top + height, width, marginBottom).fill();
});

const debugText = ctx => R.tap(node => {
  const {
    left,
    top,
    width,
    height,
    marginLeft,
    marginTop,
    marginRight,
    marginBottom
  } = node.box;
  const roundedWidth = Math.round(width + marginLeft + marginRight);
  const roundedHeight = Math.round(height + marginTop + marginBottom);
  ctx.fontSize(4).opacity(1).fillColor('black').text(`${roundedWidth} x ${roundedHeight}`, left - marginLeft, Math.max(top - marginTop - 4, 1));
});

const debugOrigin = ctx => R.tap(node => {
  if (node.origin) {
    ctx.circle(node.origin.left, node.origin.top, 3).fill('red').circle(node.origin.left, node.origin.top, 5).stroke('red');
  }
});

const renderDebug = ctx => R.tap(R.when(shouldDebug, R.compose(restore$1(ctx), debugOrigin(ctx), debugText(ctx), debugMargin(ctx), debugPadding(ctx), debugContent(ctx), save$1(ctx))));

// This constant is used to approximate a symmetrical arc using a cubic Bezier curve.

const KAPPA$3 = 4.0 * ((Math.sqrt(2) - 1.0) / 3.0);

const clipBorderTop = (ctx, layout, style, rtr, rtl) => {
  const {
    top,
    left,
    width,
    height
  } = layout;
  const {
    borderTopWidth,
    borderRightWidth,
    borderLeftWidth
  } = style; // Clip outer top border edge

  ctx.moveTo(left + rtl, top);
  ctx.lineTo(left + width - rtr, top); // Ellipse coefficients outer top right cap

  const c0 = rtr * (1.0 - KAPPA$3); // Clip outer top right cap

  ctx.bezierCurveTo(left + width - c0, top, left + width, top + c0, left + width, top + rtr); // Move down in case the margin exceedes the radius

  const topRightYCoord = top + Math.max(borderTopWidth, rtr);
  ctx.lineTo(left + width, topRightYCoord); // Clip inner top right cap

  ctx.lineTo(left + width - borderRightWidth, topRightYCoord); // Ellipse coefficients inner top right cap

  const innerTopRightRadiusX = Math.max(rtr - borderRightWidth, 0);
  const innerTopRightRadiusY = Math.max(rtr - borderTopWidth, 0);
  const c1 = innerTopRightRadiusX * (1.0 - KAPPA$3);
  const c2 = innerTopRightRadiusY * (1.0 - KAPPA$3); // Clip inner top right cap

  ctx.bezierCurveTo(left + width - borderRightWidth, top + borderTopWidth + c2, left + width - borderRightWidth - c1, top + borderTopWidth, left + width - borderRightWidth - innerTopRightRadiusX, top + borderTopWidth); // Clip inner top border edge

  ctx.lineTo(left + Math.max(rtl, borderLeftWidth), top + borderTopWidth); // Ellipse coefficients inner top left cap

  const innerTopLeftRadiusX = Math.max(rtl - borderLeftWidth, 0);
  const innerTopLeftRadiusY = Math.max(rtl - borderTopWidth, 0);
  const c3 = innerTopLeftRadiusX * (1.0 - KAPPA$3);
  const c4 = innerTopLeftRadiusY * (1.0 - KAPPA$3);
  const topLeftYCoord = top + Math.max(borderTopWidth, rtl); // Clip inner top left cap

  ctx.bezierCurveTo(left + borderLeftWidth + c3, top + borderTopWidth, left + borderLeftWidth, top + borderTopWidth + c4, left + borderLeftWidth, topLeftYCoord);
  ctx.lineTo(left, topLeftYCoord); // Move down in case the margin exceedes the radius

  ctx.lineTo(left, top + rtl); // Ellipse coefficients outer top left cap

  const c5 = rtl * (1.0 - KAPPA$3); // Clip outer top left cap

  ctx.bezierCurveTo(left, top + c5, left + c5, top, left + rtl, top);
  ctx.closePath();
  ctx.clip(); // Clip border top cap joins

  if (borderRightWidth) {
    const trSlope = -borderTopWidth / borderRightWidth;
    ctx.moveTo(left + width / 2, trSlope * (-width / 2) + top);
    ctx.lineTo(left + width, top);
    ctx.lineTo(left, top);
    ctx.lineTo(left, top + height);
    ctx.closePath();
    ctx.clip();
  }

  if (borderLeftWidth) {
    const trSlope = -borderTopWidth / borderLeftWidth;
    ctx.moveTo(left + width / 2, trSlope * (-width / 2) + top);
    ctx.lineTo(left, top);
    ctx.lineTo(left + width, top);
    ctx.lineTo(left + width, top + height);
    ctx.closePath();
    ctx.clip();
  }
};

const fillBorderTop = (ctx, layout, style, rtr, rtl) => {
  const {
    top,
    left,
    width
  } = layout;
  const {
    borderTopColor,
    borderTopWidth,
    borderTopStyle,
    borderRightWidth,
    borderLeftWidth
  } = style;
  const c0 = rtl * (1.0 - KAPPA$3);
  const c1 = rtr * (1.0 - KAPPA$3);
  ctx.moveTo(left, top + Math.max(rtl, borderTopWidth));
  ctx.bezierCurveTo(left, top + c0, left + c0, top, left + rtl, top);
  ctx.lineTo(left + width - rtr, top);
  ctx.bezierCurveTo(left + width - c1, top, left + width, top + c1, left + width, top + rtr);
  ctx.strokeColor(borderTopColor);
  ctx.lineWidth(Math.max(borderRightWidth, borderTopWidth, borderLeftWidth) * 2);

  if (borderTopStyle === 'dashed') {
    ctx.dash(borderTopWidth * 2, {
      space: borderTopWidth * 1.2
    });
  } else if (borderTopStyle === 'dotted') {
    ctx.dash(borderTopWidth, {
      space: borderTopWidth * 1.2
    });
  }

  ctx.stroke();
  ctx.undash();
};

const clipBorderRight = (ctx, layout, style, rtr, rbr) => {
  const {
    top,
    left,
    width,
    height
  } = layout;
  const {
    borderTopWidth,
    borderRightWidth,
    borderBottomWidth
  } = style; // Clip outer right border edge

  ctx.moveTo(left + width, top + rtr);
  ctx.lineTo(left + width, top + height - rbr); // Ellipse coefficients outer bottom right cap

  const c0 = rbr * (1.0 - KAPPA$3); // Clip outer top right cap

  ctx.bezierCurveTo(left + width, top + height - c0, left + width - c0, top + height, left + width - rbr, top + height); // Move left in case the margin exceedes the radius

  const topBottomXCoord = left + width - Math.max(borderRightWidth, rbr);
  ctx.lineTo(topBottomXCoord, top + height); // Clip inner bottom right cap

  ctx.lineTo(topBottomXCoord, top + height - borderBottomWidth); // Ellipse coefficients inner bottom right cap

  const innerBottomRightRadiusX = Math.max(rbr - borderRightWidth, 0);
  const innerBottomRightRadiusY = Math.max(rbr - borderBottomWidth, 0);
  const c1 = innerBottomRightRadiusX * (1.0 - KAPPA$3);
  const c2 = innerBottomRightRadiusY * (1.0 - KAPPA$3); // Clip inner top right cap

  ctx.bezierCurveTo(left + width - borderRightWidth - c1, top + height - borderBottomWidth, left + width - borderRightWidth, top + height - borderBottomWidth - c2, left + width - borderRightWidth, top + height - Math.max(rbr, borderBottomWidth)); // Clip inner right border edge

  ctx.lineTo(left + width - borderRightWidth, top + Math.max(rtr, borderTopWidth)); // Ellipse coefficients inner top right cap

  const innerTopRightRadiusX = Math.max(rtr - borderRightWidth, 0);
  const innerTopRightRadiusY = Math.max(rtr - borderTopWidth, 0);
  const c3 = innerTopRightRadiusX * (1.0 - KAPPA$3);
  const c4 = innerTopRightRadiusY * (1.0 - KAPPA$3);
  const topRightXCoord = left + width - Math.max(rtr, borderRightWidth); // Clip inner top left cap

  ctx.bezierCurveTo(left + width - borderRightWidth, top + borderTopWidth + c4, left + width - borderRightWidth - c3, top + borderTopWidth, topRightXCoord, top + borderTopWidth);
  ctx.lineTo(topRightXCoord, top); // Move right in case the margin exceedes the radius

  ctx.lineTo(left + width - rtr, top); // Ellipse coefficients outer top right cap

  const c5 = rtr * (1.0 - KAPPA$3); // Clip outer top right cap

  ctx.bezierCurveTo(left + width - c5, top, left + width, top + c5, left + width, top + rtr);
  ctx.closePath();
  ctx.clip(); // Clip border right cap joins

  if (borderTopWidth) {
    const trSlope = -borderTopWidth / borderRightWidth;
    ctx.moveTo(left + width / 2, trSlope * (-width / 2) + top);
    ctx.lineTo(left + width, top);
    ctx.lineTo(left + width, top + height);
    ctx.lineTo(left, top + height);
    ctx.closePath();
    ctx.clip();
  }

  if (borderBottomWidth) {
    const brSlope = borderBottomWidth / borderRightWidth;
    ctx.moveTo(left + width / 2, brSlope * (-width / 2) + top + height);
    ctx.lineTo(left + width, top + height);
    ctx.lineTo(left + width, top);
    ctx.lineTo(left, top);
    ctx.closePath();
    ctx.clip();
  }
};

const fillBorderRight = (ctx, layout, style, rtr, rbr) => {
  const {
    top,
    left,
    width,
    height
  } = layout;
  const {
    borderRightColor,
    borderRightStyle,
    borderRightWidth,
    borderTopWidth,
    borderBottomWidth
  } = style;
  const c0 = rbr * (1.0 - KAPPA$3);
  const c1 = rtr * (1.0 - KAPPA$3);
  ctx.moveTo(left + width - rtr, top);
  ctx.bezierCurveTo(left + width - c1, top, left + width, top + c1, left + width, top + rtr);
  ctx.lineTo(left + width, top + height - rbr);
  ctx.bezierCurveTo(left + width, top + height - c0, left + width - c0, top + height, left + width - rbr, top + height);
  ctx.strokeColor(borderRightColor);
  ctx.lineWidth(Math.max(borderRightWidth, borderTopWidth, borderBottomWidth) * 2);

  if (borderRightStyle === 'dashed') {
    ctx.dash(borderRightWidth * 2, {
      space: borderRightWidth * 1.2
    });
  } else if (borderRightStyle === 'dotted') {
    ctx.dash(borderRightWidth, {
      space: borderRightWidth * 1.2
    });
  }

  ctx.stroke();
  ctx.undash();
};

const clipBorderBottom = (ctx, layout, style, rbl, rbr) => {
  const {
    top,
    left,
    width,
    height
  } = layout;
  const {
    borderBottomWidth,
    borderRightWidth,
    borderLeftWidth
  } = style; // Clip outer top border edge

  ctx.moveTo(left + width - rbr, top + height);
  ctx.lineTo(left + rbl, top + height); // Ellipse coefficients outer top right cap

  const c0 = rbl * (1.0 - KAPPA$3); // Clip outer top right cap

  ctx.bezierCurveTo(left + c0, top + height, left, top + height - c0, left, top + height - rbl); // Move up in case the margin exceedes the radius

  const bottomLeftYCoord = top + height - Math.max(borderBottomWidth, rbl);
  ctx.lineTo(left, bottomLeftYCoord); // Clip inner bottom left cap

  ctx.lineTo(left + borderLeftWidth, bottomLeftYCoord); // Ellipse coefficients inner top right cap

  const innerBottomLeftRadiusX = Math.max(rbl - borderLeftWidth, 0);
  const innerBottomLeftRadiusY = Math.max(rbl - borderBottomWidth, 0);
  const c1 = innerBottomLeftRadiusX * (1.0 - KAPPA$3);
  const c2 = innerBottomLeftRadiusY * (1.0 - KAPPA$3); // Clip inner bottom left cap

  ctx.bezierCurveTo(left + borderLeftWidth, top + height - borderBottomWidth - c2, left + borderLeftWidth + c1, top + height - borderBottomWidth, left + borderLeftWidth + innerBottomLeftRadiusX, top + height - borderBottomWidth); // Clip inner bottom border edge

  ctx.lineTo(left + width - Math.max(rbr, borderRightWidth), top + height - borderBottomWidth); // Ellipse coefficients inner top left cap

  const innerBottomRightRadiusX = Math.max(rbr - borderRightWidth, 0);
  const innerBottomRightRadiusY = Math.max(rbr - borderBottomWidth, 0);
  const c3 = innerBottomRightRadiusX * (1.0 - KAPPA$3);
  const c4 = innerBottomRightRadiusY * (1.0 - KAPPA$3);
  const bottomRightYCoord = top + height - Math.max(borderBottomWidth, rbr); // Clip inner top left cap

  ctx.bezierCurveTo(left + width - borderRightWidth - c3, top + height - borderBottomWidth, left + width - borderRightWidth, top + height - borderBottomWidth - c4, left + width - borderRightWidth, bottomRightYCoord);
  ctx.lineTo(left + width, bottomRightYCoord); // Move down in case the margin exceedes the radius

  ctx.lineTo(left + width, top + height - rbr); // Ellipse coefficients outer top left cap

  const c5 = rbr * (1.0 - KAPPA$3); // Clip outer top left cap

  ctx.bezierCurveTo(left + width, top + height - c5, left + width - c5, top + height, left + width - rbr, top + height);
  ctx.closePath();
  ctx.clip(); // Clip border bottom cap joins

  if (borderRightWidth) {
    const brSlope = borderBottomWidth / borderRightWidth;
    ctx.moveTo(left + width / 2, brSlope * (-width / 2) + top + height);
    ctx.lineTo(left + width, top + height);
    ctx.lineTo(left, top + height);
    ctx.lineTo(left, top);
    ctx.closePath();
    ctx.clip();
  }

  if (borderLeftWidth) {
    const trSlope = -borderBottomWidth / borderLeftWidth;
    ctx.moveTo(left + width / 2, trSlope * (width / 2) + top + height);
    ctx.lineTo(left, top + height);
    ctx.lineTo(left + width, top + height);
    ctx.lineTo(left + width, top);
    ctx.closePath();
    ctx.clip();
  }
};

const fillBorderBottom = (ctx, layout, style, rbl, rbr) => {
  const {
    top,
    left,
    width,
    height
  } = layout;
  const {
    borderBottomColor,
    borderBottomStyle,
    borderBottomWidth,
    borderRightWidth,
    borderLeftWidth
  } = style;
  const c0 = rbl * (1.0 - KAPPA$3);
  const c1 = rbr * (1.0 - KAPPA$3);
  ctx.moveTo(left + width, top + height - rbr);
  ctx.bezierCurveTo(left + width, top + height - c1, left + width - c1, top + height, left + width - rbr, top + height);
  ctx.lineTo(left + rbl, top + height);
  ctx.bezierCurveTo(left + c0, top + height, left, top + height - c0, left, top + height - rbl);
  ctx.strokeColor(borderBottomColor);
  ctx.lineWidth(Math.max(borderBottomWidth, borderRightWidth, borderLeftWidth) * 2);

  if (borderBottomStyle === 'dashed') {
    ctx.dash(borderBottomWidth * 2, {
      space: borderBottomWidth * 1.2
    });
  } else if (borderBottomStyle === 'dotted') {
    ctx.dash(borderBottomWidth, {
      space: borderBottomWidth * 1.2
    });
  }

  ctx.stroke();
  ctx.undash();
};

const clipBorderLeft = (ctx, layout, style, rbl, rtl) => {
  const {
    top,
    left,
    width,
    height
  } = layout;
  const {
    borderTopWidth,
    borderLeftWidth,
    borderBottomWidth
  } = style; // Clip outer left border edge

  ctx.moveTo(left, top + height - rbl);
  ctx.lineTo(left, top + rtl); // Ellipse coefficients outer top left cap

  const c0 = rtl * (1.0 - KAPPA$3); // Clip outer top left cap

  ctx.bezierCurveTo(left, top + c0, left + c0, top, left + rtl, top); // Move right in case the margin exceedes the radius

  const topLeftCoordX = left + Math.max(borderLeftWidth, rtl);
  ctx.lineTo(topLeftCoordX, top); // Clip inner top left cap

  ctx.lineTo(topLeftCoordX, top + borderTopWidth); // Ellipse coefficients inner top left cap

  const innerTopLeftRadiusX = Math.max(rtl - borderLeftWidth, 0);
  const innerTopLeftRadiusY = Math.max(rtl - borderTopWidth, 0);
  const c1 = innerTopLeftRadiusX * (1.0 - KAPPA$3);
  const c2 = innerTopLeftRadiusY * (1.0 - KAPPA$3); // Clip inner top right cap

  ctx.bezierCurveTo(left + borderLeftWidth + c1, top + borderTopWidth, left + borderLeftWidth, top + borderTopWidth + c2, left + borderLeftWidth, top + Math.max(rtl, borderTopWidth)); // Clip inner left border edge

  ctx.lineTo(left + borderLeftWidth, top + height - Math.max(rbl, borderBottomWidth)); // Ellipse coefficients inner bottom left cap

  const innerBottomLeftRadiusX = Math.max(rbl - borderLeftWidth, 0);
  const innerBottomLeftRadiusY = Math.max(rbl - borderBottomWidth, 0);
  const c3 = innerBottomLeftRadiusX * (1.0 - KAPPA$3);
  const c4 = innerBottomLeftRadiusY * (1.0 - KAPPA$3);
  const bottomLeftXCoord = left + Math.max(rbl, borderLeftWidth); // Clip inner top left cap

  ctx.bezierCurveTo(left + borderLeftWidth, top + height - borderBottomWidth - c4, left + borderLeftWidth + c3, top + height - borderBottomWidth, bottomLeftXCoord, top + height - borderBottomWidth);
  ctx.lineTo(bottomLeftXCoord, top + height); // Move left in case the margin exceedes the radius

  ctx.lineTo(left + rbl, top + height); // Ellipse coefficients outer top right cap

  const c5 = rbl * (1.0 - KAPPA$3); // Clip outer top right cap

  ctx.bezierCurveTo(left + c5, top + height, left, top + height - c5, left, top + height - rbl);
  ctx.closePath();
  ctx.clip(); // Clip border right cap joins

  if (borderBottomWidth) {
    const trSlope = -borderBottomWidth / borderLeftWidth;
    ctx.moveTo(left + width / 2, trSlope * (width / 2) + top + height);
    ctx.lineTo(left, top + height);
    ctx.lineTo(left, top);
    ctx.lineTo(left + width, top);
    ctx.closePath();
    ctx.clip();
  }

  if (borderBottomWidth) {
    const trSlope = -borderTopWidth / borderLeftWidth;
    ctx.moveTo(left + width / 2, trSlope * (-width / 2) + top);
    ctx.lineTo(left, top);
    ctx.lineTo(left, top + height);
    ctx.lineTo(left + width, top + height);
    ctx.closePath();
    ctx.clip();
  }
};

const fillBorderLeft = (ctx, layout, style, rbl, rtl) => {
  const {
    top,
    left,
    height
  } = layout;
  const {
    borderLeftColor,
    borderLeftStyle,
    borderLeftWidth,
    borderTopWidth,
    borderBottomWidth
  } = style;
  const c0 = rbl * (1.0 - KAPPA$3);
  const c1 = rtl * (1.0 - KAPPA$3);
  ctx.moveTo(left + rbl, top + height);
  ctx.bezierCurveTo(left + c0, top + height, left, top + height - c0, left, top + height - rbl);
  ctx.lineTo(left, top + rtl);
  ctx.bezierCurveTo(left, top + c1, left + c1, top, left + rtl, top);
  ctx.strokeColor(borderLeftColor);
  ctx.lineWidth(Math.max(borderLeftWidth, borderTopWidth, borderBottomWidth) * 2);

  if (borderLeftStyle === 'dashed') {
    ctx.dash(borderLeftWidth * 2, {
      space: borderLeftWidth * 1.2
    });
  } else if (borderLeftStyle === 'dotted') {
    ctx.dash(borderLeftWidth, {
      space: borderLeftWidth * 1.2
    });
  }

  ctx.stroke();
  ctx.undash();
};

const shouldRenderBorders = node => node.box && (node.box.borderTopWidth || node.box.borderRightWidth || node.box.borderBottomWidth || node.box.borderLeftWidth);

const renderBorders = (ctx, node) => {
  if (!shouldRenderBorders(node)) return node;
  const {
    width,
    height,
    borderTopWidth,
    borderLeftWidth,
    borderRightWidth,
    borderBottomWidth
  } = node.box;
  const {
    opacity,
    borderTopLeftRadius = 0,
    borderTopRightRadius = 0,
    borderBottomLeftRadius = 0,
    borderBottomRightRadius = 0,
    borderTopColor = 'black',
    borderTopStyle = 'solid',
    borderLeftColor = 'black',
    borderLeftStyle = 'solid',
    borderRightColor = 'black',
    borderRightStyle = 'solid',
    borderBottomColor = 'black',
    borderBottomStyle = 'solid'
  } = node.style;
  const style = {
    borderTopColor,
    borderTopWidth,
    borderTopStyle,
    borderLeftColor,
    borderLeftWidth,
    borderLeftStyle,
    borderRightColor,
    borderRightWidth,
    borderRightStyle,
    borderBottomColor,
    borderBottomWidth,
    borderBottomStyle,
    borderTopLeftRadius,
    borderTopRightRadius,
    borderBottomLeftRadius,
    borderBottomRightRadius
  };
  const rtr = Math.min(borderTopRightRadius, 0.5 * width, 0.5 * height);
  const rtl = Math.min(borderTopLeftRadius, 0.5 * width, 0.5 * height);
  const rbr = Math.min(borderBottomRightRadius, 0.5 * width, 0.5 * height);
  const rbl = Math.min(borderBottomLeftRadius, 0.5 * width, 0.5 * height);
  ctx.save();
  ctx.strokeOpacity(opacity);

  if (borderTopWidth) {
    ctx.save();
    clipBorderTop(ctx, node.box, style, rtr, rtl);
    fillBorderTop(ctx, node.box, style, rtr, rtl);
    ctx.restore();
  }

  if (borderRightWidth) {
    ctx.save();
    clipBorderRight(ctx, node.box, style, rtr, rbr);
    fillBorderRight(ctx, node.box, style, rtr, rbr);
    ctx.restore();
  }

  if (borderBottomWidth) {
    ctx.save();
    clipBorderBottom(ctx, node.box, style, rbl, rbr);
    fillBorderBottom(ctx, node.box, style, rbl, rbr);
    ctx.restore();
  }

  if (borderLeftWidth) {
    ctx.save();
    clipBorderLeft(ctx, node.box, style, rbl, rtl);
    fillBorderLeft(ctx, node.box, style, rbl, rtl);
    ctx.restore();
  }

  ctx.restore();
  return node;
};

var renderBorders$1 = R.curryN(2, renderBorders);

const setDestination = ctx => R.tap(node => {
  if (node.props.id) {
    ctx.addNamedDestination(node.props.id, 'XYZ', null, node.box.top, null);
  }
});

const drawBackground = ctx => node => {
  if (node.box && node.style.backgroundColor) {
    const {
      top,
      left,
      width,
      height
    } = node.box;
    ctx.fillOpacity(node.style.opacity || 1).fillColor(node.style.backgroundColor).rect(left, top, width, height).fill();
  }

  return node;
};

const shouldRenderBackground = R.hasPath(['style', 'backgroundColor']);

const renderBackground = (ctx, node) => {
  R.when(shouldRenderBackground, R.compose(restore$1(ctx), drawBackground(ctx), clipNode$1(ctx), save$1(ctx)))(node);
  return node;
};

var renderBackground$1 = R.curryN(2, renderBackground);

const shouldRenderChildren = v => !isText(v) && !isSvg(v);

const renderChildren = ctx => node => {
  save$1(ctx, node);
  ctx.translate(node.box.left, node.box.top);
  R.compose(R.forEach(renderNode$1(ctx)), R.pathOr([], ['children']))(node);
  restore$1(ctx, node);
  return node;
};

const renderNode$1 = ctx => node => R.compose(restore$1(ctx), renderDebug(ctx), setDestination(ctx), R.when(shouldRenderChildren, renderChildren(ctx)), R.when(R.either(isText, isLink), setLink$1(ctx)), R.cond([[isText, renderText$1(ctx)], [isNote, renderNote$1(ctx)], [isImage, renderImage$2(ctx)], [isCanvas, renderCanvas$1(ctx)], [isSvg, renderSvg$1(ctx)], [R.T, R.identity]]), renderBorders$1(ctx), renderBackground$1(ctx), applyTransformations$1(ctx), save$1(ctx), R.when(isPage, renderPage$1(ctx)))(node);

const renderDocument = ctx => R.compose(R.forEach(R.compose(renderRulers$1(ctx), renderNode$1(ctx))), R.pathOr([], ['children']));

const render = (ctx, doc) => {
  addMetadata$1(ctx)(doc);
  renderDocument(ctx)(doc);
  ctx.end();
  Font$1.reset(); // TODO: move outside

  return ctx;
};

/**
 * Capitalize first letter of each word
 *
 * @param {String} string
 * @returns {String} capitalized string
 */
const capitalize = value => {
  if (!value) return value;
  return value.replace(/(^|\s)\S/g, l => l.toUpperCase());
};

/**
 * Capitalize first letter of string
 *
 * @param {String} string
 * @returns {String} capitalized string
 */

const upperFirst = R.ifElse(R.isNil, R.identity, R.compose(R.join(''), R.juxt([R.compose(R.toUpper, R.head), R.tail])));
var upperFirst$1 = R.memoizeWith(R.identity, upperFirst);

/**
 * Apply transformation to text string
 *
 * @param {String} text
 * @param {String} transformation type
 * @returns {String} transformed text
 */

const transformText = (text, transformation) => {
  switch (transformation) {
    case 'uppercase':
      return text.toUpperCase();

    case 'lowercase':
      return text.toLowerCase();

    case 'capitalize':
      return capitalize(text);

    case 'upperfirst':
      return upperFirst$1(text);

    default:
      return text;
  }
};

class StandardFont {
  constructor(src) {
    this.name = src;
    this.src = PDFDocument.PDFFont.open(null, src);
  }

  layout(str) {
    const [encoded, positions] = this.src.encode(str);
    return {
      positions,
      stringIndices: positions.map((_, i) => i),
      glyphs: encoded.map((g, i) => {
        const glyph = this.getGlyph(parseInt(g, 16));
        glyph.advanceWidth = positions[i].advanceWidth;
        return glyph;
      })
    };
  }

  glyphForCodePoint(codePoint) {
    const glyph = this.getGlyph(codePoint);
    glyph.advanceWidth = 400;
    return glyph;
  }

  getGlyph(id) {
    return {
      id,
      _font: this.src,
      codePoints: [id],
      isLigature: false,
      name: this.src.font.characterToGlyph(id)
    };
  }

  hasGlyphForCodePoint(codePoint) {
    return this.src.font.characterToGlyph(codePoint) !== '.notdef';
  } // Based on empirical observation


  get ascent() {
    return 900;
  } // Based on empirical observation


  get descent() {
    switch (this.name) {
      case 'Times-Roman':
      case 'Times-Bold':
      case 'Times-Italic':
        return -220;

      case 'Courier':
      case 'Courier-Bold':
      case 'Courier-Oblique':
        return -230;

      default:
        return -200;
    }
  }

  get lineGap() {
    return 0;
  }

  get unitsPerEm() {
    return 1000;
  }

}

const fontCache = {};
const IGNORED_CODE_POINTS = [173];
const getFontSize = R.pathOr(12, ['attributes', 'fontSize']);

const getOrCreateFont = name => {
  if (fontCache[name]) return fontCache[name];
  const font = new StandardFont(name);
  fontCache[name] = font;
  return font;
};

const getFallbackFont = () => getOrCreateFont('Helvetica');

const shouldFallbackToFont = (codePoint, font) => !IGNORED_CODE_POINTS.includes(codePoint) && !font.hasGlyphForCodePoint(codePoint) && getFallbackFont().hasGlyphForCodePoint(codePoint);

const fontSubstitution = () => ({
  string,
  runs
}) => {
  let lastFont = null;
  let lastIndex = 0;
  let index = 0;
  const res = [];

  for (const run of runs) {
    const fontSize = getFontSize(run);
    const defaultFont = typeof run.attributes.font === 'string' ? getOrCreateFont(run.attributes.font) : run.attributes.font;

    if (string.length === 0) {
      res.push({
        start: 0,
        end: 0,
        attributes: {
          font: defaultFont
        }
      });
      break;
    }

    for (const char of string.slice(run.start, run.end)) {
      const codePoint = char.codePointAt();
      const shouldFallback = shouldFallbackToFont(codePoint, defaultFont);
      const font = shouldFallback ? getFallbackFont() : defaultFont; // If the default font does not have a glyph and the fallback font does, we use it

      if (font !== lastFont) {
        if (lastFont) {
          res.push({
            start: lastIndex,
            end: index,
            attributes: {
              font: lastFont,
              scale: lastFont ? fontSize / lastFont.unitsPerEm : 0
            }
          });
        }

        lastFont = font;
        lastIndex = index;
      }

      index += char.length;
    }
  }

  if (lastIndex < string.length) {
    const fontSize = getFontSize(R.last(runs));
    res.push({
      start: lastIndex,
      end: string.length,
      attributes: {
        font: lastFont,
        scale: lastFont ? fontSize / lastFont.unitsPerEm : 0
      }
    });
  }

  return {
    string,
    runs: res
  };
};

const engines = {
  linebreaker,
  justification,
  textDecoration,
  scriptItemizer,
  wordHyphenation,
  fontSubstitution
};
const engine = layoutEngine(engines);
const layoutOptions = {
  hyphenationCallback: Font$1.getHyphenationCallback(),
  shrinkWhitespaceFactor: {
    before: -0.5,
    after: -0.5
  }
};

const getFragments = instance => {
  if (!instance) return [{
    string: ''
  }];
  const fragments = [];
  const {
    fill = 'black',
    fontFamily = 'Helvetica',
    fontWeight,
    fontStyle,
    fontSize = 18,
    textDecoration,
    textDecorationColor,
    textDecorationStyle,
    textTransform,
    opacity
  } = instance.props;
  const obj = Font$1.getFont({
    fontFamily,
    fontWeight,
    fontStyle
  });
  const font = obj ? obj.data : fontFamily;
  const attributes = {
    font,
    opacity,
    fontSize,
    color: fill,
    underlineStyle: textDecorationStyle,
    underline: textDecoration === 'underline',
    underlineColor: textDecorationColor || fill,
    strike: textDecoration === 'line-through',
    strikeStyle: textDecorationStyle,
    strikeColor: textDecorationColor || fill
  };
  instance.children.forEach(child => {
    if (isTextInstance(child)) {
      fragments.push({
        string: transformText(child.value, textTransform),
        attributes
      });
    } else {
      if (child) {
        fragments.push(...getFragments(child));
      }
    }
  });
  return fragments;
};

const getAttributedString = instance => AttributedString.fromFragments(getFragments(instance));

const AlmostInfinity = 999999999999;

const layoutTspan = node => {
  const attributedString = getAttributedString(node);
  const x = R.pathOr(0, ['props', 'x'], node);
  const y = R.pathOr(0, ['props', 'y'], node);
  const container = {
    x,
    y,
    width: AlmostInfinity,
    height: AlmostInfinity
  };
  const lines = R.compose(R.reduce(R.concat, []), engine)(attributedString, container, layoutOptions);
  return R.assoc('lines', lines, node);
};

const layoutText = R.evolve({
  children: R.map(layoutTspan)
});

/**
 * Checks if node is svg defs
 *
 * @param {Object} node
 * @returns {Boolean} is node svg defs?
 */

const isDefs = R.propEq('type', DEFS);

const getChildren = R.propOr([], 'children');
const getId = R.path(['props', 'id']);
const getDefs = R.compose(R.map(R.prop(0)), R.groupBy(getId), getChildren, R.defaultTo({}), R.find(isDefs), getChildren);

const isNotDefs = R.complement(isDefs);
const detachDefs = R.evolve({
  children: R.filter(isNotDefs)
});
const URL_REGEX = /url\(['"]?#([^'"]+)['"]?\)/;

const replaceDef = defs => R.compose(R.when(R.test(URL_REGEX), R.compose(R.prop(R.__, defs), R.prop(1), R.match(URL_REGEX))), R.defaultTo(''));

const parseNodeDefs = defs => node => R.compose(R.evolve({
  props: R.evolve({
    fill: replaceDef(defs),
    clipPath: replaceDef(defs)
  })
}), R.evolve({
  children: R.map(parseNodeDefs(defs))
}))(node);

const parseDefs = root => {
  const defs = getDefs(root);
  return R.evolve({
    children: R.map(parseNodeDefs(defs))
  }, root);
};

const replaceDefs = R.compose(detachDefs, parseDefs);

const parseViewbox = value => {
  if (!value) return null;
  const values = value.split(/[,\s]+/).map(parseFloat);
  if (values.length !== 4) return null;
  return {
    minX: values[0],
    minY: values[1],
    maxX: values[2],
    maxY: values[3]
  };
};

const getContainer = node => {
  const viewbox = parseViewbox(node.props.viewBox);

  if (viewbox) {
    return {
      width: viewbox.maxX,
      height: viewbox.maxY
    };
  }

  if (node.props.width && node.props.height) {
    return {
      width: parseFloat(node.props.width),
      height: parseFloat(node.props.height)
    };
  }

  return {
    width: 0,
    height: 0
  };
};

const getInheritProps = R.compose(R.pick(SVG_INHERITED_PROPS), R.propOr({}, 'props'));

const inheritProps = node => {
  const props = getInheritProps(node);
  return R.evolve({
    children: R.map(R.compose(inheritProps, R.evolve({
      props: R.merge(props)
    })))
  })(node);
};

const parseAspectRatio = value => {
  const match = value.replace(/[\s\r\t\n]+/gm, ' ').replace(/^defer\s/, '').split(' ');
  const align = match[0] || 'xMidYMid';
  const meetOrSlice = match[1] || 'meet';
  return {
    align,
    meetOrSlice
  };
};

const isRgb = R.test(/rgb/g);
const isRgba = R.test(/rgba/g);
const isHsl = R.test(/hsl/g);
const isHsla = R.test(/hsla/g);
/**
 * Transform rgb color to hexa
 *
 * @param {String} styles value
 * @returns {Object} transformed value
 */

const parseRgb = R.compose(colorString.to.hex, colorString.get.rgb);
/**
 * Transform Hsl color to hexa
 *
 * @param {String} styles value
 * @returns {Object} transformed value
 */

const parseHsl = R.compose(R.toUpper, R.apply(hlsToHex), R.map(Math.round), colorString.get.hsl);
/**
 * Transform given color to hexa
 *
 * @param {String} styles value
 * @returns {Object} transformed value
 */

const transformColor = value => R.cond([[isRgba, parseRgb], [isRgb, parseRgb], [isHsla, parseHsl], [isHsl, parseHsl], [R.T, R.always(value)]])(value);
/**
 * Transform rbg and cmyk colors to hexa
 *
 * @param {Object} styles object
 * @returns {Object} transformed styles
 */

const transformColors = styles => R.map(transformColor, styles);

const STYLE_PROPS = ['width', 'height', 'color', 'stroke', 'strokeWidth', 'opacity', 'fillOpacity', 'strokeOpacity', 'fill', 'fillRule', 'clipPath', 'offset', 'transform', 'strokeLinejoin', 'strokeLinecap', 'strokeDasharray'];
const VERTICAL_PROPS = ['y', 'y1', 'y2', 'height', 'cy', 'ry'];
const HORIZONTAL_PROPS = ['x', 'x1', 'x2', 'width', 'cx', 'rx'];

const transformPercent = container => R.mapObjIndexed((value, key) => {
  const match = matchPercent(value);

  if (match && VERTICAL_PROPS.includes(key)) {
    return match.percent * container.height;
  }

  if (match && HORIZONTAL_PROPS.includes(key)) {
    return match.percent * container.width;
  }

  return value;
});

const parsePercent = value => {
  const match = matchPercent(value);
  return match ? match.percent : parseFloat(value);
};

const parseProps = container => R.compose(R.evolve({
  props: R.o(R.evolve({
    x: parseFloat,
    x1: parseFloat,
    x2: parseFloat,
    y: parseFloat,
    y1: parseFloat,
    y2: parseFloat,
    r: parseFloat,
    rx: parseFloat,
    ry: parseFloat,
    cx: parseFloat,
    cy: parseFloat,
    width: parseFloat,
    height: parseFloat,
    offset: parsePercent,
    fill: transformColor,
    opacity: parsePercent,
    stroke: transformColor,
    stopOpacity: parsePercent,
    stopColor: transformColor
  }), transformPercent(container))
}));

const mergeStyles = node => {
  const style = R.propOr({}, 'style', node);
  return R.evolve({
    props: R.merge(style)
  }, node);
};

const removeNoneValues = R.evolve({
  props: R.map(R.when(R.equals('none'), R.always(null)))
});

const pickStyleProps = node => {
  const styleProps = R.o(R.pick(STYLE_PROPS), R.propOr({}, 'props'))(node);
  return R.evolve({
    style: R.merge(styleProps)
  }, node);
};

const parseSvgProps = R.evolve({
  props: R.evolve({
    width: parseFloat,
    height: parseFloat,
    viewBox: parseViewbox,
    preserveAspectRatio: parseAspectRatio
  })
});

const wrapBetweenTspan = node => ({
  type: 'TSPAN',
  props: {},
  children: [node]
});

const addMissingTspan = R.when(isText, R.evolve({
  children: R.map(R.when(isTextInstance, wrapBetweenTspan))
}));

const resolveSvgNode = container => R.compose(parseProps(container), addMissingTspan, removeNoneValues, mergeStyles);

const resolveChildren = container => node => R.evolve({
  children: R.map(R.compose(resolveChildren(container), resolveSvgNode(container)))
})(node);

const parseText = node => R.ifElse(isText, layoutText, R.evolve({
  children: R.map(parseText)
}))(node);

const resolveSvgRoot = node => {
  const container = getContainer(node);
  return R.compose(replaceDefs, parseText, parseSvgProps, pickStyleProps, inheritProps, resolveChildren(container))(node);
};

const resolveSvg = node => R.compose(R.evolve({
  children: R.map(resolveSvg)
}), R.when(isSvg, resolveSvgRoot))(node);

const getZIndex = R.path(['style', 'zIndex']);
const isType = R.propEq('type');
const shouldNotSort = R.anyPass([isType(DOCUMENT), isType(SVG)]);

const sortZIndex = (a, b) => {
  const za = getZIndex(a);
  const zb = getZIndex(b);
  if (!za && !zb) return 0;
  if (!za) return 1;
  if (!zb) return -1;
  return zb - za;
};
/**
 * Sort children by zIndex value
 *
 * @param {Object} node
 * @returns {Object} node
 */


const resolveZIndex = node => R.compose(R.evolve({
  children: R.map(resolveZIndex)
}), R.unless(shouldNotSort, R.evolve({
  children: R.sort(sortZIndex)
})))(node);

/**
 * Adjust page size given ruler props
 *
 * @param {Object} page
 * @returns {boolean} page with size altered by ruler props
 */

const adjustPageSize = R.compose(R.when(hasVerticalRuler, R.evolve({
  box: {
    height: R.add(RULER_WIDTH)
  },
  children: R.map(R.evolve({
    box: {
      top: R.add(RULER_WIDTH)
    }
  }))
})), R.when(hasHorizontalRuler, R.evolve({
  box: {
    width: R.add(RULER_WIDTH)
  },
  children: R.map(R.evolve({
    box: {
      left: R.add(RULER_WIDTH)
    }
  }))
})));
/**
 * Adjust pages size given ruler props
 *
 * @param {Object} root
 * @returns {boolean} root with pages size altered by ruler props
 */

const resolveRulers = R.evolve({
  children: R.map(adjustPageSize)
});

PNG.isValid = function (data) {
  try {
    return !!new PNG(data);
  } catch (e) {
    return false;
  }
};

// Extracted from https://github.com/devongovett/pdfkit/blob/master/lib/image/jpeg.coffee
const MARKERS = [0xffc0, 0xffc1, 0xffc2, 0xffc3, 0xffc5, 0xffc6, 0xffc7, 0xffc8, 0xffc9, 0xffca, 0xffcb, 0xffcc, 0xffcd, 0xffce, 0xffcf];

class JPEG {
  constructor(data) {
    this.data = null;
    this.width = null;
    this.height = null;
    this.data = data;

    if (data.readUInt16BE(0) !== 0xffd8) {
      throw new Error('SOI not found in JPEG');
    }

    let marker;
    let pos = 2;

    while (pos < data.length) {
      marker = data.readUInt16BE(pos);
      pos += 2;

      if (MARKERS.includes(marker)) {
        break;
      }

      pos += data.readUInt16BE(pos);
    }

    if (!MARKERS.includes(marker)) {
      throw new Error('Invalid JPEG.');
    }

    pos += 3;
    this.height = data.readUInt16BE(pos);
    pos += 2;
    this.width = data.readUInt16BE(pos);
  }

}

JPEG.isValid = function (data) {
  if (!data || !Buffer.isBuffer(data) || data.readUInt16BE(0) !== 0xffd8) {
    return false;
  }

  let marker;
  let pos = 2;

  while (pos < data.length) {
    marker = data.readUInt16BE(pos);
    pos += 2;

    if (MARKERS.includes(marker)) {
      break;
    }

    pos += data.readUInt16BE(pos);
  }

  if (!MARKERS.includes(marker)) {
    return false;
  }

  return true;
};

const createCache = ({
  limit = 100
} = {}) => {
  let cache = {};
  let keys = [];
  return {
    get: key => cache[key],
    set: (key, value) => {
      keys.push(key);

      if (keys.length > limit) {
        delete cache[keys.shift()];
      }

      cache[key] = value;
    },
    reset: () => {
      cache = {};
      keys = [];
    },
    length: () => keys.length
  };
};

const IMAGE_CACHE = createCache({
  limit: 30
});
const getAbsoluteLocalPath = src => {

  const {
    protocol,
    auth,
    host,
    port,
    hostname,
    path: pathname
  } = url.parse(src);
  const absolutePath = path.resolve(pathname);

  if (protocol && protocol !== 'file:' || auth || host || port || hostname) {
    return undefined;
  }

  return absolutePath;
};

const fetchLocalFile = src => new Promise((resolve, reject) => {
  try {

    const absolutePath = getAbsoluteLocalPath(src);

    if (!absolutePath) {
      return reject(new Error(`Cannot fetch non-local path: ${src}`));
    }

    fs.readFile(absolutePath, (err, data) => err ? reject(err) : resolve(data));
  } catch (err) {
    reject(err);
  }
});

const fetchRemoteFile = async (uri, options) => {
  const response = await fetch(uri, options);
  const buffer = await (response.buffer ? response.buffer() : response.arrayBuffer());
  return buffer.constructor.name === 'Buffer' ? buffer : Buffer.from(buffer);
};

const isValidFormat = format => {
  const lower = format.toLowerCase();
  return lower === 'jpg' || lower === 'jpeg' || lower === 'png';
};

const guessFormat = buffer => {
  let format;

  if (JPEG.isValid(buffer)) {
    format = 'jpg';
  } else if (PNG.isValid(buffer)) {
    format = 'png';
  }

  return format;
};

const isCompatibleBase64 = ({
  uri
}) => /^data:image\/[a-zA-Z]*;base64,[^"]*/g.test(uri);

function getImage(body, extension) {
  switch (extension.toLowerCase()) {
    case 'jpg':
    case 'jpeg':
      return new JPEG(body);

    case 'png':
      return new PNG(body);

    default:
      return null;
  }
}

const resolveBase64Image = ({
  uri
}) => {
  const match = /^data:image\/([a-zA-Z]*);base64,([^"]*)/g.exec(uri);
  const format = match[1];
  const data = match[2];

  if (!isValidFormat(format)) {
    throw new Error(`Base64 image invalid format: ${format}`);
  }

  return new Promise(resolve => {
    return resolve(getImage(Buffer.from(data, 'base64'), format));
  });
};

const resolveImageFromData = src => {
  if (src.data && src.format) {
    return new Promise(resolve => resolve(getImage(src.data, src.format)));
  }

  throw new Error(`Invalid data given for local file: ${JSON.stringify(src)}`);
};

const resolveBufferImage = buffer => {
  const format = guessFormat(buffer);

  if (format) {
    return new Promise(resolve => resolve(getImage(buffer, format)));
  }
};

const getImageFormat = body => {
  const isPng = body[0] === 137 && body[1] === 80 && body[2] === 78 && body[3] === 71 && body[4] === 13 && body[5] === 10 && body[6] === 26 && body[7] === 10;
  const isJpg = body[0] === 255 && body[1] === 216 && body[2] === 255;
  let extension = '';

  if (isPng) {
    extension = 'png';
  } else if (isJpg) {
    extension = 'jpg';
  } else {
    throw new Error('Not valid image extension');
  }

  return extension;
};

const resolveImageFromUrl = async src => {
  const {
    uri,
    body,
    headers,
    method = 'GET'
  } = src;
  const data = getAbsoluteLocalPath(uri) ? await fetchLocalFile(uri) : await fetchRemoteFile(uri, {
    body,
    headers,
    method
  });
  const extension = getImageFormat(data);
  return getImage(data, extension);
};

const resolveImage = (src, {
  cache = true
} = {}) => {
  const cacheKey = src.data ? src.data.toString() : src.uri;

  if (cache && IMAGE_CACHE.get(cacheKey)) {
    return IMAGE_CACHE.get(cacheKey);
  }

  let image;

  if (isCompatibleBase64(src)) {
    image = resolveBase64Image(src);
  } else if (Buffer.isBuffer(src)) {
    image = resolveBufferImage(src);
  } else if (typeof src === 'object' && src.data) {
    image = resolveImageFromData(src);
  } else {
    image = resolveImageFromUrl(src);
  }

  if (!image) {
    throw new Error('Cannot resolve image');
  }

  if (cache) {
    IMAGE_CACHE.set(cacheKey, image);
  }

  return image;
};

const isNotNil = R.complement(R.isNil);
/**
 * Takes a list of predicates and returns the first predicate result that returns true for a given list of arguments
 *
 * @param  {...any} predicates
 * @param  {any} value
 */

const firstPass = (...fns) => value => {
  let res;

  for (const fn of fns) {
    res = fn(value);
    if (isNotNil(res)) return res;
  }

  return res;
};

/**
 * Get image source
 *
 * @param {Object} image node
 * @returns {String} image src
 */

const getSource$1 = R.compose(R.when(R.is(String), src => ({
  uri: src
})), firstPass(R.path(['props', 'src']), R.path(['props', 'source']), R.path(['props', 'href'])));

/**
 * Resolves async src if passed
 *
 * @param {string | Function} src
 * @returns {object} resolved src
 */

const resolveSrc = async src => typeof src === 'function' ? {
  uri: await src()
} : src;
/**
 * Fetches image and append data to node
 * Ideally this fn should be immutable.
 *
 * @param {Object} node
 */


const fetchImage = async node => {
  const src = getSource$1(node);
  const {
    cache
  } = node.props;

  if (!src) {
    warning(false, 'Image should receive either a "src" or "source" prop');
    return;
  }

  try {
    const source = await resolveSrc(src);
    node.image = await resolveImage(source, {
      cache
    });
  } catch (e) {
    node.image = {
      width: 0,
      height: 0
    };
    console.warn(e.message);
  }
};

/* eslint-disable no-cond-assign */

const emojis = {};
const regex = emojiRegex();

const reflect = promise => (...args) => promise(...args).then(v => v, e => e); // Returns a function to be able to mock resolveImage.


const makeFetchEmojiImage = () => reflect(resolveImage);
/**
 * When an emoji as no color, it might still have 2 parts,
 * the canonical emoji and an empty string.
 * ex.
 *   (no color) Array.from('❤️') => ["❤", "️"]
 *   (w/ color) Array.from('👍🏿') => ["👍", "🏿"]
 *
 * The empty string needs to be removed otherwise the generated
 * url will be incorect.
 */


const _removeNoColor = x => x !== '️';

const getCodePoints = string => Array.from(string).filter(_removeNoColor).map(char => char.codePointAt(0).toString(16)).join('-');

const buildEmojiUrl = emoji => {
  const {
    url,
    format
  } = Font$1.getEmojiSource();
  return `${url}${getCodePoints(emoji)}.${format}`;
};

const fetchEmojis = string => {
  const emojiSource = Font$1.getEmojiSource();
  if (!emojiSource || !emojiSource.url) return [];
  const promises = [];
  let match;

  while (match = regex.exec(string)) {
    const emoji = match[0];

    if (!emojis[emoji] || emojis[emoji].loading) {
      const emojiUrl = buildEmojiUrl(emoji);
      emojis[emoji] = {
        loading: true
      };
      const fetchEmojiImage = makeFetchEmojiImage();
      promises.push(fetchEmojiImage({
        uri: emojiUrl
      }).then(image => {
        emojis[emoji].loading = false;
        emojis[emoji].data = image.data;
      }));
    }
  }

  return promises;
};
const embedEmojis = fragments => {
  const result = [];

  for (let i = 0; i < fragments.length; i++) {
    const fragment = fragments[i];
    let match;
    let lastIndex = 0;

    while (match = regex.exec(fragment.string)) {
      const index = match.index;
      const emoji = match[0];
      const emojiSize = fragment.attributes.fontSize;
      const chunk = fragment.string.slice(lastIndex, index + match[0].length); // If emoji image was found, we create a new fragment with the
      // correct attachment and object substitution character;

      if (emojis[emoji] && emojis[emoji].data) {
        result.push({
          string: chunk.replace(match, String.fromCharCode(0xfffc)),
          attributes: { ...fragment.attributes,
            attachment: {
              width: emojiSize,
              height: emojiSize,
              yOffset: Math.floor(emojiSize * 0.1),
              image: emojis[emoji].data
            }
          }
        });
      } else {
        // If no emoji data, we just replace the emoji with a nodef char
        result.push({
          string: chunk.replace(match, String.fromCharCode(0)),
          attributes: fragment.attributes
        });
      }

      lastIndex = index + emoji.length;
    }

    if (lastIndex < fragment.string.length) {
      result.push({
        string: fragment.string.slice(lastIndex),
        attributes: fragment.attributes
      });
    }
  }

  return result;
};

/**
 * Get all asset promises that need to be resolved
 *
 * @param {Object} root node
 * @returns {Array} asset promises
 */

const fetchAssets = node => {
  const promises = [];
  const listToExplore = node.children.slice(0);

  while (listToExplore.length > 0) {
    const node = listToExplore.shift();

    if (isImage(node)) {
      promises.push(fetchImage(node));
    }

    if (node.style && node.style.fontFamily) {
      promises.push(Font$1.load(node.style));
    }

    if (typeof node === 'string') {
      promises.push(...fetchEmojis(node));
    }

    if (typeof node.value === 'string') {
      promises.push(...fetchEmojis(node.value));
    }

    if (node.children) {
      node.children.forEach(childNode => {
        listToExplore.push(childNode);
      });
    }
  }

  return promises;
};
/**
 * Fetch image, font and emoji assets in parallel.
 * Layout process will not be resumed until promise resolves.
 *
 * @param {Object} root node
 * @returns {Object} root node
 */


const resolveAssets = node => R.compose(R.then(R.always(node)), p => Promise.all(p), fetchAssets)(node);

/**
 * Checks if value is not an array
 *
 * @param {any} value
 * @returns {Boolean} isn't value an array
 */

const isNotArray = R.complement(R.is(Array));
/**
 * Casts value to array
 *
 * @param {any} value
 * @returns {Array} casted value
 */

const castArray = R.when(isNotArray, v => [v]);

/**
 * Remove nil values from array
 *
 * @param {Array} array
 * @returns {Array} array without nils
 */

const compact = R.filter(Boolean);
/**
 * Checks if value is array
 *
 * @param {any} value
 * @returns {Boolean} is value an array
 */

const isArray = R.is(Array);
/**
 * Merges style objects array
 *
 * @param {Array} style objects array
 * @returns {Object} merged style object
 */

const mergeStyles$1 = styles => styles.reduce((acc, style) => {
  const s = isArray(style) ? flatten(style) : style;
  Object.keys(s).forEach(key => {
    if (s[key] !== null && s[key] !== undefined) {
      acc[key] = s[key];
    }
  });
  return acc;
}, {});
/**
 * Flattens an array of style objects, into one aggregated style object.
 *
 * @param {Array} style objects array
 * @returns {Object} flatted style object
 */


const flatten = R.compose(mergeStyles$1, compact, castArray);

const hasOwnProperty = Object.prototype.hasOwnProperty;
/**
 * Expand rules
 */

const styleShorthands = {
  margin: {
    marginTop: true,
    marginRight: true,
    marginBottom: true,
    marginLeft: true
  },
  marginHorizontal: {
    marginLeft: true,
    marginRight: true
  },
  marginVertical: {
    marginTop: true,
    marginBottom: true
  },
  padding: {
    paddingTop: true,
    paddingRight: true,
    paddingBottom: true,
    paddingLeft: true
  },
  paddingHorizontal: {
    paddingLeft: true,
    paddingRight: true
  },
  paddingVertical: {
    paddingTop: true,
    paddingBottom: true
  },
  border: {
    borderTopColor: true,
    borderTopStyle: true,
    borderTopWidth: true,
    borderRightColor: true,
    borderRightStyle: true,
    borderRightWidth: true,
    borderBottomColor: true,
    borderBottomStyle: true,
    borderBottomWidth: true,
    borderLeftColor: true,
    borderLeftStyle: true,
    borderLeftWidth: true
  },
  borderTop: {
    borderTopColor: true,
    borderTopStyle: true,
    borderTopWidth: true
  },
  borderRight: {
    borderRightColor: true,
    borderRightStyle: true,
    borderRightWidth: true
  },
  borderBottom: {
    borderBottomColor: true,
    borderBottomStyle: true,
    borderBottomWidth: true
  },
  borderLeft: {
    borderLeftColor: true,
    borderLeftStyle: true,
    borderLeftWidth: true
  },
  borderColor: {
    borderTopColor: true,
    borderRightColor: true,
    borderBottomColor: true,
    borderLeftColor: true
  },
  borderRadius: {
    borderTopLeftRadius: true,
    borderTopRightRadius: true,
    borderBottomRightRadius: true,
    borderBottomLeftRadius: true
  },
  borderStyle: {
    borderTopStyle: true,
    borderRightStyle: true,
    borderBottomStyle: true,
    borderLeftStyle: true
  },
  borderWidth: {
    borderTopWidth: true,
    borderRightWidth: true,
    borderBottomWidth: true,
    borderLeftWidth: true
  },
  objectPosition: {
    objectPositionX: true,
    objectPositionY: true
  },
  transformOrigin: {
    transformOriginX: true,
    transformOriginY: true
  },
  flex: {
    flexGrow: true,
    flexShrink: true,
    flexBasis: true
  }
};
/**
 * Expand the shorthand properties to isolate every declaration from the others.
 *
 * @param { Object } style object
 * @returns { Object } expanded style object
 */

const expandStyles = style => {
  if (!style) return style;
  const propsArray = Object.keys(style);
  const resolvedStyle = {};

  for (let i = 0; i < propsArray.length; i++) {
    const key = propsArray[i];
    const value = style[key];

    if (styleShorthands[key]) {
      const expandedProps = styleShorthands[key];

      for (const propName in expandedProps) {
        if (hasOwnProperty.call(expandedProps, propName)) {
          resolvedStyle[propName] = value;
        }
      }
    } else {
      resolvedStyle[key] = value;
    }
  }

  return resolvedStyle;
};

const MM_FACTOR = 1 / 25.4 * DPI;
const CM_FACTOR = 1 / 2.54 * DPI;
/**
 * Parses scalar value in value and unit pairs
 *
 * @param {String} scalar value
 * @returns {Object} parsed value
 */

const parseValue = value => {
  const match = /^(-?\d*\.?\d+)(in|mm|cm|pt|vh|vw|px)?$/g.exec(value);
  return match ? {
    value: parseFloat(match[1], 10),
    unit: match[2] || 'pt'
  } : {
    value,
    unit: undefined
  };
};
/**
 * Transform given scalar value
 *
 * @param {Object} container
 * @param {String} styles value
 * @returns {Object} transformed value
 */


const transformUnit = R.curryN(2, (container, value) => {
  const scalar = parseValue(value);

  switch (scalar.unit) {
    case 'in':
      return scalar.value * DPI;

    case 'mm':
      return scalar.value * MM_FACTOR;

    case 'cm':
      return scalar.value * CM_FACTOR;

    case 'vh':
      return scalar.value * (container.height / 100);

    case 'vw':
      return scalar.value * (container.width / 100);

    default:
      return scalar.value;
  }
});
/**
 * Transform units on given styles object.
 * Container is given to calculate vh and vw
 *
 * @param {Object} container
 * @param {Object} styles object
 * @returns {Object} transformed styles
 */

const transformUnits = (container, styles) => R.map(transformUnit(container), styles);

var transformUnits$1 = R.curryN(2, transformUnits);

/**
 * Resolves media queries in styles object
 *
 * @param {Object} container
 * @param {Object} styles object
 */

const resolveMediaQueries = (container, styles) => {
  return Object.keys(styles).reduce((acc, key) => {
    if (/@media/.test(key)) {
      return { ...acc,
        ...matchMedia({
          [key]: styles[key]
        }, container)
      };
    }

    return { ...acc,
      [key]: styles[key]
    };
  }, {});
};

var resolveMediaQueries$1 = R.curryN(2, resolveMediaQueries);

const LINK_STYLES = {
  color: 'blue',
  textDecoration: 'underline'
};
/**
 * Filter styles with `none` value
 *
 * @param {Object} style object
 * @returns {Object} style without none values
 */

const filterNoneValues = R.reject(R.equals('none'));
/**
 * Resolves styles
 *
 * @param {Object} container
 * @param {Object} node
 * @param {Object} style object
 * @returns {Object} resolved style object
 */

const resolveStyles = container => R.compose(transformUnits$1(container), transformColors, transformStyles, expandStyles, resolveMediaQueries$1(container), filterNoneValues, flatten);
/**
 * Resolves node styles
 *
 * @param {Object} container
 * @param {Object} document node
 * @returns {Object} node (and subnodes) with resolved styles
 */


const resolveNodeStyles = container => node => R.o(R.when(isLink, R.evolve({
  style: R.merge(LINK_STYLES)
})), R.evolve({
  style: resolveStyles(container),
  children: R.map(resolveNodeStyles(container))
}))(node);
/**
 * Resolves page styles
 *
 * @param {Object} document page
 * @returns {Object} document page with resolved styles
 */


const resolvePageStyles = page => {
  const box = R.prop('box', page);
  const style = R.prop('style', page);
  const container = R.isEmpty(box) ? style : box;
  return R.evolve({
    style: resolveStyles(container),
    children: R.map(resolveNodeStyles(container))
  })(page);
};
/**
 * Resolves root styles
 *
 * @param {Object} document root
 * @returns {Object} document root with resolved styles
 */


var resolveStyles$1 = R.evolve({
  children: R.map(resolvePageStyles)
});

const getTransformStyle = s => R.pathOr('50%', ['style', s]);
/**
 * Get node origin
 *
 * @param {Object} node
 * @returns {Object} node origin
 */


const getOrigin = node => {
  if (!node.box) return {};
  const {
    left,
    top,
    width,
    height
  } = node.box;
  const transformOriginX = getTransformStyle('transformOriginX')(node);
  const transformOriginY = getTransformStyle('transformOriginY')(node);
  const percentX = matchPercent(transformOriginX);
  const percentY = matchPercent(transformOriginY);
  const offsetX = percentX ? width * percentX.percent : transformOriginX;
  const offsetY = percentY ? height * percentY.percent : transformOriginY;
  return {
    left: left + offsetX,
    top: top + offsetY
  };
};

/**
 * Resolve node origin
 *
 * @param {Object} node
 * @returns {Object} node with origin attribute
 */

const resolveNodeOrigin = node => R.compose(R.evolve({
  children: R.map(resolveNodeOrigin)
}), R.converge(R.assoc('origin'), [getOrigin, R.identity]))(node);
/**
 * Resolve document origins
 *
 * @param {Object} document root
 * @returns {Object} documrnt root
 */


const resolveOrigin = R.evolve({
  children: R.map(resolveNodeOrigin)
});

const VALID_ORIENTATIONS = [PORTRAIT, LANDSCAPE];
/**
 * Get page orientation. Defaults to landscape
 *
 * @param { Object } page object
 * @returns { String } page orientation
 */

const getOrientation = R.compose(R.ifElse(R.includes(R.__, VALID_ORIENTATIONS), R.identity, R.always(PORTRAIT)), R.pathOr(PORTRAIT, ['props', 'orientation']));

const isLandscape = R.compose(R.equals(LANDSCAPE), getOrientation);

/**
 * Transforms array into size object
 *
 * @param {Array} array
 * @returns {Object} size object with width and height
 */

const toSizeObject = R.applySpec({
  width: R.prop(0),
  height: R.prop(1)
});
/**
 * Flip size object
 *
 * @param {Object} size object
 * @returns {Object} flipped size object
 */

const flipSizeObject = R.applySpec({
  width: R.prop('height'),
  height: R.prop('width')
});
/**
 * Returns size object from a given string
 *
 * @param {String} page size string
 * @returns {Object} size object with width and height
 */

const getStringSize = R.compose(toSizeObject, R.prop(R.__, PAGE_SIZES), R.toUpper);
/**
 * Returns size object from a single number
 *
 * @param {Number} page size number
 * @returns {Object} size object with width and height
 */

const getNumberSize = R.compose(toSizeObject, v => [v]);
/**
 * Throws invalid size error
 *
 * @param {String} invalid page size input
 */

const throwInvalidError = size => {
  throw new Error(`Invalid Page size: ${JSON.stringify(size)}`);
};
/**
 * Return page size in an object { width, height }
 *
 * @param {Object} page instance
 * @returns {Object} size object with width and height
 */


const getSize = page => {
  const size = R.compose(R.cond([[R.is(String), getStringSize], [R.is(Array), toSizeObject], [R.is(Number), getNumberSize], [R.is(Object), R.identity], [R.T, throwInvalidError]]), R.pathOr('A4', ['props', 'size']))(page);
  return isLandscape(page) ? flipSizeObject(size) : size;
};

/**
 * Add empt box prop if not present in node
 *
 * @param {Object} node
 * @returns {Object} node with box prop
 */

const assocIfNil = (key, value, target) => R.when(R.compose(R.isNil, R.prop(key)), R.assoc(key, value))(target);

var assocIfNil$1 = R.curryN(3, assocIfNil);

/**
 * Resolves page size
 *
 * @param {Object} page
 * @returns {Object} page with resolved size in style attribute
 */

const resolvePageSize = page => {
  const size = getSize(page);
  return R.evolve({
    style: R.merge(R.__, size)
  })(page);
};
/**
 * Resolves page sizes
 *
 * @param {Object} document root
 * @returns {Object} document root with resolved page sizes
 */

const resolvePageSizes = R.evolve({
  children: R.map(R.compose(resolvePageSize, assocIfNil$1('style', {})))
});

/**
 * Get line index at given height
 *
 * @param {Object} node
 * @param {Number} height
 */
const lineIndexAtHeight = (node, height) => {
  let y = 0;
  if (!node.lines) return 0;

  for (let i = 0; i < node.lines.length; i++) {
    const line = node.lines[i];
    if (y + line.box.height > height) return i;
    y += line.box.height;
  }

  return node.lines.length;
};

/**
 * Get height for given text line index
 *
 * @param {Object} node
 * @param {Number} index
 */
const heightAtLineIndex = (node, index) => {
  let counter = 0;
  if (!node.lines) return counter;

  for (let i = 0; i < index; i++) {
    const line = node.lines[i];
    if (!line) break;
    counter += line.box.height;
  }

  return counter;
};

const zero = R.always(0);
const getTop = R.pathOr(0, ['box', 'top']);
const getWidows = R.pathOr(2, ['props', 'widows']);
const getOrphans = R.pathOr(2, ['props', 'orphans']);

const getLineBreak = (node, height) => {
  const top = getTop(node);
  const widows = getWidows(node);
  const orphans = getOrphans(node);
  const linesQuantity = node.lines.length;
  const slicedLine = lineIndexAtHeight(node, height - top);

  if (slicedLine === 0) {
    return 0;
  } else if (linesQuantity < orphans) {
    return linesQuantity;
  } else if (slicedLine < orphans || linesQuantity < orphans + widows) {
    return 0;
  } else if (linesQuantity === orphans + widows) {
    return orphans;
  } else if (linesQuantity - slicedLine < widows) {
    return linesQuantity - widows;
  }

  return slicedLine;
};

const splitText = (node, height) => {
  const slicedLineIndex = getLineBreak(node, height);
  const currentHeight = heightAtLineIndex(node, slicedLineIndex);
  const nextHeight = node.box.height - currentHeight;
  const current = R.evolve({
    lines: R.slice(0, slicedLineIndex),
    style: R.evolve({
      marginBottom: zero,
      paddingBottom: zero,
      borderBottomWidth: zero,
      borderBottomLeftRadius: zero,
      borderBottomRightRadius: zero
    }),
    box: {
      height: R.always(currentHeight),
      borderBottomWidth: zero
    }
  }, node);
  const next = R.evolve({
    lines: R.slice(slicedLineIndex, Infinity),
    style: R.evolve({
      marginTop: zero,
      paddingTop: zero,
      borderTopWidth: zero,
      borderTopLeftRadius: zero,
      borderTopRightRadius: zero
    }),
    box: {
      top: zero,
      height: R.always(nextHeight),
      borderTopWidth: zero
    }
  }, node);
  return [current, next];
};

const zero$1 = R.always(0);
const getTop$1 = R.pathOr(0, ['box', 'top']);
const hasFixedHeight = R.hasPath(['style', 'height']);

const subtractHeight = value => R.o(R.subtract(R.__, value), R.path(['box', 'height']));

const splitNode = (node, height) => {
  if (!node) return [null, null];
  const nodeTop = getTop$1(node); // TODO: We should keep style untouched

  const current = R.evolve({
    style: R.evolve({
      marginBottom: zero$1,
      paddingBottom: zero$1,
      borderBottomWidth: zero$1,
      borderBottomLeftRadius: zero$1,
      borderBottomRightRadius: zero$1
    }),
    box: {
      height: R.always(height - nodeTop),
      borderBottomWidth: zero$1
    }
  })(node);
  const nextHeight = R.ifElse(hasFixedHeight, subtractHeight(height - nodeTop), R.always(null))(node); // TODO: We should keep style untouched

  const next = R.evolve({
    style: R.evolve({
      marginTop: zero$1,
      paddingTop: zero$1,
      borderTopWidth: zero$1,
      borderTopLeftRadius: zero$1,
      borderTopRightRadius: zero$1
    }),
    box: {
      top: zero$1,
      height: R.always(nextHeight),
      borderTopWidth: zero$1
    }
  })(node);
  return [current, next];
};

const isString = R.is(String);
const isNumber$1 = R.is(Number);
const isNotString = R.complement(isString);
/**
 * Transforms a react element instance to internal element format
 *
 * @param {Object} React element
 * @returns {Object} parsed react element
 */

const createInstance = element => {
  if (isString(element) || isNumber$1(element)) return {
    type: TEXT_INSTANCE,
    value: `${element}`
  };
  if (isNotString(element.type)) return createInstance(element.type(element.props));
  const {
    type,
    props: {
      style = {},
      children = [],
      ...props
    }
  } = element;
  const nextChildren = R.compose(R.map(createInstance), castArray)(children);
  return {
    type,
    style,
    props,
    box: {},
    children: nextChildren
  };
};

/**
 * Get many nodes height
 *
 * @param {Array} nodes
 * @return {number} nodes height
 */

const getNodesHeight = nodes => {
  let max = 0;
  let min = Infinity;
  if (R.isEmpty(nodes)) return 0;

  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    min = Math.min(min, node.box.top);
    max = Math.max(max, node.box.top + node.box.height);
  }

  return max - min;
};

const getWrap = R.ifElse(R.anyPass([isSvg, isNote, isImage, isCanvas]), R.always(false), R.pathOr(true, ['props', 'wrap']));
const getBreak = R.pathOr(false, ['props', 'break']);
const getMinPresenceAhead = R.path(['props', 'minPresenceAhead']);

const defaultPresenceAhead = element => height => Math.min(element.box.height, height);

const getPresenceAhead = (elements, height) => {
  let result = 0;

  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    if (!element.box) continue;
    const isElementInside = height > element.box.top;
    const presenceAhead = element.props.presenceAhead || defaultPresenceAhead(element);

    if (element && isElementInside) {
      result += presenceAhead(height - element.box.top);
    }
  }

  return result;
};

const shouldBreak = (child, futureElements, height) => {
  const minPresenceAhead = getMinPresenceAhead(child);
  const presenceAhead = getPresenceAhead(futureElements, height);
  const futureHeight = getNodesHeight(futureElements);
  const shouldSplit = height < child.box.top + child.box.height;
  const shouldWrap = getWrap(child);
  return getBreak(child) || !shouldWrap && shouldSplit || minPresenceAhead < futureHeight && presenceAhead < minPresenceAhead;
};

const getComputedPadding = edge => node => {
  const yogaNode = node._yogaNode;
  return yogaNode ? yogaNode.getComputedPadding(edge) : null;
};
/**
 * Get Yoga computed paddings. Zero otherwise
 *
 * @param {Object} node
 * @return {Object} paddings
 */


const getPadding = R.applySpec({
  paddingTop: firstPass(getComputedPadding(Yoga.EDGE_TOP), R.path(['box', 'paddingTop']), R.path(['style', 'paddingTop']), R.path(['style', 'paddingVertical']), R.path(['style', 'padding']), R.always(0)),
  paddingRight: firstPass(getComputedPadding(Yoga.EDGE_RIGHT), R.path(['box', 'paddingRight']), R.path(['style', 'paddingRight']), R.path(['style', 'paddingHorizontal']), R.path(['style', 'padding']), R.always(0)),
  paddingBottom: firstPass(getComputedPadding(Yoga.EDGE_BOTTOM), R.path(['box', 'paddingBottom']), R.path(['style', 'paddingBottom']), R.path(['style', 'paddingVertical']), R.path(['style', 'padding']), R.always(0)),
  paddingLeft: firstPass(getComputedPadding(Yoga.EDGE_LEFT), R.path(['box', 'paddingLeft']), R.path(['style', 'paddingLeft']), R.path(['style', 'paddingHorizontal']), R.path(['style', 'padding']), R.always(0))
});

const getContentArea = page => {
  const {
    paddingTop
  } = getPadding(page);
  const height = R.path(['style', 'height'], page);
  return height - paddingTop;
};

const IGNORABLE_CODEPOINTS = [8232, // LINE_SEPARATOR
8233];

const buildSubsetForFont = font => IGNORABLE_CODEPOINTS.reduce((acc, codePoint) => {
  if (font.hasGlyphForCodePoint && font.hasGlyphForCodePoint(codePoint)) {
    return acc;
  }

  return [...acc, String.fromCharCode(codePoint)];
}, []);

const ignoreChars = fragments => fragments.map(fragment => {
  const charSubset = buildSubsetForFont(fragment.attributes.font);
  const subsetRegex = new RegExp(charSubset.join('|'));
  return {
    string: fragment.string.replace(subsetRegex, ''),
    attributes: fragment.attributes
  };
});

const PREPROCESSORS = [ignoreChars, embedEmojis];
/**
 * Get textkit framgents of given node object
 *
 * @param {Object} instance node
 * @returns {Array} text fragments
 */

const getFragments$1 = instance => {
  if (!instance) return [{
    string: ''
  }];
  let fragments = [];
  const {
    color = 'black',
    backgroundColor,
    fontFamily = 'Helvetica',
    fontWeight,
    fontStyle,
    fontSize = 18,
    textAlign = 'left',
    lineHeight,
    textDecoration,
    textDecorationColor,
    textDecorationStyle,
    textTransform,
    letterSpacing,
    textIndent,
    opacity
  } = instance.style;
  const obj = Font$1.getFont({
    fontFamily,
    fontWeight,
    fontStyle
  });
  const font = obj ? obj.data : fontFamily;
  const attributes = {
    font,
    color,
    opacity,
    fontSize,
    backgroundColor,
    align: textAlign,
    indent: textIndent,
    link: instance.src,
    characterSpacing: letterSpacing,
    underlineStyle: textDecorationStyle,
    underline: textDecoration === 'underline',
    underlineColor: textDecorationColor || color,
    strike: textDecoration === 'line-through',
    strikeStyle: textDecorationStyle,
    strikeColor: textDecorationColor || color,
    lineHeight: lineHeight ? lineHeight * fontSize : null
  };
  instance.children.forEach(child => {
    if (isImage(child)) {
      fragments.push({
        string: String.fromCharCode(0xfffc),
        attributes: { ...attributes,
          attachment: {
            width: child.style.width || fontSize,
            height: child.style.height || fontSize,
            image: child.image.data
          }
        }
      });
    } else if (isTextInstance(child)) {
      fragments.push({
        string: transformText(child.value, textTransform),
        attributes
      });
    } else {
      if (child) {
        fragments.push(...getFragments$1(child));
      }
    }
  });

  for (const preprocessor of PREPROCESSORS) {
    fragments = preprocessor(fragments);
  }

  return fragments;
};
/**
 * Get textkit attributed string from text node
 *
 * @param {Object} instance node
 * @returns {Object} attributed string
 */


const getAttributedString$1 = instance => AttributedString.fromFragments(getFragments$1(instance));

const engines$1 = {
  linebreaker,
  justification,
  textDecoration,
  scriptItemizer,
  wordHyphenation,
  fontSubstitution
};
const engine$1 = layoutEngine(engines$1);
/**
 * Get layout container for specific text node
 *
 * @param {Object} node
 * @param {Number} width
 * @param {Number} height
 * @returns {Object} layout container
 */

const getContainer$1 = (node, width, height) => {
  const maxLines = R.path(['style', 'maxLines'], node);
  const textOverflow = R.path(['style', 'textOverflow'], node);
  return {
    x: 0,
    y: 0,
    width,
    maxLines,
    height: height || Infinity,
    truncateMode: textOverflow
  };
};
/**
 * Get text layout options for specific text node
 *
 * @param {Object} node instance
 * @returns {Object} layout options
 */


const getLayoutOptions = node => ({
  hyphenationPenalty: node.props.hyphenationPenalty,
  hyphenationCallback: Font$1.getHyphenationCallback(),
  shrinkWhitespaceFactor: {
    before: -0.5,
    after: -0.5
  }
});
/**
 * Get text lines for given node
 *
 * @param {Object} node
 * @param {Number} container width
 * @param {Number} container height
 * @returns {Array} layout lines
 */


const layoutText$1 = R.compose(R.reduce(R.concat, []), R.converge(engine$1, [getAttributedString$1, getContainer$1, getLayoutOptions]));

const isNotSvg = R.complement(isSvg);

const hasLines = node => node.props.fixed ? !R.isEmpty(node.lines) : !!node.lines;

const shouldLayoutText = node => isText(node) && !hasLines(node);
/**
 * Performs text layout on text node if wasn't calculated before.
 * Text layout is usually performed on Yoga's layout process (via setMeasureFunc),
 * but we need to layout those nodes with fixed width and height.
 *
 * @param {Object} node
 * @returns {Object} layouted node
 */


const resolveTextLayout = node => R.compose(R.evolve({
  children: R.map(R.when(isNotSvg, resolveTextLayout))
}), R.when(shouldLayoutText, R.compose(R.converge(R.assoc('lines'), [R.converge(layoutText$1, [R.identity, R.path(['box', 'width']), R.path(['box', 'height'])]), R.identity]))))(node);

/**
 * Get styles sub group of inherited properties
 *
 * @param {Object} style object
 * @returns {Object} style object only with inherited properties
 */

const getInheritStyles = R.compose(R.pick(INHERITED_PROPERTIES), R.propOr({}, 'style'));
/**
 * Merges styles with node
 *
 * @param {Object} style object
 * @param {Object} node
 * @returns {Object} node with styles merged
 */

const mergeStyles$2 = styles => R.evolve({
  style: R.merge(styles)
});
/**
 * Inherit style values from the root to the leafs
 *
 * @param {Object} document root
 * @returns {Object} document root with inheritance
 *
 */


const resolveInheritance = node => {
  if (isSvg(node)) return node;
  const inheritStyles = getInheritStyles(node);
  return R.evolve({
    children: R.map(R.compose(resolveInheritance, mergeStyles$2(inheritStyles)))
  })(node);
};

const getComputedMargin = edge => node => {
  const yogaNode = node._yogaNode;
  return yogaNode ? yogaNode.getComputedMargin(edge) : null;
};
/**
 * Get Yoga computed magins. Zero otherwise
 *
 * @param {Object} node
 * @return {Object} margins
 */


const getMargin = R.applySpec({
  marginTop: firstPass(getComputedMargin(Yoga.EDGE_TOP), R.path(['box', 'marginTop']), R.path(['style', 'marginTop']), R.path(['style', 'marginVertical']), R.path(['style', 'margin']), R.always(0)),
  marginRight: firstPass(getComputedMargin(Yoga.EDGE_RIGHT), R.path(['box', 'marginRight']), R.path(['style', 'marginRight']), R.path(['style', 'marginHorizontal']), R.path(['style', 'margin']), R.always(0)),
  marginBottom: firstPass(getComputedMargin(Yoga.EDGE_BOTTOM), R.path(['box', 'marginBottom']), R.path(['style', 'marginBottom']), R.path(['style', 'marginVertical']), R.path(['style', 'margin']), R.always(0)),
  marginLeft: firstPass(getComputedMargin(Yoga.EDGE_LEFT), R.path(['box', 'marginLeft']), R.path(['style', 'marginLeft']), R.path(['style', 'marginHorizontal']), R.path(['style', 'margin']), R.always(0))
});

const getTop$2 = yogaNode => yogaNode ? yogaNode.getComputedTop() : 0;

const getRight = yogaNode => yogaNode ? yogaNode.getComputedRight() : 0;

const getBottom = yogaNode => yogaNode ? yogaNode.getComputedBottom() : 0;

const getLeft = yogaNode => yogaNode ? yogaNode.getComputedLeft() : 0;
/**
 * Get Yoga computed position. Zero otherwise
 *
 * @param {Object} node
 * @return {Object} position
 */


const getPosition = node => {
  const yogaNode = node._yogaNode;
  return R.applySpec({
    top: getTop$2,
    right: getRight,
    bottom: getBottom,
    left: getLeft
  })(yogaNode);
};

const DEFAULT_DIMENSION = {
  width: 0,
  height: 0
};
/**
 * Get Yoga computed dimensions. Zero otherwise
 *
 * @param {Object} node
 * @return {Object} dimensions
 */

const getDimension = node => {
  const yogaNode = node._yogaNode;
  if (!yogaNode) return DEFAULT_DIMENSION;
  return {
    width: yogaNode.getComputedWidth(),
    height: yogaNode.getComputedHeight()
  };
};

const getComputedBorder = edge => yogaNode => yogaNode ? yogaNode.getComputedBorder(edge) : 0;
/**
 * Get Yoga computed border width. Zero otherwise
 *
 * @param {Object} node
 * @return {Object} border widths
 */


const getBorderWidth = node => {
  const yogaNode = node._yogaNode;
  return R.applySpec({
    borderTopWidth: getComputedBorder(Yoga.EDGE_TOP),
    borderRightWidth: getComputedBorder(Yoga.EDGE_RIGHT),
    borderBottomWidth: getComputedBorder(Yoga.EDGE_BOTTOM),
    borderLeftWidth: getComputedBorder(Yoga.EDGE_LEFT)
  })(yogaNode);
};

/**
 * Set display attribute to node's Yoga instance
 *
 * @param {String} display
 * @param {Object} node instance
 * @return {Object} node instance
 */

const setDisplay = value => R.tap(node => {
  const yogaNode = node._yogaNode;

  if (yogaNode) {
    yogaNode.setDisplay(value === 'none' ? Yoga.DISPLAY_NONE : Yoga.DISPLAY_FLEX);
  }
});

/**
 * Set overflow attribute to node's Yoga instance
 *
 * @param {String} overflow value
 * @param {Object} node instance
 * @return {Object} node instance
 */

const setOverflow = value => R.tap(node => {
  const yogaNode = node._yogaNode;

  if (!R.isNil(value) && yogaNode) {
    const yogaValue = R.cond([[R.equals('hidden'), R.always(Yoga.OVERFLOW_HIDDEN)], [R.equals('scroll'), R.always(Yoga.OVERFLOW_SCROLL)], [R.T, R.always(Yoga.OVERFLOW_VISIBLE)]])(value);
    yogaNode.setOverflow(yogaValue);
  }
});

/**
 * Set flex wrap attribute to node's Yoga instance
 *
 * @param {String} flex wrap value
 * @param {Object} node instance
 * @return {Object} node instance
 */

const setFlexWrap = value => R.tap(node => {
  const yogaNode = node._yogaNode;

  if (yogaNode) {
    const yogaValue = R.cond([[R.equals('wrap'), R.always(Yoga.WRAP_WRAP)], [R.equals('wrap-reverse'), R.always(Yoga.WRAP_WRAP_REVERSE)], [R.T, R.always(Yoga.WRAP_NO_WRAP)]])(value);
    yogaNode.setFlexWrap(yogaValue);
  }
});

const isNotNil$1 = R.complement(R.isNil);
/**
 * Set generic yoga attribute to node's Yoga instance, handing `auto`, edges and percentage cases
 *
 * @param {String} property
 * @param {Number} edge
 * @param {any} value
 * @param {Object} node instance
 * @return {Object} node instance
 */

const setYogaValue = (attr, edge) => value => R.tap(node => {
  const yogaNode = node._yogaNode;

  if (!R.isNil(value) && yogaNode) {
    const hasEdge = isNotNil$1(edge);
    const fixedMethod = `set${upperFirst$1(attr)}`;
    const autoMethod = `${fixedMethod}Auto`;
    const percentMethod = `${fixedMethod}Percent`;
    const percent = matchPercent(value);

    if (percent && !yogaNode[percentMethod]) {
      throw new Error(`You can't pass percentage values to ${attr} property`);
    }

    if (percent) {
      hasEdge ? yogaNode[percentMethod](edge, percent.value) : yogaNode[percentMethod](percent.value);
    } else if (value === 'auto') {
      hasEdge ? yogaNode[autoMethod](edge) : yogaNode[autoMethod]();
    } else {
      hasEdge ? yogaNode[fixedMethod](edge, value) : yogaNode[fixedMethod](value);
    }
  }
});

/**
 * Set flex grow attribute to node's Yoga instance
 *
 * @param {Number} flex grow value
 * @param {Object} node instance
 * @return {Object} node instance
 */

const setFlexGrow = R.compose(setYogaValue('flexGrow'), R.defaultTo(0));

/**
 * Set flex basis attribute to node's Yoga instance
 *
 * @param {Number} flex basis value
 * @param {Object} node instance
 * @return {Object} node instance
 */

const setFlexBasis = setYogaValue('flexBasis');

/**
 * Set generic align attribute to node's Yoga instance
 *
 * @param {String} specific align property
 * @param {String} align value
 * @param {Object} node instance
 * @return {Object} node instance
 */

const setAlign = attr => value => R.tap(node => {
  const yogaNode = node._yogaNode;

  if (yogaNode) {
    const yogaValue = R.cond([[R.equals('flex-start'), R.always(Yoga.ALIGN_FLEX_START)], [R.equals('center'), R.always(Yoga.ALIGN_CENTER)], [R.equals('flex-end'), R.always(Yoga.ALIGN_FLEX_END)], [R.equals('stretch'), R.always(Yoga.ALIGN_STRETCH)], [R.equals('baseline'), R.always(Yoga.ALIGN_BASELINE)], [R.equals('space-between'), R.always(Yoga.ALIGN_SPACE_BETWEEN)], [R.equals('space-around'), R.always(Yoga.ALIGN_SPACE_AROUND)], [R.T, R.always(attr === 'items' ? Yoga.ALIGN_STRETCH : Yoga.ALIGN_AUTO)]])(value);
    yogaNode[`setAlign${upperFirst$1(attr)}`](yogaValue);
  }
});

/**
 * Set align self attribute to node's Yoga instance
 *
 * @param {String} align value
 * @param {Object} node instance
 * @return {Object} node instance
 */

const setAlignSelf = setAlign('self');

/**
 * Set align items attribute to node's Yoga instance
 *
 * @param {String} align value
 * @param {Object} node instance
 * @return {Object} node instance
 */

const setAlignItems = setAlign('items');

/**
 * Set flex shrink attribute to node's Yoga instance
 *
 * @param {Number} flex shrink value
 * @param {Object} node instance
 * @return {Object} node instance
 */

const setFlexShrink = R.compose(setYogaValue('flexShrink'), R.defaultTo(1));

/**
 * Set aspect ratio attribute to node's Yoga instance
 *
 * @param {Number} ratio
 * @param {Object} node instance
 * @return {Object} node instance
 */

const setAspectRatio = value => R.tap(node => {
  const yogaNode = node._yogaNode;

  if (!R.isNil(value) && yogaNode) {
    yogaNode.setAspectRatio(value);
  }
});

/**
 * Set align content attribute to node's Yoga instance
 *
 * @param {String} align value
 * @param {Object} node instance
 * @return {Object} node instance
 */

const setAlignContent = setAlign('content');

/**
 * Set position type attribute to node's Yoga instance
 *
 * @param {String} position type
 * @param {Object} node instance
 * @return {Object} node instance
 */

const setPositionType = value => R.tap(node => {
  const yogaNode = node._yogaNode;

  if (!R.isNil(value) && yogaNode) {
    yogaNode.setPositionType(value === 'absolute' ? Yoga.POSITION_TYPE_ABSOLUTE : Yoga.POSITION_TYPE_RELATIVE);
  }
});

const isRow = R.equals('row');
const isRowReverse = R.equals('row-reverse');
const isColumnReverse = R.equals('column-reverse');
/**
 * Set flex direction attribute to node's Yoga instance
 *
 * @param {String} flex direction value
 * @param {Object} node instance
 * @return {Object} node instance
 */

const setFlexDirection = value => R.tap(node => {
  const yogaNode = node._yogaNode;

  if (yogaNode) {
    const yogaValue = R.cond([[isRow, R.always(Yoga.FLEX_DIRECTION_ROW)], [isRowReverse, R.always(Yoga.FLEX_DIRECTION_ROW_REVERSE)], [isColumnReverse, R.always(Yoga.FLEX_DIRECTION_COLUMN_REVERSE)], [R.T, R.always(Yoga.FLEX_DIRECTION_COLUMN)]])(value);
    yogaNode.setFlexDirection(yogaValue);
  }
});

/**
 * Set justify content attribute to node's Yoga instance
 *
 * @param {String} justify content value
 * @param {Object} node instance
 * @return {Object} node instance
 */

const setJustifyContent = value => R.tap(node => {
  const yogaNode = node._yogaNode;

  if (!R.isNil(value) && yogaNode) {
    const yogaValue = R.cond([[R.equals('center'), R.always(Yoga.JUSTIFY_CENTER)], [R.equals('flex-end'), R.always(Yoga.JUSTIFY_FLEX_END)], [R.equals('space-between'), R.always(Yoga.JUSTIFY_SPACE_BETWEEN)], [R.equals('space-around'), R.always(Yoga.JUSTIFY_SPACE_AROUND)], [R.equals('space-evenly'), R.always(Yoga.JUSTIFY_SPACE_EVENLY)], [R.T, R.always(Yoga.JUSTIFY_FLEX_START)]])(value);
    yogaNode.setJustifyContent(yogaValue);
  }
});

/**
 * Set margin top attribute to node's Yoga instance
 *
 * @param {Number} margin top
 * @param {Object} node instance
 * @return {Object} node instance
 */

const setMarginTop = setYogaValue('margin', Yoga.EDGE_TOP);
/**
 * Set margin right attribute to node's Yoga instance
 *
 * @param {Number} margin right
 * @param {Object} node instance
 * @return {Object} node instance
 */

const setMarginRight = setYogaValue('margin', Yoga.EDGE_RIGHT);
/**
 * Set margin bottom attribute to node's Yoga instance
 *
 * @param {Number} margin bottom
 * @param {Object} node instance
 * @return {Object} node instance
 */

const setMarginBottom = setYogaValue('margin', Yoga.EDGE_BOTTOM);
/**
 * Set margin left attribute to node's Yoga instance
 *
 * @param {Number} margin left
 * @param {Object} node instance
 * @return {Object} node instance
 */

const setMarginLeft = setYogaValue('margin', Yoga.EDGE_LEFT);

/**
 * Set padding top attribute to node's Yoga instance
 *
 * @param {Number} padding top
 * @param {Object} node instance
 * @return {Object} node instance
 */

const setPaddingTop = setYogaValue('padding', Yoga.EDGE_TOP);
/**
 * Set padding right attribute to node's Yoga instance
 *
 * @param {Number} padding right
 * @param {Object} node instance
 * @return {Object} node instance
 */

const setPaddingRight = setYogaValue('padding', Yoga.EDGE_RIGHT);
/**
 * Set padding bottom attribute to node's Yoga instance
 *
 * @param {Number} padding bottom
 * @param {Object} node instance
 * @return {Object} node instance
 */

const setPaddingBottom = setYogaValue('padding', Yoga.EDGE_BOTTOM);
/**
 * Set padding left attribute to node's Yoga instance
 *
 * @param {Number} padding left
 * @param {Object} node instance
 * @return {Object} node instance
 */

const setPaddingLeft = setYogaValue('padding', Yoga.EDGE_LEFT);

/**
 * Set border top attribute to node's Yoga instance
 *
 * @param {Number} border top width
 * @param {Object} node instance
 * @return {Object} node instance
 */

const setBorderTop = setYogaValue('border', Yoga.EDGE_TOP);
/**
 * Set border right attribute to node's Yoga instance
 *
 * @param {Number} border right width
 * @param {Object} node instance
 * @return {Object} node instance
 */

const setBorderRight = setYogaValue('border', Yoga.EDGE_RIGHT);
/**
 * Set border bottom attribute to node's Yoga instance
 *
 * @param {Number} border bottom width
 * @param {Object} node instance
 * @return {Object} node instance
 */

const setBorderBottom = setYogaValue('border', Yoga.EDGE_BOTTOM);
/**
 * Set border left attribute to node's Yoga instance
 *
 * @param {Number} border left width
 * @param {Object} node instance
 * @return {Object} node instance
 */

const setBorderLeft = setYogaValue('border', Yoga.EDGE_LEFT);

/**
 * Set position top attribute to node's Yoga instance
 *
 * @param {Number} position top
 * @param {Object} node instance
 * @return {Object} node instance
 */

const setPositionTop = setYogaValue('position', Yoga.EDGE_TOP);
/**
 * Set position right attribute to node's Yoga instance
 *
 * @param {Number} position right
 * @param {Object} node instance
 * @return {Object} node instance
 */

const setPositionRight = setYogaValue('position', Yoga.EDGE_RIGHT);
/**
 * Set position bottom attribute to node's Yoga instance
 *
 * @param {Number} position bottom
 * @param {Object} node instance
 * @return {Object} node instance
 */

const setPositionBottom = setYogaValue('position', Yoga.EDGE_BOTTOM);
/**
 * Set position left attribute to node's Yoga instance
 *
 * @param {Number} position left
 * @param {Object} node instance
 * @return {Object} node instance
 */

const setPositionLeft = setYogaValue('position', Yoga.EDGE_LEFT);

/**
 * Set width to node's Yoga instance
 *
 * @param {Number} width
 * @param {Object} node instance
 * @return {Object} node instance
 */

const setWidth = setYogaValue('width');
/**
 * Set min width to node's Yoga instance
 *
 * @param {Number} min width
 * @param {Object} node instance
 * @return {Object} node instance
 */

const setMinWidth = setYogaValue('minWidth');
/**
 * Set max width to node's Yoga instance
 *
 * @param {Number} max width
 * @param {Object} node instance
 * @return {Object} node instance
 */

const setMaxWidth = setYogaValue('maxWidth');
/**
 * Set height to node's Yoga instance
 *
 * @param {Number} height
 * @param {Object} node instance
 * @return {Object} node instance
 */

const setHeight = setYogaValue('height');
/**
 * Set min height to node's Yoga instance
 *
 * @param {Number} min height
 * @param {Object} node instance
 * @return {Object} node instance
 */

const setMinHeight = setYogaValue('minHeight');
/**
 * Set max height to node's Yoga instance
 *
 * @param {Number} max height
 * @param {Object} node instance
 * @return {Object} node instance
 */

const setMaxHeight = setYogaValue('maxHeight');

const getAspectRatio = viewbox => {
  if (!viewbox) return null;
  return (viewbox.maxX - viewbox.minX) / (viewbox.maxY - viewbox.minY);
};
/**
 * Yoga svg measure function
 *
 * @param {Object} page
 * @param {Object} node
 * @param {Number} width
 * @param {Number} widthMode
 * @param {Number} height
 * @param {Number} heightMode
 * @returns {Object} canvas width and height
 */


const measureCanvas = (page, node, width, widthMode, height, heightMode) => {
  const aspectRatio = getAspectRatio(node.props.viewBox) || 1;

  if (widthMode === Yoga.MEASURE_MODE_EXACTLY || widthMode === Yoga.MEASURE_MODE_AT_MOST) {
    return {
      width,
      height: width / aspectRatio
    };
  }

  if (heightMode === Yoga.MEASURE_MODE_EXACTLY) {
    return {
      width: height * aspectRatio
    };
  }

  return {};
};

var measureSvg = R.curryN(6, measureCanvas);

/**
 * Get lines width (if any)
 *
 * @param {Object} node
 * @returns {Number} lines width
 */

const linesWidth = node => {
  if (!node.lines) return -1;
  return Math.max(...node.lines.map(line => AttributedString.advanceWidth(line)));
};

/**
 * Get lines height (if any)
 *
 * @param {Object} node
 * @returns {Number} lines height
 */
const linesHeight = node => {
  if (!node.lines) return -1;
  return node.lines.reduce((acc, line) => acc + line.box.height, 0);
};

/**
 * Yoga text measure function
 *
 * @param {Object} page
 * @param {Object} node
 * @param {Number} width
 * @param {Number} widthMode
 * @param {Number} height
 * @param {Number} heightMode
 * @returns {Object} text width and height
 */

const measureText = (page, node, width, widthMode, height, heightMode) => {
  if (widthMode === Yoga.MEASURE_MODE_EXACTLY) {
    if (!node.lines) node.lines = layoutText$1(node, width, height);
    return {
      height: linesHeight(node)
    };
  }

  if (widthMode === Yoga.MEASURE_MODE_AT_MOST) {
    if (!node.lines) node.lines = layoutText$1(node, width, height);
    return {
      height: linesHeight(node),
      width: Math.min(width, linesWidth(node))
    };
  }

  return {};
};

var measureText$1 = R.curryN(6, measureText);

/**
 * Get image ratio
 *
 * @param {Object} image node
 * @returns {Number} image ratio
 */

const getRatio = R.ifElse(R.hasPath(['image', 'data']), node => node.image.width / node.image.height, R.always(1));

/**
 * Checks if page has auto height
 *
 * @param {Object} page
 * @returns {Boolean} is page height auto
 */

const isHeightAuto = R.pathSatisfies(R.isNil, ['box', 'height']);

const SAFETY_HEIGHT = 10;
/**
 * Yoga image measure function
 *
 * @param {Object} page
 * @param {Object} node
 * @param {Number} width
 * @param {Number} widthMode
 * @param {Number} height
 * @param {Number} heightMode
 * @returns {Object} image width and height
 */

const measureImage = (page, node, width, widthMode, height, heightMode) => {
  const imageRatio = getRatio(node);
  const imageMargin = getMargin(node);
  const pagePadding = getPadding(page);
  const pageArea = isHeightAuto(page) ? Infinity : page.box.height - pagePadding.paddingTop - pagePadding.paddingBottom - imageMargin.marginTop - imageMargin.marginBottom - SAFETY_HEIGHT; // Skip measure if image data not present yet

  if (!node.image) return {
    width: 0,
    height: 0
  };

  if (widthMode === Yoga.MEASURE_MODE_EXACTLY && heightMode === Yoga.MEASURE_MODE_UNDEFINED) {
    const scaledHeight = width / imageRatio;
    return {
      height: Math.min(pageArea, scaledHeight)
    };
  }

  if (heightMode === Yoga.MEASURE_MODE_EXACTLY && (widthMode === Yoga.MEASURE_MODE_AT_MOST || widthMode === Yoga.MEASURE_MODE_UNDEFINED)) {
    return {
      width: Math.min(height * imageRatio, width)
    };
  }

  if (widthMode === Yoga.MEASURE_MODE_EXACTLY && heightMode === Yoga.MEASURE_MODE_AT_MOST) {
    const scaledHeight = width / imageRatio;
    return {
      height: Math.min(height, pageArea, scaledHeight)
    };
  }

  if (widthMode === Yoga.MEASURE_MODE_AT_MOST && heightMode === Yoga.MEASURE_MODE_AT_MOST) {
    if (imageRatio > 1) {
      return {
        width: width,
        height: Math.min(width / imageRatio, height)
      };
    } else {
      return {
        width: Math.min(height * imageRatio, width),
        height: height
      };
    }
  }

  return {
    height,
    width
  };
};

var measureImage$1 = R.curryN(6, measureImage);

const SAFETY_HEIGHT$1 = 10;
const getMax = R.reduce(R.max, -Infinity);
/**
 * Helper object to predict canvas size
 * TODO: Implement remaining functions (as close as possible);
 */

const measureCtx = () => {
  const ctx = {};
  const points = [];

  const nil = () => ctx;

  const addPoint = (x, y) => points.push([x, y]);

  const moveTo = R.compose(nil, addPoint);

  const rect = (x, y, w, h) => {
    addPoint(x, y);
    addPoint(x + w, y);
    addPoint(x, y + h);
    addPoint(x + w, y + h);
    return ctx;
  };

  const ellipse = (x, y, rx, ry) => {
    ry = ry || rx;
    addPoint(x - rx, y - ry);
    addPoint(x + rx, y - ry);
    addPoint(x + rx, y + ry);
    addPoint(x - rx, y + ry);
    return ctx;
  };

  const polygon = (...pts) => {
    points.push(...pts);
    return nil();
  }; // Change dimensions


  ctx.rect = rect;
  ctx.moveTo = moveTo;
  ctx.lineTo = moveTo;
  ctx.circle = ellipse;
  ctx.polygon = polygon;
  ctx.ellipse = ellipse;
  ctx.roundedRect = rect; // To be implemented

  ctx.text = nil;
  ctx.path = nil;
  ctx.lineWidth = nil;
  ctx.bezierCurveTo = nil;
  ctx.quadraticCurveTo = nil;
  ctx.scale = nil;
  ctx.rotate = nil;
  ctx.translate = nil; // These don't change dimensions

  ctx.dash = nil;
  ctx.clip = nil;
  ctx.save = nil;
  ctx.fill = nil;
  ctx.font = nil;
  ctx.stroke = nil;
  ctx.lineCap = nil;
  ctx.opacity = nil;
  ctx.restore = nil;
  ctx.lineJoin = nil;
  ctx.fontSize = nil;
  ctx.fillColor = nil;
  ctx.miterLimit = nil;
  ctx.strokeColor = nil;
  ctx.fillOpacity = nil;
  ctx.strokeOpacity = nil;
  ctx.linearGradient = nil;
  ctx.radialGradient = nil;

  ctx.getWidth = () => R.compose(getMax, R.pluck(0))(points);

  ctx.getHeight = () => R.compose(getMax, R.pluck(1))(points);

  return ctx;
};
/**
 * Yoga canvas measure function
 *
 * @param {Object} page
 * @param {Object} node
 * @param {Number} width
 * @param {Number} widthMode
 * @param {Number} height
 * @param {Number} heightMode
 * @returns {Object} canvas width and height
 */


const measureCanvas$1 = (page, node) => {
  const imageMargin = getMargin(node);
  const pagePadding = getPadding(page);
  const pageArea = isHeightAuto(page) ? Infinity : page.box.height - pagePadding.paddingTop - pagePadding.paddingBottom - imageMargin.marginTop - imageMargin.marginBottom - SAFETY_HEIGHT$1;
  const ctx = measureCtx();
  node.props.paint(ctx);
  const width = ctx.getWidth();
  const height = Math.min(pageArea, ctx.getHeight());
  return {
    height,
    width
  };
};

var measureCanvas$2 = R.curryN(6, measureCanvas$1);

const YOGA_NODE = '_yogaNode';
const YOGA_CONFIG = Yoga.Config.create();
YOGA_CONFIG.setPointScaleFactor(0);

const setNodeHeight = node => R.ifElse(isPage, setHeight(node.box.height), setHeight(node.box.height || node.style.height));
/**
 * Set styles valeus into yoga node before layout calculation
 *
 * @param {Object} node
 * @returns {Object} node
 */


const setYogaValues = R.tap(node => {
  R.compose(setNodeHeight(node), setWidth(node.style.width), setMinWidth(node.style.minWidth), setMaxWidth(node.style.maxWidth), setMinHeight(node.style.minHeight), setMaxHeight(node.style.maxHeight), setMarginTop(node.style.marginTop), setMarginRight(node.style.marginRight), setMarginBottom(node.style.marginBottom), setMarginLeft(node.style.marginLeft), setPaddingTop(node.style.paddingTop), setPaddingRight(node.style.paddingRight), setPaddingBottom(node.style.paddingBottom), setPaddingLeft(node.style.paddingLeft), setPositionType(node.style.position), setPositionTop(node.style.top), setPositionRight(node.style.right), setPositionBottom(node.style.bottom), setPositionLeft(node.style.left), setBorderTop(node.style.borderTopWidth), setBorderRight(node.style.borderRightWidth), setBorderBottom(node.style.borderBottomWidth), setBorderLeft(node.style.borderLeftWidth), setDisplay(node.style.display), setFlexDirection(node.style.flexDirection), setAlignSelf(node.style.alignSelf), setAlignContent(node.style.alignContent), setAlignItems(node.style.alignItems), setJustifyContent(node.style.justifyContent), setFlexWrap(node.style.flexWrap), setOverflow(node.style.overflow), setAspectRatio(node.style.aspectRatio), setFlexBasis(node.style.flexBasis), setFlexGrow(node.style.flexGrow), setFlexShrink(node.style.flexShrink))(node);
});
/**
 * Inserts child into parent' yoga node
 *
 * @param {Object} parent
 * @param {Object} node
 * @param {Object} node
 */

const insertYogaNodes = parent => R.tap(child => parent.insertChild(child[YOGA_NODE], parent.getChildCount()));

const setMeasureFunc = page => node => {
  const yogaNode = node[YOGA_NODE];

  if (isText(node)) {
    yogaNode.setMeasureFunc(measureText$1(page, node));
  }

  if (isImage(node)) {
    yogaNode.setMeasureFunc(measureImage$1(page, node));
  }

  if (isCanvas(node)) {
    yogaNode.setMeasureFunc(measureCanvas$2(page, node));
  }

  if (isSvg(node)) {
    yogaNode.setMeasureFunc(measureSvg(page, node));
  }

  return node;
};

const isNotText = R.complement(isText);
const isNotNote = R.complement(isNote);
const isNotSvg$1 = R.complement(isSvg);
const isNotTextInstance = R.complement(isTextInstance);
const isLayoutElement = R.allPass([isNotText, isNotNote, isNotSvg$1]);
/**
 * Creates and add yoga node to document tree
 * Handles measure function for text and image nodes
 *
 * @param {Object} node
 * @returns {Object} node with appended yoga node
 */

const createYogaNodes = page => node => {
  const yogaNode = Yoga.Node.createWithConfig(YOGA_CONFIG);
  return R.compose(setMeasureFunc(page), R.when(isLayoutElement, R.evolve({
    children: R.map(R.compose(insertYogaNodes(yogaNode), createYogaNodes(page)))
  })), setYogaValues, R.assoc(YOGA_NODE, yogaNode))(node);
};
/**
 * Performs yoga calculation
 *
 * @param {Object} node
 * @returns {Object} node
 */


const calculateLayout = R.tap(page => page[YOGA_NODE].calculateLayout());
/**
 * Saves Yoga layout result into 'box' attribute of node
 *
 * @param {Object} node
 * @returns {Object} node with box data
 */

const persistDimensions = node => {
  return R.evolve({
    children: R.map(R.when(isNotTextInstance, persistDimensions)),
    box: R.always(R.mergeAll([getPadding(node), getMargin(node), getBorderWidth(node), getPosition(node), getDimension(node)]))
  })(node);
};
/**
 * Removes and destroys yoga node frm document tree
 *
 * @param {Object} node
 * @returns {Object} node without yoga node
 */


const destroyYogaNodes = node => {
  return R.compose(R.dissoc(YOGA_NODE), R.tap(n => Yoga.Node.destroy(n[YOGA_NODE])), R.evolve({
    children: R.map(R.when(isLayoutElement, destroyYogaNodes))
  }))(node);
};
/**
 * Calculates page object layout using Yoga.
 * Takes node values from 'box' and 'style' attributes, and persist them back into 'box'
 * Destroy yoga values at the end.
 *
 * @param {Object} page object
 * @returns {Object} page object with correct 'box' layout attributes
 */


const resolvePageDimensions = page => R.ifElse(R.isNil, R.always(null), R.compose(destroyYogaNodes, persistDimensions, calculateLayout, createYogaNodes(page)))(page);
/**
 * Calculates root object layout using Yoga.
 *
 * @param {Object} root object
 * @returns {Object} root object with correct 'box' layout attributes
 */

const resolveDimensions = node => R.evolve({
  children: R.map(resolvePageDimensions)
})(node);

const SAFTY_THRESHOLD = 0.001;
const assingChildren = R.assoc('children');
const getTop$3 = R.pathOr(0, ['box', 'top']);
const getHeight = R.path(['box', 'height']);
const getChildren$1 = R.propOr([], 'children');
const isElementOutside = R.useWith(R.lte, [R.identity, getTop$3]);
const isFixed = R.pathEq(['props', 'fixed'], true);
const allFixed = R.all(isFixed);
const isDynamic = R.hasPath(['props', 'render']);
const relayoutPage = R.compose(resolveTextLayout, resolveInheritance, resolvePageDimensions);

const splitView = (node, height) => {
  const [currentNode, nextNode] = splitNode(node, height);
  const [currentChilds, nextChildren] = splitChildren(height, node);
  return [assingChildren(currentChilds)(currentNode), assingChildren(nextChildren)(nextNode)];
};

const split = R.ifElse(isText, splitText, splitView);

const splitNodes = (height, nodes) => {
  const currentChildren = [];
  const nextChildren = [];

  for (let i = 0; i < nodes.length; i++) {
    const child = nodes[i];
    const futureNodes = nodes.slice(i + 1);
    const futureFixedNodes = R.filter(isFixed, futureNodes);
    const nodeTop = getTop$3(child);
    const nodeHeight = getHeight(child);
    const isOutside = isElementOutside(height, child);
    const shouldBreak$1 = shouldBreak(child, futureNodes, height);
    const shouldSplit = height + SAFTY_THRESHOLD < nodeTop + nodeHeight;

    if (isFixed(child)) {
      nextChildren.push(child);
      currentChildren.push(child);
      continue;
    }

    if (isOutside) {
      const next = R.evolve({
        box: {
          top: R.subtract(R.__, height)
        }
      })(child);
      nextChildren.push(next);
      continue;
    }

    if (shouldBreak$1) {
      const next = R.evolve({
        box: {
          top: R.subtract(R.__, height)
        },
        props: R.evolve({
          break: R.always(false)
        })
      })(child);
      currentChildren.push(...futureFixedNodes);
      nextChildren.push(next, ...futureNodes);
      break;
    }

    if (shouldSplit) {
      const [currentChild, nextChild] = split(child, height);
      if (currentChild) currentChildren.push(currentChild);
      if (nextChild) nextChildren.push(nextChild);
      continue;
    }

    currentChildren.push(child);
  }

  return [currentChildren, nextChildren];
};

const splitChildren = (height, node) => {
  const children = getChildren$1(node);
  const availableHeight = height - getTop$3(node);
  return splitNodes(availableHeight, children);
};

const splitPage = (page, pageNumber) => {
  const contentArea = getContentArea(page);
  const height = R.path(['style', 'height'], page);
  const dynamicPage = resolveDynamicPage({
    pageNumber
  }, page);
  const [currentChilds, nextChilds] = splitNodes(contentArea, dynamicPage.children);
  const currentPage = R.compose(relayoutPage, assingChildren(currentChilds), R.assocPath(['box', 'height'], height))(page);
  if (R.isEmpty(nextChilds) || allFixed(nextChilds)) return [currentPage, null];
  const nextPage = R.compose(relayoutPage, assingChildren(nextChilds), R.dissocPath(['box', 'height']))(page);
  return [currentPage, nextPage];
};

const shouldResolveDynamicNodes = node => R.either(isDynamic, R.compose(R.any(shouldResolveDynamicNodes), R.propOr([], 'children')))(node);

const resolveDynamicPage = (props, page) => R.when(shouldResolveDynamicNodes, R.compose(relayoutPage, resolveDynamicNodes(props)))(page);

const resolveDynamicNodes = props => node => {
  const isNodeDynamic = R.always(isDynamic(node));

  const resolveRender = () => {
    const res = node.props.render(props);
    return [createInstance(res)];
  };

  return R.evolve({
    children: R.ifElse(isNodeDynamic, resolveRender, R.map(resolveDynamicNodes(props))),
    lines: R.when(isNodeDynamic, R.always([]))
  }, node);
};

const paginate = (page, pageNumber) => {
  if (!page) return [];
  let splittedPage = splitPage(page, pageNumber);
  const pages = [splittedPage[0]];
  let nextPage = splittedPage[1];

  while (nextPage !== null) {
    splittedPage = splitPage(nextPage, pageNumber + pages.length);
    pages.push(splittedPage[0]);
    nextPage = splittedPage[1];
  }

  return pages;
};

const resolvePageIndices = (page, pageNumber, pages) => {
  const totalPages = pages.length;
  return resolveDynamicPage({
    pageNumber: pageNumber + 1,
    totalPages
  }, page);
};

const resolvePagination = doc => {
  let pages = [];
  let pageNumber = 1;

  for (let i = 0; i < doc.children.length; i++) {
    const page = doc.children[i];
    const subpages = paginate(page, pageNumber);
    pageNumber += subpages.length;
    pages = pages.concat(subpages);
  }

  pages = pages.map(resolvePageIndices);
  return assingChildren(pages, doc);
};

/**
 * Removes margins on node
 *
 * @param {Object} node
 * @returns {Object} node without margins
 */

const removeMargins = R.compose(R.dissocPath(['style', 'margin']), R.dissocPath(['style', 'marginTop']), R.dissocPath(['style', 'marginRight']), R.dissocPath(['style', 'marginBottom']), R.dissocPath(['style', 'marginLeft']), R.dissocPath(['style', 'marginHorizontal']), R.dissocPath(['style', 'marginVertical']));

/**
 * Remove page margins
 *
 * @param {Object} document root
 * @returns {Object} document root without margins on pages
 */

const resolvePageMargins = R.evolve({
  children: R.map(removeMargins)
});

/**
 * Get node underlying text value
 *
 * @param {Object} node
 * @returns {String} node text content
 */

const getNodeText = node => R.cond([[R.is(String), R.identity], [isTextInstance, R.prop('value')], [R.T, R.compose(getNodesText, R.propOr([], 'children'))]])(node);
/**
 * Get underlying text value of several nodes
 *
 * @param {Array} nodes
 * @returns {String} nodes text content
 */


const getNodesText = R.compose(R.join(''), R.map(getNodeText));
/**
 * Transforms string to text instance
 *
 * @param {String} value
 * @returns {Array} text intance
 */

const wrapTextInstance = value => [{
  type: 'TEXT_INSTANCE',
  value
}];
/**
 * Cast Note children as a text instance
 *
 * @param {Object} node
 * @returns {Object} node with resolved note children
 */


const resolveNoteChildren = node => R.ifElse(isNote, R.evolve({
  children: R.compose(wrapTextInstance, getNodesText)
}), R.evolve({
  children: R.map(resolveNoteChildren)
}))(node);

/*
 * Translates page percentage horizontal paddings in fixed ones
 *
 * @param {Object} page container
 * @param {String} padding value
 * @returns {Object} translated padding value
 */

const resolvePageHorizontalPadding = container => value => {
  const match = matchPercent(value);
  return match ? match.percent * container.width : value;
};
/**
 * Translates page percentage vertical paddings in fixed ones
 *
 * @param {Object} page container
 * @param {String} padding value
 * @returns {Object} translated padding value
 */


const resolvePageVerticalPadding = container => value => {
  const match = matchPercent(value);
  return match ? match.percent * container.height : value;
};
/**
 * Translates page percentage paddings in fixed ones
 *
 * @param {Object} page
 * @returns {Object} page with fixed paddings
 */


const resolvePagePaddings = page => {
  const container = R.pathOr({}, ['props', 'size'], page);
  return R.evolve({
    style: R.evolve({
      paddingLeft: resolvePageHorizontalPadding(container),
      paddingRight: resolvePageHorizontalPadding(container),
      paddingTop: resolvePageVerticalPadding(container),
      paddingBottom: resolvePageVerticalPadding(container)
    })
  })(page);
};
/**
 * Translates all pages percentage paddings in fixed ones
 * This has to be computed from pages calculated size and not by Yoga
 * because at this point we didn't performed pagination yet.
 *
 * @param {Object} document root
 * @returns {Object} document root with translated page paddings
 */


var resolvePagePaddings$1 = R.evolve({
  children: R.map(resolvePagePaddings)
});

/**
 *
 * @param {Object} container width and height
 * @param {String | Number} value border radius value
 * @returns {Number} fixed border radius value
 */

const resolveRadius = container => value => {
  const match = matchPercent(value);
  return match ? match.percent * Math.min(container.width, container.height) : value;
};
/**
 * Transforms percent border radius into fixed values
 *
 * @param {Object} node
 * @returns {Object} node
 */


const resolvePercentRadius = node => R.evolve({
  children: R.map(resolvePercentRadius),
  style: R.evolve({
    borderTopLeftRadius: resolveRadius(node.box),
    borderTopRightRadius: resolveRadius(node.box),
    borderBottomRightRadius: resolveRadius(node.box),
    borderBottomLeftRadius: resolveRadius(node.box)
  })
})(node);

/**
 * Transform percent height into fixed
 *
 * @param {String | number} height
 * @return {number} height
 */

const transformHeight = pageArea => height => {
  const match = matchPercent(height);
  return match ? match.percent * pageArea : height;
};
/**
 * Get page area (height minus paddings)
 *
 * @param {Object} page
 * @return {number} page area
 */


const getPageArea = page => {
  const pageHeight = R.path(['style', 'height'], page);
  const pagePaddingTop = R.pathOr(0, ['style', 'paddingTop'], page);
  const pagePaddingBottom = R.pathOr(0, ['style', 'paddingBottom'], page);
  return pageHeight - pagePaddingTop - pagePaddingBottom;
};
/**
 * Checks if page has height
 *
 * @param {Object} page
 * @return {boolean} page has height
 */


const hasHeight = R.hasPath(['style', 'height']);
/**
 * Transform node percent height to fixed
 *
 * @param {Object} page
 * @param {Object} node
 * @return {Object} transformed node
 */

const resolveNodePercentHeight = page => node => {
  if (hasHeight(page)) {
    const pageArea = getPageArea(page);
    return R.evolve({
      style: {
        height: transformHeight(pageArea)
      }
    })(node);
  }

  return node;
};
/**
 * Transform page immediate children with percent height to fixed
 *
 * @param {Object} page
 * @return {Object} transformed page
 */


const resolvePagePercentHeight = page => R.evolve({
  children: R.map(resolveNodePercentHeight(page))
})(page);
/**
 * Transform all page immediate children with percent height to fixed
 *
 * @param {Object} document root
 * @return {Object} transformed document root
 */


const resolvePercentHeight = R.evolve({
  children: R.map(resolvePagePercentHeight)
});

/**
 * Checks if node has render prop
 *
 * @param {Object} node
 * @returns {Boolean} has render prop?
 */

const hasRenderProp = R.hasPath(['props', 'render']);
/**
 * Checks if all children of node are text instances
 *
 * @param {Object} node
 * @returns {Boolean} are all children text instances?
 */

const hasTextInstanceChilds = R.compose(R.all(isTextInstance), R.propOr([], 'children'));
/**
 * If the Link has a string child or render prop, substitute the instance by a Text,
 * that will ultimately render the inline Link via the textkit PDF renderer.
 *
 * @param {Object} node
 * @returns {Object} node with link substitution
 */

const resolveLinkSubstitution = node => R.evolve({
  children: R.map(R.ifElse(R.both(isLink, R.either(hasRenderProp, hasTextInstanceChilds)), R.assoc('type', TEXT), resolveLinkSubstitution))
})(node);

/**
 * Performs right-to-left function composition with async functions support
 *
 * @param  {...any} functions
 */

const asyncCompose = (...fns) => async value => {
  for (const fn of R.reverse(fns)) value = await fn(value);

  return value;
};

// import * as R from 'ramda';
// const endTimer = name => R.tap(() => console.timeEnd(name));

const layout = asyncCompose(resolveZIndex, resolveRulers, resolveOrigin, resolvePagination, resolveTextLayout, resolvePercentRadius, resolveDimensions, resolveSvg, resolveAssets, resolveInheritance, resolvePercentHeight, resolvePagePaddings$1, resolveStyles$1, resolveNoteChildren, resolveLinkSubstitution, resolvePageMargins, resolvePageSizes);

/**
 * Checks if two sets of props are equal (recursively)
 *
 * @param {Object} props A
 * @param {Object} props B
 * @returns {Boolean} props equals?
 *
 */
const propsEqual = (a, b) => {
  const oldPropsKeys = Object.keys(a);
  const newPropsKeys = Object.keys(b);

  if (oldPropsKeys.length !== newPropsKeys.length) {
    return false;
  }

  for (let i = 0; i < oldPropsKeys.length; i++) {
    const propName = oldPropsKeys[i];

    if (propName === 'render') {
      if (!a[propName] !== !b[propName]) {
        return false;
      }

      continue;
    }

    if (propName !== 'children' && a[propName] !== b[propName]) {
      if (typeof a[propName] === 'object' && typeof b[propName] === 'object' && propsEqual(a[propName], b[propName])) {
        continue;
      }

      return false;
    }

    if (propName === 'children' && (typeof a[propName] === 'string' || typeof b[propName] === 'string')) {
      return a[propName] === b[propName];
    }
  }

  return true;
};

const emptyObject = {};

const createRenderer = ({
  onChange = () => {}
}) => {
  return ReactFiberReconciler({
    schedulePassiveEffects: scheduler.unstable_scheduleCallback,
    cancelPassiveEffects: scheduler.unstable_cancelCallback,
    supportsMutation: true,
    isPrimaryRenderer: false,
    warnsIfNotActing: false,

    appendInitialChild(parentInstance, child) {
      parentInstance.children.push(child);
    },

    createInstance(type, {
      style,
      children,
      ...props
    }) {
      return {
        type,
        box: {},
        style: style || {},
        props: props || {},
        children: []
      };
    },

    createTextInstance(text, rootContainerInstance) {
      return {
        type: 'TEXT_INSTANCE',
        value: text
      };
    },

    finalizeInitialChildren(element, type, props) {
      return false;
    },

    getPublicInstance(instance) {
      return instance;
    },

    prepareForCommit() {// Noop
    },

    prepareUpdate(element, type, oldProps, newProps) {
      return !propsEqual(oldProps, newProps);
    },

    resetAfterCommit: onChange,

    resetTextContent(element) {// Noop
    },

    getRootHostContext() {
      return emptyObject;
    },

    getChildHostContext() {
      return emptyObject;
    },

    shouldSetTextContent(type, props) {
      return false;
    },

    now: Date.now,
    useSyncScheduling: true,

    appendChild(parentInstance, child) {
      parentInstance.children.push(child);
    },

    appendChildToContainer(parentInstance, child) {
      if (parentInstance.type === 'ROOT') {
        parentInstance.document = child;
      } else {
        parentInstance.children.push(child);
      }
    },

    insertBefore(parentInstance, child, beforeChild) {
      const index = parentInstance.children.indexOf(beforeChild);
      if (index !== -1 && child) parentInstance.children.splice(index, 0, child);
    },

    removeChild(parentInstance, child) {
      const index = parentInstance.children.indexOf(child);
      if (index !== -1) parentInstance.children.splice(index, 1);
    },

    removeChildFromContainer(parentInstance, child) {
      const index = parentInstance.children.indexOf(child);
      if (index !== -1) parentInstance.children.splice(index, 1);
    },

    commitTextUpdate(textInstance, oldText, newText) {
      textInstance.value = newText;
    },

    commitUpdate(instance, updatePayload, type, oldProps, newProps) {
      const {
        style,
        ...props
      } = newProps;
      instance.props = props;
      instance.style = style;
    }

  });
};

const create = styles => styles;

const absoluteFillObject = {
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0
};
var StyleSheet = {
  hairlineWidth: 1,
  create,
  flatten,
  absoluteFillObject
};

var version = "2.0.0-alpha.7";

const View = VIEW;
const Text = TEXT;
const Link = LINK;
const Page = PAGE;
const Note = NOTE;
const Image = IMAGE;
const Document = DOCUMENT;
const Canvas = CANVAS;
const Svg = SVG;
const G = GROUP;
const Path = PATH;
const Rect = RECT;
const Line = LINE;
const Circle = CIRCLE;
const Ellipse = ELLIPSE;
const Polygon = POLYGON;
const Polyline = POLYLINE;
const Defs = DEFS;
const Tspan = TSPAN;
const ClipPath = CLIP_PATH;
const Stop = STOP;
const LinearGradient = LINEAR_GRADIENT;
const RadialGradient = RADIAL_GRADIENT;

const pdf = ({
  initialValue,
  onChange
}) => {
  const container = {
    type: 'ROOT',
    document: null
  };
  const PDFRenderer = createRenderer({
    onChange
  });
  const mountNode = PDFRenderer.createContainer(container);
  if (initialValue) updateContainer(initialValue);

  const getLang = () => {
    const {
      document
    } = container;
    return document.props ? document.props.lang : 'en-US';
  };

  const render$1 = async () => {
    const ctx = new PDFDocument__default({
      autoFirstPage: false,
      lang: getLang()
    });
    console.time('layout');
    const layout$1 = await layout(container.document);
    console.timeEnd('layout');
    return render(ctx, layout$1);
  };

  const layout$1 = async () => {
    return layout(container);
  };

  function updateContainer(doc) {
    PDFRenderer.updateContainer(doc, mountNode, null);
  }

  function callOnRender(params = {}) {
    if (container.document.props.onRender) {
      container.document.props.onRender(params);
    }
  }

  async function toBlob() {
    const instance = await render$1();
    const stream = instance.pipe(BlobStream());
    return new Promise((resolve, reject) => {
      stream.on('finish', () => {
        try {
          const blob = stream.toBlob('application/pdf');
          callOnRender({
            blob
          });
          resolve(blob);
        } catch (error) {
          reject(error);
        }
      });
      stream.on('error', reject);
    });
  }

  async function toBuffer() {
    callOnRender();
    return render$1();
  }

  function toString() {
    let result = '';
    const instance = render$1();
    return new Promise((resolve, reject) => {
      try {
        instance.on('data', function (buffer) {
          result += buffer;
        });
        instance.on('end', function () {
          resolve(result);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  return {
    layout: layout$1,
    container,
    updateContainer,
    toBuffer,
    toBlob,
    toString
  };
};

const renderToStream = async function (element) {
  const instance = pdf({
    initialValue: element
  });
  const buffer = await instance.toBuffer();
  return buffer;
};
const renderToFile = async function (element, filePath, callback) {
  const output = await renderToStream(element);
  const stream = fs.createWriteStream(filePath);
  output.pipe(stream);
  return new Promise((resolve, reject) => {
    stream.on('finish', () => {
      if (callback) callback(output, filePath);
      resolve(output);
    });
    stream.on('error', reject);
  });
};

const throwEnvironmentError = name => {
  throw new Error(`${name} is a web specific API. Or you're either using this component on Node, or your bundler is not loading react-pdf from the appropiate web build.`);
};

const PDFViewer = () => {
  throwEnvironmentError('PDFViewer');
};
const PDFDownloadLink = () => {
  throwEnvironmentError('PDFDownloadLink');
};
const BlobProvider = () => {
  throwEnvironmentError('BlobProvider');
};
const render$1 = renderToFile;
var node = {
  pdf,
  View,
  Text,
  Link,
  Page,
  Font: Font$1,
  Note,
  Image,
  Canvas,
  Svg,
  G,
  Path,
  Rect,
  Line,
  Circle,
  Ellipse,
  Polygon,
  Polyline,
  Defs,
  Tspan,
  ClipPath,
  Stop,
  LinearGradient,
  RadialGradient,
  version,
  Document,
  StyleSheet,
  PDFViewer,
  BlobProvider,
  PDFDownloadLink,
  renderToStream,
  renderToFile,
  render: render$1
};

exports.renderToStream = renderToStream;
exports.renderToFile = renderToFile;
exports.PDFViewer = PDFViewer;
exports.PDFDownloadLink = PDFDownloadLink;
exports.BlobProvider = BlobProvider;
exports.render = render$1;
exports.default = node;
exports.pdf = pdf;
exports.View = View;
exports.Text = Text;
exports.Link = Link;
exports.Page = Page;
exports.Font = Font$1;
exports.Note = Note;
exports.Image = Image;
exports.Canvas = Canvas;
exports.Svg = Svg;
exports.G = G;
exports.Path = Path;
exports.Rect = Rect;
exports.Line = Line;
exports.Circle = Circle;
exports.Ellipse = Ellipse;
exports.Polygon = Polygon;
exports.Polyline = Polyline;
exports.Defs = Defs;
exports.Tspan = Tspan;
exports.ClipPath = ClipPath;
exports.Stop = Stop;
exports.LinearGradient = LinearGradient;
exports.RadialGradient = RadialGradient;
exports.version = version;
exports.Document = Document;
exports.StyleSheet = StyleSheet;
//# sourceMappingURL=react-pdf.cjs.js.map