var s = new Set();

[2, 3, 5, 4, 5, 2, 2].map(x => s.add(x));

for (var i of s) {
  console.log(i);
}