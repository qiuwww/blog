<style lang="less">
.emergencyPlanFormRule {
  .ivu-modal {
    width: 750px !important;
    top: 50%;
    transform: translateY(-50%);
  }

  .form-item-input {
    width: 230px;
  }

  .ivu-form-item-error-tip {
    left: 80px;
  }

  .ivu-form .ivu-form-item-label {
    width: 80px;
  }

  .btns .ivu-btn .ivu-btn-primary {
    position: absolute;
    top: 0;
    right: 10px;
    padding: 0 10px;
    background-color: #2D8CF0;
    color: #fff;
  }

  .mapcontainer {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 9999;
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
    user-select: none;
  }

  .closeBtn:active {
    background-color: #7f8a83;
  }
}

</style>
<template>
  <Modal v-model="show" :title="editTitle" :mask-closable="false" class="emergencyPlanFormRule">
    <Form ref="emergencyPlanForm" :model="emergencyPlanForm" :rules="emergencyPlanFormRule">
      <FormItem>
        <Row>
          <Col span="12">
            <FormItem label="名称" prop="emergName">
              <Input type="text" :maxlength=50 v-model="emergencyPlanForm.emergName" placeholder="请输入预案名称"
                     class="form-item-input" :readonly="inputReaonly"/>
            </FormItem>
          </Col>

          <Col span="12">
            <FormItem label="日期" prop="emergMakeDate">
              <DatePicker
                v-model="emergencyPlanForm.emergMakeDate"
                type="date"
                format="yyyy-MM-dd"
                placeholder="选择预案制定日期"
                class="form-item-input"
                :readonly="inputReaonly"
              ></DatePicker>
            </FormItem>
          </Col>
        </Row>
      </FormItem>
      <Row>
        <Col span="12">
          <FormItem label="方案标绘" prop="emergMap">
            <Input type="text" :maxlength=50 v-model="tempName" placeholder="请输入预案方案坐标点" class="form-item-input"
                   readonly>
              <Icon type="md-map" @click="openMap" title="点击打开标绘页面" class="icon-map" slot="suffix"/>
            </Input>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="类型" prop="emergType">
            <Select v-model="emergencyPlanForm.emergType" placeholder="请选择" clearable class="form-item-input"
                    :disabled="selectDisabled">
              <Option v-for="(item) in emergTypePriority" :key="item.value" :value="item.label">{{ item.label }}
              </Option>
            </Select>
          </FormItem>
        </Col>
      </Row>

      <Row>
        <Col span="12">
          <FormItem label="等级" prop="emergLevel">
            <Select v-model="emergencyPlanForm.emergLevel" placeholder="请选择预案等级" clearable class="form-item-input"
                    :disabled="selectDisabled">
              <Option v-for="(item) in emergLevelPriority" :key="item.value" :value="item.label">{{ item.label }}
              </Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="制定单位" prop="emergMakeDept">
            <Select v-model="emergencyPlanForm.emergMakeDept" placeholder="请选择预案制定单位" clearable class="form-item-input"
                    :disabled="selectDisabled">
              <Option v-for="(item) in emergMakeDeptPriority" :key="item.value" :value="item.label">{{ item.label }}
              </Option>
            </Select>
          </FormItem>
        </Col>
      </Row>

      <Row>
        <Col span="12">
          <FormItem label="执行部门" prop="emergImplDept">
            <Select v-model="emergencyPlanForm.emergImplDept" placeholder="请选择预案执行部门" clearable class="form-item-input"
                    :disabled="selectDisabled">
              <Option v-for="(item) in emergImplDeptPriority" :key="item.value" :value="item.label">{{ item.label }}
              </Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="制定人员" prop="emergMakePerson">
            <Select v-model="emergencyPlanForm.emergMakePerson" placeholder="请选择预案制定人员" clearable
                    class="form-item-input" :disabled="selectDisabled">
              <Option v-for="(item) in emergMakePersonPriority" :key="item.value" :value="item.label">{{ item.label }}
              </Option>
            </Select>
          </FormItem>
        </Col>
      </Row>

      <Row>
        <Col span="24">
          <FormItem label="方案描述" prop="emergDescription">
            <Input type="textarea" :rows="4" :maxlength=500 v-model="emergencyPlanForm.emergDescription"
                   placeholder="请输入方案描述" style="width:82%;" :readonly="inputReaonly"/>
          </FormItem>
        </Col>
      </Row>
    </Form>
    <div slot="footer">
      <Button type="text" @click="show=false">取消</Button>
      <Button type="primary" :loading="loading" @click="handelSubmit" v-show="!inputReaonly">提交</Button>
    </div>

    <div id="centerDiv" class="mapcontainer" :style="{width:width,height:height}" v-show="mapShow">
      <Map :url="configUrl" :widgetUrl="widgetUrl" @onload="onMapload"/>
      <span class="closeBtn" @click="closeMap">×</span>
    </div>
  </Modal>
</template>
<script>
import {addEmergencyPlan, updateEmergencyPlan, getEmergencyPlan} from '@/api/emergencyPlan/emergencyPlan'
import request from '@/utils/request'
import {getDictDataByType} from '@/api/index';
import {formartDate} from '@/api/tools/tool'
import Map from "../../components/mars-map/Main.vue";

export default {
  name: "updateEmergencyPlan",
  components: {
    Map
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    EmergencyPlanId: {
      type: String
    },
    modalTitle: {
      type: String
    }
  },
  data() {
    return {
      inputReaonly: false,
      selectDisabled: false,
      width: "",
      height: "",
      configUrl: "../config/config.json",
      widgetUrl: "../config/widgetEmerge.json",
      show: this.value,
      editTitle: this.modalTitle,
      loading: true,
      mapShow: false,
      tempName: '',
      emergencyPlanForm: {
        emergName: '',
        emergMakeDate: '',
        emergMap: '',
        emergType: '',
        emergLevel: '',
        emergMakeDept: '',
        emergImplDept: '',
        emergMakePerson: '',
        emergDescription: ''
      },
      emergencyPlanFormRule: this.getEmergencyPlanFormRule(),
      emergTypePriority: [],
      emergLevelPriority: [],
      emergMakeDeptPriority: [],
      emergImplDeptPriority: [],
      emergMakePersonPriority: []
    }
  },
  methods: {
    //地图回调
    onMapload(viewer) {

    },
    //打开地图
    openMap() {
      this.mapShow = true;
      //直接打开标绘
      mars3d.widget.activate({
        uri: "../widgets/plot/widget.js"
      });
      window.sessionStorage.setItem('geoJson', this.emergencyPlanForm.emergMap);
    },
    //关闭地图
    closeMap() {
      var objJson = window.sessionStorage.getItem("geoJson");
      if (objJson) {
        var geoJson = JSON.parse(objJson);
        if (geoJson) {
          this.tempName = this.emergencyPlanForm.emergName + "标绘" || "应急预案标绘";
          this.emergencyPlanForm.emergMap = JSON.stringify(geoJson);
          //清空session
          window.sessionStorage.removeItem("geoJson");
        } else {
          this.$Message.success('您还未进行标绘');
        }
      }
      //关闭标绘页面
      mars3d.widget.disable("../widgets/plot/widget.js");
      this.mapShow = false;
    },
    handelSubmit() {
      var _this = this;
      this.$refs['emergencyPlanForm'].validate((valid) => {
        if (valid) {
          if (_this.EmergencyPlanId != null && _this.EmergencyPlanId.trim().length > 0) {
            _this.emergencyPlanForm.id = _this.EmergencyPlanId;

            return request({
              url: '/api/emergencyPlan/updateEmergencyPlan',
              method: 'post',
              data: _this.emergencyPlanForm
            }).then(function (res) {
              if (res && res.code == 200) {
                _this.closeModal(false);
                _this.$emit('handleSearch');
                _this.$Message.success('修改成功');
              } else {
                _this.$Message.error(res.message);
              }
            });
          } else {
            return request({
              url: '/api/emergencyPlan/addEmergencyPlan',
              method: 'post',
              data: _this.emergencyPlanForm
            }).then(function (res) {
              if (res && res.code == 200) {
                _this.closeModal(false);
                _this.$emit('handleSearch');
                _this.$Message.success('保存成功');
              } else {
                this.$Message.error(res.message);
              }
            });
          }
        } else {
          _this.loading = true;
          _this.$Message.error('表单验证不通过！');
          return false;
        }
        setTimeout(() => {
          _this.loading = false;
          _this.$nextTick(() => {
            _this.loading = true;
          });
        }, 1000);
      });
    },
    closeModal(val) {
      this.$emit('input', val);
    },
    initForm() {
      this.emergencyPlanForm = {
        emergName: '',
        emergMakeDate: '',
        emergMap: '',
        emergType: '',
        emergLevel: '',
        emergMakeDept: '',
        emergImplDept: '',
        emergMakePerson: '',
        emergDescription: ''
      };
    },
    getEmergencyPlanFormRule() {
      return {
        emergName: [
          {required: true, message: '预案名称不能为空！', trigger: 'blur'},
          {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
        ],
        emergMakeDate: [
          {required: true, type: 'date', message: '预案制定日期不能为空！', trigger: 'blur'}
        ],
        emergMap: [
          {required: true, message: '预案方案坐标点不能为空！', trigger: 'blur'}
        ],
        emergType: [
          {required: true, message: '预案类型不能为空！', trigger: 'blur', pattern: /.+/},
        ],
        emergLevel: [
          {required: true, message: '预案等级不能为空！', trigger: 'blur', pattern: /.+/},
        ],
        emergMakeDept: [
          {required: true, message: '预案制定单位不能为空！', trigger: 'blur', pattern: /.+/},
        ],
        emergImplDept: [
          {required: true, message: '预案执行部门不能为空！', trigger: 'blur', pattern: /.+/},
        ],
        emergMakePerson: [
          {required: true, message: '预案制定人员不能为空！', trigger: 'blur', pattern: /.+/},
        ],
        emergDescription: [
          {required: true, message: '方案描述不能为空', trigger: 'blur'},
          {type: 'string', max: 200, message: '数据的最大长度为200！', trigger: 'blur'}
        ]
      }
    },
    getEmergType() {
      //数据字典加载数据
      getDictDataByType("plan_type", {}).then(res => {
        if (res && res.success) {
          this.emergTypePriority = res.data;
        }
      });
      getDictDataByType("plan_type", {}).then(res => {
        if (res && res.success) {
          this.emergLevelPriority = res.data;
        }
      });
      getDictDataByType("make_dept", {}).then(res => {
        if (res && res.success) {
          this.emergMakeDeptPriority = res.data;
        }
      });
      getDictDataByType("do_dept", {}).then(res => {
        if (res && res.success) {
          this.emergImplDeptPriority = res.data;
        }
      });
      getDictDataByType("do_person", {}).then(res => {
        if (res && res.success) {
          this.emergMakePersonPriority = res.data;
        }
      });
    }
  },
  created() {
    this.height = Math.floor(document.body.scrollHeight * 0.95) + "px";
    this.width = Math.floor(document.body.scrollWidth * 0.95) + "px";
  },
  mounted() {
    this.getEmergType();
    //清空session
    window.sessionStorage.removeItem('geoJson');
  },
  watch: {
    value(val) {
      this.show = val;
    },
    'emergencyPlanForm.emergName': {
      handler(nVal, oVal) {
        this.tempName = nVal + "标绘";
      }
    },
    show(val) {
      this.initForm();
      this.loading = false;
      this.editTitle = this.modalTitle;
      this.tempName = "";
      if (val) {
        this.$refs['emergencyPlanForm'].resetFields();
        if (this.EmergencyPlanId != null && this.EmergencyPlanId.trim().length > 0) {
          getEmergencyPlan({id: this.EmergencyPlanId}).then(res => {
            if (res && res.code == 200) {
              this.emergencyPlanForm.emergName = res.data.emergName;
              this.emergencyPlanForm.emergMakeDate = formartDate(res.data.emergMakeDate, 'yyyy-MM-dd');
              this.emergencyPlanForm.emergMap = res.data.emergMap;
              //把地图设置为全局，在plot中的widget.js可以获取
              if (res.data.emergMap) {
                this.tempName = res.data.emergName + "标绘";
              }
              this.emergencyPlanForm.emergType = res.data.emergType;
              this.emergencyPlanForm.emergLevel = res.data.emergLevel;
              this.emergencyPlanForm.emergMakeDept = res.data.emergMakeDept;
              this.emergencyPlanForm.emergImplDept = res.data.emergImplDept;
              this.emergencyPlanForm.emergMakePerson = res.data.emergMakePerson;
              this.emergencyPlanForm.emergDescription = res.data.emergDescription;
            } else {
              this.$Message.error(res.message);
            }
          });
        }
      } else {
        this.closeModal(val);
      }
      if (this.editTitle == "查看") {
        this.inputReaonly = true;
        this.selectDisabled = true;
      } else {
        this.inputReaonly = false;
        this.selectDisabled = false;
      }
    }
  }
}
</script>
