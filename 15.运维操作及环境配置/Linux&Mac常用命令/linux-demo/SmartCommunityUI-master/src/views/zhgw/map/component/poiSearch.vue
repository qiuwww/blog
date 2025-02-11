<template>
  <div id="map-querybar" class="querybar-ssk animation-slide-top no-print-view" v-show="searchShow">
    <input id="txt_querypoi" type="search" class="querybar-ssk1" placeholder="搜索 地点  "/>
    <button id="btn_querypoi" type="button" class="querybar-ssk2">
      <i class="fa fa-search fa-2x" style="color: #fff;"></i>
    </button>
    <div class="querybar-clear"></div>

    <!--历史记录-->
    <div id="querybar_histroy_view" class="querybar-sbox " style="display: none;">
      <div class="querybar-ssls">
        <ul id="querybar_ul_history">
        </ul>
      </div>
      <div>
        <a href="javascript:void(0)" onclick="clearHistory();" class="querybar-more">删除历史</a>
      </div>
    </div>

    <!--搜索智能提示-->
    <div id="querybar_autotip_view" class="querybar-znbox" style="display: none;">
      <div class="querybar-znts">
        <ul id="querybar_ul_autotip">
        </ul>
      </div>
    </div>

    <!--搜索结果列表-->
    <div id="querybar_resultlist_view" class="querybar-sbox" style="display: none;">
    </div>
  </div>

</template>

<script>
    import axios from 'axios';

    export default {
        name: "poiSearch",
        data() {
            return {
                cookieName: 'querypoi_baidu',
                arrHistory: [],
                dataList: [],
                pageIndex: 0,
                allPage: 0,
                queryText: '',
                region: "全国",
                searchShow: false,
                pointArr: []
            }
        },
        methods: {
            init() {
                var that = this;
                // 搜索框
                $("#txt_querypoi").click(function () {
                    // 文本框内容为空
                    if ($.trim($(this).val()).length == 0) {
                        that.hideAllQueryBarView();
                        that.showHistoryList(); // 显示历史记录
                    }
                });

                // 搜索框绑定文本框值发生变化,隐藏默认搜索信息栏,显示匹配结果列表
                $("#txt_querypoi").bind("input propertychange", function () {
                    that.hideAllQueryBarView();
                    //that.clearLayers();
                    var queryVal = $.trim($("#txt_querypoi").val());
                    if (queryVal.length == 0) {
                        // 文本框内容为空,显示历史记录
                        that.showHistoryList();
                    } else {
                        //that.autoTipList(queryVal, true);
                    }
                });

                // 点击搜索查询按钮
                $("#btn_querypoi").click(function () {
                    that.hideAllQueryBarView();
                    var queryVal = $.trim($("#txt_querypoi").val());
                    that.pageIndex = 0;
                    that.region = "全国";
                    that.strartQueryPOI(queryVal, that.region);
                });
                //绑定回车键
                $("#txt_querypoi").bind('keydown', function (event) {
                    if (event.keyCode == "13") {
                        $("#btn_querypoi").click();
                    }
                });

                // 返回查询结果面板界面
                $("#querybar_detail_back").click(function () {
                    that.hideAllQueryBarView();
                    $("#querybar_resultlist_view").show();
                });

            },
            hideAllQueryBarView() {
                $("#querybar_histroy_view").hide();
                $("#querybar_autotip_view").hide();
                $("#querybar_resultlist_view").hide();
            },
            //点击搜索开始查询
            strartQueryPOI(text, region, type) {
                if (text.length == 0) {
                    toastr.warning('请输入搜索关键字！');
                    return;
                }

                if (type == "历史") {
                    this.pageIndex = 0;
                }

                this.queryText = text;
                this.region = region;
                $("#txt_querypoi").val(text);
                this.addHistory(text);
                this.hideAllQueryBarView();
                let _this = this;
                //调取接口，获取数据
                axios({
                    method: 'get',
                    url: "/baidupoiPath?query=" + text.toString().trim() + "&region=" + region + "&tag=行政地标&page_size=10&page_num=" + _this.pageIndex + "" +
                        "&output=json&ak=sxMgsosi2Azrl0g56GjEh76GZuGa7i1Q&scope=2"
                }).then(res => {
                    if (res.status == 200) {
                        let totalCount = res.data.total;
                        let tableData = res.data.results;
                        _this.dataList = res.data.results;
                        var inhtml = "";
                        if (!tableData || tableData.length == 0) {
                            inhtml += '<div class="querybar-page"><div class="querybar-fl">没有找到"<strong>' + text + '</strong>"相关结果</div></div>';
                        } else {
                            // 清除图中的元素
                            //_this.$parent.view.graphics.removeAll();
                            _this.clearPointArr();

                            if (tableData.length > 10) {
                                for (let i = 0; i < 10; i++) {
                                    inhtml += '<div class="querybar-site" onclick="strartQueryPOI(&quot;' + text + '&quot;,&quot;' + tableData[i].name + '&quot,&quot;' + "历史" + '&quot;);"> <div class="querybar-sitejj"> <h3>'
                                        + (_this.pageIndex * 10 + (i + 1)) + '、' + tableData[i].name + '</h3> <p>' + "" + '</p> </div> </div>';
                                }


                            } else {
                                //判断是否是行政区划
                                if (tableData[0].num) {
                                    for (let i = 0; i < tableData.length; i++) {
                                        inhtml += '<div class="querybar-site" onclick="strartQueryPOI(&quot;' + text + '&quot;,&quot;' + tableData[i].name + '&quot,&quot;' + "历史" + '&quot;);"> <div class="querybar-sitejj"> <h3>'
                                            + (_this.pageIndex * 10 + (i + 1)) + '、' + tableData[i].name + '</h3> <p>' + "" + '</p> </div> </div>';
                                    }
                                } else {
                                    for (let i = 0; i < tableData.length; i++) {
                                        if (tableData[i].location) {
                                            // //添加点
                                            var point = {
                                                type: "point", // autocasts as new Point()
                                                longitude: tableData[i].location.lng,
                                                latitude: tableData[i].location.lat
                                            };
                                            var markerSymbol = {
                                                type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
                                                color: [226, 119, 40],
                                                outline: {
                                                    // autocasts as new SimpleLineSymbol()
                                                    color: [255, 255, 255],
                                                    width: 2
                                                }
                                            };

                                            // Create a graphic and add the geometry and symbol to it
                                            var pointGraphic = new _this.$parent.Graphic({
                                                geometry: point,
                                                symbol: markerSymbol,
                                                popupTemplate: {
                                                    title: tableData[i].name,
                                                    content: tableData[i].address
                                                }
                                            });
                                            _this.$parent.view.graphics.add(pointGraphic);
                                            _this.pointArr.push(pointGraphic);
                                        }
                                        inhtml += '<div class="querybar-site" onclick="toPoint(\'' + i + '\');"> <div class="querybar-sitejj"> <h3>'
                                            + (_this.pageIndex * 10 + (i + 1)) + '、' + tableData[i].name + '</h3> <p>' + (tableData[i].address ? tableData[i].address : '') + '</p> </div> </div>';
                                    }
                                }
                            }
                        }
                        //分页信息
                        var _fyhtml;

                        let allpage = parseInt((totalCount + 10 - 1) / 10);
                        _this.allPage = allpage;
                        if (allpage > 1)
                            _fyhtml = '<div class="querybar-ye querybar-fr">' + (_this.pageIndex + 1) + '/' + allpage + '页  <a href="javascript:showFirstPage()">首页</a> <a href="javascript:showPretPage()">&lt;</a>  <a href="javascript:showNextPage()">&gt;</a> </div>';
                        else
                            _fyhtml = '';
                        //底部信息
                        inhtml += '<div class="querybar-page"><div class="querybar-fl">找到<strong>' + totalCount + '</strong>条结果</div>' + _fyhtml + '</div>';
                        $("#querybar_resultlist_view").html(inhtml);
                        $("#querybar_resultlist_view").show();
                    } else {
                        toastr.warning('搜索失败！');
                    }
                }).catch(res => {
                    console.error(res)
                    toastr.warning('搜索失败！');
                });
            },
            //显示历史记录
            showHistoryList() {
                $("#querybar_histroy_view").hide();
                var lastcookie = haoutil.cookie.get(this.cookieName); //读取cookie值
                if (lastcookie == null) return;

                this.arrHistory = eval(lastcookie);
                if (this.arrHistory == null || this.arrHistory.length == 0) return;

                var inhtml = "";
                for (var index = this.arrHistory.length - 1; index >= 0; index--) {
                    var item = this.arrHistory[index];
                    inhtml += "<li>" +
                        "<i class='fa fa-history'/>" +
                        '<a href="javascript:void(0)" onclick="strartQueryPOI(&quot;' + item + '&quot;,&quot;' + "全国" + '&quot;,&quot;' + "历史" + '&quot;)">' +
                        item + "</a>" +
                        "</li>";
                }
                $("#querybar_ul_history").html(inhtml);
                $("#querybar_histroy_view").show();
            },
            //记录历史值
            addHistory(data) {
                this.arrHistory = [];
                var lastcookie = haoutil.cookie.get(this.cookieName); //读取cookie值
                if (lastcookie != null) {
                    this.arrHistory = eval(lastcookie);
                }
                //先删除之前相同记录
                this.arrHistory.remove(data);

                this.arrHistory.push(data);

                if (this.arrHistory.length > 10)
                    this.arrHistory.splice(0, 1);

                lastcookie = JSON.stringify(this.arrHistory);
                haoutil.cookie.add(this.cookieName, lastcookie);
            },
            //情况历史值
            clearHistory() {
                this.arrHistory = [];
                haoutil.cookie.del(this.cookieName);

                $("#querybar_ul_history").html("");
                $("#querybar_histroy_view").hide();
            },
            //跳转到首页
            showFirstPage() {
                if (this.dataList.length > 10) {
                    this.showPageData(1, this.dataList);
                } else {
                    this.pageIndex = 0;
                    this.strartQueryPOI(this.queryText, this.region);
                }
            },
            //下一页
            showNextPage() {
                if (this.pageIndex + 1 >= this.allPage) {
                    toastr.warning('已经是最后一页！');
                    return;
                }
                this.pageIndex = this.pageIndex + 1;

                if (this.dataList.length > 10) {
                    this.showPageData(this.pageIndex + 1, this.dataList);
                } else {
                    this.strartQueryPOI(this.queryText, this.region);
                }
            },
            //上一页
            showPretPage() {
                if (this.pageIndex - 1 < 0) {
                    toastr.warning('已经是第一页！');
                    return;
                }
                this.pageIndex = this.pageIndex - 1;
                if (this.dataList.length > 10) {
                    this.showPageData(this.pageIndex + 1, this.dataList);
                } else {
                    this.strartQueryPOI(this.queryText, this.region);
                }
            },
            //跳转坐标点
            toPoint(index) {
                let _this = this;
                let dataListElement = this.dataList[index];
                if (dataListElement.location) {
                    this.$parent.view.goTo([dataListElement.location.lng, dataListElement.location.lat]).then(function () {
                        _this.$parent.view.popup.open({
                            title: dataListElement.name,
                            content: dataListElement.address,
                            location: [dataListElement.location.lng, dataListElement.location.lat]
                        });
                    })
                }
            },
            //显示分页结果
            showPageData(thispage, arrResultData) {
                let tableData = this.getTableData(thispage, 10, arrResultData);
                var inhtml = "";
                for (let i = 0; i < tableData.data.length; i++) {
                    inhtml += '<div class="querybar-site" onclick="strartQueryPOI(&quot;' + this.queryText + '&quot;,&quot;' + tableData.data[i].name + '&quot,&quot;' + "历史" + '&quot;);"> <div class="querybar-sitejj"> <h3>'
                        + ((thispage - 1) * 10 + (i + 1)) + '、' + tableData.data[i].name + '</h3> <p>' + '' + '</p> </div> </div>';
                }
                //分页信息
                var _fyhtml;
                if (this.allPage > 1)
                    _fyhtml = '<div class="querybar-ye querybar-fr">' + (this.pageIndex + 1) + '/' + this.allPage + '页  <a href="javascript:showFirstPage()">首页</a> <a href="javascript:showPretPage()">&lt;</a>  <a href="javascript:showNextPage()">&gt;</a> </div>';
                else
                    _fyhtml = '';
                //底部信息
                inhtml += '<div class="querybar-page"><div class="querybar-fl">找到<strong>' + arrResultData.length + '</strong>条结果</div>' + _fyhtml + '</div>';
                $("#querybar_resultlist_view").html(inhtml);
                $("#querybar_resultlist_view").show();
            },
            //获取页码对应的数据
            getTableData(page = 1, pageSize = 10, totalData = []) {
                const {length} = totalData;
                const tableData = {
                    data: [],
                    page,
                    pageSize,
                    length,
                };
                if (pageSize >= length) { //pageSize大于等于总数据长度，说明只有1页数据或没有数据
                    tableData.data = totalData;
                    tableData.page = 1;//直接取第一页
                } else { //pageSize小于总数据长度，数据多余1页
                    const num = pageSize * (page - 1);//计算当前页（不含）之前的所有数据总条数
                    if (num < length) { //如果当前页之前所有数据总条数小于（不能等于）总的数据集长度，则说明当前页码没有超出最大页码
                        const startIndex = num;//当前页第一条数据在总数据集中的索引
                        const endIndex = num + pageSize - 1;//当前页最后一条数据索引
                        tableData.data = totalData.filter((_, index) => index >= startIndex && index <= endIndex);//当前页数据条数小于每页最大条数时，也按最大条数范围筛取数据
                    } else { //当前页码超出最大页码，则计算实际最后一页的page，自动返回最后一页数据
                        const size = parseInt(length / pageSize); //取商
                        const rest = length % pageSize; //取余数
                        if (rest > 0) { //余数大于0，说明实际最后一页数据不足pageSize，应该取size+1为最后一条的页码
                            tableData.page = size + 1;//当前页码重置，取size+1
                            tableData.data = totalData.filter((_, index) => index >= (pageSize * size) && index <= length);
                        } else if (rest === 0) { //余数等于0，最后一页数据条数正好是pageSize
                            tableData.page = size;//当前页码重置，取size
                            tableData.data = totalData.filter((_, index) => index >= (pageSize * (size - 1)) && index <= length);
                        } //注：余数不可能小于0
                    }
                }
                return tableData;
            },
            //清除坐标点
            clearPointArr() {
                for (let i = 0; i < this.pointArr.length; i++) {
                    this.$parent.view.graphics.remove(this.pointArr[i]);
                }
            },
            initSeachForm(){
                for (let i = 0; i < this.pointArr.length; i++) {
                    this.$parent.view.graphics.remove(this.pointArr[i]);
                }
                this.pageIndex = 0;
                this.queryText = "";
                this.dataList = [];
                this.pointArr = [];
                this.allPage = 0;
                this.region = "全国";

                $("#txt_querypoi").val("");
                this.hideAllQueryBarView();
            },
        },
        mounted() {
            this.init();
            window.clearHistory = this.clearHistory;
            window.strartQueryPOI = this.strartQueryPOI;
            window.toPoint = this.toPoint;
            window.showFirstPage = this.showFirstPage;
            window.showPretPage = this.showPretPage;
            window.showNextPage = this.showNextPage;
        },
    }
</script>

<style lang="less">
  .querybar-ssk {
    max-height: 80% !important;
    width: 320px !important;
    position: absolute;
    right: 15px;
    top: 15px;
    z-index: 9;

    .querybar-ssls i {
      color: #fff;
      margin-right: 10px;
    }

    .querybar-ssk1 {
      color: #ffffff;
      background-color: rgba(63, 72, 84);
      border: none;
      width: 260px;
      height: 40px;
      line-height: 40px;
      font-size: 16px;
      text-indent: 8px;
      outline: none;
      float: left;
      box-shadow: 0px 2px 6px #3a3c42;
      border-top-left-radius: 2px;
      border-bottom-left-radius: 2px;
    }

    .querybar-ssk1:focus {
      border: 1px solid rgba(155, 223, 255, 0.9);
      background-color: rgba(63, 72, 84, 0.9);
    }

    .querybar-ssk2 {
      width: 50px;
      height: 40px;
      float: left;
      border: none;
      cursor: pointer;
      outline: none;
      background-color: rgba(35, 68, 117, 0.85);
    }

    input, button, select, textarea {
      font-family: inherit;
      font-size: inherit;
      line-height: inherit;
    }

    .querybar-sbox {
      width: 260px;
      padding: 10px;
      box-shadow: 1px 2px 1px rgba(220, 220, 220, 0.3);
      background: rgba(63, 72, 84, 0.9);
      overflow: auto;
      max-height: calc(100vh - 150px)
    }

    /*-------滚动条整体样式----*/

    .querybar-sbox::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }

    /*滚动条里面小方块样式*/

    .querybar-sbox::-webkit-scrollbar-thumb {
      border-radius: 100px;
      -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      background: #212020;
    }

    /*滚动条里面轨道样式*/

    .querybar-sbox::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      border-radius: 0;
      background: rgba(0, 0, 0, 0.1);
    }


    ::-webkit-input-placeholder { /* WebKit browsers */
      color: #A9A9A9;
    }

    :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
      color: #A9A9A9;
      opacity: 1;
    }

    ::-moz-placeholder { /* Mozilla Firefox 19+ */
      color: #A9A9A9;
      opacity: 1;
    }

    :-ms-input-placeholder { /* Internet Explorer 10+ */
      color: #A9A9A9;
    }

    /*搜索栏*/

    .querybar-fl {
      float: left;
    }

    .querybar-fr {
      float: right;
    }

    .querybar-clear {
      clear: both;
    }

    .querybar-clear5 {
      clear: both;
      height: 5px;
    }

    .querybar-clear10 {
      clear: both;
      height: 10px;
    }

    .querybar-sstab {
      height: 18px;
      padding: 5px;
      background: #f7f7f7;
      border: solid 1px #e0e0e0;
      border-radius: 4px;
    }

    .querybar-sstab ul {
      margin: 0;
      padding: 0;
    }

    .querybar-sstab ul li {
      width: 70px;
      height: 18px;
      padding: 0 20px;
      line-height: 18px;
      text-align: center;
      list-style-type: none;
      float: left;
      font-size: 12px;
      border-right: solid 1px #e0e0e0;
      cursor: pointer;
    }

    .querybar-sstab ul li a {
      font-size: 12px;
      text-decoration: none;
      color: #000000;
    }

    .querybar-sstab ul li a:hover {
      color: #dcdcdc;
    }

    .querybar-kbtab {
      padding-bottom: 10px;
      overflow: hidden;
      border-bottom: solid 1px #CCCCCC;
    }

    .querybar-kbtab ul {
      margin: 0;
      padding: 0;
    }

    .querybar-kbtab ul li {
      list-style-type: none;
      width: 60px;
      float: left;
      text-align: center;
    }

    .querybar-kbtab ul li a {
      font-size: 12px;
      text-decoration: none;
      color: #999;
    }

    .querybar-kbtab ul li a img {
      border: none;
    }

    .querybar-kbtab ul li a:hover {
      color: #dcdcdc;
    }

    .querybar-ssls {
    }

    .querybar-ssls ul {
      margin: 0;
      padding: 10px 0;
    }

    .querybar-ssls li {
      font-size: 12px;
      line-height: 20px;
      list-style-type: none;
      padding-left: 10px;
    }

    .querybar-ssls i {
      margin-right: 10px;
    }

    .querybar-ssls li a {
      text-decoration: none;
      color: #dcdcdc;
    }

    .querybar-ssls li a:hover {
      color: #fff;
    }

    .querybar-znbox {
      width: 260px;
      box-shadow: 1px 2px 1px rgba(0, 0, 0, .15);
      background: rgba(63, 72, 84, 0.9);
      overflow: hidden;
    }

    .querybar-znts {
    }

    .querybar-znts ul {
      margin: 0;
      padding: 0;
    }

    .querybar-znts li {
      font-size: 12px;
      height: 36px;
      line-height: 36px;
      list-style-type: none;
      padding-left: 20px;
    }

    .querybar-znts i {
      margin-right: 10px;
    }

    .querybar-znts li a {
      text-decoration: none;
      color: #dcdcdc;
    }

    .querybar-znts li a:hover {
      color: #fff;
    }


    .querybar-site {
      padding: 10px 8px;
      border-top: solid 1px #eaeaea;
      overflow: hidden;
    }

    .querybar-site :hover {
      background-color: rgba(63, 72, 84, 1);
    }

    .querybar-sitejj {
      width: 220px;
      float: left;
    }

    .querybar-sitejj h3 {
      margin: 0;
      padding: 0;
      font-size: 14px;
      padding-bottom: 6px;
      color: #dcdcdc;
      font-weight: bold;
    }

    .querybar-sitejj p {
      margin: 0;
      padding: 0;
      font-size: 12px;
      line-height: 20px;
      color: #999;
    }

    .querybar-star {
      color: #ff675a;
      font-size: 12px;
      line-height: 20px;
    }

    .querybar-page {
      font-size: 12px;
      color: #fff;
    }

    .querybar-ye a {
      text-decoration: none;
      padding: 4px 6px;
      color: #fff;
      border: solid 1px #ccc;
      margin-right: 4px;
    }

    .querybar-ye a:hover {
      color: #fff;
      border-color: #dcdcdc;
    }

    .querybar-dtit {
      height: 44px;
      line-height: 44px;
      font-size: 14px;
      text-indent: 10px;
      background: #3385ff;
      color: #fff;
    }

    .querybar-itr {
      padding: 8px 0;
    }

    .querybar-itrtit {
      font-size: 12px;
      height: 22px;
      line-height: 22px;
      padding: 4px 0;
    }

    .querybar-more {
      float: right;
      text-decoration: none;
      font-size: 12px;
      color: #999;
    }

    .querybar-itrcon {
      padding: 8px 0;
      border-top: dashed 1px #eee;
    }

    .querybar-itrcon p {
      margin: 0;
      padding: 0;
      font-size: 12px;
      line-height: 20px;
      color: #dcdcdc;
    }

    .querybar-itrcon a {
      text-decoration: none;
    }

    .querybar-star_orange {
      font-size: 12px;
      line-height: 20px;
      color: #ffac2d;
    }


    /*全部分类*/

    .querybar-allsort {
      position: absolute;
      width: 230px;
      padding: 4px;
      background: rgba(63, 72, 84, 0.9);
      border: solid 1px #e0e0e0;
    }

    .querybar-sort {
      padding: 6px 0;
      overflow: hidden;
    }

    .querybar-sorta {
      width: 60px;
      padding-top: 4px;
      float: left;
      font-size: 12px;
      font-weight: bold;
      color: #666;
    }

    .querybar-sortb {
      width: 170px;
      float: right;
    }

    .querybar-sortb ul {
      margin: 0;
      padding: 0;
    }

    .querybar-sortb ul li {
      list-style-type: none;
      float: left;
      padding: 0 10px 2px 0;
    }

    .querybar-sortb ul li a {
      font-size: 12px;
      text-decoration: none;
      color: #777;
    }

    .querybar-sortb ul li a:hover {
      color: #fff;
    }

    /*推荐排序*/

    .querybar-recsort {
      position: absolute;
      left: 126px;
      width: 120px;
      background: rgba(63, 72, 84, 0.9);
      border: solid 1px #e0e0e0;
    }

    .querybar-recsort ul {
      margin: 0;
      padding: 0;
    }

    .querybar-recsort ul li {
      padding: 4px 0 6px 0;
      list-style-type: none;
      text-align: center;
      border-top: solid 1px #e0e0e0;
    }

    .querybar-recsort ul li a {
      font-size: 12px;
      text-decoration: none;
      color: #777;
    }

    .querybar-recsort ul li a:hover {
      color: #fff;
    }
  }
</style>
