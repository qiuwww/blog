var koa = require('koa')
var router = require('koa-router')()
var mockdata = require('../jsonData/mockdata')
var schemadata = require('./mock')

/** 
 * 路由配置 
 * API路由列表
 * 
 * 
 */
router
    .get('/', async function(ctx, next) {
        ctx.body = mockdata
    })
    .get("/mock", async function(ctx, next) {
        ctx.body = mockdata
    });

module.exports = router