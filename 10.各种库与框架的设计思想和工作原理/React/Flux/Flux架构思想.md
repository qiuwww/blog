# Flux（单向数据流，事件监听，数据渲染）

简单说，Flux 是一种架构思想，专门解决软件的结构问题。它跟 MVC 架构是同一类东西，但是更加简单和清晰。

![Flux](D:\learn-space\blog\10.各种库与框架的设计思想和工作原理\React\Flux\Flux.png)

## 首先，Flux 将一个应用分成四个部分。

- View： 视图层
- Action（动作）：视图层发出的消息（比如 mouseClick，事件之类的，事件绑定）
- Dispatcher（派发器）：用来接收 Actions、执行回调函数，（回调函数）
- Store（数据层）：**用来存放应用的状态**，一旦发生变动，就提醒 Views 要更新页面

## Flux 的最大特点，就是数据的"单向流动"。

1. 用户访问 View
2. View 发出用户的 Action
3. Dispatcher 收到 Action，要求 Store 进行相应的更新
4. Store 更新后，发出一个"change"事件
5. View 收到"change"事件后，更新页面

### Dispatcher

Dispatcher 的作用是将 Action 派发到 Store、。
你可以把它看作一个路由器，负责在 View 和 Store 之间，建立 Action 的正确传递路线。
注意，Dispatcher 只能有一个，而且是全局的。

### Store

Store 保存整个应用的状态。它的角色有点像 MVC 架构之中的 Model 。
