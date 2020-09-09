"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _save = _interopRequireDefault(require("../operations/save"));

var _restore = _interopRequireDefault(require("../operations/restore"));

const drawImage = ctx => node => {
  const {
    x,
    y
  } = node.props;
  const {
    width,
    height,
    opacity
  } = node.style;
  const paddingTop = node.box.paddingLeft || 0;
  const paddingLeft = node.box.paddingLeft || 0;

  if (node.image.data) {
    if (width !== 0 && height !== 0) {
      ctx.fillOpacity(opacity || 1).image(node.image.data, x + paddingLeft, y + paddingTop, {
        width,
        height
      });
    } else {
      console.warn(`Image with src '${node.props.href}' skipped due to invalid dimensions`);
    }
  }

  return node;
};

const renderImage = (ctx, node) => {
  R.compose((0, _restore.default)(ctx), drawImage(ctx), (0, _save.default)(ctx))(node);
  return node;
};

var _default = R.curryN(2, renderImage);

exports.default = _default;