"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _renderer = require("@react-pdf/renderer");
var _SyllabusPages = _interopRequireDefault(require("./SyllabusPages"));
var _pdfUtils = require("../libs/pdfUtils");
var SyllabusDocument = function SyllabusDocument(_ref) {
  var syllabus = _ref.syllabus,
    semester = _ref.semester,
    language = _ref.language;
  var course = syllabus.course;
  var title = "".concat(course.kod, "-").concat(semester);
  return /*#__PURE__*/_react["default"].createElement(_renderer.Document, {
    title: title,
    author: "KTH",
    onRender: (0, _pdfUtils.timer)('SyllabusDocument', Date.now()),
    lang: language === 'en' ? 'en-US' : 'sv-SE'
  }, /*#__PURE__*/_react["default"].createElement(_SyllabusPages["default"], {
    syllabus: syllabus,
    language: language
  }));
};
var _default = exports["default"] = SyllabusDocument;