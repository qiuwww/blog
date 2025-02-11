<style lang="less">
  .basicHousingManage {

    .form-item-input {
      width: 200px;
    }

    .ivu-form-item-content .ivu-form-item-error-tip {
      left: 0px;
    }

    .ivu-form .ivu-form-item-label {
      width: 120px;
    }

    .ivu-select {
      width: 186px;
    }

    .ivu-input-wrapper {
      width: auto !important;
    }

    .ivu-input-group .ivu-input {
      width: 100% !important;
      background: #fff !important;
      border-radius: 3px !important;
      color: #515a6e !important;
    }

    .ivu-input-group-append, .ivu-input-group > .ivu-input:last-child {
      border-radius: 3px;
    }
    .ivu-form-item-error-tip {
      line-height: 16px;
      padding-top: 2px;
      font-size: 12px;
    }
    .ivu-form-item {
      margin-bottom: 20px !important;
    }
  }
</style>

<template>
  <Modal v-model="show" :title="editTitle" :mask-closable="false" class="basicHousingManage" :draggable="false"
         scrollable width="970">
    <div style="max-height:800px;overflow-y:auto;overflow-x:hidden;">
      <Form ref="basicHousingManageForm" :model="basicHousingManageForm" :rules="basicHousingManageFormRule"
            :label-width="120">
        <Divider style="margin:0 auto;color:#2d8cf0;" orientation="left">房屋信息</Divider>
        <Row>
          <Col span="8">
            <FormItem label="所属街道" prop="houseStreetId">
              <Select v-model="basicHousingManageForm.houseStreetId" placeholder="请选择" clearable
                      @on-change="streetChange"
                      label-in-value transfer>
                <Option v-for="(item, i) in streetData" :key="item.id" :value="item.id.toString()">{{item.name}}
                </Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="所属社区" prop="houseCommunityId">
              <Select v-model="basicHousingManageForm.houseCommunityId" placeholder="请选择" clearable
                      @on-change="communityChange" label-in-value transfer>
                <Option v-for="(item, i)  in communityData" :key="item.id" :value="item.id.toString()">{{item.name}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="所属网格" prop="houseGridId">
              <Select v-model="basicHousingManageForm.houseGridId" placeholder="请选择" clearable label-in-value
                      @on-change="gridChange" transfer>
                <Option v-for="(item, i) in gridData" :key="item.id" :value="item.id.toString()">{{item.name}}</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="8">
            <FormItem label="所属小区" prop="houseId">
              <Select v-model="basicHousingManageForm.houseId" placeholder="请选择" clearable label-in-value
                      @on-change="houseChange" @on-clear="houseChange" transfer>
                <Option v-for="(item, i) in houseNameData" :key="item.id.toString()" :value="item.id.toString()">
                  {{item.name}}
                </Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="楼栋号" prop="buildArchiveId">
              <Select v-model="basicHousingManageForm.buildArchiveId" placeholder="请选择" clearable label-in-value
                      @on-change="buildArchivesChange" transfer>
                <Option v-for="(item, i) in buildArchivesData" :key="item.id.toString()" :value="item.id.toString()">
                  {{item.buildingName}}栋
                </Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="单元" prop="unit">
              <Select v-model="basicHousingManageForm.unit" placeholder="请选择单元" clearable label-in-value
                      @on-change="unitChange" transfer>
                <Option v-for="(item,i)  in unitData" :value="item.name" :key="i.toString()" :tag="item.id">
                  {{item.name}}单元
                </Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="8">
            <FormItem label="所在楼层" prop="floor">
              <Select v-model="basicHousingManageForm.floor" placeholder="请选择楼层" label-in-value clearable transfer>
                <Option v-for="(item, i)  in floorData" :value="item" :key="Math.random()">{{item}}层</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="门牌号" prop="doorNumber">
              <Select v-model="basicHousingManageForm.doorNumber" placeholder="请选择门牌号" clearable transfer>
                <Option v-for="(item,i) in doorNumberData" :value="item" :key="i.toString()">{{item}}号</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="面积" prop="area">
              <Input type="number" v-model="basicHousingManageForm.area" style="width: 186px !important;"
                     placeholder="请输入面积">
                <span slot="append">平米</span>
              </Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="8">
            <FormItem label="房屋类型" prop="houseType">
              <Select v-model="basicHousingManageForm.houseType" placeholder="请选择"
                      label-in-value ref="houseType" transfer>
                <Option v-for="(item, i) in houseType" :key="item.id" :value="item.number.toString()">{{item.name}}
                </Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="房型" prop="houseForm">
              <Select v-model="basicHousingManageForm.houseForm" placeholder="请选择" transfer>
                <Option v-for="(item, i) in houseFormData" :key="item.id" :value="item.number.toString()">
                  {{item.name}}
                </Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="房屋产权" prop="houseProperty">
              <Select v-model="basicHousingManageForm.houseProperty" placeholder="请选择" transfer>
                <Option v-for="(item, i) in housePropertyData" :key="item.id" :value="item.number.toString()">
                  {{item.name}}
                </Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="8">
            <FormItem label="房屋分类" prop="houseClassification">
              <Select v-model="basicHousingManageForm.houseClassification" placeholder="请选择"
                      label-in-value ref="houseType" transfer>
                <Option v-for="(item, i) in houseClassification" :key="item.id" :value="item.number.toString()">{{item.name}}
                </Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="建筑性质" prop="houseNature">
              <Select v-model="basicHousingManageForm.houseNature" label-in-value placeholder="请选择" transfer>
                <Option v-for="(item, i) in houseNature" :key="item.id" :value="item.number.toString()">
                  {{item.name}}
                </Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="建筑性质描述" prop="houseNatureDescribe" v-if="basicHousingManageForm.houseNature=='5'">
              <Input type="text" :maxlength=50 v-model="basicHousingManageForm.houseNatureDescribe"
                     placeholder="请输入建筑性质描述"/>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <FormItem label="有无物业管理">
            {{ basicHousingManageForm.haveProperty }}
          </FormItem>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="房主姓名" prop="hostName">
              <Input type="text" :maxlength=50 v-model="basicHousingManageForm.hostName"
                     placeholder="请输入房主姓名" style="width: 343px !important;"/>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="性别" prop="hostGender">
              <RadioGroup v-model="basicHousingManageForm.hostGender">
                <Radio v-for="(item, i)  in sexArr" :key="item.name" :value="item.name" :label="item.label" />
              </RadioGroup>
            </FormItem>
          </Col>

        </Row>
        <Row>
          <Col span="12">
            <FormItem label="房主身份证号" prop="hostCard">
              <Input type="text" :maxlength=50 v-model="basicHousingManageForm.hostCard"
                     placeholder="请输入房主身份证号" style="width: 343px !important;"/>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="联系方式" prop="hostContact">
              <Input type="text" :maxlength=50 v-model="basicHousingManageForm.hostContact"
                     placeholder="请输入房主联系方式" style="width: 343px !important;"/>
            </FormItem>
          </Col>

        </Row>
        <Row>
          <Col span="24">
            <FormItem label="房主户籍地址" prop="hostPermanentAddress">
              <Input type="text" :maxlength=50 v-model="basicHousingManageForm.hostPermanentAddress"
                     style="width: 812px !important;"
                     placeholder="请输入房屋详址"/>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="24">
            <FormItem label="房主现居地址" prop="hostCurrentAddress">
              <Input type="text" :maxlength=50 v-model="basicHousingManageForm.hostCurrentAddress"
                     style="width: 812px !important;"
                     placeholder="请输入房屋详址"/>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="24">
            <FormItem label="房屋详址" prop="houseAddress">
              <Input type="text" :maxlength=50 v-model="basicHousingManageForm.houseAddress"
                     style="width: 812px !important;"
                     placeholder="请输入房屋详址"/>
            </FormItem>
          </Col>
        </Row>
        <Divider style="margin:0 auto;color:#2d8cf0;" orientation="left">户籍信息</Divider>
        <FormItem label="本房屋是否落户" prop="isSettle">
          <RadioGroup v-model="basicHousingManageForm.isSettle">
            <Radio v-for="(item, i)  in isOfternData" :key="item.name" :value="item.name" :label="item.label" />
          </RadioGroup>
        </FormItem>
        <Row v-if="basicHousingManageForm.isSettle == '是'">
          <Col span="12">
            <FormItem label="户号" prop="accNumber">
              <Input type="text" :maxlength=50 v-model="basicHousingManageForm.accNumber"
                     placeholder="请输入户号" style="width: 343px !important;"/>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="户别" prop="accType">
              <Select v-model="basicHousingManageForm.accType" placeholder="请选择" style="width: 343px !important;"
                      transfer>
                <Option v-for="(item, i) in accTypeData" :key="item.id" :value="item.number.toString()">{{item.name}}
                </Option>
              </Select>
            </FormItem>
          </Col>

        </Row >
        <Row v-if="basicHousingManageForm.isSettle == '是'">
          <Col span="12">
            <FormItem label="户主姓名" prop="accName">
              <Input type="text" :maxlength=50 v-model="basicHousingManageForm.accName"
                     placeholder="请输入户主姓名" style="width: 343px !important;"/>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="户主身份证号" prop="accCard">
              <Input type="text" :maxlength=50 v-model="basicHousingManageForm.accCard"
                     placeholder="请输入户主身份证号" style="width: 343px !important;"/>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </div>
    <div slot="footer">
      <Button type="text" @click="show=false">取消</Button>
      <Button type="primary" :loading="loading" @click="handelSubmit">提交</Button>
    </div>
  </Modal>
</template>
<script>
  import {addBasicHousing, updateBasicHousing, getBasicHousing} from '@/api/zhsq/basicHouse/basicHouse'
  import {queryAllList as gridAllList} from "@/api/zhsq/basicHousingEstate/basicHousingEstate"
  import {queryTBuildingArchivesAll} from "@/api/zhsq/tBuildingArchives/tBuildingArchives"
  import {
    communityData,sexData,
  } from '@/api/tools/zhsqSelectData'
  import {queryAllList} from "@/api/zhsq/basicGrids/basicGrids"
  import {getTBuildingArchives} from "@/api/zhsq/tBuildingArchives/tBuildingArchives"
  import {getDictionary, getStreet, getCommunity} from '@/api/index';


  export default {
    name: "updateBasicHousing",
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
      }
    },

    data() {
      return {
        isRenter: false,
        show: this.value,
        editTitle: this.modalTitle,
        loading: true,
        houseNameData: [],
        gridData: [],
        streetData: [],
        communityData: [],
        houseType: [],
        houseClassification: [],
        houseNature: [],
        sexArr:sexData,
        buildArchivesData: [],
        basicHousingManageForm: {
          houseStreet: '',
          houseStreetId: '',
          houseCommunity: '',
          houseCommunityId: '',
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
          floor: '',
          area: 0,
          houseForm: '',
          houseProperty: '',
          accNumber: '',
          accType: '',
          accName: '',
          accRelation: '',
          accCard: '',
          houseClassification: '',
          hostGender: '',
          hostPermanentAddress: '',
          houseNature: '',
          houseNatureDescribe: '',
          hostCurrentAddress: '',
          haveProperty: '-',
          hostContact: '',
          isSettle:"否"
        },
        unitData: [],
        floorData: [],
        doorNumberData: [],
        basicHousingManageFormRule: this.getBasicHousingManageFormRule(),
        //楼栋对象
        buildArchives: {},
        //房屋产权
        housePropertyData: [],
        //房型
        houseFormData: [],
        //户别
        accTypeData: [],
        //与户主关系
        relationShipData: []
      }
    },
    methods: {
      //户别
      getAccTypeData() {
        getDictionary({fieldName: 'accTypeData'}).then(res => {
          if (res && res.success) {
            this.accTypeData = res.data;
          }
        })
      },
      //房屋产权
      getHouseProperty() {
        getDictionary({fieldName: 'housePropertyData'}).then(res => {
          if (res && res.success) {
            this.housePropertyData = res.data;
          }
        })
      },
      //房型
      getHouseForm() {
        getDictionary({fieldName: 'houseFormData'}).then(res => {
          if (res && res.success) {
            this.houseFormData = res.data;
          }
        })
      },
      //房屋类型
      getHouseType() {
        getDictionary({fieldName: 'houseType'}).then(res => {
          if (res && res.success) {
            this.houseType = res.data;
          }
        })
      },
      //房屋分类
      getHouseClassification() {
        let _this = this;
        getDictionary({fieldName: 'houseClassification'}).then(res => {
          if (res && res.success) {
            _this.houseClassification = res.data;
          }
        })
      },
      //房屋性质
      getHouseNature() {
        let _this = this;
        getDictionary({fieldName: 'houseNature'}).then(res => {
          if (res && res.success) {
            _this.houseNature = res.data;
          }
        })
      },
      //加载街道
      getStreetData() {
        getStreet({}).then(res => {
          if (res && res.success) {
            this.streetData = res.data;
          }
        })
      },
      //单元改变加载楼层
      unitChange(e) {
        if (e) {
          if (this.buildArchives.unitList) {
            this.floorData = [];
            this.doorNumberData = [];
            this.basicHousingManageForm.unitId = e.tag;
            let filter = this.buildArchives.unitList.filter(item => item.id == e.tag);
            if (filter && filter.length > 0) {
              for (let i = 0; i < parseInt(filter[0].floorNumber); i++) {
                this.floorData.push(i + 1);
              }
              let number = parseInt(filter[0].householdsNumber);
              for (let i = 1; i <= number; i++) {
                if (i < 10) {
                  this.doorNumberData.push("0" + i);
                } else {
                  this.doorNumberData.push(i);
                }
              }
            }
          }
        }
      },
      //楼栋改变加载单元
      buildArchivesChange(e) {
        let form = this.basicHousingManageForm;
        if (e) {
          this.unitData = [];
          let data = {};
          if (e != "1") {//等于1为编辑
            this.basicHousingManageForm.buildArchiveName = e.label.trim();
            this.basicHousingManageForm.buildArchiveId = e.value.trim();
            data.id = e.value.trim();
          }
          getTBuildingArchives(data).then(res => {
            if (res && res.success) {
              this.buildArchives = res.data;
              //构造单元
              if (this.buildArchives.unitList) {
                for (let i = 0; i < this.buildArchives.unitList.length; i++) {
                  this.unitData.push({
                    id: this.buildArchives.unitList[i].id,
                    name: this.buildArchives.unitList[i].name
                  });
                }
              }
            }
          });
        } else {
          //单元
          this.basicHousingManageForm.unit = "";
          this.basicHousingManageForm.unitId = "";
          this.unitData = [];
        }
        //楼层
        this.basicHousingManageForm.floor = "";
        this.floorData = [];
        //门牌号
        this.basicHousingManageForm.doorNumber = "";
        this.doorNumberData = [];

      },
      houseChange(e) {
        if (e) {
          if (e != "1") {
            this.basicHousingManageForm.houseName = e.label.trim();
            this.basicHousingManageForm.houseId = e.value.trim();
            //楼栋
            this.basicHousingManageForm.buildArchiveName = "";
            this.basicHousingManageForm.buildArchiveId = "";
            this.buildArchivesData = [];

            queryTBuildingArchivesAll({housingEstate: e.value.trim(),buildingType: '1',}).then(res => {
              if (res.data.length >= 0) {
                //重新赋值
                this.buildArchivesData = res.data;
              }
            })
          }
          if(this.basicHousingManageForm.houseId!=""){
            this.basicHousingManageForm.haveProperty = "有";
          }
        }
        //单元
        this.basicHousingManageForm.unit = "";
        this.unitData = [];
        //楼层
        this.basicHousingManageForm.floor = "";
        this.floorData = [];
        //门牌号
        this.basicHousingManageForm.doorNumber = "";
        this.doorNumberData = [];
      },
      //網格
      gridChange(e) {
        if (e) {
          this.basicHousingManageForm.houseGridId = e.value.trim();
          this.basicHousingManageForm.houseGrid = e.label.trim();
          //小区
          this.basicHousingManageForm.houseName = "";
          this.basicHousingManageForm.houseId = "";
          this.houseNameData = [];

          gridAllList({gridId: e.value.trim()}).then(res => {
            if (res.data.length >= 0) {
              //重新复制
              this.houseNameData = res.data;
            }
          })
        }
        //建筑
        this.basicHousingManageForm.buildArchiveName = "";
        this.basicHousingManageForm.buildArchiveId = "";
        this.buildArchivesData = [];
        //单元
        this.basicHousingManageForm.unit = "";
        this.unitData = [];
        //楼层
        this.basicHousingManageForm.floor = "";
        this.floorData = [];
        //门牌号
        this.basicHousingManageForm.doorNumber = "";
        this.doorNumberData = [];

        this.basicHousingManageForm.haveProperty = "-";
      },
      //社区
      communityChange(e) {
        if (e) {
          this.basicHousingManageForm.houseCommunity = e.label.trim();
          this.basicHousingManageForm.houseCommunityId = e.value;

          //网格
          this.basicHousingManageForm.houseGrid = "";
          this.basicHousingManageForm.houseGridId = "";
          this.gridData = [];

          queryAllList({communityId: e.value}).then(res => {
            if (res.data.length >= 0) {
              //赋值
              this.gridData = res.data;
            }
          });
        }
        //小区
        this.basicHousingManageForm.houseName = "";
        this.basicHousingManageForm.houseId = "";
        this.houseNameData = [];
        //建筑
        this.basicHousingManageForm.buildArchiveName = "";
        this.basicHousingManageForm.buildArchiveId = "";
        this.buildArchivesData = [];
        //单元
        this.basicHousingManageForm.unit = "";
        this.unitData = [];
        //楼层
        this.basicHousingManageForm.floor = "";
        this.floorData = [];
        //门牌号
        this.basicHousingManageForm.doorNumber = "";
        this.doorNumberData = [];

        this.basicHousingManageForm.haveProperty = "-";
      },
      //街道
      streetChange(e) {
        let form = this.basicHousingManageForm;
        if (e) {
          form.houseStreet = e.label.trim();
          form.houseStreetId = e.value;

          //社区
          this.communityData = [];
          form.houseCommunity = '';
          form.houseCommunityId = '';

          getCommunity({streetId: e.value}).then(res => {
            if (res && res.success) {
              this.communityData = res.data;
            }
          })
        }
        //网格
        form.houseGrid = "";
        form.houseGridId = "";
        this.gridData = [];
        //小区
        this.houseNameData = [];
        form.houseId = "";
        form.houseName = "";
        //楼栋
        form.buildArchiveName = "";
        form.buildArchiveId = "";
        this.buildArchivesData = [];
        //单元
        form.unit = "";
        this.unitData = [];
        //楼层
        form.floor = "";
        this.floorData = [];
        //门牌号
        form.doorNumber = "";
        this.doorNumberData = [];
        this.basicHousingManageForm.haveProperty = "-";
      },
      handelSubmit() {
        this.$refs['basicHousingManageForm'].validate((valid) => {
          if (valid) {
            if (this.BasicHousingManageId != null && this.BasicHousingManageId.trim().length > 0) {
              this.basicHousingManageForm.id = this.BasicHousingManageId;
              updateBasicHousing(this.basicHousingManageForm).then(res => {
                if (res && res.code == 200) {
                  this.closeModal(false);
                  this.$emit('handleSearch');
                  this.$Message.success('保存成功');
                } else {
                  this.$Message.error(res.msg);
                }
              })
            } else {
              addBasicHousing(this.basicHousingManageForm).then(res => {
                if (res && res.code == 200) {
                  this.closeModal(false);
                  this.$emit('handleSearch');
                  this.$Message.success('保存成功');
                } else {
                  this.$Message.error(res.msg);
                }
              })
            }
          } else {
            this.loading = false;
            this.$Message.error('表单验证不通过！');
          }
        });
      },
      closeModal(val) {
        this.$emit('input', val);
      },
      initForm() {
        this.basicHousingManageForm = {
          houseStreet: '',
          houseStreetId: '',
          houseCommunity: '',
          houseCommunityId: '',
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
          floor: '',
          area:'',
          houseForm: '',
          houseProperty: '',
          accNumber: '',
          accType: '',
          accName: '',
          accRelation: '',
          accCard: '',
          houseClassification: '',
          hostGender: '',
          hostPermanentAddress: '',
          houseNature: '',
          houseNatureDescribe: '',
          hostCurrentAddress: '',
          haveProperty: '-',
          hostContact: '',
          isSettle:"否"
        };
      },
      getBasicHousingManageFormRule() {
        return {
          houseId: [
            {required: true, message: '小区不能为空！', trigger: 'blur', pattern: /.+/},
          ],
          isSettle: [
            {required: true, message: '该房屋是否落户不能为空！', trigger: 'blur', pattern: /.+/},
          ],
          unit: [
            {required: true, message: '单元不能为空！', trigger: 'blur', pattern: /.+/},
          ],
          floor: [
            {required: true, message: '所在楼层不能为空！', trigger: 'blur', pattern: /.+/},
          ],
          houseStreetId: [
            {required: true, message: '所属街道不能为空！', trigger: 'blur', pattern: /.+/},
          ],
          houseCommunityId: [
            {required: true, message: '所属社区不能为空！', trigger: 'blur', pattern: /.+/},
          ],
          houseGridId: [
            {required: true, message: '所属网格不能为空！', trigger: 'blur', pattern: /.+/},
          ],
          houseName: [
            {required: true, message: '小区名称不能为空！', trigger: 'blur'},
            {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
          ],
          houseAddress: [
            {required: true, message: '房屋详址不能为空！', trigger: 'blur'},
            {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
          ],
          hostName: [
            {required: true, message: '房主姓名不能为空！', trigger: 'blur'},
            {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
          ],
          hostCard: [
            {required: true, message: '身份证号不能为空！', trigger: 'blur'},
            {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'},
            {
              pattern: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/,
              message: '身份证号不正确',
              trigger: 'blur'
            }
          ],
          houseType: [
            // {required: true, message: '房屋类型不能为空！', trigger: 'blur', pattern: /.+/},
          ],
          doorNumber: [
            {required: true, message: '门牌号不能为空！', trigger: 'blur', pattern: /.+/},
          ],
          buildArchiveId: [
            {required: true, message: '楼栋不能为空！', trigger: 'blur', pattern: /.+/},
          ],
          area: [
            // {required: true, message: '面积不能为空！', trigger: 'blur', pattern: /.+/},
          ],
          houseForm: [
            // {required: true, message: '房型不能为空！', trigger: 'blur', pattern: /.+/},
          ],
          houseProperty: [
            // {required: true, message: '房屋产权不能为空！', trigger: 'blur', pattern: /.+/},
          ],
          accNumber: [
            {required: true, message: '户号不能为空！', trigger: 'blur', pattern: /.+/},
          ],
          accType: [
            {required: true, message: '户别不能为空！', trigger: 'blur', pattern: /.+/},
          ],
          accName: [
            {required: true, message: '户主姓名不能为空！', trigger: 'blur', pattern: /.+/},
          ],
          accRelation: [
            {required: true, message: '与户主关系不能为空！', trigger: 'blur', pattern: /.+/},
          ],
          accCard: [
            {required: true, message: '户主身份证不能为空！', trigger: 'blur', pattern: /.+/},
            {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'},
            {
              pattern: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/,
              message: '身份证号不正确',
              trigger: 'blur'
            }
          ],
          houseClassification: [
            // {required: true, message: '房屋分类不能为空！', trigger: 'blur'},
            {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
          ],
          hostGender: [
            {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
          ],
          hostPermanentAddress: [
            {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
          ],
          houseNature: [
            {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
          ],
          houseNatureDescribe: [
            {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
          ],
          hostCurrentAddress: [
            {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
          ],
          haveProperty: [
            {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
          ],
          hostContact: [
            {required: true,type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'},
            { pattern: /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/, message: '请输入合法手机号/电话号', trigger: 'blur' }
          ],
        }
      }
    },

    watch: {
      "basicHousingManageForm.area"(val) {
        this.basicHousingManageForm.area = Math.abs(val);
      },
      value(val) {
        this.show = val;
      },
      show(val) {
        this.initForm();
        this.loading = false;
        this.editTitle = this.modalTitle;
        this.getStreetData();
        this.getHouseType();
        this.getHouseForm();
        this.getHouseProperty();
        this.getAccTypeData();
        this.getHouseClassification();
        this.getHouseNature();
        this.unitData = [];
        this.floorData = [];
        this.doorNumberData = [];
        if (this.editTitle.indexOf("编辑") > -1) {
          this.communityData = communityData;
        } else {
          this.communityData = [];
          this.gridData = [];
        }
        if (val) {
          this.$refs['basicHousingManageForm'].resetFields();
          if (this.BasicHousingManageId != null && this.BasicHousingManageId.trim().length > 0) {
            getBasicHousing({id: this.BasicHousingManageId}).then(res => {
              if (res && res.code == 200) {
                //加载街道
                getStreet({}).then(resp => {
                  if (res && res.success) {
                    this.streetData = resp.data;
                    this.basicHousingManageForm.houseStreet = res.data.houseStreet;
                    this.basicHousingManageForm.houseStreetId = res.data.houseStreetId;
                  }
                });

                //加载社区
                getCommunity({streetId: res.data.houseStreetId}).then(resp => {
                  if (res && res.success) {
                    this.communityData = resp.data;
                    this.basicHousingManageForm.houseCommunity = res.data.houseCommunity;
                    this.basicHousingManageForm.houseCommunityId = res.data.houseCommunityId;
                  }
                })
                //网格
                if (res.data.houseCommunityId) {
                  queryAllList({communityId: res.data.houseCommunityId}).then(resp => {
                    if (resp.data.length > 0) {
                      //赋值
                      this.gridData = resp.data;
                      this.basicHousingManageForm.houseGrid = res.data.houseGrid;
                      this.basicHousingManageForm.houseGridId = res.data.houseGridId;
                    }
                  });
                }
                //网格找小区
                if (res.data.houseGridId) {
                  gridAllList({gridId: res.data.houseGridId}).then(resp => {
                    if (resp.data.length > 0) {
                      this.houseNameData = resp.data;
                      this.basicHousingManageForm.houseName = res.data.houseName;
                      this.basicHousingManageForm.houseId = res.data.houseId;
                    }
                  })
                }
                //根据小区找楼栋
                if (res.data.houseId) {
                  queryTBuildingArchivesAll({housingEstate: res.data.houseId,buildingType: '1'}).then(resp => {
                    if (resp.data.length > 0) {
                      this.buildArchivesData = resp.data;
                      this.basicHousingManageForm.buildArchiveId = res.data.buildArchiveId;
                      this.basicHousingManageForm.buildArchiveName = res.data.buildArchiveName;
                    }
                  })
                }
                //楼栋找单元
                if (res.data.buildArchiveId) {
                  getTBuildingArchives({id: res.data.buildArchiveId}).then(resp => {
                    if (res && res.success) {
                      this.buildArchives = resp.data;
                      // //单元
                      if (this.buildArchives.unitList) {
                        for (let i = 0; i < this.buildArchives.unitList.length; i++) {
                          this.unitData.push({
                            id: this.buildArchives.unitList[i].id,
                            name: this.buildArchives.unitList[i].name + ""
                          });
                        }
                      }

                      this.basicHousingManageForm.unit = res.data.unit;

                      this.floorData = [];
                      this.doorNumberData = [];

                      let filter = this.buildArchives.unitList.filter(item => item.name == res.data.unit);
                      if (filter && filter.length > 0) {
                        for (let i = 1; i <= parseInt(filter[0].floorNumber); i++) {
                          this.floorData.push(i + "");
                        }
                        let number =  parseInt(filter[0].householdsNumber);
                        for (let i = 1; i <= number; i++) {
                          if (i < 10) {
                            this.doorNumberData.push("0" + i);
                          } else {
                            this.doorNumberData.push(i + "");
                          }
                        }

                        this.basicHousingManageForm.floor = res.data.floor;
                        this.basicHousingManageForm.doorNumber = res.data.doorNumber;
                      }
                    }
                  });
                }

                this.basicHousingManageForm.hostName = res.data.hostName;
                this.basicHousingManageForm.hostCard = res.data.hostCard;
                this.basicHousingManageForm.houseType = res.data.houseType;
                this.basicHousingManageForm.houseAddress = res.data.houseAddress;
                if (res.data.area != null && res.data.area != '') {
                  this.basicHousingManageForm.area = parseInt(res.data.area);
                }
                this.basicHousingManageForm.houseForm = res.data.houseForm;
                this.basicHousingManageForm.houseProperty = res.data.houseProperty;
                this.basicHousingManageForm.accNumber = res.data.accNumber;
                this.basicHousingManageForm.accType = res.data.accType;
                this.basicHousingManageForm.accName = res.data.accName;
                this.basicHousingManageForm.accRelation = res.data.accRelation;
                this.basicHousingManageForm.accCard = res.data.accCard;
                this.basicHousingManageForm.unitId = res.data.unitId;
                this.basicHousingManageForm.houseClassification = res.data.houseClassification;
                this.basicHousingManageForm.hostGender = res.data.hostGender;
                this.basicHousingManageForm.hostPermanentAddress = res.data.hostPermanentAddress;
                this.basicHousingManageForm.houseNature = res.data.houseNature;
                this.basicHousingManageForm.houseNatureDescribe = res.data.houseNatureDescribe;
                this.basicHousingManageForm.haveProperty = res.data.haveProperty;
                this.basicHousingManageForm.hostCurrentAddress = res.data.hostCurrentAddress;
                this.basicHousingManageForm.hostContact = res.data.hostContact;
                this.basicHousingManageForm.isSettle = res.data.isSettle;
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
