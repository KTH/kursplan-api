"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _upperFirst = _interopRequireDefault(require("../utils/upperFirst"));

var _matchPercent = _interopRequireDefault(require("../utils/matchPercent"));

const isNotNil = R.complement(R.isNil);
/**
 * Set generic yoga attribute to node's Yoga instance, handing `auto`, edges and percentage cases
 *
 * @param {String} property
 * @param {Number} edge
 * @param {any} value
 * @param {Object} node instance
 * @return {Object} node instance
 */

const setYogaValue = (attr, edge) => value => R.tap(node => {
  const yogaNode = node._yogaNode;

  if (!R.isNil(value) && yogaNode) {
    const hasEdge = isNotNil(edge);
    const fixedMethod = `set${(0, _upperFirst.default)(attr)}`;
    const autoMethod = `${fixedMethod}Auto`;
    const percentMethod = `${fixedMethod}Percent`;
    const percent = (0, _matchPercent.default)(value);

    if (percent && !yogaNode[percentMethod]) {
      throw new Error(`You can't pass percentage values to ${attr} property`);
    }

    if (percent) {
      if (hasEdge) {
        yogaNode[percentMethod](edge, percent.value);
      } else {
        yogaNode[percentMethod](percent.value);
      }
    } else if (value === 'auto') {
      if (hasEdge) {
        yogaNode[autoMethod](edge);
      } else {
        yogaNode[autoMethod]();
      }
    } else if (hasEdge) {
      yogaNode[fixedMethod](edge, value);
    } else {
      yogaNode[fixedMethod](value);
    }
  }
});

var _default = setYogaValue;
exports.default = _default;