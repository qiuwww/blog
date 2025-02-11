<template>
  <Modal v-model="show" :title="editTitle" :mask-closable="false" width="620px" class="newsInformationShow">
    <div class="ql-container ql-snow" style="user-select: none;">
      <div class="ql-editor" v-html="editorContent">
      </div>
    </div>
    <div slot="footer">
      <Button type="text" @click="show=false">取消</Button>
    </div>
  </Modal>
</template>
<script>
    import {getBasicMenuInformationById,} from '@/api/zhxc/basicMenuInformation/basicMenuInformation'
    export default {
        name: 'menuInformationShow',
        props: {
            value: {
                type: Boolean,
                default: false
            },
            basicMenuInformationId: {
                type: String
            },
            modalTitle: {
                type: String
            }
        },
        data() {
            return {
                editorContent: '',
                show: this.value,
                editTitle: this.modalTitle,
            }
        },
        methods: {},
        watch: {
            value(val) {
                this.show = val;
            },
            show(val) {
                this.editorContent = "";
                this.editTitle = this.modalTitle;
                if(val){
                    getBasicMenuInformationById({id: this.basicMenuInformationId}).then(res => {
                        if (res && res.success) {
                            this.editorContent = res.data.content;
                        }
                    });
                }else {
                    this.$emit('input', val);
                }
            }
        }
    }
</script>
<style lang="less">
  .newsInformationShow{
    .ivu-modal-body{
      height: 75vh;
    }
  }
</style>
