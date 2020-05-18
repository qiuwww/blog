// RxJS v6+
import { merge, take } from 'rxjs/operators';
import { interval } from 'rxjs';

// 每2.5秒发出值
const first = interval(2500).pipe(take(5));
// 每1秒发出值
const second = interval(1000).pipe(take(5));
// 作为实例方法使用，按照时序合并
const example = first.pipe(merge(second));
// 输出: 0,1,0,2....
const subscribe = example.subscribe(val => console.log(val));

console.log("merge，这里的结果是一个Subscriber对象的实例：", subscribe);