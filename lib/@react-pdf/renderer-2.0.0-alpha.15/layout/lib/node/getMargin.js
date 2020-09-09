"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _yogaLayoutPrebuilt = _interopRequireDefault(require("yoga-layout-prebuilt"));

var _firstPass = _interopRequireDefault(require("../utils/firstPass"));

const getComputedMargin = edge => node => {
  const yogaNode = node._yogaNode;
  return yogaNode ? yogaNode.getComputedMargin(edge) : null;
};
/**
 * Get Yoga computed magins. Zero otherwise
 *
 * @param {Object} node
 * @return {Object} margins
 */


const getMargin = R.applySpec({
  marginTop: (0, _firstPass.default)(getComputedMargin(_yogaLayoutPrebuilt.default.EDGE_TOP), R.path(['box', 'marginTop']), R.path(['style', 'marginTop']), R.path(['style', 'marginVertical']), R.path(['style', 'margin']), R.always(0)),
  marginRight: (0, _firstPass.default)(getComputedMargin(_yogaLayoutPrebuilt.default.EDGE_RIGHT), R.path(['box', 'marginRight']), R.path(['style', 'marginRight']), R.path(['style', 'marginHorizontal']), R.path(['style', 'margin']), R.always(0)),
  marginBottom: (0, _firstPass.default)(getComputedMargin(_yogaLayoutPrebuilt.default.EDGE_BOTTOM), R.path(['box', 'marginBottom']), R.path(['style', 'marginBottom']), R.path(['style', 'marginVertical']), R.path(['style', 'margin']), R.always(0)),
  marginLeft: (0, _firstPass.default)(getComputedMargin(_yogaLayoutPrebuilt.default.EDGE_LEFT), R.path(['box', 'marginLeft']), R.path(['style', 'marginLeft']), R.path(['style', 'marginHorizontal']), R.path(['style', 'margin']), R.always(0))
});
var _default = getMargin;
exports.default = _default;