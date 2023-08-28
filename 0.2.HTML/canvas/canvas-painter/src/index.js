console.log('canvas-painter');

import Painter from './Painter.js';
import Setting from './Setting.js';
import Toolbar from './Toolbar.js';

var painter = new Painter('canvas');
var setting = new Setting('setting', painter);
var toolar = new Toolbar('tool', painter);

painter.init();
setting.onChange();

// painter实例被绑定一个自定义事件switchMode
painter.on('switchMode', (name) => {
  // 切换模式的时候更改, 反向影响到toolbar
  toolar.setMode(name);
});
