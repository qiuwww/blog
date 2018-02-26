异步.js

promise

async

async / await


var fs = require('fs');


var readFile = function (fileName) {
    return new Promise(function (resolve, reject) {
        fs.readFile(fileName, function (error, data) {
            if (error) reject(error);
            resolve(data);
        });
    });
};

var asyncReadFile = async function (

) {
    var f1 = await readFile('/etc/fstab');//这里没有定义回调，回调在哪里定义，这里的f1就是上边的resolve的返回值，如果要处理reject需要使用try...catch来处理不成功的请求
    var f2 = await readFile('/etc/shells');//这里没有定义回调，回调在哪里定义
    console.log(f1.toString());
    console.log(f2.toString());
};



fetch

http://louiszhai.github.io/2016/11/02/fetch/