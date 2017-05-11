

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

URL特殊字符需转义
URL特殊字符需转义 

1、空格换成加号(+) 
2、正斜杠(/)分隔目录和子目录 
3、问号(?)分隔URL和查询 
4、百分号(%)制定特殊字符 
5、#号指定书签 
6、&号分隔参数 

转义字符的原因： 

如果你的表单使用get方法提交，并且提交的参数中有“&”等特殊符的话，如果不做处理，在service端就会将&后面的作为另外一个参数来看待。例如 
表单的action为list.jsf?act=go&state=5 
则提交时通过request.getParameter可以分别取得act和state的值。 
如果你的本意是act='go&state=5'这个字符串，那么为了在服务端拿到act的准确值，你必须对&进行转义 

url转义字符原理： 

将这些特殊的字符转换成ASCII码，格式为：%加字符的ASCII码，即一个百分号%，后面跟对应字符的ASCII（16进制）码值。例如 空格的编码值是"%20"。 

URL特殊符号及对应的十六进制值编码： 

1. +  URL 中+号表示空格 %2B 
2. 空格 URL中的空格可以用+号或者编码 %20 
3. /  分隔目录和子目录 %2F  
4. ?  分隔实际的 URL 和参数 %3F  
5. % 指定特殊字符 %25  
6. # 表示书签 %23  
7. & URL 中指定的参数间的分隔符 %26  
8. = URL 中指定参数的值 %3D 