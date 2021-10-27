"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

exports.__esModule = true;
exports.utSectionSave = exports.utSectionActions = exports.utSection = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _fi = require("react-icons/fi");

var _ai = require("react-icons/ai");

var _2 = require("../..");

const utSectionActions = {
  toggleSection: (state, {
    id
  }) => {
    state.section = state.section || {};
    state.section[id] = !state.section[id];
  },
  load: (state, _) => state.fields = _.fields,
  save: (state, {
    id
  }) => {
    state.isChanged = false;

    const _f = state.fields[id] || state;

    _f.isEdit = false;
  },
  edit: (state, {
    id
  }) => {
    const _f = state.fields[id] || state;

    _f.isEdit = true;
  },
  pending: (state, {
    id
  }) => {
    const _f = state.fields[id] || state;

    _f.isPending = !_f.isPending;
  },
  cache: state => state.isCache = !state.isCache
};
exports.utSectionActions = utSectionActions;

const utSectionSave = _this => ({
  id,
  call
}) => () => call('save', {
  id
});

exports.utSectionSave = utSectionSave;

const utSection = _this => ({
  id,
  Icon,
  title,
  backgroundColor,
  badge,
  className: _className = '',
  drag,
  color,
  isCache: _isCache = false,
  group,
  isPending: _isPending = false,
  isSave: _isSave = true,
  isCollapse: _isCollapse = true,
  isEditable: _isEditable = true,
  PostAction,
  children
}) => {
  const {
    LifeCycle,
    sectionSave,
    props
  } = _this;

  const _ = props._ || props.init._;

  const {
    call
  } = props;

  const Collapse = () => {
    const FiIcon = _.section && _.section[id] ? _fi.FiChevronDown : _fi.FiChevronUp;
    return /*#__PURE__*/_react.default.createElement(FiIcon, {
      size: _2.style.iconSize,
      onClick: () => call('toggleSection', {
        id
      })
    });
  };

  const Modify = () => {
    if (_.fields[id] ? _.fields[id].isEdit : _.isEdit) return /*#__PURE__*/_react.default.createElement(_fi.FiSave, {
      size: _2.style.iconSize,
      onClick: sectionSave({
        id,
        call
      })
    });else return /*#__PURE__*/_react.default.createElement(_fi.FiEdit, {
      size: _2.style.iconSize,
      onClick: () => {
        call('edit', {
          id
        });
      }
    });
  };

  const _style = backgroundColor ? {
    backgroundColor
  } : {};

  if (color) _style.color = color;
  let _props = {
    id,
    className: _className + ' section '
  };
  if (drag) _props = (0, _extends2.default)({}, _props, drag);
  return /*#__PURE__*/_react.default.createElement("div", _props, /*#__PURE__*/_react.default.createElement("div", {
    style: _style
  }, Icon ? /*#__PURE__*/_react.default.createElement("div", {
    className: "section-icon"
  }, /*#__PURE__*/_react.default.createElement(Icon, {
    size: _2.style.iconSize
  })) : null, /*#__PURE__*/_react.default.createElement("div", {
    className: "section-title"
  }, title), /*#__PURE__*/_react.default.createElement("div", {
    className: "section-action"
  }, badge ? /*#__PURE__*/_react.default.createElement("div", {
    className: "badge"
  }, badge) : null, _isPending && _isEditable ? /*#__PURE__*/_react.default.createElement(_ai.AiOutlineHourglass, {
    size: _2.style.iconSize,
    onClick: () => call('pending', {
      id
    })
  }) : null, _isCache && _isEditable ? /*#__PURE__*/_react.default.createElement(_ai.AiOutlineCloudSync, {
    size: _2.style.iconSize,
    onClick: () => call('cache', {
      id
    })
  }) : null, _isSave && _isEditable ? /*#__PURE__*/_react.default.createElement(Modify, null) : null, PostAction ? /*#__PURE__*/_react.default.createElement(PostAction, null) : null, _isCollapse ? /*#__PURE__*/_react.default.createElement(Collapse, null) : null)), /*#__PURE__*/_react.default.createElement("div", {
    className: _.section && _.section[id] ? 'hide' : ''
  }, group ? /*#__PURE__*/_react.default.createElement(LifeCycle, {
    group: group,
    section: id
  }) : children));
};

exports.utSection = utSection;