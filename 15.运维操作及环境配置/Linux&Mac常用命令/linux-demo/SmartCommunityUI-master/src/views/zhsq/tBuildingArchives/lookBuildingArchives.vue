<style lang="less" >
  .looktTSubstances {
    .ivu-row {
      height: 40px;
    }

    .ivu-col {
      height: 40px;
    }

    .ivu-col-span-sm-12 {
      padding-left: 7px !important;
    }

    .blueFont {
      color: blue;
    }

    .statistics {
      display: inline-block;
      font-size: 0;
      margin-right: 20px;
    }

    .type {
      border: 1px solid #dcdee2;
      border-radius: 3px 0 0 3px;
      padding: 5px 10px;
      font-size: 14px;
      width: 80px;
      float: left;
      text-align: center;
    }

    .typeNum {
      border: 1px solid #dcdee2;
      border-radius: 0 3px 3px 0;
      padding: 5px 10px;
      font-size: 14px;
      color: red;
      background: #f8f8f9;
      width: 40px;
      float: left;
      text-align: center;
    }

    .inlineBlock {
      display: inline-block;
      width: 50px;
      vertical-align: middle;
    }

    .inlineBlockIcon {
      display: inline-block;
      width: 70px;
      vertical-align: middle;
      margin-right: 5px;
    }

    .noImg {
      width: 80px;
      border: 1px dashed rgb(204, 204, 204);
      margin-left: 10px;
      height: 100px;
      line-height: 93px;
      margin-top: 10px;
      text-align: center;
      color: #ccc;
      user-select: none;
    }

    .floatP {
      float: left;
    }

    .square {
      margin-top: 3px;
      width: 15px;
      height: 15px;
    }

    .img {
      width: 85px;
      margin-top: 10px;
      border: 1px dashed #ccc;
      padding: 2px;
    }

    .ivu-tabs-nav-wrap {
      text-align: center !important;
    }

    .ivu-tabs-nav-scroll {
      display: inline-block !important;
      border-radius: 16px;
      width: 430px;
    }

    .ivu-tabs-nav {
      padding-left: 0;
      margin: 0;
      float: left;
      list-style: none;
      box-sizing: border-box;
      position: relative;
      transition: transform .5s ease-in-out;
      border-radius: 16px;
      /*box-shadow: 8px 4px 8px 0px #f8f8f9;*/
      border: 1px solid #f8f8f9;
      background: #f8f8f9;
      width: calc(100% - 4px);
      height: 32px;
      border-radius: 16px;
      .ivu-tabs-ink-bar{
        display: none;
      }
      /* margin-bottom: 44px; */
    }


    .ivu-tabs-bar {
      border-bottom: 0px solid #dcdee2;
    }

    .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab {
      border: none;
      font-size: 14px;
      font-family: Microsoft YaHei, Microsoft YaHei-Regular;
      font-weight: 400;
      text-align: left;
      color: #676a6c;
      background: #f8f8f900;
    }

    .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab-active {
      background: #3083f2;
      border-radius: 16px;
      /*box-shadow: 0px 4px 8px 0px rgba(48, 131, 242, 0.3);*/

      font-size: 14px;
      font-family: Microsoft YaHei, Microsoft YaHei-Bold;
      font-weight: 700;
      text-align: left;
      color: #ffffff;
    }

    .totolClass {
      font-size: 15px;
      font-weight: bold;
      transform: translateY(-202px) translateX(187px);
      width: 100px;
      height: 46px;
    }

    .totalHouse {
      font-size: 16px;
      font-family: Microsoft YaHei, Microsoft YaHei-Bold;
      font-weight: 700;
      text-align: left;
      color: #1d2b36;
      line-height: 26px;
    }

    .houseTypeLable {
      font-family: Microsoft YaHei, Microsoft YaHei-Regular;
      font-weight: 400;
      text-align: left;
      color: #7e7e7e;
      margin-top: 18px;

      .ivu-slider-button {

        display: none;
      }

      .ivu-input-number:hover .ivu-input-number-handler-wrap {
        display: none;
      }

      .ivu-slider-input .ivu-input-number {
        border: none;
      }

      .ivu-slider-button-wrap {
        width: 28px;
        height: 246px;
        top: -3px;
      }

      .ivu-slider-bar {
        height: 8px;
        background: #13c2ff;
      }

      .ivu-slider-wrap {
        height: 8px;

      }
    }

    .ivu-menu {
      width: 100px !important;
    }

    .ivu-menu-vertical.ivu-menu-light:after {
      background: #dcdee200 !important;

    }

    .ivu-menu-vertical .ivu-menu-item, .ivu-menu-vertical .ivu-menu-submenu-title {
      padding: 4px 0 8px 0px !important;
    }

    .ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active {
      background: #3083f2;
      border-radius: 14px;
      height: 28px;
      font-size: 14px;
      font-family: Microsoft YaHei, Microsoft YaHei-Regular;
      font-weight: 400;
      text-align: center;
      color: #ffffff;
      line-height: 21px;
    }

    .ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu):after {
      background: #3083f200 !important;
      border-radius: 14px;
      height: 28px;
    }

    .unitDiv {
      width: 90px;
      height: 100%;
      float: left;
      text-align: center;
      position: absolute;
      top: 60px;
    }

    .ivu-anchor-ink {
      display: none !important;
    }

    .ivu-anchor-link {
      padding: 4px 0 8px 0px !important;

    }

    .ivu-anchor-link-active {
      background: #3083f2;
      border-radius: 14px;
      height: 28px;
    }

    .ivu-anchor-link-active > .ivu-anchor-link-title {
      font-size: 14px;
      font-family: Microsoft YaHei, Microsoft YaHei-Regular;
      font-weight: 400;
      text-align: center;
      color: #ffffff;
      line-height: 21px;
    }
    .unitLeft{
      width: 100%;
      height: 100%;
      float: right;
    }

    .houseDiv {
      width: calc(100% - 110px);
      height: 100%;
      float: right;
      padding: 20px;
      background: #f0f3f7;
      border-radius: 8px;
      max-height: 320px;
      overflow: auto;
    }

    .tdButton {
      border: 1px solid #cccccc;
      border-radius: 4px;
      font-size: 13px;
      font-family: Microsoft YaHei, Microsoft YaHei-Regular;
      font-weight: 400;
      text-align: center;
      color: #a1a1a1;
    }

    .tdButton-active {
      font-size: 13px;
      font-family: Microsoft YaHei, Microsoft YaHei-Regular;
      font-weight: 400;
      text-align: center;
      color: #3e3e3e;
    }

    .ivu-btn-default {
      height: 45px;
      background: #ffffff;
      border: 1px solid #cccccc;
      border-radius: 4px !important;
      padding-top: 5px;
      width: 90%;
      margin-bottom: 10px;
    }

    .ivu-btn-default-active {
      color: #3083f2;
      height: 45px;
      text-align: center;
      border: 2px solid #3083f2;
      border-radius: 4px;
      background: #ffffff;
      font-size: 13px;
      font-family: Microsoft YaHei, Microsoft YaHei-Bold;
      font-weight: 700;
      text-align: center;
      color: #3083f2;
    }

    .ivu-btn-default, .ivu-btn-default:active, .ivu-btn-default:focus {
      border-radius: 4px !important;
    }

    .ivu-menu-vertical {
      .ivu-menu-item-group-title {
        height: 0px;
      }
    }

    .ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) {
      color: #ffffff;
      background: #3083f2;
      z-index: 2;
    }

    .redPoint {
      width: 8px;
      height: 8px;
      background: #ee5c5c;
      border-radius: 50%;
    }

    .grayPoint {
      width: 8px;
      height: 8px;
      background: #7e7e7e;
      border-radius: 50%;
    }

    .bluePoint {
      width: 8px;
      height: 8px;
      background: #13c2ff;
      border-radius: 50%;
    }

    .greenPoint {
      width: 8px;
      height: 8px;
      background: #3ace83;
      border-radius: 50%;
    }

    .yellowPoint {
      width: 8px;
      height: 8px;
      background: #ffcc00;
      border-radius: 50%;
    }

    .purplePoint {
      width: 8px;
      height: 8px;
      background: #7a7eff;
      border-radius: 50%;
    }
    .point{
      width: calc(100% - 110px);
      float: right;
      display: flex;
      justify-content: flex-start;
      padding-top: 10px;
      height: 30px;
    }
    .divPoint{
      width: 100px;
      float: right;
      display: flex;

      font-size: 12px;
      font-family: Microsoft YaHei, Microsoft YaHei-Regular;
      font-weight: 400;
      text-align: left;
      color: #676a6c;
      line-height: 26px;
      .redPoint {
        margin-top: 8px;
        margin-right: 5px;
      }

      .grayPoint {
        margin-top: 8px;
        margin-right: 5px;
      }

      .bluePoint {
        margin-top: 8px;
        margin-right: 5px;
      }

      .greenPoint {
        margin-top: 8px;
        margin-right: 5px;
      }

      .yellowPoint {
        margin-top: 8px;
        margin-right: 5px;
      }

      .purplePoint {
        margin-top: 8px;
        margin-right: 5px;
      }

    }
    .personTypePoint{
      display: flex;
      justify-content:center;
      margin-top: -5px;
      .personTypePointDiv{
        margin-left: 5px;
      }
    }

    .ivu-input-number-input {
      overflow: hidden;
      height: 32px;
      font-size: 16px;
      font-family: Microsoft YaHei, Microsoft YaHei-Bold;
      font-weight: 700;
      color: #3e3e3e;
    }
  }
</style>

<template>
  <div>
    <Modal id="modal" v-model="show" :draggable="false" :title="editTitle" :mask-closable="false"
           class="looktTSubstances"
           width="950" :z-index="800">
      <div>
        <Tabs type="card" v-if="show">
          <TabPane label="基本信息 ">
            <Divider orientation="left" style="color:blue;">基本信息</Divider>
            <Form ref="lookForm" :model="lookForm" :label-width="110">
              <Row>
                <Col span="8">
                  <Row>
                    <FormItem label="建筑类型">
                      {{ lookForm.buildingType }}
                    </FormItem>
                  </Row>
                  <Row>
                    <FormItem label="所属街道">
                      {{ lookForm.street }}
                    </FormItem>
                  </Row>
                  <Row>
                    <FormItem label="所属网格">
                      {{ lookForm.gridName }}
                    </FormItem>
                  </Row>
                </Col>
                <Col span="8">
                  <Row>
                    <FormItem label="建筑名称">
                      {{ lookForm.buildingName }}
                    </FormItem>
                  </Row>
                  <Row>
                    <FormItem label="所属社区">
                      {{ lookForm.community }}
                    </FormItem>
                  </Row>
                  <Row>
                    <FormItem label="建筑年代">
                      {{ lookForm.buildingYear }}年
                    </FormItem>
                  </Row>
                </Col>
                <Col span="8">
                  <FormItem label="图片">
                    <div v-if="lookForm.imgPath" v-viewer="{movable: true}">
                      <img :src="lookForm.imgPath" class="img">
                    </div>
                    <img v-else src="/img/tx_wzp2.png" class="img">
                  </FormItem>
                </Col>
              </Row>
              <!-- <Row >
                <Col span="8">
                  <FormItem label="单元数">
                    {{lookForm.unit}}单元
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem label="楼层数">
                    {{lookForm.floor}}层
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem label="层户数">
                    {{lookForm.doorNumber}}户
                  </FormItem>
                </Col>
              </Row> -->
              <Row style="margin-top:80px;">
                <Col span="8">
                  <FormItem label="电梯数">
                    {{ lookForm.elevatorNumber }}台
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem label="车位数">
                    {{ lookForm.parkPlaceNumber }}个
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem label="建筑结构">
                    {{ lookForm.buildingStructure }}
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="8" v-if="lookForm.managerName != null && lookForm.managerName.trim().length>0">
                  <FormItem label="楼栋长姓名">
                    {{ lookForm.managerName }}
                  </FormItem>
                </Col>
                <Col span="8" v-if="lookForm.managerPhone != null && lookForm.managerPhone.trim().length>0">
                  <FormItem label="楼栋长电话">
                    {{ lookForm.managerPhone }}
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem label="建筑性质">
                    {{ lookForm.buildingNature }}
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="8">
                  <FormItem label="建筑面积">
                    {{ lookForm.area }}平方米
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="24">
                  <FormItem label="建筑地址">
                    {{ lookForm.buildingAddress }}
                  </FormItem>
                </Col>
              </Row>
            </Form>
          </TabPane>

          <TabPane label="简介 ">
            <Divider orientation="left" style="color:blue;">简介</Divider>
            <Row style="padding: 0 25px;">
              <Col span="24">
                {{ lookForm.profile }}
              </Col>
            </Row>
          </TabPane>
          <TabPane label="物业信息 ">
            <Divider orientation="left" style="color:blue;">物业信息</Divider>
            <Form ref="lookForm" :model="lookForm" :label-width="110">
              <Row>
                <Col span="8">
                  <FormItem label="所属小区">
                    <a style="color:blue;" @click.stop="estateClick">
                      {{ lookForm.housingEstate }}
                    </a>
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem label="物业名称">
                    {{ propertyName }}
                  </FormItem>
                </Col>
              </Row>
            </Form>
          </TabPane>

          <TabPane label="统计信息 ">
            <Divider orientation="left" style="color:blue;">统计信息</Divider>
            <div style="margin-left:20px;">
              <div ref="eChartForm" style="height: 300px; width: 50%;float: left">
              </div>
              <!--              <div class="totolClass">总人数:{{ totalPerson }}</div>-->

              <div style="height: 300px;   width: 50% ;float: right">
                <div class="totalHouse">
                  房屋总数
                  {{ totalHouse }}
                </div>
                <div v-for="(item, i)  in houseType" class="houseTypeLable">
                  {{ item.house_type }}
                  <Slider v-model="item.house_num" :max="totalHouse" show-input></Slider>
                </div>
              </div>

            </div>
          </TabPane>


          <TabPane label="单元信息">
            <Divider orientation="left" style="color:blue;">单元信息</Divider>
            <div class="unitDiv">
              <Menu @on-select="unitClick">
                <MenuGroup>
                  <MenuItem v-for="(unitItem,i) in unitArr" :name="unitItem.unit"
                            :class="{'ivu-menu-item-active':unitItem.unit==selectUnit}">
                    {{unitItem.unit}}单元
                  </MenuItem>

                </MenuGroup>
              </Menu>
            </div>
            <div class="unitLeft">
              <div class="houseDiv">
                  <table border="0" style="width:100%;">
                    <tbody>
                    <tr v-for="(door,i) in floorArr" :key="i" style="margin-bottom: 10px;">
                      <td v-for="(num,j) in door" :key="j" style="text-align:center;min-width:66px;max-width:867px;"
                          :class="num.bgColor">
                        <Button v-if="num.isClick" class="tdButton-active"
                                :class="{'ivu-btn-default-active':num.id==BasicHousingManageId}"
                                @click="showDoor(num.id)">
                          <Icon v-if="num.havePerson" color="#3083f2" type="md-person"/>
                          {{ num.number }}
                          <br/>
                          <div v-if="num.personType" class="personTypePoint">
                            <Tooltip v-if=" num.personType.indexOf('涉疆')>-1" content="涉疆涉藏" placement="bottom">
                              <div class="redPoint personTypePointDiv"></div>
                            </Tooltip>
                            <Tooltip v-if=" num.personType.indexOf('吸毒')>-1" content="吸毒人员" placement="bottom">
                              <div class="greenPoint personTypePointDiv"></div>
                            </Tooltip>
                            <Tooltip v-if="num.personType.indexOf('刑释')>-1" content="刑释人员" placement="bottom">
                              <div  class="grayPoint personTypePointDiv"></div>
                            </Tooltip>
                            <Tooltip v-if=" num.personType.indexOf('精神')>-1" content="精神智障患者" placement="bottom">
                              <div  class="yellowPoint personTypePointDiv"></div>
                            </Tooltip>
                            <Tooltip v-if=" num.personType.indexOf('上访')>-1" content="上访人员" placement="bottom">
                              <div  class="bluePoint personTypePointDiv"></div>
                            </Tooltip>
                            <Tooltip v-if="num.personType.indexOf('涉邪')>-1" content="涉邪人员" placement="bottom">
                              <div  class="purplePoint personTypePointDiv"></div>
                            </Tooltip>
                          </div>

                        </Button>
                        <Button disabled v-else class="tdButton">{{ num.number }}</Button>
                      </td>
                    </tr>
                    </tbody>
                  </table>
              </div>
              <div class="point">
                <div class="divPoint">
                  <div class="redPoint"></div>
                  涉疆涉藏
                </div>
                <div class="divPoint">
                  <div class="greenPoint"></div>
                  吸毒人员
                </div >
                <div class="divPoint">
                  <div class="grayPoint"></div>
                  刑释人员
                </div>
                <div class="divPoint" >
                  <div class="yellowPoint"></div>
                  精神智障患者
                </div>
                <div class="divPoint">
                  <div class="bluePoint"></div>
                  上访人员
                </div>
                <div class="divPoint">
                  <div class="purplePoint"></div>
                  涉邪人员
                </div>
              </div>
            </div>

          </TabPane>
        </Tabs>
      </div>
      <div slot="footer">
        <Button type="text" @click="show=false">取消</Button>
      </div>
    </Modal>
    <lookHousing v-model="deleteShow" :BasicHousingManageId="BasicHousingManageId"
                 :modalTitle="title"></lookHousing>
    <lookBasicHousingEstate v-model="lookShow" :BasicHousingEstateId="housingEstateId" :gridName="lookForm.gridName"
                            :modalTitle="housingEstateTitle"></lookBasicHousingEstate>
  </div>
</template>
<script>
  import {getTBuildingArchives, statistics} from '@/api/zhsq/tBuildingArchives/tBuildingArchives'
  import {
    queryBasicHousingManageList,
    getUnitByBuildArchiveId,
    getRealOfHouseAndDoor
  } from '@/api/zhsq/basicHouse/basicHouse'
  import {getBasicHousingEstate} from '@/api/zhsq/basicHousingEstate/basicHousingEstate'
  import {getMaxUnit, getFloorAndDoor} from '@/api/zhsq/tBuildingArchives/tBuildingArchives'
  import {getHouseTree,getRealHouseAndDoor,getRealDoorAndPerson} from '@/api/zhsq/baseHouseManage/basicHousingManage'
  import lookHousing from '../basicHouseManage/lookHousing'
  // import {personTypeData, houseType as houseTypeData} from '@/api/tools/zhsqSelectData'
  import {formartDate, nginxUrl} from '@/api/tools/tool';
  import lookBasicHousingEstate from '../basicHousingEstate/lookBasicHousingEstate'

  import {getDictionary, getStreet, getCommunity} from '@/api/index';
  import echarts from "echarts";

  export default {
    name: "lookTSubstances",
    components: {
      lookHousing,
      lookBasicHousingEstate
    },
    props: {
      value: {
        type: Boolean,
        default: false
      },
      TBuildingArchivesId: {
        type: String
      },
      modalTitle: {
        type: String
      },
      gridName: {
        type: String
      },
      housingEstateName: {
        type: String
      },
    },
    data() {
      return {
        show: this.value,//是否显示
        editTitle: this.modalTitle,//标题
        loading: true,
        lookForm: {
          buildingType: '',
          buildingName: '',
          buildingAddress: '',
          community: '',
          grid: '',
          location: '',
          housingEstate: '',
          street: '',
          streetNumber: '',
          imgPath: '',
          buildingYear: '',
          area: '',
          buildingStructure: '',
          buildingNature: '',
          elevatorNumber: '',
          parkPlaceNumber: '',
          unit: '',
          floor: '',
          doorNumber: '',
          managerName: '',
          managerPhone: '',
          profile: ''
        },
        unitArr: [],
        floorArr: [],//获取最大楼层数和所有楼层中最多门牌数、房屋的人数
        floorData: [],//获取真实存在的门牌号
        title: '',
        BasicHousingManageId: '',
        deleteShow: false,
        personType: [],
        houseType: [],
        totalPerson: 0,
        totalHouse: 0,
        imageUrlList: [],
        lookShow: false,
        housingEstateTitle: '小区管理查看',
        housingEstateId: '',
        unitMax: '',
        floorMax: '',
        doorMax: '',
        propertyName: '',
        personType: [],//人口类型
        populationType: [],//人口类型（特殊）
        houseTypeData: [],//住房类型
        eChartForm: null,
        eChartFormValue: [{value: 0, name: '户籍人口'},
          {value: 0, name: '常住人口'},
          {value: 0, name: '流动人口'},
          {value: 0, name: '外出人口'},
          {value: 0, name: '境外人口'},
        ],
        selectUnit: "1",
      }
    },
    methods: {
      getHouseType() {//获取住房类型
        getDictionary({"fieldName": "houseType"}).then(res => {
          this.houseTypeData = res.data;
        })
      },
      getPersonType() {//获取人口类型
        let _this = this;
        getDictionary({"fieldName": "personTypeData"}).then(res => {
          _this.personType = res.data;
          _this.statistics();
        });
      },
      getPopulationType() {//获取人口类型(特殊人群)
        getDictionary({"fieldName": "specialPersonData"}).then(res => {
          this.populationType = res.data;
        });
      },
      estateClick() {//查看小区
        this.lookShow = true;
      },
      statistics() {//统计人口类型
        this.eChartFormValue = [{value: 0, name: '户籍人口'},
          {value: 0, name: '常住人口'},
          {value: 0, name: '流动人口'},
          {value: 0, name: '外出人口'},
          {value: 0, name: '境外人口'},
        ];
        this.houseType = [{house_num: 0, house_type: '自助'},
          {house_num: 0, house_type: '租赁'},
          {house_num: 0, house_type: '空置'},
          {house_num: 0, house_type: '其他'},
        ];
        let _this = this;
        statistics({buildingArchiveId: this.TBuildingArchivesId}).then(res => {
          if (res && res.success) {
            let personArr = [];
            let houseArr = [];
            if (res.data.length > 0) {
              // this.eChartFormValue = [];
              _this.houseType = [];
            }
            for (let i = 0; i < res.data.length; i++) {
              if (res.data[i] && res.data[i].person_type) {
                let type = _this.personType.filter(item => item.number.toString() == res.data[i].person_type);
                if (type.length != 0) {
                  personArr.push({"value": res.data[i].person_num, "name": type[0].name});
                  // let nameItem = this.eChartFormValue.filter(s=>s.name ===  type[0].name)[0];
                  // nameItem.value=res.data[i].person_num;
                } else {
                  // personArr.push({"value": 0, "name": type[0].name});
                  // personArr.push(res.data[i]);

                }
                _this.totalPerson += res.data[i].person_num;
              } else if (res.data[i].house_type) {
                let sort = _this.houseTypeData.filter(item => item.number.toString() == res.data[i].house_type);
                if (sort.length != 0) {
                  houseArr.push({"house_num": res.data[i].house_num, "house_type": sort[0].name});
                } else {
                  houseArr.push(res.data[i]);
                }
                _this.totalHouse += res.data[i].house_num;
              }
            }
            _this.personType = personArr;
            _this.houseType = houseArr;
            if (this.personType && this.personType.length > 0) {
              _this.eChartFormValue = this.personType;
            }
            // for (let j = 0; j < this.populationType.length; j++) {
            //   let ruslt = this.personType.find(v => {
            //     return v.person_type == this.populationType[j].name
            //   })
            //   if (ruslt == undefined) {
            //     this.personType.push({"person_type": this.populationType[j].name, "person_num": 0})
            //   }
            // }
            for (let j = 0; j < _this.houseTypeData.length; j++) {
              let ruslt = _this.houseType.find(v => {
                return v.house_type == this.houseTypeData[j].name
              })
              if (ruslt == undefined) {
                _this.houseType.push({"house_type": this.houseTypeData[j].name, "house_num": 0})
              }
            }

            _this.initEchart();
          }
        })
      },
      //初始化统计图
      initEchart() {
        let option = {
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          title: {
            left: 'center',
            top: '125',
            subtext: '总人数',
            text: `  ${this.totalPerson} `,
            textStyle: {
              color: '#3e3e3e',
              fontSize: 20,
              lineHeight: 21,
              fontWeight: 700,
              align: 'center',
              height: 26
            },
            subtextStyle: {
              color: '#7e7e7e',
              fontSize: 14,
              lineHeight: 14,
              fontWeight: 400,
              align: 'center'
            },
          },
          series: [{
            name: '人数',
            type: 'pie',
            minAngle: 15,           　　 //最小的扇区角度（0 ~ 360），用于防止某个值过小导致扇区太小影响交互
            avoidLabelOverlap: true,   //是否启用防止标签重叠策略
            center: ['50%', '50%'],
            radius: ['40%', '65%'],
            // minAngle:45,
            // roseType: 'area',
            data: this.eChartFormValue,
            label: {
              normal: {
                formatter: '{b|{b}} \n{d|{d}%}',       //图形外文字上下显示
                // borderWidth: 20,
                // borderRadius: 4,
                position: 'outter',
                padding: [25, -10,10, -10],
                rich: {
                  a: {
                    color: '#333',
                    fontSize: 16,
                    lineHeight: 30
                  },
                  b: {                        //name 文字样式
                    fontSize: 16,
                    lineHeight: 21,
                    color: '#7e7e7e',
                    fontWeight: 400
                  },
                  c: {                   //value 文字样式
                    fontSize: 16,
                    lineHeight: 24,
                    align: "center",
                    color: '#3e3e3e',
                    fontWeight: 700
                  },
                  d: {                   //百分比 文字样式
                    fontSize: 16,
                    lineHeight: 24,
                    align: "center",
                    color: '#3e3e3e',
                    fontWeight: 700
                  }
                }
              }
            },
            labelLine: {    //图形外文字线
              // normal: {
              //   length: 10,
              //   length2:10
              // },
              show: false
            },
            color: [
              '#088ff8',
              '#ffcc00',
              '#7a7eff',
              '#3ace83',
              '#ee5c5c'
            ],
          }]
        };
        this.eChartForm = echarts.init(this.$refs.eChartForm);

        this.eChartForm.setOption(option);
      },
      showDoor(id) {//查看实有房屋弹窗
        this.title = '查看实有房屋';
        this.BasicHousingManageId = id;
        this.deleteShow = true;
      },
      getMaxNum() {//获取单元数
        // this.$refs.tabs.activeKey = '1';
        getMaxUnit({id: this.TBuildingArchivesId}).then(res => {

          if (res && res.success) {
            if (res.data[0]) {
              this.unitMax = res.data[0].unitMax;
              // this.floorMax = res.data[0].floorMax;
              // this.doorMax = res.data[0].doorMax;
              for (let i = 0; i < res.data[0].unitMax; i++) {
                this.unitArr.push({'unit': (i + 1).toString()});
              }
              this.rendering('1');
            }
          }
        });
      },
      rendering(name) {
        this.floorMax = []
        this.doorMax = []
        let unitName = arguments[0] ? arguments[0] : 1;
        getFloorAndDoor({id: this.TBuildingArchivesId, name: unitName}).then(res => {
          if (res && res.success && res.data && res.data.length > 0) {//查询楼层数和层户数
            this.floorMax = res.data[0].floorMax;
            this.doorMax = res.data[0].doorMax;
          } else {
            this.floorMax = 0;
            this.doorMax = 0;
          }
          getRealDoorAndPerson({buildArchiveId: this.TBuildingArchivesId, unit: unitName}).then(res => {
            if (res && res.success && res.data && res.data.realDoor&& res.data.realHouseInfo) {//获取最大楼层数和所有楼层中最多门牌数
              let door =res.data.realDoor;//真实存在的房屋
              let existent =res.data.realHouseInfo;//房屋存在人
              for(let i=0;i<door.length;i++){
                if(door[i]&&door[i].door){
                  door[i].door = door[i].door.replace("楼","").replace("号","")
                }
              }
              for(let i=0;i<existent.length;i++){
                if(existent[i]&&existent[i].doorNum){
                  existent[i].doorNum = existent[i].doorNum.replace("楼","").replace("号","")
                }
              }

              let arr = [];
              for (let i = 0; i < this.floorMax; i++) {
                arr[i] = [];
                for (let j = 0; j < this.doorMax; j++) {
                  let floorArrnumber = 0;
                  if ((j + 1) > 9) {
                    floorArrnumber = (i + 1) + '' + (j + 1);
                  } else {
                    floorArrnumber = (i + 1) + '0' + (j + 1);
                  }

                  let columns = door.filter(function (v) {
                    return v.door == floorArrnumber;
                  })
                  if (columns.length > 0) {
                    arr[i][j] = {
                      "id": columns[0].id,
                      "number": floorArrnumber,
                      "isClick": true,
                      "bgColor": 'bgColorAutonomous',
                      "personType": ''
                    }
                    if (columns[0].houseType == "自住") {
                      arr[i][j].bgColor = "bgColorAutonomous"
                    } else if (columns[0].houseType == "租赁") {
                      arr[i][j].bgColor = "bgColorLease"
                    } else if (columns[0].houseType == "空置") {
                      arr[i][j].bgColor = "bgColorVacant"
                    } else if (columns[0].houseType == "其他") {
                      arr[i][j].bgColor = "bgColorOther"
                    }
                  } else {
                    arr[i][j] = {
                      "id": '',
                      "number": floorArrnumber,
                      "isClick": false,
                      "bgColor": 'bgColorAutonomous',
                      "personType": ''
                    }
                  }

                  let existents = existent.filter(function (e) {
                    return e.doorNum == floorArrnumber;
                  })

                  if (existents.length > 0) {
                    arr[i][j].havePerson = true;
                    for (let ei in existents) {
                      if (ei == 0) {
                        arr[i][j].personType = existents[ei].personType;
                      } else {
                        arr[i][j].personType += "," + existents[ei].personType;
                      }
                    }
                  }
                }
              }
              this.floorArr = arr;//所有的门牌号
            }
          })
        })
      },
      init() {
        this.getMaxNum();

      },
      unitClick(name) {//点击标签页
        if (name) {
          this.selectUnit = name;
          this.rendering(name);
        }
        return false;
      },
      //提交数据
      closeModal(val) {
        this.$emit('input', val);
      },
      //初始化表单
      initForm() {
        this.selectUnit = "1";
        this.imageUrlList = [];
        this.unitArr = [];
        this.lookForm = {
          buildingType: '',
          buildingName: '',
          buildingAddress: '',
          community: '',
          grid: '',
          location: '',
          housingEstate: '',
          street: '',
          gridName: '',
          housingEstateName: '',
          imgPath: '',
          buildingYear: '',
          area: '',
          buildingStructure: '',
          buildingNature: '',
          elevatorNumber: '',
          parkPlaceNumber: '',
          unit: '',
          floor: '',
          doorNumber: '',
          managerName: '',
          managerPhone: '',
          profile: '',
        };
        this.housingEstateId = '';
        this.propertyName = '';
        this.getPopulationType();
        this.getHouseType();
        this.getPersonType();
      }


    },
    watch: {
      value(val) {
        this.show = val;
      },
      show(val) {
        this.initForm();
        this.loading = false;
        this.editTitle = this.modalTitle;
        if (val) {
          if (this.TBuildingArchivesId != null && this.TBuildingArchivesId.trim().length > 0) {
            this.init();
            getTBuildingArchives({id: this.TBuildingArchivesId}).then(res => {

              if (res && res.success) {
                //建筑类型
                getDictionary({fieldName: 'building_type'}).then(resp => {
                  if (resp && resp.success) {
                    let temp = resp.data.filter(item => item.number == res.data.buildingType);
                    this.lookForm.buildingType = temp[0].name;
                  }
                });
                //建筑结构
                getDictionary({fieldName: 'buildingStructureData'}).then(resp => {
                  if (resp && resp.success) {
                    let temp = resp.data.filter(item => item.number == res.data.buildingStructure);
                    this.lookForm.buildingStructure = temp[0].name;
                  }
                });
                //建筑性质
                getDictionary({fieldName: 'buildingNatureData'}).then(resp => {
                  if (resp && resp.success) {
                    let temp = resp.data.filter(item => item.number == res.data.buildingNature);
                    this.lookForm.buildingNature = temp[0].name;
                  }
                });


                this.lookForm.buildingAddress = res.data.buildingAddress;
                this.lookForm.community = res.data.community;
                this.lookForm.grid = res.data.grid;
                this.lookForm.gridName = res.data.gridName;
                this.lookForm.location = res.data.location;
                this.housingEstateId = res.data.housingEstate;
                this.lookForm.housingEstateName = res.data.housingEstateName;
                getBasicHousingEstate({"id": res.data.housingEstate}).then(re => {
                  if (re.success) {
                    this.lookForm.housingEstate = re.data.name;
                    this.lookForm.buildingName = this.lookForm.housingEstate + res.data.buildingName + "号楼";
                    this.propertyName = re.data.propertyName;
                  }
                })
                this.lookForm.street = res.data.street;
                this.lookForm.streetNumber = res.data.streetNumber;
                this.lookForm.imgPath = res.data.imgPath;
                if (res.data.buildingYear) {
                  this.lookForm.buildingYear = formartDate(new Date(res.data.buildingYear).getTime(), 'yyyy');
                }
                this.lookForm.area = res.data.area;

                this.lookForm.elevatorNumber = res.data.elevatorNumber?res.data.elevatorNumber:"0";
                this.lookForm.parkPlaceNumber = res.data.parkPlaceNumber?res.data.parkPlaceNumber:"0";
                this.lookForm.unit = res.data.unit;
                this.lookForm.floor = res.data.floor;
                this.lookForm.doorNumber = res.data.doorNumber;
                this.lookForm.managerName = res.data.managerName;
                this.lookForm.managerPhone = res.data.managerPhone;
                this.lookForm.profile = res.data.profile;
              } else {
                this.$Message.error(res.msg);
              }
            });

          }
        } else {
          this.floorArr = [];
          this.personType = [];
          this.houseType = [];
          this.totalPerson = 0;
          this.totalHouse = 0;
          this.unitArr = [];
          this.doorNumber = [];
          this.closeModal(val);
        }
      }
    },
    created() {
      this.height = Math.floor(document.body.scrollHeight * 0.95) + "px";
      this.width = Math.floor(document.body.scrollWidth * 0.95) + "px";
    },
  }
</script>
