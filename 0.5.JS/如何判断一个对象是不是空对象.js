// JavaScript 判断一个对象{}是否为空对象

// 使用JSON.stringify()方法最稳妥；效率可能不高；
// 例如：

// 1.
var obj = {};
if (typeof obj === "object" && JSON.stringify(obj) === "{}") {
  console.log("这是一个对象");
}

// 2.
function isOwnEmpty(obj) {
  for (var name in obj) {
    if (obj.hasOwnProperty(name)) {
      return false; // 返回false，不为空对象
    }
  }
  return true; //返回true，为空对象
}

// 3.
// JavaScript判断object/json 是否为空，可以使用jQuery的isEmptyObject()方法。

// 这里 null 和 {} 都被认为是真，但是他们是不相等的。

// 4.
Object.getOwnPropertyNames(obj).length === 0; // 判断 obj 是不是空对象。
