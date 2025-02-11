<style lang="less">
  .updateBasicPerson2 {
    .ivu-form-item .ivu-form-item-content .address {
      width: 812px !important;
    }

    .ivu-form-item-error-tip {
      left: 0px;
    }

    .ivu-form .ivu-form-item-label {
      width: 120px;
    }

    .ivu-select {
      width: 190px !important;
    }

    .ivu-input-wrapper {
      width: 190px !important;
    }

    .ivu-table-tip {
      overflow-x: hidden !important;
    }

    .ivu-form-item {
      margin-bottom: 24px !important;
    }

    .ivu-select-default.ivu-select-multiple .ivu-select-selection {
      min-height: 32px;
      max-height: 32px;
      overflow-y: auto;
    }
  }
</style>
<template>
  <Modal v-model="show" :title="editTitle" :mask-closable="false" class="updateBasicPerson2" width="970">
    <div style="max-height:800px;overflow-y:auto;overflow-x:hidden;">
      <Divider style="color:#2d8cf0;" orientation="left">基本信息</Divider>
      <Form ref="basicPersonForm" :model="basicPersonForm" :rules="basicPersonFormRule" :label-width="80">
        <Row>
          <Col span="8">
            <Row>
              <FormItem label="姓名" prop="name">
                <Input v-model="basicPersonForm.name" type="text" :maxlength="50" placeholder="请输入姓名" />
              </FormItem>
            </Row>
            <Row>
              <FormItem label="出生日期" prop="birthDate">
                <DatePicker
                  v-model="basicPersonForm.birthDate"
                  type="date"
                  placeholder="请选择"
                  format="yyyy-MM-dd"
                  style="width: 186px"
                />
              </FormItem>
            </Row>
          </Col>
          <Col span="8">
            <Row>
              <FormItem label="性别" prop="sex">
                <RadioGroup v-model="basicPersonForm.sex">
                  <Radio v-for="(item, i)  in sexData" :key="item.name" :value="item.name" :label="item.name" />
                </RadioGroup>
              </FormItem>
            </Row>
            <Row>
              <FormItem label="身份证号" prop="cardId">
                <Input v-model="basicPersonForm.cardId" type="text" :maxlength="50" placeholder="请输入身份证号" />
              </FormItem>
            </Row>
          </Col>
          <Col span="8">
            <FormItem label="头像" style="height: 85px;" prop="imgPath">
              <uploadHeaderImg v-model="basicPersonForm.imgPath" @uploadSuccess="onFileUploadSuccess" @uploadError="onFileUploadError" @removePath="onRemovePath"/>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="8">
          <FormItem label="政治面貌" prop="politicalFace">
            <Select v-model="basicPersonForm.politicalFace" placeholder="请选择" clearable>
              <Option v-for="(item, i) in politicalData" :key="item.id" :value="item.number.toString()">{{ item.name }}</Option>
            </Select>
          </FormItem>
          </Col>
          <Col span="8">
          <FormItem label="兴趣爱好" prop="hobbys">
            <Select v-model="basicPersonForm.hobbys" multiple placeholder="请选择">
              <Option v-for="(item, i) in hobbyData" :key="item.id" :value="item.number.toString()">{{ item.name }}</Option>
            </Select>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="8">
          <FormItem label="所属街道" prop="streetId">
            <Select v-model="basicPersonForm.streetId" placeholder="请选择" @on-change="onStreetChange">
              <Option v-for="(item, i) in streetData" :key="item.id.toString()" :value="item.id.toString()">{{ item.name }}</Option>
            </Select>
          </FormItem>
          </Col>
          <Col span="8">
          <FormItem label="所属社区" prop="communityId">
            <Select v-model="basicPersonForm.communityId" placeholder="请选择" @on-change="onCommunityChange">
              <Option v-for="(item, i) in communityArr" :key="item.id.toString()" :value="item.id.toString()">{{ item.name }}</Option>
            </Select>
          </FormItem>
          </Col>
          <Col span="8">
          <FormItem label="所属网格" prop="ownedGridId">
            <Select v-model="basicPersonForm.ownedGridId" placeholder="请选择" @on-change="onownedGridChange">
              <Option v-for="(item, i) in gridPriority" :key="item.id" :value="item.id">{{ item.name }}</Option>
            </Select>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="24">
          <FormItem label="家庭地址" prop="residentialAddress">
            <Input
              v-model="basicPersonForm.residentialAddress"
              type="text"
              :maxlength="50"
              placeholder="请输入家庭地址"
              class="address"
            />
          </FormItem>
          </Col>
        </Row>
      </Form>

      <Form ref="formDynamic" :model="formDynamic" :label-width="80">
        <Divider style="color:#2d8cf0;" orientation="left">亲属信息</Divider>
        <Row v-for="(item, index) in formDynamic.items" v-if="item.status === 1" :key="index">
          <Col span="8">
          <FormItem label="姓名">
            <Input v-model="item.name" type="text" :maxlength="50" placeholder="请输入姓名" />
          </FormItem>
          </Col>
          <Col span="8">
          <FormItem label="电话号码">
            <Input v-model="item.phone" type="text" :maxlength="50" placeholder="请输入电话号码" />
          </FormItem>
          </Col>
          <Col span="6">
          <FormItem label="关系" :label-width="60">
            <Select v-model="item.relationship" placeholder="请选择" transfer>
              <Option v-for="(item, i) in relationData" :key="item.number" :value="item.number.toString()">{{item.name}}</Option>
            </Select>
          </FormItem>
          </Col>
          <Col span="2">
          <Icon
            v-if="!item.flag"
            type="md-add-circle"
            size="30"
            color="#4EEE94"
            style="float: right;margin-right: 15px;margin-top: 2px;"
            @click="addFromRow()"
          />
          <Icon
            v-if="item.flag"
            type="md-remove-circle"
            size="30"
            color="#FF0000"
            style="float: right;margin-right: 15px;margin-top: 2px;"
            @click="removeFromRow(index)"
          />
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
import { addBasicPersonByType2, updateBasicPersonByType2, getBasicPerson } from '@/api/zhsq/basicPerson/basicPerson'
import {
  nationData,
  politicalData,
  sexData,
  hobbyData,
  relationData
} from '@/api/tools/zhsqSelectData'
import { formartDate } from '@/api/tools/tool'
import { nginxUrl } from '@/api/tools/tool'
import { queryAllList as gridsQueryAllList } from '@/api/zhsq/basicGrids/basicGrids'
import { getCommunity, getDictionary, getStreet } from '../../../api'
import uploadHeaderImg from '@/components/uploadHeaderImg'

export default {
  name: 'UpdateBasicPerson2',
  components: {
    uploadHeaderImg
  },
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
      imgShow: false,
      formDynamic: {
        items: [
          {
            name: '',
            phone: '',
            relationship: '',
            index: 1,
            status: 1,
            flag: false
          }
        ]
      },

      hobbyData: [],
      relationData: [],
      imageUrlList: [],
      loading: true,
      data: [],
      sexData: sexData,
      nationData: [], // 民族
      politicalData: [],
      streetData: [],
      communityArr: [],
      gridPriority: [],
      show: this.value,
      editTitle: this.modalTitle,
      updateHouseData: [],
      basicPersonForm: {
        hobby: '',
        hobbys: [],
        name: '',
        sex: '',
        imgPath: '',
        birthDate: '',
        nation: '',
        cardId: '',
        politicalFace: '',
        residentialAddress: '',
        streetId: '',
        streetName: '',

        communityId: '',
        communityName: '',

        ownedGrid: '',
        ownedGridId: '',
        relativesList: [],
        imageIsUpdate: false
      },
      basicPersonFormRule: this.getBasicPersonFormRule()
    }
  },
  watch: {
    value(val) {
      this.show = val
    },
    show(val) {
      this.data = []
      this.loading = false
      this.editTitle = this.modalTitle
      if (val) {
        this.initForm()
        this.initDropdownData()
        this.$refs['basicPersonForm'].resetFields()
        if (this.BasicPersonId != null && this.BasicPersonId.trim().length > 0) {
          // 获取人员档案信息
          getBasicPerson({ id: this.BasicPersonId }).then(res => {
            if (res && res.code == 200) {
              this.basicPersonForm.name = res.data.name
              this.basicPersonForm.sex = res.data.sex
              this.basicPersonForm.birthDate = res.data.birthDate
              this.basicPersonForm.nation = res.data.nation
              // 加载图片
              this.imageUrlList = []
              if (res.data.imgPath != null && res.data.imgPath != '') {
                this.imageUrlList.push(nginxUrl + res.data.imgPath)
                this.imgShow = true
              }
              this.basicPersonForm.imgPath = res.data.imgPath

              this.basicPersonForm.cardId = res.data.cardId
              this.basicPersonForm.politicalFace = res.data.politicalFace
              this.basicPersonForm.residentialAddress = res.data.residentialAddress
              this.basicPersonForm.streetId = res.data.streetId
              this.basicPersonForm.streetName = res.data.streetName

              this.onStreetChange({ value: res.data.streetId })
              this.basicPersonForm.communityId = res.data.communityId
              this.basicPersonForm.communityName = res.data.communityName

              this.onCommunityChange({ value: res.data.communityId })
              this.basicPersonForm.ownedGrid = res.data.ownedGrid
              this.basicPersonForm.ownedGridId = res.data.ownedGridId
              if (res.data.hobby) {
                this.basicPersonForm.hobbys = JSON.parse(res.data.hobby)
              }

              if (res.data.relativesList && res.data.relativesList.length > 0) {
                this.formDynamic.items = res.data.relativesList
                for (let i = 0; i < this.formDynamic.items.length; i++) {
                  if (i == 0) {
                    this.formDynamic.items[i].flag = false
                  } else {
                    this.formDynamic.items[i].flag = true
                  }
                  this.formDynamic.items[i].status = 1
                  this.formDynamic.items[i].index = i + 1
                }
              }
            } else {
              this.$Message.error(res.msg)
            }
          })
        }
      } else {
        this.closeModal(val)
        this.communityArr = []
        this.gridPriority = []
      }
    }
  },
  methods: {
    handleView() {
      const viewer = this.$el.querySelector('.imgWrap').$viewer
      viewer.show()
    },
    // 移除图片
    handleRemove() {
      this.imageUrlList = []
      this.basicPersonForm.imgPath = ''
    },
    // 添加一行亲属关系
    addFromRow() {
      const index = this.formDynamic.items.length + 1
      this.formDynamic.items.push({
        name: '',
        phone: '',
        relationship: '',
        index: index,
        status: 1,
        flag: true
      })
    },
    // 删除一行
    removeFromRow(index) {
      this.formDynamic.items[index].status = 0
      this.formDynamic.items = this.formDynamic.items.filter(item => item.status == 1)
    },
    // 点击本地上传按钮触发事件
    choiceFile() {
      this.$refs.filElem.dispatchEvent(new MouseEvent('click'))
    },
    // 选择本地文件进行上传
    fileUpload() {
      var _this = this
      const inputFile = this.$refs.filElem.files[0]
      if (inputFile) {
        var reader = new FileReader()
        reader.readAsDataURL(inputFile)
        reader.onload = () => {
          _this.imageUrlList = []
          _this.imageUrlList.push(reader.result)
          _this.imgShow = true
          _this.basicPersonForm.imgPath = reader.result
          _this.basicPersonForm.imageIsUpdate = true
        }
      } else {
        this.$Message.error('请选择图片')
      }
      this.$refs.filElem.value = null
    },
    onStreetChange(e) {
      if (e) {
        if (e.label) {
          this.basicPersonForm.streetName = e.label
        }
        getCommunity({ streetId: e.value }).then(res => {
          if (res && res.success) {
            this.communityArr = res.data
          }
        })
      } else {
        this.communityArr = []
      }
      this.basicPersonForm.communityName = null
      this.basicPersonForm.communityId = ''
      this.basicPersonForm.ownedGrid = ''
      this.basicPersonForm.ownedGridId = ''
      this.gridPriority = []
    },
    onCommunityChange(e) {
      if (e) {
        gridsQueryAllList({ communityId: e.value }).then(res => {
          if (res && res.success) {
            this.gridPriority = res.data
          } else {
            this.$Message.error('获取网格数据失败，请重新刷新')
          }
        })
        this.basicPersonForm.communityName = e.label
      }
      this.basicPersonForm.ownedGridId = ''
      this.basicPersonForm.ownedGrid = ''
      this.gridPriority = []
    },
    onownedGridChange(e) {
      if (e) {
        this.basicPersonForm.ownedGrid = e.label
      } else {
        this.basicPersonForm.ownedGrid = ''
      }
    },
    handelSubmit() {
      this.$refs['basicPersonForm'].validate((valid) => {
        this.loading = true
        if (valid) {
          this.basicPersonForm.birthDate = formartDate(this.basicPersonForm.birthDate, 'yyyy-MM-dd')

          for (let i = 0; i < this.formDynamic.items.length; i++) {
            if (this.formDynamic.items[i].status == 1 && this.formDynamic.items[i].name && this.formDynamic.items[i].phone && this.formDynamic.items[i].relationship) {
              this.basicPersonForm.relativesList.push(this.formDynamic.items[i])
            }
          }

          if (this.basicPersonForm.hobbys) {
            this.basicPersonForm.hobby = JSON.stringify(this.basicPersonForm.hobbys)
          }

          if (this.BasicPersonId != null && this.BasicPersonId.trim().length > 0) {
            this.basicPersonForm.id = this.BasicPersonId
            updateBasicPersonByType2(this.basicPersonForm).then(res => {
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
            addBasicPersonByType2(this.basicPersonForm).then(res => {
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
      this.basicPersonForm = {
        hobby: '',
        hobbys: [],
        name: '',
        sex: '',
        imgPath: '',
        birthDate: '',
        nation: '',
        cardId: '',
        politicalFace: '',
        residentialAddress: '',
        streetId: '',
        streetName: '',
        communityId: '',
        communityName: '',
        ownedGrid: '',
        ownedGridId: '',
        relativesList: [],
        imageIsUpdate: false
      }
      this.formDynamic = {
        items: [
          {
            name: '',
            phone: '',
            relationship: '',
            index: 1,
            status: 1,
            flag: false
          }
        ]
      }
    },
    getBasicPersonFormRule() {
      return {
        name: [
          { required: true, message: '姓名不能为空！', trigger: 'blur' },
          { type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '性别不能为空！', trigger: 'blur' },
          { type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur' }
        ],
        birthDate: [
          { required: true, message: '出生日期不能为空！', trigger: 'blur', type: 'date' }
        ],
        cardId: [
          { required: true, message: '身份证号不能为空！', trigger: 'blur' },
          {
            pattern: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
            message: '身份证号不正确',
            trigger: 'blur'
          }
        ],
        politicalFace: [
          { required: true, message: '政治面貌不能为空！', trigger: 'blur', pattern: /.+/ }
        ],
        residentialAddress: [
          { required: true, message: '家庭地址不能为空！', trigger: 'blur' },
          { type: 'string', max: 200, message: '数据的最大长度为50！', trigger: 'blur' }
        ],
        streetId: [
          { required: true, message: '所属街道不能为空！', trigger: 'blur', pattern: /.+/ }
        ],
        communityId: [
          { required: true, message: '所属社区不能为空！', trigger: 'blur', pattern: /.+/ }
        ],
        ownedGridId: [
          { required: true, message: '所属网格不能为空！', trigger: 'blur', pattern: /.+/ }
        ]
      }
    },
    initDropdownData() {
      // 加载街道
      getStreet({}).then(res => {
        if (res && res.success) {
          this.streetData = res.data
        }
      })

      // 加载政治面貌
      getDictionary({ fieldName: 'politicalData' }).then(res => {
        if (res && res.success) {
          this.politicalData = res.data
        }
      })

      // 加载兴趣爱好
      getDictionary({ fieldName: 'hobbyData' }).then(res => {
        if (res && res.success) {
          this.hobbyData = res.data
        }
      })

      // 加载老人亲属关系
      getDictionary({ fieldName: 'relationShipData' }).then(res => {
        if (res && res.success) {
          this.relationData = res.data
        }
      })
    },
    onFileUploadSuccess(res, file) {
      this.basicPersonForm.imgPath = res.data
    },
    onFileUploadError(file) {
      this.$Message.error('图片上传失败！')
    },
    onRemovePath() {
      this.basicPersonForm.imgPath = ''
    }
  }
}
</script>
