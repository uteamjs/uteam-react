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
    onChange: v => onChange({
      target: {
        value: v
      }
    }),
    disabled: _isRead,
    dateFormat: (_f$format = _f.format) != null ? _f$format : 'dd/MM/yyyy',
    holidays: (_f$holidays = _f.holidays) != null ? _f$holidays : _holidays.hk
  });
};
exports.SingleDate = SingleDate;