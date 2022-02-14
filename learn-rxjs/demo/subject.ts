import { Subject } from "rxjs";

const subject = new Subject();

const subscriber1 = subject.subscribe({
  next: (v) => console.log(`observer1: ${v}`)
});
const subscriber2 = subject.subscribe({
  next: (v) => console.log(`observer2: ${v}`)
});

subject.next(1);
// 中途取消订阅
subscriber2.unsubscribe();
subject.next(2);

const subscriber3 = subject.subscribe({
  next: (v) => console.log(`observer3: ${v}`)
});

subject.next(3);