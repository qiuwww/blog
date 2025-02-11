<style lang="less" scoped>
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
  }
</style>
<template>
  <Modal v-model="show" :title="editTitle" :mask-closable="false" class="basicHousingManage" :draggable="false" width="970">
    <Form ref="basicHousingManageForm" :model="basicHousingManageForm" :rules="basicHousingManageFormRule">
      <Row>
        <Col span="8">
          <FormItem label="所属街道" prop="houseStreet">
            <Select v-model="basicHousingManageForm.houseStreet" placeholder="请选择" @on-change="streetChange"
                    label-in-value>
              <Option v-for="(item, i) in streetData" :key="item.name" :value="item.name">{{item.label}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="所属社区" prop="houseCommunity">
            <Select v-model="basicHousingManageForm.houseCommunity" placeholder="请选择" @on-change="communityChange"
                    label-in-value>
              <Option v-for="(item, i)  in communityData" :key="item.id" :value="item.id.toString()">{{item.name}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="所属网格" prop="houseGridId">
            <Select v-model="basicHousingManageForm.houseGridId" placeholder="请选择" @on-change="gridChange"
                    label-in-value>
              <Option v-for="(item, i) in gridData" :key="item.id.toString()" :value="item.id.toString()">{{item.name}}</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="8">
          <FormItem label="小区名称" prop="houseId">
            <Select v-model="basicHousingManageForm.houseId" placeholder="请选择" @on-change="houseChange" label-in-value>
              <Option v-for="(item, i) in houseName" :key="item.id" :value="item.id.toString()">{{item.name}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="楼栋" prop="buildArchiveId">
            <Select v-model="basicHousingManageForm.buildArchiveId" placeholder="请选择" @on-change="buildArchivesChange" label-in-value >
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
            <Select v-model="basicHousingManageForm.doorNumber" placeholder="请选择" label-in-value
                    @on-change="doorNumberChange">
              <Option v-for="(item, i)  in doorNumberData" :key="Math.random()" :value="item.id">{{item.doorNumber}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="租用状态" prop="rentStatus">
            <Select v-model="basicHousingManageForm.rentStatus" placeholder="请选择">
              <Option v-for="(item, i)  in rentStatusData" :key="Math.random()" :value="item.name">{{item.label}}</Option>
            </Select>
          </FormItem>
        </Col>

      </Row>
    </Form>
    <div slot="footer">
      <Button type="text" @click="show=false">取消</Button>
      <Button type="primary" :loading="loading" @click="handelSubmit">提交</Button>
    </div>
  </Modal>
</template>
<script>
    import {communityData, relationShipData, rentStatus} from '@/api/tools/zhsqSelectData'
    import {getBasicHousing, getUnits, getFloors, getDoorNumbers} from '@/api/zhsq/basicHouse/basicHouse'
    import {queryAllList as gridAllList} from "@/api/zhsq/basicHousingEstate/basicHousingEstate"
    import {queryTBuildingArchivesAll} from "@/api/zhsq/tBuildingArchives/tBuildingArchives"
    import {getDictionary, getStreet, getCommunity} from '@/api/index';
    import {queryAllList} from "@/api/zhsq/basicGrids/basicGrids"
    import {bindHouse} from '@/api/zhsq/basicPerson/basicPerson'


    export default {
        name: "updateBasicHousing",
        props: {
            value: {
                type: Boolean,
                default: false
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
                rentStatusData: rentStatus,
                relationShipData: relationShipData,
                basicHousingManageForm: {
                    relationShip: '',
                    houseStreet: '',
                    houseCommunity: '',
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
                    rentStatus: ''
                },
                basicHousingManageFormRule: this.getBasicHousingManageFormRule(),
            }
        },
        mounted() {
            this.getStreetData();
        },
        methods: {
            //获取街道
            getStreetData() {
                getStreet({}).then(res => {
                    if (res && res.success) {
                        this.streetData = res.data;
                    }
                })
            },
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
                    let newData = this.doorNumberData.filter(function (item, index) {
                        return item.id = e.value;
                    });
                    this.basicHousingManageForm.hostName = newData[0].hostName;
                    this.basicHousingManageForm.hostCard = newData[0].hostCard;
                    this.basicHousingManageForm.ownedHousing = e.value;//房屋id
                    this.basicHousingManageForm.id = this.BasicPersonId;
                }
            },
            houseChange(e) {
                if (e) {
                    queryTBuildingArchivesAll({housingEstate:e.value,buildingType: '1'}).then(res => {
                        if (res.data.records.length > 0) {
                            this.buildArchives = res.data.records;
                        } else {
                            //建筑
                            this.basicHousingManageForm.buildArchiveName = "";
                            this.basicHousingManageForm.buildArchiveId = "";
                            this.buildArchives = [];
                        }
                    })
                }
            },
            //网格
            gridChange(e) {
                if (e) {
                    gridAllList({gridId: e.value}).then(res => {
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
                }
            },
            //社区
            communityChange(e) {
                queryAllList({communityId: e.value}).then(res => {
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

                    getCommunity({streetId: e.value}).then(res => {
                        if (res && res.success) {
                            this.communityData = res.data;
                        }
                    })
                }
            },
            handelSubmit() {
                this.$refs['basicHousingManageForm'].validate((valid) => {
                    if (valid) {
                        bindHouse(this.basicHousingManageForm).then(res => {
                            if (res && res.code == 200) {
                                this.closeModal(false);
                                this.$emit('handleSearch');
                                this.$Message.success('绑定成功');
                            } else {
                                this.$Message.error(res.msg);
                            }
                        })
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
                    buildArchiveId: '',
                    buildArchiveName: '',
                    doorNumber: '',
                    unit: '',
                    floor: 0,
                    rentStatus: ''
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
                    doorNumber: [
                        {required: true, message: '门牌号不能为空！', trigger: 'blur', pattern: /.+/},
                    ],
                    buildArchiveId: [
                        {required: true, message: '楼栋不能为空！', trigger: 'blur', pattern: /.+/},
                    ],
                    rentStatus: [
                        {required: true, message: '租用状态不能为空！', trigger: 'blur', pattern: /.+/},
                    ],
                    houseId: [
                        {required: true, message: '小区名称不能为空！', trigger: 'blur', pattern: /.+/},
                    ],
                    floor: [
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
