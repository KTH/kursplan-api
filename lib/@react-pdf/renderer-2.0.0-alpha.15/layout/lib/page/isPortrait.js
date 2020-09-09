"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _getOrientation = _interopRequireDefault(require("./getOrientation"));

const isPortrait = R.compose(R.equals('portrait'), _getOrientation.default);
var _default = isPortrait;
exports.default = _default;