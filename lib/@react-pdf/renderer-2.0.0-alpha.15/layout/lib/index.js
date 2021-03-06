"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _asyncCompose = _interopRequireDefault(require("./utils/asyncCompose"));

var _resolveSvg = _interopRequireDefault(require("./steps/resolveSvg"));

var _resolveZIndex = _interopRequireDefault(require("./steps/resolveZIndex"));

var _resolveAssets = _interopRequireDefault(require("./steps/resolveAssets"));

var _resolveStyles = _interopRequireDefault(require("./steps/resolveStyles"));

var _resolveOrigins = _interopRequireDefault(require("./steps/resolveOrigins"));

var _resolvePageSizes = _interopRequireDefault(require("./steps/resolvePageSizes"));

var _resolvePagination = _interopRequireDefault(require("./steps/resolvePagination"));

var _resolveDimensions = _interopRequireDefault(require("./steps/resolveDimensions"));

var _resolveTextLayout = _interopRequireDefault(require("./steps/resolveTextLayout"));

var _resolveInheritance = _interopRequireDefault(require("./steps/resolveInheritance"));

var _resolvePagePaddings = _interopRequireDefault(require("./steps/resolvePagePaddings"));

var _resolvePercentRadius = _interopRequireDefault(require("./steps/resolvePercentRadius"));

var _resolvePercentHeight = _interopRequireDefault(require("./steps/resolvePercentHeight"));

var _resolveLinkSubstitution = _interopRequireDefault(require("./steps/resolveLinkSubstitution"));

// import * as R from 'ramda';
// const startTimer = name => R.tap(() => console.time(name));
// const endTimer = name => R.tap(() => console.timeEnd(name));
const layout = (0, _asyncCompose.default)(_resolveZIndex.default, _resolveOrigins.default, _resolvePagination.default, _resolveTextLayout.default, _resolvePercentRadius.default, _resolveDimensions.default, _resolveSvg.default, _resolveAssets.default, _resolveInheritance.default, _resolvePercentHeight.default, _resolvePagePaddings.default, _resolveStyles.default, _resolveLinkSubstitution.default, _resolvePageSizes.default);
var _default = layout;
exports.default = _default;