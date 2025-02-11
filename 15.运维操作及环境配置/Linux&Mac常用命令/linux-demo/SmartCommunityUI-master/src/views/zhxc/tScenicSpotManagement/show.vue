<template>
  <Modal v-model="show" :title="editTitle" :mask-closable="false" width="620px" class="showTscenicSpot">
    <div class="ql-container ql-snow" style="user-select: none;" show>
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
    import {getTScenicSpotManagement} from '@/api/zhxc/tScenicSpotManagement/tScenicSpotManagement';

    export default {
        name: 'tScenicSpotManagementShow',
        props: {
            value: {
                type: Boolean,
                default: false
            },
            tScenicSpotManagementId: {
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
                if (val) {
                    getTScenicSpotManagement({id: this.tScenicSpotManagementId}).then(res => {
                        if (res && res.success) {
                            this.editorContent = res.data.describes;
                        }
                    });
                } else {
                    this.$emit('input', val);
                }
            }
        }
    }
</script>
<style lang="less">
  .showTscenicSpot {
    .ivu-modal-body {
      height: 500px;
      padding: 16px;
      font-size: 14px;
      line-height: 1.5;
    }
  }
</style>
