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
var getCourseGradeText = function getCourseGradeText(syllabus) {
  return syllabus.formattedGradeScales[syllabus.course.gradeScaleCode];
};
var getEducationalLevelCode = function getEducationalLevelCode(course) {
  return course.educationalLevelCode;
};
var getCourseLevelCodeText = function getCourseLevelCodeText(course, languageIndex) {
  var educationalLevelCode = getEducationalLevelCode(course);
  return educationalLevelCode ? _i18n["default"].messages[languageIndex].courseInformation.course_level_code_label[educationalLevelCode] : "";
};
var showMainSubject = function showMainSubject(course) {
  var educationalLevelCode = getEducationalLevelCode(course);
  return educationalLevelCode === "BASIC" || educationalLevelCode === "ADVANCED";
};
var getMainSubjectText = function getMainSubjectText(syllabus) {
  if (syllabus.mainSubjects && Array.isArray(syllabus.mainSubjects)) {
    return syllabus.mainSubjects.toString();
  }
  return syllabus.mainSubjects || "";
};
var SyllabusKeyInformation = function SyllabusKeyInformation(_ref) {
  var syllabus = _ref.syllabus,
    activeSyllabus = _ref.activeSyllabus,
    language = _ref.language;
  var languageIndex = language === "en" ? 0 : 1;
  var course = syllabus.course;
  var courseGradeHeader = _i18n["default"].messages[languageIndex].courseInformation.course_grade_label;
  var courseGradeText = getCourseGradeText(syllabus);
  var courseLevelCodeHeader = _i18n["default"].messages[languageIndex].courseInformation.course_level_code;
  var courseLevelCodeText = getCourseLevelCodeText(course, languageIndex);
  var mainSubjectHeader = _i18n["default"].messages[languageIndex].courseInformation.course_main_subject;
  return /*#__PURE__*/_react["default"].createElement(_renderer.View, null, /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: _SyllabusStyles["default"].h2
  }, "".concat(courseGradeHeader)), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: _SyllabusStyles["default"].bodyText
  }, "".concat(courseGradeText)), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: _SyllabusStyles["default"].h2
  }, "".concat(courseLevelCodeHeader)), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: _SyllabusStyles["default"].bodyText
  }, "".concat(courseLevelCodeText)), showMainSubject(course) && /*#__PURE__*/_react["default"].createElement(_renderer.View, null, /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: _SyllabusStyles["default"].h2
  }, "".concat(mainSubjectHeader)), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: _SyllabusStyles["default"].bodyText
  }, "".concat(getMainSubjectText(syllabus)))));
};
var _default = SyllabusKeyInformation;
exports["default"] = _default;