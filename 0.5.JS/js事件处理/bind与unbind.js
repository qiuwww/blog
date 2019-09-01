
// bind与unbind.js
// 对于可能重复绑定的位置的事件，最好每次确认一下是都可能被重复绑定，需要先解绑然后再绑定

let PageNav = function(){
	let args = arguments[0];
	Object.assign(this, args);
	this.init();
}

PageNav.prototype = {
	constructor: PageNav,
	init() {

	},
	initView() {

	},
	pageChange() {

	},
	bindEvent() {
		// 这里多次生成可能会重复绑定，需要先解绑
		this.unbindEvent();
		$('body').on('click', 'target', $.proxy(this.pageChange, this));
	},
	unbindEvent() {
		$('body').off('click', 'target', $.proxy(this.pageChange, this));
	}

}
