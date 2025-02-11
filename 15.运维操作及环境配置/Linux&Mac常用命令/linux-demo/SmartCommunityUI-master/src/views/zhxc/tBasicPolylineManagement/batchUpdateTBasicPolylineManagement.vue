<style lang="less">
  .batchUpdateTBasicPolylineManagement {
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
      width: 227.73px;
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
</style>
<template>
  <Modal v-model="show" :title="editTitle" :mask-closable="false" width="1100px"
         class="batchUpdateTBasicPolylineManagement">
    <Form ref="batchUpdateTBasicPolylineManagement" :model="batchUpdateTBasicPolylineManagement" :label-width="110"
          style="margin-right: 50px;" :rules="batchUpdateTBasicPolylineManagementRule">
      <Row>
        <Col span="8">
          <FormItem label="菜单名称" prop="menuName">
            <Input type="text" v-model="batchUpdateTBasicPolylineManagement.menuName" disabled readonly/>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="线状名称" prop="name">
            <Input type="text" :maxlength=50 v-model="batchUpdateTBasicPolylineManagement.name" placeholder="请输入线状名称"/>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="所属区域" prop="areaType" class="addDepartUser-depart">
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

        <Col span="8">
          <FormItem label="是否显示线" prop="isShow">
            <RadioGroup v-model="batchUpdateTBasicPolylineManagement.isShow">
              <Radio :label="0">否</Radio>
              <Radio :label="1">是</Radio>
            </RadioGroup>
          </FormItem>
        </Col>
        <div v-if="batchUpdateTBasicPolylineManagement.isShow == '1'">
          <Col span="8">
            <FormItem label="线宽度" prop="width">
              <InputNumber :min="0" v-model="batchUpdateTBasicPolylineManagement.width" style="width:100%;"
                           placeholder="建议宽度为4"></InputNumber>
            </FormItem>
          </Col>

          <Col span="8">
            <FormItem label="线颜色" prop="color">
              <ColorPicker v-model="batchUpdateTBasicPolylineManagement.color" :recommend="true" format="hex"/>
            </FormItem>
          </Col>

          <Col span="8">
            <FormItem label="是否为虚线" prop="isDash">
              <RadioGroup v-model="batchUpdateTBasicPolylineManagement.isDash">
                <Radio :label="0">否</Radio>
                <Radio :label="1">是</Radio>
              </RadioGroup>
            </FormItem>
          </Col>
          <Col span="8" v-if="batchUpdateTBasicPolylineManagement.isDash ">
            <FormItem label="虚线间隙长度" prop="length">
              <InputNumber :min="0" v-model="batchUpdateTBasicPolylineManagement.length" style="width:100%;"
                           placeholder="建议间隙长度为10"></InputNumber>
            </FormItem>
          </Col>

          <Col span="8">
            <FormItem label="是否显示标签" prop="isLabel">
              <RadioGroup v-model="batchUpdateTBasicPolylineManagement.isLabel">
                <Radio :label="0">否</Radio>
                <Radio :label="1">是</Radio>
              </RadioGroup>
            </FormItem>
          </Col>
          <Col span="8" v-if="batchUpdateTBasicPolylineManagement.isLabel ">
            <FormItem label="最小视距" prop="min">
              <InputNumber :min="0" v-model="batchUpdateTBasicPolylineManagement.min" style="width:100%;"
                           placeholder="请输入最小视距"></InputNumber>
            </FormItem>
          </Col>
          <Col span="8" v-if="batchUpdateTBasicPolylineManagement.isLabel ">
            <FormItem label="最大视距" prop="max">
              <InputNumber :min="0" v-model="batchUpdateTBasicPolylineManagement.max" style="width:100%;"
                           placeholder="请输入最大视距"></InputNumber>
            </FormItem>
          </Col>
          <div v-if="batchUpdateTBasicPolylineManagement.isDash == '0'">
            <Col span="8">
              <FormItem label="有无光晕" prop="isGlow">
                <RadioGroup v-model="batchUpdateTBasicPolylineManagement.isGlow">
                  <Radio :label="0">无</Radio>
                  <Radio :label="1">有</Radio>
                </RadioGroup>
              </FormItem>
            </Col>
            <Col span="8" v-if="batchUpdateTBasicPolylineManagement.isGlow">
              <FormItem label="光晕大小" prop="glow">
                <InputNumber :min="0.1" :max="1" :step="0.1" v-model="batchUpdateTBasicPolylineManagement.glow"
                             @on-blur="changeGlow" style="width:100%;" placeholder="建议光晕大小为0.3"></InputNumber>
              </FormItem>
            </Col>
          </div>
          <Col span="8">
            <FormItem label="有无动态效果" prop="isTrend">
              <RadioGroup v-model="batchUpdateTBasicPolylineManagement.isTrend">
                <Radio :label="0">无</Radio>
                <Radio :label="1">有</Radio>
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
  } from '@/api/zhxc/tBasicPolylineManagement/tBasicPolylineManagement'
  import myWangEditor from "../components/myWangEditor";
  import mapLabel from "@/views/gismap/components/mapLabel";
  import {getDictDataByType} from '@/api/index';
  import {getDepts} from "@/api/system/dept"

  export default {
    name: "batchUpdateTBasicPolylineManagement",
    components: {
      mapLabel,
      myWangEditor
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
        batchUpdateTBasicPolylineManagement: {
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
        batchUpdateTBasicPolylineManagementRule: this.getTBasicPolylineManagementFormRule(),
        pointArr: [],
        showMap: false,
        selectType: 'LineString',
        rgbaColor: '',
        areaTypeArr: [],
        departVisible:false,
        quyuname:"",
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
              this.batchUpdateTBasicPolylineManagement.areaType = value[0].value;
              this.quyuname = value[0].title;
              this.departVisible = false;
          }
      },
      //光晕大小 失去焦点
      changeGlow() {
        if (this.batchUpdateTBasicPolylineManagement.glow || this.batchUpdateTBasicPolylineManagement.glow != 0) {
          this.batchUpdateTBasicPolylineManagement.glow = this.getFloat(this.batchUpdateTBasicPolylineManagement.glow, 1);
        } else {
          this.batchUpdateTBasicPolylineManagement.glow = null;
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
      //获取坐标点
      getPosition(obj, type) {
        if (obj.flatCoordinates) {
          this.batchUpdateTBasicPolylineManagement.position = JSON.stringify(obj.flatCoordinates);
        } else {
          this.batchUpdateTBasicPolylineManagement.position = '';
        }
      },

      handelSubmit() {
        this.$refs['batchUpdateTBasicPolylineManagement'].validate((valid) => {
          this.loading = true;
          if (valid) {
            if (this.batchUpdateTBasicPolylineManagement.max && this.batchUpdateTBasicPolylineManagement.min) {
              if (this.batchUpdateTBasicPolylineManagement.max < this.batchUpdateTBasicPolylineManagement.min) {
                this.loading = false;
                this.$Message.error('最大视距应大于最小视距！');
                return;
              }
            }
            let ids = [];
            this.$parent.selectList.forEach(function (e) {
              ids.push(e.id);
            });
            this.batchUpdateTBasicPolylineManagement.ids = ids
            if(this.batchUpdateTBasicPolylineManagement.color==''){
              this.batchUpdateTBasicPolylineManagement.color = null;
            }

            this.batchUpdateTBasicPolylineManagement.id = null;
            this.batchUpdateTBasicPolylineManagement.description = null;
            updateByIds(this.batchUpdateTBasicPolylineManagement).then(res => {
              this.loading = false;
              if (res && res.code == 200) {
                this.$Message.success('修改成功');
                this.closeModal(false);
                this.$emit('handleSearch');
              } else {
                this.$Message.error(res.msg);
              }

            }).catch(err => {
              this.loading = false;
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
        this.batchUpdateTBasicPolylineManagement = {
          name: null,
          position: null,
          description: '',
          isDash: null,
          width: null,
          color: '',
          isDisplayState: null,
          menuId: this.menuId,
          menuName: this.menuName,
          areaType: null,
          isShow: null,
          length: null,
          isGlow: null,
          glow: null,
          isLabel: null,
          max: 8000,
          min: 0,
          isTrend: null,
        };
        this.quyuname='';
        this.departVisible=false;
        this.getlist();
      },
      getTBasicPolylineManagementFormRule() {
        return {
          name: [
            {required: false, message: '名称不能为空！', trigger: 'blur'},
            {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
          ],
          position: [
            {required: false, message: '坐标不能为空！', trigger: 'blur'}
          ],
          areaType: [
            {required: false, message: '所属区域不能为空！', trigger: 'blur', pattern: /.+/},
          ],
          glow: [
            {required: false, message: '光晕大小不能为空！', trigger: 'blur', pattern: /.+/},
          ]
        }
      },
    },
    watch: {
      value(val) {
        this.show = val;
      },
      show(val) {
        this.initForm();
        this.loading = false;
        this.editTitle = this.modalTitle;
        if (val) {
          this.$refs['batchUpdateTBasicPolylineManagement'].resetFields();
        } else {
          this.closeModal(val);
        }
      }
    }
  }
</script>
