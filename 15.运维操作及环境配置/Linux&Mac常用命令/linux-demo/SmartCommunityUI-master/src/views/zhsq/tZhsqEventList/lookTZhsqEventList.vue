<style lang="less" scoped>
	.looktZhsqEventList{
		.form-item-input {
			width: 200px;
		}
		 .ivu-form .ivu-form-item-label {
			width: 120px;
		}
		 .ivu-select {
			width: 180px;
		}
		.ivu-description-term{
            padding-bottom: 30px !important;
		}
		.ivu-form-item{
			margin-bottom: 0 !important;
		}
	}
</style>
<template>
	  <Modal v-model="show" :title="editTitle" :mask-closable="true" class="looktZhsqEventList" :width="900" :draggable="false">
        <Form ref="tZhsqEventListForm" :model="tZhsqEventListForm" :label-width="125">
            <Row>
				<Col span="8">
                    <FormItem label="事件分类" prop="eventClassification">
                        {{tZhsqEventListForm.eventClassification}}
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="事件标题" prop="eventName">
                        {{tZhsqEventListForm.eventName}}
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="所属社区" prop="community">
                        {{tZhsqEventListForm.community}}
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="8">
                    <FormItem label="所属网格" prop="grid">
                        {{tZhsqEventListForm.grid}}
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="发起人" prop="sponsor">
                        {{tZhsqEventListForm.sponsor}}
                    </FormItem>
                </Col><Col span="8">
                    <FormItem label="事件开始时间" prop="eventStartingTime">
                        {{tZhsqEventListForm.eventStartingTime}}
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="8">
                    <FormItem label="事件结束时间" prop="eventEndTime">
                        {{tZhsqEventListForm.eventEndTime}}
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="执行人" prop="executor">
                        {{tZhsqEventListForm.executor}}
                    </FormItem>
                </Col><Col span="8">
                    <FormItem label="事件状态" prop="eventStatus">
                        {{tZhsqEventListForm.eventStatus}}
                    </FormItem>
                </Col>
            </Row>
			<Row>
                <Col span="8">
                    <FormItem label="地图标注" prop="position">
                        {{tZhsqEventListForm.position}}
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
	import {getTZhsqEventList} from '@/api/zhsq/tZhsqEventList/tZhsqEventList'
	import { formartDate } from '@/api/tools/tool'
	export default {
		name: "looktZhsqEventList",
		props: {
			value: {
				type: Boolean,
				default: false
			},
			TZhsqEventListId: {
				type: String
			},
			modalTitle: {
				type: String
			}
		},
		data() {
			return {
				show: this.value,
				editTitle: this.modalTitle,
				tZhsqEventListForm: {
					eventClassification:'',
					eventName:'',
					community:'',
					grid:'',
					sponsor:'',
					eventStartingTime:'',
					eventEndTime:'',
					executor:'',
					eventStatus:'',
					position:'',
				}
			}
		},
		methods: {
			closeModal(val) {
				this.$emit('input', val);
			},
			initForm(){
				this.tZhsqEventListForm= {
					eventClassification:'',
					eventName:'',
					community:'',
					grid:'',
					sponsor:'',
					eventStartingTime:'',
					eventEndTime:'',
					executor:'',
					eventStatus:'',
					position:'',
				};
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
					if(this.TZhsqEventListId!=null&&this.TZhsqEventListId.trim().length>0){
						getTZhsqEventList({id: this.TZhsqEventListId}).then(res => {
							if (res && res.code == 200) {
								this.tZhsqEventListForm.eventClassification = res.data.eventClassification;
								this.tZhsqEventListForm.eventName = res.data.eventName;
								this.tZhsqEventListForm.community = res.data.community;
								this.tZhsqEventListForm.grid = res.data.grid;
								this.tZhsqEventListForm.sponsor = res.data.sponsor;
								if(res.data.eventStartingTime){
									this.tZhsqEventListForm.eventStartingTime = formartDate(new Date(res.data.eventStartingTime).getTime(), 'yyyy-MM-dd hh:mm:ss');
								}
								if(res.data.eventEndTime){
									this.tZhsqEventListForm.eventEndTime = formartDate(new Date(res.data.eventEndTime).getTime(), 'yyyy-MM-dd hh:mm:ss');
								}else{
									this.tZhsqEventListForm.eventEndTime = null;
								}
								this.tZhsqEventListForm.executor = res.data.executor;
								if(res.data.eventStatus == 0){
									this.tZhsqEventListForm.eventStatus = "处理中";
								}else if(res.data.eventStatus == 1){
									this.tZhsqEventListForm.eventStatus = "已完成"
								}
								if(res.data.position){
									this.tZhsqEventListForm.position = "已标注";
								}else{
									this.tZhsqEventListForm.position = "未标注";
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
