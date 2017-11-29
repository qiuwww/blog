// TableStore.js


import mobx, { observable, computed, action } from 'mobx';
import tableConfig from '../config/tableConfig.js';
import { fetch, logMsg } from '../Util/utils.js';

import { resData } from '../Util/mockData.js';


// 定义可观察的属性和方法，需要的时候使用inject来注入到组件中
export default class TableStore {

	constructor() {
		// 静态属性
		this.config = {
			
		};
		// 这个根据第一次得到的数据计算，不随着frequency变化
		this.flag = '';
		this.isMore = true;
		this.pagesize = 40;
	}


	@observable page = 1;
	@computed
	get pageToJsObj() {
		return mobx.toJS(this.page);
	}
	@action.bound
	changePage(page) {
		this.page = page;
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

	// 显示同比||历史数据||环比
	@observable radios = [];
	@action.bound
	radiosChange(radios) {
		this.radios = radios;
		this.refreshTable();
	}
	@computed
	get radiosToJsObj() {
		return mobx.toJS(this.radios);
	}


	// 刷新数据，这个函数在componentDidMount的时候需要调用一次使用默认参数
	@action.bound
	refreshTable() {
		let params = {
			searchValue: this.searchValueToJsObj,
			page: this.page,
			pagesize: 20,
			radios: this.radiosToJsObj, // 参数滞后更新
			frequency: this.frequencyToJsObj

		};
		logMsg('prams:', params, 'red');
		this.changeIsLoadingShow();
		// setInterval(() => {
			setTimeout(() => {
				let res = resData();		
				// 这里传入同比||环比||原始数据，三个
				logMsg("getData: ", res, 'blue');		
				if(!res.errno){
					this.initTableAllData(res.data);
				}else{
					console.log('数据获取失败');
				}					 

				this.changeIsLoadingShow();

			}, 1000);	

		// }, 5000);
	}

	// 选中列的数组
	@observable selectTrIndexs = [];
	@computed
	get selectTrIndexsToJsObj() {
		return mobx.toJS(this.selectTrIndexs);
	}
	@action.bound
	changeSelectTrIndexs(selectTrIndexs) {
		this.selectTrIndexs = selectTrIndexs;
		// 这里执行数据提取然后调用安哥这边的函数
		let data = this.selectAllDataTr();
		console.warn('要发给安哥的数据： ', data);
	}

	// 计算选中的行

	@action.bound
	selectAllDataTr() {
		let selectTrIndexs = this.selectTrIndexsToJsObj;
		let data = [];
		let rightTop = this.tableAllData.rightTop; // 第一行

		let rightBottom = this.tableAllData.rightBottom;
		let middleArr = [rightTop]; // 中间数组
		

		selectTrIndexs.length && selectTrIndexs.forEach((item, index) =>{
			rightBottom.forEach((_item, _index) => {
				if(_index == parseInt(item)) {
					middleArr.push(_item);
				}
			});
		});		
		// 这个二维数组求一个转置
		let len = middleArr.length;
		let subArr;
		len > 1 && middleArr.forEach((item, index) => { // 循环四次
			item.forEach((_item, _index) => { // 循环列数次
				if(Array.isArray(data[_index])){
					data[_index].push(_item);
				}else{
					data[_index] = [_item];
				}
			});
		});
		return data;
	}

	// 编辑来改变初始化的对象
	// index, leftBottom的数组的index； text是要改变的数据
	@action.bound	
	editChangeAllData(index, text) {
		this.tableAllData.leftBottom[index]["title"] = text;
	}
	// 删除某一行
	@action.bound
	deleteAllDataTr(index) {
		this.tableAllData.leftBottom.splice(index, 1);
		this.tableAllData.rightBottom.splice(index, 1);

		// this.changeDeleteIndex(index);

		// this.deleteIndex = index;
		// 这里发起ajax请求，删除节点，然后更改拿到的数据
		setTimeout(() => {
			this.changeDialogstate();
		}, 1000);

		// 删除之后，去除右侧的选中状态
		let trSelect = document.querySelector('.right.bottom .trSelect');
		!!trSelect && trSelect.classList.remove('trSelect');
	}
	// 置顶操作
	@action.bound
	toTopTr(index) {
		if(index !== 0){
			// ajax请求吧，刷新整个数据树
			let tr1 = this.tableAllData.leftBottom.splice(index, 1);
			this.tableAllData.leftBottom.unshift(tr1[0]);

			let tr2 = this.tableAllData.rightBottom.splice(index, 1);
			this.tableAllData.rightBottom.unshift(tr2[0]);
		}
	}


	// 滚动条事件
	// 滚动rightBottom的时候的处理函数
	@action.bound	
	scrollHandler(e){
    	let target = e.currentTarget;
    	// 当前目标元素滚动之后的位置
    	let scrollLeft = parseInt(target.scrollLeft);

    	let scrollTop = parseInt(target.scrollTop);

		let position = {scrollLeft, scrollTop};

		let scrollHeight = target.scrollHeight;
		let offsetHeight = target.offsetHeight;

		if(this.synchronizePosition.scrollTop != scrollTop){
			// 滚动加载,需要改变page和pagesize
			if( scrollTop + offsetHeight >= scrollHeight - 10){
				this.changePage(this.pageToJsObj + 1);
				if(this.isMore) {
					this.refreshTable();
				}
			}else if(scrollTop == 0){
				this.changePage(this.pageToJsObj - 1);
				if(this.pageToJsObj < 1){
					this.changePage(1);
				}else{
					this.refreshTable();		
				}
			}	
		}



		// 同步左下与右上, 为什么这里可以调用this
		this.synchronizeFunc(position);  		
	}

	
	

	// 处理滚动条跟随的问题, 保存上一次加载的位置
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

	// 记录当前的选中的行， 便于下边的置顶操作和删除操作
	@observable currentIndex = '';
	@computed
	get currentIndexToJsObj() {
		return mobx.toJS(this.currentIndex);
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
				this.currentIndex = index;		
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
		// 置顶操作
		this.toTopTr(index);
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
		// 显示输入框
		if (input.classList.contains('hide')) {
			input.classList.remove('hide');
			this.changeCurrentIndexText(text);
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
		if(index != undefined && currentIndexText != ''){
			this.editChangeAllData(index, currentIndexText);
		}
	}
	// 输入框失去焦点的时候，触发保存
	@action.bound
	blurHandler(e) {
		e.stopPropagation();
		// target就是指向input
		let target = e.currentTarget;
		target.classList.add('hide');
		this.changeCurrentIndexText('');
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


	
	// 确认按钮的事件处理, 基本对话框的确认事件
	@action.bound
	beSureHandler(type, e) {
		e.stopPropagation();
		// 这里区分类型，做不同的处理
		let index = this.currentIndexToJsObj;
		if(type == 4){
			this.deleteAllDataTr(index);
		}else if(type == 5){
			this.refreshTable();
			this.changeDialogstate();// 成功后关闭弹框
		}
	}	

	@observable dialogType = '';
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
	// 删除一行，发起请求
	@action.bound
	changeDeleteIndex(deleteIndex) {
		this.deleteIndex = deleteIndex;
		// 这里发起ajax请求，删除节点，然后更改拿到的数据
		setTimeout(() => {
			this.changeDialogstate();
		}, 1000);
	}

	// 打开基本的对话框
	// 1. 删除操作
	@action.bound // 把这个函数绑定到当前的对象上
	openDialogEvent({type, text, index}, e) {
		// 修改type， 说明弹框的类型及参数
		this.changeDialogType(type);		
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
			// 并且在成功之后关闭弹框		
			setTimeout(() => {
				this.closeCompute();
				this.refreshTable(); // 添加了一条，所以要刷新整个部分
			}, 1000);
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
		e.stopPropagation();
		let target = e.target;
		let value = target.value;
		this.changeSearchValue(value);
		// 这里要显示联想搜索框
		let timeID;
		clearTimeout(timeID);
		timeID = setTimeout(() => {
			if(value != ''){
				this.lenovoFetch(value);				
			}
		}, 500);
	}


	// 联想框的数据
	@observable lenovoData = [];
	@computed
	get lenovoDataToJsObj() {
		return mobx.toJS(this.lenovoData);
	}
	@action.bound
	changeLenovoData(lenovoData) {
		this.lenovoData = lenovoData;
	}
	// 联想输入的模拟请求返回
	@action.bound
	lenovoFetch(value) {
		setTimeout(() => {
			// 打开弹框，填入数据
			let data = ['水电费的说法水电费', 
				'水电费的说法水电费','水电费的说法水电费',
				'水电费的说法水电费','水电费的说法水电费',
				'水电费的说法水电费','水电费的说法水电费',
				'水电费的说法水电费'];

			this.changeLenovoData(data);
		}, 1000);
	}

	// 搜索框enter搜索
	@action.bound
	onKeyDownHandler(e) {
		let target = e.target;
		let code = e.keyCode;
		if(e.keyCode === 13){
			this.searchCommonFunc();
		}
	}
	// search-btn
	@action.bound
	searchBtnHandler(e) {
		e.stopPropagation();
		let target = e.target;
		// 执行搜索操作
		this.searchCommonFunc();
	}
	// 很明显这里的这段代码是要拿到搜索值，并且搜索
	@action.bound
	searchCommonFunc() {
		this.refreshTable();
		this.changeLenovoData([]);			
	}

	// loading show
	@observable isLoadingShow = false;
	@action.bound
	changeIsLoadingShow() {
		this.isLoadingShow = !this.isLoadingShowToJsObj;
	}
	@computed
	get isLoadingShowToJsObj() {
		return mobx.toJS(this.isLoadingShow);
	}
	
}