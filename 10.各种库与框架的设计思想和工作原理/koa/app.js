// app.js

// koa 基本上与express类似
// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa');

// 创建一个Koa对象表示web app本身:
const app = new Koa();

/**
 * koa的处理逻辑
 * 每收到一个http请求，koa就会调用通过app.use()注册的async函数，并传入ctx和next参数。
 */
/**
 * middleware
 * 为什么要调用await next()？
 * 原因是koa把很多async函数组成一个处理链，
 * 每个async函数都可以做一些自己的事情，
 * 然后用await next()来调用下一个async函数。
 * 我们把每个async函数称为middleware，这些middleware可以组合起来，
 * 完成很多有用的功能。
 */

//如下三个middleware，
//middleware的顺序很重要，也就是调用app.use()的顺序决定了middleware的顺序。
//如果一个middleware没有调用await next()，会怎么办？
//答案是后续的middleware将不再执行了。同express中的管道next()

app.use(async (ctx, next) => {//处理请求，返回一段字符串，并挂载计算结果
	console.log(`页面请求：`)
	console.log(`${ctx.request.method} ${ctx.request.url}`); // 打印URL
    const start = new Date().getTime(); // 当前时间
    // 设置response的Content-Type:
    ctx.response.type = 'text/html';
    // 设置response的内容:
    ctx.response.body = '<h1>Hello, koa2!</h1>';
	// 我们首先用await next();处理下一个异步函数，
	// 然后，设置response的Content-Type和内容。    
    const ms = new Date().getTime() - start; // 耗费时间
    console.log(`请求页面的返回时间Time: ${ms}ms`); // 打印耗费时间
    await next(); // 调用下一个middleware，继续下面的程序执行
});
// 对于任何请求，app将调用该异步函数处理请求：
// 参数ctx是由koa传入的封装了request和response的变量，
// 我们可以通过它访问request和response，
// next是koa传入的将要处理的下一个异步函数。从一个函数跳到另一个函数。
// 
// 由async标记的函数称为异步函数，在异步函数中，
// 可以用await调用另一个异步函数，这两个关键字将在ES7中引入。

app.use(async (ctx,next) =>{
	console.log(`复杂计算：`);
    const start = new Date().getTime(); // 当前时间
    await next(); // 调用下一个middleware，具体的计算
    const ms = new Date().getTime() - start; // 耗费时间
    console.log(`计算的时间Time: ${ms}ms`); // 打印耗费时间
});

app.use(async (ctx,next) =>{	
	let i = 0,
		arr = [],
		len = 100000,
		sum = 0;
	for(;i<len;i++){
		let randomNum = Math.floor(Math.random()*10000+1);
		sum += randomNum;
		arr.push(randomNum);
	}
	console.log(`${len}个数的平均值是${sum/len}`);
	function patch(str,regStr){//匹配字符出现的次数
		let reg = new RegExp(regStr,"ig");
		return str.match(reg).length;
	}
	let patch_arr = (arr,num) =>{
		let i = 0; 
		arr.forEach((item,index)=>{
			if(item==num){
				i++;
			}
		});
		return i;
	}
	console.log(`100出现的次数为${patch_arr(arr,100)}`);
	await next();
});

// 一个检测用户权限的middleware可以决定是否继续处理请求，还是直接返回403错误：
// app.use(async (ctx, next) => {
//     if (await checkUserPermission(ctx)) {
//         await next();
//     } else {
//         ctx.response.status = 403;
//     }
// });
// 理解了middleware，我们就已经会用koa了！

//最后注意ctx对象有一些简写的方法，
//例如ctx.url相当于ctx.request.url，ctx.type相当于ctx.response.type。
// 在端口3000监听:
app.listen(3000);
console.log('app started at port 3000...');