var thisWidget;

//配置信息
var basemapsCfg;
var lastLayer;

//当前页面业务
function initWidgetView(_thisWidget) {
    thisWidget = _thisWidget;
    basemapsCfg = thisWidget.getBasemaps();

    var inhtml = '';
    for (var i = 0; i < basemapsCfg.length; i++) {
        var item = basemapsCfg[i];

        if (!item.hasLayer || item.hide)
            continue;

        var vhtml = "";
        if (thisWidget.getLayerVisible(item)) {
            vhtml = 'class="hover"';
            lastLayer = item;
        }

        var imgsrc = item.icon || 'img/basemaps/bingAerial.png';

        inhtml += '<li ' + vhtml + ' onclick="changeBaseMaps(this,' + i + ')"><div><img src="../../' + imgsrc + '" /></div><div>' + item.name + '</div></li>';

    }
    $("#basemaps").html(inhtml);

    var hasTerrain = thisWidget.hasTerrain(); 
    $('#chkHasTerrain').prop('checked', hasTerrain);
    $("#chkHasTerrain").change(function () {
        var isStkTerrain = $(this).is(':checked');
        thisWidget.updateTerrainVisible(isStkTerrain);
    });
}

function changeBaseMaps(ele, id) {

    $("#basemaps").children().each(function () {
        $(this).removeClass('hover');
    });
    if (lastLayer != null) {
        thisWidget.updateLayerVisible(lastLayer, false);

    }

    $(ele).addClass('hover');

    var item = basemapsCfg[id];
    thisWidget.updateLayerVisible(item, true);
    lastLayer = item;

    thisWidget.disableBase();
}



