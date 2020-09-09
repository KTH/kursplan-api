"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _absSvgPath = _interopRequireDefault(require("abs-svg-path"));

var _parseSvgPath = _interopRequireDefault(require("parse-svg-path"));

var _normalizeSvgPath = _interopRequireDefault(require("normalize-svg-path"));

var _isRect = _interopRequireDefault(require("../utils/isRect"));

var _isLine = _interopRequireDefault(require("../utils/isLine"));

var _isPath = _interopRequireDefault(require("../utils/isPath"));

var _isCircle = _interopRequireDefault(require("../utils/isCircle"));

var _isPolygon = _interopRequireDefault(require("../utils/isPolygon"));

var _isEllipse = _interopRequireDefault(require("../utils/isEllipse"));

var _isPolyline = _interopRequireDefault(require("../utils/isPolyline"));

var _parsePoints = _interopRequireDefault(require("./parsePoints"));

// From https://github.com/dy/svg-path-bounds/blob/master/index.js
const getPathBoundingBox = node => {
  const path = R.compose(_normalizeSvgPath.default, _absSvgPath.default, _parseSvgPath.default, R.pathOr('', ['props', 'd']))(node);
  if (!path.length) return [0, 0, 0, 0];
  const bounds = [Infinity, Infinity, -Infinity, -Infinity];

  for (let i = 0, l = path.length; i < l; i += 1) {
    const points = path[i].slice(1);

    for (let j = 0; j < points.length; j += 2) {
      if (points[j + 0] < bounds[0]) bounds[0] = points[j + 0];
      if (points[j + 1] < bounds[1]) bounds[1] = points[j + 1];
      if (points[j + 0] > bounds[2]) bounds[2] = points[j + 0];
      if (points[j + 1] > bounds[3]) bounds[3] = points[j + 1];
    }
  }

  return bounds;
};

const getCircleBoundingBox = node => {
  const r = R.pathOr(0, ['props', 'r'], node);
  const cx = R.pathOr(0, ['props', 'cx'], node);
  const cy = R.pathOr(0, ['props', 'cy'], node);
  return [cx - r, cy - r, cx + r, cy + r];
};

const getEllipseBoundingBox = node => {
  const cx = R.pathOr(0, ['props', 'cx'], node);
  const cy = R.pathOr(0, ['props', 'cy'], node);
  const rx = R.pathOr(0, ['props', 'rx'], node);
  const ry = R.pathOr(0, ['props', 'ry'], node);
  return [cx - rx, cy - ry, cx + rx, cy + ry];
};

const getLineBoundingBox = node => {
  const x1 = R.pathOr(0, ['props', 'x1'], node);
  const y1 = R.pathOr(0, ['props', 'y1'], node);
  const x2 = R.pathOr(0, ['props', 'x2'], node);
  const y2 = R.pathOr(0, ['props', 'y2'], node);
  return [R.min(x1, x2), R.min(y1, y2), R.max(x1, x2), R.max(y1, y2)];
};

const getRectBoundingBox = node => {
  const x = R.pathOr(0, ['props', 'x'], node);
  const y = R.pathOr(0, ['props', 'y'], node);
  const width = R.pathOr(0, ['props', 'width'], node);
  const height = R.pathOr(0, ['props', 'height'], node);
  return [x, y, x + width, y + height];
};

const max = R.reduce(R.max, -Infinity);
const min = R.reduce(R.min, Infinity);

const getPolylineBoundingBox = node => {
  const points = R.compose(_parsePoints.default, R.pathOr([], ['props', 'points']))(node);
  const xValues = R.pluck(0, points);
  const yValues = R.pluck(1, points);
  return [min(xValues), min(yValues), max(xValues), max(yValues)];
};

const getBoundingBox = R.cond([[_isRect.default, getRectBoundingBox], [_isLine.default, getLineBoundingBox], [_isPath.default, getPathBoundingBox], [_isCircle.default, getCircleBoundingBox], [_isEllipse.default, getEllipseBoundingBox], [_isPolygon.default, getPolylineBoundingBox], [_isPolyline.default, getPolylineBoundingBox], [R.T, R.always([0, 0, 0, 0])]]);
var _default = getBoundingBox;
exports.default = _default;