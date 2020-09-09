"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var P = _interopRequireWildcard(require("@react-pdf/primitives"));

var _layout = _interopRequireDefault(require("@react-pdf/textkit/layout"));

var _linebreaker = _interopRequireDefault(require("@react-pdf/textkit/engines/linebreaker"));

var _justification = _interopRequireDefault(require("@react-pdf/textkit/engines/justification"));

var _scriptItemizer = _interopRequireDefault(require("@react-pdf/textkit/engines/scriptItemizer"));

var _wordHyphenation = _interopRequireDefault(require("@react-pdf/textkit/engines/wordHyphenation"));

var _textDecoration = _interopRequireDefault(require("@react-pdf/textkit/engines/textDecoration"));

var _attributedString = _interopRequireDefault(require("@react-pdf/textkit/attributedString"));

var _transformText = _interopRequireDefault(require("../text/transformText"));

var _fontSubstitution = _interopRequireDefault(require("../text/fontSubstitution"));

const isTextInstance = R.propEq('type', P.TextInstance);
const engines = {
  linebreaker: _linebreaker.default,
  justification: _justification.default,
  scriptItemizer: _scriptItemizer.default,
  wordHyphenation: _wordHyphenation.default,
  fontSubstitution: _fontSubstitution.default,
  textDecoration: _textDecoration.default
};
const engine = (0, _layout.default)(engines);

const getFragments = (fontStore, instance) => {
  if (!instance) return [{
    string: ''
  }];
  const fragments = [];
  const {
    fill = 'black',
    fontFamily = 'Helvetica',
    fontWeight,
    fontStyle,
    fontSize = 18,
    textDecoration,
    textDecorationColor,
    textDecorationStyle,
    textTransform,
    opacity
  } = instance.props;
  const obj = fontStore ? fontStore.getFont({
    fontFamily,
    fontWeight,
    fontStyle
  }) : null;
  const font = obj ? obj.data : fontFamily;
  const attributes = {
    font,
    opacity,
    fontSize,
    color: fill,
    underlineStyle: textDecorationStyle,
    underline: textDecoration === 'underline',
    underlineColor: textDecorationColor || fill,
    strike: textDecoration === 'line-through',
    strikeStyle: textDecorationStyle,
    strikeColor: textDecorationColor || fill
  };

  for (let i = 0; i < instance.children.length; i += 1) {
    const child = instance.children[i];

    if (isTextInstance(child)) {
      fragments.push({
        string: (0, _transformText.default)(child.value, textTransform),
        attributes
      });
    } else if (child) {
      fragments.push(...getFragments(child));
    }
  }

  return fragments;
};

const getAttributedString = (fontStore, instance) => _attributedString.default.fromFragments(getFragments(fontStore, instance));

const AlmostInfinity = 999999999999;
const shrinkWhitespaceFactor = {
  before: -0.5,
  after: -0.5
};

const layoutTspan = fontStore => node => {
  const attributedString = getAttributedString(fontStore, node);
  const x = R.pathOr(0, ['props', 'x'], node);
  const y = R.pathOr(0, ['props', 'y'], node);
  const container = {
    x,
    y,
    width: AlmostInfinity,
    height: AlmostInfinity
  };
  const hyphenationCallback = fontStore ? fontStore.getHyphenationCallback() : null;
  const layoutOptions = {
    hyphenationCallback,
    shrinkWhitespaceFactor
  };
  const lines = R.compose(R.reduce(R.concat, []), engine)(attributedString, container, layoutOptions);
  return R.assoc('lines', lines, node);
};

const layoutText = (fontStore, node) => R.evolve({
  children: R.map(layoutTspan(fontStore))
})(node);

var _default = R.curryN(2, layoutText);

exports.default = _default;