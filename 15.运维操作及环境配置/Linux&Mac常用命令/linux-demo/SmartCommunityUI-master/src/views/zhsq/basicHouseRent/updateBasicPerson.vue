<style lang="less" scoped>
  .basicPerson {
    .ivu-input {
      width: 180px;
    }

    .ivu-form-item-error-tip {
      left: 0px;
    }

    .ivu-form .ivu-form-item-label {
      width: 120px;
    }

    .ivu-select {
      width: 180px;
    }

    .ivu-input-wrapper {
      width: auto !important;
    }
    .ivu-table-tip {
      overflow-x: hidden !important;
    }
  }
</style>
<template>
  <Modal v-model="show" :title="editTitle" :draggable="false" :mask-closable="false" class="basicPerson" width="970">
    <Divider style="margin:0 auto;color:#2d8cf0;" orientation="left">基本信息</Divider>
    <Form ref="basicPersonForm" :model="basicPersonForm" :rules="basicPersonFormRule">
      <Row>
        <Col span="8">
          <FormItem label="姓名" prop="name">
            <Input type="text" :maxlength=50 v-model="basicPersonForm.name" placeholder="请输入姓名"/>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="性别" prop="sex">
            <RadioGroup v-model="basicPersonForm.sex">
              <Radio v-for="(item, i)  in sexData" :key="item.name" :value="item.name" :label="item.name"></Radio>
            </RadioGroup>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="出生日期" prop="birthDate">
            <DatePicker v-model="basicPersonForm.birthDate" type="date" placeholder="请选择" format="yyyy-MM-dd"
                        style="width: 180px"></DatePicker>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="8">
          <FormItem label="民族" prop="nation">
            <Select v-model="basicPersonForm.nation" placeholder="请选择" clearable>
              <Option v-for="(item, i) in nationData" :key="item.name" :value="item.label">{{item.label}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="身份证号" prop="cardId">
            <Input type="text" :maxlength=50 v-model="basicPersonForm.cardId" placeholder="请输入身份证号"/>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="人口类型" prop="personType">
            <Select v-model="basicPersonForm.personType" placeholder="请选择" clearable>
              <Option v-for="(item, i) in personTypeData" :key="item.name" :value="item.label">{{item.label}}</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="8">
          <FormItem label="政治面貌" prop="politicalFace">
            <Select v-model="basicPersonForm.politicalFace" placeholder="请选择" clearable>
              <Option v-for="(item, i) in politicalData" :key="item.name" :value="item.label">{{item.label}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="户籍地址" prop="residenceAddress">
            <Input type="text" :maxlength=50 v-model="basicPersonForm.residenceAddress" placeholder="请输入户籍地址"/>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="居住地址" prop="residentialAddress">
            <Input type="text" :maxlength=50 v-model="basicPersonForm.residentialAddress" placeholder="请输入居住地址"/>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="8">
          <FormItem label="是否特殊人群" prop="specialPopulation">
            <Select v-model="basicPersonForm.specialPopulation" placeholder="请选择" clearable>
              <Option v-for="(item, i) in specialPersonData" :key="item.name" :value="item.label">{{item.label}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="是否常驻网格" prop="residentGrid">
            <Select v-model="basicPersonForm.residentGrid" placeholder="请选择" clearable>
              <Option v-for="(item,index) in isOfternData" :key="item.name" :value="item.label">{{item.label}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="电话号码" prop="phone">
            <Input type="text" :maxlength=50 v-model="basicPersonForm.phone" placeholder="请输入电话号码"/>
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
    import {addBasicPerson, updateBasicPerson, getBasicPerson} from '@/api/zhsq/basicPerson/basicPerson'
    import {
        houseType,
        communityData,
        streetData,
        nationData,
        personTypeData,
        politicalData,
        specialPersonData,
        relationShipData,
        sexData, isOfternData
    } from '@/api/tools/zhsqSelectData'
    import {queryAllList} from "@/api/zhsq/basicGrids/basicGrids"
    import {queryAllList as housingAllList} from "@/api/zhsq/basicHousingEstate/basicHousingEstate"
    import {formartDate} from '@/api/tools/tool'

    export default {
        name: "updateBasicPerson",
        props: {
            value: {
                type: Boolean,
                default: false
            },
            // BasicPersonId: {
            //     type: String
            // },
            modalTitle: {
                type: String
            }
        },
        data() {
            return {
                customerPersonData:[],
                loading:true,
                data: [],
                houseTypeData: houseType,
                sexData: sexData,
                isOfternData: isOfternData,
                nationData: nationData,//民族
                personTypeData: personTypeData,
                politicalData: politicalData,
                streetData: streetData,
                communityData: communityData,
                gridData: [],
                housingData: [],
                specialPersonData: specialPersonData,
                relationShipData: relationShipData,
                show: this.value,
                editTitle: this.modalTitle,
                updateHouseData:[],
                basicPersonForm: {
                    name: '',
                    sex: '',
                    birthDate: '',
                    nation: '',
                    cardId: '',
                    personType: '',
                    politicalFace: '',
                    residenceAddress: '',
                    residentialAddress: '',
                    specialPopulation: '',
                    residentGrid: '',
                    phone:''
                },
                basicPersonFormRule: this.getBasicPersonFormRule(),
            }
        },
        methods: {
            housingChange(e) {
                if (e) {
                    this.loading = true;
                    let houseId = e.value;
                    if (this.housingData.length > 0) {
                        let newHouseData = this.housingData.filter(function (item, index) {
                            return item.id == houseId;
                        })
                        if (newHouseData) {
                            this.basicPersonForm.housingName = newHouseData.housingName;
                        }
                    }
                    this.loading = false;
                }
            },
            streetChange(e) {
                if (e) {
                    this.communityData = communityData.filter(function (item, index) {
                        return item.street == e;
                    })
                    if (this.communityData.length == 0) {
                        this.basicPersonForm.ownedCommunity = "";
                        this.communityData = [];
                        this.basicPersonForm.ownedGrid = '';
                        this.gridData = [];
                        this.basicPersonForm.ownedHousing = "";
                        this.housingData = [];
                    }
                }
            },
            communityChange(e) {
                if (e == undefined || e == null || e == "") {
                    return;
                } else {
                    if (e == "1") {
                        e = "";
                    }
                    let data = {};
                    if (e) data.communityId = e.replaceAll(/\s+/g, '');
                    queryAllList(data).then(res => {
                        if (res.data.length > 0) {
                            this.gridData = res.data;
                        } else {
                            this.basicPersonForm.ownedHousing = "";
                            this.housingData = [];
                            this.basicPersonForm.ownedGrid = '';
                            this.gridData = [];
                        }
                    });
                }
            },
            //網格
            gridChange(e) {
                if (e == undefined || e == null || e == "") {
                    return;
                } else {
                    if (e == "1") {
                        e = "";
                    }
                    let data = {}
                    if (e) {
                        this.basicPersonForm.bak1 = e.label;
                        data.grid = e.value
                    }
                    housingAllList(data).then(res => {
                        if (res.data.length > 0) {
                            this.housingData = res.data;
                        } else {
                            this.basicHousingManageForm.ownedHousing = "";
                            this.housingData = [];
                        }
                    })
                }
            },
            handelSubmit() {
                this.$refs['basicPersonForm'].validate((valid) => {
                    if (valid) {
                        this.basicPersonForm.birthDate = formartDate(this.basicPersonForm.birthDate, 'yyyy-MM-dd HH:mm:ss');
                        let personJson = JSON.stringify(this.basicPersonForm);
                        this.$emit("loadCustomerPerson",personJson);
                        this.closeModal(false);
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
                this.basicPersonForm = {
                    name: '',
                    sex: '',
                    birthDate: '',
                    nation: '',
                    cardId: '',
                    personType: '',
                    politicalFace: '',
                    residenceAddress: '',
                    residentialAddress: '',
                    specialPopulation: '',
                    residentGrid: '',
                    phone:''
                };
            },
            getBasicPersonFormRule() {
                return {
                    name: [
                        {required: true, message: '姓名不能为空！', trigger: 'blur'},
                        {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
                    ],
                    sex: [
                        {required: true, message: '性别不能为空！', trigger: 'blur'},
                        {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
                    ],
                    birthDate: [
                        {required: true, message: '出生日期不能为空！', trigger: 'blur', type: 'date'}
                    ],
                    nation: [
                        {required: true, message: '民族不能为空！', trigger: 'blur', pattern: /.+/},
                    ],
                    cardId: [
                        {required: true, message: '身份证号不能为空！', trigger: 'blur'},
                        {
                            pattern: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
                            message: '身份证号不正确',
                            trigger: 'blur'
                        }
                    ],
                    personType: [
                        {required: true, message: '人口类型不能为空！', trigger: 'blur', pattern: /.+/},
                    ],
                    politicalFace: [
                        {required: true, message: '政治面貌不能为空！', trigger: 'blur', pattern: /.+/},
                    ],
                    residenceAddress: [
                        {required: true, message: '户籍地址不能为空！', trigger: 'blur'},
                        {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
                    ],
                    residentialAddress: [
                        {required: true, message: '居住地址不能为空！', trigger: 'blur'},
                        {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
                    ],
                    specialPopulation: [
                        {required: true, message: '是否特殊人群！', trigger: 'blur', pattern: /.+/},
                    ],
                    residentGrid: [
                        {required: true, message: '是否常驻网格不能为空！', trigger: 'blur', pattern: /.+/},
                    ],
                    phone: [
                        {required: true, message: '电话号码不能为空！', trigger: 'blur', pattern: /.+/},
                        { pattern: /^1[3456789]\d{9}$/, message: '手机号码格式不正确', trigger: 'blur' }
                    ]
                }
            }
        },
        watch: {
            value(val) {
                this.show = val;
            },
            show(val) {
                this.data = [];
                this.initForm();
                this.loading = false;
                this.editTitle = this.modalTitle;
                this.streetData = streetData;
                this.houseType = houseType;

                if (this.editTitle.indexOf("编辑")>-1) {
                    this.communityData = communityData;
                    this.communityChange("1");
                    this.gridChange("1");
                } else {
                    this.communityData = [];
                    this.gridData = [];
                }
                if (val) {
                    this.$refs['basicPersonForm'].resetFields();
                    if (this.BasicPersonId != null && this.BasicPersonId.trim().length > 0) {

                        //获取人员档案信息
                        getBasicPerson({id: this.BasicPersonId}).then(res => {
                            if (res && res.code == 200) {
                                this.basicPersonForm.name = res.data.name;
                                this.basicPersonForm.sex = res.data.sex;
                                this.basicPersonForm.birthDate = formartDate(res.data.birthDate, 'yyyy-MM-dd');
                                this.basicPersonForm.nation = res.data.nation;
                                this.basicPersonForm.cardId = res.data.cardId;
                                this.basicPersonForm.personType = res.data.personType;
                                this.basicPersonForm.politicalFace = res.data.politicalFace;
                                this.basicPersonForm.residenceAddress = res.data.residenceAddress;
                                this.basicPersonForm.residentialAddress = res.data.residentialAddress;
                                this.basicPersonForm.specialPopulation = res.data.specialPopulation;
                                this.basicPersonForm.residentGrid = res.data.residentGrid;
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
