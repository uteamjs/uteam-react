"use strict";

exports.__esModule = true;
exports.pattern = exports.check = void 0;
var _lodash = require("lodash");
const pattern = exports.pattern = {
  date: {
    mask: '(0?[1-9]|[12][0-9]|3[01])\\/(0?[1-9]|1[1,2])\\/(19|20)\\d{2}',
    pattern: 'Date format in d/m/yyyy'
  },
  integer: {
    mask: '^(?:-?[1-9]\\d*$)|(?:^0)$',
    pattern: 'Integer only',
    tight: true
  },
  currency: {
    mask: "^\\$?[1-9]\\d{0,3}?(?:,\\d{3})*(?:\\.\\d{1,3})?$",
    pattern: 'Currency only $0,000.00'
  },
  mandatory: {
    mask: a => a != null && a != '' && !((0, _lodash.isString)(a) && a.trim() == ''),
    pattern: 'This is a mandatory field.'
  },
  email: {
    mask: "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$",
    pattern: 'You have entered an invalid email address!'
  },
  hkid: {
    mask: '^([A-Z]{1,2})([0-9]{6})\\(([A0-9])\\)$',
    pattern: 'AXXXXXX(X)'
  },
  password: {
    mask: "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$",
    pattern: 'Minimum eight characters, at least one letter and one number'
  },
  creditCard: {
    mask: '^(?:4[0-9]{12}(?:[0-9]{3})?' +
    // Visa
    '|(?:5[1-5][0-9]{2}' +
    // MasterCard
    '|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}' + '|3[47][0-9]{13})$',
    // American Express
    pattern: 'VISA xxxx xxxx xxxx xxxx | AMEX xxx xxxxxx xxxxx'
  }
};
const dstr = d => d.toLocaleDateString('en-HK');
const msg = (a, b, c) => `${a} is ${c} then ${b}`;
const yyyymd = /(19|20)\d{2}\/(0?[1-9]|1[1,2])\/(0?[1-9]|[12][0-9]|3[01])/;
const check = ({
  val,
  o
}) => {
  let error = null;

  //console.log(val, o)

  if ((0, _lodash.isDate)(val)) {
    let mmx;
    if (o.max) {
      if ((0, _lodash.isString)(o.max)) {
        if (o.max.match(yyyymd)) mmx = new Date(o.max);else return `Invalid max value: ${o.max}`;
      } else mmx = o.max;
      if (val > mmx) return msg(dstr(val), dstr(mmx), 'greater');
    }
    if (o.min) {
      if ((0, _lodash.isString)(o.min)) {
        if (o.min.match(yyyymd)) mmx = new Date(o.min);else return `Invalid min value: ${o.min}`;
      } else mmx = o.min;
      if (val < mmx) return msg(dstr(val), dstr(mmx), 'less');
    }
  } else {
    if (o.mask && typeof o.mask == 'function') {
      if (!o.mask(val)) return o.pattern;
    }
    if (o.mask && val !== '' && typeof o.mask != 'function') {
      //console.log(val.match(new RegExp(o.mask)))
      if (val.match(new RegExp(o.mask)) === null) {
        //console.log(22,'is.null', o.pattern)
        return o.pattern;
      }
    }

    // Remove any currency notation
    val = val.replaceAll(/\$|\,/g, '');
    if (o.max && val > o.max) return `${val} is greater than ${o.max}`;
    if (o.min && val < o.min) return `${val} is smaller than ${o.min}`;
    if (val.length > o.len) return `Length is longer than ${o.len} characters`;
    return error;
  }
};
exports.check = check;
exports.check = check;