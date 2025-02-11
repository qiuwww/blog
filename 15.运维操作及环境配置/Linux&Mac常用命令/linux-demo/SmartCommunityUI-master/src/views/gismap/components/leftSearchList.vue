<template>
  <div v-if="showLeft" class="ui-layout-west" :style="{top:marginTop+'px'}">
    <!--    <Select v-model="searchForm.topic" placeholder="专题" clearable style="width: 100px;" @on-change="onTopicChanged">-->
    <!--      <Option value="人口">人口</Option>-->
    <!--      <Option value="房屋">房屋</Option>-->
    <!--      <Option value="设施">设施</Option>-->
    <!--      <Option value="商户">商户</Option>-->
    <!--    </Select>-->

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

    <Input
      id="gridmap_regionno_title"
      v-model="ownedGridName"
      readonly
      placeholder="辖区"
      style="width: 100px;"
      clearable
      @click.native="showTree=!showTree"
      @on-clear="clearFeatureAndGrids(2)"
    />

    <Input
      v-model="searchForm.key"
      search
      enter-button
      placeholder="需要搜索的信息"
      style="white-space: nowrap"
      @on-search="onSearch"
    />

    <div v-show="showTree" id="gridmap_regionno_show" class="treeDialog" transfer>
      <Tree id="tree" :data="treeData" transfer @on-select-change="onTreeClick" />
    </div>

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
          <a title="设施" href="javascript:" @click="onTopicChanged('设施')">
            <p>
              <img src="../../img/theme/sp-cx.png" style="width:40px;height:34px;">
            </p>
            <span>设施</span>
          </a>
        </li>
        <li>
          <a title="商户" href="javascript:" @click="onTopicChanged('商户')">
            <p>
              <img src="../../img/theme/dw-cx.png" style="width:40px;height:34px;">
            </p>
            <span>商户</span>
          </a>
        </li>

        <li>
          <a title="网格人员" href="javascript:" @click="onTopicChanged('社会组织')">
            <p>
              <img src="../../img/theme/cx_laobao.png" style="width:40px;height:34px;">
            </p>
            <span>社会组织</span>
          </a>
        </li>
      </ul>
    </div>

    <div v-if="showResultList" style="margin-top: 3px;">
      <div class="all-people">
        <span v-if="totalCount > 0" class="pon">共找到（<em style="color: red;font-style: normal;font-size: 15px">{{ totalCount }}</em>）条数据</span>
        <span v-else class="pon">没有找到相关数据！</span>
        <Icon
          type="md-backspace"
          style="float: right;margin-right: 5px;"
          :size="25"
          color="#fff"
          @click="showResultList=false"
        />
      </div>
      <div class="resultDataList">
        <ul v-if="searchForm.topic=='人口'" class="man-list">
          <li v-for="(item, i)  in personData" :key="item.id">
            <div
              class="man-head"
              :style="{'background': item.imgPath ? 'url('+ nginxUrl + item.imgPath +') no-repeat center' : ''}"
            />
            <div class="men-infor" style="line-height: 21px;">
              <b>
                <a v-if="item.position" class="location" title="定位" @click="flyto(item.position)" />
              </b>
              <p>{{ item.name }}</p>
              <i>证件号码:{{ item.cardId }}</i>
              <i>性别:{{ item.sex }}</i>
              <i>联系电话:{{ item.phone }}</i>
            </div>
          </li>
        </ul>

        <ul v-if="searchForm.topic=='房屋'" class="man-list">
          <li v-for="(item, i)  in houseData" :key="item.id">
            <div class="man-head" style="background: url('/img/archives/p10.png') no-repeat center" />
            <div class="men-infor" style="line-height: 40px;">
              <b>
                <a v-if="item.position" class="location" title="定位" @click="flyto(item.position)" />
              </b>
              <i>单元名称:{{ item.unit }}</i>
              <i>楼栋名称:{{ item.buildArchiveName }}</i>
            </div>
          </li>
        </ul>

        <ul v-if="searchForm.topic=='设施'" class="man-list">
          <li v-for="(item, i)  in buildingArchivesData" :key="item.id">
            <div
              class="man-head"
              :style="{'background': item.imgPath ? 'url('+ nginxUrl + item.imgPath +') no-repeat center' : 'url(\'/img/archives/p10.png\') no-repeat center'}"
            />
            <div class="men-infor" style="line-height: 26px;">
              <b>
                <a v-if="item.location" class="location" title="定位" @click="flyto(item.location)" />
              </b>
              <i>建筑名称:{{ item.buildingName }}</i>
              <i>建筑类型:{{ item.buildingType }}</i>
              <i>建筑地址:{{ item.buildingAddress }}</i>
            </div>
          </li>
        </ul>

        <ul v-if="searchForm.topic=='商户'" class="man-list">
          <li v-for="(item, i)  in merchantData" :key="item.id">
            <div
              class="man-head"
              :style="{'background': item.headPortrait ? 'url('+ nginxUrl + item.headPortrait +') no-repeat center' : 'url(\'/img/archives/p10.png\') no-repeat center'}"
            />
            <div class="men-infor" style="line-height: 21px;">
              <b>
                <a v-if="item.location" class="location" title="定位" @click="flyto(item.location)" />
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
            <div
              class="man-head"
              :style="{'background': item.headPortrait ? 'url('+ nginxUrl + item.headPortrait +') no-repeat center' : 'url(\'/img/archives/p10.png\') no-repeat center'}"
            />
            <div class="men-infor" style="line-height: 21px;">
              <b>
                <a v-if="item.position" class="location" title="定位" @click="flyto(item.position)" />
              </b>
              <i>社会组织名称:{{ item.name }}</i>
              <i>社会组织类别:{{ item.type }}</i>
              <i>所属房屋:{{ item.address }}</i>
              <i>法人:{{ item.legalPerson }}</i>
            </div>
          </li>
        </ul>

        <div v-if="!loading && totalCount>0" class="resultPage">
          <Page :current="pageNumber" :total="totalCount" simple :page-size="pageSize" @on-change="onPageChange" />
        </div>
      </div>
    </div>

    <lookBasicPerson v-model="personShow" :basic-person-id="BasicPersonId" modal-title="人员档案查看" />

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
import { queryAllList } from '@/api/zhsq/basicGrids/basicGrids'
import { Polygon, Point } from 'ol/geom'
import Feature from 'ol/Feature'
import Overlay from 'ol/Overlay'
import { Fill, Icon, Stroke, Style, Text } from 'ol/style'
import { queryBasicPersonListByAnyWayWhere } from '@/api/zhsq/basicPerson/basicPerson'
import { queryBasicHousingListByAnyWayWhere } from '@/api/zhsq/basicHouse/basicHouse'
import { queryTBuildingArchivesListByAnyWayWhere } from '@/api/zhsq/tBuildingArchives/tBuildingArchives'
import { queryTZhsqMerchantProfileListByAnyWayWhere } from '@/api/zhsq/tZhsqMerchantProfile/tZhsqMerchantProfile'
import { queryAllTZhsqGridMemberListByAnyWayWhere } from '@/api/zhsq/tZhsqGridMember/tZhsqGridMember'
import { queryAllTZhsqEventListByAnyWayWhere } from '@/api/zhsq/tZhsqEventList/tZhsqEventList'
import { queryBasicSocialOrganizationListByAnyWayWhere } from '@/api/zhsq/basicSocialOrganization/basicSocialOrganization'
import { getCommunity, getDictionary, getStreet } from '../../../api'
import lookBasicPerson from '../../zhsq/basicPerson/lookBasicPerson'
import lookHousingManage from '../../zhsq/basicHouseManage/lookHousingManage'
import lookBuildingArchives from '../../zhsq/tConstruct/lookConstruct'
import lookTZhsqMerchantProfile from '../../zhsq/tZhsqMerchantProfile/lookTZhsqMerchantProfile'
import gridPersonInfo from './gridPersonInfo'
import lookTZhsqEventList from '../../zhsq/tZhsqEventList/lookTZhsqEventList'
import lookBasicSocialOrganization from '../../zhsq/basicSocialOrganization/lookBasicSocialOrganization'
import { formartDate, nginxUrl } from '../../../api/tools/tool'

export default {
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
      showGridPersonPointFlag: false, // 是否显示网格人员标记
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

      ownedGridName: '',
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
    const _this = this

    this.$nextTick(() => {
      var content = parent.document.getElementById('content')
      content.addEventListener('click', function() {
        _this.showTree = false
        _this.showTopic = false
      })
      const element = document.getElementById('gridmap_regionno_title')
      element.addEventListener('click', function(e) {
        _this.showTopic = false
        e.stopPropagation()
      })

      const elementTopic = document.getElementById('gridmap_regionno_topic')
      elementTopic.addEventListener('click', function(e) {
        _this.showTree = false
        e.stopPropagation()
      })
      const elementById = document.getElementById('gridmap_regionno_show')
      elementById.addEventListener('click', function(e) {
        e.stopPropagation()
      })
    })
  },
  methods: {
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
      this.onSearch()
    },
    onGridNameChanged() {
      this.showResultList = false
      this.totalCount = 0
      if (!this.searchForm.topic) {
        return
      }
      if (!this.ownedGridName) {
        return
      }
      this.onSearch()
    },

    // 查询后台数据
    onSearch() {
      if (!this.searchForm.topic) {
        this.$Message.error('请选择对应的专题！')
        return
      }
      if (!this.ownedGridName) {
        this.$Message.error('请选择对应的辖区！')
        return
      }
      // 选项传递给父页面
      if (this.searchForm.allGridId != '') {
        this.$parent.echarschart = [this.searchForm.topic, this.searchForm.allGridId]
      } else if (this.searchForm.allCommunityId != '') {
        this.$parent.echarschart = [this.searchForm.topic, this.searchForm.allCommunityId]
      } else if (this.searchForm.allStreetId != '') {
        this.$parent.echarschart = [this.searchForm.topic, this.searchForm.allStreetId]
      }
      this.showResultList = false
      this.totalCount = 0
      this.searchForm.pageNumber = this.pageNumber
      this.searchForm.pageSize = this.pageSize

      this.loading = true
      if (this.searchForm.topic == '人口') {
        this.clearFeature()
        this.removePupop()
        const personSearchForm = {
          streetId: this.searchForm.allStreetId,
          communityId: this.searchForm.allCommunityId,
          ownedGridId: this.searchForm.allGridId,
          pageNumber: this.searchForm.pageNumber,
          pageSize: this.searchForm.pageSize,
          key: this.searchForm.key
        }
        queryBasicPersonListByAnyWayWhere(personSearchForm).then(res => {
          if (res && res.success) {
            this.personData = res.data.records
            this.totalCount = res.data.total
            for (let i = 0; i < this.personData.length; i++) {
              if (this.personData[i].position) {
                const mypoint = new Point(JSON.parse(this.personData[i].position))
                const feature = new Feature(mypoint)
                const properties = {
                  id: this.personData[i].id,
                  type: 'person',
                  name: this.personData[i].name,
                  position: this.personData[i].position
                }
                feature.setProperties(properties)
                // 坐标点样式
                const pointStyle = new Style({
                  image: new Icon({
                    anchor: [0.5, 46],
                    anchorXUnits: 'fraction',
                    anchorYUnits: 'pixels',
                    src: '/img/archives/person_off.png'
                  })
                })
                feature.setStyle(pointStyle)
                this.$parent.source.addFeature(feature)
                this.personFeatureArr.push(feature)
                this.showPupop(properties)
              }
            }
            this.$parent.vector.setSource(this.$parent.source)
          } else {
            this.$Message.error('数据加载失败！')
          }
        }).catch(res => {
          this.$Message.error('数据加载失败！')
        }).finally(res => {
          this.loading = false
          this.showResultList = true
        })
      } else if (this.searchForm.topic == '房屋') {
        this.clearFeature()
        this.removePupop()
        const houseSearchForm = {
          houseStreetId: this.searchForm.allStreetId,
          houseCommunityId: this.searchForm.allCommunityId,
          houseGridId: this.searchForm.allGridId,
          pageNumber: this.searchForm.pageNumber,
          pageSize: this.searchForm.pageSize,
          key: this.searchForm.key
        }
        queryBasicHousingListByAnyWayWhere(houseSearchForm).then(res => {
          if (res && res.success) {
            this.houseData = res.data.records
            this.totalCount = res.data.total
            for (let i = 0; i < this.houseData.length; i++) {
              if (this.houseData[i].position) {
                const mypoint = new Point(JSON.parse(this.houseData[i].position))
                const feature = new Feature(mypoint)
                const properties = {
                  id: this.houseData[i].id,
                  type: 'fangwu',
                  name: this.houseData[i].buildArchiveName,
                  position: this.houseData[i].position
                }
                feature.setProperties(properties)
                // 坐标点样式
                const pointStyle = new Style({
                  image: new Icon({
                    anchor: [0.5, 46],
                    anchorXUnits: 'fraction',
                    anchorYUnits: 'pixels',
                    src: '/img/archives/lou_off.png'
                  })
                })
                feature.setStyle(pointStyle)
                this.$parent.source.addFeature(feature)
                this.houseFeatureArr.push(feature)
                this.showPupop(properties)
              }
            }
            this.$parent.vector.setSource(this.$parent.source)
          } else {
            this.$Message.error('数据加载失败！')
          }
        }).catch(res => {
          this.$Message.error('数据加载失败！')
        }).finally(res => {
          this.loading = false
          this.showResultList = true
        })
      } else if (this.searchForm.topic == '设施') {
        this.clearFeature()
        this.removePupop()
        const archivesSearchForm = {
          streetId: this.searchForm.allStreetId,
          communityId: this.searchForm.allCommunityId,
          grid: this.searchForm.allGridId,
          pageNumber: this.searchForm.pageNumber,
          pageSize: this.searchForm.pageSize,
          key: this.searchForm.key
        }
        queryTBuildingArchivesListByAnyWayWhere(archivesSearchForm).then(res => {
          if (res && res.success) {
            this.buildingArchivesData = res.data.records
            this.totalCount = res.data.total
            for (let i = 0; i < this.buildingArchivesData.length; i++) {
              if (this.buildingArchivesData[i].location) {
                const mypoint = new Point(JSON.parse(this.buildingArchivesData[i].location))
                const feature = new Feature(mypoint)
                const properties = {
                  id: this.buildingArchivesData[i].id,
                  type: 'sheshi',
                  name: this.buildingArchivesData[i].buildingName,
                  position: this.buildingArchivesData[i].location
                }
                feature.setProperties(properties)
                // 坐标点样式
                const pointStyle = new Style({
                  image: new Icon({
                    anchor: [0.5, 46],
                    anchorXUnits: 'fraction',
                    anchorYUnits: 'pixels',
                    src: '/img/archives/lou_off.png'
                  })
                })
                feature.setStyle(pointStyle)
                this.$parent.source.addFeature(feature)
                this.buildingArchivesFeatureArr.push(feature)
                this.showPupop(properties)
              }
            }
            this.$parent.vector.setSource(this.$parent.source)
          } else {
            this.$Message.error('数据加载失败！')
          }
        }).catch(res => {
          this.$Message.error('数据加载失败！')
        }).finally(res => {
          this.loading = false
          this.showResultList = true
        })
      } else if (this.searchForm.topic == '商户') {
        this.clearFeature()
        this.removePupop()
        const merchantSearchForm = {
          streetId: this.searchForm.allStreetId,
          legalCommunityId: this.searchForm.allCommunityId,
          gridId: this.searchForm.allGridId,
          pageNumber: this.searchForm.pageNumber,
          pageSize: this.searchForm.pageSize,
          key: this.searchForm.key
        }
        queryTZhsqMerchantProfileListByAnyWayWhere(merchantSearchForm).then(res => {
          if (res && res.success) {
            this.merchantData = res.data.records
            this.totalCount = res.data.total
            for (let i = 0; i < this.merchantData.length; i++) {
              if (this.merchantData[i].location) {
                const mypoint = new Point(JSON.parse(this.merchantData[i].location))
                const feature = new Feature(mypoint)
                const properties = {
                  id: this.merchantData[i].id,
                  type: 'shanghu',
                  name: this.merchantData[i].merchantName,
                  position: this.merchantData[i].location
                }
                feature.setProperties(properties)
                // 坐标点样式
                const pointStyle = new Style({
                  image: new Icon({
                    anchor: [0.5, 46],
                    anchorXUnits: 'fraction',
                    anchorYUnits: 'pixels',
                    src: '/img/archives/shanghu_off.png'
                  })
                })
                feature.setStyle(pointStyle)
                this.$parent.source.addFeature(feature)
                this.merchantFeatureArr.push(feature)
                this.showPupop(properties)
              }
            }
            this.$parent.vector.setSource(this.$parent.source)
          } else {
            this.$Message.error('数据加载失败！')
          }
        }).catch(res => {
          this.$Message.error('数据加载失败！')
        }).finally(res => {
          this.loading = false
          this.showResultList = true
        })
      } else if (this.searchForm.topic == '社会组织') {
        this.clearFeature()
        this.removePupop()
        const organizationSearchForm = {
          streetId: this.searchForm.allStreetId,
          communityId: this.searchForm.allCommunityId,
          gridsId: this.searchForm.allGridId,
          pageNumber: this.searchForm.pageNumber,
          pageSize: this.searchForm.pageSize,
          key: this.searchForm.key
        }
        queryBasicSocialOrganizationListByAnyWayWhere(organizationSearchForm).then(res => {
          if (res && res.success) {
            this.organizationData = res.data.records
            this.totalCount = res.data.total

            for (let i = 0; i < this.organizationData.length; i++) {
              if (this.organizationData[i].position) {
                const mypoint = new Point(JSON.parse(this.organizationData[i].position))
                const feature = new Feature(mypoint)
                const properties = {
                  id: this.organizationData[i].id,
                  type: 'shehuizuzhi',
                  name: this.organizationData[i].name,
                  position: this.organizationData[i].position
                }
                feature.setProperties(properties)
                // 坐标点样式
                const pointStyle = new Style({
                  image: new Icon({
                    anchor: [0.5, 46],
                    anchorXUnits: 'fraction',
                    anchorYUnits: 'pixels',
                    src: '/img/archives/dan_off.png'
                  })
                })
                feature.setStyle(pointStyle)
                this.$parent.source.addFeature(feature)
                this.organizationFeatureArr.push(feature)
                this.showPupop(properties)
              }
            }
            this.$parent.vector.setSource(this.$parent.source)
          } else {
            this.$Message.error('数据加载失败！')
          }
        }).catch(res => {
          this.$Message.error('数据加载失败！')
        }).finally(res => {
          this.loading = false
          this.showResultList = true
        })
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
    // 显示网格面
    ShowFeature(e) {
      const objData = JSON.parse(e.position)
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
      this.$parent.source.addFeature(feature)
      this.polygonArr.push(feature)
      this.$parent.vector.setSource(this.$parent.source)
      this.$parent.map.getView().setCenter(objData)
    },
    // 点击树形节点
    onTreeClick(e) {
      if (e && e.length > 0) {
        // 清除网格面
        for (let i = 0; i < this.polygonArr.length; i++) {
          this.$parent.source.removeFeature(this.polygonArr[i])
        }
        this.polygonArr = []
        this.showTree = false

        if (e[0].level == 1) {
          this.searchForm.allStreetId = e[0].id
          this.searchForm.allCommunityId = ''
          this.searchForm.allGridId = ''
        } else if (e[0].level == 2) {
          this.searchForm.allCommunityId = e[0].id
          this.searchForm.allGridId = ''
          e[0].children.forEach(element => {
            if (element.position) {
              this.ShowFeature(element)
            }
          })
        } else if (e[0].level == 3) {
          this.searchForm.allGridId = e[0].id
        }
        this.ownedGridName = e[0].title
        if (e[0].position) {
          this.ShowFeature(e[0])
        }
        this.onGridNameChanged()
      } else {
        this.ownedGridName = ''
        this.searchForm.allStreetId = ''
        this.searchForm.allCommunityId = ''
        this.searchForm.allGridId = ''
      }
      // 如果是选中的网格人员，点击树形联动查询
      if (this.showGridPersonPointFlag) {
        this.showGridPersonPoint()
      }

      // 如果是选中的事件，点击树形联动查询
      if (this.showEventPointFlag) {
        this.showEventPoint()
      }
    },
    init() {
      // 获取街道及社区、网格数据
      getStreet({}).then(res => {
        let arrNumber = 0
        if (res && res.success) {
          for (let j = 0; j < res.data.length; j++) {
            var arrone =
                                {
                                  id: '', title: '', level: 1, children: [], render: (h, { root, node, data }) => {
                                    return h('span', {
                                      style: {
                                        display: 'inline-block',
                                        width: '100%'
                                      }
                                    }, [
                                      h('span', [
                                        h('Icon', {
                                          props: {
                                            type: 'ios-folder-outline'
                                          },
                                          style: {
                                            marginRight: '8px'
                                          }
                                        }),
                                        h('span', data.title)
                                      ])
                                    ])
                                  }
                                }
            arrone.id = res.data[j].id
            arrone.title = res.data[j].name
            this.treeData.push(arrone)
          }
          const _this = this
          if (arrNumber < this.treeData.length) {
            factorial(arrNumber)
          }

          function factorial(n) {
            // 获取社区信息
            getCommunity({ streetId: _this.treeData[n].id }).then(res => {
              if (res && res.success) {
                var arrtwo =
                                        {
                                          id: '',
                                          title: '',
                                          level: 2,
                                          children: [],
                                          render: (h, { root, node, data }) => {
                                            return h('span', {
                                              style: {
                                                display: 'inline-block',
                                                width: '100%'
                                              }
                                            }, [
                                              h('span', [
                                                h('Icon', {
                                                  props: {
                                                    type: 'ios-folder-outline'
                                                  },
                                                  style: {
                                                    marginRight: '8px'
                                                  }
                                                }),
                                                h('span', data.title)
                                              ])
                                            ])
                                          }
                                        }
                res.data.forEach(element => {
                  arrtwo.id = element.id
                  arrtwo.title = element.name
                  _this.treeData[arrNumber].children.push(arrtwo)
                })
              }
              if (arrNumber < _this.treeData.length) {
                arrNumber++
                return factorial(arrNumber)
              }
            })
          }
        }

        // 加载辖区数据
        queryAllList({}).then(res => {
          if (res && res.success) {
            for (let i = 0; i < res.data.length; i++) {
              for (let j = 0; j < this.treeData.length; j++) {
                if (this.treeData[j].children != []) {
                  this.treeData[j].children.forEach(element => {
                    if (element.id == res.data[i].communityId) {
                      element.children.push({
                        id: res.data[i].id,
                        title: res.data[i].name,
                        level: 3,
                        position: res.data[i].position,
                        render: (h, { root, node, data }) => {
                          return h('span', {
                            style: {
                              display: 'inline-block',
                              width: '100%'
                            }
                          }, [
                            h('span', [
                              h('Icon', {
                                props: {
                                  type: 'ios-paper-outline'
                                },
                                style: {
                                  marginRight: '8px'
                                }
                              }),
                              h('span', data.title)
                            ])
                          ])
                        }
                      })
                    }
                  })
                }
              }
            }
          }
        })
      })
    },
    // 加载专题在地图上显示的图标
    initMapFeature() {
      var _this = this
      let pointerMoveSelected = null
      this.$parent.map.on('pointermove', function(e) {
        if (pointerMoveSelected != null) {
          const properties = pointerMoveSelected.getProperties()
          if (properties.type != 'person' && properties.type != 'fangwu' && properties.type != 'sheshi' && properties.type != 'shanghu' && properties.type != 'shehuizuzhi') {
          } else {
            if (pointerMoveSelected != selected) {
              pointerMoveSelected.setStyle(_this.getDefaultStyle(properties))
              pointerMoveSelected = null
            }
          }
        }
        _this.$parent.map.forEachFeatureAtPixel(e.pixel, function(f) {
          pointerMoveSelected = f
          return true
        })
        if (pointerMoveSelected != null) {
          const properties = pointerMoveSelected.getProperties()
          if (properties.type != 'person' && properties.type != 'fangwu' && properties.type != 'sheshi' && properties.type != 'shanghu' && properties.type != 'shehuizuzhi') {
            return
          }
          const style = _this.getHighlightStyle(properties)
          pointerMoveSelected.setStyle(style)
        }
      })

      let selected = null
      this.$parent.map.on('click', function(e) {
        if (selected != null) {
          const properties = selected.getProperties()
          if (properties.type != 'person' && properties.type != 'fangwu' && properties.type != 'sheshi' && properties.type != 'shanghu' && properties.type != 'shehuizuzhi') {
            return
          }
          selected.setStyle(_this.getDefaultStyle(properties))
          selected = null
        }
        _this.$parent.map.forEachFeatureAtPixel(e.pixel, function(f) {
          selected = f
          return true
        })
        if (selected != null) {
          const properties = selected.getProperties()
          if (properties.type != 'person' && properties.type != 'fangwu' && properties.type != 'sheshi' && properties.type != 'shanghu' && properties.type != 'shehuizuzhi') {
            return
          }
          const style = _this.getHighlightStyle(properties)
          selected.setStyle(style)

          if (properties.type == 'person') {
            _this.personShow = true
            _this.BasicPersonId = properties.id
          } else if (properties.type == 'fangwu') {
            _this.housingShow = true
            _this.BasicHousingManageId = properties.id
          } else if (properties.type == 'sheshi') {
            _this.TBuildingArchivesId = properties.id
            _this.buildingShow = true
          } else if (properties.type == 'shanghu') {
            _this.merchantShow = true
            _this.TZhsqMerchantProfileId = properties.id
          } else if (properties.type == 'shehuizuzhi') {
            _this.organizationShow = true
            _this.BasicSocialOrganizationId = properties.id
          }
        }
      })
    },
    // 显示默认图标
    getDefaultStyle(properties) {
      let imgSrc = '/img/archives/person_off.png'
      if (properties && properties.type) {
        if (properties.type == 'person') {
          imgSrc = '/img/archives/person_off.png'
        } else if (properties.type == 'fangwu' || properties.type == 'sheshi') {
          imgSrc = '/img/archives/lou_off.png'
        } else if (properties.type == 'shanghu') {
          imgSrc = '/img/archives/shanghu_off.png'
        } else if (properties.type == 'shehuizuzhi') {
          imgSrc = '/img/archives/dan_off.png'
        }
      }
      const style = new Style({
        image: new Icon({
          anchor: [0.5, 46],
          anchorXUnits: 'fraction',
          anchorYUnits: 'pixels',
          src: imgSrc
        })
      })
      return style
    },
    // 显示高亮图标
    getHighlightStyle(properties) {
      let imgSrc = '/img/archives/person_on.png'
      if (properties && properties.type) {
        if (properties.type == 'person') {
          imgSrc = '/img/archives/person_on.png'
        } else if (properties.type == 'fangwu' || properties.type == 'sheshi') {
          imgSrc = '/img/archives/lou_on.png'
        } else if (properties.type == 'shanghu') {
          imgSrc = '/img/archives/shanghu_on.png'
        } else if (properties.type == 'shehuizuzhi') {
          imgSrc = '/img/archives/dan_on.png'
        }
      }

      const style = new Style({
        image: new Icon({
          anchor: [0.5, 46],
          anchorXUnits: 'fraction',
          anchorYUnits: 'pixels',
          src: imgSrc
        })
      })
      return style
    },
    // 显示顶部label
    showPupop(properties) {
      const _this = this
      const htmlDivElement = parent.document.createElement('div')
      this.divArr.push(htmlDivElement)
      var overlayer = new Overlay({
        element: htmlDivElement,
        offset: [0, -97],
        position: JSON.parse(properties.position)
      })
      htmlDivElement.innerHTML = '<span class="title">' + properties.name + '</span>'
      this.$parent.map.addOverlay(overlayer)
      htmlDivElement.addEventListener('click', function() {
        if (properties.type == 'person') {
          _this.personShow = true
          _this.BasicPersonId = properties.id
        } else if (properties.type == 'fangwu') {
          _this.housingShow = true
          _this.BasicHousingManageId = properties.id
        } else if (properties.type == 'sheshi') {
          _this.TBuildingArchivesId = properties.id
          _this.buildingShow = true
        } else if (properties.type == 'shanghu') {
          _this.merchantShow = true
          _this.TZhsqMerchantProfileId = properties.id
        } else if (properties.type == 'shehuizuzhi') {
          _this.organizationShow = true
          _this.BasicSocialOrganizationId = properties.id
        }
      })
    },
    removePupop() {
      for (let i = 0; i < this.divArr.length; i++) {
        this.divArr[i].remove()
      }
      this.divArr = []
    },
    clearFeature() {
      for (let i = 0; i < this.houseFeatureArr.length; i++) {
        this.$parent.source.removeFeature(this.houseFeatureArr[i])
      }
      this.houseFeatureArr = []

      for (let i = 0; i < this.personFeatureArr.length; i++) {
        this.$parent.source.removeFeature(this.personFeatureArr[i])
      }
      this.personFeatureArr = []

      for (let i = 0; i < this.buildingArchivesFeatureArr.length; i++) {
        this.$parent.source.removeFeature(this.buildingArchivesFeatureArr[i])
      }
      this.buildingArchivesFeatureArr = []

      for (let i = 0; i < this.merchantFeatureArr.length; i++) {
        this.$parent.source.removeFeature(this.merchantFeatureArr[i])
      }
      this.merchantFeatureArr = []

      // this.clearGridPersonPoint();
      this.clearGridPersonMoveArr()

      for (let i = 0; i < this.organizationFeatureArr.length; i++) {
        this.$parent.source.removeFeature(this.organizationFeatureArr[i])
      }
      this.organizationFeatureArr = []
    },
    clearFeatureAndGrids(type) {
      // 清除网格面
      for (let i = 0; i < this.polygonArr.length; i++) {
        this.$parent.source.removeFeature(this.polygonArr[i])
      }
      this.polygonArr = []
      this.showTree = false
      this.removePupop()
      this.clearFeature()
      if (type == 2) {
        this.setTreeSelectStatus(this.treeData)
        this.ownedGridName = ''
        this.searchForm.ownedGrid = ''
        this.searchForm.ownedCommunity = ''
      }
      if (type == 1) {
        this.searchForm.topic = ''
      }

      if (this.showEventPointFlag) {
        this.showEventPoint()
      }
      if (this.showGridPersonPointFlag) {
        this.showGridPersonPoint()
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
    // 显示网格人员在地图上
    showGridPersonPoint() {
      const _this = this
      this.clearFeature()
      this.removePupop()
      this.clearGridPersonPoint()
      this.showGridPersonPointFlag = true

      const gridPersonSearchForm = {
        streetId: this.searchForm.allStreetId,
        communityId: this.searchForm.allCommunityId,
        houseGrid: this.searchForm.allGridId,
        pageNumber: this.searchForm.pageNumber,
        pageSize: this.searchForm.pageSize,
        key: this.searchForm.key
      }

      queryAllTZhsqGridMemberListByAnyWayWhere(gridPersonSearchForm).then(res => {
        if (res && res.success) {
          this.gridPersonData = res.data
          this.$parent.gridPersonNumber = res.data.length
          for (let i = 0; i < this.gridPersonData.length; i++) {
            if (this.gridPersonData[i].position) {
              const htmlDivElement = parent.document.createElement('div')
              htmlDivElement.style.position = 'relative'
              htmlDivElement.style.left = '-28px'
              htmlDivElement.style.top = '-96px'

              const htmlImgElement = parent.document.createElement('img')
              const htmlContentElement = parent.document.createElement('div')

              htmlImgElement.src = '/img/archives/unlinejob_off.gif'
              htmlContentElement.innerHTML = '<span id="headDivSpan" class="title" style="left:0px">' + _this.gridPersonData[i].name + '</span>'
              htmlContentElement.style.visibility = 'hidden'
              htmlImgElement.style.marginTop = '6px'
              htmlImgElement.style.marginLeft = '50%'
              htmlImgElement.style.transform = 'translateX(-50%)'

              var overlayer = new Overlay({
                element: htmlDivElement,
                // offset: [-14, -47],
                position: JSON.parse(this.gridPersonData[i].position)
              })
              this.$parent.map.addOverlay(overlayer)
              htmlDivElement.addEventListener('click', function() {
                // 显示网格人员基本信息和轨迹
                _this.gridPersonId = _this.gridPersonData[i].id
                _this.gridPersonOverlay = overlayer
                _this.gridPersonShow = false
                _this.gridPersonShow = true
              })

              htmlDivElement.addEventListener('mouseover', function() {
                htmlImgElement.src = '/img/archives/unlinejob_on.gif'
                htmlContentElement.style.visibility = 'visible'
              })

              htmlDivElement.addEventListener('mouseout', function() {
                htmlImgElement.src = '/img/archives/unlinejob_off.gif'
                htmlContentElement.style.visibility = 'hidden'
              })

              htmlDivElement.appendChild(htmlContentElement)
              htmlDivElement.appendChild(htmlImgElement)

              this.gridPersonGifArr.push(htmlDivElement)

              // let mypoint = new Point(JSON.parse(this.gridPersonData[i].position));
              // let feature = new Feature(mypoint);
              // let properties = {
              //     id: this.gridPersonData[i].id,
              //     type: 'gridPerson',
              //     name: this.gridPersonData[i].name,
              //     position: this.gridPersonData[i].position
              // };
              // feature.setProperties(properties);
              // //坐标点样式
              // let pointStyle = new Style({
              //     image: new Icon({
              //         anchor: [0.5, 46],
              //         anchorXUnits: 'fraction',
              //         anchorYUnits: 'pixels',
              //         src: '/img/archives/unlinejob_off.gif'
              //     })
              // });
              // feature.setStyle(pointStyle);
              // this.$parent.source.addFeature(feature);
              // this.gridPersonFeatureArr.push(feature);
              // this.showPupop(properties);
            }
          }
          // this.$parent.vector.setSource(this.$parent.source);
        } else {
          this.$Message.error('数据加载失败！')
        }
      }).catch(res => {
        this.$Message.error('数据加载失败！')
      }).finally(res => {
      })
    },
    // 清除网格人员坐标点
    clearGridPersonPoint() {
      for (let i = 0; i < this.gridPersonGifArr.length; i++) {
        this.gridPersonGifArr[i].remove()
      }
      this.gridPersonGifArr = []
      this.showGridPersonPointFlag = false
    },
    // 显示网格人员移动的坐标
    showGridPersonMove(gridPersonData) {
      this.clearGridPersonMoveArr()

      const htmlDivElement = parent.document.createElement('div')
      htmlDivElement.style.position = 'relative'
      htmlDivElement.style.left = '-68px'
      htmlDivElement.style.top = '-96px'

      const htmlImgElement = parent.document.createElement('img')
      const htmlContentElement = parent.document.createElement('div')

      htmlImgElement.src = '/img/archives/unlinejob_on.gif'
      htmlContentElement.innerHTML = '<span id="headDivSpan2" class="title" style="left:0px">' + formartDate(gridPersonData.createTime) + '</span>'
      htmlContentElement.style.visibility = 'visible'
      htmlImgElement.style.marginTop = '6px'
      htmlImgElement.style.marginLeft = '50%'
      htmlImgElement.style.transform = 'translateX(-50%)'

      htmlDivElement.appendChild(htmlContentElement)
      htmlDivElement.appendChild(htmlImgElement)

      const overlayer = new Overlay({
        element: htmlDivElement,
        position: JSON.parse(gridPersonData.position)
      })
      this.$parent.map.addOverlay(overlayer)

      this.GridPersonMoveArr.push(htmlDivElement)
    },
    // 清除网格人员移动的图标
    clearGridPersonMoveArr() {
      for (let i = 0; i < this.GridPersonMoveArr.length; i++) {
        this.GridPersonMoveArr[i].remove()
      }
      this.GridPersonMoveArr = []
    },
    // 显示事件坐标点
    showEventPoint() { // todo 事件列表
      const _this = this
      this.clearFeature()
      // this.searchForm.grid = this.searchForm.ownedGrid;
      // this.searchForm.community = this.searchForm.ownedCommunity;
      this.removePupop()
      this.clearEventPoint()
      this.showEventPointFlag = true

      const gridPersonSearchForm = {
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
              const htmlDivElement = parent.document.createElement('div')
              htmlDivElement.style.position = 'relative'
              htmlDivElement.style.left = '-28px'
              htmlDivElement.style.top = '-96px'

              const htmlImgElement = parent.document.createElement('img')
              const htmlContentElement = parent.document.createElement('div')

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
              htmlDivElement.addEventListener('click', function() {
                // 显示事件
                _this.TZhsqEventListId = _this.eventData[i].id
                _this.eventShow = true
              })

              htmlDivElement.addEventListener('mouseover', function() {
                htmlDivElement.style.zIndex = 10
                htmlContentElement.style.visibility = 'visible'
              })

              htmlDivElement.addEventListener('mouseout', function() {
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
<style lang="less" >
  .ui-layout-west {
    position: absolute;
    left: 10px;
    top: 70px;
    z-index: 10;
    width: 420px;
    height: calc(70% - 0px);

    .ivu-input-group {
      display: inline-table;
      width: calc(95% - 320px);
      min-width: 205px;
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
      background: rgba(0, 0, 0, 0.3);
      position: absolute;
      overflow-y: auto;
      width: 414px;
      max-height: 100%;
    }

    .all-people {
      width: 414px;
      height: 30px;
      line-height: 30px;
      background: rgba(0, 0, 0, 0.3);
      border-bottom: 1px solid #4f515c;
    }

    .all-people .pon {
      color: #ffffff;
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
      color: #ffffff;
    }

    .man-list li:hover {
      color: #ffffff;
      background-color: #2d8cf0;
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
      color: #ffffff;
    }

    .resultPage {
      margin-bottom: 20px;
      margin-top: 10px;

      .ivu-page-simple .ivu-page-simple-pager {
        color: #ffffff;
      }

      .ivu-page.mini .ivu-page-item {
        color: #ffffff;
      }

      .ivu-page-item a {
        margin: 0 2px;
        color: #ffffff;
      }

      .ivu-page-item-active a, .ivu-page-item-active:hover a {
        color: #2d8cf0;
      }

      .ivu-page-simple .ivu-page-simple-pager input {
        width: 40px;
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
      background: rgba(0, 0, 0, 0.3);
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
      color: #ffffff;
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
