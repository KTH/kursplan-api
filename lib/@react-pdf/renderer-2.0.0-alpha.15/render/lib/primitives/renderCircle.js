"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _renderEllipse = require("./renderEllipse");

const getProp = (p, v) => R.path(['props', p], v);

const renderCircle = (ctx, node) => {
  const cx = getProp('cx', node);
  const cy = getProp('cy', node);
  const r = getProp('r', node);
  (0, _renderEllipse.drawEllipse)(ctx, cx, cy, r, r);
  return node;
};

var _default = R.curryN(2, renderCircle);

exports.default = _default;