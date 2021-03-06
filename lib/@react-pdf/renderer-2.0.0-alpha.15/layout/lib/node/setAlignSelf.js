"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _setAlign = _interopRequireDefault(require("./setAlign"));

/**
 * Set align self attribute to node's Yoga instance
 *
 * @param {String} align value
 * @param {Object} node instance
 * @return {Object} node instance
 */
const setAlignSelf = (0, _setAlign.default)('self');
var _default = setAlignSelf;
exports.default = _default;