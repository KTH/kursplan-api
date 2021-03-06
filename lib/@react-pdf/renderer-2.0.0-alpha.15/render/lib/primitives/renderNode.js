"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _renderSvg = _interopRequireDefault(require("./renderSvg"));

var _renderText = _interopRequireDefault(require("./renderText"));

var _renderPage = _interopRequireDefault(require("./renderPage"));

var _renderNote = _interopRequireDefault(require("./renderNote"));

var _renderImage = _interopRequireDefault(require("./renderImage"));

var _renderDebug = _interopRequireDefault(require("./renderDebug"));

var _renderCanvas = _interopRequireDefault(require("./renderCanvas"));

var _renderBorders = _interopRequireDefault(require("./renderBorders"));

var _renderBackground = _interopRequireDefault(require("./renderBackground"));

var _isSvg = _interopRequireDefault(require("../utils/isSvg"));

var _isLink = _interopRequireDefault(require("../utils/isLink"));

var _isPage = _interopRequireDefault(require("../utils/isPage"));

var _isNote = _interopRequireDefault(require("../utils/isNote"));

var _isText = _interopRequireDefault(require("../utils/isText"));

var _isImage = _interopRequireDefault(require("../utils/isImage"));

var _isCanvas = _interopRequireDefault(require("../utils/isCanvas"));

var _save = _interopRequireDefault(require("../operations/save"));

var _setLink = _interopRequireDefault(require("../operations/setLink"));

var _restore = _interopRequireDefault(require("../operations/restore"));

var _clipNode = _interopRequireDefault(require("../operations/clipNode"));

var _transform = _interopRequireDefault(require("../operations/transform"));

var _setDestination = _interopRequireDefault(require("../operations/setDestination"));

const shouldRenderChildren = v => !(0, _isText.default)(v) && !(0, _isSvg.default)(v);

const isOverflowHidden = R.pathEq(['style', 'overflow'], 'hidden');

const renderChildren = ctx => node => {
  (0, _save.default)(ctx, node);

  if (node.box) {
    ctx.translate(node.box.left, node.box.top);
  }

  R.compose(R.forEach(renderNode(ctx)), R.pathOr([], ['children']))(node);
  (0, _restore.default)(ctx, node);
  return node;
};

const renderNode = ctx => node => R.compose((0, _restore.default)(ctx), (0, _renderDebug.default)(ctx), (0, _setDestination.default)(ctx), R.when(shouldRenderChildren, renderChildren(ctx)), R.when(R.either(_isText.default, _isLink.default), (0, _setLink.default)(ctx)), R.cond([[_isText.default, (0, _renderText.default)(ctx)], [_isNote.default, (0, _renderNote.default)(ctx)], [_isImage.default, (0, _renderImage.default)(ctx)], [_isCanvas.default, (0, _renderCanvas.default)(ctx)], [_isSvg.default, (0, _renderSvg.default)(ctx)], [R.T, R.identity]]), (0, _renderBorders.default)(ctx), (0, _renderBackground.default)(ctx), (0, _transform.default)(ctx), R.when(isOverflowHidden, (0, _clipNode.default)(ctx)), (0, _save.default)(ctx), R.when(_isPage.default, (0, _renderPage.default)(ctx)))(node);

var _default = renderNode;
exports.default = _default;