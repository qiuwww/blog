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

      <FormItem label="名称" prop="name">
        <Input v-bind:disabled="disabled" type="text" :maxlength=50 v-model="deptForm.name" placeholder="请输入名称"/>
      </FormItem>

      <FormItem label="上级部门" prop="pid" v-if="isNotEdit ">
        <TreeSelect v-model="deptForm.pid" :data="pidPriority" v-width="200" />
      </FormItem>

      <FormItem label="状态" prop="enabled">
        <RadioGroup v-bind:disabled="disabled" v-model="deptForm.enabled">
          <Radio v-for="(item,i) in enabledRadio"  v-bind:disabled="disabled":key="i" :label="item.label">{{item.label}}</Radio>
        </RadioGroup>
      </FormItem>

    </Form>
    <div slot="footer">
      <Button type="text" @click="show=false">取消</Button>
      <Button type="primary" :loading="loading" @click="handelSubmit" v-if="!disabled">提交</Button>
    </div>
  </Modal>
</template>
<script>
  import {add, edit, getDept,getDpetById} from '@/api/system/dept'
  import {getDictDataByType} from '@/api/index';
  import {formartDate} from '@/api/tools/tool'

  export default {
    name: "updateDept",
    props: {
      value: {
        type: Boolean,
        default: false
      },
      DeptId: {
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
          name: '',
          pid: '0',
          enabled: '',
        },
        departVisible: false,
        selectModel: "",
        deptFormRule: this.getDeptFormRule(),
        isNotEdit:true
      }
    },
    methods: {
      //获取上级部门
      getPidPriority() {
        getDept('').then(res => {
          if (res.content) {
            this.pidPriority = this.getTreeData(res.content);
          }
        });
      },
      //生成部门
      getTreeData(data) {
        if (data) {

          for (let i in data) {
            var item = data[i];

            data[i].title = data[i].label;
            data[i].value = data[i].id;
            data[i].expand = true;
            if (data[i].children) {
              data[i].children = this.getTreeData(data[i].children);
            }
          }
        }
        return data;
      },
      //获取部门状态
      getEnabledRadio() {
        getDictDataByType('dept_status').then(res => {
          if (res && res.success) {
            this.enabledRadio = res.data;
          }
        });
      },
      //提交
      handelSubmit() {
        this.loading = true;
        this.$refs['deptForm'].validate((valid) => {
          if (valid) {
            if (this.deptForm.enabled == "启用") {
              this.deptForm.enabled = true;
            } else {
              this.deptForm.enabled = false;
            }
            if (this.DeptId != null && this.DeptId.trim().length > 0) {
              this.deptForm.id = this.DeptId;
              edit(this.deptForm).then(res => {
                this.loading = false;
                if (res!=null) {
                  this.closeModal(false);
                  this.$emit('handleSearch');
                  this.$Message.success('保存成功');
                } else {
                  this.$Message.error('保存失败');
                }
              })
            } else {
              add(this.deptForm).then(res => {
                this.loading = false;
                if (res) {
                  this.closeModal(false);
                  this.$emit('handleSearch');
                  this.$Message.success('保存成功');
                } else {
                  this.$Message.error('保存失敗');
                }
              })
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
      //初始化表单
      initForm() {
        this.deptForm = {
          name: '',
          pid: '0',
          enabled: '启用',
        };
        this.selectModel = "";
        this.departVisible = false;
      },
      getDeptFormRule() {
        return {
          name: [
            {required: true, message: '名称不能为空！', trigger: 'blur'},
            {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
          ],
          pid: [
            {required: false, pattern: /^[0-9]+$/, message: '上级部门不能为空！', trigger: 'blur'},
          ],
          enabled: [
            {required: true, message: '状态不能为空！', trigger: 'blur', pattern: /.+/},
          ],
        }
      },
      //部门树点击事件
      handleCheckChange(data) {

        this.deptForm.pid = data[0].value;
        this.departVisible = false;
        this.selectModel = data[0].title;
      }
    },
    watch: {
      value(val) {
        this.show = val;
      },
      show(val) {
        this.getPidPriority(),
          this.getEnabledRadio(),
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
          if (this.DeptId != null && this.DeptId.trim().length > 0) {
            this.isNotEdit = false;
            getDpetById({id: this.DeptId}).then(res => {
              if (res!=null) {
                this.deptForm.name = res.name;
                this.deptForm.pid = res.pid;
                this.deptForm.createTime = res.createTime;
                if (res.enabled) {
                  this.deptForm.enabled = "启用";
                } else {
                  this.deptForm.enabled = "停用";
                }
              } else {
                this.$Message.error('查询失败');
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
