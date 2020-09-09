"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _matchPercent = _interopRequireDefault(require("../utils/matchPercent"));

/*
 * Translates page percentage horizontal paddings in fixed ones
 *
 * @param {Object} page container
 * @param {String} padding value
 * @returns {Object} translated padding value
 */
const resolvePageHorizontalPadding = container => value => {
  const match = (0, _matchPercent.default)(value);
  return match ? match.percent * container.width : value;
};
/**
 * Translates page percentage vertical paddings in fixed ones
 *
 * @param {Object} page container
 * @param {String} padding value
 * @returns {Object} translated padding value
 */


const resolvePageVerticalPadding = container => value => {
  const match = (0, _matchPercent.default)(value);
  return match ? match.percent * container.height : value;
};
/**
 * Translates page percentage paddings in fixed ones
 *
 * @param {Object} page
 * @returns {Object} page with fixed paddings
 */


const resolvePagePaddings = page => {
  const container = R.pathOr({}, ['props', 'size'], page);
  return R.evolve({
    style: R.evolve({
      paddingLeft: resolvePageHorizontalPadding(container),
      paddingRight: resolvePageHorizontalPadding(container),
      paddingTop: resolvePageVerticalPadding(container),
      paddingBottom: resolvePageVerticalPadding(container)
    })
  })(page);
};
/**
 * Translates all pages percentage paddings in fixed ones
 * This has to be computed from pages calculated size and not by Yoga
 * because at this point we didn't performed pagination yet.
 *
 * @param {Object} document root
 * @returns {Object} document root with translated page paddings
 */


var _default = R.evolve({
  children: R.map(resolvePagePaddings)
});

exports.default = _default;