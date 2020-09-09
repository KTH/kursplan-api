"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var P = _interopRequireWildcard(require("@react-pdf/primitives"));

var _colors = require("@react-pdf/stylesheet/lib/colors");

var _layoutText = _interopRequireDefault(require("../svg/layoutText"));

var _replaceDefs = _interopRequireDefault(require("../svg/replaceDefs"));

var _getContainer = _interopRequireDefault(require("../svg/getContainer"));

var _parseViewbox = _interopRequireDefault(require("../svg/parseViewbox"));

var _inheritProps = _interopRequireDefault(require("../svg/inheritProps"));

var _matchPercent = _interopRequireDefault(require("../utils/matchPercent"));

var _parseAspectRatio = _interopRequireDefault(require("../svg/parseAspectRatio"));

const STYLE_PROPS = ['width', 'height', 'color', 'stroke', 'strokeWidth', 'opacity', 'fillOpacity', 'strokeOpacity', 'fill', 'fillRule', 'clipPath', 'offset', 'transform', 'strokeLinejoin', 'strokeLinecap', 'strokeDasharray'];
const VERTICAL_PROPS = ['y', 'y1', 'y2', 'height', 'cy', 'ry'];
const HORIZONTAL_PROPS = ['x', 'x1', 'x2', 'width', 'cx', 'rx'];
const isType = R.propEq('type');
const isSvg = isType(P.Svg);
const isText = isType(P.Text);
const isTextInstance = isType(P.TextInstance);

const transformPercent = container => R.mapObjIndexed((value, key) => {
  const match = (0, _matchPercent.default)(value);

  if (match && VERTICAL_PROPS.includes(key)) {
    return match.percent * container.height;
  }

  if (match && HORIZONTAL_PROPS.includes(key)) {
    return match.percent * container.width;
  }

  return value;
});

const parsePercent = value => {
  const match = (0, _matchPercent.default)(value);
  return match ? match.percent : parseFloat(value);
};

const parseProps = container => R.compose(R.evolve({
  props: R.o(R.evolve({
    x: parseFloat,
    x1: parseFloat,
    x2: parseFloat,
    y: parseFloat,
    y1: parseFloat,
    y2: parseFloat,
    r: parseFloat,
    rx: parseFloat,
    ry: parseFloat,
    cx: parseFloat,
    cy: parseFloat,
    width: parseFloat,
    height: parseFloat,
    offset: parsePercent,
    fill: _colors.transformColor,
    opacity: parsePercent,
    stroke: _colors.transformColor,
    stopOpacity: parsePercent,
    stopColor: _colors.transformColor
  }), transformPercent(container))
}));

const mergeStyles = node => {
  const style = R.propOr({}, 'style', node);
  return R.evolve({
    props: R.merge(style)
  }, node);
};

const removeNoneValues = R.evolve({
  props: R.map(R.when(R.equals('none'), R.always(null)))
});

const pickStyleProps = node => {
  const styleProps = R.o(R.pick(STYLE_PROPS), R.propOr({}, 'props'))(node);
  return R.evolve({
    style: R.merge(styleProps)
  }, node);
};

const parseSvgProps = R.evolve({
  props: R.evolve({
    width: parseFloat,
    height: parseFloat,
    viewBox: _parseViewbox.default,
    preserveAspectRatio: _parseAspectRatio.default
  })
});

const wrapBetweenTspan = node => ({
  type: 'TSPAN',
  props: {},
  children: [node]
});

const addMissingTspan = R.when(isText, R.evolve({
  children: R.map(R.when(isTextInstance, wrapBetweenTspan))
}));

const resolveSvgNode = container => R.compose(parseProps(container), addMissingTspan, removeNoneValues, mergeStyles);

const resolveChildren = container => node => R.evolve({
  children: R.map(R.compose(resolveChildren(container), resolveSvgNode(container)))
})(node);

const parseText = fontStore => node => R.ifElse(isText, (0, _layoutText.default)(fontStore), R.evolve({
  children: R.map(parseText(fontStore))
}))(node);

const resolveSvgRoot = fontStore => node => {
  const container = (0, _getContainer.default)(node);
  return R.compose(_replaceDefs.default, parseText(fontStore), parseSvgProps, pickStyleProps, _inheritProps.default, resolveChildren(container))(node);
};

const resolveSvg = (node, fontStore) => {
  const mapChild = child => resolveSvg(child, fontStore);

  return R.compose(R.evolve({
    children: R.map(mapChild)
  }), R.when(isSvg, resolveSvgRoot(fontStore)))(node);
};

var _default = resolveSvg;
exports.default = _default;