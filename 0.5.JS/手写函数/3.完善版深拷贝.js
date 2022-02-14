/**
 * @description 基于简单版的基础上，还考虑了内置对象比如 Date、RegExp 等对象和函数以及解决了循环引用的问题。
 */

// 解决深拷贝的问题，完善的方式只能采用这种循环迭代，逐个value判断，然后进行相应的复制的问题

// 需要考虑如下的问题：
// 1. 引用类型：Object、Date、RegExp、Function；
// 2. 空值：null、undefined、NaN
// 3. 嵌套引用类型

var $$$ = (function () {
  'use strict';
  var types = 'Array Object String Date RegExp Function Boolean Number Null Undefined'.split(' ');
  function type() {
    return Object.prototype.toString.call(this).slice(8, -1);
  }
  for (var i = types.length; i--; ) {
    $$$['is' + types[i]] = (function (self) {
      return function (elem) {
        return type.call(elem) === self;
      };
    })(types[i]);
  }
  return $$$;
})(); //类型判断

// 注意$$$别被重置了
// 迭代循环调用实现深层复制
function deepClone(target) {
  var result;
  // 1. 这里认为是基本类型可以直接复制
  if (target === null || typeof target !== 'object') {
    result = target;
    // 2. object的函数类型
  } else if ($$$.isFunction(target)) {
    // new Function ([arg1[, arg2[, ...argN]],] functionBody)
    // Function.prototype.toString() 方法返回一个表示当前函数源代码的字符串。
    result = new Function('return ' + target.toString())();
    // bind方法是不是也可以呀
    // return obj.bind(null)
    // 3. object & array
  } else if ($$$.isArray(target) || $$$.isObject(target)) {
    result = $$$.isArray(target) ? [] : {};
    // for...对于obj和arr都适用
    // 数组与对象的每一个类型都重新deepCopy
    var value;
    for (let key in target) {
      value = target[key];
      console.log('for in', key, value);
      if ($$$.isArray(value) || $$$.isObject(value)) {
        result[key] = deepClone(value);
      } else if ($$$.isFunction(value)) {
        result[key] = new Function('return ' + value.toString())();
      } else {
        result[key] = value;
      }
    }
    // 4. regexp等
  } else {
    result = target;
  }
  // 5. 其他的一般非引用类型
  return result;
}

var obj1 = {
  a: {
    c: /a/,
    e: undefined,
    b: null,
    function() {
      console.log(this.c);
    },
  },
  b: function () {
    console.log(this.a);
  },
  c: [
    {
      a: 'c',
    },
    'a',
    3,
  ],
  d: /b/,
  e: 'asd',
  f: 123,
  g: false,
  h: null,
};

var obj2 = deepClone(obj1);
console.log('##obj2:', obj2);

console.log(obj2.c === obj1.c);
console.log(obj2.d === obj1.d);

console.log(obj2.c[2] === obj1.c[2]);
console.log(obj2.c[0] === obj1.c[0]);
