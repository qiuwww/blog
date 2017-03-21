

##解析query查询参数

var parseQuery = function(query){
    var reg = /([^=&\s]+)[=\s]*([^=&\s]*)/g;
    var obj = {};
    while(reg.exec(query)){
        obj[RegExp.$1] = RegExp.$2;
    }
    return obj;
}
var jerry = parseQuery("name=jerry&age=1");
console.log(jerry);
 
var tom = parseQuery("name= tom &age=12&gender&");
console.info(tom);