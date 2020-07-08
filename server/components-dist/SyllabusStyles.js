"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _renderer = require("@react-pdf/renderer");

var _pdfConstants = require("../libs/pdfConstants");

var A4 = _pdfConstants.pageMeasurements.A4;

var styles = _renderer.StyleSheet.create({
  contentContainer: {
    fontFamily: "Georgia",
    fontSize: "12pt"
  },
  logotype: {
    height: A4.logotype,
    width: A4.logotype
  }
});

var _default = styles;
exports["default"] = _default;