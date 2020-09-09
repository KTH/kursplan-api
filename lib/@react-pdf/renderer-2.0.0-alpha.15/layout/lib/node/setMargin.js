"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports.default = exports.setMargin = exports.setMarginLeft = exports.setMarginBottom = exports.setMarginRight = exports.setMarginTop = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _yogaLayoutPrebuilt = _interopRequireDefault(require("yoga-layout-prebuilt"));

var _setYogaValue = _interopRequireDefault(require("./setYogaValue"));

/**
 * Set margin top attribute to node's Yoga instance
 *
 * @param {Number} margin top
 * @param {Object} node instance
 * @return {Object} node instance
 */
const setMarginTop = (0, _setYogaValue.default)('margin', _yogaLayoutPrebuilt.default.EDGE_TOP);
/**
 * Set margin right attribute to node's Yoga instance
 *
 * @param {Number} margin right
 * @param {Object} node instance
 * @return {Object} node instance
 */

exports.setMarginTop = setMarginTop;
const setMarginRight = (0, _setYogaValue.default)('margin', _yogaLayoutPrebuilt.default.EDGE_RIGHT);
/**
 * Set margin bottom attribute to node's Yoga instance
 *
 * @param {Number} margin bottom
 * @param {Object} node instance
 * @return {Object} node instance
 */

exports.setMarginRight = setMarginRight;
const setMarginBottom = (0, _setYogaValue.default)('margin', _yogaLayoutPrebuilt.default.EDGE_BOTTOM);
/**
 * Set margin left attribute to node's Yoga instance
 *
 * @param {Number} margin left
 * @param {Object} node instance
 * @return {Object} node instance
 */

exports.setMarginBottom = setMarginBottom;
const setMarginLeft = (0, _setYogaValue.default)('margin', _yogaLayoutPrebuilt.default.EDGE_LEFT);
/**
 * Set all margins at once
 *
 * @param {Number} margin
 * @param {Object} node instance
 * @return {Object} node instance
 */

exports.setMarginLeft = setMarginLeft;

const setMargin = margin => R.tap(node => {
  setMarginTop(margin)(node);
  setMarginRight(margin)(node);
  setMarginBottom(margin)(node);
  setMarginLeft(margin)(node);
});

exports.setMargin = setMargin;
var _default = setMargin;
exports.default = _default;