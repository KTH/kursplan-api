"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.isSrcId = void 0;

var _react = _interopRequireWildcard(require("react"));

var _renderer = require("@react-pdf/renderer");

var _htmlReactParser = _interopRequireWildcard(require("html-react-parser"));

var _SyllabusStyles = _interopRequireDefault(require("./SyllabusStyles"));

/* eslint-disable no-console */

/* eslint-disable jsx-a11y/anchor-is-valid */

/* eslint-disable no-use-before-define */
// Borrowed from https://github.com/diegomura/react-pdf/
var PROTOCOL_REGEXP = /^([a-z]+:(\/\/)?)/i;
var DEST_REGEXP = /^#.+/;

var isSrcId = function isSrcId(src) {
  return src.match(DEST_REGEXP);
};

exports.isSrcId = isSrcId;

var getURL = function getURL(value) {
  if (!value) return "";
  if (isSrcId(value)) return value; // don't modify it if it is an id

  if (typeof value === "string" && !value.match(PROTOCOL_REGEXP)) {
    return "https://kth.se".concat(value); // Fix internal links, like profiles
  }

  return value;
}; // End borrowed from https://github.com/diegomura/react-pdf/


var inlineElementsPresent = function inlineElementsPresent(nodes) {
  var inlineElementTags = ["em", "strong", "i", "b", "a"];
  return nodes && nodes.some(function (node) {
    return inlineElementTags.includes(node.name);
  });
};

var components = {
  p: function p(domNode) {
    return inlineElementsPresent(domNode.children) ? /*#__PURE__*/_react["default"].createElement(_renderer.View, {
      style: _SyllabusStyles["default"].p
    }, /*#__PURE__*/_react["default"].createElement(_renderer.Text, null, (0, _htmlReactParser.domToReact)(domNode.children, htmlParseOptions))) : /*#__PURE__*/_react["default"].createElement(_renderer.View, {
      style: _SyllabusStyles["default"].p
    }, (0, _htmlReactParser.domToReact)(domNode.children, htmlParseOptions));
  },
  em: function em(domNode) {
    return /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
      style: _SyllabusStyles["default"].em
    }, (0, _htmlReactParser.domToReact)(domNode.children, htmlParseOptions));
  },
  strong: function strong(domNode) {
    return /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
      style: _SyllabusStyles["default"].strong
    }, (0, _htmlReactParser.domToReact)(domNode.children, htmlParseOptions));
  },
  i: function i(domNode) {
    return /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
      style: _SyllabusStyles["default"].i
    }, (0, _htmlReactParser.domToReact)(domNode.children, htmlParseOptions));
  },
  b: function b(domNode) {
    return /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
      style: _SyllabusStyles["default"].b
    }, (0, _htmlReactParser.domToReact)(domNode.children, htmlParseOptions));
  },
  ul: function ul(domNode) {
    return /*#__PURE__*/_react["default"].createElement(_renderer.View, {
      style: _SyllabusStyles["default"].ul
    }, (0, _htmlReactParser.domToReact)(domNode.children, htmlParseOptions));
  },
  ol: function ol(domNode) {
    return /*#__PURE__*/_react["default"].createElement(_renderer.View, {
      style: _SyllabusStyles["default"].ol
    }, (0, _htmlReactParser.domToReact)(domNode.children, htmlParseOptions));
  },
  li: function li(domNode) {
    var number;

    if (domNode.parent && domNode.parent.name === "ol") {
      number = domNode.parent.counter; // eslint-disable-next-line no-param-reassign

      domNode.parent.counter += 1;
    }

    return /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
      style: number ? _SyllabusStyles["default"].olItem : _SyllabusStyles["default"].ulItem
    }, number ? "".concat(number < 10 ? "\xa0" + number : number, ". ") : " • ", (0, _htmlReactParser.domToReact)(domNode.children, htmlParseOptions));
  },
  a: function a(domNode) {
    //console.log(domNode);
    return /*#__PURE__*/_react["default"].createElement(_renderer.Link, {
      src: getURL(domNode.attribs.href)
    }, (0, _htmlReactParser.domToReact)(domNode.children, htmlParseOptions));
  },
  "default": function _default() {
    return /*#__PURE__*/_react["default"].createElement(_react.Fragment, null);
  }
};
var htmlParseOptions = {
  replace: function replace(domNode) {
    var node = domNode;

    if (node.type === "text") {
      if (node.next && node.next.name === "p") {
        // Handle HTML where a text node is followed by a paragraph element
        return /*#__PURE__*/_react["default"].createElement(_renderer.Text, {
          style: _SyllabusStyles["default"].p
        }, node.data);
      }

      return /*#__PURE__*/_react["default"].createElement(_renderer.Text, null, node.data);
    }

    if (node.name === "ol") {
      node.counter = 1;
    }

    var component = components[node.name] || components["default"];
    return component(node);
  }
};

var removeExcessWhitespace = function removeExcessWhitespace(html) {
  return html.replace(/\u0020{2,}/g, " ");
};

var replaceLineBreaks = function replaceLineBreaks() {
  var html = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  return html.replace(/\n/g, "").replace(/<br>|<br.?\/>/g, "\n");
};

var addListElement = function addListElement(html) {
  if (html.startsWith("<li>")) {
    var indexOfLastCloseListItem = html.lastIndexOf("</li>");

    if (indexOfLastCloseListItem !== -1) {
      return "<ul>" + html.slice(0, indexOfLastCloseListItem + 5) + "</ul>" + html.slice(indexOfLastCloseListItem + 5);
    }
  }

  return html;
};

var htmlParser = function htmlParser(rawHtml) {
  // console.time("htmlParser: replaceLineBreaks");
  var html = addListElement(removeExcessWhitespace(replaceLineBreaks(rawHtml))); // console.timeEnd("htmlParser: replaceLineBreaks");
  // console.time("htmlParser: parse");

  var parsedHtml = (0, _htmlReactParser["default"])(html, htmlParseOptions); // console.timeEnd("htmlParser: parse");

  return parsedHtml;
};

var _default2 = htmlParser;
exports["default"] = _default2;