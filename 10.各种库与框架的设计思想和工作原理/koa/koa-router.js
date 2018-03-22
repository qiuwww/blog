// koa-router.js 相当于express内置的express.Router()对象



// 为了处理URL，我们需要引入koa-router这个middleware，让它负责处理URL映射。
const Koa = require('koa');

// 注意require('koa-router')返回的是函数:
const router = require('koa-router')();//注意导入koa-router的语句最后的()是函数调用
const bodyParser = require('koa-bodyparser');//3.2.0刚好可以用，4.2.0不可用

const app = new Koa();
app.use(bodyParser());

// log request URL:
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

// add url-route:
router.get('/hello/:name', async (ctx, next) => {
    var name = ctx.params.name;
    ctx.response.body = `<h1>Hello, ${name}!</h1>`;
});

// 这种写法需要koa-router7.x+及以上
router.get('/async', async (ctx, next) => {
	console.log(this)
    ctx.response.body = '<h1>async</h1>';
});

// 这是ES6的新feature，function 后面带 * 的叫做generator。
// 升级到高版本的koa-router反而不支持了
// router.get('/generator', function *(next) {
// 	console.log(this);
// 	this.response.body = '<h1>generator</h1>';
// });
//一般写法，哪里都可以用
router.get('/', function(ctx, next){
	console.log(ctx);
    ctx.response.body = '<h1>/</h1>';
});

router.get('/post', async (ctx, next) => {
    ctx.response.body = `<h1>Index</h1>
        <form action="/signin" method="post">
            <p>Name: <input name="name" value="koa"></p>
            <p>Password: <input name="password" type="password"></p>
            <p><input type="submit" value="Submit"></p>
        </form>`;
});

router.post('/signin', async (ctx, next) => {
    var
        name = ctx.request.body.name || '',
        password = ctx.request.body.password || '';
    console.log(`signin with name: ${name}, password: ${password}`);
    if (name === 'koa' && password === '123456') {
        ctx.response.body = `<h1>Welcome, ${name}!</h1>`;
    } else {
        ctx.response.body = `<h1>Login failed!</h1>
        <p><a href="/">Try again</a></p>`;
    }
});

// add router middleware:
app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);
console.log('app started at port 3000...');


