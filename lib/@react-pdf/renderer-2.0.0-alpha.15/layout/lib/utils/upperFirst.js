"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

/**
 * Capitalize first letter of string
 *
 * @param {String} string
 * @returns {String} capitalized string
 */
const upperFirst = R.ifElse(R.isNil, R.identity, R.compose(R.join(''), R.juxt([R.compose(R.toUpper, R.head), R.tail])));

var _default = R.memoizeWith(R.identity, upperFirst);

exports.default = _default;