"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _renderer = require("@react-pdf/renderer");
var _SyllabusHead = _interopRequireDefault(require("./SyllabusHead"));
var _SyllabusKeyInformation = _interopRequireDefault(require("./SyllabusKeyInformation"));
var _SyllabusBody = _interopRequireDefault(require("./SyllabusBody"));
var _SyllabusPageFooter = _interopRequireDefault(require("./SyllabusPageFooter"));
var _SyllabusStyles = _interopRequireDefault(require("./SyllabusStyles"));
/* A4 is default page size value, explicitly set for clarity */
var SyllabusPages = function SyllabusPages(_ref) {
  var syllabus = _ref.syllabus,
    language = _ref.language;
  return /*#__PURE__*/_react["default"].createElement(_renderer.Page, {
    size: "A4",
    style: _SyllabusStyles["default"].pages
  }, /*#__PURE__*/_react["default"].createElement(_renderer.View, {
    style: _SyllabusStyles["default"].content
  }, /*#__PURE__*/_react["default"].createElement(_SyllabusHead["default"], {
    syllabus: syllabus,
    language: language
  }), /*#__PURE__*/_react["default"].createElement(_SyllabusKeyInformation["default"], {
    syllabus: syllabus,
    language: language
  }), /*#__PURE__*/_react["default"].createElement(_SyllabusBody["default"], {
    syllabus: syllabus,
    language: language
  })), /*#__PURE__*/_react["default"].createElement(_renderer.View, {
    fixed: true,
    style: _SyllabusStyles["default"].footer
  }, /*#__PURE__*/_react["default"].createElement(_SyllabusPageFooter["default"], {
    syllabus: syllabus,
    language: language
  })));
};
var _default = exports["default"] = SyllabusPages;