

$(function(){


    $.get({
        url: 'http://172.19.80.62:81/thsft/iFindService/Chain/base/get-base-companys?flag=baseCompanys&type=aircraft',
        type: 'get',
        dataType: "json",
        success: function(res){
            console.log(res)
        }
    }).done(function(res){
        console.log(res)
    })


});