// worker.js



this.onmessage = function(evt){

    postMessage(evt.data +'--worker.js里的附加信息' + 'factorial(60): ' + factorial(60));



	function factorial (num) { 
	    if (num < 0) { 
	        return -1; 
	    } else if (num === 0 || num === 1) { 
	        return 1; 
	    } else { 
	        return (num * factorial(num - 1)); 
	    } 
	};
	// factorial(60);


};