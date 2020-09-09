"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _yogaLayoutPrebuilt = _interopRequireDefault(require("yoga-layout-prebuilt"));

const getComputedBorder = edge => yogaNode => yogaNode ? yogaNode.getComputedBorder(edge) : 0;
/**
 * Get Yoga computed border width. Zero otherwise
 *
 * @param {Object} node
 * @return {Object} border widths
 */


const getBorderWidth = node => {
  const yogaNode = node._yogaNode;
  return R.applySpec({
    borderTopWidth: getComputedBorder(_yogaLayoutPrebuilt.default.EDGE_TOP),
    borderRightWidth: getComputedBorder(_yogaLayoutPrebuilt.default.EDGE_RIGHT),
    borderBottomWidth: getComputedBorder(_yogaLayoutPrebuilt.default.EDGE_BOTTOM),
    borderLeftWidth: getComputedBorder(_yogaLayoutPrebuilt.default.EDGE_LEFT)
  })(yogaNode);
};

var _default = getBorderWidth;
exports.default = _default;