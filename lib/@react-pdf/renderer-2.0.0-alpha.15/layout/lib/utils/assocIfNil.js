"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

/**
 * Add empt box prop if not present in node
 *
 * @param {Object} node
 * @returns {Object} node with box prop
 */
const assocIfNil = (key, value, target) => R.when(R.compose(R.isNil, R.prop(key)), R.assoc(key, value))(target);

var _default = R.curryN(3, assocIfNil);

exports.default = _default;