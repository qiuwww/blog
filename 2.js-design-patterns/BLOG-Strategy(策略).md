---
title: Strategy(策略)
date: 2019-3-6
tags:
  - 设计模式
  - Strategy(策略)
categories:
  - [设计模式, Strategy(策略)]
---

如下：

1. if...else
2. switch
3. 策略模式

```js
// 1
var ifElse = (flag) => {
  if (flag === 'a') {
    // dosomething
    aCallback();
  } else if (flag === 'b') {
    // doshomething
    bCallback();
  } else if (flag === 'c') {
    // doshomething
    cCallback();
  } else {
    // doshomething
    oCallback();
  }
};

// 2
var switchFunc = (flag) => {
  switch (flag) {
    case 'a': {
      aCallback();
      break;
    }
    case 'b': {
      bCallback();
      break;
    }
    case 'c': {
      cCallback();
      break;
    }
    default: {
      oCallback();
    }
  }
}

// 3

var strategyFunc = (flag) =>{
  strategyObj[flag]();
}

var strategyObj = {
  'a': () => {
    aCallback();
  },
  'b': () => {
    aCallback();
  }
  'c': () => {
    aCallback();
  }
  'd': () => {
    oCallback();
  }
}
```
