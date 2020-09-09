"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _yogaLayoutPrebuilt = _interopRequireDefault(require("yoga-layout-prebuilt"));

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
    yogaNode.setDisplay(value === 'none' ? _yogaLayoutPrebuilt.default.DISPLAY_NONE : _yogaLayoutPrebuilt.default.DISPLAY_FLEX);
  }
});

var _default = setDisplay;
exports.default = _default;