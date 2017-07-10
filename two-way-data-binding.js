// two-way-data-binding.js

/**
 * 双向数据绑定
 */

// 通常，我们需要编写代码，将从服务器获取的数据进行“渲染”，展现到视图上。
// 每当数据有变更时，我们会再次进行渲染，从而更新视图，使得视图与数据保持一致。
// 而另一方面，页面也会通过用户的交互，产生状态、数据的变化，
// 这个时候，我们则编写代码，将视图对数据的更新同步到数据，以致于同步到后台服务器。

/**
 * 各种框架的原理
 */

AngularJS 

采用“脏值检测”的方式，数据发生变更后，对于所有的数据和视图的绑定关系进行一次检测，
识别是否有数据发生了改变，有变化进行处理，可能进一步引发其他数据的改变，
所以这个过程可能会循环几次，一直到不再有数据变化发生后，将变更的数据发送到视图，更新页面展现。


VueJS 

则使用 ES5 提供的 Object.defineProperty() 方法，
监控对数据的操作，从而可以自动触发数据同步。
并且，由于是在不同的数据上触发同步，可以精确的将变更发送给绑定的视图，
而不是对所有的数据都执行一次检测。

function defineReactive(obj, key, value) {
    var dep = new Dep()
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function reactiveGetter() {
            if (Dep.target) {
                dep.depend()
            }
            return value
        },
        set: function reactiveSetter(newVal) {
            if (value === newVal) {
                return
            } else {
                value = newVal
                dep.notify()
            }
        }
    })
}


用jQuery做一个简单的实现


<input type="text" data-bind-123="name" />
<p data-bind-123="name"></p>


function DataBinder(object_id){
  // 创建一个简单的pubSub对象
  var pubSub = {
    callbacks: {},
    on: function(msg,callback) {
    	// 每次添加一个事件
      this.callbacks[msg] = this.callbacks[msg] || [];
      this.callbacks[msg].push(callback);
    },
    publish: function(msg) {
      this.callbacks[msg] = this.callbacks[msg] || [];
      for (var i = 0,len = this.callbacks[msg].length; i < len; i++) {
      	 //  逐个调用函数
         this.callbacks[msg][i].apply(this,arguments);
      };
    }
  },

      data_attr = "data-bind-" + object_id,
      message   = object_id + ":change",

      changeHandler = function(event) {
        var target    = event.target || event.srcElement, // IE8兼容
            prop_name = target.getAttribute(data_attr);

        if (prop_name && prop_name !== "") {
          pubSub.publish(message,prop_name,target.value);
        }
      };

  // 监听事件变化，并代理到pubSub
  if (document.addEventListener) {
    document.addEventListener("keyup",changeHandler,false);
  } else{
    // IE8使用attachEvent而不是addEventListenter
    document.attachEvent("onkeyup",changeHandler);
  };

  // pubSub将变化传播到所有绑定元素
  pubSub.on(message,function(event,prop_name,new_val){
    var elements = document.querySelectorAll("[" + data_attr + "=" +prop_name + "]"),
        tag_name;
    for (var i = 0,len = elements.length; i < len; i++) {
      tag_name = elements[i].tagName.toLowerCase();

      if (tag_name === "input" || tag_name === "textarea" || tag_name === "select") {
        elements[i].value = new_val;
      } else{
        elements[i].innerHTML = new_val;
      };
      console.log("prop_name:"+new_val);
    };
  })

  return pubSub;
}

function User(uid) {
  var binder = new DataBinder(uid),
      user   = {
        attribute : {},

        // 属性设置器使用数据绑定器pubSub来发布
        set : function(attr_name,val) {
          this.attribute[attr_name] = val;
          binder.publish(uid + ":change",attr_name,val,this);
        },

        get : function(attr_name) {
          return this.attribute[attr_name];
        },

        _binder : binder
      };

  binder.on(uid + ":change",function(event,attr_name,new_val,initiator) {
    if (initiator !== user) {
      user.set(attr_name,new_val);
    }
  });

  return user;
}
var user = new User( 123 );
user.set( "name", "lwl" );