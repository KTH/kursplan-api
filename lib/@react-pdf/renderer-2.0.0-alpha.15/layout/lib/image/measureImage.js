"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _yogaLayoutPrebuilt = _interopRequireDefault(require("yoga-layout-prebuilt"));

var _getRatio = _interopRequireDefault(require("./getRatio"));

var _getMargin = _interopRequireDefault(require("../node/getMargin"));

var _getPadding = _interopRequireDefault(require("../node/getPadding"));

var _isHeightAuto = _interopRequireDefault(require("../page/isHeightAuto"));

const SAFETY_HEIGHT = 10;
/**
 * Yoga image measure function
 *
 * @param {Object} page
 * @param {Object} node
 * @param {Number} width
 * @param {Number} widthMode
 * @param {Number} height
 * @param {Number} heightMode
 * @returns {Object} image width and height
 */

const measureImage = (page, node, width, widthMode, height, heightMode) => {
  const imageRatio = (0, _getRatio.default)(node);
  const imageMargin = (0, _getMargin.default)(node);
  const pagePadding = (0, _getPadding.default)(page);
  const pageArea = (0, _isHeightAuto.default)(page) ? Infinity : page.box.height - pagePadding.paddingTop - pagePadding.paddingBottom - imageMargin.marginTop - imageMargin.marginBottom - SAFETY_HEIGHT; // Skip measure if image data not present yet

  if (!node.image) return {
    width: 0,
    height: 0
  };

  if (widthMode === _yogaLayoutPrebuilt.default.MEASURE_MODE_EXACTLY && heightMode === _yogaLayoutPrebuilt.default.MEASURE_MODE_UNDEFINED) {
    const scaledHeight = width / imageRatio;
    return {
      height: Math.min(pageArea, scaledHeight)
    };
  }

  if (heightMode === _yogaLayoutPrebuilt.default.MEASURE_MODE_EXACTLY && (widthMode === _yogaLayoutPrebuilt.default.MEASURE_MODE_AT_MOST || widthMode === _yogaLayoutPrebuilt.default.MEASURE_MODE_UNDEFINED)) {
    return {
      width: Math.min(height * imageRatio, width)
    };
  }

  if (widthMode === _yogaLayoutPrebuilt.default.MEASURE_MODE_EXACTLY && heightMode === _yogaLayoutPrebuilt.default.MEASURE_MODE_AT_MOST) {
    const scaledHeight = width / imageRatio;
    return {
      height: Math.min(height, pageArea, scaledHeight)
    };
  }

  if (widthMode === _yogaLayoutPrebuilt.default.MEASURE_MODE_AT_MOST && heightMode === _yogaLayoutPrebuilt.default.MEASURE_MODE_AT_MOST) {
    if (imageRatio > 1) {
      return {
        width,
        height: Math.min(width / imageRatio, height)
      };
    }

    return {
      height,
      width: Math.min(height * imageRatio, width)
    };
  }

  return {
    height,
    width
  };
};

var _default = R.curryN(6, measureImage);

exports.default = _default;