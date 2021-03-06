"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

const restore = (ctx, node) => {
  ctx.restore();
  return node;
};

var _default = R.curryN(2, restore);

exports.default = _default;