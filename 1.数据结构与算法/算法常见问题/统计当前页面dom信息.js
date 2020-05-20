// DOM 的体积过大会影响页面性能，假如你想在用户关闭页面时统计

//（计算并反馈给服务器）当前页面中元素节点的数量总和、元素节点
// 的最大嵌套深度以及最大子元素个数，请用 JS 配合原生 DOM API

// 实现该需求（不用考虑陈旧浏览器以及在现代浏览器中的兼容性，

// 可以使用任意浏览器的最新特性；不用考虑 shadow DOM。比如在如下页面中运行后
// document.getElementsByTagName("*").length

function calculateDOMNodes() {
  // your implementation code here:
  let result = {
    totalElementsCount: 0,
    maxDOMTreeDepth: 1,
    maxChildrenCount: 0,
  };
  let newDepth, childrenLength;
  function findElement(parentNode, depth) {
    [...parentNode.children].forEach((item) => {
      result.totalElementsCount += 1;

      childrenLength = item.children.length;

      result.maxChildrenCount =
        result.maxChildrenCount > childrenLength ? result.maxChildrenCount : childrenLength;

      if (item.ELEMENT_NODE !== 1) {
        console.log(item.ELEMENT_NODE);
        return;
      }
      if (childrenLength) {
        newDepth = depth + 1;
        result.maxDOMTreeDepth =
          result.maxDOMTreeDepth < newDepth ? newDepth : result.maxDOMTreeDepth;
        findElement(item, newDepth);
      }
    });
  }
  findElement(document, 1);
  return result;
}

calculateDOMNodes();

// window.addEventListener('close', calculateDOMNodes);
