// promise...ajax.js


var myRequest = new Request('/api/fetch-2', myInit);
fetch(myRequest).then(function(response) {
  	console.log("response", response);
  	return response.json();
}).then(function(result) {
  	console.log("result", result);
  	$('body').append(result.toString());
});



// es6的promise
var promise = new Promise(function(resolve, reject) {
    $.ajax().then(resolve, reject);
    // 上面这句没看懂？那换成这样你一定会懂
    // $.ajax().then(function(data) {
    //     resolve(data);
    // }, function() {
    //     reject();
    // });
}).then(function(data) {
    return data.code
        ? Promise.reject()
        : Promise.resolve(data);

    // 这里 Promise.resolve(data) 同样可以直接替换为 data
});

// 调用没变
promise.then(function(data) {
    // 处理 data
});


// 所以说最好是fetch结合promise使用，jquery自带promise方法














var ajaxPromise = new Promise(function(resolve, reject){
    $.ajax('url',{}, function(response){
        if(response.code === 0){
            resolve(response);
        }else{
            reject(response);
        }
    })
});

ajaxPromise.then(function(res){
    console.log(res);
    return '返回值给下边的then使用';
}).then(function(ret){
    console.log(ret)
}).then(function(){

}).catch(function(){
    // reject
    console.log('reject');
})
