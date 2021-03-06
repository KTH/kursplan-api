"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _setYogaValue = _interopRequireDefault(require("./setYogaValue"));

/**
 * Set flex basis attribute to node's Yoga instance
 *
 * @param {Number} flex basis value
 * @param {Object} node instance
 * @return {Object} node instance
 */
const setFlexBasis = (0, _setYogaValue.default)('flexBasis');
var _default = setFlexBasis;
exports.default = _default;