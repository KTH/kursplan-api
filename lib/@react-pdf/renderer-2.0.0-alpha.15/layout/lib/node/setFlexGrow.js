"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _setYogaValue = _interopRequireDefault(require("./setYogaValue"));

/**
 * Set flex grow attribute to node's Yoga instance
 *
 * @param {Number} flex grow value
 * @param {Object} node instance
 * @return {Object} node instance
 */
const setFlexGrow = R.compose((0, _setYogaValue.default)('flexGrow'), R.defaultTo(0));
var _default = setFlexGrow;
exports.default = _default;