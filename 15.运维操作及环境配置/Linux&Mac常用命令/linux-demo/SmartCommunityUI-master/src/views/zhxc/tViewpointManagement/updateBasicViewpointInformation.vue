<style lang="less">
	.basicViewpointInformation{
		.ivu-select {
      width: 189px;
    }

    .ivu-input-wrapper {
      width: 79%;
    }

    .ivu-input-number {
      width: 189px;
    }
	.ivu-modal-body {
      padding-right: 40px;
    }

    .element.style {
      float: left;
      width: 800px;
    }

    .myWangEditor {
      line-height: normal !important;
      height: 400px;
      float: left;
      width: 96%;
    }

    .ql-editor {
      min-height: 150px;
    }

    .ivu-color-picker-rel {
      width: 189px;
    }

    .myWangEditor {
      width: calc(100% - 135px);
      position: absolute;
      left: 100px;
    }

    .myWangEditorLabel {
      width: 100px;
      position: absolute;
      left: 0px;
      text-align: right;
      padding: 10px 12px 10px 0;
    }

    .ivu-color-picker .ivu-select-dropdown {
      z-index: 99999;
    }
    .addDepartUser-depart .ivu-form-item-content{
    position: relative;
    }

    .addDepartUser-depart .ivu-dropdown{
        position: absolute;
        right: 50px;
        top: 0px;
    }

    .addDepartUser-depart .ivu-select-dropdown{
        top: 30px !important;
        padding: 5px;
		width: 397px;
    	left: -373.53px !important;
        max-height: 180px;
        overflow-y: auto;
        z-index: 99999;
    }
    .addDepartUser-depart .ivu-dropdown-rel .ivu-icon{
        width: 32px;
        height: 32px;
        line-height: 32px;
        font-size: 16px;
        text-align: center;
        color: #808695;
        position: absolute;
        right: -20px;
        z-index: 3;
        transition: all .2s ease-in-out;
    }

    .departVisibleSelectIcon{
        transform: rotateZ(-180deg);
    }

    .addDepartUser-depart .ivu-dropdown .ivu-tree{
        width: 178.53px;
    }

    .addDepartUser-depart .ivu-tree ul li{
        margin: 2px 0;
    }
	}
</style>
<template>
	<Modal v-model="show" :title="editTitle"  :mask-closable="false" :width="560" class="basicViewpointInformation">
		<Form ref="basicViewpointInformationForm" :model="basicViewpointInformationForm" :rules="basicViewpointInformationFormRule" class="basicViewpointInformation">
			<Row>

				<FormItem label="区域名称" prop="areaId" class="addDepartUser-depart">
					<i-input v-bind:disabled="disabled" v-model="quyuname" placeholder="请选择" readonly>
					</i-input>
					<Dropdown v-if="!disabled"  trigger="custom" :visible="departVisible" placement="bottom-end">
						<a href="javascript:void(0)" @click="departVisible=!departVisible">
							<Icon type="ios-arrow-down" v-bind:class="{departVisibleSelectIcon:departVisible}"></Icon>
						</a>
						<DropdownMenu slot="list">
							<Tree v-bind:data="areaTypeArr" @on-select-change="selectDownitem">
							</Tree>
						</DropdownMenu>
					</Dropdown>

				</FormItem>

			</Row>
			<Row>
					<FormItem label="视角信息" prop="perspectiveInfo">
						<Input v-bind:disabled="disabled"  :rows="3" type="textarea" :maxlength=150 v-model="basicViewpointInformationForm.perspectiveInfo" placeholder='信息格式：{"y":y坐标,"x":x坐标,"z":z坐标,"heading":z轴转向,"pitch":x轴转向,"roll":y轴转向}'/>
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
	import {getbyareaId,addBasicViewpointInformation,updateBasicViewpointInformation,getBasicViewpointInformation} from '@/api/zhxc/basicViewpointInformation/basicViewpointInformation'
	import { getDictDataByType } from '@/api/index';
	import { formartDate } from '@/api/tools/tool'
	import {getDepts} from "@/api/system/dept"
	export default {
		name: "updateBasicViewpointInformation",
		props: {
			value: {
				type: Boolean,
				default: false
			},
			BasicViewpointInformationId: {
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
				quyuname:"",
				areaTypeArr:[],
				departVisible:false,
				basicViewpointInformationForm: {
					perspectiveInfo:'',
					areaId:'',
				},
				basicViewpointInformationFormRule: this.getBasicViewpointInformationFormRule()
			}
		},
		methods: {
			handelSubmit() {
				this.$refs['basicViewpointInformationForm'].validate((valid) => {
					this.loading = true;
					if (valid) {
						if(this.BasicViewpointInformationId!=null&&this.BasicViewpointInformationId.trim().length>0){
							this.basicViewpointInformationForm.id=this.BasicViewpointInformationId;
							updateBasicViewpointInformation(this.basicViewpointInformationForm).then(res => {
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
						}else{
							addBasicViewpointInformation(this.basicViewpointInformationForm).then(res => {
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
			// 获取区域数据
			getlist() {
				getDepts({ enabled: true }).then(res => {
				this.areaTypeArr = this.getTreeData(res.content);
				this.areaTypeArr.unshift({
					title:'首页',
					value:'0',
					expand:false,
				})
				})
			},
			//转为tree使用的数据
			getTreeData(data) {
						if (data) {
							for (let i in data) {
								var item = data[i];
								data[i].title = data[i].label;
								data[i].value = data[i].id;
								data[i].expand = true;
								if (data[i].children) {
									data[i].children = this.getTreeData(data[i].children);
								}
							}
						}
						return data;
					},
			// 所属地域
			selectDownitem(value) {
				var _this=this
				if (Array.isArray(value) && value.length > 0) {
					getbyareaId({path:value[0].value}).then(res => {
						if(res){
							if(res.data.length>0){
								_this.$Message.error("已存在相应数据");
							}else{
								this.basicViewpointInformationForm.areaId = value[0].value.toString();
								this.quyuname = value[0].title;
								this.departVisible = false;
							}
						}else{
							_this.$Message.error("查询失败");
						}
					})

				}
			},
			closeModal(val) {
				this.$emit('input', val);
			},
			initForm(){
				this.basicViewpointInformationForm= {
					perspectiveInfo:'',
					areaId:'',
				};
				this.quyuname='';
				this.getlist();
				this.departVisible=false;
			},
			getBasicViewpointInformationFormRule() {
				return {
					perspectiveInfo: [
						{required: true, message: '视角信息不能为空！', trigger: 'blur'},
						{type: 'string', max: 150, message: '数据的最大长度为150！', trigger: 'blur'}
					],
					areaId:[
						{required: true, message: '区域信息不能为空！', trigger: 'blur'},
						{type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
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
				if(this.editTitle == "查看"){
					this.disabled = true;
				}
				else{
					this.disabled = false;
				}
				if(val) {
					this.$refs['basicViewpointInformationForm'].resetFields();
					if(this.BasicViewpointInformationId!=null&&this.BasicViewpointInformationId.trim().length>0){
						getBasicViewpointInformation({id: this.BasicViewpointInformationId}).then(res => {
							if (res) {
								if (res && res.code == 200) {
									this.basicViewpointInformationForm.perspectiveInfo = res.data.perspectiveInfo;
									this.basicViewpointInformationForm.areaId = res.data.areaId
									if(res.data.areaId=="0"){
                                    	this.quyuname ="首页"
									}else{
										this.quyuname = res.data.name;
									}

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
