"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
exports.__esModule = true;
exports.utInputDate = exports.reduceDate = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _react = _interopRequireDefault(require("react"));
var _reactDayPicker = _interopRequireDefault(require("react-day-picker"));
var _reactBootstrap = require("react-bootstrap");
var _io = require("react-icons/io");
var _util = require("./util");
var _range = _interopRequireDefault(require("lodash/range"));
var _ri = require("react-icons/ri");
const _listMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const reduceDate = {
  init: {
    isDatePicker: {}
  },
  actions: {
    pickDate: (state, {
      id,
      index,
      day
    }) => {
      const _f = (0, _util.getField)(state, id, index);

      //console.log(day.getDay())
      _f.value = day;
      _f.isDatePicker = false;
    },
    selectDate: (state, {
      option,
      item,
      id,
      index,
      tp,
      v
    }) => {
      //console.log(id, item, field, tp, v)
      const _f = (0, _util.getField)(state, id, index);
      //const value = _f.value || new Date()
      const value = _f.value ? typeof _f.value.getYear == 'function' ? _f.value : new Date(_f.value) : new Date();
      let d = value.getDate(),
        m = value.getMonth(),
        y = value.getYear() + 1900;
      if (tp == 'Day') d = v;else if (tp == 'Month') m = _listMonth.indexOf(v);else y = v;
      _f.value = new Date(y, m, d);
      if (option) state.fields[option].value = item;
    },
    toggleDate: (state, {
      index,
      id
    }) => {
      const _f = (0, _util.getField)(state, id, index);
      _f.isDatePicker = !_f.isDatePicker;

      //state.isDatePicker[k] =
      //state.isDatePicker[k] ? !state.isDatePicker[k] : true
    },

    resetDate: (state, {
      id,
      index
    }) => {
      const _f = (0, _util.getField)(state, id, index);
      _f.value = '';
    }
  }
};
exports.reduceDate = reduceDate;
const popover = ({
  call,
  id,
  index,
  value
}) => {
  return /*#__PURE__*/_react.default.createElement(_reactBootstrap.Popover, null, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Popover.Content, null, /*#__PURE__*/_react.default.createElement(_reactDayPicker.default, {
    initialMonth: value,
    onDayClick: day => call('pickDate', {
      id,
      index,
      day
    })
  })));
};
const Select = ({
  tp,
  value,
  list,
  call,
  id,
  option,
  item,
  index,
  label
}) => /*#__PURE__*/_react.default.createElement("select", {
  "aria-label": label,
  className: "form-control",
  id: id + tp,
  value: value,
  onChange: e => call('selectDate', {
    option,
    item,
    id,
    index,
    tp,
    v: e.target.value
  })
}, list.map((t, i) => /*#__PURE__*/_react.default.createElement("option", {
  key: id + i + t
}, t)));
const styleResetButton = {
  margin: '2px 5px 0 5px',
  cursor: 'default'
};
const utInputDate = _this => ({
  option,
  item,
  id,
  index,
  yearStart: _yearStart = 20
}) => {
  const {
    props,
    getField
  } = _this;
  const {
    _,
    call
  } = props;
  const _field = getField(id);
  const listMonth = [..._listMonth];

  //console.log(typeof (index))
  //const value = _field.value || new Date()

  const value = _field.value ? typeof _field.value.getYear == 'function' ? _field.value : new Date(_field.value) : new Date();
  const y = value.getYear() + 1900,
    m = value.getMonth(),
    d = value.getDate();

  // Display date
  const dd = _field.value ? [y, listMonth[m], d] : ['', '', ''];
  const listDay = (0, _range.default)(1, new Date(y, m + 1, 0).getDate() + 1),
    listYear = (0, _range.default)(y - _yearStart, y + 30);

  // Add null items
  if (!_field.value) {
    listDay.unshift('');
    listMonth.unshift('');
    listYear.unshift('');
  }
  const _props = {
    call,
    id,
    index,
    item,
    option
  };
  return /*#__PURE__*/_react.default.createElement("span", {
    className: "day-picker"
  }, /*#__PURE__*/_react.default.createElement(Select, (0, _extends2.default)({
    tp: 'Day',
    list: listDay,
    value: dd[2],
    label: _field.label + '_day'
  }, _props)), /*#__PURE__*/_react.default.createElement(Select, (0, _extends2.default)({
    tp: 'Month',
    list: listMonth,
    value: dd[1],
    label: _field.label + '_month'
  }, _props)), /*#__PURE__*/_react.default.createElement(Select, (0, _extends2.default)({
    tp: 'Year',
    list: listYear,
    value: dd[0],
    label: _field.label + '_year'
  }, _props)), /*#__PURE__*/_react.default.createElement(_ri.RiDeleteBin2Line, {
    size: 24,
    onClick: () => call('resetDate', {
      id,
      index
    }),
    style: styleResetButton
  }), /*#__PURE__*/_react.default.createElement(_reactBootstrap.OverlayTrigger, {
    trigger: "click",
    show: _field.isDatePicker || false,
    placement: "right",
    overlay: popover({
      call,
      id,
      index,
      value
    })
  }, /*#__PURE__*/_react.default.createElement("span", null, /*#__PURE__*/_react.default.createElement(_io.IoIosCalendar, {
    size: 25,
    onClick: () => call('toggleDate', {
      index,
      id
    })
  }))));
};
exports.utInputDate = utInputDate;