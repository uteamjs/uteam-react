"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
exports.__esModule = true;
exports.utfield = exports.onChange = exports.getInitField = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _react = _interopRequireDefault(require("react"));
var _reactBootstrap = require("react-bootstrap");
var _lodash = require("lodash");
const onChange = _this => ({
  id,
  index,
  valid,
  type,
  key,
  _id
}) => e => {
  const {
    call,
    api,
    _
  } = _this.props;
  const _f = _this.getField(id);
  let val = type === 'toggle' ? e.target.checked : type === 'checkbox' ? e.target.checked :
  // _f.value :
  type === 'typeahead' || type === 'daterange' || type === 'date' ? e : e.target.value;
  if (_this.fieldOnChange({
    id,
    index,
    key,
    type,
    value: val,
    e,
    call,
    api
  })) {
    if (valid) {
      const msg = check({
        val,
        o: valid
      });
      if (msg) {
        //console.log(msg)
        return call('errorMessage', {
          id,
          index,
          msg,
          val
        });
      }
    }
    if (type == 'checkbox') call('checkbox', {
      id,
      index,
      key,
      val
    });else {
      /*
      if (type == '_select') {
          const obj = _f.list
          val = Object.keys(obj).find(key => obj[key] === val)
      }*/

      call('change', {
        id,
        index,
        val: type === 'radio' ? key : val,
        _id,
        type
      });
    }
  }
};
exports.onChange = onChange;
const getInitField = _this => (id, tp = 'link') => {
  //** const { fieldList } = _this.props._
  const _ = _this.props._ || _this.props.init._;
  const {
    fieldList
  } = _;
  return fieldList[id] ? fieldList[id][tp] || {} : {};
};
exports.getInitField = getInitField;
const EditField = ({
  sm: _sm = 12,
  error,
  elem
}) => /*#__PURE__*/_react.default.createElement(_reactBootstrap.Col, {
  sm: _sm
}, /*#__PURE__*/_react.default.createElement("div", {
  className: "field-append"
}, elem), /*#__PURE__*/_react.default.createElement("div", {
  className: "invalid-feedback",
  style: {
    display: 'block'
  }
}, error));
const {
  Group,
  Label
} = _reactBootstrap.Form;
const utfield = _this => props => {
  const {
    children,
    id,
    index,
    labelWidth,
    no = 1,
    labelPosition,
    elem,
    append,
    hide,
    readOnly,
    onKeyPress,
    customlabel,
    st,
    drag
  } = props;

  //** const { _ } = _this.props

  //console.log(_this)

  const _ = _this.props._ || _this.props.init._;
  const _f = _this.getField(id);
  const _p = _this.getField(id, 'parent');
  if ((0, _lodash.isEmpty)(_f)) {
    console.error(`Field id: ${id} not defined`);
    return `Field id: ${id} is not defined!`;
  }
  if (_f.hide) return null;
  const _labelPosition = labelPosition ? labelPosition === 'top' ? _reactBootstrap.Col : labelPosition === 'none' ? 'none' : _reactBootstrap.Row : _.isRow === true ? _reactBootstrap.Row : _.isRow === false ? _reactBootstrap.Col : _.isRow;
  let {
    label,
    type,
    error
  } = id ? _f : {};
  let [w1, w2] = labelWidth || _.labelWidth[no - 1];

  //const param = { id, index, children, elem, st, append, isRead: readOnly, onKeyPress }

  if (customlabel !== undefined) label = customlabel;
  const param = (0, _extends2.default)({}, props, {
    isRead: readOnly
  });
  const className = (param.className || '') + '';
  delete param.className;
  delete param.labelPosition;
  delete param.labelWidth;
  delete param.readOnly;
  delete param.customlabel;
  delete param.drag;
  const _group = (0, _extends2.default)({}, drag, {
    className
  });

  //console.log(_labelPosition)

  return _labelPosition === 'none' ?
  //<Group {..._group}>
  //    {_this.Control(param)}
  //</Group> :
  _this.Control(param) : _labelPosition == _reactBootstrap.Row ? /*#__PURE__*/_react.default.createElement(Group, (0, _extends2.default)({}, _group, {
    as: _reactBootstrap.Row
  }), /*#__PURE__*/_react.default.createElement(Label, {
    className: _f.mandate ? 'mandate' : '',
    column: true,
    sm: w1
  }, label), _p.isPreview ? preViewPending({
    w2,
    _f,
    _this,
    param
  }) : /*#__PURE__*/_react.default.createElement(EditField, {
    sm: w2,
    error: error,
    elem: _this.Control(param)
  })) : /*#__PURE__*/_react.default.createElement(Group, _group, /*#__PURE__*/_react.default.createElement(Label, {
    className: _f.mandate ? 'mandate' : ''
  }, label), _this.Control(param));
};
exports.utfield = utfield;
const preViewPending = ({
  w2,
  _f,
  _this,
  param
}) => {
  let _w2 = Math.floor(w2 / 3);
  let _w3 = w2 - _w2 * 2;
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Col, {
    sm: _w2
  }, _this.Control((0, _extends2.default)({}, param, {
    st: 'active',
    isRead: true
  }))), /*#__PURE__*/_react.default.createElement(_reactBootstrap.Col, {
    sm: _w2
  }, _f.pending ? /*#__PURE__*/_react.default.createElement("div", {
    className: "field-pending"
  }, (void 0).Control((0, _extends2.default)({}, param, {
    st: 'pending',
    isRead: true
  }))) : null), _p.isEdit ? /*#__PURE__*/_react.default.createElement(EditField, {
    sm: _w3,
    error: error,
    elem: (void 0).Control(param)
  }) : null);
};