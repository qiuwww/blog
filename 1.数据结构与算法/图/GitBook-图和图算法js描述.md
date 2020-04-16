---
title: 图和图算法js描述
date: 2018-5-6
tags:
  - 数据结构
  - 图和图算法js描述
categories:
  - [数据结构, 图和图算法js描述]
---

## 定义

图（Graph）是由顶点的有穷非空集合和顶点之间边的集合组成，通常表示为：G(V,E)，其中，G 表示一个图，V 是图 G 中顶点的集合，E 是图 G 中边的集合。

## 分类

### 1.有向图

有向边：若从顶点 Vi 到 Vj 的边有方向，则称这条边为有向边，也成为弧(Arc)，用有序偶<Vi,Vj>来表示，Vi 称为弧尾，Vj 称为弧头。

### 2.无序图

无向边：若顶点 Vi 到 Vj 之间的边没有方向，则称这条边为无向边(Edge)，用无序偶(Vi,Vj)来表示。

### 3.简单图

在图结构中，若不存在顶点到其自身的边，且同一条边不重复出现，则称这样的图为简单图。

## 构建图

**图的实际信息都保存在边上面,因为它们描述了图的结构**。

我们将表示图的边的方法称为**邻接表或者邻接表数组**。这种方法将边存储为由顶点的相邻顶点列表构成的数组,并以此顶点作为索引。使用这种方案,当我们在程序中引用一个顶 点时,可以高效地访问与这个顶点相连的所有顶点的列表。

比如,如果顶点 2 与顶点 0、 1、3、4 相连,并且它存储在数组中索引为 2 的位置,那么,访问这个元素,我们可以访 问到索引为 2 的位置处由顶点 0、1、3、4 组成的数组。

## js 描述

```js
function Graph(v) {
  // 顶点的个数
  this.vertices = v;
  // 边的个数
  this.edges = 0;
  // 顶点对应的边的记录
  this.adj = [];
  // 需要一个数组来保存从一个顶点到下一个顶点的所有边
  this.edgeTo = [];
  // 为Graph类添加一个数组,用来存储已访问过的顶点,将它所有元 素的值全部初始化为 false。
  this.marked = [];
  // 遍历生成记录定点对应的边的数组
  for (let i = 0; i < this.vertices; i++) {
    this.adj[i] = [];
    this.marked[i] = false;
  }
  // 添加方法
  this.addEdge = addEdge;
  this.showGraph = showGraph;
  this.dfs = dfs;
  this.bfs = bfs;
  this.pathTo = pathTo;
}

function addEdge(v, w) {
  this.adj[v].push(w);
  this.adj[w].push(v);
  this.edges++;
}

function showGraph() {
  for (let i = 0; i < this.vertices; i++) {
    let str = i + '->';
    for (let j = 0; j < this.vertices; j++) {
      if (this.adj[i][j] !== undefined) {
        str += this.adj[i][j] + ' ';
      }
    }
    console.log(str);
  }
}

// 深度优先搜索 depthFirst
function dfs(v) {
  this.marked[v] = true;
  if (this.adj[v] !== undefined) {
    console.log('Visisted vertex: ' + v);
  }
  // 遍历边的另一端的顶点
  this.adj[v].forEach((w) => {
    if (!this.marked[w]) {
      this.dfs(w);
    }
  });
}

// 广度优先搜索
function bfs(s) {
  let queue = [];
  this.marked[s] = true;
  queue.push(s);
  while (queue.length > 0) {
    let v = queue.shift();
    if (v !== undefined) {
      console.log('Visisted vertex: ' + v);
    }
    this.adj[v].forEach((w) => {
      if (!this.marked[w]) {
        this.edgeTo[w] = v;
        this.marked[w] = true;
        queue.push(w);
      }
    });
  }
}
// 最短路径的问题
// 首先,需要一个数组来保存从一个顶点到下一个顶点的所有边。我们将这个数组命名为 edgeTo。因为从始至终使用的都是广度优先搜索函数,所以每次都会遇到一个没有标记的 顶点,除了对它进行标记外,还会从邻接列表中我们正在探索的那个顶点添加一条边到这 个顶点。
function pathTo(t, v) {
  for (let i = 0; i < this.vertices; i++) {
    this.marked[i] = false;
  }
  this.bfs(t);
  let source = t;
  if (!this.marked[v]) {
    return undefined;
  }
  let path = [];
  for (let i = v; i != source; i = this.edgeTo[i]) {
    path.unshift(i);
  }
  path.unshift(source);
  let str = '';
  for (let i in path) {
    if (i < path.length - 1) {
      str += path[i] + '->';
    } else {
      str += path[i];
    }
  }
  console.log(str);
  return path;
}

// 测试代码

var g = new Graph(5);
g.addEdge(0, 1);
g.addEdge(0, 2);
g.addEdge(1, 3);
g.addEdge(2, 4);

g.pathTo(0, 4);

g.showGraph();

g.dfs(0);

g.dfs(1);

g.bfs(0);
```

## 图的遍历

### 深度优先遍历

![深度优先搜索](./imgs/深度优先搜索.jpeg)

深度优先遍历(DepthFirstSearch)，也有称为深度优先搜索，简称为 **DFS**。

比如在一个房间内寻找一把钥匙，无论从哪一间房间开始都可以，将房间内的墙角、床头柜、床上、床下、衣柜、电视柜等挨个寻找，做到不放过任何一个死角，当所有的抽屉、储藏柜中全部都找遍后，**接着再寻找下一个房间**。

### 广度优先搜索

![广度优先搜索](./imgs/广度优先搜索.jpeg)

广度优先搜索（BFS）属于一种**盲目搜寻法**，目的是系统地展开并检查图中的所有节点，以找寻结果。换句话说，**它并不考虑结果的可能位置，彻底地搜索整张图，直到找到结果为止**。

## 查找最短路径

在执行**广度优先搜索**时,会自动查找从一个顶点到另一个相连顶点的最短路径。例如,要查找从顶点 A 到顶点 D 的最短路径,我们首先会查找从 A 到 D 是否有**任何一条单边路径**, 接着查找**两条边的路径**,以此类推。这正是广度优先搜索的搜索过程,因此我们可以轻松 地修改广度优先搜索算法,找出最短路径。

## 参考文章

[js 数据结构和算法（四）图和图算法](https://segmentfault.com/a/1190000002410553)

[js 数据结构和算法——图和图算法](https://zhuanlan.zhihu.com/p/25853745)
