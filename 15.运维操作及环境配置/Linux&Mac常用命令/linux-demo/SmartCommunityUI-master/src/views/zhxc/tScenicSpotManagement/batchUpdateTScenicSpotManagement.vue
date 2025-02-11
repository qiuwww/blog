<style lang="less">
  .batchUpdateTScenicSpotManagement {
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
  <Modal v-model="show" :title="editTitle" :mask-closable="false" :width="1100" class="batchUpdateTScenicSpotManagement">
    <Form ref="batchUpdateTScenicSpotManagementForm" :label-width="100" :model="batchUpdateTScenicSpotManagementForm"
          style="margin-right: 35px;"
          :rules="batchUpdateTScenicSpotManagementFormRule">
      <Row>
        <Col span="8">
          <FormItem label="点位名称" prop="name">
            <Input v-bind:disabled="disabled" :maxlength=50 type="text" v-model="batchUpdateTScenicSpotManagementForm.name"
                   placeholder="请输入名称"/>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="菜单名称" prop="menuName">
            <Input type="text" v-model="batchUpdateTScenicSpotManagementForm.menuName" disabled readonly/>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="所属区域" prop="pointType" class="addDepartUser-depart">
            <i-input v-model="quyuname" placeholder="请选择" readonly>
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
          <FormItem label="是否全景" prop="display">
            <RadioGroup v-bind:disabled="disabled" v-model="batchUpdateTScenicSpotManagementForm.isScenery">
              <Radio label="1">是</Radio>
              <Radio label="0">否</Radio>
            </RadioGroup>
          </FormItem>
        </Col>

        <Col span="8">
          <FormItem label="全景地址" prop="url" v-if="batchUpdateTScenicSpotManagementForm.isScenery == 1 ">
            <Input v-bind:disabled="disabled" :maxlength=50 type="text" v-model="batchUpdateTScenicSpotManagementForm.url"
                   placeholder="请输入url"/>
          </FormItem>
        </Col>

        <Col span="8">
          <FormItem label="是否显示点" prop="display">
            <RadioGroup v-bind:disabled="disabled" v-model="batchUpdateTScenicSpotManagementForm.display">
              <Radio label="1">是</Radio>
              <Radio label="0">否</Radio>
            </RadioGroup>
          </FormItem>
        </Col>

        <div v-if="batchUpdateTScenicSpotManagementForm.display=='1'">
          <Col span="8">
            <FormItem label="点坐标"
                      prop="position">
              <Input :maxlength=50 v-model="batchUpdateTScenicSpotManagementForm.position" placeholder="请标注经纬度" icon="md-map"
                     @on-click="checkMap"/>
            </FormItem>
          </Col>

          <Col span="8">
            <FormItem label="是否显示图标">
              <RadioGroup v-bind:disabled="disabled" v-model="batchUpdateTScenicSpotManagementForm.isShowIcon"
                          @on-change="iconShowChange">
                <Radio label="1">是</Radio>
                <Radio label="0">否</Radio>
              </RadioGroup>
            </FormItem>
          </Col>
          <Col span="8" v-if="batchUpdateTScenicSpotManagementForm.isShowIcon== '1' ">
            <FormItem label="图标" prop="icon">
              <icon-choose v-model="batchUpdateTScenicSpotManagementForm.icon"></icon-choose>
            </FormItem>
          </Col>

          <Col span="8" v-if="batchUpdateTScenicSpotManagementForm.isShowIcon== '1' ">
            <FormItem label="点位高度">
              <InputNumber :min="0" v-model="batchUpdateTScenicSpotManagementForm.height" placeholder="请输入点的点位高度"></InputNumber>
            </FormItem>
          </Col>

          <Col span="8">
            <FormItem label="是否显示名称">
              <RadioGroup v-bind:disabled="disabled" v-model="batchUpdateTScenicSpotManagementForm.titleShow"
                          @on-change="titleShowChange">
                <Radio label="1">是</Radio>
                <Radio label="0">否</Radio>
              </RadioGroup>
            </FormItem>
          </Col>

          <Col span="8" v-if="batchUpdateTScenicSpotManagementForm.titleShow == '1'">
            <FormItem label="背景颜色" prop="backgroundColor">
              <ColorPicker v-model="batchUpdateTScenicSpotManagementForm.backgroundColor" format="rgb"/>
            </FormItem>
          </Col>

          <Col span="8">
            <FormItem label="最小视距" v-if="batchUpdateTScenicSpotManagementForm.titleShow == '1' " prop="min">
              <InputNumber :min="0" v-model="batchUpdateTScenicSpotManagementForm.min" placeholder="请输入点的最小视距"></InputNumber>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="最大视距" v-if="batchUpdateTScenicSpotManagementForm.titleShow == '1' " prop="max">
              <InputNumber :min="0" v-model="batchUpdateTScenicSpotManagementForm.max" placeholder="请输入点的最大视距"></InputNumber>
            </FormItem>
          </Col>

          <Col span="8">
            <FormItem label="名称位置" v-if="batchUpdateTScenicSpotManagementForm.titleShow == '1'" prop="namePosition">
              <RadioGroup v-bind:disabled="disabled" v-model="batchUpdateTScenicSpotManagementForm.namePosition">
                <Radio label="1">上</Radio>
                <Radio label="0">下</Radio>
              </RadioGroup>
            </FormItem>
          </Col>
        </div>
      </Row>
    </Form>
    <div slot="footer">
      <Button type="text" @click="show=false">取消</Button>
      <Button type="primary" :loading="loading" @click="handelSubmit">提交</Button>
    </div>
  </Modal>
</template>
<script>
    import {
        updateByIds
    } from '@/api/zhxc/tScenicSpotManagement/tScenicSpotManagement'
    import {getDictDataByType} from '@/api/index';
    import myWangEditor from "../components/myWangEditor";
    import IconChoose from "./icon-choose";
    import {formartDate, nginxUrl} from '@/api/tools/tool'
    import plot from "@/views/gismap/components/mapLabel";
    import {getDepts} from "@/api/system/dept"

    export default {
        name: "batchUpdateTScenicSpotManagement",
        components: {
            plot,
            IconChoose,
            myWangEditor

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
                batchUpdateTScenicSpotManagementForm: {
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
                quyuname:"",
                departVisible:false,
                batchUpdateTScenicSpotManagementFormRule: this.getTScenicSpotManagementFormRule()
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
                    this.batchUpdateTScenicSpotManagementForm.areaType = value[0].value;
                    this.quyuname = value[0].title;
                    this.departVisible = false;
                }
            },
            //是否显示图标
            iconShowChange(e) {
                if (e == "0" && this.batchUpdateTScenicSpotManagementForm.titleShow == "0") {
                    this.batchUpdateTScenicSpotManagementForm.display = "0";
                    this.batchUpdateTScenicSpotManagementForm.isShowIcon = "1";
                    this.batchUpdateTScenicSpotManagementForm.titleShow = "1";
                }
            },
            //是否显示名称
            titleShowChange(e) {
                if (e == "0" && this.batchUpdateTScenicSpotManagementForm.isShowIcon == "0") {
                    this.batchUpdateTScenicSpotManagementForm.display = "0";
                    this.batchUpdateTScenicSpotManagementForm.titleShow = "1";
                    this.batchUpdateTScenicSpotManagementForm.isShowIcon = "1";
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
                this.batchUpdateTScenicSpotManagementForm.position = JSON.stringify(obj.flatCoordinates);
            },
            menuIdData() {
                if (this.modalTitle == "新增") {
                    this.menuIdMap = this.menuId;
                }
            },
            handelSubmit() {
                this.$refs['batchUpdateTScenicSpotManagementForm'].validate((valid) => {
                    this.loading = true;
                    if (valid) {
                        if (this.batchUpdateTScenicSpotManagementForm.min && this.batchUpdateTScenicSpotManagementForm.max) {
                            if (this.batchUpdateTScenicSpotManagementForm.min > this.batchUpdateTScenicSpotManagementForm.max) {
                                this.loading = false;
                                this.$Message.error('最小视距应小于等于最大视距');
                                return;
                            }
                        }
                        let ids = [];
                        this.$parent.selectList.forEach(function (e) {
                          ids.push(e.id);
                        });
                        this.batchUpdateTScenicSpotManagementForm.ids = ids
                        if(this.batchUpdateTScenicSpotManagementForm.backgroundColor==''){
                          this.batchUpdateTScenicSpotManagementForm.backgroundColor = null;
                        }

                        this.batchUpdateTScenicSpotManagementForm.id = null;
                        updateByIds(this.batchUpdateTScenicSpotManagementForm).then(res => {
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
                this.batchUpdateTScenicSpotManagementForm = {
                    menuId: this.menuId,
                    menuName: this.menuName,
                    height: null,
                    icon: null,
                    isShowIcon: null,
                    titleShow: null,
                    max: 8000,
                    min: 0,
                    pointType: null,
                    backgroundColor: '',
                    isScenery: null,
                    display: null,
                    namePosition: null,
                    name: null,
                    position: null,
                    url: null,
                    describes: null,
                };
                this.quyuname='';
                this.departVisible=false;
                this.getlist();
            },
            getTScenicSpotManagementFormRule() {
                return {
                    name: [
                        {required: false, message: '名称不能为空！', trigger: 'blur'},
                        {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
                    ],
                    position: [
                        {required: false, message: '位置不能为空！', trigger: 'blur'},
                        {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
                    ],
                    pointType: [
                        {required: false, message: '所属区域不能为空！', trigger: 'blur'},
                        {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
                    ],
                    // titleShow: [
                    //   {required: true, message: '是否显示点名称！', trigger: 'blur'},
                    //   {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
                    // ],
                    namePosition: [
                        {required: false, message: '显示位置不能为空！', trigger: 'blur'},
                        {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
                    ],
                    display: [
                        {required: false, message: '是否为全景不能为空！', trigger: 'blur'},
                        {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
                    ],
                    url: [
                        {required: false, message: 'url不能为空！', trigger: 'blur'},
                        {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
                    ],
                    icon: [
                        {required: false, message: '图标不能为空！', trigger: 'blur'},
                        {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
                    ],
                    isScenery: [
                        {required: false, message: '是否显示不能为空！', trigger: 'blur'},
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
                    this.$refs['batchUpdateTScenicSpotManagementForm'].resetFields();
                } else {
                    this.closeModal(val);
                }
            }
        }
    }
</script>
