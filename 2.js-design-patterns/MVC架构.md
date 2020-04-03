# MVC 架构

模型层（model）、视图层（view）、控制层（controller）

- Model：即数据模型，用来包装和应用程序的业务逻辑相关的数据或者对数据进行处理，模型可以直接访问数据。
- View：视图用来有目的显示数据，在视图中一般没有程序上的逻辑，为了实现视图上的最新功能，视图需要访问它监视的数据模型。
- Controller：控制器调控模型和视图的联系，它控制应用程序的流程，处理事件并作出响应，事件不仅仅包括用户的行为还有数据模型上的改变。通过捕获用户事件，通知模型层作出相应的更新处理，同时将模型层的更新和改变通知给视图，使得视图作出相应改变。因此控制器保证了视图和模型的一致性。

![MVC](../imgs/MVC.png)

## 前端 MVC

react: MV+
vue: MVVM
angular: MVVM

## 后端 MVC

express 和 koa

### 前端 MVC 中各部分的职责

![前端MVC各部分的职责](imgs\前端MVC各部分的职责.png)

**Controller**作为 Model 和 View 的粘合剂，Controller 将 View 方面的请求转发给合适的 Model，在必要时也会去更新 View。而 Controller 本身也可以作为 Model 的观察者，获取 Model 的变更。而作为 Controller 本身，就不应该有涉及到页面元素的代码了。
