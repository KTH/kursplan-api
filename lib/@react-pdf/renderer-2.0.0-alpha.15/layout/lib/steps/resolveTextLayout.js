"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var P = _interopRequireWildcard(require("@react-pdf/primitives"));

var _layoutText = _interopRequireDefault(require("../text/layoutText"));

const isType = R.propEq('type');
const isSvg = isType(P.Svg);
const isText = isType(P.Text);
const isNotSvg = R.complement(isSvg);

const hasLines = node => node.props.fixed ? !R.isEmpty(node.lines) : !!node.lines;

const shouldLayoutText = node => isText(node) && !hasLines(node);
/**
 * Performs text layout on text node if wasn't calculated before.
 * Text layout is usually performed on Yoga's layout process (via setMeasureFunc),
 * but we need to layout those nodes with fixed width and height.
 *
 * @param {Object} node
 * @returns {Object} layout node
 */


const resolveTextLayout = (node, fontStore) => {
  const mapChild = child => resolveTextLayout(child, fontStore);

  return R.compose(R.evolve({
    children: R.map(R.when(isNotSvg, mapChild))
  }), R.when(shouldLayoutText, R.compose(R.converge(R.assoc('lines'), [R.converge(_layoutText.default, [R.identity, R.path(['box', 'width']), R.path(['box', 'height']), R.always(fontStore)]), R.identity]))))(node);
};

var _default = resolveTextLayout;
exports.default = _default;