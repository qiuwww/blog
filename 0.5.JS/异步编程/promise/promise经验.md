promise 对象的操作

promise的pending状态可以转为fulfill（成功状态）和reject（拒绝状态），这个时候如果继续返回拿到的res对象，就可以继续处理pending，也就是then是可以连续操作，同样catch的时候，拿到的是reject的返回，如果继续返回e，就可以继续catch操作，与then操作一致，不过then方法不能再处理/。
