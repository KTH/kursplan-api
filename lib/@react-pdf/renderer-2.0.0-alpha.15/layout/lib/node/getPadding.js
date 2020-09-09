"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _yogaLayoutPrebuilt = _interopRequireDefault(require("yoga-layout-prebuilt"));

var _firstPass = _interopRequireDefault(require("../utils/firstPass"));

const getComputedPadding = edge => node => {
  const yogaNode = node._yogaNode;
  return yogaNode ? yogaNode.getComputedPadding(edge) : null;
};
/**
 * Get Yoga computed paddings. Zero otherwise
 *
 * @param {Object} node
 * @return {Object} paddings
 */


const getPadding = R.applySpec({
  paddingTop: (0, _firstPass.default)(getComputedPadding(_yogaLayoutPrebuilt.default.EDGE_TOP), R.path(['box', 'paddingTop']), R.path(['style', 'paddingTop']), R.path(['style', 'paddingVertical']), R.path(['style', 'padding']), R.always(0)),
  paddingRight: (0, _firstPass.default)(getComputedPadding(_yogaLayoutPrebuilt.default.EDGE_RIGHT), R.path(['box', 'paddingRight']), R.path(['style', 'paddingRight']), R.path(['style', 'paddingHorizontal']), R.path(['style', 'padding']), R.always(0)),
  paddingBottom: (0, _firstPass.default)(getComputedPadding(_yogaLayoutPrebuilt.default.EDGE_BOTTOM), R.path(['box', 'paddingBottom']), R.path(['style', 'paddingBottom']), R.path(['style', 'paddingVertical']), R.path(['style', 'padding']), R.always(0)),
  paddingLeft: (0, _firstPass.default)(getComputedPadding(_yogaLayoutPrebuilt.default.EDGE_LEFT), R.path(['box', 'paddingLeft']), R.path(['style', 'paddingLeft']), R.path(['style', 'paddingHorizontal']), R.path(['style', 'padding']), R.always(0))
});
var _default = getPadding;
exports.default = _default;