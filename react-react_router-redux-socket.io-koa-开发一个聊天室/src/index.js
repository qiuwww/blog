import React from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import ChatAllContainer from './container/chatAll.js'
import LoginContainer from './container/login.js'
import createSocketMiddleware from './redux_middleware'
import io from 'socket.io-client'
import reducers from './reducer'
import './index.less'

var socket = io();
var socketMiddleware = createSocketMiddleware(socket);

var store = createStore(reducers, applyMiddleware(socketMiddleware));
// 整个应用使用react-router，做成了一个单页面应用，
// 可以看出，主要是两条路径: '/'和'/login'，
// 其中'/'是我们的聊天界面，而'/login'则是起昵称界面。
// 由于应用的逻辑是，只有用户起了昵称才可以进入聊天界面，
// 因此我们需要做一些权限验证，对于没有起昵称就进入'/'路径的用户，需要跳转到'/login'。
render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path='/' component={ChatAllContainer}/>
      <Route path='/login' component={LoginContainer}/>
    </Router>
  </Provider>
  ,
  document.getElementById('test'));


// 当用户访问'/'的时候，在对于界面的组件挂载之前，
// 首先会向服务器发送一个认证请求，服务器会从请求中读取cookie，
// 如果cookie当中没有用户名存在，那么服务器返回的参数当中有一个'permit'字段，
// 设置为false，当应用解析到该字段后，
// 就会调用hashHistory.push('/login')来让页面跳转到起昵称界面下。