

// $$函数是现代浏览器提供的一个命令行API，它相当于document.querySelectorAll，可以将当前页面中的CSS选择器作为参数传给该方法，然后它会返回匹配的所有元素。
// 所以，如果想在浏览器控制台外使用上面这段代码，可以将$$('*')替换为document.querySelectorAll('*')。 

[].forEach.call(document.querySelectorAll("*"), function(ele){  
  	ele.style.border="1px solid #"+(~~(Math.random()*(1<<24))).toString(16);
  	ele.style.transform = "skew(1deg, 1deg)";
});