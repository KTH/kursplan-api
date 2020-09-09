"use strict";

exports.__esModule = true;
exports.default = void 0;
const shorthands = {
  margin: ['marginTop', 'marginRight', 'marginBottom', 'marginLeft'],
  marginHorizontal: ['marginLeft', 'marginRight'],
  marginVertical: ['marginTop', 'marginBottom'],
  padding: ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft'],
  paddingHorizontal: ['paddingLeft', 'paddingRight'],
  paddingVertical: ['paddingTop', 'paddingBottom'],
  border: ['borderTopColor', 'borderTopStyle', 'borderTopWidth', 'borderRightColor', 'borderRightStyle', 'borderRightWidth', 'borderBottomColor', 'borderBottomStyle', 'borderBottomWidth', 'borderLeftColor', 'borderLeftStyle', 'borderLeftWidth'],
  borderTop: ['borderTopColor', 'borderTopStyle', 'borderTopWidth'],
  borderRight: ['borderRightColor', 'borderRightStyle', 'borderRightWidth'],
  borderBottom: ['borderBottomColor', 'borderBottomStyle', 'borderBottomWidth'],
  borderLeft: ['borderLeftColor', 'borderLeftStyle', 'borderLeftWidth'],
  borderColor: ['borderTopColor', 'borderRightColor', 'borderBottomColor', 'borderLeftColor'],
  borderRadius: ['borderTopLeftRadius', 'borderTopRightRadius', 'borderBottomRightRadius', 'borderBottomLeftRadius'],
  borderStyle: ['borderTopStyle', 'borderRightStyle', 'borderBottomStyle', 'borderLeftStyle'],
  borderWidth: ['borderTopWidth', 'borderRightWidth', 'borderBottomWidth', 'borderLeftWidth'],
  objectPosition: ['objectPositionX', 'objectPositionY'],
  transformOrigin: ['transformOriginX', 'transformOriginY'],
  flex: ['flexGrow', 'flexShrink', 'flexBasis']
};
var _default = shorthands;
exports.default = _default;