"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

/* eslint-disable no-await-in-loop */

/**
 * Performs right-to-left function composition with async functions support
 *
 * @param  {...any} functions
 */
const asyncCompose = (...fns) => async (value, ...args) => {
  let result = value;
  const reversedFns = R.reverse(fns);

  for (let i = 0; i < reversedFns.length; i += 1) {
    const fn = reversedFns[i];
    result = await fn(result, ...args);
  }

  return result;
};

var _default = asyncCompose;
exports.default = _default;