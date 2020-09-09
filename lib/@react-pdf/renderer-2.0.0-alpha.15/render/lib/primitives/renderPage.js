"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

const renderPage = (ctx, node) => {
  const {
    width,
    height
  } = node.box;
  ctx.addPage({
    size: [width, height],
    margin: 0
  });
  return node;
};

var _default = R.curryN(2, renderPage);

exports.default = _default;