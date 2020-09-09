"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var P = _interopRequireWildcard(require("@react-pdf/primitives"));

var _renderPath = _interopRequireDefault(require("./renderPath"));

var _renderRect = _interopRequireDefault(require("./renderRect"));

var _renderLine = _interopRequireDefault(require("./renderLine"));

var _renderGroup = _interopRequireDefault(require("./renderGroup"));

var _renderCircle = _interopRequireDefault(require("./renderCircle"));

var _renderSvgText = _interopRequireDefault(require("./renderSvgText"));

var _renderEllipse = _interopRequireDefault(require("./renderEllipse"));

var _renderPolygon = _interopRequireDefault(require("./renderPolygon"));

var _renderPolyline = _interopRequireDefault(require("./renderPolyline"));

var _renderSvgImage = _interopRequireDefault(require("./renderSvgImage"));

var _isPath = _interopRequireDefault(require("../utils/isPath"));

var _isText = _interopRequireDefault(require("../utils/isText"));

var _isRect = _interopRequireDefault(require("../utils/isRect"));

var _isLine = _interopRequireDefault(require("../utils/isLine"));

var _isTspan = _interopRequireDefault(require("../utils/isTspan"));

var _isImage = _interopRequireDefault(require("../utils/isImage"));

var _isGroup = _interopRequireDefault(require("../utils/isGroup"));

var _isCircle = _interopRequireDefault(require("../utils/isCircle"));

var _isEllipse = _interopRequireDefault(require("../utils/isEllipse"));

var _isPolygon = _interopRequireDefault(require("../utils/isPolygon"));

var _isPolyline = _interopRequireDefault(require("../utils/isPolyline"));

var _isTextInstance = _interopRequireDefault(require("../utils/isTextInstance"));

var _save = _interopRequireDefault(require("../operations/save"));

var _restore = _interopRequireDefault(require("../operations/restore"));

var _clipNode = _interopRequireDefault(require("../operations/clipNode"));

var _transform = _interopRequireDefault(require("../operations/transform"));

var _getBoundingBox = _interopRequireDefault(require("../svg/getBoundingBox"));

const warnUnsupportedNode = R.tap(node => {
  console.warn(`SVG node of type ${node.type} is not currenty supported`);
});

const getProp = (d, p, v) => R.pathOr(d, ['props', p], v);

const setStrokeWidth = ctx => node => {
  const lineWidth = getProp(0, 'strokeWidth', node);
  if (lineWidth) ctx.lineWidth(lineWidth);
  return node;
};

const setStrokeColor = ctx => node => {
  const strokeColor = getProp(null, 'stroke', node);
  if (strokeColor) ctx.strokeColor(strokeColor);
  return node;
};

const setOpacity = ctx => node => {
  const opacity = getProp(null, 'opacity', node);
  if (!R.isNil(opacity)) ctx.opacity(opacity);
  return node;
};

const setFillOpacity = ctx => node => {
  const fillOpacity = getProp(null, 'fillOpacity', node);
  if (!R.isNil(fillOpacity)) ctx.fillOpacity(fillOpacity);
  return node;
};

const setStrokeOpacity = ctx => node => {
  const strokeOpacity = getProp(null, 'strokeOpacity', node);
  if (!R.isNil(strokeOpacity)) ctx.strokeOpacity(strokeOpacity);
  return node;
};

const setLineJoin = ctx => node => {
  const lineJoin = getProp(null, 'strokeLinejoin', node);
  if (lineJoin) ctx.lineJoin(lineJoin);
  return node;
};

const setLineCap = ctx => node => {
  const lineCap = getProp(null, 'strokeLinecap', node);
  if (lineCap) ctx.lineCap(lineCap);
  return node;
};

const setLineDash = ctx => node => {
  const value = getProp(null, 'strokeDasharray', node);
  if (value) ctx.dash(R.split(',', value));
  return node;
};

const hasLinearGradientFill = R.pathEq(['props', 'fill', 'type'], P.LinearGradient);
const hasRadialGradientFill = R.pathEq(['props', 'fill', 'type'], P.RadialGradient); // Math simplified from https://github.com/devongovett/svgkit/blob/master/src/elements/SVGGradient.js#L104

const setLinearGradientFill = ctx => R.tap(node => {
  const bbox = (0, _getBoundingBox.default)(node);
  const gradient = getProp(null, 'fill', node);
  const x1 = R.pathOr(0, ['props', 'x1'], gradient);
  const y1 = R.pathOr(0, ['props', 'y1'], gradient);
  const x2 = R.pathOr(1, ['props', 'x2'], gradient);
  const y2 = R.pathOr(0, ['props', 'y2'], gradient);
  const m0 = bbox[2] - bbox[0];
  const m3 = bbox[3] - bbox[1];
  const m4 = bbox[0];
  const m5 = bbox[1];
  const gx1 = m0 * x1 + m4;
  const gy1 = m3 * y1 + m5;
  const gx2 = m0 * x2 + m4;
  const gy2 = m3 * y2 + m5;
  const grad = ctx.linearGradient(gx1, gy1, gx2, gy2);
  gradient.children.forEach(stop => {
    grad.stop(stop.props.offset, stop.props.stopColor, stop.props.stopOpacity);
  });
  ctx.fill(grad);
}); // Math simplified from https://github.com/devongovett/svgkit/blob/master/src/elements/SVGGradient.js#L155


const setRadialGradientFill = ctx => R.tap(node => {
  const bbox = (0, _getBoundingBox.default)(node);
  const gradient = getProp(null, 'fill', node);
  const cx = R.pathOr(0.5, ['props', 'cx'], gradient);
  const cy = R.pathOr(0.5, ['props', 'cy'], gradient);
  const fx = R.pathOr(cx, ['props', 'fx'], gradient);
  const fy = R.pathOr(cy, ['props', 'fy'], gradient);
  const r = R.pathOr(0.5, ['props', 'r'], gradient);
  const m0 = bbox[2] - bbox[0];
  const m3 = bbox[3] - bbox[1];
  const m4 = bbox[0];
  const m5 = bbox[1];
  const gr = r * m0;
  const gcx = m0 * cx + m4;
  const gcy = m3 * cy + m5;
  const gfx = m0 * fx + m4;
  const gfy = m3 * fy + m5;
  const grad = ctx.radialGradient(gfx, gfy, 0, gcx, gcy, gr);
  gradient.children.forEach(stop => {
    grad.stop(stop.props.offset, stop.props.stopColor, stop.props.stopOpacity);
  });
  ctx.fill(grad);
});

const setFillColor = ctx => R.tap(node => {
  const fillColor = getProp(null, 'fill', node);
  if (fillColor) ctx.fillColor(fillColor);
});

const setFill = ctx => R.cond([[hasLinearGradientFill, setLinearGradientFill(ctx)], [hasRadialGradientFill, setRadialGradientFill(ctx)], [R.T, setFillColor(ctx)]]);

const draw = ctx => node => {
  const props = R.propOr({}, 'props', node);

  if (props.fill && props.stroke) {
    ctx.fillAndStroke(props.fillRule);
  } else if (props.fill) {
    ctx.fill(props.fillRule);
  } else if (props.stroke) {
    ctx.stroke();
  } else {
    ctx.save();
    ctx.opacity(0);
    ctx.fill(null);
    ctx.restore();
  }

  return node;
};

const renderNode = ctx => R.cond([[_isTspan.default, R.identity], [_isTextInstance.default, R.identity], [_isPath.default, (0, _renderPath.default)(ctx)], [_isRect.default, (0, _renderRect.default)(ctx)], [_isLine.default, (0, _renderLine.default)(ctx)], [_isGroup.default, (0, _renderGroup.default)(ctx)], [_isText.default, (0, _renderSvgText.default)(ctx)], [_isCircle.default, (0, _renderCircle.default)(ctx)], [_isImage.default, (0, _renderSvgImage.default)(ctx)], [_isEllipse.default, (0, _renderEllipse.default)(ctx)], [_isPolygon.default, (0, _renderPolygon.default)(ctx)], [_isPolyline.default, (0, _renderPolyline.default)(ctx)], [R.T, warnUnsupportedNode]]);

const drawNode = ctx => R.compose(draw(ctx), renderNode(ctx), (0, _transform.default)(ctx), setOpacity(ctx), setFillOpacity(ctx), setStrokeOpacity(ctx), setFill(ctx), setStrokeColor(ctx), setStrokeWidth(ctx), setLineJoin(ctx), setLineDash(ctx), setLineCap(ctx));

const clipPath = ctx => node => {
  const value = R.path(['props', 'clipPath'], node);

  if (value) {
    R.compose(() => ctx.clip(), R.forEach(renderNode(ctx)), R.propOr([], 'children'))(value);
  }

  return node;
};

const drawChildren = ctx => node => R.compose(R.map(R.compose((0, _restore.default)(ctx), drawChildren(ctx), drawNode(ctx), clipPath(ctx), (0, _save.default)(ctx))), R.propOr([], 'children'))(node);

const defaultsZero = R.pathOr(0);

const resolveAspectRatio = ctx => node => {
  const {
    width,
    height
  } = node.box;
  const {
    viewBox,
    preserveAspectRatio = {}
  } = node.props;
  const {
    meetOrSlice = 'meet',
    align = 'xMidYMid'
  } = preserveAspectRatio;
  if (viewBox == null || width == null || height == null) return node;
  const x = (viewBox === null || viewBox === void 0 ? void 0 : viewBox.minX) || 0;
  const y = (viewBox === null || viewBox === void 0 ? void 0 : viewBox.minY) || 0;
  const logicalWidth = (viewBox === null || viewBox === void 0 ? void 0 : viewBox.maxX) || width;
  const logicalHeight = (viewBox === null || viewBox === void 0 ? void 0 : viewBox.maxY) || height;
  const logicalRatio = logicalWidth / logicalHeight;
  const physicalRatio = width / height;
  const scaleX = width / logicalWidth;
  const scaleY = height / logicalHeight;

  if (align === 'none') {
    ctx.scale(scaleX, scaleY);
    ctx.translate(-x, -y);
    return node;
  }

  if (logicalRatio < physicalRatio && meetOrSlice === 'meet' || logicalRatio >= physicalRatio && meetOrSlice === 'slice') {
    ctx.scale(scaleY, scaleY);

    switch (align) {
      case 'xMinYMin':
      case 'xMinYMid':
      case 'xMinYMax':
        ctx.translate(-x, -y);
        break;

      case 'xMidYMin':
      case 'xMidYMid':
      case 'xMidYMax':
        ctx.translate(-x - (logicalWidth - width * logicalHeight / height) / 2, -y);
        break;

      default:
        ctx.translate(-x - (logicalWidth - width * logicalHeight / height), -y);
    }
  } else {
    ctx.scale(scaleX, scaleX);

    switch (align) {
      case 'xMinYMin':
      case 'xMidYMin':
      case 'xMaxYMin':
        ctx.translate(-x, -y);
        break;

      case 'xMinYMid':
      case 'xMidYMid':
      case 'xMaxYMid':
        ctx.translate(-x, -y - (logicalHeight - height * logicalWidth / width) / 2);
        break;

      default:
        ctx.translate(-x, -y - (logicalHeight - height * logicalWidth / width));
    }
  }

  return node;
};

const moveToOrigin = ctx => node => {
  const {
    top,
    left
  } = node.box;
  const paddingLeft = defaultsZero('paddingLeft', node.box);
  const paddingTop = defaultsZero('paddingTop', node.box);
  ctx.translate(left + paddingLeft, top + paddingTop);
  return node;
};

const renderSvg = (ctx, node) => {
  R.compose((0, _restore.default)(ctx), drawChildren(ctx), resolveAspectRatio(ctx), moveToOrigin(ctx), (0, _clipNode.default)(ctx), (0, _save.default)(ctx))(node);
  return node;
};

var _default = R.curryN(2, renderSvg);

exports.default = _default;