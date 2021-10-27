"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

exports.__esModule = true;
exports.useForm = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _field = require("./field");

var _control = require("./control");

var _date = require("./date");

var _section = require("./section");

var _modal = require("./modal");

var _container = require("./container");

var _table = require("./table");

var _lodash = require("lodash");

const useForm = (_this, extend) => {
  ['onKeyPress', 'onKeyDown', 'fieldOnChange'].forEach(t => {
    if (!_this[t]) _this[t] = () => true;
  });
  _this.getField = (0, _field.getInitField)(_this);
  _this.onChange = (0, _field.onChange)(_this);
  _this.Control = (0, _control.utControl)(_this);
  _this.InputDate = (0, _date.utInputDate)(_this);
  _this.PopupModal = (0, _modal.PopupModal)(_this);
  _this.ButtonGroup = _container.utButtonGroup;
  _this.Form = (0, _container.utForm)(_this);
  _this.Columns = _container.utColumns;
  _this.Grid = (0, _table.utView)(_this);
  _this.sectionSave = (0, _section.utSectionSave)(_this);
  _this.goBack = (0, _table.goBack)(_this);
  _this.getSelectedRowID = (0, _table.getSelectedRowID)(_this);
  let _extend = {};
  if ((0, _lodash.isFunction)(extend)) _extend = extend(_this);
  return (0, _extends2.default)({
    getField: _this.getField,
    Control: _this.Control,
    Field: (0, _field.utfield)(_this),
    Section: (0, _section.utSection)(_this),
    popup: (0, _modal.popup)(_this),
    popupClose: (0, _modal.popupClose)(_this),
    PopupModal: _this.PopupModal,
    Popup: (0, _modal.utPopup)(_this),
    ButtonGroup: _this.ButtonGroup,
    Form: _this.Form,
    Columns: _this.Columns,
    Grid: _this.Grid
  }, _extend);
};

exports.useForm = useForm;