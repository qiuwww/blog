/**
 * document.referrer
 */
// document.referrer保存跳转到当前页面的url.js，很有用啊，用于页面的倒退操作。
document.referrer; // 可以直接被读取

/**
 * document.title
 */

// 设置显示的标题，修改<title>title</title>内部的内容
// 这里有时候会出现title没法修改的问题，这个时候就不要填写<title>title</title>，直接设置

document.title = 123;
