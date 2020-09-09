"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var _mediaEngine = _interopRequireDefault(require("media-engine"));

/**
 * Resolves media queries in styles object
 *
 * @param {Object} container
 * @param {Object} styles object
 */
const resolveMediaQueries = (container, styles) => {
  return Object.keys(styles).reduce((acc, key) => {
    if (/@media/.test(key)) {
      return { ...acc,
        ...(0, _mediaEngine.default)({
          [key]: styles[key]
        }, container)
      };
    }

    return { ...acc,
      [key]: styles[key]
    };
  }, {});
};

var _default = R.curryN(2, resolveMediaQueries);

exports.default = _default;