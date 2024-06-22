"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
exports.__esModule = true;
exports.extractMenuItem = exports.extractFields = exports.capitalize = exports.SwitchRoute = exports.Loading = void 0;
exports.getParameterByName = getParameterByName;
exports.getQuery = getQuery;
exports.getValue = getValue;
exports.merge = merge;
exports.routeLazy = void 0;
exports.toastMessage = toastMessage;
exports.updateValue = updateValue;
var _react = _interopRequireWildcard(require("react"));
var _reactBootstrap = require("react-bootstrap");
var _reactRouterDom = require("react-router-dom");
var _lodash = require("lodash");
var _reactToastify = require("react-toastify");
const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);
exports.capitalize = capitalize;
const extractFields = fields => (0, _lodash.reduce)(fields, (a, v, k) => {
  a[k] = v.value;
  return a;
}, {});
exports.extractFields = extractFields;
const extractMenuItem = (route, exclude = []) => Object.keys(route).reduce((a, t) => {
  if (!exclude.includes(t)) a[t] = capitalize(t);
  return a;
}, {});
exports.extractMenuItem = extractMenuItem;
const routeLazy = list => Object.entries(list).reduce((a, [key, value]) => {
  a[key] = (0, _react.lazy)(() => value);
  return a;
}, {});

/**
 * Call React.Suspense with "Loading..."" message
 * @param {children} param0 
 * @returns  
 */
exports.routeLazy = routeLazy;
const Loading = ({
  children
}) => /*#__PURE__*/_react.default.createElement(_react.Suspense, {
  fallback: /*#__PURE__*/_react.default.createElement("center", null, "Loading...")
}, children);
exports.Loading = Loading;
const DetailPage = ({
  children
}) => /*#__PURE__*/_react.default.createElement("div", {
  className: "detail-page"
}, /*#__PURE__*/_react.default.createElement("div", {
  className: "center"
}, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Button, {
  id: "ut-pop-close",
  onClick: () => window.history.back()
}, "Close")), children));
const SwitchRoute = ({
  route,
  defaultRoute,
  prefix: _prefix = '/',
  isBackGround: _isBackGround = false
}) => {
  if (_prefix !== '/') _prefix = '/' + _prefix.replace(/^\/|\/$/g, '') + '/';
  return /*#__PURE__*/_react.default.createElement(_reactRouterDom.Switch, null, defaultRoute ? /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    exact: true,
    path: "/"
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Redirect, {
    to: defaultRoute
  })) : null, Object.entries(route).map(([path, Elem]) => /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    key: 'key_' + path,
    path: _prefix + path,
    replace: true,
    render: routeProps => Elem.$$typeof && Elem.$$typeof == Symbol.for('react.lazy') ? /*#__PURE__*/_react.default.createElement(Loading, null, _isBackGround ? /*#__PURE__*/_react.default.createElement(DetailPage, routeProps, /*#__PURE__*/_react.default.createElement(Elem, routeProps)) : /*#__PURE__*/_react.default.createElement(Elem, routeProps)) : /*#__PURE__*/_react.default.createElement(Elem, routeProps)
  })));
};
exports.SwitchRoute = SwitchRoute;
function isObject(item) {
  return item && item.$$typeof === undefined && typeof item === 'object' && !Array.isArray(item);
}

/**
 * Deep merge two objects.
 * @param target
 * @param ...sources
 */

function merge(target, ...sources) {
  if (!sources.length) return target;
  const source = sources.shift();
  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, {
          [key]: {}
        });
        merge(target[key], source[key]);
      } else {
        Object.assign(target, {
          [key]: source[key]
        });
      }
    }
  }
  return merge(target, ...sources);
}
/**
 * Get URL parameter ?name=Value
 */
function getParameterByName(name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, '\\$&');
  let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
function updateValue(state, obj) {
  if (obj) for (const key of Object.keys(obj)) {
    if (typeof obj[key] == 'string' || typeof obj[key] == 'number') {
      if (!state[key]) state[key] = {};
      state[key].value = obj[key];
    } else if (obj[key] && typeof obj[key] == 'object') {
      if (!state[key]) state[key] = {};
      for (const key2 of Object.keys(obj[key])) {
        state[key][key2] = obj[key][key2];
      }
    }
  }
  return state;
}

/*  Convert
    { 'key': {
      'value': val
    }}
    to {
      'key': val
    }
*/

function getValue(obj) {
  let result = {};
  if (obj) for (const key of Object.keys(obj)) {
    result[key] = obj[key]['value'];
  }
  return result;
}

// Get URI query string
// Return - key:value pair object

function getQuery(location) {
  return location.search.slice(1).split('&').reduce((a, t) => {
    const [k, v] = t.split('=');
    a[k] = v;
    return a;
  }, {});
}
function toastMessage(message) {
  /*
  const type = {
      'info': { autoClose: 1500, hideProgressBar: true },
      'warn': {},
      'error': { autoClose: false }
  }*/
  const type = {
    'info': {
      autoClose: false,
      hideProgressBar: true,
      position: "top-right"
    },
    'warn': {
      autoClose: 3000,
      hideProgressBar: true
    },
    'error': {
      autoClose: 5000
    }
  };
  if ((0, _lodash.isString)(message)) _reactToastify.toast.warn(message, type.warn);else (0, _lodash.each)(type, (opt, tp) => {
    if ((0, _lodash.isArray)(message[tp])) message[tp].forEach(t => _reactToastify.toast[tp](t, opt));else if ((0, _lodash.isString)(message[tp])) _reactToastify.toast[tp](message[tp], opt);
  });
}