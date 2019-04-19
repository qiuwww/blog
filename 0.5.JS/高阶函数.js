// http://web.jobbole.com/87806/?utm_medium=hao.caibaojian.com&utm_source=hao.caibaojian.com

// 高阶函数是指至少满足下列条件之一的函数（是一种以函数为参数的函数）：

// 函数可以作为参数被传递；
// 函数可以作为返回值输出。

// JavaScript语言中的函数显然满足高阶函数的条件，在实际开发中，无论是将函数当作参数传递，
// 还是让函数的执行结果返回另外一个函数，这两种情形都有很多应用场景。

/**
 * 高阶函数说明
 * 高阶函数（Higher Order Function）是一种以函数为参数的函数。
 * 它们都被用于映射（mapping）、过滤（filtering）、归档（folding）和排序（sorting）表。
 * 高阶函数提高了程序的模块性。
 * 编写对各种情况都适用的高阶函数与为单一情况编写递归函数相比，可以使程序更具可读性。
 */

// 1. 作为参数传递
// callback为待传入的回调函数
var getUserInfo = function(userId, callback) {
  $.ajax("http://xxx.com/getUserInfo?" + userId, function(data) {
    if (typeof callback === "function") {
      callback(data);
    }
  });
};

getUserInfo(13157, function(data) {
  alert(data.userName);
});

// 2. 作为返回值
var Type = {};
for (var i = 0, type; (type = ["String", "Array", "Number"][i++]); ) {
  (function(type) {
    Type["is" + type] = function(obj) {
      return Object.prototype.toString.call(obj) === "[object " + type + "]";
    };
  })(type);
}

Type.isArray([]); // 输出：true
Type.isString("str"); // 输出：true

// 单例模式
// 在传统开发工程师眼里，单例就是保证一个类只有一个实例，实现的方法一般是先判断实例存在与否，
// 如果存在直接返回，如果不存在就创建了再返回，这就确保了一个类只有一个实例对象。
// 在JavaScript里，单例作为一个命名空间提供者，从全局命名空间里提供一个唯一的访问点来访问该对象。
var Singleton = (function() {
  var instantiated;
  function init() {
    /*这里定义单例代码*/
    return {
      publicMethod: function() {
        console.log("hello world");
      },
      publicProperty: "test"
    };
  }

  return {
    getInstance: function() {
      if (!instantiated) {
        instantiated = init();
      }
      return instantiated;
    }
  };
})();

/*调用公有的方法来获取实例:*/
Singleton.getInstance().publicMethod();

// 3. 实现AOP

// AOP（面向切面编程）的主要作用是把一些跟核心业务逻辑模块无关的功能抽离出来，
// 这些跟业务逻辑无关的功能通常包括日志统计、安全控制、异常处理等。把这些功能抽离出来之后，
// 再通过“动态织入”的方式掺入业务逻辑模块中。这样做的好处首先是可以保持业务逻辑模块的纯净和高内聚性，
// 其次是可以很方便地复用日志统计等功能模块。
// AOP（面向切面编程）的主要作用是把一些跟核心业务逻辑模块无关的功能抽离出来，
// 这些跟业务逻辑无关的功能通常包括日志统计、安全控制、异常处理等。把这些功能抽离出来之后，再通过“动态织入”的方式掺入业务逻辑模块中。
// 这样做的好处首先是可以保持业务逻辑模块的纯净和高内聚性，其次是可以很方便地复用日志统计等功能模块。
