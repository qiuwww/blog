


const vue1 = require('./node_modules/vue1');

console.log("vue1.version", vue1.version);

const vue2 = require('./node_modules/vue2');

console.log("vue2.version", vue2.version);


var str = '25523621122';
var re = /(\d{0,3}){4}/ig;
var found = str.replace(re, function(res){
	console.log(res);
});

console.log(found);