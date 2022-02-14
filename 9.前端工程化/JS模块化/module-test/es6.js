// es6.js
// 直接执行，npx babel-node module-test/es6.js
import { count, obj } from './counter';
console.log('import引用的时候的值', count, obj);
setTimeout(function() {
  console.log('2s后输出', count, obj);
}, 2000);
