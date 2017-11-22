// TableStore.js
// 用于保存整个这一块的需要交互改变的数据
// 这里边的函数是同步执行的，但是变量的改变需要在重新渲染之后才能得到


// 先把垂直方向上做好



import mobx, { observable, computed, action } from 'mobx';
import tableConfig from '../config/tableConfig.js';

// 定义可观察的属性和方法，需要的时候使用inject来注入到组件中
class TableStore2 {

	constructor() {
		// 静态属性
		this.dataLength = {
			row: '',
			col: ''
		};
		
		this.multiple = tableConfig.multiple;

	}

	@observable value = ''; /* MobX managed instance state */
	@observable currentSelect = [];
	@observable testAttribute = 123123;

	@action.bound	
	changeValue2() {
		this.testAttribute = 13212313123123121;
	}

	@action.bound
	getTableData() {
		this.data = [{
			a: 123,
			b: 234
		},
		{
			a: 456,
			b: 567
		}]
	}
	@action.bound	
	changeValue(value) {
		this.currentSelect.push(value);
	}
	// // 转换mobx观察对象为js标准对象, 生成一个新的可用的属性，只用了这一次
	// 这里的getter函数不可以传参数
	// @computed
	// get converterToJsObj(mobxObj) {
	// 	return mobx.toJS(mobxObj);
	// }

	@observable synchronizePosition = {
		scrollLeft: 0,
		scrollTop: 0
	};
	@action.bound
	synchronizeFunc({scrollLeft, scrollTop}) {
		this.synchronizePosition = {scrollLeft, scrollTop};
	}
	@computed
	get synchronizePositionToJsObj() {
		return mobx.toJS(this.synchronizePosition);
	}


	

	// 配置middleWrap的宽高
	@observable WH = {};
	@action.bound
	getMiddleWrapWH(WH) {
		this.WH = WH;
	}
	@computed
	get WHToJsObj() {
		return mobx.toJS(this.WH);		
	}


	// 记忆当前位置，就是触发的时候的位置信息，在下一次触发的时候更新
	@observable	memoryPosition = {
		scrollLeft: 0,
		scrollTop: 0
	};
	@action.bound
	changeMemoryPosition(memoryPosition){
		this.memoryPosition = memoryPosition;
	}
	@computed
	get memoryPositionToJsObj() {
		return mobx.toJS(this.memoryPosition);		
	}
	// 定义显示数据的范围, 顺便初始化
	@observable range = tableConfig.tableRange;
	// 改变范围的函数，滚动的时候改变这个值
	@action.bound
	changeRange(range){
		this.range = range;
	}
	// 使用
	@computed
	get rangeToJsObj() {
		return mobx.toJS(this.range);		
	}

	// 滚动rightBottom的时候的处理函数
	@action.bound
	scrollHandler(e){
    	let target = e.target;
    	// 左侧滚动的时候，委托给右侧，需要添加在body上才可以检测出来，后边再说
    	if(target === document.querySelector('.left.bottom')[0]) {
    		target = document.querySelector('.right.bottom')[0];
    	}

    	let table = target.getElementsByTagName('table')[0];

    	// 当前目标元素滚动之后的位置
    	let scrollLeft = parseInt(target.scrollLeft);

    	let scrollTop = parseInt(target.scrollTop);

		let position = {scrollLeft, scrollTop};

		// 同步左下与右上
    	this.synchronizeFunc(position);
    	// 检测是否触发滚动事件
    	this.computeRange(position, target);
    		

	}

	// table的位置偏移参数
	@observable tableStyle = {
		scrollLeft: 0,
		scrollTop: 0
	};
	// 计算函数，计算变动后的范围, 使用滚动到的位置对比总的长宽来确定范围
	@action.bound
	changeTableStyle(tableStyle){
		this.tableStyle = tableStyle;
	}
	@computed
	get tableStyleToJsObj() {
		return mobx.toJS(this.tableStyle);		
	}

	computeRange({scrollLeft, scrollTop}, target) {
		// 计算变动之后，需要加载的数据的范围，覆盖range
		let multiple = this.multiple;
		let memoryPosition = this.memoryPositionToJsObj; 
		// 总的长宽， 本次渲染固定的值就不需要当参数传过来了
    	let { W, H } = this.WHToJsObj;
		let rowSkip = tableConfig.tableRange.rowEnd;	
		let colSkip = tableConfig.tableRange.colEnd	
		let tbodyWidth = colSkip * tableConfig.cellWH.W;
		let tbodyHeight = rowSkip * tableConfig.cellWH.H;
    	let { row, col } = this.dataLength;

    	// 上下左右的位置到达触发    	
    	(() => {
			// 可视区域的宽高
			let viewHeight = 440;
			let viewWidth = 930;
    		// 当前左上角距离顶部的距离和底部的距离，限制范围
    		// 以左上角为基准点
			// 这里的tbody的高度要动态计算出来，不能一成不变的，当加载到后边的时候，数据两比较少了，需要缩小高度
			// 滑到顶的时候加载 当前值 + 下一组      滑到中间的时候 前一组 + 当前值 + 后一组    滑到最后的时候   前一组 + 当前值
			// 对应的显示框的位置   起始位置 0                           当前值对应的位置                            底部对齐
    		let bottomPoint = memoryPosition.scrollTop + (multiple - 1) * tbodyHeight; // 下边缘坐标
    		let topPoint = memoryPosition.scrollTop - multiple * tbodyHeight; // 上边缘坐标

    		// 超限处理
    		if(topPoint <= 0) {
				topPoint = 0;
			}
    		if(bottomPoint >= H - viewHeight) {
				bottomPoint = H - viewHeight;
			}

    		let rightPoint = memoryPosition.scrollLeft + (multiple - 1) * tbodyWidth; // 右边缘坐标   		
    		
    		let leftPoint = memoryPosition.scrollLeft - multiple * tbodyWidth; // 左边缘坐标

    		if(leftPoint <= 0) leftPoint = 0;

    		if(rightPoint >= W - tbodyWidth) rightPoint = H - tbodyWidth;
    		
    		console.log('边界变化：', {
    			scrollTop,
    			topPoint,
    			bottomPoint,
    			leftPoint,
    			rightPoint,
    			scrollLeft,
    			tbodyHeight,
    			tbodyWidth,
				W,
				H
    		});

    		let range = this.rangeToJsObj;
    		let { rowStart, rowEnd, colStart, colEnd} = range;
    		let memoryL = memoryPosition.scrollLeft;
    		let memoryT = memoryPosition.scrollTop;
    		// 判断是不是在这个范围内
    		// 垂直运动
			// 这个时候需要减去可视区域的高度
    		if(scrollLeft == memoryL){
    			if(scrollTop < topPoint){ // 向上滚动
	    			range['rowStart'] = rowStart - rowSkip * (multiple - 1);
	    			range['rowEnd'] = rowEnd + rowSkip * (multiple - 1);
	    			scrollTop = topPoint;
    			}else if(scrollTop > bottomPoint){ // 向下滚动
					rowStart = rowStart - rowSkip * (multiple - 1);
					if(rowStart <= 0) {
						rowStart = 0;
					}
	    			range['rowStart'] = rowStart;
	    			rowEnd = rowEnd + rowSkip * (multiple - 1);
	    			if(rowEnd >= row * multiple) {
	    				rowEnd = row / multiple;
	    			}

	    			range['rowEnd'] = rowEnd;
	    			console.log('向下滚动的时候的行列限制：', range);
	    			// range['rowEnd'] = rowEnd + rowSkip * (multiple - 1);
	    			scrollTop = bottomPoint;	    			
    			}else if(scrollTop == 0){
	    			range['rowStart'] = rowStart;
	    			range['rowEnd'] = rowEnd;
	    			scrollTop = 0;
    			}else{
    				return false;
    			}
    		// 水平运动
    		}else if(scrollTop == memoryT){
    			if(scrollLeft < leftPoint){ // 向左滚动
	    			range['colStart'] = colStart - colSkip;
	    			range['colEnd'] = colEnd - colSkip;
	    			scrollLeft = leftPoint; 
    			}else if(scrollLeft > rightPoint){ // 向右滚动
	    			range['colStart'] = colStart + colSkip;
    				range['colEnd'] = colEnd + colSkip;
	    			scrollLeft = rightPoint;     				
				}else if(scrollLeft == 0){
    				range['colStart'] = colStart;
    				range['colEnd'] = colEnd;
    				scrollLeft = 0;
    			}else{
    				return false;
    			}
    		}
			// 滚动了外层middleWrap到准确的位置
    		target.scrollTop = scrollTop;
    		target.scrollLeft = scrollLeft;

    		// 更改相对位置，对应的移动内层table的定位, 这里的位置需要计算一下，规整一点
			this.changeMemoryPosition({scrollLeft, scrollTop});
			// 改变内层table的位置
			// 限制范围要明确, 移动显示范围的位置，同上，需要与上边保持一致，同时调整底层div的位置
			this.changeTableStyle({scrollLeft, scrollTop}); // 需要对准 


			this.changeLoadingState();
    		setTimeout(() => {
	    		console.log("更改后的显示范围： ", range);
	    		this.changeRange(range);

				this.changeLoadingState();
    		},2000); 
    		return true
		})();
	}	

	// loading显示控制变量
	@observable isLoadingShow = false;
	@action.bound
	changeLoadingState(){
		this.isLoadingShow = !this.isLoadingShowToJsObj;
	}
	// 使用
	@computed
	get isLoadingShowToJsObj() {
		return mobx.toJS(this.isLoadingShow);		
	}
	
}