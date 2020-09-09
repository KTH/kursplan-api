"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

// import { getURL } from '../utils/url';
const DEST_REGEXP = /^#.+/;
const isSrcId = R.test(DEST_REGEXP);
const getSource = R.compose(R.either(R.path(['props', 'src']), R.path(['props', 'href'])));

const setLink = (ctx, node) => {
  const {
    top,
    left,
    width,
    height
  } = node.box;
  const src = getSource(node);
  const instanceMethod = isSrcId(src) ? 'goTo' : 'link';
  const value = src ? src.slice(1) : null;

  if (value) {
    ctx[instanceMethod](left, top, width, height, value);
  }

  return node;
};

var _default = R.curryN(2, setLink);

exports.default = _default;