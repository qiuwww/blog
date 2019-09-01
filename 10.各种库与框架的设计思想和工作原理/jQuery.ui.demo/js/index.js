

$(function () {

    var getCompanys = function () {
        return Mock.mock({
            'errno': 0,
            'errmsg': '@word(10, 30)',
            'total': 20,
            'data|20': [{
                'title': '@cword(3, 10)',
                'top': '@natural(10, 1000)',
                'left': '@natural(10, 1000)',
                'width': '@natural(100, 200)',
                'height': '@natural(100, 200)',
                'color': '@color()',
                'data|3-10': [{
                    'gsdm': '@natural(10000, 99999)',
                    'dj|1': [0, 1],
                    'gsmc': '@cword(3, 10)',
                    'lx': '5',
                    'url': '@url()'
                }]
            }]
        });
    }

    var getStyles = function () {
        return Mock.mock({
            'errno': 0,
            'errmsg': '@word(10, 30)',
            'data': {
                'company|8': [{
                    'title': '@cword(3, 10)',
                    'top': '@natural(10, 1000)',
                    'left': '@natural(10, 1000)',
                    'width': '@natural(100, 200)',
                    'height': '@natural(100, 200)',
                    'color': '@color()',
                    'data|3-10': [{
                        'gsdm': '@natural(10000, 99999)',
                        'dj|1': [0, 1],
                        'gsmc': '@cword(3, 10)',
                        'lx': '5',
                        'url': '@url()'
                    }]
                }],
                'pic|3-5': [{
                    'top': '@natural(20, 1000)',
                    'height': '@natural(20, 1000)',
                    'title': '@cword(5, 10)'
                }]
            }

        });
    }


    // $.get({
    //     url: 'http://172.19.80.62:81/thsft/iFindService/Chain/base/get-base-companys?flag=baseCompanys&type=aircraft',
    //     type: 'get',
    //     dataType: "json",
    //     success: function(res){
    //         console.log(res)
    //     }
    // }).done(function(res){
    //     console.log(res)
    // })


    // 目前需要实现画框，更改位置，打开弹框
    // 后边添加预览功能
    // selectable、draggable、resizeable
    var page = {
        init: function () {
            this.$wrap = $('.industryBox');
            this.$masks = $('#masks');
            this.searchParams = null;

            this.getDataAndRender();
            this.renderpage();

            // 查看数据、渲染

            // 增加模块

            // 删除模块

            // 更新模块

            // 画框操作

            // 点击操作

            // 预览渲染，预览重置
            this.addEvent();
            console.log('features: ', this.getUrlSearchParam('features'));
        },

        getUrlSearchParam: function (key) {
            if (!this.searchParams) {
                var search = location.search.slice(1);
                this.searchParams = new URLSearchParams(search);
            }
            return this.searchParams.get(key);
        },

        addEvent: function () {
            this.newSelectAreaEvent();
            this.maskClickEvent();
            this.updateEvent();
            this.formEvent();
        },
        addResizeableAndDraggable: function ($ele) {
            let self = this;
            $ele.resizable({
                containment: ".industryBox", // 限制缩放区域
                minWidth: 100, // 限制大小
                minHeight: 20,
                stop: function (event, ui) {
                    self.updateMaskEvent(event, ui);
                }
            })
                .draggable({
                    containment: ".industryBox", // 限制拖动区域
                    scroll: false,
                    cursor: "move",
                    start: function (event, ui) {
                    },
                    drag: function (event, ui) {
                    },
                    stop: function (event, ui) {
                        self.updateMaskEvent(event, ui);
                    }
                });
        },

        updateMaskEvent: function (event, ui) {
            //  元素拖动结束 || 缩放结束的时候，更新配置信息            
            var $this = $(event.target);
            if ($this.attr('data-title')) {
                if ($this.find('.save-position-change').length) {
                    return;
                }
                $this.append(`<button class="save-position-change">保存位置更改</button>`);
            }
        },

        // 更新位置保存
        updateEvent: function () {
            var self = this;
            self.$wrap.on('click', '.save-position-change', function (e) {
                e.stopPropagation();
                e.preventDefault();
                var $this = $(this);

                var $mask = $this.parents('.mask');
                console.log('更改后的信息： ', $mask.attr('style'));

                setTimeout(function () {
                    // 保存成功之后，删除这个按钮
                    $this.remove();
                }, 1000);
            });
        },

        newSelectAreaEvent: function () {
            // 选择过程中产生的元素的class是 .ui-selectable-helper
            var self = this;
            self.$wrap.selectable({
                // 防止从匹配选择器的元素上开始选择。
                cancle: '.mask',
                delay: 150, // 其实操作延迟时间
                // // filter: 'li',
                // // distance: 100, // 还是需要主动来判断最小框的大小
                // // 生成过程中要添加到哪里,在stop执行完成之前可以把这个元素复制出来，此元素包含需要的属性
                // appendTo: ".industryBox", // 这个拖动获取距离似乎是根据页面上的位置来定位的
                // // 开始的时候触发
                // start: function(event, ui) {

                // },
                // // 在选择操作结尾触发。
                stop: function (event, ui) {
                    var rect = self.$wrap.get(0).getBoundingClientRect();

                    var $currentEle = $('.ui-selectable-helper').clone();

                    var computeLeft = parseFloat($currentEle.css('left')) - rect.left;
                    var computeTop = parseFloat($currentEle.css('top')) - self.$wrap.position().top;

                    // 处理当前生成的元素
                    var $html = $currentEle.css({
                        left: computeLeft,
                        top: computeTop
                    })
                        .removeClass('ui-selectable-helper')
                        .addClass('mask')
                    // 设置可滚动

                    self.addResizeableAndDraggable($html);
                    self.$masks.append($html);
                },
            });
        },

        // 使用已有的数据来画出mask
        renderMaskFromData: function () {
            // 先画company，后画pic
            var company = [];
            var pic = [];
            var res = getStyles();

            var data = res.data;

            if (data.company) {
                company = data.company.map(function (item, index) {
                    return `<div class="mask company-mask" data-type="company" data-title="sdfsdf" style="left: ${item.left}px; top: ${item.top}px; width: ${item.width}px; height: ${item.height}px;"></div>`;
                });
            }
            if (data.pic) {
                pic = data.pic.map(function (item, index) {
                    return `<div class="mask pic-mask" data-type="pic" data-title="sdfsdf" style="left: 0px; top: ${item.top}px; width: 60px; height: ${item.height}px;">这里标记截图的高度及上下位置</div>`;
                });
            }

            var $masks = $('#masks').html(company.concat(pic).join(''));
            this.addResizeableAndDraggable($masks.find('.mask'));

        },





        loadingShow: function (flag) {
            if (flag) {
                // 显示loading状态
                $('#loading').css('display', 'flex');
            } else {
                // 隐藏loading状态
                $('#loading').hide();
            }
        },
        openDialog: function ({flag: flag}) {
            if (!flag) {
                $('#dialog').hide();
            } else {
                $('#dialog').css('display', 'flex');
            }
        },
        maskClickEvent: function () {
            let self = this;


            self.$wrap.on('click', '.mask', function (e) {
                let $this = $(this);
                $this.addClass('currentEdit');
                self.openDialog({ flag: true });

            });

        },

        openEditDialog: function () {

        },

        // 获取已经配置的模块的数据
        getDataAndRender: function () {
            var url = '';
            var params = {};
            // return getCompanys();
            var self = this;

            var res = getCompanys();

            console.log('res: ', res);

            if (res.errno === 0) {
                self.getTitleArr(res.data);
                self.renderCompanyLis();


                var htmlArr = self.titleArr.map(function (item, index) {
                    return self.renderCompanyBlock(res.data[index]);
                });

                // $('.out-wrap').html(htmlArr.join(''));


                // self.renderSavePic();
                self.renderMaskFromData();
            } else {
                console.log("接口出错：", res.errno);
            }

        },
        renderpage: function () {
            var self = this;
            // var data = self.getCompanyData();
            var data = getCompanys();
        },
        // 公司列表显示
        renderCompanyLis: function () {
            var liArr = [];
            var options = [];
            var dataArr = this.titleArr;
            if (dataArr.length) {
                dataArr.forEach(function (item, index) {
                    liArr.push(`<li>${item}</li>`);
                    options.push(`<option value="${item}">${item}</option>`);
                });
            }
            $('.companylis').html(liArr.join(''));
            $('#title').html(options.join(''));
        },

        getTitleArr: function (data) {
            var arr = data.map(function (item, index) {
                return item.title;
            });
            this.titleArr = arr;
            return this;
        },


        // 绘制公司模块
        renderCompanyBlock: function (blockData) {
            var self = this;

            // 这里的公司数据与后边的配置信息需要一一对应，取自不同的接口

            function renderLis(arr) {
                if (arr.length) {
                    var result = arr.map(function (item, index) {
                        return `<li style="width: "";height: "";" id="${item.id}" data-jumpcode="${item.code}" data-jumplx="${item.lx}" title="${item.gsmc}" data-gsdm="${item.gsdm}"
                            class="gsdm-has companyJump">${item.gsmc}
                        </li>`;
                    });
                    return result.join('');
                } else {
                    return '';
                }

            }

            // var tplFunction = function(blockData){
            var html = '';
            var blockArr = blockData.data;
            // if(data.length){
            //     data.map(function(item, index){
            //         return 
            //     });
            // }
            html = `
    <div class="area-block hover-show" style="top:${blockData.top}px;left:${blockData.left}px;width:${blockData.width}px;height:${blockData.height}px; background-color: ${blockData.color};" data-type="" data-title="${blockData.title}"
        data-morebackground="undefined" data-height="undefined" data-width="undefined" data-color="${blockData.color}"
        data-editpos="right" data-morepos="right">
        <!--编辑按钮-->
        <div class="edit-outwrap" style="top:;left:;">
            <span class="edit-wrap J_edit" data-type="座椅">
            <span class="edit-btn " style="-webkit-filter:drop-shadow(#b8871a  20px  0px)">编辑按钮</span>
            </span>
        </div>
        <!--公司列表部分-->
        <ul style="color: #b8871a;height:95px;" id="searchList" class="company-item-list">

        ${renderLis(blockData.data)}

        <!--请添加公司，删除完之后，这个模块会留下这一部分-- >
            <li class="nodata-show J_edit" data-type="座椅" style="display: none;">
                <span class="nodata-show-wrap ">
                    <span class="nodata-show-btn " style="-webkit-filter:drop-shadow(#b8871a  9px  0px)"></span>
                </span>
                请添加公司
            </li>

     </ul>
        <!--更多按钮的显示-->
        <div class="more-arr" style="display: none;">
            <span class="more-show" style="color: #b8871a">...</span>
            <div class="more-outwrap" style="">
                <span class="more-wrap J_more" data-type="座椅">
                <span class="more-btn " style="-webkit-filter:drop-shadow(#b8871a  20px  0px)"></span>
                </span>
            </div>
        </div>

    </div>
    `;
            // }

            return html;


        },

        getStyles: function (data) {
            // 渲染位置参数
            var styles = getStyles();
            console.log('styles', styles);
            this.styles = styles.data;

        },
        renderSavePic: function (obj, ele) {
            var self = this;
            self.getStyles();

            var styles = this.styles;
            var arr = styles.pic;
            var res = [];
            if (arr.length) {
                res = arr.map(function (item, index) {
                    return `<li id="pic_${index}" class="save-pic" style="top: ${item.top}px;" data-height="${item.height}" data-title="${item.title}"></li>`;
                });
            }
            $('.export-operation').html(res.join(''));
        },
        updateSavePic: function (obj, ele) {
            $(`#${ele}`).html(``)
        },
        // save-btn
        // 这里一直是随机数，暂时不添加如下事件的操作
        btnsEvent: function () {
            var self = this;
            self.$wrap.on('click', '.delete', function (e) {
                e.stopPropagation();
                e.preventDefault();
                return false;
            }).on('click', '.save', function (e) {
                e.stopPropagation();
                e.preventDefault();
                return false;


            }).on('click', '.cancle', function (e) {
                e.stopPropagation();
                e.preventDefault();

                return false;

            })
        },
        formEvent: function () {
            var self = this;
            $('#dialog').on('change', '#features', function (e) {
                e.stopPropagation();
                e.preventDefault();
                if ($(this).val() === 'company') {
                    $('.for-company').show().siblings('.for-pic').hide();
                } else {
                    $('.for-company').hide().siblings('.for-pic').show();
                }
            });
        }

    }
    // 页面初始操作
    page.init();



});