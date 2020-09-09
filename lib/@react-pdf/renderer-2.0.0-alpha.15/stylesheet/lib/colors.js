"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports.default = exports.transformColor = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _hslToHex = _interopRequireDefault(require("hsl-to-hex"));

var _colorString = _interopRequireDefault(require("color-string"));

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

const parseRgb = R.compose(_colorString.default.to.hex, _colorString.default.get.rgb);
/**
 * Transform Hsl color to hexa
 *
 * @param {String} styles value
 * @returns {Object} transformed value
 */

const parseHsl = R.compose(R.toUpper, R.apply(_hslToHex.default), R.map(Math.round), _colorString.default.get.hsl);
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


exports.transformColor = transformColor;

const transformColors = styles => R.map(transformColor, styles);

var _default = transformColors;
exports.default = _default;