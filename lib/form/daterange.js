"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
exports.__esModule = true;
exports.SingleDate = exports.DateRange = exports.DatePicker = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactjsPopup = _interopRequireDefault(require("reactjs-popup"));
require("reactjs-popup/dist/index.css");
var _Button = _interopRequireDefault(require("react-bootstrap/Button"));
var _go = require("react-icons/go");
var _reactDateRange = require("react-date-range");
require("react-date-range/dist/styles.css");
require("react-date-range/dist/theme/default.css");
var _moment = _interopRequireDefault(require("moment"));
var _reactDatepicker = _interopRequireDefault(require("react-datepicker"));
require("react-datepicker/dist/react-datepicker.css");
var _lodash = require("lodash");
var _holidays = require("./holidays");
// main css file
// theme css file

const formatdate = datestring => (0, _moment.default)(datestring).format('YYYY-MM-DD');
const _default = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection'
};
const DateRange = ({
  _f,
  _isRead,
  value,
  onChange
}) => {
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "date-range"
  }, /*#__PURE__*/_react.default.createElement("span", {
    "aria-label": "Start Date"
  }, formatdate(value.startDate)), /*#__PURE__*/_react.default.createElement("span", null, " ~ "), /*#__PURE__*/_react.default.createElement("span", {
    "aria-label": "End Date"
  }, formatdate(value.endDate)), /*#__PURE__*/_react.default.createElement(_reactjsPopup.default, {
    trigger: /*#__PURE__*/_react.default.createElement(_Button.default, {
      "aria-label": _f.label,
      variant: "light",
      disabled: _isRead
    }, /*#__PURE__*/_react.default.createElement(_go.GoCalendar, null)),
    modal: true
  }, /*#__PURE__*/_react.default.createElement(_reactDateRange.DateRangePicker, {
    ranges: [value || _default],
    onChange: onChange,
    showSelectionPreview: true,
    moveRangeOnFirstSelection: false,
    direction: "horizontal"
  })));
};
exports.DateRange = DateRange;
const DatePicker = ({
  _f,
  _isRead,
  value,
  onChange
}) => {
  if (value == '' || value == null) value = new Date();
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "date-range"
  }, formatdate(value), /*#__PURE__*/_react.default.createElement(_reactjsPopup.default, {
    trigger: /*#__PURE__*/_react.default.createElement(_Button.default, {
      "aria-label": _f.label,
      variant: "light",
      disabled: _isRead
    }, /*#__PURE__*/_react.default.createElement(_go.GoCalendar, null)),
    modal: true
  }, /*#__PURE__*/_react.default.createElement(_reactDateRange.Calendar, {
    date: value,
    onChange: onChange
  })));
};
exports.DatePicker = DatePicker;
const yy = new Date().getFullYear();
const years = (0, _lodash.range)(/*yy - 40*/1900, yy + 5, 1);
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const custom_header = ({
  date,
  changeYear,
  changeMonth,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled
}) => {
  var y2 = date.getFullYear() + 5;
  var y1 = years[years.length - 1];
  if (y2 > y1) for (var y = y1 + 1; y < y2; y++) years.push(y);
  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      margin: 10,
      display: "flex",
      justifyContent: "center"
    }
  }, /*#__PURE__*/_react.default.createElement("button", {
    onClick: decreaseMonth,
    disabled: prevMonthButtonDisabled
  }, "<"), /*#__PURE__*/_react.default.createElement("select", {
    value: date.getFullYear(),
    onChange: ({
      target: {
        value
      }
    }) => changeYear(value)
  }, years.map(option => /*#__PURE__*/_react.default.createElement("option", {
    key: option,
    value: option
  }, option))), /*#__PURE__*/_react.default.createElement("select", {
    value: months[date.getMonth()],
    onChange: ({
      target: {
        value
      }
    }) => changeMonth(months.indexOf(value))
  }, months.map(option => /*#__PURE__*/_react.default.createElement("option", {
    key: option,
    value: option
  }, option))), /*#__PURE__*/_react.default.createElement("button", {
    onClick: increaseMonth,
    disabled: nextMonthButtonDisabled
  }, ">"));
};
const SingleDate = ({
  _elem_id,
  _f,
  _isRead,
  value,
  onChange
}) => {
  var _f$format, _f$holidays;
  // if (value == '' || value == null) value = new Date()

  return /*#__PURE__*/_react.default.createElement(_reactDatepicker.default, {
    id: _elem_id,
    selected: value,
    className: "form-control",
    renderCustomHeader: custom_header,
    onChange: v => onChange({
      target: {
        value: v
      }
    }),
    disabled: _isRead,
    dateFormat: (_f$format = _f.format) != null ? _f$format : 'dd/MM/yyyy',
    holidays: (_f$holidays = _f.holidays) != null ? _f$holidays : _holidays.hk,
    todayButton: "Today",
    isClearable: !_isRead
  });
};
exports.SingleDate = SingleDate;