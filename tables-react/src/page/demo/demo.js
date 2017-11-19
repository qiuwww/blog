

// demo 1
// import React, {Component} from 'react';
// import * as mobx from 'mobx';
// import {observer, Provider, inject} from 'mobx-react';
// import {observable, action} from 'mobx';
// import ReactDOM from 'react-dom';

// // 定义状态并使其可观察
// var appState = observable({
//     timer: 0
// });

// // 创建视图以响应状态的变化
// @observer
// class TimerView extends React.Component {
//     render() {
//         return (<button onClick={this.onReset.bind(this)}>
//                 Seconds passed: {this.props.appState.timer}
//             </button>);
//     }

//     onReset () {
//         this.props.appState.resetTimer();
//     }
// };


// // 更改状态
// // 下面的代码每秒都会修改你的数据，而当需要的时候UI会自动更新。 无论是在改变状态的控制器函数中，还是在应该更新的视图中，都没有明确的关系定义。 
// // 使用 observable 来装饰你的状态和视图，这足以让 MobX检测所有关系了。
// appState.resetTimer = action(function reset() {
//     appState.timer = 0;
// });

// setInterval(action(function tick() {
//     appState.timer += 1;
// }), 1000);


// ReactDOM.render(<TimerView appState={appState} />, document.getElementById('root'));



// demo 2
import React from 'react'
import ReactDOM from 'react-dom'

// import {observable} from "mobx"

// import {observer} from "mobx-react"

// @observer class Select extends React.Component {

//   @observable selection = null; /* MobX managed instance state */

//   constructor(props, context) {

//     super(props, context)

//     this.selection = props.values[0]

//   }

//   render() {

//     return (

//       <ul onKeyDown={this.onKeyDown} tabIndex={0}>

//         {this.props.values.map(value =>

//           <li

//             className={value === this.selection ? 'selected' : ''}

//             key={value}

//             onClick={() => this.onSelect(value)}

//           >

//             {value}

//           </li> 

//         )}  

//       </ul>

//     )

//   }

//   onSelect(value) {

//     this.selection = value

//     this.fireOnSelect()

//   }

//   onKeyDown = (e) => {

//     const {values} = this.props

//     const idx = values.indexOf(this.selection)

//     if (e.keyCode === 38 && idx > 0) { /* up */

//       this.selection = values[idx - 1]

//     } else if (e.keyCode === 40 && idx < values.length -1) { /* down */

//       this.selection = values[idx + 1]

//     }

//     this.fireOnSelect()

//   }

//   fireOnSelect() {

//     if (typeof this.props.onSelect === "function")

//       this.props.onSelect(this.selection) /* solved! */

//   }

// }

// ReactDOM.render(

//   <Select 

//     values={["State.", "Should.", "Be.", "Synchronous."]} 

//     onSelect={value => console.log(value)}

//   />,

//   document.getElementById("root")

// )



function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(
    element,
    document.getElementById('root')
  );
}

setInterval(tick, 1000);