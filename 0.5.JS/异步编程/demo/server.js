const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');

// app.use(async (ctx) => {
//   ctx.body = 'hello koa2'
// })

app.use((ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', 'http://127.0.0.0:8000');
  ctx.set('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// router
let home = new Router();

// 子路由1
home.get('/', async ctx => {
  let html = `
    <ul>
      <li><a href="/page/helloworld">/page/helloworld</a></li>
      <li><a href="/page/404">/page/404</a></li>
    </ul>
  `;
  ctx.body = html;
});

// 子路由2
let page = new Router();
page
  .get('/404', async ctx => {
    ctx.body = '404 page!';
  })
  .get('/helloworld', async ctx => {
    ctx.body = 'helloworld page!';
  });

// api

let api = new Router();
api
  .get('/name', async ctx => {
    ctx.body = {
      name: ['a', 'b', 'c'][Math.floor(Math.random() * 3)],
    };
  })
  .get('/age', async ctx => {
    let age;
    console.log(ctx.query.name);
    switch (ctx.query.name) {
      case 'a':
        age = 20;
        break;
      case 'b':
        age = 22;
        break;
    }
    ctx.body = {
      name: ctx.query.name,
      age: age ? age : '用户的age没找到',
    };
  });

// 装载所有子路由
let router = new Router();
router.use('/home', home.routes(), home.allowedMethods());
router.use('/page', page.routes(), page.allowedMethods());
router.use('/api', api.routes(), api.allowedMethods());

// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);

console.log('[demo] start-quick is starting at port 3000');
