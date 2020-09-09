"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var P = _interopRequireWildcard(require("@react-pdf/primitives"));

var _getDefs = _interopRequireDefault(require("./getDefs"));

const isDefs = R.propEq('type', P.Defs);
const isNotDefs = R.complement(isDefs);
const detachDefs = R.evolve({
  children: R.filter(isNotDefs)
});
const URL_REGEX = /url\(['"]?#([^'"]+)['"]?\)/;

const replaceDef = defs => R.compose(R.when(R.test(URL_REGEX), R.compose(R.prop(R.__, defs), R.prop(1), R.match(URL_REGEX))), R.defaultTo(''));

const parseNodeDefs = defs => node => R.compose(R.evolve({
  props: R.evolve({
    fill: replaceDef(defs),
    clipPath: replaceDef(defs)
  })
}), R.evolve({
  children: R.map(parseNodeDefs(defs))
}))(node);

const parseDefs = root => {
  const defs = (0, _getDefs.default)(root);
  return R.evolve({
    children: R.map(parseNodeDefs(defs))
  }, root);
};

const replaceDefs = R.compose(detachDefs, parseDefs);
var _default = replaceDefs;
exports.default = _default;