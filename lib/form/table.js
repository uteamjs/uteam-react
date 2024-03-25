"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
exports.__esModule = true;
exports.utView = exports.goBack = exports.getSelectedRowID = exports.addLink = exports.addButton = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _react = _interopRequireDefault(require("react"));
var _agGridReact = require("ag-grid-react");
require("ag-grid-community/styles/ag-grid.min.css");
require("ag-grid-community/styles/ag-theme-alpine.min.css");
//import { ProgressBar } from 'react-toastify/dist/components'

const _add = comp => (id, Obj, func) => ({
  click: {
    cellRenderer: id,
    cellRendererParams: {
      clicked: func
    }
  },
  call: {
    [id]: ({
      clicked,
      data
    }) => comp(Obj, clicked, data)
  }
});
const addButton = exports.addButton = _add((Obj, clicked, data) => /*#__PURE__*/_react.default.createElement("center", {
  className: "link"
}, /*#__PURE__*/_react.default.createElement(Obj, {
  onClick: () => clicked(data)
})));
const addLink = exports.addLink = _add((Obj, clicked, data) => /*#__PURE__*/_react.default.createElement("a", {
  className: "link",
  onClick: () => clicked(data)
}, data[Obj]));
const utView = _this => props => {
  const _ = _this.props._ || _this.props.init._;
  const id = props.id;
  const p = id ? _.grid[id] : _;
  const _props = (0, _extends2.default)({}, props, {
    modules: _agGridReact.AllCommunityModules,
    columnDefs: p.columns,
    rowData: p.rows
  });
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "ag-theme-alpine",
    style: (0, _extends2.default)({}, props.style)
  }, /*#__PURE__*/_react.default.createElement(_agGridReact.AgGridReact, _props));
};
exports.utView = utView;
const goBack = _this => () => _this.props.history.goBack();
exports.goBack = goBack;
const getSelectedRowID = _this => () => _this.gridapi.getSelectedNodes().map(t => t.data.id);
exports.getSelectedRowID = getSelectedRowID;