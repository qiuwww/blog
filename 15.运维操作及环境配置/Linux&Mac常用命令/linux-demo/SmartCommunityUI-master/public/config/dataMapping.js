import id from "element-ui/src/locale/lang/id";
var baseUrl = "http://" + window.location.host;
//统一访问后台接口方法水流速度
function sendAjax(opts) {
  var Authorization = unescape(getCookie())
  if(Authorization==""){
    if(window.parent.location){
      window.parent.location.href= "/login"
    }
    else{
      location.href= "/login"
    }
  }
  $.ajax({
    url: baseUrl + "/" + opts.url,
    type: opts.type || "post",
    dataType: opts.dataType || "json",
    timeout: opts.timeout || 12000,
    contentType: opts.contentType,
    data: opts.data,
    headers: {
      'Authorization': Authorization
    },
    crossDomain: true,
    success: function(result, status, xhr) {
      opts.success(result)
    },
    error: function(data) {
      if(data && data.status  && data.status==401){
        if(window.parent.location){
          window.parent.location.href= "/login"
        }
        else{
          location.href= "/login"
        }
      }
      console.log("接口请求失败")
    }
  });
}
function getCookie() {
  var name = 'EL-ADMIN-TOEKN' + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i].trim();
    if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
  }
  return "";
}
const list=[
  {id:0,name:"矢量图层",children:[
      {id: 0,name:'小区范围',request:'get',url:'api/basicHousingEstate/queryBasicHousingEstateList'},
      {id: 1,name:'城市部件',request:'post',url:'api/tComponentmanagement/queryTComponentmanagementTreeByPage'},
      {id: 2,name:'网格区域',request:'get',url:'api/basicGrids/queryBasicGridsList'},
      {id: 3,name:'建筑设施',request:'get',url:'api/tBuildingArchives/queryTBuildingArchivesList'},
      {id: 4,name:'外部数据',request:'',url:'/'},
    ]
  },
  {id:1,name:"xyz",children:[
      {id: 0,name:'外部数据',request:'',url:'/'},
    ]
  },
  {id:2,name:"WMTS",children:[
      {id: 0,name:'外部数据',request:'',url:'/'},
    ]
  },
  {id:3,name:"WMS",children:[
      {id: 0,name:'外部数据',request:'',url:'/'},
    ]
  },
  {id:4,name:"ArcGis切片服务",children:[
      {id: 0,name:'外部数据',request:'',url:'/'},
    ]
  },
  {id:5,name:"ArcGis动态渲染服务",children:[
      {id: 0,name:'外部数据',request:'',url:'/'},
    ]
  },
]
export { //很关键
  sendAjax,
  list
}
