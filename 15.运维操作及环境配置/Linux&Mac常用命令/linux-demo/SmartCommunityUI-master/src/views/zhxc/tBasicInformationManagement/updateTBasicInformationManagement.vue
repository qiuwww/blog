<style lang="less">
	.modalInformation{
    /*.myEditor{
      width: 100%;
      margin: 0;
    }*/
    .ql-editor{
      min-height: 350px;
    }
    .ivu-modal-body{
      height: 500px !important;
      overflow-y: auto;
    }
    .ivu-color-picker-rel{
      width: 223.73px;
    }
    .myWangEditorDiv {
      width: calc(100% - 159px);
      position: absolute;
      left: 110px;
      height: 300px;
    }
    .myWangEditorLabel {
      width: 110px;
      position: absolute;
      left: 0px;
      text-align: right;
      padding: 10px 12px 10px 0;
    }
    .ivu-color-picker .ivu-select-dropdown{
      z-index: 99999;
    }
    .addDepartUser-depart .ivu-form-item-content{
    position: relative;
    }

    .addDepartUser-depart .ivu-dropdown{
        position: absolute;
        right: 0;
        top: 0px;
    }

    .addDepartUser-depart .ivu-select-dropdown{
        top: 30px !important;
        padding: 5px;
        min-width: 189px;
        left: -223.66px !important;
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
        right: 0;
        z-index: 3;
        transition: all .2s ease-in-out;
    }

    .departVisibleSelectIcon{
        transform: rotateZ(-180deg);
    }

    .addDepartUser-depart .ivu-dropdown .ivu-tree{
        width: 212px;
    }

    .addDepartUser-depart .ivu-tree ul li{
        margin: 2px 0;
    }
  }
</style>
<template>
	<Modal v-model="show" :title="editTitle"  :mask-closable="false" width="1100px" class="modalInformation">
		<Form ref="tBasicInformationManagementForm" :model="tBasicInformationManagementForm" :label-width="110" style="margin-right: 50px;" :rules="tBasicInformationManagementFormRule">
			<Row>
        <Col span="8">
          <FormItem label="菜单名称" prop="menuName">
            <Input type="text" v-model="tBasicInformationManagementForm.menuName" disabled readonly/>
          </FormItem>
        </Col>
				<Col span="8">
					<FormItem label="区域名称" prop="name">
						<Input type="text" :maxlength=50 v-model="tBasicInformationManagementForm.name" placeholder="请输入区域名称"/>
					</FormItem>
				</Col>
        <Col span="8">
          <!-- <FormItem label="所属区域" prop="areaType">
            <Select v-model="tBasicInformationManagementForm.areaType" prop="areaType" transfer placeholder="请选择所属区域">
              <Option v-for="(item, i)  in areaTypeArr" :value="item.id.toString()" :key="item.id">{{item.label}}</Option>
            </Select>
          </FormItem> -->
          <FormItem label="所属区域" prop="areaType" class="addDepartUser-depart">
          <i-input v-model="areaName" placeholder="请选择" readonly>
            </i-input>
            <Dropdown trigger="custom" :visible="departVisible" placement="bottom-end">
                <a href="javascript:void(0)" @click="departVisible=!departVisible">
                    <Icon type="ios-arrow-down" v-bind:class="{departVisibleSelectIcon:departVisible}"></Icon>
                </a>
                <DropdownMenu slot="list">
                    <Tree v-bind:data="areaTypeArr" @on-select-change="selectDownitem">
                    </Tree>
                </DropdownMenu>
            </Dropdown>
          </FormItem>
        </Col>
			</Row>
			<Row>

        <Col span="8">
          <FormItem label="是否显示区域" prop="type">
            <RadioGroup v-model="tBasicInformationManagementForm.isDisplayState">
              <Radio :label="0">隐藏</Radio>
              <Radio :label="1">显示</Radio>
            </RadioGroup>
          </FormItem>
        </Col>

        <div v-if="tBasicInformationManagementForm.isDisplayState == '1'">
          <Col span="8">
            <FormItem label="区域位置" prop="position">
              <Input type="text" v-model="tBasicInformationManagementForm.position" placeholder="请标注区域位置" icon="md-map" @on-click="checkMap"/>
            </FormItem>
          </Col>

          <Col span="8">
            <FormItem label="区域颜色" prop="polygonColor">
              <ColorPicker v-model="tBasicInformationManagementForm.polygonColor" :recommend="true" format="hex"/>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="区域透明度" prop="alpha">
              <InputNumber :max="1" :min="0" :step="0.1" v-model="tBasicInformationManagementForm.alpha" @on-blur="changeAlpha" style="width:100%;" placeholder="请输入面的透明度"></InputNumber>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="有无立体效果">
              <RadioGroup v-model="tBasicInformationManagementForm.isStereoscopic">
                <Radio :label="0">无</Radio>
                <Radio :label="1">有</Radio>
              </RadioGroup>
            </FormItem>
          </Col>
          <Col span="8" v-if="tBasicInformationManagementForm.isStereoscopic">
            <FormItem label="区域高度" prop="surfaceHeight">
              <InputNumber :min="0" v-model="tBasicInformationManagementForm.surfaceHeight" style="width:100%;" placeholder="请输入区域高度"></InputNumber>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="是否显示标签" prop="isLabel">
              <RadioGroup v-model="tBasicInformationManagementForm.isLabel">
                <Radio :label="0">隐藏</Radio>
                <Radio :label="1">显示</Radio>
              </RadioGroup>
            </FormItem>
          </Col>
          <Col span="8" v-if="tBasicInformationManagementForm.isLabel">
            <FormItem label="最小视距" prop="min">
              <InputNumber :min="0" v-model="tBasicInformationManagementForm.min" style="width:100%;" placeholder="请输入最小视距"></InputNumber>
            </FormItem>
          </Col>
          <Col span="8" v-if="tBasicInformationManagementForm.isLabel">
            <FormItem label="最大视距" prop="max">
              <InputNumber :min="0" v-model="tBasicInformationManagementForm.max" style="width:100%;" placeholder="请输入最大视距"></InputNumber>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="有无边线" prop="isDashLien">
              <RadioGroup v-model="tBasicInformationManagementForm.isBorder">
                <Radio :label="0">无</Radio>
                <Radio :label="1">有</Radio>
              </RadioGroup>
            </FormItem>
          </Col>
          <Col span="8" v-if="tBasicInformationManagementForm.isBorder">
            <FormItem label="边线颜色" prop="color">
              <ColorPicker v-model="tBasicInformationManagementForm.color" :recommend="true" format="hex"/>
            </FormItem>
          </Col>
          <Col span="8" v-if="tBasicInformationManagementForm.isBorder">
            <FormItem label="边线宽度" prop="width">
              <InputNumber :min="0" v-model="tBasicInformationManagementForm.width" style="width:100%;" placeholder="请输入边线宽度"></InputNumber>
            </FormItem>
          </Col>
          <Col span="8" v-if="tBasicInformationManagementForm.isBorder">
            <FormItem label="是否为虚线" prop="isDashLien">
              <RadioGroup v-model="tBasicInformationManagementForm.isDashLien">
                <Radio :label="0">否</Radio>
                <Radio :label="1">是</Radio>
              </RadioGroup>
            </FormItem>
          </Col>
          <Col span="8" v-if="tBasicInformationManagementForm.isDashLien&&tBasicInformationManagementForm.isBorder">
            <FormItem label="虚线间隙长度" prop="dashLength">
              <InputNumber :min="0" v-model="tBasicInformationManagementForm.dashLength" style="width:100%;" placeholder="请输入虚线间隔长度"></InputNumber>
            </FormItem>
          </Col>

          <div v-if="tBasicInformationManagementForm.isDashLien == '0'">
            <Col span="8" v-if="tBasicInformationManagementForm.isBorder">
              <FormItem label="有无光晕" prop="isDashLien">
                <RadioGroup v-model="tBasicInformationManagementForm.isGlow">
                  <Radio :label="0">无</Radio>
                  <Radio :label="1">有</Radio>
                </RadioGroup>
              </FormItem>
            </Col>
            <Col span="8" v-if="tBasicInformationManagementForm.isGlow&&tBasicInformationManagementForm.isBorder">
              <FormItem label="光晕大小" prop="glow">
                <InputNumber :min="0.1" :max="1" :step="0.1" v-model="tBasicInformationManagementForm.glow" @on-blur="changeGlow" style="width:100%;" placeholder="请输入光晕大小"></InputNumber>
              </FormItem>
            </Col>
          </div>
        </div>
			</Row>
<!--			<Row>-->
<!--				<Col span="24">-->
<!--					<FormItem label="详情内容" prop="description">-->
<!--            &lt;!&ndash;<myQuillEditor :editorContent="tBasicInformationManagementForm.description" ref="myQuillEditor"></myQuillEditor>&ndash;&gt;-->
<!--            <myWangEditor :editorContent="tBasicInformationManagementForm.description" ref="myWangEditor"></myWangEditor>-->
<!--					</FormItem>-->
<!--				</Col>-->
<!--			</Row>-->
		</Form>
    <Row>
      <label class="myWangEditorLabel">详情内容</label>
      <myWangEditor class="myWangEditorDiv" :editorContent="tBasicInformationManagementForm.description"
                    ref="myWangEditor"></myWangEditor>
    </Row>
		<div slot="footer">
			<Button type="text" @click="show=false">取消</Button>
      <Button type="primary"  @click="previewClick">预览</Button>
			<Button type="primary" :loading="loading" @click="handelSubmit">提交</Button>
		</div>

		<!-- 地图弹窗 -->
		<mapLabel v-model="showMap" modalTitle="选择坐标点" @resultPoint="getPosition" divId="updateTBasicInformationManagement"
			:objData="pointArr" :selectType="selectType" :rgbaColor="rgbaColor" :menuId="String(tBasicInformationManagementForm.menuId)"></mapLabel>
    <!-- 预览页面 -->
    <preview v-model="showPreview" :geometry-type="geometryType" map-key="updateTBasicInformationManagement" :feature="feature"></preview>
	</Modal>
</template>
<script>
	import {addTBasicInformationManagement,updateTBasicInformationManagement,getTBasicInformationManagement} from '@/api/zhxc/tBasicInformationManagement/tBasicInformationManagement'
  // import myQuillEditor from "../components/myQuillEditor";
  import myWangEditor from "../components/myWangEditor";
	import mapLabel from "@/views/gismap/components/mapLabel";
  import { getDictDataByType } from '@/api/index';
  import preview from "../components/preview";
  import {getDepts} from "@/api/system/dept"

	export default {
		name: "updateTBasicInformationManagement",
		components: {
      mapLabel,
      myWangEditor,
      preview
      // myQuillEditor
    },
		props: {
			value: {
				type: Boolean,
				default: false
			},
			TBasicInformationManagementId: {
				type: String
			},
			modalTitle: {
				type: String
			},
			menuId:{
				type: Number
			},
			menuName:{
				type: String
			}
		},
		data() {
			return {
				show: this.value,
				editTitle: this.modalTitle,
        loading: true,
				tBasicInformationManagementForm: {
					name:'',
					position:'',
					description:'',
					isDashLien:0,
					width:null,
					color:'',
					dashLength:null,
          polygonColor:'',
					alpha:null,
          surfaceHeight:null,
					isDisplayState:1,
          isStereoscopic:0,
					menuId:this.menuId,
					menuName:this.menuName,
          areaType:'',
          isBorder:0,
          isGlow:0,
          glow:null,
          isLabel:1,
          max:null,
          min:null,
				},
				tBasicInformationManagementFormRule: this.getTBasicInformationManagementFormRule(),
				pointArr:[],
				showMap:false,
				selectType: 'Polygon',
        rgbaColor:'',
        areaTypeArr:[],
        showPreview:false,//是否展示预览页面
        geometryType:'polygon',//预览页面所需要的图形类型参数
        feature:null,//预览页面传递的各种属性
        areaName:"",
        departVisible:false,
			}
		},
		methods: {
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
          if (Array.isArray(value) && value.length > 0) {
              this.tBasicInformationManagementForm.areaType = value[0].value;
              this.areaName = value[0].title;
              this.departVisible = false;
          }
      },
      //光晕大小 失去焦点
      changeGlow(){
        if (this.tBasicInformationManagementForm.glow || this.tBasicInformationManagementForm.glow != 0){
          this.tBasicInformationManagementForm.glow = this.getFloat(this.tBasicInformationManagementForm.glow,1);
        }else{
          this.tBasicInformationManagementForm.glow = null;
        }
      },
      //保留几位小数并四舍五入
      getFloat(num, n) {
        n = n ? parseInt(n) : 0;
        if(n <= 0) {
          return Math.round(num);
        }
        num = Math.round(num * Math.pow(10, n)) / Math.pow(10, n); //四舍五入
        num = Number(Number(num).toFixed(n)); //补足位数
        return num;
      },
      //颜色十六进制转变为rgba格式
      colorTransform(color,alpha){
        // 16进制颜色值的正则
        let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
        // 把颜色值变成小写
        if(color!='' && color){
          color = color.toLowerCase();
          if (reg.test(color)) {
            // 如果只有三位的值，需变成六位，如：#fff => #ffffff
            if (color.length === 4) {
              let colorNew = "#";
              for (let i = 1; i < 4; i += 1) {
                colorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1));
              }
              color = colorNew;
            }
            // 处理六位的颜色值，转为RGB
            let colorChange = [];
            for (let i = 1; i < 7; i += 2) {
              colorChange.push(parseInt("0x" + color.slice(i, i + 2)));
            }
            if (alpha==0||alpha==null){
              return "rgba(" + colorChange.join(",") + "," + 0 + ")";
            }else{
              return "rgba(" + colorChange.join(",") + "," + alpha + ")";
            }
          } else {
            return color;
          }
        }else{
          return '';
        }

      },
		  //保留几位小数并四舍五入
      getFloat(num, n) {
        n = n ? parseInt(n) : 0;
        if(n <= 0) {
          return Math.round(num);
        }
        num = Math.round(num * Math.pow(10, n)) / Math.pow(10, n); //四舍五入
        num = Number(Number(num).toFixed(n)); //补足位数
        return num;
      },
      //透明度 失去焦点
      changeAlpha(){
        if (this.tBasicInformationManagementForm.alpha || this.tBasicInformationManagementForm.alpha != 0){
          this.tBasicInformationManagementForm.alpha = this.getFloat(this.tBasicInformationManagementForm.alpha,1);
        }else{
          this.tBasicInformationManagementForm.alpha = null;
        }
      },
			//获取坐标点
      getPosition(obj, type) {
        if (obj.flatCoordinates){
          this.tBasicInformationManagementForm.position = JSON.stringify(obj.flatCoordinates);
        }else{
          this.tBasicInformationManagementForm.position = '';
        }
      },
      //打开地图
			checkMap(){
        if (this.tBasicInformationManagementForm.position) {
          this.pointArr = JSON.parse(this.tBasicInformationManagementForm.position);
        }else {
          this.pointArr = [];
        }
        this.rgbaColor = this.colorTransform(this.tBasicInformationManagementForm.polygonColor,this.tBasicInformationManagementForm.alpha);
        this.showMap = true;
			},
			handelSubmit() {
        // let editorContent = this.$refs.myQuillEditor.getEditorContent();
        let editorContent = this.$refs.myWangEditor.getEditorData();
        this.tBasicInformationManagementForm.description = editorContent;
				this.$refs['tBasicInformationManagementForm'].validate((valid) => {
					this.loading = true;
					if (valid) {
            if (this.tBasicInformationManagementForm.max && this.tBasicInformationManagementForm.min){
              if (this.tBasicInformationManagementForm.max < this.tBasicInformationManagementForm.min){
                this.loading = false;
                this.$Message.error('最大视距应大于最小视距！');
                return;
              }
            }
						if(this.TBasicInformationManagementId!=null&&this.TBasicInformationManagementId.trim().length>0){
							this.tBasicInformationManagementForm.id=this.TBasicInformationManagementId;
							updateTBasicInformationManagement(this.tBasicInformationManagementForm).then(res => {
								this.loading = false;
								if(res){
                  if (res && res.code == 200) {
                    this.$Message.success('修改成功');
                    this.closeModal(false);
                    this.$emit('handleSearch');
                  }else{
                    this.$Message.error(res.msg);
                  }
                }
								else {
                  this.$Message.error('修改失败');
                }


							}).catch(err => {
								this.loading = false;
							})
						}else{
							addTBasicInformationManagement(this.tBasicInformationManagementForm).then(res => {
								this.loading = false;
								if(res){
                  if (res && res.code == 200) {
                    this.$Message.success('保存成功');
                    this.closeModal(false);
                    this.$emit('handleSearch');
                  }else{
                    this.$Message.error(res.msg);
                  }
                }
                else {
                  this.$Message.error('修改失败');
                }

							}).catch(err => {
								this.loading = false;
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
				this.tBasicInformationManagementForm= {
					name:'',
					position:'',
					description:'',
          isDashLien:0,
					width:null,
					color:'',
					dashLength:null,
					polygonColor:'',
					alpha:null,
          surfaceHeight:null,
          isDisplayState:1,
					menuId:this.menuId,
					menuName:this.menuName,
          isStereoscopic:0,
          areaType:'',
          isBorder:0,
          isGlow:0,
          glow:null,
          isLabel:1,
          max:null,
          min:null,
        };
        this.areaName='';
        this.departVisible=false;
        //this.getDictData();
        this.getlist();
			},
			getTBasicInformationManagementFormRule() {
				return {
					name: [
						{required: true, message: '区域名称不能为空！', trigger: 'blur'},
						{type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
					],
          color: [
            {required: true, message: '虚线颜色不能为空！', trigger: 'blur'},
          ],
					alpha: [
						{type: 'number', message: '区域透明度为一位小数', trigger: 'blur',pattern: /\b(0(\.\d{1})?)|1\b/}
					],
          surfaceHeight: [
            {type: 'integer', required: true, message: '区域高度不能为空！', trigger: 'blur'},
						{type: 'integer', message: '区域高度为正整数', trigger: 'blur'}
					],
          areaType: [
            {required: true, message: '所属区域不能为空！', trigger: 'blur',pattern: /.+/ },
          ],
          glow: [
            {required: true, message: '光晕大小不能为空！', trigger: 'blur',pattern: /.+/ },
          ]
				}
			},
      //预览点击事件
      previewClick(){
        this.showPreview = true;
        this.geometryType = "polygon";
        this.feature = this.tBasicInformationManagementForm;
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
					this.$refs['tBasicInformationManagementForm'].resetFields();
					if(this.TBasicInformationManagementId!=null&&this.TBasicInformationManagementId.trim().length>0){
						getTBasicInformationManagement({id: this.TBasicInformationManagementId}).then(res => {
						  if(res){
                if (res && res.code == 200) {
                  this.tBasicInformationManagementForm.name = res.data.name;
                  this.tBasicInformationManagementForm.position = res.data.position;
                  this.tBasicInformationManagementForm.description = res.data.description;
                  this.tBasicInformationManagementForm.isDashLien = res.data.isDashLien;
                  this.tBasicInformationManagementForm.width = res.data.width;
                  this.tBasicInformationManagementForm.color = res.data.color;
                  this.tBasicInformationManagementForm.dashLength = res.data.dashLength;
                  this.tBasicInformationManagementForm.polygonColor  = res.data.polygonColor ;
                  this.tBasicInformationManagementForm.alpha = res.data.alpha;
                  this.tBasicInformationManagementForm.surfaceHeight = res.data.surfaceHeight;
                  this.tBasicInformationManagementForm.menuId = res.data.menuId;
                  this.tBasicInformationManagementForm.menuName = res.data.menuName;
                  this.tBasicInformationManagementForm.isStereoscopic = res.data.isStereoscopic;
                  this.tBasicInformationManagementForm.isDisplayState = res.data.isDisplayState;
                  this.tBasicInformationManagementForm.areaType = res.data.areaType;
                  this.tBasicInformationManagementForm.isBorder = res.data.isBorder;
                  this.tBasicInformationManagementForm.isGlow = res.data.isGlow;
                  this.tBasicInformationManagementForm.glow = res.data.glow;
                  this.tBasicInformationManagementForm.isLabel = res.data.isLabel;
                  this.tBasicInformationManagementForm.max = res.data.max;
                  this.tBasicInformationManagementForm.min = res.data.min;
                  if(res.data.areaType=="0"){
                      this.areaName ="首页"
                  }else{
                    this.areaName = res.data.areaTypeName;
                  }
                } else {
                  this.$Message.error(res.msg);
                }
              }
						  else{
                this.$Message.error("查询失败");
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
