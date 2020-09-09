"use strict";

exports.__esModule = true;
exports.default = void 0;

const evolveWhile = (condition, processor) => async value => {
  let currentValue = value;

  while (condition(currentValue)) {
    currentValue = await processor(currentValue);
  }

  return currentValue;
};

var _default = evolveWhile;
exports.default = _default;