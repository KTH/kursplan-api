"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var P = _interopRequireWildcard(require("@react-pdf/primitives"));

var _attributedString = _interopRequireDefault(require("@react-pdf/textkit/attributedString"));

var _emoji = require("./emoji");

var _ignoreChars = _interopRequireDefault(require("./ignoreChars"));

var _transformText = _interopRequireDefault(require("./transformText"));

const PREPROCESSORS = [_ignoreChars.default, _emoji.embedEmojis];
const isType = R.propEq('type');
const isImage = isType(P.Image);
const isTextInstance = isType(P.TextInstance);
/**
 * Get textkit framgents of given node object
 *
 * @param {Object} instance node
 * @returns {Array} text fragments
 */

const getFragments = (fontStore, instance) => {
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
  const opts = {
    fontFamily,
    fontWeight,
    fontStyle
  };
  const obj = fontStore ? fontStore.getFont(opts) : null;
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

  for (let i = 0; i < instance.children.length; i += 1) {
    const child = instance.children[i];

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
        string: (0, _transformText.default)(child.value, textTransform),
        attributes
      });
    } else if (child) {
      fragments.push(...getFragments(fontStore, child));
    }
  }

  for (let i = 0; i < PREPROCESSORS.length; i += 1) {
    const preprocessor = PREPROCESSORS[i];
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


const getAttributedString = R.compose(_attributedString.default.fromFragments, getFragments);

var _default = R.curryN(2, getAttributedString);

exports.default = _default;