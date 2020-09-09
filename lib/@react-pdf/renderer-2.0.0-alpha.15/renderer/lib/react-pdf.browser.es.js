import _extends from '@babel/runtime/helpers/extends';
import _objectWithoutPropertiesLoose from '@babel/runtime/helpers/objectWithoutPropertiesLoose';
import _inheritsLoose from '@babel/runtime/helpers/inheritsLoose';
import React from 'react';
import * as primitives from '@react-pdf/primitives';
export * from '@react-pdf/primitives';
import _regeneratorRuntime from '@babel/runtime/regenerator';
import _asyncToGenerator from '@babel/runtime/helpers/asyncToGenerator';
import BlobStream from 'blob-stream';
import FontStore from '@react-pdf/font';
import renderPDF from '@react-pdf/render';
import PDFDocument from '@react-pdf/pdfkit';
import layoutDocument from '@react-pdf/layout';
import ReactFiberReconciler from 'react-reconciler';
import { unstable_scheduleCallback, unstable_cancelCallback } from 'scheduler';

/* eslint-disable no-continue */

/**
 * Checks if two sets of props are equal (recursively)
 *
 * @param {Object} props A
 * @param {Object} props B
 * @returns {Boolean} props equals?
 *
 */
var propsEqual = function propsEqual(a, b) {
  var oldPropsKeys = Object.keys(a);
  var newPropsKeys = Object.keys(b);

  if (oldPropsKeys.length !== newPropsKeys.length) {
    return false;
  }

  for (var i = 0; i < oldPropsKeys.length; i += 1) {
    var propName = oldPropsKeys[i];

    if (propName === 'render' && !a[propName] !== !b[propName]) {
      return false;
    }

    if (propName !== 'children' && a[propName] !== b[propName]) {
      if (typeof a[propName] === 'object' && typeof b[propName] === 'object' && propsEqual(a[propName], b[propName])) {
        continue;
      }

      return false;
    }

    if (propName === 'children' && (typeof a[propName] === 'string' || typeof b[propName] === 'string')) {
      return a[propName] === b[propName];
    }
  }

  return true;
};

var emptyObject = {};

var createRenderer = function createRenderer(_ref) {
  var _ref$onChange = _ref.onChange,
      onChange = _ref$onChange === void 0 ? function () {} : _ref$onChange;
  return ReactFiberReconciler({
    schedulePassiveEffects: unstable_scheduleCallback,
    cancelPassiveEffects: unstable_cancelCallback,
    supportsMutation: true,
    isPrimaryRenderer: false,
    warnsIfNotActing: false,
    appendInitialChild: function appendInitialChild(parentInstance, child) {
      parentInstance.children.push(child);
    },
    createInstance: function createInstance(type, _ref2) {
      var style = _ref2.style,
          children = _ref2.children,
          props = _objectWithoutPropertiesLoose(_ref2, ["style", "children"]);

      return {
        type: type,
        box: {},
        style: style || {},
        props: props || {},
        children: []
      };
    },
    createTextInstance: function createTextInstance(text, rootContainerInstance) {
      return {
        type: 'TEXT_INSTANCE',
        value: text
      };
    },
    finalizeInitialChildren: function finalizeInitialChildren(element, type, props) {
      return false;
    },
    getPublicInstance: function getPublicInstance(instance) {
      return instance;
    },
    prepareForCommit: function prepareForCommit() {// Noop
    },
    prepareUpdate: function prepareUpdate(element, type, oldProps, newProps) {
      return !propsEqual(oldProps, newProps);
    },
    resetAfterCommit: onChange,
    resetTextContent: function resetTextContent(element) {// Noop
    },
    getRootHostContext: function getRootHostContext() {
      return emptyObject;
    },
    getChildHostContext: function getChildHostContext() {
      return emptyObject;
    },
    shouldSetTextContent: function shouldSetTextContent(type, props) {
      return false;
    },
    now: Date.now,
    useSyncScheduling: true,
    appendChild: function appendChild(parentInstance, child) {
      parentInstance.children.push(child);
    },
    appendChildToContainer: function appendChildToContainer(parentInstance, child) {
      if (parentInstance.type === 'ROOT') {
        parentInstance.document = child;
      } else {
        parentInstance.children.push(child);
      }
    },
    insertBefore: function insertBefore(parentInstance, child, beforeChild) {
      var index = parentInstance.children.indexOf(beforeChild);
      if (index !== -1 && child) parentInstance.children.splice(index, 0, child);
    },
    removeChild: function removeChild(parentInstance, child) {
      var index = parentInstance.children.indexOf(child);
      if (index !== -1) parentInstance.children.splice(index, 1);
    },
    removeChildFromContainer: function removeChildFromContainer(parentInstance, child) {
      var index = parentInstance.children.indexOf(child);
      if (index !== -1) parentInstance.children.splice(index, 1);
    },
    commitTextUpdate: function commitTextUpdate(textInstance, oldText, newText) {
      textInstance.value = newText;
    },
    commitUpdate: function commitUpdate(instance, updatePayload, type, oldProps, newProps) {
      var style = newProps.style,
          props = _objectWithoutPropertiesLoose(newProps, ["style"]);

      instance.props = props;
      instance.style = style;
    }
  });
};

var version = "2.0.0-alpha.15";

var fontStore = new FontStore();

var pdf = function pdf(_ref) {
  var initialValue = _ref.initialValue,
      onChange = _ref.onChange;
  var container = {
    type: 'ROOT',
    document: null,
    lang: 'en-US'
  };
  var PDFRenderer = createRenderer({
    onChange: onChange
  });
  var mountNode = PDFRenderer.createContainer(container);

  var updateContainer = function updateContainer(doc) {
    PDFRenderer.updateContainer(doc, mountNode, null);
  };

  if (initialValue) updateContainer(initialValue);

  var getLang = function getLang() {
    var document = container.document;
    return document.props ? document.props.lang : null;
  };

  var render = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
      var ctx, layout;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              ctx = new PDFDocument({
                autoFirstPage: false,
                lang: getLang()
              });
              _context.next = 3;
              return layoutDocument(container.document, fontStore);

            case 3:
              layout = _context.sent;
              return _context.abrupt("return", renderPDF(ctx, layout));

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function render() {
      return _ref2.apply(this, arguments);
    };
  }();

  var callOnRender = function callOnRender(params) {
    if (params === void 0) {
      params = {};
    }

    if (container.document.props.onRender) {
      container.document.props.onRender(params);
    }
  };

  var toBlob = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
      var instance, stream;
      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return render();

            case 2:
              instance = _context2.sent;
              stream = instance.pipe(BlobStream());
              return _context2.abrupt("return", new Promise(function (resolve, reject) {
                stream.on('finish', function () {
                  try {
                    var blob = stream.toBlob('application/pdf');
                    callOnRender({
                      blob: blob
                    });
                    resolve(blob);
                  } catch (error) {
                    reject(error);
                  }
                });
                stream.on('error', reject);
              }));

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function toBlob() {
      return _ref3.apply(this, arguments);
    };
  }();

  var toBuffer = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3() {
      return _regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              callOnRender();
              return _context3.abrupt("return", render());

            case 2:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function toBuffer() {
      return _ref4.apply(this, arguments);
    };
  }();

  var toString = /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4() {
      var result, instance;
      return _regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              result = '';
              _context4.next = 3;
              return render();

            case 3:
              instance = _context4.sent;
              return _context4.abrupt("return", new Promise(function (resolve, reject) {
                try {
                  instance.on('data', function (buffer) {
                    result += buffer;
                  });
                  instance.on('end', function () {
                    resolve(result);
                  });
                } catch (error) {
                  reject(error);
                }
              }));

            case 5:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    return function toString() {
      return _ref5.apply(this, arguments);
    };
  }();

  return {
    container: container,
    toBlob: toBlob,
    toBuffer: toBuffer,
    toString: toString,
    updateContainer: updateContainer
  };
};

var Font = fontStore;
var StyleSheet = {
  create: function create(s) {
    return s;
  }
};

var queue = require('queue');

var InternalBlobProvider = /*#__PURE__*/function (_React$PureComponent) {
  _inheritsLoose(InternalBlobProvider, _React$PureComponent);

  function InternalBlobProvider() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$PureComponent.call.apply(_React$PureComponent, [this].concat(args)) || this;
    _this.renderQueue = queue({
      autostart: true,
      concurrency: 1
    });
    _this.state = {
      blob: null,
      url: null,
      loading: true,
      error: null
    };

    _this.queueDocumentRender = function () {
      _this.renderQueue.splice(0, _this.renderQueue.length, function () {
        return _this.state.error ? Promise.resolve() : _this.instance.toBlob();
      });
    };

    _this.onRenderFailed = function (error) {
      _this.setState({
        error: error
      });

      console.error(error);
    };

    _this.onRenderSuccessful = function (blob) {
      var oldBlobUrl = _this.state.url;

      _this.setState({
        blob: blob,
        url: URL.createObjectURL(blob),
        loading: false
      }, function () {
        return URL.revokeObjectURL(oldBlobUrl);
      });
    };

    return _this;
  }

  var _proto = InternalBlobProvider.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.instance = pdf({
      onChange: this.queueDocumentRender
    });
    this.instance.updateContainer(this.props.document);
    this.renderQueue.on('error', this.onRenderFailed);
    this.renderQueue.on('success', this.onRenderSuccessful);
  };

  _proto.componentDidUpdate = function componentDidUpdate() {
    this.instance.updateContainer(this.props.document);
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.renderQueue.end();
  };

  _proto.render = function render() {
    return this.props.children(this.state);
  };

  return InternalBlobProvider;
}(React.PureComponent);

var BlobProvider = function BlobProvider(_ref) {
  var doc = _ref.document,
      children = _ref.children;

  if (!doc) {
    console.warn('You should pass a valid document to BlobProvider');
    return null;
  }

  return /*#__PURE__*/React.createElement(InternalBlobProvider, {
    document: doc
  }, children);
};
var PDFViewer = function PDFViewer(_ref2) {
  var className = _ref2.className,
      style = _ref2.style,
      title = _ref2.title,
      children = _ref2.children,
      innerRef = _ref2.innerRef,
      props = _objectWithoutPropertiesLoose(_ref2, ["className", "style", "title", "children", "innerRef"]);

  return /*#__PURE__*/React.createElement(InternalBlobProvider, {
    document: children
  }, function (_ref3) {
    var url = _ref3.url;
    return /*#__PURE__*/React.createElement("iframe", _extends({
      src: url,
      title: title,
      ref: innerRef,
      style: style,
      className: className
    }, props));
  });
};
var PDFDownloadLink = function PDFDownloadLink(_ref4) {
  var doc = _ref4.document,
      className = _ref4.className,
      style = _ref4.style,
      children = _ref4.children,
      _ref4$fileName = _ref4.fileName,
      fileName = _ref4$fileName === void 0 ? 'document.pdf' : _ref4$fileName;

  if (!doc) {
    console.warn('You should pass a valid document to PDFDownloadLink');
    return null;
  }

  var downloadOnIE = function downloadOnIE(blob) {
    return function () {
      if (window.navigator.msSaveBlob) {
        window.navigator.msSaveBlob(blob, fileName);
      }
    };
  };

  return /*#__PURE__*/React.createElement(InternalBlobProvider, {
    document: doc
  }, function (params) {
    return /*#__PURE__*/React.createElement("a", {
      style: style,
      href: params.url,
      download: fileName,
      className: className,
      onClick: downloadOnIE(params.blob)
    }, typeof children === 'function' ? children(params) : children);
  });
};

var throwEnvironmentError = function throwEnvironmentError(name) {
  throw new Error(name + " is a Node specific API. You're either using this method in a browser, or your bundler is not loading react-pdf from the appropriate web build.");
};

var renderToStream = function renderToStream() {
  throwEnvironmentError('renderToStream');
};
var renderToString = function renderToString() {
  throwEnvironmentError('renderToString');
};
var renderToFile = function renderToFile() {
  throwEnvironmentError('renderToFile');
};
var render = function render() {
  throwEnvironmentError('render');
};
var dom = _extends({
  pdf: pdf,
  Font: Font,
  version: version,
  StyleSheet: StyleSheet,
  PDFViewer: PDFViewer,
  BlobProvider: BlobProvider,
  PDFDownloadLink: PDFDownloadLink,
  renderToStream: renderToStream,
  renderToString: renderToString,
  renderToFile: renderToFile,
  render: render
}, primitives);

export default dom;
export { BlobProvider, Font, PDFDownloadLink, PDFViewer, StyleSheet, pdf, render, renderToFile, renderToStream, renderToString, version };
//# sourceMappingURL=react-pdf.browser.es.js.map
