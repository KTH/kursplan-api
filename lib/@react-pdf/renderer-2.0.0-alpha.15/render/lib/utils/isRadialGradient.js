"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var P = _interopRequireWildcard(require("@react-pdf/primitives"));

const isRadialGradient = R.propEq('type', P.RadialGradient);
var _default = isRadialGradient;
exports.default = _default;