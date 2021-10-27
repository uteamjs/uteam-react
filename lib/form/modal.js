"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

exports.__esModule = true;
exports.utPopup = exports.popupClose = exports.popup = exports.PopupModal = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _reactBootstrap = require("react-bootstrap");

var _react2 = require("@uteamjs/react");

// Popup
const PopupModal = _this => ({
  show,
  close,
  title,
  children,
  isLoading: _isLoading = false,
  size: _size = 'lg',
  param
}) => {
  const {
    Header,
    Title,
    Body
  } = _reactBootstrap.Modal;
  const {
    call
  } = _this.props;

  const _close = close || (() => call('popup', null));

  return /*#__PURE__*/_react.default.createElement(_reactBootstrap.Modal, {
    show: show,
    onHide: _close,
    centered: true,
    size: _size
  }, _close || title ? /*#__PURE__*/_react.default.createElement(Header, {
    closeButton: _close
  }, title ? /*#__PURE__*/_react.default.createElement(Title, null, title) : null) : null, /*#__PURE__*/_react.default.createElement(Body, null,
  /*children.$$typeof &&
     children.$$typeof == Symbol.for('react.lazy')*/
  true ? /*#__PURE__*/_react.default.createElement(_react2.Loading, null, children) : children));
}; // Place in form content


exports.PopupModal = PopupModal;

const utPopup = _this => () => {
  const {
    PopupModal
  } = _this;

  const _ = _this.props._ || _this.props.init._;

  const {
    popup
  } = _;
  if (!popup) return null;
  const {
    Elem,
    props
  } = popup;
  return Elem ? /*#__PURE__*/_react.default.createElement(PopupModal, (0, _extends2.default)({
    show: true
  }, props), /*#__PURE__*/_react.default.createElement(Elem, {
    key: "pop-main"
  })) : null;
}; // Call by actions


exports.utPopup = utPopup;

const popup = _this => (Elem, props) => () => {
  _this.props.call('popup', {
    Elem,
    props
  });
};

exports.popup = popup;

const popupClose = _this => () => _this.props.call('popup', null);

exports.popupClose = popupClose;