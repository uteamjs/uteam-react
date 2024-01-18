"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
exports.__esModule = true;
exports.TabItem = exports.TabBar = void 0;
var _react = _interopRequireDefault(require("react"));
var _Nav = _interopRequireDefault(require("react-bootstrap/Nav"));
const TabBar = ({
  children,
  tabKey
}) => /*#__PURE__*/_react.default.createElement(_Nav.default, {
  variant: "tabs",
  defaultActiveKey: tabKey
}, children);
exports.TabBar = TabBar;
const TabItem = ({
  href,
  eventKey,
  caption,
  classname
}) => /*#__PURE__*/_react.default.createElement(_Nav.default.Item, null, /*#__PURE__*/_react.default.createElement(_Nav.default.Link, {
  href: href,
  eventKey: eventKey,
  className: classname
}, caption));
exports.TabItem = TabItem;