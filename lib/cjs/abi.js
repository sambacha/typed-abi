"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.encode = exports.decode = void 0;

var _packer = require("./packer");

const encode = (types, values) => {
  return (0, _packer.pack)(types, values, new Uint8Array());
};

exports.encode = encode;

const decode = (types, buffer) => {
  return (0, _packer.unpack)(types, buffer);
};

exports.decode = decode;
//# sourceMappingURL=abi.js.map