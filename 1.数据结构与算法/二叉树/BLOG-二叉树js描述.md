---
title: 二叉树（二叉搜索树）JS描述
date: 2018-6-6
tags:
  - js
  - 二叉树
categories:
  - [数据结构与算法, 二叉树]
---

二叉搜索树。

二叉树是一种非线性的数据结构，**以分层的方式存储数据**，**树被用来存储具有层级关系的数据**，其中的一种特殊的树：二叉树。树以边连接的节点组成。公司的组织结构就是一个树的例子。二叉树子节点不能超过两个。

## 二叉搜索树的 JS 描述

```js
function Node(data, left, right) {
  this.data = data;
  this.left = left;
  this.right = right;
  this.show = show;
}

function show() {
  return this.data;
}

function BST() {
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

function insert(data) {
  //插入方法
  var n = new Node(data, null, null);
  if (this.root == null) {
    //是否有根节点
    this.root = n;
  } else {
    //依据左小右大找到它自己的位置
    var current = this.root;
    var parent;
    while (true) {
      parent = current;
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

var nums = new BST();
nums.insert(23);
nums.insert(45);
nums.insert(16);
nums.insert(37);
nums.insert(3);
nums.insert(99);
nums.insert(22);
inOrder(nums.root);
var num = parseInt(readline());
nums.remove(num);
inOrder(nums.root);
```

## 二叉查找树（BST）具备什么特性呢

二叉查找树的特点：较小的保存在左节点中，较大的保存早右节点中。二分法查找。

1. 左子树上所有结点的值均小于或等于它的根结点的值。
2. 右子树上所有结点的值均大于或等于它的根结点的值。
3. 左、右子树也分别为二叉排序树。

## 红黑树（颜色每层交替）

1. 节点是红色或黑色。
2. **根节点是黑色。**
3. 每个叶子节点都是黑色的空节点（NIL 节点）。
4. 每个红色节点的两个子节点都是黑色。(从每个叶子到根的所有路径上不能有两个连续的红色节点)。
5. 从任一节点到其每个叶子的所有路径都包含相同数目的黑色节点。

**自平衡**

红黑树从根到叶子的最长路径不会超过最短路径的二倍。

**打乱规则调整位置**

当插入或者删除节点的时候，红黑树的规则可能被打破，这个时候就要做出一些调整，来维持原来的规则。

**调整规则**

变色和旋转（左旋转和右旋转）。

1. 变色： 每次根节点应该都要变色；
2. 左旋转： 逆时针旋转红黑树的两个节点，使得父节点被自己的右孩子取代，而自己成为自己的左孩子。
3. 右旋转：顺时针旋转红黑树的两个节点，使得父节点被自己的左孩子取代，而自己成为自己的右孩子。
