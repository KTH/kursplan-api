"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
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
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var englishTranslationText = function englishTranslationText(language) {
  return language === 'en' ? 'This is a translation of the Swedish, legally binding, course syllabus.' : '';
};
var SyllabusHead = function SyllabusHead(_ref) {
  var syllabus = _ref.syllabus,
    language = _ref.language;
  var languageIndex = language === 'en' ? 0 : 1;
  var course = syllabus.course,
    kursplan = syllabus.kursplan;
  var kod = course.kod,
    benamning = course.benamning;
  var faststallande = kursplan.faststallande;
  var _ref2 = kursplan || {},
    discontinuationText = _ref2.discontinuationText,
    decisionToDiscontinue = _ref2.decisionToDiscontinue;
  var omfattning = course.omfattning.formattedWithUnit;
  var translationText = englishTranslationText(language);
  var establishmentHeader = _i18n["default"].messages[languageIndex].courseInformation.course_establishment;
  var discontinuationHeader = _i18n["default"].messages[languageIndex].courseInformation.course_decision_to_discontinue;
  return /*#__PURE__*/_react["default"].createElement(_renderer.View, null, /*#__PURE__*/_react["default"].createElement(_renderer.Image, {
    style: _SyllabusStyles["default"].logotype,
    src: _pdfConstants.logotypePath
  }), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: _SyllabusStyles["default"].h1
  }, "".concat(kod, " ").concat(benamning[language], " ").concat(omfattning)), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: _SyllabusStyles["default"].subHeader
  }, "".concat(benamning[language === 'sv' ? 'en' : 'sv'])), /*#__PURE__*/_react["default"].createElement(_renderer.View, {
    style: _SyllabusStyles["default"].disclaimer
  }, /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: _SyllabusStyles["default"].p
  }, "".concat(translationText)), discontinuationText && /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: _SyllabusStyles["default"].p
  }, "".concat(discontinuationText))), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: _SyllabusStyles["default"].h2
  }, "".concat(establishmentHeader)), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: _SyllabusStyles["default"].bodyText
  }, (0, _SyllabusHtmlParser["default"])(faststallande)), decisionToDiscontinue ? /*#__PURE__*/_react["default"].createElement(_react.Fragment, null, /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: _SyllabusStyles["default"].h2
  }, "".concat(discontinuationHeader)), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: _SyllabusStyles["default"].bodyText
  }, (0, _SyllabusHtmlParser["default"])(decisionToDiscontinue))) : /*#__PURE__*/_react["default"].createElement(_react.Fragment, null));
};
var _default = exports["default"] = SyllabusHead;