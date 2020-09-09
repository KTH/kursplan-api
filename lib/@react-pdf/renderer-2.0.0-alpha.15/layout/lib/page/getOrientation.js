"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

const VALID_ORIENTATIONS = ['portrait', 'landscape'];
/**
 * Get page orientation. Defaults to landscape
 *
 * @param { Object } page object
 * @returns { String } page orientation
 */

const getOrientation = R.compose(R.ifElse(R.includes(R.__, VALID_ORIENTATIONS), R.identity, R.always('portrait')), R.pathOr('portrait', ['props', 'orientation']));
var _default = getOrientation;
exports.default = _default;