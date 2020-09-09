"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _getPadding = _interopRequireDefault(require("../node/getPadding"));

const getContentArea = page => {
  const {
    paddingTop
  } = (0, _getPadding.default)(page);
  const height = R.path(['style', 'height'], page);
  return height - paddingTop;
};

var _default = getContentArea;
exports.default = _default;