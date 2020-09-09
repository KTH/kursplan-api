'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var fs = require('fs');
var primitives = require('@react-pdf/primitives');
var BlobStream = require('blob-stream');
var FontStore = require('@react-pdf/font');
var renderPDF = require('@react-pdf/render');
var PDFDocument = require('@react-pdf/pdfkit');
var layoutDocument = require('@react-pdf/layout');
var ReactFiberReconciler = require('react-reconciler');
var scheduler = require('scheduler');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
  if (e && e.__esModule) { return e; } else {
    var n = Object.create(null);
    if (e) {
      Object.keys(e).forEach(function (k) {
        if (k !== 'default') {
          var d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: function () {
              return e[k];
            }
          });
        }
      });
    }
    n['default'] = e;
    return Object.freeze(n);
  }
}

var fs__default = /*#__PURE__*/_interopDefaultLegacy(fs);
var primitives__namespace = /*#__PURE__*/_interopNamespace(primitives);
var BlobStream__default = /*#__PURE__*/_interopDefaultLegacy(BlobStream);
var FontStore__default = /*#__PURE__*/_interopDefaultLegacy(FontStore);
var renderPDF__default = /*#__PURE__*/_interopDefaultLegacy(renderPDF);
var PDFDocument__default = /*#__PURE__*/_interopDefaultLegacy(PDFDocument);
var layoutDocument__default = /*#__PURE__*/_interopDefaultLegacy(layoutDocument);
var ReactFiberReconciler__default = /*#__PURE__*/_interopDefaultLegacy(ReactFiberReconciler);

/* eslint-disable no-continue */

/**
 * Checks if two sets of props are equal (recursively)
 *
 * @param {Object} props A
 * @param {Object} props B
 * @returns {Boolean} props equals?
 *
 */
const propsEqual = (a, b) => {
  const oldPropsKeys = Object.keys(a);
  const newPropsKeys = Object.keys(b);

  if (oldPropsKeys.length !== newPropsKeys.length) {
    return false;
  }

  for (let i = 0; i < oldPropsKeys.length; i += 1) {
    const propName = oldPropsKeys[i];

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

/* eslint-disable no-unused-vars */
const emptyObject = {};

const createRenderer = ({
  onChange = () => {}
}) => {
  return ReactFiberReconciler__default['default']({
    schedulePassiveEffects: scheduler.unstable_scheduleCallback,
    cancelPassiveEffects: scheduler.unstable_cancelCallback,
    supportsMutation: true,
    isPrimaryRenderer: false,
    warnsIfNotActing: false,

    appendInitialChild(parentInstance, child) {
      parentInstance.children.push(child);
    },

    createInstance(type, {
      style,
      children,
      ...props
    }) {
      return {
        type,
        box: {},
        style: style || {},
        props: props || {},
        children: []
      };
    },

    createTextInstance(text, rootContainerInstance) {
      return {
        type: 'TEXT_INSTANCE',
        value: text
      };
    },

    finalizeInitialChildren(element, type, props) {
      return false;
    },

    getPublicInstance(instance) {
      return instance;
    },

    prepareForCommit() {// Noop
    },

    prepareUpdate(element, type, oldProps, newProps) {
      return !propsEqual(oldProps, newProps);
    },

    resetAfterCommit: onChange,

    resetTextContent(element) {// Noop
    },

    getRootHostContext() {
      return emptyObject;
    },

    getChildHostContext() {
      return emptyObject;
    },

    shouldSetTextContent(type, props) {
      return false;
    },

    now: Date.now,
    useSyncScheduling: true,

    appendChild(parentInstance, child) {
      parentInstance.children.push(child);
    },

    appendChildToContainer(parentInstance, child) {
      if (parentInstance.type === 'ROOT') {
        parentInstance.document = child;
      } else {
        parentInstance.children.push(child);
      }
    },

    insertBefore(parentInstance, child, beforeChild) {
      const index = parentInstance.children.indexOf(beforeChild);
      if (index !== -1 && child) parentInstance.children.splice(index, 0, child);
    },

    removeChild(parentInstance, child) {
      const index = parentInstance.children.indexOf(child);
      if (index !== -1) parentInstance.children.splice(index, 1);
    },

    removeChildFromContainer(parentInstance, child) {
      const index = parentInstance.children.indexOf(child);
      if (index !== -1) parentInstance.children.splice(index, 1);
    },

    commitTextUpdate(textInstance, oldText, newText) {
      textInstance.value = newText;
    },

    commitUpdate(instance, updatePayload, type, oldProps, newProps) {
      const {
        style,
        ...props
      } = newProps;
      instance.props = props;
      instance.style = style;
    }

  });
};

var version = "2.0.0-alpha.15";

const fontStore = new FontStore__default['default']();

const pdf = ({
  initialValue,
  onChange
}) => {
  const container = {
    type: 'ROOT',
    document: null,
    lang: 'en-US'
  };
  const PDFRenderer = createRenderer({
    onChange
  });
  const mountNode = PDFRenderer.createContainer(container);

  const updateContainer = doc => {
    PDFRenderer.updateContainer(doc, mountNode, null);
  };

  if (initialValue) updateContainer(initialValue);

  const getLang = () => {
    const {
      document
    } = container;
    return document.props ? document.props.lang : null;
  };

  const render = async () => {
    const ctx = new PDFDocument__default['default']({
      autoFirstPage: false,
      lang: getLang()
    });
    const layout = await layoutDocument__default['default'](container.document, fontStore);
    return renderPDF__default['default'](ctx, layout);
  };

  const callOnRender = (params = {}) => {
    if (container.document.props.onRender) {
      container.document.props.onRender(params);
    }
  };

  const toBlob = async () => {
    const instance = await render();
    const stream = instance.pipe(BlobStream__default['default']());
    return new Promise((resolve, reject) => {
      stream.on('finish', () => {
        try {
          const blob = stream.toBlob('application/pdf');
          callOnRender({
            blob
          });
          resolve(blob);
        } catch (error) {
          reject(error);
        }
      });
      stream.on('error', reject);
    });
  };

  const toBuffer = async () => {
    callOnRender();
    return render();
  };

  const toString = async () => {
    let result = '';
    const instance = await render();
    return new Promise((resolve, reject) => {
      try {
        instance.on('data', buffer => {
          result += buffer;
        });
        instance.on('end', () => {
          resolve(result);
        });
      } catch (error) {
        reject(error);
      }
    });
  };

  return {
    container,
    toBlob,
    toBuffer,
    toString,
    updateContainer
  };
};

const Font = fontStore;
const StyleSheet = {
  create: s => s
};

const renderToStream = async element => {
  const instance = pdf({
    initialValue: element
  });
  const buffer = await instance.toBuffer();
  return buffer;
};
const renderToString = element => {
  const instance = pdf({
    initialValue: element
  });
  return instance.toString();
};
const renderToFile = async (element, filePath, callback) => {
  const output = await renderToStream(element);
  const stream = fs__default['default'].createWriteStream(filePath);
  output.pipe(stream);
  return new Promise((resolve, reject) => {
    stream.on('finish', () => {
      if (callback) callback(output, filePath);
      resolve(output);
    });
    stream.on('error', reject);
  });
};

const throwEnvironmentError = name => {
  throw new Error(`${name} is a web specific API. You're either using this component on Node, or your bundler is not loading react-pdf from the appropriate web build.`);
};

const PDFViewer = () => {
  throwEnvironmentError('PDFViewer');
};
const PDFDownloadLink = () => {
  throwEnvironmentError('PDFDownloadLink');
};
const BlobProvider = () => {
  throwEnvironmentError('BlobProvider');
};
const render = renderToFile;
var node = {
  pdf,
  Font,
  version,
  StyleSheet,
  PDFViewer,
  BlobProvider,
  PDFDownloadLink,
  renderToStream,
  renderToString,
  renderToFile,
  render,
  ...primitives__namespace
};

Object.keys(primitives).forEach(function (k) {
  if (k !== 'default') Object.defineProperty(exports, k, {
    enumerable: true,
    get: function () {
      return primitives[k];
    }
  });
});
exports.BlobProvider = BlobProvider;
exports.Font = Font;
exports.PDFDownloadLink = PDFDownloadLink;
exports.PDFViewer = PDFViewer;
exports.StyleSheet = StyleSheet;
exports.default = node;
exports.pdf = pdf;
exports.render = render;
exports.renderToFile = renderToFile;
exports.renderToStream = renderToStream;
exports.renderToString = renderToString;
exports.version = version;
//# sourceMappingURL=react-pdf.cjs.js.map
