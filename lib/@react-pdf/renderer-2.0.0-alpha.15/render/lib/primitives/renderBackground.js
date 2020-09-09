"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _save = _interopRequireDefault(require("../operations/save"));

var _restore = _interopRequireDefault(require("../operations/restore"));

var _clipNode = _interopRequireDefault(require("../operations/clipNode"));

const drawBackground = ctx => node => {
  if (node.box && node.style.backgroundColor) {
    var _node$style;

    const {
      top,
      left,
      width,
      height
    } = node.box;
    const opacity = R.defaultTo(1, (_node$style = node.style) === null || _node$style === void 0 ? void 0 : _node$style.opacity);
    ctx.fillOpacity(opacity).fillColor(node.style.backgroundColor).rect(left, top, width, height).fill();
  }

  return node;
};

const shouldRenderBackground = R.both(R.has('box'), R.hasPath(['style', 'backgroundColor']));

const renderBackground = (ctx, node) => {
  R.when(shouldRenderBackground, R.compose((0, _restore.default)(ctx), drawBackground(ctx), (0, _clipNode.default)(ctx), (0, _save.default)(ctx)))(node);
  return node;
};

var _default = R.curryN(2, renderBackground);

exports.default = _default;