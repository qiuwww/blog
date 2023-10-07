// 要传入多个参数，可以调用this.callback

module.exports = function (content, map, meta) {
  // console.log('\n\nsyncLoader content:', content);
  // console.log('\n\nsyncLoader map:', map);
  // console.log('\n\nsyncLoader meta:', meta);
  // 在Loader里的this参数，封装了webpack和loader runner的一些方法，允许将Loader执行异步方法，或者读取查询参数。
  // console.log('\n\nsyncLoader this:', this.callback);
  return `${content}`;
};
