"use strict";

exports.__esModule = true;
exports.default = void 0;

const isPercent = value => /((-)?\d+\.?\d*)%/g.exec(value);
/**
 * Get percentage value of input
 *
 * @param {String} value
 * @returns {Object} percent value (if matches)
 */


const matchPercent = value => {
  const match = isPercent(value);

  if (match) {
    const f = parseFloat(match[1], 10);
    const percent = f / 100;
    return {
      percent,
      value: f
    };
  }

  return null;
};

var _default = matchPercent;
exports.default = _default;