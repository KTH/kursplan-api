"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports.default = exports.drawPolyline = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _parsePoints = _interopRequireDefault(require("../svg/parsePoints"));

const drawPolyline = ctx => points => {
  if (points.length > 0) {
    ctx.moveTo(points[0][0], points[0][1]);
    points.slice(1).forEach(p => ctx.lineTo(p[0], p[1]));
  }
};

exports.drawPolyline = drawPolyline;

const renderPolyline = ctx => R.tap(R.compose(drawPolyline(ctx), _parsePoints.default, R.pathOr('', ['props', 'points'])));

var _default = renderPolyline;
exports.default = _default;