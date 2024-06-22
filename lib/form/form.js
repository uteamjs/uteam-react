"use strict";

exports.__esModule = true;
Object.defineProperty(exports, "pattern", {
  enumerable: true,
  get: function () {
    return _validate.pattern;
  }
});
exports.utform = void 0;
var _react = require("react");
var _validate = require("./validate");
var _field = require("./field");
var _control = require("./control");
var _date = require("./date");
var _section = require("./section");
var _multiEdit = require("./multiEdit");
var _modal = require("./modal");
var _container = require("./container");
var _table = require("./table");
require("react-day-picker/src/style.css");
(function () {
  if (typeof document === "undefined") {
    return;
  }
  const styles = ":export {\n  iconSize: 20;\n}\n\n:export {\n  iconSize: 20;\n}\n\n.section {\n  background-color: white;\n  margin: 10px 0;\n  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);\n}\n.section > div.show {\n  display: block;\n}\n.section > div.hide {\n  display: none !important;\n}\n.section .pending {\n  background-color: #ebecae;\n}\n.section .cache {\n  background-color: #c2f1ee;\n}\n.section > div:first-child {\n  background: #f5f5f5;\n  padding: 10px 20px;\n}\n.section > div:last-child {\n  background: white;\n  padding: 10px 20px;\n  display: flex;\n  flex-direction: column;\n}\n.section .col:last-child {\n  border-left: 1px solid #e2e2e2;\n}\n.section .form-group.row {\n  align-items: flex-end;\n}\n.section .form-control {\n  font-size: 14px;\n  padding-top: 0;\n  padding-bottom: 0;\n}\n.section .section-title {\n  font-weight: bold;\n  display: inline-block;\n  vertical-align: middle;\n}\n.section .section-icon {\n  display: inline-block;\n  color: #fa0000;\n  background-color: white;\n  padding: 10px;\n  margin-right: 20px;\n  border-radius: 20px;\n}\n.section .section-action {\n  float: right;\n}\n.section .section-action > .badge {\n  color: white;\n  background-color: #fa0000;\n  width: 24px;\n  height: 24px;\n  padding: 6px;\n  border-radius: 12px;\n}\n.section .section-action > svg {\n  margin-left: 20px;\n}\n\n:export {\n  iconSize: 20;\n}\n\n.multi-edit {\n  margin: 10px 0;\n  overflow-y: auto;\n  display: flex;\n  flex-direction: column;\n}\n.multi-edit > div:last-child {\n  flex: 1;\n  overflow-y: auto;\n}\n.multi-edit .hide {\n  display: none;\n}\n.multi-edit > div:first-child {\n  font-weight: bold;\n}\n.multi-edit > div:first-child > svg {\n  margin-left: 10px;\n}\n.multi-edit > div:last-child {\n  border: 1px solid grey;\n  margin-top: 5px;\n  padding: 0 10px;\n}\n.multi-edit .field-group-item {\n  margin: 10px 0;\n  padding: 10px 15px;\n  border: 1px solid #cccccc;\n}\n.multi-edit .field-group-item > div {\n  clear: both;\n}\n.multi-edit .field-group-item > svg {\n  float: right;\n}\n\n.multi-edit-section {\n  display: flex;\n  flex-direction: column;\n}\n.multi-edit-section > div:last-child {\n  flex: 1;\n  overflow-y: auto;\n}\n\n.field-ready-only {\n  background-color: #e9ebee;\n}\n\n.form-clear-parent {\n  position: relative;\n}\n\n.form-clear > svg:hover {\n  opacity: 0.6;\n}\n\n.form-clear > svg {\n  opacity: 0;\n}\n\n.form-clear {\n  cursor: pointer;\n  display: flex;\n  position: absolute;\n  right: 0;\n  bottom: 10px;\n  width: 20px;\n}\n\n.form-group.row {\n  align-items: flex-end;\n}\n\n.form-label {\n  color: gray;\n  font-size: 14px;\n}\n\nbutton#ut-pop-close {\n  float: right;\n}\n\n.button-group {\n  margin: 10px 0;\n}\n.button-group > div {\n  float: right;\n}\n.button-group button, .button-group a {\n  margin-left: 5px;\n}\n\n.mandate {\n  color: #fa0000;\n}\n\n.field-append {\n  display: flex;\n}\n.field-append > svg {\n  margin-left: 10px;\n  margin-top: 5px;\n}\n\n.date-range > span {\n  vertical-align: middle;\n}\n\n.DayPicker {\n  margin-left: -16px;\n  min-height: 326px;\n}\n\n.DayPicker-wrapper {\n  padding-bottom: 0;\n}\n\n.day-picker {\n  display: flex;\n  max-width: 280px;\n}\n.day-picker > select {\n  width: 65px;\n  margin-right: 5px;\n}\n.day-picker > select:nth-child(2) {\n  width: 75px;\n}\n.day-picker > select:nth-child(3) {\n  width: 85px;\n}\n\n.tab-content {\n  padding: 10px;\n  padding-top: 20px;\n  background-color: white;\n  border: 1px solid #dee2e6;\n  border-top: none;\n}";
  const fileName = "form_form_1b398a0e-5905-44c0-8fcd-e324b82017ca";
  const element = document.querySelector("style[data-sass-component='form_form_1b398a0e-5905-44c0-8fcd-e324b82017ca']");
  if (!element) {
    const styleBlock = document.createElement("style");
    styleBlock.innerHTML = styles;
    styleBlock.setAttribute("data-sass-component", fileName);
    document.head.appendChild(styleBlock);
  } else {
    element.innerHTML = styles;
  }
})();
class utform extends _react.Component {
  constructor(...args) {
    super(...args);
    this.Section = (0, _section.utSection)(this);
    this.sectionSave = (0, _section.utSectionSave)(this);
    this.MultiEdit = (0, _multiEdit.utMultiEdit)(this);
    this.onKeyPress = () => {};
    this.onKeyDown = () => {};
    this.ButtonGroup = _container.utButtonGroup;
    this.Form = (0, _container.utForm)(this);
    this.Columns = _container.utColumns;
    this.getField = (0, _field.getInitField)(this);
    this.fieldOnChange = () => true;
    this.onChange = (0, _field.onChange)(this);
    this.Field = (0, _field.utfield)(this);
    this.PopupModal = (0, _modal.PopupModal)(this);
    this.Popup = (0, _modal.utPopup)(this);
    this.popup = (0, _modal.popup)(this);
    this.popupClose = (0, _modal.popupClose)(this);
    this.InputDate = (0, _date.utInputDate)(this);
    this.Control = (0, _control.utControl)(this);
    this.Grid = (0, _table.utView)(this);
    this.goBack = (0, _table.goBack)(this);
    this.getSelectedRowID = (0, _table.getSelectedRowID)(this);
    this.girdQuickSearch = params => e => {
      this.gridapi.setQuickFilter(e.target.value);
      this.onChange(params)(e);
    };
  }
}
exports.utform = utform;