

// jq的方法
setTimeout(function () {
    input.trigger("blur");
}, 100);

两种方案：js方法

// 可以触发 onclick  与 委托的click事件
button.click();

button.dispatchEvent('click');，IE下用fireEvent()

如果你们用jQuery就更简单用trigger()


