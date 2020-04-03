---
title: 链表的js描述
date: 2018-6-6
tags:
  - JS
  - 链表
categories:
  - [JS, 链表]
---

## 链表

链表是一种物理存储单元上**非连续、非顺序的存储结构**，数据元素的逻辑顺序是通过链表中的指针链接次序实现的。

**链表是由一组节点组成的集合，每个几点都适用一个对象的引用指向它的后继，指向另一个节点的引用叫做链**。

数组元素依靠他们的**位置进行引用**，链表元素则是靠相互之间的关系进行引用。

遍历链表就是从链表的首元素一直走到尾元素（但这不包含元素的头节点，因为头节点通常用来作为链表的接入点）。

```js
function Node(element) {
  //用来保存相互之间的关系
  this.element = element;
  this.next = null;
}

function LList() {
  //定义一个链表，并定义他们的方法
  this.head = new Node('head');
  this.find = find;
  this.insert = insert;
  this.display = display;
  this.findPrevious = findPrevious;
  this.remove = remove;
}

function remove(item) {
  var prevNode = this.findPrevious(item);
  if (!(prevNode.next == null)) {
    prevNode.next = prevNode.next.next;
  }
}

function findPrevious(item) {
  var currNode = this.head;
  while (!(currNode.next == null) && currNode.next.element != item) {
    currNode = currNode.next;
  }
  return currNode;
}

function display() {
  var currNode = this.head;
  while (!(currNode.next == null)) {
    console.log(currNode.next.element);
    currNode = currNode.next;
  }
}

function find(item) {
  var currNode = this.head;
  while (currNode.element != item) {
    currNode = currNode.next;
  }
  return currNode;
}

function insert(newElement, item) {
  var newNode = new Node(newElement);
  var current = this.find(item);
  newNode.next = current.next;
  current.next = newNode;
}

var cities = new LList();
cities.insert('Conway', 'head');
cities.insert('Russellville', 'Conway');
cities.insert('Carlisle', 'Russellville');
cities.insert('Alma', 'Carlisle');
cities.display();
console.log(cities);
cities.remove('Carlisle');
cities.display();
```

### 优缺点

优点：相对于传统的数组，向链表中插入和移除元素，都不要移动其他任何元素。

缺点：要想访问链表中间的一个元素，需要从 (表头)开始迭代列表直到找到 所需的元素。

## 如何判断链表是否有环

**使用追赶的方法**，设定两个指针 show，fast,从头节点开始，每次分别前进 1 步，2 步，**如存在环则两者必然会相遇**，如不存在环，则 fast 遇到 null 退出，并且碰撞点到头节点的距离为环中节点数 n。

### 区别于 js 数组

由于数组在内存中的存储是连续的，所以当在数组的开头或者中间插入元素时，内部都需要去移动其他元素的位置，这个移动元素的成本很高。

链表也是存储有序的元素集合，但不同于数组，链表中的元素在内存中的存放并不是连续的，每个元素有一个存储元素自身的节点和一个指向下一个元素引用（也称为指针）的节点组成。

### 顺序存储结构

在计算机中用一组地址连续的存储单元依次存储线性表的各个数据元素,称作线性表的顺序存储结构。
多数高级语言的「数组」使用「顺序存储结构」，不过早期的 javascript 引擎用了「链式存储结构」。Chrome 的 V8 的数组使用了「顺序存储结构」与「链式存储结构」混合模式；大多数情况下，V8 下的数组是「顺序存储结构」，所以我们就假装 V8 的数组使用的是「顺序存储结构」吧！

### 使用场景

**「链表」在一些情况下能有效提升代码的性能，特别是在 H5 游戏的过程中。**
假设有一个业务需要高频率地向一张「线性表科普」插入或删除节点。通常笔者会用数组表示「线性表」，因为 javascript 的数组有一系列成熟好用的 APIs （如：unshift / push / shift / pop / splice 等）可以完成插入与删除节点的操作。但是数组（顺序存储结构）的 unshift & shift & splice 的算法时间复杂度是 O(n) ，这情况可能「链表」是更好的选择。
对于短的「线性表」来说，使用数组更快一些，因为 V8 的数组性能相当高，笔者认为小于 200 的「线性表」都可以直接使用数组。

### 单链表

单链表的优势：插入节点或链表片段的算法时间复杂度为 O(2)；删除节点或链表片段的算法时间复杂度为 O(1)

### 双向链表

双向链表插入节点或链表的算法时间复杂度为 O(4)，删除节点或链表片段的算法时间复杂度为 O(2)。

双向链表的结构如下：

- 节点指针 ——「前驱」与「后继」
- 链表指针 —— 「头指针」、「尾指针」和「游标指针」
