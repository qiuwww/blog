

// 生成随机颜色值的函数
function randomColor() {
	return (~~(Math.random()*(1<<24))).toString(16);
}
randomColor();

// 选择所有网页的元素，然后给他们都添加一个外边框
[].forEach.call($$("*"), function(ele){  
  	ele.style.outline="1px solid #"+(~~(Math.random()*(1<<24))).toString(16)  
});

// $$函数是现代浏览器提供的一个命令行API，它相当于document.querySelectorAll，可以将当前页面中的CSS选择器作为参数传给该方法，然后它会返回匹配的所有元素。
// 所以，如果想在浏览器控制台外使用上面这段代码，可以将$$('*')替换为document.querySelectorAll('*')。 

[].forEach.call(document.querySelectorAll("*"), function(ele){  
  	ele.style.border="1px solid #"+(~~(Math.random()*(1<<24))).toString(16)  
});