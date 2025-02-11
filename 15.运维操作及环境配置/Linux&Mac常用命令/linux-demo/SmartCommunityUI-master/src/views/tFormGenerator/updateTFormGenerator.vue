<style lang="less">
  .updateTFormGenerator {
    .ivu-modal-body {
      overflow: hidden;
    }

    .ivu-modal-body:hover {
      overflow-y: scroll;
    }

    .ivu-modal-body:hover::-webkit-scrollbar {
      /*滚动条整体样式*/
      width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
      height: 1px;
    }

    .ivu-modal-body:hover::-webkit-scrollbar-thumb {
      /*滚动条里面小方块*/
      border-radius: 5px;
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      background: #aaa;
    }

    .ivu-modal-body:hover::-webkit-scrollbar-track {
      /*滚动条里面轨道*/
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      border-radius: 5px;
      background: #ededed;
    }
  }
</style>
<template>
  <Modal v-model="show" :title="editTitle" fullscreen :loading="uploadLoading" :mask-closable="false"
         class="updateTFormGenerator" :z-index="2">
    <Form ref="tFormGeneratorForm" :model="tFormGeneratorForm" :label-width="10" :rules="tFormGeneratorFormRule">
<!--      <FormItem label="表单名称" prop="formName">-->
<!--        <Input v-bind:disabled="disabled" type="text" :maxlength=50 v-model="tFormGeneratorForm.formName"-->
<!--               placeholder="请输入表名称"/>-->
<!--      </FormItem>-->
      <FormItem label="" prop="jsonStr">
        <Input v-show="false" v-bind:disabled="disabled" type="text" v-model="tFormGeneratorForm.jsonStr"
               placeholder="请输入表单内容"/>
        <f-render
          v-model="formData"
          :fatherMethod="fatherMethod"
          @save="handleSave"
          :loading="uploadLoading"
          :visible="renderShow"
          height="calc(100vh - 60px)"
          :formDesc="formDesc"
          :config="formDesc"
        />
      </FormItem>

    </Form>
    <div slot="footer">
      <Button type="text" @click="show=false">取消</Button>
<!--      <Button type="primary" :loading="loading" @click="handelSubmit">提交</Button>-->
    </div>
  </Modal>
</template>
<script>
  import {addTFormGenerator, updateTFormGenerator, getTFormGenerator} from '@/api/tFormGenerator/tFormGenerator'
  import {getDictDataByType} from '@/api/index';
  import {formartDate} from '@/api/tools/tool'
  import {getToken} from '@/utils/auth'
  import {mapGetters} from "vuex";

  export default {
    name: "updateTFormGenerator",
    props: {
      value: {
        type: Boolean,
        default: false
      },
      TFormGeneratorId: {
        type: String
      },
      modalTitle: {
        type: String
      }
    },
    data() {
      return {
        formData: {},
        renderShow: true,
        show: this.value,
        editTitle: this.modalTitle,
        loading: true,
        disabled: false,
        tFormGeneratorForm: {
          formName: '',
          jsonStr: ''
        },
        isDeletePriority: [
          {
            label: '是',
            value: 1
          },
          {
            label: '否',
            value: 0
          }
        ],
        tFormGeneratorFormRule: this.getTFormGeneratorFormRule(),
        headers: {'Authorization': getToken()},
        file: null,
        uploadLoading: false,
        frenderShow: false,
        formDesc: {}
      }
    },
    methods: {
      //传递参数
      fatherMethod(formName) {
        this.formName = formName;
      },

      handleUpload(file) {
        this.file = file;
        return false;
      },
      uploadSuccess(response, file, fileList) {//上传成功
        if (response) {
          this.$Message.success('上传成功');
          this.$emit('handleSearch');
          this.file = '';
          this.uploadLoading = falsel;
        }
      },
      uploadError(error, file, fileList) {//上传失败
        if (error) {
          this.$Message.error('上传失败');
          this.$emit('handleSearch');
        }
      },
      uploadOk() {
        this.uploadLoading = true;

        this.$emit('handleSearch');
      },
      setCreateTime(e) {
        this.tFormGeneratorForm.createTime = e;
      },
      //表单保存
      handleSave(res) {
        if (res) {

          let resJSon = eval('(' + res + ')')
          if (res == undefined || res == null || resJSon == undefined || resJSon == null || resJSon.formName == undefined || resJSon.formName == null) {
            this.$message.error("表单名不能为空！！")
            return;
          }
          if (res == undefined || res == null || resJSon == undefined || resJSon == null || resJSon.tableName == undefined || resJSon.tableName == null) {
            this.$message.error("关联的表名不能为空！！")
            return;
          }
          this.frenderShow = true;
          //localStorage.setItem("form-config", res);
          this.tFormGeneratorForm.jsonStr = res;
          this.tFormGeneratorForm.formName = resJSon.formName;
          this.handelSubmit();
        }
      },

      //页面提交
      handelSubmit() {
        this.$refs['tFormGeneratorForm'].validate((valid) => {
          this.loading = true;
          if (valid) {

            if (this.TFormGeneratorId != null && this.TFormGeneratorId.trim().length > 0) {

              this.tFormGeneratorForm.id = this.TFormGeneratorId;
              updateTFormGenerator(this.tFormGeneratorForm).then(res => {
                this.loading = false;
                if (res) {
                  if (res && res.code == 200) {
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
              addTFormGenerator(this.tFormGeneratorForm).then(res => {
                this.loading = false;
                if (res) {
                  if (res && res.code == 200) {
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
            if (!this.frenderShow) {
              this.$Message.error("请拖拉拽形成表单并点击右上角的保存数据！！");
              return
            }

            this.$Message.error('表单验证不通过！');
          }
        });
      },
      closeModal(val) {
        this.$emit('input', val);
      },
      initForm() {
        this.tFormGeneratorForm = {
          formName: '',
          jsonStr: "",
        };
      },
      getTFormGeneratorFormRule() {
        return {
          formName: [
            {required: true, message: '表单名称不能为空！', trigger: 'blur'},
            {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
          ],
          name: [
            {required: true, message: '附件名称不能为空！', trigger: 'blur', pattern: /.+/},
          ],
          jsonStr: [
            {required: true, message: '附件名称不能为空！', trigger: 'blur', pattern: /.+/},
          ]
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
        this.frenderShow = false;
        if (this.editTitle == "查看") {
          this.disabled = true;
        } else {
          this.disabled = false;
        }
        if (val) {
          this.formDesc = {};
          if (this.TFormGeneratorId != null && this.TFormGeneratorId.trim().length > 0) {
            getTFormGenerator({id: this.TFormGeneratorId}).then(res => {
              if (res) {
                if (res && res.code == 200) {
                  this.tFormGeneratorForm.formName = res.data.formName;
                  this.tFormGeneratorForm.jsonStr = res.data.jsonStr;
                  this.formDesc = JSON.parse(JSON.stringify(res.data.jsonStr));

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
