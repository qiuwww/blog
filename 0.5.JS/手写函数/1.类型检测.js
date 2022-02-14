/**
 * @description 类型检测
 */

function typeOf(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
}

// 测试
console.log('typeOf([])', typeOf([])); // 'array'
console.log('typeOf({})', typeOf({})); // 'object'
console.log('typeOf(new Date())', typeOf(new Date())); // 'date'
console.log('typeOf("str")', typeOf(typeOf('str'))); // 'string'
console.log('typeOf(/d/)', typeOf(/\d/)); // 'regexp'
