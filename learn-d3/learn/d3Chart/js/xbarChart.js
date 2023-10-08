var data = [1, 4, 7, 2, 9, 13, 5, 8, 2, 9],
		margin = {top: 20, right: 30, bottom: 15, left: 30}
		barHeight = 20,
		barPadding = 5,
		svgWidth = 500,
		svgHeight = (barHeight + barPadding) * data.length + margin.top + margin.bottom;

var barSvg = d3.select("#xbarchartContainer")
							 .append("svg")
							 .attr("width", svgWidth)
							 .attr("height", svgHeight);

var barGContainer = barSvg.append("g")
													.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var barG = barGContainer.selectAll("g")
			.data(data)
			.enter()
			.append("g")
			.attr("transform", function(d, i, item){
				return "translate(0," + (barHeight+barPadding) * i + ")";
			});

// 定义X轴的缩放函数
var scaleX = d3.scaleLinear()
							.domain([0, d3.max(data)])
							.range([0, svgWidth-55])

barG.append("rect")
		.attr("width", function (d) {return scaleX(d);})
		.attr("height", barHeight)
		.style("fill", "#8DB9BE")

barG.append("text")
		.text(function (d) {return d;})
		.attr("x", function (d) {return scaleX(d);})  // text文本在X轴的坐标
		.attr("y", barHeight-5)  // text文本在Y轴的坐标
		.attr("text-anchor", "end")
		.style("stroke", "#eee")
