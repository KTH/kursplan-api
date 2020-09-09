"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _renderNode = _interopRequireDefault(require("./primitives/renderNode"));

var _addMetadata = _interopRequireDefault(require("./operations/addMetadata"));

const renderDocument = ctx => R.compose(R.forEach((0, _renderNode.default)(ctx)), R.pathOr([], ['children']));

const render = (ctx, doc) => {
  (0, _addMetadata.default)(ctx)(doc);
  renderDocument(ctx)(doc);
  ctx.end();
  return ctx;
};

var _default = render;
exports.default = _default;