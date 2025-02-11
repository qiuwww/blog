/* 2017-12-7 12:41:21 | 修改 木遥（微信:  http://marsgis.cn/weixin.html ） */
var thisWidget;

//当前页面业务  
function initWidgetView(_thisWidget) {
    thisWidget = _thisWidget;

    if (thisWidget.config && thisWidget.config.style) {//适应不同样式
        $("body").addClass(thisWidget.config.style);
    }

    //清除所有标号
    $("#btn_plot_delall").click(function () {
        thisWidget.deleteAll();
        tab2plot()
    });
    $("#btn_plot_end").click(function (e) {
        thisWidget.endDraw();
    });

    //是否可以编辑
    var isedit = true;
    $("#btn_plot_isedit").click(function () {
        isedit = !isedit;

        if (isedit) {
            $(this).removeClass("active");
            $(this).children().removeClass("fa-lock").addClass("fa-unlock");
        }
        else {
            $(this).addClass("active");
            $(this).children().removeClass("fa-unlock").addClass("fa-lock");
        }
        thisWidget.hasEdit(isedit);
    });


    plotFile.initEvent();
    plotlist.bindSelList();
    tableWork.initEvent();

    //加载数据库图层
    var geoJson = window.sessionStorage.getItem('geoJson');
    if(geoJson != null){
        thisWidget.jsonToLayer(geoJson,true,true);
    }
}

//文件处理
var plotFile = {
    initEvent: function () {
        var that = this;

        var isClearForOpenFile;
        $("#btn_plot_openfile").click(function () {
            isClearForOpenFile = true;
            $("#input_plot_file").click();
        });

        $("#btn_plot_openfile2").click(function () {
            // isClearForOpenFile = false;
            // $("#input_plot_file").click();
            var data = thisWidget.getGeoJson();
            if (data == null || data == "") {
                toastr.warning("当前未标绘任何数据！");
            } else {
                haoutil.file.downloadFile("标绘.json", JSON.stringify(data));
                toastr.success("导出成功");
            }

        });

        $("#btn_plot_savefile").click(function () {
            var data = thisWidget.getGeoJson();
            if (data == null || data == "") {
                toastr.warning("当前未标绘任何数据！");
            } else {
                window.sessionStorage.setItem("geoJson",JSON.stringify(data));
                toastr.success("保存成功");
            }
        });

        $("#input_plot_file").change(function (e) {
            var file = this.files[0];

            var fileName = file.name;
            var fileType = (fileName.substring(fileName.lastIndexOf(".") + 1, fileName.length)).toLowerCase();
            if (fileType != "json") {
                toastr.error('文件类型不合法,请选择json格式标注文件！');
                that.clearPlotFile();
                return;
            }

            if (window.FileReader) {
                var reader = new FileReader();
                reader.readAsText(file, 'UTF-8');
                reader.onloadend = function (e) {
                    var strjson = this.result;
                    thisWidget.jsonToLayer(strjson, isClearForOpenFile, true);
                    that.clearPlotFile();
                };
            }
        });
        
    },
    clearPlotFile: function () {
        if (!window.addEventListener) {
            document.getElementById('input_plot_file').outerHTML += '';  //IE
        } else {
            document.getElementById('input_plot_file').value = "";   //FF
        }
    }
};

//标号列表相关
var plotlist = {
    //绑定标号列表切换下拉框
    bindSelList: function () {
        var that = this;
        var $sel_plot_list = $("#sel_plot_list");
        $.getJSON("config/plotlist.json", function (plotlist) {
            var inhtml = '';
            var defval;
            var count = 0;
            for (var i in plotlist) {
                inhtml += '<option value="' + i + '">' + i + '(' + plotlist[i].length + ')</option>';
                if (defval == null) defval = i;
                count++;
            }
            if (defval) {
                that.showPlotList(plotlist[defval]);
                $sel_plot_list.attr('data-value', defval);
            }
            if (count > 1) {
                $sel_plot_list.html(inhtml);
                $sel_plot_list.select();
                $sel_plot_list.change(function () {
                    var val = $(this).attr('data-value');
                    var list = plotlist[val];
                    that.showPlotList(list);
                });
            } else {
                $sel_plot_list.hide();
                $(".mp_mark").css({ 'margin-top': '10px' });
            }

        });
    },
    _listData: null,
    showPlotList: function (list) {
        this._listData = list;

        var serverURL = thisWidget.getServerURL();
        var inhtml = '';
        
        for (var i = 0; i < list.length; i++) {
            var item = list[i];
            if (item.hide) continue;

            // if (item.style && item.style.modelUrl)
            //     item.style.modelUrl = item.style.modelUrl.replace("$serverURL$", serverURL);
 
            var defStyle = thisWidget.getDefStyle(item.edittype || item.type)

            //使用图片图标
            var image;
            if (defStyle) {
                image = defStyle.image;
            }
            if (item.image) {
                image = item.image;
            }
            if (item.style && item.style.image) {
                image = item.style.image;
            }

            if (image) {
                if (image.startsWith("http")) {
                    //不用特殊处理
                }
                else if (image.startsWith("$plot$")) {
                    image = image.replace("$plot$/", "");  //是模块内部本级图片
                }
                else if (image.startsWith("$serverURL$")) {
                    image = image.replace("$serverURL$", serverURL);  //是模块内部本级图片
                }
                else {
                    image = "../../" + image;   //相对于父级index页面的图片
                }
                inhtml += ' <li onclick="plotlist.startPlot(' + i + ',this)"> <i title="'
                    + item.name + '"  > <img src="' + image + '"  onerror="plotlist.imgerrorfun();"/></i></li>';
            }
            else {
                //使用字体图标 
                var icon;
                var clr = "#000000";
                if (defStyle) {
                    icon = defStyle.iconClass;
                    clr = defStyle.color;
                }
                if (item.iconClass) {
                    icon = item.iconClass;
                }
                if (item.style && item.style.iconClass) {
                    icon = item.style.iconClass;
                }

                if (item.color) {
                    clr = item.color;
                }
                if (item.style && item.style.color) {
                    clr = item.style.color;
                }
                if (icon) {
                    inhtml += '<li onclick="plotlist.startPlot(' + i + ',this)"><i title="'
                        + item.name + '"  class="' + icon + '" style="color:' + clr + '"></i></li>';
                }
                else {
                    inhtml += '<li onclick="plotlist.startPlot(' + i + ',this)"><i title="'
                        + item.name + '" style="font-size: 13px;">' + item.name + '</i></li>';
                }
            }
        }
        $("#plotlist").html(inhtml);
    },
    imgerrorfun: function () {
        var img = event.srcElement;
        img.src = "../../../img/favicon/app-icon72x72@2x.png";
        img.onerror = null;
    },
    //激活标绘
    _lastLi: null,
    //开始绘制
    startPlot: function (idx, li) {
        var _thisli = $(li);
        _thisli.addClass('markon');
        if (this._lastLi)
            this._lastLi.removeClass('markon');
        this._lastLi = _thisli;

        var item = haoutil.system.clone(this._listData[idx] || {});
        delete item.image

        //赋值默认样式
        var defStyle = thisWidget.getDefStyle(item.edittype || item.type)
        if (defStyle) {
            item.style = item.style || {};
            for (var i in defStyle) {
                if (item.style[i] == null)
                    item.style[i] = defStyle[i];
            }
        }


        //赋值默认属性
        item.attr = {
            id: "",
            name: "",
            remark: "",
        };

        thisWidget.startDraw(item);
    },
    //绘制结束
    plotEnd: function () {
        //取消选中状态
        if (this._lastLi)
            this._lastLi.removeClass('markon');
    }
};



//列表处理
var tableWork = {
    $table: null,
    getHeight: function () {
        return $(window).height() - 69;
    },
    initEvent: function () {
        var that = this;

        var $table = $('#table');
        $table.bootstrapTable({
            height: this.getHeight(),
            singleSelect: true, //单选
            pagination: false,
            iconsPrefix: 'fa',
            data: thisWidget.arrList,
            columns: [
                {
                    field: 'type',
                    title: '类型',
                    sortable: true,
                    editable: false,
                    align: 'left'
                },
                {
                    field: 'name',
                    title: '名称',
                    sortable: true,
                    editable: false,
                    align: 'left'
                },
                {
                    field: 'operate',
                    title: '操作',
                    align: 'center',
                    width: 50,
                    events: {
                        'click .remove': function (e, value, row, index) {
                            thisWidget.delTableItem(row);
                        },
                    },
                    formatter: function (value, row, index) {
                        return '<a class="remove" href="javascript:void(0)" title="删除"><i class="fa fa-trash"></i></a>';
                    }
                }
            ],
            onClickRow: function (rowData, $element, field) {
                thisWidget.showTableItem(rowData);
            }
        });
        this.$table = $table;

    },
    loadData: function (arr) {
        var positon = this.$table.bootstrapTable("getScrollPosition");
        this.$table.bootstrapTable("load", arr);
        this.$table.bootstrapTable("scrollTo", positon);
    },
};
