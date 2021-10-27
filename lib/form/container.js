"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

exports.__esModule = true;
exports.utForm = exports.utColumns = exports.utButtonGroup = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactBootstrap = require("react-bootstrap");

const utButtonGroup = props => {
  let _props;

  if (props.left) _props = {
    style: {
      float: 'none'
    }
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "button-group"
  }, /*#__PURE__*/_react.default.createElement("div", _props, props.children));
};

exports.utButtonGroup = utButtonGroup;

const utForm = _this => ({
  isConfirm: _isConfirm = true,
  className,
  children
}) => {
  const _ = _this.props._ || _this.props.init._;

  const {
    isChanged
  } = _this.props._;
  return /*#__PURE__*/_react.default.createElement(_reactBootstrap.Form, {
    className: className
  }, /*#__PURE__*/_react.default.createElement(Prompt, {
    when: _isConfirm && isChanged === true,
    message: location => `Input not saved!\nAre you sure you want to go to ${location.pathname}?`
  }), children);
};

exports.utForm = utForm;

const utColumns = ({
  children,
  width
}) => /*#__PURE__*/_react.default.createElement(_reactBootstrap.Row, null, children.map((t, i) => {
  const _props = {
    key: i
  };
  if (width) _props.sm = width[i];
  return /*#__PURE__*/_react.default.createElement(_reactBootstrap.Col, _props, t);
}));

exports.utColumns = utColumns;