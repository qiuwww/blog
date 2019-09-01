// jquery的ajax规范形式.js

// 禁用按钮以避免重复提交
$("#theButton").prop({
    disabled: true
});

// 调用 Ajax 提交数据，假设返回的是 JSON 数据
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
