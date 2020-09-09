"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _primitives = require("@react-pdf/primitives");

var _castArray = _interopRequireDefault(require("../utils/castArray"));

const isString = R.is(String);
const isNumber = R.is(Number);
const isNotString = R.complement(isString);
/**
 * Transforms a react element instance to internal element format
 *
 * @param {Object} React element
 * @returns {Object} parsed react element
 */

const createInstance = element => {
  if (isString(element) || isNumber(element)) return {
    type: _primitives.TextInstance,
    value: `${element}`
  };
  if (isNotString(element.type)) return createInstance(element.type(element.props));
  const {
    type,
    props: {
      style = {},
      children = [],
      ...props
    }
  } = element;
  const nextChildren = R.compose(R.map(createInstance), _castArray.default)(children);
  return {
    type,
    style,
    props,
    box: {},
    children: nextChildren
  };
};

var _default = createInstance;
exports.default = _default;