"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _save = _interopRequireDefault(require("../operations/save"));

var _restore = _interopRequireDefault(require("../operations/restore"));

var _clipNode = _interopRequireDefault(require("../operations/clipNode"));

var _resolveObjectFit = _interopRequireDefault(require("../utils/resolveObjectFit"));

const drawImage = ctx => node => {
  var _node$style, _node$style2, _node$style3, _node$style4;

  const {
    left,
    top
  } = node.box;
  const opacity = (_node$style = node.style) === null || _node$style === void 0 ? void 0 : _node$style.opacity;
  const objectFit = (_node$style2 = node.style) === null || _node$style2 === void 0 ? void 0 : _node$style2.objectFit;
  const objectPositionX = (_node$style3 = node.style) === null || _node$style3 === void 0 ? void 0 : _node$style3.objectPositionX;
  const objectPositionY = (_node$style4 = node.style) === null || _node$style4 === void 0 ? void 0 : _node$style4.objectPositionY;
  const paddingTop = node.box.paddingLeft || 0;
  const paddingRight = node.box.paddingRight || 0;
  const paddingBottom = node.box.paddingBottom || 0;
  const paddingLeft = node.box.paddingLeft || 0;
  const {
    width,
    height,
    xOffset,
    yOffset
  } = (0, _resolveObjectFit.default)(objectFit, node.box.width - paddingLeft - paddingRight, node.box.height - paddingTop - paddingBottom, node.image.width, node.image.height, objectPositionX, objectPositionY);

  if (node.image.data) {
    if (width !== 0 && height !== 0) {
      ctx.fillOpacity(opacity || 1).image(node.image.data, left + paddingLeft + xOffset, top + paddingTop + yOffset, {
        width,
        height
      });
    } else {
      console.warn(`Image with src '${node.props.src}' skipped due to invalid dimensions`);
    }
  }

  return node;
};

const renderImage = (ctx, node) => {
  R.compose((0, _restore.default)(ctx), drawImage(ctx), (0, _clipNode.default)(ctx), (0, _save.default)(ctx))(node);
  return node;
};

var _default = R.curryN(2, renderImage);

exports.default = _default;