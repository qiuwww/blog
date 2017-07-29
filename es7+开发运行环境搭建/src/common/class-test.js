// class-test.js


class dog {
	constructor(name){
		this.name = name;
		return this;
	}
	ddd (){
		console.log(this.name);
	}
}

new dog('hhhh').ddd();