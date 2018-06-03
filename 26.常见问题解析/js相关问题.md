# js笔试面试题



### 1. 实现一个bind函数

借助于apply方法实现bind函数

```
//编写函数
function bindThis (func, context) {
    return function () {
        return func.apply(context, arguments);
    }
}
// 调用，生成bind函数
var newFunc = bindThis(function(a, b){
	return this.test + a + b
}, {test: 1});
// 使用bind函数
newFunc(2, 3);
```



### 2. 解析url参数（借助location对象）

```
//借助于浏览器内置的方法，a标签的href属性
function parseURL(url) {  
 	var a =  document.createElement('a');  
 	a.href = url;  
 	return {  
 		source: url,  
 		protocol: a.protocol.replace(':',''),  
 		host: a.hostname,  
 		port: a.port,  
 		query: a.search,  
		params: (function(){  
     		var ret = {},  
        	seg = a.search.replace(/^\?/,'').split('&'),  
        	len = seg.length, i = 0, s;  
    		for (;i<len;i++) {  
         		if (!seg[i]) { continue; }  
         		s = seg[i].split('=');  
         		ret[s[0]] = s[1];  
     		}  
     		return ret;  
 		})(),  
 		file: (a.pathname.match(/\/([^\/?#]+)$/i) || [,''])[1],  
 		hash: a.hash.replace('#',''),  
 		path: a.pathname.replace(/^([^\/])/,'/$1'),  
 		relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [,''])[1],  
 		segments: a.pathname.replace(/^\//,'').split('/')  
 	};  
}    
var myURL = parseURL('http://abc.com:8080/dir/index.html?id=255&m=hello#top');  
//var myURL = parseURL('http://localhost:8080/test/mytest/toLogina.ction?m=123&pid=abc');  
console.log(myURL);
```



### 3. 共同节点查找（查找算法）

```
// 总共有三种情况，1包含2， 2包含1， 1与2平级
function commonParentNode(oNode1, oNode2) {
    if(oNode1.contains(oNode2)){
        return oNode1;
    }else{
        return arguments.callee(oNode1.parentNode,oNode2);
    }
}
```



### 4. 数组去重算法

1. ES6语法set数据结构

   ```
   Array.prototype.uniq = function (arr) {
   	return [...new Set(arr)]
   };
   ```

2. 生成新的数组，（具体的细节，数据类型还需要深刻讨论，null，NaN，Data对象，对象类型等）

   ```
   Array.prototype.uniq = function () {
      var resArr = [];
      var flag = true;
        
      for(var i=0;i<this.length;i++){
          if(resArr.indexOf(this[i]) == -1){
              if(this[i] != this[i]){   //排除 NaN ，只需要排除NaN就好了 ,这里是判断指向同一个位置，或者同一个数是否相等。
                 if(flag){
                      resArr.push(this[i]);
                      flag = false;
                 }
              }else{
                   resArr.push(this[i]);
              }
          }
      }
       return resArr;
   }
   ```



### 5.  斐波那契数列的实现

1. 使用深层遍历生成

    ```
    //用 JavaScript 实现斐波那契数列函数,返回第n个斐波那契数。 f(1) = 1, f(2) = 1 等
    function fibonacci(n) {
        if(n<0){
            return -1;
        }else if(n < 2){
            return n;
        }else{      
           return arguments.callee(n-1) + arguments.callee(n-2);
        }
    }
    //如下打印出这个数组，不过迭代太深，浏览器可能不执行
    function resArr(len){
        var arr = [];
        for(var i=1;i<len+1;i++){
            arr.push(fibonacci(i));
        }
        return arr;
    }

    resArr(10);
    ```

2. 将结果保存起来，以备后用，降低空间复杂度

   ```
   // 缓存上一步的计算结果，闭包函数也就是自带一部分变量的函数
   var fibonacci = (function () {
       var memory = {};    
       return function(n) {
       	console.log("memory:", memory);
           if(n==0 || n == 1) {
               return n
           }
           if(memory[n-2] === undefined) {
               memory[n-2] = fibonacci(n-2)
           }
           if(memory[n-1] === undefined) {
               memory[n-1] = fibonacci(n-1)
           }
           return memory[n] = memory[n-1] + memory[n-2]
       }
   })()
   //如下打印出这个数组，不过迭代太深，浏览器可能不执行
   function resArr(len){
       var arr = [];
       for(var i=1;i<len+1;i++){
           arr.push(fibonacci(i));
       }
       return arr;
   }
   console.log(resArr(10));
   ```

   ​


### 6. 格式化时间

```
function formatDate(t,str){
    var obj = {
        yyyy:t.getFullYear(),//返回年份
        yy:(""+ t.getFullYear()).slice(-2),//返回四位年份的后两位
        M:t.getMonth()+1,//返回月份，需要加1
        MM:("0"+ (t.getMonth()+1)).slice(-2),//机智，如果本来就是两位就会变成三围，截取后两位，依然是两位表示。
        d:t.getDate(),//返回是几号
        dd:("0" + t.getDate()).slice(-2),
        H:t.getHours(),//返回小时数，24小时计算
        HH:("0" + t.getHours()).slice(-2),
        h:t.getHours() % 12,//返回十二小时计
        hh:("0"+t.getHours() % 12).slice(-2),
        m:t.getMinutes(),//返回分钟数
        mm:("0" + t.getMinutes()).slice(-2),
        s:t.getSeconds(),//返回秒数
        ss:("0" + t.getSeconds()).slice(-2),
        w:['日', '一', '二', '三', '四', '五', '六'][t.getDay()] //这里的getDay()方法返回的是0到6表示的数字，所以可以这样来表示星期几。
    };
    return str.replace(/([a-z]+)/ig,function($1){return obj[$1]}); //依次更改匹配到的连着的字符串
}
// 测试
formatDate(new Date(1409894060000), 'yyyy-MM-dd HH:mm:ss 星期w');
```



### 7. 颜色值转换函数

```
function rgb2hex(sRGB) {
    var regexp=/rgb\((\d+),\s*(\d+),\s*(\d+)\)/;
    var ret=sRGB.match(regexp);
    if(!ret){
        return sRGB;
    }else{
        var str='#';
        for(var i=1;i<=3;i++){
            var m=parseInt(ret[i]);
            if(m<=255&&m>=0){
            	// 十进制转16进制
                str+=(m<16?'0'+m.toString(16):m.toString(16));
            }else{
                return sRGB;
            }
        }
        return str;
    }
}
rgb2hex('rgb(255, 255, 255)')
#ffffff
```



### 8. 横杠转驼峰

```
function cssStyle2DomStyle(sName) {
    var reg1 = /^-/g;
    var newsName = sName.replace(reg1,'');
    var reg = /-(\w)/g;
    return newsName.replace(reg,function($,$1){  
        return $1.toUpperCase();
    })
}
cssStyle2DomStyle('font-size')
fontSize
```

### 考察this

```
var length = 10;
function fn() {
	console.log(this.length);
}
var obj = {
    length: 5,
    method: function(fn) {
        fn();
        arguments[0]();
    }
};
obj.method(fn, 1);
// 输出：10 2
// 第一次输出10应该没有问题。我们知道取对象属于除了点操作符还可以用中括号，
// 所以第二次执行时相当于arguments调用方法，this指向arguments，而这里传了两个参数，故输出arguments长度为2。
```