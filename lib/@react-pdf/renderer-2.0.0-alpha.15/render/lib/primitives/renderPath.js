"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

const renderPath = ctx => R.tap(node => {
  const d = R.path(['props', 'd'], node);
  if (d) ctx.path(node.props.d);
});

var _default = renderPath;
exports.default = _default;