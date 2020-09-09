"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports.default = exports.setPosition = exports.setPositionLeft = exports.setPositionBottom = exports.setPositionRight = exports.setPositionTop = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _yogaLayoutPrebuilt = _interopRequireDefault(require("yoga-layout-prebuilt"));

var _setYogaValue = _interopRequireDefault(require("./setYogaValue"));

/**
 * Set position top attribute to node's Yoga instance
 *
 * @param {Number} position top
 * @param {Object} node instance
 * @return {Object} node instance
 */
const setPositionTop = (0, _setYogaValue.default)('position', _yogaLayoutPrebuilt.default.EDGE_TOP);
/**
 * Set position right attribute to node's Yoga instance
 *
 * @param {Number} position right
 * @param {Object} node instance
 * @return {Object} node instance
 */

exports.setPositionTop = setPositionTop;
const setPositionRight = (0, _setYogaValue.default)('position', _yogaLayoutPrebuilt.default.EDGE_RIGHT);
/**
 * Set position bottom attribute to node's Yoga instance
 *
 * @param {Number} position bottom
 * @param {Object} node instance
 * @return {Object} node instance
 */

exports.setPositionRight = setPositionRight;
const setPositionBottom = (0, _setYogaValue.default)('position', _yogaLayoutPrebuilt.default.EDGE_BOTTOM);
/**
 * Set position left attribute to node's Yoga instance
 *
 * @param {Number} position left
 * @param {Object} node instance
 * @return {Object} node instance
 */

exports.setPositionBottom = setPositionBottom;
const setPositionLeft = (0, _setYogaValue.default)('position', _yogaLayoutPrebuilt.default.EDGE_LEFT);
/**
 * Set all positions at once
 *
 * @param {Number} position
 * @param {Object} node instance
 * @return {Object} node instance
 */

exports.setPositionLeft = setPositionLeft;

const setPosition = position => R.tap(node => {
  setPositionTop(position)(node);
  setPositionRight(position)(node);
  setPositionBottom(position)(node);
  setPositionLeft(position)(node);
});

exports.setPosition = setPosition;
var _default = setPosition;
exports.default = _default;