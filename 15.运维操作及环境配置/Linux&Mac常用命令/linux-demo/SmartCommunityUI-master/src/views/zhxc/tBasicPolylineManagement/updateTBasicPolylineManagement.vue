<style lang="less">
  .modalPolyline {
    /*.myEditor{
      width: 100%;
      margin: 0;
    }*/

    .ql-editor {
      min-height: 350px;
    }

    .ivu-modal-body {
      height: 500px !important;
      overflow-y: auto;
    }

    .ivu-color-picker-rel {
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

    .ivu-color-picker .ivu-select-dropdown {
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
  <Modal v-model="show" :title="editTitle" :mask-closable="false" width="1100px" class="modalPolyline">
    <Form ref="tBasicPolylineManagementForm" :model="tBasicPolylineManagementForm" :label-width="110"
          style="margin-right: 50px;" :rules="tBasicPolylineManagementFormRule">
      <Row>
        <Col span="8">
          <FormItem label="菜单名称" prop="menuName">
            <Input type="text" v-model="tBasicPolylineManagementForm.menuName" disabled readonly/>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="线状名称" prop="name">
            <Input type="text" :maxlength=50 v-model="tBasicPolylineManagementForm.name" placeholder="请输入线状名称"/>
          </FormItem>
        </Col>
        <Col span="8">
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

        <Col span="8">
          <FormItem label="是否显示线" prop="isShow">
            <RadioGroup v-model="tBasicPolylineManagementForm.isShow">
              <Radio :label="0">否</Radio>
              <Radio :label="1">是</Radio>
            </RadioGroup>
          </FormItem>
        </Col>
        <div v-if="tBasicPolylineManagementForm.isShow == '1'">
          <Col span="8">
            <FormItem label="线状坐标" prop="position">
              <Input type="text" v-model="tBasicPolylineManagementForm.position" placeholder="请标注线状位置" icon="md-map"
                     @on-click="checkMap"/>
            </FormItem>
          </Col>

          <Col span="8">
            <FormItem label="线宽度" prop="width">
              <InputNumber :min="0" v-model="tBasicPolylineManagementForm.width" style="width:100%;"
                           placeholder="建议宽度为4"></InputNumber>
            </FormItem>
          </Col>

          <Col span="8">
            <FormItem label="线颜色" prop="color">
              <ColorPicker v-model="tBasicPolylineManagementForm.color" :recommend="true" format="hex"/>
            </FormItem>
          </Col>

          <Col span="8">
            <FormItem label="是否为虚线" prop="isDash">
              <RadioGroup v-model="tBasicPolylineManagementForm.isDash">
                <Radio :label="0">否</Radio>
                <Radio :label="1">是</Radio>
              </RadioGroup>
            </FormItem>
          </Col>
          <Col span="8" v-if="tBasicPolylineManagementForm.isDash ">
            <FormItem label="虚线间隙长度" prop="length">
              <InputNumber :min="0" v-model="tBasicPolylineManagementForm.length" style="width:100%;"
                           placeholder="建议间隙长度为10"></InputNumber>
            </FormItem>
          </Col>

          <Col span="8">
            <FormItem label="是否显示标签" prop="isLabel">
              <RadioGroup v-model="tBasicPolylineManagementForm.isLabel">
                <Radio :label="0">否</Radio>
                <Radio :label="1">是</Radio>
              </RadioGroup>
            </FormItem>
          </Col>
          <Col span="8" v-if="tBasicPolylineManagementForm.isLabel ">
            <FormItem label="最小视距" prop="min">
              <InputNumber :min="0" v-model="tBasicPolylineManagementForm.min" style="width:100%;"
                           placeholder="请输入最小视距"></InputNumber>
            </FormItem>
          </Col>
          <Col span="8" v-if="tBasicPolylineManagementForm.isLabel ">
            <FormItem label="最大视距" prop="max">
              <InputNumber :min="0" v-model="tBasicPolylineManagementForm.max" style="width:100%;"
                           placeholder="请输入最大视距"></InputNumber>
            </FormItem>
          </Col>
          <div v-if="tBasicPolylineManagementForm.isDash == '0'">
            <Col span="8">
              <FormItem label="有无光晕" prop="isGlow">
                <RadioGroup v-model="tBasicPolylineManagementForm.isGlow">
                  <Radio :label="0">无</Radio>
                  <Radio :label="1">有</Radio>
                </RadioGroup>
              </FormItem>
            </Col>
            <Col span="8" v-if="tBasicPolylineManagementForm.isGlow">
              <FormItem label="光晕大小" prop="glow">
                <InputNumber :min="0.1" :max="1" :step="0.1" v-model="tBasicPolylineManagementForm.glow"
                             @on-blur="changeGlow" style="width:100%;" placeholder="建议光晕大小为0.3"></InputNumber>
              </FormItem>
            </Col>
          </div>
          <Col span="8">
            <FormItem label="有无动态效果" prop="isTrend">
              <RadioGroup v-model="tBasicPolylineManagementForm.isTrend">
                <Radio :label="0">无</Radio>
                <Radio :label="1">有</Radio>
              </RadioGroup>
            </FormItem>
          </Col>
        </div>
      </Row>
      <!--			<Row>-->
      <!--				<Col span="24">-->
      <!--					<FormItem label="详情内容" prop="description">-->
      <!--&lt;!&ndash;            <myQuillEditor :editorContent="tBasicPolylineManagementForm.description" ref="myQuillEditor"></myQuillEditor>&ndash;&gt;-->
      <!--            <myWangEditor :editorContent="tBasicPolylineManagementForm.description" ref="myWangEditor"></myWangEditor>-->
      <!--					</FormItem>-->
      <!--				</Col>-->
      <!--			</Row>-->
    </Form>
    <Row>
      <label class="myWangEditorLabel">详情内容</label>
      <myWangEditor class="myWangEditorDiv" :editorContent="tBasicPolylineManagementForm.description"
                    ref="myWangEditor"></myWangEditor>
    </Row>
    <div slot="footer">
      <Button type="text" @click="show=false">取消</Button>
      <Button type="primary"  @click="previewClick">预览</Button>
      <Button type="primary" :loading="loading" @click="handelSubmit">提交</Button>
    </div>

    <!-- 地图弹窗 -->
    <mapLabel v-model="showMap" modalTitle="选择坐标点" :menuId="this.menuIdMap.toString()" @resultPoint="getPosition"
              divId="updateTBasicPolylineManagement"
              :objData="pointArr" :selectType="selectType"></mapLabel>
    <!-- 预览页面 -->
    <preview v-model="showPreview" :geometry-type="geometryType" map-key="updateTBasicPolylineManagement" :feature="feature"></preview>
  </Modal>
</template>
<script>
    import {
        addTBasicPolylineManagement,
        updateTBasicPolylineManagement,
        getTBasicPolylineManagement
    } from '@/api/zhxc/tBasicPolylineManagement/tBasicPolylineManagement'
    // import myQuillEditor from "../components/myQuillEditor";
    import myWangEditor from "../components/myWangEditor";
    import mapLabel from "@/views/gismap/components/mapLabel";
    import {getDictDataByType} from '@/api/index';
    import preview from "../components/preview";
    import {getDepts} from "@/api/system/dept"

    export default {
        name: "updateTBasicPolylineManagement",
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
            TBasicPolylineManagementId: {
                type: String
            },
            modalTitle: {
                type: String
            },
            menuId: {
                type: Number
            },
            menuName: {
                type: String
            }
        },
        data() {
            return {
                show: this.value,
                editTitle: this.modalTitle,
                loading: true,
                menuIdMap: '',
                tBasicPolylineManagementForm: {
                    name: '',
                    position: '',
                    description: '',
                    isDash: 0,
                    width: null,
                    color: '',
                    isDisplayState: "0",
                    menuId: this.menuId,
                    menuName: this.menuName,
                    areaType: '',
                    length: 0,
                    isShow: 1,
                    isGlow: 0,
                    glow: null,
                    isLabel: 1,
                    max: 8000,
                    min: 0,
                    isTrend: 0,
                },
                tBasicPolylineManagementFormRule: this.getTBasicPolylineManagementFormRule(),
                pointArr: [],
                showMap: false,
                selectType: 'LineString',
                rgbaColor: '',
                areaTypeArr: [],
                showPreview:false,//是否展示预览页面
                geometryType:'lineString',//预览页面所需要的图形类型参数
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
                    this.tBasicPolylineManagementForm.areaType = value[0].value;
                    this.areaName = value[0].title;
                    this.departVisible = false;
                }
            },
            //光晕大小 失去焦点
            changeGlow() {
                if (this.tBasicPolylineManagementForm.glow || this.tBasicPolylineManagementForm.glow != 0) {
                    this.tBasicPolylineManagementForm.glow = this.getFloat(this.tBasicPolylineManagementForm.glow, 1);
                } else {
                    this.tBasicPolylineManagementForm.glow = null;
                }
            },
            //保留几位小数并四舍五入
            getFloat(num, n) {
                n = n ? parseInt(n) : 0;
                if (n <= 0) {
                    return Math.round(num);
                }
                num = Math.round(num * Math.pow(10, n)) / Math.pow(10, n); //四舍五入
                num = Number(Number(num).toFixed(n)); //补足位数
                return num;
            },
            //线类型
            getDictData() {
                getDictDataByType('polyline_type').then(res => {
                    if (res && res.success) {
                        this.areaTypeArr = res.data;
                    }
                });
            },
            //获取坐标点
            getPosition(obj, type) {
                if (obj.flatCoordinates) {
                    this.tBasicPolylineManagementForm.position = JSON.stringify(obj.flatCoordinates);
                } else {
                    this.tBasicPolylineManagementForm.position = '';
                }
            },
            //打开地图
            checkMap() {
                if (this.tBasicPolylineManagementForm.position) {
                    this.pointArr = JSON.parse(this.tBasicPolylineManagementForm.position);
                } else {
                    this.pointArr = [];
                }
                this.showMap = true;
            },
            handelSubmit() {
                this.$refs['tBasicPolylineManagementForm'].validate((valid) => {
                    this.loading = true;
                    if (valid) {
                        if (this.tBasicPolylineManagementForm.max && this.tBasicPolylineManagementForm.min) {
                            if (this.tBasicPolylineManagementForm.max < this.tBasicPolylineManagementForm.min) {
                                this.loading = false;
                                this.$Message.error('最大视距应大于最小视距！');
                                return;
                            }
                        }
                        // let editorContent = this.$refs.myQuillEditor.getEditorContent();
                        let editorContent = this.$refs.myWangEditor.getEditorData();
                        this.tBasicPolylineManagementForm.description = editorContent;
                        if (this.TBasicPolylineManagementId != null && this.TBasicPolylineManagementId.trim().length > 0) {
                            this.tBasicPolylineManagementForm.id = this.TBasicPolylineManagementId;
                            updateTBasicPolylineManagement(this.tBasicPolylineManagementForm).then(res => {
                                this.loading = false;
                                if (res && res.code == 200) {
                                    this.$Message.success('修改成功');
                                } else {
                                    this.$Message.error(res.msg);
                                }
                                this.closeModal(false);
                                this.$emit('handleSearch');
                            }).catch(err => {
                                this.loading = false;
                            })
                        } else {
                            addTBasicPolylineManagement(this.tBasicPolylineManagementForm).then(res => {
                                this.loading = false;
                                if (res && res.code == 200) {
                                    this.$Message.success('保存成功');
                                } else {
                                    this.$Message.error(res.msg);
                                }
                                this.closeModal(false);
                                this.$emit('handleSearch');
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
            //传menuID到map
            menuIdData() {
                if (this.modalTitle == "新增") {
                    this.menuIdMap = this.menuId;
                }
            },
            closeModal(val) {
                this.$emit('input', val);
            },
            initForm() {
                this.tBasicPolylineManagementForm = {
                    name: '',
                    position: '',
                    description: '',
                    isDash: 0,
                    width: null,
                    color: '',
                    isDisplayState: '1',
                    menuId: this.menuId,
                    menuName: this.menuName,
                    areaType: '',
                    isShow: 1,
                    length: null,
                    isGlow: 0,
                    glow: null,
                    isLabel: 1,
                    max: 8000,
                    min: 0,
                    isTrend: 0,
                };
                this.areaName='';
                this.getlist();
                this.departVisible=false;
            },
            getTBasicPolylineManagementFormRule() {
                return {
                    name: [
                        {required: true, message: '名称不能为空！', trigger: 'blur'},
                        {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
                    ],
                    position: [
                        {required: true, message: '坐标不能为空！', trigger: 'blur'}
                    ],
                    areaType: [
                        {required: true, message: '所属区域不能为空！', trigger: 'blur', pattern: /.+/},
                    ],
                    glow: [
                        {required: true, message: '光晕大小不能为空！', trigger: 'blur', pattern: /.+/},
                    ]
                }
            },
            //预览点击事件
            previewClick(){
                this.showPreview = true;
                this.geometryType = "lineString";
                this.feature = this.tBasicPolylineManagementForm;
            }
        },
        watch: {
            value(val) {
                this.show = val;
            },
            show(val) {
                this.menuIdData();
                this.initForm();
                this.loading = false;
                this.editTitle = this.modalTitle;
                if (val) {
                    this.$refs['tBasicPolylineManagementForm'].resetFields();
                    if (this.TBasicPolylineManagementId != null && this.TBasicPolylineManagementId.trim().length > 0) {
                        getTBasicPolylineManagement({id: this.TBasicPolylineManagementId}).then(res => {
                            if (res && res.code == 200) {
                                this.tBasicPolylineManagementForm.name = res.data.name;
                                this.tBasicPolylineManagementForm.position = res.data.position;
                                this.tBasicPolylineManagementForm.description = res.data.description;
                                this.tBasicPolylineManagementForm.isDash = res.data.isDash;
                                this.tBasicPolylineManagementForm.width = res.data.width;
                                this.tBasicPolylineManagementForm.color = res.data.color;
                                this.tBasicPolylineManagementForm.menuId = res.data.menuId;
                                this.tBasicPolylineManagementForm.menuName = res.data.menuName;
                                this.tBasicPolylineManagementForm.isDisplayState = res.data.isDisplayState;
                                if(res.data.areaType=="0"){
                                    this.areaName  ="首页"
                                }else{
                                  this.areaName=res.data.areaTypeName;
                                }
                                this.tBasicPolylineManagementForm.length = res.data.length;
                                this.tBasicPolylineManagementForm.isShow = res.data.isShow;
                                this.tBasicPolylineManagementForm.isGlow = res.data.isGlow;
                                this.tBasicPolylineManagementForm.glow = res.data.glow;
                                this.tBasicPolylineManagementForm.isLabel = res.data.isLabel;
                                this.tBasicPolylineManagementForm.max = res.data.max;
                                this.tBasicPolylineManagementForm.min = res.data.min;
                                this.tBasicPolylineManagementForm.isTrend = res.data.isTrend;
                                if (this.modalTitle == "编辑") {
                                    this.menuIdMap = res.data.menuId;
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
