<style lang="less">
  .tZhsqCommunityCadres {
    .ivu-select {
      width: 197px;
    }
    .ivu-form-item {
      margin-bottom: 24px !important;
    }
    //.ivu-input {
    //  width: 197px;
    //}
  }
</style>
<template>
  <Modal v-model="show" :title="editTitle" :mask-closable="false" width="920">
    <Form
      ref="tZhsqCommunityCadresForm"
      :model="tZhsqCommunityCadresForm"
      :rules="tZhsqCommunityCadresFormRule"
      class="tZhsqCommunityCadres"
      label-position="right"
      :label-width="90"
    >
      <Divider orientation="left" style="color:#2d8cf0;">基本信息</Divider>
      <Row>
        <Col span="8" >
        <Row>
          <FormItem label="姓名" prop="name">
            <Input v-model="tZhsqCommunityCadresForm.name" style="width: 197px" type="text" :maxlength="50" placeholder="请输入姓名" />
          </FormItem>
        </Row>
        <Row>
          <FormItem label="政治面貌" prop="type">
            <Select v-model="tZhsqCommunityCadresForm.type" filterable placeholder="请选择" clearable>
              <Option v-for="(item, i) in politicalArr" :key="i" :value="item.number.toString()">{{ item.name }}</Option>
            </Select>
          </FormItem>
        </Row>
        </Col>
        <Col span="8" >
        <FormItem label="性别" prop="sex">
          <Select v-model="tZhsqCommunityCadresForm.sex" placeholder="请选择" clearable>
            <Option v-for="(item, i) in sexArr" :key="item.name" :value="item.name">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem label="民族" prop="nation">
          <Select v-model="tZhsqCommunityCadresForm.nation" filterable placeholder="请选择" clearable>
            <Option v-for="(item, i) in nationArr" :key="i" :value="item.number.toString()">{{ item.name }}</Option>
          </Select>
        </FormItem>

        </Col>
        <Col span="8" >
        <FormItem label="头像" style="height: 85px ">
          <uploadHeaderImg v-model="tZhsqCommunityCadresForm.headPortrait" @uploadSuccess="onFileUploadSuccess" @uploadError="onFileUploadError" @removePath="onRemovePath"/>
        </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="8" >
        <FormItem label="手机号" prop="phone">
          <Input v-model="tZhsqCommunityCadresForm.phone" type="text" :maxlength="50" placeholder="请输入手机号" style="width: 197px"/>
        </FormItem>
        </Col>
        <Col span="8" >
        <FormItem label="固定电话" prop="fixedTelephone">
          <Input v-model="tZhsqCommunityCadresForm.fixedTelephone" type="text" :maxlength="50" placeholder="请输入固定电话"  style="width: 197px"/>
        </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="8" >
        <FormItem label="身份证号" prop="idCard">
          <Input v-model="tZhsqCommunityCadresForm.idCard" type="text" :maxlength="50" placeholder="请输入身份证号码" style="width: 197px"/>
        </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="24">
        <FormItem label="个人简介" prop="personalProfile" style="width: 100%">
          <Input v-model="tZhsqCommunityCadresForm.personalProfile" :rows="3" type="textarea" placeholder="请输入个人简介" />
        </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="16" >
          <!--          style="height: "-->

        </Col>
      </Row>
      <Divider orientation="left" style="color:#2d8cf0;">部门&岗位</Divider>
      <Row>
        <Col span="8" >
        <FormItem label="所属街道" filterable prop="streetId">
          <Select v-model="tZhsqCommunityCadresForm.streetId" placeholder="请选择" clearable label-in-value @on-change="streetChange">
            <Option v-for="(item, i) in streetArr" :key="item.id" :value="item.id.toString()">{{ item.name }}</Option>
          </Select>
        </FormItem>
        </Col>
        <Col span="8" >
        <FormItem label="所属社区" filterable prop="communityId">
          <Select v-model="tZhsqCommunityCadresForm.communityId" placeholder="请选择" clearable label-in-value @on-change="onCommunityChange">
            <Option v-for="(item, i) in communityArr" :key="item.id" :value="item.id.toString()">{{ item.name }}</Option>
          </Select>
        </FormItem>
        </Col>
        <Col span="8" >
        <FormItem label="所属部门" prop="department">
          <Select v-model="tZhsqCommunityCadresForm.department" placeholder="请选择" clearable>
            <Option v-for="(item, i) in departmentArr" :key="item.number" :value="item.id.toString()">{{ item.name }}</Option>
          </Select>
        </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="8" >
        <FormItem label="所属岗位" prop="post">
          <Select v-model="tZhsqCommunityCadresForm.post" placeholder="请选择" clearable>
            <Option v-for="(item, i) in postArr" :key="item.number" :value="item.id.toString()">{{ item.name }}</Option>
          </Select>
        </FormItem>
        </Col>
        <Col span="8" >
        <FormItem label="级别" filterable prop="postLevel">
          <Select v-model="tZhsqCommunityCadresForm.postLevel">
            <Option v-for="(item, i)  in levelArr" :key="item.number" :value="item.number.toString()">{{ item.name }}</Option>
          </Select>
        </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="24">
        <FormItem label="职责范畴" prop="responsibilities" style="width: 100%">
          <Input v-model="tZhsqCommunityCadresForm.responsibilities" :rows="3" type="textarea" placeholder="请输入职责范畴" />
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
import {
  addTZhsqCommunityCadres,
  updateTZhsqCommunityCadres,
  getTZhsqCommunityCadres
} from '@/api/zhsq/tZhsqCommunityCadres/tZhsqCommunityCadres'
import { getDictDataByType } from '@/api/index'
import { formartDate, nginxUrl } from '@/api/tools/tool'
import {
  sexData
} from '@/api/tools/zhsqSelectData'
import { getCommunity, getDictionary, getStreet, getDepartmentData, getPostData } from '../../../api'
import uploadHeaderImg from '@/components/uploadHeaderImg'
export default {
  name: 'UpdateTZhsqCommunityCadres',
  components: {
    uploadHeaderImg
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    TZhsqCommunityCadresId: {
      type: String
    },
    modalTitle: {
      type: String
    }
  },
  data() {
    return {
      movable: false,
      left: 'left',
      show: this.value,
      editTitle: this.modalTitle,
      loading: false,
      tZhsqCommunityCadresForm: {
        name: '',
        sex: '',
        type: '',
        nation: '',
        idCard: '',
        phone: '',
        fixedTelephone: '',
        personalProfile: '',
        headPortrait: '',
        streetId: '',
        streetName: '',
        communityId: '',
        communityName: '',
        department: '',
        post: '',
        postLevel: '',
        responsibilities: '',
        imageIsUpdate: false
      },
      tZhsqCommunityCadresFormRule: this.getTZhsqCommunityCadresFormRule(),
      // 性别下拉数据
      sexArr: [],
      // 民族下拉数据
      nationArr: [],
      // 部门下拉数据
      departmentArr: [],
      // 政治面貌下拉数据
      politicalArr: [],
      // 岗位下拉数据
      postArr: [],
      // 级别下拉数据
      levelArr: [],
      // 街道下拉数据
      streetArr: [],
      // 社区下拉数据
      communityArr: [],
      // 预览图片
      imageIsUpdate: false,
      imageUrlList: []
      // label: {
      //   name: '姓'+'\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0'+'名' ,
      // },
    }
  },
  watch: {
    value(val) {
      this.show = val
    },
    show(val) {
      this.loading = false
      this.editTitle = this.modalTitle
      if (val) {
        this.initForm()
        this.getSelectData()
        this.$refs['tZhsqCommunityCadresForm'].resetFields()
        if (this.TZhsqCommunityCadresId != null && this.TZhsqCommunityCadresId.trim().length > 0) {
          getTZhsqCommunityCadres({ id: this.TZhsqCommunityCadresId }).then(res => {
            if (res && res.code == 200) {
              this.tZhsqCommunityCadresForm.name = res.data.name
              this.tZhsqCommunityCadresForm.sex = res.data.sex
              this.tZhsqCommunityCadresForm.type = res.data.type
              this.tZhsqCommunityCadresForm.nation = res.data.nation
              this.tZhsqCommunityCadresForm.idCard = res.data.idCard
              this.tZhsqCommunityCadresForm.phone = res.data.phone
              this.tZhsqCommunityCadresForm.fixedTelephone = res.data.fixedTelephone
              this.tZhsqCommunityCadresForm.personalProfile = res.data.personalProfile
              this.tZhsqCommunityCadresForm.headPortrait = res.data.headPortrait
              this.tZhsqCommunityCadresForm.streetId = res.data.streetId
              this.tZhsqCommunityCadresForm.streetName = res.data.streetName
              this.streetChange({ value: res.data.streetId })
              this.tZhsqCommunityCadresForm.communityId = res.data.communityId
              this.tZhsqCommunityCadresForm.communityName = res.data.communityName
              this.onCommunityChange({ value: res.data.communityId })
              this.tZhsqCommunityCadresForm.department = res.data.department

              this.tZhsqCommunityCadresForm.post = res.data.post
              this.tZhsqCommunityCadresForm.postLevel = res.data.postLevel
              this.tZhsqCommunityCadresForm.responsibilities = res.data.responsibilities

              if (this.tZhsqCommunityCadresForm.headPortrait) {
                this.imageUrlList.push(nginxUrl + this.tZhsqCommunityCadresForm.headPortrait)
              }
            } else {
              this.$Message.error(res.msg)
            }
          })
        }
      } else {
        this.closeModal(val)
      }
    }
  },
  created() {
    this.getSelectData()
  },
  methods: {
    // 街道改变选社区
    streetChange(e) {
      if (e) {
        if (e.label) {
          this.tZhsqCommunityCadresForm.streetName = e.label
        }
        getCommunity({ streetId: e.value }).then(res => {
          if (res && res.success) {
            this.communityArr = res.data
          }
        })
      } else {
        this.communityArr = []
      }
      this.tZhsqCommunityCadresForm.communityId = ''
      this.tZhsqCommunityCadresForm.communityName = null
    },
    onCommunityChange(e) {
      this.departmentArr = []
      if (e) {
        if (e.label) {
          this.tZhsqCommunityCadresForm.communityName = e.label
        }
        // 部门下拉数据
        getDepartmentData({ type: 3, parentId: e.value }).then(res => {
          if (res && res.success) {
            this.departmentArr = res.data
          }
        })
      } else {
        this.tZhsqCommunityCadresForm.communityName = null
      }
      this.tZhsqCommunityCadresForm.department = ''
    },
    handelSubmit() {
      this.loading = true
      this.$refs['tZhsqCommunityCadresForm'].validate((valid) => {
        if (valid) {
          if (this.TZhsqCommunityCadresId != null && this.TZhsqCommunityCadresId.trim().length > 0) {
            this.tZhsqCommunityCadresForm.id = this.TZhsqCommunityCadresId
            updateTZhsqCommunityCadres(this.tZhsqCommunityCadresForm).then(res => {
              this.loading = false
              if (res && res.code == 200) {
                this.closeModal(false)
                this.$emit('handleSearch')
                this.$Message.success('保存成功')
              } else {
                this.$Message.error(res.msg)
              }
            })
          } else {
            addTZhsqCommunityCadres(this.tZhsqCommunityCadresForm).then(res => {
              if (res && res.code == 200) {
                this.loading = false
                this.closeModal(false)
                this.$emit('handleSearch')
                this.$Message.success('保存成功')
              } else {
                this.$Message.error(res.msg)
              }
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
      this.tZhsqCommunityCadresForm = {
        name: '',
        sex: '',
        type: '',
        nation: '',
        idCard: '',
        phone: '',
        fixedTelephone: '',
        personalProfile: '',
        headPortrait: '',
        streetId: '',
        streetName: '',
        communityId: '',
        communityName: '',
        department: '',
        post: '',
        postLevel: '',
        responsibilities: '',
        imageIsUpdate: false
      }
    },
    getTZhsqCommunityCadresFormRule() {
      return {
        name: [
          { required: true, message: '姓名不能为空！', trigger: 'blur' },
          { type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '性别不能为空！', trigger: 'blur', pattern: /.+/ }
        ],
        nation: [
          { required: true, message: '民族不能为空！', trigger: 'blur', pattern: /.+/ }
        ],
        idCard: [
          { required: true, message: '身份证号不能为空！', trigger: 'blur' },
          {
            pattern: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/,
            message: '身份证号不正确',
            trigger: 'blur'
          },
          { type: 'string', max: 18, message: '数据的最大长度为18！', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '手机号不能为空！', trigger: 'blur' },
          { pattern: /^1[3456789]\d{9}$/, message: '手机号码格式不正确', trigger: 'blur' },
          {  max: 11, message: '数据的最大长度为11！', trigger: 'blur' }
        ],
        fixedTelephone: [
          { required: true, message: '固定电话不能为空！', trigger: 'blur' },
          { type: 'string', max: 15, message: '数据的最大长度为15！', trigger: 'blur' }
        ],
        personalProfile: [
          { required: true, message: '个人简介不能为空！', trigger: 'blur', pattern: /.+/ },
          { type: 'string', max: 500, message: '数据的最大长度为500！', trigger: 'blur' }

        ],
        headPortrait: [
          { required: true, message: '头像不能为空！', trigger: 'blur' },
          { type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur' }
        ],
        streetId: [
          { required: true, message: '所属街道不能为空！', trigger: 'blur', pattern: /.+/ }
        ],
        type: [
          { required: true, message: '政治面貌不能为空！', trigger: 'blur', pattern: /.+/ }
        ],
        communityId: [
          { required: true, message: '所属社区不能为空！', trigger: 'blur', pattern: /.+/ }
        ],
        department: [
          { required: true, message: '所属部门不能为空！', trigger: 'blur', pattern: /.+/ }
        ],
        post: [
          { required: true, message: '所属岗位不能为空！', trigger: 'blur', pattern: /.+/ }
        ],
        postLevel: [
          { required: true, message: '级别不能为空！', trigger: 'blur', pattern: /.+/ }
        ],
        responsibilities: [
          { required: true, message: '职责范畴不能为空！', trigger: 'blur', pattern: /.+/ },
          { type: 'string', max: 500, message: '数据的最大长度为500！', trigger: 'blur' }
        ]
      }
    },
    // 获取下拉数据
    getSelectData() {
      // 性别下拉数据
      this.sexArr = sexData

      // 街道下拉数据
      getStreet({}).then(res => {
        if (res && res.success) {
          this.streetArr = res.data
        }
      })

      // 民族下拉数据
      getDictionary({ fieldName: 'nationData' }).then(res => {
        if (res && res.success) {
          this.nationArr = res.data
        }
      })

      // 政治面貌下拉数据
      getDictionary({ fieldName: 'politicalData' }).then(res => {
        if (res && res.success) {
          this.politicalArr = res.data
        }
      })

      // 岗位下拉数据
      getPostData({}).then(res => {
        if (res && res.success) {
          this.postArr = res.data
        }
      })
      // 级别下拉数据
      getDictionary({ fieldName: 'levelData' }).then(res => {
        if (res && res.success) {
          this.levelArr = res.data
        }
      })
    },
    onFileUploadSuccess(res, file) {
      this.tZhsqCommunityCadresForm.headPortrait = res.data
    },
    onFileUploadError(file) {
      this.$Message.error('图片上传失败！')
    },
    onRemovePath() {
      this.tZhsqCommunityCadresForm.headPortrait = ''
    }
  }
}
</script>
