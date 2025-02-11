<style lang="less">
.grids_add {
  .ivu-input {
    width: 200px;
  }

  .ivu-select {
    width: 200px;
  }

  .ivu-form .ivu-form-item-label {
    width: 110px;
  }

  .ivu-input-wrapper {
    width: auto !important;
  }

  .ivu-form-item-content .address_class input {
    width: 523px;
  }

  .ivu-form-item-content .Area_class input {
    width: 143px;
  }

  .ivu-form-item-content .address_class textarea {
    width: 843px;
    height: 80px;
  }
  .ivu-input-group .ivu-input {
    background: #fff;
    border-radius: 3px;
    color: #515a6e;
  }
  .ivu-input-group-append, .ivu-input-group>.ivu-input:last-child {
    border-radius: 3px;
  }
}

</style>
<template>
  <Modal v-model="show" :title="editTitle" :mask-closable="false" class="grids_add" :draggable="false" width="1000px" mask>
    <Form ref="basicGridsForm" :model="basicGridsForm" :rules="basicGridsFormRule">
      <Row>
        <!-- <Col span="8">
           <FormItem label="类型" prop="code">
           <Select v-model="basicGridsForm.type" placeholder="请选择" clearable>
             <Option key="省" value="省">省</Option>
             <Option key="市" value="市">市</Option>
             <Option key="区（县）" value="区（县）">区（县）</Option>
             <Option key="街道" value="街道">街道</Option>
             <Option key="社区（村委、居委）" value="社区（村委、居委）">社区（村委、居委）</Option>
             <Option key="网格" value="网格">网格</Option>
           </Select>
           </FormItem>
         </Col>

         <Col span="8">
           <FormItem label="网格编号" prop="code">
             <Input type="text" :maxlength=50 v-model="basicGridsForm.code"
                    placeholder="请输入网格编号"/>
           </FormItem>
         </Col> -->
        <Col span="8" >
        <FormItem label="网格名称" prop="name">
          <Input v-model="basicGridsForm.name" type="text" :maxlength="50" placeholder="请输入网格名称" />
        </FormItem>
        </Col>
        <Col span="8" >
        <FormItem label="所属街道" prop="streetId">
          <Select v-model="basicGridsForm.streetId" placeholder="请选择" clearable label-in-value @on-change="onStreetChange">
            <Option v-for="(item, i) in streetPriority" :key="item.id" :value="item.id.toString()">{{ item.name }}</Option>
          </Select>
        </FormItem>
        </Col>

        <Col span="8" >
        <FormItem label="所属社区" prop="communityId">
          <Select v-model="basicGridsForm.communityId" placeholder="请选择" clearable label-in-value @on-change="oncommunityIdChange">
            <Option v-for="(item, i) in communityIdPriority" :key="item.id" :value="item.id.toString()">{{ item.name }}</Option>
          </Select>

        </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="8" >
        <FormItem label="党组织">
          <Input v-model="basicGridsForm.organization" type="text" :maxlength="50" placeholder="请输入党组织" />
          <!--            <Select v-model="basicGridsForm.organization" placeholder="请选择" clearable>-->
          <!--              <Option v-for="(item, i) in organizationPriority" :key="item.number" :value="item.number.toString()">{{item.name}}</Option>-->
          <!--            </Select>-->
        </FormItem>
        </Col>
        <!--        <Col span="8">-->
        <!--          <FormItem label="网格长">-->
        <!--            <Select v-model="basicGridsForm.gridPersonId" placeholder="请选择" clearable @on-change="onGridPersonChange">-->
        <!--              <Option v-for="(item, i) in gridPersonData" :key="item.id" :value="item.id">{{item.name}}-->
        <!--              </Option>-->
        <!--            </Select>-->
        <!--          </FormItem>-->
        <!--        </Col>-->
        <Col span="8" >
        <FormItem label="经纬度" prop="position">
          <Input
            v-model="basicGridsForm.position"
            type="text"
            placeholder="请选择经纬度坐标点"
            icon="md-flag"
            :maxlength="255"
            @on-click="checkMap"
          />
        </FormItem>
        </Col>
        <Col span="8" >
        <FormItem label="网格面积" prop="area">
          <Input v-model="basicGridsForm.area" class="Area_class" type="number" :maxlength="50" placeholder="请输入面积" >
          <span slot="append">平方米</span>
          </Input>
        </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="8" >
        <FormItem label="账号">
          <Input v-model="basicGridsForm.userName" type="text" :maxlength="50" placeholder="请输入账号" />
        </FormItem>
        </Col>
        <Col span="8" >
        <FormItem label="密码">
          <Input v-model="basicGridsForm.password" type="password" :maxlength="50" placeholder="请输入密码" />
        </FormItem>
        </Col>
        <Col span="8" >
        <FormItem label="人脸识别库的id">
          <Input v-model="basicGridsForm.recognitionFaceId" type="text" :maxlength="50" placeholder="请输入人脸识别库的id" />
        </FormItem>
        </Col>
      </Row>
      <!--      <Row>-->
      <!--        <Col span="8">-->
      <!--          <FormItem label="网格面积" prop="area">-->
      <!--            <Input class="Area_class" type="number" :maxlength=50 v-model="basicGridsForm.area" placeholder="请输入面积">-->
      <!--              <span slot="append">平方米</span>-->
      <!--            </Input>-->
      <!--          </FormItem>-->
      <!--        </Col>-->
      <!--      </Row>-->
      <Row>
        <Col span="24" >
        <FormItem label="网络概况">
          <Input
            v-model="basicGridsForm.information"
            type="textarea"
            placeholder="请输入网络概况"
            :maxlength="500"
            class="address_class"
          />
        </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="24" >
        <FormItem label="网格介绍">
          <Input
            v-model="basicGridsForm.remark"
            type="textarea"
            placeholder="请输入网格介绍"
            :maxlength="500"
            class="address_class"
          />
        </FormItem>
        </Col>
      </Row>
    </Form>
    <div slot="footer">
      <Button type="text" @click="show=false">取消</Button>
      <Button type="primary" :loading="loading" @click="handelSubmit">提交</Button>
    </div>

    <plot
      v-model="mapShow"
      :obj-data="pointArr"
      :select-type="selectType"
      div-id="basicGridUpdate"
      modal-title="选择坐标点"
      @resultPoint="getResultPoint"
    />
  </Modal>
</template>
<script>
import { addBasicGrids, updateBasicGrids, getBasicGrids } from '@/api/zhsq/basicGrids/basicGrids'
import plot from '@/views/gismap/components/plot'
import { queryAllTZhsqGridMemberList } from '@/api/zhsq/tZhsqGridMember/tZhsqGridMember'
import { getCommunity, getDictionary, getStreet } from '../../../api'

export default {
  name: 'UpdateBasicGrids',
  components: {
    plot
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    BasicGridsId: {
      type: String
    },
    modalTitle: {
      type: String
    }
  },
  data() {
    return {
      selectType: 'Polygon',
      resultObj: {},
      pointArr: null,
      mapShow: false,
      streetPriority: [],
      communityIdPriority: [],
      organizationPriority: [],
      show: this.value,
      editTitle: this.modalTitle,
      loading: true,
      disabled: false,
      gridPersonData: [],
      basicGridsForm: {
        streetId: '',
        streetName: '',
        code: '',
        name: '',
        communityId: '',
        communityName: '',
        gridPersonId: '',
        gridPersonName: '',
        organization: '',
        position: '',
        orderNumber: 1,
        remark: '',
        information: '',
        address: '',
        area: '',
        type: '',
        userName: '',
        password: '',
        recognitionFaceId: ''
      },
      basicGridsFormRule: this.getBasicGridsFormRule()
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
        this.$refs['basicGridsForm'].resetFields()
        queryAllTZhsqGridMemberList({}).then(res => {
          if (res && res.success) {
            this.gridPersonData = res.data
          }
        })
        if (this.BasicGridsId != null && this.BasicGridsId.trim().length > 0) {
          getStreet({}).then(res => {
            if (res && res.success) {
              this.streetPriority = res.data
              getDictionary({ fieldName: 'organizationData' }).then(res2 => {
                if (res2.success) {
                  this.organizationPriority = res2.data
                  getBasicGrids({ id: this.BasicGridsId }).then(res3 => {
                    if (res3.code == 200) {
                      this.basicGridsForm.code = res3.data.code
                      this.basicGridsForm.name = res3.data.name
                      this.basicGridsForm.streetId = res3.data.streetId
                      this.basicGridsForm.streetName = res3.data.streetName
                      this.onStreetChange({ value: res3.data.streetId })
                      this.basicGridsForm.communityId = res3.data.communityId
                      this.basicGridsForm.communityName = res3.data.communityName
                      this.basicGridsForm.gridPersonId = res3.data.gridPersonId
                      this.basicGridsForm.gridPersonName = res3.data.gridPersonName
                      this.basicGridsForm.organization = res3.data.organization
                      this.basicGridsForm.position = res3.data.position
                      this.basicGridsForm.orderNumber = res3.data.orderNumber
                      this.basicGridsForm.remark = res3.data.remark
                      this.basicGridsForm.area = res3.data.area
                      this.basicGridsForm.address = res3.data.address
                      this.basicGridsForm.information = res3.data.information
                      this.basicGridsForm.type = res3.data.type
                      this.basicGridsForm.userName = res3.data.userName
                      this.basicGridsForm.password = res3.data.password
                      this.basicGridsForm.recognitionFaceId = res3.data.recognitionFaceId
                    } else {
                      this.$Message.error(res3.msg)
                    }
                  })
                }
              })
            }
          })
        } else {
          getStreet({}).then(res => {
            if (res && res.success) {
              this.streetPriority = res.data
              getDictionary({ fieldName: 'organizationData' }).then(res => {
                if (res && res.success) {
                  this.organizationPriority = res.data
                }
              })
            }
          })
        }
      } else {
        this.closeModal(val)
        this.communityIdPriority = []
      }
    }
  },
  methods: {
    onStreetChange(e) {
      if (e) {
        if (e.label) {
          this.basicGridsForm.streetName = e.label
        }
        getCommunity({ streetId: e.value }).then(res => {
          if (res && res.success) {
            this.communityIdPriority = res.data
          }
        })
      } else {
        this.communityIdPriority = []
        this.basicGridsForm.communityId = ''
        this.basicGridsForm.communityName = ''
      }
    },
    oncommunityIdChange(e) {
      if (e) {
        this.basicGridsForm.communityName = e.label
      } else {
        this.basicGridsForm.communityName = ''
      }
    },
    onGridPersonChange(e) {
      if (e) {
        this.basicGridsForm.gridPersonName = e.label.toString().trim()
      }
    },
    handelSubmit() {
      this.$refs['basicGridsForm'].validate((valid) => {
        this.loading = true
        if (valid) {
          if (this.BasicGridsId != null && this.BasicGridsId.trim().length > 0) {
            this.basicGridsForm.id = this.BasicGridsId
            updateBasicGrids(this.basicGridsForm).then(res => {
              if (res && res.code == 200) {
                this.closeModal(false)
                this.$emit('handleSearch')
                this.$Message.success('保存成功')
              } else {
                this.$Message.error(res.msg)
              }
            }).catch(res => {
              this.$Message.error(res)
            }).finally(res => {
              this.loading = false
            })
          } else {
            addBasicGrids(this.basicGridsForm).then(res => {
              if (res && res.code == 200) {
                this.closeModal(false)
                this.$emit('handleSearch')
                this.$Message.success('保存成功')
              } else {
                this.$Message.error(res.msg)
              }
            }).catch(res => {
              this.$Message.error(res)
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
      this.selectType = 'Polygon'
      this.resultObj = {}
      this.pointArr = null
      this.basicGridsForm = {
        streetId: '',
        streetName: '',
        code: '',
        name: '',
        communityId: '',
        communityName: '',
        gridPerson: '',
        organization: '',
        position: '',
        orderNumber: 1,
        remark: '',
        information: '',
        address: '',
        area: '',
        type: '',
        userName: '',
        password: '',
        recognitionFaceId: ''
      }
    },
    getBasicGridsFormRule() {
      return {
        name: [
          { required: true, message: '网格名称不能为空！', trigger: 'blur' },
          { type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur' }
        ],
        streetId: [
          { required: true, message: '所属街道不能为空！', trigger: 'blur', pattern: /.+/ }
        ],
        communityId: [
          { required: true, message: '所属社区不能为空！', trigger: 'blur', pattern: /.+/ }
        ],
        gridPersonId: [
          { required: true, message: '网格长不能为空！', trigger: 'blur', pattern: /.+/ }
        ],
        organization: [
          { required: true, message: '党组织不能为空！', trigger: 'blur', pattern: /.+/ }
        ]
      }
    },
    checkMap: function() {
      if (this.basicGridsForm.position) {
        this.pointArr = JSON.parse(this.basicGridsForm.position)
      } else {
        this.pointArr = []
      }
      this.mapShow = true
    },
    getResultPoint(obj, type) {
      const arr = obj.flatCoordinates
      this.basicGridsForm.position = JSON.stringify(arr)
      this.selectType = type
    }
  }
}
</script>
