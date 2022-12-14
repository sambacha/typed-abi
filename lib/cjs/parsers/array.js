"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getArrayType = exports.array = void 0;

var _packer = require("../packer");

var _utils = require("../utils");

const ARRAY_REGEX = /^(.*)\[]$/;

const getArrayType = type => {
  const match = type.match(ARRAY_REGEX);

  if (match) {
    return match[1];
  }

  throw new Error('Type is not an array type');
};

exports.getArrayType = getArrayType;
const array = {
  isDynamic: true,

  isType(type) {
    return ARRAY_REGEX.test(type);
  },

  encode({
    type,
    buffer,
    value
  }) {
    const arrayType = getArrayType(type);
    const arrayLength = (0, _utils.toBuffer)(value.length);
    return (0, _packer.pack)(new Array(value.length).fill(arrayType), value, (0, _utils.concat)([buffer, arrayLength]));
  },

  decode({
    type,
    value
  }) {
    const arrayType = getArrayType(type);
    const arrayLength = Number((0, _utils.toNumber)(value.subarray(0, 32)));
    return (0, _packer.unpack)(new Array(arrayLength).fill(arrayType), value.subarray(32));
  }

};
exports.array = array;
//# sourceMappingURL=array.js.map