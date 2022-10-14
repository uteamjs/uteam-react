"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

exports.__esModule = true;
exports.utCreateElement = exports.utBindElement = exports.storeDelete = exports.storeCall = exports.store = exports.RouterStore = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _redux = require("redux");

var _reactRedux = require("react-redux");

var _reactRouterDom = require("react-router-dom");

var _2 = require("..");

var _remoteAction = require("./remoteAction");

var _lodash = _interopRequireDefault(require("lodash"));

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
}; //export const useSelector = createSelectorHook(context)


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
  const i = func.lastIndexOf('/'); //console.log(i, func)

  if (i > 0) {
    name = func.substring(0, i);
    func = func.substring(i + 1);
  } //console.log(name, func)


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

const utCreateElement = (mod, init) => {
  console.log('...initialize ' + mod.reducer.name);

  const _call = tp => (func, payload, next) => {
    storeCall('call', 'apiStatus', {
      status: 'waiting'
    }, () => storeCall(tp, func, payload, () => storeCall('call', 'apiStatus', {
      status: 'isReady'
    }, next, _r.name), _r.name), _r.name);
  };

  const _r = mod.reducer; //** const _reducer = (state = _r.init, action) => {

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

          return Object.assign({}, state);
        }
      }
    }

    return state;
  }; // Check _r.name exit or not


  reducers = (0, _extends2.default)({}, reducers, {
    [_r.name]: _reducer
  });
  store.replaceReducer((0, _redux.combineReducers)(reducers));

  if (typeof mod.layout === 'function') {
    if (!!mod.layout.prototype.isReactComponent) // Class component
      return (0, _reactRedux.connect)(state => (0, _extends2.default)({
        //** _: state[_r.name],
        _: state[_r.name]._,
        name: _r.name,
        api: _call('api', state[_r.name]._),
        call: _call('none')
      }, init))(mod.layout);else {
      return props => {
        var _mod$param;

        const init = (0, _reactRedux.useSelector)(t => t[_r.name]);
        const param = {
          name: _r.name,
          api: _call('api', init._),
          call: _call('none')
        };
        if (!mod.content) mod.content = (0, _2.useForm)((0, _extends2.default)({
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

exports.utCreateElement = utCreateElement;

const utBindElement = (mod, init) => {
  console.log('...blinding ' + mod.name);

  const _call = tp => (func, payload, next) => storeCall(tp, func, payload, next, mod.name);

  if (typeof mod.layout === 'function') {
    if (!!mod.layout.prototype.isReactComponent) // Class component
      return (0, _reactRedux.connect)(state => (0, _extends2.default)({
        //** _: state[_r.name],
        _: state[mod.name]._,
        name: mod.name,
        api: _call('api'),
        call: _call('none')
      }, init))(mod.layout);else {
      return props => {
        var _mod$param2;

        const init = (0, _reactRedux.useSelector)(t => t[mod.name]);
        const param = {
          name: mod.name,
          api: _call('api'),
          call: _call('none')
        };
        if (!mod.content) mod.content = (0, _2.useForm)((0, _extends2.default)({
          props: (0, _extends2.default)({}, param, {
            init
          })
        }, mod.param), (_mod$param2 = mod.param) == null ? void 0 : _mod$param2.extend);
        return mod.layout((0, _extends2.default)({}, (0, _extends2.default)({}, param, {
          _: init._
        }), init, props, mod.content));
      };
    }
  }

  return mod.layout;
};

exports.utBindElement = utBindElement;