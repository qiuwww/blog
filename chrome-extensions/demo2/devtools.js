// 创建自定义面板，同一个插件可以创建多个自定义面板
// 几个参数依次为：panel标题、图标（其实设置了也没地方显示）、要加载的页面、加载成功后的回调

// 这里为什么只能在background.html内看到？
// => 修改了devtools页面的代码时，需要先在 chrome://extensions 页面按下Ctrl+R重新加载插件，然后关闭再打开开发者工具即可，无需刷新页面（而且只刷新页面不刷新开发者工具的话是不会生效的）。
chrome.devtools.panels.create('MyPanel', 'img/icon.png', 'mypanel.html', function (panel) {
  console.log('自定义面板创建成功！'); // 注意这个log一般看不到
});

// 创建自定义侧边栏
chrome.devtools.panels.elements.createSidebarPane('Images', function (sidebar) {
  // sidebar.setPage('../sidebar.html'); // 指定加载某个页面
  sidebar.setExpression('document.querySelectorAll("img")', 'All Images'); // 通过表达式来指定
  //sidebar.setObject({aaa: 111, bbb: 'Hello World!'}); // 直接设置显示某个对象
});
