// test.js



function * generatorFun(){
	yield 'hellow';
	yield 'world';
	return 'ending'
}

var hw = generatorFun();


hw.next()
hw.next()
hw.next()
hw.next()



let promiseFun = new Promise(function(resolve, reject){
	if(false){
		resolve();
	}else{
		reject();
	}
});

promiseFun.then(function(){
	console.log('resolve');
})

promiseFun