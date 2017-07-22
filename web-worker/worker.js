// worker.js



this.onmessage = function(evt){

    postMessage(evt.data +'--worker.js里的附加信息');

};