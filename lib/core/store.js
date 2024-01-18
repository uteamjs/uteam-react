"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
exports.__esModule = true;
exports.utCreateElement = exports.utBindElement = exports.storeDelete = exports.storeCall = exports.store = exports.RouterStore = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _react = _interopRequireDefault(require("react"));
var _redux = require("redux");
var _reactRedux = require("react-redux");
var _reactRouterDom = require("react-router-dom");
var _ = require("..");
var _remoteAction = require("./remoteAction");
//const context = createContext(null)
const error = (state = {
  item: 'home'
}, action) => {
  switch (action.type) {
    case 'click':
      return {
        item: action.payload.item
      };
    default:
      return state;
  }
};

//export const useSelector = createSelectorHook(context)
const RouterStore = props => /*#__PURE__*/_react.default.createElement(_reactRedux.Provider, {
  store: store
}, /*#__PURE__*/_react.default.createElement(_reactRouterDom.HashRouter, null, props.children));
exports.RouterStore = RouterStore;
let reducers = {
  '@global': error
};
const store = (0, _redux.createStore)((0, _redux.combineReducers)(reducers), {}, (0, _redux.applyMiddleware)(_remoteAction.api));
exports.store = store;
const storeCall = (tp, func, payload, next, name = '@global') => {
  const i = func.lastIndexOf('/');

  //console.log(i, func)

  if (i > 0) {
    name = func.substring(0, i);
    func = func.substring(i + 1);
  }
  //console.log(name, func)

  store.dispatch({
    payload,
    ref: name,
    type: name + '/' + func,
    server: tp,
    next
  });
};
exports.storeCall = storeCall;
const storeDelete = ({
  name
}) => {
  delete reducers[name];
  store.replaceReducer((0, _redux.combineReducers)(reducers));
};
exports.storeDelete = storeDelete;
var cnt = 0;
const _setStatus = (val = 'loading') => {
  if (val === 'loading') ++cnt;else --cnt;
  const e = document.getElementById('__pagestatus__');
  if (e) {
    if (cnt > 0) e.innerText = 'loading ' + cnt;else e.innerText = val;
  }
};
const _call_api = _r => tp => (func, payload, next) => {
  if (process.env.API_STATUS === 'true' && tp === 'api') {
    const i = func.lastIndexOf('/');
    const pre_apiStatus = i > 0 ? func.substring(0, i + 1) : '';

    /*
    storeCall('call', pre_apiStatus + 'apiStatus', { _api_status: 'waiting' },
        () => storeCall(tp, func, payload,
            res => storeCall('call', pre_apiStatus + 'apiStatus', {
                ...res.payload, _api_status: 'isReady'
            }, next, _r.name)
            , _r.name)
        , _r.name)
    */

    storeCall('call', pre_apiStatus + 'apiStatus', {
      _api_status: 'waiting'
    }, () => storeCall(tp, func, payload, next, _r.name), _r.name);
  } else {
    if (tp === 'api') {
      _setStatus('loading');
      storeCall(tp, func, payload, data => {
        _setStatus('ready');
        next(data);
      }, _r.name);
    } else storeCall(tp, func, payload, next, _r.name);
  }
};
const _connect = (mod, init, _r) => {
  const _call = _call_api(_r);
  if (typeof mod.layout === 'function') {
    if (!!mod.layout.prototype.isReactComponent)
      // Class component
      return (0, _reactRedux.connect)(state => (0, _extends2.default)({
        //** _: state[_r.name],
        _: state[_r.name]._,
        name: _r.name,
        get: s => state[s]._,
        // Get other packages'states
        api: _call('api'),
        call: _call('none')
      }, init))(mod.layout);else {
      return props => {
        var _mod$param;
        const init = (0, _reactRedux.useSelector)(t => t[mod.name]);
        const param = {
          name: _r.name,
          get: s => state[s]._,
          api: _call('api'),
          call: _call('none')
        };
        if (!mod.content) mod.content = (0, _.useForm)((0, _extends2.default)({
          props: (0, _extends2.default)({}, param, {
            init
          })
        }, mod.param), (_mod$param = mod.param) == null ? void 0 : _mod$param.extend);
        return mod.layout((0, _extends2.default)({}, (0, _extends2.default)({}, param, {
          _: init._
        }), init, props, mod.content));
      };
    }
  }
  return mod.layout;
};
const utCreateElement = (mod, init) => {
  console.log('...initialize ' + mod.reducer.name);
  const _r = mod.reducer;
  const _call = _call_api(_r);

  //** const _reducer = (state = _r.init, action) => {
  const _reducer = (state = {
    _: _r.init
  }, action) => {
    if (_r.actions) {
      const _m = _r.name + '/';
      const i = action.type.indexOf(_m);
      if (i >= 0) {
        const _f = _r.actions[action.type.substring(i + _m.length)];
        if (_f) {
          try {
            _f(state._, action.payload, {
              api: _call('api'),
              call: _call('none')
            });
          } catch (err) {
            console.log(err);
            return state;
          }
          if (process.env.API_STATUS === 'true') state._.apiStatus = 'isReady';

          //_setStatus('ready')

          return Object.assign({}, state);
        }
      }
    }
    return state;
  };

  // Check _r.name exit or not

  reducers = (0, _extends2.default)({}, reducers, {
    [_r.name]: _reducer
  });
  store.replaceReducer((0, _redux.combineReducers)(reducers));
  return _connect(mod, init, _r);
};
exports.utCreateElement = utCreateElement;
const utBindElement = (mod, init) => {
  console.log('...blinding ' + mod.name);
  return _connect(mod, init, mod);
};
exports.utBindElement = utBindElement;