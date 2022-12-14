"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _input = require("./input");

Object.keys(_input).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _input[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _input[key];
    }
  });
});

var _mappings = require("./mappings");

Object.keys(_mappings).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _mappings[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _mappings[key];
    }
  });
});

var _narrow = require("./narrow");

Object.keys(_narrow).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _narrow[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _narrow[key];
    }
  });
});

var _packer = require("./packer");

Object.keys(_packer).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _packer[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _packer[key];
    }
  });
});

var _parser = require("./parser");

Object.keys(_parser).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _parser[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _parser[key];
    }
  });
});
//# sourceMappingURL=index.js.map