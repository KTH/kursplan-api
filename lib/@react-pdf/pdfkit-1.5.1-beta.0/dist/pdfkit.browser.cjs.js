'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var stream = _interopDefault(require('stream'));
var zlib = _interopDefault(require('zlib'));
var fontkit = _interopDefault(require('@react-pdf/fontkit'));
var LZString = _interopDefault(require('lz-string'));
var PNG = _interopDefault(require('@react-pdf/png-js'));

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};





var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();













var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

var PDFReference = function (_stream$Writable) {
  inherits(PDFReference, _stream$Writable);

  function PDFReference(document, id, data) {
    classCallCheck(this, PDFReference);

    var _this = possibleConstructorReturn(this, (PDFReference.__proto__ || Object.getPrototypeOf(PDFReference)).call(this, { decodeStrings: false }));

    _this.finalize = _this.finalize.bind(_this);
    _this.document = document;
    _this.id = id;
    if (data == null) {
      data = {};
    }
    _this.data = data;

    _this.gen = 0;
    _this.deflate = null;
    _this.compress = _this.document.compress && !_this.data.Filter;
    _this.uncompressedLength = 0;
    _this.chunks = [];
    return _this;
  }

  createClass(PDFReference, [{
    key: 'initDeflate',
    value: function initDeflate() {
      var _this2 = this;

      this.data.Filter = 'FlateDecode';

      this.deflate = zlib.createDeflate();
      this.deflate.on('data', function (chunk) {
        _this2.chunks.push(chunk);
        return _this2.data.Length += chunk.length;
      });

      return this.deflate.on('end', this.finalize);
    }
  }, {
    key: '_write',
    value: function _write(chunk, encoding, callback) {
      if (!Buffer.isBuffer(chunk)) {
        chunk = new Buffer(chunk + '\n', 'binary');
      }

      this.uncompressedLength += chunk.length;
      if (this.data.Length == null) {
        this.data.Length = 0;
      }

      if (this.compress) {
        if (!this.deflate) {
          this.initDeflate();
        }
        this.deflate.write(chunk);
      } else {
        this.chunks.push(chunk);
        this.data.Length += chunk.length;
      }

      return callback();
    }
  }, {
    key: 'end',
    value: function end(chunk) {
      get(PDFReference.prototype.__proto__ || Object.getPrototypeOf(PDFReference.prototype), 'end', this).apply(this, arguments);

      if (this.deflate) {
        return this.deflate.end();
      } else {
        return this.finalize();
      }
    }
  }, {
    key: 'finalize',
    value: function finalize() {
      this.offset = this.document._offset;

      this.document._write(this.id + ' ' + this.gen + ' obj');
      this.document._write(PDFObject.convert(this.data));

      if (this.chunks.length) {
        this.document._write('stream');
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = Array.from(this.chunks)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var chunk = _step.value;

            this.document._write(chunk);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        this.chunks.length = 0; // free up memory
        this.document._write('\nendstream');
      }

      this.document._write('endobj');
      return this.document._refEnd(this);
    }
  }, {
    key: 'toString',
    value: function toString() {
      return this.id + ' ' + this.gen + ' R';
    }
  }]);
  return PDFReference;
}(stream.Writable);

/*
PDFNameTree - represents a name tree object
*/

var PDFNameTree = function () {
    function PDFNameTree() {
        classCallCheck(this, PDFNameTree);

        this._items = {};
    }

    createClass(PDFNameTree, [{
        key: 'add',
        value: function add(key, val) {
            return this._items[key] = val;
        }
    }, {
        key: 'get',
        value: function get$$1(key) {
            return this._items[key];
        }
    }, {
        key: 'toString',
        value: function toString() {
            // Needs to be sorted by key
            var sortedKeys = Object.keys(this._items).sort(function (a, b) {
                return a.localeCompare(b);
            });

            var out = ['<<'];
            if (sortedKeys.length > 1) {
                var first = sortedKeys[0],
                    last = sortedKeys[sortedKeys.length - 1];
                out.push('  /Limits ' + PDFObject.convert([new String(first), new String(last)]));
            }
            out.push('  /Names [');
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = sortedKeys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var key = _step.value;

                    out.push('    ' + PDFObject.convert(new String(key)) + ' ' + PDFObject.convert(this._items[key]));
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            out.push(']');
            out.push('>>');
            return out.join('\n');
        }
    }]);
    return PDFNameTree;
}();

var escapableRe = /[\n\r\t\b\f\(\)\\]/g;
var escapable = {
  '\n': '\\n',
  '\r': '\\r',
  '\t': '\\t',
  '\b': '\\b',
  '\f': '\\f',
  '\\': '\\\\',
  '(': '\\(',
  ')': '\\)'
};

var pad = function pad(str, length) {
  return (Array(length + 1).join('0') + str).slice(-length);
};

// Convert little endian UTF-16 to big endian
var swapBytes = function swapBytes(buff) {
  var l = buff.length;
  if (l & 0x01) {
    throw new Error('Buffer length must be even');
  } else {
    for (var i = 0, end = l - 1; i < end; i += 2) {
      var a = buff[i];
      buff[i] = buff[i + 1];
      buff[i + 1] = a;
    }
  }

  return buff;
};

var PDFObject = function () {
  function PDFObject() {
    classCallCheck(this, PDFObject);
  }

  createClass(PDFObject, null, [{
    key: 'convert',
    value: function convert(object) {
      // String literals are converted to the PDF name type
      if (typeof object === 'string') {
        return '/' + object;

        // String objects are converted to PDF strings (UTF-16)
      } else if (object instanceof String) {
        var string = object;
        // Detect if this is a unicode string
        var isUnicode = false;
        for (var i = 0, end = string.length; i < end; i++) {
          if (string.charCodeAt(i) > 0x7f) {
            isUnicode = true;
            break;
          }
        }

        // If so, encode it as big endian UTF-16
        if (isUnicode) {
          string = swapBytes(new Buffer('\uFEFF' + string, 'utf16le')).toString('binary');
        }

        // Escape characters as required by the spec
        string = string.replace(escapableRe, function (c) {
          return escapable[c];
        });

        return '(' + string + ')';

        // Buffers are converted to PDF hex strings
      } else if (Buffer.isBuffer(object)) {
        return '<' + object.toString('hex') + '>';
      } else if (object instanceof PDFReference || object instanceof PDFNameTree) {
        return object.toString();
      } else if (object instanceof Date) {
        return '(D:' + pad(object.getUTCFullYear(), 4) + pad(object.getUTCMonth() + 1, 2) + pad(object.getUTCDate(), 2) + pad(object.getUTCHours(), 2) + pad(object.getUTCMinutes(), 2) + pad(object.getUTCSeconds(), 2) + 'Z)';
      } else if (Array.isArray(object)) {
        var items = Array.from(object).map(function (e) {
          return PDFObject.convert(e);
        }).join(' ');
        return '[' + items + ']';
      } else if ({}.toString.call(object) === '[object Object]') {
        var out = ['<<'];
        for (var key in object) {
          var val = object[key];
          out.push('/' + key + ' ' + PDFObject.convert(val));
        }

        out.push('>>');
        return out.join('\n');
      } else if (typeof object === 'number') {
        return PDFObject.number(object);
      } else {
        return '' + object;
      }
    }
  }, {
    key: 'number',
    value: function number(n) {
      if (n > -1e21 && n < 1e21) {
        return Math.round(n * 1e6) / 1e6;
      }

      throw new Error('unsupported number: ' + n);
    }
  }]);
  return PDFObject;
}();

var SIZES = {
  '4A0': [4767.87, 6740.79],
  '2A0': [3370.39, 4767.87],
  A0: [2383.94, 3370.39],
  A1: [1683.78, 2383.94],
  A2: [1190.55, 1683.78],
  A3: [841.89, 1190.55],
  A4: [595.28, 841.89],
  A5: [419.53, 595.28],
  A6: [297.64, 419.53],
  A7: [209.76, 297.64],
  A8: [147.4, 209.76],
  A9: [104.88, 147.4],
  A10: [73.7, 104.88],
  B0: [2834.65, 4008.19],
  B1: [2004.09, 2834.65],
  B2: [1417.32, 2004.09],
  B3: [1000.63, 1417.32],
  B4: [708.66, 1000.63],
  B5: [498.9, 708.66],
  B6: [354.33, 498.9],
  B7: [249.45, 354.33],
  B8: [175.75, 249.45],
  B9: [124.72, 175.75],
  B10: [87.87, 124.72],
  C0: [2599.37, 3676.54],
  C1: [1836.85, 2599.37],
  C2: [1298.27, 1836.85],
  C3: [918.43, 1298.27],
  C4: [649.13, 918.43],
  C5: [459.21, 649.13],
  C6: [323.15, 459.21],
  C7: [229.61, 323.15],
  C8: [161.57, 229.61],
  C9: [113.39, 161.57],
  C10: [79.37, 113.39],
  RA0: [2437.8, 3458.27],
  RA1: [1729.13, 2437.8],
  RA2: [1218.9, 1729.13],
  RA3: [864.57, 1218.9],
  RA4: [609.45, 864.57],
  SRA0: [2551.18, 3628.35],
  SRA1: [1814.17, 2551.18],
  SRA2: [1275.59, 1814.17],
  SRA3: [907.09, 1275.59],
  SRA4: [637.8, 907.09],
  EXECUTIVE: [521.86, 756.0],
  FOLIO: [612.0, 936.0],
  LEGAL: [612.0, 1008.0],
  LETTER: [612.0, 792.0],
  TABLOID: [792.0, 1224.0]
};

var PDFPage = function () {
  function PDFPage(document, options) {
    var _this = this;

    classCallCheck(this, PDFPage);

    this.document = document;
    if (options == null) {
      options = {};
    }
    this.size = options.size || 'letter';
    this.layout = options.layout || 'portrait';

    // calculate page dimensions
    var dimensions = Array.isArray(this.size) ? this.size : SIZES[this.size.toUpperCase()];
    this.width = dimensions[this.layout === 'portrait' ? 0 : 1];
    this.height = dimensions[this.layout === 'portrait' ? 1 : 0];

    this.content = this.document.ref();

    // Initialize the Font, XObject, and ExtGState dictionaries
    this.resources = this.document.ref({
      ProcSet: ['PDF', 'Text', 'ImageB', 'ImageC', 'ImageI']
    });

    // Lazily create these dictionaries
    Object.defineProperties(this, {
      fonts: {
        get: function get$$1() {
          return _this.resources.data.Font != null ? _this.resources.data.Font : _this.resources.data.Font = {};
        }
      },
      xobjects: {
        get: function get$$1() {
          return _this.resources.data.XObject != null ? _this.resources.data.XObject : _this.resources.data.XObject = {};
        }
      },
      ext_gstates: {
        get: function get$$1() {
          return _this.resources.data.ExtGState != null ? _this.resources.data.ExtGState : _this.resources.data.ExtGState = {};
        }
      },
      patterns: {
        get: function get$$1() {
          return _this.resources.data.Pattern != null ? _this.resources.data.Pattern : _this.resources.data.Pattern = {};
        }
      },
      annotations: {
        get: function get$$1() {
          return _this.dictionary.data.Annots != null ? _this.dictionary.data.Annots : _this.dictionary.data.Annots = [];
        }
      }
    });

    // The page dictionary
    this.dictionary = this.document.ref({
      Type: 'Page',
      Parent: this.document._root.data.Pages,
      MediaBox: [0, 0, this.width, this.height],
      Contents: this.content,
      Resources: this.resources
    });
  }

  createClass(PDFPage, [{
    key: 'maxY',
    value: function maxY() {
      return this.height;
    }
  }, {
    key: 'write',
    value: function write(chunk) {
      return this.content.write(chunk);
    }
  }, {
    key: 'end',
    value: function end() {
      this.dictionary.end();
      this.resources.end();
      return this.content.end();
    }
  }]);
  return PDFPage;
}();

var number = PDFObject.number;

var PDFGradient$1 = function () {
  function PDFGradient(doc) {
    classCallCheck(this, PDFGradient);

    this.doc = doc;
    this.stops = [];
    this.embedded = false;
    this.transform = [1, 0, 0, 1, 0, 0];
  }

  createClass(PDFGradient, [{
    key: 'stop',
    value: function stop(pos, color, opacity) {
      if (opacity == null) {
        opacity = 1;
      }
      color = this.doc._normalizeColor(color);

      if (this.stops.length === 0) {
        if (color.length === 3) {
          this._colorSpace = 'DeviceRGB';
        } else if (color.length === 4) {
          this._colorSpace = 'DeviceCMYK';
        } else if (color.length === 1) {
          this._colorSpace = 'DeviceGray';
        } else {
          throw new Error('Unknown color space');
        }
      } else if (this._colorSpace === 'DeviceRGB' && color.length !== 3 || this._colorSpace === 'DeviceCMYK' && color.length !== 4 || this._colorSpace === 'DeviceGray' && color.length !== 1) {
        throw new Error('All gradient stops must use the same color space');
      }

      opacity = Math.max(0, Math.min(1, opacity));
      this.stops.push([pos, color, opacity]);
      return this;
    }
  }, {
    key: 'setTransform',
    value: function setTransform(m11, m12, m21, m22, dx, dy) {
      this.transform = [m11, m12, m21, m22, dx, dy];
      return this;
    }
  }, {
    key: 'embed',
    value: function embed(m) {
      var fn = void 0;
      var stopsLength = this.stops.length;
      if (stopsLength === 0) {
        return;
      }
      this.embedded = true;
      this.matrix = m;

      // if the last stop comes before 100%, add a copy at 100%
      var last = this.stops[stopsLength - 1];
      if (last[0] < 1) {
        this.stops.push([1, last[1], last[2]]);
      }

      var bounds = [];
      var encode = [];
      var stops = [];

      for (var i = 0; i < stopsLength - 1; i++) {
        encode.push(0, 1);
        if (i + 2 !== stopsLength) {
          bounds.push(this.stops[i + 1][0]);
        }

        fn = this.doc.ref({
          FunctionType: 2,
          Domain: [0, 1],
          C0: this.stops[i + 0][1],
          C1: this.stops[i + 1][1],
          N: 1
        });

        stops.push(fn);
        fn.end();
      }

      // if there are only two stops, we don't need a stitching function
      if (stopsLength === 1) {
        fn = stops[0];
      } else {
        fn = this.doc.ref({
          FunctionType: 3, // stitching function
          Domain: [0, 1],
          Functions: stops,
          Bounds: bounds,
          Encode: encode
        });

        fn.end();
      }

      this.id = 'Sh' + ++this.doc._gradCount;

      var shader = this.shader(fn);
      shader.end();

      var pattern = this.doc.ref({
        Type: 'Pattern',
        PatternType: 2,
        Shading: shader,
        Matrix: this.matrix.map(number)
      });

      pattern.end();

      if (this.stops.some(function (stop) {
        return stop[2] < 1;
      })) {
        var grad = this.opacityGradient();
        grad._colorSpace = 'DeviceGray';

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this.stops[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var stop = _step.value;

            grad.stop(stop[0], [stop[2]]);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        grad = grad.embed(this.matrix);

        var pageBBox = [0, 0, this.doc.page.width, this.doc.page.height];

        var form = this.doc.ref({
          Type: 'XObject',
          Subtype: 'Form',
          FormType: 1,
          BBox: pageBBox,
          Group: {
            Type: 'Group',
            S: 'Transparency',
            CS: 'DeviceGray'
          },
          Resources: {
            ProcSet: ['PDF', 'Text', 'ImageB', 'ImageC', 'ImageI'],
            Pattern: {
              Sh1: grad
            }
          }
        });

        form.write('/Pattern cs /Sh1 scn');
        form.end(pageBBox.join(' ') + ' re f');

        var gstate = this.doc.ref({
          Type: 'ExtGState',
          SMask: {
            Type: 'Mask',
            S: 'Luminosity',
            G: form
          }
        });

        gstate.end();

        var opacityPattern = this.doc.ref({
          Type: 'Pattern',
          PatternType: 1,
          PaintType: 1,
          TilingType: 2,
          BBox: pageBBox,
          XStep: pageBBox[2],
          YStep: pageBBox[3],
          Resources: {
            ProcSet: ['PDF', 'Text', 'ImageB', 'ImageC', 'ImageI'],
            Pattern: {
              Sh1: pattern
            },
            ExtGState: {
              Gs1: gstate
            }
          }
        });

        opacityPattern.write('/Gs1 gs /Pattern cs /Sh1 scn');
        opacityPattern.end(pageBBox.join(' ') + ' re f');

        this.doc.page.patterns[this.id] = opacityPattern;
      } else {
        this.doc.page.patterns[this.id] = pattern;
      }

      return pattern;
    }
  }, {
    key: 'apply',
    value: function apply(op) {
      // apply gradient transform to existing document ctm
      var _doc$_ctm = slicedToArray(this.doc._ctm, 6),
          m0 = _doc$_ctm[0],
          m1 = _doc$_ctm[1],
          m2 = _doc$_ctm[2],
          m3 = _doc$_ctm[3],
          m4 = _doc$_ctm[4],
          m5 = _doc$_ctm[5];

      var _transform = slicedToArray(this.transform, 6),
          m11 = _transform[0],
          m12 = _transform[1],
          m21 = _transform[2],
          m22 = _transform[3],
          dx = _transform[4],
          dy = _transform[5];

      var m = [m0 * m11 + m2 * m12, m1 * m11 + m3 * m12, m0 * m21 + m2 * m22, m1 * m21 + m3 * m22, m0 * dx + m2 * dy + m4, m1 * dx + m3 * dy + m5];

      if (!this.embedded || m.join(' ') !== this.matrix.join(' ')) {
        this.embed(m);
      }
      return this.doc.addContent('/' + this.id + ' ' + op);
    }
  }]);
  return PDFGradient;
}();

var PDFLinearGradient$1 = function (_PDFGradient) {
  inherits(PDFLinearGradient, _PDFGradient);

  function PDFLinearGradient(doc, x1, y1, x2, y2) {
    classCallCheck(this, PDFLinearGradient);

    var _this = possibleConstructorReturn(this, (PDFLinearGradient.__proto__ || Object.getPrototypeOf(PDFLinearGradient)).call(this, doc));

    _this.x1 = x1;
    _this.y1 = y1;
    _this.x2 = x2;
    _this.y2 = y2;
    return _this;
  }

  createClass(PDFLinearGradient, [{
    key: 'shader',
    value: function shader(fn) {
      return this.doc.ref({
        ShadingType: 2,
        ColorSpace: this._colorSpace,
        Coords: [this.x1, this.y1, this.x2, this.y2],
        Function: fn,
        Extend: [true, true]
      });
    }
  }, {
    key: 'opacityGradient',
    value: function opacityGradient() {
      return new PDFLinearGradient(this.doc, this.x1, this.y1, this.x2, this.y2);
    }
  }]);
  return PDFLinearGradient;
}(PDFGradient$1);

var PDFRadialGradient$1 = function (_PDFGradient2) {
  inherits(PDFRadialGradient, _PDFGradient2);

  function PDFRadialGradient(doc, x1, y1, r1, x2, y2, r2) {
    classCallCheck(this, PDFRadialGradient);

    var _this2 = possibleConstructorReturn(this, (PDFRadialGradient.__proto__ || Object.getPrototypeOf(PDFRadialGradient)).call(this, doc));

    _this2.doc = doc;
    _this2.x1 = x1;
    _this2.y1 = y1;
    _this2.r1 = r1;
    _this2.x2 = x2;
    _this2.y2 = y2;
    _this2.r2 = r2;
    return _this2;
  }

  createClass(PDFRadialGradient, [{
    key: 'shader',
    value: function shader(fn) {
      return this.doc.ref({
        ShadingType: 3,
        ColorSpace: this._colorSpace,
        Coords: [this.x1, this.y1, this.r1, this.x2, this.y2, this.r2],
        Function: fn,
        Extend: [true, true]
      });
    }
  }, {
    key: 'opacityGradient',
    value: function opacityGradient() {
      return new PDFRadialGradient(this.doc, this.x1, this.y1, this.r1, this.x2, this.y2, this.r2);
    }
  }]);
  return PDFRadialGradient;
}(PDFGradient$1);

var Gradient = { PDFGradient: PDFGradient$1, PDFLinearGradient: PDFLinearGradient$1, PDFRadialGradient: PDFRadialGradient$1 };

var PDFGradient = Gradient.PDFGradient;
var PDFLinearGradient = Gradient.PDFLinearGradient;
var PDFRadialGradient = Gradient.PDFRadialGradient;


var Color = {
  initColor: function initColor() {
    // The opacity dictionaries
    this._opacityRegistry = {};
    this._opacityCount = 0;
    return this._gradCount = 0;
  },
  _normalizeColor: function _normalizeColor(color) {
    if (color instanceof PDFGradient) {
      return color;
    }

    var part = void 0;
    if (typeof color === 'string') {
      if (color.charAt(0) === '#') {
        if (color.length === 4) {
          color = color.replace(/#([0-9A-F])([0-9A-F])([0-9A-F])/i, '#$1$1$2$2$3$3');
        }
        var hex = parseInt(color.slice(1), 16);
        color = [hex >> 16, hex >> 8 & 0xff, hex & 0xff];
      } else if (namedColors[color]) {
        color = namedColors[color];
      }
    }

    if (Array.isArray(color)) {
      // RGB
      if (color.length === 3) {
        color = function () {
          var result = [];
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = Array.from(color)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              part = _step.value;

              result.push(part / 255);
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }

          return result;
        }();

        // CMYK
      } else if (color.length === 4) {
        color = function () {
          var result1 = [];
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = Array.from(color)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              part = _step2.value;

              result1.push(part / 100);
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }

          return result1;
        }();
      }

      return color;
    }

    return null;
  },
  _setColor: function _setColor(color, stroke) {
    color = this._normalizeColor(color);
    if (!color) {
      return false;
    }

    var op = stroke ? 'SCN' : 'scn';

    if (color instanceof PDFGradient) {
      this._setColorSpace('Pattern', stroke);
      color.apply(op);
    } else {
      var space = color.length === 4 ? 'DeviceCMYK' : 'DeviceRGB';
      this._setColorSpace(space, stroke);

      color = color.join(' ');
      this.addContent(color + ' ' + op);
    }

    return true;
  },
  _setColorSpace: function _setColorSpace(space, stroke) {
    var op = stroke ? 'CS' : 'cs';
    return this.addContent('/' + space + ' ' + op);
  },
  fillColor: function fillColor(color, opacity) {
    var set$$1 = this._setColor(color, false);
    if (set$$1) {
      this.fillOpacity(opacity);
    }

    // save this for text wrapper, which needs to reset
    // the fill color on new pages
    this._fillColor = [color, opacity];
    return this;
  },
  strokeColor: function strokeColor(color, opacity) {
    var set$$1 = this._setColor(color, true);
    if (set$$1) {
      this.strokeOpacity(opacity);
    }
    return this;
  },
  opacity: function opacity(_opacity) {
    this._doOpacity(_opacity, _opacity);
    return this;
  },
  fillOpacity: function fillOpacity(opacity) {
    this._doOpacity(opacity, null);
    return this;
  },
  strokeOpacity: function strokeOpacity(opacity) {
    this._doOpacity(null, opacity);
    return this;
  },
  _doOpacity: function _doOpacity(fillOpacity, strokeOpacity) {
    var dictionary = void 0,
        name = void 0;
    if (fillOpacity == null && strokeOpacity == null) {
      return;
    }

    if (fillOpacity != null) {
      fillOpacity = Math.max(0, Math.min(1, fillOpacity));
    }
    if (strokeOpacity != null) {
      strokeOpacity = Math.max(0, Math.min(1, strokeOpacity));
    }
    var key = fillOpacity + '_' + strokeOpacity;

    if (this._opacityRegistry[key]) {
      var _Array$from = Array.from(this._opacityRegistry[key]);

      var _Array$from2 = slicedToArray(_Array$from, 2);

      dictionary = _Array$from2[0];
      name = _Array$from2[1];
    } else {
      dictionary = { Type: 'ExtGState' };

      if (fillOpacity != null) {
        dictionary.ca = fillOpacity;
      }
      if (strokeOpacity != null) {
        dictionary.CA = strokeOpacity;
      }

      dictionary = this.ref(dictionary);
      dictionary.end();
      var id = ++this._opacityCount;
      name = 'Gs' + id;
      this._opacityRegistry[key] = [dictionary, name];
    }

    this.page.ext_gstates[name] = dictionary;
    return this.addContent('/' + name + ' gs');
  },
  linearGradient: function linearGradient(x1, y1, x2, y2) {
    return new PDFLinearGradient(this, x1, y1, x2, y2);
  },
  radialGradient: function radialGradient(x1, y1, r1, x2, y2, r2) {
    return new PDFRadialGradient(this, x1, y1, r1, x2, y2, r2);
  }
};

var namedColors = {
  aliceblue: [240, 248, 255],
  antiquewhite: [250, 235, 215],
  aqua: [0, 255, 255],
  aquamarine: [127, 255, 212],
  azure: [240, 255, 255],
  beige: [245, 245, 220],
  bisque: [255, 228, 196],
  black: [0, 0, 0],
  blanchedalmond: [255, 235, 205],
  blue: [0, 0, 255],
  blueviolet: [138, 43, 226],
  brown: [165, 42, 42],
  burlywood: [222, 184, 135],
  cadetblue: [95, 158, 160],
  chartreuse: [127, 255, 0],
  chocolate: [210, 105, 30],
  coral: [255, 127, 80],
  cornflowerblue: [100, 149, 237],
  cornsilk: [255, 248, 220],
  crimson: [220, 20, 60],
  cyan: [0, 255, 255],
  darkblue: [0, 0, 139],
  darkcyan: [0, 139, 139],
  darkgoldenrod: [184, 134, 11],
  darkgray: [169, 169, 169],
  darkgreen: [0, 100, 0],
  darkgrey: [169, 169, 169],
  darkkhaki: [189, 183, 107],
  darkmagenta: [139, 0, 139],
  darkolivegreen: [85, 107, 47],
  darkorange: [255, 140, 0],
  darkorchid: [153, 50, 204],
  darkred: [139, 0, 0],
  darksalmon: [233, 150, 122],
  darkseagreen: [143, 188, 143],
  darkslateblue: [72, 61, 139],
  darkslategray: [47, 79, 79],
  darkslategrey: [47, 79, 79],
  darkturquoise: [0, 206, 209],
  darkviolet: [148, 0, 211],
  deeppink: [255, 20, 147],
  deepskyblue: [0, 191, 255],
  dimgray: [105, 105, 105],
  dimgrey: [105, 105, 105],
  dodgerblue: [30, 144, 255],
  firebrick: [178, 34, 34],
  floralwhite: [255, 250, 240],
  forestgreen: [34, 139, 34],
  fuchsia: [255, 0, 255],
  gainsboro: [220, 220, 220],
  ghostwhite: [248, 248, 255],
  gold: [255, 215, 0],
  goldenrod: [218, 165, 32],
  gray: [128, 128, 128],
  grey: [128, 128, 128],
  green: [0, 128, 0],
  greenyellow: [173, 255, 47],
  honeydew: [240, 255, 240],
  hotpink: [255, 105, 180],
  indianred: [205, 92, 92],
  indigo: [75, 0, 130],
  ivory: [255, 255, 240],
  khaki: [240, 230, 140],
  lavender: [230, 230, 250],
  lavenderblush: [255, 240, 245],
  lawngreen: [124, 252, 0],
  lemonchiffon: [255, 250, 205],
  lightblue: [173, 216, 230],
  lightcoral: [240, 128, 128],
  lightcyan: [224, 255, 255],
  lightgoldenrodyellow: [250, 250, 210],
  lightgray: [211, 211, 211],
  lightgreen: [144, 238, 144],
  lightgrey: [211, 211, 211],
  lightpink: [255, 182, 193],
  lightsalmon: [255, 160, 122],
  lightseagreen: [32, 178, 170],
  lightskyblue: [135, 206, 250],
  lightslategray: [119, 136, 153],
  lightslategrey: [119, 136, 153],
  lightsteelblue: [176, 196, 222],
  lightyellow: [255, 255, 224],
  lime: [0, 255, 0],
  limegreen: [50, 205, 50],
  linen: [250, 240, 230],
  magenta: [255, 0, 255],
  maroon: [128, 0, 0],
  mediumaquamarine: [102, 205, 170],
  mediumblue: [0, 0, 205],
  mediumorchid: [186, 85, 211],
  mediumpurple: [147, 112, 219],
  mediumseagreen: [60, 179, 113],
  mediumslateblue: [123, 104, 238],
  mediumspringgreen: [0, 250, 154],
  mediumturquoise: [72, 209, 204],
  mediumvioletred: [199, 21, 133],
  midnightblue: [25, 25, 112],
  mintcream: [245, 255, 250],
  mistyrose: [255, 228, 225],
  moccasin: [255, 228, 181],
  navajowhite: [255, 222, 173],
  navy: [0, 0, 128],
  oldlace: [253, 245, 230],
  olive: [128, 128, 0],
  olivedrab: [107, 142, 35],
  orange: [255, 165, 0],
  orangered: [255, 69, 0],
  orchid: [218, 112, 214],
  palegoldenrod: [238, 232, 170],
  palegreen: [152, 251, 152],
  paleturquoise: [175, 238, 238],
  palevioletred: [219, 112, 147],
  papayawhip: [255, 239, 213],
  peachpuff: [255, 218, 185],
  peru: [205, 133, 63],
  pink: [255, 192, 203],
  plum: [221, 160, 221],
  powderblue: [176, 224, 230],
  purple: [128, 0, 128],
  red: [255, 0, 0],
  rosybrown: [188, 143, 143],
  royalblue: [65, 105, 225],
  saddlebrown: [139, 69, 19],
  salmon: [250, 128, 114],
  sandybrown: [244, 164, 96],
  seagreen: [46, 139, 87],
  seashell: [255, 245, 238],
  sienna: [160, 82, 45],
  silver: [192, 192, 192],
  skyblue: [135, 206, 235],
  slateblue: [106, 90, 205],
  slategray: [112, 128, 144],
  slategrey: [112, 128, 144],
  snow: [255, 250, 250],
  springgreen: [0, 255, 127],
  steelblue: [70, 130, 180],
  tan: [210, 180, 140],
  teal: [0, 128, 128],
  thistle: [216, 191, 216],
  tomato: [255, 99, 71],
  turquoise: [64, 224, 208],
  violet: [238, 130, 238],
  wheat: [245, 222, 179],
  white: [255, 255, 255],
  whitesmoke: [245, 245, 245],
  yellow: [255, 255, 0],
  yellowgreen: [154, 205, 50]
};

var SVGPath = function () {
  var parameters = undefined;
  var parse = undefined;
  var cx = undefined;
  var _apply = undefined;
  var runners = undefined;
  var solveArc = undefined;
  var arcToSegments = undefined;
  var segmentToBezier = undefined;
  SVGPath = function () {
    function SVGPath() {
      classCallCheck(this, SVGPath);
    }

    createClass(SVGPath, null, [{
      key: 'initClass',
      value: function initClass() {
        var cy = void 0,
            px = void 0,
            py = void 0,
            sx = void 0,
            sy = void 0;
        parameters = {
          A: 7,
          a: 7,
          C: 6,
          c: 6,
          H: 1,
          h: 1,
          L: 2,
          l: 2,
          M: 2,
          m: 2,
          Q: 4,
          q: 4,
          S: 4,
          s: 4,
          T: 2,
          t: 2,
          V: 1,
          v: 1,
          Z: 0,
          z: 0
        };

        parse = function parse(path) {
          var cmd = void 0;
          var ret = [];
          var args = [];
          var curArg = '';
          var foundDecimal = false;
          var params = 0;

          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = Array.from(path)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var c = _step.value;

              if (parameters[c] != null) {
                params = parameters[c];
                if (cmd) {
                  // save existing command
                  if (curArg.length > 0) {
                    args[args.length] = +curArg;
                  }
                  ret[ret.length] = { cmd: cmd, args: args };

                  args = [];
                  curArg = '';
                  foundDecimal = false;
                }

                cmd = c;
              } else if ([' ', ','].includes(c) || c === '-' && curArg.length > 0 && curArg[curArg.length - 1] !== 'e' || c === '.' && foundDecimal) {
                if (curArg.length === 0) {
                  continue;
                }

                if (args.length === params) {
                  // handle reused commands
                  ret[ret.length] = { cmd: cmd, args: args };
                  args = [+curArg];

                  // handle assumed commands
                  if (cmd === 'M') {
                    cmd = 'L';
                  }
                  if (cmd === 'm') {
                    cmd = 'l';
                  }
                } else {
                  args[args.length] = +curArg;
                }

                foundDecimal = c === '.';

                // fix for negative numbers or repeated decimals with no delimeter between commands
                curArg = ['-', '.'].includes(c) ? c : '';
              } else {
                curArg += c;
                if (c === '.') {
                  foundDecimal = true;
                }
              }
            }

            // add the last command
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }

          if (curArg.length > 0) {
            if (args.length === params) {
              // handle reused commands
              ret[ret.length] = { cmd: cmd, args: args };
              args = [+curArg];

              // handle assumed commands
              if (cmd === 'M') {
                cmd = 'L';
              }
              if (cmd === 'm') {
                cmd = 'l';
              }
            } else {
              args[args.length] = +curArg;
            }
          }

          ret[ret.length] = { cmd: cmd, args: args };

          return ret;
        };

        cx = cy = px = py = sx = sy = 0;
        _apply = function _apply(commands, doc) {
          // current point, control point, and subpath starting point
          cx = cy = px = py = sx = sy = 0;

          // run the commands
          for (var i = 0; i < commands.length; i++) {
            var c = commands[i];
            if (typeof runners[c.cmd] === 'function') {
              runners[c.cmd](doc, c.args);
            }
          }

          return cx = cy = px = py = 0;
        };

        runners = {
          M: function M(doc, a) {
            cx = a[0];
            cy = a[1];
            px = py = null;
            sx = cx;
            sy = cy;
            return doc.moveTo(cx, cy);
          },
          m: function m(doc, a) {
            cx += a[0];
            cy += a[1];
            px = py = null;
            sx = cx;
            sy = cy;
            return doc.moveTo(cx, cy);
          },
          C: function C(doc, a) {
            cx = a[4];
            cy = a[5];
            px = a[2];
            py = a[3];
            return doc.bezierCurveTo.apply(doc, toConsumableArray(Array.from(a || [])));
          },
          c: function c(doc, a) {
            doc.bezierCurveTo(a[0] + cx, a[1] + cy, a[2] + cx, a[3] + cy, a[4] + cx, a[5] + cy);
            px = cx + a[2];
            py = cy + a[3];
            cx += a[4];
            return cy += a[5];
          },
          S: function S(doc, a) {
            if (px === null) {
              px = cx;
              py = cy;
            }

            doc.bezierCurveTo(cx - (px - cx), cy - (py - cy), a[0], a[1], a[2], a[3]);
            px = a[0];
            py = a[1];
            cx = a[2];
            return cy = a[3];
          },
          s: function s(doc, a) {
            if (px === null) {
              px = cx;
              py = cy;
            }

            doc.bezierCurveTo(cx - (px - cx), cy - (py - cy), cx + a[0], cy + a[1], cx + a[2], cy + a[3]);
            px = cx + a[0];
            py = cy + a[1];
            cx += a[2];
            return cy += a[3];
          },
          Q: function Q(doc, a) {
            px = a[0];
            py = a[1];
            cx = a[2];
            cy = a[3];
            return doc.quadraticCurveTo(a[0], a[1], cx, cy);
          },
          q: function q(doc, a) {
            doc.quadraticCurveTo(a[0] + cx, a[1] + cy, a[2] + cx, a[3] + cy);
            px = cx + a[0];
            py = cy + a[1];
            cx += a[2];
            return cy += a[3];
          },
          T: function T(doc, a) {
            if (px === null) {
              px = cx;
              py = cy;
            } else {
              px = cx - (px - cx);
              py = cy - (py - cy);
            }

            doc.quadraticCurveTo(px, py, a[0], a[1]);
            px = cx - (px - cx);
            py = cy - (py - cy);
            cx = a[0];
            return cy = a[1];
          },
          t: function t(doc, a) {
            if (px === null) {
              px = cx;
              py = cy;
            } else {
              px = cx - (px - cx);
              py = cy - (py - cy);
            }

            doc.quadraticCurveTo(px, py, cx + a[0], cy + a[1]);
            cx += a[0];
            return cy += a[1];
          },
          A: function A(doc, a) {
            solveArc(doc, cx, cy, a);
            cx = a[5];
            return cy = a[6];
          },
          a: function a(doc, _a) {
            _a[5] += cx;
            _a[6] += cy;
            solveArc(doc, cx, cy, _a);
            cx = _a[5];
            return cy = _a[6];
          },
          L: function L(doc, a) {
            cx = a[0];
            cy = a[1];
            px = py = null;
            return doc.lineTo(cx, cy);
          },
          l: function l(doc, a) {
            cx += a[0];
            cy += a[1];
            px = py = null;
            return doc.lineTo(cx, cy);
          },
          H: function H(doc, a) {
            cx = a[0];
            px = py = null;
            return doc.lineTo(cx, cy);
          },
          h: function h(doc, a) {
            cx += a[0];
            px = py = null;
            return doc.lineTo(cx, cy);
          },
          V: function V(doc, a) {
            cy = a[0];
            px = py = null;
            return doc.lineTo(cx, cy);
          },
          v: function v(doc, a) {
            cy += a[0];
            px = py = null;
            return doc.lineTo(cx, cy);
          },
          Z: function Z(doc) {
            doc.closePath();
            cx = sx;
            return cy = sy;
          },
          z: function z(doc) {
            doc.closePath();
            cx = sx;
            return cy = sy;
          }
        };

        solveArc = function solveArc(doc, x, y, coords) {
          var _Array$from = Array.from(coords),
              _Array$from2 = slicedToArray(_Array$from, 7),
              rx = _Array$from2[0],
              ry = _Array$from2[1],
              rot = _Array$from2[2],
              large = _Array$from2[3],
              sweep = _Array$from2[4],
              ex = _Array$from2[5],
              ey = _Array$from2[6];

          var segs = arcToSegments(ex, ey, rx, ry, large, sweep, rot, x, y);

          return function () {
            var result = [];
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
              for (var _iterator2 = Array.from(segs)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var seg = _step2.value;

                var bez = segmentToBezier.apply(undefined, toConsumableArray(Array.from(seg || [])));
                result.push(doc.bezierCurveTo.apply(doc, toConsumableArray(Array.from(bez || []))));
              }
            } catch (err) {
              _didIteratorError2 = true;
              _iteratorError2 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                  _iterator2.return();
                }
              } finally {
                if (_didIteratorError2) {
                  throw _iteratorError2;
                }
              }
            }

            return result;
          }();
        };

        // from Inkscape svgtopdf, thanks!
        arcToSegments = function arcToSegments(x, y, rx, ry, large, sweep, rotateX, ox, oy) {
          var th = rotateX * (Math.PI / 180);
          var sin_th = Math.sin(th);
          var cos_th = Math.cos(th);
          rx = Math.abs(rx);
          ry = Math.abs(ry);
          px = cos_th * (ox - x) * 0.5 + sin_th * (oy - y) * 0.5;
          py = cos_th * (oy - y) * 0.5 - sin_th * (ox - x) * 0.5;
          var pl = px * px / (rx * rx) + py * py / (ry * ry);
          if (pl > 1) {
            pl = Math.sqrt(pl);
            rx *= pl;
            ry *= pl;
          }

          var a00 = cos_th / rx;
          var a01 = sin_th / rx;
          var a10 = -sin_th / ry;
          var a11 = cos_th / ry;
          var x0 = a00 * ox + a01 * oy;
          var y0 = a10 * ox + a11 * oy;
          var x1 = a00 * x + a01 * y;
          var y1 = a10 * x + a11 * y;

          var d = (x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0);
          var sfactor_sq = 1 / d - 0.25;
          if (sfactor_sq < 0) {
            sfactor_sq = 0;
          }
          var sfactor = Math.sqrt(sfactor_sq);
          if (sweep === large) {
            sfactor = -sfactor;
          }

          var xc = 0.5 * (x0 + x1) - sfactor * (y1 - y0);
          var yc = 0.5 * (y0 + y1) + sfactor * (x1 - x0);

          var th0 = Math.atan2(y0 - yc, x0 - xc);
          var th1 = Math.atan2(y1 - yc, x1 - xc);

          var th_arc = th1 - th0;
          if (th_arc < 0 && sweep === 1) {
            th_arc += 2 * Math.PI;
          } else if (th_arc > 0 && sweep === 0) {
            th_arc -= 2 * Math.PI;
          }

          var segments = Math.ceil(Math.abs(th_arc / (Math.PI * 0.5 + 0.001)));
          var result = [];

          for (var i = 0, end = segments, asc = 0 <= end; asc ? i < end : i > end; asc ? i++ : i--) {
            var th2 = th0 + i * th_arc / segments;
            var th3 = th0 + (i + 1) * th_arc / segments;
            result[i] = [xc, yc, th2, th3, rx, ry, sin_th, cos_th];
          }

          return result;
        };

        segmentToBezier = function segmentToBezier(cx, cy, th0, th1, rx, ry, sin_th, cos_th) {
          var a00 = cos_th * rx;
          var a01 = -sin_th * ry;
          var a10 = sin_th * rx;
          var a11 = cos_th * ry;

          var th_half = 0.5 * (th1 - th0);
          var t = 8 / 3 * Math.sin(th_half * 0.5) * Math.sin(th_half * 0.5) / Math.sin(th_half);
          var x1 = cx + Math.cos(th0) - t * Math.sin(th0);
          var y1 = cy + Math.sin(th0) + t * Math.cos(th0);
          var x3 = cx + Math.cos(th1);
          var y3 = cy + Math.sin(th1);
          var x2 = x3 + t * Math.sin(th1);
          var y2 = y3 - t * Math.cos(th1);

          return [a00 * x1 + a01 * y1, a10 * x1 + a11 * y1, a00 * x2 + a01 * y2, a10 * x2 + a11 * y2, a00 * x3 + a01 * y3, a10 * x3 + a11 * y3];
        };
      }
    }, {
      key: 'apply',
      value: function apply(doc, path) {
        var commands = parse(path);
        return _apply(commands, doc);
      }
    }]);
    return SVGPath;
  }();
  SVGPath.initClass();
  return SVGPath;
}();

var SVGPath$1 = SVGPath;

// This constant is used to approximate a symmetrical arc using a cubic
// Bezier curve.
var KAPPA = 4.0 * ((Math.sqrt(2) - 1.0) / 3.0);

var Vector = {
  initVector: function initVector() {
    this._ctm = [1, 0, 0, 1, 0, 0]; // current transformation matrix
    return this._ctmStack = [];
  },
  save: function save() {
    this._ctmStack.push(this._ctm.slice());
    // TODO: save/restore colorspace and styles so not setting it unnessesarily all the time?
    return this.addContent('q');
  },
  restore: function restore() {
    this._ctm = this._ctmStack.pop() || [1, 0, 0, 1, 0, 0];
    return this.addContent('Q');
  },
  closePath: function closePath() {
    return this.addContent('h');
  },
  lineWidth: function lineWidth(w) {
    return this.addContent(PDFObject.number(w) + ' w');
  },


  _CAP_STYLES: {
    BUTT: 0,
    ROUND: 1,
    SQUARE: 2
  },

  lineCap: function lineCap(c) {
    if (typeof c === 'string') {
      c = this._CAP_STYLES[c.toUpperCase()];
    }
    return this.addContent(c + ' J');
  },


  _JOIN_STYLES: {
    MITER: 0,
    ROUND: 1,
    BEVEL: 2
  },

  lineJoin: function lineJoin(j) {
    if (typeof j === 'string') {
      j = this._JOIN_STYLES[j.toUpperCase()];
    }
    return this.addContent(j + ' j');
  },
  miterLimit: function miterLimit(m) {
    return this.addContent(PDFObject.number(m) + ' M');
  },
  dash: function dash(length, options) {
    var phase = void 0;
    if (options == null) {
      options = {};
    }
    if (length == null) {
      return this;
    }
    if (Array.isArray(length)) {
      length = Array.from(length).map(function (v) {
        return PDFObject.number(v);
      }).join(' ');
      phase = options.phase || 0;
      return this.addContent('[' + length + '] ' + PDFObject.number(phase) + ' d');
    } else {
      var space = options.space != null ? options.space : length;
      phase = options.phase || 0;
      return this.addContent('[' + PDFObject.number(length) + ' ' + PDFObject.number(space) + '] ' + PDFObject.number(phase) + ' d');
    }
  },
  undash: function undash() {
    return this.addContent('[] 0 d');
  },
  moveTo: function moveTo(x, y) {
    return this.addContent(PDFObject.number(x) + ' ' + PDFObject.number(y) + ' m');
  },
  lineTo: function lineTo(x, y) {
    return this.addContent(PDFObject.number(x) + ' ' + PDFObject.number(y) + ' l');
  },
  bezierCurveTo: function bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y) {
    return this.addContent(PDFObject.number(cp1x) + ' ' + PDFObject.number(cp1y) + ' ' + PDFObject.number(cp2x) + ' ' + PDFObject.number(cp2y) + ' ' + PDFObject.number(x) + ' ' + PDFObject.number(y) + ' c');
  },
  quadraticCurveTo: function quadraticCurveTo(cpx, cpy, x, y) {
    return this.addContent(PDFObject.number(cpx) + ' ' + PDFObject.number(cpy) + ' ' + PDFObject.number(x) + ' ' + PDFObject.number(y) + ' v');
  },
  rect: function rect(x, y, w, h) {
    return this.addContent(PDFObject.number(x) + ' ' + PDFObject.number(y) + ' ' + PDFObject.number(w) + ' ' + PDFObject.number(h) + ' re');
  },
  roundedRect: function roundedRect(x, y, w, h, r) {
    if (r == null) {
      r = 0;
    }
    r = Math.min(r, 0.5 * w, 0.5 * h);

    // amount to inset control points from corners (see `ellipse`)
    var c = r * (1.0 - KAPPA);

    this.moveTo(x + r, y);
    this.lineTo(x + w - r, y);
    this.bezierCurveTo(x + w - c, y, x + w, y + c, x + w, y + r);
    this.lineTo(x + w, y + h - r);
    this.bezierCurveTo(x + w, y + h - c, x + w - c, y + h, x + w - r, y + h);
    this.lineTo(x + r, y + h);
    this.bezierCurveTo(x + c, y + h, x, y + h - c, x, y + h - r);
    this.lineTo(x, y + r);
    this.bezierCurveTo(x, y + c, x + c, y, x + r, y);
    return this.closePath();
  },
  ellipse: function ellipse(x, y, r1, r2) {
    // based on http://stackoverflow.com/questions/2172798/how-to-draw-an-oval-in-html5-canvas/2173084#2173084
    if (r2 == null) {
      r2 = r1;
    }
    x -= r1;
    y -= r2;
    var ox = r1 * KAPPA;
    var oy = r2 * KAPPA;
    var xe = x + r1 * 2;
    var ye = y + r2 * 2;
    var xm = x + r1;
    var ym = y + r2;

    this.moveTo(x, ym);
    this.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
    this.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
    this.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
    this.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
    return this.closePath();
  },
  circle: function circle(x, y, radius) {
    return this.ellipse(x, y, radius);
  },
  arc: function arc(x, y, radius, startAngle, endAngle, anticlockwise) {
    if (anticlockwise == null) {
      anticlockwise = false;
    }
    var TWO_PI = 2.0 * Math.PI;
    var HALF_PI = 0.5 * Math.PI;

    var deltaAng = endAngle - startAngle;

    if (Math.abs(deltaAng) > TWO_PI) {
      // draw only full circle if more than that is specified
      deltaAng = TWO_PI;
    } else if (deltaAng !== 0 && anticlockwise !== deltaAng < 0) {
      // necessary to flip direction of rendering
      var dir = anticlockwise ? -1 : 1;
      deltaAng = dir * TWO_PI + deltaAng;
    }

    var numSegs = Math.ceil(Math.abs(deltaAng) / HALF_PI);
    var segAng = deltaAng / numSegs;
    var handleLen = segAng / HALF_PI * KAPPA * radius;
    var curAng = startAngle;

    // component distances between anchor point and control point
    var deltaCx = -Math.sin(curAng) * handleLen;
    var deltaCy = Math.cos(curAng) * handleLen;

    // anchor point
    var ax = x + Math.cos(curAng) * radius;
    var ay = y + Math.sin(curAng) * radius;

    // calculate and render segments
    this.moveTo(ax, ay);

    for (var segIdx = 0, end = numSegs, asc = 0 <= end; asc ? segIdx < end : segIdx > end; asc ? segIdx++ : segIdx--) {
      // starting control point
      var cp1x = ax + deltaCx;
      var cp1y = ay + deltaCy;

      // step angle
      curAng += segAng;

      // next anchor point
      ax = x + Math.cos(curAng) * radius;
      ay = y + Math.sin(curAng) * radius;

      // next control point delta
      deltaCx = -Math.sin(curAng) * handleLen;
      deltaCy = Math.cos(curAng) * handleLen;

      // ending control point
      var cp2x = ax - deltaCx;
      var cp2y = ay - deltaCy;

      // render segment
      this.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, ax, ay);
    }

    return this;
  },
  polygon: function polygon() {
    for (var _len = arguments.length, points = Array(_len), _key = 0; _key < _len; _key++) {
      points[_key] = arguments[_key];
    }

    this.moveTo.apply(this, toConsumableArray(Array.from(points.shift() || [])));
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = Array.from(points)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var point = _step.value;

        this.lineTo.apply(this, toConsumableArray(Array.from(point || [])));
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return this.closePath();
  },
  path: function path(_path) {
    SVGPath$1.apply(this, _path);
    return this;
  },
  _windingRule: function _windingRule(rule) {
    if (/even-?odd/.test(rule)) {
      return '*';
    }

    return '';
  },
  fill: function fill(color, rule) {
    if (/(even-?odd)|(non-?zero)/.test(color)) {
      rule = color;
      color = null;
    }

    if (color) {
      this.fillColor(color);
    }
    return this.addContent('f' + this._windingRule(rule));
  },
  stroke: function stroke(color) {
    if (color) {
      this.strokeColor(color);
    }
    return this.addContent('S');
  },
  fillAndStroke: function fillAndStroke(fillColor, strokeColor, rule) {
    if (strokeColor == null) {
      strokeColor = fillColor;
    }
    var isFillRule = /(even-?odd)|(non-?zero)/;
    if (isFillRule.test(fillColor)) {
      rule = fillColor;
      fillColor = null;
    }

    if (isFillRule.test(strokeColor)) {
      rule = strokeColor;
      strokeColor = fillColor;
    }

    if (fillColor) {
      this.fillColor(fillColor);
      this.strokeColor(strokeColor);
    }

    return this.addContent('B' + this._windingRule(rule));
  },
  clip: function clip(rule) {
    return this.addContent('W' + this._windingRule(rule) + ' n');
  },
  transform: function transform(m11, m12, m21, m22, dx, dy) {
    // keep track of the current transformation matrix
    var m = this._ctm;

    var _Array$from = Array.from(m),
        _Array$from2 = slicedToArray(_Array$from, 6),
        m0 = _Array$from2[0],
        m1 = _Array$from2[1],
        m2 = _Array$from2[2],
        m3 = _Array$from2[3],
        m4 = _Array$from2[4],
        m5 = _Array$from2[5];

    m[0] = m0 * m11 + m2 * m12;
    m[1] = m1 * m11 + m3 * m12;
    m[2] = m0 * m21 + m2 * m22;
    m[3] = m1 * m21 + m3 * m22;
    m[4] = m0 * dx + m2 * dy + m4;
    m[5] = m1 * dx + m3 * dy + m5;

    var values = [m11, m12, m21, m22, dx, dy].map(function (v) {
      return PDFObject.number(v);
    }).join(' ');
    return this.addContent(values + ' cm');
  },
  translate: function translate(x, y) {
    return this.transform(1, 0, 0, 1, x, y);
  },
  rotate: function rotate(angle, options) {
    var y = void 0;
    if (options == null) {
      options = {};
    }
    var rad = angle * Math.PI / 180;
    var cos = Math.cos(rad);
    var sin = Math.sin(rad);
    var x = y = 0;

    if (options.origin != null) {
      var _Array$from3 = Array.from(options.origin);

      var _Array$from4 = slicedToArray(_Array$from3, 2);

      x = _Array$from4[0];
      y = _Array$from4[1];

      var x1 = x * cos - y * sin;
      var y1 = x * sin + y * cos;
      x -= x1;
      y -= y1;
    }

    return this.transform(cos, sin, -sin, cos, x, y);
  },
  scale: function scale(xFactor, yFactor, options) {
    var y = void 0;
    if (yFactor == null) {
      yFactor = xFactor;
    }
    if (options == null) {
      options = {};
    }
    if ((typeof yFactor === 'undefined' ? 'undefined' : _typeof(yFactor)) === 'object') {
      options = yFactor;
      yFactor = xFactor;
    }

    var x = y = 0;
    if (options.origin != null) {
      var _Array$from5 = Array.from(options.origin);

      var _Array$from6 = slicedToArray(_Array$from5, 2);

      x = _Array$from6[0];
      y = _Array$from6[1];

      x -= xFactor * x;
      y -= yFactor * y;
    }

    return this.transform(xFactor, 0, 0, yFactor, x, y);
  }
};

var fs = {}

var range = function range(left, right, inclusive) {
  var range = [];
  var ascending = left < right;
  var end = !inclusive ? right : ascending ? right + 1 : right - 1;

  for (var i = left; ascending ? i < end : i > end; ascending ? i++ : i--) {
    range.push(i);
  }

  return range;
};

var WIN_ANSI_MAP = {
  402: 131,
  8211: 150,
  8212: 151,
  8216: 145,
  8217: 146,
  8218: 130,
  8220: 147,
  8221: 148,
  8222: 132,
  8224: 134,
  8225: 135,
  8226: 149,
  8230: 133,
  8364: 128,
  8240: 137,
  8249: 139,
  8250: 155,
  710: 136,
  8482: 153,
  338: 140,
  339: 156,
  732: 152,
  352: 138,
  353: 154,
  376: 159,
  381: 142,
  382: 158
};

var characters = '.notdef       .notdef        .notdef        .notdef\n.notdef       .notdef        .notdef        .notdef\n.notdef       .notdef        .notdef        .notdef\n.notdef       .notdef        .notdef        .notdef\n.notdef       .notdef        .notdef        .notdef\n.notdef       .notdef        .notdef        .notdef\n.notdef       .notdef        .notdef        .notdef\n.notdef       .notdef        .notdef        .notdef\n\nspace         exclam         quotedbl       numbersign\ndollar        percent        ampersand      quotesingle\nparenleft     parenright     asterisk       plus\ncomma         hyphen         period         slash\nzero          one            two            three\nfour          five           six            seven\neight         nine           colon          semicolon\nless          equal          greater        question\n\nat            A              B              C\nD             E              F              G\nH             I              J              K\nL             M              N              O\nP             Q              R              S\nT             U              V              W\nX             Y              Z              bracketleft\nbackslash     bracketright   asciicircum    underscore\n\ngrave         a              b              c\nd             e              f              g\nh             i              j              k\nl             m              n              o\np             q              r              s\nt             u              v              w\nx             y              z              braceleft\nbar           braceright     asciitilde     .notdef\n\nEuro          .notdef        quotesinglbase florin\nquotedblbase  ellipsis       dagger         daggerdbl\ncircumflex    perthousand    Scaron         guilsinglleft\nOE            .notdef        Zcaron         .notdef\n.notdef       quoteleft      quoteright     quotedblleft\nquotedblright bullet         endash         emdash\ntilde         trademark      scaron         guilsinglright\noe            .notdef        zcaron         ydieresis\n\nspace         exclamdown     cent           sterling\ncurrency      yen            brokenbar      section\ndieresis      copyright      ordfeminine    guillemotleft\nlogicalnot    hyphen         registered     macron\ndegree        plusminus      twosuperior    threesuperior\nacute         mu             paragraph      periodcentered\ncedilla       onesuperior    ordmasculine   guillemotright\nonequarter    onehalf        threequarters  questiondown\n\nAgrave        Aacute         Acircumflex    Atilde\nAdieresis     Aring          AE             Ccedilla\nEgrave        Eacute         Ecircumflex    Edieresis\nIgrave        Iacute         Icircumflex    Idieresis\nEth           Ntilde         Ograve         Oacute\nOcircumflex   Otilde         Odieresis      multiply\nOslash        Ugrave         Uacute         Ucircumflex\nUdieresis     Yacute         Thorn          germandbls\n\nagrave        aacute         acircumflex    atilde\nadieresis     aring          ae             ccedilla\negrave        eacute         ecircumflex    edieresis\nigrave        iacute         icircumflex    idieresis\neth           ntilde         ograve         oacute\nocircumflex   otilde         odieresis      divide\noslash        ugrave         uacute         ucircumflex\nudieresis     yacute         thorn          ydieresis'.split(/\s+/);

var AFMFont = function () {
  createClass(AFMFont, null, [{
    key: 'open',
    value: function open(filename) {
      {
        throw new Error('AFMFont.open not available on browser build');
      }
      return new AFMFont(fs.readFileSync(filename, 'utf8'));
    }
  }]);

  function AFMFont(contents) {
    var _this = this;

    classCallCheck(this, AFMFont);

    this.contents = contents;
    this.attributes = {};
    this.glyphWidths = {};
    this.boundingBoxes = {};
    this.kernPairs = {};

    this.parse();
    this.charWidths = range(0, 255, true).map(function (i) {
      return _this.glyphWidths[characters[i]];
    });
    this.bbox = Array.from(this.attributes['FontBBox'].split(/\s+/)).map(function (e) {
      return +e;
    });
    this.ascender = +(this.attributes['Ascender'] || 0);
    this.descender = +(this.attributes['Descender'] || 0);
    this.xHeight = +(this.attributes['XHeight'] || 0);
    this.capHeight = +(this.attributes['CapHeight'] || 0);
    this.lineGap = this.bbox[3] - this.bbox[1] - (this.ascender - this.descender);
  }

  createClass(AFMFont, [{
    key: 'parse',
    value: function parse() {
      var section = '';
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = Array.from(this.contents.split('\n'))[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var line = _step.value;

          var match;
          var a;
          if (match = line.match(/^Start(\w+)/)) {
            section = match[1];
            continue;
          } else if (match = line.match(/^End(\w+)/)) {
            section = '';
            continue;
          }

          switch (section) {
            case 'FontMetrics':
              match = line.match(/(^\w+)\s+(.*)/);
              var key = match[1];
              var value = match[2];

              if (a = this.attributes[key]) {
                if (!Array.isArray(a)) {
                  a = this.attributes[key] = [a];
                }
                a.push(value);
              } else {
                this.attributes[key] = value;
              }
              break;

            case 'CharMetrics':
              if (!/^CH?\s/.test(line)) {
                continue;
              }
              var name = line.match(/\bN\s+(\.?\w+)\s*;/)[1];
              this.glyphWidths[name] = +line.match(/\bWX\s+(\d+)\s*;/)[1];
              break;

            case 'KernPairs':
              match = line.match(/^KPX\s+(\.?\w+)\s+(\.?\w+)\s+(-?\d+)/);
              if (match) {
                this.kernPairs[match[1] + '\0' + match[2]] = parseInt(match[3]);
              }
              break;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: 'encodeText',
    value: function encodeText(text) {
      var res = [];
      for (var i = 0, end = text.length, asc = 0 <= end; asc ? i < end : i > end; asc ? i++ : i--) {
        var char = text.charCodeAt(i);
        char = WIN_ANSI_MAP[char] || char;
        res.push(char.toString(16));
      }

      return res;
    }
  }, {
    key: 'glyphsForString',
    value: function glyphsForString(string) {
      var glyphs = [];

      for (var i = 0, end = string.length, asc = 0 <= end; asc ? i < end : i > end; asc ? i++ : i--) {
        var charCode = string.charCodeAt(i);
        glyphs.push(this.characterToGlyph(charCode));
      }

      return glyphs;
    }
  }, {
    key: 'characterToGlyph',
    value: function characterToGlyph(character) {
      return characters[WIN_ANSI_MAP[character] || character] || '.notdef';
    }
  }, {
    key: 'widthOfGlyph',
    value: function widthOfGlyph(glyph) {
      return this.glyphWidths[glyph] || 0;
    }
  }, {
    key: 'getKernPair',
    value: function getKernPair(left, right) {
      return this.kernPairs[left + '\0' + right] || 0;
    }
  }, {
    key: 'advancesForGlyphs',
    value: function advancesForGlyphs(glyphs) {
      var advances = [];

      for (var index = 0; index < glyphs.length; index++) {
        var left = glyphs[index];
        var right = glyphs[index + 1];
        advances.push(this.widthOfGlyph(left) + this.getKernPair(left, right));
      }

      return advances;
    }
  }]);
  return AFMFont;
}();

var Courier = "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=";

var CourierBold = "MoFwhgTiBiD2B2ICyBTEECWBjAzgAgBYA6ARgCgBhWAW2pUTyoAcBPTAcwAsQ8AKLAJR4SATgAcIgDTCRIgAzTRIkotkBmVSIDseAIIATWACMUeYCxwgU1fAEl4WWBCZOwV/UTx6ANt7wAlDC4QfH8UHBQIADcUD0oaOgYKCBQ3DAQ8ABE3FAAuPCQMgCkAV3g8ACY1YQA2XIqxXLk5GW142noeAFV4DABHEpRbTMI1OQIxdsSeADUkEpwwdlMCEhI1ETwAVgqSGoIyOEQAOTA6RlgSzEiAWgAhWG99Q5LfU/OqK4xIvAenw7OGG8LHepk+1wgZAA6iggtxfo9nrZwN5sLp4OxvKY5GRbDhoBgAB6xAAKGBAWE4eHQg0onEgYCwVggwDQeAAooSrPB9LF/DQwPBDggQHcHoS8Dc1tUbhUti0tARNmI5CQ8GQeryIKj4CgSbAcOT0uUpc0NTzIjqUAAVTjYADWupw+HlZBmkUNGWaaiIzRxx1gIGwYNgrA48P4QlEEk0ClaKlaGlaOgMxlM5ks1jsDicLggOQ8Xl0vgCcJCAXCkRicXZOf0GAxwEp1lMqZMoEF+kg+lrjnrGMoYCYAAlYcFtjUKmQABqjsujERkXQ4LD0LV4SeLzLhVcWiCSkhbLRkUD6YdQvBiA6nmYXkhyGon8BQCj0iCodDYfBqQ+UPBqCo8AAbjwKFpw3ZpgLwY48BwJhGVMEC7jwFpUJQ4C/zUaoQLAiCWhAmCUEJLBvDOKDkIqORAKlLZ/3EbYtEAoDMIIKDcJqSCCLwAZA1iIw/CQ4Q1FoiotB0AgalorZJwwih/1onDwI4/DoLweASmoEwIENdhykE6TJQIKSCFYyS1WYuS1BqNilM41TDF8SByMvaiSAqaytlEDcamsiz/x0RS8KgmCmEiXceH0g8pJEWiaj2WT/zEGygq4s5Qu0ztnKsqLtgk3LsMwzZAuU4LuJKXjwwi35hC0NVRPEqoJyYv8CBU9i7JCyB6CxAAzKqKK801AIktU4t8lrzNA2yVM6lJ4Eq5z1k2IbEtG+K/IIJippS1SwEzTAcHtZzlEqLz5U2DjzJa7DtpKrimG8BZnNqujtgqTYCC0JKNtY4qOrwRxaDARbGqlNY6OqEhFQSozkru1TOBYJhOHoRbIMo6p5RaH8CrkvK/pmvB0vSfRFpEVzaNapKoauvGAtu/6cFInAqUE+ibjE7YqI3dyYe+hnCYAL0iWBnLEHQaO2dYN3WlqioF0qEEQ6qxDVFotg2GXxrk+U4f+kAAHdRcEuL0KVC7ZZ1yb2sJkBOBSZXkJqGVDy5tbtbevXCZ6y59306p1bkHQxoSjWvdKnqMBiZ6WklnZRtVUPfoVrjDQlNnY9d+OtdDhSU9UiIYj06qtlololVMxO/IMgnSrHeFBLEF2pKhnPq/pm3St6XVnuWrP7zbv8tn5zuuMcbwMkE0Q1Ul1qGoUof5dHgvrGwR5J+qtyXfBqnCDlBKOPDrisWdZyfOEKTGvlWmZaP1SUAGMABOql61iSnZNg2b6/xk2uuPYFIOQ/Yvx0FnNQrFr4HxusvGCAxwhBg3shdmJAIGJ2HvhH+ycYF4DcItayccryDzkpJO+MFdDORuJsFoHFNjSWasQ3y+cYLIUEmMdCR5Ma/x/h3aapU5KCQqK5d+h90EHxHrwriIxWFoS2CICBXDiFLwkapdkzl97qxEQovAWg2rKJgtALKVCGIaPodo62ei8AAHE1FCO2HI7YKoEqMVIXgYcaiZGOLoU46BFjbDPR0OrK+WjoZ/1UkULKEsSBJUuk1JxedsEAGk1FqzsbQ4JjDsEABlDHsK+rEvynNQkwSQBQwC1DuZeIKeInaMEYKNwPIBOKJinFKJqXgAA8jYg8788miL8o4opeASTOQmOw2R+S/yqxcQARSyq5NQPT34DMmVtbB/g1GsXVrICZckm4uOACMiWgjthh2HqYwhgzrTJNyWk858SLFdBGd0uxHktFiAyRYmYFDpbUOlpUyZPC2kXkElKJKvzhHnOqfDGC4Ep5lIcRChKEgXEAE0QbsORf8uS8gXEAC0z7wo1rchKJ1BlGHzFge0aBer9UqLDFan1YqWzwOTFxRhGT2iZntVm1Vtkcx0PKaok4PYiB8W08lHK0ALThbRFawkmUiqwRYvaWAMDYAwBALAGk0ZJTlOXVlIc/IxRcWULUK4nCO3QlKfeJUOYL2xR8tpPErA0sWnk+qe9EVGsBdCnBWVZVZx0YQLYv0/z0TJc5TOUlCHCpJa031WARlRtypTcZfl7y6LaaTARybZGjV5umquTC8CWtajlaS1QjKhrkveVZFiepiwDrlYOBa8DZIwHgSOUFsl+B6gJP894xW+vYFlTOeVRFVoSveJVbSeXITLnYxpBaB1yHuW0jtglOaBKFcPKdD4XEACsz4uzyiZahu7C0+v+kdHNGLYrLprXIKF/1n7IS3W9IVD7hByHjf9agpT4Wxsnemgegzi7ISiew1lwGB3g0GcbaqbC45BpgzWtyLimDfIPJtYxwbq3CGloMvo7jsOATzXhqdKCXHAOQp9DF5cQ2UbXb6/AJskpSgFcJYNRVYOOt9bSujccAI7II1ewmJQsNxxqB9TWIHn2EyiFh8paoCCydg7+wmBtvlgplklVTPGa2URcenaq1ktmsX01O3YLiWAUNYlKHDMTLPpuOYMwWYsUk7HLmpwzQ7/oStXK6qeh8GX7CIcICoM7fXspo5UUuko9X/lhloXWLnmP+YpZEecU9soMrLYagdrbsEqrVUGJ4lrX6nLYcJD2exzFtKIiRM4hgDbgcqNzBz1kv6ECVFO3+xbwpn3wb1zy0SqPpudi4/aOoR2buog0E5Y2b57Ci/9HqFKEFtf3jcERWhrI+WWyQwZLBUZTxkTirFtQ+NrYnpgNrNwkPrDVEeRpzK9hidKhEJkxpG2SiDZ5AVyya01Hk6VLVEA5pYFs/pCztDx2twmxp0qzrwgNkxJawROgPVqC0Jw0xUNM2+pR/ofiQWX51U5hrKSWiaYuPYCUIEWJqCBjJ8hJK/2w4mVq84wZ9OgSGgxL4FAfVFqrG0Qxj6+MB247pwz7wAvMTSs3mLlD4yudTpCcWrtcKoOfu5+l72r6Iu655tzj7XE1zcrPiJOQmMuM4w16DriXZ2DLFi/efBKH7F9Ol0j53Sw3ck6Nx7v7+qIFA+EAM4txNYD6HCpEWIZNrJ7EpuMeSy2xB1rafBfMAChxzo3KHhiHkI9RL84TIwrwsS0pQS0dYw1D6qYwTWi5xaUcK+8OyiIbqA04c2qA1TU6xAG+R+Vdw/Eu+WpIQ5sj71hCD/Te8lxxP+JK6dhTgV+9LtRPN6pPnQvmefnHIJOj/3oNS5b07++vgMBMENKx6qvNkOsTWLV5Fgz0p20uIsHk3zpaS1qiFTe1JTb0GEsGNBazaz5RQQ8m5hMgMxkHL1Kjz2jhyzIyfTolilNnTXsUGUZBKCsHcSkgwIkmiWwIHWNUGVVU1Q0j7SIjRkrT2SVGDiPCnREGu1tiBF5DFg+lFSlkaWyhwN3xgmoEZAgEQUvHflXX4IcXtRkCvxgnJRQFQJVkrRBylmDh/DYL93skDEZEGwETYSVCShx2oQWQSkokJ3+nrAT3vxBj03ok+gEO/jkkoiz19Tu1m03kcKmVakaTyT8gxhcVXHrEciIIS33QWQCQsOkMGU4DKHYEgA0lIgILPj0zECWTIJvkog4MVnYCVhvU3mkwPG2VajQkCKDmCMgAkMHUID4OYO8gCj/EogUJLWoC7BZm+RaCCKaX/EI2aP3kGV0FURBTn3KTIy0UxxcScH0B6lXm7ktRQVAXYODUxgjyqHcP+kyS5U6NYSMSPC9WaKwhcXaR2IL2OVlDI16QuSONW0JnaRGOqllAXVkWp1MSqBHy4hmNEJXFeAbEWLo1EGsiMjWObzpXq19TAEtRuHs1dic0Y0CNhkGUMBABPkNH8XYUamc2aNGUGXl2ZgL3fR2D1wsN63gzONHQSwgRQ0m0CNS2LVgGhMg0ljihUwROaM8jp0iFEJ5H4gfwogpheVNwSilBcVsBsJSDsM3WiOJO0XILklFMGVSC1UIJP1zUmwOxFIhP+jACUJUOQi42Q2oXlIPBNXiIxCSOoBSNpVFJZIW01L8kVOLRQCwGqLazLSkyFRqCaIVO1MJhRQlNR35ON3VmRT2xvidOwXrCiAwG4M3TVHig/i5jBMjIsRRXwNVM3kJTDJuN9JcV0GoK1WoDoJM2QkoXQhoW0Qj1TLaTAAzMtUNMDWNIjL9NKi6ELNoKxFLMIGeVkWsi+hTNbK4hYHrLs1IwglGhNJrJY0BlEP0M6DSIS11ip24y1JcRdI1SLJLKTXLQ1NYMdKHNUi6E8KeVBSFJVBbJcS6EDKlOqlhPfhWPDLXLwNgHyN1EKINIDW2WHmBPZLzMGS6FHJP17MfNzNNMGXKjfJQA/NNKlG/OHwXGfOLXZBvIwGDPUQnAVCnMPJgkyCwHENwWkSg3kVMWnP+lnLrKwAMMf2kOeOxm0ElH3L/DIsJkcDDGy2qkzmiUgh93/OQtEPwokIwukgVAwIPOCNdPEPdNzVhh8h9PAuLUgDR39XLSDW9JcIUuwWOAovnIYHqToplmaXErxKApAUxOqAvKQuKxQIbIDSkjUuwpcWtB0qooXIERnkSyPGJWMuLQoFMoFN7MPi+nwxYtKjSHKxUqNI3EEOYpwo5BRN0tpWEqCscsGRXDdMXI422C4zkqsosRXFiEZ2BjYwiI8i4yMgQNCq4gwH8u0RlMagdNipcQnmFgxCnzM2ytYkVEHJcX8EkqEs2VSW0RxR8uwUsRcuooCoMtkXDx6ogo7OLK7MkyzmKMknkqqt2gWu3NYTstwzWryraV0AEqkooSMUrJ0Q0o2pgk1QypPxlMcVytGosVctCNIh3NlH3RDVTUqritxQStcr0tM0JU1ifKeraVtCcHdJ01LgFS0Suo6WOqEtsQOPF0uriv8Fqsiyg02GCoOt9WAFqsE2OVLmqFxrBt9Tj1upopykYhbQ9nhq6ERvdJAv7LEqaogpPJBRnhWougCPZuLTtgdhwBKBj3d3MMEWGmOIKz4uwXaRsq6TPJRrJv5uwV0HlpBTOp/SrJCrit0D1OhM1pxrAvhuoFeCDAemhxVjVE1i80ID5plosRKFqttJ5u8kvMuX6q208y0BxpGpVosRzyDCfnrB6gbRNhlHMI1h0EYjRps1QuDJhPHJiWdljsGVOBVMtXY3Q16OVodvXS2qWs3SbVlP2vJv+nZALvoIEReKCurLirAHjsiqbOitTudMbrVN3KFXMLLtYsJpkqwPduLXgFqsgy2UaVSuLQ0jEIkJdup1oQQp7tKm0qprZwaUMuGrmuLVsFqqJMalzs0oDsehwGoAbCenjLpTeloVdkXq4nJVgCpXgBizUXiw41onAVihSzxv+hSHYDQuZET0Ei4qCl4oPraUsX1oVsgxmu1q/sJnFL0IBtpV3tJonuwWFqBk20WgDVDNZvprivZHVsfxroVGNriopQINLXuubNgcViZspKiuHjkPhtxVqpknVhBtIbxU9oJXYRBr9rzuHUAX/sfiN15m3Q3BWJvpUTtkpPMxE3hooBCKKoVpyMwocU3uwW8AmrcrMumoaq/XhopBXrtvLWEx0VxlAd9RQFfIKPeqUAnErT/Msf+i6BsffNPPsb7Pkd1udsNpgakbIXbqeL8dBv9oa0Ido3VK9MHuwUFlqqmUCWoYCbwHSCgpgs5jgtoQaovTCd9XaUxuRryX3vhtgFqse3sqSdyZ1LoZ2tUtDKYbisWAzsytbhXMaoEf+ljO+ElLQoxPEbilbtlsru7IuKgaKbrqvIiZ7MVtAp1pcW3G8HADPmIo3AyJoa4i/wgHuyoxnz2oMbisNgNBFqyycFF2qCqG8322ZXhvaSCamrGfZ1QYsVNuWpw2khkx+pcSCHzH1LqvMrdvWdUlgHNMSIgGSLAFSKIpZPUPaeccJnZDcegufpKNoT228ZcTjwIqStzROljWScFpQAfidqgA9DswlkPn2CyMBZgibEKrCLutKpOTWNIriq0eMaJIYrxaqcJgSW0cBoGiXK2W8u5dKkyTKf2PGbmcGXQAbusEgBgvLIue0RGzhritiAQcmsICiZbupbwFsCmeQf8ZFa4lsBqbMvEYut1cyW4b2IrJx3Rfg11HpG8DDqeMEwpdGVhfhrRKJafjUQ6pLskeNaBeGfoebtLuDZgkQC4MWOhoNRio6cJi6BBctOtI8eiXMOKfwcxuIaNcTbrjNcic7tkN1fYAgahZgPUYBeSaVkfhJdixuAMh23PX2yebaSbGMaJrIzDh9o0YsSbASEos1aJuXNOUz11faRTbBatIhaStsUnHZ04eRJQAAUJbFmski0rWhmlrhbyJ+YbNzQcpiYsUUeMdGeEQVH4d3a4hKCmdnonAujbY8IbuwD9a5r7jT0+lJvtuvdUjwuMbYTkd7d1c1UHcSsOUFardQ1/dqTKzjJVjXpzrTUjbwEDBjbDYqeirwd6r5aSvs08u/NVZcWtbA8QZyWmt6SI6GLg4NorK1pS0+aGMRYVb7m2UnDeN1d0E5uCbo+VCrhQ/aRo8gcWW0WQ/za4kFn+s1YSbejMMGYsQrrPdzeA+SdsGY4xMyY/QdeLXtFw5I2moQq5fE9UhPvUmDJeiCKTId1U9DelP+YHN1YcGMdHsXUaN1YpFI+HaOWXOE0u29dfNfe8HgEDGegTNt0vsIH6OM5glj26aDIw72u7pQ5KDudgtdpTsc94hEfRRhM41hosfhvYD04rfHUcVqiledJkf0nY1EnymFOScFhtatsxONPWripzCBnA6nhq+XOgycZKadGOcwFOanjDiVZMmDmubiowELb+fEcYd1fZCuAQ2QjQnKLIFrH0FfEgA/EwFwA255COGQClS/DICAA=";

var CourierOblique = "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=";

var Helvetica = "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";

var HelveticaBold = "MoFwhgTiBiD2B2ICyBTEECWBjAzgAgBYA6ARgCgBhWAW2pUTyoAcBPTAcwAsQ8AKLAJR4SATgAcAVgA0w8QHYZosSMUiRABlUi5eAIIATWACMUeYCxwgU1fAEl4WWBCZOwV/UTx6ANt7wAlDC4QfH8UHBQIADcUD0oaOgYKCBQ3DAQ8ABE3FAAuPAAVTgBXPCQwFi8SYQAmXIIAZlyJGtlteNp6HgBVeAwAR2KUW0zCBvUWjsSeADUkYpwwdlMGuRIANhFCMVECMjhEADkwOjwACRRvGJBsMABaACFYb3194t9j04urtFu8J5e+xOGG8LE+pm+11uZAA6iggtx/s9XrZwN5sLp4OxvKZ1GRbDhoBgAB6xAAKGBAWE4eAAZmBvBFKJxIGAsFYIMA0HgAKLEqzwfSxfw0MDwfYIEAPJ7EvB3EhydRymo1MTCdTqBp4ETrVpkXpCiDo+AoMmwHCU9LwOUkDX6wWRY0oIrYADWJpw+AkeJmkQtGQ1NSIGrxh1gNywpmYbARPH4QiU0lkYgUyZUbU0bR0BmMpnMlmsdgcThcEByHi8ul8AVjoXCkRiHkhvywYDwGHwbfQYCF1EgrrwsFpeAAMhh4OGWEwUHdvn5dABxPBi/QAeic7ZCeBwxSMFv0GEgGHCRDIPOLB6xwGp1lMOZMoBXkH058cl/YlDATAusbwazEZAABo/sEeASA0NRkLoOCRg6EB/iQAGZOEsGGsq6hyGQoD6GcMLCIhWEgPoMx4SQBB4o+UAUCyECoOg2D4A0JASJQeAQXgADceAwoBeA1HIapcYc25MGyphcQ8eBKtJUmcaxDRalxPFsQpnF4MJKDElg3gnGpkkaLJNQEAQCGCfJJlKbxBByBZ6l4IM4axEYfgSdqarGToqzrKZckUGxEhqcpEgSN5Ql4PAxTUCYEAWuw1quYhsngWqmxmX5DShdxvHBZlwmGL4kB6WxSrysxYE1FqchyAFHHyToll4GIyhqcJ04QLBPCuaqNpbGI6zVGsSq1elglZX+Kotcu1BtYsgpFRIJnylsioDYlw1sVsDX8aNwkORyv6uZshAEAFNTqMta2seRgW8Qpil2aJKTwDitKdf8/noWqTEmXIDQWVd1QNXdk2PfQHCIglWx3Gdao1OIf5/b5hCtEDzVhWABaYDgA5dZ5KZsbqPnrY0N1gWItmtd4CxFddSoLSZ3qhVdtnKdtk2OLQbaHYtGyw2RwgEEzfknaTwNhZwU6cPQRX8XxZXjN5f01VdmWswJIOROk+hFesJlKjU/NkULhD1WNbNhTgOk4DSrl3KpS1sSQA2rEjBCjUFIWTQAXpEsBFexDstD9tqu5tY05ZNCDie9R1KqsaqDUj3qkxHYUgAA7n7XXeXTTsIUNrESID4ee2nnApNHkmy4HGz50nKMl7ldKwMU8G40lNTeYn63gSnpd2bSGAxDLOg195qVJyz2X98JFqyq5TE9eVSrd4XNWN5NEQxPF701AFdPdRPPeq9PTfwqBC+tIHRl1z3pse03fQmv7JWiOVrSr35Eju7dqlhY43gMiuREK0fWBBWhFxRoXMOykxZ2QiNQbAzwgHvRATadYsNwFgRIFAvy6whrh3JpNHEnp/ZqjuGqBa3ki7/TwcXIKRCwooEGAyGmSp8b00IG/dahMGrfwpngdgKQcht3eg0chlDBbYNoXgdY91lL9WLrtIYlgrQ6xkhHOQsseFT21NVSabgipO3IW/SQXcXY8PXspLRDdhK6BljJRUH9Lp4JPuNWx71XJyBzrIo6/4kbrHvrxGxk0/KuWMkvDBP0LGsQwaTEJYVRheJ8RggK/ieEwN4usQJk0eRFW8bJXUq00p/gIQovOYVoD5J8d/HQ6TWJrHierMKS5wk8wupVGJfktHxImmFM4+TqhKnWEXImDT5G8XNnZWwOs9Zy2DiUmyfcm4ACkZZX0Sm7BZSN9ENQSXZAA0kVfGK8Jr1O6W4xRk0RzVKSmISqLi/xBMan/OySAdZbBXiMsZ3Sf7uMmsJQ6nzZELR+X+TJTydp4AAPI03aQjaJ9VWJiDKVknJYUyS3OGbLc5jV6HBOaXZAAinCuULQEZ1K6Y1Bu1i+l2X8Fi2RVUwX3NJtk02wlgD+yhm/XUy0qWMLGlcsKBQjFzIkPDXFkhekeO6PkjZWwRnFKRn1Nl6K7IzCMcC3WCdHn4waiICJYU8IJR8SAi6JSmpqo5XgXiCU5kjIeZaiF7LJoAE0jH7xBU6pGBkGrCrsgALRll67+XdHkiHxSpe6wkjBliwK6NAL03qSTkT1RW51/nrTQVtQlsa2SukthjG2707ZagdkxZ2SK/IiAmdGyacaC1oHBimvi7TvL8VObg7Uuj+EGJghgbAGB2qRR1q0CCWoWitCPqxEQVjT6TWKHBGCThK6yXlHvMCns7i7NnW4qZyjHLJo+YQUFZ1lraNnc81Odkua7x5QzWWVDfV/IDbGnW1R5QM3VritQyz2b+x5o+hmUj1q2lRbIipdltYLyA1u5VYH1BRpvRpGW5b+YtEkcbW0NLf4xrpEYmSTEE7aNHO2OkGA1I3L8LSFyrFbR1rfYIthyoFRbsnaB+j6hdFMZLam0NUjcW2nnXxPN5GgWGUzVo5WflbT7rEwAK39qxky57xoyfVNemeeAcYx2BSFZxJTbR/IPXgFyenJMWqRraCFTUw7CWoLM2SYhO5gU47JkO/qoPCR3vxpKUjn1gag+UpRg5AM2m/Vh6zOC2XebwEwMd6EdASHVoF+jJBGNxf6OF6GGEt0QPc/hXR4j7N4FEamuZqwOPYbKnw7T+AF6vwZm/NLHm3FwOEq2kOdwM2KoKUF55THSiHW8l+tzAVwLduMf+sKUQjFajpiTSb0WIVVShenQjslvFbGW2Bs6M27Lz3emVRb1Rdv0YNgd4SlQEolQNgzBoO32J7dw2BDU3sHGyTdnTZ7F260lYbfGy4KBXo0xMTqAmaS+kXd0aqAh+byuNUWiqAKogu67tk5u1GpXG2RhbTLdtbECADWh5jtxfb0YDstC8Nd/VhBppaFqP6il6N06Bq8jSWkdLUEMOnXz2pX6qqMg9qbvCN7/y6Dl6bQdZHdTA2murTdMbGnYDLEx1Didgo2LojYNraTxpuCgyS8pFRLwUuGgusnvmK8miwaWtt9PfJnVb8n2naNOHHEVeUd2Q5F3MdW+nWmlcoHZGo2DNoiFTvGgH3mV28BYFbk9LAN3S2VWoRK2RGVrNHS2uIyae1wjjmxGu03Hl6e6qM6bvh72woF/0M5Y93NT0mUaF3S9snGk27CuwYoIIcTUHDI396VqCmC3cow+jPT2f4Z7yCC0WJfAg9baygpe8lRbOs79UWHPBG98ZEX7w+PXIr47cnDfYGlledC4PTbi2P7t+ELsoVcXaO37c/fmPzKu92XoPoYtRV9Yn1PYxZJ8/kUM8A/92BlhEcs8Tczt9shM5AIVwDIDoD69zNJJYCFR4CV5HlEIINTM2otYOpIhYh5o1QFRWgVQ45EYwMXM49HolgywmA+M5RwcztHtSlLdhBWUgZk4wojB3gcQuslRdgicD4ZFEJYcxMC959sQjAMZacH0O1M0cEY9pVq94d7JihHJ0CFCIgnMv1vJW9ah1Dyca87I69nIj8Y4W8RYTChN9Vxc7JZ9F8B96IL5h8E5jC4lz96MrUGpwMtDLh0QmALQGtUFQEBcKDCtEIIUgiNYoBOAW5ZoYNU8l5wMHluDRAo0mNBhwhDdBRYA+d5oAoloJtRlztZNa1t8Z8yxh5bYKpZFuM+JN1qpsjDVaiDEE8rBCMUoWiGhPZ2jrM50uj/5h0E9qBaNNIvcQ58ETJmc/x+D6MIdp9JobgadZidB+o45k5foY9tAxi7I+wsAIAjc5Rx4BjODAkjN4Y1iBCUgGjS1p0ri0lljqiIUOsIDww2QOpCMTJ+pVNxhxpNpWIzoIMviDxSDwidZIMFicU4YkYzpXsvjMAsR5ods4l+I0l+swTNQjjhJIwDwCpYToZuojIvV1ozoRMviSgsRIBIodJihW1FUWi3Yu53i+J1B2sd9YB2Ao5dNJJGkySvoWjuCzpnkvjWwzj+dvdmiFiSZhiqT1A/kEimEed/9XJACdAEiQC/IUdSY1S7JdA8lXIvU51tkqTSNYEq87InB9BaRrBxxxw10JpyJqg/pKUA8KpXsmMRwi1rYvd9s6YV9HkKo601tJpoUAzWD7YcUIkbINMKodcQwozTSxFR434dQq0kTBjRZrc7SIB9A+wYJ3gXTYT3SCYV4qUjIo07MDFXSH1Gpv43NjYKTSZTNDAQASELQT19ZM0qi20TMxNGQrZWD5Q1R9YIdcUjIXU4tzQxz1llQdtmoQpxT+CxpDUBFYA11EYxtI0Cs2zRkr9JpoC+xBRnIIjU0myUt+VAZWJ5QOyxNbAoSUgYTGihliolRI0NNHzv8NI2RmTXT0NH0E5OS/znDhIwA40UAniq4bycVwLci4tig6T2AGTqAmTW1skItZc3juCIKH5JoQ9IBzimixtMMliCLcj1VhI3VXzC8rzhAvVHVtRasHzkNBU8oh4MAhQWM7gsFOEFoSlCK0UbU3VALeiEoWLe5a1jZRKs1jSsAJjIppijsq5HF1BWg5KkYFLwCwBJLGzcKWg6kkKZVJpuhlKR0picR1LxpIlRkdL1o9LtMWBDLNtoYMNOClSOK48V1OZfjJdGtlRuoi4dtCsXKz4rLJi1K0NjLuofK/IFL9lhJug0TVcvEFUQVqgdRu1kq6VUqGL3z3oekHYlU2LfzkNtMwA+SBSZYoYVQQMJsIqo0Uq8Buh3LMqHKcqs9nLkLQsdD+STRBTfEQrJEJtfskqaKbUeQiqOxGUikKrdLWqCqshTjYBDFbYWLpVcUFK192YEgDKsA/im8RS2gyVqL4kLE7JHBWAbDjc84HYbJ+UA8FLXUwoeQTiZSFrLs+oZFIr2ZpTzi9yMMb5EqbQ48jx0SuoEK6lcSprzKwpDgOY+xAqGAJMzqRlLTfLc0oUdIeilDZIIItgnKcbILlwhEwA4K+JYaqLlrYtQsCgUajqTrjtkdQrJVHl8qPEKBOr3oIkyqiFSaEb/zlwNi+KYb4qvT6b/VaLeQuy0bW0ClsUcr2KRbyaYJSL+dgSKK35waAaLYiS+871MC7tQqWsWqnyoVDwCa+y2JET9ao0CBOiwpAEfYsQ10Q518iFEyZaxo2r/Agb+dlamUdBhaIa9kxMFxmbFbSUzq1hOlXr+rF1orVLbKdZRsMMRZHbIbU6bKZjJaKLELLq9lVrdAvqyLNLWg/q/bYE0Y7J2otajFJy2It8c7RbjrYhjacsVRKEb5WsI7n9QtA0FbO70bd5Q1VUfza6xLJoignBg6UkcUubWqxNoUK7+cBa9bEYa6+rEb6U+ahSUlmVw63q5bgBD6NpIlETT7WqSYwp9Ag6pcfo9iV797UqN75VurGpdYZ7IMBr0qM7jLs74bB7YEd8QBy4UBwhigiCNxj9RMPTXNP4wGCUoVoVKbqat7+UTJb7369BMHXSq7tReqybaUPFdAYLqbgzSltLSH1aGEBFqB3gbgmBQQWMzsRZvRKqGbF1L6cKKLs6zKTyRUn77Ukp4Y8GGpnaBFHobgGQDxaRhwEpP1LsZG6a97RaWA5qmLut7swJvLETNH/bVrjhbaJNhlQUpGzYxMh1rLYrbYXY45a526hU5aeQ86HGSql6er5Kqqm4exjw3z5rC7Qa6kjGyGF0mEdG4qi6SNQSGGombrL6QbgMNHIn/7Jp4B+GBMOSS6h7F1P6RtgGAobi/62rkam6LGQVcH6HUHRMoVbB+HKsb66m9KuL4sqYcBEEIomLaY3MGZuS/64dAdYBE14AFDEciF5Rk40cuDynrrhIUh2AOwOQyDbZHq9a3YKVymo6qG11sGEItRrG1ZGnR7WaKtDJ+Zp7jGFELDZ5Io+xCixUbQQy0khnbnZ6PrCGfrfG/6Acwp40gKnM44fbhGCmwpRR1rta4MUsUpmkMmmNA1L7N0QzvITmsk4tA0xGJ67l0W2nkNnbTzhE1mWEMC+IakmjFR/qVqPEeRIGvdtq0k37S6eajaSS2kxrZEfaqU9qRyY6x7sKGrySMswUFKAW7IqQqnjsSpjDfqEXEmt0z5arhrYne7yootPnFLUqVWUARrSr1XyrdraXJpdAUXiGMXtW9AYmuoLW1b6nwCUAfmuoQKNX0nFXvQtCvZzWvsUV3X6nTN0ghq9WjFRtGq20L0eHI70HL7Dnfpam/HeHIWUnYWf1wWiL0Yin70pamURL/HN4UmmtsFlp03JlbGbXnjPzxhTkEn6nIywpoVPH07OWnrEZLW2ruhnWSqsryrLX+oPFkJvBwBYThkVTuW82k3JXkiIB+dCZctKEf0WWxoviM5zRYHNZ4HUE+JWUIJg58nrE16K3JI42237W3q4tmGgHctksuHJqA3bGu3jdk5+yS393MXQtYA0KMKsLn68L/Wz6ZrdX9Ww2b45ErMtWmNH6zjNqxE4MRlcCJ2Gp7kBFIGK4WEoA/RQ2l4kCLo33fEbVrwu6OWxFhWUoHbeWnb7mzMcXryvsx3jX8GDkBWLnGpR51WQkGORG7IRxL6Q7v5jmCXDTUy04yxex+xSUFZtQhil2M2f9zmgrd5XXKKtFa2+XGnH2LqrmE3hnnys3jdVJnHq7f6IO4sRwaO/walQzEOxpkPI4TQWRvBlHd5M7lpOiUG9KiXXbwgIgyX6qO4u4WiTOP2m2C7YPjK028OmNEAQQJaY5cmdmtWO2v2IBGSwBmSv7Ba/mIP3HeOfGSHE3RbrA2RvqXX4r4XrOQtTz9n+KDZkte5XHlJbPIWTR0OOQZYXOLOLc/73q7JrxpXMCeVFVWmCu3GCPmOFOBuuW+UEuMn627JoVkvUv0uW3t7tOtXyItChQhFoH5odBwFFZFSYsgvI4NPUmwIIvynVqKBzPDmol8vuuUKNOBGs78K/6FpStRPbhyXusAsYtJA8O2rMhzOQ7Ul7utWJWlnxvx7LmzqqtWzLuPFDhxbCbLHcGmjjvIXkff24WZvFWA6oelaQP4W6kZP33rkCfbkzr+OxWTWwpdAsfbWtstLtR0fZuy6gPPsySfosFOOTGKHAHGeV5mfcrdn0GGf+b4V42WeWcPWqOvZ5PoeuTfWa3uv3Hge8vLXTNbAOeNnVHySzlSelXJpXQKeMb1WDMaeU4OmenqZwlRDDjOFxhVOo0teQu7K7YdBnH8WRvKuwoHB+uQV/M8n/mIHTeZWuWnemUffsoOnAEVnWxvAJxW1rpjMBmuFnfJ3hJYAj2idwv4mHuBqc/numqQS3vPO7Ik/mFihWFpK5QiWFo6Yq9EW4t2Aw/j2fc6utR/uC/iKGXw8KKf0KOU45fzOaHvt/3k6/e2/A+qeAtLb7i7SPR13MBN2q4O1WUKoSe8PA29O2DDJpUymtXwCeRW4s53oZIZJapzx9BqJIA6JMBcBCJIAQADlIh4BshwAn+oBX+Z2yQwBh18ARkHYGQAORkheI9iJKuRBAFgC9AjAdygJTxCgDwBjAJ+ggOgHIDruRHHSHX0QEwD7ES4O4N6HQGwCFw1XQgbgOQHR1DqsdcgcQPsSwo0BSA2AdCngFQCmB9At3jgLoEwoYmjAvATCh+Z8DkBC3JdOhRS6YU0uPAIQcwM/rSD6BMZLgewJhRY85BeAElKoNFR3ANA3Apmk3S0EUDYBTNagYKzlDaClBcqWgeYPgFEDzBnAywfwO6C8CbBDgwQc4OQHdBFuEg9LvYPcGyC3BsA7oBzx8EBDAGwQ+xJqgoQGD7EeEHrFELwAepSocQiSrbUSHcD6KQTRijaFtDcDSgdsOIdXxSHjAchdgooUoOKC8DSh/A4oIIMqHIDUKog79pILlC1DYBkUYrhkDyE5CghLQ+xK3CLzNC4hc2VQRtk6FKDKgow/gW5UKFxDtGGQmEhMPAHuVIBUQpYawJWG21ruegtgXgKWHstsBcg9ygQP8FmtbapAx4qYDCGHCKelw22gwO2GLDbhawuge5UbYqV86soA4bcN4H3C9ALwwQT8JOHAsRB9JcQT+0+FAjZBAIl4QoPBG9FoUKgqEbbXUGIjgWmgswTsNtq6Dvq+g54ZiOuHoiHhwLCwccPcodUUhJI22pZTeGxUbhRIpwesKJGuCGRvRDwQ0NBFNDaRLIvwcyNMCBDg2A4TkbyNCEUjgWEQlFLiOBYxD8EEo3ogkKdg8j4h8A+UTKNMDpDoS81VIewPcq5Ceh2o+AbqNtrFAShCo8oXMI1EGjgW1Q+ohcItG9F6hIIpblINtGmA2h0LAYSqLwCDU6qCw34YaNCHOi8AQwlEb0RGEBjxhYY/UQqNmHqj8APoyhucMYCKC8B1XXmikIBEpjUB6YhMZgOJL7CsxsFUwEcKiHVczhBYi6nQJLHXDjh1XO4cWITEsC0xdYssa8Psbp05BNY74U2OHgYNrRSY8ATWM8Fgj8x3YyEV2NMDRlFy7Y+sQiLHFqC+xegarmiNnFYiOhBIhcQmKMEBUTBOI9gdV2JGziyRwLMIXuLsHViExjgs0bGLPFljO2vY48eeMHEcjrxw8boNyIrHnighz4oUf0PvFlixRs4qUbOLlHZDdxCY5IUeOVGgSyxao4JrGMgnJiExOo2cQUKPE9DquRo6kW2LQmISKhyEmochMfHeDsJZY10diOInDwvRqrOMehP9Gzigxs40MbOPDFMTIx74ssdGNgnuj2BnA5YXQJ4lPDuJmEmYpsOxEAieJewtsHIM4FFi+JQk2UKWOHhhDpJVYqIZwNrGyTWxMxBsUeLElySYUdg3SZpNlDQpOxGkmKunR7FU0Lhhk8yVpMIlSCbJadLSaOLMlOTjJMIxye8OUExdrJqkvSciL8lGTCgpgwKbZNlArjrQO4vAZwM3Go1txa43QJwP3GuSvJh43okpL0lUigpGUoKReJjHljBJuUpkSlNiqsiHRXgqQccKSlvjCpYU9qp+NCluT2qwoxqV5P/ElT06gEjqTMWAmtTYq4E9KfBPAGcCYJmQzUdFL0lITupsoFCelJ6GcCMJ2U+aZNNwnTTPR+EtafaLEGOiuJE0oKaRI6HLT9p3QvqenT6Hok4xnA+iWtMYlrTmJd01ibVKakcSxpPQmJrxPYHvSBJeA96ZmKiG/SsBkkgETExkmfTLxeABSRcOOEgyVJdAmJupLBn5TtJ6U4GeDJbF1S5B8M0yYjM4mWTFJqMpGfZPnEGA0ZLknGZkInH/5MZaMmcXDPBkBS6Z+UpcYzM4kRSQpLMzIbFJZqS4op4AmJslPJkwk0pUM/6eDKykYzoZYs+kRzKFnFTBZ81MqdtIqkFSfpYsmqarPyl8jvRkszWS1JlnzV2p8s/AF1KNnxCshos/KQNIuFDTrW4M0afMJtkkz8pU002bNJtEWzOJi0jGW9PBmmj8pcYmJlaKsm7S+ZvsomQHN9myCfZzsk6frPwDnTVcEc/KddNNm3TTZ909OY9I1mcSXp8wnoT8w+l4CC5308AQXL+l0Cy5gM4mT81BlFzexkMlWaXPrmwz2BPzBGXXODnIzfJFc3sejKalyC252Mjud2P+FRC254cgEW3LJnDzxxHkseb3NpmtzexDMpecHOZmrzh4bM3mQQ17FcyaBCUn5gLJnntVrB884OeLP7nHDD50sjebyLlnHzFZjQ7wVfN7Gvj2hkUl+efIak9zz5es2+XgENnHyTZx83qT/OHhWzzZYC1UbwMdk/MXZx8t2SHJ3nByvZ/c/Ob2L9mcS4xcCjaf/K2lPynRZ8iiVHKIUujY5eC2iVAsDHVzexac4+RnPoVZym5wc3OeaKiGf1C54AjhSXL0AcLy57AvhVXLkGf1a5XC9+RDLIHHCRFLcvAZ/XbliK3RXc4mXIoMnsLxFJk8GcIvUWjy6BciieWosUXTyFF31SmYGS0WKLF5si8RSvKsVuj15ti76lvISmf0958Ugxd9SPnGKMgwsxubwvEUXyvJYQz+nlKwVSL/F98rxdaEfnsjn57i7xerMiX1T+Rvi8uv4r/kOKMggCxJcAsSWgKBF4iiBeNNyUwKQJGS60PAsSWIK4xn9VBYEp6E1LVp+St0UHMUn1LxF+CmJYQt0XtKSF3S5peQrKWejKFTS76inMGV0LElDCyZUwr8VujWFsYnoRz04V6AllPC3QEsv4V4CNlQigERz1EUrLklDcsIXspkXgCOe8ig5XVSUVyDzlqiugecqHlnLkleM7uewPOX6L7lzyoxZctVamKaQNy55ZYqeV1UbFwK1VvYrBUhsnFUQjnq4r+Lbz1lySzxT8pDY+LjlSK08TCqRU3ytlSKiJSioHDRKdp6Kuqm/LdEkrVWWsqiccI55pUfxNK5JVkoJXcQLiWKuqnktxXsqlRpSyFQOHtkajHZHPCpcyqqWLLkltSmkWKrqqYLXpbK1Vi0vdmfLpV4cqVfKt6VvLxVAy3lUMp/GqqQ2Yy7VRMuZVTLjVMyxFXVXmVILdAgDZZdav6GpidJUQm1ZsvAHOqdlTq/ofsrtXokjlxwwBlQK3Hwq/V/Qi5d6tVzXKARgDPuYEsjUhrHlegKNTovYFRqPlyakNd8rDUwo55dAqNUCoTX9DQV+a9EhCqLWq5oVOa/oXCp5kJTAGyKzNWiuDXokAlNIxtarhCVjTW17VfFfWvDmdqyV2Ivtd/LTVNr0lrq/oUyszU5LS1ZsopdOsKWOzAG/KuCTyunXCrM1oqj1eiQlVYTN1quGVXnN3XrS7xPQwBh0uJUnr+hB0yKReq3VarV1wyvAYAwNXTqjVmak1W+rNWANLVcYrHrat/VrLf1LqvQIBvdV0CseXq8DZIqiHgbTlwGnyTCmJlY8I10G+DdGppEAikN8a+nqhqTV4CkNqavDahozVIbs17ApDXmuw2bFC1lGviiWpo2mBy1ZG+DVWoYAIqseda9jafLA3wbm1bY44expxXgD2N3a9jb2pQ2bF+1HQ/jTxqHWEaJNo6uDZsQnVY8p19GmdY7Kx7zqV1ampdZAqY2bE11WPDddxoM3GiTNfFfdWwvM0ujcFcmizSqvE0Wb1Vdmshckp/XwaE5VqrHs+rU2vqse76/zWav82NKYBkkexD6LC0zKwtZAloWFrM1MCwtIW3iGFts3JbZlZEgwWFrvVhaH1aWtTRFvaqvNiBkkNFSupK12Cyt7VGBZlq7V3jKtRK5Wd7mK3tVZB9WoIfVtCErrRg4Wn4d1p4XdayBvWvQHcqYHdb413W3DbxG63fLutQQobZmukHda81owCIUNpiFDaEhioYgaMEKVbbRt8Q3gXtpgGjBmaSC0YHA21g+igeTdHrQYOu3fVARKMu7U/XjFljFtL2kbcdpe3jaXtk2tajdpm0va5tz2m7aEN60vbltT9VbSDu+rraYdGQTbfDutC7akdB2zRUdqm1P1TtV2p+hdrO3rVDEt27bQTp4CPbXlX26DqTsG3PbKdw2vSe9tp1OysF4OxnX9qB6M7AdjO4HcTsZ1g6adG1UnZDtp3Q6edAullQzrF2I7RdhiFHdLp4C6ad0/OwxNjpaHs6xdeOn0VUnC3iimBWu+ATrpgFa6yBBu3iFrrsEm68AWu3gRbq12CCbd6WjofbvNVUSndoQp3SoPt2SSzoxAqpEdSPHe7ddy4MgQHsN3Lg7BIe03cuF4ER7LdFNO8THt92yCE9y4IIcnqhqJy09Kg5PdjvAw+74sG7S7bnqYFrJwtMekvfALL3ri3tlexKfTpr3R6DBJewQTXqT2N7mVuWYgSXtCE16s9be7HZXo12V7chQ+ivW3u3UzEO9xez0Q3s71Hrg5k+mAWsjPWNah9re2fZRJDYL7eIS+7vQYKOQMCWh++mZfvvi0wD99SWvAPvtS2X6YUDm4gfvuc28R99MIw/d5M2I+ijk1sliEwM/1Kjv9Z+vACRWxHMR79gBirf/qf2AGYFEBm/bEB+LbiQDP+wA4IMQMAGiu5K1A5AZQDtaYDRyP2HbFwODh9RhB2ACUJIMVCSDNQkgyqpINRySDL+kgyoMGKgHhVRyYzUgfH0fDX9lmhZXvrn2tK+Dy+sEdwcf036N9Ao7g7lpv3jCfhRyKYY6tAPfrZDFPA/XvpUPH6VDp+p/SoYv1MdjBfxF5Ugr0OBrJcwIpWcIbUP6HTDoh4w3FIMMv7LDJhhgPCPg0f6KeX++/e4b/2eGrDDAIAx0MwOX73D4Bnw04Z4Bd1/ZgR2w9zL8MK8pBUR9wygdwPuHWtyR3w+EZwOhG7DkufA8wZ/0U8NqhQtI2EcHBkGsjMRngNn00V5Gz9BRqg+Udjqfs2R564o9kYYBQsyJrRio4OAYMNGTB4YVwzUe0PpHPRRhinuwdqMjHODYxqY7ofGPX7ojsdIQxyMP3jGbD4xu9YsZMGea3DIxmQ44baM8B5DT2vo38SUMGCbkJay46gLXHXGRj28m5BEJtk3IYhFum5HKJj3vGlRnxtHZEZ+NWFD8v4L9Bce0KOR8cwJ4gTchNVQmZlUJi/Tx0xHsymBCJ1ETcYuPuUWNUg24+5SeMrqUTvRV4+idtofGiTwLedZ8fcoK6cEpJ3ogCfBNkQaTpgAvPSZ+H4nTA0J9ysccVXInOT8Jinlcf5NonITgp+47cYp64mLjFPQk8KZGMkmZTJR8k5KdlMwLPjFPOk0CYZPynDjoJ/aKBAhPImKe0Jw07CcNPwmFBVx800KeROWnRTFxhQRKchMKDpT1pxcnKZdP/5FTjp10yqbtOLl1TepzU+6cDLMmNTrJhQdCfDOwnwzF+2FOFv8GxmuNTA2M1BuIGxnMVqZ22f7PjPILFJ2Z1JeSrzOybeIsZhTbGZUHZnNBPw2FFvKrOFBrhtZiIdmZiHZneIwQ2FFLqTOKiUhGOhDQrp7OwpsdtZjXVWfcpxmDBSisnb4onMpmkzo59M7OdtpM6O1450c/ionMJKYUo5os5ucXOlnRz5Zlc4iekFKKazh51E/cZHO21GzZ5gk1Ofcqtn4zlJuUP2cpPwCXzxJw7TedMCDmvz+elfpdqrOcCxzqZoC4mZgFob06r23M+OaAvznwLQFwTfpL0m6A1zQFjcxBZmLO7N98ZoC6WaAsHmQLekyszBaItAaML4U+syRaCnXnCLQU5s1RbqkPmGLTUjs/Bb0my6kzI0z87Rbqk/meLTU4c+OZibAWkzwlsC8WeEsznwLwluCxJfBlLn5h8Z4S2ueEvoXhL25jRflIW1KX5LBF0S+DOIupmYmp5oywZcoumX8pNF/S/lPosWXOJTFuy5kNYtyXLZb5oS3bO4vWXOJfFry5kMEupmfmIl8C4FfEsCDexUFkWQFfCuyWwrwchSxqPjOBW1zgV9C4FY0uBXSzgVvS8Fd3nzjDDJlpMz80xN5WfmVlnK8HNsuFXexDlqq8HOcuxXwFblqK3Vc8vlXh4Pltq6YH8tJmiZQV4s71dCtmGCFVe6C6md6sxWhrnSzM6EvHO9W1zvV9C71Y0u9XSzvV7K/1eaPKzDLPVzaz+wKvgWiZxV480TLKsbXypP7Sqwdd2tNCarV18600PquTWdpHFu6+YYeutWzrb19Lh1c+vDXur4Fz+n1ZhSA3BrgNqS8WcBsTXAbiF9euIpQt3j4zgN9C4DY0uA3SzgN9a8DfEXbWAb2Nsiy4vMtJnP6p1rG26MusQ3xFt1im26Meuf0Xr1N76n2fHOf0frpN76v9eLMKCgbfy30UePjNc3wbWaxcrXuyn83hbMNrm2ua5voWubGlrm6Wa5uY2ebONzm4uX2uq3/8R1qs/aanNOndbi5Km0LY9PPnxzCg+m0bcDJM3UzCg1mzzY5tv6+K3NrHpObbPO3BbLhzYiLYlnjnnbMN522uedvoXnbGl526WedtK2seKth2wxrIuR3Cb4FrHiTY9t8Vyb0d21FOc00m3Uzmmpq0mc00fW07ttrHvbcxThai9MA0u0qLtBMDS7ZA8u7xFLsVbq7Fd6a2NPrt4BS7KB5uw3Yd2RT27pd9rd3Y7vTrvcBg0uyoP7vLgkFmKP3XNLHtB6ExPome1oeHuBN/ZLQme9fpnuiGZ7d6me1IZntMH57OemPZim5Mt3Ug0w4gWfdQEb2wD9Ou+xEawWP24j095A8evnvoGMt19wA3vbCzSDMUhRhQzXdKP06fhgD+NYA7+2AOCNPdjox0PAc9HJxiDgY+/sQca7qTxAklBYJXXYOq7WD9qk3YIftqHZBg7B13eIfhzcHLW8RU1qYHYPB7xDzrWQ/jyHUuSBDvHTHoZQMCuHO5/3QYO4fh6BHPAzRbw8MNb6Agt+6694LEdr6mB3DmEWI973ECGUmg3h1vPUfXDeHFg7R6PpUeEO69wjkhxqO0fN6jH4c7R3I5gEMoqVm+7R7vv0ck2GUcO/RwkP8EMpCl7j34zNZUcvD0Ivjx4SkK4cvChHAToETPvkd/D49Ajl4RY5ie3CrHvEfwNCMnHBPbhyjyJ0ebSeom9B2T3okdbye8j/HmTokXo5KcsjQn5T3kRE+sekizHYTlkXE4ae8jEnAQUkanvidEiHHVTgBb4uSe20XHPTtx509lGhX+nZJxC4HSbo8OBHT9a5Vw7meVPrHczmp0k7mf1P5Hczpp5s+metOpnJixR7M+mcZPlnTdNR0c8cWoCFnZzrRxc+8XFPTnHisp48+8VLO1nTdYx7GOuceKNnLzqJds7+c0PyV3z7xR05UdP06VF0kF9aCcdP1BngL4Z+C6bqeO7nyOyZyoYedrORj8z2Z9i7ecBAdDoj3FyUfEcLPsXALrFyS72cqHDn4L7Fyc8pfanzndLkoxo+JdMvbnLL7Uzo/ZfdG0VZLko7xon0CvuXqzglyMdvHz6RXfLil+K8FfUuJXYLzZxK+6fLORjsLkY/C8ZfdHEXyrhU2M4p4K7/BoqcLWuJNfwCzXI1i4Za69v9ybXvAm14IJteyCbXQQm16EJtcqDLXFy0VMhuIG+vPtvEX1/Gt9d/bfXsD4KbDfJU/DfXpGmAb67zWipJJFupN/roMFJvjd6bsPfTpTdR7NFubpgvPoLeyCC3QQgt27qzdpB39ubgBAg6zfY7c3Fw6UUwNFSX2jxzb+N2Ab0Edug3997KT2+ClP2xpA71t6/diH+v378+kd4AdkHTvsDbm6dxLBYLSwN0Wb/A7m6AfpSN35utd9brXd26134cjdyW7XcwiN3HurNxrtzfwRIhE7oFlu6zftR7jubhBEgkASRSY3ox7eaKiqWWvpj376fZor/dOus3yx7wX+5dege3XoHj11m5GHTvxhCH+AQh94EjuXtSJ+Ny9otfpuXtZAs1x9vp34ebtDrnDzdpA/+uXtkHijzdug/UeHtsHujxkHy1EeTF84tmX65beLOwHpHkxSG/Wd3iY3Wz6Rw5J48ZAo3ok0T9aB5vSD2Pibp+sm8k/Lg03jH60NBUXspv5PO7lT3m/9kaem6hbxSXp++onBaHRnjIDVTc1mfVPFb7T1W74q3vOPTdWtx+8U8NvFPTb9z8h/c+oC0PTdEPPTt8/fUh38wwLxkDgPgBtxoX60E6zvFReZ3tDuL/O+9Fxel3UsPuzHrZnrvFPm7i4VZ9AfZS8vVR3T9l4Pfaemj917wYV5Pdlez32Xi99p6veKeb3eX+97l6a/XC8vr75z2x6fq5CWPGQX94p//f9fylJH7Twqow9Bvev4ckb56Ko+Ofvq4hyb3Wabo7HZv8HxT4h829eftP36tDyMdNc4eDv2Hijwd7w9HeSjtrwJfh4O9jfOPB38j/d8u/zfMPB32j09+1MLabvl3r1xd+1M+v1DjY07yS8Dd1nsXfH7F2G5UMRvir4nut8D/+9xupv9L1w4J5GMKeEf3R2e218x+x01Pb2jT+j608fesfe73HyYIM84+SfeP6r9T4p9lu/vWPmz3T7+J2eqfr3ko915k8U83P5Pv4h575+S4236U/byUf8ORTRf2p/z/28Z+x1gvGoyX90fC80DFfcvwQar5MFf2OhGv/n0EJ1+S5UvK7zByz5yNsFZf/R5Tyb/aPE+Of2por1gsJ8lG+Sd4x33b6Pfm+/i8DyKa7+6MLkqZPvxo/V6t88BGvgvhgM149+S5WvZvsPzwCfclGHPtv7o11+QQufY/X7779qcG/p/hvkfhgDweW/FWJv378YzN7z88Ar1hfjY25sz/dG1v5fvABt/T9bfm/O34P3gD28GC5UQN7v6Fe7+C3u/MV7v4he7/4ru/G57v9ue78Kbu/mNuVCrq79/mtYSCnxT39HN9/RzA/uc/Tv8Gr+R/q5hG139HMT+tzbm3f6OZn/7nXD5/22gv+IE+KNdLQoV7KB7+gXyRXfoCwP9gs7+P/yFkf0BbH80LWh138gLKf1wt6VX/yCl8tEAL0k7/JgWf8l/bPhX9hLXxU+debdKV39JLRe0wD5LIf2EsR/ZS0P97/VS2ACu/dSzP8yA+Sxn9hLOfxiY4AmATQDH/Lv0CtUAkK3f97/QKwH9ArIf0CsR/JKyID4AlK1ICOA8Kyn8MrCAJEC4rOfx+Z6A3iEldh4JgPv9erVAIGt2A+AN6sB/cax/8lA4T1btFLLvzmsBAhgIWthA9QN0CsLAUV38VrCQLMCKvQXWv8DA3QNkD2qImUUD4AwG1QCQbNQIYCwbbAK79IbbQPcC4bEf0Bsx/JG1MCfAuGyn80bGwMiC3RaAP8DxFZwMk1rQNwIYCOeHvwyC+/DIIH8MgofwyCR/DILH8MgifwyCp/DIJn8Mgufw55kgjnjSC5AwBh79Ggvv0aCB/RoKH9Ggkf0aCx/RoIn9Ggqf0aCZ/RoLn9AGZIMAZ6g3p210DBTVBdsLdGYMzdiBGYJt9eIGYLJ8mBGYNK91g3uxj8tgiwJ2CYBGYOZ8DgxTXs85giGV8VNUX1WmCIZWDU1QGBfwTuDQrO4Jis7gxCzuD8VO4LE1Fgtmyk1rg6TweC07YIU1RJJAd2BC2/Y4Px9FJUEOzcZfb4LXssFaEMp9WVOENndrgiz2S80Q0IURCVBaEK58fhTVBPtrgyKy2DhfYkOODxfC4L7dvbb4Pl8rxIkLHcAQmL3n1GQjc01QkvalWuDDfb32uD8DNcU1QcvZb35C7BPkMHA7vY4Od959EUPK8vrLEx5CXvFYKQcqZKUN+9vgjBxj1NUFP3fd5xTVFyFoQqpT1C7BPUNQ9rg4vz1Dw5PUNRDvgpb3HctgnYwHc8IcLXtD0AgXyYEHQsgSdCrvGkQ9DjQ4gQdD1fAwQdDLQ10Pb0PQrEIDCTgl0JgE8IGZ19C+HdKRj1ow/F2jCxXaMN+deIaMNldow1p2jDaXYMOTsLhBMKntpBPCGx95xEsOp1YwtkG49Kw+NRLC/tEsO+USw7nWDD09MsLFpUfcMK58V1PCF59gwm0RgM8IUkOaEBwrt06NYw6X29kRw2kOHDxwsdyGMWVJkNaUpwug3HDuhEcK5C2w/AydCBQm0KjD8vDGW3CfQ4MIlCoQ8MOlDhrXcPTDBwIML3C/fMxW3CcQ8MND9gwzUICNww3IROhYwqpU/Dgw/9x/C9wgvwEoRw4v3/CrwsDwclgIyEWAi5tYCLB0Rw8YULCuTTFxZVv1GPQ9Qy7FdXQjuVAwXQi67TCLp1spG2XQiSlHCJzNrZfCPzNgDCiPa0KIzrQoiJ7fCIYEezD1GuVmIpC2yk2IzSywVOIwQU4jw5TiNkFOImEU4iVBNiMkk1xD1FLDt5SSPO9iBSSOFDSI+ELGkJIuPUlDFI+ULNl0QqiRUjWw6SPbD39FSK59/BD1Bz0h7D1HZ9eIcyMt8YBcyNQELdWyJzdSI6cMT9LIqA3gN4VeyMndDPJyNp8bI3+0s9SI/A3bsPUHcOCj9w/uTCj7fNuzMjBwLu0CiqHGKK99XmQKJhFIoiexiiMHGKNfCP5UiNyEwoqpXyim7XKOq1couKLkjPRBKNyjWtGKOtD8o5hxwjRzPTRsj1/FISIjN/RezajFzCrUwjRzEiLkiD/efU6jgWSiICMeoxcxoiGo3cx/Eho3ony0Zo8cSzsmBCBVYjJooETsFmIl4QLtlo3iNWi4RfiN2jxxQSIOiLbf5Q2j0nVwzOjgWcSOOipIiSPcpIQ61xuiFI/qNtolI+YTujXox72ajXojSIgUtIzfQ+irohjyWj7olUJBjb/VP18UIFUyOOiLIrs2BYhwlyPhjeiCkKRiIFCcP7l7I9ymcisY22mV9txXGIRjNg76IRjfIyyOxiGfF6OBYgosyPcpQo2mNtpSDenWCi6YkqKpjeiE8OtkGY6mMqj2Y0wCSjR7PmMVCzFFmMZj0o46Myjjo7KKhjtRZKKFiCo7mLtEio+WLZjwYy0TKi1Yu0V5jNYl0Wqjjo2qMViXReqLkiUA2dV00XbIiKwC3tS2NwDmYzCPwDNFG2K0sUDe2PktWtV2K0sJok2KoDpoj2M4k5ov2IplFomyPhlc7EOLRl1onCKxl0dKOLRkdo72MJldAxXQTjcZI6JTiKZYSNjikZUSKzjOJa6PTiYSW6NzjMhB6OW9dNKsOykJImJjeiNRKuPBkkQ6SOrjfo6uPe9w4/KV0i649uLBi247y0hjghXTRhiC4+ajhjdNRGPsiYmVGPHjwZDGMCUp4/KRxji4mEnxiPIxeOHjiYyyIniyY7x0yF2QzfTnjOJGmNXj8AemKPjwowJWCiYmKKNIdT4zmLliloy+O1ie4zIQFiL48GTvD/lV+PylUHez0/jOJSWKHj8AaWP7jA5O+KfiYSBWNPj/3X+MyFAI6BPASNYsBPmpwI0BI3jI5WhzgSkEwe0gTjYpgTbBE5FdTwS67AwTwTrhAhOoUZmYgTbARhQIzbAEI4hI79nnXiFoSxXUsPwTiE9ynYAiEyhI4TSE9hNtohhGhPcpqEmA1LC6E7hNtokIiR1ESWE6rjYTKE2RK4TcE2RN4T5EhMQESRE6rmETVE9iWQjS4yRJj09ElhM4E5E3BOMTFEmAQri6pVvnuMCEq6RtAREzgS0TTEvSTETnEoKX0TiEzgVQjiEmJhMSLE3xPMSmE3xJUTcEmJnUTKEmJicT/E8GVcTok/KQ8SIkmJJYSfmPxKYSUkwJNUjh4axIT8CEn5nCTcEn5iiS0k3sViTiklhUYTMk9kxYTP6VJKmhxFThI6jiEmpJCSLEz+nyTWk8RSKS6kuZV0TP6BJNwS+klhI55ak/6IHAGk62OIThklpKYSOedpJmTklLpNGSO/XRI55+kixNWSWEwBhGStkjJNbDsk7UzocLEp9XsTKEwBkWSv1XRK/UKk1sO8TKErHhGT7k3ZPuTpk/SL4o5k15NMBFk/zV0TAtIJ2ITgtIl2IEjAMzCK0mBYFPxoIJAwXBSXk8FNSioUr9xj1gUqpURTPRfFyRSxXJFLTC8AJFNlckU1pyRSlXGASRTVXXiGBShhFFNKTsUhhL+SgUjvzFcsAPAA/iDBBlIFEY9FlM5cmBBlL8AJHLlIqSuUjlJgEuU3MMFTlkw5N4gGUyRJXUJU6rWIFWwW2iZTZU9ylZTmUpVIFTxU9ym5S2UjVL5SNUtVPjwNU4VPVSJE0FMFTOTfB05TeTR2OZSn6BVM5Sn6ZVNlT7UvVOOom6TVOtTXUvlKfpvAZ1K9TDU+PCfpxhKVIDTzUwVIDSZUu1KrlbU0NKrkHUiNNzE2wE3nuM2UiSRBSeUlNIhT4w61KrlvUpNKzT40szD9TO6fNMDS807uklTS0kkm/UpUyGJwBRISMHnFTtf00RBV3WVLYcQzAMzZS2HWtLEh5xbWEL0DBPtJJ0TU3iG1h3k7WC6TtYQNJgNJ07wyYFJ06A2IEoOMXX7TF0odKXTDEMVIgIh0sdKHSJ0odKnTV02nUlTp0/dIXSmBb8zYcV1LqwL12Hc9PITAjT5JOS70j4QfTRU19OPTiBKpMdiYDIcNO0r09yk4cDBIcPeShwrpKHCX0n9M5Mn0mASHCP089MtTIjH9Kx1L0oDNx0b0mPQpCQMp+jAyn6CDM/SA06DN4gKQuDJgyw079PwzYAlDIoygpQDOoy6pLDL0kcMvSTwzz0rxMIyqQ56VnTSMlxLPSYMugKozz0mJlozBM8GRAzIk9jOnCWMvjJiSJMmJhIyiMuTN4yFM9yMlw/0oDNfthMvjJUyGAMTO0yeAMDNfspM5TIi8zjWTL0zqUiCR/TX7KtJ/SZAgTJgyfmTTKIy8kiTMKTXM3sSMyvI9k3czyk1qNsySkpTPi83RNTM/TP6JzKCzRlCTM/owMz+k8ytfa0APTz0vpK4yiMwZPIzz0moPsyiMuoPQygM2ZIkyOeMDI544s1ZIKzkleTP8iLVQLOHBTI4gWHAuYurMAMQ03iHqzUBFdVazmYgwXqzw0mAW6zzMzdPqyKHJgXqzqoxrN3iBRdrP/sY9YcB3Dpss+JpE5sq+JMcus2KOidGs88KmsJHGbNacZsv1JmyGXAjEyjGsptJ4AWhYcHbTEQFoVVxTAFdWuz3KW7NHCMgB7JnjYqZ7JiY3s8zOeyfmZ7M/pnsjngezak1XHGTFJAHJeTgc0wBuyDBcHKazbaW7Oq4KQuHITEXs9OkRyyxacNRzh4ZeMlwMciHO+yoc+HN+z8cpHP+yicssUByFExpOIFoc/ZO6NN0mnLl91QKnK8NYcqHOCMm6W7OCM9JDnJGN0c1nJ5zX7bnLF88cpnJ5zCckXLF8Sc8XO1NAcinmhy6c2XJeSaQSlKVyKkpXLFcBwIKJgMNclLJ0x5stsUCMNcwLI1ykjYgQ1yqHLXOvD0Ei3Pfj2MjXInstcgo1tyCjHXMTSnfEIyYFXcu3yNy6jOrQdyRjDbOJUDcgo1SNTcgo1Si/cp33tziBPwC6S/ARLJgE48nXLjzAsjNMfSKEpgVTy30mA0zyKsnPJTyKeWPMNN2MnNJKNc8003SyE8hQVjzwzYvMjM/M6POjMK83iEcxh9AwRbyKklvPxcW8sVxbysUlvNlcW81pxbzCU5vJ1UoXNvNFSWhRzEkSp8ulOqMDBcpWHTwoT0Wazl8qBIXzAPSIw3zi/FdXKUEo4gXKVRspgXKVGHY/LHzak60GfUEs5CISyKkhLLFdsmQ0SXzH8y0VXyX8pWM6yD87UR6zeId/Js06tBfO1F984/O1Ej8mAT/zPRU/PALtRZhy/z+E+cQgLKUxArvyEMrBRj1/eRb2fzevN/N68iHY/N68f88KF68hs8Aum8k43fN68wC3/N68oC6gtW9YC/Aqbor8gjIkcMCjIDWS6C76luT8CqYywKpjHAqmM8C0gtmMrUg/PmMACsQqmNgC4QpKNK/TdOLBZC2gqIKpjBgpkLtTZgr2Mb840xpSeC0vIfyjNZ/KM038ozSELf8ozUILouAzRIKzCjzWkKbCgzSoLwoIzSULLCizVUL7Ct5IQLvk1gt+T+HA/IBT/ZGPT9hyUgwT9gukv2C4NQi0VKCKLMzNOIE/YbgpgEBQkIviKhE9jIFDIi1IuNSJHAUI4KiDCRLFcmYoKRSKmBIorqlwizgUyLSitjJyKvEipLKLnpQorCTkIpbPwBwimJiqKkiuTJaK5M+osUzAU0opcycitzPTykin5k6LeIW+MpSpi+op+ZEiyYqJkSipIqJlwiomQmLBwImWmLNi+os2LCitpJaLos9ItiykFJKOmLksnQqSK0swItCKFBJYsmKq89IoUF1im3OmK68vwtKLG864viLvNFoqx5wirHmeLvCoIt8K4i0ooCK0CgwQSx483iChKdcqEsCy8dE7JtAY9REp0JdTZtON8YBPHW7T606QSRKcSuGILxj0IkqXw6+dYGIELsngEu0LdSkq3TadJGNpK3UikrRLNYUCEzyJHRkr1TGSv1NpLaSgSnJKmBWkpvcfhIUp4UhSoDXFKLzAwVpLYxAdxlLwQ3iBlKfPaUpZL8cGCCEU5S1Ut/B/KA5M1KwTbUrrTCSrUtAg7isrHjxkI+CDlT3imAUtKrnAwVtKhFGPUtK2HS8LNLLtJ0rpKxdCR3gh8EmAx9K67P0sERSEwMo3DvSqbPtL8i60t4h4IBosCUPS1ootLVsqVwjKA8lfRTLWnGMr9SYyg7PggNdAd3ghssMMrglAyxYHrymBeCE1pgDEspTTRi6Mu3Bgy4gXggeAD0qpARjD0rmwV1eCEqBOy2IshzGyufPylOy9ygZTvS4coqTo/F1OxEnS4cprLpyiGM5hkQ8svcp3S+0uXKh00cttpfSxso4SAy7cs3KGypcvlTJYFdznLqYi0rpjxyumPxdo/BMo3LqYrFJvLZXG8ozK6YrMrpicygDJvTXS6P0LLTy3omLK9y4FlLLLMwCv/K2sv0vcp1S/NNrKysSCoPKbS9ymbLVy22lbKSjP8tMAOy5CuBZuyrCt6IkIocoKLwZTsqx0LSrHXHKsdO0sbKKKx0vtLkMhcu/Kn6Fcqoqm6ddKkEnSp+i3Lyyjit3KuKpunpyEDP0ptTjyyKXYqm6fA1ErvqWbNoqxK68qfpbyiSoyBb470rkqnyuSozK5KrMrkqcytDP/NFym0qfpfy6Su+oAK3iuMqdcxumMrwK5issqhFQIwsqMgHUtpy7Kp+iQrrKjIFQrtTBSsvzGc0yvYKfK/Sqbp8KoyvYL3s2ipGMRy9ivCryK8KsoquKmKpoqqK8KpdL8yiniYq4qko1YrSKkY04r9K7Kp4rcqko34r4VZypGNQyyKqd8sqp32iq3cwx0SqnfMV3j87fB8oKNVK/3PUr/czSv9ztKkYzzKwqko0Mq6q7UxMqCqoavMqKeSsoCNBKkYygru6GCsark/eCujKKeVyvSrtTDyu6Nyq9Qv8qlqzQuIq9je7L6rtTS1RXU2i9jOAqQxM6uwzLqquS6THK2OluqnSbrwJL5xZ6s0F27V6rayh7D6psSvqw0t6ckY56udMYBZ6rdNgav6s9MmBEGp9NiBZ6oBNj0AGr+qSS0HFdK5sL3QMFUaipNRrg9dGphCMZGPVRqxXVGqxTUa1p1RqR86hV0j8aj5OQi5sXsJgE5sXIxxqdwloQZqV7Bmov0Ga6/QZq79JgQZrRDBmocNiBBmqPshaxAOpKDBDbFZsNscSolrIy0EpgFpa/F2lqxXaWqxTpa2V2lrWnaWr9Tpag7I2x7bWUAaymBQ2tXzDaz6uIEzaz/ONqoDUQutqsc1jRXVDa6wrwBDaxwsNqlCyoEkkWhT2pmVPamLQMFPale09qL9T2uv1Pa0Q09q71T2qkNPakWqYFKgOmt4hKgI2pgFk61fOTrza+Oo4zz4gOptqt84gWTqx3FdWTrna5OscLk6j2qmyYDSoFmzq6vXOFc66+Ssbrm9RuosdG6pPUbrFHRuqz06658NTr7opBSQipI72vuj/aguvuig6+6JDr7osOvuiI6+6Kjr7omOtBjBjAOuHKXSi3SQiU6pOuxj067GMzr+6vGNMLeyvOqwVi67GKLq16vGNLrsY8uopi3Nc+sZjlQauovKgnF+sZjw9d+upjo9L+o5iW68esZi26gBupiO64Bo5iu6sBv5ie6yBrFr9gpOurjB66uN9rq4sevjrq4oOuriQ66uLDqm42h29qW4tzXwb64mOuri461Ov4z6Kzeonil8y1URji6ieIPr4G6eOPraGwgtYb+s+hunjS6zePQSA6ieI9rL45+oLrL4ivWrrL4z+uEa34n+skav4/+rQa34oBvkav40BqUaD4iBtUbn46Bo0aYSPut4gvYQA22q8AfRqHCV1YxqfpTG7OteyDBYxtCriBGxs+zrGrzMMbjGsXKYFjGyXLcbsY5xt3qWcuxv3r2c6xv3qucwJrxjbGzxtCaHGvxuvrexUxtvrxFWJrxiPGmAS9gn6PsrcbUmg6rsbUm8xusbsm4Jqya/PMJuSbUmgXNya/PYXPSa/PVxuKa/PJJr0bX7NJuSaGmzJrcaGmnJrsa2m/JtabzM3nI6aem0pr6aTMoXwqammnpuqb6mnpslzr+H/ngA/+AATPBBQGZo/4wABZv0ADgZAGbQGIMgCAA===";

var HelveticaOblique = "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quEFWqyum6rwq1gp5N+q1/WELxcYauwh6yuKuDTEq4hAm84I10CmqeAWsWwhly442WraFdKoYVNqzKuqqq8nKt2qS/TaomlNqgqoOqiqg6uZp0q07CmrKgG6vyobqmpjiqC4kKrBy7o1yoLjPKlqoLjcC16vfzXqwKterKCgb2riwq4Gtbj/ZbrVeroqr6rTpYq96thqyPRKoPiomGGupFqklGo6qD4natRrNibKvXYUqg+Lyrqqg+NOqca0wDqS8xAmrbSManqubSyq4mrToKqhmupFxaakSpqWa+mrJr1OBquZrNiJqt5rTANqoFqy8rquFroyoWq5q4yrWnGr8qUatMAZagq2Mwua9bSRq06ZZKVrMatOiWr4a6kVWrDzZatHyaa8Kony06dmtjFsazWvnzWxM2pTEiarmt/yeAG2oTyMgJ2p1jXay6uFrrqnWubENa2mvrE06J6uvzZZOKtp8Xq2n3crafT6o6rafH6tp8/q2nwBrafIGt7LvPPrVcrafSKpTqEA0At/08Peat9rwqiDKaLEqyumSrqq0uqqqWq0uotqeq0upqYUq0urtro69ZktKVFBupbrzqqur7Sja3OqJpXShgHbqiaJmq7qh6yuubqh6zmvHqMga8lQJB6jIH5qR6jIAlqp610HDLxqyunFrbWRetXqu+devWY5arepXrkdAut7rdtBZJLr1mdWpDr1mbWu3q8APWp5Nlqu/LnqS802vLqf8musLqf8+uvfrgCputrqf846t/qMgTWJfrk8nupTqWjMBq9q7626vTrkC+6vgbbi1sRDr3/MOvf8I69/yjra69/1jr3/eOvf9E6sANkKq69/1Bq1KyAMzr4A6GujrVjOGtIbjjBKvTrVjMuoYbDzdGobqWGz+r+zjjPGtpJOG3hv/rC6lhtJraG3hs7qxGw8xKry61Y37rHamRuONh6yRp5NWazYgEbDzWquON1GlRp5q2GnkwXrlGrWmXqcG44zXqFGw803r161YylqDeKxtMbzeOxsPNJq5hsY9z6lxsPMr69xp5Nb6wxoN4H6rWifr0CiBopMx6kxpsDuGihsCCf6vRupMhGnhpsCgGmJsCDRGsJp5M3a8xrSaPapJpUyT6yJqNw4G7JoMzEGwpoYAyLVYXwB8M8SHmTdilgvwBHhcpvrSmi1Av0q1tJLJUEWm89MBkTK10EqbI6dZg4y+mkVK6bSPczNCELKyjwGbxmhNXqb7hOcp5NemuZvUC2m4QUWaDeGZrGaSEBdIcq+3Fir/Edm7ZrJUtRXZv0C4hI5u2aT7Y5u50xm7Zpd1rmhird12mm5qF07m5dJNMv0AwWObOK3HGu9hBU7EINdwv5ugMAW2vXINgWjFOEiwWmgzBb0DMFswMwW7AzBbcDMFvwNgWyyPuFTsDi2BblcrFopycW6NKxaoW0IQxa9c4aoxaYWolqWzg7LFoRaKWznOBbwo0lr5yPbelsJaVBU7BFzGW4ssudOWuFtpbwXelpRaKWjKPuEHscz13DRW9guEFRWjx3FbvKvj1la/K4MVQLRW/xwVautBVvucFWwbQVbIfWVpm1AvB7COkRW4bKoljWtkpzrDW3AsNb3861oZzutQ1sCrDWoGsNbQah7HK9jWumI9arW/bM1UPWx1oWLG8j1udb0Si1pnAaGqVuDTAvTUEGzhBaNsHlo2/DQTbdslQWjav1VNoZzVhaNu+lo2iWWjamjSoEIN7hAtppsC2oBwLaHrAtqEcC22ewLbxXAtoFsC24WwLbZXSoCH1VVSoGJzhBDtpLbx44OyLbp9anNCEO2qtr8MGc2TQ7aa2ylpC8u23GPqT+2znPnae2rMvHafWhy3nbJ2rlo28Y7SoFOLt2kNpXakKvdqf12256u3aC4kto+rR7Idu+rB2lQSdNFWsR3vaa2+uPcsi2guIbaC4ptoLiW2xppcq32tOk7bxIJ02Vz/26kXNbx2+eIrb54qtug6x20Ds2JvIwDuQrB4uto3iz4+DtMAF269t/iL23+Kg7f4mDt/jn23+KTSnTXdog7f4t3KA7P4n9qw8amihSA7LEx9ssSS2yxLLbLEittsSmMu9ocTDcotssS629xPQ6h2yxKbbfE+WXHbsippvbaamJDrIsQOkTuSSKc/jqU7b2rttk6q2jTrg7FO0JJrbZOwTsKThOnjtbEsO4zq6TWOkzs46TOzTpM69OkztI7Gkgzq6SqOofNllD2yTvYyrM1VXhwjpXcJ87JW8SB8735PzoHb6fELt5KWCnzr1zUCnztVbQhHzvVb4u2dtr8Qu8r1S6AuvAHhwsymLtXalW1Lri6VBLLra1UuxLsK6Q2nLsPaYu+eMi754jLt/KwO4Lvi7IO97z87oO/PKa6AO6Lta6AOgruEF6uhDtK6+utDr61uui+Jq6cO8YVG7NibLqm7MOvQsK7P43rsC7P44ro66L4wbuW7KOu8Sq7f43Vvi6FfSLoV86uhX0a7Cuk7pa79uo33m6+uhXy67Lu2XyW7MuhXw26nuo301b7u230O71mOmL87K6Gbo+7nfa7sC6/ux7oAqiaTdor9fu77pe6we23w68oe8Hr27CuqTN874ulHrq6Ue07r67Mei7uR75MiLsOLgK/Hru68e/TIYBEOyLpR6YelHve7Se7gMJ6pMn7rR75M/7rp6DeXMsp6We0HsZ7Vutns9zqelnvh7mesnuUC9uwgSYEWBNgWShHwaUAl66BMABl79AY4GQAJ0LiDIAgAA==";

var TimesRoman = "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";

var TimesBold = "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=";

var TimesItalic = "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";

var STANDARD_FONTS = {
  Courier: LZString.decompressFromBase64(Courier),
  'Courier-Bold': LZString.decompressFromBase64(CourierBold),
  'Courier-Oblique': LZString.decompressFromBase64(CourierOblique),
  Helvetica: LZString.decompressFromBase64(Helvetica),
  'Helvetica-Bold': LZString.decompressFromBase64(HelveticaBold),
  'Helvetica-Oblique': LZString.decompressFromBase64(HelveticaOblique),
  'Times-Roman': LZString.decompressFromBase64(TimesRoman),
  'Times-Bold': LZString.decompressFromBase64(TimesBold),
  'Times-Italic': LZString.decompressFromBase64(TimesItalic)
};

var createStandardFont = function createStandardFont(PDFFont) {
  return function (_PDFFont) {
    inherits(StandardFont, _PDFFont);

    function StandardFont(document, name, id) {
      classCallCheck(this, StandardFont);

      var _this = possibleConstructorReturn(this, (StandardFont.__proto__ || Object.getPrototypeOf(StandardFont)).call(this));

      _this.document = document;
      _this.name = name;
      _this.id = id;
      _this.font = new AFMFont(STANDARD_FONTS[_this.name]);
      _this.ascender = _this.font.ascender;
      _this.descender = _this.font.descender;
      _this.bbox = _this.font.bbox;
      _this.lineGap = _this.font.lineGap;
      return _this;
    }

    createClass(StandardFont, [{
      key: 'embed',
      value: function embed() {
        this.dictionary.data = {
          Type: 'Font',
          BaseFont: this.name,
          Subtype: 'Type1',
          Encoding: 'WinAnsiEncoding'
        };

        return this.dictionary.end();
      }
    }, {
      key: 'encode',
      value: function encode(text) {
        var encoded = this.font.encodeText(text);
        var glyphs = this.font.glyphsForString('' + text);
        var advances = this.font.advancesForGlyphs(glyphs);
        var positions = [];

        for (var i = 0; i < glyphs.length; i++) {
          var glyph = glyphs[i];
          positions.push({
            xAdvance: advances[i],
            yAdvance: 0,
            xOffset: 0,
            yOffset: 0,
            advanceWidth: this.font.widthOfGlyph(glyph)
          });
        }

        return [encoded, positions];
      }
    }, {
      key: 'encodeGlyphs',
      value: function encodeGlyphs(glyphs) {
        var res = [];

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = Array.from(glyphs)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var glyph = _step.value;

            res.push(('00' + glyph.id.toString(16)).slice(-2));
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        return res;
      }
    }, {
      key: 'widthOfString',
      value: function widthOfString(string, size) {
        var glyphs = this.font.glyphsForString('' + string);
        var advances = this.font.advancesForGlyphs(glyphs);

        var width = 0;
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = Array.from(advances)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var advance = _step2.value;

            width += advance;
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }

        var scale = size / 1000;
        return width * scale;
      }
    }], [{
      key: 'isStandardFont',
      value: function isStandardFont(name) {
        return name in STANDARD_FONTS;
      }
    }]);
    return StandardFont;
  }(PDFFont);
};

var toHex = function toHex() {
  for (var _len = arguments.length, codePoints = Array(_len), _key = 0; _key < _len; _key++) {
    codePoints[_key] = arguments[_key];
  }

  var codes = Array.from(codePoints).map(function (code) {
    return ('0000' + code.toString(16)).slice(-4);
  });

  return codes.join('');
};

var createEmbeddedFont = function createEmbeddedFont(PDFFont) {
  return function (_PDFFont) {
    inherits(EmbeddedFont, _PDFFont);

    function EmbeddedFont(document, font, id) {
      classCallCheck(this, EmbeddedFont);

      var _this = possibleConstructorReturn(this, (EmbeddedFont.__proto__ || Object.getPrototypeOf(EmbeddedFont)).call(this));

      _this.document = document;
      _this.font = font;
      _this.id = id;
      _this.subset = _this.font.createSubset();
      _this.unicode = [[0]];
      _this.widths = [_this.font.getGlyph(0).advanceWidth];

      _this.name = _this.font.postscriptName;
      _this.scale = 1000 / _this.font.unitsPerEm;
      _this.ascender = _this.font.ascent * _this.scale;
      _this.descender = _this.font.descent * _this.scale;
      _this.xHeight = _this.font.xHeight * _this.scale;
      _this.capHeight = _this.font.capHeight * _this.scale;
      _this.lineGap = _this.font.lineGap * _this.scale;
      _this.bbox = _this.font.bbox;

      _this.layoutCache = Object.create(null);
      return _this;
    }

    createClass(EmbeddedFont, [{
      key: 'layoutRun',
      value: function layoutRun(text, features) {
        var run = this.font.layout(text, features);

        // Normalize position values
        for (var i = 0; i < run.positions.length; i++) {
          var position = run.positions[i];
          for (var key in position) {
            position[key] *= this.scale;
          }

          position.advanceWidth = run.glyphs[i].advanceWidth * this.scale;
        }

        return run;
      }
    }, {
      key: 'layoutCached',
      value: function layoutCached(text) {
        var cached = void 0;
        if (cached = this.layoutCache[text]) {
          return cached;
        }

        var run = this.layoutRun(text);
        this.layoutCache[text] = run;
        return run;
      }
    }, {
      key: 'layout',
      value: function layout(text, features, onlyWidth) {
        // Skip the cache if any user defined features are applied
        if (onlyWidth == null) {
          onlyWidth = false;
        }
        if (features) {
          return this.layoutRun(text, features);
        }

        var glyphs = onlyWidth ? null : [];
        var positions = onlyWidth ? null : [];
        var advanceWidth = 0;

        // Split the string by words to increase cache efficiency.
        // For this purpose, spaces and tabs are a good enough delimeter.
        var last = 0;
        var index = 0;
        while (index <= text.length) {
          var needle;
          if (index === text.length && last < index || (needle = text.charAt(index), [' ', '\t'].includes(needle))) {
            var run = this.layoutCached(text.slice(last, ++index));
            if (!onlyWidth) {
              glyphs.push.apply(glyphs, toConsumableArray(Array.from(run.glyphs || [])));
              positions.push.apply(positions, toConsumableArray(Array.from(run.positions || [])));
            }

            advanceWidth += run.advanceWidth;
            last = index;
          } else {
            index++;
          }
        }

        return { glyphs: glyphs, positions: positions, advanceWidth: advanceWidth };
      }
    }, {
      key: 'encode',
      value: function encode(text, features) {
        var _layout = this.layout(text, features),
            glyphs = _layout.glyphs,
            positions = _layout.positions;

        var res = [];
        for (var i = 0; i < glyphs.length; i++) {
          var glyph = glyphs[i];
          var gid = this.subset.includeGlyph(glyph.id);
          res.push(('0000' + gid.toString(16)).slice(-4));

          if (this.widths[gid] == null) {
            this.widths[gid] = glyph.advanceWidth * this.scale;
          }
          if (this.unicode[gid] == null) {
            this.unicode[gid] = this.font._cmapProcessor.codePointsForGlyph(glyph.id);
          }
        }

        return [res, positions];
      }
    }, {
      key: 'encodeGlyphs',
      value: function encodeGlyphs(glyphs) {
        var res = [];
        for (var i = 0; i < glyphs.length; i++) {
          var glyph = glyphs[i];
          var gid = this.subset.includeGlyph(glyph.id);
          res.push(('0000' + gid.toString(16)).slice(-4));

          if (this.widths[gid] == null) {
            this.widths[gid] = glyph.advanceWidth * this.scale;
          }
          if (this.unicode[gid] == null) {
            this.unicode[gid] = this.font._cmapProcessor.codePointsForGlyph(glyph.id);
          }
        }

        return res;
      }
    }, {
      key: 'widthOfString',
      value: function widthOfString(string, size, features) {
        var width = this.layout(string, features, true).advanceWidth;
        var scale = size / 1000;
        return width * scale;
      }
    }, {
      key: 'embed',
      value: function embed() {
        var isCFF = this.subset.cff != null;
        var fontFile = this.document.ref();

        if (isCFF) {
          fontFile.data.Subtype = 'CIDFontType0C';
        }

        this.subset.encodeStream().pipe(fontFile);

        var familyClass = ((this.font['OS/2'] != null ? this.font['OS/2'].sFamilyClass : undefined) || 0) >> 8;
        var flags = 0;
        if (this.font.post.isFixedPitch) {
          flags |= 1 << 0;
        }
        if (1 <= familyClass && familyClass <= 7) {
          flags |= 1 << 1;
        }
        flags |= 1 << 2; // assume the font uses non-latin characters
        if (familyClass === 10) {
          flags |= 1 << 3;
        }
        if (this.font.head.macStyle.italic) {
          flags |= 1 << 6;
        }

        // generate a random tag (6 uppercase letters. 65 is the char code for 'A')
        var tag = [0, 1, 2, 3, 4, 5].map(function (i) {
          return String.fromCharCode(Math.random() * 26 + 65);
        }).join('');
        var name = tag + '+' + this.font.postscriptName;

        var bbox = this.font.bbox;

        var descriptor = this.document.ref({
          Type: 'FontDescriptor',
          FontName: name,
          Flags: flags,
          FontBBox: [bbox.minX * this.scale, bbox.minY * this.scale, bbox.maxX * this.scale, bbox.maxY * this.scale],
          ItalicAngle: this.font.italicAngle,
          Ascent: this.ascender,
          Descent: this.descender,
          CapHeight: (this.font.capHeight || this.font.ascent) * this.scale,
          XHeight: (this.font.xHeight || 0) * this.scale,
          StemV: 0
        }); // not sure how to calculate this

        if (isCFF) {
          descriptor.data.FontFile3 = fontFile;
        } else {
          descriptor.data.FontFile2 = fontFile;
        }

        descriptor.end();

        var descendantFont = this.document.ref({
          Type: 'Font',
          Subtype: isCFF ? 'CIDFontType0' : 'CIDFontType2',
          BaseFont: name,
          CIDSystemInfo: {
            Registry: new String('Adobe'),
            Ordering: new String('Identity'),
            Supplement: 0
          },
          FontDescriptor: descriptor,
          W: [0, this.widths]
        });

        descendantFont.end();

        this.dictionary.data = {
          Type: 'Font',
          Subtype: 'Type0',
          BaseFont: name,
          Encoding: 'Identity-H',
          DescendantFonts: [descendantFont],
          ToUnicode: this.toUnicodeCmap()
        };

        return this.dictionary.end();
      }

      // Maps the glyph ids encoded in the PDF back to unicode strings
      // Because of ligature substitutions and the like, there may be one or more
      // unicode characters represented by each glyph.

    }, {
      key: 'toUnicodeCmap',
      value: function toUnicodeCmap() {
        var cmap = this.document.ref();

        var entries = [];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = Array.from(this.unicode)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _codePoints = _step.value;

            var encoded = [];
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
              for (var _iterator2 = Array.from(_codePoints)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var value = _step2.value;

                if (value > 0xffff) {
                  value -= 0x10000;
                  encoded.push(toHex(value >>> 10 & 0x3ff | 0xd800));
                  value = 0xdc00 | value & 0x3ff;
                }

                encoded.push(toHex(value));

                entries.push('<' + encoded.join(' ') + '>');
              }
            } catch (err) {
              _didIteratorError2 = true;
              _iteratorError2 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                  _iterator2.return();
                }
              } finally {
                if (_didIteratorError2) {
                  throw _iteratorError2;
                }
              }
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        cmap.end('  /CIDInit /ProcSet findresource begin\n  12 dict begin\n  begincmap\n  /CIDSystemInfo <<\n  /Registry (Adobe)\n  /Ordering (UCS)\n  /Supplement 0\n  >> def\n  /CMapName /Adobe-Identity-UCS def\n  /CMapType 2 def\n  1 begincodespacerange\n  <0000><ffff>\n  endcodespacerange\n  1 beginbfrange\n  <0000> <' + toHex(entries.length - 1) + '> [' + entries.join(' ') + ']\n  endbfrange\n  endcmap\n  CMapName currentdict /CMap defineresource pop\n  end\n  end  ');

        return cmap;
      }
    }]);
    return EmbeddedFont;
  }(PDFFont);
};

var PDFFont = function () {
  function PDFFont() {
    classCallCheck(this, PDFFont);
  }

  createClass(PDFFont, [{
    key: 'encode',
    value: function encode(text) {
      throw new Error('Must be implemented by subclasses');
    }
  }, {
    key: 'widthOfString',
    value: function widthOfString(text) {
      throw new Error('Must be implemented by subclasses');
    }
  }, {
    key: 'ref',
    value: function ref() {
      return this.dictionary != null ? this.dictionary : this.dictionary = this.document.ref();
    }
  }, {
    key: 'finalize',
    value: function finalize() {
      if (this.embedded || this.dictionary == null) {
        return;
      }

      this.embed();
      return this.embedded = true;
    }
  }, {
    key: 'embed',
    value: function embed() {
      throw new Error('Must be implemented by subclasses');
    }
  }, {
    key: 'lineHeight',
    value: function lineHeight(size, includeGap) {
      if (includeGap == null) {
        includeGap = false;
      }
      var gap = includeGap ? this.lineGap : 0;
      return (this.ascender + gap - this.descender) / 1000 * size;
    }
  }], [{
    key: 'open',
    value: function open(document, src, family, id) {
      var font = void 0;

      if (typeof src === 'string') {
        if (StandardFont.isStandardFont(src)) {
          return new StandardFont(document, src, id);
        }
        font = fontkit.openSync(src, family);
      } else if (Buffer.isBuffer(src)) {
        font = fontkit.create(src, family);
      } else if (src instanceof Uint8Array) {
        font = fontkit.create(new Buffer(src), family);
      } else if (src instanceof ArrayBuffer) {
        font = fontkit.create(new Buffer(new Uint8Array(src)), family);
      } else if ((typeof src === 'undefined' ? 'undefined' : _typeof(src)) === 'object') {
        font = src;
      }

      if (font == null) {
        throw new Error('Not a supported font format or standard PDF font.');
      }

      return new EmbeddedFont(document, font, id);
    }
  }]);
  return PDFFont;
}();

var StandardFont = createStandardFont(PDFFont);
var EmbeddedFont = createEmbeddedFont(PDFFont);

var Fonts = {
  initFonts: function initFonts() {
    // Lookup table for embedded fonts
    this._fontFamilies = {};
    this._fontCount = 0;

    // Font state
    this._fontSize = 12;
    this._font = null;

    this._registeredFonts = {};

    // Set the default font
    return this.font('Helvetica');
  },
  font: function font(src, family, size) {
    var cacheKey = void 0,
        font = void 0;
    if (typeof family === 'number') {
      size = family;
      family = null;
    }

    // check registered fonts if src is a string
    if (typeof src === 'string' && this._registeredFonts[src]) {
      cacheKey = src;
      var _registeredFonts$src = this._registeredFonts[src];
      src = _registeredFonts$src.src;
      family = _registeredFonts$src.family;
    } else {
      cacheKey = family || src;
      if (typeof cacheKey !== 'string') {
        cacheKey = null;
      }
    }

    if (size != null) {
      this.fontSize(size);
    }

    // fast path: check if the font is already in the PDF
    if (font = this._fontFamilies[cacheKey]) {
      this._font = font;
      return this;
    }

    // load the font
    var id = 'F' + ++this._fontCount;
    this._font = PDFFont.open(this, src, family, id);

    // check for existing font familes with the same name already in the PDF
    // useful if the font was passed as a buffer
    if (font = this._fontFamilies[this._font.name]) {
      this._font = font;
      return this;
    }

    // save the font for reuse later
    if (cacheKey) {
      this._fontFamilies[cacheKey] = this._font;
    }

    if (this._font.name) {
      this._fontFamilies[this._font.name] = this._font;
    }

    return this;
  },
  fontSize: function fontSize(_fontSize) {
    this._fontSize = _fontSize;
    return this;
  },
  currentLineHeight: function currentLineHeight(includeGap) {
    if (includeGap == null) {
      includeGap = false;
    }
    return this._font.lineHeight(this._fontSize, includeGap);
  },
  registerFont: function registerFont(name, src, family) {
    this._registeredFonts[name] = {
      src: src,
      family: family
    };

    return this;
  }
};

var Text = {
  initText: function initText() {
    // Current coordinates
    this.x = 0;
    this.y = 0;
    return this._lineGap = 0;
  },
  text: function text(_text, x, y, options) {
    options = this._initOptions(x, y, options);

    // if the wordSpacing option is specified, remove multiple consecutive spaces
    if (options.wordSpacing) {
      _text = _text.replace(/\s{2,}/g, ' ');
    }

    // render paragraphs as single lines
    var lines = _text.split('\n');

    for (var i = 0; i < lines.length; i++) {
      this._line(lines[i], options);
    }

    return this;
  },
  _initOptions: function _initOptions() {
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var y = arguments[1];
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    if ((typeof x === 'undefined' ? 'undefined' : _typeof(x)) === 'object') {
      options = x;
      x = null;
    }

    // Update the current position
    if (x) this.x = x;
    if (y) this.y = y;

    options.columns = options.columns || 0;
    options.columnGap = options.columnGap || 18; // 1/4 inch

    return options;
  },
  _line: function _line(text) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    this._fragment(text, this.x, this.y, options);
  },
  _fragment: function _fragment(text, x, y, options) {
    text = ('' + text).replace(/\n/g, '');

    if (text.length === 0) return;

    // add current font to page if necessary
    if (this.page.fonts[this._font.id] == null) {
      this.page.fonts[this._font.id] = this._font.ref();
    }

    // Glyph encoding and positioning

    var _font$encode = this._font.encode(text, options.features),
        _font$encode2 = slicedToArray(_font$encode, 2),
        encoded = _font$encode2[0],
        positions = _font$encode2[1];

    // Pass down spacings to _glyphs method


    options.wordSpacing = options.wordSpacing || 0;
    options.characterSpacing = options.characterSpacing || 0;

    // Adjust y to match coordinate flipping
    y = this.page.height - y - this._font.ascender / 1000 * this._fontSize;

    this._glyphs(encoded, positions, x, y, options);
  },
  _addGlyphs: function _addGlyphs(glyphs, positions, x, y, options) {
    // add current font to page if necessary
    if (options == null) {
      options = {};
    }
    if (this.page.fonts[this._font.id] == null) {
      this.page.fonts[this._font.id] = this._font.ref();
    }

    // Adjust y to match coordinate flipping
    y = this.page.height - y;

    var scale = 1000 / this._fontSize;
    var unitsPerEm = this._font.font.unitsPerEm || 1000;
    var advanceWidthScale = 1000 / unitsPerEm;

    // Glyph encoding and positioning
    var encodedGlyphs = this._font.encodeGlyphs(glyphs);
    var encodedPositions = positions.map(function (pos, i) {
      return {
        xAdvance: pos.xAdvance * scale,
        yAdvance: pos.yAdvance * scale,
        xOffset: pos.xOffset,
        yOffset: pos.yOffset,
        advanceWidth: glyphs[i].advanceWidth * advanceWidthScale
      };
    });

    return this._glyphs(encodedGlyphs, encodedPositions, x, y, options);
  },
  _glyphs: function _glyphs(encoded, positions, x, y, options) {
    var _this = this;

    // flip coordinate system
    var i = void 0;
    this.save();
    this.transform(1, 0, 0, -1, 0, this.page.height);

    // begin the text object
    this.addContent('BT');

    // text position
    this.addContent('1 0 0 1 ' + PDFObject.number(x) + ' ' + PDFObject.number(y) + ' Tm');

    // font and font size
    this.addContent('/' + this._font.id + ' ' + PDFObject.number(this._fontSize) + ' Tf');

    // rendering mode
    var mode = options.fill && options.stroke ? 2 : options.stroke ? 1 : 0;
    if (mode) {
      this.addContent(mode + ' Tr');
    }

    // Character spacing
    if (options.characterSpacing) {
      this.addContent(PDFObject.number(options.characterSpacing) + ' Tc');
    }

    var scale = this._fontSize / 1000;
    var commands = [];
    var last = 0;
    var hadOffset = false;

    // Adds a segment of text to the TJ command buffer
    var addSegment = function addSegment(cur) {
      if (last < cur) {
        var hex = encoded.slice(last, cur).join('');
        var advance = positions[cur - 1].xAdvance - positions[cur - 1].advanceWidth;
        commands.push('<' + hex + '> ' + PDFObject.number(-advance));
      }

      return last = cur;
    };

    // Flushes the current TJ commands to the output stream
    var flush = function flush(i) {
      addSegment(i);

      if (commands.length > 0) {
        _this.addContent('[' + commands.join(' ') + '] TJ');
        return commands.length = 0;
      }
    };

    for (i = 0; i < positions.length; i++) {
      // If we have an x or y offset, we have to break out of the current TJ command
      // so we can move the text position.
      var pos = positions[i];
      if (pos.xOffset || pos.yOffset) {
        // Flush the current buffer
        flush(i);

        // Move the text position and flush just the current character
        this.addContent('1 0 0 1 ' + PDFObject.number(x + pos.xOffset * scale) + ' ' + PDFObject.number(y + pos.yOffset * scale) + ' Tm');
        flush(i + 1);

        hadOffset = true;
      } else {
        // If the last character had an offset, reset the text position
        if (hadOffset) {
          this.addContent('1 0 0 1 ' + PDFObject.number(x) + ' ' + PDFObject.number(y) + ' Tm');
          hadOffset = false;
        }

        // Group segments that don't have any advance adjustments
        if (pos.xAdvance - pos.advanceWidth !== 0) {
          addSegment(i + 1);
        }
      }

      x += pos.xAdvance * scale;
    }

    // Flush any remaining commands
    flush(i);

    // end the text object
    this.addContent('ET');

    // restore flipped coordinate system
    return this.restore();
  }
};

var Data = function () {
  function Data() {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    classCallCheck(this, Data);

    this.pos = 0;
    this.data = data;
    this.length = this.data.length;
  }

  createClass(Data, [{
    key: 'readByte',
    value: function readByte() {
      return this.data[this.pos++];
    }
  }, {
    key: 'writeByte',
    value: function writeByte(byte) {
      return this.data[this.pos++] = byte;
    }
  }, {
    key: 'byteAt',
    value: function byteAt(index) {
      return this.data[index];
    }
  }, {
    key: 'readBool',
    value: function readBool() {
      return !!this.readByte();
    }
  }, {
    key: 'writeBool',
    value: function writeBool(val) {
      return this.writeByte(val ? 1 : 0);
    }
  }, {
    key: 'readUInt32',
    value: function readUInt32() {
      var b1 = this.readByte() * 0x1000000;
      var b2 = this.readByte() << 16;
      var b3 = this.readByte() << 8;
      var b4 = this.readByte();
      return b1 + b2 + b3 + b4;
    }
  }, {
    key: 'writeUInt32',
    value: function writeUInt32(val) {
      this.writeByte(val >>> 24 & 0xff);
      this.writeByte(val >> 16 & 0xff);
      this.writeByte(val >> 8 & 0xff);
      return this.writeByte(val & 0xff);
    }
  }, {
    key: 'readInt32',
    value: function readInt32() {
      var int = this.readUInt32();

      if (int >= 0x80000000) {
        return int - 0x100000000;
      }

      return int;
    }
  }, {
    key: 'writeInt32',
    value: function writeInt32(val) {
      if (val < 0) {
        val += 0x100000000;
      }
      return this.writeUInt32(val);
    }
  }, {
    key: 'readUInt16',
    value: function readUInt16() {
      var b1 = this.readByte() << 8;
      var b2 = this.readByte();
      return b1 | b2;
    }
  }, {
    key: 'writeUInt16',
    value: function writeUInt16(val) {
      this.writeByte(val >> 8 & 0xff);
      return this.writeByte(val & 0xff);
    }
  }, {
    key: 'readInt16',
    value: function readInt16() {
      var int = this.readUInt16();
      if (int >= 0x8000) {
        return int - 0x10000;
      }
      return int;
    }
  }, {
    key: 'writeInt16',
    value: function writeInt16(val) {
      if (val < 0) {
        val += 0x10000;
      }
      return this.writeUInt16(val);
    }
  }, {
    key: 'readString',
    value: function readString(length) {
      var ret = [];
      for (var i = 0, end = length, asc = 0 <= end; asc ? i < end : i > end; asc ? i++ : i--) {
        ret[i] = String.fromCharCode(this.readByte());
      }

      return ret.join('');
    }
  }, {
    key: 'writeString',
    value: function writeString(val) {
      var _this = this;

      return range(0, val.length, false).map(function (i) {
        return _this.writeByte(val.charCodeAt(i));
      });
    }
  }, {
    key: 'stringAt',
    value: function stringAt(pos, length) {
      this.pos = pos;
      return this.readString(length);
    }
  }, {
    key: 'readShort',
    value: function readShort() {
      return this.readInt16();
    }
  }, {
    key: 'writeShort',
    value: function writeShort(val) {
      return this.writeInt16(val);
    }
  }, {
    key: 'readLongLong',
    value: function readLongLong() {
      var b1 = this.readByte();
      var b2 = this.readByte();
      var b3 = this.readByte();
      var b4 = this.readByte();
      var b5 = this.readByte();
      var b6 = this.readByte();
      var b7 = this.readByte();
      var b8 = this.readByte();

      if (b1 & 0x80) {
        // sign -> avoid overflow
        return ((b1 ^ 0xff) * 0x100000000000000 + (b2 ^ 0xff) * 0x1000000000000 + (b3 ^ 0xff) * 0x10000000000 + (b4 ^ 0xff) * 0x100000000 + (b5 ^ 0xff) * 0x1000000 + (b6 ^ 0xff) * 0x10000 + (b7 ^ 0xff) * 0x100 + (b8 ^ 0xff) + 1) * -1;
      }

      return b1 * 0x100000000000000 + b2 * 0x1000000000000 + b3 * 0x10000000000 + b4 * 0x100000000 + b5 * 0x1000000 + b6 * 0x10000 + b7 * 0x100 + b8;
    }
  }, {
    key: 'writeLongLong',
    value: function writeLongLong(val) {
      var high = Math.floor(val / 0x100000000);
      var low = val & 0xffffffff;
      this.writeByte(high >> 24 & 0xff);
      this.writeByte(high >> 16 & 0xff);
      this.writeByte(high >> 8 & 0xff);
      this.writeByte(high & 0xff);
      this.writeByte(low >> 24 & 0xff);
      this.writeByte(low >> 16 & 0xff);
      this.writeByte(low >> 8 & 0xff);
      return this.writeByte(low & 0xff);
    }
  }, {
    key: 'readInt',
    value: function readInt() {
      return this.readInt32();
    }
  }, {
    key: 'writeInt',
    value: function writeInt(val) {
      return this.writeInt32(val);
    }
  }, {
    key: 'slice',
    value: function slice(start, end) {
      return this.data.slice(start, end);
    }
  }, {
    key: 'read',
    value: function read(bytes) {
      var buf = [];
      for (var i = 0, end = bytes, asc = 0 <= end; asc ? i < end : i > end; asc ? i++ : i--) {
        buf.push(this.readByte());
      }

      return buf;
    }
  }, {
    key: 'write',
    value: function write(bytes) {
      var _this2 = this;

      return Array.from(bytes).map(function (byte) {
        return _this2.writeByte(byte);
      });
    }
  }]);
  return Data;
}();

var MARKERS = [0xffc0, 0xffc1, 0xffc2, 0xffc3, 0xffc5, 0xffc6, 0xffc7, 0xffc8, 0xffc9, 0xffca, 0xffcb, 0xffcc, 0xffcd, 0xffce, 0xffcf];

var JPEG = function () {
  function JPEG(data, label) {
    classCallCheck(this, JPEG);

    var marker = void 0;
    this.data = data;
    this.label = label;

    if (this.data.readUInt16BE(0) !== 0xffd8) {
      throw 'SOI not found in JPEG';
    }

    var pos = 2;
    while (pos < this.data.length) {
      marker = this.data.readUInt16BE(pos);
      pos += 2;
      if (Array.from(MARKERS).includes(marker)) {
        break;
      }
      pos += this.data.readUInt16BE(pos);
    }

    if (!Array.from(MARKERS).includes(marker)) {
      throw 'Invalid JPEG.';
    }
    pos += 2;

    this.bits = this.data[pos++];
    this.height = this.data.readUInt16BE(pos);
    pos += 2;

    this.width = this.data.readUInt16BE(pos);
    pos += 2;

    var channels = this.data[pos++];
    this.colorSpace = function () {
      switch (channels) {
        case 1:
          return 'DeviceGray';
        case 3:
          return 'DeviceRGB';
        case 4:
          return 'DeviceCMYK';
      }
    }();

    this.obj = null;
  }

  createClass(JPEG, [{
    key: 'embed',
    value: function embed(document) {
      if (this.obj) {
        return;
      }

      this.obj = document.ref({
        Type: 'XObject',
        Subtype: 'Image',
        BitsPerComponent: this.bits,
        Width: this.width,
        Height: this.height,
        ColorSpace: this.colorSpace,
        Filter: 'DCTDecode'
      });

      // add extra decode params for CMYK images. By swapping the
      // min and max values from the default, we invert the colors. See
      // section 4.8.4 of the spec.
      if (this.colorSpace === 'DeviceCMYK') {
        this.obj.data['Decode'] = [1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0];
      }

      this.obj.end(this.data);

      // free memory
      return this.data = null;
    }
  }]);
  return JPEG;
}();

var PNGImage = function () {
  function PNGImage(data, label) {
    classCallCheck(this, PNGImage);

    this.label = label;
    this.image = new PNG(data);
    this.width = this.image.width;
    this.height = this.image.height;
    this.imgData = this.image.imgData;
    this.obj = null;
  }

  createClass(PNGImage, [{
    key: 'embed',
    value: function embed(document) {
      this.document = document;
      if (this.obj) {
        return;
      }

      this.obj = this.document.ref({
        Type: 'XObject',
        Subtype: 'Image',
        BitsPerComponent: this.image.bits,
        Width: this.width,
        Height: this.height,
        Filter: 'FlateDecode'
      });

      if (!this.image.hasAlphaChannel) {
        var params = this.document.ref({
          Predictor: 15,
          Colors: this.image.colors,
          BitsPerComponent: this.image.bits,
          Columns: this.width
        });

        this.obj.data['DecodeParms'] = params;
        params.end();
      }

      if (this.image.palette.length === 0) {
        this.obj.data['ColorSpace'] = this.image.colorSpace;
      } else {
        // embed the color palette in the PDF as an object stream
        var palette = this.document.ref();
        palette.end(new Buffer(this.image.palette));

        // build the color space array for the image
        this.obj.data['ColorSpace'] = ['Indexed', 'DeviceRGB', this.image.palette.length / 3 - 1, palette];
      }

      // For PNG color types 0, 2 and 3, the transparency data is stored in
      // a dedicated PNG chunk.
      if (this.image.transparency.grayscale) {
        // Use Color Key Masking (spec section 4.8.5)
        // An array with N elements, where N is two times the number of color components.
        var val = this.image.transparency.greyscale;
        return this.obj.data['Mask'] = [val, val];
      } else if (this.image.transparency.rgb) {
        // Use Color Key Masking (spec section 4.8.5)
        // An array with N elements, where N is two times the number of color components.
        var rgb = this.image.transparency.rgb;

        var mask = [];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = Array.from(rgb)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var x = _step.value;

            mask.push(x, x);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        return this.obj.data['Mask'] = mask;
      } else if (this.image.transparency.indexed) {
        // Create a transparency SMask for the image based on the data
        // in the PLTE and tRNS sections. See below for details on SMasks.
        return this.loadIndexedAlphaChannel();
      } else if (this.image.hasAlphaChannel) {
        // For PNG color types 4 and 6, the transparency data is stored as a alpha
        // channel mixed in with the main image data. Separate this data out into an
        // SMask object and store it separately in the PDF.
        return this.splitAlphaChannel();
      } else {
        return this.finalize();
      }
    }
  }, {
    key: 'finalize',
    value: function finalize() {
      if (this.alphaChannel) {
        var sMask = this.document.ref({
          Type: 'XObject',
          Subtype: 'Image',
          Height: this.height,
          Width: this.width,
          BitsPerComponent: 8,
          Filter: 'FlateDecode',
          ColorSpace: 'DeviceGray',
          Decode: [0, 1]
        });

        sMask.end(this.alphaChannel);
        this.obj.data['SMask'] = sMask;
      }

      // add the actual image data
      this.obj.end(this.imgData);

      // free memory
      this.image = null;
      return this.imgData = null;
    }
  }, {
    key: 'splitAlphaChannel',
    value: function splitAlphaChannel() {
      var _this = this;

      return this.image.decodePixels(function (pixels) {
        var a = void 0,
            p = void 0;
        var colorByteSize = _this.image.colors * _this.image.bits / 8;
        var pixelCount = _this.width * _this.height;
        var imgData = new Buffer(pixelCount * colorByteSize);
        var alphaChannel = new Buffer(pixelCount);

        var i = p = a = 0;
        var len = pixels.length;
        while (i < len) {
          imgData[p++] = pixels[i++];
          imgData[p++] = pixels[i++];
          imgData[p++] = pixels[i++];
          alphaChannel[a++] = pixels[i++];
        }

        var done = 0;
        zlib.deflate(imgData, function (err, imgData1) {
          _this.imgData = imgData1;
          if (err) {
            throw err;
          }
          if (++done === 2) {
            return _this.finalize();
          }
        });

        return zlib.deflate(alphaChannel, function (err, alphaChannel1) {
          _this.alphaChannel = alphaChannel1;
          if (err) {
            throw err;
          }
          if (++done === 2) {
            return _this.finalize();
          }
        });
      });
    }
  }, {
    key: 'loadIndexedAlphaChannel',
    value: function loadIndexedAlphaChannel(fn) {
      var _this2 = this;

      var transparency = this.image.transparency.indexed;
      return this.image.decodePixels(function (pixels) {
        var alphaChannel = new Buffer(_this2.width * _this2.height);

        var i = 0;
        for (var j = 0, end = pixels.length; j < end; j++) {
          alphaChannel[i++] = transparency[pixels[j]];
        }

        return zlib.deflate(alphaChannel, function (err, alphaChannel1) {
          _this2.alphaChannel = alphaChannel1;
          if (err) {
            throw err;
          }
          return _this2.finalize();
        });
      });
    }
  }]);
  return PNGImage;
}();

var PDFImage = function () {
  function PDFImage() {
    classCallCheck(this, PDFImage);
  }

  createClass(PDFImage, null, [{
    key: 'open',
    value: function open(src, label) {
      var data = void 0;
      if (Buffer.isBuffer(src)) {
        data = src;
      } else if (src instanceof ArrayBuffer) {
        data = new Buffer(new Uint8Array(src));
      } else {
        var match = /^data:.+;base64,(.*)$/.exec(src);
        if (match) {
          data = new Buffer(match[1], 'base64');
        } else {}
      }

      if (data[0] === 0xff && data[1] === 0xd8) {
        return new JPEG(data, label);
      } else if (data[0] === 0x89 && data.toString('ascii', 1, 4) === 'PNG') {
        return new PNGImage(data, label);
      } else {
        throw new Error('Unknown image format.');
      }
    }
  }]);
  return PDFImage;
}();

var Images = {
  initImages: function initImages() {
    this._imageRegistry = {};
    return this._imageCount = 0;
  },
  image: function image(src, x, y, options) {
    var bh = void 0,
        bp = void 0,
        bw = void 0,
        image = void 0,
        ip = void 0,
        left = void 0,
        left1 = void 0;
    if (options == null) {
      options = {};
    }
    if ((typeof x === 'undefined' ? 'undefined' : _typeof(x)) === 'object') {
      options = x;
      x = null;
    }

    x = (left = x != null ? x : options.x) != null ? left : this.x;
    y = (left1 = y != null ? y : options.y) != null ? left1 : this.y;

    if (typeof src === 'string') {
      image = this._imageRegistry[src];
    }

    if (!image) {
      if (src.width && src.height) {
        image = src;
      } else {
        image = this.openImage(src);
      }
    }

    if (!image.obj) {
      image.embed(this);
    }

    if (this.page.xobjects[image.label] == null) {
      this.page.xobjects[image.label] = image.obj;
    }

    var w = options.width || image.width;
    var h = options.height || image.height;

    if (options.width && !options.height) {
      var wp = w / image.width;
      w = image.width * wp;
      h = image.height * wp;
    } else if (options.height && !options.width) {
      var hp = h / image.height;
      w = image.width * hp;
      h = image.height * hp;
    } else if (options.scale) {
      w = image.width * options.scale;
      h = image.height * options.scale;
    } else if (options.fit) {
      var _Array$from = Array.from(options.fit);

      var _Array$from2 = slicedToArray(_Array$from, 2);

      bw = _Array$from2[0];
      bh = _Array$from2[1];

      bp = bw / bh;
      ip = image.width / image.height;
      if (ip > bp) {
        w = bw;
        h = bw / ip;
      } else {
        h = bh;
        w = bh * ip;
      }
    } else if (options.cover) {
      var _Array$from3 = Array.from(options.cover);

      var _Array$from4 = slicedToArray(_Array$from3, 2);

      bw = _Array$from4[0];
      bh = _Array$from4[1];

      bp = bw / bh;
      ip = image.width / image.height;
      if (ip > bp) {
        h = bh;
        w = bh * ip;
      } else {
        w = bw;
        h = bw / ip;
      }
    }

    if (options.fit || options.cover) {
      if (options.align === 'center') {
        x = x + bw / 2 - w / 2;
      } else if (options.align === 'right') {
        x = x + bw - w;
      }

      if (options.valign === 'center') {
        y = y + bh / 2 - h / 2;
      } else if (options.valign === 'bottom') {
        y = y + bh - h;
      }
    }

    // create link annotations if the link option is given
    if (options.link != null) {
      this.link(x, y, w, h, options.link);
    }
    if (options.goTo != null) {
      this.goTo(x, y, w, h, options.goTo);
    }
    if (options.destination != null) {
      this.addNamedDestination(options.destination, 'XYZ', x, y, null);
    }

    // Set the current y position to below the image if it is in the document flow
    if (this.y === y) {
      this.y += h;
    }

    this.save();
    this.transform(w, 0, 0, -h, x, y + h);
    this.addContent('/' + image.label + ' Do');
    this.restore();

    return this;
  },
  openImage: function openImage(src) {
    var image = void 0;
    if (typeof src === 'string') {
      image = this._imageRegistry[src];
    }

    if (!image) {
      image = PDFImage.open(src, 'I' + ++this._imageCount);
      if (typeof src === 'string') {
        this._imageRegistry[src] = image;
      }
    }

    return image;
  }
};

var Annotations = {
  annotate: function annotate(x, y, w, h, options) {
    options.Type = 'Annot';
    options.Rect = this._convertRect(x, y, w, h);
    options.Border = [0, 0, 0];
    if (options.Subtype !== 'Link') {
      if (options.C == null) {
        options.C = this._normalizeColor(options.color || [0, 0, 0]);
      }
    } // convert colors
    delete options.color;

    if (typeof options.Dest === 'string') {
      options.Dest = new String(options.Dest);
    }

    // Capitalize keys
    for (var key in options) {
      var val = options[key];
      options[key[0].toUpperCase() + key.slice(1)] = val;
    }

    var ref = this.ref(options);
    this.page.annotations.push(ref);
    ref.end();
    return this;
  },
  note: function note(x, y, w, h, contents, options) {
    if (options == null) {
      options = {};
    }
    options.Subtype = 'Text';
    options.Contents = new String(contents);
    options.Name = 'Comment';
    if (options.color == null) {
      options.color = [243, 223, 92];
    }
    return this.annotate(x, y, w, h, options);
  },
  goTo: function goTo(x, y, w, h, name, options) {
    if (options == null) {
      options = {};
    }
    options.Subtype = 'Link';
    options.A = this.ref({
      S: 'GoTo',
      D: new String(name)
    });
    options.A.end();
    return this.annotate(x, y, w, h, options);
  },
  link: function link(x, y, w, h, url, options) {
    if (options == null) {
      options = {};
    }
    options.Subtype = 'Link';

    if (typeof url === 'number') {
      // Link to a page in the document (the page must already exist)
      var pages = this._root.data.Pages.data;
      if (url >= 0 && url < pages.Kids.length) {
        options.A = this.ref({
          S: 'GoTo',
          D: [pages.Kids[url], 'XYZ', null, null, null]
        });
        options.A.end();
      } else {
        throw new Error('The document has no page ' + url);
      }
    } else {
      // Link to an external url
      options.A = this.ref({
        S: 'URI',
        URI: new String(url)
      });
      options.A.end();
    }

    return this.annotate(x, y, w, h, options);
  },
  _markup: function _markup(x, y, w, h, options) {
    if (options == null) {
      options = {};
    }

    var _Array$from = Array.from(this._convertRect(x, y, w, h)),
        _Array$from2 = slicedToArray(_Array$from, 4),
        x1 = _Array$from2[0],
        y1 = _Array$from2[1],
        x2 = _Array$from2[2],
        y2 = _Array$from2[3];

    options.QuadPoints = [x1, y2, x2, y2, x1, y1, x2, y1];
    options.Contents = new String();
    return this.annotate(x, y, w, h, options);
  },
  highlight: function highlight(x, y, w, h, options) {
    if (options == null) {
      options = {};
    }
    options.Subtype = 'Highlight';
    if (options.color == null) {
      options.color = [241, 238, 148];
    }
    return this._markup(x, y, w, h, options);
  },
  underline: function underline(x, y, w, h, options) {
    if (options == null) {
      options = {};
    }
    options.Subtype = 'Underline';
    return this._markup(x, y, w, h, options);
  },
  strike: function strike(x, y, w, h, options) {
    if (options == null) {
      options = {};
    }
    options.Subtype = 'StrikeOut';
    return this._markup(x, y, w, h, options);
  },
  lineAnnotation: function lineAnnotation(x1, y1, x2, y2, options) {
    if (options == null) {
      options = {};
    }
    options.Subtype = 'Line';
    options.Contents = new String();
    options.L = [x1, this.page.height - y1, x2, this.page.height - y2];
    return this.annotate(x1, y1, x2, y2, options);
  },
  rectAnnotation: function rectAnnotation(x, y, w, h, options) {
    if (options == null) {
      options = {};
    }
    options.Subtype = 'Square';
    options.Contents = new String();
    return this.annotate(x, y, w, h, options);
  },
  ellipseAnnotation: function ellipseAnnotation(x, y, w, h, options) {
    if (options == null) {
      options = {};
    }
    options.Subtype = 'Circle';
    options.Contents = new String();
    return this.annotate(x, y, w, h, options);
  },
  textAnnotation: function textAnnotation(x, y, w, h, text, options) {
    if (options == null) {
      options = {};
    }
    options.Subtype = 'FreeText';
    options.Contents = new String(text);
    options.DA = new String();
    return this.annotate(x, y, w, h, options);
  },
  _convertRect: function _convertRect(x1, y1, w, h) {
    // flip y1 and y2
    var y2 = y1;
    y1 += h;

    // make x2
    var x2 = x1 + w;

    // apply current transformation matrix to points

    var _Array$from3 = Array.from(this._ctm),
        _Array$from4 = slicedToArray(_Array$from3, 6),
        m0 = _Array$from4[0],
        m1 = _Array$from4[1],
        m2 = _Array$from4[2],
        m3 = _Array$from4[3],
        m4 = _Array$from4[4],
        m5 = _Array$from4[5];

    x1 = m0 * x1 + m2 * y1 + m4;
    y1 = m1 * x1 + m3 * y1 + m5;
    x2 = m0 * x2 + m2 * y2 + m4;
    y2 = m1 * x2 + m3 * y2 + m5;

    return [x1, y1, x2, y2];
  }
};

var PDFDocument$1 = function (_stream$Readable) {
  inherits(PDFDocument, _stream$Readable);

  function PDFDocument() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, PDFDocument);

    var _this = possibleConstructorReturn(this, (PDFDocument.__proto__ || Object.getPrototypeOf(PDFDocument)).call(this));

    _this.options = options;
    _this.version = 1.3;
    _this.compress = true;
    _this._pageBuffer = [];
    _this._pageBufferStart = 0;

    // The PDF object store
    _this._offsets = [];
    _this._waiting = 0;
    _this._ended = false;
    _this._offset = 0;

    var Names = _this.ref({
      Dests: new PDFNameTree()
    });

    var Lang = _this.options.lang || 'en-US';

    _this._root = _this.ref({
      Type: 'Catalog',
      Pages: _this.ref({
        Type: 'Pages',
        Count: 0,
        Kids: []
      }),
      Names: Names,
      Lang: Lang
    });

    // The current page
    _this.page = null;

    // Initialize mixins
    _this.initColor();
    _this.initVector();
    _this.initFonts();
    _this.initText();
    _this.initImages();

    // Initialize the metadata
    _this.info = {
      Producer: 'PDFKit',
      Creator: 'PDFKit',
      CreationDate: new Date()
    };

    if (_this.options.info) {
      for (var key in _this.options.info) {
        var val = _this.options.info[key];
        _this.info[key] = val;
      }
    }

    // Write the header PDF version
    _this._write('%PDF-' + _this.version);

    // 4 binary chars, as recommended by the spec
    _this._write('%\xFF\xFF\xFF\xFF');

    // Add the first page
    if (_this.options.autoFirstPage !== false) {
      _this.addPage();
    }
    return _this;
  }

  createClass(PDFDocument, [{
    key: 'addPage',
    value: function addPage(options) {
      // end the current page if needed
      if (options == null) {
        options = this.options;
      }

      if (!this.options.bufferPages) {
        this.flushPages();
      }

      // create a page object
      this.page = new PDFPage(this, options);
      this._pageBuffer.push(this.page);

      // add the page to the object store
      var pages = this._root.data.Pages.data;
      pages.Kids.push(this.page.dictionary);
      pages.Count++;

      // flip PDF coordinate system so that the origin is in
      // the top left rather than the bottom left
      this._ctm = [1, 0, 0, 1, 0, 0];
      this.transform(1, 0, 0, -1, 0, this.page.height);

      return this;
    }
  }, {
    key: 'flushPages',
    value: function flushPages() {
      // this local variable exists so we're future-proof against
      // reentrant calls to flushPages.
      var pages = this._pageBuffer;
      this._pageBuffer = [];
      this._pageBufferStart += pages.length;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = Array.from(pages)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var page = _step.value;

          page.end();
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: 'addNamedDestination',
    value: function addNamedDestination(name) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      if (args.length === 0) {
        args = ['XYZ', null, null, null];
      }
      if (args[0] === 'XYZ' && args[2] !== null) {
        args[2] = this.page.height - args[2];
      }
      args.unshift(this.page.dictionary);
      this._root.data.Names.data.Dests.add(name, args);
    }
  }, {
    key: 'ref',
    value: function ref(data) {
      var ref = new PDFReference(this, this._offsets.length + 1, data);
      this._offsets.push(null); // placeholder for this object's offset once it is finalized
      this._waiting++;
      return ref;
    }
  }, {
    key: '_read',
    value: function _read() {
      // do nothing, but this method is required by node
    }
  }, {
    key: '_write',
    value: function _write(data) {
      if (!Buffer.isBuffer(data)) {
        data = new Buffer(data + '\n', 'binary');
      }

      this.push(data);
      return this._offset += data.length;
    }
  }, {
    key: 'addContent',
    value: function addContent(data) {
      this.page.write(data);
      return this;
    }
  }, {
    key: '_refEnd',
    value: function _refEnd(ref) {
      this._offsets[ref.id - 1] = ref.offset;
      if (--this._waiting === 0 && this._ended) {
        this._finalize();
        return this._ended = false;
      }
    }
  }, {
    key: 'end',
    value: function end() {
      this.flushPages();
      this._info = this.ref();
      for (var key in this.info) {
        var val = this.info[key];
        if (typeof val === 'string') {
          val = new String(val);
        }

        this._info.data[key] = val;
      }

      this._info.end();

      for (var name in this._fontFamilies) {
        var font = this._fontFamilies[name];
        font.finalize();
      }

      this._root.end();
      this._root.data.Pages.end();
      this._root.data.Names.end();

      if (this._waiting === 0) {
        return this._finalize();
      } else {
        return this._ended = true;
      }
    }
  }, {
    key: '_finalize',
    value: function _finalize(fn) {
      // generate xref
      var xRefOffset = this._offset;
      this._write('xref');
      this._write('0 ' + (this._offsets.length + 1));
      this._write('0000000000 65535 f ');

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = Array.from(this._offsets)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var offset = _step2.value;

          offset = ('0000000000' + offset).slice(-10);
          this._write(offset + ' 00000 n ');
        }

        // trailer
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      this._write('trailer');
      this._write(PDFObject.convert({
        Size: this._offsets.length + 1,
        Root: this._root,
        Info: this._info
      }));

      this._write('startxref');
      this._write('' + xRefOffset);
      this._write('%%EOF');

      // end the stream
      return this.push(null);
    }
  }, {
    key: 'toString',
    value: function toString() {
      return '[object PDFDocument]';
    }
  }]);
  return PDFDocument;
}(stream.Readable);

var mixin = function mixin(methods) {
  return function () {
    var result = [];
    for (var name in methods) {
      var method = methods[name];
      result.push(PDFDocument$1.prototype[name] = method);
    }
    return result;
  }();
};

// Load mixins
mixin(Color);
mixin(Vector);
mixin(Fonts);
mixin(Text);
mixin(Images);
mixin(Annotations);

exports['default'] = PDFDocument$1;
exports.PDFFont = PDFFont;
exports.StandardFont = StandardFont;
exports.EmbeddedFont = EmbeddedFont;
