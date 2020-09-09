"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var P = _interopRequireWildcard(require("@react-pdf/primitives"));

const isDefs = R.propEq('type', P.Defs);
const getChildren = R.propOr([], 'children');
const getId = R.path(['props', 'id']);
const getDefs = R.compose(R.map(R.prop(0)), R.groupBy(getId), getChildren, R.defaultTo({}), R.find(isDefs), getChildren);
var _default = getDefs;
exports.default = _default;