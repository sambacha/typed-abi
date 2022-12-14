"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBooleanValue = exports.bool = void 0;

var _number = require("./number");

const getBooleanValue = value => {
  if (value === true || typeof value === 'string' && value === 'true' || value === 'yes') {
    return 1n;
  }

  return 0n;
};

exports.getBooleanValue = getBooleanValue;
const bool = {
  isDynamic: false,

  encode({
    buffer,
    value
  }) {
    const booleanValue = getBooleanValue(value);
    return _number.number.encode({
      type: 'uint256',
      buffer,
      value: booleanValue
    });
  },

  decode(args) {
    return _number.number.decode({ ...args,
      type: 'uint256'
    }) === 1n;
  }

};
exports.bool = bool;
//# sourceMappingURL=bool.js.map