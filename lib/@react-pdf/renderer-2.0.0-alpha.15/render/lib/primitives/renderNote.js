"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

const renderNote = (ctx, node) => {
  var _node$children;

  const {
    top,
    left
  } = node.box;
  const value = (node === null || node === void 0 ? void 0 : (_node$children = node.children) === null || _node$children === void 0 ? void 0 : _node$children[0].value) || '';
  ctx.note(left, top, 0, 0, value);
  return node;
};

var _default = R.curryN(2, renderNote);

exports.default = _default;