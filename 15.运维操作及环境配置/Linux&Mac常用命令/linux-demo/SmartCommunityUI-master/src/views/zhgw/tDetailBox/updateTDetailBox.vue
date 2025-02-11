<style lang="less">
	.tDetailBox{
		.ivu-modal {
			width: 660px !important;
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
	<Modal v-model="show" :title="editTitle"  :mask-closable="false">
		<Form ref="tDetailBoxForm" :model="tDetailBoxForm" :rules="tDetailBoxFormRule" class="tDetailBox">
			<Row>
				<Col span="12">
					<FormItem label="专题名称" prop="theme">
						<Select  v-bind:disabled="disabled"  v-model="tDetailBoxForm.theme" placeholder="请选择" clearable @on-change="getFileName" filterable>
							<Option v-for="(item, i) in themePriority" :key="item.value" :value="item.id">{{item.label}}</Option>
						</Select>
					</FormItem>
				</Col>


<!--				<Col span="12">-->
<!--					<FormItem label="字段id" prop="fieldId">-->
<!--						<Input v-bind:disabled="disabled"  type="text" :maxlength=50 v-model="tDetailBoxForm.fieldId" placeholder="请输入字段id"/>-->
<!--					</FormItem>-->
<!--				</Col>-->
			</Row>
      <Row v-for="(item,index) in this.themeData" :key="index" >
        <Col span="12">
          <FormItem label="字段名字" prop="fieldName">
            <Input type="text" :maxlength=50 v-model="item.fieldName" placeholder="请输入字段名称"/>
          </FormItem>
        </Col>
        <Col span="6" style="margin-left: 20px;">
          <FormItem label="显示开关：">
            <i-switch true-color="#3CB371" v-model="tDetailBoxForm.display" :true-value="1" :false-value="0"/>
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
	import {addTDetailBox,updateTDetailBox,getTDetailBox,getNameByTheme} from '@/api/zhgw/tDetailBox/tDetailBox'
	import { getDictDataByType } from '@/api/index';
	import { formartDate } from '@/api/tools/tool'
  import {getCardId, getPersonByCardId} from "@/api/zhsq/basicPerson/basicPerson";
	export default {
		name: "updateTDetailBox",
		props: {
			value: {
				type: Boolean,
				default: false
			},
			TDetailBoxId: {
				type: String
			},
			modalTitle: {
				type: String
			}
		},
		data() {
			return {
        themePriority:[],
				show: this.value,
				editTitle: this.modalTitle,
				loading: true,
				disabled:false,
        theme:[],
        themeData:[],
				tDetailBoxForm: {
          display:'',
					theme:'',
					fieldId:'',
					fieldName:'',
				},
				tDetailBoxFormRule: this.getTDetailBoxFormRule()
			}
		},
		methods: {
		  // addDisplay(){
      //   const index = this.themeData.length;
      //   this.tDetailBoxForm.push({
      //     display:'',
      //     theme:'',
      //     fieldId:'',
      //     fieldName:'',
      //   })
      // },
		  getFileName(v){
        if(v == null || v == undefined ){
          return;
        }

        getNameByTheme({theme:v}).then(res => {
            if (res && res.code == 200) {
              this.themeData = res.data;

              // this.tDetailBoxForm.theme = res.data.
            }
        });
      },
      getTheme(){
      getDictDataByType('theme').then(res => {
          if (res && res.success) {
            this.themePriority = res.data;
          }
        });
      },

			handelSubmit() {
				this.$refs['tDetailBoxForm'].validate((valid) => {
					this.loading = true;
					if (valid) {
						if(this.TDetailBoxId!=null&&this.TDetailBoxId.trim().length>0){
							this.tDetailBoxForm.id=this.TDetailBoxId;
							updateTDetailBox(this.tDetailBoxForm).then(res => {
								this.loading = false;
								if (res && res.code == 200) {
									this.closeModal(false);
									this.$emit('handleSearch');
									this.$Message.success('保存成功');
								}else{
									this.$Message.error(res.msg);
								}
							})
						}else{
							addTDetailBox(this.tDetailBoxForm).then(res => {
								if (res && res.code == 200) {
									this.closeModal(false);
									this.$emit('handleSearch');
									this.$Message.success('保存成功');
								}else{
									this.$Message.error(res.msg);
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
		    this.themeData=null;
				this.tDetailBoxForm= {
					theme:'',
					fieldId:'',
					fieldName:'',
				};
			},
			getTDetailBoxFormRule() {
				return {
					theme: [
						{required: true, message: '专题名称不能为空！', trigger: 'blur',pattern: /.+/ },
					],
				}
			}
		},
		watch: {
			value(val) {
				this.show = val;
			},
			show(val) {
			  this.getTheme();
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
					this.$refs['tDetailBoxForm'].resetFields();
					if(this.TDetailBoxId!=null&&this.TDetailBoxId.trim().length>0){
						getTDetailBox({id: this.TDetailBoxId}).then(res => {
							if (res && res.code == 200) {
							  this.tDetailBoxForm.display = res.data.display;
								this.tDetailBoxForm.theme = res.data.theme;
								this.tDetailBoxForm.fieldId = res.data.fieldId;
								this.tDetailBoxForm.fieldName = res.data.fieldName;
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
