"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _yogaLayoutPrebuilt = _interopRequireDefault(require("yoga-layout-prebuilt"));

var _layoutText = _interopRequireDefault(require("./layoutText"));

var _linesWidth = _interopRequireDefault(require("./linesWidth"));

var _linesHeight = _interopRequireDefault(require("./linesHeight"));

/* eslint-disable no-param-reassign */

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
const measureText = (page, node, fontStore, width, widthMode, height) => {
  if (widthMode === _yogaLayoutPrebuilt.default.MEASURE_MODE_EXACTLY) {
    if (!node.lines) node.lines = (0, _layoutText.default)(node, width, height, fontStore);
    return {
      height: (0, _linesHeight.default)(node)
    };
  }

  if (widthMode === _yogaLayoutPrebuilt.default.MEASURE_MODE_AT_MOST) {
    if (!node.lines) node.lines = (0, _layoutText.default)(node, width, height, fontStore);
    return {
      height: (0, _linesHeight.default)(node),
      width: Math.min(width, (0, _linesWidth.default)(node))
    };
  }

  return {};
};

var _default = R.curryN(7, measureText);

exports.default = _default;