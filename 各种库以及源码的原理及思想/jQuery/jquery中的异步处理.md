

# jquery中的异步处理.md
> JavaScript编程几乎总是伴随着异步操作，传统的异步操作会在操作完成之后，使用回调函数传回结果，而回调函数中则包含了后续的工作。

### 我们常见的异步操作：

```
定时器setTimeout
postmessage
WebWorkor
CSS3 动画
XMLHttpRequest
HTML5的本地数据
事件回调函数
等等…
```
> JS是单线程语言，就简单性而言，把每一件事情（包括GUI事件和渲染）都放在一个线程里来处理是一个很好的程序模型，因为这样就无需再考虑线程同步这些复杂问题。
>
>  另一方面，他也暴露了应用开发中的一个严重问题，单线程环境看起来对用户请求响应迅速，但是当线程忙于处理其它事情时，就不能对用户的鼠标点击和键盘操作做出响应。

## Deferred

> Deferred 提供了一个抽象的非阻塞的解决方案（如异步请求的响应），它创建一个promise对象，其目的是在未来某个时间点返回一个响应。简单来说就是一个异步/同步回调函数的处理方案。

$.Deferred在jQuery代码内部有四个模块被使用，分别是“**promise方法”、“DOM ready”、“Ajax模块”及“动画模块**”。

```
$.ajax({ajaxObj})
.done(function(){ alert("成功"); })
.fail(function(){ alert("出错"); });
```

> 把传参的回调，换成了链式的写法，这样可读性更高了。在jquery 1.5版后，通过$.ajax返回的不是XHR对象了，而是经过包装的Deferred对象，所以就具有promise的一些规范。
>

```
$.when($.ajax("a1.html"), $.ajax("a2.html"))
　　.done(function(){ alert('2次回调都正确返回了') })
　　.fail(function(){ alert('出错了'); });
　　
这段代码的意思是：先执行两个操作$.ajax("a1.html")和$.ajax("a2.html")，如果都成功了，就运行done()指定的回调函数；如果有一个失败或都失败了，就执行fail()指定的回调函数。
```

###  **可以混入任意的对象接口中**

```
jQuery的Deferred最好用的地方，就是模块化程度非常高，可以任意配合使用。

function task(name) {
  var dtd = $.Deferred();
  setTimeout(function() {
    dtd.resolve(name)
  }, 1000)
  return dtd;
}
$.when(task('任务一'), task('任务二')).done(function() {
  alert('成功')
})
把需要处理的异步操作，用Deferred对象给包装一下，然后通过when方法收集异步的操作，最后再返回出done的成功，这样的处理太赞了！

所以说，Deferred的引入，为处理事件回调提供了更加强大并且更灵活的编程模型。
```

##  $.Deferred的接口

```
不是执行一个方法，然后阻塞应用程序等待结果返回，而是返回一个promise对象来满足未来值。
```

> Promise/A只是一种规范，Deferred可以看作这种规范的具体实现，旨在提供通用的接口，用来简化异步编程难度，说白了就是:



> 一个可链式操作的对象，提供多个回调函数的注册，以及回调列队的回调，并转达任何异步操作成功或失败的消息。



> CommonJS Promise/A 标准这样定义的，promise对象上的then方法负责添加针对已完成和拒绝状态下的处理函数。then方法会返回另一个promise对象，这样可以形成“管道”风格。
>

### Deferred中定义的动作是非常多的，抽象的看其实可以类似一种观察者模式的实现。

观察者模式中的订阅方法：

```
  Done (操作完成)
  Fail (操作失败)
  Progress (操作进行中
```

观察中模式中的发布方法：

```
  resolve（解决）
  reject（拒绝）
  notify（通知）
```

### Deferred就是一个简单的工厂方法，有两种方式使用：

```
var a = $.Deferred（）
$.Deferred(function(){})
```

**内部其实是严重依赖$.Callbacks对象，Callbacks就是用来储存deferred依赖的数据的。**

因为done、fail、progress就是jQuery.Callbacks("once memory")所有对应的处理：

```
var list = jQuery.Callbacks("once memory")
promise['done'] = list.add;
```

deferred定义了一系列的接口，堪称一绝，100多行的代码，精练的有些过分。

**Deferred方法内部建议了2个对象，一个是deferred外部接口对象，一个是内部promise对象。**

promise对象解释是一个受限的对象, 这就是所谓的受限制的deferred对象，因为相比之前， 返回的deferred不再拥有resolve(With), reject(With), notify(With)这些能改变deferred对象状态并且执行callbacklist的方法了,**只能是then、done、fali等方法**。

其内部通过tuples数组，存储了所有的接口API，通过遍历把所有的接口一次都挂到内部promise与deferred对象上。

其中定义了done、fail以及progress这几个方法，**其实就是Callbacks回调函数中的add方法，用与push外部的的数据，保存在队列上。**

我们通过resolve、reject以及notify其实也就是处理Callbacks中的队列列表。

## Deferred的执行流程

用下面的例子分析（见右侧代码编辑器）：

```
var defer = $.Deferred();
defer.resolve(5);
defer.done(function(value) {})
var filtered = defer.then(function(value) {
  return value * 2;
});
filtered.done(function(value) {});
```

一般来说，javascript要实现异步的收集，就需要“等待”，比如defer.resolve(5)虽然触发了，但是done的处理还没添加，我们必须要等待done、then等方法先添加了后才能执行了resolve，那么**常规的的用法就是在resolve内部用setTimeout 0，image.onerror行成一个异步的等待操作处理。**

但是jQuery很巧妙的绕过了这个收集方式，

defer.resolve(5)方法实际就是触发了callback回到函数的fireWith方法，这样可以接受一个上下文deferred与参数5

```
deferred[tuple[0] + "With"](this === deferred ? promise : this, arguments);
```

之前 done | fail | progress方法都是通过jQuery.Callbacks("once memory") 或 jQuery.Callbacks("memory")生成的。

实际上在Callback源码fire方法有一句 memory = options.memory && data;这样就很巧妙的缓存当前参数5的值，提供给下一个使用，这个就是then，pipe链式数据的一个基础了，此刻的操作，我们把memory保存了这个数据的值。

重点来了，下一个defer.done的操作也是走的add的处理，把done的回调函数加入到list队列中的之后，接着就会触发。

```
 // With memory, if we're not firing then
 // we should call right away
} else if (memory) {
  firingStart = start;
  fire(memory);
}
```

因为memory在上一个resolve操作的时候，缓存了5了，所以memory的判断显示是为真的，所以立刻就触发了fire(memory)的代码了，所以就算触发的循序与添加的循序不一致，也不会导致错误。 **而且jquery很巧妙的避免了异步收集的问题，这样处理更可靠了。可见回调函数模块就是为Deferred模块量身定做的了。**

## Deferred源码

```
jQuery.extend({
	//内部deferred对象
	Deferred: function( func ) {
        // 定义的基本接口
        // Callbacks(once memory)的用法，就是只执行一次，并且保持以前的值
        // 每个元组分别包含一些与当前deferred相关的信息: 
        // 分别是：触发回调函数列表执行(函数名)，添加回调函数（函数名），回调函数列表				//（jQuery.Callbacks对象），deferred最终状态（第三组数据除外）
        // 总体而言，三个元组会有对应的三个callbacklist对应于doneList, failList, processList
		// Tuples元素集，其实是把相同有共同特性的代码的给合并成一种结构，然后来一次处理。
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			// deferred的状态，三种：pending(初始状态), resolved(解决状态), rejected(拒绝状态)
            // 其实就是tuples最后定义的
			state = "pending",
            // 内部promise对象,作用：
            //  1：通过promise.promise( deferred );混入到deferred中使用
            //  2：可以生成一个受限的deferred对象，
            //  不在拥有resolve(With), reject(With), notify(With)这些能改变deferred对象状		     //  态并且执行callbacklist的方法了
            //  换句话只能读，不能改变了
            //  扩展
            //  done fail pipe process 
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var action = tuple[ 0 ],
								fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ action + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		// 管道接口,API别名
		promise.pipe = promise.then;

		// Add list-specific methods
		// 遍历tuples
        // 把定义的接口混入到deferred中
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		// 混入方法
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = core_slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? core_slice.call( arguments ) : value;
					if( values === progressValues ) {
						deferred.notifyWith( contexts, values );
					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});
```

## Deferred自身则围绕这三组数据进行更高层次的抽象

  ☑ 触发回调函数列表执行(函数名)

  ☑ 添加回调函数（函数名）

  ☑ 回调函数列表（jQuery.Callbacks对象）

  ☑ Deferred最终状态（第三组数据除外）

### 这里抽象出2组阵营：

**1组**：回调方法/事件订阅:

```
done、fail、progress
```

**2组**：通知方法/事件发布:

```
resolve、reject、notify、resolveWith、rejectWith、notifyWith
```

### 对于Tuples的3条数据集是分2部分处理的：

**第一部分将回调函数存入**

```
promise[ tuple[1] ] = list.add;
```

其实就是给promise赋予3个回调函数。

```
promise.done = $.Callbacks("once memory").add
promise.fail = $.Callbacks("once memory").add
promise.progressl = $.Callbacks("memory").add
```

如果存在Deferred最终状态，默认会预先向doneList，failList中的list添加三个回调函数。

```
if (stateString) {
  list.add(function() {
    state = stateString;
  }, tuples[i ^ 1][2].disable, tuples[2][2].lock);
}
```

这里有个小技巧：

i ^ 1 [按位异或运算符](https://developer.mozilla.org/zh-CN/docs/JavaScript/Reference/Operators/Bitwise_Operators)

所以实际上第二个传参数是1、0索引对调了，所以取值是failList.disable与doneList.disable。

**通过stateString有值这个条件，预先向doneList,failList中的list添加三个回调函数，分别是:**

```
doneList : [changeState, failList.disable, processList.lock]
failList : [changeState, doneList.disable, processList.lock]
```

  ☑ changeState 改变状态的匿名函数，deferred的状态，分为三种：pending(初始状态), resolved(解决状态), rejected(拒绝状态)；

  ☑ 不论deferred对象最终是resolve（还是reject），在首先改变对象状态之后，都会disable另一个函数列表failList(或者doneList)；

  ☑ 然后lock processList保持其状态，最后执行剩下的之前done（或者fail）进来的回调函数。

所以第一步最终都是围绕这add方法：

  ☑ done/fail/是list.add也就是[callbacks.add](http://www.cnblogs.com/snandy/archive/2012/11/15/2770237.html#add)，将回调函数存入回调对象中。

**第二部分很简单，给Deferred对象扩充6个方法：**

  ☑ resolve/reject/notify 是 [callbacks.fireWith](http://www.cnblogs.com/snandy/archive/2012/11/15/2770237.html#fireWith)，执行回调函数；

  ☑ resolveWith/rejectWith/notifyWith 是 [callbacks.fireWith](http://www.cnblogs.com/snandy/archive/2012/11/15/2770237.html#fireWith) 队列方法引用。

最后合并promise到Deferred。

```
promise.promise( deferred );
jQuery.extend( obj, promise );
```

所以最终通过工厂方法Deferred构建的异步对象带的所有的方法了，return内部的deferred对象了。

### then就是pipe

我们可以想象是一个管道，可以对回调模式使用瀑布模型。如案例所示，下一个回调都能取到上一个回调的值，这样一直可以叠加往后传递。

> 不难看出管道的风格就是链式的操作，每一个链上的结果都会反馈后下一个链。我们可以把每一次的then操作，当做是创建一个新的deferred对象，那么每一个对象都够保存自己的状态与各自的处理方法。通过一个办法把所有的对象操作都串联起来，这就是then或者pipe管道设计的核心思路了。
