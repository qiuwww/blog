<style lang="less">
  .basicHousingManage {
    .form-item-input {
      width: 200px;
    }

    .ivu-form-item-content .ivu-form-item-error-tip {
      left: 120px;
    }

    .ivu-form .ivu-form-item-label {
      width: 120px;
    }

    .ivu-select {
      width: 186px;
    }

    .ivu-form-item {
      margin-bottom: 24px !important;
    }

    .ivu-input-wrapper {
      width: auto !important;
    }
  }
</style>
<template>
  <Modal v-model="show" :title="editTitle" :mask-closable="false" class="basicHousingManage" width="991">
    <Form ref="basicHousingManageForm" :model="basicHousingManageForm" :rules="basicHousingManageFormRule">
      <Row>
        <Col span="8">
          <FormItem label="所属街道" prop="streetId">
            <Select v-model="basicHousingManageForm.streetId" placeholder="请选择" @on-change="streetChange"
                    :label-in-value="true">
              <Option v-for="(item, i) in streetData" :key="item.id" :value="item.id.toString()">{{item.name}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="所属社区" prop="communityId">
            <Select v-model="basicHousingManageForm.communityId" placeholder="请选择" @on-change="communityChange"
                    :label-in-value="true">
              <Option v-for="(item, i)  in communityData" :key="item.id" :value="item.id.toString()">{{item.name}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="所属网格" prop="houseGridId">
            <Select v-model="basicHousingManageForm.houseGridId" placeholder="请选择" @on-change="gridChange"
                    :label-in-value="true">
              <Option v-for="(item, i) in gridData" :key="item.id.toString()" :value="item.id.toString()">{{item.name}}</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="8">
          <FormItem label="小区名称" prop="houseId">
            <Select v-model="basicHousingManageForm.houseId" placeholder="请选择" @on-change="houseChange" :label-in-value="true">
              <Option v-for="(item, i) in houseName" :key="item.id.toString()" :value="item.id.toString()">{{item.name}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="楼栋" prop="buildArchiveId">
            <Select v-model="basicHousingManageForm.buildArchiveId" placeholder="请选择" @on-change="buildArchivesChange" :label-in-value="true">
              <Option v-for="(item, i) in buildArchives" :key="item.id" :value="item.id">{{item.buildingName+"栋"}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="单元" prop="unit">
            <Select v-model="basicHousingManageForm.unit" placeholder="请选择" @on-change="unitChange" label-in-value>
              <Option v-for="(item, i)  in unitData" :key="Math.random()" :value="item">{{item}}</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="8">
          <FormItem label="楼层" prop="floor">
            <Select v-model="basicHousingManageForm.floor" placeholder="请选择" @on-change="floorChange" label-in-value>
              <Option v-for="(item, i)  in floorData" :key="Math.random()" :value="item">{{item}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="门牌号" prop="doorNumber">
            <Select v-model="basicHousingManageForm.doorNumber" placeholder="请选择"  @on-change="doorNumberChange" :label-in-value="true">
              <Option v-for="(item, i)  in doorNumberData" :key="item.id" :value="item.id">{{item.doorNumber}}</Option>
            </Select>
          </FormItem>
        </Col>
        <!-- <Col span="8">
          <FormItem label="与户主关系" prop="relationShip">
            <Select v-model="basicHousingManageForm.relationShip" placeholder="请选择">
              <Option v-for="(item, i)  in relationShipData" :key="item.id" :value="item.number.toString()">
                {{item.name}}
              </Option>
            </Select>
          </FormItem>
        </Col> -->
      </Row>
      <!-- <Row>
        <Col span="8" v-if="isSettleShow">
          <FormItem label="是否落户" prop="relationShip">
            <Select v-model="basicHousingManageForm.isSettle" placeholder="请选择">
              <Option value="否">否</Option>
              <Option value="是">是</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="8" v-if="rentStatusShow">
          <FormItem label="住房状态" prop="rentStatus">
            <Select v-model="basicHousingManageForm.rentStatus" placeholder="请选择">
              <Option v-for="(item, i)  in rentStatusData" :key="item.id" :value="item.number.toString()">
                {{item.name}}
              </Option>
            </Select>
          </FormItem>
        </Col>
      </Row> -->
     </Form>
    <div slot="footer">
      <Button type="text" @click="show=false">取消</Button>
      <Button type="primary" :loading="loading" @click="handelSubmit">提交</Button>
    </div>
  </Modal>
</template>
<script>
  import {
      addBasicSocialOrganization,
      updateBasicSocialOrganization,
      getBasicSocialOrganization
  } from '@/api/zhsq/basicSocialOrganization/basicSocialOrganization'
  import {addTZhsqMerchantProfile,updateTZhsqMerchantProfile,getTZhsqMerchantProfile} from '@/api/zhsq/tZhsqMerchantProfile/tZhsqMerchantProfile'
  import {addTZhsqVolunteer, updateTZhsqVolunteer, getTZhsqVolunteer} from '@/api/zhsq/tZhsqVolunteer/tZhsqVolunteer';
    import {queryAllList as gridAllList} from "@/api/zhsq/basicHousingEstate/basicHousingEstate"
    import {queryTBuildingArchivesAll} from "@/api/zhsq/tBuildingArchives/tBuildingArchives"
    import {getUnits, getFloors, getDoorNumbers} from '@/api/zhsq/basicHouse/basicHouse'
    // import { getBasicPerson} from '@/api/zhsq/basicPerson/basicPerson'
    import {getDictionary, getStreet, getCommunity} from '@/api/index';
    import {queryAllList} from "@/api/zhsq/basicGrids/basicGrids"

    export default {
        name: "updatebindHousing",
        props: {
            value: {
                type: Boolean,
                default: false
            },
            BasicId: {
                type: String
            },
            tableName: {
                type: String
            },
            BasicPersonId: {
                type: String
            },
            modalTitle: {
                type: String
            }
        },
        data() {
            return {
                //房屋出租状态
                rentStatusShow:false,
                rentStatusData:[],
                //户籍人口是否落户
                isSettleShow: false,
                personId: this.BasicPersonId,
                isRenter: false,
                show: this.value,
                editTitle: this.modalTitle,
                loading: true,
                houseName: [],
                gridData: [],
                streetData: [],
                communityData: [],
                buildArchives: [],
                unitData: [],
                floorData: [],
                doorNumberData: [],
                relationShipData: [],
                basicHousingManageForm: {
                    relationShip: '',
                    streetId: '',
                    communityId: '',
                    houseGridId: '',
                    houseGrid: '',
                    ownedHousing: '',
                    streetNumber: 0,
                    houseId: '',
                    houseName: '',
                    houseAddress: '',
                    hostName: '',
                    hostCard: '',
                    buildArchiveId: '',
                    buildArchiveName: '',
                    doorNumber: '',
                    unit: '',
                    floor: '',
                    id: '',
                    //是否落户
                    isSettle: '',
                    //住房状态
                    rentStatus:''
                },
                basicHousingManageFormRule: this.getBasicHousingManageFormRule(),
            }
        },
        mounted() {
            this.getStreetData();
            // this.getRelationData();
        },
        methods: {
            //住房状态
            getRentStatusData(){
                getDictionary({fieldName:'rentStatus'}).then(res => {
                    if (res && res.success) {
                        this.rentStatusData = res.data;
                    }
                });
            },
            //亲属关系
            // getRelationData(){
            //     getDictionary({fieldName:'relationData'}).then(res => {
            //         if (res && res.success) {
            //             this.relationShipData = res.data;
            //         }
            //     });
            // },
            //获取户籍信息
            // getBaicPersonById() {
            //     getBasicPerson({id: this.BasicPersonId}).then(res => {
            //         if (res && res.success) {
            //             //户籍人口
            //             if (res.data.personType == "1") {
            //                 this.isSettleShow = true;
            //             }
            //             //流动人口
            //             if(res.data.personType == "3"){
            //                 this.rentStatusShow = true;
            //                 this.getRentStatusData();
            //             }
            //         }
            //     })
            // },
            //门牌号改变
            doorNumberChange(e) {
                if (e) {
                    this.basicHousingManageForm.doorNumber = e.value;
                    this.basicHousingManageForm.doorNumberName = e.label;
                    let newData = this.doorNumberData.filter(function (item, index) {
                        return item.id = e.value;
                    });
                    //核心参数
                    this.basicHousingManageForm.ownedHousing = e.value;//房屋id
                    this.basicHousingManageForm.id = this.BasicId;//人口id
                }
            },
            //楼层改变
            floorChange(e) {
                if (e) {

                    //门牌号
                    this.basicHousingManageForm.doorNumber = "";
                    this.doorNumberData = [];

                    let data = {
                        buildArchiveId: this.basicHousingManageForm.buildArchiveId,
                        unit: this.basicHousingManageForm.unit,
                        floor: e.value.replace('楼', '')
                    };

                    getDoorNumbers(data).then(res => {
                        this.doorNumberData = res.data;
                    })
                }
            },
            //单元改变加载楼层
            unitChange(e) {
                if (e) {
                    //楼层
                    this.basicHousingManageForm.floor = [];
                    this.floorData = [];
                    //门牌号
                    this.basicHousingManageForm.doorNumber = "";
                    this.doorNumberData = [];

                    let data = {
                        buildArchiveId: this.basicHousingManageForm.buildArchiveId,
                        unit: e.value
                    };
                    getFloors(data).then(res => {
                        this.floorData = res.data;
                    });
                }
            },
            //楼栋改变加载单元
            buildArchivesChange(e) {
                if (e) {
                    this.basicHousingManageForm.buildArchiveId = e.value;
                    this.basicHousingManageForm.buildArchive = e.label;
                    //单元
                    this.basicHousingManageForm.unit = "";
                    this.unitData = [];
                    //楼层
                    this.basicHousingManageForm.floor = [];
                    this.floorData = [];
                    //门牌号
                    this.basicHousingManageForm.doorNumber = "";
                    this.doorNumberData = [];

                    getUnits({buildArchiveId: e.value}).then(res => {
                        if (res && res.success) {
                            this.unitData = res.data;
                        }
                    });
                }
            },
            //小区改变
            houseChange(e) {
                if (e) {
                    this.basicHousingManageForm.houseId = e.value;
                    this.basicHousingManageForm.house = e.label;
                    //楼栋
                    this.basicHousingManageForm.buildArchiveId = "";
                    this.buildArchives = [];
                    //单元
                    this.basicHousingManageForm.unit = "";
                    this.unitData = [];
                    //楼层
                    this.basicHousingManageForm.floor = [];
                    this.floorData = [];
                    //门牌号
                    this.basicHousingManageForm.doorNumber = "";
                    this.doorNumberData = [];

                    queryTBuildingArchivesAll({housingEstate: e.value,buildingType: '1'}).then(res => {
                        if (res && res.success) {
                            this.buildArchives = res.data;
                        }
                    })

                }
            },
            //網格
            gridChange(e) {
                if (e) {
                  this.basicHousingManageForm.houseGridId = e.value;
                  this.basicHousingManageForm.houseGrid = e.label;
                    //小区
                    this.basicHousingManageForm.houseId = "";
                    this.houseName = [];
                    //楼栋
                    this.basicHousingManageForm.buildArchiveId = "";
                    this.buildArchives = [];
                    //单元
                    this.basicHousingManageForm.unit = "";
                    this.unitData = [];
                    //楼层
                    this.basicHousingManageForm.floor = [];
                    this.floorData = [];
                    //门牌号
                    this.basicHousingManageForm.doorNumber = "";
                    this.doorNumberData = [];

                    //flag 是否限制权限 true限制权限 false查询所有
                    gridAllList({gridId: e.value,flag:false}).then(res => {
                        if (res.data.length > 0) {
                            this.houseName = res.data;
                        }
                    })
                }
            },
            //社区
            communityChange(e) {
                if (e) {
                  this.basicHousingManageForm.communityId = e.value;
                  this.basicHousingManageForm.community = e.label;
                    //网格
                    this.basicHousingManageForm.houseGridId = "";
                    this.gridData = [];
                    //小区
                    this.basicHousingManageForm.houseId = "";
                    this.houseName = [];
                    //楼栋
                    this.basicHousingManageForm.buildArchiveId = "";
                    this.buildArchives = [];
                    //单元
                    this.basicHousingManageForm.unit = "";
                    this.unitData = [];
                    //楼层
                    this.basicHousingManageForm.floor = [];
                    this.floorData = [];
                    //门牌号
                    this.basicHousingManageForm.doorNumber = "";
                    this.doorNumberData = [];

                    //flag 是否限制权限 true限制权限 false查询所有
                    queryAllList({communityId: e.value,flag:false}).then(res => {
                        if (res.data.length > 0) {
                            this.gridData = res.data;
                        }
                    });
                }
            },
            //街道
            streetChange(e) {
                if (e) {

                    this.basicHousingManageForm.streetId = e.value;
                    this.basicHousingManageForm.street = e.label;
                    //社区

                    this.basicHousingManageForm.communityId = "";
                    this.communityData = [];
                    //网格
                    this.basicHousingManageForm.houseGridId = "";
                    this.gridData = [];
                    //小区
                    this.basicHousingManageForm.houseId = "";
                    this.houseName = [];
                    //楼栋
                    this.basicHousingManageForm.buildArchiveId = "";
                    this.buildArchives = [];
                    //单元
                    this.basicHousingManageForm.unit = "";
                    this.unitData = [];
                    //楼层
                    this.basicHousingManageForm.floor = [];
                    this.floorData = [];
                    //门牌号
                    this.basicHousingManageForm.doorNumber = "";
                    this.doorNumberData = [];

                    //flag 是否限制权限 true限制权限 false查询所有
                    getCommunity({streetId: e.value,flag:false}).then(res => {
                        if (res && res.success) {
                            this.communityData = res.data;
                        }
                    });
                }
            },
            //获取街道
            getStreetData() {
                //flag 是否限制权限 true限制权限 false查询所有
                getStreet({flag:false}).then(res => {
                    if (res && res.success) {
                        this.streetData = res.data;
                    }
                })
            },
            // handelSubmit() {
            //     this.$refs['basicHousingManageForm'].validate((valid) => {
            //
            //         if (valid) {
            //             bindHouse(this.basicHousingManageForm).then(res => {
            //                 if (res && res.code == 200) {
            //                     this.closeModal(false);
            //                     this.$emit('handleSearch');
            //                     this.$Message.success('绑定成功');
            //                 } else {
            //                     this.$Message.error(res.msg);
            //                 }
            //             })
            //         } else {
            //             this.loading = false;
            //             this.$Message.error('表单验证不通过！');
            //         }
            //     });
            // },
            handelSubmit() {

                this.$refs['basicHousingManageForm'].validate((valid) => {

                    if (valid) {
                        // console.log(this.basicHousingManageForm);
                        if(this.tableName == "TZhsqVolunteer"){
                          let data = {};
                          // this.getStreetData();
                          data.id = this.BasicId;
                          data.homeAddress =this.basicHousingManageForm.houseGrid.trim()+this.basicHousingManageForm.house.trim()+this.basicHousingManageForm.buildArchive.trim()+"号楼"+this.basicHousingManageForm.unit.trim()+"单元"+this.basicHousingManageForm.floor.trim()+this.basicHousingManageForm.doorNumberName.trim(),
                          // data.homeAddress =this.basicHousingManageForm.houseGridId.trim()+this.basicHousingManageForm.houseId.trim()+"小区"+this.basicHousingManageForm.buildArchiveId.trim()+"号楼"+this.basicHousingManageForm.unit.trim()+"单元"+this.basicHousingManageForm.floor.trim()+this.basicHousingManageForm.doorNumber.trim(),



                          data.houseId = this.basicHousingManageForm.ownedHousing ,
                          updateTZhsqVolunteer(data).then(res => {
                            this.loading = false;
                            if (res && res.code == 200) {
                              this.closeModal(false);
                              this.$emit('handleSearch');
                              this.$Message.success('保存成功');
                            } else {
                              this.$Message.error(res.msg);
                            }
                          })
                        }else if(this.tableName == "tZhsqMerchantProfile"){
                          let data = {};

                          data.id = this.BasicId;
                          data.houseName =this.basicHousingManageForm.houseGrid.trim()+this.basicHousingManageForm.house.trim()+this.basicHousingManageForm.buildArchive.trim()+"号楼"+this.basicHousingManageForm.unit.trim()+"单元"+this.basicHousingManageForm.floor.trim()+this.basicHousingManageForm.doorNumberName.trim(),
                          // data.houseName =this.basicHousingManageForm.houseGridId.trim()+this.basicHousingManageForm.houseId.trim()+"小区"+this.basicHousingManageForm.buildArchiveId.trim()+"号楼"+this.basicHousingManageForm.unit.trim()+"单元"+this.basicHousingManageForm.floor.trim()+this.basicHousingManageForm.doorNumber.trim(),
                          data.houseId = this.basicHousingManageForm.ownedHousing ,
                          updateTZhsqMerchantProfile(data).then(res => {
                            this.loading = false;
                            if (res && res.code == 200) {
                              this.closeModal(false);
                              this.$emit('handleSearch');
                              this.$Message.success('保存成功');
                            } else {
                              this.$Message.error(res.msg);
                            }
                          })
                        }else if(this.tableName == "basicSocialOrganization"){
                          let data = {};

                          data.id = this.BasicId;
                          data.address =this.basicHousingManageForm.houseGrid.trim()+this.basicHousingManageForm.house.trim()+this.basicHousingManageForm.buildArchive.trim()+"号楼"+this.basicHousingManageForm.unit.trim()+"单元"+this.basicHousingManageForm.floor.trim()+this.basicHousingManageForm.doorNumberName.trim(),
                          // data.address =this.basicHousingManageForm.houseGridId.trim()+this.basicHousingManageForm.houseId.trim()+"小区"+this.basicHousingManageForm.buildArchiveId.trim()+"号楼"+this.basicHousingManageForm.unit.trim()+"单元"+this.basicHousingManageForm.floor.trim()+this.basicHousingManageForm.doorNumber.trim(),
                          data.addressId = this.basicHousingManageForm.ownedHousing ,
                          updateBasicSocialOrganization(data).then(res => {
                            this.loading = false;
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
                    streetId: '',
                    communityId: '',
                    houseGridId: '',
                    houseGrid: '',
                    streetNumber: 0,
                    houseId: '',
                    houseName: '',
                    houseAddress: '',
                    hostName: '',
                    hostCard: '',
                    buildArchiveId: '',
                    buildArchiveName: '',
                    doorNumber: '',
                    unit: '',
                    floor: '',
                    //是否落户
                    isSettle: '',
                    //住房状态
                    rentStatus:''
                };
              this.communityData = [];
              this.gridData = [];
              this.houseName = [];
              this.buildArchives = [];
              this.unitData = [];
              this.floorData = [];
              this.doorNumberData = [];
            },
            getBasicHousingManageFormRule() {
                return {
                    unit: [
                        {required: true, message: '单元不能为空！', trigger: 'blur', pattern: /.+/},
                    ],
                    streetId: [
                        {required: true, message: '所属街道不能为空！', trigger: 'blur', pattern: /.+/},
                    ],
                    communityId: [
                        {required: true, message: '所属社区不能为空！', trigger: 'blur', pattern: /.+/},
                    ],
                    houseGridId: [
                        {required: true, message: '所属网格不能为空！', trigger: 'blur', pattern: /.+/},
                    ],
                    // houseName: [
                    //     {required: true, message: '小区名称不能为空！', trigger: 'blur'},
                    //     {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
                    // ],
                    doorNumber: [
                        {required: true, message: '门牌号不能为空！', trigger: 'blur', pattern: /.+/},
                    ],
                    buildArchiveId: [
                        {required: true, message: '楼栋不能为空！', trigger: 'blur', pattern: /.+/},
                    ],
                    // relationShip: [
                    //     {required: true, message: '与户主关系不能为空！', trigger: 'blur', pattern: /.+/},
                    // ],
                    houseId: [
                        {required: true, message: '小区名称不能为空！', trigger: 'blur', pattern: /.+/},
                    ],
                    floor: [
                        {required: true, message: '楼层不能为空！',type:"string", trigger: 'blur', pattern: /.+/},
                    ] ,
                    // rentStatus: [
                    //     {required: true, message: '住房状态不能为空！', trigger: 'blur', pattern: /.+/},
                    // ]
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
                this.editTitle = this.modalTitle;
                if(this.tableName == null || this.tableName.trim().length == 0){
                  this.$Message.error("未识别到父页面");
                }
                if (val) {
                    this.$refs['basicHousingManageForm'].resetFields();
                    // this.getBaicPersonById();
                } else {
                    this.closeModal(val);
                }
            }
        }
    }
</script>
