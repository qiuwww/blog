# learn.md

# mobx
`用于创建store来保存变量`


## mobx-react
`在react组件中使用mobx`

@observable: 使用此标签监控要检测的数据；
@observer: 使用此标签监控当数据变化是要更新的Component（组件类）
@action(动作):使用此标签监控数据改变的自定义方法(当在需要数据改变的时候执行此自定义方法，那么View层也会跟着自动变化，默认此View层已经使用@observer标签监控)， 用于初始化数据;


任何应用都有动作。动作是任何用来修改状态的东西。 使用MobX你可以在代码中显式地标记出动作所在的位置。 动作可以有助于更好的组织代码。

http://cn.mobx.js.org/refguide/action.html
action 装饰器/函数遵循 javascript 中标准的绑定规则。 

但是，Mobx 3引入了 action.bound 来自动地将动作绑定到目标对象。 注意，与 action 不同的是，(@)action.bound 不需要一个name参数，名称将始终基于动作绑定的属性。

应该永远*只对修改状态的函数使用动作*。 只执行查找，过滤器等函数不应该被标记为动作，以允许 MobX 跟踪它们的调用。

@compute(调节器): 计算值(computed values)是可以根据现有的状态或其它计算值衍生出的值。 概念上来说，它们与excel表格中的公式十分相似。
`它们都是响应式调用的表达式，但是，如果你想响应式的产生一个可以被其它 observer 使用的值，请使用 @computed，如果你不想产生一个新值，而想要达到一个效果，请使用 autorun。 `
` @computed get total() {
        return this.price * this.amount;
    }`

@Provider: is a component that can pass stores (or other stuff) using React's context mechanism to child components. This is useful if you have things that you don't want to pass through multiple layers of components explicitly.

@inject: can be used to pick up those stores. It is a higher order component that takes a list of strings and makes those stores available to the wrapped component.

## 方法
toJS ： toJS(value, supportCycles = true)
`
递归地将一个(observable)对象转换为 javascript 结构。 支持 observable 数组、对象、映射和原始类型。计算值和其他不可枚举的属性不会成为结果的一部分。 默 
`




# webpack

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

这里似乎使用mobx来管理数据流。

你应该在应用中保持 自上而下的数据流，而不是尝试在不同组件中同步状态。


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
`
主动更新（重新渲染）：
React 元素都是immutable 不可变的。当元素被创建之后，你是无法改变其内容或属性的。一个元素就好像是动画里的一帧，它代表应用界面在某一时间点的样子。
根据我们现阶段了解的有关 React 知识，更新界面的唯一办法是创建一个新的元素，然后将它传入 ReactDOM.render() 方法。

React DOM 首先会比较元素内容先后的不同，而在渲染过程中只会更新改变了的部分。
`

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
5. 组件更新: shouldComponentUpdate(nextProps, nextState): boolean，在组件挂载之后，再接收到新的props或者state时被执行。在初始化时或者使用forceUpdate时不被执行。可以在你确认不需要更新组件时使用。
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


# JSX
`const element = <h1>Hello, world!</h1>;
这种看起来可能有些奇怪的标签语法既不是字符串也不是HTML.
它被称为 JSX, 一种 JavaScript 的语法扩展。 我们推荐在 React 中使用 JSX 来描述用户界面。JSX 乍看起来可能比较像是模版语言，但事实上它完全是在 JavaScript 内部实现的。
JSX 用来声明 React 当中的元素。`
1. 在编译之后呢，JSX 其实会被转化为普通的 JavaScript 对象。
2. 你可以使用引号来定义以字符串||js表达式为值的属性。
`
const element = <div tabIndex="0"></div>;
const element = <img src={user.avatarUrl}></img>;`
3. 如果 JSX 标签是闭合式的，那么你需要在结尾处用 />, 这里的input||img之类的需要在右侧添加/>。
4. 所有的内容在渲染之前都被转换成了字符串。这样可以有效地防止 XSS(跨站脚本) 攻击。
5. Babel 转译器会把 JSX 转换成一个名为 React.createElement() 的方法调用。
6. JSX 只是为 React.createElement(component, props, ...children) 方法提供的语法糖。




# ReactDOM.render() : 在此 div 中的所有内容都将由 React DOM 来管理，所以我们将其称之为 “根” DOM 节点。

# 渲染组件||元素，相当于 compile 
## 阻止组件渲染（正常情况下返回一段jsx语句正常渲染）
`
在极少数情况下，你可能希望隐藏组件，即使它被其他组件渲染。让 render 方法返回 null 而不是它的渲染结果即可实现。
`
## 列表 & Keys
1. 基础列表组件
`
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li key={number.toString()>{number}</li>
  );
  return (
    <ul>{listItems}</ul>
  );
}`

2. keys
Keys可以在DOM中的某些元素被增加或删除的时候帮助React识别哪些元素发生了变化。因此你应当给数组中的每一个元素赋予一个确定的标识。

## 受控组件
`HTML表单元素与React中的其他DOM元素有所不同,因为表单元素生来就保留一些内部状态。`
在HTML当中，像<input>,<textarea>, 和 <select>这类表单元素会维持自身状态，并根据用户输入进行更新。但在React中，可变的状态通常保存在组件的状态属性中，并且只能用 setState()， 方法进行更新。

使用”受控组件”,每个状态的改变都有一个与之相关的处理函数。这样就可以直接修改或验证用户输入。

# 状态提升
`
使用 react 经常会遇到几个组件需要共用状态数据的情况。这种情况下，我们最好将这部分共享的状态提升至他们最近的父组件当中进行管理。
`

# 组合 vs 继承
React 具有强大的组合模型，我们建议使用组合而不是继承来复用组件之间的代码。

# react理念
1. 组件单一功能原则：
在理想状况下，一个组件应该只做一件事情。如果这个组件功能不断丰富，它应该被分成更小的组件。
2. 定义 UI 状态的最小(但完整)表示。
3. 确定你的 State 应该位于哪里。


# 添加反向数据流
事件回调， 事件来自于父组件，这样就可以改变传递过来的props属性值


# React 会将小写开头的标签名认为是 HTML 原生标签

# 扩展属性（多属性父组件传递给子组件）
如果你已经有了个 props 对象，并且想在 JSX 中传递它，你可以使用 ... 作为扩展操作符来传递整个属性对象。
`
function App1() {
  return <Greeting firstName="Ben" lastName="Hector" />;
}

function App2() {
  const props = {firstName: 'Ben', lastName: 'Hector'};
  return <Greeting {...props} />;
}`

# props.children: 在包含开始和结束标签的 JSX 表达式中，标记之间的内容作为特殊的参数传递：props.children。


# 数据验证： 使用 PropTypes 进行类型检查，PropTypes 包含一整套验证器，可用于确保你接收的数据是有效的。

# Refs & DOM
在典型的 React 数据流中, 属性（props）是父组件与子代交互的唯一方式。要修改子组件，你需要通用新的 props 重新渲染它。但是，*某些情况下你需要在典型数据流外强制修改子代*。要修改的子代可以是 React 组件实例，也可以是 DOM 元素。对于这两种情况，React 提供了解决办法。
## 何时使用 Refs
下面是几个适合使用 refs 的情况：
1. 处理焦点、文本选择或媒体控制。
2. 触发强制动画。
3. 集成第三方 DOM 库

## 为 DOM 元素添加 Ref
React 支持给任意组件添加特殊属性。ref 属性接受一个回调函数，它在组件被加载或卸载时会立即执行。

`
function CustomTextInput(props) {
  // 这里必须声明 textInput，这样 ref 回调才可以引用它
  let textInput = null;

  function handleClick() {
    textInput.focus();
  }

  return (
    <div>
      <input
        type="text"
        ref={(input) => { textInput = input; }} />

      <input
        type="button"
        value="Focus the text input"
        onClick={handleClick}
      />
    </div>
  );  
}`

## 对父组件暴露 DOM 节点

# 非受控组件 -- 为组建指定默认值（defaultValue），在挂载之前就生效（在constructor之后，component.DidMount之前）

在 React 的生命周期中，表单元素上的 value 属性将会覆盖 DOM 中的值。使用非受控组件时，通常你希望 React 可以为其指定初始值，但不再控制后续更新。要解决这个问题，你可以指定一个 defaultValue 属性而不是 value。

# context

在有些场景中，你不想要向下每层都手动地传递你需要的 props. 这就需要强大的 context API了。
如果你对状态管理库如Redux或Mobx不太熟悉，那就别用context了。在很多实际应用中，这些库及其React绑定是管理与许多组件相关的state的不错选择。Redux可能是你更好的选择，而不是context。

# portal: Portals 提供了一种很好的将子节点渲染到父组件以外的 DOM 节点的方式。
对于 portal 的一个典型用例是当父组件有 overflow: hidden 或 z-index 样式，但你需要子组件能够在视觉上“跳出（break out）”其容器。例如，对话框、hovercards以及提示框


# Web Components
React 和 web组件 被用以解决不同问题。Web组件为可重用组件提供了强大的封装能力，而React则是提供了保持DOM和数据同步的声明式库。二者目标互补。作为开发者，你可以随意地在Web组件里使用React，或者在React里使用Web组件，或都有。

# 高阶组件：具体而言，高阶组件就是一个函数，且该函数接受一个组件作为参数，并返回一个新的组件

高阶组件（HOC）是react中对组件逻辑进行重用的高级技术。但高阶组件本身并不是React API。它只是一种模式，这种模式是由react自身的组合性质必然产生的。

对比组件将props属性转变成UI，高阶组件则是将一个组件转换成另一个新组件。
`
const EnhancedComponent = higherOrderComponent(WrappedComponent);
`

# 与其他类库混合使用

最简单的方式就是阻止 React 更新外部在操作的节点，那么你可以通过生成一个 React 根本不会去更新的元素来实现，比如空的 <div />。

# e.target与e.currentTarget

e.target: 表示当前鼠标指向的元素
e.currentTarget: 表示当前绑定事件的目标元素 

# 标签元素引用
`
this.refs.getPosition.mouseWheel(this.state.indexs);

},

render : function() {
return <div onWheel={this.handleWheel} className="main">
        <Nav ref="getPosition"  indexs={this.state.indexs}></Nav>
    </div>
}
`


## Provider模式

react-mobx与react-redux 提供Provide模式，用于传递上下文环境，当然也可是使用prop来船度 

所幸，React提供了一种自上而下传递数据的途径： context。我们可以把它看做组件树的一个全局变量。

在app的最外部，我们可以提供一个Provider，它的唯一角色就是给当前的组件树的context增加数据，来提供给所有的子节点使用。