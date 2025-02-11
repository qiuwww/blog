<style lang="less">
  .basicFile {

    .ivu-input[disabled], fieldset[disabled] .ivu-input {
      width: 380px;
      background-color: transparent;
      color: #515a6e !important
    }

    .ivu-form-item-error-tip {
      left: 80px;
    }

    .ivu-form .ivu-form-item-label {
      width: 90px;
    }

    .ivu-select {
      width: 180px;
    }

    .ivu-input-wrapper {
      width: auto !important;
    }

    .ivu-form-item-content .address_class input, .ivu-form-item-content .address_class textarea {
      width: 521px;
    }

    .demo-spin-icon-load{
      animation: ani-demo-spin 1s linear infinite;
    }
  }
</style>
<template>
  <Modal v-model="show" :title="editTitle" :mask-closable="false" class="basicFile"  width="680">
    <Spin fix v-if="uploadFileLoading">
      <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
      <div>文件上传中.....</div>
    </Spin>

    <Form ref="basicFileForm" :model="basicFileForm" :rules="basicFileFormRule">
      <Row><div style="margin-left: 84px;color: red;" >*请上传geojson文件（.json 文件格式）</div></Row>
      <Row>
        <Col span="18">
          <FormItem label="文件名称" prop="fileName">
            <Input type="text" disabled :maxlength=100 v-model="basicFileForm.fileName" placeholder="请点击右侧按钮选择文件"/>
          </FormItem>


        </Col>
        <Col span="6">
          <Upload ref="upload" :before-upload="handleUpload" :action="action" accept=".json" :headers="header" :show-upload-list="false"
                  :on-error="handleFormatError" :on-success="handleSuccess">
            <Button icon="ios-cloud-upload-outline">请选择文件</Button>
          </Upload>
        </Col>

      </Row>

      <Row>
        <FormItem label="是否填充">
          <i-switch size="large" v-model="basicFileForm.whetherToFill" :true-value="1" :false-value="0">
            <span slot="open">启用</span>
            <span slot="close">禁用</span>
          </i-switch>
        </FormItem>
      </Row>
      <Row>
        <FormItem label="填充色">
          <ColorPicker v-model="basicFileForm.fillColor"/>
        </FormItem>
      </Row>
      <Row>
        <FormItem label="备注">
          <Input :rows="3" type="textarea" v-model="basicFileForm.remark" placeholder="请输入备注" :maxlength=500 class="address_class"/>
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
    import {addBasicFile, updateBasicFile, getBasicFile} from '@/api/zhsq/basicFile/basicFile'
    import { getToken } from '@/utils/auth'
    export default {
        name: "updateBasicFile",
        computed: {
          header() {
            return {
              Authorization: 'bearer ' + getToken(),
              'User-Type': 'Gov_User'
            }
          },
          action() {
            return `${window.location.origin}/api/download/fileUpload`
          }
        },
        props: {
            value: {
                type: Boolean,
                default: false
            },
            addType: {
                type: String,
                default: ""
            },
            BasicFileId: {
                type: String
            },
            modalTitle: {
                type: String
            }
        },
        data() {
            return {
                uploadFileLoading:false,
                fileType: false,
                file: null,
                show: this.value,
                editTitle: this.modalTitle,
                loading: true,
                disabled: false,
                basicFileForm: {
                    fileName: "",
                    fillColor: '#19be6b',
                    whetherToFill: 1,
                    remark: ''
                },
                basicFileFormRule: this.getBasicFileFormRule()
            }
        },
        methods: {
            handleUpload(file) {
                let s = file.name.substring(file.name.indexOf('.') + 1, file.name.length);
                if (s != 'json' && s != 'JSON') {
                    this.$Message.error("文件格式不正确！请选择json文件！");
                    this.fileType = false;
                    return false;
                }
                this.fileType = true;
                if (file) {
                    this.basicFileForm.fileName = file.name;
                }
                this.uploadFileLoading = true;
                return true;
            },
            handleSuccess(res, file) {
              this.basicFileForm.file = res.data;
              this.basicFileForm.filePath = res.data
              this.uploadFileLoading = false
            },
            handleFormatError(file) {
                this.uploadFileLoading = false
                this.$Message.error("文件上传失败！请重试");
            },
            handelSubmit() {
                this.loading = true;
                this.$refs['basicFileForm'].validate((valid) => {
                    if (valid) {
                        if (this.BasicFileId != null && this.BasicFileId.trim().length > 0) {
                            this.basicFileForm.id = this.BasicFileId;
                            this.basicFileForm.type = this.addType;
                            if (this.fileType) {
                                updateBasicFile(this.basicFileForm).then(res => {
                                    if (res && res.success) {
                                        this.loading = false;
                                        this.closeModal(false);
                                        this.$emit('handleSearch');
                                        this.$Message.success('修改成功');
                                    } else {
                                        this.$Message.error(res.msg);
                                    }
                                }).catch(res => {
                                    this.$Message.error('修改失败');
                                    this.loading = false;
                                });
                            }else {
                                this.$Message.error("文件类型错误，必须是json文件！");
                            }
                        } else {
                            if (this.fileType) {
                                this.basicFileForm.type = this.addType;
                                addBasicFile(this.basicFileForm).then(res => {
                                    if (res && res.success) {
                                        this.loading = false;
                                        this.closeModal(false);
                                        this.$emit('handleSearch');
                                        this.$Message.success('添加成功');
                                    } else {
                                        this.$Message.error(res.msg);
                                    }
                                }).catch(res => {
                                    this.$Message.error('添加失败');
                                    this.loading = false;
                                });
                            } else {
                                this.$Message.error("文件类型错误，必须是json文件！");
                            }
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
                this.basicFileForm = {
                    fileName: '',
                    filePath: '',
                    fileType: '',
                    fileSize: '',
                    remark: '',
                    whetherToFill: 1,
                    fillColor: '#19be6b'

                };
            },
            getBasicFileFormRule() {
                return {
                    fileName: [
                        {required: true, message: '文件名称不能为空！', trigger: 'blur'},
                        {type: 'string', max: 100, message: '数据的最大长度为50！', trigger: 'blur'}
                    ],
                    filePath: [
                        {required: true, message: '请选择需要上传的文件！', trigger: 'blur'},
                        {type: 'string', max: 100, message: '数据的最大长度为100！', trigger: 'blur'}
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
                if (this.editTitle == "查看") {
                    this.disabled = true;
                } else {
                    this.disabled = false;
                }
                if (val) {
                    this.$refs['basicFileForm'].resetFields();
                    if (this.BasicFileId != null && this.BasicFileId.trim().length > 0) {
                        getBasicFile({id: this.BasicFileId}).then(res => {
                            if (res && res.code == 200) {
                                this.basicFileForm.fileName = res.data.fileName;
                                this.basicFileForm.filePath = res.data.filePath;
                                this.basicFileForm.fileType = res.data.fileType;
                                this.basicFileForm.whetherToFill = res.data.whetherToFill;
                                this.basicFileForm.fillColor = res.data.fillColor;
                                this.basicFileForm.remark = res.data.remark;
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
