import test from 'ava';
var app = require('../mockroute/index');
var request = require('supertest');

test.cb('sever test', t => {

  request(app.listen())
    .get('/')
    .expect('Content-Type', /html/)
    .expect(200)
    .end(function(err, res) {
    if (err) throw err;
    t.end()
  });
})
//snail 注释
