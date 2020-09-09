"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _yogaLayoutPrebuilt = _interopRequireDefault(require("yoga-layout-prebuilt"));

var _upperFirst = _interopRequireDefault(require("../utils/upperFirst"));

/**
 * Set generic align attribute to node's Yoga instance
 *
 * @param {String} specific align property
 * @param {String} align value
 * @param {Object} node instance
 * @return {Object} node instance
 */
const setAlign = attr => value => R.tap(node => {
  const yogaNode = node._yogaNode;

  if (yogaNode) {
    const yogaValue = R.cond([[R.equals('flex-start'), R.always(_yogaLayoutPrebuilt.default.ALIGN_FLEX_START)], [R.equals('center'), R.always(_yogaLayoutPrebuilt.default.ALIGN_CENTER)], [R.equals('flex-end'), R.always(_yogaLayoutPrebuilt.default.ALIGN_FLEX_END)], [R.equals('stretch'), R.always(_yogaLayoutPrebuilt.default.ALIGN_STRETCH)], [R.equals('baseline'), R.always(_yogaLayoutPrebuilt.default.ALIGN_BASELINE)], [R.equals('space-between'), R.always(_yogaLayoutPrebuilt.default.ALIGN_SPACE_BETWEEN)], [R.equals('space-around'), R.always(_yogaLayoutPrebuilt.default.ALIGN_SPACE_AROUND)], [R.T, R.always(attr === 'items' ? _yogaLayoutPrebuilt.default.ALIGN_STRETCH : _yogaLayoutPrebuilt.default.ALIGN_AUTO)]])(value);
    yogaNode[`setAlign${(0, _upperFirst.default)(attr)}`](yogaValue);
  }
});

var _default = setAlign;
exports.default = _default;