// async.js
function log(str) {
	return new Promise(function(resolve, reject){
		resolve(str)
	})
}

// var asyncFun  = async function(){
// 	var console11 = awite log(11);
// 	var console22 = awite log(22);
// 	console.log(console11, console22)
// }

// asyncFun();
var fs = require('fs');

var readFile = function (fileName) {
  return new Promise(function (resolve, reject) {
    fs.readFile(fileName, function(error, data) {
      if (error) reject(error);
      resolve(data);
    });
  });
};

var gen = function * () {
  var f1 = yield readFile('/etc/fstab');
  var f2 = yield readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
};