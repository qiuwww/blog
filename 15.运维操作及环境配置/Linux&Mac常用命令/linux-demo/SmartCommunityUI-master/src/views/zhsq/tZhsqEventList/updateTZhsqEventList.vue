<style lang="less" scoped>
	.tZhsqEventList{
		.form-item-input {
			width: 200px;
		}
		 .ivu-form .ivu-form-item-label {
			width: 120px;
		}
		 .ivu-select {
			width: 190px;
		}
		 .ivu-input-wrapper {
			 width: 190px!important;
		}
		 .ivu-select-selection{
			 width: 190px!important;
		 }
	}
</style>
<style scoped>
  @import '../../../styles/default/indexHome.css';
</style>
<template>
	<Modal v-model="show" :title="editTitle"  :mask-closable="true" :width="1100" :draggable="false">
		<Form ref="tZhsqEventListForm" :model="tZhsqEventListForm" :rules="tZhsqEventListFormRule" class="tZhsqEventList" :label-width="110">
			<Row>
				<Col span="8">
					<FormItem label="事件分类" prop="eventClassification">
						<Select v-model="tZhsqEventListForm.eventClassification" placeholder="请选择事件分类" clearable >
							<Option v-for="(item, i) in eventClassificationPriority" :key="item.id" :value="item.id.toString()">{{item.label}}</Option>
						</Select>
					</FormItem>
				</Col>
				<Col span="8">
					<FormItem label="事件标题" prop="eventName">
						<Input type="text" :maxlength=50 v-model="tZhsqEventListForm.eventName" placeholder="请输入事件标题"/>
					</FormItem>
				</Col>
        <Col span="8">
          <FormItem label="发起人" prop="sponsor">
            <Input type="text" :maxlength=50 v-model="tZhsqEventListForm.sponsor" placeholder="请输入发起人"/>
          </FormItem>
        </Col>
			</Row>
			<Row>
        <Col span="8">
          <FormItem label="所属街道" prop="houseStreetId">
            <Select v-model="tZhsqEventListForm.houseStreetId" placeholder="请选择" @on-select="onStreetChange" :label-in-value="true" >
              <Option v-for="(item, i) in streetData" :key="item.id" :value="item.id.toString()">{{item.name}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="所属社区" prop="communityId">
            <Select v-model="tZhsqEventListForm.communityId" placeholder="请选择" @on-select="onCommunityChange" :label-in-value="true">
              <Option v-for="(item, i) in communityArr" :key="item.id" :value="item.id.toString()">{{item.name}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="所属网格" prop="gridId">
            <Select v-model="tZhsqEventListForm.gridId" placeholder="请选择" @on-select="ongridChange" :label-in-value="true">
              <Option v-for="(item, i) in gridPriority" :key="item.id" :value="item.id">{{item.name}}</Option>
            </Select>
          </FormItem>
        </Col>

<!--        <Col span="8">-->
<!--          <FormItem label="所属社区" prop="community">-->
<!--            <Select v-model="tZhsqEventListForm.community" placeholder="请选择所属社区" clearable @on-change="selectCommunity">-->
<!--              <Option v-for="(item, i) in communityArr" :key="item.value" :value="item.label">{{item.label}}</Option>-->
<!--            </Select>-->
<!--          </FormItem>-->
<!--        </Col>-->
<!--				<Col span="8">-->
<!--					<FormItem label="所属网格" prop="gridId">-->
<!--						<Select v-model="tZhsqEventListForm.gridId" placeholder="请选择所属网格" clearable :label-in-value="true" @on-change="selectGrid">-->
<!--							<Option v-for="(item, i) in gridPriority" :key="i" :value="item.id">{{item.name}}</Option>-->
<!--						</Select>-->
<!--					</FormItem>-->
<!--				</Col>-->


			</Row>
			<Row>
        <Col span="8">
          <FormItem label="事件开始时间" prop="eventStartingTime">
            <DatePicker type="datetime" style="width:190px;" :editable="false" placeholder="请输入事件开始时间"  v-model="tZhsqEventListForm.eventStartingTime" @on-change="setEventStartingTime" format="yyyy-MM-dd HH:mm:ss" ></DatePicker>
          </FormItem>
        </Col>
		<Col span="8">
			<FormItem label="事件结束时间" prop="eventEndTime">
				<DatePicker type="datetime" style="width:190px;" :editable="false" placeholder="请输入事件结束时间"  v-model="tZhsqEventListForm.eventEndTime" @on-change="setEventEndTime" format="yyyy-MM-dd HH:mm:ss" ></DatePicker>
			</FormItem>
		</Col>
		<Col span="8">
			<FormItem label="执行人" prop="executor">
				<Select v-model="tZhsqEventListForm.executor" placeholder="请选择执行人" clearable >
					<Option v-for="(item, i) in executorPriority" :key="item.id" :value="item.id.toString()">{{item.label}}</Option>
				</Select>
			</FormItem>
		</Col>
			</Row>
		<Row>
        <Col span="8">
          <FormItem label="事件状态" prop="eventStatus">
            <Select v-model="tZhsqEventListForm.eventStatus" placeholder="请选择事件状态" clearable >
              <Option v-for="(item, i) in eventStatusPriority" :key="item.id" :value="item.id.toString()">{{item.label}}</Option>
            </Select>
          </FormItem>
        </Col>
				<Col span="8">
					<FormItem label="地图标注" prop="position">
						<Input type="text" :maxlength=50 v-model="tZhsqEventListForm.position" placeholder="请选择地点" icon="md-map" :readonly="true" @on-click="checkMap"/>
					</FormItem>
				</Col>
			</Row>
    </Form>
		<div slot="footer">
			<Button type="text" @click="show=false">取消</Button>
			<Button type="primary" :loading="loading" @click="handelSubmit">提交</Button>
		</div>

		<plot v-model="ShowMap" modalTitle="选择坐标点" @resultPoint="getPosition" divId="updateTZhsqEventList"
		:objData="pointArr" iconPath="/img/archives/shanghu.png"  :selectType="selectTypee" ></plot>
	</Modal>
</template>
<script>
	import {addTZhsqEventList,updateTZhsqEventList,getTZhsqEventList} from '@/api/zhsq/tZhsqEventList/tZhsqEventList'
	import { getDictDataByType } from '@/api/index';
	import { formartDate } from '@/api/tools/tool'
	import {communityData,sortData,statusData,executorData} from '@/api/tools/zhsqSelectData';
	import {queryAllList} from '@/api/zhsq/basicGrids/basicGrids'
	import plot from "@/views/gismap/components/plot";
  import {getCommunityData, getDictionary, getStreetData} from "../../../api";
  import {queryAllList as gridsQueryAllList} from '@/api/zhsq/basicGrids/basicGrids'
  import {queryGridMemberList} from '@/api/zhsq/tZhsqGridMember/tZhsqGridMember'
	export default {
		name: "updateTZhsqEventList",
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
				loading: true,
				tZhsqEventListForm: {
					eventClassification:'',
					eventName:'',
					community:'',
					grid:'',
					gridId:'',
					sponsor:'',
					eventStartingTime:null,
					eventEndTime:null,
					executor:'',
					eventStatus:'',
					position:'',
					houseStreet:"",
					communityId:"",
					houseStreetId:"",
				},
				tZhsqEventListFormRule: this.getTZhsqEventListFormRule(),
				eventClassificationPriority:[],
				streetData: [],
				communityArr: [],
				gridPriority:[],
				executorPriority:[],
				eventStatusPriority:[],
				ShowMap:false,
				pointArr:[],
				selectTypee:'Point',
			}
		},
		methods: {
			getStatusData(){//初始化事件状态
				getDictDataByType('status').then(res => {
					if(res && res.success){
						this.eventStatusPriority = res.data;
					}
				})
			 },
			getSortData(){//初始化事件分类
				getDictDataByType('sort').then(res => {
					if(res && res.success){
						this.eventClassificationPriority = res.data;
					}
				})
			},
      //街道选择
      onStreetChange(e) {
        if (e) {
			this.tZhsqEventListForm.houseStreet = e.label;
			this.tZhsqEventListForm.houseStreetId = e.value;
        	//   this.loading = true;
			// this.tZhsqEventListForm.houseStreetId = e.value;
			getCommunityData({streetId: e.value}).then(res => {
				// this.loading = false;
				if (res && res.success) {
					this.communityArr = res.data;
				}
			});
        }
        this.tZhsqEventListForm.community = "";
        this.tZhsqEventListForm.communityId = "";
        this.tZhsqEventListForm.grid = "";
        this.tZhsqEventListForm.gridId = "";
        this.gridPriority = [];
      },
      //社区选择
      onCommunityChange(e) {
        if (e) {
        //   this.loading = true;
			this.tZhsqEventListForm.community = e.label;
			this.tZhsqEventListForm.communityId = e.value;
			gridsQueryAllList({communityId: e.value}).then(res => {
				// this.loading = false;
				if (res && res.success) {
				this.gridPriority = res.data
				} else {
				this.$Message.error('获取网格数据失败，请重新刷新');
				}
			});
        }
        this.tZhsqEventListForm.gridId = "";
        this.tZhsqEventListForm.grid = "";
        this.gridPriority = [];
	  },
	  	getExecutorData(){//初始化执行人
			getDictDataByType('executor').then(res => {
				if(res && res.success){
					this.executorPriority = res.data;
				}
			})
		},
      //网格选择
      ongridChange(e){
        if(e){
        //   this.loading = true;
			this.tZhsqEventListForm.gridId = e.value;
			this.tZhsqEventListForm.grid = e.label;
          /* queryGridMemberList({gridId: e.value}).then(res => {
            this.loading = false;
            if (res && res.success) {
              this.executorPriority = res.data
            } else {
              this.$Message.error('获取网格数据失败，请重新刷新');
            }
		  }); */
		}
      },
			//点击地图图标
			checkMap(){
				if (this.tZhsqEventListForm.position) {
                    this.pointArr = JSON.parse(this.tZhsqEventListForm.position);
				}
				this.ShowMap = true;
			},
			getPosition(obj,type){
				this.tZhsqEventListForm.position = JSON.stringify(obj.flatCoordinates);
			},
			//设置事件开始时间
			setEventStartingTime(e){
				this.tZhsqEventListForm.eventStartingTime = e;
			},
      		//设置事件结束时间
			setEventEndTime(e){
				this.tZhsqEventListForm.eventEndTime = e;
			},
			reductionDate(date){//转换时间
				let d = new Date(date);
				d = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
				return d;
			},
      		//提交
			handelSubmit() {
				this.$refs['tZhsqEventListForm'].validate((valid) => {
					if (valid) {

						this.loading = true;
						if(this.TZhsqEventListId!=null&&this.TZhsqEventListId.trim().length>0){
							this.tZhsqEventListForm.id=this.TZhsqEventListId;
							this.tZhsqEventListForm.eventStartingTime = this.reductionDate(this.tZhsqEventListForm.eventStartingTime);
							if(this.tZhsqEventListForm.eventEndTime){
								this.tZhsqEventListForm.eventEndTime = this.reductionDate(this.tZhsqEventListForm.eventEndTime);
							}
							updateTZhsqEventList(this.tZhsqEventListForm).then(res => {
								this.loading = false;
								if (res && res.code == 200) {
									this.closeModal(false);
									this.$emit('handleSearch');
									this.$Message.success('保存成功');
								}else{
									this.$Message.error(res.msg);
								}
							}).catch(error => {
								this.loading = false;
							})
						}else{
							addTZhsqEventList(this.tZhsqEventListForm).then(res => {
								this.loading = false;
								if (res && res.code == 200) {
									this.closeModal(false);
									this.$emit('handleSearch');
									this.$Message.success('保存成功');
								}else{
									this.$Message.error(res.msg);
								}
							}).catch(error => {
								this.loading = false;
							})
						}
					} else {
						this.$Message.error('表单验证不通过！');
					}
				});
			},
			closeModal(val) {
				this.$emit('input', val);
			},
			initForm(){
				this.tZhsqEventListForm= {
					eventClassification:'',
					eventName:'',
					community:'',
					grid:'',
					gridId:'',
					sponsor:'',
					eventStartingTime:null,
					eventEndTime:null,
					executor:'',
					eventStatus:'',
					position:'',
					houseStreet:"",
					communityId:"",
					houseStreetId:"",
				};
				this.pointArr = null;
				//加载街道
				getStreetData({}).then(res => {
					if (res && res.success) {
						this.streetData = res.data;
					}
				});
				this.getStatusData();
				this.getSortData();
				this.getExecutorData();
			},
			getTZhsqEventListFormRule() {
				return {
					eventClassification: [
						{required: true, message: '事件分类不能为空！', trigger: 'changer',pattern: /.+/ },
					],
					eventName: [
						{required: true, message: '事件标题不能为空！', trigger: 'blur'},
						{type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
					],
					houseStreetId: [
						{required: true, message: '所属街道不能为空！', trigger: 'changer',pattern: /.+/ },
					],
					communityId: [
						{required: true, message: '所属社区不能为空！', trigger: 'changer',pattern: /.+/ },
					],
					gridId: [
						{required: true, message: '所属网格不能为空！', trigger: 'changer',pattern: /.+/ },
					],
					sponsor: [
						{required: true, message: '发起人不能为空！', trigger: 'blur'},
						{type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
					],
					eventStartingTime: [
						{required: true, message: '事件开始时间不能为空！', trigger: 'changer',pattern: /.+/ },
					],
					executor: [
						{required: true, message: '执行人不能为空！', trigger: 'changer',pattern: /.+/ },
					],
					eventStatus: [
						{required: true,pattern:/^[0-9]+$/, message: '事件状态不能为空！', trigger: 'changer' },
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
					this.$refs['tZhsqEventListForm'].resetFields();
					if(this.TZhsqEventListId!=null&&this.TZhsqEventListId.trim().length>0){
						getTZhsqEventList({id: this.TZhsqEventListId}).then(res => {
							if (res && res.code == 200) {
								this.tZhsqEventListForm.eventClassification = res.data.eventClassification;
								this.tZhsqEventListForm.eventName = res.data.eventName;
								this.tZhsqEventListForm.community = res.data.community;
								this.tZhsqEventListForm.grid = res.data.grid;
								this.tZhsqEventListForm.gridId = res.data.gridId;
								this.tZhsqEventListForm.sponsor = res.data.sponsor;
								this.tZhsqEventListForm.houseStreetId = res.data.houseStreetId;
								this.tZhsqEventListForm.houseStreet = res.data.houseStreet;
								this.onStreetChange({value: res.data.houseStreetId});
								this.tZhsqEventListForm.communityId = res.data.communityId;
								this.tZhsqEventListForm.community = res.data.community;

								this.onCommunityChange({value: res.data.communityId});
								this.tZhsqEventListForm.grid = res.data.grid;
								this.tZhsqEventListForm.gridId = res.data.gridId;

								if(res.data.eventStartingTime){
									this.tZhsqEventListForm.eventStartingTime = formartDate(new Date(res.data.eventStartingTime).getTime(), 'yyyy-MM-dd hh:mm:ss');
								}else{
									this.tZhsqEventListForm.eventStartingTime = null;
								}
								if(res.data.eventEndTime){
									this.tZhsqEventListForm.eventEndTime = formartDate(new Date(res.data.eventEndTime).getTime(), 'yyyy-MM-dd hh:mm:ss');
								}else{
									this.tZhsqEventListForm.eventEndTime = null;
								}
								this.tZhsqEventListForm.executor = res.data.executor;
								this.tZhsqEventListForm.eventStatus = res.data.eventStatus.toString();
								this.tZhsqEventListForm.position = res.data.position;
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
		components:{
			plot
		}
	}
</script>
