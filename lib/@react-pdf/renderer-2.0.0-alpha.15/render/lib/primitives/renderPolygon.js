"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _renderPolyline = _interopRequireDefault(require("./renderPolyline"));

const closePath = ctx => R.tap(() => ctx.closePath());

const renderPolygon = ctx => R.compose(closePath(ctx), (0, _renderPolyline.default)(ctx));

var _default = renderPolygon;
exports.default = _default;