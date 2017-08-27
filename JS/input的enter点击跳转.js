// input的enter点击跳转.js


$(function(){ 
	$(document).keydown(function(event){ 
		if(event.keyCode==13){ 
			$("#mouse").click(); 
		} 
	}); 

	$("#mouse").click(function(){ 
		alert("nihao"); 
	}); 
}) 