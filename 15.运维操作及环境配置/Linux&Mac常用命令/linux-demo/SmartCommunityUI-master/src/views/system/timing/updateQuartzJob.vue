<style lang="less">
	.quartzJob{
		.ivu-modal {
			width: 700px !important;
			top: 50%;
			transform: translateY(-50%);
		}
		.form-item-input {
			width: 200px;
		}
		.ivu-form-item-error-tip {
			left: 80px;
		}
		 .ivu-form .ivu-form-item-label {
			width: 120px;
		}
		 .ivu-select {
			width: 180px;
		}
		 .ivu-input-wrapper {
			 width: auto!important;
		}
	}
</style>
<template>
	<Modal v-model="show" :title="editTitle"  :mask-closable="false" class="quartzJob">
		<Form ref="quartzJobForm" :model="quartzJobForm" :rules="quartzJobFormRule" >
      <Row>

        <Col span="12">
          <FormItem label="任务名称" prop="jobName">
            <Input v-bind:disabled="disabled"  type="text" :maxlength=50 v-model="quartzJobForm.jobName" placeholder="请输入任务名称"/>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="状态" prop="isPause">
            <RadioGroup v-bind:disabled="disabled" v-model="quartzJobForm.isPause">
              <Radio v-for="(item,index) in isPauseRadio"  v-bind:disabled="disabled" :key="index" :value="item.label" :label="item.label">
                {{item.label}}
              </Radio>
            </RadioGroup>
          </FormItem>
        </Col>
      </Row>
			<Row>
				<Col span="12">
					<FormItem label="Bean名称" prop="beanName">
						<Input v-bind:disabled="disabled"  type="text" :maxlength=50 v-model="quartzJobForm.beanName" placeholder="请输入Spring Bean名称"/>
					</FormItem>
				</Col>
				<Col span="12">
					<FormItem label="cron 表达式" prop="cronExpression">
						<Input v-bind:disabled="disabled"  type="text" :maxlength=50 v-model="quartzJobForm.cronExpression" placeholder="请输入cron 表达式"/>
					</FormItem>
				</Col>
			</Row>

			<Row>
				<Col span="12">
					<FormItem label="方法名称" prop="methodName">
						<Input v-bind:disabled="disabled"  type="text" :maxlength=50 v-model="quartzJobForm.methodName" placeholder="请输入方法名称"/>
					</FormItem>
				</Col>
				<Col span="12">
					<FormItem label="参数" prop="params">
						<Input v-bind:disabled="disabled"  type="text" :maxlength=50 v-model="quartzJobForm.params" placeholder="请输入参数"/>
					</FormItem>
				</Col>
			</Row>

      <FormItem label="任务描述" prop="remark">
        <Input v-bind:disabled="disabled"  :rows="2" type="textarea"   v-model="quartzJobForm.remark" placeholder="请输入任务描述" style="width: 520px!important;"/>
      </FormItem>
		</Form>
		<div slot="footer">
			<Button type="text" @click="show=false">取消</Button>
			<Button type="primary" :loading="loading" @click="handelSubmit">提交</Button>
		</div>
	</Modal>
</template>
<script>
  import {add, edit,getJobsById} from '@/api/system/timing'
	import { getDictDataByType } from '@/api/index';
	export default {
		name: "updateQuartzJob",
		props: {
			value: {
				type: Boolean,
				default: false
			},
			QuartzJobId: {
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
				isPauseRadio :[],
				quartzJobForm: {
					beanName:'',
					cronExpression:'',
					isPause:'激活',
					jobName:'',
					methodName:'',
					params:'',
					remark:'',
          createTime:null,
				},
				quartzJobFormRule: this.getQuartzJobFormRule()
			}
		},
		methods: {
			getIsPauseRadio(){
				getDictDataByType('user_status').then(res => {
					if (res && res.success) {
						 this.isPauseRadio = res.data;
					}
				});
			},
			handelSubmit() {
        this.loading = true;

				this.$refs['quartzJobForm'].validate((valid) => {
					if (valid) {
            if (this.quartzJobForm.isPause == "激活") {
              this.quartzJobForm.isPause = true;
            } else {
              this.quartzJobForm.isPause = false;
            }
						if(this.QuartzJobId!=null&&this.QuartzJobId.trim().length>0){
							this.quartzJobForm.id=this.QuartzJobId;
							edit(this.quartzJobForm).then(res => {
                this.loading = false;
								if (res != null) {
									this.closeModal(false);
									this.$emit('handleSearch');
									this.$Message.success('保存成功');
								}else{
									this.$Message.error('保存失败');
								}
							})
						}else{
              add(this.quartzJobForm).then(res => {
                this.loading = false;
								if (res != null) {
									this.closeModal(false);
									this.$emit('handleSearch');
									this.$Message.success('保存成功');
								}else{
									this.$Message.error('保存失败');
								}
							})
						}
					} else {
            this.loading = false;
						  this.$Message.error('表单验证不通过！');
					}
				});
			},
			closeModal(val) {
				this.$emit('input', val);
			},
			initForm(){
				this.quartzJobForm= {
					beanName:'',
					cronExpression:'',
					isPause:'激活',
					jobName:'',
					methodName:'',
					params:'',
					remark:'',
          createTime:null,
				};
			},
			getQuartzJobFormRule() {
				return {
					beanName: [
						{required: true, message: 'Bean名称不能为空！', trigger: 'blur'},
						{type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
					],
					cronExpression: [
						{required: true, message: 'cron 表达式不能为空！', trigger: 'blur'},
						{type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
					],
					isPause: [
						{required: true, message: '状态不能为空！', trigger: 'blur' },
					],
					jobName: [
						{required: true, message: '任务名称不能为空！', trigger: 'blur'},
						{type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
					],
					methodName: [
						{required: true, message: '方法名称不能为空！', trigger: 'blur'},
						{type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
					],
					params: [
						{required: true, message: '参数不能为空！', trigger: 'blur'},
						{type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
					],
					remark: [
						{required: true, message: '任务描述不能为空！', trigger: 'blur' },
					],
				}
			}
		},
		watch: {
			value(val) {
				this.show = val;
			},
			show(val) {
				this.getIsPauseRadio(),
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
					this.$refs['quartzJobForm'].resetFields();
					if(this.QuartzJobId!=null&&this.QuartzJobId.trim().length>0){
            getJobsById({id: this.QuartzJobId}).then(res => {
							if (res && res.code == 200) {
								this.quartzJobForm.beanName = res.data.beanName;
								this.quartzJobForm.cronExpression = res.data.cronExpression;
								if(res.data.isPause){
                  this.quartzJobForm.isPause = '激活';
                }else{
                  this.quartzJobForm.isPause = '禁用';
                }

								this.quartzJobForm.jobName = res.data.jobName;
								this.quartzJobForm.methodName = res.data.methodName;
								this.quartzJobForm.params = res.data.params;
								this.quartzJobForm.remark = res.data.remark;
                this.quartzJobForm.createTime = res.data.createTime;
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
