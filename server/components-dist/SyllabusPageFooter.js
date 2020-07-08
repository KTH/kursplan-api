"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _renderer = require("@react-pdf/renderer");

var _SyllabusStyles = _interopRequireDefault(require("./SyllabusStyles"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var SyllabusPageFooter = function SyllabusPageFooter(_ref) {
  var data = _ref.data;
  return /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
    render: function render(_ref2) {
      var pageNumber = _ref2.pageNumber,
          totalPages = _ref2.totalPages;
      return "\n".concat(pageNumber - 1, " (").concat(totalPages - 1, ")");
    },
    fixed: true
  });
};

var _default = SyllabusPageFooter;
exports["default"] = _default;