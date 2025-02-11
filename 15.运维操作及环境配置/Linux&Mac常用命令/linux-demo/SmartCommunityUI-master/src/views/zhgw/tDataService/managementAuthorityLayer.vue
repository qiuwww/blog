<style lang="less" scoped>

</style>
<template>
    <Modal v-model="show" :title="editTitle"  :mask-closable="false" width="620px">

    </Modal>
</template>
<script>
export default {
    name:'managementAuthorityLayer',
    props: {
        value: {
            type: Boolean,
            default: false
        },
        TDataServiceId: {
            type: String
        },
        modalTitle: {
            type: String
        }
    },
    data() {
        return {
            show:this.value,
            editTitle: this.modalTitle,
        }
    },
    methods:{
        closeModal(val) {
            this.$emit('input', val);
        },
        initForm(){
            /* this.tDataServiceForm= {
                name:'',
                params:'',
                checked:'',
                type:'',
                remarks:'',
                level:'',
            }; */
        },
    },
    watch: {
        value(val) {
            this.show = val;
        },
        show(val) {
            this.initForm();
            this.loading=false;
            this.editTitle = this.modalTitle;
            if(val) {
                // this.$refs['tDataServiceForm'].resetFields();
                // if(this.TDataServiceId!=null&&this.TDataServiceId.trim().length>0){
                //     getTDataService({id: this.TDataServiceId}).then(res => {
                //         if (res && res.code == 200) {
                //             this.tDataServiceForm.name = res.data.name;
                //             this.tDataServiceForm.params = res.data.params;
                //             this.tDataServiceForm.checked = res.data.checked;
                //             this.tDataServiceForm.type = res.data.type;
                //             this.tDataServiceForm.remarks = res.data.remarks;
                //             this.tDataServiceForm.level = res.data.level;
                //         } else {
                //             this.$Message.error(res.msg);
                //         }
                //     });
                // }
            } else {
                this.closeModal(val);
            }
        }
    }
}
</script>
