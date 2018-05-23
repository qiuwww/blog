

详细介绍react，
1、方向绑定
2、原生JS集成
3、数据类型
4、问了一些项目情况

处理异步的方式和区别
盒模型，IE盒模型和普通盒模型切换


声明组件的几种方式

函数式定义的无状态组件
```
function HelloComponent(props, /* context */) {
  return <div>Hello {props.name}</div>
}
ReactDOM.render(<HelloComponent name="Sebastian" />, mountNode) 
```
es5原生方式React.createClass定义的组件
```
var InputControlES5 = React.createClass({
    propTypes: {//定义传入props中的属性各种类型
        initialValue: React.PropTypes.string
    },
    defaultProps: { //组件默认的props对象
        initialValue: ''
    },
    // 设置 initial state
    getInitialState: function() {//组件相关的状态对象
        return {
            text: this.props.initialValue || 'placeholder'
        };
    },
    handleChange: function(event) {
        this.setState({ //this represents react component instance
            text: event.target.value
        });
    },
    render: function() {
        return (
            <div>
                Type something:
                <input onChange={this.handleChange} value={this.state.text} />
            </div>
        );
    }
});
InputControlES6.propTypes = {
    initialValue: React.PropTypes.string
};
InputControlES6.defaultProps = {
    initialValue: ''
};
```
es6形式的extends React.Component定义的组件

```
class InputControlES6 extends React.Component {
    constructor(props) {
        super(props);

        // 设置 initial state
        this.state = {
            text: props.initialValue || 'placeholder'
        };

        // ES6 类中函数必须手动绑定
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            text: event.target.value
        });
    }

    render() {
        return (
            <div>
                Type something:
                <input onChange={this.handleChange}
               value={this.state.text} />
            </div>
        );
    }
}
InputControlES6.propTypes = {
    initialValue: React.PropTypes.string
};
InputControlES6.defaultProps = {
    initialValue: ''
};
```


数组去重排序
jQuery 事件绑定  事件委托
CSS外边距合并
全局  局部  块  具体指什么

react  Vue  angular三个js的优缺点   


angular自定义怎么写  
js基本数据类型    
如何声明一个类
css样式，盒子模型

js中的类；css盒模型，外边距重叠；react的特点；问了我一个项目的详细需求，和解决方案

安骑士前端客户面试标准：
我面的时候，着重考察了 JavaScript 的能力，一个是 框架经验，一个是 js 的理论基础。

两个方面，如果基本平衡，可以通过。如果某一方面特别弱，但是另外一方面比较突出，也可以过。

现在还有一个问题，就是有部分候选人；话都说不清楚。让同学介绍一下自己，分享一下某个项目经验； 
两句话就说完了。
