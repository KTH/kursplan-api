"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _attributedString = _interopRequireDefault(require("@react-pdf/textkit/attributedString"));

/**
 * Get lines width (if any)
 *
 * @param {Object} node
 * @returns {Number} lines width
 */
const linesWidth = node => {
  if (!node.lines) return -1;
  return Math.max(...node.lines.map(line => _attributedString.default.advanceWidth(line)));
};

var _default = linesWidth;
exports.default = _default;