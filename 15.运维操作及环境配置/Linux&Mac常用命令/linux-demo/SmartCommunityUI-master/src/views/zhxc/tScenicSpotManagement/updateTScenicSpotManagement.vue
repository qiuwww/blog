<style lang="less">
  .tScenicSpotManagement {
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
      height: 500px !important;
      overflow-y: auto;
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
        min-width: 188.53px;
        left: -188.53px !important;
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
        width: 178.53px;
    }

    .addDepartUser-depart .ivu-tree ul li{
        margin: 2px 0;
    }
  }
</style>
<template>
  <Modal v-model="show" :title="editTitle" :mask-closable="false" :width="1100" class="tScenicSpotManagement">
    <Form ref="tScenicSpotManagementForm" :label-width="100" :model="tScenicSpotManagementForm"
          style="margin-right: 35px;"
          :rules="tScenicSpotManagementFormRule">
      <Row>
        <Col span="8">
          <FormItem label="点位名称" prop="name">
            <Input v-bind:disabled="disabled" :maxlength=50 type="text" v-model="tScenicSpotManagementForm.name"
                   placeholder="请输入名称"/>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="菜单名称" prop="menuName">
            <Input type="text" v-model="tScenicSpotManagementForm.menuName" disabled readonly/>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="所属区域" prop="pointType" class="addDepartUser-depart">
              <Input v-model="areaName" placeholder="请选择" readonly />
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
          <FormItem label="是否全景" prop="display">
            <RadioGroup v-bind:disabled="disabled" v-model="tScenicSpotManagementForm.isScenery">
              <Radio label="1">是</Radio>
              <Radio label="0">否</Radio>
            </RadioGroup>
          </FormItem>
        </Col>

        <Col span="8">
          <FormItem label="全景地址" prop="url" v-if="tScenicSpotManagementForm.isScenery == 1 ">
            <Input v-bind:disabled="disabled" :maxlength=50 type="text" v-model="tScenicSpotManagementForm.url"
                   placeholder="请输入url"/>
          </FormItem>
        </Col>

        <Col span="8">
          <FormItem label="是否显示点" prop="display">
            <RadioGroup v-bind:disabled="disabled" v-model="tScenicSpotManagementForm.display">
              <Radio label="1">是</Radio>
              <Radio label="0">否</Radio>
            </RadioGroup>
          </FormItem>
        </Col>

        <div v-if="tScenicSpotManagementForm.display=='1'">
          <Col span="8">
            <FormItem label="点坐标"
                      prop="position">
              <Input :maxlength=50 v-model="tScenicSpotManagementForm.position" placeholder="请标注经纬度" icon="md-map"
                     @on-click="checkMap"/>
            </FormItem>
          </Col>

          <Col span="8">
            <FormItem label="是否显示图标">
              <RadioGroup v-bind:disabled="disabled" v-model="tScenicSpotManagementForm.isShowIcon"
                          @on-change="iconShowChange">
                <Radio label="1">是</Radio>
                <Radio label="0">否</Radio>
              </RadioGroup>
            </FormItem>
          </Col>
          <Col span="8" v-if="tScenicSpotManagementForm.isShowIcon== '1' ">
            <FormItem label="图标" prop="icon">
              <icon-choose v-model="tScenicSpotManagementForm.icon"></icon-choose>
            </FormItem>
          </Col>

          <Col span="8" v-if="tScenicSpotManagementForm.isShowIcon== '1' ">
            <FormItem label="点位高度">
              <InputNumber :min="0" v-model="tScenicSpotManagementForm.height" placeholder="请输入点的点位高度"></InputNumber>
            </FormItem>
          </Col>

          <Col span="8">
            <FormItem label="是否显示名称">
              <RadioGroup v-bind:disabled="disabled" v-model="tScenicSpotManagementForm.titleShow"
                          @on-change="titleShowChange">
                <Radio label="1">是</Radio>
                <Radio label="0">否</Radio>
              </RadioGroup>
            </FormItem>
          </Col>

          <Col span="8" v-if="tScenicSpotManagementForm.titleShow == '1'">
            <FormItem label="背景颜色" prop="backgroundColor">
              <ColorPicker v-model="tScenicSpotManagementForm.backgroundColor" format="rgb"/>
            </FormItem>
          </Col>

          <Col span="8">
            <FormItem label="最小视距" v-if="tScenicSpotManagementForm.titleShow == '1' " prop="min">
              <InputNumber :min="0" v-model="tScenicSpotManagementForm.min" placeholder="请输入点的最小视距"></InputNumber>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="最大视距" v-if="tScenicSpotManagementForm.titleShow == '1' " prop="max">
              <InputNumber :min="0" v-model="tScenicSpotManagementForm.max" placeholder="请输入点的最大视距"></InputNumber>
            </FormItem>
          </Col>

          <Col span="8">
            <FormItem label="名称位置" v-if="tScenicSpotManagementForm.titleShow == '1'" prop="namePosition">
              <RadioGroup v-bind:disabled="disabled" v-model="tScenicSpotManagementForm.namePosition">
                <Radio label="1">上</Radio>
                <Radio label="0">下</Radio>
              </RadioGroup>
            </FormItem>
          </Col>
        </div>
      </Row>
    </Form>
    <Row>
      <label class="myWangEditorLabel">详情内容</label>
      <myWangEditor class="myWangEnditor" :editorContent="tScenicSpotManagementForm.describes"
                    ref="myWangEditor"></myWangEditor>
    </Row>
    <div slot="footer">
      <Button type="text" @click="show=false">取消</Button>
      <Button type="primary"  @click="previewClick">预览</Button>
      <Button type="primary" :loading="loading" @click="handelSubmit">提交</Button>
    </div>
    <!-- 地图弹窗 -->
    <plot v-model="showMap" modalTitle="选择坐标点" :menuId="this.menuIdMap.toString()" @resultPoint="getPosition"
          divId="TScenicSpotManagement"
          :objData="pointArr" :iconPath="tScenicSpotManagementForm.icon" :selectType="selectTypee"></plot>
    <!-- 预览页面 -->
    <preview v-model="showPreview" :geometry-type="geometryType" map-key="updateTScenicSpotManagement" :feature="feature"></preview>
  </Modal>
</template>
<script>
    import {
        addTScenicSpotManagement,
        updateTScenicSpotManagement,
        getTScenicSpotManagement
    } from '@/api/zhxc/tScenicSpotManagement/tScenicSpotManagement'
    import {getDictDataByType} from '@/api/index';
    import myWangEditor from "../components/myWangEditor";
    import IconChoose from "./icon-choose";
    import {formartDate, nginxUrl} from '@/api/tools/tool'
    import plot from "@/views/gismap/components/mapLabel";
    import preview from "../components/preview";
    import {getDepts} from "@/api/system/dept"

    export default {
        name: "updateTScenicSpotManagement",
        components: {
            plot,
            IconChoose,
            myWangEditor,
            preview
        },
        props: {
            value: {
                type: Boolean,
                default: false
            },
            TScenicSpotManagementId: {
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
            },
        },
        data() {
            return {
                show: this.value,
                editTitle: this.modalTitle,
                menuIdMap: '',
                loading: true,
                disabled: false,
                editorContent: '',
                pointArr: [],
                tScenicSpotManagementForm: {
                    height: null,
                    menuId: null,
                    menuName: '',
                    icon: '/img/scenicSpotIcon/3.png',
                    isScenery: "0",
                    namePosition: '1',
                    pointType: '',
                    backgroundColor: '',
                    display: "0",
                    titleShow: "1",
                    isShowIcon: "1",
                    min: 0,
                    max: 8000,
                    name: '',
                    position: '',
                    url: '',
                    describes: '',
                },
                PointPriority: [],
                areaTypeArr:[],
                showMap: false,
                selectTypee: 'Point',
                tScenicSpotManagementFormRule: this.getTScenicSpotManagementFormRule(),
                showPreview:false,//是否展示预览页面
                geometryType:'point',//预览页面所需要的图形类型参数
                feature:null,//预览页面传递的各种属性
                areaName:"",//区域名称
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
                    this.tScenicSpotManagementForm.pointType = value[0].value;
                    this.areaName = value[0].title;
                    this.departVisible = false;
                }
            },
            //是否显示图标
            iconShowChange(e) {
                if (e == "0" && this.tScenicSpotManagementForm.titleShow == "0") {
                    this.tScenicSpotManagementForm.display = "0";
                    this.tScenicSpotManagementForm.isShowIcon = "1";
                    this.tScenicSpotManagementForm.titleShow = "1";
                }
            },
            //是否显示名称
            titleShowChange(e) {
                if (e == "0" && this.tScenicSpotManagementForm.isShowIcon == "0") {
                    this.tScenicSpotManagementForm.display = "0";
                    this.tScenicSpotManagementForm.titleShow = "1";
                    this.tScenicSpotManagementForm.isShowIcon = "1";
                }
            },
            //获取poi点类型
            getPointPriority() {
                getDictDataByType('point_type').then(res => {
                    if (res && res.success) {
                        this.PointPriority = res.data;
                    }
                });
            },
            //获取坐标点
            getPosition(obj, type) {
                this.tScenicSpotManagementForm.position = JSON.stringify(obj.flatCoordinates);
            },
            //点击地图图标
            checkMap() {
                if (this.tScenicSpotManagementForm.position) {
                    this.pointArr = JSON.parse(this.tScenicSpotManagementForm.position);
                }
                this.showMap = true;
            },
            menuIdData() {
                if (this.modalTitle == "新增") {
                    this.menuIdMap = this.menuId;
                }
            },
            handelSubmit() {
                this.$refs['tScenicSpotManagementForm'].validate((valid) => {
                    this.loading = true;
                    if (valid) {
                        // let editorContent = this.$refs.myQuillEditor.getEditorContent();
                        let editorContent = this.$refs.myWangEditor.getEditorData();
                        this.tScenicSpotManagementForm.describes = editorContent;
                        if (this.tScenicSpotManagementForm.min && this.tScenicSpotManagementForm.max) {
                            if (this.tScenicSpotManagementForm.min > this.tScenicSpotManagementForm.max) {
                                this.loading = false;
                                this.$Message.error('最小视距应小于等于最大视距');
                                return;
                            }
                        }
                        if (this.TScenicSpotManagementId != null && this.TScenicSpotManagementId.trim().length > 0) {
                            this.tScenicSpotManagementForm.id = this.TScenicSpotManagementId;
                            updateTScenicSpotManagement(this.tScenicSpotManagementForm).then(res => {
                                this.loading = false;
                                if (res && res.code == 200) {
                                    this.closeModal(false);
                                    this.$emit('handleSearch');
                                    this.$Message.success('保存成功');
                                } else {
                                    this.$Message.error(res.msg);
                                }
                            })
                        } else {
                            addTScenicSpotManagement(this.tScenicSpotManagementForm).then(res => {
                                if (res && res.code == 200) {
                                    this.closeModal(false);
                                    this.$emit('handleSearch');
                                    this.$Message.success('保存成功');
                                } else {
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
            initForm() {
                this.imageUrlList = [];
                this.PointPriority = [];
                this.tScenicSpotManagementForm = {
                    menuId: this.menuId,
                    menuName: this.menuName,
                    height: null,
                    icon: '',
                    isShowIcon: "1",
                    titleShow: "1",
                    max: 8000,
                    min: 0,
                    pointType: '',
                    backgroundColor: '',
                    isScenery: '0',
                    display: "0",
                    namePosition: '1',
                    name: '',
                    position: '',
                    url: '',
                    describes: '',
                };
                this.areaName='';
                this.departVisible=false;
                this.getlist();
            },
            getTScenicSpotManagementFormRule() {
                return {
                    name: [
                        {required: true, message: '名称不能为空！', trigger: 'blur'},
                        {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
                    ],
                    position: [
                        {required: true, message: '位置不能为空！', trigger: 'blur'},
                        {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
                    ],
                    pointType: [
                        {required: true, message: '所属区域不能为空！', trigger: 'blur', pattern: /.+/},
                    ],
                    // titleShow: [
                    //   {required: true, message: '是否显示点名称！', trigger: 'blur'},
                    //   {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
                    // ],
                    namePosition: [
                        {required: true, message: '显示位置不能为空！', trigger: 'blur'},
                        {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
                    ],
                    display: [
                        {required: true, message: '是否为全景不能为空！', trigger: 'blur'},
                        {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
                    ],
                    url: [
                        {required: true, message: 'url不能为空！', trigger: 'blur'},
                        {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
                    ],
                    icon: [
                        {required: true, message: '图标不能为空！', trigger: 'blur'},
                        {type: 'string', max: 255, message: '数据的最大长度为255！', trigger: 'blur'}
                    ],
                    isScenery: [
                        {required: true, message: '是否显示不能为空！', trigger: 'blur'},
                        {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
                    ],
                }
            },
            //预览点击事件
            previewClick(){
                this.showPreview = true;
                this.geometryType = "point";
                this.feature = this.tScenicSpotManagementForm;
            }
        },
        watch: {
            value(val) {
                this.show = val;
            },
            show(val) {
                this.initForm();
                this.getPointPriority();
                this.menuIdData();
                this.loading = false;
                this.editTitle = this.modalTitle;
                if (this.editTitle == "查看") {
                    this.disabled = true;
                } else {
                    this.disabled = false;
                }
                if (val) {
                    this.$refs['tScenicSpotManagementForm'].resetFields();
                    if (this.TScenicSpotManagementId != null && this.TScenicSpotManagementId.trim().length > 0) {
                        getTScenicSpotManagement({id: this.TScenicSpotManagementId}).then(res => {
                            if (res && res.code == 200) {
                                this.tScenicSpotManagementForm.backgroundColor = res.data.backgroundColor;
                                this.tScenicSpotManagementForm.namePosition = res.data.namePosition;
                                this.tScenicSpotManagementForm.titleShow = res.data.titleShow;
                                this.tScenicSpotManagementForm.menuName = res.data.menuName;
                                this.tScenicSpotManagementForm.min = res.data.min;
                                this.tScenicSpotManagementForm.max = res.data.max;
                                this.tScenicSpotManagementForm.pointType = res.data.pointType;
                                /*if(res.data.isShowIcon){
                                  this.tScenicSpotManagementForm.isShowIcon = res.data.isShowIcon.toString();
                                }*/
                                if(res.data.pointType=="0"){
                                    this.pointType ="首页"
                                }else{
                                  this.areaName = res.data.typeName;
                                }
                                this.tScenicSpotManagementForm.isShowIcon = res.data.isShowIcon + '';
                                this.tScenicSpotManagementForm.icon = res.data.icon;
                                this.tScenicSpotManagementForm.height = res.data.height;
                                this.tScenicSpotManagementForm.display = res.data.display;
                                this.tScenicSpotManagementForm.name = res.data.name;
                                this.tScenicSpotManagementForm.isScenery = res.data.isScenery;
                                this.tScenicSpotManagementForm.position = res.data.position;
                                this.tScenicSpotManagementForm.url = res.data.url;
                                this.tScenicSpotManagementForm.describes = res.data.describes;
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
