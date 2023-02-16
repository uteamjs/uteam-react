"use strict";

exports.__esModule = true;
exports.getField = void 0;
const getField = (state, id, index) => typeof index === 'undefined' ? state.fieldList[id].link : state.fieldList[id].parent.rows[index][id];
exports.getField = getField;