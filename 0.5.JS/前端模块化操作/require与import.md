# require 与 import

## require.context， 用于动态引入文件

```js
require.context(directory, (useSubdirectories = false), (regExp = /^\.\//));

require.context("../", true, /\.stories\.js$/);
// a context with all files in the parent folder and descending folders ending with `.stories.js`.
```

### 使用变量来动态引入文件 path+require

1. 配合 path 获取相应的文件及文件夹路径；
2. 动态引入文件；

```js
const filename = "/first-level.js";
const func = require("./dir" + filename); // => Success
```

### 使用 require.context 来操作

```js
var context = require.context(".", true, /^\.\/dir\/.*\.js$/);
console.log(context.keys());
const filename = "./dir/first-level.js";
console.log(context(filename));
```

### 官方示例

```js
function importAll(r) {
  r.keys().forEach(r);
}

importAll(require.context("../components/", true, /\.js$/));
var cache = {};

function importAll(r) {
  r.keys().forEach(key => (cache[key] = r(key)));
}

importAll(require.context("../components/", true, /\.js$/));
// At build-time cache will be populated with all required modules.
```


https://www.zhihu.com/question/56820346
