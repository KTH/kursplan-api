"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _getOrigin = _interopRequireDefault(require("../node/getOrigin"));

/**
 * Resolve node origin
 *
 * @param {Object} node
 * @returns {Object} node with origin attribute
 */
const resolveNodeOrigin = node => R.compose(R.evolve({
  children: R.map(resolveNodeOrigin)
}), R.converge(R.assoc('origin'), [_getOrigin.default, R.identity]))(node);
/**
 * Resolve document origins
 *
 * @param {Object} document root
 * @returns {Object} documrnt root
 */


const resolveOrigin = R.evolve({
  children: R.map(resolveNodeOrigin)
});
var _default = resolveOrigin;
exports.default = _default;