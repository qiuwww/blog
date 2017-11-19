// TableStore.js
// 用于保存整个这一块的需要交互改变的数据
// 这里边的函数是同步执行的，但是变量的改变需要在重新渲染之后才能得到
import mobx, { observable, computed, action } from 'mobx';

// 定义可观察的属性和方法，需要的时候使用inject来注入到组件中
export default class TableStore {

	@observable value = ''; /* MobX managed instance state */
	@observable currentSelect = [];
	@observable testAttribute = 123123;

	@action.bound	
	changeValue2() {
		console.log("storeChange1: ", this.testAttribute)		
		this.testAttribute = 13212313123123121;
		console.log("storeChange2: ", this.testAttribute)		

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
}