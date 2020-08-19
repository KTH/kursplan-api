"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _renderer = require("@react-pdf/renderer");

var _SyllabusStyles = _interopRequireDefault(require("./SyllabusStyles"));

var _i18n = _interopRequireDefault(require("../../i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getSelectedSyllabus = function getSelectedSyllabus(syllabusObject) {
  var semester = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "20101";
  var language = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var count = 0;
  var selectedSyllabus = {};
  var syllabuses = syllabusObject.publicSyllabusVersions;

  for (var i = 0; i < syllabuses.length; i++) {
    if (Number(syllabuses[i].validFromTerm.term) === Number(semester)) {
      selectedSyllabus.edition = syllabuses[i].edition;
      selectedSyllabus.index = count;
      selectedSyllabus.semesterNumber = syllabuses[i].validFromTerm.term.toString().substring(4, 5);
      selectedSyllabus.year = syllabuses[i].validFromTerm.term.toString().substring(2, 4);
    }

    count++;
  }

  return selectedSyllabus;
};

var footerText = function footerText(languageIndex, syllabus, semester) {
  var courseCode = syllabus.course.courseCode;
  var selectedSyllabus = getSelectedSyllabus(syllabus, semester, languageIndex);
  var translation = _i18n["default"].messages[languageIndex].course_pdf_footer_string;
  return translation.for_code + courseCode + translation.valid_from + translation.semester[Number(selectedSyllabus.semesterNumber)] + selectedSyllabus.year + translation.edition + selectedSyllabus.edition;
};

var SyllabusPageFooter = function SyllabusPageFooter(_ref) {
  var syllabus = _ref.syllabus,
      semester = _ref.semester,
      language = _ref.language;
  var languageIndex = language === "en" ? 0 : 1;
  var course = syllabus.course;
  return /*#__PURE__*/_react["default"].createElement(_renderer.View, {
    style: _SyllabusStyles["default"].pageFooter
  }, /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: _SyllabusStyles["default"].pageFooterLeft
  }, footerText(languageIndex, syllabus, semester)), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: _SyllabusStyles["default"].pageFooterRight,
    render: function render(_ref2) {
      var pageNumber = _ref2.pageNumber,
          totalPages = _ref2.totalPages;
      return languageIndex ? "Sida ".concat(pageNumber, " av ").concat(totalPages) : "Page ".concat(pageNumber, " of ").concat(totalPages);
    },
    fixed: true
  }));
};

var _default = SyllabusPageFooter;
exports["default"] = _default;