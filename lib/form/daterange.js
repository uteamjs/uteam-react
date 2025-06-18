"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
exports.__esModule = true;
exports.SingleDate = exports.DateRange = exports.DatePicker = void 0;
var _react = _interopRequireWildcard(require("react"));
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
var _dateFns = require("date-fns");
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
  onChange,
  onClear
}) => {
  var _f$format, _f$holidays;
  const dateFormat = (_f$format = _f == null ? void 0 : _f.format) != null ? _f$format : 'dd/MM/yyyy';
  // const [inputValue, setInputValue] = useState('');    // initialise local text once
  const [inputValue, setInputValue] = (0, _react.useState)(() => value && (0, _dateFns.isValid)(value) ? (0, _dateFns.format)(value, dateFormat) : '');

  /* ------------------------------------------------------------------ *
  * ❷ Keep the local text in sync with the parent `value` *after* render
  *    (never from inside the render function itself).
  * ------------------------------------------------------------------ */
  (0, _react.useEffect)(() => {
    if (!value) {
      setInputValue(''); // cleared
    } else if ((0, _dateFns.isValid)(value)) {
      setInputValue((0, _dateFns.format)(value, dateFormat));
    }
  }, [value, dateFormat]);

  /* ---------------- raw typing in the input ---------------- */
  const handleRawChange = e => {
    var _e$target;
    const newVal = e == null || (_e$target = e.target) == null ? void 0 : _e$target.value;
    if (typeof newVal !== 'string') {
      return;
    }
    const cursor = e.target.selectionStart;

    // Stop once the user typed a 5-digit year
    const yrMatch = newVal.match(/(\d{4,})$/);
    if (yrMatch && Number(yrMatch[1]) > 9999) return;
    setInputValue(newVal);
    // keep caret position
    requestAnimationFrame(() => e.target.setSelectionRange(cursor, cursor));
  };

  /* ---------------- click / select / “X” from the calendar ------------ */
  const handleDateChange = (date, ev) => {
    /* *** ❸ React-datepicker passes `null` when “X” is clicked *** */
    if (!date) {
      setInputValue('');
      onChange({
        target: {
          value: null
        }
      });
      onClear == null || onClear(ev); // tell the parent the clear button was hit
      return;
    }

    // normal pick
    if (date instanceof Date && (0, _dateFns.isValid)(date) && date.getFullYear() <= 9999) {
      setInputValue((0, _dateFns.format)(date, dateFormat));
      onChange({
        target: {
          value: date
        }
      });
    }
  };

  /* ---------------- leave-field validation ---------------- */
  const handleBlur = () => {
    if (!inputValue) {
      onChange({
        target: {
          value: null
        }
      });
      return;
    }
    const parsed = (0, _dateFns.parse)(inputValue, dateFormat, new Date());
    if (!(0, _dateFns.isValid)(parsed) || parsed.getFullYear() > 9999) {
      const today = new Date();
      setInputValue((0, _dateFns.format)(today, dateFormat));
      onChange({
        target: {
          value: today
        }
      });
    } else {
      setInputValue((0, _dateFns.format)(parsed, dateFormat));
      onChange({
        target: {
          value: parsed
        }
      });
    }
  };

  // inputValue === '' && value && setInputValue((0, formatdate2)(value, dateFormat));   

  return /*#__PURE__*/_react.default.createElement(_reactDatepicker.default, {
    id: _elem_id,
    value: inputValue,
    selected: (0, _dateFns.isValid)((0, _dateFns.parse)(inputValue, dateFormat, new Date())) ? (0, _dateFns.parse)(inputValue, dateFormat, new Date()) : null,
    className: "form-control",
    renderCustomHeader: custom_header,
    onChange: handleDateChange,
    onChangeRaw: e => {
      e.preventDefault(); // Prevent react-datepicker's default parsing
      handleRawChange(e); // Use our custom handler
    },
    onBlur: handleBlur,
    disabled: _isRead,
    dateFormat: dateFormat,
    holidays: (_f$holidays = _f.holidays) != null ? _f$holidays : _holidays.hk,
    todayButton: "Today",
    isClearable: !_isRead
  });
};
exports.SingleDate = SingleDate;