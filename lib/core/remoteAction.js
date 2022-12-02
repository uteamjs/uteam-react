"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

exports.__esModule = true;
exports.api = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _isomorphicFetch = _interopRequireDefault(require("isomorphic-fetch"));

var _lodash = require("lodash");

var _reactToastify = require("react-toastify");

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

          const _token = localStorage.getItem('cfd61b8a7397fa7c10b2ae548f5bfaef');

          if (_token) headers.token = _token; // JWT token

          type = 'api';
        }

        (0, _isomorphicFetch.default)(process.env.API_URL + type, {
          credentials: 'include',
          method: 'POST',
          headers,
          body //body: JSON.stringify(action)

        }).then(res => {
          if (res.status >= 400) throw new Error('Bad response - status ' + res.status);
          return res.json();
        }).then(data => {
          const {
            message
          } = data;
          const type = {
            'info': {
              autoClose: 1500,
              hideProgressBar: true
            },
            'warn': {},
            'error': {
              autoClose: false
            }
          };
          (0, _lodash.each)(type, (opt, tp) => {
            if (message[tp]) message[tp].forEach(t => _reactToastify.toast[tp](t, opt));
          });
          if (action.next) setTimeout(() => action.next(data));
          return next(data);
        }).catch(err => {
          console.log(err); //alert(err)

          if (action.next) setTimeout(() => action.next(action));
          return next(action);
        });
      }

      break;

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
  }), message.tp === 'warn' ? 6000 : 2500);else {// AlertPopup('System Error', () => {
    //   window.location.href = "/logout"
    // })
  }
}
/*
const getUploadBody = action => {
  const formData = new FormData(), {ref, type, files = []} = action

  formData.append('ref', ref)
  formData.append('server', 'api')
  formData.append('type', type)
  files.forEach(f => {
    formData.append('file', f)
  })

  return formData
}

const catchFtn = (store, next, action, msg) => e => {
  console.log(msg)
  console.log(e)
  error(store, {
    tp: 'error',
    text: action.type + '- api',
    error:[e.message]
  })
  return next(action);
}*/