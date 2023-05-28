---
title: 链表是否有环
date: 2018-6-6
tags:
  - JS
  - 链表
  - 链表是否有环
categories:
  - [算法, 链表是否有环]
---

[TOC]

## 问题描述

判断单链表是否有环

## 分析问题

我们就可以设置一个**慢指针和一个快指针**来遍历这个链表。慢指针一次移动一个节点，而快指针一次移动两个节点，如果该链表没有环，则快指针会先遍历完这个表，如果有环，则快指针会在第二次遍历时和慢指针相遇。

## js 代码实现

```js
// 节点
function Node(val) {
  // 用来保存相互之间的关系
  this.val = val;
  this.next = null;
}
// 链表
function LList() {
  // 定义一个链表，并定义他们的方法
  this.head = new Node('head');
  this.insert = insert;
  this.find = find;
}
// 链表的方法，插入方法，
// newNode 新的节点
// item 上一个节点
// item left right
function insert(item, left, right) {
  // 这里每次都新生成一个节点，所以没法形成闭环，这里可以现检查是否存在
  var newNode = new Node(item);
  var leftNode = this.find(left),
    rightNode;
  if (right) {
    rightNode = this.find(right);
    newNode.next = rightNode;
  } else {
    // 把newNode插入到item后面
    newNode.next = leftNode.next;
  }
  // item在链表中的信息
  leftNode.next = newNode;
}

// 通过val查找item，通过while循环，从头开始查找
function find(item) {
  var currNode = this.head;
  while (currNode.val != item) {
    currNode = currNode.next;
  }
  return currNode;
}

function entryNodeOfLoop(cities) {
  var pHead = cities.find('head');
  if (pHead === null) return null;
  // 快慢指针从链表的头部开始
  var fast = pHead;
  var slow = pHead;

  while (slow.next !== null && fast.next.next !== null) {
    // 快指针每次走两步；慢指针每次走一步
    // 这里是关键
    slow = slow.next;
    fast = fast.next.next;
    // 快慢指针相遇时，跳出while循环，直接函数返回真
    if (slow === fast) return true;
    // break;
  }
  // 快指针已经到了链表尾部了还没和慢指针相遇，说明没有环
  if (fast === null || fast.next === null) return false;

  // 后续会处理有环的情况...
}

// test
var cities = new LList();
// item left right
cities.insert('shanghai', 'head');
cities.insert('beijing', 'shanghai');
cities.insert('hangzhou', 'beijing');
cities.insert('shenzhen', 'hangzhou');
// 这里就形成了一个闭环
cities.insert('guangzhou', 'shenzhen', 'hangzhou');

console.log('cities:', cities);
// 计算是否存在闭环
console.log('entryNodeOfLoop1:', entryNodeOfLoop(cities));
```

## 参考文章

[JavaScript 判断单链表中是否存在环](https://blog.csdn.net/AS_Tammy/article/details/88357687)
