<style lang="less">
  .basicPerson {

  }
</style>
<template>
  <Modal v-model="show" :title="editTitle" :mask-closable="false" class="basicPerson">
    <Form ref="basicPersonForm" >
      <Upload
        ref="upload"
        action="/api/basicPerson/uploadPerson"
        name="excel-file"
        :show-upload-list="true"
        :before-upload = "handleBeforeUpload"
        :on-format-error="handleFormatError"
        :on-success="handleSuccess"
        :on-error="handleError"
        :format ="['xlsx','xls']">
        <Button type="info" icon="ios-cloud-upload-outline">批量导入</Button>
      </Upload>
    </Form>
    <div slot="footer">
      <Button type="text" @click="show=false">取消</Button>
      <Button type="primary" :loading="loading" @click="handelSubmit">提交</Button>
    </div>
  </Modal>
</template>
<script>
    export default {
        name: "uploadPerson",
        props: {
            value: {
                type: Boolean,
                default: false
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
                file:null
            }
        },
        methods: {
            handleBeforeUpload(file){
                this.file = file;
            },
            handleFormatError(file){
                this.$Notice.warning({
                    title: '文件格式不正确',
                    desc: '文件 ' + file.name + ' 格式不正确，请上传.xls,.xlsx文件。'
                })
            },
            handleSuccess(res,file){
                if(res.errcode === 0){
                    this.dialoLead = false
                    this.$Message.success("数据导入成功！")
                    this.$refs.upload.clearFiles()
                }
            },
            handleError(error,file){
                this.$Message.error("数据导入失败！")
            },
            handelSubmit(){

            },
            closeModal(val) {
                this.$emit('input', val);
            },
        },
        watch: {
            value(val) {
                this.show = val;
            },
            show(val) {
                this.loading = false;
                this.editTitle = this.modalTitle;

                if (val) {

                } else {
                    this.closeModal(val);
                }
            }
        }
    }
</script>
