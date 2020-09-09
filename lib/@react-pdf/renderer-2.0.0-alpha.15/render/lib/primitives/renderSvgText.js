"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _advanceWidth = _interopRequireDefault(require("@react-pdf/textkit/run/advanceWidth"));

var _advanceWidth2 = _interopRequireDefault(require("@react-pdf/textkit/attributedString/advanceWidth"));

const renderRun = (ctx, run) => {
  const runAdvanceWidth = (0, _advanceWidth.default)(run);
  const {
    font,
    fontSize,
    color,
    opacity
  } = run.attributes;
  ctx.fillColor(color);
  ctx.fillOpacity(opacity);

  if (font.sbix || font.COLR && font.CPAL) {
    ctx.save();
    ctx.translate(0, -run.ascent);

    for (let i = 0; i < run.glyphs.length; i += 1) {
      const position = run.positions[i];
      const glyph = run.glyphs[i];
      ctx.save();
      ctx.translate(position.xOffset, position.yOffset);
      glyph.render(ctx, fontSize);
      ctx.restore();
      ctx.translate(position.xAdvance, position.yAdvance);
    }

    ctx.restore();
  } else {
    ctx.font(typeof font.name === 'string' ? font.name : font, fontSize);

    try {
      ctx._addGlyphs(run.glyphs, run.positions, 0, 0);
    } catch (error) {
      console.log(error);
    }
  }

  ctx.translate(runAdvanceWidth, 0);
};

const renderSpan = (ctx, line, textAnchor, dominantBaseline) => {
  ctx.save();
  const x = R.pathOr(0, ['box', 'x'], line);
  const y = R.pathOr(0, ['box', 'y'], line);
  const font = R.pathOr(1, ['runs', 0, 'attributes', 'font'], line);
  const scale = R.pathOr(1, ['runs', 0, 'attributes', 'scale'], line);
  const width = (0, _advanceWidth2.default)(line);
  const ascent = font.ascent * scale;
  const xHeight = font.xHeight * scale;
  const descent = font.descent * scale;
  const capHeight = font.capHeight * scale;
  let xTranslate = x;
  let yTranslate = y;

  switch (textAnchor) {
    case 'middle':
      xTranslate = x - width / 2;
      break;

    case 'end':
      xTranslate = x - width;
      break;

    default:
      xTranslate = x;
      break;
  }

  switch (dominantBaseline) {
    case 'middle':
    case 'central':
      yTranslate = y + capHeight / 2;
      break;

    case 'hanging':
      yTranslate = y + capHeight;
      break;

    case 'mathematical':
      yTranslate = y + xHeight;
      break;

    case 'text-after-edge':
      yTranslate = y + descent;
      break;

    case 'text-before-edge':
      yTranslate = y + ascent;
      break;

    default:
      yTranslate = y;
      break;
  }

  ctx.translate(xTranslate, yTranslate);
  line.runs.forEach(run => renderRun(ctx, run));
  ctx.restore();
};

const renderSvgText = ctx => node => {
  node.children.forEach(span => renderSpan(ctx, span.lines[0], span.props.textAnchor, span.props.dominantBaseline));
  return node;
};

var _default = renderSvgText;
exports.default = _default;