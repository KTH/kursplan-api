"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports.default = exports.setPadding = exports.setPaddingLeft = exports.setPaddingBottom = exports.setPaddingRight = exports.setPaddingTop = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _yogaLayoutPrebuilt = _interopRequireDefault(require("yoga-layout-prebuilt"));

var _setYogaValue = _interopRequireDefault(require("./setYogaValue"));

/**
 * Set padding top attribute to node's Yoga instance
 *
 * @param {Number} padding top
 * @param {Object} node instance
 * @return {Object} node instance
 */
const setPaddingTop = (0, _setYogaValue.default)('padding', _yogaLayoutPrebuilt.default.EDGE_TOP);
/**
 * Set padding right attribute to node's Yoga instance
 *
 * @param {Number} padding right
 * @param {Object} node instance
 * @return {Object} node instance
 */

exports.setPaddingTop = setPaddingTop;
const setPaddingRight = (0, _setYogaValue.default)('padding', _yogaLayoutPrebuilt.default.EDGE_RIGHT);
/**
 * Set padding bottom attribute to node's Yoga instance
 *
 * @param {Number} padding bottom
 * @param {Object} node instance
 * @return {Object} node instance
 */

exports.setPaddingRight = setPaddingRight;
const setPaddingBottom = (0, _setYogaValue.default)('padding', _yogaLayoutPrebuilt.default.EDGE_BOTTOM);
/**
 * Set padding left attribute to node's Yoga instance
 *
 * @param {Number} padding left
 * @param {Object} node instance
 * @return {Object} node instance
 */

exports.setPaddingBottom = setPaddingBottom;
const setPaddingLeft = (0, _setYogaValue.default)('padding', _yogaLayoutPrebuilt.default.EDGE_LEFT);
/**
 * Set all paddings at once
 *
 * @param {Number} margin
 * @param {Object} node instance
 * @return {Object} node instance
 */

exports.setPaddingLeft = setPaddingLeft;

const setPadding = padding => R.tap(node => {
  setPaddingTop(padding)(node);
  setPaddingRight(padding)(node);
  setPaddingBottom(padding)(node);
  setPaddingLeft(padding)(node);
});

exports.setPadding = setPadding;
var _default = setPadding;
exports.default = _default;