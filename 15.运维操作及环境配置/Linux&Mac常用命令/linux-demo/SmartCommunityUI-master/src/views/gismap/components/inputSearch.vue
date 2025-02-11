<template>
  <div id="map-querybar" class="querybar-ssk animation-slide-top   no-print-view">
    <input v-model="searchStr"  id="txt_querypoi" type="search" class="querybar-ssk1" placeholder="搜索 地点  " autocomplete="off"  />
    <button id="btn_querypoi" type="button"  class="querybar-ssk2" @click="searchBaiDuMap">
      <i class="fa fa-search fa-2x"></i>
    </button>
    <div class="querybar-clear"></div>

    <!--历史记录-->
    <div id="querybar_histroy_view" class="querybar-sbox " style="display: none;">
      <div class="querybar-ssls">
        <ul id="querybar_ul_history">
        </ul>
      </div>
      <div>
        <a href="javascript:widget_queryBaiduPOI.clearHistory();" class="querybar-more">删除历史</a>
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

    <!--查看单条结果-->
    <div id="querybar_detail_view" class="querybar-sbox" style="display: none;">
      <div class="querybar-dtit">
        <span id="lbl_poi_name">名称</span>
        <a id="querybar_detail_back" style="float: right; cursor: pointer; font-size: 12px;color: #ffffff;"> &lt;&lt;返回&nbsp;</a>
      </div>
      <div class="querybar-itr">
        <div class="querybar-itrtit">
          <img id="querybar_img_jianjie" src="images/jj.png" class="querybar-fl">&nbsp;简介
          <a id="btnShowDetail" href="" target="_blank" class="querybar-more">详情&gt;</a>
        </div>
        <div id="poi_detail_info" class="querybar-itrcon">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  var _this;
  export default {
    props:{
      map: {
        type: Object
      }
    },
    data() {
      return {
        //搜索字段
        searchStr: '',
        //百度搜索相关配置
        configBaidu: {
          "key": [
            "c3qarrKcqnB9HbCOPfKOHgneH6AGXCVU",//2020-6-6
            "6g6evLsHT4M0DVZnRXRpXDDq1t95ESrg",
            "4j0HA8IeuvAPCl62ni8xCZkBhc2YGr67",
            "F4CZ3cvHf8vbL8rkuTNtx8w2eflpdzj5",
            "qObioeG8HeeQVrOVAGScPVhDzlmv6rL9",
            "bsk3zdnMp02wb7EINNEglNswf7pvKb8S", //mq
            "k9STYeKE6GX8LqQvzFNPANtXimmzGG4R",
          ],
          "url": "http://api.map.baidu.com/place/v2/search",
          "region": "全国"
        },
        key_index: 0,
        //煤业查询条数
        pageSize: 6,
        //查询结果
        arrdata: [],
        //总条数
        counts: 0,
        //总页数
        allpage: 0,
        //当前页
        thispage: 0,
        //搜索结果
        searchResult: [],
        //历史记录
        arrHistory: [],
        //存入cookd的name
        cookieName: 'querypoi_gis',
      };
    },
    methods: {
      //百度POI搜索定位
      searchBaiDuMap() {
        var _this = this;
        var text = _this.searchStr.length
        if (text == 0) {
          toastr.warning('请输入搜索关键字！');
          return;
        }
        //添加历史记录
        this.addHistory(text);
        //如果是坐标
        if (this.isLonLat(text)) {
          // todo 跳转到 坐标点
          // this.centerAtLonLat(text);
          return;
        }
        this.thispage = 1;
        this.queryText = text;
        this.queryRegion = this.configBaidu.region;
        this.queryPOI();
      },
      //查询POI
      queryPOI() {
        var _this = this;
        var key = this.getKey();
        // 从数据库查询获取数据
        $.ajax({
          url: this.configBaidu.url,
          type: "GET",
          dataType: "jsonp",
          timeout: "5000",
          contentType: "application/json;utf-8",
          data: {
            "output": "json",
            "ak": key,
            "scope": 2,         //检索结果详细程度。取值为1 或空，则返回基本信息；取值为2，返回检索POI详细信息
            "page_size": this.pageSize,
            "page_num": (this.thispage - 1),
            "query": _this.searchStr,
            "region": _this.configBaidu.region
          },
          success: function (data) {
            if (data.status !== 0) {
              toastr.error("请求失败(" + data.status + ")：" + data.message);
              return;
            }
            var resultData = data.results;
            //将查询结果展示
            _this.showPOIPage(resultData, data.total);
          },
          error: function (data) {
            toastr.error("请求出错(" + data.status + ")：" + data.statusText);
          }
        });

      },
      //获取key
      getKey() {
        var _this = this;
        var thisidx = (_this.key_index++) % (_this.configBaidu.key.length);
        return this.configBaidu.key[thisidx];
      },
      //添加到历史
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
      //坐标定位处理
      isLonLat: function (text) {
        var reg = /^-?((0|1?[0-7]?[0-9]?)(([.][0-9]*)?)|180(([.][0]*)?)),-?((0|[1-8]?[0-9]?)(([.][0-9]*)?)|90(([.][0]*)?))$/;   /*定义验证表达式*/
        return reg.test(text);     /*进行验证*/
      },
      //第一页
      showFirstPage() {
        this.thispage = 1;
        this.queryPOI();
      },
      //下一页
      showNextPage: function () {
        this.thispage = this.thispage + 1;
        if (this.thispage > this.allpage) {
          this.thispage = this.allpage;
          toastr.warning('当前已是最后一页了');
          return;
        }
        this.queryPOI();
      },
      //上一页
      showPretPage: function () {
        this.thispage = this.thispage - 1;
        if (this.thispage < 1) {
          this.thispage = 1;
          toastr.warning('当前已是第一页了');
          return;
        }
        this.queryPOI();
      },
      //展示查询结果
      showPOIPage(data,counts){
        this.arrdata = data;
        this.counts = counts;
        if (this.counts < data.length) {
          this.counts = data.length;
        }
        this.allpage = Math.ceil(this.counts / this.pageSize);

        var inhtml = "";
        if (this.counts == 0) {
          inhtml += '<div class="querybar-page"><div class="querybar-fl">没有找到"<strong>' + this.queryText + '</strong>"相关结果</div></div>';
        } else {
          for (var index = 0; index < this.arrdata.length; index++) {
            var item = this.arrdata[index];
            var startIdx = (this.thispage - 1) * this.pageSize;
            item.index = startIdx + (index + 1);

            var _id = index;
            var _mc;
            var _location = "["+this.arrdata[index].location.lng+","+this.arrdata[index].location.lat+"]";
            if (item.detail_info && item.detail_info.detail_url) {
              _mc = '<a target="_black" style="color: #515a6e; ">' + item.name + '</a>';
            }
            else {
              _mc = item.name;
            }

            inhtml += '<div class="querybar-site" onclick="window.showDetail(\'' + _location + '\')"> <div class="querybar-sitejj"> <h3>'
              + item.index + '、' + _mc + '</h3> <p>' + (item.address || '') + '</p> </div> </div>';
          };

          //分页信息
          var _fyhtml;
          if (this.allpage > 1)
            _fyhtml = '<div class="querybar-ye querybar-fr">' + this.thispage + '/' + this.allpage + '页  <a href="javascript:window.showFirstPage()">首页</a> <a href="showPretPage()">&lt;</a>  <a href="javascript:window.showNextPage()">&gt;</a> </div>';
          else
            _fyhtml = '';

          //底部信息
          inhtml += '<div class="querybar-page"><div class="querybar-fl">找到<strong>' + this.counts + '</strong>条结果</div>' + _fyhtml + '</div>';
        }
        $("#querybar_resultlist_view").html(inhtml);
        $("#querybar_resultlist_view").show();
      },
      //展示单条数据
      showDetail(location){
        let coordinate = JSON.parse(location);
        this.flyTo(coordinate);
      },
      //移动  coordinate坐标  zoom图例 time飞行时间
      flyTo(coordinate,zoom,time){
        if(!zoom){
          zoom=12
        }
        if(!time){
          time=2000
        }
        this.map.getView().animate({center:coordinate},{zoom:zoom},{duration:time})
      },
  },
    //页面创建完成调用
    mounted() {
      window.showDetail = this.showDetail;
      window.showFirstPage = this.showFirstPage;
      window.showPretPage = this.showPretPage;
      window.showNextPage = this.showNextPage;
    }
  };
</script>
<style>
  .querybar-ssk {
    position: absolute;
    left: 15px;
    top: 15px;
    z-index: 999;
  }


  .querybar-ssk1 {
    width: 222px;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    text-indent: 8px;
    outline: none;
    float: left;
    border: none;
    box-shadow: 0px 2px 6px #3a3c42;
    border-top-left-radius: 2px;
    border-bottom-left-radius: 2px;
    background-color: rgba(255, 255, 255, 0.9);
    color: #080808;
  }

  .querybar-ssk1:focus {
    border: 1px solid rgba(155, 223, 255, 0.9);
    background-color: rgba(255, 255, 255, 0.9);
  }

  .querybar-ssk2 {
    width: 50px;
    height: 40px;
    float: right;
    border: none;
    cursor: pointer;
    outline: none;
    background-color: rgba(255, 255, 255, 0.9);
  }

  .querybar-sbox {
    width: 260px;
    padding: 10px;
    box-shadow: 1px 2px 1px rgba(220, 220, 220, 0.3);
    color: #080808;
    background-color: rgba(255, 255, 255, 0.9);
    overflow: hidden;
  }
  @media screen and (max-width: 640px) {
    .querybar-ssk1 {
      width: 200px;
    }
    .querybar-ssk2 {
      width: 45px;
    }
    .querybar-sbox {
      width: 200px;
    }
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
    box-shadow: 1px 2px 1px rgba(0,0,0,.15);
    background: rgba(63, 72, 84,0.9);
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
    background-color: rgba(234,234, 234, 21);
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
    color: #080808;
    font-weight: bold;
  }

  .querybar-sitejj p {
    margin: 0;
    padding: 0;
    font-size: 12px;
    line-height: 20px;
    color: #080808;
  }

  .querybar-star {
    color: #ff675a;
    font-size: 12px;
    line-height: 20px;
  }

  .querybar-page {
    font-size: 12px;
    color:#fff;
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
    background: rgba(63, 72, 84,0.9);
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
    background: rgba(63, 72, 84,0.9);
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

</style>
