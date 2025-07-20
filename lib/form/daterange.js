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
  const ignoreNextOnChange = (0, _react.useRef)(false);
  const callFromEnter = (0, _react.useRef)(false);
  const dateFormat = (_f$format = _f == null ? void 0 : _f.format) != null ? _f$format : 'dd/MM/yyyy';
  // const [inputValue, setInputValue] = useState('');    // initialise local text once
  const [inputValue, setInputValue] = (0, _react.useState)(() => value && (0, _dateFns.isValid)(value) ? (0, _dateFns.format)(value, dateFormat) : '');

  // 2) Inline error message
  const [error, setError] = (0, _react.useState)('');
  const [manVal, setManVal] = (0, _react.useState)(''); // store the latest handleRawChange manual input value

  /* ------------------------------------------------------------------ *
  * ❷ Keep the local text in sync with the parent `value` *after* render
  *    (never from inside the render function itself).
  * ------------------------------------------------------------------ */
  (0, _react.useEffect)(() => {
    if (!value) {
      setInputValue(''); // cleared
      setError('');
    } else if ((0, _dateFns.isValid)(value)) {
      setInputValue((0, _dateFns.format)(value, dateFormat));
      setError('');
    }
  }, [value, dateFormat]);

  /* ---------------- raw typing ---------------- */
  const handleRawChange = e => {
    if (callFromEnter.current) {
      callFromEnter.current = false;
      ignoreNextOnChange.current = true;
      return;
    } else {
      const newVal = e.target.value || "";
      setInputValue(newVal);
      setError('');
      const maybeDate = (0, _dateFns.parse)(newVal, dateFormat, new Date());
      setManVal(maybeDate);
      // immediate “too‑big year” check
      const yrMatch = (newVal == null ? void 0 : newVal.match(/(\d{4,})$/)) || null;
      if (yrMatch && Number(yrMatch == null ? void 0 : yrMatch[1]) > 9999) {
        setError('Year cannot exceed 9999');
        return;
      } else if (!(0, _dateFns.isValid)(maybeDate)) {
        setError('Date format invalid');
        return;
      }
      // preserve caret
      const cursor = e.target.selectionStart;
      requestAnimationFrame(() => {
        e.target.setSelectionRange(cursor, cursor);
      });
    }
  };

  /* ---------------- calendar click / clear ---------------- */
  const handleDateChange = (date, ev) => {
    if (ignoreNextOnChange.current) {
      ignoreNextOnChange.current = false;
      return;
    } else {
      setError('');
      if (!date) {
        setInputValue('');
        onChange({
          target: {
            value: null
          }
        });
        onClear == null || onClear(ev);
        return;
      }
      if ((0, _dateFns.isValid)(date) && date.getFullYear() <= 9999) {
        const txt = (0, _dateFns.format)(date, dateFormat);
        setInputValue(txt);
        onChange({
          target: {
            value: date
          }
        });
      }
    }
  };

  /* ---------------- onBlur validation ---------------- */
  const handleBlur = e => {
    if (!inputValue) {
      setError('');
      onChange({
        target: {
          value: null
        }
      });
      return;
    }
    const parsed = (0, _dateFns.parse)(inputValue, dateFormat, new Date());
    if (!(0, _dateFns.isValid)(parsed) || (parsed == null ? void 0 : parsed.getFullYear()) > 9999) {
      setError('Invalid date');
      // snap to today (or last good)
      const today = new Date();
      const txt = (0, _dateFns.format)(today, dateFormat);
      setInputValue(txt);
      onChange({
        target: {
          value: today
        }
      });
      setInputValue(""); // debug testing use only
      onChange({
        target: {
          value: null
        }
      }); // debug testing use only
    } else {
      setError('');
      const txt = (0, _dateFns.format)(parsed, dateFormat);
      setInputValue(txt);
      onChange({
        target: {
          value: parsed
        }
      });
    }
  };

  // inputValue === '' && value && setInputValue((0, formatdate2)(value, dateFormat));   

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_reactDatepicker.default, {
    id: _elem_id,
    value: inputValue,
    selected: (0, _dateFns.isValid)((0, _dateFns.parse)(inputValue, dateFormat, new Date())) ? (0, _dateFns.parse)(inputValue, dateFormat, new Date()) : null
    // className='form-control'
    ,
    className: `form-control${error ? ' is-invalid' : ''}`,
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
    isClearable: !_isRead,
    onKeyDown: e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        ignoreNextOnChange.current = true;
        callFromEnter.current = true;
        handleDateChange(manVal, e); // Use our custom handler
      }
    }
  })));
};
exports.SingleDate = SingleDate;