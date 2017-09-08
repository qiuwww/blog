// deferred.js

// 使用jquery的对象

一般情况下会这样执行 Ajax

// 禁用按钮以避免重复提交
$("#theButton").prop({
    disabled: true
});

// 调用 Ajax 提交数据，假设返回的是 JSON 数据，deferred对象
var jqxhr = $.ajax("do/example", {
    type: "post",
    dataType: "json",
    data: getFormData()
});

jqxhr.done(function(jsonObject) {
    // Ajax 调用成功
    console.log("success with data", jsonObject);
}).fail(function() {
    // Ajax 调用失败
    console.log("failed")
}).always(function() {
    // 不管成功与否，都会执行，取消按钮的禁用状态
    $("#theButton").prop({
        disabled: false
    });
});



// promise
var promise = $.ajax();
promise.then(function(data) {
    // resolve
    return data.code
        ? new Promise().reject()
        : new Promise().resolve(data);
        
    // 如果没有错，就返回一个新的 promise，并使用 data 来 resolve，
    // 也可以直接返回 data，
    // 这样后面 then 的 resolve 部分才能收到数据
}, function() {
    // rejected
});

// 调用阶段
promise.then(function(data) {
    // 处理 data
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
