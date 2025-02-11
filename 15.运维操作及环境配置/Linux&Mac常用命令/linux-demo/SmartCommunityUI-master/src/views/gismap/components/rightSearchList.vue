<template>
  <div v-if="showLeft" class="ui-layout-west-right" :style="{top:marginTop+'px'}">
    <Input
      id="gridmap_regionno_topic"
      v-model="searchForm.topic"
      readonly
      placeholder="专题"
      style="width: 100px;"
      clearable
      @click.native="showTopic=!showTopic"
      @on-clear="clearFeatureAndGrids(1)"
    />

    <!--    <Input-->
    <!--      id="gridmap_regionno_title"-->
    <!--      v-model="ownedGridName"-->
    <!--      readonly-->
    <!--      placeholder="辖区"-->
    <!--      style="width: 100px;"-->
    <!--      clearable-->
    <!--      @click.native="showTree=!showTree"-->
    <!--      @on-clear="clearFeatureAndGrids(2)"-->
    <!--    />-->
<!--    <TreeSelect v-model="ownedGridName" clearable :data="treeData" style="width: 114px;" transfer-->
<!--                @on-change="onTreeClick"/>-->
    <Cascader :data="treeData"  clearable v-model="ownedGridName" style="width: 114px;"  transfer change-on-select
              @on-change="onTreeClick"  filterable :render-format="format"></Cascader>
    <Input
      v-model="searchForm.key"
      search
      enter-button
      placeholder="需要搜索的信息"
      style="white-space: nowrap"
      @on-search="onRetSearch"
    />

    <!--    专题列表-->
    <div v-show="showTopic" class="functionList">
      <!--功能按钮-->
      <ul class="mokui clearfix">
        <li>
          <a title="人口" href="javascript:" @click="onTopicChanged('人口')">
            <p>
              <img src="../../img/theme/js-cx.png" style="width:40px;height:34px;">
            </p>
            <span>人口</span>
          </a>
        </li>
        <li><a title="房屋" href="javascript:" @click="onTopicChanged('房屋')">
          <p>
            <img src="../../img/theme/f-cx.png" style="width:40px;height:37px;">
          </p>
          <span>房屋</span>
        </a>
        </li>
        <li>
          <a title="楼栋" href="javascript:" @click="onTopicChanged('楼栋')">
            <p>
              <img src="../../img/theme/dw-cx.png" style="width:40px;height:34px;">
            </p>
            <span>楼栋</span>
          </a>
        </li>
        <li>
          <a title="公共设施" href="javascript:" @click="onTopicChanged('公共设施')">
            <p>
              <img src="../../img/theme/sp-cx.png" style="width:40px;height:34px;">
            </p>
            <span>公共设施</span>
          </a>
        </li>
        <!--        <li>-->
        <!--          <a title="商户" href="javascript:" @click="onTopicChanged('商户')">-->
        <!--            <p>-->
        <!--              <img src="../../img/theme/dw-cx.png" style="width:40px;height:34px;">-->
        <!--            </p>-->
        <!--            <span>商户</span>-->
        <!--          </a>-->
        <!--        </li>-->

        <li>
          <a title="社会组织" href="javascript:" @click="onTopicChanged('社会组织')">
            <p>
              <img src="../../img/theme/cx_laobao.png" style="width:40px;height:34px;">
            </p>
            <span>社会组织</span>
          </a>
        </li>
        <li>
          <a title="事件" href="javascript:" @click="onTopicChanged('事件')">
            <p>
              <img src="../../img/theme/mz-cx.png" style="width:40px;height:34px;">
            </p>
            <span>事件</span>
          </a>
        </li>

        <li>
          <a title="人口热区" href="javascript:" @click="onTopicChanged('人口热区')">
            <p>
              <img src="../../img/theme/r-cx.png" style="width:40px;height:34px;">
            </p>
            <span>人口热区</span>
          </a>
        </li>

        <li>
          <a title="事件热区" href="javascript:" @click="onTopicChanged('事件热区')">
            <p>
              <img src="../../img/theme/di-cx.png" style="width:40px;height:34px;">
            </p>
            <span>事件热区</span>
          </a>
        </li>


      </ul>
    </div>

    <div v-if="showResultList" style="margin-top: 3px;" class="showResultList">
      <div class="all-people">
        <span v-if="totalCount > 0" class="pon">共找到（<em style="color: red;font-style: normal;font-size: 15px">{{ totalCount }}</em>）条数据</span>
        <span v-else class="pon">没有找到相关数据！</span>
        <Icon
          type="md-backspace"
          style="float: right;margin-right: 5px;"
          :size="25"
          color="#cccccb"
          @click="showResultList=false"
        />
      </div>
      <div class="resultDataList">
        <ul v-if="searchForm.topic=='人口'||searchForm.topic=='人口热区'" class="man-list">
          <li v-for="(item, i)  in personData" :key="item.id">
            <div v-if="item.position" @click="featureClick(item)">
              <div
                class="man-head"
                :style="{'background': item.imgPath ? 'url(' + item.imgPath +') no-repeat center' : ''}"
              />
              <div class="men-infor" style="line-height: 21px;">
                <b>
                  <a v-if="item.position" class="location" title="定位" @click="flyto(item.position)"/>
                  <a v-else/>
                </b>
                <p>{{ item.name }}</p>
                <i>证件号码:{{ item.cardId }}</i>
                <i>性别:{{ item.sex }}</i>
                <i>联系电话:{{ item.phone }}</i>
              </div>
            </div>
            <div v-else>
              <div
                class="man-head"
                :style="{'background': item.imgPath ? 'url(' + item.imgPath +') no-repeat center' : ''}"
              />
              <div class="men-infor" style="line-height: 21px;">
                <b>
                  <a v-if="item.position" class="location" title="定位" @click="flyto(item.position)"/>
                  <a v-else/>
                </b>
                <p>{{ item.name }}</p>
                <i>证件号码:{{ item.cardId }}</i>
                <i>性别:{{ item.sex }}</i>
                <i>联系电话:{{ item.phone }}</i>
              </div>
            </div>

          </li>

        </ul>

        <ul v-if="searchForm.topic=='房屋'" class="man-list">
          <li v-for="(item, i)  in houseData" :key="item.id">
            <div v-if="item.position" @click="featureClick(item)">
              <div class="man-head" style="background: url('/img/archives/p10.png') no-repeat center"/>
              <div class="men-infor" style="line-height: 21px;">
                <b>
                  <a v-if="item.position" class="location" title="定位" @click="flyto(item.position)"/>
                </b>
                <i>小区名称:{{ item.houseName }}</i>
                <i>单元名称:{{ item.unit }}单元</i>
                <i>楼栋名称:{{ item.buildArchiveName }}</i>
                <i>详细地址:{{ item.houseAddress }}</i>
              </div>
            </div>
            <div v-else>
              <div class="man-head" style="background: url('/img/archives/p10.png') no-repeat center"/>
              <div class="men-infor" style="line-height: 21px;">
                <b>
                  <a v-if="item.position" class="location" title="定位" @click="flyto(item.position)"/>
                </b>
                <i>小区名称:{{ item.houseName }}</i>
                <i>单元名称:{{ item.unit }}单元</i>
                <i>楼栋名称:{{ item.buildArchiveName }}</i>
                <i>详细地址:{{ item.houseAddress }}</i>
              </div>
            </div>

          </li>

        </ul>
        <ul v-if="searchForm.topic=='楼栋'" class="man-list">
          <li v-for="(item, i)  in buildingArchivesData" :key="item.id">
            <div v-if="item.location" @click="featureClick(item)">
              <div
                class="man-head"
                :style="{'background': item.imgPath ? 'url(' + item.imgPath +') no-repeat center' : 'url(\'/img/archives/p10.png\') no-repeat center'}"
              />
              <div class="men-infor" style="line-height: 26px;">
                <b>
                  <a v-if="item.location" class="location" title="定位" @click="flyto(item.location)"/>
                  <a v-else/>
                </b>
                <i>建筑名称:{{item.housingEstateName }}</i>
                <i>建筑类型:{{ item.buildingTypeName }}</i>
                <i>建筑地址:{{ item.buildingAddress }}</i>
              </div>
            </div>
            <div v-else>
              <div
                class="man-head"
                :style="{'background': item.imgPath ? 'url(' + item.imgPath +') no-repeat center' : 'url(\'/img/archives/p10.png\') no-repeat center'}"
              />
              <div class="men-infor" style="line-height: 26px;">
                <b>
                  <a v-if="item.location" class="location" title="定位" @click="flyto(item.location)"/>
                  <a v-else/>
                </b>
                <i>建筑名称:{{item.housingEstateName }}</i>
                <i>建筑类型:{{ item.buildingTypeName }}</i>
                <i>建筑地址:{{ item.buildingAddress }}</i>
              </div>
            </div>

          </li>

        </ul>
        <ul v-if="searchForm.topic=='公共设施'" class="man-list">
          <li v-for="(item, i)  in buildingArchivesData" :key="item.id">
            <div v-if="item.location" @click="featureClick(item)">
              <div
                class="man-head"
                :style="{'background': item.imgPath ? 'url(' + item.imgPath +') no-repeat center' : 'url(\'/img/archives/p10.png\') no-repeat center'}"
              />
              <div class="men-infor" style="line-height: 26px;">
                <b>
                  <a v-if="item.location" class="location" title="定位" @click="flyto(item.location)"/>
                  <a v-else/>
                </b>
                <i>建筑名称:{{ item.buildingName }}</i>
                <i>建筑类型:{{ item.buildingTypeName }}</i>
                <i>建筑地址:{{ item.buildingAddress }}</i>
              </div>
            </div>
            <div v-else>
              <div
                class="man-head"
                :style="{'background': item.imgPath ? 'url(' + item.imgPath +') no-repeat center' : 'url(\'/img/archives/p10.png\') no-repeat center'}"
              />
              <div class="men-infor" style="line-height: 26px;">
                <b>
                  <a v-if="item.location" class="location" title="定位" @click="flyto(item.location)"/>
                  <a v-else/>
                </b>
                <i>建筑名称:{{ item.buildingName }}</i>
                <i>建筑类型:{{ item.buildingTypeName }}</i>
                <i>建筑地址:{{ item.buildingAddress }}</i>
              </div>
            </div>
          </li>
        </ul>

        <ul v-if="searchForm.topic=='商户'" class="man-list">
          <li v-for="(item, i)  in merchantData" :key="item.id">
            <div
              class="man-head"
              :style="{'background': item.headPortrait ? 'url(' + item.headPortrait +') no-repeat center' : 'url(\'/img/archives/p10.png\') no-repeat center'}"
            />
            <div class="men-infor" style="line-height: 21px;">
              <b>
                <a v-if="item.location" class="location" title="定位" @click="flyto(item.location)"/>
              </b>
              <i>商户名称:{{ item.merchantName }}</i>
              <i>商户类别:{{ item.merchantSort }}</i>
              <i>商户地址:{{ item.merchantAddress }}</i>
              <i>法人姓名:{{ item.legalEntity }}</i>
            </div>
          </li>
        </ul>

        <ul v-if="searchForm.topic=='社会组织'" class="man-list">
          <li v-for="(item, i)  in organizationData" :key="item.id">

            <div v-if="item.position" @click="featureClick(item)">
              <div
                class="man-head"
                :style="{'background': item.headPortrait ? 'url(' + item.headPortrait +') no-repeat center' : 'url(\'/img/archives/p10.png\') no-repeat center'}"
              />
              <div class="men-infor" style="line-height: 21px;">
                <b>
                  <a v-if="item.position" class="location" title="定位" @click="flyto(item.position)"/>
                  <a v-else/>
                </b>
                <i>社会组织名称:{{ item.name }}</i>
                <i>社会组织类别:{{ item.type }}</i>
                <i>所属房屋:{{ item.address }}</i>
                <i>法人:{{ item.legalPerson }}</i>
              </div>
            </div>
            <div v-else>
              <div
                class="man-head"
                :style="{'background': item.headPortrait ? 'url(' + item.headPortrait +') no-repeat center' : 'url(\'/img/archives/p10.png\') no-repeat center'}"
              />
              <div class="men-infor" style="line-height: 21px;">
                <b>
                  <a v-if="item.position" class="location" title="定位" @click="flyto(item.position)"/>
                  <a v-else/>
                </b>
                <i>社会组织名称:{{ item.name }}</i>
                <i>社会组织类别:{{ item.type }}</i>
                <i>所属房屋:{{ item.address }}</i>
                <i>法人:{{ item.legalPerson }}</i>
              </div>
            </div>

          </li>

        </ul>

        <ul v-if="searchForm.topic=='事件'||searchForm.topic=='事件热区'" class="man-list">
          <li v-for="(item, i)  in eventData" :key="item.id">

            <div v-if="item.position" @click="featureClick(item)">
              <div
                class="man-head"
                :style="{'background': item.headPortrait ? 'url(' + item.headPortrait +') no-repeat center' : 'url(\'/img/archives/p10.png\') no-repeat center'}"
              />
              <div class="men-infor" style="line-height: 21px;">
                <b>
                  <a v-if="item.position" class="location" title="定位" @click="flyto(item.position)"/>
                  <a v-else/>
                </b>
                <i>标题:{{ item.title }}</i>
                <i>登记编号:{{ item.code }}</i>
                <i>所属网格:{{ item.gridName }}</i>
                <i>事件类型:{{ item.eventsTypeName }}</i>

              </div>
            </div>
            <div v-else>
              <div
                class="man-head"
                :style="{'background': item.headPortrait ? 'url(' + item.headPortrait +') no-repeat center' : 'url(\'/img/archives/p10.png\') no-repeat center'}"
              />
              <div class="men-infor" style="line-height: 21px;">
                <b>
                  <a v-if="item.position" class="location" title="定位" @click="flyto(item.position)"/>
                  <a v-else/>
                </b>
                <i>标题:{{ item.title }}</i>
                <i>登记编号:{{ item.code }}</i>
                <i>所属网格:{{ item.gridName }}</i>
                <i>事件类型:{{ item.eventsTypeName }}</i>
              </div>
            </div>

          </li>

        </ul>

        <div v-if="!loading && totalCount>0" class="resultPage">
          <Page :current="pageNumber" :total="totalCount" simple :page-size="pageSize" @on-change="onPageChange"/>
        </div>
      </div>
    </div>
    <div v-if="!showResultList && loading" class="resultDataList" style="margin-top: 3px; height: 300px"
         v-loading="loading">
      <div slot="empty" class="sqt">
        暂无数据
        <!-- 暂无数据图-->
        <!--        <p><img src="../../../assets/imgs/qsy.png"></p>-->
      </div>
    </div>
    <lookBasicPerson v-model="personShow" :basic-person-id="BasicPersonId" modal-title="人员档案查看"/>

    <lookHousingManage
      v-model="housingShow"
      :basic-housing-manage-id="BasicHousingManageId"
      modal-title="房屋查看"
    />

    <lookBuildingArchives
      v-model="buildingShow"
      :t-building-archives-id="TBuildingArchivesId"
      modal-title="设施查看"
    />

    <lookTZhsqMerchantProfile
      v-model="merchantShow"
      :t-zhsq-merchant-profile-id="TZhsqMerchantProfileId"
      modal-title="商户查看"
    />

    <gridPersonInfo
      v-model="gridPersonShow"
      modal-title="网格人员信息查看"
      :grid-person-id="gridPersonId"
      :grid-person-overlay="gridPersonOverlay"
    />

    <lookTZhsqEventList v-model="eventShow" :TZhsqEventListId="TZhsqEventListId"
                        modalTitle="事件详情查看"></lookTZhsqEventList>
    <!--    <taskDetail v-model="eventShow" :t-zhsq-task-list-id="TZhsqEventListId" modal-title="事件详情查看" />-->
    <lookBasicSocialOrganization
      v-model="organizationShow"
      :basic-social-organization-id="BasicSocialOrganizationId"
      modal-title="社会组织查看"
    />
  </div>
</template>
<script>
  import 'ol/ol.css'
  import {queryAllList,queryAllListByAnyWhere} from '@/api/zhsq/basicGrids/basicGrids'
  import {getAllLoad} from '@/api/events'
  import {Polygon, Point} from 'ol/geom'
  import Feature from 'ol/Feature'
  import Overlay from 'ol/Overlay'
  import {Fill, Icon, Stroke, Style, Text} from 'ol/style'
  import {queryBasicPersonListByAnyWayWhere, queryBasicPersonList} from '@/api/zhsq/basicPerson/basicPerson'
  import {queryBasicHousingListByAnyWayWhere} from '@/api/zhsq/basicHouse/basicHouse'
  import {
    queryTBuildingArchivesList,
    queryTBuildingArchivesListByAnyWayWhere
  } from '@/api/zhsq/tBuildingArchives/tBuildingArchives'
  import {queryTZhsqMerchantProfileListByAnyWayWhere} from '@/api/zhsq/tZhsqMerchantProfile/tZhsqMerchantProfile'
  import {queryAllTZhsqGridMemberListByAnyWayWhere} from '@/api/zhsq/tZhsqGridMember/tZhsqGridMember'
  import {queryAllTZhsqEventListByAnyWayWhere} from '@/api/zhsq/tZhsqEventList/tZhsqEventList'
  import {
    queryBasicSocialOrganizationListByAnyWayWhere,
    queryBasicSocialOrganizationList
  } from '@/api/zhsq/basicSocialOrganization/basicSocialOrganization'
  import lookBasicPerson from '../../zhsq/basicPerson/lookBasicPerson'
  import lookHousingManage from '../../zhsq/basicHouseManage/lookHousingManage'
  import lookBuildingArchives from '../../zhsq/tConstruct/lookConstruct'
  import lookTZhsqMerchantProfile from '../../zhsq/tZhsqMerchantProfile/lookTZhsqMerchantProfile'
  import gridPersonInfo from './gridPersonInfo'
  import lookTZhsqEventList from '../../zhsq/tZhsqEventList/lookTZhsqEventList'
  import lookBasicSocialOrganization from '../../zhsq/basicSocialOrganization/lookBasicSocialOrganization'
  import {formartDate, nginxUrl} from '../../../api/tools/tool'
  import {
    getAllEventList,loadGridDeptAndGridTree
  } from '@/api/index'
  export default {
    name: "rightSearchList",
    components: {
      lookBasicPerson,
      lookHousingManage,
      lookBuildingArchives,
      lookTZhsqMerchantProfile,
      gridPersonInfo,
      lookTZhsqEventList,
      lookBasicSocialOrganization,
    },
    props: {
      marginTop: {
        type: Number,
        default: 70
      }
    },
    data() {
      return {
        showEventPointFlag: false, // 是否显示事件标记
        loading: false,
        eventShow: false,
        gridPersonShow: false,
        showResultList: false,
        resultListHeight: '500px',
        treeData: [],
        showTree: false,
        showTopic: false,
        showLeft: true,
        personData: [],
        houseData: [],
        buildingArchivesData: [],
        merchantData: [],
        gridPersonData: [],
        eventData: [],
        eventGifArr: [],

        searchForm: {
          pageNumber: 1,
          pageSize: 15,
          topic: '',
          key: '',

          allStreetId: '',
          allCommunityId: '',
          allGridId: '',

          // 人口
          ownedGridId: '',
          streetId: '',
          communityId: '',

          // 房屋
          houseStreetId: '',
          houseCommunityId: '',
          houseGridId: '',

          // 设施
          // streetId:'',
          // communityId:'',
          grid: '',

          // 商户
          // streetId:'',
          legalCommunityId: '',
          gridId: '',

          // 社会组织
          // streetId:'',
          // communityId:'',
          gridsId: ''
        },
        ownedGridName: [],
        totalCount: 0,
        pageNumber: 1,
        pageSize: 15,
        personFeatureArr: [],
        houseFeatureArr: [],
        buildingArchivesFeatureArr: [],
        merchantFeatureArr: [],
        gridPersonFeatureArr: [],
        polygonArr: [],

        divArr: [],
        gridPersonGifArr: [],

        personShow: false,
        BasicPersonId: '',

        housingShow: false,
        BasicHousingManageId: '',

        buildingShow: false,
        TBuildingArchivesId: '',

        merchantShow: false,
        TZhsqMerchantProfileId: '',

        gridPersonId: '',
        gridPersonOverlay: null,

        GridPersonMoveArr: [],
        TZhsqEventListId: '',

        nginxUrl: nginxUrl,

        organizationData: [],
        organizationFeatureArr: [],
        organizationShow: false,
        BasicSocialOrganizationId: ''
      }
    },
    mounted() {
      this.init()
      let _this = this

      this.$nextTick(() => {
        var content = parent.document.getElementById('content')
        content.addEventListener('click', function () {
          _this.showTree = false
          _this.showTopic = false
        })

        let elementTopic = document.getElementById('gridmap_regionno_topic')
        elementTopic.addEventListener('click', function (e) {
          _this.showTree = false
          e.stopPropagation()
        })

      })
    },
    methods: {
      //级联选择器自定义显示的结果
      format (labels, selectedData) {
        const index = labels.length - 1;

        return labels[index];
      },
      //通过id查询辖区
      getPowerDataById(id) {
        let resData = null;
        if (id && this.treeData) {
          for (let i in this.treeData) {
            let item = this.treeData[i];
            if (item && item.title && item.id) {
              if (item.id.toString() == id.toString()) {
                resData = item;
                break
              } else {
                if (item.children) {
                  let res = this.getChildrenPowerDataById(id, item.children);
                  if (res != null) {
                    resData = res;
                  }
                }
              }
            }
          }
        }
        return resData;
      },
      //通过id查询辖区
      getChildrenPowerDataById(id, children) {
        let resData = null;
        if (id && children) {
          for (let i in children) {
            let item = children[i];
            if (item && item.title && item.id) {
              if (item.id.toString() == id.toString()) {
                resData = item;
                break
              } else {
                if (item.children) {
                  let res = this.getChildrenPowerDataById(id, item.children);
                  if (res != null) {
                    resData = res;
                  }
                }
              }
            }
          }
        }
        return resData;
      },
      //生成树
      getTreeData(data) {
        if (data) {
          for (let i in data) {
            let item = data[i];
            if(item){
              item.label = data[i].title;
              item.title = data[i].title;
              item.value = data[i].id;
              if (item.children) {
                item.children = this.getTreeData(item.children);
              }
            }
          }
        }
        return data;
      },
      //专题改变触发函数
      onTopicChanged(topic) {
        this.searchForm.topic = topic
        this.showTopic = false
        this.showResultList = false
        this.totalCount = 0
        if (!this.searchForm.topic) {
          return
        }
        if (!this.ownedGridName) {
          return
        }

        this.onRetSearch()


      },
      //初始化热力图要素
      initHeatmapLayer (topic){
        let _this = this
        _this.$parent.removelayer()
        if(!topic){
          return;
        }
        _this.loading = true;
         if(topic.indexOf("事件")>-1){
           this.eventHeatmapLayer();
         }
         else{
           this.personHeatmapLayer();
         }

      },
      //人口热力图
      personHeatmapLayer(){
        let _this = this
        queryBasicPersonListByAnyWayWhere({}).then(res => {

          if (res && res.success && res.data) {
            let data = res.data
            for (let i = 0; i < data.length; i++) {
              if (data[i] && data[i].position) {
                let mypoint = new Point(JSON.parse(data[i].position))
                let feature = new Feature(mypoint)
                let properties = {
                  id: data[i].id,
                  type: 'person',
                  name: data[i].name,
                  position: data[i].position
                }
                feature.set('weight', 100)
                feature.setProperties(properties)
                feature.setId(properties.id);
                _this.$parent.heatMapSource.addFeature(feature)
              }
            }

            _this.$parent.heatMapVector.setSource(_this.$parent.heatMapSource)
            _this.$parent.map.addLayer(_this.$parent.heatMapVector)
          } else {
            _this.$Message.error('数据加载失败！')
          }
        }).catch(res => {
          _this.$Message.error('数据加载失败！')
        }).finally(res => {
          _this.loading = false
        })
      },
      //事件热力图
      eventHeatmapLayer(){
        let _this = this
        getAllEventList({}).then(res => {
          if (res && res.success) {
            let eventData = res.data
            if(!eventData){
              return
            }
            for (let i = 0; i < eventData.length; i++) {
              if(eventData[i]==undefined||eventData[i]==null||eventData[i].id==undefined){
                continue;
              }
              if(eventData[i].longitude && eventData[i].latitude && eventData[i].longitude.toString().trim().length>0 && eventData[i].latitude.toString().trim().length>0) {
                let myPoint = new Point([eventData[i].longitude, eventData[i].latitude])
                let feature = new Feature(myPoint)
                let properties = {
                  id: eventData[i].id,
                  type: 'putong',
                  name: eventData[i].title,
                  position: [eventData[i].longitude, eventData[i].latitude]
                }
                eventData[i].position = [eventData[i].longitude, eventData[i].latitude];
                eventData[i].typeName = "普通";
                switch (eventData[i].urgentType) {
                  case 1: {
                    properties.type = 'putong'
                    eventData[i].typeName = "普通";
                    break
                  }
                  case 2: {
                    properties.type = 'yiban'
                    eventData[i].typeName = "一般";
                    break
                  }
                  case 3: {
                    properties.type = 'jingji'
                    eventData[i].typeName = "紧急";
                    break
                  }
                }
                feature.setProperties(properties)
                feature.setId(properties.id);
                feature.set('weight', 100)
                _this.$parent.heatMapSource.addFeature(feature)
              }
            }
          } else {
            _this.$Message.error('数据加载失败！')
          }
          _this.$parent.heatMapVector.setSource(_this.$parent.heatMapSource)
          _this.$parent.map.addLayer(_this.$parent.heatMapVector)
        }).catch(res => {
          _this.$Message.error('数据加载失败！')
        }).finally(res => {
          _this.loading = false
        })
      },
      //辖区改变
      onGridNameChanged() {
        this.showResultList = false
        this.totalCount = 0
        if (!this.searchForm.topic) {
          return
        }
        if (!this.ownedGridName) {
          return
        }
        this.onRetSearch()
      },

      // 查询后台数据
      onSearch() {
        if (!this.searchForm.topic) {
          this.$Message.error('请选择对应的专题！')
          return
        }
        if(this.searchForm.topic.indexOf("热区")>-1){
          this.initHeatmapLayer(this.searchForm.topic);
          return;
        }
        // if (!this.ownedGridName) {
        //   this.$Message.error('请选择对应的辖区！')
        //   return
        // }
        this.$parent.removelayer();
        this.showResultList = false
        this.totalCount = 0

        this.searchForm.pageNumber = this.pageNumber
        this.searchForm.pageSize = this.pageSize
        let _this = this;
        _this.loading = true
        _this.clearFeature()
        _this.removePupop()
        if (_this.searchForm.topic == '人口' ||_this.searchForm.topic == '人口热区') {

          let personSearchForm = {
            streetId: this.searchForm.allStreetId,
            communityId: this.searchForm.allCommunityId,
            ownedGridId: this.searchForm.allGridId,
            pageNumber: this.searchForm.pageNumber,
            pageSize: this.searchForm.pageSize,
            key: this.searchForm.key
          }

          queryBasicPersonListByAnyWayWhere(personSearchForm).then(res => {
            if (res && res.success) {
              _this.personData = res.data.records
              _this.totalCount = res.data.total
              for (let i = 0; i < _this.personData.length; i++) {
                if (this.personData[i].position) {
                  let mypoint = new Point(JSON.parse(_this.personData[i].position))
                  let feature = new Feature(mypoint)
                  let properties = {
                    id: _this.personData[i].id,
                    type: 'person',
                    name: _this.personData[i].name,
                    position: _this.personData[i].position
                  }
                  feature.setProperties(properties)
                  feature.setId(properties.id);
                  feature.setStyle(this.$parent.getDefaultStyle(properties))

                  _this.$parent.searchSource.addFeature(feature)

                }
              }
              _this.$parent.searchVector.setSource(_this.$parent.searchSource)
            } else {
              _this.$Message.error('数据加载失败！')
            }
          }).catch(res => {
            _this.$Message.error('数据加载失败！')
          }).finally(res => {
            _this.loading = false
            _this.showResultList = true
          })
        } else if (this.searchForm.topic == '房屋') {

          let houseSearchForm = {
            houseStreetId: _this.searchForm.allStreetId,
            houseCommunityId: _this.searchForm.allCommunityId,
            houseGridId: _this.searchForm.allGridId,
            pageNumber: _this.searchForm.pageNumber,
            pageSize: _this.searchForm.pageSize,
            key: _this.searchForm.key
          }
          queryBasicHousingListByAnyWayWhere(houseSearchForm).then(res => {
            if (res && res.success) {
              _this.houseData = res.data.records
              _this.totalCount = res.data.total
              for (let i = 0; i < this.houseData.length; i++) {
                if (_this.houseData[i].position) {
                  let mypoint = new Point(JSON.parse(_this.houseData[i].position))
                  let feature = new Feature(mypoint)
                  let properties = {
                    id: _this.houseData[i].id,
                    type: 'fangwu',
                    name: _this.houseData[i].buildArchiveName + "-" + _this.houseData[i].unit + "-" + _this.houseData[i].floor + _this.houseData[i].doorNumber,
                    position: _this.houseData[i].position
                  }
                  feature.setProperties(properties)
                  feature.setId(properties.id);
                  feature.setStyle(this.$parent.getDefaultStyle(properties))
                  _this.$parent.searchSource.addFeature(feature)
                }
              }
              _this.$parent.searchVector.setSource(_this.$parent.searchSource)
            } else {
              _this.$Message.error('数据加载失败！')
            }
          }).catch(res => {
            _this.$Message.error('数据加载失败！')
          }).finally(res => {
            _this.loading = false
            _this.showResultList = true
          })
        } else if (_this.searchForm.topic == '楼栋') {

          let archivesSearchForm = {
            streetId: _this.searchForm.allStreetId,
            communityId: _this.searchForm.allCommunityId,
            grid: _this.searchForm.allGridId,
            pageNumber: _this.searchForm.pageNumber,
            pageSize: _this.searchForm.pageSize,
            key: _this.searchForm.key,
            buildingType: 1,
          }
          queryTBuildingArchivesListByAnyWayWhere(archivesSearchForm).then(res => {
            if (res && res.success) {
              _this.buildingArchivesData = res.data.records
              _this.totalCount = res.data.total
              for (let i = 0; i < _this.buildingArchivesData.length; i++) {
                if (_this.buildingArchivesData[i].location) {
                  let mypoint = new Point(JSON.parse(_this.buildingArchivesData[i].location))
                  let feature = new Feature(mypoint)
                  let properties = {
                    id: _this.buildingArchivesData[i].id,
                    type: 'loudongICon',
                    name: _this.buildingArchivesData[i].housingEstateName,
                    position: _this.buildingArchivesData[i].location
                  }
                  feature.setProperties(properties)
                  feature.setId(properties.id);
                  feature.setStyle(this.$parent.getDefaultStyle(properties))
                  _this.$parent.searchSource.addFeature(feature)
                }
              }
              _this.$parent.searchVector.setSource(_this.$parent.searchSource)
            } else {
              _this.$Message.error('数据加载失败！')
            }
          }).catch(res => {
            _this.$Message.error('数据加载失败！')
          }).finally(res => {
            _this.loading = false
            _this.showResultList = true
          })
        } else if (_this.searchForm.topic == '公共设施') {

          let archivesSearchForm = {
            streetId: _this.searchForm.allStreetId,
            communityId: _this.searchForm.allCommunityId,
            grid: _this.searchForm.allGridId,
            pageNumber: _this.searchForm.pageNumber,
            pageSize: _this.searchForm.pageSize,
            key: _this.searchForm.key,
            buildingType: "2,3,4,5,6,7,8,9,10",
          }
          queryTBuildingArchivesListByAnyWayWhere(archivesSearchForm).then(res => {
            if (res && res.success) {
              _this.buildingArchivesData = res.data.records
              _this.totalCount = res.data.total
              for (let i = 0; i < _this.buildingArchivesData.length; i++) {
                if (_this.buildingArchivesData[i].location) {
                  let type = 'sheshi'
                  switch (_this.buildingArchivesData[i].buildingType) {
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
                  let mypoint = new Point(JSON.parse(_this.buildingArchivesData[i].location))
                  let feature = new Feature(mypoint)
                  let properties = {
                    id: _this.buildingArchivesData[i].id,
                    type: type,
                    name: _this.buildingArchivesData[i].buildingName,
                    position: _this.buildingArchivesData[i].location
                  }
                  feature.setProperties(properties)
                  feature.setId(properties.id);
                  feature.setStyle(_this.$parent.getDefaultStyle(properties))
                  _this.$parent.searchSource.addFeature(feature)

                }
              }
              _this.$parent.searchVector.setSource(_this.$parent.searchSource)
            } else {
              _this.$Message.error('数据加载失败！')
            }
          }).catch(res => {
            _this.$Message.error('数据加载失败！')
          }).finally(res => {
            _this.loading = false
            _this.showResultList = true
          })
        } else if (_this.searchForm.topic == '商户') {

          let merchantSearchForm = {
            streetId: _this.searchForm.allStreetId,
            legalCommunityId: _this.searchForm.allCommunityId,
            gridId: _this.searchForm.allGridId,
            pageNumber: _this.searchForm.pageNumber,
            pageSize: _this.searchForm.pageSize,
            key: _this.searchForm.key
          }
          queryTZhsqMerchantProfileListByAnyWayWhere(merchantSearchForm).then(res => {
            if (res && res.success) {
              _this.merchantData = res.data.records
              _this.totalCount = res.data.total
              for (let i = 0; i < _this.merchantData.length; i++) {
                if (_this.merchantData[i].location) {
                  let mypoint = new Point(JSON.parse(_this.merchantData[i].location))
                  let feature = new Feature(mypoint)
                  let properties = {
                    id: _this.merchantData[i].id,
                    type: 'shanghu',
                    name: _this.merchantData[i].merchantName,
                    position: _this.merchantData[i].location
                  }
                  feature.setProperties(properties)
                  feature.setId(properties.id);
                  // 坐标点样式
                  feature.setStyle(_this.$parent.getDefaultStyle(properties))
                  _this.$parent.searchSource.addFeature(feature)

                }
              }
              _this.$parent.searchVector.setSource(_this.$parent.searchSource)
            } else {
              _this.$Message.error('数据加载失败！')
            }
          }).catch(res => {
            _this.$Message.error('数据加载失败！')
          }).finally(res => {
            _this.loading = false
            _this.showResultList = true
          })
        } else if (_this.searchForm.topic == '社会组织') {

          let organizationSearchForm = {
            streetId: _this.searchForm.allStreetId,
            communityId: _this.searchForm.allCommunityId,
            gridsId: _this.searchForm.allGridId,
            pageNumber: _this.searchForm.pageNumber,
            pageSize: _this.searchForm.pageSize,
            key: _this.searchForm.key
          }
          queryBasicSocialOrganizationListByAnyWayWhere(organizationSearchForm).then(res => {
            if (res && res.success) {
              _this.organizationData = res.data.records
              _this.totalCount = res.data.total

              for (let i = 0; i < _this.organizationData.length; i++) {
                if (_this.organizationData[i].position) {
                  let mypoint = new Point(JSON.parse(_this.organizationData[i].position))
                  let feature = new Feature(mypoint)
                  let type = 'shanghu'
                  switch (_this.organizationData[i].type) {
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
                  let properties = {
                    id: this.organizationData[i].id,
                    type: type,
                    name: this.organizationData[i].name,
                    position: this.organizationData[i].position
                  }
                  feature.setProperties(properties)
                  feature.setId(properties.id);
                  feature.setStyle(_this.$parent.getDefaultStyle(properties))
                  _this.$parent.searchSource.addFeature(feature)
                }
              }
              _this.$parent.searchVector.setSource(_this.$parent.searchSource)
            } else {
              _this.$Message.error('数据加载失败！')
            }
          }).catch(res => {
            _this.$Message.error('数据加载失败！')
          }).finally(res => {
            _this.loading = false
            _this.showResultList = true
          })
        }else if (_this.searchForm.topic == '事件' ||_this.searchForm.topic == '事件热区') {
          let gridSearchForm = {
            streetId: this.searchForm.allStreetId,
            communityId: this.searchForm.allCommunityId,
            id: this.searchForm.allGridId,
          }
          let _this = this;
          queryAllList(gridSearchForm).then(res => {
            if (res &&  res && res.success) {
              let grids  = res.data
              let gridId = ""
              if(_this.searchForm.allStreetId.trim().length>0 ||  _this.searchForm.allCommunityId.trim().length>0|| _this.searchForm.allGridId.trim().length>0){
                if(grids && grids.length>0){
                  for(let i in grids){
                    if(grids[i] && grids[i].id){
                      if(i!=grids.length-1){
                        gridId+=grids[i].id+",";
                      }
                      else{
                        gridId+=grids[i].id;
                      }
                    }
                  }
                }
                else{
                  gridId = "0000"
                }
              }
              let eventSearchForm = {
                gridId: gridId,
                pageNum: _this.searchForm.pageNumber,
                pageSize: _this.searchForm.pageSize,
                queryStr: _this.searchForm.key
              }
              getAllLoad(eventSearchForm).then(res => {
                if (res && res.success) {
                  _this.eventData = res.data.records
                  _this.totalCount = res.data.total
                  let eventData = _this. eventData

                  for (let i = 0; i < eventData.length; i++) {
                    if(eventData[i]==undefined||eventData[i]==null||eventData[i].id==undefined){
                      continue;
                    }
                    if(eventData[i].longitude && eventData[i].latitude && eventData[i].longitude.toString().trim().length>0 && eventData[i].latitude.toString().trim().length>0) {
                      let myPoint = new Point([eventData[i].longitude, eventData[i].latitude])
                      let feature = new Feature(myPoint)
                      let properties = {
                        id: eventData[i].id,
                        type: 'putong',
                        name: eventData[i].title,
                        position: [eventData[i].longitude, eventData[i].latitude]
                      }
                      eventData[i].position = [eventData[i].longitude, eventData[i].latitude];
                      eventData[i].typeName = "普通";
                      switch (eventData[i].urgentType) {
                        case 1: {
                          properties.type = 'putong'
                          eventData[i].typeName = "普通";
                          break
                        }
                        case 2: {
                          properties.type = 'yiban'
                          eventData[i].typeName = "一般";
                          break
                        }
                        case 3: {
                          properties.type = 'jingji'
                          eventData[i].typeName = "紧急";
                          break
                        }
                      }
                      feature.setProperties(properties)
                      feature.setId(properties.id);
                      feature.setStyle(_this.$parent.getDefaultStyle(properties))
                      _this.$parent.searchSource.addFeature(feature)
                    }
                  }
                } else {
                  _this.$Message.error('数据加载失败！')
                }
                _this.$parent.searchVector.setSource(_this.$parent.searchSource)
              }).catch(res => {
                _this.$Message.error('数据加载失败！')
              }).finally(res => {
                _this.loading = false
                _this.showResultList = true
              })


            } else {
              _this.$Message.error('数据加载失败！')
            }
          }).catch(res => {
            _this.$Message.error('数据加载失败！')
          }).finally(res => {
            _this.loading = false
            _this.showResultList = true
          })
        }

        _this.$parent.map.addLayer(_this.$parent.searchVector)
      },
      //要素点击
      featureClick(item) {
        let _this = this;
        if (item) {

          let feature = _this.$parent.searchSource.getFeatureById(item.id)
          if (_this.$parent.selected) {
            _this.$parent.selected.setStyle(_this.$parent.getDefaultStyle(_this.$parent.selected.getProperties()))

          }
          if(feature){
            _this.$parent.selected =feature
            _this.$parent.setHeightFeature();
            _this.flyto(item.position);
          }

        }
      },
      // 定位
      flyto(position) {
        if (position) {
          this.$parent.map.getView().setCenter(JSON.parse(position))
        }
      },
      onPageChange(e) {
        this.pageNumber = e
        this.onSearch()
      },
      onRetSearch() {
        this.pageNumber = 1
        this.onSearch()
      },
      // 显示网格面
      ShowFeature(e) {
        let objData = JSON.parse(e.position)
        var arr = []
        var newArr = []
        for (let i = 0; i < objData.length; i++) {
          newArr.push(objData[i])
          if (i % 2 == 1) {
            arr.push(newArr)
            newArr = []
          }
        }
        var myPolygon = new Polygon([arr])
        var feature = new Feature(myPolygon)
        feature.setStyle(new Style({
          fill: new Fill({
            color: 'rgba(0,255,0,0.3)'
          }),
          stroke: new Stroke({
            color: '#ff0000',
            width: 2
          }),
          text: new Text({
            font: 'bold 18px 宋体',
            text: e.title,
            fill: new Fill({
              color: '#000000'
            })
          })
        }))
        this.$parent.searchSource.addFeature(feature)
        this.polygonArr.push(feature)
        this.$parent.searchVector.setSource(this.$parent.searchSource)
        this.$parent.map.getView().setCenter(objData)
      },

      // 点击树形节点
      onTreeClick(v) {
        if(v){
          let e=v[v.length-1]
          if (e) {
            // let data = this.getPowerDataById(e)
            // if (data == null) {
            //   return
            // }
            // // 清除网格面
            // for (let i = 0; i < this.polygonArr.length; i++) {
            //   this.$parent.searchSource.removeFeature(this.polygonArr[i])
            // }
            // this.polygonArr = []
            // this.showTree = false

            if (v.length==1) {
              let childTree =  this.getChildTree(e);
              if(childTree==null){
                this.$Message.error("获取区县下街道失败，请联系管理员！！！")
                return
              }
              let streetId = "";
              for(let i=0;i<childTree.length;i++){
                if(childTree[i] && childTree[i].id){
                  if(i!=childTree.length-1){
                    streetId+=""+childTree[i].id+","
                  }
                  else{
                    streetId+=""+childTree[i].id
                  }
                }
              }
              this.searchForm.allStreetId = streetId
              this.searchForm.allCommunityId = ''
              this.searchForm.allGridId = ''
            } else if (v.length==2) {
              // this.searchForm.allStreetId = ''
              // this.searchForm.allCommunityId = e
              // this.searchForm.allGridId = ''
              this.searchForm.allStreetId = e
              this.searchForm.allCommunityId = ''
              this.searchForm.allGridId = ''
            } else if (v.length==3) {
              this.searchForm.allStreetId = ''
              this.searchForm.allCommunityId = e
              this.searchForm.allGridId = ''
            }
            // this.ownedGridName =v

            this.onGridNameChanged()
          } else {
            this.ownedGridName = []
            this.searchForm.allStreetId = ''
            this.searchForm.allCommunityId = ''
            this.searchForm.allGridId = ''
          }
          // 如果是选中的事件，点击树形联动查询
          if (this.showEventPointFlag) {
            this.showEventPoint()
          }
        }
      },
      //树形节点
      getChildTree(e){
        let res = null;
        if(this.treeData && e){
          for(let i=0;i<this.treeData.length;i++){
            if(this.treeData[i]){
              if(e==this.treeData[i].id  && this.treeData[i].id){
                res = this.treeData[i].children;
              }
            }
          }
        }
        return res;
      },
      init() {
        let _this = this;
        loadGridDeptAndGridTree().then(res => {
          if (res && res.success) {
            _this.treeData = _this.getTreeData(res.data);
          } else {
            _this.$Message.error('数据加载失败！')
          }
        }).catch(res => {
          _this.$Message.error('数据加载失败！')
        }).finally(res => {
        })
      },
      // 加载专题在地图上显示的图标
      initMapFeature() {

      },

      removePupop() {
        for (let i = 0; i < this.divArr.length; i++) {
          this.divArr[i].remove()
        }
        this.divArr = []
      },
      //清除要素
      clearFeature() {
        this.$parent.searchSource.clear()
        this.$parent.map.removeLayer(this.$parent.searchVector)
        this.houseFeatureArr = []
        this.personFeatureArr = []
        this.buildingArchivesFeatureArr = []
        this.merchantFeatureArr = []
        this.organizationFeatureArr = []
        this.personData=[];
        this.houseData=[];
        this.buildingArchivesData=[];
        this.merchantData=[];
        this.organizationData=[];
      },
      clearFeatureAndGrids(type) {
        // 清除网格面
        for (let i = 0; i < this.polygonArr.length; i++) {
          this.$parent.searchSource.removeFeature(this.polygonArr[i])
        }
        this.polygonArr = []
        this.showTree = false
        this.removePupop()
        this.clearFeature()
        if (type == 2) {
          this.setTreeSelectStatus(this.treeData)
          this.ownedGridName = []
          this.searchForm.ownedGrid = ''
          this.searchForm.ownedCommunity = ''
        }
        if (type == 1) {
          this.searchForm.topic = ''
        }

        if (this.showEventPointFlag) {
          this.showEventPoint()
        }

      },
      setTreeSelectStatus(arr) {
        for (let i = 0; i < arr.length; i++) {
          arr[i].selected = false
          if (arr[i].children && arr[i].children.length > 0) {
            this.setTreeSelectStatus(arr[i].children)
          }
        }
      },


      // 显示事件坐标点
      showEventPoint() { // todo 事件列表
        let _this = this
        this.clearFeature()
        // this.searchForm.grid = this.searchForm.ownedGrid;
        // this.searchForm.community = this.searchForm.ownedCommunity;
        this.removePupop()
        this.clearEventPoint()
        this.showEventPointFlag = true

        let gridPersonSearchForm = {
          streetId: this.searchForm.allStreetId,
          communityId: this.searchForm.allCommunityId,
          houseGrid: this.searchForm.allGridId,
          pageNumber: this.searchForm.pageNumber,
          pageSize: this.searchForm.pageSize,
          key: this.searchForm.key
        }

        queryAllTZhsqEventListByAnyWayWhere(gridPersonSearchForm).then(res => {
          if (res && res.success) {
            this.eventData = res.data
            this.$parent.eventDataNunber = res.data.length
            for (let i = 0; i < this.eventData.length; i++) {
              if (this.eventData[i].position) {
                let htmlDivElement = parent.document.createElement('div')
                htmlDivElement.style.position = 'relative'
                htmlDivElement.style.left = '-28px'
                htmlDivElement.style.top = '-96px'

                let htmlImgElement = parent.document.createElement('img')
                let htmlContentElement = parent.document.createElement('div')

                htmlImgElement.src = '/img/archives/cl.gif'
                htmlContentElement.innerHTML = '<span id="headDivSpan" class="title" style="left:0px">' + _this.eventData[i].eventClassification + '<br/>' + _this.eventData[i].eventName + '</span>'
                htmlContentElement.style.visibility = 'hidden'
                htmlImgElement.style.marginTop = '6px'
                htmlImgElement.style.marginLeft = '50%'
                htmlImgElement.style.transform = 'translateX(-50%)'

                var overlayer = new Overlay({
                  element: htmlDivElement,
                  // offset: [-14, -47],
                  position: JSON.parse(this.eventData[i].position)
                })
                this.$parent.map.addOverlay(overlayer)
                htmlDivElement.addEventListener('click', function () {
                  // 显示事件
                  _this.TZhsqEventListId = _this.eventData[i].id
                  _this.eventShow = true
                })

                htmlDivElement.addEventListener('mouseover', function () {
                  htmlDivElement.style.zIndex = 10
                  htmlContentElement.style.visibility = 'visible'
                })

                htmlDivElement.addEventListener('mouseout', function () {
                  htmlDivElement.style.zIndex = 0
                  htmlContentElement.style.visibility = 'hidden'
                })

                htmlDivElement.appendChild(htmlContentElement)
                htmlDivElement.appendChild(htmlImgElement)

                this.eventGifArr.push(htmlDivElement)
              }
            }
          } else {
            this.$Message.error('数据加载失败！')
          }
        }).catch(res => {
          this.$Message.error('数据加载失败！')
        }).finally(res => {
        })
      },
      // 隐藏事件坐标点
      clearEventPoint() {
        for (let i = 0; i < this.eventGifArr.length; i++) {
          this.eventGifArr[i].remove()
        }
        this.eventGifArr = []
        this.showEventPointFlag = false
      }
    }
  }
</script>
<style lang="less">
  .ui-layout-west-right {
    position: absolute;
    right: 10px;
    top: 70px;
    z-index: 10;
    width: 420px;
    height: calc(70% - 0px);
    display: flex;
    justify-content: flex-start;
    .ivu-input-group {
      display: inline-table;
      width: calc(95% - 320px);
      min-width: 205px;
      height: 32px !important;
    }
    .functionList{
      position: absolute;
      top: 27px;
    }
    .showResultList{
      position: absolute;
      top: 27px;
      height: calc(100% - 0px);
    }

    .treeDialog {
      margin-top: 3px;
      width: 170px;
      display: block;
      margin-left: 104px;
      height: 250px;
      background: #ffffff;
      overflow: auto;
      position: absolute;
      z-index: 11;
      border: 1px solid #CCCCCC;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1) inset;
    }

    .resultDataList {
      background: rgba(249, 249 ,248,0.8);
      position: absolute;
      top: 27px;
      overflow-y: auto;
      width: 418px;
      max-height: 100%;
    }

    .all-people {
      width: 418px;
      height: 30px;
      line-height: 30px;
      background:rgba(249 ,249, 248, 0.8);
      border-bottom: 1px solid #e0dada;
    }

    .all-people .pon {
      color: #6e6e6e;
      background-position: 12px 15px;
      font-weight: bold;
      float: left;
      display: block;
      font-size: 14px;
      font-family: Arial;
      height: 20px;
      padding-left: 25px;
      background: url('../../img/theme/rsj.png') no-repeat 12px -19px;
    }

    .man-head {
      width: 72px;
      height: 72px;
      border: 1px solid #8ea8be;
      overflow: hidden;
      float: left;
      background: url(../../img/theme/p3.jpg) no-repeat center;
      margin-left: 10px;
      background-size: 100% 100% !important;
    }

    .man-list li {
      display: block;
      height: 92px;
      padding: 8px 0;
      color: #6e6e6e;
    }

    .man-list li:hover {
      color: #FFFFFF;
      background-color: #2d8cf0;
      p{
        color: #FFFFFF;
      }
    }

    .men-infor {
      margin-left: 10px;
      float: left;
      width: 318px;
      margin-top: -4px;
    }

    .men-infor i {
      font-style: normal;
      display: block;
      white-space: nowrap;
    }

    .men-infor p {
      font-weight: bold;
      color: #6e6e6e;
    }
    .men-infor:hover p {
      color: #FFFFFF;
    }

    .resultPage {
      margin-bottom: 20px;
      margin-top: 10px;

      .ivu-page-simple .ivu-page-simple-pager {
        color: #6e6e6e;
      }

      .ivu-page.mini .ivu-page-item {
        color: #6e6e6e;
      }

      .ivu-page-item a {
        margin: 0 2px;
        color: #6e6e6e;
      }

      .ivu-page-item-active a, .ivu-page-item-active:hover a {
        color: #2d8cf0;
      }

      .ivu-page-simple .ivu-page-simple-pager input {
        width: 40px !important;
      }

      .ivu-page-simple {
        width: 100%;
        text-align: center;
      }
    }

    //滚动条样式
    .resultDataList::-webkit-scrollbar {
      width: 4px;
    }

    .resultDataList::-webkit-scrollbar-thumb {
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      background: rgba(0, 0, 0, 0.8);
    }

    .resultDataList::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      border-radius: 0;
      background: rgba(0, 0, 0, 0.2);
    }

    .men-infor a.location {
      width: 15px;
      height: 18px;
      background: url(../../img/theme/pos-icon.gif) no-repeat;
      float: right;
      margin-right: 10px;
    }

    .mokui {
      position: absolute;
      display: flex;
      justify-content: left;
      flex-wrap: wrap;
      background: rgba(249 ,249, 248, 0.8);
      margin-top: 10px;
      padding-bottom: 10px;
      width: 420px;
      z-index: 12;
    }

    .mokui li {
      width: 25%;
      height: 90px;
      display: block;
      float: left;
      text-align: center;
      margin-top: 10px;
    }

    .mokui li p {
      margin-left: 50%;
      transform: translateX(-50%);
      width: 73px;
      height: 62px;
      line-height: 15px;
      display: block;
      background: url("../../img/theme/map-left-btn.png") no-repeat 5px -65px;
    }

    .mokui li p img {
      margin-left: 3px;
      margin-top: 13px;
    }

    .mokui li:hover p {
      background-position: 5px 0;
      cursor: pointer;
    }

    .mokui li:hover a {
      cursor: pointer;
      color: orange;
    }

    .mokui a {
      font-weight: bold;
      color: #6e6e6e;
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
    }

  }


</style>
