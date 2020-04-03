import './rxjs.js';

// callback
function ajax(url, callback, callback2 = () => {}, method = 'GET') {
  let httpRequest = {};
  if (window.XMLHttpRequest) {
    // Mozilla, Safari, IE7+ ...
    httpRequest = new XMLHttpRequest();
  } else if (window.ActiveXObject) {
    // IE 6 and older
    httpRequest = new ActiveXObject('Microsoft.XMLHTTP');
  }
  httpRequest.open(method, url, true);
  httpRequest.setRequestHeader('Content-Type', 'application/json');
  httpRequest.onreadystatechange = function() {
    // Process the server response here.
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      if (httpRequest.status === 200) {
        var response = JSON.parse(httpRequest.responseText);
        // alert(response.computedString);
        callback(response);
      } else {
        // alert("There was a problem with the request.");
        callback2(httpRequest);
      }
    }
  };
  httpRequest.send();
}

ajax('http://localhost:3000/api/name', function(res) {
  console.log('name:', 1, res);
  ajax('http://localhost:3000/api/age?name=' + res.name, function(_res) {
    console.log('age:', 2, _res);
  });
});

// promise
let promiseAjax = function(url, method) {
  return new Promise((resolve, reject) => {
    ajax(
      url,
      function(res) {
        resolve(res);
      },
      function(e) {
        reject(e);
      },
      method,
    );
  });
};

// 测试错误的情况
let response = promiseAjax('http://localhost:3000/api/name');

response
  .then(
    // resolve
    res1 => {
      // resolve
      console.log('promiseAjax', 3, res1);
      promiseAjax('http://localhost:3000/api/age?name=' + res1.name).then(res2 => {
        console.log('promiseAjax', 4, res2);
      });
      return 'heheda';
    },
    // reject
    e => {
      debugger;
      throw new Error('operation failed');
    },
  )
  .catch(msg => {
    debugger;
    // 错误处理
    throw new Error(msg);
  })
  .catch(err => {
    debugger;
    console.log(err);
  })
  .then(res3 => {
    console.log('promiseAjax', 5, res3);
  })
  .then(
    res => {
      // debugger
    },
    err => {
      // debugger
    },
  );

// Generators/ yield
function* gen() {
  // 类似于生成器前面的*号
  let r1 = yield promiseAjax('http://localhost:3000/api/name');
  yield promiseAjax('http://localhost:3000/api/age?name=' + r1.name);
}
let it = gen();
let result1 = it.next();
console.log('result1', result1);

result1.value.then(res1 => {
  console.log('Generators:', 6, res1);
  it.next(res1).value.then(res2 => {
    console.log('Generators:', 7, res2);
  });
});

// async...await

// async/await 函数的实现，就是将 Generator 函数和自动执行器，包装在一个函数里。
// async/await可以说是异步终极解决方案了。
async function asyncFunc() {
  // try{
  // } catch(e) {
  // }
  let nameRes = await promiseAjax('http://localhost:3000/api/name');
  console.log('async', 8, nameRes);
  let ageRes = await promiseAjax('http://localhost:3000/api/age?name=' + nameRes.name);
  console.log('async', 9, ageRes);
}
asyncFunc();
