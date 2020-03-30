// 中介者
var mediator = (function() {
  //存储可被广播或者监听的topic
  var topics = {};

  //订阅一个topic，提供一个回调函数，一旦topic被广播就执行该回调
  var subscribe = function(topic, fn) {
    if (!topics[topic]) {
      topics[topic] = [];
    }
    topics[topic].push({ context: this, callabck: fn });

    return this;
  };

  //发布/广播事件到程序的剩余部分
  var publish = function(topic) {
    var args;

    if (!topics[topic]) {
      return false;
    }

    args = Array.prototype.slice.call(arguments, 1);
    for (var i = 0; i < topics[topic].length; i++) {
      var subscription = topics[topic][i];
      subscription.callabck.apply(subscription.context, args);
    }
    return this;
  };

  return {
    publish: publish,
    subscribe: subscribe,
    installTo: function(obj) {
      obj.subscribe = subscribe;
      obj.publish = publish;
    },
  };
})();

(function(Mediator) {
  function initialize() {
    mediator.name = 'Li';

    /*
        订阅一个事件nameChange
        回调函数显示修改前后的消息
         */
    mediator.subscribe('subscribe', function(arg) {
      console.log(this.name);
      this.name = arg;
      console.log(this.name);
    });
  }

  function publish() {
    //广播触发事件
    mediator.publish('subscribe', 'wang');
  }

  initialize(); //初始化
  publish(); //调用
})(mediator);

// 这段代码比较难理解，先是调用initialize函数将中介者的名字设置为Li，然后调用中介者mediator对象的subscribe方法，
// 将topics[“subscribe”]中的对象绑定了回调函数fn，也就是之前输出的那个函数；
// 最后调用publish函数，获取topics下的topics[“subscribe”]对象，并且根据之前的参数，调用该对象的之前绑定的回调函数；
