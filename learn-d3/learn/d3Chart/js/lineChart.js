// --------------    第一步，生成折线
// 设置动态的svg宽高、边距、g宽高
var width = 500,
    height = 250,
    margin = {left: 50, top: 30, right: 20, bottom: 30},
    gWidth = width - margin.left - margin.right,
    gHeight = height - margin.top - margin.bottom

// 添加svg元素
var lineSvg = d3.select("#linechartContainer")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .attr("id", "lineSvg")

// 添加g元素
var lineG = d3.select("#lineSvg")
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")")  // 向右偏移50像素，向下偏移30像素
  .attr("id", "lineG")

// d的数据集
var data = [1,3,5,7,8,4,3,7]

// 定义两个缩放函数：沿X轴Y轴。扩大g的范围，线性的
var scaleX = d3.scaleLinear()
               .domain([0, data.length-1])  // 定义参数一，输入范围。X轴：索引号
               .range([0, gWidth])  // 定义参数二，输出范围。Y轴
var scaleY = d3.scaleLinear()
               .domain([0, d3.max(data)]) // 取出data中的最大值
               .range([gHeight, 0])  // js坐标的特点：原点在左上方，Y轴向下递增。所以range要写反

// 生成d的属性值: d = "M0,1L1,3L2,5L3,7L4,8L5,4L6,3L7,7"
var lineGenerator = d3.line()  // 3.0写法：d3.svg.line()
                     .x(function (d, i, item){  // x轴是索引号
                        return scaleX(i);
                      })
                     .y(function (d, i, item){  // y轴是元素值
                        return scaleY(d);
                      })
                     .curve(d3.curveMonotoneX) // 3.0写法：.interpolate("cardinal"). 拟合方式，将折线改为光滑线

// 添加path元素
d3.select("#lineG")
  .append("path")  // 也可以这样写：`g.append("path")`, g: 变量名
  .attr("d", lineGenerator(data))
  .attr("class", "line-path")

// --------------    endbuild



// --------------    第二步，生成坐标轴

// 缩放使用scaleX、scaleY函数
// 3.0写法
// var xAxis = d3.svg.axis().scale(scaleX),
//     yAxis = d3.svg.axis().scale(scaleY).orient("left")
var xAxis = d3.axisBottom(scaleX),
    yAxis = d3.axisLeft(scaleY)

// 使用定义好的X轴、Y轴：在g元素上再分别添加g元素，再调用xAxis函数、yAxis函数
lineG.append("g")
 .call(xAxis)
 .attr("transform", "translate(0," + gHeight + ")")  // 把X轴放到折线下面
 .append("text")
 .text("amount")
 .attr("class", "x-title")
 .attr("transform", "translate(" + gWidth + ", 0)")
 .attr("text-anchor", "end")
 .attr("dy", "-0.5em")

// Y轴文字注释
lineG.append("g")
 .call(yAxis)
 .append("text")
 .text("Price($)")
 .attr("class", "y-title")
 .attr("transform", "rotate(-90)")  // 旋转-90度
 .attr("dy", "1.5em")  // 向右偏移2em，dy: 相对位置
 .attr("text-anchor", "end")   // 对齐方式
// --------------    endbuild
