"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _yogaLayoutPrebuilt = _interopRequireDefault(require("yoga-layout-prebuilt"));

/**
 * Set overflow attribute to node's Yoga instance
 *
 * @param {String} overflow value
 * @param {Object} node instance
 * @return {Object} node instance
 */
const setOverflow = value => R.tap(node => {
  const yogaNode = node._yogaNode;

  if (!R.isNil(value) && yogaNode) {
    const yogaValue = R.cond([[R.equals('hidden'), R.always(_yogaLayoutPrebuilt.default.OVERFLOW_HIDDEN)], [R.equals('scroll'), R.always(_yogaLayoutPrebuilt.default.OVERFLOW_SCROLL)], [R.T, R.always(_yogaLayoutPrebuilt.default.OVERFLOW_VISIBLE)]])(value);
    yogaNode.setOverflow(yogaValue);
  }
});

var _default = setOverflow;
exports.default = _default;