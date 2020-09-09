"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

/**
 * Get image ratio
 *
 * @param {Object} image node
 * @returns {Number} image ratio
 */
const getRatio = R.ifElse(R.hasPath(['image', 'data']), node => node.image.width / node.image.height, R.always(1));
var _default = getRatio;
exports.default = _default;