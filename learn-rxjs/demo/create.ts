import { Observable } from "rxjs";

function getData() {

  let persons = [
    { name: 'Dave', age: 34, salary: 2000 },
    { name: 'Nick', age: 37, salary: 32000 },
    { name: 'Howie', age: 40, salary: 26000 },
    { name: 'Brian', age: 40, salary: 30000 },
    { name: 'Kevin', age: 47, salary: 24000 },
  ];

  // 这里的create，只会接受一个函数作为参数，表明当前Observable的构成
  return Observable.create(
    observer => { // 这部分就是subscribe function
      // 在这里面, observer使用next方法对person进行推送. 当循环结束的时候, 使用complete()方法通知Observable流结束了。
      persons.forEach(p => observer.next(p.name)); // 依次传递当前的对象
      // 添加一个奇怪的数据，在最后边的时候会被打印出来
      observer.next(JSON.stringify(persons));
      // 完成，之后进行后续的操作
      observer.complete();
    }
  );
}

let data = getData();

console.log("data: ", data);

data
  .subscribe(
    name => console.log(name),
    err => console.error(err),
    () => console.log("Streaming is over.")
  );
// 多次订阅，执行顺序，是顺次执行
data
  .subscribe(
    name => console.log(name.length),
    err => console.error(err),
    () => console.log("Streaming is over.")
  );

// 尽管getDate里面create了Observable, 但是整个数据流动并不是在这时就开始的.在这个地方, 这只不过是个声明而已.
// 只有当有人去订阅这个Observable的时候, 整个数据流才会流动.