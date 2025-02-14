"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _react = _interopRequireWildcard(require("react"));
var _renderer = require("@react-pdf/renderer");
var _SyllabusStyles = _interopRequireDefault(require("./SyllabusStyles"));
var _SyllabusHtmlParser = _interopRequireDefault(require("./SyllabusHtmlParser"));
var _i18n = _interopRequireDefault(require("../../i18n"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
// Copied logic from generareHTML
var sectionData = function sectionData() {
  var syllabus = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _syllabus$course = syllabus.course,
    course = _syllabus$course === void 0 ? {} : _syllabus$course;
  var _course$educationalTy = course.educationalTypeId,
    educationalTypeId = _course$educationalTy === void 0 ? null : _course$educationalTy;
  var isContractEducation = [101992, 101993].includes(educationalTypeId);
  var courseEligibilityByEduTypeId = isContractEducation ? {} : {
    course_eligibility: syllabus ? syllabus.kursplan.sarskildbehorighet : ''
  };
  var courseAdditionalRegulationsByEduTypeId = isContractEducation ? {} : {
    course_additional_regulations: syllabus ? syllabus.kursplan.additionalRegulations : ''
  };
  return syllabus ? _objectSpread(_objectSpread(_objectSpread({}, courseAdditionalRegulationsByEduTypeId), courseEligibilityByEduTypeId), {}, {
    course_language: syllabus.kursplan.undervisningssprak,
    course_goals: syllabus.kursplan.larandemal || '',
    course_content: syllabus.kursplan.kursinnehall || '',
    course_disposition: syllabus.kursplan.kursupplagg || '',
    course_literature: syllabus.kursplan.kurslitteratur,
    course_required_equipment: syllabus.kursplan.gammalutrustning || '',
    course_examination: syllabus.kursplan.examinationModules.completeExaminationStrings,
    course_examination_comments: syllabus.kursplan.kommentartillexamination || '',
    course_requirments_for_final_grade: syllabus.kursplan.ovrigakravforslutbetyg || '',
    course_transitional_reg: syllabus.course.overgangsbestammelser || '',
    course_ethical: syllabus.kursplan.etisktforhallandesatt || ''
  }) : {};
};
var renderSections = function renderSections(syllabus, languageIndex) {
  var sectionsContent = sectionData(syllabus);
  return Object.entries(sectionsContent).map(function (_ref) {
    var _ref2 = (0, _slicedToArray2["default"])(_ref, 2),
      id = _ref2[0],
      content = _ref2[1];
    return /*#__PURE__*/_react["default"].createElement(Section, {
      key: id,
      id: id,
      content: content,
      languageIndex: languageIndex
    });
  });
};
var Section = function Section(_ref3) {
  var id = _ref3.id,
    content = _ref3.content,
    languageIndex = _ref3.languageIndex;
  if (!content && id !== 'course_eligibility' && id !== 'course_goals' && id !== 'course_content' && id !== 'course_examination') {
    return null;
  }
  var sectionHeader = _i18n["default"].messages[languageIndex].courseInformation[id];
  var sectionContent = content;
  return /*#__PURE__*/_react["default"].createElement(_renderer.View, null, sectionHeader ? /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: _SyllabusStyles["default"].h2
  }, sectionHeader) : /*#__PURE__*/_react["default"].createElement(_react.Fragment, null), sectionContent ? /*#__PURE__*/_react["default"].createElement(_renderer.View, {
    style: _SyllabusStyles["default"].bodyText
  }, (0, _SyllabusHtmlParser["default"])(sectionContent)) : /*#__PURE__*/_react["default"].createElement(_react.Fragment, null));
};
var SyllabusBody = function SyllabusBody(_ref4) {
  var syllabus = _ref4.syllabus,
    language = _ref4.language;
  var languageIndex = language === 'en' ? 0 : 1;
  var view = renderSections(syllabus, languageIndex);
  return /*#__PURE__*/_react["default"].createElement(_renderer.View, null, view);
};
var _default = exports["default"] = SyllabusBody;