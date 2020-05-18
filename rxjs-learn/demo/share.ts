import { interval } from 'rxjs';
import { take, share, shareReplay } from 'rxjs/operators';

const numbers = interval(1000)
  .pipe(take(5))
  .pipe(share()); // 这里如果注释掉之后，Nick也会执行0-4
  // .pipe(shareReplay(2)); // 可以定制在接受哪一步之后的值

function subscribeToNumbers(name) {
  numbers.subscribe(
    x => console.log(`${name}: ${x}`)
  );
}
// 订阅1
subscribeToNumbers('Dave');
// 2.5s后，订阅2
setTimeout(() => subscribeToNumbers('Nick'), 2500);