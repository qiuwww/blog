## 在express框架中的router匹配，应该是从后向前来匹配路由
```
本次的问题主要就是，本来是想路由到/api/user/singin   结果被/user截断，导致找不到路径。
```
```
在express中，注意.use方法的先后顺序，非常的重要。