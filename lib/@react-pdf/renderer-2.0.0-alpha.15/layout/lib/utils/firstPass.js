"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

const isNotNil = R.complement(R.isNil);
/**
 * Takes a list of predicates and returns the first predicate result that returns true for a given list of arguments
 *
 * @param  {...any} predicates
 * @param  {any} value
 */

const firstPass = (...fns) => value => {
  let res;

  for (let i = 0; i < fns.length; i += 1) {
    const fn = fns[i];
    res = fn(value);
    if (isNotNil(res)) return res;
  }

  return res;
};

var _default = firstPass;
exports.default = _default;