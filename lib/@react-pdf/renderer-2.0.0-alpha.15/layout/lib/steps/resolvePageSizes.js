"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports.default = exports.resolvePageSize = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _getSize = _interopRequireDefault(require("../page/getSize"));

var _assocIfNil = _interopRequireDefault(require("../utils/assocIfNil"));

/**
 * Resolves page size
 *
 * @param {Object} page
 * @returns {Object} page with resolved size in style attribute
 */
const resolvePageSize = page => {
  const size = (0, _getSize.default)(page);
  return R.evolve({
    style: R.merge(R.__, size)
  })(page);
};
/**
 * Resolves page sizes
 *
 * @param {Object} document root
 * @returns {Object} document root with resolved page sizes
 */


exports.resolvePageSize = resolvePageSize;
const resolvePageSizes = R.evolve({
  children: R.map(R.compose(resolvePageSize, (0, _assocIfNil.default)('style', {})))
});
var _default = resolvePageSizes;
exports.default = _default;