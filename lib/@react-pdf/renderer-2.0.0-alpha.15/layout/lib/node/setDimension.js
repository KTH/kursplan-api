"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.setMaxHeight = exports.setMinHeight = exports.setHeight = exports.setMaxWidth = exports.setMinWidth = exports.setWidth = void 0;

var _setYogaValue = _interopRequireDefault(require("./setYogaValue"));

/**
 * Set width to node's Yoga instance
 *
 * @param {Number} width
 * @param {Object} node instance
 * @return {Object} node instance
 */
const setWidth = (0, _setYogaValue.default)('width');
/**
 * Set min width to node's Yoga instance
 *
 * @param {Number} min width
 * @param {Object} node instance
 * @return {Object} node instance
 */

exports.setWidth = setWidth;
const setMinWidth = (0, _setYogaValue.default)('minWidth');
/**
 * Set max width to node's Yoga instance
 *
 * @param {Number} max width
 * @param {Object} node instance
 * @return {Object} node instance
 */

exports.setMinWidth = setMinWidth;
const setMaxWidth = (0, _setYogaValue.default)('maxWidth');
/**
 * Set height to node's Yoga instance
 *
 * @param {Number} height
 * @param {Object} node instance
 * @return {Object} node instance
 */

exports.setMaxWidth = setMaxWidth;
const setHeight = (0, _setYogaValue.default)('height');
/**
 * Set min height to node's Yoga instance
 *
 * @param {Number} min height
 * @param {Object} node instance
 * @return {Object} node instance
 */

exports.setHeight = setHeight;
const setMinHeight = (0, _setYogaValue.default)('minHeight');
/**
 * Set max height to node's Yoga instance
 *
 * @param {Number} max height
 * @param {Object} node instance
 * @return {Object} node instance
 */

exports.setMinHeight = setMinHeight;
const setMaxHeight = (0, _setYogaValue.default)('maxHeight');
exports.setMaxHeight = setMaxHeight;