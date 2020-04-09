// 此题应该避免使用递归的方法，因为当count较大时，递归的方法耗时较长。
// 故考虑使用迭代法，可以使用数组记录每一项。
// 但此题只需要用到前面两项，从节约空间的角度讲不需要开辟数组。

// 方法1
function getNthFibonacci1(count) {
  if (count < 0) return 0;
  if (count <= 1) return 1;
  var first = 1;
  var second = 1;
  var third = 0;
  for (var i = 2; i <= count; i++) {
    third = first + second;
    first = second;
    second = third;
    console.log('third', third);
  }
  return third;
}

// 方法2

function getNthFibonacci2(count) {
  if (count == 0 || count == 1) {
    return 1;
  } else {
    return getNthFibonacci2(count - 1) + getNthFibonacci2(count - 2);
  }
}
