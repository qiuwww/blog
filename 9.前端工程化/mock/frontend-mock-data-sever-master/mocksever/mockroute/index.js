var axios = require('axios')
var koa = require('koa');
var router = require('./routers')
var cors = require('koa-cors');
var serve = require('koa-static');
var app = new koa();
var chalk = require('chalk');
var bodyParser = require('koa-bodyparser');
var qs = require('qs');
// var apihost = 'http://192.168.203.101:8080'
var apihost = ''
/**
 * 请求服务器api接口数据
 * 如果有数据返回api接口数据
 * 如果没有或者请求报错返回自定义路由配置数据
 */
app.use(cors());
app.use(serve('static/'));
app.use(bodyParser());
app.use(async function (ctx, next) {
    /**
     * 设置请求配置
     * 
     */
    if (apihost !== '') {
        var method = ctx.method.toLowerCase();
        var options = {
            method: method,
            url: ctx.url,
            headers: ctx.header,
            baseURL: apihost,
        };
        if (method === 'post') {
            options.data = qs.stringify(ctx.request.body)
        }
        console.log(chalk.blue(JSON.stringify(options)))
        var getin = axios(options)
            .then(function (response) {
                try {
                    console.log(response.data)
                    return response.data
                    // return JSON.parse(response.data)

                } catch (e) {
                    console.log(chalk.red(e));
                    throw e
                }
            })
            .catch(function (error) {
                console.log(chalk.red(error));
                throw error
            });
        try {
            await getin
            console.log("The json data from:" + chalk.green(apihost + ctx.url))
            ctx.body = await getin
        } catch (e) {
            await next()
            console.log("The json data from:" + chalk.cyan("127.0.0.1:3000" + ctx.url))
        }
    }else{
        await next()
        console.log("The json data from:" + chalk.cyan("127.0.0.1:3000" + ctx.url))
    }


});

app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(3000);
console.log('listening to localhost:3000')
module.exports = app