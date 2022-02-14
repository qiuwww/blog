---
title: MVC 架构
date: 2016-2-2
tags:
  - 设计模式
  - MVC架构
categories:
  - [设计模式, MVC架构]
---

模型层（model）、视图层（view）、控制层（controller）

- Model：即数据模型，用来包装和应用程序的业务逻辑相关的数据或者对数据进行处理，模型可以直接访问数据。
- View：视图用来有目的显示数据，在视图中一般没有程序上的逻辑，为了实现视图上的最新功能，视图需要访问它监视的数据模型。
- Controller：控制器调控模型和视图的联系，它控制应用程序的流程，处理事件并作出响应，事件不仅仅包括用户的行为还有数据模型上的改变。通过捕获用户事件，通知模型层作出相应的更新处理，同时将模型层的更新和改变通知给视图，使得视图作出相应改变。因此控制器保证了视图和模型的一致性。

![MVC](../imgs/MVC.png)

Model(模型)：负责从数据库中取数据
View(视图)：负责展示数据的地方
Controller(控制器)：用户交互的地方，例如点击事件等等
思想：**Controller 将 Model 的数据展示在 View 上**

## 前端 MVC

react: MV+
vue: MVVM
angular: MVVM

## 后端 MVC

express 和 koa

### 前端 MVC 中各部分的职责

![前端MVC各部分的职责](imgs\前端MVC各部分的职责.png)

**Controller**作为 Model 和 View 的粘合剂，Controller 将 View 方面的请求转发给合适的 Model，在必要时也会去更新 View。而 Controller 本身也可以作为 Model 的观察者，获取 Model 的变更。而作为 Controller 本身，就不应该有涉及到页面元素的代码了。

## MVVM

VM：也就是 View-Model，做了两件事达到了数据的双向绑定：

1. 一是将【模型】转化成【视图】，即将后端传递的数据转化成所看到的页面。实现的方式是：数据绑定。
2. 二是将【视图】转化成【模型】，即将所看到的页面转化成后端的数据。实现的方式是：DOM 事件监听。

思想：实现了 View 和 Model 的自动同步，也就是当 Model 的属性改变时，我们不用再自己手动操作 Dom 元素，来改变 View 的显示，而是改变属性后该属性对应 View 层显示会自动改变（对应 Vue 数据驱动的思想）
