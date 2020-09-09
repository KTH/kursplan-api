"use strict";

exports.__esModule = true;
exports.default = void 0;

/**
 * Capitalize first letter of each word
 *
 * @param {String} string
 * @returns {String} capitalized string
 */
const capitalize = value => {
  if (!value) return value;
  return value.replace(/(^|\s)\S/g, l => l.toUpperCase());
};

var _default = capitalize;
exports.default = _default;