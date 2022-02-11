"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _eventsController = require("./eventsController");

Object.keys(_eventsController).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _eventsController[key];
    }
  });
});

var _deletedEventsCotroller = require("./deletedEventsCotroller");

Object.keys(_deletedEventsCotroller).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _deletedEventsCotroller[key];
    }
  });
});