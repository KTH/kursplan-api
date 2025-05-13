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
var getEducationalLevelCode = function getEducationalLevelCode(course) {
  return course.nivainomstudieordning.level.code;
};
var showMainSubject = function showMainSubject(course) {
  var educationalLevelCode = getEducationalLevelCode(course);
  return educationalLevelCode === '1' || educationalLevelCode === '2';
};
var SyllabusKeyInformation = function SyllabusKeyInformation(_ref) {
  var _course$huvudomraden;
  var syllabus = _ref.syllabus,
    language = _ref.language;
  var languageIndex = language === 'en' ? 0 : 1;
  var course = syllabus.course;
  var betygsskala = course.betygsskala;
  var courseGradeHeader = _i18n["default"].messages[languageIndex].courseInformation.course_grade_label;
  var courseLevelCodeHeader = _i18n["default"].messages[languageIndex].courseInformation.course_level_code;
  var courseLevelCodeText = course.nivainomstudieordning.level[language];
  var mainSubjectHeader = _i18n["default"].messages[languageIndex].courseInformation.course_main_subject;
  return /*#__PURE__*/_react["default"].createElement(_renderer.View, null, /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: _SyllabusStyles["default"].h2
  }, "".concat(courseGradeHeader)), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: _SyllabusStyles["default"].bodyText
  }, "".concat(betygsskala)), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: _SyllabusStyles["default"].h2
  }, "".concat(courseLevelCodeHeader)), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: _SyllabusStyles["default"].bodyText
  }, "".concat(courseLevelCodeText)), showMainSubject(course) && /*#__PURE__*/_react["default"].createElement(_renderer.View, null, /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: _SyllabusStyles["default"].h2
  }, "".concat(mainSubjectHeader)), /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: _SyllabusStyles["default"].bodyText
  }, ((_course$huvudomraden = course.huvudomraden) !== null && _course$huvudomraden !== void 0 ? _course$huvudomraden : []).map(function (item) {
    return item[language];
  }).join(', '))));
};
var _default = exports["default"] = SyllabusKeyInformation;