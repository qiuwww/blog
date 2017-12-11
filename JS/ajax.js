

// ajax

// Asynchronous JavaScript And XML（异步JavaScript和XML）

// XMLHttpRequest 是一个 API，它为客户端提供了在客户端和服务器之间传输数据的功能。
// 它提供了一个通过 URL 来获取数据的简单方式，并且不会使整个页面刷新。
// 这使得网页只更新一部分页面而不会打扰到用户。


// Old compatibility code, no longer needed.

// 创建对象
if (window.XMLHttpRequest) { // Mozilla, Safari, IE7+ ...
    httpRequest = new XMLHttpRequest();
} else if (window.ActiveXObject) { // IE 6 and older
    httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
}

// 请求状态改变的监听函数
httpRequest.onreadystatechange = nameOfTheFunction;

// 参数 httpRequest.readyState的取值有如下: 

// 0 (未初始化) or (请求还未初始化)
// 1 (正在加载) or (已建立服务器链接)
// 2 (加载成功) or (请求已接受)
// 3 (交互) or (正在处理请求)
// 4 (完成) or (请求已完成并且响应已准备好)

// GET方式不需要发送data
httpRequest.open('GET', 'http://www.example.org/some.file', true);
httpRequest.send();

// POST方式，发送的数据格式为json字符串
"name=value&anothername="+encodeURIComponent(myVar)+"&so=on"

// 如果你使用 POST 数据，那就需要设置请求的MIME类型。
httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');


// 我们通过检查响应码 200 OK 区别对待成功和不成功的AJAX调用。

if (httpRequest.status === 200) {
    // Perfect!
} else {
    // There was a problem with the request.
    // For example, the response may have a 404 (Not Found)
    // or 500 (Internal Server Error) response code.
}

// 参数，成功响应之后的
httpRequest.responseText – 服务器以文本字符的形式返回


// 一个基本的实例, 主要为了兼容低版本
var httpRequest = function(url, type, data) {
    type = type.toUpperCase();
    if(data){
        postStr = JSON.stringify(data);
    }else{
        postStr = null;
    }
    var httpRequest;
    function makeRequest() {
        httpRequest = new XMLHttpRequest();
        if (!httpRequest) {
            console.log('Giving up :( Cannot create an XMLHTTP instance'));
            return false;
        }
        httpRequest.onreadystatechange = alertContents;
        httpRequest.open(type, url);
        httpRequest.send(postStr);
    }
    function alertContents() {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                console.log("success data: ", httpRequest.responseText);
            }else{
                console.log('There was a problem with the request.');
            }
        }
    }
}