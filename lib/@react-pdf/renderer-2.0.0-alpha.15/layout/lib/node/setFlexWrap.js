"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _yogaLayoutPrebuilt = _interopRequireDefault(require("yoga-layout-prebuilt"));

/**
 * Set flex wrap attribute to node's Yoga instance
 *
 * @param {String} flex wrap value
 * @param {Object} node instance
 * @return {Object} node instance
 */
const setFlexWrap = value => R.tap(node => {
  const yogaNode = node._yogaNode;

  if (yogaNode) {
    const yogaValue = R.cond([[R.equals('wrap'), R.always(_yogaLayoutPrebuilt.default.WRAP_WRAP)], [R.equals('wrap-reverse'), R.always(_yogaLayoutPrebuilt.default.WRAP_WRAP_REVERSE)], [R.T, R.always(_yogaLayoutPrebuilt.default.WRAP_NO_WRAP)]])(value);
    yogaNode.setFlexWrap(yogaValue);
  }
});

var _default = setFlexWrap;
exports.default = _default;