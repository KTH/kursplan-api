"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

const getProp = (p, v) => R.path(['props', p], v);

const renderLine = ctx => node => {
  const x1 = getProp('x1', node);
  const y1 = getProp('y1', node);
  const x2 = getProp('x2', node);
  const y2 = getProp('y2', node);
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  return node;
};

var _default = renderLine;
exports.default = _default;