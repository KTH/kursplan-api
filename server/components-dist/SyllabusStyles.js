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

var A4 = _pdfConstants.pageMeasurements.A4;

var styles = _renderer.StyleSheet.create({
  bodyContainer: {
    fontFamily: "Georgia",
    fontSize: "12pt"
  },
  logotype: {
    height: A4.logotype,
    width: A4.logotype
  },
  pages: {
    paddingHorizontal: A4.pageMargin,
    paddingTop: A4.pageMargin,
    flexDirection: "column"
  },
  content: {
    flexGrow: 1,
    padding: "0 0 10mm 0"
  },
  footer: {
    flexGrow: 0
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
    fontFamily: "Open Sans SemiBold"
  },
  b: {
    fontFamily: "Open Sans SemiBold"
  },
  strong: {
    fontFamily: "Open Sans SemiBold"
  },
  i: {
    fontFamily: "Open Sans Italic"
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
  subHeader: {
    fontFamily: "Open Sans SemiBold",
    fontSize: 18,
    color: "#808080",
    marginTop: 30,
    borderBottomColor: "#808080",
    borderBottomWidth: 1.33,
    marginBottom: 12
  },
  bodyText: {
    fontFamily: "Open Sans",
    fontSize: 12
  },
  pageFooter: {
    fontFamily: "Open Sans",
    fontSize: 9,
    flexDirection: "row",
    borderTopColor: "#808080",
    borderTopWidth: 1.33,
    paddingTop: 6,
    paddingBottom: 18
  },
  pageFooterLeft: {
    flexGrow: 0,
    flexDirection: "column",
    fontSize: 9,
    textAlign: "left"
  },
  pageFooterRight: {
    flexGrow: 1,
    fontSize: 9,
    textAlign: "right"
  }
});

var _default = styles;
exports["default"] = _default;