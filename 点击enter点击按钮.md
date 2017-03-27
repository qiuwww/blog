```<script> 
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
</script> 