// 第一步，读取数据
d3.csv("../data.csv", type, function (data) {
	// 第三步，使用回调使用数据
	// var data = [1, 4, 7, 2, 9, 13, 5, 8, 2, 9],
	var	barHeight = 190,
			barWidth = 440,
			margin = {top: 30, right:30, bottom: 30, left: 30},
			svgHeight = barHeight + margin.top + margin.bottom,
			svgWidth = barWidth + margin.left + margin.right;

	var barSvg = d3.select("#ybarchartContainer2⁄")
								 .append("svg")
								 .attr("width", svgWidth)
								 .attr("height", svgHeight)
								 .attr("class", "bar-svg");

	// 定义Y轴的缩放函数——线性缩放
	var scaleY = d3.scaleLinear()
								.domain([0, d3.max(data, function (data) {return data.population})])
								.range([barHeight, 0])

	// 定义X轴的缩放函数——离散缩放
	var scaleX = d3.scaleBand()
								.domain(data.map(function (data) {return data.year}))  // 接收一个数组！（线性缩放：接收一个范围）
								.range([0, barWidth])
								.padding(0.1)
	 // console.log("scaleX.bandwidth", scaleX.bandwidth())
	 // console.log("scaleX.padding", scaleX.padding())
	 // console.log("scaleX.step", scaleX.step())

	var barGContainer = barSvg.append("g")
														.attr("transform", "translate(" + margin.left + "," + margin.top + ")")

	var barG = barGContainer.selectAll(".bar")  // 选择类名为bar的元素
				.data(data)
				.enter() // 选择只有数据但不存在的selection
				.append("g")
				.attr("class", "bar")
				.attr("transform", function(d, i, item){
					return "translate(" + scaleX(d.year) + ", 0)";  // 或者scaleX.step()*i
				});

	barG.append("rect")
			.attr("y", function (d) {return scaleY(d.population);}) 
			.attr("height", function (d) {return barHeight - scaleY(d.population);})
			.attr("width", scaleX.bandwidth())
			.style("fill", "steelblue")

	barG.append("text")
			.text(function (d) {return d.population + "亿人";})
			.attr("y", function (d) {return scaleY(d.population);})  
			.attr("x", scaleX.bandwidth()/2) 
			.attr("dy", "1em") 
			.attr("text-anchor", "middle")
			.style("stroke", "purple")
			.style("font-size", "10px")

	// 第三步，添加X轴Y轴
	var xAxis = d3.axisBottom(scaleX),
			yAxis = d3.axisLeft(scaleY);

	barGContainer.append("g")
							 .call(xAxis)
							 .attr("transform", "translate(0," + barHeight + ")")

	barGContainer.append("g")
							 .call(yAxis)
							 // .append("text")
							 // .text("亿人")
							 // .style("fill", "purple")
							 // .attr("transform", "rotate(-90)")
							 // .attr("dy", "2em")
})

// 第二步，处理数据
// 类型转换函数，将字符串转为数字
function type (d) {
	d.population = +d.population; // "+": 将字符串转为数字，并覆盖原来的值
	return d;
}
