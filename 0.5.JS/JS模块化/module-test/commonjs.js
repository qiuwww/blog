const { count, obj } = require('./counter');
console.log('require引用的时候的值', count, obj);

setTimeout(function() {
  console.log('2s后输出', count, obj);
}, 2000);
