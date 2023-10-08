// 第一步，读取数据
d3.csv("../data.csv", type, function (data) {
	// 第三步，使用回调使用数据
	//console.log(data)  // [{population: "5.94", "year": "1953"}, {population: "6.95", "year": "1964"}, ...]

	// var data = [1, 4, 7, 2, 9, 13, 5, 8, 2, 9],
	var	barWidth = 30,
			barPadding = 20,
			svgHeight = 250,
			svgWidth = 500,
			gHeight = 190,
			gWidth= 440,
			margin = {top: 30, right: 30, bottom: 30, left: 50};

	var barSvg = d3.select("#ybarchartContainer")
								 .append("svg")
								 .attr("width", svgWidth)
								 .attr("height", svgHeight)
								 .attr("class", "bar-svg");

	var barGContainer = barSvg.append("g")
														.attr("transform", "translate(" + margin.left + "," + margin.top + ")")

	var barG = barGContainer.selectAll("g")
				.data(data)
				.enter()
				.append("g")
				.attr("transform", function(d, i, item){
					return "translate(" + (barWidth+barPadding) * i + ", 0)";
				});

	// 定义Y轴的缩放函数——线性缩放
	var scaleY = d3.scaleLinear()
								.domain([0, d3.max(data, function (data) {return data.population})])
								.range([0, gHeight])

	barG.append("rect")
			.attr("y", function (d) {return gHeight - scaleY(d.population);})  // 使原点在左下方开始
			.attr("height", function (d) {return scaleY(d.population);})
			.attr("width", barWidth)
			.style("fill", "#7DBCF6")
			// 开始过渡
			.transition()
			.duration(2000) // 持续2秒
			.delay(2000) // 延迟
			.style("fill", "#198EF0")

	barG.append("text")
			.text(function (d) {return d.year;})
			.attr("y", function (d) {return gHeight - 13})
			.attr("x", barWidth/2)
			.attr("dy", "1em")
			.attr("text-anchor", "middle")
			.style("stroke", "#eee")
			.style("font-size", "10px")

			.transition()
			.attr("y", function (d) {return gHeight -scaleY(d.population);})
			.duration(2000)
			.delay(function (d, i) {return 500*i})
})

// 第二步，处理数据
// 类型转换函数，将字符串转为数字
function type (d) {
	d.population = +d.population; // "+": 将字符串转为数字，并覆盖原来的值
	return d;
}
