"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _expand = _interopRequireDefault(require("./expand"));

var _units = _interopRequireDefault(require("./units"));

var _flatten = _interopRequireDefault(require("./flatten"));

var _colors = _interopRequireDefault(require("./colors"));

var _mediaQueries = _interopRequireDefault(require("./mediaQueries"));

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
 * @param {Object} style object
 * @returns {Object} resolved style object
 */

const resolveStyles = (container, style) => R.compose((0, _units.default)(container), _colors.default, _expand.default, (0, _mediaQueries.default)(container), filterNoneValues, _flatten.default)(style);

var _default = R.curryN(2, resolveStyles);

exports.default = _default;