# README

[参考文章]<https://www.cnblogs.com/cgzl/p/8641738.html>

用流的形式来处理所有，原本默认的上下执行顺序或者异步回调等都可以以同步的方式描述。

## rxjs 介绍

RxJS 是 ReactiveX 编程理念的 JavaScript 版本。ReactiveX 是一种**针对异步数据流的编程**。
简单来说，它将一切数据，包括 HTTP 请求，DOM 事件或者普通数据等**包装成流的形式**，然后用强大丰富的操作符对流进行处理，使你能以同步编程的方式处理异步数据，并组合不同的操作符来轻松优雅的实现你所需要的功能。

## rxjs 的主要成员

- Observable: 一系列值的生产者 <可观察量>
- Observer: 它是 observable 值的消费者 <观察者>
- Subscriber: 连接 observer 和 observable <订户>，观察者模式
- Operator: 可以在数据流的途中对值进行**转换的操作符** <操作员>
- Subject: 既包括 Observable 也包括 Observer <服从的,科目>

### Observable, Observer, Subscriber 的角色关系

Observable<数据源>允许:

- 订阅/取消订阅它的数据流
- 发送下一个值给 Observer
- 告诉 Observer 发生了错误以及错误的信息
- 告诉 Observer 整个流结束了

Observer<订阅者，数据的用户>可以提供:

- 一个可以处理流(stream)上的 next 的值的 function
- 处理错误的 function
- 处理流结束的 function

他们之间通过 Subscriber 来连接，也就是:

`Subscriber`把`Observable`和`Observer`联系到了一起, 就是`Subscriber`为`Observable`提供了一个`Observer`。

### 创建 Observable

- Observable.from(), 把数组或 iterable 对象转换成 Observable
- Observable.create(), 返回一个可以在 Observer 上调用方法的 Observable.
- Observable.fromEvent(), 把 event 转换成 Observable.
- Observable.fromPromise(), 把 Promise 转换成 Observable.
- Observable.range(), 在指定范围内返回一串数.

### Subscribe

subscribe 里面有 3 个 function, 这 3 个 function 就是 Observer。代码参见`demo/from.js`

- 第一个 function 是指当前这个 person 到来的时候需要做什么;
- 第二个是错误发生的时候做什么;
- 第三个 function 就是流都走完的时候做什么.

注意, 是当执行到.subscribe()的时候, Observable 才开始推送数据，也就是如果不订阅就不会执行。

### Operator，流水线，做转换之用，纯函数，高阶函数

Operator 是一个 function, 它有一个输入, 还有一个输出. 这个 function 输入是 Observable 输出也是 Observable.

在 function 里面, 可以做一些转换的动作。

#### High order function

如果一个 function 的参数可以是另一个 function, 或者它可以返回另一个 function, 那么它就是 High Order function.

#### next

Observer 的回调，用来接收 Observable 中的 next 类型通知，**此通知带有值**。
Observable 可能会掉用这个方法 0 次，或者多次。

#### complete

[参考文档](https://cn.rx.js.org/class/es6/Subscriber.js~Subscriber.html#instance-method-complete)
Observer 的回调，用来接收 Observable 中的 complete 类型通知。 通知 Observer， Observable 完成了基于推送体系的通知。

### Marble 图

[Interactive diagrams of Rx Observables]<http://rxmarbles.com/#from>

### 错误处理

Observable 是会发生错误的, 如果错误被发送到了 Observer 的话, **整个流就结束了**.

但是做 Reactive 编程的话, 有一个原则: Reactive 的程序应该很有弹性/韧性.

也就是说, 即使错误发生了, 程序也应该继续运行.

error function 在 Observer 被调用了的话, 那就太晚了, 这样流就停止了.

#### 错误处理的 Operators

- error() 被 Observable 在 Observer 上调用
- catch() 在 subscriber 里并且在 oserver 得到它(错误)之前拦截错误，对象自带，在 subscribe 之前调用 catch, catch 里可以进行流的替换动作。
- retry(n) 立即重试最多 n 次
- retryWhen(fn) 按照参数 function 的预定逻辑进行重试

### hot, cold 与 share

[代码参见]<`demo/share.ts`>

- hot，也就是什么时候订阅就接受当前的值；
- cold，也就是接受所有的数据的一个备份；
- share，就是相当于打了一个 tag，数据需要切割，
  - 在多个订阅者间共享源 observable;
  - share() 操作符允许多个订阅者共享同一个 Observable. 也就是把 Cold 变成 Hot.

### Subject

Subject 比较特殊, 它即是 Observable 又是 Observer.

作为 Observable, Subject 是比较特殊的, 它可以对多个 Observer 进行广播, 而普通的 Observable 只能单播, 它有点像 EventEmitters(事件发射器), 维护着多个注册的 Listeners.

#### BehaviorSubject

BehaviorSubject 是 Subject 的一个变种, 它有一个当前值的概念, 它会把它上一次发送给订阅者值保存起来, 一旦有新的 Observer 进行了订阅, 那这个 Observer 马上就会从 BehaviorSubject 收到这个当前值.

也可以这样理解 BehaviorSubject 的**特点**:

- 它代表一个随时间变化的值, 例如, 生日的流就是 Subject, 而一个人的年龄流就是 BehaviorSubject.
- 每个订阅者都会从 BehaviorSubject 那里得到它推送出来的初始值和最新的值.
- 用例: 共享 app 状态.

### fromEvent 将事件转换成 observable 序列。

[官方文档](https://rxjs-cn.github.io/learn-rxjs-operators/operators/creation/fromevent.html)

> 函数签名: fromEvent(target: EventTargetLike, eventName: string, selector: function): Observable

#### 用途

- 触发事件，对事件进行 observer，创建的事件对象是 observable

```ts
// RxJS v6+
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

// 创建发出点击事件的 observable
const source = fromEvent(document, 'click');
// 映射成给定的事件时间戳
const example = source.pipe(map((event) => `Event time: ${event.timeStamp}`));
// 输出 (示例中的数字以运行时为准): 'Event time: 7276.390000000001'
const subscribe = example.subscribe((val) => console.log(val));
```

### auditTime，属于过滤器作用

在给定的时间内忽略发出的数据，时间到后发出最新值

### takeUntil，发出值，直到提供的 observable 发出值，它便完成。

[官方文档](https://rxjs-cn.github.io/learn-rxjs-operators/operators/filtering/takeuntil.html)

> takeUntil(notifier: Observable): Observable

也就是说在 notifier 执行 next 之后，takeUntil 所在的 obserable 就不会再执行了

## 更多参考

1. [RxJS 实战练习-经典游戏 Breakout](https://zhuanlan.zhihu.com/p/54399434)
