
var parse = require("regulex").parse;
var re = /var\s+([a-zA-Z_]\w*);/ ;
console.log(parse(re.source));
