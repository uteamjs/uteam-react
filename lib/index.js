"use strict";

exports.__esModule = true;
var _exportNames = {
  style: true
};
exports.style = void 0;
var _store = require("./core/store");
Object.keys(_store).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _store[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _store[key];
    }
  });
});
var _util = require("./core/util");
Object.keys(_util).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _util[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _util[key];
    }
  });
});
var _form = require("./form/form");
Object.keys(_form).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _form[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _form[key];
    }
  });
});
var _reducer = require("./form/reducer");
Object.keys(_reducer).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _reducer[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _reducer[key];
    }
  });
});
var _table = require("./form/table");
Object.keys(_table).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _table[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _table[key];
    }
  });
});
var _util2 = require("./form/util");
Object.keys(_util2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _util2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _util2[key];
    }
  });
});
var _formhook = require("./form/formhook");
Object.keys(_formhook).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _formhook[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _formhook[key];
    }
  });
});
var _validate = require("./form/validate");
Object.keys(_validate).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _validate[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _validate[key];
    }
  });
});
const style = ":export {\n  iconSize: 20;\n}";
exports.style = style;