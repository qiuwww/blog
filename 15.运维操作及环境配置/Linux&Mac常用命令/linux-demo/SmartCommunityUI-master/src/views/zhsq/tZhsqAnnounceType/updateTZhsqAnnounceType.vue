<style lang="less">
.tZhsqAnnounceType {
  .ivu-modal {
    width: 560px !important;
    top: 50%;
    transform: translateY(-50%);
  }

  .form-item-input {
    width: 800px;
  }
  .ivu-form-item {
    width: 100%;
    margin-bottom: 25px!important;
  }

  .ivu-input-wrapper .ivu-input-number-input {
    width: auto !important;
  }
}
</style>
<template>
  <Modal v-model="show" :title="editTitle" :mask-closable="false">
    <Form ref="tZhsqAnnounceTypeForm" :model="tZhsqAnnounceTypeForm" :rules="tZhsqAnnounceTypeFormRule"
          class="tZhsqAnnounceType" label-width="100">
      <Row>
          <FormItem label="类型名称" prop="typeName">
            <Input v-bind:disabled="disabled" type="text" :maxlength=50 v-model="tZhsqAnnounceTypeForm.typeName"
                   placeholder="请输入类型名称"/>
          </FormItem>
      </Row>
      <Row>
          <FormItem label="是否显示" prop="announceShow">
            <RadioGroup  v-model="tZhsqAnnounceTypeForm.announceShow">
              <Radio v-bind:disabled="disabled" :label="'0'">是</Radio>
              <Radio v-bind:disabled="disabled" :label="'1'">否</Radio>
            </RadioGroup>

          </FormItem>
      </Row>

      <Row>
          <FormItem label="排序" prop="announceSort">
            <Tooltip trigger="hover" placement="right" content="值越小越靠前，支持小数">
              <InputNumber style="width: 378px;" :max="1000" :min="0" v-bind:disabled="disabled" v-model="tZhsqAnnounceTypeForm.announceSort" placeholder="请输入排序码"/>
            </Tooltip>
          </FormItem>
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
  addTZhsqAnnounceType,
  getTZhsqAnnounceType,
  updateTZhsqAnnounceType
} from '@/api/zhsq/tZhsqAnnounceType/tZhsqAnnounceType'
import {formartDate} from '@/api/tools/tool'

export default {
  name: "updateTZhsqAnnounceType",
  props: {
    value: {
      type: Boolean,
      default: false
    },
    TZhsqAnnounceTypeId: {
      type: String
    },
    modalTitle: {
      type: String
    }
  },
  data() {
    return {
      show: this.value,
      editTitle: this.modalTitle,
      loading: true,
      disabled: false,
      tZhsqAnnounceTypeForm: {
        announceShow: '0',
        createTimeTime: '',
        createTime: '',
        announceSort: '',
        typeName: '',
      },
      tZhsqAnnounceTypeFormRule: this.getTZhsqAnnounceTypeFormRule()
    }
  },
  methods: {
    setCreateTime(e) {
      this.tZhsqAnnounceTypeForm.createTime = e;
    },
    handelSubmit() {
      this.$refs['tZhsqAnnounceTypeForm'].validate((valid) => {
        this.loading = true;
        if (valid) {
          if (this.TZhsqAnnounceTypeId != null && this.TZhsqAnnounceTypeId.trim().length > 0) {
            this.tZhsqAnnounceTypeForm.id = this.TZhsqAnnounceTypeId;
            updateTZhsqAnnounceType(this.tZhsqAnnounceTypeForm).then(res => {
              this.loading = false;
              if (res) {
                if (res.code == 200) {
                  this.closeModal(false);
                  this.$emit('handleSearch');
                  this.$Message.success('保存成功');
                } else {
                  this.$Message.error(res.msg);
                }
              } else {
                this.$Message.error('保存失败');
              }
            }).catch(err => {
              this.loading = false;
            });
          } else {
            addTZhsqAnnounceType(this.tZhsqAnnounceTypeForm).then(res => {
              this.loading = false;
              if (res) {
                if (res.code == 200) {
                  this.closeModal(false);
                  this.$emit('handleSearch');
                  this.$Message.success('保存成功');
                } else {
                  this.$Message.error(res.msg);
                }
              } else {
                this.$Message.error('保存失败');
              }
            }).catch(err => {
              this.loading = false;
            });
          }
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
      this.tZhsqAnnounceTypeForm = {
        announceShow: '',
        createTimeTime: '',
        createTime: '',
        announceSort: '',
        typeName: '',
      };
    },
    getTZhsqAnnounceTypeFormRule() {
      return {
        announceShow: [
          {required: true, message: '是否显示不能为空！', trigger: 'blur', pattern: /.+/},
        ],
        createTimeTime: [
          {required: true, message: '创建时间不能为空！', trigger: 'blur', pattern: /.+/},
        ],
        announceSort: [
          {required: true,type: "number",message: "排序码不能为空",trigger: "blur"}
        ],
        typeName: [
          {required: true, message: '类型名称不能为空！', trigger: 'blur'},
          {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
        ],
      }
    }
  },
  watch: {
    value(val) {
      this.show = val;
    },
    show(val) {
      this.initForm();
      this.loading = false;
      this.editTitle = this.modalTitle;
      if (this.editTitle == "查看") {
        this.disabled = true;
      } else {
        this.disabled = false;
      }
      if (val) {
        this.$refs['tZhsqAnnounceTypeForm'].resetFields();
        if (this.TZhsqAnnounceTypeId != null && this.TZhsqAnnounceTypeId.trim().length > 0) {
          getTZhsqAnnounceType({id: this.TZhsqAnnounceTypeId}).then(res => {
            if (res) {
              if (res.code == 200) {
                this.tZhsqAnnounceTypeForm.announceShow = res.data.announceShow;
                if (res.data.createTime != '') {
                  this.tZhsqAnnounceTypeForm.createTimeTime = formartDate(new Date(res.data.createTime).getTime(), 'yyyy-MM-dd hh:mm:ss');
                  this.tZhsqAnnounceTypeForm.createTime = formartDate(new Date(res.data.createTime).getTime(), 'yyyy-MM-dd hh:mm:ss');
                }
                this.tZhsqAnnounceTypeForm.announceSort = res.data.announceSort;
                this.tZhsqAnnounceTypeForm.typeName = res.data.typeName;
              } else {
                this.$Message.error(res.msg);
              }
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
