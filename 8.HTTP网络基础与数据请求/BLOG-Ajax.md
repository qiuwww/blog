
## 发送 Ajax 请求的五个步骤（XMLHttpRequest 的工作原理）

1. 创建`XMLHttpRequest` 对象。
2. 使用`open`方法设置请求的参数。`open(method, url, 是否异步)`。
3. 发送请求。
4. 注册事件。 注册`onreadystatechange`事件，状态改变时就会调用。如果要在数据完整请求回来的时候才调用，我们需要手动写一些判断的逻辑。
5. 获取返回的数据，更新 UI。

## 发送 get 请求和 post 请求

### `get`请求举例

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Document</title>
  </head>
  <body>
    <h1>Ajax 发送 get 请求</h1>
    <input type="button" value="发送get_ajax请求" id="btnAjax" />

    <script type="text/javascript">
      // 绑定点击事件
      document.querySelector('#btnAjax').onclick = function() {
        // 发送ajax 请求 需要 五步

        // （1）创建异步对象
        var ajaxObj = new XMLHttpRequest();

        // （2）设置请求的参数。包括：请求的方法、请求的url。
        ajaxObj.open('get', '02-ajax.php');

        // （3）发送请求
        ajaxObj.send();

        //（4）注册事件。 onreadystatechange事件，状态改变时就会调用。
        //如果要在数据完整请求回来的时候才调用，我们需要手动写一些判断的逻辑。
        ajaxObj.onreadystatechange = function() {
          // 为了保证 数据 完整返回，我们一般会判断 两个值
          if (ajaxObj.readyState == 4 && ajaxObj.status == 200) {
            // 如果能够进到这个判断 说明 数据 完美的回来了,并且请求的页面是存在的
            // 5.在注册的事件中 获取 返回的 内容 并修改页面的显示
            console.log('数据返回成功');

            // 数据是保存在 异步对象的 属性中
            console.log(ajaxObj.responseText);

            // 修改页面的显示
            document.querySelector('h1').innerHTML = ajaxObj.responseText;
          }
        };
      };
    </script>
  </body>
</html>
```

### `post` 请求举例

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Document</title>
  </head>
  <body>
    <h1>Ajax 发送 get 请求</h1>
    <input type="button" value="发送put_ajax请求" id="btnAjax" />
    <script type="text/javascript">
      // 异步对象
      var xhr = new XMLHttpRequest();

      // 设置属性
      xhr.open('post', '02.post.php');

      // 如果想要使用post提交数据,必须添加此行
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

      // 将数据通过send方法传递
      xhr.send('name=fox&age=18');

      // 发送并接受返回值
      xhr.onreadystatechange = function() {
        // 这步为判断服务器是否正确响应
        if (xhr.readyState == 4 && xhr.status == 200) {
          alert(xhr.responseText);
        }
      };
    </script>
  </body>
</html>
```

### 4.3 onreadystatechange 事件

注册 `onreadystatechange` 事件后，每当 `readyState` 属性改变时，就会调用 `onreadystatechange` 函数。

`readyState`：（存有 `XMLHttpRequest` 的状态。从 `0` 到 `4` 发生变化）

- `0`: 请求未初始化
- `1`: 服务器连接已建立
- `2`: 请求已接收
- `3`: 请求处理中
- `4`: 请求已完成，且响应已就绪

### 4.4 事件的触发条件

![事件的触发条件](http://img.smyhvae.com/20180307_1443.png)

### 4.5 事件的触发顺序

![事件的触发顺序](http://img.smyhvae.com/20180307_1445.png)

### 4.6 实际开发中用的 原生 Ajax 请求

```js
var util = {};
//获取 ajax 请求之后的json
util.json = function(options) {
  var opt = {
    url: '',
    type: 'get',
    data: {},
    success: function() {},
    error: function() {},
  };
  util.extend(opt, options);
  if (opt.url) {
    //IE兼容性处理：浏览器特征检查。检查该浏览器是否存在XMLHttpRequest这个api，没有的话，就用IE的api
    var xhr = XMLHttpRequest ? new XMLHttpRequest() : new window.ActiveXObject('Microsoft.XMLHTTP');

    var data = opt.data,
      url = opt.url,
      type = opt.type.toUpperCase();
    dataArr = [];
  }

  for (var key in data) {
    dataArr.push(key + '=' + data[key]);
  }

  if (type === 'GET') {
    url = url + '?' + dataArr.join('&');
    xhr.open(type, url.replace(/\?$/g, ''), true);
    xhr.send();
  }

  if (type === 'POST') {
    xhr.open(type, url, true);
    // 如果想要使用post提交数据,必须添加此行
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send(dataArr.join('&'));
  }

  xhr.onload = function() {
    if (xhr.status === 200 || xhr.status === 304) {
      //304表示：用缓存即可。206表示获取媒体资源的前面一部分
      var res;
      if (opt.success && opt.success instanceof Function) {
        res = xhr.responseText;
        if (typeof res === 'string') {
          res = JSON.parse(res); //将字符串转成json
          opt.success.call(xhr, res);
        }
      }
    } else {
      if (opt.error && opt.error instanceof Function) {
        opt.error.call(xhr, res);
      }
    }
  };
};
```
