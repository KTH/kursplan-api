"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _SyllabusDocument = _interopRequireDefault(require("./SyllabusDocument"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/*
  Syllabus Components Overview
  - Syllabus
    - SyllabusDocument
      - SyllabusPages
        - SyllabusContent
        - SyllabusPageFooter
  - SyllabusStyles
  - SyllabusHtmlParser
*/
var Syllabus = function Syllabus(_ref) {
  var data = _ref.data;
  return /*#__PURE__*/_react["default"].createElement(_SyllabusDocument["default"], {
    data: data
  });
};

var _default = Syllabus;
exports["default"] = _default;