// index.js


// 测试import与moudle
import {log} from './common/common.js'


log('test', '123123123');

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
	constructor(name, age){
		this.name = name;
		this.age = age;		
	}
	sayName (){
        console.log(this.name);
		console.log(this.age);
	}
}

let lilei = new Person('li0lei', '20000');

lilei.sayName();