
function getQueryString(key){ 
    var reg = new RegExp("(^|&)"+ key +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null){     
        return  unescape(r[2]);  
    }
    return null;
}