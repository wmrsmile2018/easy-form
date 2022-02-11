"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _detailsController = require("./detailsController");

Object.keys(_detailsController).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _detailsController[key];
    }
  });
});