"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _renderer = require("@react-pdf/renderer");

var _SyllabusStyles = _interopRequireDefault(require("./SyllabusStyles"));

var _SyllabusHtmlParser = _interopRequireDefault(require("./SyllabusHtmlParser"));

var _i18n = _interopRequireDefault(require("../../i18n"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

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
  var literatureContent = "";
  literatureContent += literature || "";
  literatureContent += literatureComment || "";
  return literatureContent;
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

  if (!content && id !== "course_eligibility" && id !== "course_goals" && id !== "course_content" && id !== "course_examination") {
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
  var course = syllabus.course;
  var languageIndex = language === "en" ? 0 : 1;
  var sections = renderSections(syllabus, activeSyllabus, languageIndex);
  return /*#__PURE__*/_react["default"].createElement(_renderer.View, null, sections);
};

var _default = SyllabusBody;
exports["default"] = _default;