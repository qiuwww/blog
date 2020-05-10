# 代码平台 js 的输入输出

[牛客网 js 单行多行输入输出](https://blog.csdn.net/jifubu6013/article/details/79692834)

[牛客网 javascript 编程的输入输出](https://blog.csdn.net/diligentkong/article/details/78037015)

[牛客网在线判题系统使用帮助](https://www.nowcoder.com/discuss/276)

## js 标准输入输出

这里得到的结果可都是字符串呀。

JavaScript(V8)

```js
// 单行
while ((line = readline())) {
  var lines = line.split(' ');
  var a = parseInt(lines[0]);
  var b = parseInt(lines[1]);
  print(a + b);
}
// 多行

var inputArr = [];
var line = '';
while ((line = readline())) {
  inputArr.push(line.split(' '));
}
```

JavaScript(Node)

```js
// 单行
var readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
rl.on('line', function (line) {
  var tokens = line.split(' ');
  console.log(parseInt(tokens[0]) + parseInt(tokens[1]));
});

// 多行
var readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
let lines = [];
rl.on('line', (line) => {
  lines.push(line);
  if (lines.length === 2) {
  }
});
```

## 这里是一个多行输入的例子，输出也要多行的

[用户喜好](https://www.nowcoder.com/questionTerminal/e9d0a72fb08044efb8263946f405ec4b)

```js
let print = (_favo, _queryLRK) => {
  for (let i = 0; i < _queryLRK.length; i++) {
    let [l, r, k] = _queryLRK[i];
    let fk = _favo[k];
    let count = 0;
    if (fk === undefined) {
      console.log(0);
    } else {
      for (let j = 0; j < fk.length; j++) {
        if (l <= fk[j] && fk[j] <= r) {
          count++;
        }
      }
      console.log(count);
    }
  }
};

let readline = require('readline');
let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
let n;
let count = 0;
let favo = {};
let q;
let queryLRK = [];
rl.on('line', (line) => {
  let tokens = line.split(' ');
  if (count === 0) {
    n = parseInt(tokens[0]);
  } else if (count === 1) {
    for (let i = 0; i < n; i++) {
      if (favo[tokens[i]] === undefined) {
        favo[tokens[i]] = [];
      }
      favo[tokens[i]].push(i + 1);
    }
  } else if (count === 2) {
    q = parseInt(tokens[0]);
  } else {
    queryLRK.push(tokens);
    q--;
    if (q === 0) {
      print(favo, queryLRK);
      rl.close();
    }
  }
  count < 3 && count++;
});
```

### 多行输入的问题

#### 使用 readline 来输入输出

```js
let readline = require('readline');
let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
// 标记读取的行数
let lines = [];
rl.on('line', (line) => {
  // 1.单行输入直接运行
  // 2.多行输入，可以将获取的数据保存到数组，然后判断数组的长度，查看是否输入结束
  // 将输入放到新建的空数组中
  lines.push(line);
  //判断，如果输入的行数等于某一值时
  if (lines.length === 2) {
    //通过数组索引分别得到数组中每一行的数据，并做相应操作
    const num1 = lines[0].split(' ').sort(function (a, b) {
      return b - a;
    });
    const num2 = lines[1];
    // console.log(num1);
    // console.log(num2);
    console.log(num1[num2 - 1]);
  }
});
```

#### 使用标准输入输出来操作

```js
// 单行及多行的输入
process.stdin.resume();
process.stdin.setEncoding('ascii');
var lines = [];
process.stdin.on('data', function (data) {
  lines.push(data);
});
process.stdin.on('end', function () {
  console.log(lines);
});
```

### 输出就是用 console.log 就可以了

```js
// var lines = ['3 1', '6 5 1'];
// var lines = ['4, 1', '13 12 2 13'];
var lines = ['3 3', '2 3 1'];

var line1 = lines[0].split(' ');
var room_num = line1[0];
var stop_index = line1[1] - 1;
var nums_arr = lines[1].split(' ');
var nums_len = nums_arr.length;
var min = Infinity,
  min_index,
  dif;
console.log('### line', line1, nums_arr);

for (let i = 0; i < nums_len; i++) {
  if (~~nums_arr[i] < min) {
    min = ~~nums_arr[i];
    min_index = i;
  }
}
console.log('### min', min, min_index);

for (let j = 0; j < nums_len; j++) {
  if (stop_index < j && j < min_index) {
    console.log('range', j);
    nums_arr[j] -= min;
    nums_arr[min_index] = ~~nums_arr[min_index] + min;
  } else if (stop_index >= j || j > min_index) {
    dif = min + 1;
    if (stop_index === min_index) {
      dif = min;
    }
    nums_arr[j] -= dif;
    nums_arr[min_index] = ~~nums_arr[min_index] + dif;
  }
}
console.log(nums_arr.join(' '));
```
