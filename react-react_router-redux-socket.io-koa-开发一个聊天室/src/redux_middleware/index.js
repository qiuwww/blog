
// 关于redux中间件，简单来说，
// 就是在redux真正出发dispatch之前，中间件可以首先捕获到react组件出发的action，
// 并针对不同action做一些处理，然后再调用dispatch。


// 以下这段代码是一个socket middleware的创建函数，
// 从中我们可以看出，这个中间件如果第一次调用的话(eventFlag),
// 会首先绑定一些订阅主题和对应的回调函数，
// 主要是订阅了消息到达、新用户来到、用户离开等等事件。
// 同时，中间件会在真正dispatch函数调用之前，首先捕获action，
// 然后分析action的type。如果是和发送事件相关的，
// 就会调用socket.emit来发布对应的事件和数据。
// 比如说，在我们的应用中，点击“发送”按钮会触发一个type为"MSG_UPDATE"的事件，
// 这个事件首先被中间件捕获，那么这时候就会出发socket.emit('msg from client')来将消息发送给server。

import { message_update, guest_update } from '../action'

function createSocketMiddleware(socket) {
  var eventFlag = false;
  return store => next => action => {
    if (!eventFlag) {
      eventFlag = true;
      // console.log('begin to mount');
      socket.on('guest update', function(data) {
        next(guest_update(data));
      });
      socket.on('msg from server', function(data) {
        next(message_update(data));
      });
      socket.on('self logout', function() {
        window.location.reload();
      });
      setInterval(function() {
        socket.emit('heart beat');
      }, 10000);
    }
    if (action.type == 'MSG_UPDATE') {
      socket.emit('msg from client', action.msg);
    } else if (action.type == 'NICKNAME_GET') {
      socket.emit('guest come', action.nickName);
    } else if (action.type == 'NICKNAME_FORGET') {
      socket.emit('guest leave', store.getState().nickName);
    }
    return next(action);
  }
}

export default createSocketMiddleware
