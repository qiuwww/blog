<!--<style lang="less">-->
<!--	.basicHealthFile{-->
<!--		.ivu-modal {-->
<!--			width: 660px !important;-->
<!--			top: 50%;-->
<!--			transform: translateY(-50%);-->
<!--		}-->
<!--		.form-item-input {-->
<!--			width: 200px;-->
<!--		}-->
<!--		.ivu-form-item-error-tip {-->
<!--			left: 80px;-->
<!--		}-->
<!--		 .ivu-form .ivu-form-item-label {-->
<!--			width: 120px;-->
<!--		}-->
<!--		 .ivu-select {-->
<!--			width: 180px;-->
<!--		}-->
<!--		 .ivu-input-wrapper {-->
<!--			 width: auto!important;-->
<!--		}-->
<!--	}-->
<!--</style>-->
<!--<template>-->
<!--	<Modal v-model="show" :title="editTitle"  :mask-closable="false">-->
<!--		<Form ref="basicHealthFileForm" :model="basicHealthFileForm" :rules="basicHealthFileFormRule" class="basicHealthFile">-->
<!--		</Form>-->
<!--		<div slot="footer">-->
<!--			<Button type="text" @click="show=false">取消</Button>-->
<!--			<Button type="primary" :loading="loading" @click="handelSubmit">提交</Button>-->
<!--		</div>-->
<!--	</Modal>-->
<!--</template>-->
<!--<script>-->
<!--	import {addBasicHealthFile,updateBasicHealthFile,getBasicHealthFile} from '@/api/basicHealthFile/basicHealthFile'-->
<!--	import { getDictDataByType } from '@/api/index';-->
<!--	import { formartDate } from '@/api/tools/tool'-->
<!--	export default {-->
<!--		name: "updateBasicHealthFile",-->
<!--		props: {-->
<!--			value: {-->
<!--				type: Boolean,-->
<!--				default: false-->
<!--			},-->
<!--			BasicHealthFileId: {-->
<!--				type: String-->
<!--			},-->
<!--			modalTitle: {-->
<!--				type: String-->
<!--			}-->
<!--		},-->
<!--		data() {-->
<!--			return {-->
<!--				show: this.value,-->
<!--				editTitle: this.modalTitle,-->
<!--				loading: true,-->
<!--				disabled:false,-->
<!--				basicHealthFileForm: {-->
<!--				},-->
<!--				basicHealthFileFormRule: this.getBasicHealthFileFormRule()-->
<!--			}-->
<!--		},-->
<!--		methods: {-->
<!--			handelSubmit() {-->
<!--				this.$refs['basicHealthFileForm'].validate((valid) => {-->
<!--					if (valid) {-->
<!--						if(this.BasicHealthFileId!=null&&this.BasicHealthFileId.trim().length>0){-->
<!--							this.basicHealthFileForm.id=this.BasicHealthFileId;-->
<!--							updateBasicHealthFile(this.basicHealthFileForm).then(res => {-->
<!--								if (res && res.code == 200) {-->
<!--									this.closeModal(false);-->
<!--									this.$emit('handleSearch');-->
<!--									this.$Message.success('保存成功');-->
<!--								}else{-->
<!--									this.$Message.error(res.msg);-->
<!--								}-->
<!--							})-->
<!--						}else{-->
<!--							addBasicHealthFile(this.basicHealthFileForm).then(res => {-->
<!--								if (res && res.code == 200) {-->
<!--									this.closeModal(false);-->
<!--									this.$emit('handleSearch');-->
<!--									this.$Message.success('保存成功');-->
<!--								}else{-->
<!--									this.$Message.error(res.msg);-->
<!--								}-->
<!--							})-->
<!--						}-->
<!--					} else {-->
<!--							this.loading = true;-->
<!--						this.$Message.error('表单验证不通过！');-->
<!--					}-->
<!--					setTimeout(() => {-->
<!--						this.loading = false;-->
<!--						this.$nextTick(() => {-->
<!--							this.loading = true;-->
<!--						});-->
<!--					}, 1000);-->
<!--				});-->
<!--			},-->
<!--			closeModal(val) {-->
<!--				this.$emit('input', val);-->
<!--			},-->
<!--			initForm(){-->
<!--				this.basicHealthFileForm= {-->
<!--				};-->
<!--			},-->
<!--			getBasicHealthFileFormRule() {-->
<!--				return {-->
<!--				}-->
<!--			}-->
<!--		},-->
<!--		watch: {-->
<!--			value(val) {-->
<!--				this.show = val;-->
<!--			},-->
<!--			show(val) {-->
<!--				this.initForm();-->
<!--				this.loading=false;-->
<!--				this.editTitle = this.modalTitle;-->
<!--				if(this.editTitle == "查看"){-->
<!--					this.disabled = true;-->
<!--				}-->
<!--				else{-->
<!--					this.disabled = false;-->
<!--				}-->
<!--				if(val) {-->
<!--					this.$refs['basicHealthFileForm'].resetFields();-->
<!--					if(this.BasicHealthFileId!=null&&this.BasicHealthFileId.trim().length>0){-->
<!--						getBasicHealthFile({id: this.BasicHealthFileId}).then(res => {-->
<!--							if (res && res.code == 200) {-->
<!--							} else {-->
<!--								this.$Message.error(res.msg);-->
<!--							}-->
<!--						});-->
<!--					}-->
<!--				} else {-->
<!--					this.closeModal(val);-->
<!--				}-->
<!--			}-->
<!--		}-->
<!--	}-->
<!--</script>-->
