"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

exports.__esModule = true;
exports.api = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _isomorphicFetch = _interopRequireDefault(require("isomorphic-fetch"));

var _lodash = require("lodash");

var _reactToastify = require("react-toastify");

const api = store => next => action => {
  switch (action.server) {
    case 'api':
      if (action.server === 'api') {
        action.payload = action.payload || {};
        (0, _isomorphicFetch.default)(process.env.API_URL + 'api', {
          credentials: 'include',
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(action)
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