

// jq的方法
setTimeout(function () {
    input.trigger("blur");
}, 100);

两种方案：

button.click();
button.dispatchEvent('click');，IE下用fireEvent()

如果你们用jQuery就更简单用trigger()