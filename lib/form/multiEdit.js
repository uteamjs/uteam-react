"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
exports.__esModule = true;
exports.utMultiEdit = exports.utMultiAction = void 0;
var _react = _interopRequireDefault(require("react"));
var _bi = require("react-icons/bi");
var _2 = require("../..");
const utMultiAction = {
  addGroup: (state, fields) => {
    const data = Object.keys(fields.child).reduce((r, key) => {
      r[key] = {
        value: ''
      };
      return r;
    }, {});
    fields.rows.push(data);
  },
  deleteGroup: (state, {
    fields,
    i
  }) => fields.rows.splice(i, 1)
};
exports.utMultiAction = utMultiAction;
const utMultiEdit = _this => ({
  group,
  fields,
  title
}) => {
  const {
    FieldGroup
  } = _this;
  const {
    _,
    call
  } = _this.props;
  const _hide = _.isEdit || _.fields[group].isEdit ? '' : 'hide';
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "multi-edit"
  }, /*#__PURE__*/_react.default.createElement("div", null, title, /*#__PURE__*/_react.default.createElement(_bi.BiAddToQueue, {
    className: _hide,
    onClick: () => call('addGroup', fields, () => {
      console.log('scroll..', _this.multiEdit);
      _this.multiEdit.scrollIntoView({
        block: 'end',
        behavior: 'smooth'
      });
    }),
    size: _2.style.iconSize
  })), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
    ref: ref => _this.multiEdit = ref
  }, fields.rows.map((t, i) => /*#__PURE__*/_react.default.createElement("div", {
    key: 'fg' + i,
    className: "field-group-item "
  }, "# ", i + 1, /*#__PURE__*/_react.default.createElement(_bi.BiTrash, {
    size: _2.style.iconSize,
    className: _hide,
    onClick: () => call('deleteGroup', {
      fields,
      i
    })
  }), /*#__PURE__*/_react.default.createElement(FieldGroup, {
    name: group,
    index: i
  }))))));
};
exports.utMultiEdit = utMultiEdit;