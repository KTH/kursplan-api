"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _renderer = require("@react-pdf/renderer");

var _stringStripHtml = _interopRequireDefault(require("string-strip-html"));

var _SyllabusStyles = _interopRequireDefault(require("./SyllabusStyles"));

var _SyllabusHtmlParser = _interopRequireDefault(require("./SyllabusHtmlParser"));

var _i18n = _interopRequireDefault(require("../../i18n"));

var _pdfUtils = _interopRequireDefault(require("../libs/pdfUtils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

// Copied logic from generareHTML
var getExamObject = function getExamObject(dataObject, grades, courseCredits) {
  var language = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  var examString = "";

  if (dataObject.length > 0) {
    var _iterator = _createForOfIteratorHelper(dataObject),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var exam = _step.value;

        if (exam.credits) {
          //* * Adding a decimal if it's missing in credits **/
          exam.credits = exam.credits !== "" && exam.credits.toString().indexOf(".") < 0 ? exam.credits + ".0" : exam.credits;
        } else {
          exam.credits = "-";
        }

        examString += "<li>".concat(exam.examCode, " - \n                        ").concat(exam.title, ",\n                        ").concat(language === 0 ? exam.credits : exam.credits.toString().replace(".", ","), " ").concat(language === 0 ? "credits" : courseCredits, ",  \n                        ").concat(_i18n["default"].messages[language].courseInformation.course_grade_label.toLowerCase(), ": ").concat(grades[exam.gradeScaleCode], "             \n                        </li>");
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
  return literature ? literature : literatureComment;
}; // Copied logic from generareHTML


var sectionData = function sectionData(syllabus, activeSyllabus, languageIndex) {
  return activeSyllabus ? {
    course_language: activeSyllabus.courseSyllabus.languageOfInstruction,
    course_goals: activeSyllabus.courseSyllabus.goals || "",
    course_content: activeSyllabus.courseSyllabus.content || "",
    course_disposition: activeSyllabus.courseSyllabus.disposition || "",
    course_eligibility: activeSyllabus.courseSyllabus.eligibility || "",
    course_literature: getLiterature(activeSyllabus.courseSyllabus),
    course_required_equipment: activeSyllabus.courseSyllabus.requiredEquipment || "",
    course_examination: getExamObject(syllabus.examinationSets[Object.keys(syllabus.examinationSets)[0]].examinationRounds, syllabus.formattedGradeScales, syllabus.course.creditUnitAbbr, languageIndex),
    course_examination_comments: activeSyllabus.courseSyllabus.examComments || "",
    course_requirments_for_final_grade: activeSyllabus.courseSyllabus.reqsForFinalGrade || "",
    course_transitional_reg: activeSyllabus.courseSyllabus.transitionalRegulations || "",
    course_ethical: activeSyllabus.courseSyllabus.ethicalApproach || "",
    course_additional_regulations: activeSyllabus.courseSyllabus.additionalRegulations || ""
  } : {};
};

var renderSections = function renderSections(syllabus, activeSyllabus, languageIndex) {
  var sectionsContent = sectionData(syllabus, activeSyllabus, languageIndex);
  console.log("sectionsContent", sectionsContent);
  return Object.entries(sectionsContent).map(function (_ref2) {
    var _ref3 = _slicedToArray(_ref2, 2),
        id = _ref3[0],
        content = _ref3[1];

    return /*#__PURE__*/_react["default"].createElement(Section, {
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
  if (!content && id !== "course_eligibility") return null;
  var sectionHeader = _i18n["default"].messages[languageIndex].courseInformation[id];
  var sectionContent = content;
  var textFitsOnPage = (0, _stringStripHtml["default"])(sectionContent).length > 3500;
  return /*#__PURE__*/_react["default"].createElement(_renderer.View, {
    wrap: textFitsOnPage
  }, /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    style: _SyllabusStyles["default"].h2
  }, sectionHeader), /*#__PURE__*/_react["default"].createElement(_renderer.View, {
    style: _SyllabusStyles["default"].bodyText
  }, (0, _SyllabusHtmlParser["default"])(sectionContent)));
};

var SyllabusBody = function SyllabusBody(_ref5) {
  var syllabus = _ref5.syllabus,
      activeSyllabus = _ref5.activeSyllabus,
      language = _ref5.language;
  var course = syllabus.course;
  var languageIndex = language === "en" ? 0 : 1;
  var sections = renderSections(syllabus, activeSyllabus, languageIndex);
  return /*#__PURE__*/_react["default"].createElement(_renderer.View, {
    style: _SyllabusStyles["default"].bodyContainer
  }, /*#__PURE__*/_react["default"].createElement(_react.Profiler, {
    key: "profiler-syllabus-body",
    id: "profiler-syllabus-body",
    onRender: _pdfUtils["default"]
  }, sections));
};

var _default = SyllabusBody;
exports["default"] = _default;