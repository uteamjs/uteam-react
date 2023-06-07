"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
exports.__esModule = true;
exports.utControlActions = exports.utControl = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _react = _interopRequireWildcard(require("react"));
var _reactBootstrap = require("react-bootstrap");
var _2 = require("..");
var _util = require("./util");
var _reactToggle = _interopRequireDefault(require("react-toggle"));
var _ai = require("react-icons/ai");
var _lodash = require("lodash");
require("react-toggle/style.css");
var _reactBootstrapTypeahead = require("react-bootstrap-typeahead");
require("react-bootstrap-typeahead/css/Typeahead.css");
var _daterange = require("./daterange");
const loop = (parent, child, cb) => child ? Object.entries(child).reduce((r, [key, link]) => Object.assign(r, link.type && link.type.match(/group/i) ? loop(link, link.child, cb) : cb(parent, key, link)), {}) : null;
const utControlActions = {
  change: (state, {
    id,
    val,
    index,
    type,
    _id
  }) => {
    const _f = (0, _util.getField)(state, id, index);
    _f.value = type === 'daterange' ? {
      startDate: val.selection.startDate,
      endDate: val.selection.endDate,
      key: 'selection'
    } : val;
    _f.error = null;
    state.focusid = _id;
    state.isChanged = true;
  },
  daterange: (state, {
    id,
    val,
    index
  }) => {
    const _f = (0, _util.getField)(state, id, index);
    _f.value = {
      startDate: val.selection.startDate,
      endDate: val.selection.endDate,
      key: 'selection'
    };
    _f.error = null;
    state.isChanged = true;
  },
  checkbox: (state, {
    id,
    index,
    key
  }) => {
    const _f = (0, _util.getField)(state, id, index);
    state.isChanged = true;
    if (_f.value && _f.value.length > 0 && _f.value.charAt(0) !== '|') _f.value = '|' + _f.value;
    key = '|' + key;
    if (_f.value.indexOf(key) >= 0) _f.value = _f.value.replace(key, '');else _f.value += key;
  },
  initFields: state => {
    state.fieldList = loop(null, state.fields, (parent, key, link) => {
      link.label = link.label || (0, _2.capitalize)(key);
      link.type = link.type || 'text';
      link.value = link.value === undefined ? link.type === 'daterange' ? {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
      } : '' : link.value;
      return {
        [key]: {
          link,
          parent
        }
      };
    });
    //console.log(state.fieldList)
  }
};
exports.utControlActions = utControlActions;
const utControl = _this => props => {
  const {
    InputDate
  } = _this;
  //**
  const _ = _this.props._ || _this.props.init._;
  const {
    name,
    call
  } = _this.props;
  let {
    st = 'value',
    id,
    index,
    children,
    elem,
    isRead,
    onChange,
    onKeyDown,
    onKeyPress,
    append
  } = props;
  const _p = _this.getField(id, 'parent');
  const _f = _this.getField(id);
  let value = id ? _f[st] : null;
  let _list;
  const isIndex = !(0, _lodash.isUndefined)(index);
  isRead = isRead || _f.isRead;
  if (isIndex) {
    if (_p.type === 'multi-group') {
      value = _p.rows[index][id] ? _p.rows[index][id].value : '';
      _list = _p.rows[index][id].list;
    }
  }
  const {
    type,
    list,
    valid,
    hint
  } = id ? _f : {};
  const _Change = onChange || _this.onChange;
  const _KeyDown = onKeyDown || _this.onKeyDown;
  const _KeyPress = onKeyPress || _this.onKeyPress;
  const _isRead = (0, _lodash.isUndefined)(isRead) ? !((0, _lodash.isEmpty)(_p) ? _.isEdit : _p.isEdit) : isRead === 'true' || isRead;
  const _id = name + '-' + id + '-' + st;

  //if(id== 'search') {
  //    console.log(_isRead)

  //}
  //if(id == 'billemail')
  //    console.log(_p)

  switch (type) {
    case 'toggle':
      //console.log(value)
      return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_reactToggle.default, {
        "aria-label": _f.label,
        defaultChecked: value === true,
        disabled: _isRead,
        onChange: _Change({
          id,
          index,
          type
        })
      }));
    case 'radio':
      if (_isRead) return /*#__PURE__*/_react.default.createElement("div", {
        "aria-label": _f.label
      }, list[value]);
    case 'checkbox':
      return /*#__PURE__*/_react.default.createElement("div", {
        "aria-label": _f.label
      }, list ? Object.entries(list).map(([key, choice], i) => /*#__PURE__*/_react.default.createElement(_reactBootstrap.Form.Check, {
        inline: true,
        disabled: _isRead,
        checked: value && value.split('|').indexOf(key) >= 0,
        style: {
          padding: '8px 20px 0 0'
        },
        key: key + i,
        id: _id + '-' + key,
        type: type,
        label: (0, _lodash.isObject)(choice) && choice.child ? (0, _react.createElement)(choice.child) : choice,
        onChange: _Change({
          id,
          key,
          index,
          type
        })
      })) : null);
    case 'label':
      return /*#__PURE__*/_react.default.createElement("div", {
        "aria-label": _f.label
      }, value);
    case 'typeahead':
      return value ? /*#__PURE__*/_react.default.createElement(_reactBootstrapTypeahead.Typeahead, {
        id: _id + '-typeahead',
        labelKey: _f.key || 'text',
        multiple: !_f.single,
        disabled: _isRead,
        defaultSelected: value,
        allowNew: _f.allowNew || false,
        clearButton: _f.clearButton || false,
        placeholder: _f.placeholder,
        onChange: _Change({
          id,
          index,
          type
        }),
        options: _f.options
      }) : null;
    case 'select':
      let style = {};
      if (_f.format) {
        const _n = _f.format.split(',');
        const _l = _n.length;
        if (_l > 0) style.width = parseInt(_n[0]) * 8 + 20 + 'px';
      }
      return /*#__PURE__*/_react.default.createElement(_reactBootstrap.Form.Control, {
        as: type,
        value: value || '',
        disabled: _isRead,
        "aria-label": _f.label,
        style: style,
        onChange: _Change({
          id,
          index,
          type
        })
      }, list || _list ? Object.entries(list || _list).map(([key, choice], i) => /*#__PURE__*/_react.default.createElement("option", {
        key: key + i,
        value: key
      }, choice)) : null);
    case 'datepicker':
      return _isRead ? /*#__PURE__*/_react.default.createElement("div", null, value) : /*#__PURE__*/_react.default.createElement(InputDate, {
        id: id,
        index: index
      });
    case 'daterange':
      return /*#__PURE__*/_react.default.createElement(_daterange.DateRange, {
        _f,
        _isRead,
        value,
        onChange: _Change({
          id,
          index,
          type
        })
      });
    case 'date':
      return _isRead ? /*#__PURE__*/_react.default.createElement("div", null, value) : /*#__PURE__*/_react.default.createElement(_daterange.DatePicker, {
        _f,
        _isRead,
        value,
        onChange: _Change({
          id,
          index,
          type
        })
      });
    case 'password':
      if (_isRead) return value ? value.replace(/[^*]/gm, '•') : '';
    case 'number':
    case 'text':
    case 'textarea':
      //return <Form.Control id='xxx' type='text' value={_.fields.name.value} onChange={e =>   
      //    call('change', {id, val:e.target.value})} />

      if (_isRead) return /*#__PURE__*/_react.default.createElement("div", null, value);
      delete props.isRead;
      const _props = (0, _extends2.default)({}, props, {
        type,
        id: _id,
        value: value || '',
        onChange: _Change({
          id,
          valid,
          index,
          type
        }),
        onKeyDown: _KeyDown,
        onKeyPress: e => _KeyPress({
          char: e.key,
          value: e.target.value,
          id,
          type,
          e
        })
      });
      if (isIndex) _props.id += '-' + index;
      if (type === 'textarea') {
        _props.as = type;
        _props.rows = props.rows || 3;
      }
      if (_f.format) {
        const _n = _f.format.split(',');
        const _l = _n.length;
        if (_l >= 2) {
          if (_n[0] === 'Text') _props.maxLength = _n[2];
          if (_l >= 3) _props.style = {
            width: parseInt(_n[1]) * 8 + 20 + 'px'
          };
        }
      }
      if (hint) _props.placeholder = hint;
      return /*#__PURE__*/_react.default.createElement(_reactBootstrap.Form.Control, (0, _extends2.default)({}, _props, {
        key: 'f=' + id,
        'aria-label': _f.label
      }));
    default:
      if (_this.customfield[type]) {
        //console.log(props)
        return _this.customfield[type]({
          props,
          id,
          type,
          index,
          value,
          valid,
          isRead,
          onChange: _Change({
            id,
            valid,
            index,
            type
          })
        });
      } else return null;
    //if (elem)
    //    return elem({ id, value })

    //return children
  }
};
exports.utControl = utControl;
const Pending = ({
  id,
  children
}) => id && id.isPending ? /*#__PURE__*/_react.default.createElement("div", {
  className: "field-pending"
}, /*#__PURE__*/_react.default.createElement(_ai.AiOutlineHourglass, null), children) : null;