
# BFS与DFS

1. 这两种方法可以用来遍历图、二叉树等数据结构；
2. DFS（Depth first search）深度优先搜索<https://leetcode.cn/tag/depth-first-search/problemset/>；
   1. 深度优先搜索的步骤分为：
      1. **递归下去**；
         1. 自定义函数递归调用；
      2. 回溯上来。
      3. 顾名思义，深度优先，则是**以深度为准则**，**先一条路走到底，直到达到目标**。这里称之为递归下去。
   2. 否则既没有达到目标又无路可走了，那么则退回到上一步的状态，走其他路。这便是回溯上来。
3. BFS（Breadth first search）广度优先搜索<https://leetcode.cn/tag/breadth-first-search/problemset/>；
   1. 广度优先搜索旨在面临一个路口时，把所有的岔路口都记下来，然后选择其中一个进入，然后将它的分路情况记录下来；
4. DFS的复杂度与BFS的复杂度大体一致，不同之处在于遍历的方式与对于问题的解决出发点不同，DFS适合目标明确，而BFS适合大范围的寻找。

## 深度优先搜索算法，前中后序遍历<https://leetcode.cn/problems/binary-tree-preorder-traversal/>

```js
/*
 * function TreeNode(x) {
 *   this.val = x;
 *   this.left = null;
 *   this.right = null;
 * }
 */
/**
 * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
 *
 * 
 * @param root TreeNode类 
 * @return int整型一维数组
 */
function preorderTraversal( root ) {
    // write code here
    const arr = [];
    function deep(node) {
        if(!node) return;
        // 这里是深度优先的
        arr.push(node.val);
        deep(node.left);
        deep(node.right)
    }

    deep(root);
    return arr;

}
module.exports = {
    preorderTraversal : preorderTraversal
};
```

## 广度优先搜索，层序遍历<https://leetcode.cn/tag/breadth-first-search/problemset/><https://www.nowcoder.com/practice/04a5560e43e24e9db4595865dc9c63a3?tpId=295&tqId=644&ru=/exam/oj&qru=/ta/format-top101/question-ranking&sourceUrl=%2Fexam%2Foj%3Fpage%3D1%26tab%3D%25E7%25AE%2597%25E6%25B3%2595%25E7%25AF%2587%26topicId%3D295>

这里的核心是需要添加一个level，然后控制遍历的层级，如果需要细分分支，需要更细致的level。

```js
/*
 * function TreeNode(x) {
 *   this.val = x;
 *   this.left = null;
 *   this.right = null;
 * }
 */

/**
 *
 * @param root TreeNode类
 * @return int整型二维数组
 */

// 这里的核心是需要添加一个level，然后控制遍历的层级，如果需要细分分支，需要更细致的level
// 核心还是使用递归

function levelOrder(root) {
    function preOrder(root, level) {
        if (root == null) return;

        if (level >= res.length) res.push([]);

        res[level].push(root.val);

        preOrder(root.left, level + 1);
        preOrder(root.right, level + 1);
    }
    let res = [];
    preOrder(root, 0);
    return res;
}
module.exports = {
    levelOrder: levelOrder,
};
```
