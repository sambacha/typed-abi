"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toUtf8 = exports.toNumber = exports.toHex = exports.toBuffer = exports.stripPrefix = exports.set = exports.getTextEncoder = exports.getTextDecoder = exports.fromUtf8 = exports.fromHex = exports.concat = exports.addPadding = void 0;
const BUFFER_WIDTH = 32;
const HEX_REGEX = /^[a-f0-9]+$/i;

const stripPrefix = value => {
  if (value.startsWith('0x')) {
    return value.substring(2);
  }

  return value;
};

exports.stripPrefix = stripPrefix;

const getTextEncoder = () => {
  if (typeof TextEncoder === 'undefined') {
    const Encoder = require('util').TextEncoder;

    return new Encoder();
  }

  return new TextEncoder();
};

exports.getTextEncoder = getTextEncoder;

const getTextDecoder = (encoding = 'utf8') => {
  if (typeof TextEncoder === 'undefined') {
    const Decoder = require('util').TextDecoder;

    return new Decoder(encoding);
  }

  return new TextDecoder(encoding);
};

exports.getTextDecoder = getTextDecoder;

const toUtf8 = data => {
  return getTextDecoder().decode(data);
};

exports.toUtf8 = toUtf8;

const fromUtf8 = data => {
  return getTextEncoder().encode(data);
};

exports.fromUtf8 = fromUtf8;

const toHex = data => {
  return Array.from(data).map(n => `0${n.toString(16)}`.slice(-2)).join('');
};

exports.toHex = toHex;

const fromHex = data => {
  if (data.startsWith('0x')) {
    data = data.slice(2);
  }

  if (data.length % 2 !== 0) {
    throw new Error('Length must be even');
  }

  if (!data.match(HEX_REGEX)) {
    throw new Error('Input must be hexadecimal');
  }

  return new Uint8Array(data.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
};

exports.fromHex = fromHex;

const toBuffer = data => {
  if (typeof data === 'string') {
    return fromHex(data);
  }

  if (typeof data === 'number' || typeof data === 'bigint') {
    const string = data.toString(16);
    return fromHex(string.padStart(BUFFER_WIDTH * 2, '0'));
  }

  return new Uint8Array(data);
};

exports.toBuffer = toBuffer;

const concat = buffers => {
  return buffers.reduce((a, b) => {
    const buffer = new Uint8Array(a.length + b.length);
    buffer.set(a);
    buffer.set(b, a.length);
    return buffer;
  }, new Uint8Array(0));
};

exports.concat = concat;

const set = (target, buffer, position) => {
  return concat([target.subarray(0, position), buffer, target.subarray(position + buffer.length)]);
};

exports.set = set;

const addPadding = (buffer, length = BUFFER_WIDTH) => {
  const padding = new Uint8Array(Math.max(length - buffer.length, 0)).fill(0x00);
  return concat([buffer, padding]);
};

exports.addPadding = addPadding;

const toNumber = buffer => {
  const hex = toHex(buffer);

  if (hex.length === 0) {
    return BigInt(0);
  }

  return BigInt(`0x${hex}`);
};

exports.toNumber = toNumber;
//# sourceMappingURL=buffer.js.map