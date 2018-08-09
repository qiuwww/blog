
// 在 Web 开发中，经常要对表单元素的输入进行限制，比如说不允许输入特殊字符，标点。
// 通常我们会监听 input 事件:

inputElement.addEventListener('input', function (event) {
	let regex = /[^1-9a-zA-Z]/g;
	event.target.value = event.target.value.replace(regex, '');
	event.returnValue = false
});
// 这段代码在 Android 上是没有问题的，但是在 iOS 中，input 事件会截断非直接输入，什么是非直接输入呢，在我们输入汉字的时候，比如说「喜茶」，中间过程中会输入拼音，每次输入一个字母都会触发 input 事件，然而在没有点选候选字或者点击「选定」按钮前，都属于非直接输入。

// 这显然不是我们想要的结果，我们希望在直接输入之后才触发 input 事件，这就需要引出我要说的两个事件—— compositionstart和compositionend。

// compositionstart 事件在用户开始进行非直接输入的时候触发，而在非直接输入结束，也即用户点选候选词或者点击「选定」按钮之后，会触发 compositionend 事件。

var inputLock = false;
function do(inputElement) {
	var regex = /[^1-9a-zA-Z]/g;
	inputElement.value = inputElement.value.replace(regex, '');
}

inputElement.addEventListener('compositionstart', function () {
		inputLock = true;
	});


inputElement.addEventListener('compositionend', function (event) {
	inputLock = false;
	do (event.target);
})


inputElement.addEventListener('input', function (event) {
	if (!inputLock) {
		do (event.target);
    event.returnValue = false;
	}
});
// 添加一个 inputLock 变量，当用户未完成直接输入前，inputLock 为 true，不触发 input 事件中的逻辑，当用户完成有效输入之后，inputLock 设置为 false，触发 input 事件的逻辑。这里需要注意的一点是，compositionend 事件是在 input 事件后触发的，所以在 compositionend事件触发时，也要调用 input 事件处理逻辑。
