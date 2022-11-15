"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

exports.__esModule = true;
exports.utReducer = exports.initFields = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _ = require("..");

var _date = require("./date");

var _section = require("./section");

var _multiEdit = require("./multiEdit");

var _control = require("./control");

var _2 = require("../..");

const loop = (parent, child, cb) => child ? Object.entries(child).reduce((r, [key, link]) => Object.assign(r, link.type && link.type.match(/group/i) ? loop(link, link.child, cb) : cb(parent, key, link)), {}) : null;

const initFields = state => state.fieldList = loop(null, state.fields, (parent, key, link) => {
  link.label = link.label || (0, _.capitalize)(key);
  link.type = link.type || 'text';
  link.value = link.value === undefined ? link.type === 'typeahead' ? [] : '' : link.value;
  return {
    [key]: {
      link,
      parent
    }
  };
});

exports.initFields = initFields;

const utReducer = (name, o) => {
  const obj = (0, _.merge)((0, _.merge)({
    name,
    init: {
      isEdit: true,
      isEditSection: {},
      isRow: true,
      apiStatus: '',
      labelWidth: [['2', '10'], ['4', '8'], ['6', '6'], ['6', '6']]
    },
    actions: (0, _extends2.default)({}, _control.utControlActions, _multiEdit.utMultiAction, _section.utSectionActions, {
      apiStatus: (state, p) => {
        state.apiStatus = p._api_status;
      },
      popup: (state, obj) => state.popup = obj,
      errorMessage: (state, {
        id,
        index,
        msg,
        val
      }) => {
        const _f = (0, _2.getField)(state, id, index);

        if (!(_f.valid && _f.valid.tight)) _f.value = val;
        _f.error = msg;
      }
    })
  }, _date.reduceDate), o);
  initFields(obj.init);
  return obj;
};

exports.utReducer = utReducer;