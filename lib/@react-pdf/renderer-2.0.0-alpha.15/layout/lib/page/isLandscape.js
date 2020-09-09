"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _getOrientation = _interopRequireDefault(require("./getOrientation"));

const isLandscape = R.compose(R.equals('landscape'), _getOrientation.default);
var _default = isLandscape;
exports.default = _default;