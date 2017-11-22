// TableStore.js


import mobx, { observable, computed, action } from 'mobx';
import tableConfig from '../config/tableConfig.js';

// 定义可观察的属性和方法，需要的时候使用inject来注入到组件中
export default class TableStore {

	constructor() {
		// 静态属性
		this.config = {
			
		}

	}




	// table总的数据，添加观察《定义》这里的数据，除了第一页20条，后边的都是40条
	@observable tableAllData = {
		rightTop: [],
		leftBottom: [],
		rightBottom: []
	}; 
	// 填充这里，这里获取页面的总的数据 《改变》
	@action.bound
	initTableAllData(data) {
		// 拿到总的数据，需要做如下操作
		this.tableAllData = data;
	}
	// 转为js对象，以便在页面处理中用到 《使用》
	@computed
	get tableAllDataToJsObj() {
		return mobx.toJS(this.tableAllData);
	}

	// 滚动条事件
	// 滚动rightBottom的时候的处理函数
	@action.bound	
	scrollHandler(e){
    	let target = e.target;
    	// 左侧滚动的时候，委托给右侧，需要添加在body上才可以检测出来，后边再说
    	// if(target === document.querySelector('.left.bottom')[0]) {
    	// 	target = document.querySelector('.right.bottom')[0];
    	// }

    	// let table = target.getElementsByTagName('table')[0];

    	// 当前目标元素滚动之后的位置
    	let scrollLeft = parseInt(target.scrollLeft);

    	let scrollTop = parseInt(target.scrollTop);

		let position = {scrollLeft, scrollTop};

		// 同步左下与右上
    	this.synchronizeFunc(position);
  		
	}
	// 处理滚动条跟随的问题
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
	// 左右关联操作，hover和点击事件
	onMouseEnter(e) {
		e.stopPropagation();
		let target = e.target;
		if(target.tagName == 'TD'){
			let parentTr = target.parentNode;
			let index = parentTr.dataset.index;
			parentTr.setAttribute('class', 'currentHover');		
		}
	}
	onMouseLeave(e) {
		e.stopPropagation();
		let target = e.target;		
		if(target.tagName == 'TD'){
			let parentTr = target.parentNode;			
			parentTr.removeAttribute('class', 'currentHover');		
		}
	}
	trClickHandler(e) {
		debugger

		e.stopPropagation();
		let target = e.target;
		if(target.tagName == 'TD'){
			let parentTr = target.parentNode;
			let index = parentTr.dataset.index;
			// 移除兄弟节点的这个属性
			parentTr.parentNode.querySelectorAll('tr.trSelect')[0].removeAttribute('class', 'trSelect');
			parentTr.setAttribute('class', 'trSelect');		
		}
	}

}