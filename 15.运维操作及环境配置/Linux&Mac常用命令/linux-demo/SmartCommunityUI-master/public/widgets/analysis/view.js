var thisWidget;


//当前页面业务
function initWidgetView(_thisWidget) {
    thisWidget = _thisWidget;


    if (thisWidget.config && thisWidget.config.style) {
        $("body").addClass(thisWidget.config.style);
    }

    //点击显示子页面
    $('.tool-btn').click(function () {
        $(this).parents('.basicbox').hide();
        $('.mainbox').eq($(this).index()).show().siblings('.mainbox').hide();
    })
    //返回主菜单
    $('.backmenu').click(function () {
        $(this).parents('.mainbox').hide();
        $('.basicbox').show();

        thisWidget.destroyAll();
    });



    initRZFX()//日照分析
    initPDPX()//坡度坡向
    initKSY()//可视域分析

    initFLFX()//方量分析
    initDXKW() //地形开挖 
    initDBTM()//地表透明

    initMXPQ()//模型剖切
    initMXYP()//模型压平
    initMXCJ()//模型裁剪
}


//=============日照分析=============
function initRZFX() {

    $('#btn_goto_rzfx').click(function () {
        thisWidget.createRZFX();
    });

    $('#btn_rzfx_destory').click(function () {
        thisWidget.destroyRZFX();
    });
    $('#btn_rzfx_clear').click(function () {
        thisWidget.clearRZFX();
        $('#btn_rzfx_btn_rzfx_pause').hide();
        $("#lbl_rzfx_nowTime").html("")
    });


    jeDate("#txt_rzfx_Date", {
        theme: { bgcolor: "#135b91", pnColor: "#00CCFF" },
        format: "YYYY-MM-DD"
    });

    jeDate("#txt_rzfx_StartTime", {
        theme: { bgcolor: "#135b91", pnColor: "#00CCFF" },
        format: "hh:mm:ss"
    });
    jeDate("#txt_rzfx_EndTime", {
        theme: { bgcolor: "#135b91", pnColor: "#00CCFF" },
        format: "hh:mm:ss"
    });

    var today = new Date().format("yyyy-MM-dd");
    $("#txt_rzfx_Date").val(today);
    $("#txt_rzfx_StartTime").val("8:00:00");
    $("#txt_rzfx_EndTime").val("18:00:00");



    $('#btn_rzfx_Start').click(function () {
        var _date = $("#txt_rzfx_Date").val();
        var _starttime = _date + " " + $("#txt_rzfx_StartTime").val();
        var _endTime = _date + " " + $("#txt_rzfx_EndTime").val();

        var startDate = new Date(_starttime);
        var endDate = new Date(_endTime);
        thisWidget.startPlayRZFX(startDate, endDate);
        $('#btn_rzfx_btn_rzfx_pause').show();
    });
    $('#btn_rzfx_btn_rzfx_pause').hide();

    $('#btn_rzfx_btn_rzfx_pause').click(function () {
        var result = thisWidget.pauseRZFX();
        if (result) {
            $('#btn_rzfx_btn_rzfx_pause').val("暂停")
        }
        else {
            $('#btn_rzfx_btn_rzfx_pause').val("继续")
        }
    });

}
function setRZFXNowTime(date) {
    $("#lbl_rzfx_nowTime").html(date.format("MM月dd日 hh:mm"));
}

//=============坡度坡向=============
function initPDPX() {

    $('#btn_goto_pdpx').click(function () {
        thisWidget.createPDPX();
    });

    $('#btn_pdpx_destory').click(function () {
        thisWidget.destroyPDPX();
    });
    $('#btn_pdpx_clear').click(function () {
        thisWidget.clearPDPX();
    });

    $('#btn_pdpx_drawLine').click(function () { 
        var splitNum = Number($("#txt_pdpx_SplitNum").val());
        thisWidget.drawPDPXLine(splitNum);
    });



}


//=============可视域分析=============
function initKSY() {

    $('#btn_goto_ksy').click(function () {
        thisWidget.createKSY();
    });
    $('#btn_ksy_destory').click(function () {
        thisWidget.destroyKSY();
    });
    $('#btn_ksy_clear').click(function () {
        thisWidget.clearKSY();

        updateKsyDistance(100);
    });


    //滑动条
    $("#range_ksy_horizontalAngle").range({
        onChange: function (value, bfb) {
            $("#txt_ksy_horizontalAngle").val(value)
            thisWidget.getLastKSY().horizontalAngle = value;
        }
    });
    $("#txt_ksy_horizontalAngle").change(function () {
        var value = Number($(this).val());
        $("#range_ksy_horizontalAngle").val(value).change();
        thisWidget.getLastKSY().horizontalAngle = value;
    });


    $("#range_ksy_verticalAngle").range({
        onChange: function (value, bfb) {
            $("#txt_ksy_verticalAngle").val(value)
            thisWidget.getLastKSY().verticalAngle = value;
        }
    });
    $("#txt_ksy_verticalAngle").change(function () {
        var value = Number($(this).val());
        $("#range_ksy_verticalAngle").val(value).change();
        thisWidget.getLastKSY().verticalAngle = value;
    });


    $("#range_ksy_distance").range({
        onChange: function (value, bfb) {
            $("#txt_ksy_distance").val(value)
            thisWidget.getLastKSY().distance = value;
        }
    });
    $("#txt_ksy_distance").change(function () {
        var value = Number($(this).val());
        $("#range_ksy_distance").val(value).change();
        thisWidget.getLastKSY().distance = value;
    });

    $('#btn_ksy_add').click(function () {
        var horizontalAngle = Number($("#txt_ksy_horizontalAngle").val());
        var verticalAngle = Number($("#txt_ksy_verticalAngle").val());
        var distance = Number($("#txt_ksy_distance").val());

        thisWidget.addKSY({
            horizontalAngle: horizontalAngle,
            verticalAngle: verticalAngle,
            distance: distance,
        });

    });
}

function updateKsyDistance(value) {
    $("#range_ksy_distance").val(value).change();
    $("#txt_ksy_distance").val(value)
}


//=============方量分析============
function initFLFX() {
    $('#btn_goto_flfx').click(function () {
        thisWidget.createFLFX();
    });
    $('#btn_flfx_destory').click(function () {
        thisWidget.destroyFLFX();
    });
    $('#btn_flfx_clear').click(function () {
        $("#txt_flfx_Height").val(0);
        $("#txt_flfx_MaxHeight").val(0);
        $("#txt_flfx_MinHeight").val(0);
        
        thisWidget.clearFLFX();
    });

    $('#btn_flfx_draw').click(function () {
        thisWidget.measureObj.startDraw();
    });
    $("#txt_flfx_Height").change(function () {
        var num = Number($(this).val());
        thisWidget.measureObj.height = num;
    });
    $("#txt_flfx_MaxHeight").change(function () {
        var num = Number($(this).val());
        if(num<thisWidget.measureObj.height){
            haoutil.msg("墙顶部高度不能低于基准面高"); 
            return
        }
        thisWidget.measureObj.maxHeight = num;
    });
    $("#txt_flfx_MinHeight").change(function () {
        var num = Number($(this).val());
        if(num>thisWidget.measureObj.height){
            haoutil.msg("墙底部高度不能高于基准面高"); 
            return
        }
        thisWidget.measureObj.minHeight = num;
    }); 
    $("#btn_flfx_selHeight").click(function () {
        thisWidget.measureObj.selecteHeight(showFLFXHeightRg);
    });

}

function showFLFXHeightRg() { 
    $("#txt_flfx_Height").val(thisWidget.measureObj.height.toFixed(1)); 
    $("#txt_flfx_MaxHeight").val(thisWidget.measureObj.maxHeight.toFixed(1));
    $("#txt_flfx_MinHeight").val(thisWidget.measureObj.minHeight.toFixed(1));
}


//=============地形开挖=============
function initDXKW() {

    $('#btn_goto_dxkw').click(function () {
        thisWidget.createDXKW();
    });

    $('#btn_dxkw_destory').click(function () {
        thisWidget.destroyDXKW();
    });
    $('#btn_dxkw_clear').click(function () {
        thisWidget.clearDXKW();
    });
    $('#bt_dxkw_draw').click(function () {
        thisWidget.startDrawDXKW();
    });

    $("#txt_dxkw_clipHeight").change(function () {
        var nowValue = $(this).val();
        thisWidget.updateDXKWHeight(nowValue);
    });
}
function getDXKWNowHeight() {
    return $("#txt_dxkw_clipHeight").val();
}



//=============地表透明=============
function initDBTM() {

    $('#btn_goto_dbtm').click(function () {
        thisWidget.createDBTM();
    });
    $('#btn_dbtm_destory').click(function () {
        thisWidget.destroyDBTM();
    });
    $('#btn_dbtm_clear').click(function () {
        thisWidget.clearDBTM();
    });


    $("#chk_dbtm_Underground").change(function () {
        var val = $(this).is(':checked');

        thisWidget.underObj.enable = val;
    });

    $("#txt_dbtm_alpha").range({
        onChange: function (value, bfb) {
            thisWidget.underObj.alpha = value;
        }
    });


}

function getDbtmEnable() {
    var val = $("#chk_dbtm_Underground").is(':checked');
    return val;
}

function updateDbtmVisible(visible) {
    if (visible) {
        $(".undergroundAttr").show();
    } else {
        $(".undergroundAttr").hide();
    }
}


//=============模型剖切=============
function initMXPQ() {

    $('#btn_mxpq_destory').click(function () {
        $("#lbl_mxpq_mxmc").html("未选择");
        thisWidget.destroyMXPQ();
    });
    $('#btn_mxpq_clear').click(function () {
        thisWidget.clearMXPQ();
    });


    $('#btn_mxpq_selectd').click(function () {
        thisWidget.selectedPQMX();
    });


    //滑动条
    $("#range_mxpq_Distance").range({
        onChange: function (value, bfb) {
            $("#txt_mxpq_Distance").val(value.toFixed(1))
            if (thisWidget.clipTileset)
                thisWidget.clipTileset.distance = value;
        }
    });
    $("#txt_mxpq_Distance").change(function () {
        var value = Number($(this).val());
        $("#range_mxpq_Distance").val(value).change();
        if (thisWidget.clipTileset)
            thisWidget.clipTileset.distance = value;
    });




    $("#btn_mxpq_Clipping1").click(function () {
        if (thisWidget.clipTileset)
            thisWidget.clipTileset.type = parent.mars3d.tiles.TilesClipPlan.Type.Z;
    });
    $("#btn_mxpq_Clipping2").click(function () {
        if (thisWidget.clipTileset)
            thisWidget.clipTileset.type = parent.mars3d.tiles.TilesClipPlan.Type.ZR;
    });
    $("#btn_mxpq_Clipping3").click(function () {
        if (thisWidget.clipTileset)
            thisWidget.clipTileset.type = parent.mars3d.tiles.TilesClipPlan.Type.X;
    });
    $("#btn_mxpq_Clipping4").click(function () {
        if (thisWidget.clipTileset)
            thisWidget.clipTileset.type = parent.mars3d.tiles.TilesClipPlan.Type.XR;
    });

    $("#btn_mxpq_Clipping5").click(function () {
        if (thisWidget.clipTileset)
            thisWidget.clipTileset.type = parent.mars3d.tiles.TilesClipPlan.Type.Y;
    });
    $("#btn_mxpq_Clipping6").click(function () {
        if (thisWidget.clipTileset)
            thisWidget.clipTileset.type = parent.mars3d.tiles.TilesClipPlan.Type.YR;
    });

}
function setClipDistanceRange(radius, name) {
    $("#range_mxpq_Distance").attr("min", -radius);
    $("#range_mxpq_Distance").attr("max", radius);

    $("#lbl_mxpq_mxmc").html("已选择“" + name + "”");
}

//=============模型压平=============
function initMXYP() {

    $('#btn_goto_mxyp').click(function () {
        thisWidget.createMXYP();
    });
    $('#btn_mxyp_destory').click(function () {
        thisWidget.destroyMXYP();
    });
    $('#btn_mxyp_clear').click(function () {
        thisWidget.clearMXYP();
    });

    $('#bt_mxyp_draw').click(function () {
        var height = Number($("#txt_mxyp_flatHeight").val());
        thisWidget.drawMxypPoly(height);
    });
    $("#txt_mxyp_flatHeight").change(function () {
        var num = Number($(this).val());
        if (thisWidget.flatObj)
            thisWidget.flatObj.flatHeight = num;
    });


}

//=============模型裁剪=============
function initMXCJ() {

    $('#btn_goto_mxcj').click(function () {
        thisWidget.createMXCJ();
    });
    $('#btn_mxcj_destory').click(function () {
        thisWidget.destroyMXCJ();
    });
    $('#btn_mxcj_clear').click(function () {
        thisWidget.clearMXCJ();
    });
    $('#bt_mxcj_draw').click(function () {
        var clipOutSide = $("#radioMxcjType2").is(':checked')
        thisWidget.drawMxcjPoly(clipOutSide);
    });



    $('input:radio[name="radioMxcjType"]').change(function () {
        if (!thisWidget.tilesetClip) return;

        if ($(this).val() == "1") {
            thisWidget.tilesetClip.clipOutSide = true;
        }
        else {
            thisWidget.tilesetClip.clipOutSide = false;
        }
    });

} 