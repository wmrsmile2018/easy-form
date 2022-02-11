"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defaultResourceCotroller = require("./defaultResourceCotroller");

Object.keys(_defaultResourceCotroller).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _defaultResourceCotroller[key];
    }
  });
});