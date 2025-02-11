<style lang="less" scoped>
  .lookTZhsqMerchantProfile{
    .noImg{
      width: 80px;
      border: 1px dashed rgb(204, 204, 204);
      margin-left: 20px;
      height: 100px;
      line-height: 93px;
      margin-top: 10px;
      text-align: center;
      color: #ccc;
      user-select: none;
    }

    .img {
      width: 85px;
      margin-top: 10px;
      border: 1px dashed #ccc;
      padding: 2px;
    }

    .ivu-form-item {
      margin-bottom: 0px !important;
    }
  }
</style>
<template>
  <Modal v-model="show" :title="editTitle" :draggable="false" :mask-closable="false" class="lookTZhsqMerchantProfile" :width="900">
    <Form ref="lookForm" :model="lookForm" :label-width="125">
      <Row>
        <Col span="8">
          <Row>
            <FormItem label="建筑类型">
              {{lookForm.buildingType}}
            </FormItem>
          </Row>
          <Row>
            <FormItem label="所属街道">
              {{lookForm.street}}
            </FormItem>
          </Row>
          <Row>
            <FormItem label="所属网格">
              {{lookForm.gridName}}
            </FormItem>
          </Row>
        </Col>
        <Col span="8">
          <Row>
            <FormItem label="建筑名称">
              {{lookForm.buildingName}}
            </FormItem>
          </Row>
          <Row>
            <FormItem label="所属社区">
              {{lookForm.community}}
            </FormItem>
          </Row>
          <Row>
            <FormItem label="建筑年代">
              {{lookForm.buildingYear}}年
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

      <Row>
        <Col span="24">
          <FormItem label="建筑地址" prop="merchantAddress">
            {{lookForm.buildingAddress}}
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col  span="24">
          <FormItem label="简介" prop="personalProfile">
            <p class="item_span">
              {{ lookForm.profile }}
            </p>
          </FormItem>
        </Col>
      </Row>
    </Form>
    <div slot="footer">
      <Button type="text" @click="show=false">取消</Button>
      <Button type="primary" v-if="updateModelShow" :loading="loading" @click="handelSubmit">编辑</Button>
    </div>
    <updateTBuildingArchives v-model="updateShow" :TBuildingArchivesId="TBuildingArchivesId" modalTitle="设施编辑"  v-on:handleSearch="handleSearch"></updateTBuildingArchives>

  </Modal>
</template>
<script>
  import {getTBuildingArchives, statistics} from '@/api/zhsq/tBuildingArchives/tBuildingArchives'
  import {
    queryBasicHousingManageList,
    getUnitByBuildArchiveId,
    getRealOfHouseAndDoor
  } from '@/api/zhsq/basicHouse/basicHouse'
  import {getBasicHousingEstate} from '@/api/zhsq/basicHousingEstate/basicHousingEstate'
  import {getMaxUnit,getFloorAndDoor} from '@/api/zhsq/tBuildingArchives/tBuildingArchives'
  import lookHousingManage from '../basicHouseManage/lookHousingManage'
  import updateTBuildingArchives from './updateTBuildingArchives'
  // import {personTypeData, houseType as houseTypeData} from '@/api/tools/zhsqSelectData'
  import {formartDate, nginxUrl} from '@/api/tools/tool';
  import lookBasicHousingEstate from '../basicHousingEstate/lookBasicHousingEstate'

  import {getDictionary, getStreet, getCommunity} from '@/api/index';

  export default {
    name: "lookConstruct",
    components: {
      lookHousingManage,
      lookBasicHousingEstate,
      updateTBuildingArchives
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
      updateModelShow: {
        type: Boolean,
        default: false
      },
    },
    data() {
      return {
        show: this.value,//是否显示
        editTitle: this.modalTitle,//标题
        loading: false,
        updateShow:false,
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
        populationType:[],//人口类型
        houseTypeData:[],//住房类型
      }
    },
    methods: {
      handelSubmit(){//点击编辑
        this.updateShow = true;
      },
      getHouseType(){//获取住房类型
        getDictionary({"fieldName": "houseType"}).then(res => {
          this.houseTypeData = res.data;
        })
      },
      getPopulationType(){//获取人口类型
        getDictionary({"fieldName": "personTypeData"}).then(res => {
          this.populationType = res.data;
        })
      },
      estateClick() {//查看小区
        this.lookShow = true;
      },
      statistics() {//统计人口类型
        statistics({buildingArchiveId: this.TBuildingArchivesId}).then(res => {
          if (res && res.success) {
            let personArr = [];
            let houseArr = [];
            for (let i = 0; i < res.data.length; i++) {
              if (res.data[i].person_type) {
                let type = this.populationType.filter(item => item.number.toString() == res.data[i].person_type);
                if(type.length != 0){
                  personArr.push({"person_num":res.data[i].person_num,"person_type":type[0].name});
                }else{
                  personArr.push(res.data[i]);
                }
                this.totalPerson += res.data[i].person_num;
              } else if (res.data[i].house_type) {
                let sort = this.houseTypeData.filter(item => item.number.toString() == res.data[i].house_type);
                if(sort.length != 0){
                  houseArr.push({"house_num":res.data[i].house_num,"house_type":sort[0].name});
                }else{
                  houseArr.push(res.data[i]);
                }
                this.totalHouse += res.data[i].house_num;
              }
            }
            this.personType = personArr;
            this.houseType = houseArr;

            for (let j = 0; j < this.populationType.length; j++) {
              let ruslt = this.personType.find(v => {
                return v.person_type == this.populationType[j].name
              })
              if (ruslt == undefined) {
                this.personType.push({"person_type": this.populationType[j].name, "person_num": 0})
              }
            }
            for (let j = 0; j < this.houseTypeData.length; j++) {
              let ruslt = this.houseType.find(v => {
                return v.house_type == this.houseTypeData[j].name
              })
              if (ruslt == undefined) {
                this.houseType.push({"house_type": this.houseTypeData[j].name, "house_num": 0})
              }
            }
          }
        })
      },
      showDoor(id) {//查看实有房屋弹窗
        this.title = '查看实有房屋';
        this.BasicHousingManageId = id;
        this.deleteShow = true;
      },
      getMaxNum() {//获取单元数
        this.$refs.tabs.activeKey = '1';
        getMaxUnit({id: this.TBuildingArchivesId}).then(res => {
          if(res && res.success){
            if(res.data[0]){
              this.unitMax = res.data[0].unitMax;
              // this.floorMax = res.data[0].floorMax;
              // this.doorMax = res.data[0].doorMax;
              for (let i = 0; i < res.data[0].unitMax; i++) {
                this.unitArr.push({'unit': (i + 1).toString()});
              }
              this.rendering('');
            }
          }
        });
      },
      rendering(name) {
        this.floorMax = []
        this.doorMax = []
        let unitName = arguments[0] ? arguments[0] : 1;

        getFloorAndDoor({id: this.TBuildingArchivesId, name: unitName}).then(res => {
          if (res && res.success){//查询楼层数和层户数
            if(res.data.length>0){
              this.floorMax = res.data[0].floorMax;
              this.doorMax = res.data[0].doorMax;
            }

          }
        })

        getRealOfHouseAndDoor({buildArchiveId: this.TBuildingArchivesId, unit: unitName}).then(res => {
          if (res && res.success) {//获取最大楼层数和所有楼层中最多门牌数
            let door = [];//真实存在的房屋
            let existent = [];//房屋存在人
            for (let i = 0; i < res.data.length; i++) {
              if (res.data[i].door) {
                let sort = this.houseTypeData.filter(item => item.number.toString() == res.data[i].houseType);
                if(sort.length != 0){
                  door.push({
                    "door": parseInt(res.data[i].door),
                    "id": res.data[i].id,
                    "houseType": sort[0].name
                  });
                }
              }
              if (res.data[i].doorNum) {
                let type = this.populationType.filter(item => item.number.toString() == res.data[i].personType);
                if(type.length != 0){
                  existent.push({
                    "doorNum": parseInt(res.data[i].doorNum),
                    "personType": type[0].name
                  });
                }
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
                  if (existents[0].personType == "外出人口") {
                    arr[i][j].personType = "goOutType";
                  } else if (existents[0].personType == "流动人口") {
                    arr[i][j].personType = "flowType";
                  } else if (existents[0].personType == "户籍人口") {
                    arr[i][j].personType = "domicileType";
                  } else if (existents[0].personType == "常住人口") {
                    arr[i][j].personType = "residentType";
                  } else if (existents[0].personType == "境外人口") {
                    arr[i][j].personType = "abroadType";
                  }
                }
              }
            }
            this.floorArr = arr;//所有的门牌号
          }
        })
      },
      init() {
        this.getMaxNum();
        this.statistics();
      },
      unitClick(name) {//点击标签页
        this.rendering(name);
      },
      //提交数据
      closeModal(val) {
        this.$emit('input', val);
      },
      //初始化表单
      initForm() {
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
      },
//编辑完成
      handleSearch(){
        this.getInfo();
        this.$emit('handleSearch')
      },
      //查询设施信息
      getInfo(){
        let _this = this;
        if (_this.TBuildingArchivesId != null && _this.TBuildingArchivesId.trim().length > 0) {
          getTBuildingArchives({id: _this.TBuildingArchivesId}).then(res => {
            if (res && res.success) {
              //建筑类型
              getDictionary({fieldName: 'building_type'}).then(resp => {
                if (resp && resp.success) {
                  if(resp.data && resp.data.length>0){
                    let temp = resp.data.filter(item => item.number == res.data.buildingType);
                    _this.lookForm.buildingType = temp[0].name;
                    _this.$forceUpdate();//重新渲染数据
                  }

                }
              });

              _this.lookForm.buildingAddress = res.data.buildingAddress;
              _this.lookForm.community = res.data.community;
              _this.lookForm.grid = res.data.grid;
              _this.lookForm.gridName = res.data.gridName;
              _this.lookForm.location = res.data.location;
              _this.housingEstateId = res.data.housingEstate;
              _this.lookForm.housingEstateName = res.data.housingEstateName;
              _this.lookForm.buildingName =  res.data.buildingName;
              if(res.data.housingEstate && res.data.housingEstate.trim().length>0){
                getBasicHousingEstate({"id": res.data.housingEstate}).then(re => {
                  if (re.success) {
                    _this.lookForm.housingEstate = re.data.name;

                    _this.propertyName = re.data.propertyName;
                  }
                })
              }
              _this.lookForm.street = res.data.street;
              _this.lookForm.streetNumber = res.data.streetNumber;
              _this.lookForm.imgPath = res.data.imgPath;
              if (res.data.buildingYear) {
                _this.lookForm.buildingYear = formartDate(new Date(res.data.buildingYear).getTime(), 'yyyy');
              }
              _this.lookForm.area = res.data.area;

              _this.lookForm.elevatorNumber = res.data.elevatorNumber;
              _this.lookForm.parkPlaceNumber = res.data.parkPlaceNumber;
              _this.lookForm.unit = res.data.unit;
              _this.lookForm.floor = res.data.floor;
              _this.lookForm.doorNumber = res.data.doorNumber;
              _this.lookForm.managerName = res.data.managerName;
              _this.lookForm.managerPhone = res.data.managerPhone;
              _this.lookForm.profile = res.data.profile;
            } else {
              _this.$Message.error(res.msg);
            }
          });

        }
      }
    },
    watch: {
      value(val) {
        this.show = val;
      },
      show(val) {
        this.initForm();
        this.loading = false;
        this.updateShow = false;
        this.editTitle = this.modalTitle;
        if (val) {
          this.getInfo();
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
