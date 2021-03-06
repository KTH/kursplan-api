"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _capitalize = _interopRequireDefault(require("../utils/capitalize"));

var _upperFirst = _interopRequireDefault(require("../utils/upperFirst"));

/**
 * Apply transformation to text string
 *
 * @param {String} text
 * @param {String} transformation type
 * @returns {String} transformed text
 */
const transformText = (text, transformation) => {
  switch (transformation) {
    case 'uppercase':
      return text.toUpperCase();

    case 'lowercase':
      return text.toLowerCase();

    case 'capitalize':
      return (0, _capitalize.default)(text);

    case 'upperfirst':
      return (0, _upperFirst.default)(text);

    default:
      return text;
  }
};

var _default = transformText;
exports.default = _default;