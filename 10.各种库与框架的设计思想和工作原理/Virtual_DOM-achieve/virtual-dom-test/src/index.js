import { createElement, convert2RealDom, renderDom } from "./element";
import diff from "./diff";
import patch from "./patch";
// 框架最高级变量
let MyFrame = {};
const root = document.querySelector("#root");
// 定义状态，对应react中的state，与vue中的data
// 中间变量
let state = {
  list: ["a", "b", "c", "d"]
};

// 数据改变触发事件
Object.defineProperty(MyFrame, "state", {
  enumerable: true,
  configurable: true,
  get: () => {
    return state;
  },
  set: newState => {
    // 每次的新值都是全新的state来混入当前的值
    state = newState;
  }
});

// 定义setState方法
MyFrame.setState = (obj = {}, cb) => {
  let oldValue = JSON.parse(JSON.stringify(MyFrame.state));
  let newValue = Object.assign({}, state, obj);
  MyFrame.state = newValue;
  // 这里进行数据比较，生成新的虚拟dom，然后再渲染到页面中去

  let patches = diff(renderList(oldValue.list), renderList(newValue.list));
  console.log(patches);
  // 给元素打补丁，重新更新视图
  patch(root, patches);
  cb(oldValue, newValue);
};
// 生成虚拟dom节点函数
let renderList = (list = []) =>
  createElement(
    "ul",
    { class: "list" },
    list.map(item => {
      return createElement("li", { class: "item" }, [item]);
    })
  );
let virtualDom = renderList(MyFrame.state.list);

console.log("virtualDom: ", virtualDom);

// 插入到页面内，生成真是dom

let realDom = convert2RealDom(virtualDom);
console.log("realDom: ", realDom);

// 将realDom添加到html中

renderDom(realDom, root);

console.log(`对比虚拟dom与真实dom节点的属性：`);

console.log(`虚拟dom: `, virtualDom);
console.log(`属性值: `, Object.keys(virtualDom));

console.log(`真实的dom节点: `);
console.log("%O", document.querySelector("#root .list"));

// 修改state的值
let i = 1;
setTimeout(() => {
  ++i;
  MyFrame.setState(
    {
      list: [i, "b"]
    },
    (oldValue, newValue) => {
      console.log(oldValue, newValue);
    }
  );
}, 1000);
