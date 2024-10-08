"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _renderer = require("@react-pdf/renderer");
var _pdfConstants = require("../libs/pdfConstants");
_renderer.Font.register({
  family: "Open Sans",
  src: "server/fonts/OpenSans-Regular.ttf"
});
_renderer.Font.register({
  family: "Open Sans SemiBold",
  src: "server/fonts/OpenSans-SemiBold.ttf"
});
_renderer.Font.register({
  family: "Open Sans Bold",
  src: "server/fonts/OpenSans-Bold.ttf"
});
_renderer.Font.register({
  family: "Open Sans Italic",
  src: "server/fonts/OpenSans-Italic.ttf"
});
_renderer.Font.register({
  family: "Georgia",
  src: "server/fonts/Georgia.ttf"
});
_renderer.Font.register({
  family: "Georgia Italic",
  src: "server/fonts/Georgia-Italic.ttf"
});
_renderer.Font.register({
  family: "Georgia Bold",
  src: "server/fonts/Georgia-Bold.ttf"
});
var A4 = _pdfConstants.pageMeasurements.A4;
var styles = _renderer.StyleSheet.create({
  logotype: {
    height: A4.logotype,
    width: A4.logotype
  },
  pages: {
    fontFamily: "Georgia",
    fontSize: 12,
    paddingHorizontal: A4.pageMargin,
    paddingVertical: A4.pageMargin
  },
  content: {},
  footer: {
    position: 'absolute',
    bottom: 0,
    left: A4.pageMargin,
    right: A4.pageMargin
  },
  h1: {
    fontFamily: "Open Sans SemiBold",
    fontSize: 32,
    marginTop: 24,
    marginBottom: 0
  },
  h2: {
    fontFamily: "Open Sans SemiBold",
    fontSize: 18,
    marginTop: 18,
    marginBottom: 6
  },
  p: {
    paddingBottom: 12
  },
  em: {
    fontFamily: "Georgia Bold"
  },
  b: {
    fontFamily: "Georgia Bold"
  },
  strong: {
    fontFamily: "Georgia Bold"
  },
  i: {
    fontFamily: "Georgia Italic"
  },
  ul: {
    paddingLeft: 12
  },
  ol: {
    paddingLeft: 18
  },
  ulItem: {
    textIndent: -9,
    marginBottom: 6
  },
  olItem: {
    textIndent: -18,
    marginBottom: 6
  },
  pageFooter: {
    fontFamily: "Open Sans",
    fontSize: 12,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopColor: "#808080",
    borderTopWidth: 1.33,
    paddingTop: 6,
    paddingBottom: 18
  },
  subHeader: {
    fontFamily: "Open Sans SemiBold",
    fontSize: 14,
    marginTop: 12,
    marginBottom: 12
  },
  disclaimer: {
    marginTop: 24,
    marginBottom: 12
  }
});
var _default = exports["default"] = styles;