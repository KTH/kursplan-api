"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _yogaLayoutPrebuilt = _interopRequireDefault(require("yoga-layout-prebuilt"));

/**
 * Set position type attribute to node's Yoga instance
 *
 * @param {String} position type
 * @param {Object} node instance
 * @return {Object} node instance
 */
const setPositionType = value => R.tap(node => {
  const yogaNode = node._yogaNode;

  if (!R.isNil(value) && yogaNode) {
    yogaNode.setPositionType(value === 'absolute' ? _yogaLayoutPrebuilt.default.POSITION_TYPE_ABSOLUTE : _yogaLayoutPrebuilt.default.POSITION_TYPE_RELATIVE);
  }
});

var _default = setPositionType;
exports.default = _default;