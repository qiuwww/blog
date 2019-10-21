"use strict";

var _counter = require("./counter");

setTimeout(function () {
  console.log("read count after 1000ms in es6 is", _counter.count);
}, 1000);