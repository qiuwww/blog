// --------------    第一步，生成折线
// 设置动态的svg宽高、边距、g宽高
var width = 500,
    height = 250,
    margin = {left: 50, top: 30, right: 20, bottom: 30},
    gWidth = width - margin.left - margin.right,
    gHeight = height - margin.top - margin.bottom

// 添加svg元素
var areaSvg = d3.select("#areachartContainer")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .attr("id", "areaSvg")

// 添加g元素
var areaG = d3.select("#areaSvg")
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
  .attr("id", "areaG")

// d的数据集
var data = [1,3,5,7,8,4,3,7]

// 定义两个缩放函数：沿X轴Y轴。扩大g的范围，线性的
var scaleX = d3.scaleLinear()
               .domain([0, data.length-1])
               .range([0, gWidth])
var scaleY = d3.scaleLinear()
               .domain([0, d3.max(data)])
               .range([gHeight, 0])

// 绘制区域
// 生成d的属性值: d = "M0,1L1,3L2,5L3,7L4,8L5,4L6,3L7,7"
var areaGenerator = d3.area()
                     .x(function (d, i, item){
                        return scaleX(i);
                      })
                     .y0(gHeight)
                     .y1(function (d, i, item){
                        return scaleY(d);
                      })
                     .curve(d3.curveMonotoneX)

// 添加path元素
d3.select("#areaG")
  .append("path")
  .attr("d", areaGenerator(data))
  .attr("fill", "#DDA490")

  // 开始过渡
  .transition()
  .duration(3000)
  .attr("fill", "#D06E6B")


// --------------    endbuild



// --------------    第一步，生成坐标轴

// 缩放使用scaleX、scaleY函数
var xAxis = d3.axisBottom(scaleX),
    yAxis = d3.axisLeft(scaleY)

// 使用定义好的X轴、Y轴：在g元素上再分别添加g元素，再调用xAxis函数、yAxis函数
areaG.append("g")
 .call(xAxis)
 .attr("transform", "translate(0," + gHeight + ")")

areaG.append("g")
 .call(yAxis)
 .append("text")
 .text("Price($)")
 .attr("class", "y-title")
 .attr("transform", "rotate(-90)")
 .attr("dy", "2em")
 .attr("text-anchor", "end")
// --------------    endbuild
