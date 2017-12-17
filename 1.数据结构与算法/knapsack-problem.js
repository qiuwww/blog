// knapsack-problem.js


// https://zh.wikipedia.org/wiki/%E8%83%8C%E5%8C%85%E9%97%AE%E9%A2%98


var ary=[{weight:35,value:10},{weight:30,value:40},{weight:6,value:30},{weight:50,value:50},{weight:40,value:35},{weight:10,value:40},{weight:25,value:30}]

var testA=function(M,ary){
//建立备忘录
    var result;
    for(var i=0;i<=M;i++){
        result=result||[];
        for(var j=0;j<=ary.length;j++){
        result[i]=result[i]||[];
            result[i][j]=-1;
         }
    }
    console.log(result)
    var test=function(M,ary){
        if(result[M][ary.length]==-1){
         var  temp;
         var  data; 
        if(ary.length>0){
        temp=ary.shift();
          if(M>=temp.weight){
           data= Math.max(temp.value+test(M-temp.weight,ary),test(M,ary));
          }else{
           data=  Math.max(test(M,ary));
          }
        }else{
           data=  0; 
       }    
//写入备忘录
            result[M][ary.length]=data;
            return data;
    }else{
//备忘录取值
        return result[M][ary.length];
    }
  }
    return test(M,ary);
}

  console.log(testA(100,ary))


// 如何生成组合 


(function(M,ary){
//建立备忘录
    var result;
    for(var i=0;i<=M;i++){
        result=result||[];
        for(var j=0;j<=ary.length;j++){
        result[i]=result[i]||[];
            result[i][j]=-1;
         }
    }
    console.log(result)
})(3, new Array(6));



/*
        a:{
            weight : weight, //当前物品重量
            value : value //当前物品价值
        }
    */
            function knapsack(a, limitW) {

                var totV = 0,
                maxV = 0;
                var option = [],
                cop = [];
                                var N=a.length;
                for (var i = 0;
                i < a.length;
                i++) {
                    totV += a[i].value
                }

                function find(i, tw, tv) {
                    var k;
                    if (tw + a[i].weight <= limitW) //考虑物品i放入背包的情况
                    {
                        cop[i] = a[i].index;
                        if (i < N - 1) {
                            find(i + 1, tw + a[i].weight, tv);
                        }
                        else {
                            //最佳结果形成
                            for (k = 0; k < N; k++) {
                                option[k] = cop[k];
                            }
                            maxV = tv;
                        }
                    }
                    if (tv - a[i].value > maxV) //考虑物品i不放入背包的情况，此状态可以剪掉部分节点
                    {
                        cop[i] = 0;
                        if (i < N - 1) {
                            find(i + 1, tw, tv - a[i].value);
                        }
                        else {
                            //最佳结果形成
                            for (k = 0; k < N; k++) {
                                option[k] = cop[k];
                            }
                            maxV = tv - a[i].value;
                        }
                    }
                }

                find(0, 0, totV);

                return {
                    maxValue: maxV,
                    option: option
                };

            }












