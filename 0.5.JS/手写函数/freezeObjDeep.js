// 深层冻结对象

const freezeObj = (obj) => {
  Object.freeze(obj);
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key]) {
      Object.freeze(obj[key]);
    }
  });
};

// 测试代码

var a = {
  b: [1],
  c: 2,
};
freezeObj(a);

a.c = 3; // 可以赋值，但是不会改变
a.b.push(1); // object is not extensible
