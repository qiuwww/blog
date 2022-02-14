// index.js


// 测试import与moudle
import {
  log
} from './common/common.js'

log('test', '12312312312233');

// 测试async.await
var sleep = function (time) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve();
    }, time);
  })
};

var start = async function () {
  console.log('start');
  await sleep(2000);
  console.log('end');
};

start();



// 测试class
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  sayName() {
    console.log(this.name);
    console.log(this.age);
  }
}

let lilei = new Person('li0lei', '20000');

lilei.sayName();

// 单词拼错，loader和文件名
import ejsTestTpl from './template/confirm.ejs';

let html = ejsTestTpl({
  ejs_template_out: 'ejs-template-out'
});

console.log(html);

let node = document.createElement("div");
node.innerHTML = html;

document.querySelector('body').appendChild(node);


var div = document.createElement("div");

div.innerHTML = "数据";

document.querySelector('body').appendChild(div);
