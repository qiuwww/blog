
console.log("main");
const {
  log
} = require('../utils/utils');

// 全局注入_
log(_.map([1, 2, 3], (item) => item * 2))
