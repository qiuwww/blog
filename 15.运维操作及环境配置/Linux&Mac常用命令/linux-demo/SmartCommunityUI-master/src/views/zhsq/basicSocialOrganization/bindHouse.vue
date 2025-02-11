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

    .ivu-form-item {
      margin-bottom: 24px !important;
    }

    .ivu-input-wrapper {
      width: auto !important;
    }
  }
</style>
<template>
  <Modal v-model="show" :title="editTitle" :mask-closable="false" class="basicHousingManage" width="970">
    <Form ref="basicHousingManageForm" :model="basicHousingManageForm" :rules="basicHousingManageFormRule">
      <Row>
        <Col span="8">
          <FormItem label="所属街道" prop="houseStreet">
            <Select v-model="basicHousingManageForm.houseStreet" placeholder="请选择" clearable @on-change="streetChange">
              <Option v-for="(item, i) in streetData" :key="item.name" :value="item.name">{{item.label}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="所属社区" prop="houseCommunity">
            <Select v-model="basicHousingManageForm.houseCommunity" placeholder="请选择" clearable
                    @on-change="communityChange">
              <Option v-for="(item, i)  in communityData" :key="item.name" :value="item.name">{{item.label}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="所属网格" prop="houseGridId">
            <Select v-model="basicHousingManageForm.houseGridId" placeholder="请选择" clearable label-in-value
                    @on-change="gridChange">
              <Option v-for="(item, i) in gridData" :key="item.id.toString()" :value="item.id.toString()">{{item.name}}</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="8">
          <FormItem label="小区名称" prop="houseId">
            <Select v-model="basicHousingManageForm.houseId" placeholder="请选择" label-in-value
                    @on-change="houseChange">
              <Option v-for="(item, i) in houseName" :key="item.id.toString()" :value="item.id.toString()">{{item.name}}</Option>
            </Select>
          </FormItem>
        </Col>

        <Col span="8">
          <FormItem label="楼栋" prop="buildArchiveId">
            <Select v-model="basicHousingManageForm.buildArchiveId" placeholder="请选择" label-in-value
                    @on-change="buildArchivesChange">
              <Option v-for="(item, i) in buildArchives" :key="item.id.toString()" :value="item.id.toString()">{{item.buildingName+"栋"}}</Option>
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
            <Select v-model="basicHousingManageForm.doorNumber" placeholder="请选择" label-in-value  @on-change="doorNumberChange">
              <Option v-for="(item, i)  in doorNumberData" :key="Math.random()" :value="item.id">{{item.doorNumber}}</Option>
            </Select>
          </FormItem>
        </Col>
        <!-- <Col span="8">
          <FormItem label="与户主关系" prop="relationShip">
            <Select v-model="basicHousingManageForm.relationShip" placeholder="请选择">
              <Option v-for="(item, i)  in relationShipData" :key="Math.random()" :value="item.name">
                {{item.label}}
              </Option>
            </Select>
          </FormItem>
        </Col> -->
      </Row>
     <!-- <Row>
      <Col span="24">
         <FormItem label="居住房屋" prop="homeAddress">
           <Input v-bind:disabled="disabled" type="text" :maxlength=50 style="width: 866px !important;" v-model="tZhsqVolunteerForm.homeAddress"
                    placeholder="请输入家庭住址"  />
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
        getBasicHousing,
        getUnits,
        getFloors,
        getDoorNumbers
    } from '@/api/zhsq/basicHouse/basicHouse'
    import {bindHouse} from '@/api/zhsq/basicPerson/basicPerson'
    import {
        addBasicSocialOrganization,
        updateBasicSocialOrganization,
        getBasicSocialOrganization
    } from '@/api/zhsq/basicSocialOrganization/basicSocialOrganization'
    // import {addTZhsqVolunteer, updateTZhsqVolunteer, getTZhsqVolunteer} from '@/api/zhsq/tZhsqVolunteer/tZhsqVolunteer';
    import {queryAllList as gridAllList} from "@/api/zhsq/basicHousingEstate/basicHousingEstate"
    import {queryTBuildingArchivesAll} from "@/api/zhsq/tBuildingArchives/tBuildingArchives"
    import {houseType, communityData, streetData, relationShipData} from '@/api/tools/zhsqSelectData'
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
                houseName: [],
                gridData: [],
                streetData: [],
                communityData: [],
                houseType: [],
                buildArchives: [],
                unitData: [],
                floorData: [],
                doorNumberData: [],
                relationShipData: relationShipData,
                basicHousingManageForm: {
                    doorNumberName:'',
                    relationShip:'',
                    houseStreet: '',
                    houseCommunity: '',
                    houseGridId: '',
                    houseGrid: '',
                    ownedHousing:'',
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
                    id:''
                },
                basicHousingManageFormRule: this.getBasicHousingManageFormRule(),
            }
        },
        mounted() {
            this.streetData = streetData;//街道数据
            this.houseType = houseType;//房屋类型
        },
        methods: {
            streetNumberChange(e) {
                let form = this.basicHousingManageForm;
                if (e) {
                    form.houseAddress = form.houseStreet.trim() + e + "号";
                    //清空后边项
                    form.buildArchiveName = "";
                    form.buildArchiveId = "";
                    form.unit = "";
                    form.floor = 0;
                    form.doorNumber = "";
                }
            },
            //楼栋改变加载单元
            buildArchivesChange(e) {
                if (e) {
                  this.basicHousingManageForm.buildArchiveName = e.label;
                  getUnits({buildArchiveId: e.value}).then(res => {
                      if (res && res.success) {
                          this.unitData = res.data;
                      }
                  });
                }
            },
            //单元改变加载楼层
            unitChange(e) {
                if (e) {
                    let data = {
                        buildArchiveId: this.basicHousingManageForm.buildArchiveId,
                        unit: e.value
                    };
                    getFloors(data).then(res => {
                        this.floorData = res.data;
                    });
                }
            },
            //楼层改变
            floorChange(e) {
                if (e) {

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
            //门牌号改变
            doorNumberChange(e) {
                if (e) {
                    this.basicHousingManageForm.doorNumberName = e.label;
                    let newData = this.doorNumberData.filter(function (item, index) {
                        return item.id = e.value;
                    });
                    this.basicHousingManageForm.hostName = newData[0].hostName;
                    this.basicHousingManageForm.hostCard = newData[0].hostCard;
                    this.basicHousingManageForm.ownedHousing = e.value;//房屋id
                    this.basicHousingManageForm.id = this.BasicId;
                }
            },
            //房屋
            houseChange(e) {
                if (e) {
                    let data = {buildingType: '1'};
                    if (e != "1") {
                        this.basicHousingManageForm.houseName = e.label;
                        this.basicHousingManageForm.houseId = e.value;
                        data.housingEstate = e.value;
                    }
                    queryTBuildingArchivesAll(data).then(res => {
                        if (res.data.length > 0) {
                            this.buildArchives = res.data;
                        } else {
                            //建筑
                            this.basicHousingManageForm.buildArchiveName = "";
                            this.basicHousingManageForm.buildArchiveId = "";
                            this.buildArchives = [];
                        }
                    })
                }
            },
            //網格
            gridChange(e) {
                let data = {}
                if (e) {
                    this.basicHousingManageForm.houseGridId = e.value;
                    this.basicHousingManageForm.houseGrid = e.label;
                    data.grid = e.value
                }
                gridAllList(data).then(res => {
                    if (res.data.length > 0) {
                        this.houseName = res.data;
                    } else {
                        this.basicHousingManageForm.houseName = "";
                        this.houseName = [];
                        //建筑
                        this.basicHousingManageForm.buildArchiveName = "";
                        this.basicHousingManageForm.buildArchiveId = "";
                        this.buildArchives = [];
                    }
                })
            },
            //社区
            communityChange(e) {
                let data = {};
                if (e) {
                    data.communityId = e.replaceAll(/\s+/g, '');
                }
                queryAllList(data).then(res => {
                    if (res.data.length > 0) {
                        this.gridData = res.data;
                    } else {
                        this.basicHousingManageForm.houseGrid = "";
                        this.gridData = [];
                        this.basicHousingManageForm.houseName = "";
                        this.houseName = [];
                        //建筑
                        this.basicHousingManageForm.buildArchiveName = "";
                        this.basicHousingManageForm.buildArchiveId = "";
                        this.buildArchives = [];
                    }
                });
            },
            //街道
            streetChange(e) {
                let form = this.basicHousingManageForm;
                if (e) {
                    form.houseAddress = e.trim();
                    //重置后边的地址
                    form.streetNumber = 0;
                    form.buildArchiveName = "";
                    form.buildArchiveId = "";
                    form.unit = "";
                    form.floor = 0;
                    form.doorNumber = "";

                    form.houseCommunity = '';
                    form.houseGrid = "";
                    form.houseName = "";
                    form.buildArchiveName = "";
                    form.buildArchiveId = "";
                    this.buildArchives = [];
                    this.communityData = [];
                    this.gridData = [];
                    this.houseName = [];

                    this.communityData = communityData.filter(function (item, index) {
                        return item.street == e.trim();
                    });
                }
            },
            //提交
            handelSubmit() {
                this.$refs['basicHousingManageForm'].validate((valid) => {
                    if (valid) {
                        if(this . tableName == "basicSocialOrganization"){
                          let data = {};

                          data.id = this.BasicId;
                          data.address =this.basicHousingManageForm.houseGrid.trim()+this.basicHousingManageForm.houseName.trim()+"小区"+this.basicHousingManageForm.buildArchiveName.trim()+"号楼"+this.basicHousingManageForm.unit.trim()+"单元"+this.basicHousingManageForm.floor.trim()+this.basicHousingManageForm.doorNumberName.trim(),
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
                    doorNumberName:'',
                    unit: '',
                    floor: 0
                };
            },
            getBasicHousingManageFormRule() {
                return {
                    streetNumber: [
                        {
                            required: true, type: 'number', message: '街道号不能为空！', trigger: 'blur', transfer(value) {
                                return Number(value)
                            }
                        },
                    ],
                    unit: [
                        {required: true, message: '单元不能为空！', trigger: 'blur', pattern: /.+/},
                    ],
                    houseStreet: [
                        {required: true, message: '所属街道不能为空！', trigger: 'blur', pattern: /.+/},
                    ],
                    houseCommunity: [
                        {required: true, message: '所属社区不能为空！', trigger: 'blur', pattern: /.+/},
                    ],
                    houseGridId: [
                        {required: true, message: '所属网格不能为空！', trigger: 'blur', pattern: /.+/},
                    ],
                    houseName: [
                        {required: true, message: '小区名称不能为空！', trigger: 'blur'},
                        {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
                    ],

                    houseType: [
                        {required: true, message: '房屋类型不能为空！', trigger: 'blur', pattern: /.+/},
                    ],
                    doorNumber: [
                        {required: true, message: '门牌号不能为空！', trigger: 'blur', pattern: /.+/},
                    ],
                    buildArchiveId: [
                        {required: true, message: '楼栋不能为空！', trigger: 'blur', pattern: /.+/},
                    ],
                    // relationShip: [
                    //     {required: true, message: '与户主关系不能为空！', trigger: 'blur', pattern: /.+/},
                    // ],
                    houseId:[
                        {required: true, message: '小区名称不能为空！', trigger: 'blur', pattern: /.+/},
                    ],
                    floor:[
                        {required: true, message: '楼层不能为空！', trigger: 'blur', pattern: /.+/},
                    ]
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
                this.streetData = streetData;
                this.houseType = houseType;
                if(this.tableName == null || this.tableName.trim().length == 0){
                  this.$Message.error("未识别到父页面");
                }
                if (this.editTitle.indexOf("编辑") > -1) {
                    this.communityData = communityData;
                    this.communityChange();
                    this.gridChange();
                    this.houseChange('1');
                } else {
                    this.communityData = [];
                    this.gridData = [];
                }
                if (val) {
                    this.$refs['basicHousingManageForm'].resetFields();
                    if (this.BasicHousingManageId != null && this.BasicHousingManageId.trim().length > 0) {
                        getBasicHousing({id: this.BasicHousingManageId}).then(res => {
                            if (res && res.code == 200) {
                                this.basicHousingManageForm.houseStreet = res.data.houseStreet;
                                this.basicHousingManageForm.houseCommunity = res.data.houseCommunity;
                                this.basicHousingManageForm.houseGrid = res.data.houseGrid;
                                this.basicHousingManageForm.houseGridId = res.data.houseGridId;
                                this.basicHousingManageForm.streetNumber = res.data.streetNumber == "" ? res.data.streetNumber : parseInt(res.data.streetNumber)
                                this.basicHousingManageForm.houseName = res.data.houseName;
                                this.basicHousingManageForm.houseId = res.data.houseId;
                                this.basicHousingManageForm.buildArchiveId = res.data.buildArchiveId;
                                this.basicHousingManageForm.buildArchiveName = res.data.buildArchiveName;
                                this.basicHousingManageForm.unit = res.data.unit;
                                this.basicHousingManageForm.floor = res.data.floor == "" ? res.data.floor : parseInt(res.data.floor);
                                this.basicHousingManageForm.doorNumber = res.data.doorNumber;
                                this.basicHousingManageForm.hostName = res.data.hostName;
                                this.basicHousingManageForm.hostCard = res.data.hostCard;
                                this.basicHousingManageForm.houseType = res.data.houseType;
                                this.basicHousingManageForm.houseAddress = res.data.houseAddress;
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
