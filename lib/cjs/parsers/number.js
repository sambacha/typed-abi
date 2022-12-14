"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.number = exports.isSigned = exports.asNumber = void 0;

var _utils = require("../utils");

const NUMBER_REGEX = /^u?int([0-9]*)?$/;

const isSigned = type => {
  return !type.startsWith('u');
};

exports.isSigned = isSigned;

const asNumber = value => {
  if (typeof value === 'bigint') {
    return value;
  }

  return BigInt(value);
};

exports.asNumber = asNumber;
const number = {
  isDynamic: false,

  isType(type) {
    return NUMBER_REGEX.test(type);
  },

  encode({
    type,
    buffer,
    value
  }) {
    const number = asNumber(value);

    if (isSigned(type)) {
      return (0, _utils.concat)([buffer, (0, _utils.toTwosComplement)(number, 32)]);
    }

    return (0, _utils.concat)([buffer, (0, _utils.toBuffer)(number)]);
  },

  decode({
    type,
    value
  }) {
    const buffer = value.slice(0, 32);

    if (isSigned(type)) {
      return (0, _utils.fromTwosComplement)(buffer);
    }

    return (0, _utils.toNumber)(buffer);
  }

};
exports.number = number;
//# sourceMappingURL=number.js.map