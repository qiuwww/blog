const { Map } = require('immutable');
const map1 = Map({ a: 1, b: 2, c: 3, d: { a: 3 }, f: [1, 3] });
const map2 = Map({ a: 1, b: 2, c: 3, d: { a: 3 }, f: [1, 2] });
console.log('map1.equals(map2): ', map1.equals(map2)); // true
console.log('map1 === map2: ', map1 === map2); // false

const map22 = map1.set('b', 2); // Set to same value
console.log('map1 === map22: ', map1 === map22); // true
