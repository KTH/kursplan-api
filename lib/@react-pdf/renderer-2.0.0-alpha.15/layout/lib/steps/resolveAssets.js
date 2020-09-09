"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports.default = void 0;

var R = _interopRequireWildcard(require("ramda"));

var P = _interopRequireWildcard(require("@react-pdf/primitives"));

var _emoji = _interopRequireDefault(require("../text/emoji"));

var _fetchImage = _interopRequireDefault(require("../image/fetchImage"));

const isImage = R.propEq('type', P.Image);
/**
 * Get all asset promises that need to be resolved
 *
 * @param {Object} root node
 * @returns {Array} asset promises
 */

const fetchAssets = (fontStore, node) => {
  const promises = [];
  const listToExplore = node.children.slice(0);
  const emojiSource = fontStore ? fontStore.getEmojiSource() : null;

  while (listToExplore.length > 0) {
    const n = listToExplore.shift();

    if (isImage(n)) {
      promises.push((0, _fetchImage.default)(n));
    }

    if (fontStore && n.style && n.style.fontFamily) {
      promises.push(fontStore.load(n.style));
    }

    if (typeof n === 'string') {
      promises.push(...(0, _emoji.default)(n, emojiSource));
    }

    if (typeof n.value === 'string') {
      promises.push(...(0, _emoji.default)(n.value, emojiSource));
    }

    if (n.children) {
      n.children.forEach(childNode => {
        listToExplore.push(childNode);
      });
    }
  }

  return promises;
};
/**
 * Fetch image, font and emoji assets in parallel.
 * Layout process will not be resumed until promise resolves.
 *
 * @param {Object} fontStore font store
 * @param {Object} root node
 * @returns {Object} root node
 */


const resolveAssets = (node, fontStore) => R.compose(R.then(R.always(node)), p => Promise.all(p), fetchAssets)(fontStore, node);

var _default = resolveAssets;
exports.default = _default;