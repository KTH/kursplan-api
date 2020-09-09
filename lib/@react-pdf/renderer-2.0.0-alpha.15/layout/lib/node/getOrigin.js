"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _matchPercent = _interopRequireDefault(require("../utils/matchPercent"));

const getTransformStyle = s => R.pathOr('50%', ['style', s]);
/**
 * Get node origin
 *
 * @param {Object} node
 * @returns {Object} node origin
 */


const getOrigin = node => {
  if (!node.box) return {};
  const {
    left,
    top,
    width,
    height
  } = node.box;
  const transformOriginX = getTransformStyle('transformOriginX')(node);
  const transformOriginY = getTransformStyle('transformOriginY')(node);
  const percentX = (0, _matchPercent.default)(transformOriginX);
  const percentY = (0, _matchPercent.default)(transformOriginY);
  const offsetX = percentX ? width * percentX.percent : transformOriginX;
  const offsetY = percentY ? height * percentY.percent : transformOriginY;
  return {
    left: left + offsetX,
    top: top + offsetY
  };
};

var _default = getOrigin;
exports.default = _default;