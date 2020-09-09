"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _firstPass = _interopRequireDefault(require("../utils/firstPass"));

/**
 * Get image source
 *
 * @param {Object} image node
 * @returns {String} image src
 */
const getSource = R.compose(R.when(R.is(String), src => ({
  uri: src
})), (0, _firstPass.default)(R.path(['props', 'src']), R.path(['props', 'source']), R.path(['props', 'href'])));
var _default = getSource;
exports.default = _default;