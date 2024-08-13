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
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
// Copied logic from generareHTML
var getExamObject = function getExamObject(dataObject, grades, courseCredits, isPreparatory) {
  var language = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
  var examString = '';
  if (dataObject.length > 0) {
    var _iterator = _createForOfIteratorHelper(dataObject),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var exam = _step.value;
        if (exam.credits) {
          //* * Adding a decimal if it's missing in credits **/
          exam.credits = exam.credits !== '' && exam.credits.toString().indexOf('.') < 0 ? exam.credits + '.0' : exam.credits;
        } else {
          exam.credits = '-';
        }
        examString += "<li>".concat(exam.examCode, " - \n                        ").concat(exam.title, ",\n                        ").concat(language === 0 ? exam.credits : exam.credits.toString().replace('.', ','), " ").concat(language === 0 && !isPreparatory ? 'credits' : courseCredits, ",  \n                        ").concat(_i18n["default"].messages[language].courseInformation.course_grade_label.toLowerCase(), ": ").concat(grades[exam.gradeScaleCode], "             \n                        </li>");
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }
  return examString;
};
var getLiterature = function getLiterature(_ref) {
  var literature = _ref.literature,
    literatureComment = _ref.literatureComment;
  var literatureContent = '';
  literatureContent += literature || '';
  literatureContent += literatureComment || '';
  return literatureContent;
};

// Copied logic from generareHTML
var sectionData = function sectionData() {
  var syllabus = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var activeSyllabus = arguments.length > 1 ? arguments[1] : undefined;
  var languageIndex = arguments.length > 2 ? arguments[2] : undefined;
  var _syllabus$course = syllabus.course,
    course = _syllabus$course === void 0 ? {} : _syllabus$course;
  var _course$educationalTy = course.educationalTypeId,
    educationalTypeId = _course$educationalTy === void 0 ? null : _course$educationalTy;
  var isPreparatory = course.educationalLevelCode == 'PREPARATORY';
  var isContractEducation = [101992, 101993].includes(educationalTypeId);
  var courseEligibilityByEduTypeId = isContractEducation ? {} : {
    course_eligibility: activeSyllabus ? activeSyllabus.courseSyllabus.eligibility : ''
  };
  var courseAdditionalRegulationsByEduTypeId = isContractEducation ? {} : {
    course_additional_regulations: activeSyllabus ? activeSyllabus.courseSyllabus.additionalRegulations : ''
  };
  return activeSyllabus ? _objectSpread(_objectSpread(_objectSpread({}, courseAdditionalRegulationsByEduTypeId), courseEligibilityByEduTypeId), {}, {
    course_language: activeSyllabus.courseSyllabus.languageOfInstruction,
    course_goals: activeSyllabus.courseSyllabus.goals || '',
    course_content: activeSyllabus.courseSyllabus.content || '',
    course_disposition: activeSyllabus.courseSyllabus.disposition || '',
    course_literature: getLiterature(activeSyllabus.courseSyllabus),
    course_required_equipment: activeSyllabus.courseSyllabus.requiredEquipment || '',
    course_examination: getExamObject(syllabus.examinationSets[Object.keys(syllabus.examinationSets)[0]].examinationRounds, syllabus.formattedGradeScales, syllabus.course.creditUnitAbbr, isPreparatory, languageIndex),
    course_examination_comments: activeSyllabus.courseSyllabus.examComments || '',
    course_requirments_for_final_grade: activeSyllabus.courseSyllabus.reqsForFinalGrade || '',
    course_transitional_reg: activeSyllabus.courseSyllabus.transitionalRegulations || '',
    course_ethical: activeSyllabus.courseSyllabus.ethicalApproach || ''
  }) : {};
};
var renderSections = function renderSections(syllabus, activeSyllabus, languageIndex) {
  var sectionsContent = sectionData(syllabus, activeSyllabus, languageIndex);
  return Object.entries(sectionsContent).map(function (_ref2) {
    var _ref3 = (0, _slicedToArray2["default"])(_ref2, 2),
      id = _ref3[0],
      content = _ref3[1];
    return /*#__PURE__*/_react["default"].createElement(Section, {
      key: id,
      id: id,
      content: content,
      languageIndex: languageIndex
    });
  });
};
var Section = function Section(_ref4) {
  var id = _ref4.id,
    content = _ref4.content,
    languageIndex = _ref4.languageIndex;
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
var SyllabusBody = function SyllabusBody(_ref5) {
  var syllabus = _ref5.syllabus,
    activeSyllabus = _ref5.activeSyllabus,
    language = _ref5.language;
  var languageIndex = language === 'en' ? 0 : 1;
  var view = renderSections(syllabus, activeSyllabus, languageIndex);
  return /*#__PURE__*/_react["default"].createElement(_renderer.View, null, view);
};
var _default = exports["default"] = SyllabusBody;