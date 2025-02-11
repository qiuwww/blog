<style lang="less">
	.tRiskSources{
		.ivu-modal {
			width: 800px !important;
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
       width: 250px;
		}
    .mapContainer {
      z-index: 999999;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
    }
	}
  .closeBtn {
    position: absolute;
    top: -12px;
    right: -10px;
    font-size: 20px;
    color: #fff;
    width: 20px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    border-radius: 50%;
    background-color: #303833;
  }
  .closeBtn:active {
    background-color: #7f8a83;
  }
</style>
<template>
	<Modal v-model="show" :title="editTitle"  :mask-closable="false" class="tRiskSources">
		<Form ref="tRiskSourcesForm" :model="tRiskSourcesForm" :label-width="120" label-colon=":" label-position="right"
          :rules="tRiskSourcesFormRule">
			<Row>
				<Col span="12">
					<FormItem label="危险点名称" prop="name">
						<Input  type="text" :maxlength=100 v-model="tRiskSourcesForm.name" placeholder="请输入风险名称"/>
					</FormItem>
				</Col>
        <Col span="12">
          <FormItem label="安全负责人" prop="responsiblePerson">
            <Input  type="text" :maxlength=100 v-model="tRiskSourcesForm.responsiblePerson" placeholder="请输入安全负责人名称"/>
          </FormItem>
        </Col>
			</Row>
			<Row>
        <Col span="12">
          <FormItem label="所属部门" prop="department">
            <Select v-model="tRiskSourcesForm.department" style="width: 250px;">
              <Option v-for="(item, i)  in departmentList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
        </Col>
				<Col span="12">
          <FormItem label="风险等级" prop="riskLevel">
            <Select v-model="tRiskSourcesForm.riskLevel" style="width: 250px;">
              <Option v-for="(item, i)  in levelList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
				</Col>
			</Row>
			<Row>
				<Col span="12">
					<FormItem label="环境位置" prop="address">
						<Input  type="text" :maxlength=50 v-model="tRiskSourcesForm.address" placeholder="请输入所处地点"/>
					</FormItem>
				</Col>
				<Col span="12">
					<FormItem label="地理坐标" prop="coordinate" style="width: 279px!important;" >
						<Input  type="text" readonly :maxlength=50 icon="ios-map-outline" @on-click="chooseMap"
                    v-model="tRiskSourcesForm.coordinate" placeholder="请输入地理坐标">
            </Input>
					</FormItem>
				</Col>
			</Row>
			<Row>
				<Col span="12">
          <FormItem label="风险描述" prop="description">
            <Input  type="text" :maxlength=50 v-model="tRiskSourcesForm.description" placeholder="请输入风险描述"/>
          </FormItem>
				</Col>
        <Col span="12">
          <FormItem label="可能导致事故" prop="mayCause">
            <Input  type="text" :maxlength=50 v-model="tRiskSourcesForm.mayCause" placeholder="请输入可能导致事故"/>
          </FormItem>
        </Col>
			</Row>
      <Row>
        <FormItem label="主要防范措施" prop="measures" >
          <Input type="textarea" v-model="tRiskSourcesForm.measures" placeholder="请输入防范措施" style="width: 634px;" />
        </FormItem>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="上次检查日期" prop="preInspectDate">
<!--            :value="value1"-->
            <DatePicker type="date" :value="tRiskSourcesForm.preInspectDate" format="yyyy年MM月dd日" placeholder="请选择上次检查日期" style="width: 279px"></DatePicker>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="检查人员" prop="preInspectPerson" style="width: 279px!important;" >
            <Input  type="text" readonly :maxlength=50 v-model="tRiskSourcesForm.preInspectPerson" placeholder="请输入">
            </Input>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="下次检查日期" prop="nextInspectDate">
            <DatePicker type="date" :value="tRiskSourcesForm.nextInspectDate" format="yyyy年MM月dd日" placeholder="请选择下次检查日期" style="width: 279px"></DatePicker>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="检查人员" prop="nextInspectPerson" style="width: 279px!important;" >
            <Input  type="text" readonly :maxlength=50 icon="ios-map-outline" @on-click="chooseMap"
                    v-model="tRiskSourcesForm.nextInspectPerson" placeholder="请输入">
            </Input>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <FormItem label="备注" prop="remark" >
          <Input type="textarea" v-model="tRiskSourcesForm.remark" placeholder="请输入备注" style="width: 634px;" />
        </FormItem>
      </Row>
		</Form>

    <!--        <Col span="12">
              <FormItem label="风险图片" prop="attach">
                <div>
                  <Button type="default" size="large"　icon="ios-images"　@click="choiceFile()"
                    title="本地上传"　style="float: left;">
                  </Button>
                  <input ref="filElem" type="file" accept="image/*" id="people-export" @change="fileUpload" style="display: none;"/>
                  &lt;!&ndash;部门提交材料 图片预览&ndash;&gt;
                  <div class="images2" v-viewer="{movable: true}" style="float: right;width: 50%">
                    <img v-for="(item, i)  in imageUrlList" :src="item" :key="Math.random()" style="width: 50%">
                  </div>
                </div>
              </FormItem>
            </Col>-->
		<div slot="footer">
			<Button type="text" @click="show=false">取消</Button>
			<Button type="primary"  :loading="loading" @click="handelSubmit">提交</Button>
		</div>


    <div id="centerDiv" class="mapContainer" :style="{width:width,height:height}" v-show="mapShow">
      <Map :url="configUrl" :widgetUrl="widgetUrl" @onload="mapLoad"/>
      <span class="closeBtn" @click="closeMap">×</span>
    </div>
	</Modal>
</template>
<script>
	import {addTRiskSources,updateTRiskSources,getTRiskSources} from '@/api/tRiskSources/tRiskSources'
	import { getDictDataByType } from '@/api/index';
	import { formartDate , nginxUrl} from '@/api/tools/tool'
  import Map from "../../components/mars-map/Main.vue";
	export default {
	  //riskSources_type
		name: "updateTRiskSources",
    components: {
      Map
    },
		props: {
			value: {
				type: Boolean,
				default: false
			},
			TRiskSourcesId: {
				type: String
			},
			modalTitle: {
				type: String
			}
		},
		data() {
			return {
        //预览图片
        imageIsUpdate:false,
        imageUrlList:[],
        mapShow:false,
        width:"",
        height:"",
        configUrl: "../config/config.json",
        widgetUrl: "../config/widgetRiskSources.json",
        // height:800,
				show: this.value,
				editTitle: this.modalTitle,
				loading: true,
        //风险源类型
        departmentList:[],
        levelList:[],
        //坐标点
        pointArr: [],
        //地图对象
        viewer: '',
				tRiskSourcesForm: {
          //名称
					name:'',
          //安全负责人
          responsiblePerson:'',
          //所属部门
          department:'',
          //风险描述
					description:'',
          //环境位置
					address:'',
          //风险等级
					riskLevel:'',
          //可能导致事故
					mayCause:'',
          //地理坐标
          coordinate:'',
          //备注
          remark:'',
          //主要防范措施
          measures:'',
          //上次检查日期
          preInspectDate:'',
          //检查人员
          preInspectPerson:'',
          //下次检查日期
          nextInspectDate:'',
          //检查人员
          nextInspectPerson:'',
				},
				tRiskSourcesFormRule: this.getTRiskSourcesFormRule()
			}
		},
		methods: {
      //点击本地上传按钮触发事件
      choiceFile() {
        this.$refs.filElem.dispatchEvent(new MouseEvent('click'));
      },
      //选择本地文件进行上传
      fileUpload() {
        var _this = this;
        const inputFile = this.$refs.filElem.files[0];
        if (inputFile) {
          var reader = new FileReader();
          reader.readAsDataURL(inputFile);
          reader.onload = () => {
            _this.imageUrlList = [];
            _this.imageUrlList.push(reader.result);
            _this.imageIsUpdate = true;
            _this.tRiskSourcesForm.imgPath=reader.result;
          }
        } else {
          this.$Message.error('请选择图片');
        }
        this.$refs.filElem.value = null;
      },
      //地图构造完成回调
      mapLoad(viewer) {
        var _this = this;

        _this.viewer = viewer;
        var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
        handler.setInputAction(function (movement) {
          var ray = viewer.camera.getPickRay(movement.position);
          var position = viewer.scene.globe.pick(ray, viewer.scene);
          for (let i = 0; i < _this.pointArr.length; i++) {
            viewer.entities.remove(_this.pointArr[i]);
          }
          _this.addEntieyPoint(position);

        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
      },
      //添加实体
      addEntieyPoint(position) {
        let formatPositon = mars3d.point.formatPositon(position);
        let _this = this;
        var entitie = viewer.entities.add({
          name: "",
          position: position,
          billboard: {
            image: '../img/marker/mark3.png',
            scale: 0.8,
            horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
            verticalOrigin: Cesium.VerticalOrigin.CENTER,
            heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND
          },
          tooltip: {
            html: '<table style="width: 200px;">' +
              '   <tr>'
              + '<th scope="col" colspan="4" style="text-align:center;font-size:15px;"></th></tr><tr>'
              + '<td >经度：</td><td >' + formatPositon.x + '</td></tr><tr>'
              + '<td >纬度：</td><td >' + formatPositon.y + '</td></tr><tr>'
              + '<td >高层：</td><td >' + formatPositon.z + '</td></tr><tr>'
              + ' </tr>' +
              '</table>',
            anchor: [0, -12],
          },
          click: function (entity) {//单击
            _this.$Message.info("坐标信息已保存");
            _this.tRiskSourcesForm.coordinate = '[' + formatPositon.x + ',' + formatPositon.y + ',' + formatPositon.z + "]";
          }
        });
        this.pointArr.push(entitie);
      },
		  //提交
			handelSubmit() {
        this.loading = true;
				this.$refs['tRiskSourcesForm'].validate((valid) => {
					if (valid) {
						if(this.TRiskSourcesId!=null&&this.TRiskSourcesId.trim().length>0){
							this.tRiskSourcesForm.id=this.TRiskSourcesId;
							//用于判断图片是否修改
							this.tRiskSourcesForm.imageIsUpdate=this.imageIsUpdate;
							updateTRiskSources(this.tRiskSourcesForm).then(res => {
                this.loading = false;
								if (res && res.code == 200) {
									this.closeModal(false);
									this.$emit('handleSearch');
									this.$Message.success('保存成功');
								}else{
									this.$Message.error(res.message);
								}
							})
						}else{
							addTRiskSources(this.tRiskSourcesForm).then(res => {
                this.loading = false;
								if (res && res.code == 200) {
									this.closeModal(false);
									this.$emit('handleSearch');
									this.$Message.success('保存成功');
								}else{
                  this.closeModal(false);
									this.$Message.error(res.message);
								}
							})
						}
					} else {
							this.loading = false;
						  this.$Message.error('表单验证不通过！');
					}
				});
			},
      //关闭弹框
			closeModal(val) {
        this.initForm();
				this.$emit('input', val);
			},
      //清空表单
			initForm(){
        //清空图片
        this.imageUrlList =[];
        //清空表单
				this.tRiskSourcesForm= {
					type:'',
					name:'',
					imgPath:'',
					description:'',
					address:'',
					riskLevel:'',
					mayCause:'',
          coordinate:'',
          remark:'',
				};
			},
      //表单验证规则
			getTRiskSourcesFormRule() {
				return {
				  //危险点名称
					name: [
						{required: true, message: '风险名称不能为空！', trigger: 'blur'},
						{type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
					],
          //风险描述
					description: [
						{required: true, message: '风险描述不能为空！', trigger: 'blur'},
						{type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
					],
          //环境位置
					address: [
						{required: true, message: '所处地点不能为空！', trigger: 'blur'},
						{type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
					],
          //风险等级
					riskLevel: [
						{required: true, message: '风险等级不能为空！', trigger: 'change'},
						{type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
					],
          //可能导致事故
					mayCause: [
						{required: true, message: '可能导致事故不能为空！', trigger: 'blur'},
						{type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
					],
          //地理坐标
          coordinate:[
            {required: true, message: '地理坐标不能为空！', trigger: 'blur'},
            {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
          ],
          //安全负责人
          responsiblePerson:[
            {required: true, message: '安全负责人不能为空！', trigger: 'blur'},
            {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
          ],
          //所属部门
          department:[
            {required: true, message: '所属部门不能为空！', trigger: 'blur'},
            {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
          ],
          //主要防范措施
          measures:[
            {required: true, message: '主要防范措施不能为空！', trigger: 'blur'},
            {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
          ],
          //上次检查日期
          preInspectDate:[
            {required: true, message: '上次检查日期不能为空！', trigger: 'blur'},
            {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
          ],
          //上次检查人员
          preInspectPerson:[
            {required: true, message: '上次检查人员不能为空！', trigger: 'blur'},
            {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
          ],
          //下次检查日期
          nextInspectDate:[
            {required: true, message: '下次检查日期不能为空！', trigger: 'blur'},
            {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
          ],
          //下次检查人员
          nextInspectPerson:[
            {required: true, message: '下次检查人员不能为空！', trigger: 'blur'},
            {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
          ],
				}
			},
      //查询字典
      getDictData() {
			  var _this = this;
			  //风险源类型
        getDictDataByType("riskSources_type").then(res => {
          if (res && res.success) {
            _this.departmentList = res.data;
          }
        });
        //风险源等级
        getDictDataByType("riskSources_level").then(res => {
          if (res && res.success) {
            _this.levelList = res.data;
          }
        });
      },
      //地图选择
      chooseMap(){
        this.$Notice.open({
          title: '提示',
          desc: '单击地图选择点位，双击或再次点击图标保存点位信息'
        });
        //移除坐标点
        if(this.viewer){
          for (let i = 0; i < this.pointArr.length; i++) {
            this.viewer.entities.remove(this.pointArr[i]);
          }
        }else {
          this.$Message.error('地图加载错误，请刷新重试');
        }


        if (this.tRiskSourcesForm.coordinate) {
          let parse = JSON.parse(this.tRiskSourcesForm.coordinate);
          let lonlat2cartesian = mars3d.pointconvert.lonlat2cartesian(parse);
          this.addEntieyPoint(lonlat2cartesian);
        }
        this.mapShow = true;
      },
      //关闭地图
      closeMap(){
        this.mapShow = false;
        //清空搜索
        document.getElementById("txt_querypoi").value = "";
      },
		},
		watch: {
			value(val) {
        this.getDictData();
				this.show = val;
			},
			show(val) {
        this.initForm();
				this.loading=false;
				this.editTitle = this.modalTitle;
				if(val) {
					this.$refs['tRiskSourcesForm'].resetFields();
					if(this.TRiskSourcesId!=null&&this.TRiskSourcesId.trim().length>0){
						getTRiskSources({id: this.TRiskSourcesId}).then(res => {
							if (res && res.code == 200) {
								this.tRiskSourcesForm.type = res.data.type;
								this.tRiskSourcesForm.name = res.data.name;
								this.tRiskSourcesForm.imgPath = res.data.imgPath;
								this.tRiskSourcesForm.description = res.data.description;
								this.tRiskSourcesForm.address = res.data.address;
								this.tRiskSourcesForm.riskLevel = res.data.riskLevel;
								this.tRiskSourcesForm.mayCause = res.data.mayCause;
								this.tRiskSourcesForm.coordinate = res.data.coordinate;
								if (this.tRiskSourcesForm.imgPath){
                  this.imageUrlList.push(nginxUrl+this.tRiskSourcesForm.imgPath);
                }
              } else {
                  this.$Message.error(res.message);
                }
						});
					}
				} else {
					this.closeModal(val);
				}
			}
		},
    created(){
      this.height = Math.floor(document.body.scrollHeight * 0.95) + "px";
      this.width = Math.floor(document.body.scrollWidth *  0.95) + "px";
      console.log(this.height);
      console.log(this.width)
    },
	}
</script>
