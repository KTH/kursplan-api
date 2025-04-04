"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _renderer = require("@react-pdf/renderer");
var _SyllabusStyles = _interopRequireDefault(require("./SyllabusStyles"));
var _i18n = _interopRequireDefault(require("../../i18n"));
var footerText = function footerText(languageIndex, syllabus) {
  var kod = syllabus.course.kod;
  var translation = _i18n["default"].messages[languageIndex].course_pdf_footer_string;
  return translation.for_code + kod + translation.valid_from + (syllabus.kursplan.giltigfrom.slice(0, 2) === 'VT' ? 'Spring ' : 'Autumn ') + syllabus.kursplan.giltigfrom.slice(4) + translation.edition + syllabus.kursplan.utgava;
};
var SyllabusPageFooter = function SyllabusPageFooter(_ref) {
  var syllabus = _ref.syllabus,
    language = _ref.language;
  var languageIndex = language === 'en' ? 0 : 1;
  return /*#__PURE__*/_react["default"].createElement(_renderer.View, {
    style: _SyllabusStyles["default"].pageFooter
  }, /*#__PURE__*/_react["default"].createElement(_renderer.Text, null, footerText(languageIndex, syllabus)), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    render: function render(_ref2) {
      var pageNumber = _ref2.pageNumber,
        totalPages = _ref2.totalPages;
      return languageIndex ? "Sida ".concat(pageNumber, " av ").concat(totalPages) : "Page ".concat(pageNumber, " of ").concat(totalPages);
    }
  }));
};
var _default = exports["default"] = SyllabusPageFooter;