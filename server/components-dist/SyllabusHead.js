"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _renderer = require("@react-pdf/renderer");

var _SyllabusHtmlParser = _interopRequireDefault(require("./SyllabusHtmlParser"));

var _SyllabusStyles = _interopRequireDefault(require("./SyllabusStyles"));

var _i18n = _interopRequireDefault(require("../../i18n"));

var _pdfConstants = require("../libs/pdfConstants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var formatCredits = function formatCredits(credits, creditUnitAbbr, language) {
  var decimals = credits % 1 !== 0;
  var decimalCredits = decimals ? credits : Number(credits).toFixed(1);
  var localeCredits = language === "sv" ? decimalCredits.toString().replace(".", ",") : decimalCredits;
  var creditUnit = language === "sv" ? creditUnitAbbr : "credits";
  return "".concat(localeCredits, " ").concat(creditUnit);
};

var englishTranslationText = function englishTranslationText(language) {
  return language === "en" ? "This is a translation of the Swedish, legally binding, course syllabus." : "";
};

var SyllabusHead = function SyllabusHead(_ref) {
  var syllabus = _ref.syllabus,
      _ref$activeSyllabus = _ref.activeSyllabus,
      activeSyllabus = _ref$activeSyllabus === void 0 ? {} : _ref$activeSyllabus,
      language = _ref.language;
  var languageIndex = language === "en" ? 0 : 1;
  var course = syllabus.course;
  var courseCode = course.courseCode,
      title = course.title,
      credits = course.credits,
      creditUnitAbbr = course.creditUnitAbbr,
      titleOther = course.titleOther;
  var courseSyllabus = activeSyllabus.courseSyllabus;

  var _ref2 = courseSyllabus || {},
      discontinuationText = _ref2.discontinuationText,
      establishment = _ref2.establishment,
      decisionToDiscontinue = _ref2.decisionToDiscontinue;

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
  }, "".concat(titleOther)), /*#__PURE__*/_react["default"].createElement(_renderer.View, {
    style: _SyllabusStyles["default"].disclaimer
  }, /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: _SyllabusStyles["default"].p
  }, "".concat(translationText)), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: _SyllabusStyles["default"].p
  }, "".concat(discontinuationText))), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: _SyllabusStyles["default"].h2
  }, "".concat(establishmentHeader)), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: _SyllabusStyles["default"].bodyText
  }, (0, _SyllabusHtmlParser["default"])(establishment)), decisionToDiscontinue ? /*#__PURE__*/_react["default"].createElement(_renderer.View, null, /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: _SyllabusStyles["default"].h2
  }, "".concat(discontinuationHeader)), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: _SyllabusStyles["default"].bodyText
  }, "".concat(decisionToDiscontinue))) : /*#__PURE__*/_react["default"].createElement(_react.Fragment, null));
};

var _default = SyllabusHead;
exports["default"] = _default;