# 对比document的query方法和getElementByTagName之类的方法

## 异同

### 差异的地方

- 得到的元素结果不一样，query得到的是NodeList,get*方法得到的是HTMLCollection。
- query选择符选出来的元素及元素数组是静态的，而getElement这种方法选出的元素是动态的。静态的就是说选出的所有元素的数组，不会随着文档操作而改变。
- 在使用的时候getElement这种方法性能比较好，query选择符则比较方便。
