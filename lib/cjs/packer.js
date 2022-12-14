"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unpack = exports.pack = exports.isDynamicParser = exports.getParser = void 0;

var _iterator = require("./iterator");

var _parsers = require("./parsers");

var _utils = require("./utils");

const getParser = type => {
  const parsers = {
    address: _parsers.address,
    array: _parsers.array,
    bool: _parsers.bool,
    bytes: _parsers.bytes,
    fixedBytes: _parsers.fixedBytes,
    function: _parsers.fn,
    number: _parsers.number,
    string: _parsers.string,
    tuple: _parsers.tuple
  };

  if (parsers[type]) {
    return parsers[type];
  }

  const parser = Object.values(parsers).find(parser => {
    var _parser$isType;

    return (_parser$isType = parser.isType) === null || _parser$isType === void 0 ? void 0 : _parser$isType.call(parser, type);
  });

  if (parser) {
    return parser;
  }

  throw new Error(`Type "${type}" is not supported`);
};

exports.getParser = getParser;

const isDynamicParser = (parser, type) => {
  const isDynamic = parser.isDynamic;

  if (typeof isDynamic === 'function') {
    return isDynamic(type);
  }

  return isDynamic;
};

exports.isDynamicParser = isDynamicParser;

const pack = (types, values, buffer = new Uint8Array()) => {
  if (types.length !== values.length) {
    throw new Error('The length of the types and values must be equal');
  }

  const {
    staticBuffer,
    dynamicBuffer,
    pointers
  } = types.reduce(({
    staticBuffer,
    dynamicBuffer,
    pointers
  }, type, index) => {
    const parser = getParser(type);
    const value = values[index];

    if (!isDynamicParser(parser, type)) {
      return {
        staticBuffer: parser.encode({
          buffer: staticBuffer,
          value,
          type
        }),
        dynamicBuffer,
        pointers
      };
    }

    const newStaticBuffer = (0, _utils.concat)([staticBuffer, new Uint8Array(32)]);
    const newDynamicBuffer = parser.encode({
      buffer: dynamicBuffer,
      value,
      type
    });
    return {
      staticBuffer: newStaticBuffer,
      dynamicBuffer: newDynamicBuffer,
      pointers: [...pointers, {
        position: staticBuffer.length,
        pointer: dynamicBuffer.length
      }]
    };
  }, {
    staticBuffer: new Uint8Array(),
    dynamicBuffer: new Uint8Array(),
    pointers: []
  });
  const dynamicStart = staticBuffer.length;
  const updatedBuffer = pointers.reduce((target, {
    pointer,
    position
  }) => {
    const offset = (0, _utils.toBuffer)(dynamicStart + pointer);
    return (0, _utils.set)(target, offset, position);
  }, staticBuffer);
  return (0, _utils.concat)([buffer, updatedBuffer, dynamicBuffer]);
};

exports.pack = pack;

const unpack = (types, buffer) => {
  const iterator = (0, _iterator.iterate)(buffer);
  return types.map(type => {
    const {
      value: {
        value,
        skip
      },
      done
    } = iterator.next();

    if (done) {
      throw new Error('Element is out of range');
    }

    const parser = getParser(type);
    const isDynamic = isDynamicParser(parser, type);

    if (isDynamic) {
      const pointer = Number((0, _utils.toNumber)(value.subarray(0, 32)));
      const target = buffer.subarray(pointer);
      return parser.decode({
        type,
        value: target,
        skip
      });
    }

    return parser.decode({
      type,
      value,
      skip
    });
  });
};

exports.unpack = unpack;
//# sourceMappingURL=packer.js.map