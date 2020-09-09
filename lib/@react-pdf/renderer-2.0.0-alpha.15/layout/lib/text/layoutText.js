"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _layout = _interopRequireDefault(require("@react-pdf/textkit/layout"));

var _linebreaker = _interopRequireDefault(require("@react-pdf/textkit/engines/linebreaker"));

var _justification = _interopRequireDefault(require("@react-pdf/textkit/engines/justification"));

var _textDecoration = _interopRequireDefault(require("@react-pdf/textkit/engines/textDecoration"));

var _scriptItemizer = _interopRequireDefault(require("@react-pdf/textkit/engines/scriptItemizer"));

var _wordHyphenation = _interopRequireDefault(require("@react-pdf/textkit/engines/wordHyphenation"));

var _fontSubstitution = _interopRequireDefault(require("./fontSubstitution"));

var _getAttributedString = _interopRequireDefault(require("./getAttributedString"));

const engines = {
  linebreaker: _linebreaker.default,
  justification: _justification.default,
  textDecoration: _textDecoration.default,
  scriptItemizer: _scriptItemizer.default,
  wordHyphenation: _wordHyphenation.default,
  fontSubstitution: _fontSubstitution.default
};
const engine = (0, _layout.default)(engines);
const getMaxLines = R.path(['style', 'maxLines']);
const getTextOverflow = R.path(['style', 'textOverflow']);
/**
 * Get layout container for specific text node
 *
 * @param {Number} width
 * @param {Number} height
 * @param {Object} node
 * @returns {Object} layout container
 */

const getContainer = (width, height) => node => {
  const maxLines = getMaxLines(node);
  const textOverflow = getTextOverflow(node);
  return {
    x: 0,
    y: 0,
    width,
    maxLines,
    height: height || Infinity,
    truncateMode: textOverflow
  };
};
/**
 * Get text layout options for specific text node
 *
 * @param {Object} node instance
 * @returns {Object} layout options
 */


const getLayoutOptions = fontStore => node => ({
  hyphenationPenalty: node.props.hyphenationPenalty,
  shrinkWhitespaceFactor: {
    before: -0.5,
    after: -0.5
  },
  hyphenationCallback: fontStore ? fontStore.getHyphenationCallback() : null
});
/**
 * Get text lines for given node
 *
 * @param {Object} node
 * @param {Number} container width
 * @param {Number} container height
 * @param {Number} fontStore font store
 * @returns {Array} layout lines
 */


const layoutText = (node, width, height, fontStore) => R.compose(R.reduce(R.concat, []), R.converge(engine, [(0, _getAttributedString.default)(fontStore), getContainer(width, height), getLayoutOptions(fontStore)]))(node);

var _default = R.curryN(4, layoutText);

exports.default = _default;