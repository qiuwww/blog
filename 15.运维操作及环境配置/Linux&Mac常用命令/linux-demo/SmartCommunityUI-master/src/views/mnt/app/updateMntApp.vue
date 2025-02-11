<style lang="less">
  .mntApp {
    .ivu-modal {
      width: 560px !important;
      top: 50%;
      transform: translateY(-50%);
    }

    .ivu-form .ivu-form-item-label {
      width: 120px;
    }

    .ivu-input-wrapper{
      width: 357px !important;
    }
    .ivu-input-number{
      width: 357px !important;
    }
  }
</style>
<template>
  <Modal v-model="show" :title="editTitle" :mask-closable="false" class="mntApp">
    <Form ref="mntAppForm" :model="mntAppForm" :rules="mntAppFormRule" >

      <FormItem label="应用名称" prop="name">
        <Input v-bind:disabled="disabled" type="text" :maxlength=50 v-model="mntAppForm.name" placeholder="请输入应用名称"/>
      </FormItem>

      <FormItem label="上传目录" prop="uploadPath">
        <Input v-bind:disabled="disabled" type="text" :maxlength=50 v-model="mntAppForm.uploadPath"
               placeholder="请输入上传目录"/>
      </FormItem>

      <FormItem label="部署路径" prop="deployPath">
        <Input v-bind:disabled="disabled" type="text" :maxlength=50 v-model="mntAppForm.deployPath"
               placeholder="请输入部署路径"/>
      </FormItem>

      <FormItem label="备份路径" prop="backupPath">
        <Input v-bind:disabled="disabled" type="text" :maxlength=50 v-model="mntAppForm.backupPath"
               placeholder="请输入备份路径"/>
      </FormItem>

      <FormItem label="应用端口" prop="port" >
        <InputNumber v-bind:disabled="disabled" number type="text" :maxlength=50 v-model="mntAppForm.port" placeholder="请输入应用端口"/>
      </FormItem>

      <FormItem label="启动脚本" prop="startScript">
        <Input v-bind:disabled="disabled" :rows="3" type="textarea" v-model="mntAppForm.startScript"
               placeholder="请输入启动脚本"/>
      </FormItem>

      <FormItem label="部署脚本" prop="deployScript">
        <Input v-bind:disabled="disabled" :rows="3" type="textarea" v-model="mntAppForm.deployScript"
               placeholder="请输入部署脚本"/>
      </FormItem>

    </Form>
    <div slot="footer">
      <Button type="text" @click="show=false">取消</Button>
      <Button type="primary" :loading="loading" @click="handelSubmit">提交</Button>
    </div>
  </Modal>
</template>
<script>
  import {add, edit, getAppById} from '@/api/mnt/app'

  export default {
    name: "edit",
    props: {
      value: {
        type: Boolean,
        default: false
      },
      MntAppId: {
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
        mntAppForm: {
          name: '',
          uploadPath: '',
          deployPath: '',
          backupPath: '',
          port: '',
          startScript: '',
          deployScript: '',
        },
        mntAppFormRule: this.getAppByIdFormRule()
      }
    },
    methods: {
      handelSubmit() {
        this.loading = true;
        this.$refs['mntAppForm'].validate((valid) => {
          if (valid) {
            if (this.MntAppId != null && this.MntAppId.trim().length > 0) {
              this.mntAppForm.id = this.MntAppId;
              edit(this.mntAppForm).then(res => {
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
              add(this.mntAppForm).then(res => {
                this.loading = false;
                if (res!=null) {
                  this.closeModal(false);
                  this.$emit('handleSearch');
                  this.$Message.success('保存成功');
                } else {
                  this.$Message.error('保存失败');
                }
              })
            }
          } else {
            this.loading = true;
            this.$Message.error('表单验证不通过！');
          }
        });
      },
      closeModal(val) {
        this.$emit('input', val);
      },
      initForm() {
        this.mntAppForm = {
          name: '',
          uploadPath: '/opt/upload',
          deployPath: '/opt/app',
          backupPath: '/opt/backup',
          port: 8080,
          startScript: '',
          deployScript: '',
        };
      },
      getAppByIdFormRule() {
        return {
          name: [
            {required: true, message: '应用名称不能为空！', trigger: 'blur'},
            {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
          ],
          uploadPath: [
            {required: true, message: '上传目录不能为空！', trigger: 'blur'},
            {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
          ],
          deployPath: [
            {required: true, message: '部署路径不能为空！', trigger: 'blur'},
            {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
          ],
          backupPath: [
            {required: true, message: '备份路径不能为空！', trigger: 'blur'},
            {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
          ],
          port: [
            {required: true, message: '应用端口不能为空！', trigger: 'blur',type: 'number',},
          ],
          startScript: [
            {required: true, message: '启动脚本不能为空！', trigger: 'blur', pattern: /.+/},
          ],
          deployScript: [
            {required: true, message: '部署脚本不能为空！', trigger: 'blur', pattern: /.+/},
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
          this.$refs['mntAppForm'].resetFields();
          if (this.MntAppId != null && this.MntAppId.trim().length > 0) {
            getAppById({id: this.MntAppId}).then(res => {
              if (res.id != undefined && res.id != null) {
                this.mntAppForm.name = res.name;
                this.mntAppForm.uploadPath = res.uploadPath;
                this.mntAppForm.deployPath = res.deployPath;
                this.mntAppForm.backupPath = res.backupPath;
                this.mntAppForm.port = res.port;
                this.mntAppForm.startScript = res.startScript;
                this.mntAppForm.deployScript = res.deployScript;
              } else {
                this.$Message.error("查询失败");
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
