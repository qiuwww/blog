# learn.md

# 模块
## mobx-react


@observable: 使用此标签监控要检测的数据；
@observer: 使用此标签监控当数据变化是要更新的Component（组件类）
@action:使用此标签监控数据改变的自定义方法(当在需要数据改变的时候执行此自定义方法，那么View层也会跟着自动变化，默认此View层已经使用@observer标签监控)， 用于初始化数据;
任何应用都有动作。动作是任何用来修改状态的东西。 使用MobX你可以在代码中显式地标记出动作所在的位置。 动作可以有助于更好的组织代码。
http://cn.mobx.js.org/refguide/action.html
action 装饰器/函数遵循 javascript 中标准的绑定规则。 但是，Mobx 3引入了 action.bound 来自动地将动作绑定到目标对象。 注意，与 action 不同的是，(@)action.bound 不需要一个name参数，名称将始终基于动作绑定的属性。




@Provider: is a component that can pass stores (or other stuff) using React's context mechanism to child components. This is useful if you have things that you don't want to pass through multiple layers of components explicitly.

@inject: can be used to pick up those stores. It is a higher order component that takes a list of strings and makes those stores available to the wrapped component.



## webpack

--progress  :  压缩的进程提示
--colors ： 
--profile ： 每个文件的压缩时间


## 遇到的问题

1. input标签需要添加闭合斜杠；
2. 单行的标签return，可以不需要()包裹，但是多行的标签需要包裹；
`
render() {        
        return <h3>123</h3>
    }

render() {        
        return (
        	<div class="search-add-compute">
	        		<div class="search-input">
	        			<Input placeholder={this.props.placeholder} value={initValue} onChange = {this.onChange.bind(this)}
	        			<span class="search-btn"></span>
	        	    </div>
	        	    <div class="add-compute">
	        	   		<div class="add">新增</div>
	        	   		<div class="compute">计算</div>
	        	    </div>
        	   </div>
    	    ) 
    }    
`
3. class->className; 可能是防止与class(类声明)冲突解析出错。





## react的数据流

https://juejin.im/entry/58e6f4ceda2f60005ff16d50

`在React中，数据流是自上而下单向的从父节点传递到子节点，所以组件是简单且容易把握的，他们只需要从父节点提供的props中获取数据并渲染即可。如果顶层组件的某个prop改变了，React会递归地向下遍历整棵组件数，重新渲染所有使用这个属性的组件。`

在组件内部，可以通过this.props来访问props，props是组件唯一的数据来源，对于组件来说：

props永远是只读的。

React的一大创新，就是把每一个组件都看成是一个状态机，组件内部通过state来维护组件状态的变化，这也是state唯一的作用。

这里似乎使用mobx来管理数据流


## react事件

`
React通过将事件处理器绑定到组件上来处理事件。
React事件本质上和原生JS一样，鼠标事件用来处理点击操作，表单事件用于表单元素变化等，Rreact事件的命名、行为和原生JS差不多，不一样的地方是React事件名区分大小写。`


## 组件
React的组件拥有一套清晰完整而且非常容易理解的生命周期机制，大体可以分为三个过程：初始化、更新和销毁，在组件生命周期中，随着组件的props或者state发生改变，它的虚拟DOM和DOM表现也将有相应的变化。


对于一个组件来说，render 是唯一一个必须的方法。render方法需要满足这几点：
1.只能通过 this.props 或 this.state 访问数据
2.只能出现一个顶级组件
3.可以返回 null、false 或任何 React 组件
4.不能对 props、state 或 DOM 进行修改
需要注意的是，render 方法返回的是虚拟DOM。




react中state改变了，组件才会update。父写好state和处理该state的函数，同时将函数名通过props属性值的形式传入子，子调用父的函数，同时引起state变化。子组件要写在父组件之前。


# 生命周期

1. componentWillMount()： 调用一次，相当于jq的ready；
2. render()：主动或者被动改变，初始化后||状态更新之后；
3. componentDidMount()：相当于模板+数据生成代码片段插入页面之后的操作，
callback{	
	1.这个时候可以获取元素，在这个时候之后组件已经生成了对应的DOM结构，可以通过this.getDOMNode()来进行访问；
	2.AJAX请求等操作；
	3.发送AJAX请求等操作(防止异部操作阻塞UI)；
	在该钩子函数里面，可以使用 setState()，但是会触发重新渲染（re-render）.
}
4. 组件更新: componentWillReceiveProps(): 在组件接收到一个新的prop时被执行。这个方法在初始化render时不会被调用。
`
componentWillReceiveProps: function(nextProps) {
  this.setState({
    likesIncreasing: nextProps.likeCount > this.props.likeCount
  });
旧的props可以通过this.props来获取。在这个函数内调用this.setState()方法不会增加一次新的render.
}
该方法应该用于比较this.props和nextProps，然后使用this.setState()来改变state。

需要注意的是，即使 Props 没有发生变化，React 也有可能会调用该钩子函数。所以如果你想要真正处理 Props 的变化，要记得比较当前 props 和nextProps.
`
5. 组件更新: shouldComponentUpdate(): boolean，在组件挂载之后，再接收到新的props或者state时被执行。在初始化时或者使用forceUpdate时不被执行。可以在你确认不需要更新组件时使用。
boolean当组件做出是否要更新DOM的决定的时候被调用。
`
如果shouldComponentUpdate返回false, render()则会在下一个state change之前被完全跳过。(另外componentWillUpdate和 componentDidUpdate也不会被执行)；
shouldComponentUpdate() 在两种情况下不会被调用：
1. 初始化渲染
2. 使用了 forceUpdate() 情况下
`
6. 组件更新: componentWillUpdate() : 在组件接收到新的props或者state但还没有render时被执行。在初始化时不会被执行。

7. 组件更新: componentDidUpdate() : 在组件完成更新后立即执行。在初始化时不会被执行。一般会在组件完成更新后被使用。

8. Unmounting: componentWillUnmount(): 在组件从DOM unmount后立即执行。

## 已经去掉的状态
9. getInitialState(): React在ES6的实现中去掉了getInitialState这个hook函数,规定state在constructor中实现。
10. getDefaultProps() : 设置props，改为component.defaultProps={}来设置；

# 挂载的方法

1. getDOMNode(): DOMElement可以在任何挂载的组件上面调用，用于获取一个指向它的渲染DOM节点的引用。
2. forceUpdate()当你知道一些很深的组件state已经改变了的时候，可以在该组件上面调用，而不是使用this.setState()。


# props与state
getDefaultProps是*设置*默认props，如果父组件没有给某个prop那就用默认的，getInitialState是设置组件mount以后的初始state的。
## 这里改为：使用 component.defaultProps = {这里设置默认props}, 来设置默认的初始值；同理在constructor() {这里设置state}
## 这通常被称为自顶向下或单向数据流。
这就是为什么状态通常被称为局部或封装。 除了拥有并设置它的组件外，其它组件不可访问。

## 无论是使用函数或是类来声明一个组件，它决不能修改它自己的props。 
但是可以修改自己的state



## 正确地使用状态（state）
1. 使用setState来更新状态；
2. 异步：React 可以将多个setState() 调用合并成一个调用来提高性能。
因为 this.props 和 this.state 可能是异步更新的，你不应该依靠它们的值来计算下一个状态。可以使用函数加参数的形式来解决这个问题；
`
// Wrong
this.setState({
  counter: this.state.counter + this.props.increment,
});
// Correct
this.setState((prevState, props) => ({
  counter: prevState.counter + props.increment
}));
`
3. 状态更新合并：当你调用 setState() 时，React 将你提供的对象合并到当前状态。

# 数据流向 --- 事件把数据上传到父组件
数据自顶向下流动


# 事件
`
但是有一点语法上的不同:
	React事件绑定属性的命名采用驼峰式写法，而不是小写。
	如果采用 JSX 的语法你需要传入一个函数作为事件处理函数，而不是一个字符串(DOM元素的写法)
`
向事件处理程序传递参数：
	`<button onClick={this.preventPop.bind(this, id)}>Delete Row</button>
	preventPop(name, e){    //事件对象e要放在最后
        e.preventDefault();
        alert(name);
    }`
值得注意的是，通过 bind 方式向监听函数传参，在类组件中定义的监听函数，事件对象 e 要排在所传递参数的后面
## 差异
1. 在 React 中另一个不同是你不能使用返回 false 的方式阻止默认行为。你必须明确的使用 preventDefault。
2. 在这里，e 是一个合成事件。

# 组件

当React遇到的元素是用户自定义的组件，它会将JSX属性作为单个对象传递给该组件,这个对象称之为“props”。

## 组合组件： 复用，或者再次分隔。但是函数复用不就可以了吗

##　提取组件

## 所有的React组件必须像纯函数那样使用它们的props。


## 纯函数

纯函数是指不依赖于且不改变它作用域之外的变量状态的函数。 也就是说，纯函数的返回值只由它调用时的参数决定，它的执行不依赖于系统的状态（比如：何时、何处调用它——译者注）。 纯函数是函数式编程的一个基础。

也就是传给的值，只可用，引用位置的值不可更改。