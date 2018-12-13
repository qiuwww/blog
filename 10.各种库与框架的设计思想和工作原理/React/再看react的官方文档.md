
## 2018-12-13，react文档日新
* 单向数据流。
* 虚拟DOM（Virtual DOM）
### render
在render内不能修改state，会一直调用`componentWillUpdate`， 也不能在更新的生命周期内调用`setState`。

### 组件&props
- 无论是使用函数或是类来声明一个组件，它决不能修改它自己的props。所有的React组件必须像纯函数那样使用它们的props。


### state和生命周期
**对于一个组件（函数或者对象），现有props，再有state（无状态组件没有内部状态）**

- setState的可以接受一个函数来更改state的，请**使用第二种形式的 setState() 来接受一个函数而不是一个对象**。 该函数将接收先前的状态作为第一个参数，将此次更新被应用时的props做为第二个参数：
```
// Correct 需要返回一个对象
this.setState((prevState, props) => ({
  counter: prevState.counter + props.increment
}));
```
- setState是可以接受回调函数的。
```
this.state = {foo: 2};
this.setState({foo: 123}, ()=> {
    console.log(foo);
    // 123
});
```

如果某些数据可以由props或者state提供，那么它很有可能不应该在state中出现。


### 事件处理
通过事件来添加反向数据流。
- 使用组件自定义的回调函数`onClick={this.handleClick.bind(this)}`，你应该为这个方法绑定 this。
- 使用一个匿名函数作为回调函数，这样就会 每次 所在组件 渲染的时候都会创建一个不同的回调函数。
  ```
  <button onClick={(e) => this.handleClick(e)}>
    Click me
  </button>
  ```
#### 传递参数
```
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button> // 内部调用this指向组件，虽然没声明出来
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button> // 内部调用this指向组件，e对象是默认接受参数的第二个
```
上述两种方式是等价的，分别通过 arrow functions 和 Function.prototype.bind 来为事件处理函数传递参数。
通过 bind 方式向监听函数传参，在类组件中定义的监听函数，**事件对象 e 要排在所传递参数的后面**。


### 列表 & keys
Keys可以在DOM中的某些元素被增加或删除的时候帮助React识别哪些元素发生了变化。因此你应当给数组中的每一个元素赋予一个确定的标识。
- 通常，我们使用来自数据的id作为元素的key；
- 当元素没有确定的id时，你可以使用他的序列号索引index作为key，有时候也不保险，比如数据更改了，索引是不会变化的；
- 强制更新，使用可变的keys，这个时候就舍弃了组件渲染的一些性能。
- **元素的key只有在它和它的兄弟节点对比时才有意义。**

### 表单
HTML表单元素与React中的其他DOM元素有所不同,因为表单元素**生来就保留一些内部状态**。
#### 受控组件
表单组件的内部状态受state控制，更新也需要使用setState。
使用”受控组件”,每个状态的改变都有一个与之相关的处理函数。**这样就可以直接修改或验证用户输入**。
具体的操作回路如下：
```
// render()
  <input type="text" value={this.state.value} onChange={this.handleChange.bind(this)} />

// state
  this.state = {value: ''};

// handler
  handleChange(event) {
    this.setState({value: event.target.value});
  }
```
当你有处理多个受控的input元素时，你可以通过给每个元素添加一个name属性，来让处理函数根据 event.target.name的值来选择做什么。还是直接添加一个类型判断来的爽。
`this.handleChange.bind(this, type);`

### 深入JSX
当使用`&&`来渲染组件的时候，需要让`&&`前面的值保持为boolean，
要解决这个问题，请确保 && 前面的表达式始终为布尔值：
```
<div>
  {props.messages.length > 0 &&
    <MessageList messages={props.messages} />
  }
</div>
相反，如果你想让类似 false、true、null 或 undefined 出现在输出中，你必须先把它转换成字符串 :

<div>
  My JavaScript variable is {String(myVariable)}.
</div>
```


### 使用 PropTypes 进行类型检查
```
import PropTypes from 'prop-types';

class Greeting extends React.Component {
  render() {
    return (
      <h1>Hello, {this.props.name}</h1>
    );
  }
}

Greeting.propTypes = {
  name: PropTypes.string
};
```
PropTypes 包含一整套验证器，可用于确保你接收的数据是有效的。
```
static defaultProps = {
    name: 'stranger'
  }
defaultProps 用来确保 this.props.name 在父组件没有特别指定的情况下，有一个初始值。类型检查发生在 defaultProps 赋值之后，所以类型检查也会应用在 defaultProps 上面。
```

### Refs & Dom

下面是几个适合使用 refs 的情况：
- 处理焦点、文本选择或媒体控制。
- 触发强制动画。
- 集成第三方 DOM 库
如果可以通过声明式实现，则尽量避免使用 refs。

旧版 API：String 类型的 Refs，它已过时并可能会在未来的版本被移除。

目前的操作方式：
```
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  render() {
    return <div ref={this.myRef} />;
  }
}
// 访问
const node = this.myRef.current;
```
**你不能在函数式组件上使用 ref 属性，因为它们没有实例。**

### 非受控组建
去掉内部的状态与state的关联，让组件自由渲染数据，然后通过ref来引用组建，拿到数据。
要编写一个非受控组件，而非为每个状态更新编写事件处理程序，你可以 使用 ref 从 DOM 获取表单值。


### 性能优化
https://react.docschina.org/docs/optimizing-performance.html
#### 单文件生产版本
我们提供压缩好的生产版本的React和React DOM文件:
```
<script src="https://unpkg.com/react@15/dist/react.min.js"></script>
<script src="https://unpkg.com/react-dom@15/dist/react-dom.min.js"></script>
```
注意只有结尾为.min.js的React文件才是适合生产使用的。

#### Brunch
为了创建最高效的Brunch生产版本，需要安装uglify-js-brunch 插件:
```
# If you use npm
npm install --save-dev uglify-js-brunch

# If you use Yarn
yarn add --dev uglify-js-brunch
```
接下来，为了构建生产版本，在build命令后添加-p参数：
```
brunch build -p
```
#### 使用shouldComponentUpdate来提升速度
在一些情况下，你的组件可以通过重写这个生命周期函数shouldComponentUpdate来提升速度， 它是在重新渲染过程开始前触发的。


### 高阶组件
区别于继承，这里使用一个组件来包裹组件类，就像是多穿了一件衣服，功能在内部的衣服上添加新的功能。不去修改原来的组件。在内部进行一些操作之后，返回一个新的组件类。
https://react.docschina.org/docs/higher-order-components.html
这里对应贷超部分就可以对类似的几个页面使用高阶组件来操作。

高阶组件就是一个函数，且该函数接受一个组件作为参数，并返回一个新的组件

- 使用高阶组件（HOC）解决交叉问题



### Render Props

render prop 是一个组件用来了解要渲染什么内容的函数 prop。

高阶组件实现的具体封装，可以这样理解。

### 严格模式

严格模式检查只在开发模式下运行，不会与生产模式冲突。

你可以在应用的任何地方启用严格模式。例如：
```
import React from 'react';

function ExampleApplication() {
  return (
    <div>
      <Header />
      <React.StrictMode>
        <div>
          <ComponentOne />
          <ComponentTwo />
        </div>
      </React.StrictMode>
      <Footer />
    </div>
  );
}
```
在上面的例子中，不会对组件Header、Footer进行strict mode检查。然而ComponentOne、ComponentTwo以及它们所有的后代将被检查。

### React.Compoment
生命周期的具体细节
https://react.docschina.org/docs/react-component.html

#### setState
https://react.docschina.org/docs/react-component.html#setstate

React不会保证在setState之后，能够立刻拿到改变的结果。


### 认知程度检测，术语表

https://react.docschina.org/docs/glossary.html


### F&A
1. 我应该在组件的哪个生命周期发送 AJAX 请求?
- 你应该在 componentDidMount 生命周期方法内发送 AJAX 请求数据。这样你才能够在请求的数据到达时使用 setState 更新你的组件。
- 取消 AJAX 请求，需要注意的是，如果组件在 AJAX 请求完成之前被卸载了，那么你会在浏览器的控制面板上看到一条警告：cannot read property 'setState' of undefined。如果这对你来说是个问题的话，**你可以追踪未完成的 AJAX 请求并在 componentWillUnmount 生命周期方法内将它们取消**。绑定ajax对象id到当前的组件（静态属性），卸载的生命周期内调用abort()。


2. 怎样避免函数被调用太快或者太多次？
 https://react.docschina.org/docs/faq-functions.html#%E6%80%8E%E6%A0%B7%E9%81%BF%E5%85%8D%E5%87%BD%E6%95%B0%E8%A2%AB%E8%B0%83%E7%94%A8%E5%A4%AA%E5%BF%AB%E6%88%96%E8%80%85%E5%A4%AA%E5%A4%9A%E6%AC%A1%EF%BC%9F
