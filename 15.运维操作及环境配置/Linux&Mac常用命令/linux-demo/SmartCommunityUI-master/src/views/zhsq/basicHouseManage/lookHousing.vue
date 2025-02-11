<style lang="less">
.basicHousing {
  .ivu-col {
    height: 40px;
  }

  .ivu-form .ivu-row .ivu-form-item-label {
    width: 120px !important;
  }

  .ivu-table-tip {
    overflow-x: hidden !important;
  }
  .personType{
    .ivu-col {
      height: 100%;
      justify-content: center;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
    }
    .ivu-avatar {

      width: 60px;
      height: 60px;
    }
    .ivu-row {
      width: 100%;
      padding-left: 10px;
    }
    .RowFirst{
      font-size: 14px;
      font-family: Microsoft YaHei, Microsoft YaHei-Bold;
      font-weight: 700;
      text-align: left;
      color: #1d2b36;
    }
    .RowSecond{
      font-size: 13px;
      font-family: Microsoft YaHei, Microsoft YaHei-Regular;
      font-weight: 400;
      text-align: left;
      color: #1d2b36;
      line-height: 20px;
    }
    .RowTree{
      font-size: 13px;
      font-family: Microsoft YaHei, Microsoft YaHei-Regular;
      font-weight: 400;
      text-align: left;
      color: #1d2b36;
      line-height: 20px;
    }
    .RowFour{
      font-size: 13px;
      font-family: Microsoft YaHei, Microsoft YaHei-Regular;
      font-weight: 400;
      text-align: left;
      color: #a8a9ad;
      line-height: 20px;
    }
    .man{
      width: 16px;
      //background: black;
      float: left;
      height: 16px;
      margin-top: 3px;
      margin-right: 5px;
    }
    .woman{
      width: 16px;
      //background: #bfbfbf;
      float: left;
      height: 16px;
      margin-top: 3px;
      margin-right: 5px;
    }

  }


}
</style>
<template>
  <Modal v-model="show" :title="editTitle" :mask-closable="false" class="basicHousing" :draggable="false"
         width="970">
    <div style="max-height:800px;overflow-y:auto;overflow-x:hidden;">
      <Form ref="basicHousingManageForm" :model="basicHousingManageForm">
        <Divider style="margin:0 auto;color:#2d8cf0;" orientation="left">房屋信息</Divider>
        <Row>
          <Col span="8">
            <FormItem label="所属街道">
              {{ basicHousingManageForm.houseStreet }}
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="所属社区">
              {{ basicHousingManageForm.houseCommunity }}
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="所属网格">
              {{ basicHousingManageForm.houseGrid }}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="8">
            <FormItem label="小区名称">
              {{ basicHousingManageForm.houseName }}
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="楼栋">
              {{ basicHousingManageForm.buildArchiveName }}
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="单元">
              {{ basicHousingManageForm.unit + "单元" }}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="8">
            <FormItem label="楼层数">
              {{ basicHousingManageForm.floor + "层" }}
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="门牌号">
              {{ basicHousingManageForm.doorNumber + "号" }}
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="房屋类型">
              {{ basicHousingManageForm.houseType }}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="8">
            <FormItem label="面积">
              {{ basicHousingManageForm.area + "平米" }}
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="房型">
              {{ basicHousingManageForm.houseForm }}
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="房屋产权">
              {{ basicHousingManageForm.houseProperty }}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="8">
            <FormItem label="房主姓名">
              {{ basicHousingManageForm.hostName }}
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="房主身份证号">
              {{ basicHousingManageForm.hostCard }}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="24">
            <FormItem label="房屋详址" style="width: 812px !important;">
              {{ basicHousingManageForm.houseAddress }}
            </FormItem>
          </Col>
        </Row>
        <Divider style="margin:0 auto;color:#2d8cf0;" orientation="left">户籍信息</Divider>
        <Row>
          <Col span="8">
            <FormItem label="本房屋是否落户">
              {{ basicHousingManageForm.isSettle }}
            </FormItem>
          </Col>
          <Col span="8" v-if="isSettleShow">
            <FormItem label="户号">
              {{ basicHousingManageForm.accNumber }}
            </FormItem>
          </Col>
          <Col span="8" v-if="isSettleShow">
            <FormItem label="户别">
              {{ basicHousingManageForm.accType }}
            </FormItem>
          </Col>
        </Row>
        <Row v-if="isSettleShow">
          <Col span="8">
            <FormItem label="户主姓名">
              {{ basicHousingManageForm.accName }}
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="户主身份证号">
              {{ basicHousingManageForm.accCard }}
            </FormItem>
          </Col>

          <!--<Col span="8">-->
          <!--<FormItem label="与户主关系">-->
          <!--{{basicHousingManageForm.accRelation}}-->
          <!--</FormItem>-->
          <!--</Col>-->
        </Row>
        <Divider style="margin-top: 0;color:#2d8cf0;" orientation="left">人口信息</Divider>
        <!--        <Table v-show="true" :loading="loading" stripe :columns="columns" :data="data" ref="table" height="200"-->
        <!--               @on-row-dblclick="dblClick">-->
        <!--        </Table>-->
        <div style="display: flex;flex-wrap: wrap;" class="personType">
          <div v-for="(item,i) in personData"  style="margin-left: 5px;height: 110px ;width: 33.33%;background: #f0f3f7;padding-top: 16px;padding-left: 20px;">
            <Row type="flex" justify="center">
              <Col span="5">
                <Avatar :src="item.imgPath==''?'https://i.loli.net/2017/08/21/599a521472424.jpg':item.imgPath" />
              </Col>
              <Col span="19">
                <Row class="RowFirst">
                  <div class="man" v-if="item.sex=='男'">
                    <img src="/img/xb_boy.png">
                  </div>
                  <div class="woman"  v-else>
                    <img src="/img/xb_girl.png">
                  </div>
                  <!--                  {{ item.sex }}-->
                  {{ item.name }}
                  ({{ item.relationShip }})
                </Row>
                <Row class="RowSecond">
                  {{ item.cardId }}
                </Row>
                <Row class="RowTree">
                  {{ item.personType }}
                </Row>
                <Row class="RowFour">
                  {{ item.communityName }}
                  {{ item.ownedGrid }}
                </Row>
              </Col>
            </Row>


          </div>
        </div>

        <lookBasicPerson v-model="personShow" :BasicPersonId="BasicPersonId" :modalTitle="title"></lookBasicPerson>
        <updateBasicHousingManage v-model="updateShow" :BasicHousingManageId="BasicHousingManageId" :modalTitle="title"></updateBasicHousingManage>
      </Form>
    </div>
    <div slot="footer">
      <Button type="text" @click="show=false">取消</Button>
      <Button type="primary" v-if="updateModelShow" :loading="loading" @click="handelSubmit">编辑</Button>
    </div>
  </Modal>
</template>
<script>
import {getBasicHousingManage} from '@/api/zhsq/baseHouseManage/basicHousingManage'
import {getPersonByHouseId} from '@/api/zhsq/basicPerson/basicPerson'
import lookBasicPerson from "../basicPerson/lookBasicPerson";
import {getDictionary} from '@/api/index';
import updateBasicHousingManage from './updateBasicHousingManage'

export default {
  name: 'lookHousing',
  components: {
    lookBasicPerson,
    updateBasicHousingManage
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    BasicHousingManageId: {
      type: String
    },
    modalTitle: {
      type: String
    },
    updateModelShow: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      updateShow:false,
      isSettleShow: false,
      title: "",
      BasicPersonId: '',
      personShow: false,
      data: [],
      personData: [],
      columns: this.getBasicPersonColumns(),
      isRenter: false,
      show: this.value,
      editTitle: this.modalTitle,
      loading: true,
      disabled: false,
      houseStreetPriority: [],
      houseCommunityPriority: [],
      houseGridPriority: [],
      houseTypePriority: [],
      rentStatusPriority: [],
      personTypeData: [],
      relationShipData: [],
      basicHousingManageForm: {
        houseStreet: '',
        houseCommunity: '',
        houseGridId: '',
        houseGrid: '',
        streetNumber: 0,
        houseId: '',
        houseName: '',
        houseAddress: '',
        hostName: '',
        hostCard: '',
        houseType: '',
        buildArchiveId: '',
        buildArchiveName: '',
        doorNumber: '',
        unit: '',
        floor: 0,
        accName: '',
        accType: '',
        accNumber: '',
        accRelation: '',
        accCard: '',
        isSettle: ''
      },
    }
  },
  methods: {
    //点击编辑
    handelSubmit() {
      this.updateShow = true;
    },
    dblClick(row) {
      this.personShow = true;
      this.BasicPersonId = row.id;
      this.title = "人口信息查看";
    },
    //人口类型
    getPersonType() {
      getDictionary({fieldName: 'personTypeDatas'}).then(res => {
        if (res && res.success) {
          this.personTypeData = res.data;
        }
      });
    },
    //亲属关系
    getRelationData() {
      let _this = this;
      getDictionary({fieldName: 'relationShipData'}).then(res => {
        if (res && res.success) {
          _this.relationShipData = res.data;
        }
      });
    },
    //根据房屋找人
    loadPersonData(hId) {
      if (hId) {
        var _this = this;
        getPersonByHouseId({houseId: hId}).then(res => {
          if (res && res.success) {
            _this.data = res.data;
            _this.personData = JSON.parse(JSON.stringify(res.data));

            getDictionary({fieldName: 'personTypeDatas'}).then(ress => {
              if (ress && ress.success) {
                _this.personTypeData = ress.data;
                for (let i in _this.personData ){
                  if(_this.personData[i] ){
                    let pram = _this.personData[i];
                    if(pram.personType){
                      let tempArr = _this.personTypeData.filter(item => item.number.toString() === pram.personType.toString());
                      if (tempArr && tempArr.length > 0) {
                        pram.personType = tempArr[0].name;
                      }
                    }
                    if(pram.relationShip){
                      let tempArr = _this.relationShipData.filter(item => item.number.toString() === pram.relationShip.toString());
                      if (tempArr && tempArr.length > 0) {
                        pram.relationShip = tempArr[0].name;
                      }
                    }

                  }
                }
                _this.$forceUpdate();//重新渲染数据
              }
            });
          }
        })
      }
    },
    //获取列表字段
    getBasicPersonColumns() {
      return [
        {
          title: '姓名',
          align: 'center',
          key: 'name',
          tooltip: true,
        },
        {
          title: '身份证号',
          align: 'center',
          key: 'cardId',
          tooltip: true,
        },
        {
          title: '人口类型',
          align: 'center',
          key: 'personType',
          tooltip: true,
          render: (h, param) => {
            if (param.row.personType) {
              let tempArr = this.personTypeData.filter(item => item.number.toString() === param.row.personType.toString());
              if (tempArr.length > 0) {
                let csvDataF = this.personData.filter(item=>item.id == param.row.id);
                if(csvDataF && csvDataF.length>0){
                  csvDataF.personType =tempArr[0].name;
                }
                return h('span', tempArr[0].name)
              } else {
                return h('span', '暂无');
              }
            } else {
              return h('span', '暂无');
            }
          }
        },
        {
          title: '所属社区',
          align: 'center',
          key: 'communityName',
          tooltip: true,
        },
        {
          title: '与房主关系',
          align: 'center',
          key: 'relationShip',
          tooltip: true,
          render: (h, param) => {
            if (param.row.relationShip) {
              let tempArr = this.relationShipData.filter(item => item.number.toString() === param.row.relationShip.toString());
              if (tempArr.length > 0) {
                let csvDataF = this.personData.filter(item=>item.id == param.row.id);
                if(csvDataF && csvDataF.length>0){
                  csvDataF.relationShip =tempArr[0].name;
                }
                return h('span', tempArr[0].name)
              } else {
                return h('span', '暂无');
              }
            } else {
              return h('span', '暂无');
            }
          }
        }
      ]
    },
    closeModal(val) {
      this.$emit('input', val);
    },
    initForm() {
      this.basicHousingManageForm = {
        houseStreet: '',
        houseCommunity: '',
        houseGridId: '',
        houseGrid: '',
        streetNumber: 0,
        houseId: '',
        houseName: '',
        houseAddress: '',
        hostName: '',
        hostCard: '',
        houseType: '',
        buildArchiveId: '',
        buildArchiveName: '',
        doorNumber: '',
        unit: '',
        floor: 0,
        area: '',
        houseProperty: '',
        houseForm: '',
        accName: '',
        accType: '',
        accNumber: '',
        accRelation: '',
        accCard: '',
        isSettle: ''
      };
    },
  },
  watch: {
    value(val) {
      this.show = val;
    },
    show(val) {
      this.initForm();
      this.isSettleShow = false;
      this.loading = false;
      this.updateShow = false;
      this.editTitle = this.modalTitle;
      if (val) {
        this.$refs['basicHousingManageForm'].resetFields();
        if (this.BasicHousingManageId != null && this.BasicHousingManageId.trim().length > 0) {
          //人口类型
          this.getPersonType();
          //亲属关系
          this.getRelationData();
          getBasicHousingManage({id: this.BasicHousingManageId}).then(res => {
            if (res && res.code == 200) {
              this.basicHousingManageForm.houseStreet = res.data.houseStreet;
              this.basicHousingManageForm.houseCommunity = res.data.houseCommunity;
              this.basicHousingManageForm.houseGrid = res.data.houseGrid;
              this.basicHousingManageForm.houseGridId = res.data.houseGridId;
              this.basicHousingManageForm.houseName = res.data.houseName;
              this.basicHousingManageForm.houseId = res.data.houseId;
              this.basicHousingManageForm.buildArchiveId = res.data.buildArchiveId;
              this.basicHousingManageForm.buildArchiveName = res.data.buildArchiveName;
              this.basicHousingManageForm.unit = res.data.unit;
              this.basicHousingManageForm.floor = res.data.floor == "" ? res.data.floor : parseInt(res.data.floor);
              this.basicHousingManageForm.doorNumber = res.data.doorNumber;
              this.basicHousingManageForm.hostName = res.data.hostName;
              this.basicHousingManageForm.hostCard = res.data.hostCard;
              //房屋类型
              getDictionary({fieldName: 'houseType'}).then(resp => {
                if (resp && resp.success) {
                  let temp = resp.data.filter(item => item.number == res.data.houseType);
                  this.basicHousingManageForm.houseType = temp[0].name;
                }
              })
              //房型
              getDictionary({fieldName: 'houseFormData'}).then(resp => {
                if (resp && resp.success) {
                  let temp = resp.data.filter(item => item.number == res.data.houseForm);
                  this.basicHousingManageForm.houseForm = temp[0].name;
                }
              });
              //房屋产权
              getDictionary({fieldName: 'housePropertyData'}).then(resp => {
                if (resp && resp.success) {
                  let temp = resp.data.filter(item => item.number == res.data.houseProperty);
                  this.basicHousingManageForm.houseProperty = temp[0].name;
                }
              });
              if (res.data.area != null && res.data.area != "") {
                this.basicHousingManageForm.area = res.data.area;
              }
              this.basicHousingManageForm.houseAddress = res.data.houseAddress;

              if (res.data.isSettle == "是") {
                this.isSettleShow = true;
                this.basicHousingManageForm.accName = res.data.accName;
                this.basicHousingManageForm.accType = res.data.accType;
                //户别
                getDictionary({fieldName: 'accTypeData'}).then(resp => {
                  if (resp && resp.success) {
                    let temp = resp.data.filter(item => item.number == res.data.accType);
                    this.basicHousingManageForm.accType = temp[0].name;
                  }
                });
                this.basicHousingManageForm.accNumber = res.data.accNumber;
                this.basicHousingManageForm.accRelation = res.data.accRelation;
                this.basicHousingManageForm.accCard = res.data.accCard;
                this.basicHousingManageForm.isSettle = res.data.isSettle;
              } else {
                this.basicHousingManageForm.isSettle = "否";
              }
              this.loadPersonData(res.data.id);
            } else {
              this.$Message.error(res.msg);
            }
          });
        }
      } else {
        this.closeModal(val);
      }
    }
  }
}
</script>
