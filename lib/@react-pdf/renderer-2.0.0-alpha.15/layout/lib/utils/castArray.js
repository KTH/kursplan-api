"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

/**
 * Checks if value is not an array
 *
 * @param {any} value
 * @returns {Boolean} isn't value an array
 */
const isNotArray = R.complement(R.is(Array));
/**
 * Casts value to array
 *
 * @param {any} value
 * @returns {Array} casted value
 */

const castArray = R.when(isNotArray, v => [v]);
var _default = castArray;
exports.default = _default;