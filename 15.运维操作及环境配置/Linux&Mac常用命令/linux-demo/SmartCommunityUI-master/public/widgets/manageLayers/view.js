var thisWidget;
var layers = [];
var layersObj = {};


//当前页面业务
function initWidgetView(_thisWidget) {

    thisWidget = _thisWidget;

    if (thisWidget.config && thisWidget.config.style) {
        $("body").addClass(thisWidget.config.style);
    }

    //右键
    bindRightMenuEvnet();

    //初始化树
    var setting = {
        check: {
            enable: true
        },
        data: {
            simpleData: {
                enable: true
            }
        },
        callback: {
            onCheck: treeOverlays_onCheck,
            onRightClick: treeOverlays_OnRightClick,
            onDblClick: treeOverlays_onDblClick,
            onClick: treeOverlays_onClick
        },



        view: {
            addDiyDom: addOpacityRangeDom,
        }
    };



    var zNodes = [];
    layers = thisWidget.getLayers();
    for (var i = layers.length - 1; i >= 0; i--) {
        var item = layers[i];
        if (item == null || item.hide) continue;

        var node = {
            id: item.id,
            pId: item.pid,
            name: item.name,
            //opacity: item.opacity,
            _type: item.type,
            _key: item._key,
        };

        if (item.hasLayer) {
            if (thisWidget.config.style == "dark")
                node.icon = "images/layer2.png";
            else
                node.icon = "images/layer.png";
            node.checked = thisWidget.getLayerVisible(item);

            if (item._parent)
                node._parent = item._parent._key;

            //记录图层
            layersObj[node._key] = item;
            zNodes.push(node);
        } else {
            node.icon = "images/folder.png";
            node.open = item.open == null ? true : item.open;
            zNodes.push(node);
        }
    }
    $.fn.zTree.init($("#treeOverlays"), setting, zNodes);


    $("#view").mCustomScrollbar({
        theme: (thisWidget.config.style == "dark") ? "" : "dark-2",
    });
}


function treeOverlays_onClick(e, treeId, treeNode, clickFlag) {

}


function addNode(item) {
    var zTree = $.fn.zTree.getZTreeObj("treeOverlays");

    var parentNode;
    if (item.pid && item.pid != -1)
        parentNode = zTree.getNodeByParam("id", item.pid, null);

    var node = {
        id: item.id,
        pId: item.pid,
        name: item.name,
        //opacity: item.opacity,
        _type: item.type,
        _key: item._key,
    };
    if (item.type == "group" || !item.hasLayer) {
        node.icon = "images/folder.png";
        node.open = item.open == null ? true : item.open;
    } else {
        node.icon = "images/layer.png";
        node.checked = thisWidget.getLayerVisible(item);

        if (item._parent)
            node._parent = item._parent._key;

        //记录图层
        layersObj[node._key] = item;
    }

    zTree.addNodes(parentNode, 0, [node], true);
}

function removeNode(item) {
    var zTree = $.fn.zTree.getZTreeObj("treeOverlays");

    var node = zTree.getNodeByParam("id", item.id, null);
    if (node)
        zTree.removeNode(node);
}




//===================================勾选显示隐藏图层====================================

function treeOverlays_onCheck(e, treeId, treeNode) {

    var zTree = $.fn.zTree.getZTreeObj(treeId);
    //获得所有改变check状态的节点
    var changedNodes = zTree.getChangeCheckedNodes();
    for (var i = 0; i < changedNodes.length; i++) {
        var treeNode = changedNodes[i];
        treeNode.checkedOld = treeNode.checked;
        layer = layersObj[treeNode._key];
        if (layer == null) continue;

        //显示隐藏透明度设置view
        if (treeNode.checked)
            $("#" + treeNode.tId + "_range").show();
        else
            $("#" + treeNode.tId + "_range").hide();

        //特殊处理同目录下的单选的互斥的节点，可在config对应图层节点中配置"radio":true即可 
        if (layer.radio && treeNode.checked) { 
            function filter(node) {
                var item = layersObj[node._key];
                return item.radio && item.pid == layer.pid && node._key != treeNode._key;
            }
            var nodes = zTree.getNodesByFilter(filter, false, treeNode.getParentNode());
            for (var nidx = 0; nidx < nodes.length; nidx++) {

                nodes[nidx].checkedOld = false;
                zTree.checkNode(nodes[nidx], false, true);

                $("#" + nodes[nidx].tId + "_range").hide();

                var layertmp = layersObj[nodes[nidx]._key];

                thisWidget.updateLayerVisible(layertmp, false);
            }
        }


        //处理图层显示隐藏
        if (treeNode._parent) {
            var parentLayer = layersObj[treeNode._parent];
            thisWidget.updateLayerVisible(layer, treeNode.checked, parentLayer);
        } else {
            thisWidget.updateLayerVisible(layer, treeNode.checked);
        }
    }
}

function treeOverlays_onDblClick(event, treeId, treeNode) {

    if (treeNode == null || treeNode._key == null) return;
    var layer = layersObj[treeNode._key];
    if (layer == null) return;

    thisWidget.centerAt(layer);


};


//===================================透明度设置====================================

//在节点后添加自定义控件
function addOpacityRangeDom(treeId, tNode) {
    //if (tNode.icon == "images/folder.png") return;

    var layer = thisWidget.getLayar(layersObj[tNode._key]);
    if (!layer || !layer.hasOpacity) return;

    var view = $("#" + tNode.tId);
    var silder = '<input id="' + tNode.tId + '_range" type="range" style="width: 50px;" />';
    view.append(silder);

    if (!tNode.checked)
        $("#" + tNode.tId + "_range").hide();

    $("#" + tNode.tId + "_range").range({
        min: 0,
        max: 100,
        step: 1,
        value: (layer._opacity || 1) * 100,
        onChange: function (value) {
            var opacity = value / 100;
            var layer = layersObj[tNode._key];
            //设置图层的透明度
            thisWidget.udpateLayerOpacity(layer, opacity);




        }
    });

}

//===================================右键菜单====================================
var lastRightClickTreeId;
var lastRightClickTreeNode;

function treeOverlays_OnRightClick(event, treeId, treeNode) {
    if (treeNode == null || layersObj[treeNode._key] == null) return;

    var layer = thisWidget.getLayar(layersObj[treeNode._key]);
    if (!layer || !layer.hasZIndex) return;

    //右击时的节点
    lastRightClickTreeId = treeId;
    lastRightClickTreeNode = treeNode;

    var top = event.clientY;
    var left = event.clientX;
    var maxtop = document.body.offsetHeight - 100;
    var maxleft = document.body.offsetWidth - 100;

    if (top > maxtop) top = maxtop;
    if (left > maxleft) left = maxleft;

    $('#content_layer_manager_rMenu').css({
        "top": top + "px",
        "left": left + "px"
    }).show();
    $("body").bind("mousedown", onBodyMouseDown);
}

function onBodyMouseDown(event) {
    if (!(event.target.id == "content_layer_manager_rMenu" || $(event.target).parents('#content_layer_manager_rMenu').length > 0)) {
        hideRMenu();
    }
}

function hideRMenu() {
    $("body").unbind("mousedown", onBodyMouseDown);
    $('#content_layer_manager_rMenu').hide();
}

function bindRightMenuEvnet() {
    $("#content_layer_manager_rMenu li").on("click", function () {
        hideRMenu();

        var type = $(this).attr("data-type");
        moveNodeAndLayer(type);
    });
}

//移动节点及图层位置
function moveNodeAndLayer(type) {
    var zTree = $.fn.zTree.getZTreeObj(lastRightClickTreeId);

    //获得当前节点的所有同级节点
    var childNodes;
    var parent = lastRightClickTreeNode.getParentNode();
    if (parent == null) {
        childNodes = zTree.getNodes();
    } else {
        childNodes = parent.children;
    }

    var thisNode = lastRightClickTreeNode;
    var thisLayer = layersObj[thisNode._key];

    switch (type) {

        case "up": //图层上移一层
            var moveNode = thisNode.getPreNode();
            if (moveNode) {
                zTree.moveNode(moveNode, thisNode, "prev");
                var moveLayer = layersObj[moveNode._key];

                exchangeLayer(thisLayer, moveLayer);
            }
            break;

        case "top": //图层置于顶层
            if (thisNode.getIndex() == 0) return;
            while (thisNode.getIndex() > 0) {
                //冒泡交换
                var moveNode = thisNode.getPreNode();
                if (moveNode) {
                    zTree.moveNode(moveNode, thisNode, "prev");

                    var moveLayer = layersObj[moveNode._key];
                    exchangeLayer(thisLayer, moveLayer);
                }
            }
            break;

        case "down": //图层下移一层
            var moveNode = thisNode.getNextNode();
            if (moveNode) {
                zTree.moveNode(moveNode, thisNode, "next");

                var moveLayer = layersObj[moveNode._key];
                exchangeLayer(thisLayer, moveLayer);
            }
            break;
        case "bottom": //图层置于底层
            if (thisNode.getIndex() == childNodes.length - 1) return;

            while (thisNode.getIndex() < childNodes.length - 1) {
                //冒泡交换
                var moveNode = thisNode.getNextNode();
                if (moveNode) {
                    zTree.moveNode(moveNode, thisNode, "next");

                    var moveLayer = layersObj[moveNode._key];
                    exchangeLayer(thisLayer, moveLayer);
                }
            }
            break;
    }

    //按order重新排序
    layers.sort(function (a, b) {
        return a.order - b.order;
    });
}

/**
 * 交换相邻的图层 ： layer1 待移动图层 ，layer2 移动目标图层
 */
function exchangeLayer(layer1, layer2) {

    if (layer1 == null || layer2 == null) return;
    var or = layer1.order;
    layer1.order = layer2.order;
    layer2.order = or;

    if (Number(layer1.order) < Number(layer2.order)) {
        //向上移动
        thisWidget.udpateLayerZIndex(layer1, layer1.order);
    } else {
        //向下移动
        thisWidget.udpateLayerZIndex(layer2, layer2.order);
    }
}

//===================================其他====================================

//地图图层添加移除监听，自动勾选
function updateCheckd(name, checked) {
    var zTree = $.fn.zTree.getZTreeObj("treeOverlays");
    var nodes = zTree.getNodesByParam("name", name, null);
    if (nodes && nodes.length > 0)
        zTree.checkNode(nodes[0], checked, false);
    else
        console.log('未在图层树上找到图层“' + name + '”，无法自动勾选处理');
}