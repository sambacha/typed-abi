"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFunction = exports.fn = void 0;

var _utils = require("../utils");

var _fixedBytes = require("./fixed-bytes");

const getFunction = input => {
  if (typeof input === 'string') {
    return (0, _utils.fromHex)(input);
  }

  return (0, _utils.concat)([(0, _utils.fromHex)(input.address), (0, _utils.fromHex)(input.selector)]);
};

exports.getFunction = getFunction;
const fn = {
  isDynamic: false,

  encode({
    buffer,
    value
  }) {
    const fn = getFunction(value);
    return _fixedBytes.fixedBytes.encode({
      type: 'bytes24',
      buffer,
      value: fn
    });
  },

  decode({
    value
  }) {
    return {
      address: `0x${(0, _utils.toHex)(value.slice(0, 20))}`,
      selector: (0, _utils.toHex)(value.slice(20, 24))
    };
  }

};
exports.fn = fn;
//# sourceMappingURL=function.js.map