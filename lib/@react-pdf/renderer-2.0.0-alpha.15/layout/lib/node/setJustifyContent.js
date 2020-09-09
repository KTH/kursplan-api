"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _yogaLayoutPrebuilt = _interopRequireDefault(require("yoga-layout-prebuilt"));

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
    const yogaValue = R.cond([[R.equals('center'), R.always(_yogaLayoutPrebuilt.default.JUSTIFY_CENTER)], [R.equals('flex-end'), R.always(_yogaLayoutPrebuilt.default.JUSTIFY_FLEX_END)], [R.equals('space-between'), R.always(_yogaLayoutPrebuilt.default.JUSTIFY_SPACE_BETWEEN)], [R.equals('space-around'), R.always(_yogaLayoutPrebuilt.default.JUSTIFY_SPACE_AROUND)], [R.equals('space-evenly'), R.always(_yogaLayoutPrebuilt.default.JUSTIFY_SPACE_EVENLY)], [R.T, R.always(_yogaLayoutPrebuilt.default.JUSTIFY_FLEX_START)]])(value);
    yogaNode.setJustifyContent(yogaValue);
  }
});

var _default = setJustifyContent;
exports.default = _default;