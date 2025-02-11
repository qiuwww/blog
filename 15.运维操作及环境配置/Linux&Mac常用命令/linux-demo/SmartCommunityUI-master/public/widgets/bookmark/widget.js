/* 2017-9-28 16:14:36 | 修改 木遥（微信:  http://marsgis.cn/weixin.html ） */
//模块：
mars3d.widget.bindClass(mars3d.widget.BaseWidget.extend({
    options: {
        //弹窗
        view: {
            type: "window",
            url: "view.html",
            windowOptions: {
                width: 210,
                height: 400
            }
        },
    },
    viewWindow: null,
    //每个窗口创建完成后调用
    winCreateOK: function (opt, result) {
        this.viewWindow = result;
    },
    //激活插件
    activate: function () {

    },
    //释放插件
    disable: function () {
        this.viewWindow = null;

    },
    showExtent: function (cfg) {

        this.viewer.mars.centerAt(cfg, { isWgs84: true });
    },
    getDefaultExtent: function () {
        return this.viewer.mars.config.center;
    },
    getThisExtent: function (calback) {
        var bookmark = mars3d.point.getCameraView(this.viewer, true);

        haoutil.loading.show();

        viewer.mars.expImage({
            download: false,
            width: 300, //指定 高  或 宽
            calback: function (base64, size) {//回调
                haoutil.loading.close();

                if (calback) calback(bookmark,base64);
            }
        });

        return bookmark;
    }

}));
