<style lang="less">
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

    .ivu-form-item {
      margin-bottom: 24px !important;
    }

    .ivu-input-wrapper {
      width: auto !important;
    }
  }
</style>
<template>
  <Modal v-model="show" :title="editTitle" :mask-closable="false" class="basicHousingManage" width="970">
    <Form ref="basicHousingManageForm" :model="basicHousingManageForm" :rules="basicHousingManageFormRule">
      <Row>
        <Col span="24" >
        <FormItem label="房屋地址" prop="streetId">
          <Select
            v-model="basicHousingManageForm.houseId"
            placeholder="请选择"
            label-in-value
            multiple
            style="width: 520px"
            @on-change="streetChange"
          >
            <Option v-for="(item, i) in tempHouseArr" :key="item.id" :value="item.id.toString()">{{ item.address }}</Option>
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

import { getUnits, getFloors, getDoorNumbers, getHouseByPersonId } from '@/api/zhsq/basicHouse/basicHouse'
import { bindHouse, getBasicPerson } from '@/api/zhsq/basicPerson/basicPerson'
import {
  outBind
} from '@/api/zhsq/basicPerson/basicPerson'

export default {
  name: 'UpdateBasicHousing',
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
      personId: this.BasicPersonId,
      isRenter: false,
      show: this.value,
      editTitle: this.modalTitle,
      loading: true,
      basicHousingManageForm: {
        houseId: []
      },
      basicHousingManageFormRule: this.getBasicHousingManageFormRule(),
      tempHouseArr: []
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
      this.getHouseByPersonId()
      this.tempHouseArr = [];
      if (val) {
        this.$refs['basicHousingManageForm'].resetFields()
      } else {
        this.closeModal(val)
      }
    }
  },
  methods: {
    streetChange() {
    },
    getHouseByPersonId() {
      getHouseByPersonId({ personId: this.BasicPersonId }).then(res => {
        if (res && res.success) {
          if (res.data != null && res.data.length > 0) {
            res.data.map((item, index) => {
              const address = item.houseStreet + item.houseCommunity + item.houseGrid + item.houseName + item.buildArchiveName + item.unit + '单元' + item.floor + '层' + item.doorNumber + '号'
              const obj = {
                id: item.id,
                address: address
              }
              this.tempHouseArr.push(obj)
            })
          }
        }
      })
    },
    handelSubmit() {
      const _this = this
      this.$refs['basicHousingManageForm'].validate((valid) => {
        if (valid) {
          if (_this.BasicPersonId && _this.basicHousingManageForm.houseId.length > 0) {
            _this.$Modal.confirm({
              title: '解除绑定',
              content: '您确认要解除房屋和您的绑定吗?',
              loading: true,
              onOk: () => {
                this.userLoading = true
                outBind({ ids: _this.basicHousingManageForm.houseId, personId: _this.BasicPersonId }).then(res => {
                  if (res && res.success) {
                    _this.modalTaskVisible = false
                    _this.$Message.success('解绑成功')
                    _this.$Modal.remove()
                    _this.closeModal(false)
                    _this.$emit('handleSearch')
                  } else {
                    _this.$Modal.remove()
                    _this.$Message.error('解绑失败')
                  }
                })
              },
              onCancel: () => {
                _this.$Message.info('取消了当前的操作行为！')
              }
            })
          } else {
            _this.$Message.error('获取参数失败，请联系管理员！')
            return false
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
      this.basicHousingManageForm = {
        houseId: ''
      }
    },
    getBasicHousingManageFormRule() {
      return {
        houseId: [
          { required: true, message: '小区名称不能为空！', trigger: 'blur', pattern: /.+/ }
        ]
      }
    }
  }
}
</script>
