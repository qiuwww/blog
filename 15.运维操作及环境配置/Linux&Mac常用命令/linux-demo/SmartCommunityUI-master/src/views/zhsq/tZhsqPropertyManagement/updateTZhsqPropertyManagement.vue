<style lang="less" scoped>
	.tZhsqPropertyManagement{
		.form-item-input {
			width: 200px;
		}
		 .ivu-form .ivu-form-item-label {
			width: 120px;
		}
		.ivu-input-wrapper {
			 width: 190px!important;
		}
		.ivu-select{
			width: 190px!important;
		}
	}
</style>
<template>
	<Modal v-model="show" :title="editTitle" :draggable="false" :mask-closable="false" :width="750">
		<Form ref="tZhsqPropertyManagementForm" :model="tZhsqPropertyManagementForm" :rules="tZhsqPropertyManagementFormRule" class="tZhsqPropertyManagement" :label-width="125">
			<Row>
				<Col span="12">
					<FormItem label="物业名称" prop="propertyName">
						<Input type="text" :maxlength=50 v-model="tZhsqPropertyManagementForm.propertyName" placeholder="请输入物业名称"/>
					</FormItem>
				</Col>
				<Col span="12">
					<FormItem label="物业类型" prop="propertyType">
						<Select  v-model="tZhsqPropertyManagementForm.propertyType" placeholder="请选择物业类型" clearable >
							<Option v-for="(item, i) in propertyTypePriority" :key="item.id.toString()" :value="item.number.toString()">{{item.name}}</Option>
						</Select>
					</FormItem>
				</Col>
			</Row>
			<Row>
				<Col span="12">
					<FormItem label="物业负责人电话" prop="propertyPrincipalPhone">
						<Input type="text" :maxlength=50 v-model="tZhsqPropertyManagementForm.propertyPrincipalPhone" placeholder="请输入物业负责人电话"/>
					</FormItem>
				</Col>
				<Col span="12">
					<FormItem label="物业负责人" prop="propertyPrincipal">
						<Input type="text" :maxlength=50 v-model="tZhsqPropertyManagementForm.propertyPrincipal" placeholder="请输入物业负责人"/>
					</FormItem>
				</Col>

			</Row>
		</Form>
		<div slot="footer">
			<Button type="text" @click="show=false">取消</Button>
			<Button type="primary" :loading="loading" @click="handelSubmit">提交</Button>
		</div>
	</Modal>
</template>
<script>
	import {addTZhsqPropertyManagement,updateTZhsqPropertyManagement,getTZhsqPropertyManagement} from '@/api/zhsq/tZhsqPropertyManagement/tZhsqPropertyManagement'
	import {getDictionary,initPropertyCompany,updatePropertyCompany} from '@/api/index'
	export default {
		name: "updateTZhsqPropertyManagement",
		props: {
			value: {
				type: Boolean,
				default: false
			},
			TZhsqPropertyManagementId: {
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
				loading: true,
				tZhsqPropertyManagementForm: {
					propertyName:'',
					propertyType:'',
					propertyPrincipal:'',
					propertyPrincipalPhone:'',
				},
				tZhsqPropertyManagementFormRule: this.getTZhsqPropertyManagementFormRule(),
				propertyTypePriority:[],
			}
		},
		methods: {
			handelSubmit() {
				this.$refs['tZhsqPropertyManagementForm'].validate((valid) => {
					if (valid) {
						this.loading = true;
						if(this.TZhsqPropertyManagementId!=null&&this.TZhsqPropertyManagementId.trim().length>0){
							this.tZhsqPropertyManagementForm.id=this.TZhsqPropertyManagementId;
							updateTZhsqPropertyManagement(this.tZhsqPropertyManagementForm).then(res => {
								this.loading = false;
								if (res && res.code == 200) {
									this.closeModal(false);
									this.$emit('handleSearch');
									this.$Message.success('修改成功');
                  // let updateData = {
                  //   "uuid":this.tZhsqPropertyManagementForm.id,
                  //   "name":this.tZhsqPropertyManagementForm.propertyName,
                  //   "principalName":this.tZhsqPropertyManagementForm.propertyPrincipal,
                  //   "principalPhone":this.tZhsqPropertyManagementForm.propertyPrincipalPhone
                  // }
                  // updatePropertyCompany(updateData).then(re => {
                  //     // this.$Message.success('修改成功')
                  // });
								}
							}).catch(error => {
								this.loading = false;
							})
						}else{
							addTZhsqPropertyManagement(this.tZhsqPropertyManagementForm).then(res => {
								this.loading = false;
								if (res && res.code == 200) {
									this.closeModal(false);
									this.$emit('handleSearch');
                  this.$Message.success('保存成功');

								}else if(res.code == 500){
									this.$Message.error(res.msg);
								}
							}).catch(error => {
								this.loading = false;
							});
						}
					} else {
						this.$Message.error('表单验证不通过！');
					}
				});
			},
			closeModal(val) {
				this.$emit('input', val);
			},
			//获取物业类型
			getPropertyType(){
				getDictionary({"fieldName": "communityPriorityData"}).then(res => {
					if(res && res.success){
						this.propertyTypePriority = res.data;
					}
				})
			},
			initForm(){
				this.tZhsqPropertyManagementForm= {
					propertyName:'',
					propertyType:'',
					propertyPrincipal:'',
					propertyPrincipalPhone:'',
				};
				this.getPropertyType();
			},
			getTZhsqPropertyManagementFormRule() {
				return {
					propertyName: [
						{required: true, message: '物业名称不能为空！', trigger: 'blur'},
						{type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
					],
					propertyType: [
						{required: true, message: '物业类型不能为空！', trigger: 'changer'}
					],
					propertyPrincipal: [
						{required: true, message: '物业负责人不能为空！', trigger: 'blur'},
						{type: 'string', max: 10, message: '数据的最大长度为10！', trigger: 'blur'}
					],
					propertyPrincipalPhone: [
						{required: true, message: '物业负责人电话不能为空！', trigger: 'blur'},
						{ pattern: /^[0-9]+$/, message: '请输入数字格式', trigger: 'blur'},
						{ pattern: /^1[3456789]\d{9}$/, message: "手机号码格式不正确", trigger: "blur" },
						{type: 'string', max: 11, message: '数据的最大长度为11！', trigger: 'blur'}
					],
				}
			}
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
					this.$refs['tZhsqPropertyManagementForm'].resetFields();
					if(this.TZhsqPropertyManagementId!=null&&this.TZhsqPropertyManagementId.trim().length>0){
						getTZhsqPropertyManagement({id: this.TZhsqPropertyManagementId}).then(res => {
							if (res && res.code == 200) {
								this.tZhsqPropertyManagementForm.propertyName = res.data.propertyName;
								this.tZhsqPropertyManagementForm.propertyType = res.data.propertyType;
								this.tZhsqPropertyManagementForm.propertyPrincipal = res.data.propertyPrincipal;
								this.tZhsqPropertyManagementForm.propertyPrincipalPhone = res.data.propertyPrincipalPhone;
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
