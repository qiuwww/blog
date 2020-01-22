# requestAnimationFrame

[requestAnimationFrame](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame)

```js
// 范例
var start = null;
var element = document.getElementById('SomeElementYouWantToAnimate');
element.style.position = 'absolute';

function step(timestamp) {
  if (!start) start = timestamp;
  var progress = timestamp - start;
  element.style.left = Math.min(progress / 10, 200) + 'px';
  if (progress < 2000) {
    window.requestAnimationFrame(step);
  }
}

window.requestAnimationFrame(step);
```

## requestAnimationFrame 实现类似 setInterval 的计时器

本质上 requestAnimationFrame 与 setInterval 都属于微任务，都需要在当前 event loop 结束的时候，全部执行（执行所有微任务）。

```js
function setInterval2(cb, delay, ...args) {
  // 记录所有正在运行的 interval 用于撤销
  let pool = window[Symbol.for('IntervalPool')];
  if (!pool) {
    pool = {};
    window[Symbol.for('IntervalPool')] = pool;
  }

  // interval 最低 10ms，虽然每 frame 至少得 16ms
  delay = delay >= 10 ? delay : 10;
  // interval id
  let ticket = Date.now();
  // 每次 interval 开始时间
  let startTime = ticket;
  pool[ticket] = true;
  loop();
  return ticket;

  function loop() {
    if (!pool[ticket]) {
      return;
    }
    const now = Date.now();
    if (now - startTime >= delay) {
      startTime = now;
      cb(...args);
    }
    requestAnimationFrame(loop);
  }
}

function clearInterval2(ticket) {
  let pool = window[Symbol.for('IntervalPool')];
  if (pool && pool[ticket]) {
    delete pool[ticket];
  }
}
```
