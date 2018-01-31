# jq中的观察者模式

[TOC]

## 理解观察者模式（更方便的回调函数写法，随时上车，随时下车）

讲解jQuery**回调对象**之前，我们有必要先理解其背后的设计思想 - “观察者模式”。

观察者模式 (pub/sub) 的背后，总的想法是在应用程序中**增强松耦合性**。并非是在其它对象的方法上的单个对象调用。**一个对象作为特定任务或是另一对象的活动的观察者，并且在这个任务或活动发生时，通知观察者。**观察者也被叫作订阅者（Subscriber），**它指向被观察的对象，既被观察者（Publisher 或 subject)。****当事件发生时，被观察者（Publisher）就会通知观察者（subscriber）。**

## 观察者的使用场合

观察者的使用场合就是：**当一个对象的改变需要同时改变其它对象**，**并且它不知道具体有多少对象需要改变的时候，就应该考虑使用观察者模式**。先看官网的demo这个例子，涉及到了 add 与 fire方法，熟悉设计模式的童鞋呢，一眼就能看出，其实又是基于发布订阅（Publish/Subscribe）的观察者模式的设计。

作为 $.Callbacks() 的创建组件的一个演示，只使用回调函数列表，就可以实现 Pub/Sub 系统，将 $.Callbacks 作为一个队列。

## 我们来模拟常规下最简单的实现：

JS里对观察者模式的实现是通过回调来实现的，我们来先定义一个Observable对象，其内部包含了2个方法：订阅add方法与发布fire方法，如下代码：

```
var Observable = {
  callbacks: [], // 存储事件的数组
  add: function(fn) { // 添加事件到数组
    this.callbacks.push(fn);
  },
  fire: function() { // 依次执行事件
    this.callbacks.forEach(function(fn) {
      fn();// 当前的函数执行
    })
  }
}
```

使用add开始订阅：

```
Observable.add(function() {
  alert(1)
})

Observable.add(function() {
  alert(2)
})
```

使用fire开始发布：

```
Observable.fire(); // 1, 2
```

## 设计的原理：

开始构建一个存放回调的数组，如`this.callbacks= [] `添加回调时，将回调push进this.callbacks，执行则遍历this.callbacks执行回调，也弹出1跟2了。当然这只是简洁的设计，便于理解，整体来说设计的思路代码都是挺简单的，那么我们从简单的设计深度挖掘下这种模式的优势。

注意：如果没有做过复杂交互设计，或者大型应用的开发者，可能一开始无法理解这模式的好处，就简单的设计而言用模式来处理问题，有点把简单的问题复杂化。我们不是为了使用模式而使用的。

**组件开发为了保证组件可以在不同的项目中都适用，其必须是对其常用功能抽象出来加以实现，绝不会包含具体的业务逻辑而某一特定的项目使用者在其业务场景中使用组件时不可避免的要加入不同场景的业务逻辑。**

## 模式的实际运用

在进行组件开发中，为了**保证组件可以在不同的类似项目场景中都能适用**，那么就必须是对其**常用功能抽象出来加以实现**。

我们来看看具体的实际用处：

假设一段ajax的请求，成功后通过done返回结果数据：

```
$.ajax({
  url: "test.html",
  context: document.body
}).done(function(data) {
  //data数据的处理
  $('sel1').html(data.a)
  $('sel2').html(data.b)
  $('sel3').html(data.c)
  //其余处理
});
```

咋一看好像都挺好，没什么问题，但是仔细观察我们会发现所有的逻辑是不是都写在done方法里面，这样确实是无可厚非的，但是问题就是**逻辑太复杂**了。**Done里面有数据处理、html渲染、还可能有其它不同场景的业务逻辑。**这样如果是换做不同的人去维护代码，增加功能就会显得很混乱而且没有扩展性。那么观察者模式能很好的解决了这个的问题。

我们优化下代码:

```
$.ajax({
  url: "test.html",
  context: document.body
}).done(function(data) {
    pocessData()
    pocessHtml()
    pocessOther()
  }

  function pocessData() {
    //处理数据
  }

  function pocessHtml() {
    $('sel1').html(data.a)
    $('sel2').html(data.b)
    $('sel3').html(data.c)
  }

  function pocessOther() {
    //处理其他逻辑
  }
```

这种方式的好处是，分离出各种的业务函数，从而降低了代码之间的耦合度，但是这样代码写法几乎就是“就事论事”的处理，达不到抽象复用。

那么我们用之前的观察者模式加工一下上面的代码：（这只是伪代码，用于理解）

```
Observable.add(function() {
  //pocessData
})

Observable.add(function() {
  $('sel1').html(data.a)
  $('sel2').html(data.b)
  $('sel3').html(data.c)
})

Observable.add(function() {
  //pocessOther
})

$.ajax({
  url: "test.html",
  context: document.body
}).done(function(data) {
  Observable.fire(data)// 就是说，对外暴露了一个随时可添加处理函数的接口，随时上车
})
```

设计该模式背后的主要动力是**促进形成松散耦合**。**在这种模式中，并不是一个对象调用另一个对象的方法，而是一个对象订阅另一个对象的特定活动并在状态改变后获得通知。**订阅者也称为观察者，而被观察的对象称为发布者或主题。**当发生了一个重要的事件时（数据拿回来了）**，发布者将会通知（调用）**所有订阅者（回调函数）**并且可能经常以事件对象的形式传递消息。

总的来说，**观察者模式所做的工作就是在解耦**，**让耦合的双方都依赖于抽象，而不是依赖于具体**。从而使得各自的变化都不会影响到另一边的变化。

```
// 基础的简单实现
var Observable = {
  callbacks: [],
  add: function(fn) {
    this.callbacks.push(fn);
  },
  fire: function(data) {
    this.callbacks.forEach(function(fn) {
      fn(data);
    })
  }
}

function ajax(arg){
  setTimeout(function(){
    arg.successful(arg.data+ ',返回获取到后台的数据')
  },1000)
}

//使用add开始订阅：
Observable.add(function(data) {
  show('执行动作一 ' + data)
})
Observable.add(function(data) {
  show('执行动作二')
})


//一段ajax请求，成功后处理
ajax({
  data:'请求数据',
  successful:function(data){
    Observable.fire(data); //触发动作
  }
})
```

## jQuery回调对象（jQuery.Callbacks）

jQuery.Callbacks一般开发者接触的很少，虽然jQuery向开发者提供了外部接口调用，但是jQuery.Callbacks()模块的开发目的是**为了给内部jQuery.ajax() 和jQuery.Deferred()模块提供统一的基本功能组件。**它可以用来作为类似基础定义的新组件的功能。

jQuery.Callbacks是jquery在1.7版本之后加入的，是从1.6版中的_Deferred对象中抽离的，**主要用来进行函数队列的add、remove、fire、lock等操作，并提供once、memory、unique、stopOnFalse四个option进行一些特殊的控制。**

这个函数常见的应用场景是**事件触发机制**，也就是设计模式中的观察者模式的发布、订阅机制，目前Callbacks对象用于queue、ajax、Deferred对象中，本小节主要是一些简单的例子去理解的使用。

我们看官网提供的demo：

```
function fn1(value) {
  console.log(value);
}

function fn2(value) {
  fn1("fn2 says: " + value);
  return false;
}
```

可以将上述两个方法作为回调函数，并添加到 $.Callbacks 列表中，并按下面的顺序调用它们:

```
var callbacks = $.Callbacks();
callbacks.add(fn1);
// outputs: foo!
callbacks.fire("foo!");
callbacks.add(fn2);
// outputs: bar!, fn2 says: bar!
callbacks.fire("bar!") // 两个函数依次执行
```

这样做的结果是，当构造复杂的**回调函数列表**时，将会变更很简单。**可以根据需要，很方面的就可以向这些回调函数中传入所需的参数。**

上面的例子中，我们使用了 $.Callbacks() 的两个方法: .add() 和 .fire()。 .add() 和 .fire() 

.add() 支持添加新的回调列表, 

而.fire() 提供了一种用于处理在同一列表中的回调方法的途径。

另一种方法是$.Callbacks 的.remove()方法，用于从回调列表中删除一个特定的回调。下面是.remove()使用的一个例子:

```
var callbacks = $.Callbacks();
callbacks.add( fn1 );
callbacks.fire( "foo!" );// outputs: foo!
callbacks.add( fn2 );
callbacks.fire( "bar!" );// outputs: bar!, fn2 says: bar!
callbacks.remove( fn2 );
callbacks.fire( "foobar" );// only outputs foobar, as fn2 has been removed.
```

这个运用内部就是观察者模式的一种设计实现，只是相对比较复杂。我们看看jQuery的回调函数到底为哪些模块服务？

### 异步队列模块：

```
Deferred: function(func) {
  var tuples = [
    // action, add listener, listener list, final state
    ["resolve", "done", jQuery.Callbacks("once memory"), "resolved"],
    ["reject", "fail", jQuery.Callbacks("once memory"), "rejected"],
    ["notify", "progress", jQuery.Callbacks("memory")]
  ]，………….
```

### 队列模块：

```
// 没看太明白
_queueHooks: function(elem, type) {
  var key = type + "queueHooks";
  return data_priv.get(elem, key) || data_priv.access(elem, key, {
    empty: jQuery.Callbacks("once memory").add(function() {
      data_priv.remove(elem, [type + "queue", key]);
    })
  });
}
```

### Ajax模块

```
ajax: function(url, options) {
  //省略代码
  deferred = jQuery.Deferred(),
  completeDeferred = jQuery.Callbacks("once memory")
    ..............
}
```

不难发现jQuery.Callbacks还提供“once memory”等参数用来处理：

   ☑  once: 确保这个回调列表**只执行（ .fire() ）一次**(像一个递延 Deferred)。

   ☑  memory: **保持以前的值**，将添加到这个列表的后面的最新的值**立即执行调用任何回调** (像一个递延 Deferred)。

   ☑  unique: 确保一次只能添加一个回调(所以在列表中没有重复的回调)。

   ☑  stopOnFalse: 当一个回调返回false 时中断调用。

```
var callbacks = $.Callbacks('once');

callbacks.add(function() {
  alert('a');
})

callbacks.add(function() {
  alert('b');
})

callbacks.fire(); //输出结果: 'a' 'b'
callbacks.fire(); //未执行
```

once的作用是使callback队列只执行一次。

OK，我们大概知道这个是干嘛用的了，可以开始上正菜了，（下一节开始噢！）



