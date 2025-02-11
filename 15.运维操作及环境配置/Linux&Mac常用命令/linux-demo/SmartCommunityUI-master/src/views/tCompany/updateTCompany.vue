<style scoped lang="less">
  .tCompany {
    .ivu-form-label-left .ivu-form-item-label {
      text-align: right;
    }
    .mapcontainer {
      position: fixed;
      z-index: 999;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .closeBtn {
      position: absolute;
      top: -12px;
      right: -10px;
      font-size: 20px;
      color: #fff;
      width: 20px;
      height: 20px;
      line-height: 20px;
      text-align: center;
      border-radius: 50%;
      background-color: #303833;
    }
    .closeBtn:active {
      background-color: #7f8a83;
    }
  }

</style>
<template>
  <Modal v-model="show" :title="editTitle" fullscreen :mask-closable="false" class="tCompany">
      <Form ref="tCompanyForm" :model="tCompanyForm" :rules="tCompanyFormRule" inline
          :label-width=120 :disabled="showDisable" style="text-align: justify;">

        <FormItem label="企业名" prop="companyName">
          <Input v-model="tCompanyForm.companyName" type="text" :maxlength=50 placeholder="请输入企业名"/>
        </FormItem>
        <FormItem label="xyz坐标" prop="positionNum">
          <Input v-model="tCompanyForm.positionNum" type="text" :maxlength=50 placeholder="请输入xyz坐标"
                 style="width:185px !important;" icon="md-map" @on-click="checkMap"/>
        </FormItem>

        <FormItem label="地理位置" prop="positionChar">
          <Input v-model="tCompanyForm.positionChar" type="text" :maxlength=100 placeholder="请输入地理位置"/>
        </FormItem>

        <FormItem label="企业性质" prop="companyNature">
          <Input v-model="tCompanyForm.companyNature" type="text" :maxlength=50 placeholder="请输入企业性质"/>
        </FormItem>

        <FormItem label="企业联系电话" prop="companyPhone">
          <Input v-model="tCompanyForm.companyPhone" type="text" :maxlength=50 placeholder="请输入企业联系电话"/>
        </FormItem>

        <FormItem label="行业类别" prop="companyIndustry">
          <Select v-model="tCompanyForm.industryType" placeholder="请选择行业类别" clearable style="width: 185px;"
                  v-bind:disabled="showDisable">
            <Option v-for="(item, i) in industryType" :key="item.value" :value="item.label">{{item.label}}
            </Option>
          </Select>
        </FormItem>
        <FormItem label="企业负责人" prop="responsible">
          <Input v-model="tCompanyForm.responsible" type="text" :maxlength=50 placeholder="请输入企业责任人"/>
        </FormItem>

        <FormItem label="营业执照" prop="businessLicence">
          <Input v-model="tCompanyForm.businessLicence" type="text" :maxlength=50 placeholder="请输入营业执照"/>
        </FormItem>
        <FormItem label="组织机构代码" prop="orgCode">
          <Input v-model="tCompanyForm.orgCode" type="text" :maxlength=50 placeholder="请输入组织机构代码"/>
        </FormItem>
        <FormItem label="成立日期" prop="foundDate">
          <DatePicker
            v-model="tCompanyForm.foundDate"
            type="date"
            format="yyyy-MM-dd"
            placeholder="请选择"
            style="width:185px !important;"
          ></DatePicker>


        </FormItem>
        <FormItem label="注册地址" prop="registryAddress">
          <Input v-model="tCompanyForm.registryAddress" type="text" :maxlength=50 placeholder="请输入注册地址"/>
        </FormItem>

        <FormItem label="企业隶属关系" prop="enterpriseRelation">
          <Select v-model="tCompanyForm.enterpriseRelation" placeholder="请选择" clearable style="width: 185px;"
                  v-bind:disabled="showDisable">
            <Option v-for="(item, i) in enterpriseRelation" :key="item.value" :value="item.label">{{item.label}}
            </Option>
          </Select>
        </FormItem>
        <FormItem label="注册登记类型" prop="registryType">
          <Select v-model="tCompanyForm.registryType" placeholder="请选择" clearable style="width: 185px;"
                  v-bind:disabled="showDisable">
            <Option v-for="(item, i) in registryType" :key="item.value" :value="item.label">{{item.label}}
            </Option>
          </Select>
        </FormItem>
        <FormItem label="邮政编码" prop="postCode">
        <Input v-model="tCompanyForm.postCode" type="text" :maxlength=50 placeholder="请输入邮政编码"/>
        </FormItem>
        <FormItem label="企业规模" prop="enterpriseScale">
          <Select v-model="tCompanyForm.enterpriseScale" placeholder="请选择" clearable style="width: 185px;"
                  v-bind:disabled="showDisable">
            <Option v-for="(item, i) in enterpriseScale" :key="item.value" :value="item.label">{{item.label}}
            </Option>
          </Select>
        </FormItem>
        <FormItem label="四上企业分类" prop="fourEnterprise">
          <Select v-model="tCompanyForm.fourEnterprise" placeholder="请选择" clearable style="width: 185px;"
                  v-bind:disabled="showDisable">
            <Option v-for="(item, i) in fourEnterprise" :key="item.value" :value="item.label">{{item.label}}
            </Option>
          </Select>
        </FormItem>
        <FormItem label="上年末从业人数" prop="peopleEngagedLastYear">
          <Input type="number" :maxlength=50 v-model="tCompanyForm.peopleEngagedLastYear" placeholder="请输入上年末从业人数"/>
        </FormItem>
        <FormItem label="上年营业收入(万元)" prop="incomLastYear">
          <Input v-model="tCompanyForm.incomLastYear" type="text" :maxlength=50 placeholder="请输入上年营业收入(万元)"/>
        </FormItem>
        <FormItem label="资产总额(万元)" prop="totalAssets">
          <Input v-model="tCompanyForm.totalAssets" type="text" :maxlength=50 placeholder="请输入资产总额(万元)"/>
        </FormItem>
        <FormItem label="经营地址" prop="businessAddress">
          <Input v-model="tCompanyForm.businessAddress" type="text" :maxlength=50 placeholder="请输入经营地址"/>
        </FormItem>
        <FormItem label="经营范围" prop="businessScope">
          <Select v-model="tCompanyForm.businessScope" placeholder="请选择" clearable style="width: 185px;"
                  v-bind:disabled="showDisable">
            <Option v-for="(item, i) in businessScope" :key="item.value" :value="item.label">{{item.label}}
            </Option>
          </Select>
        </FormItem>
        <FormItem label="重点监管级别" prop="keyRegulatoryLevel">
          <Input v-model="tCompanyForm.keyRegulatoryLevel" type="text" :maxlength=50 placeholder="请输入重点监管级别"/>
        </FormItem>
        <FormItem label="营业状态" prop="businessStatus">
          <Select v-model="tCompanyForm.businessStatus" placeholder="请选择" clearable style="width: 185px;"
                  v-bind:disabled="showDisable">
            <Option v-for="(item, i) in businessStatus" :key="item.value" :value="item.label">{{item.label}}
            </Option>
          </Select>
        </FormItem>
        <FormItem label="上级企业名称" prop="upEnterprisName">
          <Input v-model="tCompanyForm.upEnterprisName" type="text" :maxlength=50 placeholder="请输入上级企业名称"/>
        </FormItem>
        <FormItem label="上级企业组织机构代码" prop="upOrgCode">
          <Input v-model="tCompanyForm.upOrgCode" type="text" :maxlength=50 placeholder="请输入上级企业组织机构代码"/>
        </FormItem>
        <FormItem label="填报人" prop="reporter">
          <Input v-model="tCompanyForm.reporter" type="text" :maxlength=50 placeholder="请输入填报人"/>
        </FormItem>

        <FormItem label="安全监管主管机构" prop="safetySupervisionUthority">
          <Input v-model="tCompanyForm.safetySupervisionUthority" type="text" :maxlength=50 placeholder="请输入安全监管主管机构"/>
        </FormItem>

        <FormItem label="本单位安全生产管理机构" prop="unitSafetyManage">
          <Input v-model="tCompanyForm.unitSafetyManage" type="text" :maxlength=50 placeholder="请输入本单位安全生产管理机构"/>
        </FormItem>

        <FormItem label="专职安全管理人数" prop="safetyPersonNum">
          <Input type="number" :maxlength=50 v-model="tCompanyForm.safetyPersonNum" placeholder="请输入专职安全管理人数"/>
        </FormItem>

        <FormItem label="安全专业技术人数" prop="safetyTecNum">
          <Input v-model="tCompanyForm.safetyTecNum" type="text" :maxlength=50 placeholder="请输入安全专业技术人数"/>
        </FormItem>

        <FormItem label="单位主要负责人" prop="unitResponsePerson">
          <Input v-model="tCompanyForm.unitResponsePerson" type="text" :maxlength=50 placeholder="请输入单位主要负责人"/>
        </FormItem>

        <FormItem label="主要负责人联系方式" prop="responsePersonMobile">
          <Input v-model="tCompanyForm.responsePersonMobile" type="text" :maxlength=50 placeholder="请输入主要负责人联系方式"/>
        </FormItem>

        <FormItem label="分管安全负责人" prop="chargeSafetyPerson">
          <Input v-model="tCompanyForm.chargeSafetyPerson" type="text" :maxlength=50 placeholder="请输入分管安全负责人"/>
        </FormItem>

        <FormItem label="分管安全负责人联系方式" prop="safetyPersonMobile">
          <Input v-model="tCompanyForm.safetyPersonMobile" type="text" :maxlength=50 placeholder="请输入分管安全负责人联系方式"/>
        </FormItem>

        <FormItem label="安全管理机构负责人" prop="safetyManageResponser">
          <Input v-model="tCompanyForm.safetyManageResponser" type="text" :maxlength=50 placeholder="请输入安全管理机构负责人"/>
        </FormItem>

        <FormItem label="安全管理机构负责人联系方式" prop="manageResponserMobile" >
          <Input v-model="tCompanyForm.manageResponserMobile" type="text" :maxlength=50 placeholder="请输入安全管理机构负责人联系方式"/>
        </FormItem>

        <FormItem label="备 注" prop="remark" style="margin-left: 70px;">
          <Input v-model="tCompanyForm.remark" type="text" :maxlength=50 placeholder="请输入备注"/>
        </FormItem>
    </Form>
    <div slot="footer">
      <Button type="text" @click="show=false">取消</Button>
      <Button type="primary" :loading="loading" @click="handelSubmit" v-if="!showDisable">提交</Button>
    </div>

    <!-- 地图弹窗 -->
    <div id="centerDiv" class="mapcontainer" :style="{width:width,height: height}" v-show="mapShow">
      <Map :url="configUrl" :widgetUrl="widgetUrl" @onload="onMapload"/>
      <span class="closeBtn" @click="closeMap">×</span>
    </div>
  </Modal>

</template>
<script>
    import {addTCompany, updateTCompany, getTCompany} from '@/api/tCompany/tCompany'
    import {getDictDataByType} from '@/api/index';
    import Map from "../../components/mars-map/Main.vue";// 地图组件
    import { formartDate } from "@/api/tools/tool";

    export default {
        name: 'UpdateTCompany',
        components: {
            Map
        },
        props: {
            value: {
                type: Boolean,
                default: false
            },
            TCompanyId: {
                type: String
            },
            modalTitle: {
                type: String
            },
        },
        data() {
            return {
                industryType:[],
                enterpriseRelation:[],
                registryType:[],
                businessScope:[],
                fourEnterprise:[],
                enterpriseScale:[],
                businessStatus:[],
                show: this.value,
                editTitle: this.modalTitle,
                loading: true,
                tCompanyForm: {
                    companyName: '',
                    positionNum: '',
                    positionChar: '',
                    companyNature: '',
                    companyPhone: '',
                    responsible: '',
                    businessLicence:'',
                    orgCode:'',
                    foundDate:'',
                    registryAddress:'',
                    enterpriseRelation:'',
                    registryType:'',
                    enterpriseScale:'',
                    fourEnterprise:'',
                    postCode:'',
                    peopleEngagedLastYear:'',
                    incomLastYear:'',
                    industryType:'',
                    businessAddress:'',
                    businessScope:'',
                    keyRegulatoryLevel:'',
                    businessStatus:'',
                    upEnterprisName:'',
                    upOrgCode:'',
                    reporter:'',
                    remark:'',
                    safetySupervisionUthority:'',
                    safetyPersonNum:'',
                    safetyTecNum:'',
                    unitResponsePerson:'',
                    responsePersonMobile:'',
                    chargeSafetyPerson:'',
                    safetyPersonMobile:'',
                    safetyManageResponser:'',
                    manageResponserMobile:''
                },
                tCompanyFormRule: this.getTCompanyFormRule(),
                configUrl: "../config/config.json",
                widgetUrl: "../config/widgetRiskSources.json",
                height: '',//地图弹窗的高
                width: '',
                mapShow: false,//显示地图
                pointArr: [],
                showDisable: false,//禁用输入框
            }
        },
        methods: {
            getDictData(){
                //行业类别
                getDictDataByType("industry_type",{}).then(res=>{
                    if (res && res.success) {
                        this.industryType = res.data;
                    }
                });
                getDictDataByType("enterprise_belongs",{}).then(res=>{
                    if (res && res.success) {
                        this.enterpriseRelation = res.data;
                    }
                });
                getDictDataByType("registry_type",{}).then(res=>{
                    if (res && res.success) {
                        this.registryType = res.data;
                    }
                });
                getDictDataByType("business_scope",{}).then(res=>{
                    if (res && res.success) {
                        this.businessScope = res.data;
                    }
                });
                getDictDataByType("four_enterprise",{}).then(res=>{
                    if (res && res.success) {
                        this.fourEnterprise = res.data;
                    }
                });
                getDictDataByType("enterprise_scale",{}).then(res=>{
                    if (res && res.success) {
                        this.enterpriseScale = res.data;
                    }
                });
                getDictDataByType("business_status",{}).then(res=>{
                    if (res && res.success) {
                        this.businessStatus = res.data;
                    }
                });
            },
            getTCompanyFormRule() {
                return {
                    foundDate: [
                        {required: true,type:'date', message: '预案制定日期不能为空！', trigger: 'blur'}
                    ],
                    companyName: [
                        {required: true, message: '企业名不能为空！', trigger: 'blur'},
                        {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
                    ],
                    positionNum: [
                        {required: true, message: 'xyz坐标不能为空！', trigger: 'blur'},
                        {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
                    ],
                    positionChar: [
                        {required: true, message: '地理位置不能为空！', trigger: 'change'},
                        {type: 'string', max: 100, message: '数据的最大长度为100！', trigger: 'change'}
                    ],
                    companyNature: [
                        {required: true, message: '企业的性质不能为空！', trigger: 'blur'},
                        {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
                    ],
                    companyPhone: [
                        {required: true, message: '企业联系电话不能为空！', trigger: 'blur'},
                        {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
                    ],
                    industryType: [
                        {required: true, message: '企业所属行业不能为空！', trigger: 'blur'},
                        {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
                    ],
                    responsible: [
                        {required: true, message: '企业责任人不能为空！', trigger: 'blur'},
                        {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
                    ],
                    businessLicence:[
                        {required: true, message: '營業執照不能为空！', trigger: 'blur'},
                        {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
                    ],
                    orgCode:[
                        {required: true, message: '组织机构代码不能为空！', trigger: 'blur'},
                        {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
                    ],
                    registryAddress:[
                        {required: true, message: '注册地址不能为空！', trigger: 'blur'},
                        {type: 'string', max: 150, message: '数据的最大长度为150！', trigger: 'blur'}
                    ],
                    enterpriseRelation:[
                        {required: true, message: '企业隶属关系不能为空！', trigger: 'blur'},
                        {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
                    ],
                    registryType:[
                        {required: true, message: '注册登记类型不能为空！', trigger: 'blur'},
                        {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
                    ],
                    enterpriseScale:[
                        {required: true, message: '企业规模不能为空！', trigger: 'blur'},
                        {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
                    ],
                    fourEnterprise:[
                        {required: true, message: '四上企业分类不能为空！', trigger: 'blur'},
                        {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
                    ],
                    postCode:[
                        {required: true, message: '邮政编码不能为空！', trigger: 'blur'},
                        {type: 'string', max: 20, message: '数据的最大长度为20！', trigger: 'blur'}
                    ],
                    peopleEngagedLastYear:[
                        {required: true, message: '上年末从业人数不能为空！', trigger: 'blur'}
                    ],
                    businessAddress:[
                        {required: true, message: '经营地址不能为空！', trigger: 'blur'},
                        {type: 'string', max: 150, message: '数据的最大长度为150！', trigger: 'blur'}
                    ],
                    businessScope:[
                        {required: true, message: '经营范围不能为空！', trigger: 'blur'},
                        {type: 'string', max: 150, message: '数据的最大长度为150！', trigger: 'blur'}
                    ],
                    businessStatus:[
                        {required: true, message: '经营状态不能为空！', trigger: 'blur'},
                        {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
                    ],
                    reporter:[
                        {required: true, message: '填报人不能为空！', trigger: 'blur'},
                        {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
                    ],
                    remark:[
                        {type: 'string', max: 500, message: '数据的最大长度为500！', trigger: 'blur'}
                    ],
                    safetySupervisionUthority:[
                        {required: true, message: '填报人不能为空！', trigger: 'blur'},
                        {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
                    ],
                    unitResponsePerson:[
                        {required: true, message: '主要负责人不能为空！', trigger: 'blur'}
                    ],
                    responsePersonMobile:[
                        {required: true, message: '负责人联系方式不能为空！', trigger: 'blur'}
                    ],
                    chargeSafetyPerson:[
                        {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
                    ],
                    safetyPersonMobile:[
                        {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
                    ],
                    safetyManageResponser:[
                        {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
                    ],
                    manageResponserMobile:[
                        {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
                    ]
                }
            },
            handelSubmit() {
                this.loading = true;
                this.$refs['tCompanyForm'].validate((valid) => {
                    if (valid) {
                        if (this.TCompanyId != null && this.TCompanyId.trim().length > 0) {
                            this.tCompanyForm.id = this.TCompanyId;
                            this.tCompanyForm.foundDate =  formartDate(this.tCompanyForm.foundDate,'yyyy-MM-dd HH:mm:ss');
                            updateTCompany(this.tCompanyForm).then(res => {
                                this.loading = false;
                                if (res && res.code == 200) {
                                    this.closeModal(false);
                                    this.$emit('handleSearch');
                                    this.$Message.success('保存成功');
                                } else {
                                    this.$Message.error(res.message);
                                }
                            })
                        } else {
                            addTCompany(this.tCompanyForm).then(res => {
                                this.loading = false;
                                if (res && res.code == 200) {
                                    this.closeModal(false);
                                    this.$emit('handleSearch');
                                    this.$Message.success('保存成功');
                                } else {
                                    this.closeModal(false);
                                    this.$Message.error(res.message);
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
                this.initForm();
                this.$emit('input', val);
            },
            initForm() {
                this.tCompanyForm = {
                    companyName: '',
                    positionNum: '',
                    positionChar: '',
                    companyNature: '',
                    companyPhone: '',
                    responsible: '',
                    businessLicence:'',
                    orgCode:'',
                    foundDate:'',
                    registryAddress:'',
                    enterpriseRelation:'',
                    registryType:'',
                    enterpriseScale:'',
                    fourEnterprise:'',
                    postCode:'',
                    peopleEngagedLastYear:'',
                    incomLastYear:'',
                    industryType:'',
                    businessAddress:'',
                    businessScope:'',
                    keyRegulatoryLevel:'',
                    businessStatus:'',
                    upEnterprisName:'',
                    upOrgCode:'',
                    reporter:'',
                    remark:'',
                    safetySupervisionUthority:'',
                    safetyPersonNum:'',
                    safetyTecNum:'',
                    unitResponsePerson:'',
                    responsePersonMobile:'',
                    chargeSafetyPerson:'',
                    safetyPersonMobile:'',
                    safetyManageResponser:'',
                    manageResponserMobile:''
                };
            },
            closeMap() {
                this.mapShow = false;
            },
            //地图构造完成回调
            onMapload(viewer) {
                this.viewer = viewer;
                var _this = this;
                var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
                handler.setInputAction(function (movement) {
                    var ray = viewer.camera.getPickRay(movement.position);
                    var position = viewer.scene.globe.pick(ray, viewer.scene);
                    for (let i = 0; i < _this.pointArr.length; i++) {
                        viewer.entities.remove(_this.pointArr[i]);
                    }
                    _this.addEntieyPoint(position);

                }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
            },
            //添加实体
            addEntieyPoint(position) {
                let formatPositon = mars3d.point.formatPositon(position);
                let _this = this;
                var entitie = viewer.entities.add({
                    name: "",
                    position: position,
                    billboard: {
                        image: '../img/marker/mark3.png',
                        scale: 0.8,
                        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                        verticalOrigin: Cesium.VerticalOrigin.CENTER,
                        heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND
                    },
                    tooltip: {
                        html: '<table style="width: 200px;">' +
                            '   <tr>'
                            + '<th scope="col" colspan="4" style="text-align:center;font-size:15px;"></th></tr><tr>'
                            + '<td >经度：</td><td >' + formatPositon.x + '</td></tr><tr>'
                            + '<td >纬度：</td><td >' + formatPositon.y + '</td></tr><tr>'
                            + '<td >高层：</td><td >' + formatPositon.z + '</td></tr><tr>'
                            + ' </tr>' +
                            '</table>',
                        anchor: [0, -12],
                    },
                    click: function (entity) {//单击
                        _this.$Message.info("坐标信息已保存");
                        _this.tCompanyForm.positionNum = '[' + formatPositon.x + ',' + formatPositon.y + ',' + formatPositon.z + "]";
                    }
                });
                this.pointArr.push(entitie);
            },
            checkMap: function () {
                this.$Notice.open({
                    title: '提示',
                    desc: '单击地图选择点位，双击或再次点击图标保存点位信息'
                });
                for (let i = 0; i < this.pointArr.length; i++) {
                    this.viewer.entities.remove(this.pointArr[i]);
                }

                if (this.tCompanyForm.positionNum) {
                    let parse = JSON.parse(this.tCompanyForm.positionNum);
                    let lonlat2cartesian = mars3d.pointconvert.lonlat2cartesian(parse);
                    this.addEntieyPoint(lonlat2cartesian);
                }
                //打开地图
                this.mapShow = true;
            },
        },
        created() {
            this.height = Math.floor(document.body.scrollHeight * 0.95) + "px";
            this.width = Math.floor(document.body.scrollWidth * 0.95) + "px";
        },
        watch: {
            value(val) {
                this.show = val;
            },
            show(val) {
                this.loading = false;
                this.editTitle = this.modalTitle;
                console.log(this.editTitle);
                if (this.editTitle == "查看") {//禁用输入框
                    this.showDisable = true;
                } else {
                    this.showDisable = false;
                }
                if (val) {
                    this.$refs['tCompanyForm'].resetFields();
                    if (this.TCompanyId != null && this.TCompanyId.trim().length > 0) {
                        getTCompany({id: this.TCompanyId}).then(res => {
                            if (res && res.code == 200) {
                                this.tCompanyForm.companyName = res.data.companyName;
                                this.tCompanyForm.positionNum = res.data.positionNum;
                                this.tCompanyForm.positionChar = res.data.positionChar;
                                this.tCompanyForm.companyNature = res.data.companyNature;
                                this.tCompanyForm.companyPhone = res.data.companyPhone;
                                this.tCompanyForm.companyIndustry = res.data.companyIndustry;
                                this.tCompanyForm.responsible = res.data.responsible;
                                this.tCompanyForm.foundDate = formartDate(res.data.foundDate,'yyyy-MM-dd');
                                this.tCompanyForm.businessLicence = res.data.businessLicence;
                                this.tCompanyForm.orgCode = res.data.orgCode;
                                this.tCompanyForm.registryAddress = res.data.registryAddress;
                                this.tCompanyForm.industryType = res.data.industryType;
                                this.tCompanyForm.enterpriseRelation = res.data.enterpriseRelation;
                                this.tCompanyForm.registryType = res.data.registryType;
                                this.tCompanyForm.postCode = res.data.postCode;
                                this.tCompanyForm.enterpriseScale = res.data.enterpriseScale;
                                this.tCompanyForm.fourEnterprise = res.data.fourEnterprise;
                                this.tCompanyForm.peopleEngagedLastyear = res.data.peopleEngagedLastyear;
                                this.tCompanyForm.incomLastyear = res.data.incomLastyear;
                                this.tCompanyForm.totalAssets = res.data.totalAssets;
                                this.tCompanyForm.businessAddress = res.data.businessAddress;
                                this.tCompanyForm.businessScope = res.data.businessScope;
                                this.tCompanyForm.keyRegulatoryLevel = res.data.keyRegulatoryLevel;
                                this.tCompanyForm.businessStatus = res.data.businessStatus;
                                this.tCompanyForm.upenterpriseName = res.data.upenterpriseName;
                                this.tCompanyForm.upOrgCode = res.data.upOrgCode;
                                this.tCompanyForm.reporter = res.data.reporter;
                                this.tCompanyForm.remark = res.data.remark;
                                this.tCompanyForm.safetySupervisionUthority = res.data.safetySupervisionUthority;
                                this.tCompanyForm.unitSafetyManage = res.data.unitSafetyManage;
                                this.tCompanyForm.safetyPersonNum = res.data.safetyPersonNum;
                                this.tCompanyForm.safetyTecNum = res.data.safetyTecNum;
                                this.tCompanyForm.unitResponsePerson = res.data.unitResponsePerson;
                                this.tCompanyForm.responsePersonMobile = res.data.responsePersonMobile;
                                this.tCompanyForm.chargeSafetyPerson = res.data.chargeSafetyPerson;
                                this.tCompanyForm.safetyPersonMobile = res.data.safetyPersonMobile;
                                this.tCompanyForm.safetyManageResponser = res.data.safetyManageResponser;
                                this.tCompanyForm.manageResponserMobile = res.data.manageResponserMobile;
                            } else {
                                this.$Message.error(res.message);
                            }
                        });
                    }
                } else {
                    this.closeModal(val);
                }
            }
        },
        mounted() {
            this.getDictData();
        }
    }
</script>
