

## require.context， 用于动态引入文件

```
require.context(directory, useSubdirectories = false, regExp = /^\.\//)

require.context("../", true, /\.stories\.js$/);
// a context with all files in the parent folder and descending folders ending with `.stories.js`.

```


### 使用变量来动态引入文件path+require

1. 配合path获取相应的文件及文件夹路径；
2. 动态引入文件；
```
const filename = '/first-level.js';
const func = require('./dir' + filename); // => Success
```

### 使用require.context来操作

```
var context = require.context('.', true, /^\.\/dir\/.*\.js$/);
console.log(context.keys());
const filename = './dir/first-level.js';
console.log(context(filename));
```


### 官方示例

```
function importAll (r) {
  r.keys().forEach(r);
}

importAll(require.context('../components/', true, /\.js$/));
var cache = {};

function importAll (r) {
  r.keys().forEach(key => cache[key] = r(key));
}

importAll(require.context('../components/', true, /\.js$/));
// At build-time cache will be populated with all required modules.
```
