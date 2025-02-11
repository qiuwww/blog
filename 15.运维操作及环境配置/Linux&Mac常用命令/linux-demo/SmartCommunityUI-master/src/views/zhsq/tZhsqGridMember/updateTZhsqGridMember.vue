<style lang="less">
  .tZhsqGridMember {
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

    .ivu-select-default.ivu-select-multiple .ivu-select-selection {
      min-height: 32px;
      max-height: 32px;
      overflow-y: auto;
    }
  }
</style>
<template>
  <Modal v-model="show" :title="editTitle" :mask-closable="false" width="900" class="tZhsqGridMember">
    <Divider style="margin:0 auto;color:#2d8cf0;" orientation="left">基本信息</Divider>
    <Form ref="tZhsqGridMemberForm" :model="tZhsqGridMemberForm" :rules="tZhsqGridMemberFormRule" :label-width="90">
      <Row>
        <Col span="8">
        <Row>
          <FormItem label="姓名" prop="name">
            <Input v-model="tZhsqGridMemberForm.name" type="text" :maxlength="50" placeholder="请输入姓名" />
          </FormItem>
        </Row>
        <Row>
          <FormItem label="政治面貌" prop="type">
            <Select v-model="tZhsqGridMemberForm.type" placeholder="请选择" clearable>
              <Option v-for="(item, i) in politicalArr" :key="item.number" :value="item.number.toString()">{{ item.name }}</Option>
            </Select>
          </FormItem>
        </Row>

        </Col>
        <Col span="8">
        <Row>
          <FormItem label="性别" prop="sex">
            <RadioGroup v-model="tZhsqGridMemberForm.sex">
              <Radio v-for="(item, i)  in sexArr" :key="item.name" :value="item.name" :label="item.label" />
            </RadioGroup>
          </FormItem>
        </Row>
        <Row>
          <FormItem label="民族" prop="nation">
            <Select v-model="tZhsqGridMemberForm.nation" placeholder="请选择" clearable>
              <Option v-for="(item, i) in nationArr" :key="i" :value="item.number.toString()">{{ item.name }}</Option>
            </Select>
          </FormItem>
        </Row>
        </Col>
        <Col span="8">
        <FormItem label="头像" style="height: 85px;">
          <uploadHeaderImg v-model="tZhsqGridMemberForm.headPortrait" @uploadSuccess="onFileUploadSuccess" @uploadError="onFileUploadError" @removePath="onRemovePath"/>
        </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="8">
        <FormItem label="手机号" prop="phone">
          <Input v-model="tZhsqGridMemberForm.phone" type="text" :maxlength="50" placeholder="请输入手机号" />
        </FormItem>
        </Col>
        <Col span="8">
        <FormItem label="身份证号" prop="idCard">
          <Input v-model="tZhsqGridMemberForm.idCard" type="text" :maxlength="50" placeholder="请输入身份证号" />
        </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="24">
        <FormItem label="个人简介" prop="personalProfile">
          <Input v-model="tZhsqGridMemberForm.personalProfile" :rows="3" type="textarea" placeholder="请输入个人简介" />
        </FormItem>
        </Col>
      </Row>
      <Divider style="margin:0 auto;color:#2d8cf0;" orientation="left">部门&岗位</Divider>
      <Row>
        <Col span="8">
        <FormItem label="所属街道" prop="streetId">
          <Select v-model="tZhsqGridMemberForm.streetId" placeholder="请选择" label-in-value @on-change="onStreetChange">
            <Option v-for="(item, i) in streetArr" :key="item.id" :value="item.id.toString()">{{ item.name }}</Option>
          </Select>
        </FormItem>
        </Col>
        <Col span="8">
        <FormItem label="所属社区" prop="communityId">
          <Select v-model="tZhsqGridMemberForm.communityId" placeholder="请选择" label-in-value @on-change="onCommunityChange">
            <Option v-for="(item, i) in communityArr" :key="item.id" :value="item.id.toString()">{{ item.name }}</Option>
          </Select>
        </FormItem>
        </Col>
        <Col span="8">
        <FormItem v-if="this.tabPaneTitle.indexOf('网格长') > -1" label="所属网格"  prop="gridId">
          <Select v-model="tZhsqGridMemberForm.gridId" placeholder="请选择" label-in-value>
            <Option v-for="(item, i) in gridPriority" :key="item.id" :value="item.id">{{ item.name }}</Option>
          </Select>
        </FormItem>

        <FormItem v-else label="所属网格" prop="grid">
          <Select v-model="tZhsqGridMemberForm.grid" multiple placeholder="请选择">
            <Option v-for="(item, i) in gridPriority" :key="item.id" :value="item.id">{{ item.name }}</Option>
          </Select>
        </FormItem>
        </Col>
      </Row>

      <Row>
        <Col span="8" >
        <FormItem label="所属岗位" prop="post">
          <Select v-model="tZhsqGridMemberForm.post" placeholder="请选择">
            <Option v-for="(item, i) in postArr" :key="item.name" :value="item.name">{{ item.label }}</Option>
          </Select>
        </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="24">
        <FormItem label="职责范畴" prop="responsibilities">
          <Input v-model="tZhsqGridMemberForm.responsibilities" :rows="3" type="textarea" placeholder="请输入职责范畴" />
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
  addTZhsqGridMember,
  updateTZhsqGridMember,
  getTZhsqGridMember
} from '@/api/zhsq/tZhsqGridMember/tZhsqGridMember'
import { getCommunity, getDictionary, getStreet } from '../../../api'
import { nginxUrl } from '@/api/tools/tool'
import { queryAllList as gridsQueryAllList } from '@/api/zhsq/basicGrids/basicGrids'
import {
  gridMemberLevel,
  politicalData,
  postData,
  departmentData,
  sexData,
  nationData,
  streetData,
  communityData
} from '@/api/tools/zhsqSelectData'
import uploadHeaderImg from '@/components/uploadHeaderImg'
export default {
  name: 'UpdateTZhsqGridMember',
  components: {
    uploadHeaderImg
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    TZhsqGridMemberId: {
      type: String
    },
    modalTitle: {
      type: String
    },
    tabPaneTitle: {
      type: String
    }
  },
  data() {
    return {
      show: this.value,
      editTitle: this.modalTitle,
      loading: false,
      disabled: false,

      tZhsqGridMemberForm: {
        name: '',
        type: '',
        nation: '',
        sex: '',
        idCard: '',
        phone: '',
        personalProfile: '',
        headPortrait: '',
        houseStreet: '',
        houseCommunity:null,
        grid: [],
        post: '',
        responsibilities: '',
        gridId: ''
      },
      tZhsqGridMemberFormRule: this.getTZhsqGridMemberFormRule(),
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
      gridMemberLevelArr: [],
      // 街道下拉数据
      streetArr: [],
      // 社区下拉数据
      communityArr: [],
      gridPriority: [], // 所属网格
      imageUrlList: [],
      imageIsUpdate: false
    }
  },
  watch: {
    value(val) {
      this.show = val
    },
    show(val) {
      this.initForm()
      this.getSelectData()
      this.loading = false
      this.editTitle = this.modalTitle
      if (val) {
        this.$refs['tZhsqGridMemberForm'].resetFields()
        if (this.TZhsqGridMemberId != null && this.TZhsqGridMemberId.trim().length > 0) {
          getTZhsqGridMember({ id: this.TZhsqGridMemberId }).then(res => {
            if (res && res.code == 200) {
              this.tZhsqGridMemberForm.name = res.data.name
              this.tZhsqGridMemberForm.type = res.data.type
              this.tZhsqGridMemberForm.sex = res.data.sex
              this.tZhsqGridMemberForm.nation = res.data.nation
              this.tZhsqGridMemberForm.idCard = res.data.idCard
              this.tZhsqGridMemberForm.phone = res.data.phone
              this.tZhsqGridMemberForm.personalProfile = res.data.personalProfile
              this.tZhsqGridMemberForm.headPortrait = res.data.headPortrait
              this.tZhsqGridMemberForm.streetId = res.data.streetId
              if(res.data.streetId!=null&&res.data.streetId.trim().length>0){
                this.onStreetChange({ value: res.data.streetId })
              }
              this.tZhsqGridMemberForm.communityId = res.data.communityId
              this.tZhsqGridMemberForm.communityName = res.data.communityName
              if(res.data.communityId!=null&&res.data.communityId.trim().length>0){
                this.onCommunityChange({ value: res.data.communityId })
              }

              this.tZhsqGridMemberForm.post = res.data.post
              this.tZhsqGridMemberForm.responsibilities = res.data.responsibilities
              if (res.data.gridsPersonGrids) {
                const tempArr = []
                res.data.gridsPersonGrids.forEach(function(item, index) {
                  tempArr.push(item.gridsId)
                })
                this.tZhsqGridMemberForm.grid = tempArr
                if (this.tabPaneTitle.indexOf('网格长') > -1) {
                  this.tZhsqGridMemberForm.gridId = tempArr[0]
                }
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
  methods: {
    handelSubmit() {
      this.loading = true
      this.$refs['tZhsqGridMemberForm'].validate((valid) => {
        if (valid) {
          if (this.tabPaneTitle.indexOf('网格长') > -1) {
            this.tZhsqGridMemberForm.grid = []
            this.tZhsqGridMemberForm.grid.push(this.tZhsqGridMemberForm.gridId)
          }

          if (this.TZhsqGridMemberId != null && this.TZhsqGridMemberId.trim().length > 0) {
            this.tZhsqGridMemberForm.id = this.TZhsqGridMemberId
            if (this.imageIsUpdate) {
              // 用于判断图片是否修改
              this.tZhsqGridMemberForm['imageIsUpdate'] = this.imageIsUpdate
            }
            updateTZhsqGridMember(this.tZhsqGridMemberForm).then(res => {
              this.loading = false
              if (res && res.success) {
                this.closeModal(false)
                this.$emit('handleSearch')
                this.$Message.success('保存成功')
              } else {
                this.$Message.error(res.msg)
              }
            })
          } else {
            addTZhsqGridMember(this.tZhsqGridMemberForm).then(res => {
              this.loading = false
              if (res && res.success) {
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
      this.imageIsUpdate = false
      this.tZhsqGridMemberForm = {
        name: '',
        type: '',
        sex: '',
        nation: '',
        idCard: '',
        phone: '',
        personalProfile: null,
        headPortrait: null,
        houseStreet:null,
        houseCommunity: null,
        post: '',
        grid: [],
        // postLevel:'',
        responsibilities: '',
        gridId: ''
      }
    },
    getTZhsqGridMemberFormRule() {
      return {
        name: [
          { required: true, message: '姓名不能为空！', trigger: 'blur' },
          { type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '人口类别不能为空！', trigger: 'blur', pattern: /.+/ }
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
        communityId: [
          { required: true, message: '所属社区不能为空！', trigger: 'blur', pattern: /.+/ }
        ],

        grid: [
          { required: true, message: '所属网格不能为空！', trigger: 'blur', pattern: /.+/ }
        ],
        gridId: [
          { required: true, message: '所属网格不能为空！', trigger: 'blur', pattern: /.+/ }
        ],
        post: [
          { required: true, message: '所属岗位不能为空！', trigger: 'blur', pattern: /.+/ }
        ],
        // postLevel: [
        // 	{required: true, message: '级别不能为空！', trigger: 'blur',pattern: /.+/ },
        // ],
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
      // 民族下拉数据
      getDictionary({ fieldName: 'nationData' }).then(res => {
        if (res && res.success) {
          this.nationArr = res.data
        }
      })

      // 部门下拉数据
      this.departmentArr = departmentData
      // 政治面貌下拉数据
      getDictionary({ fieldName: 'politicalData' }).then(res => {
        if (res && res.success) {
          this.politicalArr = res.data
        }
      })

      // 岗位下拉数据
      if (this.tabPaneTitle && this.tabPaneTitle.indexOf('网格长') > -1) {
        this.postArr = gridMemberLevel.filter(function(item) {
          return item.name.indexOf('网格长') > -1
        })
      } else if (this.tabPaneTitle && this.tabPaneTitle.indexOf('网格员') > -1) {
        this.postArr = gridMemberLevel.filter(function(item) {
          return item.name.indexOf('网格员') > -1
        })
      } else {
        this.postArr = gridMemberLevel
      }
      // 街道下拉
      // 加载街道
      getStreet({}).then(res => {
        if (res && res.success) {
          this.streetArr = res.data
        }
      })
    },
    // 获取网格数据
    getGridsData(data) {
      gridsQueryAllList(data).then(res => {
        if (res && res.success) {
          this.gridPriority = res.data
        } else {
          this.$Message.error('获取网格数据失败，请重新刷新')
        }
      })
    },
    onStreetChange(e) {
      if (e) {
        if (e.label) {
          this.tZhsqGridMemberForm.streetName = e.label
          this.tZhsqGridMemberForm.streetId = e.value
        }
        getCommunity({ streetId: e.value }).then(res => {
          if (res && res.success) {
            this.communityArr = res.data
          }
        })
      } else {
        this.communityArr = []
      }
      this.tZhsqGridMemberForm.communityName = null
      this.tZhsqGridMemberForm.communityId = ''
      this.gridPriority = []
      this.tZhsqGridMemberForm.gridId = ''
      this.tZhsqGridMemberForm.grid = []
    },
    onCommunityChange(e) {
      if (e) {
        if (e.label) {
          this.tZhsqGridMemberForm.communityName = e.label
        }
        this.getGridsData({ communityId: e.value })
      } else {
        this.gridPriority = []
      }
      this.tZhsqGridMemberForm.gridId = ''
      this.tZhsqGridMemberForm.grid = []
    },
    onFileUploadSuccess(res, file) {
      this.tZhsqGridMemberForm.headPortrait = res.data
    },
    onFileUploadError(file) {
      this.$Message.error('图片上传失败！')
    },
    onRemovePath() {
      this.tZhsqGridMemberForm.headPortrait = ''
    }
  }
}
</script>
