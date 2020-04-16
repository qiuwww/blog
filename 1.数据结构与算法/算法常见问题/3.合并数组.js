// 合并两个数组，得到一个新的数组

var a = [1, 2, 3];
var b = [4, 5, 6];

// 1. concat
var c1 = a.concat(b);

// 2. 遍历合并
for (var i in b) {
  a.push(b[i]);
}

// 3. apply，apply的参数是一个数组

a.push.apply(a, b);

// 4. 数组rest计算

var c4 = [...a, ...b];
