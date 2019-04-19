// 实现对象按照键值排序.js

var sortBy = function(filed, rev, primer) {
  rev = rev ? -1 : 1;
  return function(a, b) {
    a = a[filed];
    b = b[filed];
    if (typeof primer != "undefined") {
      a = primer(a);
      b = primer(b);
    }
    if (a < b) {
      return rev * -1;
    }
    if (a > b) {
      return rev * 1;
    }
    return 1;
  };
};
var obj = [{ b: "3", c: "c" }, { b: "1", c: "a" }, { b: "2", c: "b" }];
obj.sort(sortBy("b", false, parseInt));
console.log(obj);

// 单个对象按照键值排序
var dic = { x: 2, z: 1, y: 3 }; //输出   {z:1，x:2，y:3}
var sdic = Object.keys(dic).sort(function(a, b) {
  return dic[a] - dic[b];
});
for (ki in sdic) {
  document.writeln(sdic[ki] + ":" + dic[sdic[ki]] + ",");
}
