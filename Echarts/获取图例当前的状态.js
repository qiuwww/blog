获取图例当前的状态.js


获取当前实例中维护的option对象，返回的option对象中包含了用户多次setOption合并得到的配置项和数据，也记录了用户交互的状态，例如图例的开关，数据区域缩放选择的范围等等。
所以从这份 option 可以恢复或者得到一个新的一模一样的实例。
http://echarts.baidu.com/api.html#echartsInstance.getOption

设置dataZoom可以按照百分比设置(start, end), 也可以按照(startValue, endValue)来设置，一般按照后者设置比较安全一点。