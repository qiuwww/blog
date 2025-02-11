<style lang="less">
  .lookActivity {
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
         class="lookActivity">
    <f-render
      v-model="formData"
      @save="handleSave"
      :request-fn="handleSubmit"
      :loading="uploadLoading"
      :visible="renderShow"
      height="calc(100vh - 60px)"
      :formDesc="formDesc"
      :config="formDesc" pure></f-render>
    <div slot="footer" style="display: none">
      <Button type="text" @click="show=false">取消</Button>
    </div>
  </Modal>
</template>
<script>
  import {
    addTFormGenerator,
    updateTFormGenerator,
    getTFormGenerator,
    getTFormGeneratorDynamics
  } from '@/api/tFormGenerator/tFormGenerator'
  import {getDictDataByType} from '@/api/index';
  import {getToken} from '@/utils/auth'
  import {
    addActivity, updateActivity, getActivityById
  } from "@/api/activiti";

  export default {
    name: "lookActivity",
    props: {
      value: {
        type: Boolean,
        default: false
      },
      tFormGeneratorId: {
        type: String
      },
      applyActivityProcDefId: {
        type: String
      },

      modalTitle: {
        type: String
      },
      title: {
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
        headers: {'Authorization': getToken()},
        file: null,
        uploadLoading: false,
        frenderShow: false,
        formDesc: {},
        json: {},//动态表单的配置（json格式）
        tableName: "",//数据存入的表
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
          this.frenderShow = true;
          localStorage.setItem("form-config", res);
          this.tFormGeneratorForm.jsonStr = res;
          this.handelSubmit();
        }
      },

      //页面提交
      handleSubmit(data) {

        this.loading = true;
        if (data) {

          if (this.tFormGeneratorId && this.tFormGeneratorId.toString().trim().length > 0) {
            data['id'] = this.tFormGeneratorId;
            updateActivity({model: data, tableName: this.tableName}).then(res => {
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
            addActivity({
              model: data,
              tableName: this.tableName,
              procDefId: this.applyActivityProcDefId,
              title: this.title
            }).then(res => {
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
          this.$Message.error('表单数据出问题了。请联系管理员！');
        }
      },
      closeModal(val) {
        this.$emit('input', val);
      },
      initForm() {
        this.tFormGeneratorForm = {
          formName: '',
          jsonStr: "",
        };
        this.formData = {};
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
        this.frenderShow = false;
        if (this.editTitle == "查看") {
          this.disabled = true;
        } else {
          this.disabled = false;
        }

        if (val) {
          this.formDesc = {};

          if (this.applyActivityProcDefId != null && this.applyActivityProcDefId.trim().length > 0) {
            let _this = this;
            getTFormGeneratorDynamics({procDefId: this.applyActivityProcDefId,status:1}).then(res => {
              if (res && res.code) {
                if (res && res.code == 200) {
                  if (res.data && res.data.length > 0) {
                    _this.tFormGeneratorForm.formName = res.data[0].formName;
                    _this.tFormGeneratorForm.jsonStr = res.data[0].jsonStr;
                    _this.formDesc = JSON.parse(JSON.stringify(res.data[0].jsonStr));

                    _this.json = JSON.parse(res.data[0].jsonStr);
                    if (_this.json && _this.json.tableName) {
                      _this.tableName = _this.json.tableName;
                      if (this.tFormGeneratorId != null && this.tFormGeneratorId.trim().length > 0) {
                        getActivityById({id: this.tFormGeneratorId, tableName: _this.tableName}).then(resData => {
                          if (resData && resData.code) {
                            if (resData.code == 200) {
                              if (resData.data) {
                                _this.formData = resData.data;
                              } else {
                                _this.$Message.error("查询失败");
                              }

                            } else {
                              _this.$Message.error(res.msg);
                            }
                          } else {
                            _this.$Message.error(res.msg);
                          }
                        });
                      }
                    }
                  } else {
                    _this.$Message.error("当前流程还未绑定表单！");
                    _this.closeModal(false);
                  }

                } else {
                  _this.$Message.error(res.msg);
                }
              } else {
                _this.$Message.error(res.msg);
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
