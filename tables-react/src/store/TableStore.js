// TableStore.js


import mobx, { observable, computed, action } from 'mobx';
import tableConfig from '../config/tableConfig.js';

// 定义可观察的属性和方法，需要的时候使用inject来注入到组件中
export default class TableStore {

	constructor() {
		// 静态属性
		this.config = {
			
		};
		// 这个根据第一次得到的数据计算，不随着frequency变化
		this.flag = '';

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
		this.changeFrequency(data.frequency);
	}
	// 转为js对象，以便在页面处理中用到 《使用》
	@computed
	get tableAllDataToJsObj() {
		return mobx.toJS(this.tableAllData);
	}

	// 编辑来改变初始化的对象
	// index, leftBottom的数组的index； text是要改变的数据
	@action.bound	
	editChangeAllData(index) {
		this.tableAllData.leftBottom[index]["title"] = text;
	}


	// 滚动条事件
	// 滚动rightBottom的时候的处理函数
	@action.bound	
	scrollHandler(e){
    	let target = e.currentTarget;
    	// 左侧滚动的时候，委托给右侧，需要添加在body上才可以检测出来，后边再说
    	// if(target === document.querySelector('.left.bottom')[0]) {
    	// 	target = document.querySelector('.right.bottom')[0];
    	// }

    	// let table = target.getElementsByTagName('table')[0];

    	// 当前目标元素滚动之后的位置
    	let scrollLeft = parseInt(target.scrollLeft);

    	let scrollTop = parseInt(target.scrollTop);

		let position = {scrollLeft, scrollTop};

		// 同步左下与右上, 为什么这里可以调用this
    	this.synchronizeFunc(position);
  		
	}

	// 处理滚动条跟随的问题
	@observable synchronizePosition = {
		scrollLeft: 0,
		scrollTop: 0
	};
	@action.bound
	synchronizeFunc({scrollLeft, scrollTop}) {
		Object.assign(this.synchronizePosition, {scrollLeft, scrollTop});
	}
	@computed
	get synchronizePositionToJsObj() {
		return mobx.toJS(this.synchronizePosition);
	}
	// 左右关联操作，hover和点击事件
	@action.bound		
	trEvent(type, index, e) {
		e.stopPropagation();
		let target = e.currentTarget;
		if(target.tagName == 'TR'){		
			if(type === 'mouseenter'){
				trChange(index, 'currentHover');
			}else if(type === 'mouseleave'){
				trChange(index, 'currentHover', true);
			}else if(type === 'click') {
				trChange(index, 'trSelect');				
			}
		}
		function trChange(index, className, isLeave) {
			index = parseInt(index) + 1;
			let leftBottomTr = document.querySelectorAll('.left.bottom tr:nth-child(' + index +')')[0];
			let rightBottomTr = document.querySelectorAll('.right.bottom tr:nth-child(' + index +')')[0];
			let trSelectLB = document.querySelectorAll('.left.bottom ' + '.' + className)[0];
			let trSelectRB = document.querySelectorAll('.right.bottom ' + '.' + className)[0];
			trSelectLB && trSelectLB.classList.remove(className);
			trSelectRB && trSelectRB.classList.remove(className);
			!isLeave && leftBottomTr && leftBottomTr.classList.add(className);
			!isLeave && rightBottomTr && rightBottomTr.classList.add(className);
		}
	}
	// 制定操作事件
	@action.bound
	toTopHandler(index, e) {
		e.stopPropagation();
		console.log('toTopHandler:', index);
	}

	// 编辑自定义指标的名称
	@action.bound
	editHandler(index, e) {
		e.stopPropagation();
		let target = e.currentTarget;
		// 这里来切换input的显示与隐藏，显示的时候，span元素是被挤到看不到的位置		
		let td = target.parentNode.parentNode;
		let input = td.querySelector('input');
		let span = td.querySelector('span');
		// debugger
		let text = span.innerText;
		if (input.classList.contains('hide')) {
			input.classList.remove('hide');
			this.changeCurrentIndexText(text);
		}else{
			input.classList.add('hide');
			this.changeCurrentIndexText('');			
		}
	}
	// 当前编辑的指标名称的缓存
	@observable currentIndexText = '';
	@computed 
	get currentIndexTextToJsObj() {
		return mobx.toJS(this.currentIndexText);
	}
	// 编辑输入框的input change事件
	@action.bound
	changeCurrentIndexTextHandler(index, e) {
		e.stopPropagation();
		let target = e.currentTarget;
		this.changeCurrentIndexText(target.value, index);
	}
	// 改变当前值的函数
	@action.bound
	changeCurrentIndexText(currentIndexText, index) {
		this.currentIndexText = currentIndexText;
		// 同步改变tableAllData
		if(index != undefined){
			this.editChangeAllData(index, currentIndexText);
		}
	}

	// 删除操作
	@action.bound
	deleteHandler(index, e) {
		e.stopPropagation();
		console.log('deleteHandler:', index);
		this.changeDialogstate();
	}

	// 打开弹框
	@observable openDialog = false;
	@computed
	get openDialogToJsObj() {
		return mobx.toJS(this.openDialog);
	}
	// 对话框关闭操作
	@action.bound
	changeDialogstate() {
		this.openDialog = !this.openDialogToJsObj;
	}

	// 打开计算弹框
	@observable computeIndexOpen = false;
	@computed
	get computeIndexToJsObj() {
		return mobx.toJS(this.computeIndexOpen);
	}
	@action.bound
	changeComputeState() {
		this.computeIndexOpen = !this.computeIndexToJsObj;
	}

	
	// 确认按钮的事件处理
	@action.bound
	beSureHandler(type, e) {
		e.stopPropagation();
		console.log('type', type);
		// 这里区分类型，做不同的处理
	}	

	@observable dialogType = 5;
	@action.bound
	changeDialogType(type) {
		this.dialogType = type;
	}
	@computed
	get dialogTypeToJsObj() {
		return mobx.toJS(this.dialogType);
	}

	// 被删除的指标名称 
	@observable deleteIndex = '';
	@computed
	get deleteIndexToJsObj() {
		return mobx.toJS(this.deleteIndex);
	}
	@action.bound
	changeDeleteIndex(deleteIndex) {
		this.deleteIndex = deleteIndex;
	}

	// 打开基本的对话框
	@action.bound // 把这个函数绑定到当前的对象上
	openDialogEvent({type, text}, e) {
		// 修改type， 说明弹框的类型及参数
		this.changeDialogType(type);
		// 一些特殊处理，删除指标的问题
		!!text && this.changeDeleteIndex(text);
		// 打开弹框, 控制弹框显示与隐藏
		this.changeDialogstate();
	}


	// 当前选择的频率
	@observable frequency = '';
	@action.bound
	changeFrequency(frequency) {
		// 第一次的情况，记录一下flag，不可变
		if(this.frequencyToJsObj === ''){
			this.flag = frequency === 'day' ? 1 : frequency === 'month' ? 2 : frequency === 'quarter' ? 3 : 4;
		}
		this.frequency = frequency;		
	}
	@computed
	get frequencyToJsObj() {
		return mobx.toJS(this.frequency);
	}
	// 更改频率事件
	@action.bound
	changeFrequencyHandler(e) {
		e.stopPropagation();
		let target = e.target;		
		if(target.tagName == 'LI' && !target.classList.contains('disabled')){
			let frequency = target.dataset.frequency;
			this.changeFrequency(frequency);
		}
	}




	// 打开指标计算的弹框
	@action.bound
	computeClickHandler(e) {
		e.stopPropagation();		
		this.changeComputeState();
	}
	// 计算对话框的确认操作
	@action.bound
	computeSureHandler(e) {
		e.stopPropagation();
		// 拼接服务器接收的字符串
		let expressObj = this.expressToJsObj;
		let result = '';
		let entity = '';
		expressObj.length && expressObj.forEach((item, index) => {
			if(item.id){
				entity = item.id;
			}else{
				entity = item.text;
			}			
			result += entity;
		});
		if(result.length){
			// 发送ajax请求
			console.log("result表达式传递的规格", result);	
			// 并且在成功之后关闭弹框		
			setTimeout(() => {
				this.closeCompute();
			});
		}else{
			// 模拟点击关闭按钮
			this.closeCompute();
		}
	}
	// 计算对话框的关闭操作, 点击关闭的时候需要置空表达式
	@action.bound
	closeCompute(e) {
		// e.stopPropagation();		
		this.changeComputeState();
		// 置空表达式, 什么也不传
		this.operateExpress({});
	}

	/**
	 * 表达式
	 */
	// 保存当前编辑的表达式的参数
	@observable express = [];
	@computed
	get expressToJsObj() {
		return mobx.toJS(this.express);
	}
	// 如下函数操作express对象，增、删、改，使用索引来操作
	/**
	 * index是对象数组的索引，addIndex是要插入的对象
	 */
	@action.bound
	operateExpress({index, addIndex}) {
		// 如果索引存在，就是替换，否则就是最后面添加
		let express = this.expressToJsObj;
		if(index){
			express.splice(index, 1, addIndex);
		}else{
			if(addIndex){
				express.push(addIndex);
			}else{
				express = [];
			}
		}
		this.express = express;
		console.log("express", express);
	}

	// 添加操作符
	@action.bound
	addOperatorsHandler(e) {
		e.stopPropagation();
		let target = e.target;
		let obj = {};
		if(target.tagName === 'LI'){
			Object.assign(obj, {addIndex: {text: target.innerText,id: ''}});	
		}			
		let selectedIndex = this.getExpressSelected();
		if(selectedIndex){
			Object.assign(obj, {index: selectedIndex})
		}
		this.operateExpress(obj);
	}
	// 添加指标
	@action.bound
	addIndexHandler(e) {
		e.stopPropagation();
		let target = e.target;
		let parentNode = target.parentElement;
		let li = '';
		let span = '';
		let id = '';	
		let obj = {};
		// 由于span没占满整个li元素，所以这里可能点到span，也可能点到li
		if(target.tagName === 'LI'){
			li = target;
		}else if(parentNode.tagName === 'LI'){
			li = parentNode;
		}
		span = li.children[0];
		if(span.tagName === 'SPAN'){
			id = span.getAttribute('id');
			Object.assign(obj, {addIndex: {text: li.innerText,id: id}})		
		}
		let selectedIndex = this.getExpressSelected();
		if(selectedIndex){
			Object.assign(obj, {index: selectedIndex})
		}
		this.operateExpress(obj);
	}

	// 指标ajax取值保存结果
	@observable indexLis = [];
	@computed
	get indexLisToJsObj() {
		return mobx.toJS(this.indexLis);
	}
	@action.bound
	indexLisChange(indexLis) {
		this.indexLis = indexLis;
	}

	// 表达式的元素的选中与取消
	@action.bound
	selectExpressHandler(e) {
		e.stopPropagation();
		let target = e.target;
		// 这里有一个问题就是取消别的部分的seleted
		let selected = document.querySelector('.express .selected');


		if(target.tagName === 'SPAN'){
			target = target.parentElement;			
		}else if(target.tagName === 'LI'){
			target = target;
		}

		if(selected == target){
			target.classList.remove('selected');
		}else{
			selected && selected.classList.remove('selected');
			target.classList.add('selected');
		}
	}
	// 获取当前在表达式内需要替换的元素
	@action.bound
	getExpressSelected() {
		let target = document.querySelector('.express .selected');
		let index;
		if(target){
			index = target.dataset.index;
		}else{
			index = '';
		}		
		return index;
	}


	/**
	 * 搜索框相关
	 */
	@observable searchValue = '';
	@computed
	get searchValueToJsObj() {
		return mobx.toJS(this.searchValue);
	}
	@action.bound
	changeSearchValue(value) {
		this.searchValue = value;
	}

	// 处理函数, 搜索框点击事件
	@action.bound
	searchChangeHandler(e) {
		console.log(e);
		let target = e.target;
		let value = target.value;
		this.changeSearchValue(value);
	}

	// 搜索框enter搜索
	@action.bound
	onKeyDownHandler(e) {
		let target = e.target;
		let code = e.keyCode;
		if(e.keyCode === 13){
			console.log('搜索的信息：', target.value)
		}
	}
	// search-btn
	@action.bound
	searchBtnHandler(e) {
		e.stopPropagation();
		let target = e.target;
		// 执行搜索操作
		console.log("target:", target);
	}
	
}