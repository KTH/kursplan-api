"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports.default = exports.setBorder = exports.setBorderLeft = exports.setBorderBottom = exports.setBorderRight = exports.setBorderTop = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _yogaLayoutPrebuilt = _interopRequireDefault(require("yoga-layout-prebuilt"));

var _setYogaValue = _interopRequireDefault(require("./setYogaValue"));

/**
 * Set border top attribute to node's Yoga instance
 *
 * @param {Number} border top width
 * @param {Object} node instance
 * @return {Object} node instance
 */
const setBorderTop = (0, _setYogaValue.default)('border', _yogaLayoutPrebuilt.default.EDGE_TOP);
/**
 * Set border right attribute to node's Yoga instance
 *
 * @param {Number} border right width
 * @param {Object} node instance
 * @return {Object} node instance
 */

exports.setBorderTop = setBorderTop;
const setBorderRight = (0, _setYogaValue.default)('border', _yogaLayoutPrebuilt.default.EDGE_RIGHT);
/**
 * Set border bottom attribute to node's Yoga instance
 *
 * @param {Number} border bottom width
 * @param {Object} node instance
 * @return {Object} node instance
 */

exports.setBorderRight = setBorderRight;
const setBorderBottom = (0, _setYogaValue.default)('border', _yogaLayoutPrebuilt.default.EDGE_BOTTOM);
/**
 * Set border left attribute to node's Yoga instance
 *
 * @param {Number} border left width
 * @param {Object} node instance
 * @return {Object} node instance
 */

exports.setBorderBottom = setBorderBottom;
const setBorderLeft = (0, _setYogaValue.default)('border', _yogaLayoutPrebuilt.default.EDGE_LEFT);
/**
 * Set all border widths at once
 *
 * @param {Number} border width
 * @param {Object} node instance
 * @return {Object} node instance
 */

exports.setBorderLeft = setBorderLeft;

const setBorder = width => R.tap(node => {
  setBorderTop(width)(node);
  setBorderRight(width)(node);
  setBorderBottom(width)(node);
  setBorderLeft(width)(node);
});

exports.setBorder = setBorder;
var _default = setBorder;
exports.default = _default;