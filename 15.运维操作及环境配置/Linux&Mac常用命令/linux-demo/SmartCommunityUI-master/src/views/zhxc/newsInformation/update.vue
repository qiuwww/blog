<template>
  <Modal v-model="modalShow" fullscreen :title="modalTitle" class="editBasicMenuInformation" :mask-closable="false" @on-cancel="modalShow=false">
    <Form ref="formInline" :label-width="80" style="width: 90%;margin: 0 auto;">
      <FormItem label="视角信息">
        <Input v-model="perspectiveInfo" placeholder="请输入视角信息"></Input>
      </FormItem>
    </Form>
    <!--    <myQuillEditor :editorContent="editorContent" ref="myQuillEditor"></myQuillEditor>-->
    <myWangEditor :editorContent="editorContent" ref="myWangEditor"></myWangEditor>
    <div slot="footer">
      <Button type="text" @click="modalShow=false">取消</Button>
      <Button type="primary" :loading="submitLoading" @click="saveMenuInformation">提交</Button>
    </div>
  </Modal>
</template>
<script>
    import {
        addBasicMenuInformation,
        editBasicMenuInformation,
        getBasicMenuInformationById
    } from '@/api/zhxc/basicMenuInformation/basicMenuInformation'
    import myQuillEditor from "../components/myQuillEditor";
    import myWangEditor from "../components/myWangEditor";

    export default {
        name: "editBasicMenuInformation",
        components: {
            // myQuillEditor
            myWangEditor
        },
        props: {
            value: {
                type: Boolean,
                default: false
            },
            basicMenuInformationId: {
                type: String
            },
            menuId: {
                type: String
            },
            modalTitle: {
                type: String
            }
        },
        data() {
            return {
                html: '',
                modalShow: this.value,
                editTitle: this.modalTitle,
                editorContent: '',
                submitLoading: false,
                perspectiveInfo: ''
            }
        },
        methods: {
            //保存详情介绍
            saveMenuInformation() {
                //let editorContent = this.$refs.myQuillEditor.getEditorContent();
                let editorContent = this.$refs.myWangEditor.getEditorData();
                this.submitLoading = true;
                //保存详情
                if (this.basicMenuInformationId) {
                    editBasicMenuInformation({
                        id: this.basicMenuInformationId,
                        content: editorContent,
                        perspectiveInfo: this.perspectiveInfo
                    }).then(res => {
                        if (res && res.success) {
                            this.$Notice.success({
                                title: '保存成功！'
                            });
                        } else {
                            this.$Notice.error({
                                title: '保存失败！'
                            })
                        }
                        this.$emit('input', false);
                        this.$emit('handleSearch');
                    }).catch(res => {
                        this.$Notice.error({
                            title: '保存失败！'
                        })
                    }).finally(res => {
                        this.submitLoading = false;
                    });
                } else {
                    addBasicMenuInformation({menuId: this.menuId, content: editorContent, perspectiveInfo: this.perspectiveInfo}).then(res => {
                        if (res && res.success) {
                            this.$Notice.success({
                                title: '保存成功！'
                            });
                        } else {
                            this.$Notice.error({
                                title: '保存失败！'
                            })
                        }
                        this.$emit('input', false);
                        this.$emit('handleSearch');
                    }).catch(res => {
                        this.$Notice.error({
                            title: '保存失败！'
                        })
                    }).finally(res => {
                        this.submitLoading = false;
                    });
                }
            },
        },
        watch: {
            value(val) {
                this.modalShow = val;
            },
            modalShow(val) {
                this.editTitle = this.modalTitle;
                if (val) {
                    if (this.basicMenuInformationId) {
                        getBasicMenuInformationById({id: this.basicMenuInformationId}).then(res => {
                            if (res && res.success) {
                                this.editorContent = res.data.content;
                                this.perspectiveInfo = res.data.perspectiveInfo;
                            }
                        });
                    } else {
                        this.editorContent = null;
                        this.perspectiveInfo = null;
                    }
                } else {
                    this.$emit('input', false);
                    this.editorContent = null;
                    this.perspectiveInfo = null;
                }
            }
        }
    }
</script>
<style lang="less">
  .editBasicMenuInformation {
    .ivu-modal-body {
      overflow: hidden;
    }
  }
</style>
