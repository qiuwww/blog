// "use strict";


$(function(){


// // changes-in-prices-and-positions.js 
// // 用于具体的操作的处理

// window.onload = function(){
// 	console.log('window.onload: ','yes');

// 	function Coordinate(container, params) {
// 		this.vis = d3.select(`#${container}`);
// 		this.params = params;
// 		return this;
// 	}

// 	Coordinate.prototype = {

// 		constructor: Coordinate,

// 		extendParams: function(params){
// 			// Object.assign(target, ...sources)
// 			Object.assign(this.params, params);
// 			return this;
// 		},
// 		// 设置图例的大小位置
// 		setContainer: function setContainer() {

// 		var vis = d3.select("#d3Chart")
// 		    .append("svg:svg")
// 			.attr("width", 750)
// 			.attr("height", 750)
// 			.attr("viewBox", "0 0 750 750")


// 			// 控制显示的范围，如下表示，坐标x轴显示-1 到 5 显示的区域是从 50 到 730
//     var xScale = d3.scale.linear().domain([5, -1]).range([700, 50]);
//     var yScale = d3.scale.linear().domain([-1, 1]).range([700, 50]);

// // 缩放事件
// var zoom = d3.behavior.zoom()
// 			.scaleExtent([1, 3])
// 			.on("zoom", zoomed);
// vis.call(zoom)
//     // y axis
//     var yAxis = d3.svg.axis()
//       .orient("left") // 控制刻度值显示位置left||right
//       .ticks(10)      
//       .scale(yScale);

//     // x axis
//     var xAxis = d3.svg.axis()
//       .orient("bottom")
//       .ticks(10)
//       .scale(xScale);			

//     var xAxisPlot = vis.append("g")

//       .attr("class", "axis axis--x")      
//       // 这里可以控制坐标轴的对齐，需要按照比例来做
//       // 控制坐标系的偏移位置就可以了，这里影响参数主要是分段数量和范围的大小，
//       // 因此svg所占的空间的位置需要设置为变量，包括宽高和边距
//       .attr("transform", "translate(0," + (750 / 2) + ")")
//       .call(xAxis) //.tickSize(-height, 0));
      
//       .append("text")  
//       .text("Price($)")  
//       .attr("transform","rotate(0)")  
//       .attr("text-anchor","start")  
//       .attr("dy","3em") 
//       .attr("dx","2em") 


//     var yAxisPlot = vis.append("g")
//       .attr("class", "axis axis--y")
//       .attr("transform", "translate(" + (650 / 6 + 50) + ",0)")
//       .call(yAxis) //.tickSize(-width, 0));
//       // 下边一堆都是用来添加坐标轴名称的
//       .append("text")  
//       .text("Price($)")  
//       .attr("transform","rotate(0)")  
//       .attr("text-anchor","end")  
//       .attr("dy","3em") 
//       .attr("dx","2em")



//     // 处理点的操作
// 	    var data = d3.range(100).map(function(d){
// 	      return {
// 	       x: Math.random() > 0.8 ? Math.random() * -1 : Math.random() * 6 -1,
// 	       y: Math.random() > 0.5 ? Math.random() * -1 : Math.random()
// 	      };
// 	    });
	    
// 	    vis.selectAll(".point")
// 	      .data(data)
// 	      .enter()


// 	      .append("circle")
// 	      // # selection.classed(name[, value]) 这个操作是用来设置class属性值得便捷程序。
// 	      .attr("class", "point")
// 	      .attr("r", 10)
// 	      // # selection.style(name[, value[, priority]])
// 	      .style({"fill": "yellow"})
// 	      .attr("cx", function(d){
// 	        return xScale(d.x);
// 	      })
// 	      .attr("cy", function(d){
// 	        return yScale(d.y);
// 	      })




// // 		//监听鼠标事件  
// // 		vis.selectAll(".point") 

// // 		    .on("click",function(d,i){ 
// // 		    	console.log("click"); 
// // 		        d3.select(this)  
// // 		            .style("fill","green")
// // 		      //       .append("div")
// //     				// .text('click');
  					  
// // 		    })  
// // 		    .on("mouseover",function(d,i){  
// // 		    	console.log("mouseover"); 

// // 		        d3.select(this)  
// // 		            .style("fill","blue")

// // // 新添加一个圆环在原来的位置
// // // .enter()
// // // .append("circle")
// // // .attr("cx",function(d){
// // // return xScale(d.x);
// // // })
// // // .attr("cy", function(d){
// // // return yScale(d.y);
// // // })
// // // .attr("r", 15)
// // // .attr("fill","black");

// // 		    })  
// // 		    .on("mouseout",function(d,i){  
// // 		    	console.log("mouseout"); 

// // 		        d3.select(this)  
// // 		            .transition()  
// // 		            .duration(500)  
// // 		            // .style("border","10px solid #500");
// // 		            .style("fill","red");  
// // 		    });  

// // 缩放事件

		


// 		function zoomed() {
// 			console.log(d3.event)
// 			// d3.selectAll('.axis--x').attr("transform", 
// 			// 	"scale(" + d3.event.scale + ")");
// 			vis.attr("transform", "scale(" + d3.event.scale + ")");
// 			var scale = 750 * d3.event.scale;
// 			console.log(scale)

// 			vis.attr({'width': scale, 'height': scale})
// 			// vis.attr({'width': scale, 'height': scale})

// 			// d3.select('.axis--x').attr("transform", "translate(" + (scale / 6 + 50) + ",0)")

// 		}
// 	},
// 		// 绘制纵横坐标

// 		// 绘制散点，多种类型
// 		drawPoints: function(){
// 			let vis = this.vis;
// 		},
// 		// 提示信息添加

// 		// 上浮显示提示信息
// 		// 拖动

// 		// 缩放
// 		init: function(){
// 			this.setContainer();
// 			this.drawPoints();
// 		}
// 	};



// 	// 配置参数
// 	let chartOption = {
// 		width: 1000,
// 		height: 400,

// 	};

// 	// 实例化对象
// 	let chart = new Coordinate('d3Chart', chartOption).init();
// }



// let config = {
// 	container: '#d3Chart',
// 	width: 750,
// 	height: 750,
// 	padding: 50,
// 	leftWidth: 600,
// }


// // 设置svg图的宽高，以及获取svg对象
// var vis = d3.select(config.container)
//     .append("svg:svg")
// 	.attr("width", config.width)
// 	.attr("height", config.height)
// // 左侧部分
// var left = vis.append('g')
// 	.attr('class', 'left')
// 	.attr('width', config.leftWidth)
// 	.attr('height', config.height)	

// 	// .style('fill', 'blue')

// 	// .style('opacity', 0.2)
// 	// 内层拖动，外层固定大小
// 	// .append('g') 

// 	// .classed('drag-scale', true)
// 	// .attr('width', config.leftWidth)
// 	// .attr('height', config.height)
// 	// .style('opacity', 0.2)



// // 右侧部分
// var right =	vis
// 	.append('g')
// 	.classed('right', true)
// 	.attr('width', config.width - config.leftWidth)
// 	.attr('height', config.height)
// 	// .style('fill', 'yellow')
// 	.attr('transform','translate('+config.leftWidth+',0)')



// // 绘制比例尺
// // 控制显示的范围，如下表示，坐标x轴显示-1 到 5 显示的区域是从 50 到 730
// var xScale = d3.scaleLinear().domain([5.2, -1]).range([600, 50]); // x轴缩放比例
// var yScale = d3.scaleLinear().domain([-1, 2.3]).range([600, 50]);

// // axis组件可以将比例尺以可读的方式显示.
// // x axis
// var xAxis = d3.axisBottom(xScale)
// 	// .orient("bottom")
// 	.ticks(10)

// // y axis
// var yAxis = d3.axisLeft(yScale)
// 	// .orient("left") // 控制刻度值显示位置left||right
// 	.ticks(10)      

		

// var xAxisPlot = left.append("g")
// 	.attr("class", "axis axis--x")      
// 	// 这里可以控制坐标轴的对齐，需要按照比例来做
// 	// 控制坐标系的偏移位置就可以了，这里影响参数主要是分段数量和范围的大小，
// 	// 因此svg所占的空间的位置需要设置为变量，包括宽高和边距
// 	.attr("transform", "translate(0," + (config.leftWidth / 2) + ")")
// 	.call(xAxis)

// 	.append("text")  
// 	.text("增仓率%")  
// 	.attr("transform","rotate(0)")  
// 	.attr("text-anchor","start")  
// 	.attr("dy","3em") 
// 	.attr("dx","2em") 


// var yAxisPlot = left.append("g")
// 	.attr("class", "axis axis--y")
// 	.attr("transform", "translate(" + ((config.leftWidth - 2 * config.padding) / 6 + config.padding) + ",0)")
// 	.call(yAxis) //.tickSize(-width, 0));
// 	// 下边一堆都是用来添加坐标轴名称的
// 	.append("text")  
// 	.text("涨跌幅%")  
// 	.attr("transform","rotate(0)")  
// 	.attr("text-anchor","end")  
// 	.attr("dy","3em") 
// 	.attr("dx","2em")
// 	.style('fill', 'red')
// //  控制y轴的数字偏移
// left.select('.axis--y').selectAll('.tick text').attr('x', '-20')

// // 顶部三角形
// d3.select('.axis--y').append('path')
// .attr('d', 'M0,16L8,8L16,16L0,16')
// .style('stroke-width', 0)
// .attr('transform', 'translate(-8, 35)')
// .style('fill', 'red')
// //  画原点


// // 处理点的操作
// var data = d3.range(100).map(function(d){
//   return {
//    x: Math.random() > 0.8 ? Math.random() * -1 : Math.random() * 6 -1,
//    y: Math.random() > 0.5 ? Math.random() * -1 : Math.random()
//   };
// });


// console.log("data", data);

// // 子元素也是会撑开父元素的
// left.append('g')
//   .attr('class', 'points-wrap')
// // .append('rect')
// // .attr('width', 650)
// // .attr('height', 650)
// // .attr('transform', 'translate(50,50)')
// // .style('fill', 'rgba(0,0,0,0)')

// .selectAll(".point")
//   .data(data)
//   .enter()
//   .append("circle")
//   // # selection.classed(name[, value]) 这个操作是用来设置class属性值得便捷程序。
//   .attr("class", "point")

//   .attr("r", 10)
//   // // # selection.style(name[, value[, priority]])
//   .style("fill", "yellow")

//   .attr("cx", function(d){
//     return xScale(d.x);
//   })
//   .attr("cy", function(d){
//     return yScale(d.y);
//   })




// // 缩放与拖动

// var zoom = d3.zoom()
// 	//缩放最小和最大值
//     .scaleExtent([1, 40])
//     // 拖动范围
//     .translateExtent([[-100, -100], [800, 800]])
//     .on("zoom", zoomed);


// // 选取按钮，重置初始状态
// d3.select("button")
//     .on("click", resetted);


// // 缩放事件绑定元素
// vis.call(zoom)

// // zoom会触发平移和缩放事件
// function zoomed() {
// 	// 缩放事件触发之后，具体的操作
//   console.log('zoom', d3.event.transform);
//   // vis.select('.points-wrap').attr("transform", d3.event.transform);
//   // left.attr("transform", d3.event.transform);
//   // xAxisPlot.call(xAxis.scale(d3.event.transform.rescaleX(xScale)));
//   // yAxisPlot.call(yAxis.scale(d3.event.transform.rescaleY(yScale)));
// }




// function resetted() {
//   console.log('reset', d3.zoomIdentity)
//   vis.transition()
//       .duration(750)
//       .call(zoom.transform, d3.zoomIdentity);
// } 

// //  圆的缩放和平移都对应圆的位置的cx，cy的值得改变
// //  坐标轴的缩放对应比例尺的改变，平移对应transform的改变


// //  拖拽操作

// // var drag = d3.drag()
// // 	.









let mockData = Mock.mock({
	'data|4': [{
	    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
	    // ‘name|rule’:value
	    // 数值型的不需要@number
	    'list|20-30': [{
	        // 属性 id 是一个自增数，起始值为 1，每次增 1
	        // 'id|+1': 1,
	        // 'name'	   : '@cname',
	        // 'age|1-100': 100,
	        // 'color'	   : '@color',
	        // 'hehe'     : '@name',
	        // 'index|+1' : 1,
	        // 'index_name|5-10' : '@string',
	        // 'new_value|50000-60000' : 1
	    	// 后边的是控制小数点位数的
	    	'x|-20-50.1-10': 50,
	    	'y|-20-30.1-10': 30,
	    	'name': '@cname',
	    	'jc': '@string',

	    	'zdf|1-100.2': 100,
	    	'zcb|1-200.2': 200,
	    	'q5|5000-10000': 10000,
	    	'q10|2000-5000': 5000,
	    	'q20|1000-2000': 2000
	    }],
	    'color': '@color',
	    'title': '@string'
    }]
})

// console.log("mockData", JSON.stringify(mockData));



// 左侧的图，缩放事件绑定到svg上

function ScatterDiagram(container, params){
	this.container = d3.select(container);
	this.params = params;
	this.svg = {};
	this.wrap = {};
	this.store = {};
	return this;	
}

ScatterDiagram.prototype = {

	constructor: ScatterDiagram,

	// 初始化图表
	init: function(){
		let p = this.params;
		let self = this;
		// 长宽初始化
		this.svg = this.container
					.append('svg:svg')
					.attr('width', p.width)
					.attr('height', p.height)

		// 左侧svg添加内平移包裹层
		this.wrap = this.svg.append('g')
					.classed('zoom-drag-wrap', true)
		// 拿到数据进行后边的操作 
		this.getData(function(data){
			self.extend({data}); // 保存数据到store

			self.renderScale() // 得到参数
				.drawCoordinate() // 画坐标系
				.drawCircle() // 画圆
				// .bindDrag()
				.bindZoom() // 缩放事件更新svg，前提需要renderScale
				.bindMouseOver() // 鼠标上移事件
				.drawLegend() // 画legend
				.bindReset()
		});
		// 初始的缩放等级和缩放中心
		this.extend({ns: {k: p.scale, x: p.width * .5, y: p.height * .5}});
		return this;
	},	
	extend: function(obj){
		Object.assign(this.store, obj);
		return this;
	},
	getData: function(cb){
		
		// ajax get data 
		let data = mockData;

		cb(data);

	},

	// 缩放比例尺, 这里需要同时改变： 比例尺的长度，
	// 提示文字的位置，
	// 坐标轴标注的位置，
	// 坐标轴的零点对齐的位置
	// 得到的参数更新store，分别被不同的用途，初始化svg和更新svg
	renderScale: function(ns){
		let self = this;
		let p = this.params;
		let store = this.store;		
		let M;
		let scale;
		// 没有传参数就是默认的缩放比，传了参数就是zoomed的缩放比
		// 获取x|y最大最小值，用以确定比例尺的范围
		if(!!ns){
			M = store.maxAndMin;
			scale = ns.k;
		}else{
			// 初始化的时候必然会调用这个函数一次
			M = this.getMaxAndMin();
			scale = p.scale;
		} 

		// console.log("scale", scale);
		// console.log("M", M);					
		// scale比例尺是相对于整个svg的
		let width = p.width * scale;
		let height = p.height * scale;

		// axis组件可以将比例尺以可读的方式显示		
		// 缩放比，映射真实数据与显示的位置的关系
		// 注意d3的坐标原点在左上角，所以要反向比例y轴，得到左下角的坐标原点
		// 控制显示的范围，如下表示，坐标x轴显示-1 到 5 显示的区域是从 50 到 730

		// x轴缩放比例
		let xScale = d3.scaleLinear()
			.domain([M.xMax, M.xMin])
			.range([width - p.paddingHorizontal, p.paddingHorizontal]); 

		let yScale = d3.scaleLinear()
			.domain([M.yMin, M.yMax])
			.range([height - p.paddingVertical, p.paddingVertical]);

		// x axis
		let xAxis = d3.axisBottom(xScale).ticks(p.ticks);
		// y axis
		let yAxis = d3.axisLeft(yScale).ticks(p.ticks);

		// 计算使零点对齐的纵横坐标的偏移量
		let xOffset = M.yMax / (M.yMax - M.yMin) * ( height - 2 * p.paddingVertical ) + p.paddingVertical;
		let yOffset = (- M.xMin) / (M.xMax - M.xMin) * ( width - 2 * p.paddingHorizontal ) + p.paddingHorizontal;
		
		// 水平箭头的偏移量
		let right = width - p.paddingHorizontal;

		self.extend({renderScale: {xScale, yScale, xAxis, yAxis, xOffset, yOffset, right}});

		return this;

	},	

	// 绘制坐标轴
	drawCoordinate: function(){
		let p = this.params;
		let self = this;
		let store = this.store;
		let renderScale = store.renderScale;
		// 画出x轴
		let xAxisPlot = self.wrap.append("g")
			.attr("class", "axis axis-x")      
			// 这里可以控制坐标轴的对齐，需要按照比例来做
			// 控制坐标系的偏移位置就可以了，这里影响参数主要是分段数量和范围的大小，
			// 因此svg所占的空间的位置需要设置为变量，包括宽高和边距
			.attr("transform", `translate(0,${renderScale.xOffset})`)
			// 这里也可以后添加这个操作，把这个操作抽离出来
			.call(renderScale.xAxis) // 通过更改这里的调用的函数来更改坐标轴的缩放比例
			.append("text")  
			.text("涨跌幅%")    
			.attr("text-anchor","start")  
			.attr("dy","3em") 
			.attr("dx","3em") 
			// 添加三角形
			d3.select('.axis-x').append('path')
				.attr('d', 'M0,0L0,7L7,0L0,-7L0,0')
				.style('stroke-width', 0)
				.classed('arrow', true)
				.attr('transform', `translate(${renderScale.right}, 0)`)

		// 画出y轴
		let yAxisPlot = self.wrap.append("g")
			.attr("class", "axis axis-y")
			.attr("transform", `translate(${renderScale.yOffset}, 0)`)
			.call(renderScale.yAxis) 
			// 下边一堆都是用来添加坐标轴名称的
			.append("text")  
			.text("增仓率%")   
			.attr("text-anchor","end")  
			.attr("dy","3em") 
			.attr("dx","2em")

			// 添加三角形
			d3.select('.axis-y').append('path')
				.attr('d', 'M0,14L7,7L14,14L0,14')
				.style('stroke-width', 0)
				.attr('transform', 'translate(-7, 37)')

		return this;
	},
	// 画圆
	drawCircle: function(){
		let self = this;
		let p = this.params;
		let store = this.store;
		let data = this.store.data.data;
		let color;
		let dataArr;
		let renderScale = store.renderScale;
		let circleDatum;
		// 遍历分组
		data.forEach(function(item, index){
			color = item.color;
			dataArr = item.list;
			// 多种颜色，多个分组
			drawPoints(color, dataArr, index);
		});

		// 遍历分组中的元素
		function drawPoints(color, dataArr, index){
			let circleTitlePoint = self.wrap
				.append('g')
				.classed('point-groups', true)
				.classed(`type-${index}`, true)
				.selectAll(".point")
			  	.data(dataArr)
			  	.enter()
			  	.append('g')
			  	.classed('circle-title-point', true)
			// 圆
		  	circleTitlePoint.append("circle")
			  	.classed("point", true)
			  	.attr("r", p.circleR)
			  	.style("fill", color)
			  	.style('stroke', color)
			  	.style('stroke-opacity', 0.7)			  				  	
			  	// 位置偏移
			  	.attr("cx", function(d){			  		
			    	return renderScale.xScale(d.x);
			  	})
			  	.attr("cy", function(d){
			   	 	return renderScale.yScale(d.y);
			  	})	
			  	.datum(function(d){
			  		// 这里应该转为一个json字符串形式，保存节点要显示的内容
			  		return JSON.stringify(d);
			  	})
	  		// 添加提示文字
	  		circleTitlePoint.append('text')
		  		.attr('transform', function(d){
		  			return `translate(${renderScale.xScale(d.x)}, 
		  				${renderScale.yScale(d.y) - p.circleR - p.circleStrokeWidth})`
	  			})
			  	.text(function(d){
			  		return d.name
			  	})
				.attr("text-anchor","middle")
				.classed('name', true)  
			  	.datum(function(d){
			  		// 这里应该转为一个json字符串形式，保存节点要显示的内容
			  		return JSON.stringify({x: d.x,y: d.y});
			  	})

		}
		return this;
	},		
	// 主要是拿到更改的数据之后，刷新svg
	zoomUpdateSvg: function(ns){

		let self = this;
		let scale = ns.k;
		let p = this.params;
		let renderScale = self.store.renderScale;
		// 缩放肯定是改变已有的元素的状态来实现
		
		self.wrap.selectAll('.point')
			.each(function(){ // 遍历所有的圆点
				d3.select(this)
					.attr("cx", function(d){
						let obj = JSON.parse(d3.select(this).datum());
			    		return renderScale.xScale(obj.x);
		  			})
		  			.attr("cy", function(d){
						let obj = JSON.parse(d3.select(this).datum());
		    			return renderScale.yScale(obj.y);
		  			})		  			
			})
		self.wrap.selectAll('.name')
			.each(function(){
				d3.select(this)
		  		.attr('transform', function(d){
		  			let obj = JSON.parse(d3.select(this).datum());
		  			return `translate(${renderScale.xScale(obj.x)}, 
		  				${renderScale.yScale(obj.y) - p.circleR - p.circleStrokeWidth})`
	  			})
			})


		// 改变坐标轴的比例，需要改变相对位置和提示信息的位置



		// let xScale = d3.scaleLinear()
		// 			.domain([20, -20])
		// 			.range([1000*scale, 100]); 
		// let xAxis = d3.axisBottom(xScale).ticks(10);

		let xAxisPlot = d3.select('.axis-x')
		    .call(renderScale.xAxis)  
			.attr("transform", `translate(0,${renderScale.xOffset})`)
			.select('.arrow')
			.attr('transform', `translate(${renderScale.right}, 0)`)
		// let yScale = d3.scaleLinear()
		// 			.domain([20, -20])
		// 			.range([1000*scale, 100]); 

		// let yAxis = d3.axisLeft(yScale).ticks(10);

		let yAxisPlot = d3.select('.axis-y')
			.call(renderScale.yAxis)
			.attr("transform", `translate(${renderScale.yOffset}, 0)`)
			


			// self.wrap.select(".axis-x").attr('transform', `scale(${scale})`)
			// .call(store.xAxis.scale(scale));

			// self.wrap.empty()
			// self.getScale()
			// 	.drawCoordinate()
			// 	.drawCircle()
	},

	// 获取所传递的数据的最大最小值，用以创建比例尺
	getMaxAndMin: function (){
		let self = this;
		let mockData = self.store.data;
		let xArr = [];
		let yArr = [];
		mockData.data.forEach(function(item){
			item.list.forEach(function(i){
				xArr.push(i.x);
				yArr.push(i.y);
			});
		});
		let xMax = Math.max.apply(Math, xArr);
		let xMin = Math.min.apply(Math, xArr);
		let yMax = Math.max.apply(Math, yArr);
		let yMin = Math.min.apply(Math, yArr);

		let maxAndMin = {xMax, xMin, yMax, yMin}
		// 保存到store
		self.extend({maxAndMin});
		// 直接返回
		return maxAndMin;
	},

	bindZoom: function(){
		let self= this;
		let store = this.store;

		// 事件对象初始化
		let zoom = d3.zoom()
		    .scaleExtent([1, 10])
		    .on("zoom", zoomed);
		// 事件绑定
		self.svg
			.call(zoom)
			.transition()
      		.duration(1500)

		// 缩放|平移处理函数，使用drag事件拿不到平移的距离
		function zoomed() {
			// console.log('zoomed', d3.event)
			let ns = d3.event.transform;
			// 直接使用zoomed来处理平移事件似乎更方便
			self.wrap.attr("transform", `translate(${ns.x}, ${ns.y})`);
			// 传入缩放事件的，缩放比例和偏移的坐标，使用下边的函数来处理缩放引起的变化
			self.changeZoomAndTransform(ns);

		}
		return this;
	},

	changeZoomAndTransform: function(obj){

		let self = this;

		console.log("changeZoomAndTransform", obj)

		let ns = Object.assign({}, self.store.ns, obj);
		this.store.ns = ns;

		// console.log(svgChart)

		self
			.renderScale(ns) // 更新位置参数
			.zoomUpdateSvg(ns);// 拿到位置参数更改样式
	},

	bindDrag: function(){
		let self = this;

		self.wrap.call(d3.drag()
        	.on("drag", dragged));

		let offsetX;
		let offsetY;

		function dragged(d) {
		  offsetX = d3.event.x - d3.event.subject.x;
		  offsetY = d3.event.y - d3.event.subject.y;

		  // self.wrap.attr("transform", `translate(${offsetX}, ${offsetY})`);
		}
		return this;
	},
	bindMouseOver: function(){
		let self = this;
		let p = this.params;


		let cx;
		let cy;

		let translateX;
		let translateY;
		let dataObj;
		// 获取zoom-drag-wrap的偏移量
		
		

		d3.selectAll('.point')

		    // .on("click",function(d,i){ 
		    // 	console.log("click"); 
		    //     d3.select(this)  
		    //         .style("fill","green")
		    //   //       .append("div")
    		// 		// .text('click');
  					  
		    // })  
	    .on("mouseover",function(d,i){  
	    	
	    	console.log(p)
	    	let offsetX = $('body').width() > 1200 ? ($('body').width() - 1200) * .5 : 0;
	    	let offsetY = 80;
	    	// console.log("mouseover", d3.select('.zoom-drag-wrap')); 
	    	// console.log("d", d);
	    	// console.log("cx", +d3.event.pageX)
	    	// 需要传入数值型
	    	// let r = 2 * p.circleR + p.circleStrokeWidth;
	    	// console.log("d3.select(this)", JSON.parse(d3.select(this).datum()))
	    	

	    	dataObj = JSON.parse(d3.select(this).datum());

	    	$("#tips").show(300).css({'left': + d3.event.pageX - offsetX + p.circleR + p.circleStrokeWidth, 
	    		'top': + d3.event.pageY - offsetY})
	    		.find('.pzjc').text(dataObj.jc).end()
	    		.find('.zdf').text(dataObj.zdf).end()
	    		.find('.zcb').text(dataObj.zcb).end()
	    		.find('.q5').text(dataObj.q5).end()
	    		.find('.q10').text(dataObj.q10).end()
	    		.find('.q20').text(dataObj.q20)

	        d3.select(this) 
			  	.attr("r", p.circleR)
			  	.style('stroke-width', p.circleStrokeWidth)
	    })  
	    .on("mouseout",function(d,i){    	
	        d3.select(this)  
			  	.attr("r", p.circleR)
			  	.style('stroke-width', 0)
	            .transition()  
	            .duration(300)   
	    	$("#tips").hide(300);
	    })
	    return this;
	},
	bindReset: function(){
		let self = this;	
		let ident = d3.zoomIdentity;
		// $('.reset').click(function(e){

		// 	resetted();
		// })	
		
		// function resetted() {
		//   console.log('reset', d3.zoomIdentity)
		// 	console.log("self", self)
		// 	let zoom = d3.zoom()
		// 	    .scaleExtent([1, 10])
			    
		// 	  	self.wrap
		//   		// .attr('transform', `rotate(${ident.k})`)
		//       	// .attr('transform', `translate(${ident.x}, ${ident.y})`)
		//       	.call(zoom.transform, d3.zoomIdentity);
		// }
		return this;
	},
	// 绘制右侧的legend
	drawLegend: function(){
		// 只能左右分开写两个svg了
		let p = this.params;
		let data = this.store.data.data;
		// 提示框显示的位置，控制在左右判断一下
		let rightSvg = d3.select('#SvgChartRight')
			.append('svg:svg')
			.attr('width', p.rightWidth)
			.attr('height', p.height)
			.append('g')
			.classed('legend-wrap', true)
			.attr('transform', `translate(30, ${p.height * .3})`)
		let d3this;
		// 右侧部分绘制legend
		let legend = rightSvg
			.selectAll('.legend')			
			.data(data)
			.enter()
			.append('g')
			.classed('legend', true)
			.attr('width', 150)
			.attr('height', 20)
			// 点击事件 		
		    .on("click",function(d, i){ 
		    	d3this = d3.select(this)
	    	    if(d3this.classed('hide')){
	    	    	d3this.classed('hide', false)
	    	    		.select('circle')
	    	    		.style('fill', 
	    	    			function(d, i){
	    	    				return d.color
	    	    			}
    	    			)
	    	    		.call(function(){
	    	    			d3.select('.zoom-drag-wrap')
    	    					.select(`.type-${i}`)
    	    					.style('display', 'block');
    	    				}, 
    	    				d, i)
	    	    }else{
	    	    	d3this.classed('hide', true)
	    	    		.select('circle')
	    	    		.style('fill', 'grey')
	    	    		.call(function(){
	    	    			d3.select('.zoom-drag-wrap')
    	    					.select(`.type-${i}`)
    	    					.style('display', 'none');
    	    				}, 
    	    				d, i)
	    	    } 					  
		    })
		    .attr('cursor', 'pointer')


		legend
			.append('circle')
			.style('fill', function(d){
				return d.color;
			})
			.attr("r", p.circleR)
			.attr("cx", function(d,i){
				return 10;
			})
			.attr("cy", function(d, i){
				return (i + 1) * 30 - 1;
			})


		legend
			// 添加文本
			.append('text')
			.text(function(d){
				return d.title
			}) 
			.attr("transform","rotate(0)")  
			.attr("text-anchor","start")  
			.attr("x", 30)
			.attr("y", function(d, i){
				return (i + 1) * 30 + 3;
			})
		   .attr("font-family", "sans-serif")
		   .attr("font-size", "11px")
	    return this
	}
}


let svgChart = new ScatterDiagram('#SvgChartLeft', {
	width: 1000,
	height: 460,
	paddingHorizontal: 50,
	paddingVertical: 50,
	scale: 1,
	ticks: 10,
	circleR: 10,
	circleStrokeWidth: 8,
	rightWidth: 200

}).init();

console.log(svgChart)

// 按钮事件操作
$('.hide').click(function(e){
	let $this = $(this);
	$this.toggleClass('show');
	if($this.hasClass('show')){
		d3.selectAll('.name').style('display', 'none');
	}else{
		d3.selectAll('.name').style('display', 'block');   			
	}
});

// $('.increase').click(function(e){
// 	let k = svgChart.store.ns.k + 1;
// 	svgChart.changeZoomAndTransform({k: k});
// });

$('.reset').click(function(e){
	$("#SvgChartLeft").html("");
	$("#SvgChartRight").html("");
	svgChart.init();
})






   // 模拟数据
let data2 = Mock.mock({
	'data1|20': ['@natural(3000, 10000)'],
	'data2|20': ['@natural(60000, 100000)'],
	'date|20': ['@date("yyyy/MM/dd")'],
	'name|20': ['@name'],
	'data3|20': ['@natural(-60000, 100000)']
})
// console.log(`data2: `, JSON.stringify(data2))

// echarts 图表的设置
// 加载一个只包含饼图和折线的库
renderEcharts2('Echarts2', data2);

function renderEcharts2(container, data){

   	var myChart = echarts.init(document.getElementById(container));
	let	option = {
			color: ["#1d9bff"],
			// backgroundColor: "#1d222a",
			// 提示框
		    tooltip: {
		        show: !0,
		        // formatter: function(t) {
		        //     var a = '<span style="font-size:14px; color: #81b0ff;">' + t[0].name + "</span><br />" + e.yAxisName + ":" + t[0].value + "%";
		        //     return a
		        // },
		        trigger: "axis"
		    },
		    legend: {
		        data:['成交量(万)','持仓量(万)'],
		        bottom: '10px',
		        textStyle: {
		        	color: '#18529e'
		        },
		        width: '100%',
		        left: '80px'
		    },
		    grid: {
		    	borderWidth: 0,
		    	container: false,
		    	top: "30px",
		    	left: '80px',
		    	right: '30px',
		    	bottom: '100px'

		    },
		    xAxis: {
		    	type: 'category',
		    	data: data.date,
		        // name: "行业",
		        nameTextStyle: {
		            color: "#333"
		        },
		        axisLine: {
		        	onZero: false,
		            lineStyle: {
		                color: "#797979"
		            }
		        },
		        axisTick: {
		            length: 3,
		            lineStyle: {
		                color: "#797979"
		            },
		            alignWithLabel: !0
		        },
		        axisLabel: {
		            margin: 15,
		            interval: 0,
		            textStyle: {
		                color: "#dbdbd"
		            },
		            rotate: 45
		        },
		        boundaryGap: !0
	        },
		    yAxis: {
                type: "value",
                name: "(万)手",
                scale: true,   //放大聚焦纵轴 
                nameTextStyle: {
                    color: "#333"
                },
                splitNumber: 10, 
                axisLine: {                	
                    lineStyle: {
                        color: "#797979"
                    }
                },
                axisTick: {
                    length: 3,
                    lineStyle: {
                        color: "#797979"
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: "#797979"
                    }
                },   
                splitLine: {
                    show: !1
                },
                // splitArea: {
                //     show: !0,
                //     areaStyle: {
                //         color: ["#1d222a", "#202630"]
                //     }
                // }
		    },
		    series: [
		        {
		            name:'成交量(万)',
		            type:'bar',
		            data: data.data1,
		            itemStyle: {
                        normal: {
                            color: '#c23531'
                        }
                    },
                    barWidth: "16"
		        },
		        {
		            name:'持仓量(万)',
		            type:'line',
		            data:data.data2,		            
		            itemStyle: {
                        normal: {
                            color: '#2f4554'
                        }
                    }
		        }
		    ]
		}
		myChart.setOption(option);
   }


// 第三个图
renderEcharts3('Echarts3', data2);

function renderEcharts3(container, data){

   	var myChart = echarts.init(document.getElementById(container));
	let	option = {
			color: ["#1d9bff"],
			// backgroundColor: "#1d222a",
			// 提示框
		    tooltip: {
		        show: !0,
		        // formatter: function(t) {
		        //     var a = '<span style="font-size:14px; color: #81b0ff;">' + t[0].name + "</span><br />" + e.yAxisName + ":" + t[0].value + "%";
		        //     return a
		        // },
		        trigger: "axis"
		    },
		    // legend: {
		    //     data:['成交量(万)','持仓量(万)'],
		    //     bottom: '10px',
		    //     textStyle: {
		    //     	color: '#18529e'
		    //     },
		    //     width: '100%',
		    //     left: '80px'
		    // },
		    grid: {
		    	borderWidth: 0,
		    	container: false,
		    	top: "30px",
		    	left: '80px',
		    	right: '30px',
		    	bottom: '100px'

		    },
		    xAxis: {
		    	type: 'category',
		    	data: data.name,
		        // name: "行业",
		        nameTextStyle: {
		            color: "#333"
		        },
		        axisLine: {
		        	onZero: false,
		            lineStyle: {
		                color: "#797979"
		            }
		        },
		        axisTick: {
		            length: 3,
		            lineStyle: {
		                color: "#797979"
		            },
		            alignWithLabel: !0
		        },
		        axisLabel: {
		            margin: 15,
		            interval: 0,
		            textStyle: {
		                color: "#dbdbd"
		            },
		            rotate: 45
		        },
		        boundaryGap: !0
	        },
      //       yAxis: {
		    //     type: 'log',
		    //     name: 'y'
		    // },
		    yAxis: {
                type: "log",
                // name: "(万)手",
                scale: true,   //放大聚焦纵轴 
                nameTextStyle: {
                    color: "#333"
                },
                // splitNumber: 10, 
                axisLine: {                	
                    lineStyle: {
                        color: "#797979"
                    }
                },
                axisTick: {
                    length: 3,
                    lineStyle: {
                        color: "#797979"
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: "#797979"
                    }
                },   
                splitLine: {
                    show: !1
                },
                // splitArea: {
                //     show: !0,
                //     areaStyle: {
                //         color: ["#1d222a", "#202630"]
                //     }
                // }
		    },
		    series: [
		        {
		            name:'成交量(万)',
		            type:'bar',
		            data: data.data1,
		            itemStyle: {
                        normal: {
                            color: '#c23531'
                        }
                    },
                    barWidth: "16"
		        },
		        // {
		        //     name:'持仓量(万)',
		        //     type:'line',
		        //     data:data.data2,		            
		        //     itemStyle: {
          //               normal: {
          //                   color: '#2f4554'
          //               }
          //           }
		        // }
		    ]
		}
	
// let option = {
//     title: {
//         text: '对数轴示例',
//         left: 'center'
//     },
//     tooltip: {
//         trigger: 'item',
//         formatter: '{a} <br/>{b} : {c}'
//     },
//     legend: {
//         left: 'left',
//         data: ['2的指数', '3的指数']
//     },
//     xAxis: {
//         type: 'category',
//         name: 'x',
//         splitLine: {show: false},
//         data: data.date
//     },
//     grid: {
//         left: '3%',
//         right: '4%',
//         bottom: '3%',
//         containLabel: true
//     },
//     yAxis: {
//         type: 'log',
//         name: 'y'
//     },
//     series: [
//         {
//             name: '3的指数',
//             type: 'bar',
//             data: data.data1
//         }
//     ]
// };



		myChart.setOption(option);
   }

// 4、5
renderEcharts4_5('Echarts4', data2);
renderEcharts4_5('Echarts5', data2);

function renderEcharts4_5(container, data){	
   	var myChart = echarts.init(document.getElementById(container));
	let	option = {
			color: ["#1d9bff","f00"],
			// backgroundColor: "#1d222a",
			// 提示框
		    tooltip: {
		        show: !0,
		        // formatter: function(t) {
		        //     var a = '<span style="font-size:14px; color: #81b0ff;">' + t[0].name + "</span><br />" + e.yAxisName + ":" + t[0].value + "%";
		        //     return a
		        // },
		        trigger: "axis"
		    },
		    // legend: {
		    //     data:['成交量(万)','持仓量(万)'],
		    //     bottom: '10px',
		    //     textStyle: {
		    //     	color: '#18529e'
		    //     },
		    //     width: '100%',
		    //     left: '80px'
		    // },
		    grid: {
		    	borderWidth: 0,
		    	container: false,
		    	top: "30px",
		    	left: '80px',
		    	right: '30px',
		    	bottom: '100px'

		    },
		    xAxis: {
		    	type: 'category',
		    	data: data.name,
		        // name: "行业",
		        nameTextStyle: {
		            color: "#333"
		        },
		        axisLine: {
		        	onZero: true,
		            lineStyle: {
		                color: "#797979"
		            }
		        },
		        axisTick: {
		            length: 3,
		            lineStyle: {
		                color: "#797979"
		            },
		            alignWithLabel: !0
		        },
		        axisLabel: {
		            margin: 15,
		            interval: 0,
		            textStyle: {
		                color: "#dbdbd"
		            },
		            rotate: 45
		        },
		        boundaryGap: !0
	        },
		    yAxis: {
                type: "value",
                // name: "(万)手",
                scale: true,   //放大聚焦纵轴 
                nameTextStyle: {
                    color: "#333"
                },
                splitNumber: 10, 
                axisLine: {                	
                    lineStyle: {
                        color: "#797979"
                    }
                },
                axisTick: {
                    length: 3,
                    lineStyle: {
                        color: "#797979"
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: "#797979"
                    }
                },   
                splitLine: {
                    show: !1
                },
                // splitArea: {
                //     show: !0,
                //     areaStyle: {
                //         color: ["#1d222a", "#202630"]
                //     }
                // }
		    },
		    series: [
		        {
		            name:'成交量(万)',
		            type:'bar',
		            data: data.data3,
		            itemStyle: {
                        // normal: {
                        //     color: '#c23531'
                        // }
                    	normal: {
                    		color: function(a){
                    			if(a.value >= 0){
                    				return '#c23531'
                    			}else{
                    				return '#4bb1a6'
                    			}                    			
                    		}
                    	}
                    },
                    barWidth: "16"
		        }
		    ]
		}
		console.log(option)
		myChart.setOption(option);
	}

})



// $.get('/thsft/iFindService/Realty/industry-overview/get-map-data',
// 	function(res){
// 		console.log(res.data);
// }, 'json');