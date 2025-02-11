/* 2017-9-28 16:04:33 | 修改 木遥（微信:  http://marsgis.cn/weixin.html ） */
//此方式：弹窗非iframe模式
mars3d.widget.bindClass(mars3d.widget.BaseWidget.extend({
    options: {
        resources: ['view.css'],
        //弹窗
        view: {
            type: "divwindow",
            url: "view.html",
            windowOptions: {
                width: 250
            }
        },
    },
    //初始化[仅执行1次]
    create: function () {

    },
    //每个窗口创建完成后调用
    winCreateOK: function (opt, result) {
        //此处可以绑定页面dom事件

    },
    //激活插件
    activate: function () {


        toastr.info('激活插件_example_divwin');

    },
    //释放插件
    disable: function () {

        toastr.info('释放插件_example_divwin');

    },




}));
