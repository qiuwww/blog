
import { from } from "rxjs"; // 这里没有使用Rx对象而是直接使用其下面的Observable对象, 因为Rx里面很多的功能都用不上.

let persons = [
  { name: 'Dave', age: 34, salary: 2000 },
  { name: 'Nick', age: 37, salary: 32000 },
  { name: 'Howie', age: 40, salary: 26000 },
  { name: 'Brian', age: 40, salary: 30000 },
  { name: 'Kevin', age: 47, salary: 24000 },
];

let index = 1;

from(persons)
  .subscribe(
    person => { // 回调函数1， 指当前这个person到来的时候需要做什么;
      console.log(index++, person);
    },
    err => console.log(err), // 回调函数2， 错误发生的时候做什么;
    () => console.log("Streaming is over.") // 回调函数3， 流都走完的时候做什么
  );