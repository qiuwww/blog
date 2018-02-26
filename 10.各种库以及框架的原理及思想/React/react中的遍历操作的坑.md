
react中的遍历操作的时候需要key是可变的，不要使用index当做key


设置key与 new Date().getTime() 相关就是每次强制刷新， 因为每次的key肯定不一致

new Date().toString() 的差异的时间最小是1000ms

这里还不能使用Symbol类型，因为key需要一个字符串，生成的Symbol转为字符串失去了本身存在的意义