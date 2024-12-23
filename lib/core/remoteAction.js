"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
exports.__esModule = true;
exports.api = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _isomorphicFetch = _interopRequireDefault(require("isomorphic-fetch"));
var _util = require("./util");
//import { toast } from 'react-toastify'

const getUploadBody = action => {
  const formData = new FormData(),
    {
      ref,
      type,
      payload
    } = action;
  const files = payload.files || [];
  formData.append('ref', ref);
  formData.append('server', 'api');
  formData.append('type', type);
  for (let i in files) formData.append('file', files[i]);
  delete payload.files;
  formData.append('payload', JSON.stringify(payload));
  return formData;
};
const api = store => next => action => {
  switch (action.server) {
    case 'api':
      if (action.server === 'api') {
        action.payload = action.payload || {};
        const s = action.type;
        let headers, body, type;
        if (s.substring(s.lastIndexOf('/') + 1).match(/upload/)) {
          body = getUploadBody(action);
          headers = {}; // 'Content-Type': 'multipart/form-data' }
          type = 'upload';
        } else {
          body = JSON.stringify(action);
          headers = {
            'Content-Type': 'application/json'
          };
          const _token = sessionStorage.getItem('cfd61b8a7397fa7c10b2ae548f5bfaef');
          if (_token) {
            var _process$env$JWT_BEAR;
            if (((_process$env$JWT_BEAR = process.env.JWT_BEARER) == null ? void 0 : _process$env$JWT_BEAR.toLowerCase()) === 'true') headers.Authorization = 'Bearer ' + _token;else headers.token = _token;
          }
          type = 'api';
        }
        (0, _isomorphicFetch.default)(process.env.API_URL + type, {
          credentials: 'include',
          method: 'POST',
          headers,
          body
          //body: JSON.stringify(action)
        }).then(res => {
          if (res.status >= 400) {
            throw new Error('Bad response - status ' + res.status);
          } else {
            const _token = res.headers.get('token');
            if (_token) sessionStorage.setItem('cfd61b8a7397fa7c10b2ae548f5bfaef', _token);
            return res.json();
          }
        }).then(data => {
          if (data.timeout) {
            alert('Session timeout, please click Ok to login again.');
            location.reload();
          }
          if (data.bear_token_) {
            sessionStorage.setItem('cfd61b8a7397fa7c10b2ae548f5bfaef', data.bear_token_);
            delete data.bear_token_;
          }
          (0, _util.toastMessage)(data.message);
          data.payload = (0, _extends2.default)({}, data.payload, {
            reqPayload: action.payload
          });
          if (action.next) setTimeout(() => action.next(data));
          return next(data);
        }).catch(err => {
          console.log(err);
          //alert(err)
          if (action.next) setTimeout(() => action.next(action));
          return next(action);
        });
      }
      break;
    case 'none':
    case 'call':
      const m = action.type.match(/\/alert[^\/]*$/);
      if (m) (0, _util.toastMessage)(action.payload);

    // continue to below

    default:
      if (action.next) setTimeout(() => action.next(action));
      return next(action);
  }
};
exports.api = api;
function error(store, message) {
  if (!message) return;
  const id = '1244'; //uid(8) 

  store.dispatch({
    type: '@error',
    payload: (0, _extends2.default)({}, message, {
      id
    })
  });
  if (message.tp !== 'error') setTimeout(() => store.dispatch({
    type: '@error.remove',
    payload: id
  }), message.tp === 'warn' ? 6000 : 2500);else {
    // AlertPopup('System Error', () => {
    //   window.location.href = "/logout"
    // })
  }
}