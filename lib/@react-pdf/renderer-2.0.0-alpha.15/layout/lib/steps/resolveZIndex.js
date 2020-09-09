"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _primitives = require("@react-pdf/primitives");

const getZIndex = R.path(['style', 'zIndex']);
const isType = R.propEq('type');
const shouldNotSort = R.anyPass([isType(_primitives.Document), isType(_primitives.Svg)]);

const sortZIndex = (a, b) => {
  const za = getZIndex(a);
  const zb = getZIndex(b);
  if (!za && !zb) return 0;
  if (!za) return 1;
  if (!zb) return -1;
  return zb - za;
};
/**
 * Sort children by zIndex value
 *
 * @param {Object} node
 * @returns {Object} node
 */


const resolveZIndex = node => R.compose(R.evolve({
  children: R.map(resolveZIndex)
}), R.unless(shouldNotSort, R.evolve({
  children: R.sort(sortZIndex)
})))(node);

var _default = resolveZIndex;
exports.default = _default;