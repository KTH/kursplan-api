"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _image = _interopRequireDefault(require("@react-pdf/image"));

var _getSource = _interopRequireDefault(require("./getSource"));

/* eslint-disable no-param-reassign */

/**
 * Resolves async src if passed
 *
 * @param {string | Function} src
 * @returns {object} resolved src
 */
const resolveSrc = async src => typeof src === 'function' ? {
  uri: await src()
} : src;
/**
 * Fetches image and append data to node
 * Ideally this fn should be immutable.
 *
 * @param {Object} node
 */


const fetchImage = async node => {
  const src = (0, _getSource.default)(node);
  const {
    cache
  } = node.props;

  if (!src) {
    console.warn(false, 'Image should receive either a "src" or "source" prop');
    return;
  }

  try {
    const source = await resolveSrc(src);
    node.image = await (0, _image.default)(source, {
      cache
    });
  } catch (e) {
    node.image = {
      width: 0,
      height: 0
    };
    console.warn(e.message);
  }
};

var _default = fetchImage;
exports.default = _default;