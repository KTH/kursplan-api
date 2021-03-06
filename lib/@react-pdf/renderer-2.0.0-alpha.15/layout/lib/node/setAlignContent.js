"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _setAlign = _interopRequireDefault(require("./setAlign"));

/**
 * Set align content attribute to node's Yoga instance
 *
 * @param {String} align value
 * @param {Object} node instance
 * @return {Object} node instance
 */
const setAlignContent = (0, _setAlign.default)('content');
var _default = setAlignContent;
exports.default = _default;