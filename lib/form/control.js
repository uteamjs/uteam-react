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
var _daterange = require("./daterange");
require("react-bootstrap-typeahead/css/Typeahead.css");
var _reactNumberFormat = require("react-number-format");
const loop = (parent, child, cb) => child ? Object.entries(child).reduce((r, [key, link]) => Object.assign(r, link.type && link.type.match(/group/i) ? loop(link, link.child, cb) : cb(parent, key, link)), {}) : null;
const utControlActions = exports.utControlActions = {
  change: (state, {
    id,
    val,
    index,
    type,
    _id
  }) => {
    const _f = (0, _util.getField)(state, id, index);
    let isSingle = true;
    if (_f.type === 'select' && _f.format) {
      const m = _f.format.match(/^\d*?,(\d*?),(.*)$/); // eg 25,5,False

      if (m && parseInt(m[1]) > 1 && m[2] === 'True') {
        // Multiple select
        if (!(0, _lodash.isArray)(_f.value)) _f.value = [_f.value];
        if (val.length <= 1) {
          val = _f.value.length > 0 && typeof _f.value[0] === 'number' ? parseInt(val[0]) : val[0];

          // let i = _f.value.indexOf(val)

          // if (i < 0)
          //     _f.value.push(val)
          // else
          //     _f.value.splice(i, 1)
          _f.value = val; // do not implement multiple select
        } else {
          _f.value = val;
        }
        isSingle = false;
      }
    }
    if (isSingle) _f.value = type === 'daterange' ? {
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
  },
  clear: (state, {
    id,
    index
  }) => {
    //console.log(p)
    const _f = (0, _util.getField)(state, id, index);
    _f.value = '';
  }
};

//call('clear', { id, index })

const Clear = ({
  children,
  change,
  width,
  isRead
}) => isRead ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, children) : /*#__PURE__*/_react.default.createElement("div", {
  className: "form-clear-parent",
  style: {
    width
  }
}, children, /*#__PURE__*/_react.default.createElement("span", {
  className: "form-clear",
  onClick: () => change({
    target: {
      value: ''
    }
  })
}, /*#__PURE__*/_react.default.createElement(_ai.AiOutlineClose, null)));
const utControl = _this => props => {
  var _newList4, _f$valid, _f$valid2, _f$valid3, _f$valid4, _prop$style, _props$style;
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
    sortListBy,
    override2Decimal,
    allowNegative,
    noAutoWidth,
    onBlur,
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
  sortListBy = sortListBy || _f.sortListBy;
  override2Decimal = override2Decimal || _f.override2Decimal;
  allowNegative = allowNegative || _f.allowNegative;
  noAutoWidth = noAutoWidth || _f.noAutoWidth; // only for select use

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
  const _Blur = onBlur || _this.onBlur;
  const _Change = onChange || _this.onChange;
  const _KeyDown = onKeyDown || _this.onKeyDown;
  const _KeyPress = onKeyPress || _this.onKeyPress;
  const _isRead = (0, _lodash.isUndefined)(isRead) ? !((0, _lodash.isEmpty)(_p) ? _.isEdit : _p.isEdit) : isRead === 'true' || isRead;
  const _sortListBy = (0, _lodash.isUndefined)(sortListBy) ? _f.sortListBy : sortListBy;
  const _override2Decimal = (0, _lodash.isUndefined)(override2Decimal) ? _f.override2Decimal : override2Decimal;
  const _allowNegative = (0, _lodash.isUndefined)(allowNegative) ? _f.allowNegative : allowNegative;
  const _noAutoWidth = (0, _lodash.isUndefined)(noAutoWidth) ? _f.noAutoWidth : noAutoWidth;
  const _elem_id = name + '-' + id + '-' + st;
  const _id = _elem_id;

  //if(id== 'search') {
  //    console.log(_isRead)

  //}
  //if(id == 'billemail')
  //    console.log(_p)

  function getAutoWidthFromOptions(optionList, font = '14px Arial', padding = 30) {
    try {
      if (!Array.isArray(optionList)) return 'auto';
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      ctx.font = font;
      let maxWidth = 0;
      for (const [, text] of optionList) {
        if (typeof text === 'string') {
          maxWidth = Math.max(maxWidth, ctx.measureText(text).width);
        }
        // console.log("getAutoWidthFromOptions text: ", text, maxWidth)
      }
      // return Math.ceil(maxWidth + padding + 10) + 'px';
      return Math.ceil(maxWidth + padding + 10 + 20); // add 10 for very long option string
    } catch (e) {
      console.warn('getAutoWidthFromOptions error:', e);
      // return 'auto';
      return 0;
    }
  }
  switch (type) {
    case 'toggle':
      //console.log(value)
      return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_reactToggle.default, {
        "aria-label": _f.label,
        defaultChecked: value === true,
        disabled: _isRead,
        onBlur: _Blur({
          id,
          index,
          type
        }),
        onChange: _Change({
          id,
          index,
          type
        })
      }));
    case 'radio':
    //if (_isRead)
    //    return <div aria-label={_f.label}>{list[value]}</div>

    case 'checkbox':
      // return <div aria-label={_f.label}>
      //     {list ? Object.entries(list).map(([key, choice], i) =>
      //         <Form.Check inline disabled={_isRead}
      //             checked={value && value.split('|').indexOf(key) >= 0}
      //             style={{ padding: '8px 20px 0 0' }}
      //             key={key + i}
      //             id={_id + '-' + key}
      //             type={type}
      //             label={isObject(choice) && choice.child ? createElement(choice.child) : choice}
      //             // onBlur={_Blur({ id, key, index, type })}
      //             onChange={_Change({ id, key, index, type })} >
      //         </Form.Check>
      //     ) : null}
      // </div>

      // rules = key|value|key_skipHyphens|value_skipHyphens
      const rules = (_sortListBy == null ? void 0 : _sortListBy.split("_")) || [];
      let newList = list ? Object.entries(list) : null;
      if (_sortListBy && rules != null && rules.length) {
        // console.log({ newList, _sortListBy, rules })

        if (rules.length >= 2) {
          if (rules[1] === 'skipHyphens') {
            var _newList;
            newList = (_newList = newList) == null ? void 0 : _newList.filter(t => !/^[-]+$/.test(t == null ? void 0 : t[1]));
          } else {
            console.log("Warn: Checkbox sortListby " & rules[1] & "not valid");
          }
        }
        if (rules[0] === 'key') {
          var _newList2;
          newList = (_newList2 = newList) == null ? void 0 : _newList2.sort((a, b) => a == null ? void 0 : a[0].localeCompare(b == null ? void 0 : b[0]));
        } else if (rules[0] === 'value') {
          var _newList3;
          newList = (_newList3 = newList) == null ? void 0 : _newList3.sort((a, b) => a == null ? void 0 : a[1].localeCompare(b == null ? void 0 : b[1]));
        } else {
          console.log("Warn: Checkbox sortListBy " & rules[0] & " not valid");
        }
      }
      return /*#__PURE__*/_react.default.createElement("div", {
        "aria-label": _f.label
      }, (_newList4 = newList) == null ? void 0 : _newList4.map(([key, choice], i) => {
        var _value;
        return /*#__PURE__*/_react.default.createElement(_reactBootstrap.Form.Check, {
          inline: true,
          disabled: _isRead,
          checked: value && ((_value = value) == null ? void 0 : _value.split('|').indexOf(key)) >= 0,
          style: {
            padding: '8px 20px 0 0'
          },
          key: key + i,
          id: _id + '-' + key,
          type: type,
          label: (0, _lodash.isObject)(choice) && choice.child ? (0, _react.createElement)(choice.child) : choice
          // onBlur={_Blur({ id, key, index, type })}
          ,
          onChange: _Change({
            id,
            key,
            index,
            type
          })
        });
      }));
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
        selected: value,
        allowNew: _f.allowNew || false,
        newSelectionPrefix: _f.newSelectionPrefix || 'New selection:',
        clearButton: _f.clearButton || false,
        placeholder: _f.placeholder,
        onBlur: select => {
          _Blur({
            id,
            index,
            type
          })(select);
          _this.setState({});
        },
        onChange: select => {
          _Change({
            id,
            index,
            type
          })(select);
          _this.setState({});
        },
        options: _f.options || []
      }) : null;
    case 'select':
      let style = {};
      let lst = list || _list;
      const getValue = (val, key, choice, i) => (0, _lodash.indexOf)(val, key) < 0 ? null : /*#__PURE__*/_react.default.createElement("div", {
        key: key + '-' + i
      }, choice);
      const optionList = val => (0, _lodash.isArray)(lst) ? lst.map(([key, choice], i) => val ? getValue(val, key, choice, i) : /*#__PURE__*/_react.default.createElement("option", {
        key: key + '-' + i,
        value: key
      }, choice)) : lst ? Object.entries(lst).map(([key, choice], i) => val ? getValue(val, key, choice, i) : /*#__PURE__*/_react.default.createElement("option", {
        key: key + '-' + i,
        value: key
      }, choice)) : null;

      // // if props defined noAutoWidth, add it here
      // if (typeof _noAutoWidth !== 'undefined') {
      //     _prop.noAutoWidth = _noAutoWidth
      // }

      if (_f.format) {
        const _n = _f.format.split(',');
        const _l = _n.length;
        const _i = parseInt(_n[1]); // add by DY
        // if (_l > 0) style.width = parseInt(_n[0]) * 10 + 20 + 'px';

        if (_l > 0) {
          if (_i > 1 || typeof lst === 'undefined') {
            style.width = parseInt(_n[0]) * 10 + 20 + 'px';
          } else if (typeof lst !== 'undefined') {
            // Use auto-width based on text length
            const rawOptions = Array.isArray(lst) ? lst : Object.entries(lst);
            // style.width = parseInt(_n[0]) * 10 + 20 + 'px';  // restore to fixed width 
            // style.width = getAutoWidthFromOptions(rawOptions);
            if (_noAutoWidth) {
              style.width = parseInt(_n[0]) * 10 + 20 + 'px'; // restore to fixed width 
            } else {
              style.width = Math.max(getAutoWidthFromOptions(rawOptions), parseInt(_n[0]) * 10 + 20) + 'px'; // Ensure at least the min width
            }
          }
        }

        // if (_l > 0)
        //     style.width = (parseInt(_n[0]) * 10 + 20) + 'px'

        // const _i = parseInt(_n[1])

        if (_i > 1) {
          const _val = (0, _lodash.isArray)(value) ? value : [value];
          style.height = _i * 20 + 6 + 'px';
          return _isRead ? /*#__PURE__*/_react.default.createElement("div", null, optionList(_val)) : /*#__PURE__*/_react.default.createElement("select", {
            id: _elem_id,
            multiple: "multiple",
            className: "form-control",
            row: _n[1],
            value: _val || [],
            disabled: _isRead,
            "aria-label": _f.label,
            style: style
            // onChange={e => { }}
            ,
            onBlur: _Blur({
              id,
              index,
              type
            })
            // onChange={_Change({ id, index, type })}
            ,
            onChange: e => {
              const selected = Array.from(e.target.selectedOptions, o => {
                return {
                  value: o.value
                };
              });
              // console.log({selected, e})
              _Change({
                id,
                index,
                type
              })({
                target: {
                  selectedOptions: selected,
                  value: e.target.value
                }
              });
              // or, if you set value directly: setVal(selected)
            }
          }, optionList());
        }
      }
      return /*#__PURE__*/_react.default.createElement(_reactBootstrap.Form.Control, {
        id: _elem_id,
        as: type,
        value: value || '',
        disabled: _isRead,
        "aria-label": _f.label,
        style: style,
        onBlur: _Blur({
          id,
          index,
          type
        }),
        onChange: _Change({
          id,
          index,
          type
        })
      }, optionList());
    case 'singledatepicker':
      return /*#__PURE__*/_react.default.createElement(_daterange.SingleDate, {
        _elem_id,
        _f,
        _isRead,
        value,
        onBlur: _Blur({
          id,
          index,
          valid,
          type
        }),
        onChange: _Change({
          id,
          index,
          valid,
          type
        })
      });
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
        onBlur: _Blur({
          id,
          index,
          type
        }),
        onChange: _Change({
          id,
          index,
          type
        })
      });
    case 'date':
      return _isRead ? /*#__PURE__*/_react.default.createElement("div", {
        "aria-label": _f.label
      }, value) : /*#__PURE__*/_react.default.createElement(_daterange.DatePicker, {
        _f,
        _isRead,
        value,
        onBlur: _Blur({
          id,
          index,
          valid,
          type
        }),
        onChange: _Change({
          id,
          valid,
          index,
          type
        })
      });
    case 'numeric':
      const _prop = {
        className: 'form-control',
        value,
        thousandSeparator: ',',
        onBlur: _Blur({
          id,
          index,
          valid,
          type
        }),
        onChange: _Change({
          id,
          index,
          valid,
          type
        }),
        style: {
          textAlign: 'right',
          paddingRight: '20px'
        },
        getInputRef: el => {
          // Force !important right alignment even if style is overridden
          if (el) el.style.setProperty('text-align', 'right', 'important');
        },
        id: _id
      };

      // if props defined allowNegative, add it here
      if (typeof _override2Decimal === "undefined" || _override2Decimal === false) {
        _prop.decimalScale = 2;
        _prop.fixedDecimalScale = true;
      } else if (_override2Decimal && parseInt(_override2Decimal) > 0) {
        _prop.decimalScale = parseInt(_override2Decimal);
        _prop.fixedDecimalScale = true;
      } else if (_override2Decimal === "0" || _override2Decimal === 0) {
        _prop.decimalScale = parseInt(_override2Decimal);
        _prop.fixedDecimalScale = true;
      } else if (_override2Decimal === true) {
        // do nothing
      }

      // if props defined allowNegative, add it here
      if (typeof _allowNegative !== 'undefined') {
        _prop.allowNegative = _allowNegative;
      }

      // valid.min overrid props allowNegative to resolve logical deadlock
      if ((_f == null || (_f$valid = _f.valid) == null ? void 0 : _f$valid.min) >= 0) {
        _prop.allowNegative = false;
      } else if ((_f == null || (_f$valid2 = _f.valid) == null ? void 0 : _f$valid2.min) < 0 || (_f == null || (_f$valid3 = _f.valid) == null ? void 0 : _f$valid3.max) < 0) {
        _prop.allowNegative = true;
      }

      // if (_f?.valid?.pattern === "This is a numeric field with at most 2 decimal places.") {
      //     _prop.decimalScale = 2;
      //     _prop.fixedDecimalScale = true;
      // }

      const matchDec = _f == null || (_f$valid4 = _f.valid) == null || (_f$valid4 = _f$valid4.pattern) == null ? void 0 : _f$valid4.match(/numeric field with at most (\d+) decimal/);
      if (matchDec && matchDec[1]) {
        _prop.decimalScale = parseInt(matchDec[1]);
        _prop.fixedDecimalScale = true;
      }
      if (_isRead) {
        _prop.displayType = 'text';
        _prop.className += ' field-ready-only';
      }
      if (_f.format) {
        const _n = _f.format.split(',');
        const _l = _n.length;
        if (_l >= 2) {
          if (_n[0] === 'Text') {
            // if (_n[0] === 'Text' || _n[0] === 'Number')  // 1) no effect for type=number in HTML
            // _prop.maxLength = _n[2]                      // 2）Overrided by null and digits.length below
            // const maxLengthCalc = _n[2] - (matchDec?.[1] || 0) - (matchDec?.[1]? 1 : 0)
            const maxLengthCalc = _n[2];
            if (!_f.props) _f.props = {};
            _f.props.isAllowed = values => {
              // Remove everything except digits
              const fieldInput = values.value || '';
              const matchDigit = fieldInput.match(/[^\.]*(\.\d*)/);
              const fieldDec = matchDigit && matchDigit[1] ? matchDigit[1] : "";
              const decDigits = (fieldDec == null ? void 0 : fieldDec.length) || 0;
              let intDigits = ((fieldInput == null ? void 0 : fieldInput.length) || 0) - decDigits;
              // console.log(intDigits, Math.trunc((intDigits - 0.1) / 3 ) )
              intDigits = intDigits + Math.trunc((intDigits - 0.1) / 3); // add length for ","
              const totalDigits = intDigits + decDigits;
              // console.log({maxLengthCalc, fieldInput, fieldInputLen:fieldInput?.length, intDigits, decDigits, totalDigits})
              // Allow max digits (before decimal)
              // return digits.length <= Math.max(maxLengthCalc != null ? maxLengthCalc : 0, 0);
              return totalDigits <= Math.max(maxLengthCalc != null ? maxLengthCalc : 0, 0);
            };
            _f.props.maxLength = null;
          }
          if (_l >= 3) {
            // add 000 separator for numWidth space
            var numWidth = parseInt(_n[1]);
            // numWidth = numWidth + Math.trunc((numWidth - (matchDec?.[1] || 0) - 0.1) / 3)     // parseInt(_n[2]) not always show decimal places in program codes
            numWidth = numWidth + Math.trunc((numWidth - ((_prop == null ? void 0 : _prop.decimalScale) || 0) - 0.1) / 3); // parseInt(_n[2]) not always show decimal places in program codes
            _prop.style.width = numWidth * 8 + 30 + 'px';
          }
        }
      }
      if (hint) _prop.placeholder = hint;

      // console.log({ _prop, _f, _fprops: _f.props })
      return /*#__PURE__*/_react.default.createElement(Clear, {
        change: _Change({
          id,
          valid,
          index,
          type
        }),
        isRead: isRead,
        width: ((_prop$style = _prop.style) == null ? void 0 : _prop$style.width) || 'auto'
      }, /*#__PURE__*/_react.default.createElement(_reactNumberFormat.NumericFormat, (0, _extends2.default)({}, _prop, _f.props)));
    case 'password':
      if (_isRead) return value ? value.replace(/[^*]/gm, '•') : '';

    // Continues to next case

    case 'number':
    case 'text':
    case 'textarea':
      //return <Form.Control id='xxx' type='text' value={_.fields.name.value} onChange={e =>   
      //    call('change', {id, val:e.target.value})} />

      // disable simple return div when readOnly
      // if (_isRead)
      if (_isRead && type != 'textarea') return /*#__PURE__*/_react.default.createElement("div", {
        "aria-label": _f.label
      }, value);
      delete props.isRead;
      const _props = (0, _extends2.default)({}, props, {
        type,
        id: _id,
        value: value || '',
        onBlur: _Blur({
          id,
          valid,
          index,
          type
        }),
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

        // If readOnly then recalc field width to override original page setting 
        if (_isRead && type === 'text') {
          const textWidth = getAutoWidthFromOptions([["dummy", (_props == null ? void 0 : _props.value) || ""]]) - 30 || 0; // getAutoWidthFromOptions has 30 buffer on top of padding
          const n1Width = _n != null && _n[1] ? parseInt(_n[1]) * 8 + 20 : 0;
          // console.log("readOnly getAutoWidthFromOptions", _id, id, _props.value, textWidth)
          // _props.maxLength = getAutoWidthFromOptions([["dummy", _props.value]])
          if (textWidth || n1Width) {
            _props.style.width = Math.max(textWidth, n1Width) + 'px'; // Ensure at least the min width
            // _props.style.width = textWidth + 'px'  // Just fit with the text length for testing
          }
        }
      }
      if (hint) _props.placeholder = hint;
      return /*#__PURE__*/_react.default.createElement(Clear, {
        change: _Change({
          id,
          valid,
          index,
          type
        }),
        isRead: _isRead,
        width: ((_props$style = _props.style) == null ? void 0 : _props$style.width) || 'auto'
      }, /*#__PURE__*/_react.default.createElement(_reactBootstrap.Form.Control, (0, _extends2.default)({}, _props, {
        key: 'f=' + id,
        'aria-label': _f.label,
        readOnly: _isRead
      })));
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
          onBlur: _Blur({
            id,
            valid,
            index,
            type
          }),
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