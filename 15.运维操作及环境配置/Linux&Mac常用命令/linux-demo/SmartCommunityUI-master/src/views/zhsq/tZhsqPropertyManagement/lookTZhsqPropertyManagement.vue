<style lang="less" scoped>
.lookTZhsqPropertyManagement{
    .ivu-description-term{
        padding-bottom: 30px !important;
    }
    .ivu-form-item{
        margin-bottom: 0 !important;
    }
}
</style>
<template>
    <Modal v-model="show" :title="editTitle" :draggable="false" :mask-closable="false" class="lookTZhsqPropertyManagement" :width="650">
        <Form ref="lookForm" :model="lookForm" :label-width="125">
            <Row>
				<Col span="12">
                    <FormItem label="物业名称" prop="propertyName">
                        {{lookForm.propertyName}}
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="物业类型" prop="propertyType">
                        {{lookForm.propertyType}}
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                    <FormItem label="物业负责人电话" prop="propertyPrincipalPhone">
                        {{lookForm.propertyPrincipalPhone}}
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="物业负责人" prop="propertyPrincipal">
                        {{lookForm.propertyPrincipal}}
                    </FormItem>
                </Col>
            </Row>

        </Form>
        <div slot="footer">
			<Button type="text" @click="show=false">取消</Button>
			<Button type="primary" v-if="false">确定</Button>
		</div>
  </Modal>
</template>
<script>
import {getTZhsqPropertyManagement} from '@/api/zhsq/tZhsqPropertyManagement/tZhsqPropertyManagement'
import {getDictionary} from '@/api/index'
export default {
    name:"lookTZhsqPropertyManagement",
    props:{
        value:{
            type:Boolean,
            default: false
        },
        modalTitle:{
            type:String
        },
        TZhsqPropertyManagementId:{
            type:String
        }
    },
    data() {
        return {
            show: this.value,
            editTitle:this.modalTitle,
            lookForm:{
                propertyName:'',
                propertyType:'',
                propertyPrincipal:'',
                propertyPrincipalPhone:''
            },
            propertyTypePriority:[]
        }
    },
    methods: {
        //获取物业类型
        getPropertyType(){

        },
        //初始化表单
        initForm(){
            this.tZhsqPropertyManagementForm= {
                propertyName:'',
                propertyType:'',
                propertyPrincipal:'',
                propertyPrincipalPhone:'',
            };
            this.getPropertyType();
        },
        //提交数据
        closeModal(val) {
            this.$emit('input', val);
        },
    },
    watch: {
        value(val) {
            this.show = val;
        },
        show(val) {
            this.initForm();
            this.editTitle = this.modalTitle;
            if(val) {
                if(this.TZhsqPropertyManagementId!=null&&this.TZhsqPropertyManagementId.trim().length>0){
                    getTZhsqPropertyManagement({id: this.TZhsqPropertyManagementId}).then(res => {
                        if (res && res.code == 200) {
                            this.lookForm.propertyName = res.data.propertyName;
                            getDictionary({"fieldName": "communityPriorityData"}).then(ress => {
                              if(ress && ress.success){
                                let data = ress.data;
                                let type = data.filter(item => item.number == res.data.propertyType);
                                if(type){
                                  this.lookForm.propertyType = type[0].name;
                                }
                              }
                            })
                            this.lookForm.propertyPrincipal = res.data.propertyPrincipal;
                            this.lookForm.propertyPrincipalPhone = res.data.propertyPrincipalPhone;
                        } else {
                            this.$Message.error(res.msg);
                        }
                    });
                }
            } else {
                this.closeModal(val);
            }
        }
    },
}
</script>
