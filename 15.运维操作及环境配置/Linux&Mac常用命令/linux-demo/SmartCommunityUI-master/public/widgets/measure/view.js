var thisWidget;
var thisType = "";

//当前页面业务
function initWidgetView(_thisWidget) {
    thisWidget = _thisWidget;


    if (thisWidget.config && thisWidget.config.style) {
        $("body").addClass(thisWidget.config.style);
    }

    $("#measure_area_danwei").val("auto"); //默认值
    $("#measure_length_danwei").val("auto"); //默认值


 
    $('#btn_measure_length').bind('click', function () {
        $("#lbl_measure_result").html("");
        $('#measure_danwei').show();
        $('#measure_area_danwei').hide();
        $('#measure_length_danwei').show();

        thisType = "length";
        lastVal = 0;
        thisWidget.drawPolyline({
            unit: $('#measure_length_danwei').val(),
            terrain: false,
            addHeight: 1,  //在绘制点基础自动增加高度（单位：米）
            calback: onMeasureChange,
            onEnd:onMeasureEnd
        });
    });


    $('#btn_measure_length_td').bind('click', function () {
        //用户首次使用时，提醒一次
        haoutil.oneMsg('贴地需要地形服务支撑，部分区域可能无法贴地！', 'measure_length_tip');


        $("#lbl_measure_result").html("");
        $('#measure_danwei').show();
        $('#measure_area_danwei').hide();
        $('#measure_length_danwei').show();

        thisType = "length";
        lastVal = 0;
        thisWidget.drawPolyline({
            unit: $('#measure_length_danwei').val(),
            terrain: true,
            calback: onMeasureChange,
            onEnd:onMeasureEnd
        });
    });

    $('#btn_measure_area').bind('click', function () {
        $("#lbl_measure_result").html("");
        $('#measure_danwei').show();
        $('#measure_length_danwei').hide();
        $('#measure_area_danwei').show();

        thisType = "area";
        lastVal = 0;
        thisWidget.drawPolygon({
            unit: $('#measure_area_danwei').val(),
            style: {
                color: "#00fff2",
                outline: true,
                outlineColor: "#fafa5a",
                outlineWidth: 1,
                opacity: 0.4,
                clampToGround: false //贴地
            },
            calback: onMeasureChange,
            onEnd:onMeasureEnd
        });
    });


    $('#btn_measure_area_td').bind('click', function () {
        $("#lbl_measure_result").html("");
        $('#measure_danwei').show();
        $('#measure_length_danwei').hide();
        $('#measure_area_danwei').show();

        thisType = "area";
        lastVal = 0;
        thisWidget.drawPolygon({
            unit: $('#measure_area_danwei').val(),
            terrain: true,
            splitNum: 10,//step插值分割的个数
            calback: onMeasureChange,
            onEnd:onMeasureEnd
        });
    });


    $('#btn_measure_angle').bind('click', function () {
        $("#lbl_measure_result").html("");
        $('#measure_danwei').hide();

        thisType = "angle";
        lastVal = 0;
        thisWidget.measureAngle({ 
            onEnd:onMeasureEnd
        });
    });

    $('#btn_measure_point').bind('click', function () {
        $("#lbl_measure_result").html("");
        $('#measure_danwei').hide();

        thisType = "point";
        lastVal = 0;
        thisWidget.measurePoint({ 
            onEnd:onMeasureEnd
        });
    });


    $('#btn_measure_section').bind('click', function () {
        //用户首次使用时，提醒一次
        haoutil.oneMsg('剖面需要地形服务支撑，部分区域可能无法获取高程值！', 'measure_section_tip');

        $("#lbl_measure_result").html("");
        $('#measure_danwei').show();
        $('#measure_area_danwei').hide();
        $('#measure_length_danwei').show();

        thisType = "section";
        lastVal = 0;
        thisWidget.drawSection({
            unit: $('#measure_length_danwei').val(),
            splitNum: 300, //插值次数
            onStart: function () {//开始分析前回调(异步)
                haoutil.loading.show();
            },
            onStop: function () {//分析完成后回调(异步)
                haoutil.loading.hide();
            },
            calback: showSectionResult,
            onEnd:onMeasureEnd
        });
    });


    $('#btn_measure_height').bind('click', function () {
        $("#lbl_measure_result").html("");
        $('#measure_danwei').show();
        $('#measure_area_danwei').hide();
        $('#measure_length_danwei').show();

        thisType = "height";
        lastVal = 0;
        thisWidget.drawHeight({
            unit: $('#measure_length_danwei').val(),
            isSuper: false,
            calback: onMeasureChange,
            onEnd:onMeasureEnd
        });
    });

    $('#btn_measure_supHeight').bind('click', function () {
        $("#lbl_measure_result").html("");
        $('#measure_danwei').show();
        $('#measure_area_danwei').hide();
        $('#measure_length_danwei').show();

        thisType = "super_height";
        lastVal = 0;
        thisWidget.drawHeight({
            unit: $('#measure_length_danwei').val(),
            isSuper: true,
            calback: onMeasureChange,
            onEnd:onMeasureEnd
        });
    });

    $('#btn_measure_clear').bind('click', function () {
        $("#lbl_measure_result").html("");

        thisType = "";
        lastVal = 0;
        thisWidget.clearDraw();
    });

    //更换单位
    $("#measure_length_danwei").change(function (e) {
        var danwei = $('#measure_length_danwei').val();
        thisWidget.updateUnit(thisType, danwei);

        if (lastVal > 0) {
            var valstr = thisWidget.formatLength(lastVal, danwei);
            onMeasureChange(valstr);
        }
    });
    $("#measure_area_danwei").change(function (e) {
        var danwei = $('#measure_area_danwei').val();
        thisWidget.updateUnit(thisType, danwei);

        if (lastVal > 0) {
            var valstr = thisWidget.formatArea(lastVal, danwei);
            onMeasureChange(valstr);
        }
    });

    $("#chk_onlyPickModelPosition").change(function () {
        var val = $(this).is(':checked');

        thisWidget.changeOnlyPickModel(val);
    });

}

var lastVal = 0;

//修改值回调
function onMeasureChange(valstr, val) {
    if (val)
        lastVal = val;
    $("#lbl_measure_result").html(valstr);
} 


function showSectionResult(param, val) {
    if (haoutil.isutil.isString(param)) {
        onMeasureChange(param, val);
        return;
    }
    onMeasureChange(param.distancestr, param.distance);
    thisWidget.showSectionChars(param);
}

//单个对象绘制完成结束后的回调
function onMeasureEnd(entity) {
    // console.log('测量完成');
}
