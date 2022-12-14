"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getByteLength = exports.fixedBytes = void 0;

var _utils = require("../utils");

const BYTES_REGEX = /^bytes([0-9]{1,2})$/;

const getByteLength = type => {
  var _type$match;

  const bytes = (_type$match = type.match(BYTES_REGEX)) === null || _type$match === void 0 ? void 0 : _type$match[1];

  if (bytes) {
    const length = Number(bytes);

    if (length <= 0 || length > 32) {
      throw new Error('Invalid type: length is out of range');
    }

    return length;
  }

  throw new Error('Invalid type: no length');
};

exports.getByteLength = getByteLength;
const fixedBytes = {
  isDynamic: false,

  isType(type) {
    return BYTES_REGEX.test(type);
  },

  encode({
    type,
    buffer,
    value
  }) {
    const length = getByteLength(type);
    const bufferValue = (0, _utils.toBuffer)(value);

    if (bufferValue.length !== length) {
      throw new Error(`Buffer has invalid length, expected ${length}, got ${bufferValue.length}`);
    }

    return (0, _utils.concat)([buffer, (0, _utils.addPadding)(bufferValue)]);
  },

  decode({
    type,
    value
  }) {
    const length = getByteLength(type);
    return value.slice(0, length);
  }

};
exports.fixedBytes = fixedBytes;
//# sourceMappingURL=fixed-bytes.js.map