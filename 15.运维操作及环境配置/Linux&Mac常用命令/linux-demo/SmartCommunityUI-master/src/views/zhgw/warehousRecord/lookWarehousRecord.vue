<style lang="less" scoped>
    .lookWarehousRecord{
        
    }
</style>
<template>
    <Modal v-model="show" :title="lookTitle"  :mask-closable="false" width="620px">
        <Form ref="searchForm" :model="searchForm" :label-width="70" class="lookWarehousRecord">
            <Row>
                 <Col span="12">
                    <Form-item label="任务名称">
                
                    </Form-item>
                </Col>
                 <Col span="12">
                    <Form-item label="所属区域">
                
                    </Form-item>
                </Col>
            </Row>
            <Row>
                 <Col span="12">
                    <Form-item label="管网类型">
                
                    </Form-item>
                </Col>
                 <Col span="12">
                    <Form-item label="管网长度">
                
                    </Form-item>
                </Col>
            </Row>
            <Row>
                 <Col span="12">
                    <Form-item label="作业单位">
                
                    </Form-item>
                </Col>
                 <Col span="12">
                    <Form-item label="处理人员">
                
                    </Form-item>
                </Col>
            </Row>
            <Row>
                 <Col span="12">
                    <Form-item label="入库时间">
                
                    </Form-item>
                </Col>
            </Row>
        </Form>
        <div slot="footer">
			<Button type="text" @click="show=false">取消</Button>
		</div>
    </Modal>
</template>
<script>
export default {
    name: "lookWarehousRecord",
    props: {
        value: {
            type: Boolean,
            default: false
        },
        warehousRecordId: {
            type: String
        },
        modalTitle: {
            type: String
        }
    },
    data() {
        return {
            show:this.value,
            lookTitle:this.modalTitle,
            loading: false,
            searchForm:{
                TASKNAME:'',
                REGION:'',
                NETWORKTYPE:'',
                PIPELENGTH:'',
                WORKUNIT:'',
                INSPECTOR:'',
                STORAGETIME:'',
            },
        }
    },
    methods: {
        closeModal(val) {
            this.$emit('input', val);
        },
    },
    watch: {
        value(val) {
            this.show = val;
        },
        show(val) {
            this.loading=false;
            this.lookTitle = this.modalTitle;
            if(val){
                
            }else{
                this.closeModal(val)
            }
        }
    },
}
</script>