<style lang="less">
.dept {
  .ivu-modal {
    width: 400px !important;
    top: 50%;
    transform: translateY(-50%);
  }
  .form-item-input {
    width: 240px;
  }
  .ivu-form-item-error-tip {
    left: 80px;
  }
  .ivu-form .ivu-form-item-label {
    width: 100px;
    text-align: right;
  }
  .ivu-select,.vue-treeselect {
    width: 200px !important;
  }
  .vue-treeselect {
    height: 32px;
    float: left;
  }
  .ivu-input-wrapper {
    width: 200px!important;
  }
  .ivu-form-item-content{
    height: 32px;
  }
  .ivu-dropdown {
    position: absolute;
    bottom: -1px;
    right: 70px;
  }
  .ivu-dropdown .ivu-select-dropdown {
    width: 200px;
    left: -163px !important;
  }
}
</style>
<template>
  <Modal v-model="show" :title="editTitle" :mask-closable="false" class="dept">
    <Form ref="deptForm" :model="deptForm" :rules="deptFormRule" >

      <FormItem label="名称" prop="siteName">
        <Input v-bind:disabled="disabled" type="text" :maxlength=50 v-model="deptForm.siteName" placeholder="请输入名称"/>
      </FormItem>

    </Form>
    <div slot="footer">
      <Button type="text" @click="show=false">取消</Button>
      <Button type="primary" :loading="loading" @click="handelSubmit" v-if="!disabled">提交</Button>
    </div>
  </Modal>
</template>
<script>
import {addTZhsqAddressAdministration,getTZhsqAddressAdministration} from '@/api/zhsq/tZhsqAddressAdministration/tZhsqAddressAdministration'

export default {
  name: "updateDept",
  props: {
    value: {
      type: Boolean,
      default: false
    },
    Pid: {
      type: String
    },
    SiteLevel: {
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
      pidPriority: [],
      enabledRadio: [],
      deptForm: {
        siteName: '',
        pid: '0',
        siteLevel:"1",
      },
      departVisible: false,
      selectModel: "",
      deptFormRule: this.getDeptFormRule(),
      isNotEdit:true
    }
  },
  methods: {
    //提交
    handelSubmit() {
      this.loading = true;
      this.deptForm.pid=this.Pid;
      this.deptForm.siteLevel=this.SiteLevel;
      this.$refs['deptForm'].validate((valid) => {
        if (valid) {
            addTZhsqAddressAdministration(this.deptForm).then(res => {
              this.loading = false;
              if (res) {
                this.closeModal(false);
                this.$emit('handleSearch');
                this.$Message.success('保存成功');
              } else {
                this.$Message.error('保存失敗');
              }
            })
        } else {
          this.loading = false;
          this.$Message.error('表单验证不通过！');
        }
      });
    },
    closeModal(val) {
      this.$emit('handleSearch');
      //this.$emit('input', val);
    },
    //初始化表单
    initForm() {
      this.deptForm = {
        siteName: '',
        pid: '0',
        siteLevel:"1",
      };
      this.selectModel = "";
      this.departVisible = false;
    },
    getDeptFormRule() {
      return {
        siteName: [
          {required: true, message: '名称不能为空！', trigger: 'blur'},
          {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
        ],
        pid: [
          {required: false, pattern: /^[0-9]+$/, message: '上级部门不能为空！', trigger: 'blur'},
        ],
      }
    },
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
      this.isNotEdit = true;
      if (val) {
        this.$refs['deptForm'].resetFields();
        // getTZhsqAddressAdministration({id: this.Pid}).then(res => {
        //   if (res!=null) {
        //     this.deptForm.siteName = res.siteName;
        //     this.deptForm.pid = res.pid;
        //     this.deptForm.createTime = res.createTime;
        //   } else {
        //     this.$Message.error('查询失败');
        //   }
        // });
      }
    }
  }
}
</script>
