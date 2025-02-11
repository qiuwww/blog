/* 2017-9-28 16:04:33 | 修改 木遥（微信:  http://marsgis.cn/weixin.html ） */
//此方式：弹窗非iframe模式
mars3d.widget.bindClass(mars3d.widget.BaseWidget.extend({
    options: {
        //弹窗
        view: {
            type: "append",
            url: "view.html",
            parent: ".cesium-viewer-toolbar"
        },
    },
    //初始化[仅执行1次]
    create: function () {

    },
    //每个窗口创建完成后调用
    winCreateOK: function (opt, result) {
        //此处可以绑定页面dom事件

        //修改当前插件中按钮顺序到home按钮后面
        $(".cesium-home-button").after($(opt._dom));
        
        //修改导航球
        var height = $(".cesium-viewer-toolbar").height() + 40;
        $(".compass").css({ "bottom": height + "px" });

        //工具按钮菜单事件 
        var zoomIn = new mars3d.ZoomNavigation(this.viewer, true);
        $("#btn-zommIn").click(function () {
            zoomIn.activate();
        });

        var zoomOut = new mars3d.ZoomNavigation(this.viewer, false);
        $("#btn-ZoomOut").click(function () {
            zoomOut.activate();
        });

    },
    //激活插件
    activate: function () {



    },
    //释放插件
    disable: function () {



    },




}));
