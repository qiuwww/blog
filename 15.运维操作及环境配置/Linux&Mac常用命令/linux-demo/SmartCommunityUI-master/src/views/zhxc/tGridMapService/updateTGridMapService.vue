<style lang="less">
	.tGridMapService{
    .ivu-form .ivu-form-item-label {
      text-align: right;
    }
		.ivu-modal {
			width: 680px !important;
			top: 50%;
			transform: translateY(-50%);
		}
		.form-item-input {
			width: 186px;
		}
		 .ivu-select {
			width: 186px;
		}
		 .ivu-input-wrapper {
			 width: auto!important;
		}
    .ivu-radio-group {
      height: 32px;
    }
	}
</style>
<template>
	<Modal v-model="show" :title="editTitle"  :mask-closable="false" class="tGridMapService">
		<Form ref="tGridMapServiceForm" :model="tGridMapServiceForm" :rules="tGridMapServiceFormRule"  :label-width="105">
			<Row>
				<Col span="12">
					<FormItem label="服务名称" prop="name">
						<Input v-bind:disabled="disabled"  type="text" :maxlength=50 v-model="tGridMapServiceForm.name" placeholder="请输入服务名称"/>
					</FormItem>
				</Col>
				<Col span="12">
					<FormItem label="服务参数" prop="params">
						<Input v-bind:disabled="disabled"  type="text" :maxlength=50 v-model="tGridMapServiceForm.params" placeholder="请输入服务参数"/>
					</FormItem>
				</Col>
			</Row>
			<Row>
				<Col span="12">
					<FormItem label="是否显示" prop="checked">
						<RadioGroup v-bind:disabled="disabled"  v-model="tGridMapServiceForm.checked">
						 <Radio value="1" label="1">是</Radio>
              <Radio value="0" label="0">否</Radio>
						</RadioGroup>
					</FormItem>
				</Col>
				<Col span="12">
					<FormItem label="服务类型" prop="type">
						<Select  v-bind:disabled="disabled"  v-model="tGridMapServiceForm.type" placeholder="请选择" clearable >
							<Option v-for="(item, i) in typePriority" :key="item.value" :value="item.value">{{item.label}}</Option>
						</Select>
					</FormItem>
				</Col>
			</Row>
			<Row>
					<FormItem label="服务地址" prop="url">
						<Input v-bind:disabled="disabled"  type="text" :maxlength=50 v-model="tGridMapServiceForm.url" placeholder="请输入服务地址" style="width: 509px !important;"/>
					</FormItem>
			</Row>
      <Row >
        <FormItem label="备注" prop="remarks">
          <Input v-bind:disabled="disabled"  :rows="3" type="textarea"  v-model="tGridMapServiceForm.remarks" placeholder="请输入备注" style="width: 509px !important"/>
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
	import {addTGridMapService,updateTGridMapService,getTGridMapService} from '@/api/zhxc/tGridMapService/tGridMapService'
	import { getDictDataByType } from '@/api/index';
	import { formartDate } from '@/api/tools/tool'
	export default {
		name: "updateTGridMapService",
		props: {
			value: {
				type: Boolean,
				default: false
			},
			TGridMapServiceId: {
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
				disabled:false,
				typePriority :[],
				tGridMapServiceForm: {
					name:'',
					params:'',
					checked:'',
					type:'',
					remarks:'',
					url:'',
				},
				tGridMapServiceFormRule: this.getTGridMapServiceFormRule()
			}
		},
		methods: {
		  //服务类型
			getTypePriority(){
				getDictDataByType('grid_map_service_type').then(res => {
					if (res && res.success) {
						 this.typePriority = res.data;
					}
				});
			},
      //提交
			handelSubmit() {
				this.$refs['tGridMapServiceForm'].validate((valid) => {
					this.loading = true;
					if (valid) {
						if(this.TGridMapServiceId!=null&&this.TGridMapServiceId.trim().length>0){
							this.tGridMapServiceForm.id=this.TGridMapServiceId;
							updateTGridMapService(this.tGridMapServiceForm).then(res => {
								this.loading = false;
								if (res) {
									if (res && res.code == 200) {
										this.closeModal(false);
										this.$emit('handleSearch');
										this.$Message.success('编辑成功');
									}else{
										this.$Message.error(res.msg);
									}
								}else{
									this.$Message.error('编辑失败');
								}
							}).catch(err => {
                this.loading = false;
              });
						}else{
							addTGridMapService(this.tGridMapServiceForm).then(res => {
                this.loading = false;
								if (res) {

									if (res && res.code == 200) {
										this.closeModal(false);
										this.$emit('handleSearch');
										this.$Message.success('保存成功');
									}else{
										this.$Message.error(res.msg);
									}
								}else{
									this.$Message.error('保存失败');
								}
							}).catch(err => {
                this.loading = false;
              });
						}
					} else {
						this.loading = false;
						this.$Message.error('表单验证不通过！');
					}
				});
			},
      //关闭
			closeModal(val) {
				this.$emit('input', val);
			},
      //初始化表单
			initForm(){
				this.tGridMapServiceForm= {
					name:'',
					params:'',
					checked:'1',
					type:'',
					remarks:'',
					url:'',
				};
			},
      //获取表单验证规则
			getTGridMapServiceFormRule() {
				return {
					name: [
						{required: true, message: '服务名称不能为空！', trigger: 'blur'},
						{type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
					],
					params: [
						{required: false, message: '服务参数不能为空！', trigger: 'blur'},
						{type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
					],
					checked: [
						{required: true,pattern:/^[0-9]+$/, message: '是否显示不能为空！', trigger: 'blur' },
					],
					type: [
						{required: true, message: '服务类型不能为空！', trigger: 'blur',pattern: /.+/ },
					],
					remarks: [
						{required: false, message: '备注不能为空！', trigger: 'blur',pattern: /.+/ },
            {type: 'string', max: 255, message: '数据的最大长度为255！', trigger: 'blur'}
					],
					url: [
						{required: true, message: '服务地址不能为空！', trigger: 'blur'},
						{type: 'string', max: 500, message: '数据的最大长度为500！', trigger: 'blur'}
					],
				}
			}
		},
    //监听打开关闭
		watch: {
			value(val) {
				this.show = val;
			},
			show(val) {
				this.getTypePriority(),
				this.initForm();
				this.loading=false;
				this.editTitle = this.modalTitle;
				if(this.editTitle == "查看"){
					this.disabled = true;
				}
				else{
					this.disabled = false;
				}
				if(val) {
					this.$refs['tGridMapServiceForm'].resetFields();
					if(this.TGridMapServiceId!=null&&this.TGridMapServiceId.trim().length>0){
						getTGridMapService({id: this.TGridMapServiceId}).then(res => {
							if (res) {
								if (res && res.code == 200) {
									this.tGridMapServiceForm.name = res.data.name;
									this.tGridMapServiceForm.params = res.data.params;
									this.tGridMapServiceForm.checked = "" + res.data.checked;
									this.tGridMapServiceForm.type = res.data.type;
									this.tGridMapServiceForm.remarks = res.data.remarks;
									this.tGridMapServiceForm.url = res.data.url;
								} else {
									this.$Message.error(res.msg);
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
