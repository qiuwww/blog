<style lang="less">
  .grids_look {
    .ivu-input {
      width: 200px;
    }

    .ivu-select {
      width: 200px;
    }

    .ivu-form-item-error-tip {
      left: 110px;
    }

    .ivu-form .ivu-form-item-label {
      width: 110px;
    }
    .ivu-form-item {
      margin-bottom: 0px !important;
    }

    .ivu-input-wrapper {
      width: auto !important;
    }

    .ivu-form-item-content .address_class input {
      width: 523px;
    }

    .ivu-form-item-content .address_class div {
      width: 843px;
      height: 80px;
    }

    .ivu-form-item .ivu-form-item-content .item_span {
      margin-top: 6px;
      width: 843px;
      height: 90px !important;
      overflow: auto;
      overflow-x: hidden;
      line-height: 150%;
      border: 1px solid rgb(222, 222, 222);
    }
  }

</style>
<template>
  <Modal v-model="show" :title="editTitle" :draggable="false" :mask-closable="false" class="grids_look" width="1000px">
    <Form ref="basicGridsForm" :model="basicGridsForm">
      <Row>
        <!--        <Col span="8">-->
        <!--          <FormItem label="类型">-->
        <!--            {{basicGridsForm.type}}-->
        <!--          </FormItem>-->
        <!--        </Col>-->
        <!--        <Col span="8">-->
        <!--          <FormItem label="网格编号" prop="code">-->
        <!--            {{basicGridsForm.code}}-->
        <!--          </FormItem>-->
        <!--        </Col>-->
        <Col span="8" >
        <FormItem label="网格名称" prop="name">
          {{ basicGridsForm.name }}
        </FormItem>
        </Col>
        <Col span="8" >
        <FormItem label="所属街道" prop="communityId">
          {{ basicGridsForm.streetName }}
        </FormItem>
        </Col>
        <Col span="8" >
        <FormItem label="所属社区" prop="communityId">
          {{ basicGridsForm.communityName }}
        </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="8" >
        <FormItem label="党组织" prop="organization">
          {{ basicGridsForm.organization }}
        </FormItem>
        </Col>
        <Col span="8" >
        <FormItem label="网格长" prop="gridPerson">
          {{ basicGridsForm.gridPersonName }}
        </FormItem>
        </Col>
        <Col span="8" >
        <FormItem label="经纬度" prop="position">
          {{ basicGridsForm.position ? '已标注' : '未标注' }}
        </FormItem>
        </Col>

      </Row>
      <Row>
        <Col span="8" >
        <FormItem label="账号">
          {{ basicGridsForm.userName }}
        </FormItem>
        </Col>
        <Col span="8" >
        <FormItem label="密码">
          {{ basicGridsForm.password }}
        </FormItem>
        </Col>
        <Col span="8" >
        <FormItem label="人脸识别库的id">
          {{ basicGridsForm.recognitionFaceId }}
        </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="8" >
        <FormItem label="面积" prop="area">
          {{ basicGridsForm.area }}
        </FormItem>
        </Col>
      </Row>

      <!-- <Col span="8">
          <FormItem label="地址" prop="address">
            {{basicGridsForm.address}}
          </FormItem>
        </Col> -->

      <Row>
        <Col span="24" style="height: 90px" >
        <FormItem label="网络概况">
          <p class="item_span">
            {{ basicGridsForm.information }}
          </p>
        </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="24" style="height: 90px" >
        <FormItem label="介绍">
          <p class="item_span">
            {{ basicGridsForm.remark }}
          </p>
        </FormItem>
        </Col>
      </Row>

      <!--      <Row>-->
      <!--        <Col span="12">-->
      <!--          <FormItem label="经纬度" prop="position">-->
      <!--            <Input type="text" :maxlength=50 v-model="basicGridsForm.position"-->
      <!--                   placeholder="请输入经纬度"/>-->
      <!--          </FormItem>-->
      <!--        </Col>-->
      <!--        <Col span="12">-->
      <!--          <FormItem label="排序">-->
      <!--            <InputNumber :max="1000" :min="0" v-model="basicGridsForm.orderNumber" style="width: 250px;"></InputNumber>-->
      <!--          </FormItem>-->
      <!--        </Col>-->
      <!--      </Row>-->
      <!--      <Row>-->
      <!--        <FormItem label="备注">-->
      <!--          <Input type="textarea" v-model="basicGridsForm.remark" placeholder="请输入备注" class="address_class"/>-->
      <!--        </FormItem>-->
      <!--      </Row>-->
    </Form>
    <div slot="footer">
      <Button type="text" @click="show=false">取消</Button>
    </div>
  </Modal>
</template>
<script>
import { getBasicGrids } from '@/api/zhsq/basicGrids/basicGrids'
import { getDictionary } from '../../../api'
export default {
  name: 'UpdateBasicGrids',
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
      organizationPriority: [],
      show: this.value,
      editTitle: this.modalTitle,
      loading: true,
      disabled: false,
      basicGridsForm: {
        code: '',
        name: '',
        streetName: '',
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
      }
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
      if (this.editTitle == '查看') {
        this.disabled = true
      } else {
        this.disabled = false
      }
      if (val) {
        this.$refs['basicGridsForm'].resetFields()
        if (this.BasicGridsId != null && this.BasicGridsId.trim().length > 0) {
          getDictionary({ fieldName: 'organizationData' }).then(res2 => {
            if (res2.success) {
              this.organizationPriority = res2.data
              getBasicGrids({ id: this.BasicGridsId }).then(res3 => {
                if (res3.code == 200) {
                  this.basicGridsForm.code = res3.data.code
                  this.basicGridsForm.name = res3.data.name
                  this.basicGridsForm.streetId = res3.data.streetId
                  this.basicGridsForm.streetName = res3.data.streetName
                  this.basicGridsForm.communityId = res3.data.communityId
                  this.basicGridsForm.communityName = res3.data.communityName
                  this.basicGridsForm.gridPersonId = res3.data.gridPersonId
                  this.basicGridsForm.gridPersonName = res3.data.gridPersonName
                  this.basicGridsForm.organization = res3.data.organization
                  // if(res3.data.organization){
                  //     let filter = this.organizationPriority.filter(item => item.number == res3.data.organization);
                  //     if(filter && filter.length > 0){
                  //         this.basicGridsForm.organization = filter[0].name;
                  //     }
                  // }
                  this.basicGridsForm.position = res3.data.position
                  this.basicGridsForm.orderNumber = res3.data.orderNumber
                  this.basicGridsForm.remark = res3.data.remark
                  this.basicGridsForm.area = res3.data.area + ' 平方米'
                  this.basicGridsForm.address = res3.data.address
                  this.basicGridsForm.information = res3.data.information
                  this.basicGridsForm.type = res3.data.type
                  this.basicGridsForm.userName = res3.data.userName
                  // this.basicGridsForm.password = res.data.password;
                  if (res3.data.password != '') {
                    this.basicGridsForm.password = '*****'
                  }
                  this.basicGridsForm.recognitionFaceId = res3.data.recognitionFaceId
                } else {
                  this.$Message.error(res3.msg)
                }
              })
            }
          })
        }
      } else {
        this.closeModal(val)
      }
    }
  },
  methods: {
    closeModal(val) {
      this.$emit('input', val)
    },
    initForm() {
      this.basicGridsForm = {
        code: '',
        name: '',
        communityId: '',
        gridPerson: '',
        organization: '',
        position: '',
        orderNumber: 1,
        remark: '',
        information: '',
        address: '',
        area: '',
        type: ''
      }
    },
    showPosition() {

    }
  }
}
</script>
