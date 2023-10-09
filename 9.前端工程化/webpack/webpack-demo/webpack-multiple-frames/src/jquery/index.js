// import './index2.js';
// console.log(1);
import _ from 'lodash';
// console.log(2);

const $jqueryRoot = $('#app-jquery');

let rootList = [];

function render(list) {
  rootList = list;

  let html = '<h2>jQuery</h2>';

  const li = list.map((item, index) => `<li>${index}</li>`).join('');

  // 注意不能直接拼接jquery对象
  const ol = `<ul>${li}</ul>`;

  html += ol;

  const $input = $('<input>', {
    class: 'input',

    placeholder: 'jquery来改变数据',

    blur: function (e) {
      console.log('用on绑定事件');
      rootList.push(e.target.value);
      render(rootList);

      window.eventEmitter.emit('list', rootList);
    },
  });

  $jqueryRoot.html(html);
  $jqueryRoot.append($input);
}

render(Array.from({ length: 5 }));

window.eventEmitter.on('list', (list) => {
  // some code...
  render(list);
});

// function component() {
//   const element = document.createElement('div');

//   // lodash（目前通过一个 script 引入）对于执行这一行是必需的
//   // lodash 在当前 script 中使用 import 引入
//   element.innerHTML = _.join(['Hello', 'webpack'], ' ');

//   return element;
// }

// document.querySelector('#app-jquery').appendChild(component());
