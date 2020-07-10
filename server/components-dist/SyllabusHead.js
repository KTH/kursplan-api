"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _renderer = require("@react-pdf/renderer");

var _SyllabusStyles = _interopRequireDefault(require("./SyllabusStyles"));

var _i18n = _interopRequireDefault(require("../../i18n"));

var _pdfConstants = require("../libs/pdfConstants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import parse from "./SyllabusHtmlParser";
var formatCredits = function formatCredits(credits, creditUnitAbbr, language) {
  var localeCredits = language === "sv" ? credits.toString().replace(".", ",") : credits;
  var creditUnit = language === "sv" ? creditUnitAbbr : "credits";
  return "".concat(localeCredits, " ").concat(creditUnit);
};

var englishTranslationText = function englishTranslationText(language) {
  return language === "en" ? "This is a translation of the Swedish, legally binding, course syllabus." : "";
};

var SyllabusHead = function SyllabusHead(_ref) {
  var syllabus = _ref.syllabus,
      activeSyllabus = _ref.activeSyllabus,
      language = _ref.language;
  var languageIndex = language === "en" ? 0 : 1;
  var course = syllabus.course;
  var courseCode = course.courseCode,
      title = course.title,
      credits = course.credits,
      creditUnitAbbr = course.creditUnitAbbr,
      titleOther = course.titleOther;
  var courseSyllabus = activeSyllabus.courseSyllabus;
  var discontinuationText = courseSyllabus.discontinuationText,
      establishment = courseSyllabus.establishment,
      decisionToDiscontinue = courseSyllabus.decisionToDiscontinue;
  var creditsText = formatCredits(credits, creditUnitAbbr, language);
  var translationText = englishTranslationText(language);
  var establishmentHeader = _i18n["default"].messages[languageIndex].courseInformation.course_establishment;
  var discontinuationHeader = _i18n["default"].messages[languageIndex].courseInformation.course_decision_to_discontinue;
  return /*#__PURE__*/_react["default"].createElement(_renderer.View, null, /*#__PURE__*/_react["default"].createElement(_renderer.Image, {
    style: _SyllabusStyles["default"].logotype,
    src: _pdfConstants.logotypePath
  }), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: _SyllabusStyles["default"].h1
  }, "".concat(courseCode, " ").concat(title, " ").concat(creditsText)), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: _SyllabusStyles["default"].subHeader
  }, "".concat(titleOther)), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: [_SyllabusStyles["default"].bodyText, {
      paddingBottom: 12
    }]
  }, "".concat(translationText)), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: [_SyllabusStyles["default"].bodyText, {
      paddingBottom: 12
    }]
  }, "".concat(discontinuationText)), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: _SyllabusStyles["default"].h2
  }, "".concat(establishmentHeader)), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: _SyllabusStyles["default"].bodyText
  }, "".concat(establishment)), decisionToDiscontinue && /*#__PURE__*/_react["default"].createElement(_renderer.View, null, /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: _SyllabusStyles["default"].h2
  }, "".concat(discontinuationHeader)), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: _SyllabusStyles["default"].bodyText
  }, "".concat(decisionToDiscontinue))));
};

var _default = SyllabusHead;
exports["default"] = _default;