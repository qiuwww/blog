<template>
  <div id="content" class="myMapClass">
    <!--三维地图-->
    <div id="mapEntity" style="height: 100%; margin-top: 13px;border-radius: 12px 12px 0px 0px;border: 1px solid #fff;"
         :style="{'margin-left':isOpen? '0px':'0px'}">
      <Map :url="configUrl" @onload="onMapload" map-key="mapEntity"/>
    </div>
    <!--    左侧-->
    <leftstatistics ref="child" v-model="leftshow" v-show="isOpen"/>
    <!--左侧开关-->
    <div  :class=" isOpen? 'sidebar':'sidebarActive'" @click="isOpen = !isOpen"
          title="侧边栏展示">
    </div>
    <!--三维地图-->
    <div class="cesiumMap" style="right:  60px" @click="cesiumMapClick"
         title="二维地图">
      <Icon type="md-globe"></Icon>
    </div>
    <!--    底部-->
    <row class="bottom-class" justify="center" :style="{'left':isOpen? ' calc(50% - 270px)':'calc(50% - 500px)','right':isOpen? ' calc(50% - 736px)':'calc(50% - 539px)'}">
      <div style="width: 141px;" v-bind:class="{ imgboxShequDiv:true , 'imgboxShequSelect':Btsq }">
        <div class="imgbox ">
          <div class="imgboxShequ">
            <img class="imgbottom_1" :src="urlsq" @click="setMap('社区')">
          </div>
        </div>
        <div class="textlabel">社区</div>
      </div>
      <div style="width: 141px;" v-bind:class="{ imgboxXiaoquDiv:true , 'imgboxXiaoquSelect':Btfw }">
        <div class="imgbox ">
          <div class="imgboxXiaoqu">
            <img class="imgbottom_4" :src="urlfw" @click="setMap('小区')">
          </div>

        </div>
        <div class="textlabel">小区</div>
      </div>
      <div style="width: 141px;" v-bind:class="{ imgboxShehuiDiv:true , 'imgboxShehuiSelect':Btzz }">
        <div class="imgbox ">
          <div class="imgboxShehui">
            <img class="imgbottom_2" :src="urlzz" @click="setMap('社会组织')">
          </div>

        </div>
        <div class="textlabel">社会组织</div>
      </div>
      <div style="width: 141px;" v-bind:class="{ imgboxShijianDiv:true , 'imgboxShijianSelect':Btsj }">
        <div class="imgbox ">
          <div class="imgboxShijian">
            <img class="imgbottom_3" :src="urlsj" @click="setMap('事件')">
          </div>

        </div>
        <div class="textlabel">网格事件</div>
      </div>
      <div style="width: 141px;" v-bind:class="{ imgboxGongongDiv:true , 'imgboxGongongSelect':Btss }">
        <div class="imgbox ">
          <div class="imgboxGongong">
            <img class="imgbottom_5" :src="urlss" @click="setMap('公共设施')">
          </div>

        </div>
        <div class="textlabel">公共设施</div>
      </div>
      <!--      <div style="width:141px;">-->
      <!--        <div class="imgbox">-->
      <!--          <img class="imgbottom_6" :src="urlsh" @click="setMap('商户档案')">-->
      <!--        </div>-->
      <!--        <div class="textlabel">商户档案</div>-->
      <!--      </div>-->
      <div class="dividerT"/>
      <div style="width:141px;" v-bind:class="{ imgboxAllDiv:true , 'imgboxAllSelect':BtAll }">
        <div class="imgbox">
          <div class="imgboxAll">
            <img class="imgbottom_7" :src="urlall" @click="setMap('全部')">
          </div>

        </div>
        <div class="textlabel">全部</div>
      </div>
    </row>
    <lookBasicPerson
      v-model="personShow"
      :update-model-show="true"
      :basic-person-id="BasicPersonId"
      modal-title="人员档案查看"
    />

    <lookHousingManage
      v-model="housingShow"
      :update-model-show="true"
      :basic-housing-manage-id="BasicHousingManageId"
      modal-title="房屋查看"
    />

    <lookConstruct
      v-model="buildingShow"
      :update-model-show="true"
      :t-building-archives-id="TBuildingArchivesId"
      modal-title="设施查看"
    />
    <lookBuildingArchives
      v-model="loudongShow"
      :update-model-show="true"
      :t-building-archives-id="loudongId"
      modal-title="楼栋查看"
    />

    <lookTZhsqMerchantProfile
      v-model="merchantShow"
      :update-model-show="true"
      :t-zhsq-merchant-profile-id="TZhsqMerchantProfileId"
      modal-title="商户查看"
    />

    <!-- <lookTZhsqEventList v-model="eventShow" :t-zhsq-event-list-id="TZhsqEventListId" modal-title="网格事件详情查看" /> -->
    <taskDetail v-model="eventShow" :t-zhsq-task-list-id="TZhsqEventListId" modal-title="网格事件详情查看"/>
    <lookBasicSocialOrganization
      v-model="organizationShow"
      :update-model-show="true"
      :basic-social-organization-id="BasicSocialOrganizationId"
      modal-title="社会组织查看"
    />
    <lookVideo
      v-model="lookVideoShow"
      :look-video-id="lookVideoId"
      modal-title="监控设备查看"
    />
    <div
      id="GeoSmarter_Widget_Map_Layer_Chart_90-geoshow-geoglobemap-chartselector"
      class="geoshow-geoglobemap-chartselector"
    >
      <span class="btn-backdrop"/>
      <span class="btn-column" :class="{'bottom_background':dianji}" @click="changditu()">
        <i>影像</i>
      </span>
      <!-- <span class="btn-column" :class="{'bottom_background':dianjimodel}" @click="showmodel()">
         <i>2.5维地图</i>
       </span>-->
      <span class="btn-pie active">
        <i>天地图</i>
      </span>
    </div>
  </div>
</template>
<script>

  import Map from '../../../components/mars-map/Main.vue';
  import {getCenter} from 'ol/extent'
  import {
    queryBasicHousingListByAnyWayWhere
  } from '@/api/zhsq/basicHouse/basicHouse'
  import {
    queryAllList
  } from '@/api/zhsq/basicGrids/basicGrids'
  import {
    queryTBuildingArchivesListByAnyWayWhere
  } from '@/api/zhsq/tBuildingArchives/tBuildingArchives'
  import {
    queryTZhsqMerchantProfileListByAnyWayWhere
  } from '@/api/zhsq/tZhsqMerchantProfile/tZhsqMerchantProfile'
  import {
    queryBasicSocialOrganizationListByAnyWayWhere
  } from '@/api/zhsq/basicSocialOrganization/basicSocialOrganization'

  import {
    getAllEventList
  } from '@/api/index'

  import lookBasicPerson from '../../zhsq/basicPerson/lookBasicPerson'
  import lookHousingManage from '../../zhsq/basicHouseManage/lookHousingManage'
  import lookConstruct from '../../zhsq/tConstruct/lookConstruct'
  import lookTZhsqMerchantProfile from '../../zhsq/tZhsqMerchantProfile/lookTZhsqMerchantProfile'
  import leftstatistics from '../components/leftgismap.vue'
  import lookBasicSocialOrganization from '../../zhsq/basicSocialOrganization/lookBasicSocialOrganization'
  import taskDetail from '../../zhsq/tZhsqEventList/lookTZhsqEventList'
  import {
    queryAllList as gridsQueryAllList
  } from '@/api/zhsq/basicGrids/basicGrids'

  import {
    queryAllList as getAllEstateList
  } from '@/api/zhsq/basicHousingEstate/basicHousingEstate'

  import lookBuildingArchives from '../../zhsq/tBuildingArchives/lookBuildingArchives'

  import lookVideo from '../components/lookVideo'

  export default {
    components: {
      lookBasicPerson,
      lookHousingManage,
      lookConstruct,
      lookTZhsqMerchantProfile,
      lookBasicSocialOrganization,
      leftstatistics,
      taskDetail,
      lookBuildingArchives,
      lookVideo,
      Map
    },
    data() {
      return {
        isOpen: true,
        lookVideoShow: false,
        lookVideoId: "",
        veideoOverlay: null,
        overlays: [],
        loudongShow: false,
        personShow: false,
        housingShow: false,
        buildingShow: false,
        merchantShow: false,
        organizationShow: false,
        eventShow: false,
        dianji: false, // 高德地图
        dianjimodel: false, // 2.5D
        BtGrid: false, // 网格区域
        Btzoology: false, // 生态
        Btindustry: false, // 产业
        BasicPersonId: '',
        BasicHousingManageId: '',
        TBuildingArchivesId: '',
        TZhsqMerchantProfileId: '',
        BasicSocialOrganizationId: '',
        TZhsqEventListId: '',
        loudongId: '',
        leftshow: true,
        visitChart: {},
        urlsq: '/img/faviconmap/map_ico/gis_sq1.png',
        urlzz: '/img/faviconmap/map_ico/gis_zz1.png',
        urlsj: '/img/faviconmap/map_ico/gis_sj1.png',
        urlfw: '/img/faviconmap/map_ico/gis_fw1.png',
        urlss: '/img/faviconmap/map_ico/gis_ss1.png',
        urlsh: '/img/faviconmap/map_ico/gis_sh1.png',
        urlall: '/img/faviconmap/map_ico/gis_all1.png',
        Btsq: false,
        Btzz: false,
        Btsj: false,
        Btfw: false,
        Btss: false,
        Btsh: false,
        BtAll: false,
        map: null,
        leftClik: false,
        communityid: '',
        FeatureArr: [],
        divArr: [],
        eventGifArr: [],
        gridPriority: [],
        configUrl: "../config/simpleConfig.json",//地图初始化配置json
        viewer: null,//地图视图容器
        iconGeoJson: null,//json对象
        jsonLayer: null,//要素图层
      }
    },
    mounted() {
      //this.init()
      //this.initMapFeature()
      // this.setMap('社区');
      this.Btsq = true;
      window.videoClik = this.videoClik;
    },
    methods: {

      //初始化GeoJson
      initGeoJson() {
        var iconGeoJson = {
          "type": "FeatureCollection",
          "features": []
        }
        return iconGeoJson;
      },
      //初始化feature
      initFeature(type, obj, position) {
        var feature = {
          "type": "Feature",
          "properties": obj,
          "geometry": {
            "type": type,
            "coordinates": position ? position : []
          }
        };
        return feature;
      },
      //初始化jsonLayer
      initLayer(json, v) {
        var _this = this;
        if (json) {
          //加载json数据
          Cesium.GeoJsonDataSource.load(json, {
            clampToGround: true
          }).then(function (dataSource) {
            let newDataSource = new Cesium.CustomDataSource(v);
            //设置样式
            let entities = dataSource.entities.values;
            for (let i = 0; i < entities.length; i++) {
              let entity = entities[i];
              if (entity) {
                //点
                if (entity.billboard) {
                  _this.addPointWithStyle(newDataSource, entity, v);
                } else if (entity.point) {

                }
                //线
                else if (entity.polyline) {
                  _this.addPolylineWithStyle(newDataSource, entity, v);
                }
                //面
                else if (entity.polygon) {
                  _this.addPolygonWithStyle(newDataSource, entity, v);
                }
              }
            }

            //添加到地图
            _this.viewer.dataSources.add(newDataSource);
            _this.viewer.flyTo(newDataSource);
            _this.jsonLayer = newDataSource;
            //关闭loading
            //_this.loadingShow = false;

          }).otherwise(function (error) {
            haoutil.alert(error, "加载数据出错");
          });
        }
      },
      //添加面并设置样式
      addPolygonWithStyle(newDataSource, entity, v) {
        var _this = this;
        if (newDataSource && entity) {

          //背景色
          var polygonColor = "#c71c1c";//默认
          //面透明度
          var alpha = 0.4;
          //面背景色
          var color = new Cesium.Color.fromCssColorString(polygonColor).withAlpha(alpha);


          entity._colordata = color;
          entity.polygon.material = color;

          //求中心点
          var positions = mars3d.draw.attr.polygon.getPositions(entity);
          var ptcenter = mars3d.point.centerOfMass(positions);
          let text = entity.properties.name._value || '';
          entity.position = ptcenter;
          entity.label = {
            text: text,
            font: '14px', //字体样式
            fillColor: Cesium.Color.WHITE,       //字体颜色
            backgroundColor: Cesium.Color.RED,    //背景颜色
            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            outlineColor: Cesium.Color.BLACK,
            outlineWidth: 2,
            verticalOrigin: Cesium.VerticalOrigin.CENTER,//垂直位置
            horizontalOrigin: Cesium.HorizontalOrigin.CENTER,//水平位置
            distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 8000),
            //scaleByDistance: new Cesium.NearFarScalar(10000, 1.0, 500000, 0.1) //根据地图级别放大缩小
          }
          newDataSource.entities.add(entity);
        }

      },

      //添加线并设置样式
      addPolylineWithStyle(newDataSource, entity, v) {
        var _this = this;

      },

      //添加点并设置样式
      addPointWithStyle(newDataSource, entity, v) {
        var _this = this;

        if (newDataSource && entity && entity.billboard) {
          let text = entity.properties.name._value || '';
          let type = entity.properties.type._value || '';
          let img = _this.getDefaultStyle(type)
          //图标显示
          entity.billboard = {
            name :text,
            scale: 1,
            image: img,
            horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            //heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
            scaleByDistance: new Cesium.NearFarScalar(10000, 1.0, 500000, 0.1),
            heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
            disableDepthTestDistance: Number.POSITIVE_INFINITY, //一直显示，不被地形等遮挡
          }
          //点击弹框
          entity.click = function (e) {

          }
          entity.label = {
            text: name,
            font: '14px', //字体样式
            fillColor: Cesium.Color.WHITE,       //字体颜色
            backgroundColor: Cesium.Color.RED,    //背景颜色
            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            outlineColor: Cesium.Color.BLACK,
            outlineWidth: 2,
            verticalOrigin: Cesium.VerticalOrigin.CENTER,//垂直位置
            horizontalOrigin: Cesium.HorizontalOrigin.CENTER,//水平位置
          }
          newDataSource.entities.add(entity);
        }
      },
      // 联动查询
      linkageLeftGisMap(communityid, setMapname) {
        this.leftClik = true
        this.communityid = communityid
        this.removePupop()
        this.removelayer()
        // this.restore()
        if (setMapname && setMapname != '') {
          this.setMap(setMapname)
        }
      },

      // 功能点击事件
      setMap(val) {

        this.removePupop()
        this.removelayer()
        let SearchForm = {}
        this.featureArr = []
        var that = this

        if (this.communityid != '') {
          SearchForm = {
            communityId: this.communityid,
            houseCommunityId: this.communityid,
            legalCommunityId: this.communityid
          }
        }
        let UserObj = JSON.parse(sessionStorage.getItem("UserObj"));
        if (UserObj && UserObj.gridId) {
          SearchForm.gridId = UserObj.gridId;
          SearchForm.houseGridId = UserObj.gridId;
          SearchForm.grid = UserObj.gridId;
          SearchForm.gridsId = UserObj.gridId;

          if (val == '社区' || val == '事件') {
            SearchForm.id = UserObj.gridId;
          } else {
            SearchForm.id = null;
          }
        }
        //构造GeoJson
        this.iconGeoJson = this.initGeoJson();

        if (val == '社区') {
          if (this.Btsq && !this.leftClik) {
            this.restore()
          } else {
            this.urlsq = '/img/faviconmap/map_ico/gis_sq2.png'
            this.restore()
            this.Btsq = true
            this.queryShequ(SearchForm)
          }
        } else if (val == '社会组织') {
          if (this.Btzz && !this.leftClik) {
            this.restore()
          } else {
            this.urlzz = '/img/faviconmap/map_ico/gis_zz2.png'
            this.restore()
            this.Btzz = true
            this.queryBasicSocialOrganization(SearchForm)
          }
        } else if (val == '事件') {
          if (this.Btsj && !this.leftClik) {
            this.restore()
          } else {
            this.urlsj = '/img/faviconmap/map_ico/gis_sj2.png'
            this.restore()
            this.Btsj = true
            this.gridPriority = null
            this.queryEvent(SearchForm)
          }
        } else if (val == '小区') {
          if (this.Btfw && !this.leftClik) {
            this.restore()
          } else {
            this.urlfw = '/img/faviconmap/map_ico/gis_fw2.png'
            this.restore()
            this.Btfw = true
            this.queryBasicHousing(SearchForm)
          }
        } else if (val == '公共设施') {
          if (this.Btss && !this.leftClik) {
            this.restore()
          } else {
            this.urlss = '/img/faviconmap/map_ico/gis_ss2.png'
            this.restore()
            this.Btss = true
            SearchForm.buildingType = '2,3,4,5,6,7,8,9'
            this.queryBuildingArchives(SearchForm)
          }
        } else if (val == '商户档案') {
          if (this.Btsh && !this.leftClik) {
            this.restore()
          } else {
            this.urlsh = '/img/faviconmap/map_ico/gis_sh2.png'
            this.restore()
            this.Btsh = true
            // this.queryMerchantProfile(SearchForm)
          }
        } else if (val == '全部') {
          this.restore()
          this.BtAll = true
          this.urlall = '/img/faviconmap/map_ico/gis_all2.png'
          this.queryShequ(SearchForm)
          this.queryBasicSocialOrganization(SearchForm)
          this.queryEvent(SearchForm)
          this.queryBasicHousing(SearchForm)

          this.queryBuildingArchives(SearchForm)
          // this.queryMerchantProfile(SearchForm)
        }
        if (!this.leftClik) {
          this.$refs['child'].layermanageInit(this.communityid, true)
        }
        this.leftClik = false

      },

      // 社区专题
       queryShequ(SearchForm) {
        var _this = this
         queryAllList(SearchForm).then((res) => {
          if (res && res.success) {
            res.data.forEach((element) => {
              if (element.position) {
                let objData = JSON.parse(element.position)
                var arr = []
                var newArr = []
                for (let i = 0; i < objData.length; i++) {
                  newArr.push(objData[i])
                  if (i % 2 == 1) {
                    arr.push(newArr)
                    newArr = []
                  }
                }
                let properties = {
                  type: 'shequ',
                  name: element.name,
                  communityId: element.communityId
                }
                //构造feature
                var feature = _this.initFeature("Polygon", properties);
                if (arr) {
                  feature.geometry.coordinates[0] = arr;
                  _this.iconGeoJson.features.push(feature);
                }
              }
            });
            if (_this.iconGeoJson.features.length > 0) {
              _this.initLayer(_this.iconGeoJson, "path");
            } else {
              //关闭loading
              //this.loading = false;
            }
          }
        }).catch(err => {
          _this.iconGeoJson = [];
          _this.$Message.error("社区查询失败");
        });
        // this.vector.setSource(this.source)
      },
      // 社会组织专题
      queryBasicSocialOrganization(SearchForm) {
        if (SearchForm.gridId) {
          SearchForm.id = SearchForm.gridId
        }
        var _this = this
        queryBasicSocialOrganizationListByAnyWayWhere(SearchForm).then(res => {
          if (res && res.success) {
            var organizationData = res.data
            for (let i = 0; i < organizationData.length; i++) {
              if (organizationData[i].position) {
                let type = 'shanghu'
                switch (organizationData[i].type) {
                  case '1':
                  case '2': {
                    type = 'shanghu'
                    break
                  }
                  case '3':
                  case '5':
                  case '4': {
                    type = 'jiaoyu'
                    break
                  }
                  case '6': {
                    type = 'weisheng'
                    break
                  }
                }
                let position = JSON.parse(organizationData[i].position)
                let properties = {
                  id: organizationData[i].id,
                  type: type,
                  name: organizationData[i].name,
                  position: position
                }
                //构造feature
                let feature = _this.initFeature("Point",  properties,position);
                if (position) {
                  _this.iconGeoJson.features.push(feature);
                }

              }
            }
            if (_this.iconGeoJson.features.length > 0) {
              _this.initLayer(_this.iconGeoJson, "path");
            } else {
              //关闭loading
              //this.loading = false;
            }
          } else {
            _this.$Message.error('数据加载失败！')
          }
        }).catch(res => {
          _this.$Message.error('数据加载失败！')
        })
      },
      // 网格事件专题
      queryEvent(SearchForm) {
        var that = this
        if (SearchForm.gridId) {
          SearchForm.id = SearchForm.gridId
        }
        if (SearchForm.communityId || SearchForm.gridId) {
          gridsQueryAllList(SearchForm).then(res => {
            if (res && res.success) {
              that.gridPriority = res.data
              that.getEventListData(10, 1, [])
            } else {
              that.$Message.error('获取网格数据失败，请重新刷新')
            }
          })
        } else {
          that.getEventListData(10, 1, [])
        }
      },
      // 小区专题
      queryBasicHousing(SearchForm) {
        var _this = this

        getAllEstateList(SearchForm).then(res => {
          if (res && res.success) {
            res.data.forEach((element) => {
              if (element.location) {
                const objData = JSON.parse(element.location)
                var arr = []
                var newArr = []
                for (let i = 0; i < objData.length; i++) {
                  newArr.push(objData[i])
                  if (i % 2 == 1) {
                    arr.push(newArr)
                    newArr = []
                  }
                }

                let properties = {
                  type: 'xiaoqu',
                  name: element.name,
                  communityId: element.communityId
                }
                //构造feature
                let feature = _this.initFeature("Polygon", properties);
                if (arr) {
                  feature.geometry.coordinates[0] = arr;
                  _this.iconGeoJson.features.push(feature);
                }
              }
            })
            SearchForm.buildingType = '1'
            queryTBuildingArchivesListByAnyWayWhere(SearchForm).then(rest => {
              if (rest.success) {
                rest.data.forEach((element) => {
                  if (element.location) {
                    const objData = JSON.parse(element.location)
                    var arr = []
                    var newArr = []
                    for (let i = 0; i < objData.length; i++) {
                      newArr.push(objData[i])
                      if (i % 2 == 1) {
                        arr.push(newArr)
                        newArr = []
                      }
                    }
                    let properties = {
                      type: 'loudong',
                      name: element.housingEstateName,
                      id: element.id,
                    }
                    //构造feature
                    let feature = _this.initFeature("Polygon", properties);
                    if (arr) {
                      feature.geometry.coordinates[0] = arr;
                      _this.iconGeoJson.features.push(feature);
                    }
                    // _this.FeatureArr.push(feature)
                  }
                });
                if (_this.iconGeoJson.features.length > 0) {
                  _this.initLayer(_this.iconGeoJson, "path");
                } else {
                  //关闭loading
                  //this.loading = false;
                }
              } else {
                _this.$Message.error('数据加载失败！')
              }

            }).catch(res => {
              _this.$Message.error('数据加载失败！')
            })
          } else {
            _this.$Message.error('数据加载失败！')
          }
        }).catch(res => {
          _this.$Message.error('数据加载失败！')
        })

      },
      // 公共设施专题
      queryBuildingArchives(SearchForm) {
        var _this = this
        SearchForm.buildingType = '2,3,4,5,6,7,8,9'
        queryTBuildingArchivesListByAnyWayWhere(SearchForm).then(res => {
          if (res && res.success) {
            var buildingArchivesData = res.data
            for (let i = 0; i < buildingArchivesData.length; i++) {
              if (buildingArchivesData[i].location) {
                let type = 'sheshi'
                switch (buildingArchivesData[i].buildingType) {
                  case '1': {
                    type = 'zhuzai'
                    break
                  }
                  case '2': {
                    type = 'xiezilou'
                    break
                  }
                  case '3': {
                    type = 'gongyuan'
                    break
                  }
                  case '4': {
                    type = 'sheshi'
                    break
                  }

                  case '5': {
                    type = 'gongchang'
                    break
                  }
                  case '6':
                  case '7':
                  case '8': {
                    type = 'sheshi'
                    break
                  }
                }

                let position = JSON.parse(buildingArchivesData[i].location)
                let properties = {
                  id: buildingArchivesData[i].id,
                  type: type,
                  name: buildingArchivesData[i].buildingName,
                  position: position
                }
                //构造feature
                let feature = _this.initFeature("Point",  properties,position);
                if (position) {
                  _this.iconGeoJson.features.push(feature);
                }
              }
            }
            let veideoData = [[120.3926520048096, 36.127820132570925], [120.3926520048096, 36.127820132570925]];
            if (veideoData) {

              let iVeideo = 0;
              veideoData.forEach(veideo => {
                if (veideo) {
                  let position = veideo
                  let properties = {
                    id: iVeideo,
                    type: "veideo",
                    name: "沙河湾小区摄像头" + iVeideo,
                    position: position
                  }
                  //构造feature
                  let feature = _this.initFeature("Point",  properties,position);
                  if (position) {
                    _this.iconGeoJson.features.push(feature);
                  }
                }
                iVeideo++
              })
            }
            if (_this.iconGeoJson.features.length > 0) {
              _this.initLayer(_this.iconGeoJson, "path");
            } else {
              //关闭loading
              //this.loading = false;
            }
          } else {
            _this.$Message.error('数据加载失败！')
          }
        }).catch(res => {
          _this.$Message.error('数据加载失败！')
        }).finally(res => {

        })
      },
      // 商户专题
      queryMerchantProfile(SearchForm) {
        var _this = this
        queryTZhsqMerchantProfileListByAnyWayWhere(SearchForm).then(res => {
          if (res && res.success) {
            var merchantData = res.data
            for (let i = 0; i < merchantData.length; i++) {
              if (merchantData[i].location) {
                let position = JSON.parse(merchantData[i].location)
                let properties = {
                  id: merchantData[i].id,
                  type: type,
                  name: merchantData[i].merchantName,
                  position: position
                }
                //构造feature
                let feature = _this.initFeature("Point",  properties,position);
                if (position) {
                  _this.iconGeoJson.features.push(feature);
                }
              }
            }
            if (_this.iconGeoJson.features.length > 0) {
              _this.initLayer(_this.iconGeoJson, "path");
            } else {
              //关闭loading
              //this.loading = false;
            }
          } else {
            _this.$Message.error('数据加载失败！')
          }
        }).catch(res => {
          _this.$Message.error('数据加载失败！')
        }).finally(res => {

        })
      },

      // 调用接口，获取网格事件列表
      getEventListData(pageSize, pageNumber, allData) {
        let gridId = ''
        if (this.gridPriority) {
          this.gridPriority.forEach(i => {
            if (i) {
              gridId += ',' + i.id
            }
          })
        }
        if (gridId != '') {
          gridId.trimStart(',')
        }

        let searchForm = {
          dataFrom: '',
          createTime: null,
          eventsTypeId: '',
          queryStr: '',
          gridId: gridId,
          pageNum: pageNumber, // 当前页数
          pageSize: pageSize // 页面大小
        }
        const _this = this
        getAllEventList(searchForm).then(res => {
          if (res && res.success) {
            const allData = res.data
            let eventData = []
            if (allData.length > 0 && _this.gridPriority != null && _this.gridPriority.length == 0) {
              eventData = [];
            } else {
              eventData = allData;
            }
            if (eventData.length > 0) {
              const center = []

            }
            for (let i = 0; i < eventData.length; i++) {
              const positionArr = []
              //  if (eventData[i].latitude && eventData[i].longitude) {
              if (eventData[i].longitude && eventData[i].latitude) {
                positionArr.push(eventData[i].longitude)
              } else {
                positionArr.push(0)
              }
              if (eventData[i].longitude && eventData[i].latitude) {
                positionArr.push(eventData[i].latitude)
              } else {
                positionArr.push(0)
              }

              const htmlDivElement = document.createElement('div')
              htmlDivElement.style.position = 'relative'
              htmlDivElement.style.left = '-28px'
              htmlDivElement.style.top = '-16px'
              const htmlImgElement = document.createElement('img')
              const htmlContentElement = document.createElement('div')
              let imgPath = '/img/archives/ybsj_1.gif'
              switch (eventData[i].urgentType) {
                case 1: {
                  imgPath = '/img/archives/ptsj_2.gif'
                  break
                }
                case 2: {
                  imgPath = '/img/archives/ybsj_1.gif'
                  break
                }
                case 3: {
                  imgPath = '/img/archives/zdsj_1.gif'
                  break
                }
              }
              htmlImgElement.src = imgPath
              console.log(eventData[i]);
              htmlContentElement.innerHTML = '<span id="headDivSpan" class="title" style=" left:0px;word-wrap:break-word; ">' +
                eventData[i].eventsTypeName + '</span>'
              htmlContentElement.style.display = 'none'
              htmlContentElement.style.top = '-20px'
              htmlContentElement.style.position = 'relative'
              htmlImgElement.style.marginTop = '-16px'
              htmlImgElement.style.marginLeft = '50%'
              htmlImgElement.style.transform = 'translateX(-50%)'

              var overlayer = new Overlay({
                element: htmlDivElement
                // offset: [-14, -47],
                // position: positionArr,
              })
              overlayer.setPosition(positionArr)
              overlayer.setPositioning('center-center')
              // 解决overlay渲染center时出现偏移的问题

              overlayer.setProperties('type', 'shijian')
              _this.map.addOverlay(overlayer)
              htmlImgElement.addEventListener('click', function () {
                // 显示网格事件
                _this.TZhsqEventListId = eventData[i].id.toString()
                _this.eventShow = true
              })

              htmlImgElement.addEventListener('mouseover', function () {
                htmlDivElement.style.zIndex = 10
                htmlContentElement.style.display = 'block'
                htmlDivElement.style.top = '-38px'
              })

              htmlImgElement.addEventListener('mouseout', function () {
                htmlDivElement.style.zIndex = 0
                htmlContentElement.style.display = 'none'
                htmlDivElement.style.top = '-16px'
              })

              htmlDivElement.appendChild(htmlContentElement)
              htmlDivElement.appendChild(htmlImgElement)

              _this.eventGifArr.push(htmlDivElement)
              _this.overlays.push(overlayer)
              // }
            }
          } else {
            this.$Message.error(res.msg)
          }
        })
      },
      // 移除专题地图
      removelayer() {
        this.viewer.dataSources.removeAll();
        this.urlsq = '/img/faviconmap/map_ico/gis_sq1.png'
        this.urlzz = '/img/faviconmap/map_ico/gis_zz1.png'
        this.urlsj = '/img/faviconmap/map_ico/gis_sj1.png'
        this.urlfw = '/img/faviconmap/map_ico/gis_fw1.png'
        this.urlss = '/img/faviconmap/map_ico/gis_ss1.png'
        this.urlsh = '/img/faviconmap/map_ico/gis_sh1.png'
        this.urlall = '/img/faviconmap/map_ico/gis_all1.png'
      },
      // 按钮初始化
      restore() {
        this.Btsq = false
        this.Btzz = false
        this.Btsj = false
        this.Btfw = false
        this.Btss = false
        this.Btsh = false
        this.BtAll = false
      },

      // 显示默认图标
      getDefaultStyle(type) {
        // var zoom = this.map.getView().getZoom();  //获取当前地图的缩放级别
        let imgSrc = '/img/archives/person_off.png'
        if (type) {
          if (type == 'person') {
            imgSrc = '/img/archives/person_off.png'
          } else if (type == 'fangwu') {
            imgSrc = '/img/archives/lou_off.png'
          } else if (type == 'shanghu') {
            imgSrc = '/img/archives/tb_dt_08.png'
          } else if (type == 'jiaoyu') {
            imgSrc = '/img/archives/tb_dt_01.png'
          } else if (type == 'weisheng') {
            imgSrc = '/img/archives/tb_dt_10.png'
          } else if (type == 'xiezilou') {
            imgSrc = '/img/archives/tb_dt_03.png'
          } else if (type == 'gongyuan') {
            imgSrc = '/img/archives/tb_dt_05.png'
          } else if (type == 'sheshi') {
            imgSrc = '/img/archives/tb_dt_02_1.png'
          } else if (type == 'gongchang') {
            imgSrc = '/img/archives/tb_dt_07.png'
          } else if (type == 'xuexiao') {
            imgSrc = '/img/archives/tb_dt_01.png'
          } else if (type == 'yiyuan') {
            imgSrc = '/img/archives/tb_dt_10.png'
          } else if (type == 'dangzheng') {
            imgSrc = '/img/archives/tb_dt_04.png'
          } else if (type == 'veideo') {
            imgSrc = '/img/archives/tb_dt_02.png'
          } else if (type == 'shehuizuzhi') {
            imgSrc = '/img/archives/dan_off.png'
          } else if (type == 'shequ' || properties.type == 'xiaoqu') {


          } else if (properties.type == 'loudong') {

          }
        }

        return imgSrc
      },
      // 显示高亮图标
      getHighlightStyle(properties) {
        var zoom = this.map.getView().getZoom() // 获取当前地图的缩放级别
        let imgSrc = '/img/archives/person_on.png'
        if (properties && properties.type) {
          if (properties.type == 'person') {
            imgSrc = '/img/archives/person_on.png'
          } else if (properties.type == 'xiezilou') {
            imgSrc = '/img/archives/tb_dtgl_03.png'
          } else if (properties.type == 'gongyuan') {
            imgSrc = '/img/archives/tb_dtgl_05.png'
          } else if (properties.type == 'sheshi') {
            imgSrc = '/img/archives/tb_dtgl_02.png'
          } else if (properties.type == 'gongchang') {
            imgSrc = '/img/archives/tb_dtgl_07.png'
          } else if (properties.type == 'xuexiao') {
            imgSrc = '/img/archives/tb_dtgl_01.png'
          } else if (properties.type == 'yiyuan') {
            imgSrc = '/img/archives/tb_dtgl_10.png'
          } else if (properties.type == 'dangzheng') {
            imgSrc = '/img/archives/tb_dtgl_04.png'
          } else if (properties.type == 'veideo') {
            imgSrc = '/img/archives/tb_dtgl_02_1.png';
            let style = new Style({
              // 图标样式
              image: new Icon({
                anchor: [18, 29], // 设置图标偏移
                scale: 1.0, // 图标缩小显示
                anchorOrigin: 'top-right', // 标注样式的起点位置
                anchorXUnits: 'pixels', // X方向单位：分数
                anchorYUnits: 'pixels', // Y方向单位：像素
                offsetOrigin: 'bottom-left', // 偏移起点位置的方向
                opacity: 0.9, // 透明度
                src: imgSrc // 图片路径
              }),
            })
            return style
          } else if (properties.type == 'fangwu') {
            imgSrc = '/img/archives/lou_on.png'
          } else if (properties.type == 'shanghu') {
            imgSrc = '/img/archives/tb_dtgl_08.png'
          } else if (properties.type == 'jiaoyu') {
            imgSrc = '/img/archives/tb_dtgl_01.png'
          } else if (properties.type == 'weisheng') {
            imgSrc = '/img/archives/tb_dtgl_10.png'
          } else if (properties.type == 'shehuizuzhi') {
            imgSrc = '/img/archives/dan_on.png'
          } else if (properties.type == 'shequ' || properties.type == 'xiaoqu') {
            return new Style({
              stroke: new Stroke({
                // lineDash: [1, 2, 3, 4],
                color: '#3083F2',
                width: 3
              }),
              fill: new Fill({
                color: ' rgba(69,132,237,0.2)'
              }),
              text: new Text({
                text: properties.name,
                textAlign: 'center',
                font: '24px Microsoft YaHei, Microsoft YaHei-Regular;',
                offsetX: 0,
                offsetY: 0,
                placement: 'point',
                backgroundStroke: new Stroke({
                  color: '#3083f2',
                  width: 1
                }),
                // 标签的背景填充
                backgroundFill: new Fill({
                  color: '#3083f2'
                }),
                scale: 1.0,
                fill: new Fill({
                  color: '#ffffff'

                }),
                padding: [2, 2, 2, 2]
              })
            })
          } else if (properties.type == 'loudong') {
            return new Style({
              stroke: new Stroke({
                // lineDash: [1, 2, 3, 4],
                color: '#3083F2',
                width: 3
              }),
              fill: new Fill({
                color: ' rgba(69,132,237,0.2)'
              }),
              text: new Text({
                text: properties.name,
                textAlign: 'center',
                font: '12px Microsoft YaHei, Microsoft YaHei-Regular;',
                offsetX: 0,
                offsetY: 0,
                placement: 'point',
                backgroundStroke: new Stroke({
                  color: '#3083f2',
                  width: 1
                }),
                // 标签的背景填充
                backgroundFill: new Fill({
                  color: '#3083f2'
                }),
                scale: 1.0,
                fill: new Fill({
                  color: '#ffffff'

                }),
                padding: [2, 2, 2, 2]
              })
            })
          }
        }
        const style = new Style({
          // 图标样式
          image: new Icon({
            anchor: [18, 29], // 设置图标偏移
            scale: 1.0, // 图标缩小显示
            anchorOrigin: 'top-right', // 标注样式的起点位置
            anchorXUnits: 'pixels', // X方向单位：分数
            anchorYUnits: 'pixels', // Y方向单位：像素
            offsetOrigin: 'bottom-left', // 偏移起点位置的方向
            opacity: 0.9, // 透明度
            src: imgSrc // 图片路径
          }),
          // 文本样式
          text: new Text({
            scale: 1.2,
            textAlign: 'center', // 对齐方式
            textBaseline: 'middle', // 文本基线
            font: 'normal 12px 微软雅黑', // 字体样式
            text: properties.name, // 文本内容
            offsetY: -40, // Y轴偏置
            offsetX: 0,
            fill: new Fill({ // 填充样式
              color: '#ffffff'
            }),
            backgroundFill: new Fill({ // 填充背景
              color: '#3e3e3e'
            }),
            padding: [2, 5, 2, 5]
          })
        })
        return style
      },

      //清空图标
      removePupop() {

      },
      // bind
      _bindHandlerFull() {
        const myVideo = document.getElementById("myVideo")
        this.launchFullscreen(myVideo)
      },

      // unbind
      _unbindHandlerFull() {
        console.log('播放结束')
        //檢查瀏覽器是否處於全屏
        if (
          this.invokeFieldOrMethod(document, 'FullScreen') ||
          this.invokeFieldOrMethod(document, 'IsFullScreen') ||
          document.IsFullScreen
        ) {
          this.exitFullscreen()
        }
      },

      // 反射调用
      invokeFieldOrMethod(element, method) {
        var usablePrefixMethod
        ;['webkit', 'moz', 'ms', 'o', ''].forEach(function (prefix) {
          if (usablePrefixMethod) return
          if (prefix === '') {
            // 无前缀，方法首字母小写
            method = method.slice(0, 1).toLowerCase() + method.slice(1)
          }
          var typePrefixMethod = typeof element[prefix + method]
          if (typePrefixMethod + '' !== 'undefined') {
            if (typePrefixMethod === 'function') {
              usablePrefixMethod = element[prefix + method]()
            } else {
              usablePrefixMethod = element[prefix + method]
            }
          }
        })

        return usablePrefixMethod
      },

      // 进入全屏
      launchFullscreen(element) {
        //此方法不可以在異步任務中執行，否則火狐無法全屏
        if (element.requestFullscreen) {
          element.requestFullscreen()
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen()
        } else if (element.msRequestFullscreen) {
          element.msRequestFullscreen()
        } else if (element.oRequestFullscreen) {
          element.oRequestFullscreen()
        } else if (element.webkitRequestFullscreen) {
          element.webkitRequestFullScreen()
        } else {
          var docHtml = document.documentElement
          var docBody = document.body
          var videobox = document.getElementById('videobox')
          var cssText = 'width:100%;height:100%;overflow:hidden;'
          docHtml.style.cssText = cssText
          docBody.style.cssText = cssText
          videobox.style.cssText = cssText + ';' + 'margin:0px;padding:0px;'
          document.IsFullScreen = true
        }
      },

      // 退出全屏
      exitFullscreen() {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.oRequestFullscreen) {
          document.oCancelFullScreen()
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen()
        } else {
          var docHtml = document.documentElement
          var docBody = document.body
          var videobox = document.getElementById('videobox')
          docHtml.style.cssText = ''
          docBody.style.cssText = ''
          videobox.style.cssText = ''
          document.IsFullScreen = false
        }
      },
      //视频点击
      videoClik(id) {
        this.lookVideoId = id;
        this.lookVideoShow = true;
      },
      //二三维切换
      cesiumMapClick() {
        window.open("/2dmap", '_blank');
      },
      //地图构造完成回调
      onMapload(viewer) {
        this.viewer = viewer;
      },
    }
  }
</script>

<style lang="less">
  .myMapClass {
    height: 100%;
    width: 100%;
    position: absolute;
    box-sizing: border-box;
    background-color: white;
    top: 10px;

    .ol-zoom {
      display: none;
    }

    .bottom-class {
      background: url(/img/faviconmap/map_ico/gis_db.png);
      height: 128px;
      position: absolute;
      z-index: 2;
      bottom: -14px;
      left: calc(50% - 270px);
      right: calc(50% - 736px);
      justify-content: center;
      //background-color: white;
      display: flex;
      background-repeat: no-repeat; //不重复
      background-size: 100% 100%; // 满屏
    }

    .textlabel {
      padding: 5px;
      text-align: center;
      transform: translateY(70px);
      position: relative;
      top: -18px;
      left: -2px;
      font-size: 13px;
      font-family: Microsoft YaHei, Microsoft YaHei-Regular;
      font-weight: 400;
      text-align: center;
      color: #757575;

    }

    .imgbox {
      height: 0px;
      width: 100%;
      text-align: center;
      margin-top: -19px;

      img {
        //width: 28px;
        //height: 28px;
      }
    }

    .imgbottom_1,
    .imgbottom_2,
    .imgbottom_3,
    .imgbottom_4,
    .imgbottom_5,
    .imgbottom_6,
    .imgbottom_7,
    .imgbottom {
      transform: translateY(15px);
      cursor: pointer;
    }

    /* 弹窗样式*/

    .title {
      background: url(/img/faviconmap/popDiv_bg.png);
      border: 1px solid #000;
      border-radius: 3px 3px 3px 3px;
      display: block;
      font-size: 12px;
      left: -50%;
      line-height: 1;
      padding: 5px;
      position: relative;
      white-space: nowrap;
      z-index: 0;
      color: #fff;
      padding: 10px;
      line-height: 22px;
      box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.1);
    }

    .title:after {
      content: "";
      position: absolute;
      width: 0;
      height: 0;
      border: 6px solid transparent;
      border-top-color: #494947;
      left: 50%;
      margin-left: -5px;
      bottom: -12px;
    }

    .titleLeft {
      background: url(/img/faviconmap/popDiv_bg.png);
      border: 1px solid #000;
      border-radius: 3px 3px 3px 3px;
      display: block;
      font-size: 12px;
      left: -50%;
      line-height: 1;
      padding: 5px;
      position: relative;
      white-space: nowrap;
      z-index: 0;
      color: #fff;
      padding: 10px;
      line-height: 22px;
      box-shadow: 10px 0px 10px 0px rgba(0, 0, 0, 0.1);
    }

    .titleLeft:after {
      content: "";
      position: absolute;
      width: 0;
      height: 0;
      border: 6px solid transparent;
      border-right-color: #494947;
      left: -8px;
      margin-left: -5px;
      bottom: 50%;
    }

    .geoshow-geoglobemap-chartselector {
      position: absolute;
      right: 10px;
      top: 10px;
      display: none;
    }

    canvas {
      display: inline-block;
      border-radius: 12px 12px 0px 0px;
      border: 1px solid rgb(255, 255, 255);
    }

    .dividerT {
      width: 2px;
      margin-top: 24px;
      height: 62px;
      background: #e5e5e5;
    }

    .imgboxAll {
      width: 40px;
      height: 40px;
      margin-left: 35%;
    }

    .imgboxAllSelect, .imgboxAllDiv:hover {
      .imgboxAll {
        transform: translateY(15px);
        background: url("/img/faviconmap/map_ico/gis_all2.png");

        img {
          opacity: 0;
        }
      }

      .textlabel {
        font-size: 14px;
        font-family: Microsoft YaHei, Microsoft YaHei-Bold;
        font-weight: 700;
        text-align: center;
        color: #3e3e3e;
      }
    }

    .imgboxShequ {
      width: 40px;
      height: 40px;
      margin-left: 35%;
    }

    .imgboxShequSelect, .imgboxShequDiv:hover {
      .imgboxShequ {
        transform: translateY(15px);
        background: url("/img/faviconmap/map_ico/gis_sq2.png");

        img {
          opacity: 0;
        }
      }

      .textlabel {
        font-size: 14px;
        font-family: Microsoft YaHei, Microsoft YaHei-Bold;
        font-weight: 700;
        text-align: center;
        color: #3e3e3e;
      }
    }

    .imgboxXiaoqu {
      width: 40px;
      height: 40px;
      margin-left: 35%;
    }

    .imgboxXiaoquSelect, .imgboxXiaoquDiv:hover {
      .imgboxXiaoqu {
        transform: translateY(15px);
        background: url("/img/faviconmap/map_ico/gis_fw2.png");

        img {
          opacity: 0;
        }
      }

      .textlabel {
        font-size: 14px;
        font-family: Microsoft YaHei, Microsoft YaHei-Bold;
        font-weight: 700;
        text-align: center;
        color: #3e3e3e;
      }
    }

    .imgboxGongong {
      width: 40px;
      height: 40px;
      margin-left: 35%;
    }

    .imgboxGongongSelect, .imgboxGongongDiv:hover {
      .imgboxGongong {
        transform: translateY(15px);
        background: url("/img/faviconmap/map_ico/gis_ss2.png");

        img {
          opacity: 0;
        }
      }

      .textlabel {
        font-size: 14px;
        font-family: Microsoft YaHei, Microsoft YaHei-Bold;
        font-weight: 700;
        text-align: center;
        color: #3e3e3e;
      }
    }

    .imgboxShehui {
      width: 40px;
      height: 40px;
      margin-left: 35%;
    }

    .imgboxShehuiSelect, .imgboxShehuiDiv:hover {
      .imgboxShehui {
        transform: translateY(15px);
        background: url("/img/faviconmap/map_ico/gis_zz2.png");

        img {
          opacity: 0;
        }
      }

      .textlabel {
        font-size: 14px;
        font-family: Microsoft YaHei, Microsoft YaHei-Bold;
        font-weight: 700;
        text-align: center;
        color: #3e3e3e;
      }
    }

    .imgboxShijian {
      width: 40px;
      height: 40px;
      margin-left: 35%;
    }

    .imgboxShijianSelect, .imgboxShijianDiv:hover {
      .imgboxShijian {
        transform: translateY(15px);
        background: url("/img/faviconmap/map_ico/gis_sj2.png");

        img {
          opacity: 0;
        }
      }

      .textlabel {
        font-size: 14px;
        font-family: Microsoft YaHei, Microsoft YaHei-Bold;
        font-weight: 700;
        text-align: center;
        color: #3e3e3e;
      }
    }

    .divFenge {
      width: 100%;
      height: 1px;
      opacity: 0.3;
      background: #ffffff;
    }

    .myMapChaKanClass {
      padding-top: 5px;
      font-size: 14px;
      font-family: Microsoft YaHei, Microsoft YaHei-Regular;
      font-weight: 400;
      text-align: center;
      color: #ffffff;
      cursor: pointer;
    }

    .myMapChaKanClass:hover {
      color: blue;
    }

    .sidebar {
      position: fixed;
      right: 24%;
      bottom: 51%;
      font-size: 40px;
      color: rgba(25 ,33, 214, 0.8);
      z-index: 102;
      width: 21px;
      height: 60px;
      left: 400px;
      background: url("/img/icon_arrow.png") no-repeat 0 0;
      &:hover {
        color: rgba(25, 33 ,214, 0.4);
        animation-play-state: paused;
        background: url("/img/icon_arrow.png") no-repeat -21px 0;
      }
    }
    .sidebarActive {
      position: fixed;
      right: 24%;
      left: 0px;
      bottom: 51%;
      font-size: 40px;
      z-index: 102;
      width: 21px;
      height: 60px;
      background: url("/img/icon_arrow.png") no-repeat 0 -60px;
      &:hover {
        animation-play-state: paused;
        background: url("/img/icon_arrow.png") no-repeat -21px -60px;
      }
    }

    .cesiumMap {
      position: fixed;
      right: 24%;
      bottom: 16%;
      font-size: 40px;
      color: rgba(24, 109, 195, 0.8);
      z-index: 102;

      &:hover {
        color: rgba(24, 109, 195, 0.4);
        animation-play-state: paused;
      }
    }

    .ol-layer {
      canvas {
        width: 100%;
      }
    }
  }
</style>





