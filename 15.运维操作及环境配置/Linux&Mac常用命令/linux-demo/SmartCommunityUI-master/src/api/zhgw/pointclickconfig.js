var PointConfig = {};
PointConfig.layer=["http://192.168.1.200:6080/arcgis/rest/services/WSGK/MapServer"];
var statisticsConfig={};
statisticsConfig.layer=[{
  id: 1,value:"王氏骨科",layer:[{
  id: 1,
  value: "PSP",
  url: "http://192.168.1.200:6080/arcgis/rest/services/WSGK/MapServer/0",
  fields:["井盖材质","权属单位"],
  statistics:[["井盖材质","数量"],["权属单位","数量"]],
  },
  {
  id: 2,
  value: "DLP",
  url: "http://192.168.1.200:6080/arcgis/rest/services/WSGK/MapServer/1",
  fields:["权属单位"],
  statistics:[["权属单位","数量"]],
  },
  {
  id: 3,
  value: "JSP",
  url: "http://192.168.1.200:6080/arcgis/rest/services/WSGK/MapServer/2",
  fields:["权属单位"],
  statistics:[["权属单位","数量"]],
  },
  {
  id: 4,
  value: "DLL",
  url: "http://192.168.1.200:6080/arcgis/rest/services/WSGK/MapServer/3",
  fields:["权属单位"],
  statistics:[["权属单位","数量"]],
  },
  {
  id: 5,
  value: "PSL",
  url: "http://192.168.1.200:6080/arcgis/rest/services/WSGK/MapServer/4",
  fields:["权属单位"],
  statistics:[["权属单位","数量"]],
  },
  {
  id: 6,
  value: "RQL",
  url: "http://192.168.1.200:6080/arcgis/rest/services/WSGK/MapServer/5",
  fields:["权属单位"],
  statistics:[["权属单位","数量"]],
}]
}];
//统计规则分配
function strstatistics(value,type){ 
	var arr=[];
	switch(type[1]) {
     case "数量":
			var ary=[];
			value.features.forEach(elements => {	
					if(elements.attributes[type[0]]){
						ary.push(elements.attributes[type[0]])			
					}else{
						ary.push("空值")
					}										
				});
			arr=arrrep(ary,type[0]);
        break;   
		} 
	return arr;
}
//数组重复统计
function arrrep(ary,name){ 
	var columns = [];
	var echarscolumns=[];
	ary.sort();
	for(var i = 0;i<ary.length;)  
	{  	   
		var count = 0;  
		for(var j=i;j<ary.length;j++)  
		{  				       
			if(ary[i] == ary[j])  
			{  
				count++;  
			}  				    
		}  				 
		var tableinfo={
			[name]: ary[i],
			数量: count,
		}
		var eacharinfo={				 	
			value: count,
			name: ary[i],
		}
		echarscolumns.push(eacharinfo);
		columns.push(tableinfo);
		i+=count;  					   
	}  
	return [columns,echarscolumns];
}

export {PointConfig,statisticsConfig,strstatistics};