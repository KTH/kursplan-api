"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _parseViewbox = _interopRequireDefault(require("./parseViewbox"));

const getContainer = node => {
  const viewbox = (0, _parseViewbox.default)(node.props.viewBox);

  if (viewbox) {
    return {
      width: viewbox.maxX,
      height: viewbox.maxY
    };
  }

  if (node.props.width && node.props.height) {
    return {
      width: parseFloat(node.props.width),
      height: parseFloat(node.props.height)
    };
  }

  return {
    width: 0,
    height: 0
  };
};

var _default = getContainer;
exports.default = _default;