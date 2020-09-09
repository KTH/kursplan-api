"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

/**
 * Set aspect ratio attribute to node's Yoga instance
 *
 * @param {Number} ratio
 * @param {Object} node instance
 * @return {Object} node instance
 */
const setAspectRatio = value => R.tap(node => {
  const yogaNode = node._yogaNode;

  if (!R.isNil(value) && yogaNode) {
    yogaNode.setAspectRatio(value);
  }
});

var _default = setAspectRatio;
exports.default = _default;