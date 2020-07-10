"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _renderer = require("@react-pdf/renderer");

var _SyllabusHead = _interopRequireDefault(require("./SyllabusHead"));

var _SyllabusKeyInformation = _interopRequireDefault(require("./SyllabusKeyInformation"));

var _SyllabusBody = _interopRequireDefault(require("./SyllabusBody"));

var _SyllabusPageFooter = _interopRequireDefault(require("./SyllabusPageFooter"));

var _SyllabusStyles = _interopRequireDefault(require("./SyllabusStyles"));

var _pdfUtils = require("../libs/pdfUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Logic copied from generareHTML
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

var getActiveSyllabus = function getActiveSyllabus(syllabus, selectedSyllabus) {
  var activeSyllabus = syllabus.publicSyllabusVersions[selectedSyllabus.index];
  return activeSyllabus;
};
/* A4 is default page size value, explicitly set for clarity */


var SyllabusPages = function SyllabusPages(_ref) {
  var syllabus = _ref.syllabus,
      semester = _ref.semester,
      language = _ref.language;
  var selectedSyllabus = getSelectedSyllabus(syllabus, semester);
  var activeSyllabus = getActiveSyllabus(syllabus, selectedSyllabus);
  return /*#__PURE__*/_react["default"].createElement(_renderer.Page, {
    size: "A4",
    style: _SyllabusStyles["default"].pages
  }, /*#__PURE__*/_react["default"].createElement(_react.Profiler, {
    id: "SyllabusContent",
    onRender: _pdfUtils.profilerToLog
  }, /*#__PURE__*/_react["default"].createElement(_renderer.View, {
    style: _SyllabusStyles["default"].content
  }, /*#__PURE__*/_react["default"].createElement(_SyllabusHead["default"], {
    syllabus: syllabus,
    activeSyllabus: activeSyllabus,
    language: language
  }), /*#__PURE__*/_react["default"].createElement(_SyllabusKeyInformation["default"], {
    syllabus: syllabus,
    activeSyllabus: activeSyllabus,
    language: language
  }), /*#__PURE__*/_react["default"].createElement(_SyllabusBody["default"], {
    syllabus: syllabus,
    activeSyllabus: activeSyllabus,
    language: language
  }))), /*#__PURE__*/_react["default"].createElement(_react.Profiler, {
    id: "SyllabusPageFooter",
    onRender: _pdfUtils.profilerToLog
  }, /*#__PURE__*/_react["default"].createElement(_renderer.View, {
    fixed: true,
    style: _SyllabusStyles["default"].footer
  }, /*#__PURE__*/_react["default"].createElement(_SyllabusPageFooter["default"], {
    syllabus: syllabus,
    semester: semester,
    language: language
  }))));
};

var _default = SyllabusPages;
exports["default"] = _default;