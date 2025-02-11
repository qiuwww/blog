<style lang="less" scoped>
  .basicSocialOrganization {
    /* .noImg {
      width: 80px;
      border: 1px dashed rgb(204, 204, 204);
      margin-left: 20px;
      height: 100px;
      line-height: 93px;
      margin-top: 10px;
      text-align: center;
      color: #ccc;
      user-select: none;
    } */
  }
</style>
<template>
  <Modal v-model="show" :title="editTitle" :mask-closable="false" class="basicSocialOrganization" width="1000" z-index="2001">
    <Form ref="basicSocialOrganizationForm" :model="basicSocialOrganizationForm"
          :rules="basicSocialOrganizationFormRule" :label-width="130">
      <Divider orientation="left" style="color:#2d8cf0;">基本信息</Divider>
      <Row>
        <Col span="8">
          <Row>
            <FormItem label="社会组织类别" prop="type">
              <Select v-model="basicSocialOrganizationForm.type" label-in-value placeholder="请选择" clearable>
                <Option v-for="(item, i) in typePriority" :key="item.number" :value="item.number.toString()">{{item.name}}</Option>
              </Select>
            </FormItem>
          </Row>
          <Row>
            <FormItem label="法人代表" prop="legalPerson">
              <Input type="text" :maxlength=20
                     v-model="basicSocialOrganizationForm.legalPerson" placeholder="请输入法人"/>
            </FormItem>
          </Row>
          <Row>
            <FormItem label="统一社会信用代码" prop="orgCode">
              <Input type="text" :maxlength=50 v-model="basicSocialOrganizationForm.orgCode"
                     placeholder="请输入统一社会信用代码"/>
            </FormItem>
          </Row>
        </Col>
        <Col span="8">
          <Row>
            <FormItem label="社会组织名称" prop="name">
              <Input type="text" :maxlength=100 v-model="basicSocialOrganizationForm.name"
                     placeholder="请输入社会组织名称"/>
            </FormItem>
          </Row>
          <Row>
            <FormItem label="法人联系方式" prop="legalPhone">
              <Input type="text" :maxlength=50 v-model="basicSocialOrganizationForm.legalPhone"
                     placeholder="请输入法人联系方式"/>
            </FormItem>
          </Row>
          <Row>
            <FormItem label="法人身份证号" prop="legalCard">
              <Input type="text" :maxlength=50 v-model="basicSocialOrganizationForm.legalCard"
                     placeholder="请输入法人身份证号"/>
            </FormItem>
          </Row>
        </Col>
        <Col span="8">
          <FormItem label="图片" style="height: 85px ">
            <uploadHeaderImg v-model="basicSocialOrganizationForm.headPortrait" @uploadSuccess="onFileUploadSuccess" @uploadError="onFileUploadError" @removePath="onRemovePath" titleName="点击上传相关社会组织图片"/>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="8">
          <FormItem label="所属街道" prop="streetId">
            <Select v-model="basicSocialOrganizationForm.streetId" placeholder="请选择" label-in-value @on-change="onStreetChange">
              <Option v-for="(item, i) in streetIdPriority" :key="item.id" :value="item.id.toString()">{{item.name}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="所属社区" prop="communityId">
            <Select v-model="basicSocialOrganizationForm.communityId" placeholder="请选择" label-in-value @on-change="onCommunityChange">
              <Option v-for="(item, i) in communityIdPriority" :key="item.id" :value="item.id.toString()">{{item.name}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="所属网格" prop="gridsId">
            <Select v-model="basicSocialOrganizationForm.gridsId" placeholder="请选择" label-in-value @on-change="onGridsChange">
              <Option v-for="(item, i) in gridsIdPriority" :key="item.id" :value="item.id">{{item.name}}</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="8">
          <FormItem label="网格长" prop="gridPersonId">
            <Select v-model="basicSocialOrganizationForm.gridPersonId" placeholder="请选择" clearable
                    @on-change="onGridPersonChange" @on-clear="onGridPersonChange">
              <Option v-for="(item, i) in gridPersonPriority" :key="item.name" :value="item.id">{{item.name}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="商户类别" prop="merchantSort" v-if="basicSocialOrganizationForm.type=='1'">
            <Select v-model="basicSocialOrganizationForm.merchantSort" placeholder="请选择商户类别" clearable>
              <Option v-for="(item, i) in merchantSortPriority" :key="item.id.toString()"
                      :value="item.number.toString()">{{item.name}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="地图标注" prop="position">
            <Input type="text" :maxlength=50 v-model="basicSocialOrganizationForm.position" placeholder="请标注地图"
                   icon="md-map" :readonly="true" @on-click="checkMap"/>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="24"  v-if="basicSocialOrganizationForm.type=='1'">
          <FormItem label="经营范围" prop="businessScope">
            <Input type="textarea" :maxlength=500 v-model="basicSocialOrganizationForm.businessScope"
                   placeholder="请输入经营范围"/>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="24" >
<!--          <FormItem label="组织地址" prop="address">-->
<!--            <Input type="text" :maxlength=200 v-model="basicSocialOrganizationForm.address"-->
<!--                   placeholder="请输入组织地址"/>-->
<!--          </FormItem>-->
          <FormItem label="组织地址" prop="address">
            <addressTree v-on:dataSubmit="dataSubmit"></addressTree>
          </FormItem>
        </Col>
      </Row>
      <Divider orientation="left" style="color:#2d8cf0;">负责人信息</Divider>
      <Row>
        <Col span="8">
          <FormItem label="负责人姓名" prop="principalName">
            <Input type="text" :maxlength=50 v-model="basicSocialOrganizationForm.principalName"
                   placeholder="请输入负责人姓名"/>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="负责人联系方式" prop="principalPhone">
            <Input type="text"  v-model="basicSocialOrganizationForm.principalPhone" id="principalPhone"
                   placeholder="请输入负责人联系方式"/>
          </FormItem>
        </Col>

      </Row>
      <Divider orientation="left" style="color:#2d8cf0;">治安负责人信息</Divider>
      <Row>
        <Col span="8">
          <FormItem label="治安负责人" >
            <Select v-model="basicSocialOrganizationForm.policePrincipal" placeholder="请选择" @on-change="changPolicePrincipal"  transfer :label-in-value="true">
              <Option v-for="(item, i) in policePrincipalPriority" :key="item.id" :value="item.id" :tag="item.phone" :label="item.name">{{item.name}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="治安负责人电话" >
            <Input type="text" :maxlength=50 v-model="basicSocialOrganizationForm.policePrincipalPhone" disabled="disabled"
                   placeholder="请输入治安负责人电话"/>
          </FormItem>
        </Col>

      </Row>

    </Form>
    <div slot="footer">
      <Button type="text" @click="show=false">取消</Button>
      <Button type="primary" :loading="loading" @click="handelSubmit">提交</Button>
    </div>

    <plot v-model="ShowMap" modalTitle="选择坐标点" @resultPoint="getLocation" divId="updateBasicSocialOrganizationList"
          :objData="locationArr" iconPath="/img/archives/shanghu.png" :selectType="selectType"></plot>
  </Modal>
</template>
<script>
import {
    addBasicSocialOrganization,
    updateBasicSocialOrganization,
    getBasicSocialOrganization
  } from '@/api/zhsq/basicSocialOrganization/basicSocialOrganization'

  import {
    communityData,
    streetData,
    socialOrganizationTypeData,
    policePrincipalData
  } from '@/api/tools/zhsqSelectData'
  import { queryAllList } from '@/api/zhsq/basicGrids/basicGrids'
  import { nginxUrl } from '@/api/tools/tool'
  import plot from '@/views/gismap/components/plot'
  import leftSearchList from '@/views/gismap/components/leftSearchList'
  import {
    queryAllTZhsqGridMemberListByGridId,
    queryAllGridMemberListByGridId
  } from '@/api/zhsq/tZhsqGridMember/tZhsqGridMember'
  import { getCommunity, getDictionary, getStreet } from '../../../api'
  import uploadHeaderImg from '@/components/uploadHeaderImg'
  import addressTree from "@/views/zhsq/components/addressTree";
  export default {
    name: 'updateBasicSocialOrganization',
    components: {
      plot,
      leftSearchList,
      uploadHeaderImg,
      addressTree
    },
    props: {
      value: {
        type: Boolean,
        default: false
      },
      BasicSocialOrganizationId: {
        type: String
      },
      modalTitle: {
        type: String
      }
    },
    data() {
      return {
        merchantSortPriority: [],//商户类别子项
        imageUrlList: [],
        typePriority: [],
        communityIdPriority: [],
        gridsIdPriority: [],
        gridPersonPriority: [],
        policePrincipalPriority: [],
        streetIdPriority: [],
        gridPersonData: [],
        show: this.value,
        editTitle: this.modalTitle,
        loading: true,
        disabled: false,
        basicSocialOrganizationForm: {
          type: '',
          name: '',
          legalPerson: '',
          legalPhone: '',
          legalCard: '',
          streetId: '',
          streetName: '',
          communityId: '',
          communityName: '',
          gridsId: '',
          gridPersonId: '',
          gridPersonName: '',
          orgCode: '',
          headPortrait: '',
          position: '',
          businessScope:"",
          merchantSort: '',//商户类别
          address: '',//所需房屋
          addressId: '',//房屋id
          principalName: '',//负责人姓名
          principalPhone: '',//负责人联系方式
          policePrincipal: '',//治安负责人
          policePrincipalPhone: ''//治安负责人联系方式
        },
        basicSocialOrganizationFormRule: this.getBasicSocialOrganizationFormRule(),
        //头像是否被修改
        imageIsUpdate: false,
        ShowMap: false,
        locationArr: [],
        selectType: 'Point'
      }
    },
    methods: {
      //负责人联系方式验证规则
      validatePhone(rule, value, callback) {
        let dom = document.getElementById("principalPhone");
        let children = dom.childNodes;
        //因为浏览器会把dom节点下的空格 换行 文本都会当成一个元素
        for(let i=0;i<children.length;i++){
          if(children[i] && children[i].nodeName == 'INPUT'){
            this.basicSocialOrganizationForm.principalPhone = children[i].value;
            value = children[i].value;
          }
        }//这样我们可以选择我们想要的第几个子元素了 比如第二个元素  children[1]
        if (!value) {
          return callback(new Error('负责人联系方式不能为空'))
        } else if (/^[0-9]+$/.test(value) && value.length == 11) {
          callback()
        } else if (!/^1[3456789]\d{9}$/.test(value)) {
          callback('负责人联系方式格式不正确')
        } else {
          callback()
        }
      },
      getLocation(obj, type) {
        this.basicSocialOrganizationForm.position = JSON.stringify(obj.flatCoordinates)
      },
      getMerchantSortPriority() {//获取商户类别
        let _this = this;
        getDictionary({ 'fieldName': 'merchantSortData' }).then(res => {
          if (res && res.success) {
            _this.merchantSortPriority = res.data
          }
        })
      },
      checkMap() {
        if (this.basicSocialOrganizationForm.position) {
          this.locationArr = JSON.parse(this.basicSocialOrganizationForm.position)
        }
        this.ShowMap = true
      },
      handelSubmit() {
        this.$refs['basicSocialOrganizationForm'].validate((valid) => {
          this.loading = true
          if (valid) {
            if (this.BasicSocialOrganizationId != null && this.BasicSocialOrganizationId.trim().length > 0) {
              this.basicSocialOrganizationForm.id = this.BasicSocialOrganizationId
              if (this.imageIsUpdate) {
                //用于判断图片是否修改
                this.basicSocialOrganizationForm['imageIsUpdate'] = this.imageIsUpdate
              }
              updateBasicSocialOrganization(this.basicSocialOrganizationForm).then(res => {
                if (res && res.code == 200) {
                  this.closeModal(false)
                  this.$emit('handleSearch')
                  this.$Message.success('保存成功')
                } else {
                  this.$Message.error(res.msg)
                }
              }).finally(res => {
                this.loading = false
              })
            } else {
              addBasicSocialOrganization(this.basicSocialOrganizationForm).then(res => {
                if (res && res.code == 200) {
                  this.closeModal(false)
                  this.$emit('handleSearch')
                  this.$Message.success('保存成功')
                } else {
                  this.$Message.error(res.msg)
                }
              }).finally(res => {
                this.loading = false
              })
            }
          } else {
            this.loading = false
            this.$Message.error('表单验证不通过！')
          }
        })
      },
      closeModal(val) {
        this.$emit('input', val)
      },
      initForm() {
        this.imageUrlList = []
        this.imageIsUpdate = false
        this.basicSocialOrganizationForm = {
          addressId: '',
          type: '',
          name: '',
          address: '',
          legalPerson: '',
          legalPhone: '',
          legalCard: '',
          streetId: '',
          streetName: '',
          communityId: '',
          communityName: '',
          gridsId: '',
          gridPersonId: '',
          gridPersonName: '',
          orgCode: '',
          policePrincipal: '',
          headPortrait: '',
          position: '',
          merchantSort: '',
          businessScope:"",
        }
        this.locationArr = null

      },
      getBasicSocialOrganizationFormRule() {
        return {
          merchantSort: [
            { required: true, message: '商户类别不能为空！', trigger: 'changer' }
          ],
          businessScope: [
            { required: true, message: '经营范围不能为空！', trigger: 'blur' },
            { type: 'string', max: 50, message: '经营范围的最大长度为50！', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '社会组织类别不能为空！', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '社会组织名称不能为空！', trigger: 'blur' },
            { type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur' }
          ],
          // legalPerson: [
          //     {required: true, message: '法人不能为空！', trigger: 'blur'},
          //     {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
          // ],
          legalPhone: [
              {required: false, message: '法人联系方式不能为空！', trigger: 'blur'},
            {pattern: /^1[3456789]\d{9}$/, message: '法人联系方式格式不正确', trigger: 'blur'},
            {  max: 11, message: '数据的最大长度为11！', trigger: 'blur' }
          ],
          legalCard: [
              {required: false, message: '法人身份证不能为空！', trigger: 'blur'},
              {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'},
          {
              pattern: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
                  message: '法人身份证格式不正确',
              trigger: 'blur'
          }
          ],
          streetId: [
            { required: true, message: '所属街道不能为空！', trigger: 'blur', pattern: /.+/ }
          ],
          communityId: [
            { required: true, message: '所属社区不能为空！', trigger: 'blur', pattern: /.+/ }
          ],
          gridsId: [
            { required: true, message: '所属网格不能为空！', trigger: 'blur', pattern: /.+/ }
          ],
          gridPersonId: [
            { required: true, message: '网格长不能为空！', trigger: 'blur', pattern: /.+/ }
          ],
          // orgCode: [
          //     {required: true, message: '统一社会信用代码不能为空！', trigger: 'blur'},
          //     {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
          // ],
          policePrincipal: [
            { required: true, message: '负责人不能为空！', trigger: 'blur', pattern: /.+/ }
          ],
          policePrincipalPhone: [
            { required: true, message: '负责人联系方式不能为空！', trigger: 'blur', pattern: /.+/ },
            { pattern: /^[0-9]+$/, message: '请输入数字格式', trigger: 'blur' },
            { pattern: /^1[3456789]\d{9}$/, message: '手机号码格式不正确', trigger: 'blur' },
            { min:11, max: 11, message: '数据的长度为11！', trigger: 'blur' }
          ],
          principalName: [
            { required: true, message: '治安负责人不能为空！', trigger: 'blur', pattern: /.+/ },
            { type: 'string', max: 10, message: '数据的最大长度为10！', trigger: 'blur' }
          ],
          principalPhone: [
            { required: true, validator: this.validatePhone, trigger: 'blur' }
          ],
          address: [
            { required: true, message: '组织地址不能为空！', trigger: 'blur' },
            { type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur' }
          ]
        }
      },
      onStreetChange(e) {
        this.communityIdPriority = []
        if (e) {
          if (e.label) {
            this.basicSocialOrganizationForm.streetName = e.label
          }
          getCommunity({ streetId: e.value }).then(res => {
            if (res && res.success) {
              this.communityIdPriority = res.data
            }
          })
        }
        this.basicSocialOrganizationForm.communityId = ''
        this.gridsIdPriority = []
        this.gridPersonPriority = []
        this.basicSocialOrganizationForm.communityId = ''
        this.basicSocialOrganizationForm.gridsId = ''
        this.basicSocialOrganizationForm.gridPersonId = ''
        this.policePrincipalPriority = []
        this.basicSocialOrganizationForm.policePrincipal = ''

      },
      onCommunityChange(e) {
        this.gridsIdPriority = []
        if (e) {
          if(e.label){
            this.basicSocialOrganizationForm.communityName = e.label
          }
          queryAllList({ communityId: e.value }).then(res => {
            if (res && res.success) {
              for (let i = 0; i < res.data.length; i++) {
                this.gridsIdPriority.push({ id: res.data[i].id, name: res.data[i].name })
              }
            }
          })
        }
        this.gridPersonPriority = []
        this.basicSocialOrganizationForm.gridsId = ''
        this.basicSocialOrganizationForm.gridPersonId = ''
        this.policePrincipalPriority = []
        this.basicSocialOrganizationForm.policePrincipal = ''
      },
      onGridsChange(e) {
        if (e) {
          this.basicSocialOrganizationForm.gridsName = e.label
        }
        this.policePrincipalPriority = []
        this.gridPersonPriority = []
        if (e) {
          queryAllTZhsqGridMemberListByGridId({ gridId: e.value }).then(res => {
            if (res && res.success) {
              this.gridPersonPriority = res.data
            }
          })
          queryAllGridMemberListByGridId({ gridId: e.value }).then(res => {
            if (res && res.success ) {
              this.policePrincipalPriority = res.data
              let filter1 = this.policePrincipalPriority.filter(item => item.id == res.data.policePrincipal);
              if (filter1 && filter1.length > 0) {
                this.basicSocialOrganizationForm.policePrincipal = filter1[0].name;
                this.basicSocialOrganizationForm.policePrincipalPhone = res.data.policePrincipalPhone;

              }
              else {
                this.basicSocialOrganizationForm.policePrincipal = "";
                this.basicSocialOrganizationForm.policePrincipalPhone = "";
              }
            }
            else {
              this.basicSocialOrganizationForm.policePrincipal = "";
              this.basicSocialOrganizationForm.policePrincipalPhone = "";
            }
          })
        }
        this.basicSocialOrganizationForm.gridPersonId = ''
        this.basicSocialOrganizationForm.policePrincipal = ''
        this.basicSocialOrganizationForm.policePrincipal = ''
      },
      onGridPersonChange(e) {
        if (e) {
          this.basicSocialOrganizationForm.gridPersonName = e.label
        }
      },
      onFileUploadSuccess(res, file) {
        this.basicSocialOrganizationForm.headPortrait = res.data
      },
      onFileUploadError(file) {
        this.$Message.error('图片上传失败！')
      },
      onRemovePath() {
        this.basicSocialOrganizationForm.headPortrait = ''
      },
      changPolicePrincipal(e) {

        if(e){
          this.basicSocialOrganizationForm.policePrincipalPhone = e.tag;
        }

      },
      //地址反显
      dataSubmit(e){
          console.log(e)
      }
    },
    mounted() {
      getStreet({}).then(res => {
        if (res && res.success) {
          this.streetIdPriority = res.data
        }
      })

      //社会组织类别下拉数据
      getDictionary({ fieldName: 'socialOrganizationTypeData' }).then(res => {
        if (res && res.success) {
          this.typePriority = res.data
        }
      })
    },
    watch: {
      value(val) {
        this.show = val
      },
      show(val) {
        this.getMerchantSortPriority()
        this.initForm()
        this.loading = false
        this.editTitle = this.modalTitle
        if (this.editTitle == '查看') {
          this.disabled = true
        } else {
          this.disabled = false
        }
        if (val) {
          this.$refs['basicSocialOrganizationForm'].resetFields()
          if (this.BasicSocialOrganizationId != null && this.BasicSocialOrganizationId.trim().length > 0) {
            getBasicSocialOrganization({ id: this.BasicSocialOrganizationId }).then(res => {
              if (res && res.code == 200) {
                this.basicSocialOrganizationForm.type = res.data.type
                this.basicSocialOrganizationForm.name = res.data.name
                this.basicSocialOrganizationForm.address = res.data.address
                this.basicSocialOrganizationForm.legalPerson = res.data.legalPerson
                this.basicSocialOrganizationForm.legalPhone = res.data.legalPhone
                this.basicSocialOrganizationForm.legalCard = res.data.legalCard
                this.basicSocialOrganizationForm.streetId = res.data.streetId
                this.basicSocialOrganizationForm.streetName = res.data.streetName
                this.basicSocialOrganizationForm.addressId = res.data.addressId
                this.onStreetChange({ value: res.data.streetId })
                this.basicSocialOrganizationForm.communityId = res.data.communityId
                this.basicSocialOrganizationForm.communityName = res.data.communityName
                this.onCommunityChange({ value: res.data.communityId })
                this.basicSocialOrganizationForm.gridsId = res.data.gridsId
                this.basicSocialOrganizationForm.gridsName = res.data.gridsName
                this.onGridsChange({ value: res.data.gridsId })
                this.basicSocialOrganizationForm.businessScope = res.data.businessScope
                this.basicSocialOrganizationForm.merchantSort = res.data.merchantSort
                this.basicSocialOrganizationForm.gridPersonId = res.data.gridPersonId
                this.basicSocialOrganizationForm.gridPersonName = res.data.gridPersonName

                this.basicSocialOrganizationForm.orgCode = res.data.orgCode
                this.basicSocialOrganizationForm.policePrincipal = res.data.policePrincipal
                this.basicSocialOrganizationForm.headPortrait = res.data.headPortrait
                this.basicSocialOrganizationForm.position = res.data.position

                if(res.data.policePrincipal &&  res.data.policePrincipal.trim().length>0){
                  this.basicSocialOrganizationForm.policePrincipalPhone = res.data.policePrincipalPhone
                }
                this.basicSocialOrganizationForm.principalName = res.data.principalName
                this.basicSocialOrganizationForm.principalPhone = res.data.principalPhone
                // this.basicSocialOrganizationForm.addressId = res.data.addressId;
              } else {
                this.$Message.error(res.msg)
              }
            })
          }
        } else {
          this.closeModal(val)
          this.communityIdPriority = [];
          this.gridsIdPriority = [];
          this.gridPersonPriority = [];
          this.policePrincipalPriority = [];
        }
      }
    }
  }
</script>
