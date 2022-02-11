"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _AboutUs = require("./AboutUs");

Object.keys(_AboutUs).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _AboutUs[key];
    }
  });
});