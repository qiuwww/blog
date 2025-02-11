<template>
  <div class="mianMapDiv">
    <Map :url="configUrl" class="mapclass" @onload="onMapload" map-key="bigScreen"/>
    <div class="office-header">
      <div class="title-info">云享乡村 <span style="font-family: 'cuhei';">●</span> {{pageinformation.title}}</div>
      <div class="analysis-info">{{systemTime}}</div>
      <div @click='back()'><Icon  type="ios-arrow-dropleft" style="font-size:1.5vw;
    position: absolute;
    top: 6px;
    right: 10px;
    color: white;" /></div>
      <div class="analysis-water"><img src="../../assets/bigScreenImg/天气.png"><span>{{todayWeather}}</span></div>
    </div>

    <div id="nav">
      <div class="navWrap">
        <ul class="mainNav">
          <li v-for="(item, index) in bottomMenu" :index="(index +1)" :key="index" @click="itemClick(index+1,item.path)">
            <div v-if="index==0" class="nav-box active">
              <i :class="'icon-nav icon-nav'+(index + 1)"></i>
              <span class="label active">{{item.name}}</span>
            </div>
            <div v-else class="nav-box">
              <i :class="'icon-nav icon-nav'+(index + 1)"></i>
              <span class="label">{{item.name}}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!--图层管理-->
    <layer-management @func="getDataSource" ref="layerManagement" :layerShow="layerShow"
                      :viewer="viewer"></layer-management>


    <!--乡村本底-->
    <rural-local-left v-if="menuPath==='xcbd' && isOpen && dataarr.xcbd" :data="dataarr.xcbd"></rural-local-left>
    <rural-local-right @flyTo="flyTo" v-if="menuPath==='xcbd' && isOpen && dataarr.xcbd" :data="dataarr.xcbd" :legendarr="legendarr"></rural-local-right>

    <!--乡村规划-->
    <developmentleft v-if="menuPath==='xcgh' && isOpen && dataarr.xcgh" :data="dataarr.xcgh"></developmentleft>
    <developementRight @flyTo="flyTo" v-if="menuPath==='xcgh' && isOpen && dataarr.xcgh" :data="dataarr.xcgh" :legendarr="legendarr"></developementRight>
    <!--智慧运营-->
    <IntelligenceOperationsLeft @flyTo="flyTo" v-if="menuPath==='yykf' && isOpen && dataarr.yykf" :data="dataarr.yykf"></IntelligenceOperationsLeft>
    <IntelligenceOperationsRight v-if="menuPath==='yykf' && isOpen && dataarr.yykf" :data="dataarr.yykf"></IntelligenceOperationsRight>
    <!--项目招商-->
    <right-component @flyTo="flyTo" v-if="menuPath==='xmzs' && isOpen && dataarr.xmzs" :data="dataarr.xmzs"></right-component>
    <left-component v-if="menuPath==='xmzs' && isOpen && dataarr.xmzs" :data="dataarr.xmzs"></left-component>

    <!--村务公开-->
    <vaillageRightComponent v-if="menuPath==='cwgk' && isOpen && dataarr.cwgk" :data="dataarr.cwgk"></vaillageRightComponent>
    <vaillageLeftComponent v-if="menuPath==='cwgk' && isOpen && dataarr.cwgk" :data="dataarr.cwgk"></vaillageLeftComponent>
  </div>
</template>

<script>
    import Map from '../../components/mars-map/Main.vue';
    import layerManagement from "./components/layerManagement";
    import developementRight from "./developmentplans/developementRight";
    import developmentleft from './developmentplans/developmentleft.vue';
    import ruralLocalLeft from './ruralLocal/ruralLocalLeft';
    import ruralLocalRight from './ruralLocal/ruralLocalRight';
    import IntelligenceOperationsLeft from "./IntelligenceOperations/IntelligenceOperationsLeft";
    import IntelligenceOperationsRight from "./IntelligenceOperations/IntelligenceOperationsRight";
    import leftComponent from "./smartOperation/leftComponent";
    import rightComponent from "./smartOperation/rightComponent";

    import vaillageRightComponent from "./villageAffairs/vaillageRightComponent";
    import vaillageLeftComponent from "./villageAffairs/vaillageLeftComponent";
    import {getFirstMenu} from '@/api/zhxc/basicMenuInformation/basicMenuInformation'
    import {getPolygonAndPolyLineAndPoint} from "@/api/zhxc/tScenicSpotManagement/tScenicSpotManagement";
    import axios from "axios";
    import {head} from "@/api/zhxc/bigScreen";
    import {queryTTwoflanksListList} from '@/api/zhxc/tTwoflanksList/tTwoflanksList'

    export default {
        name: 'index',
        components: {
            Map,
            layerManagement,
            developementRight,
            ruralLocalLeft,
            ruralLocalRight,
            developmentleft,
            leftComponent,
            rightComponent,
            IntelligenceOperationsLeft,
            IntelligenceOperationsRight,
            vaillageLeftComponent,
            vaillageRightComponent
        },
        data() {
            return {
                configUrl: "../config/simpleConfig.json",
                viewer: null,
                bottomMenu: [],
                layerPath: '',
                layerShow: '',
                menuPath: "xcbd",
                isLoading: false,
                systemTime: '',
                todayWeather: '',
                isOpen: true,//是否展示两侧侧边栏，默认展示
                dataSource: [],
                path: 'xcbd',
                traficLineFilter: '',
                isshowbasicsmap:false,//是否展示默认图层
                menus:[],
                legendarr:[],//图例集合,
                pageinformation:{},//页面信息
                dataarr:{},//两侧数据集合,
            };
        },
        created() {
            this.dataarr={};
            this.bottomMenu=[];
            this.pageinformation=this.$route.params;
            if(this.pageinformation.hasOwnProperty("id")&&this.pageinformation.hasOwnProperty("title")){
                this.$session.set("pageinformation",this.pageinformation); //存session
            }else{
                this.pageinformation= this.$session.get("pageinformation");
                if(!this.pageinformation){
                  this.pageinformation={id:"34",title:"涪陵新兴"};
                }
            }
            this.getTTwoflanksListList();  
            let _this = this;
            axios.get("http://wthrcdn.etouch.cn/weather_mini?city=重庆")
                .then(function (response) {
                    _this.todayWeather = response.data.data.forecast[0].type + '    ' + response.data.data.wendu + '℃';
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        methods: {
             getTTwoflanksListList(){
                queryTTwoflanksListList({areaId:this.pageinformation.id}).then(res=> {                    
                  if(res){
                      res.data.records.forEach(element => {
                        this.$axios.get('/tempfile'+element.jsonUrl)
                          .then( (response) => {
                             this.dataarr[element.path]=response.data 
                             //this.bottomMenu.push({"path":element.path,"name":element.name});//关联按钮
                          })
                          .catch( (error) => {
                              console.log(error);
                          }); 
                      });                                      
                    }                  
                })           
            },
            //跳转会主页
            back(){
                this.$router.replace("/homepage")
            },
            //判断是否为区位条件
            traficLineFilterByPath(path) {
                this.traficLineFilter = path;
            },
            //展示基础图层
            showbasicsmap() {
              if(this.menus){
                  this.$refs.layerManagement.Changemap(this.menus[0],this.isshowbasicsmap);
              }
            },
            //两侧点击事件
            flyTo(item, i) {
                if (this.traficLineFilter == "qwtj") {
                    if (this.dataSource != null && this.dataSource.length > 0) {
                        let entity = this.dataSource.filter(data => {
                            return data.properties.id._value == item.id;
                        });
                        if (entity != null && entity.length > 0) {
                            if (entity[0] && entity[0].polyline) {
                                let position = entity[0].polyline.positions._value;
                                this.viewer.mars.centerPoint(position[position.length - 1], {
                                    radius: 14000,   //距离目标点的距离
                                    pitch: -50,     //相机方向
                                    duration: 3,    //动画时长
                                    complete: function (e) {//飞行完成回调方法
                                    }
                                });
                            } else {
                                //清除高亮面
                                this.$refs.layerManagement.clearLastHighlightedEntity(false);
                                //高亮面设置
                                this.$refs.layerManagement.highlightedEntity(entity[0], false);
                            }
                        }
                    }
                }
            },
            //地图构造完成回调
            onMapload(viewer) {
                var _this = this;
                _this.setStyleForCompass(true);    
                //3Dtitle展示
                //  var layercfg = {
                //         "name": "大村镇",
                //         "type": "3dtiles",
                //         "url": "http://47.108.155.172:65202/osgb/dc/tileset.json",
                //         "maximumScreenSpaceError": 2,
                //         "maximumMemoryUsage": 8192,
                //         "dynamicScreenSpaceError": true,
                //         "cullWithChildrenBounds": false,
                //         "luminanceAtZenith": 0.6,
                //         "offset": {"z":-854.05} ,
                //         "visible": true
                //     }
                //     layercfg.id = 1987
                //     layercfg.visible = true;
                //     layercfg.flyTo = true;
                //     var layerModel = mars3d.layer.createLayer(layercfg, viewer);

                //     //绑定到图层管理中
                //     viewer.mars.addOperationalLayer(layerModel);        
                viewer.mars.openFlyAnimation(function () {
                    _this.viewer = viewer;
                    _this.layerShow = "1,xcbd";
                    _this.isLoading = true;
                });
            },
            itemClick(index, menuPath) {
                if (this.isLoading) {
                    //设置选中样式，menuName即选中的菜单名称
                    let elementNodeListOf = document.querySelectorAll(".mainNav li");
                    for (let i = 0; i < elementNodeListOf.length; i++) {
                        let attribute = elementNodeListOf[i].getAttribute("index");
                        let htmlDivElement = elementNodeListOf[i].querySelector("div");
                        let htmlSpanElement = elementNodeListOf[i].querySelector("span");
                        if (attribute == index) {
                            htmlDivElement.className = "nav-box active";
                            htmlSpanElement.className = "label active";
                        } else {
                            htmlDivElement.className = "nav-box";
                            htmlSpanElement.className = "label";
                        }
                    }
                    this.menuPath = menuPath;
                    switch (menuPath) {
                        case 'xcbd':
                            this.layerShow = "1," + menuPath;
                            break;
                        case 'xcgh':
                            this.layerShow = "1," + menuPath;
                            break;
                        case 'xmzs':
                            this.layerShow = "0," + menuPath;
                            break;
                        case 'yykf':
                            this.layerShow = "0," + menuPath;
                            break;
                        case 'cwgk':
                            this.layerShow = "1," + menuPath;
                            break;
                    }
                }
            },
            //获取layerManagement 的数据源
            getDataSource(entities) {
                if (this.menuPath == this.path) {
                    //不切换一级菜单，数组追加数据
                    this.dataSource = this.dataSource.concat(entities);
                } else {
                    //切换一级菜单时，清空数组
                    this.dataSource = entities;
                    this.path = this.menuPath;
                }
            },
            setStyleForCompass(val) {
                let compass = document.querySelector(".compass");
                if (val) {
                    compass.classList.remove("compass2");
                    compass.classList.add("compass1");
                } else {
                    compass.classList.remove("compass1");
                    compass.classList.add("compass2");
                }
            }
        },
        mounted() {
            let nowDate = new Date();
            let date = {
                year: nowDate.getFullYear(),
                month: nowDate.getMonth() + 1,
                date: nowDate.getDate()
            };
            getFirstMenu({roleId:31}).then(res=> {
                    if(!res){
                      return
                    }
                    this.bottomMenu=res.data;
                    this.menus=res.data;
                    this.menus = this.menus.filter(item => item.id == 394);
                    this.bottomMenu = this.bottomMenu.filter(item => item.name != '内容管理' && item.name != '数据大屏' && item.name != '系统参数'&& item.name != '基础图层');
                })
            this.systemTime = date.year + '年' + date.month + '月' + date.date + '日'
        },
        watch: {
            $route: {
                handler(val, oldval) {

                },
                // 深度观察监听
                deep: true
            },
            isOpen(val) {
                this.setStyleForCompass(val)
            },
            isshowbasicsmap(val){
                this.showbasicsmap()
            }
        }
    }
</script>

<style lang="less">
  .mianMapDiv {
    position: relative;
    height: 100%;

    .compass1 {
      top: 7% !important;
      right: 22% !important;
      z-index: 110 !important;
    }

    .compass2 {
      top: 7% !important;
      right: 2% !important;
      z-index: 110 !important;
    }

    .office-header {
      top: 0;
      position: absolute;
      height: 6vh;
      width: 100%;
      background: url("../../assets/bigScreenImg/head_bg.png") no-repeat;
      z-index: 888;
      background-size: 100% 100%;
    }

    .analysis-info {
      position: absolute;
      top: 8px;
      right: 50px;
      font-size: 0.9vw;
      color: #fff;
    }

    .analysis-water {
      height: 2vh;
      line-height: 2vh;
      position: absolute;
      top: 8px;
      left: 20px;
      color: #fff;
    }

    .analysis-water span {
      text-align: center;
      margin-left: 10px;
      font-size: 0.9vw;
    }

    .office-header .title-info {
      height: 2em;
      color: #FFF;
      text-align: center;
      font-size: 1.6vw;
      font-family: 'KaiTi';
      font-weight: 900;
      line-height: 2em;
      vertical-align: middle;
      width: 100%;
      letter-spacing: 0;
      position: absolute;
      bottom: 5px;
      /*text-shadow: 0px 1px 0px #999, 0px 2px 0px #888, 0px 3px 0px #777, 0px 4px 0px #666, 0px 5px 0px #555, 0px 6px 0px #444, 0px 7px 0px #333, 0px 8px 7px #001135;*/
    }

    #nav {
      width: 100%;
      position: absolute;
      bottom: 0;
      height: 160px;
      background: url(../../assets/bigScreenImg/bottom.png) bottom;
    }

    .navWrap {
      position: absolute;
      bottom: 0;
      padding-bottom: 20px;
      left: 50%;
      -webkit-transform: translateX(-50%);
      transform: translateX(-50%);

      .mainNav {
        display: flex;

        li {
          position: relative;
          -webkit-box-orient: vertical;
          -webkit-box-direction: normal;
          -ms-flex-direction: column;
          flex-direction: column;
          -webkit-box-pack: end;
          -ms-flex-pack: end;
          justify-content: flex-end;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          padding: 12px 20px;
        }

        .nav-box {
          text-align: center;
        }

        li .label {
          margin-top: 10px;
        }

        .nav-box span {
          font-size: 16px;
          display: block;
          text-align: center;
          color: #d0d0d0;
          user-select: none;
        }

        .nav-box.active span, .nav-box:hover span {
          color: #41b0ff;
        }

        .icon-nav, .nav-box i {
          width: 66px;
          height: 89px;
          display: inline-block;
        }

        .icon-nav {
          vertical-align: middle;
          margin: 0 auto;
          cursor: pointer;
        }

        .nav-box .icon-nav1 {
          background: url(../../assets/bigScreenImg/navlist.dadfde15.png) -106px 18px;
        }

        .nav-box.active .icon-nav1, .nav-box .icon-nav1:hover {
          background: url(../../assets/bigScreenImg/navlist.dadfde15.png) -106px -100px;
        }


        .nav-box .icon-nav2 {
          background: url(../../assets/bigScreenImg/navlist.dadfde15.png) -212px 18px;
        }

        .nav-box.active .icon-nav2, .nav-box .icon-nav2:hover {
          background: url(../../assets/bigScreenImg/navlist.dadfde15.png) -212px -100px;
        }

        .nav-box .icon-nav3 {
          background: url(../../assets/bigScreenImg/navlist.dadfde15.png) -318px 18px;
        }

        .nav-box.active .icon-nav3, .nav-box .icon-nav3:hover {
          background: url(../../assets/bigScreenImg/navlist.dadfde15.png) -318px -100px;
        }

        .nav-box .icon-nav4 {
          background: url(../../assets/bigScreenImg/navlist.dadfde15.png) -424px 18px;
        }

        .nav-box.active .icon-nav4, .nav-box .icon-nav4:hover {
          background: url(../../assets/bigScreenImg/navlist.dadfde15.png) -424px -100px;
        }

        .nav-box .icon-nav5 {
          background: url(../../assets/bigScreenImg/navlist.dadfde15.png) -530px 18px;
        }

        .nav-box.active .icon-nav5, .nav-box .icon-nav5:hover {
          background: url(../../assets/bigScreenImg/navlist.dadfde15.png) -530px -100px;
        }

        .nav-box .icon-nav6 {
          background: url(../../assets/bigScreenImg/navlist.dadfde15.png) -636px 18px;
        }

        .nav-box.active .icon-nav6, .nav-box .icon-nav6:hover {
          background: url(../../assets/bigScreenImg/navlist.dadfde15.png) -636px -100px;
        }

        .nav-box .icon-nav7 {
          background: url(../../assets/bigScreenImg/navlist.dadfde15.png) -742px 18px;
        }

        .nav-box.active .icon-nav7, .nav-box .icon-nav7:hover {
          background: url(../../assets/bigScreenImg/navlist.dadfde15.png) -742px -100px;
        }

        .nav-box .icon-nav8 {
          background: url(../../assets/bigScreenImg/navlist.dadfde15.png) -858px 18px;
        }

        .nav-box.active .icon-nav8, .nav-box .icon-nav8:hover {
          background: url(../../assets/bigScreenImg/navlist.dadfde15.png) -858px -100px;
        }

        .nav-box .icon-nav9 {
          background: url(../../assets/bigScreenImg/navlist.dadfde15.png) -964px 18px;
        }

        .nav-box.active .icon-nav9, .nav-box .icon-nav9:hover {
          background: url(../../assets/bigScreenImg/navlist.dadfde15.png) -964px -100px;
        }
      }
    }
  }
</style>
