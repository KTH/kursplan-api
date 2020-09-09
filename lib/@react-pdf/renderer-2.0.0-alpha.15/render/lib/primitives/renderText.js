"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _pdf = _interopRequireDefault(require("@react-pdf/textkit/renderers/pdf"));

const renderText = (ctx, node) => {
  const {
    top,
    left
  } = node.box;
  const paddingTop = R.pathOr(0, ['box', 'paddingTop'], node);
  const paddingLeft = R.pathOr(0, ['box', 'paddingLeft'], node);
  const initialY = node.lines[0] ? node.lines[0].box.y : 0;
  ctx.save();
  ctx.translate(left + paddingLeft, top + paddingTop - initialY);

  _pdf.default.render(ctx, [node.lines]);

  ctx.restore();
  return node;
};

var _default = R.curryN(2, renderText);

exports.default = _default;