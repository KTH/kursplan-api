"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

const setDestination = (ctx, node) => {
  var _node$props;

  if ((_node$props = node.props) === null || _node$props === void 0 ? void 0 : _node$props.id) {
    ctx.addNamedDestination(node.props.id, 'XYZ', null, node.box.top, null);
  }

  return node;
};

var _default = R.curryN(2, setDestination);

exports.default = _default;