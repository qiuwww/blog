<style lang="less" scoped>
.looktBasicHousingEstate {
  .ivu-col-span-sm-12 {
    padding-left: 7px !important;
  }

  .ivu-col {
    height: 40px;
  }
}
</style>

<template>
  <Modal
    v-model="show"
    :title="editTitle"
    :mask-closable="false"
    :draggable="false"
    class="looktBasicHousingEstate"
    width="1000"
    :z-index="900"
  >
    <!--    <Card :bordered="false" dis-hover class="ivu-mt i-table-no-border">-->
    <Form ref="lookForm" :model="lookForm" :label-width="125">
      <Row>
        <Col span="8" >
        <FormItem label="小区名称">
          {{ lookForm.name }}
        </FormItem>
        </Col>
        <Col span="8" >
        <FormItem label="物业名称">
          <div style="cursor: pointer;color:#2d8cf0;" @click="handleView">{{ lookForm.propertyName }}</div>
        </FormItem>
        </Col>
        <Col span="8" >
        <FormItem label="物业类型">
          {{ lookForm.propertyType }}
        </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="8" >
        <FormItem label="所属街道">
          {{ lookForm.street }}
        </FormItem>
        </Col>
        <Col span="8" >
        <FormItem label="所属社区">
          {{ lookForm.community }}
        </FormItem>
        </Col>
        <Col span="8" >
        <FormItem label="所属网格">
          {{ lookForm.grid }}
        </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="8" >
        <FormItem label="物业负责人">
          {{ lookForm.propertyPerson }}
        </FormItem>
        </Col>
        <Col span="8" >
        <FormItem label="物业电话">
          {{ lookForm.propertyPhone }}
        </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="8" >
        <FormItem label="账号">
          {{ lookForm.userName }}
        </FormItem>
        </Col>
        <Col span="8" >
        <FormItem label="密码">
          {{ lookForm.password }}
        </FormItem>
        </Col>
        <Col span="8" >
        <FormItem label="人脸识别库的id">
          {{ lookForm.recognitionFaceId }}
        </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="24" >
        <FormItem label="小区地址">
          {{ lookForm.address }}
        </FormItem>
        </Col>
      </Row>
      <lookTZhsqPropertyManagement />
      <lookTZhsqPropertyManagement
        v-model="lookShow"
        :t-zhsq-property-management-id="TZhsqPropertyManagementId"
        :modal-title="lookTitle"
      />
    </Form>
    <div slot="footer">
      <Button type="text" @click="show=false">取消</Button>
    </div>
  </Modal>
</template>
<script>
import { getBasicHousingEstate } from '@/api/zhsq/basicHousingEstate/basicHousingEstate'
import lookTZhsqPropertyManagement from '../tZhsqPropertyManagement/lookTZhsqPropertyManagement'
import { getDictionary } from '@/api/index'

export default {
  name: 'LookTSubstances',
  components: {
    lookTZhsqPropertyManagement
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    BasicHousingEstateId: {
      type: String
    },
    modalTitle: {
      type: String
    },
    /* gridName: {
        type: String
    }, */
    propertyName: {
      type: String
    }
  },
  data() {
    return {
      lookShow: false,
      show: this.value, // 是否显示
      editTitle: this.modalTitle, // 标题
      loading: true,
      lookForm: {
        name: '',
        address: '',
        propertyName: '',
        propertyType: '',
        propertyPerson: '',
        propertyPhone: '',
        street: '',
        community: '',
        grid: '',
        location: '',
        streetNumber: '',
        propertyNameId: '',
        userName: '',
        password: '',
        recognitionFaceId: ''
      },
      lookTitle: '',
      // 物业id
      TZhsqPropertyManagementId: '',
      propertyTypePriority: ''
    }
  },
  watch: {
    value(val) {
      this.show = val
    },
    show(val) {
      this.initForm()
      this.loading = false
      this.editTitle = this.modalTitle
      if (val) {
        if (this.BasicHousingEstateId != null && this.BasicHousingEstateId.trim().length > 0) {
          getBasicHousingEstate({ id: this.BasicHousingEstateId }).then(res => {
            if (res && res.success) {
              this.lookForm.name = res.data.name
              if(res.data.province &&res.data.province.trim().length>0){
                this.lookForm.address = res.data.province +res.data.city+res.data.county
              }
              else{
                this.lookForm.address = res.data.address
              }
              this.lookForm.street = res.data.street
              this.lookForm.propertyName = res.data.propertyName
              this.lookForm.propertyNameId = res.data.propertyNameId
              const type = this.propertyTypePriority.filter(item => item.number == res.data.propertyType)
              if (type) {
                this.lookForm.propertyType = type[0].name
              }

              this.lookForm.propertyPerson = res.data.propertyPerson
              this.lookForm.propertyPhone = res.data.propertyPhone
              this.lookForm.community = res.data.community
              this.lookForm.grid = res.data.grid
              this.lookForm.location = res.data.location
              this.lookForm.streetNumber = res.data.streetNumber
              this.lookForm.userName = res.data.userName
              // this.lookForm.password = res.data.password;
              if (res.data.password != '') {
                this.lookForm.password = '*****'
              }

              this.lookForm.recognitionFaceId = res.data.recognitionFaceId
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
    this.height = Math.floor(document.body.scrollHeight * 0.95) + 'px'
    this.width = Math.floor(document.body.scrollWidth * 0.95) + 'px'
  },
  methods: {
    // 获取物业类型
    getPropertyType() {
      getDictionary({ 'fieldName': 'communityPriorityData' }).then(res => {
        if (res && res.success) {
          this.propertyTypePriority = res.data
        }
      })
    },
    handleView() {
      this.lookShow = true
      this.TZhsqPropertyManagementId = this.lookForm.propertyNameId
      this.lookTitle = '物业公司查看'
    },
    // 提交数据
    closeModal(val) {
      this.$emit('input', val)
    },
    // 初始化表单
    initForm() {
      this.lookForm = {
        name: '',
        address: '',
        propertyName: '',
        propertyType: '',
        propertyPerson: '',
        propertyPhone: '',
        street: '',
        community: '',
        grid: '',
        location: '',
        propertyNameId: ''
      }
      this.getPropertyType()
    }
  }
}
</script>
