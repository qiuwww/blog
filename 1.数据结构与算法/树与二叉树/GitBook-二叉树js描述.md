---
title: 二叉树（二叉搜索树）js描述
date: 2018-6-6
tags:
  - JS
  - 二叉树
categories:
  - [数据结构, 二叉树]
---

[TOC]

## 二叉搜索树

二叉树是一种非线性的数据结构，**以分层的方式存储数据**，**树被用来存储具有层级关系的数据**，其中的一种特殊的树：二叉树。树以边连接的节点组成。公司的组织结构就是一个树的例子。二叉树子节点不能超过两个。

## 二叉搜索树的 JS 描述

```js
function BinaryTree() {
  this.root = null;
  this.insert = insert;
  this.inOrder = inOrder;
  this.preOrder = preOrder;
  this.postOrder = postOrder;
  this.getmin = getmin;
  this.getmax = getmax;
  this.find = find;
  this.remove = remove;
  this.removeNode = removeNode;
  this.getSmallest = getSmallest;
}
// 节点的描述，具有自身属性及左右节点指向标记
function Node(data, left, right) {
  this.data = data;
  this.left = left;
  this.right = right;
  this.show = show;
}

function show() {
  return this.data;
}

function insert(data) {
  // 插入方法
  var n = new Node(data, null, null);
  if (this.root == null) {
    // 是否有根节点
    this.root = n;
  } else {
    // 依据左小右大找到它自己的位置
    var current = this.root;
    var parent;
    // 遍历寻找插入位置
    while (true) {
      parent = current;
      // 小的插在左树
      if (data < current.data) {
        current = current.left;
        if (current == null) {
          parent.left = n;
          break;
        }
      } else {
        current = current.right;
        if (current == null) {
          parent.right = n;
          break;
        }
      }
    }
  }
}

function inOrder(node) {
  // 中序遍历
  if (!(node == null)) {
    inOrder(node.left);
    console.log(node.show() + ' ');
    inOrder(node.right);
  }
}

function preOrder(node) {
  // 前序遍历
  if (!(node == null)) {
    console.log(node.show() + ' ');
    preOrder(node.left);
    preOrder(node.right);
  }
}

function postOrder(node) {
  // 后序遍历
  if (!(node == null)) {
    postOrder(node.left);
    postOrder(node.right);
    console.log(node.show() + ' ');
  }
}

function getmin() {
  // 求最小
  var current = this.root;
  console.log('debug: ' + current.data);
  while (!(current.left == null)) {
    current = current.left;
  }
  return current.data;
}

function getmax() {
  // 最大
  var current = this.root;
  while (!(current.right == null)) {
    current = current.right;
  }
  return current.data;
}

function find(data) {
  // 查找某个值
  var current = this.root;
  while (current.data != data) {
    if (data < current.data) {
      current = current.left;
    } else {
      current = current.right;
    }
    if (current == null) {
      return null;
    }
  }
  return current;
}

function getSmallest(node) {
  if (node.left == null) {
    return node;
  } else {
    return getSmallest(node.left);
  }
}

function remove(data) {
  root = removeNode(this.root, data);
}

function removeNode(node, data) {
  if (node == null) {
    return null;
  }
  if (data == node.data) {
    // node has no children
    if (node.left == null && node.right == null) {
      return null;
    }
    // node has no left child
    if (node.left == null) {
      return node.right;
    }
    // node has no right child
    if (node.right == null) {
      return node.left;
    }
    // node has two children
    var tempNode = getSmallest(node.right);
    node.data = tempNode.data;
    node.right = removeNode(node.right, tempNode.data);
    return node;
  } else if (data < node.data) {
    node.left = removeNode(node.left, data);
    return node;
  } else {
    node.right = removeNode(node.right, data);
    return node;
  }
}

var binaryTree = new BinaryTree();
binaryTree.insert(23);
binaryTree.insert(45);
binaryTree.insert(16);
binaryTree.insert(37);
binaryTree.insert(3);
binaryTree.insert(99);
binaryTree.insert(22);
console.log('binaryTree:', binaryTree);
binaryTree.getmin();
binaryTree.getmax();
binaryTree.remove(3);
binaryTree.getmin();
```

## 二叉查找树（BST）具备什么特性呢

![二叉查找树](./.imgs/二叉查找树.png)

二叉查找树的特点：**较小的保存在左节点中，较大的保存早右节点中**。二分法查找。

1. 左子树上所有结点的值均小于或等于它的根结点的值。
2. 右子树上所有结点的值均大于或等于它的根结点的值。
3. 左、右子树也分别为二叉排序树。

## 红黑树（颜色每层交替）

![红黑树](./.imgs/红黑树.png)

1. 节点是红色或黑色。
2. **根节点是黑色。**
3. 每个叶子节点都是黑色的空节点（NIL 节点）。
4. 每个红色节点的两个子节点都是黑色。(从每个叶子到根的所有路径上不能有两个连续的红色节点)。
5. 从任一节点到其每个叶子的所有路径都包含相同数目的黑色节点。

## 判断对称二叉树

从根节点开始检测二叉树：

1. 左右节点是否都为空
2. 是否其中一个为空
3. 是否两个都不为空，但左右节点值不等
4. 是否两个都不为空，但左右节点值相等，递归调用

```js
function Tree(pTree) {
  if (!pTree) {
    return true;
  }
  return TreeJug(pTree.left, pTree.right);
}

function TreeJug(left, right) {
  if (!left && left === right) {
    return true;
  }
  if (!left || !right) {
    return false;
  }
  if (left.val !== right.val) {
    return false;
  }
  return TreeJug(left.left, right.right) && TreeJug(left.right, right.left);
}
let tree = {
  val: 1,
  left: null,
  right: null,
};
console.log(Tree(tree));
```

## 二叉树遍历

永远都是现左后右，就看根节点是什么时候遍历。**前中后指的是遍历根节点的时机**。

1. 前序遍历：前序遍历的顺序为**根**-左-右
2. 中序遍历：中序遍历的顺序为左-**根**-右
3. 后序遍历：后序遍历的顺序为左-右-**根**

## 参考文章

[二叉树、前序遍历、中序遍历、后序遍历](https://www.cnblogs.com/lanhaicode/p/10358736.html)
