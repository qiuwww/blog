var thisWidget;

//当前页面业务
function initWidgetView(_thisWidget) {
    thisWidget = _thisWidget;

    if (thisWidget.config && thisWidget.config.style) {//适应不同样式
        $("body").addClass(thisWidget.config.style);
    }

}





//图表
var myChart1;
 
//剖面分析 图表
function setEchartsData(data) { 
    if (myChart1 == null)
        myChart1 = echarts.init(document.getElementById('echartsView1'), 'dark');

    var arrPoint = data.arrPoint;
 

    var option = {
        grid: {
            left: 10,
            right: 10,
            bottom: 10,
            containLabel: true
        },
        dataZoom: [{
            type: 'inside',
            throttle: 50
        }],
        tooltip: {
            trigger: 'axis',
            //position: function (point, params, dom, rect, size) {
            //    return [10, 20];
            //},
            formatter: function (params) {
                var inhtml = "";
                if (params.length == 0) return inhtml;

                var hbgd = params[0].value; //海拔高度 
                var point = arrPoint[params[0].dataIndex]; //所在经纬度

                inhtml += "所在位置&nbsp;" + point.x + "," + point.y + "<br />"
                    + "距起点&nbsp;<label>" + haoutil.str.formatLength(params[0].axisValue) + "</label><br />"
                    + params[0].seriesName + "&nbsp;<label style='color:" + params[0].color + ";'>" + haoutil.str.formatLength(params[0].value) + "</label><br />";

                return inhtml;
            }
        },
        xAxis: [
            {
                name: '行程',
                type: 'category',
                boundaryGap: false,
                axisLine: {
                    show: false
                },
                axisLabel: {
                    show: false
                },
                data: data.arrLen
            }
        ],
        yAxis: [
            {
                //name: '高度',
                type: 'value',
                min:  getMinZ(arrPoint),
                axisLabel: {
                    rotate: 60,
                    formatter: '{value} 米'
                }
            }
        ],
        series: [
            {
                name: '高程值',
                type: 'line',
                smooth: true,
                symbol: 'none',
                sampling: 'average',
                itemStyle: {
                    normal: {
                        color: 'rgb(255, 70, 131)'
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgb(255, 158, 68)'
                        }, {
                            offset: 1,
                            color: 'rgb(255, 70, 131)'
                        }])
                    }
                },
                data: data.arrHB
            }, 
        ]
    };

    myChart1.setOption(option);
}


function getMinZ(arr) {
    var minz = 'dataMin';
    if (arr == null || arr.length == 0) return minz;

    minz = arr[0].z
    for (var i = 0; i < arr.length; i++) { 
        if (arr[i].z < minz) {
            minz = arr[i].z;
        }
    }
    return minz;
}