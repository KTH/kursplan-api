'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _regeneratorRuntime = _interopDefault(require('@babel/runtime/regenerator'));
var _asyncToGenerator = _interopDefault(require('@babel/runtime/helpers/asyncToGenerator'));
var _extends = _interopDefault(require('@babel/runtime/helpers/extends'));
var _objectWithoutPropertiesLoose = _interopDefault(require('@babel/runtime/helpers/objectWithoutPropertiesLoose'));
require('is-url');
var fetch = _interopDefault(require('cross-fetch'));
var fontkit = _interopDefault(require('@react-pdf/fontkit'));

var fetchFont = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(src, options) {
    var response, buffer;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return fetch(src, options);

          case 2:
            response = _context.sent;
            _context.next = 5;
            return response.buffer ? response.buffer() : response.arrayBuffer();

          case 5:
            buffer = _context.sent;
            return _context.abrupt("return", buffer.constructor.name === 'Buffer' ? buffer : Buffer.from(buffer));

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function fetchFont(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var isDataUrl = function isDataUrl(dataUrl) {
  var header = dataUrl.split(',')[0];
  var hasDataPrefix = header.substring(0, 5) === 'data:';
  var hasBase64Prefix = header.split(';')[1] === 'base64';
  return hasDataPrefix && hasBase64Prefix;
};

var FontSource = /*#__PURE__*/function () {
  function FontSource(src, fontFamily, fontStyle, fontWeight, options) {
    this.src = src;
    this.fontFamily = fontFamily;
    this.fontStyle = fontStyle || 'normal';
    this.fontWeight = 400;
    this.data = null;
    this.loading = false;
    this.options = options;
  }

  var _proto = FontSource.prototype;

  _proto.load = /*#__PURE__*/function () {
    var _load = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
      var _this = this;

      var _this$options, headers, body, _this$options$method, method, data;

      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              this.loading = true;

              if (!isDataUrl(this.src)) {
                _context2.next = 5;
                break;
              }

              this.data = fontkit.create(Buffer.from(this.src.split(',')[1], 'base64'));
              _context2.next = 17;
              break;

            case 5:

              _this$options = this.options, headers = _this$options.headers, body = _this$options.body, _this$options$method = _this$options.method, method = _this$options$method === void 0 ? 'GET' : _this$options$method;
              _context2.next = 9;
              return fetchFont(this.src, {
                method: method,
                body: body,
                headers: headers
              });

            case 9:
              data = _context2.sent;
              this.data = fontkit.create(data);
              this.loading = false;
              _context2.next = 17;
              break;

            case 14:
              _context2.next = 16;
              return new Promise(function (resolve, reject) {
                return fontkit.open(_this.src, function (err, data) {
                  _this.loading = false;
                  return err ? reject(err) : resolve(data);
                });
              });

            case 16:
              this.data = _context2.sent;

            case 17:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function load() {
      return _load.apply(this, arguments);
    }

    return load;
  }();

  return FontSource;
}();

var Font = /*#__PURE__*/function () {
  Font.create = function create(family) {
    return new Font(family);
  };

  function Font(family) {
    this.family = family;
    this.sources = [];
  }

  var _proto2 = Font.prototype;

  _proto2.register = function register(_ref2) {
    var src = _ref2.src,
        fontWeight = _ref2.fontWeight,
        fontStyle = _ref2.fontStyle,
        options = _objectWithoutPropertiesLoose(_ref2, ["src", "fontWeight", "fontStyle"]);

    this.sources.push(new FontSource(src, this.fontFamily, fontStyle, fontWeight, options));
  };

  _proto2.resolve = function resolve(descriptor) {
    var _descriptor$fontWeigh = descriptor.fontWeight,
        fontWeight = _descriptor$fontWeigh === void 0 ? 400 : _descriptor$fontWeigh,
        _descriptor$fontStyle = descriptor.fontStyle,
        fontStyle = _descriptor$fontStyle === void 0 ? 'normal' : _descriptor$fontStyle;
    var styleSources = this.sources.filter(function (s) {
      return s.fontStyle === fontStyle;
    }); // Weight resolution. https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight#Fallback_weights

    var exactFit = styleSources.find(function (s) {
      return s.fontWeight === fontWeight;
    });
    if (exactFit) return exactFit;
    var res;

    if (fontWeight >= 400 && fontWeight <= 500) {
      var leftOffset = styleSources.filter(function (s) {
        return s.fontWeight <= fontWeight;
      });
      var rightOffset = styleSources.filter(function (s) {
        return s.fontWeight > 500;
      });
      var fit = styleSources.filter(function (s) {
        return s.fontWeight >= fontWeight && s.fontWeight < 500;
      });
      res = fit[0] || leftOffset[leftOffset.length - 1] || rightOffset[0];
    }

    var lt = styleSources.filter(function (s) {
      return s.fontWeight < fontWeight;
    });
    var gt = styleSources.filter(function (s) {
      return s.fontWeight > fontWeight;
    });

    if (fontWeight < 400) {
      res = lt[lt.length - 1] || gt[0];
    }

    if (fontWeight > 500) {
      res = gt[0] || lt[lt.length - 1];
    }

    if (!res) {
      throw new Error("Could not resolve font for " + this.fontFamily + ", fontWeight " + fontWeight);
    }

    return res;
  };

  return Font;
}();

var standard = ['Courier', 'Courier-Bold', 'Courier-Oblique', 'Helvetica', 'Helvetica-Bold', 'Helvetica-Oblique', 'Times-Roman', 'Times-Bold', 'Times-Italic'];

function FontStore() {
  var _this = this;

  var fonts = {};
  var emojiSource = null;
  var hyphenationCallback = null;

  this.register = function (data) {
    var family = data.family;

    if (!fonts[family]) {
      fonts[family] = Font.create(family);
    } // Bulk loading


    if (data.fonts) {
      for (var i = 0; i < data.fonts.length; i += 1) {
        fonts[family].register(_extends({
          family: family
        }, data.fonts[i]));
      }
    } else {
      fonts[family].register(data);
    }
  };

  this.registerEmojiSource = function (_ref) {
    var url = _ref.url,
        _ref$format = _ref.format,
        format = _ref$format === void 0 ? 'png' : _ref$format;
    emojiSource = {
      url: url,
      format: format
    };
  };

  this.registerHyphenationCallback = function (callback) {
    hyphenationCallback = callback;
  };

  this.getFont = function (descriptor) {
    var fontFamily = descriptor.fontFamily;
    var isStandard = standard.includes(fontFamily);
    if (isStandard) return null;

    if (!fonts[fontFamily]) {
      throw new Error("Font family not registered: " + fontFamily + ". Please register it calling Font.register() method.");
    }

    return fonts[fontFamily].resolve(descriptor);
  };

  this.load = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(descriptor) {
      var fontFamily, isStandard, f;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              fontFamily = descriptor.fontFamily;
              isStandard = standard.includes(fontFamily);

              if (!isStandard) {
                _context.next = 4;
                break;
              }

              return _context.abrupt("return");

            case 4:
              f = _this.getFont(descriptor); // We cache the font to avoid fetching it many times

              if (!(!f.data && !f.loading)) {
                _context.next = 8;
                break;
              }

              _context.next = 8;
              return f.load();

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref2.apply(this, arguments);
    };
  }();

  this.reset = function () {
    var keys = Object.keys(fonts);

    for (var i = 0; i < keys.length; i += 1) {
      var key = keys[i];
      fonts[key].data = null;
    }
  };

  this.clear = function () {
    fonts = {};
  };

  this.getRegisteredFonts = function () {
    return fonts;
  };

  this.getEmojiSource = function () {
    return emojiSource;
  };

  this.getHyphenationCallback = function () {
    return hyphenationCallback;
  };

  this.getRegisteredFontFamilies = function () {
    return Object.keys(fonts);
  };
}

exports.default = FontStore;
//# sourceMappingURL=index.browser.js.map
