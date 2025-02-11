<style lang="less">
  .warningSettings {
    .ivu-input-number {
      width: 150px;
    }

    .ivu-form-item {
      margin-bottom: 5px !important;
    }
  }

</style>
<template>
  <Modal v-model="show" :title="editTitle" :mask-closable="false" width="720px">
    <Form ref="warningSettingsForm" :label-width="100" :model="warningSettingsForm" class="warningSettings">
      <FormItem label="总预警开关：">
        <i-switch true-color="#3CB371" v-model="warningSettingsForm.allState" :true-value="1" :false-value="0"/>
      </FormItem>
      <FormItem label="报警间隔：">
        <Row>
          <Col span="9">
            <Input v-model="warningSettingsForm.intervalTime" style="width: 200px;">
              <span slot="append">分钟</span>
            </Input>
          </Col>
          <Col span="10">
            <span>2次报警的最小间隔5-120分钟</span>
          </Col>
        </Row>
      </FormItem>
      <FormItem label="水位1：">
        <Row>
          <Col span="7">
            <InputNumber v-model="warningSettingsForm.waterLevel1Min" placeholder="报警下限"></InputNumber>
          </Col>
          <Col span="1">
            ~
          </Col>
          <Col span="7">
            <InputNumber v-model="warningSettingsForm.waterLevel1Max" placeholder="报警上限">
            </InputNumber>
          </Col>
          <Col span="1">
            m
          </Col>
          <Col span="6" style="margin-left: 20px;">
            <FormItem label="预警开关：">
              <i-switch true-color="#3CB371" v-model="warningSettingsForm.waterLevel1State" :true-value="1" :false-value="0"/>
            </FormItem>
          </Col>
        </Row>
      </FormItem>
      <FormItem label="水位2：">
        <Row>
          <Col span="7">
            <InputNumber v-model="warningSettingsForm.waterLevel2Min" placeholder="报警下限"></InputNumber>
          </Col>
          <Col span="1">
            ~
          </Col>
          <Col span="7">
            <InputNumber v-model="warningSettingsForm.waterLevel2Max" placeholder="报警上限">
            </InputNumber>
          </Col>
          <Col span="1">
            m
          </Col>
          <Col span="6" style="margin-left: 20px;">
            <FormItem label="预警开关：">
              <i-switch true-color="#3CB371" v-model="warningSettingsForm.waterLevel2State" :true-value="1" :false-value="0"/>
            </FormItem>
          </Col>
        </Row>
      </FormItem>
      <FormItem label="瞬时流量1：">
        <Row>
          <Col span="7">
            <InputNumber v-model="warningSettingsForm.instantaneousFlow1Min" placeholder="报警下限"></InputNumber>
          </Col>
          <Col span="1">
            ~
          </Col>
          <Col span="7">
            <InputNumber v-model="warningSettingsForm.instantaneousFlow1Max" placeholder="报警上限">
            </InputNumber>
          </Col>
          <Col span="1">
            m3/s
          </Col>
          <Col span="6" style="margin-left: 20px;">
            <FormItem label="预警开关：">
              <i-switch true-color="#3CB371" v-model="warningSettingsForm.instantaneousFlow1State" :true-value="1" :false-value="0"/>
            </FormItem>
          </Col>
        </Row>
      </FormItem>
      <FormItem label="瞬时流量2：">
        <Row>
          <Col span="7">
            <InputNumber v-model="warningSettingsForm.instantaneousFlow2Min" placeholder="报警下限"></InputNumber>
          </Col>
          <Col span="1">
            ~
          </Col>
          <Col span="7">
            <InputNumber v-model="warningSettingsForm.instantaneousFlow2Max" placeholder="报警上限">
            </InputNumber>
          </Col>
          <Col span="1">
            m3/s
          </Col>
          <Col span="6" style="margin-left: 20px;">
            <FormItem label="预警开关：">
              <i-switch true-color="#3CB371" v-model="warningSettingsForm.instantaneousFlow2State" :true-value="1" :false-value="0"/>
            </FormItem>
          </Col>
        </Row>
      </FormItem>
      <FormItem label="小时水量1：">
        <Row>
          <Col span="7">
            <InputNumber v-model="warningSettingsForm.hourlyWater1Min" placeholder="报警下限"></InputNumber>
          </Col>
          <Col span="1">
            ~
          </Col>
          <Col span="7">
            <InputNumber v-model="warningSettingsForm.hourlyWater1Max" placeholder="报警上限">
            </InputNumber>
          </Col>
          <Col span="1">
            m3/h
          </Col>
          <Col span="6" style="margin-left: 20px;">
            <FormItem label="预警开关：">
              <i-switch true-color="#3CB371" v-model="warningSettingsForm.hourlyWater1State" :true-value="1" :false-value="0"/>
            </FormItem>
          </Col>
        </Row>
      </FormItem>
      <FormItem label="小时水量2：">
        <Row>
          <Col span="7">
            <InputNumber v-model="warningSettingsForm.hourlyWater2Min" placeholder="报警下限"></InputNumber>
          </Col>
          <Col span="1">
            ~
          </Col>
          <Col span="7">
            <InputNumber v-model="warningSettingsForm.hourlyWater2Max" placeholder="报警上限">
            </InputNumber>
          </Col>
          <Col span="1">
            m3/h
          </Col>
          <Col span="6" style="margin-left: 20px;">
            <FormItem label="预警开关：">
              <i-switch true-color="#3CB371" v-model="warningSettingsForm.hourlyWater2State" :true-value="1" :false-value="0"/>
            </FormItem>
          </Col>
        </Row>
      </FormItem>
      <FormItem label="电源电压：">
        <Row>
          <Col span="7">
            <InputNumber v-model="warningSettingsForm.voltageMin" placeholder="报警下限"></InputNumber>
          </Col>
          <Col span="1">
            ~
          </Col>
          <Col span="7">
            <InputNumber v-model="warningSettingsForm.voltageMax" placeholder="报警上限">
            </InputNumber>
          </Col>
          <Col span="1">
            V
          </Col>
          <Col span="6" style="margin-left: 20px;">
            <FormItem label="预警开关：">
              <i-switch true-color="#3CB371" v-model="warningSettingsForm.voltageState" :true-value="1" :false-value="0"/>
            </FormItem>
          </Col>
        </Row>
      </FormItem>
    </Form>

    <div slot="footer">
      <Button type="text" @click="show=false">取消</Button>
      <Button type="primary" :loading="loading" @click="handelSubmit">提交</Button>
    </div>
  </Modal>
</template>
<script>
    import {getWarningSettingsByEquipmentId, addTWarningSettings, updateTWarningSettings} from "@/api/zhgw/tWarningSettings/tWarningSettings";

    export default {
        name: "warningSettingsIndex",
        components: {},
        props: {
            value: {
                type: Boolean,
                default: false
            },
            TEquipmentManagementId: {
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
                warningSettingsForm: {
                    id: '',
                    allState: 0,
                    intervalTime: 0,
                    waterLevel1Min: null,
                    waterLevel1Max: null,
                    waterLevel1State: 0,
                    waterLevel2Min: null,
                    waterLevel2Max: null,
                    waterLevel2State: 0,

                    instantaneousFlow1Min: null,
                    instantaneousFlow1Max: null,
                    instantaneousFlow1State: 0,

                    instantaneousFlow2Min: null,
                    instantaneousFlow2Max: null,
                    instantaneousFlow2State: 0,

                    hourlyWater1Min: null,
                    hourlyWater1Max: null,
                    hourlyWater1State: 0,

                    hourlyWater2Min: null,
                    hourlyWater2Max: null,
                    hourlyWater2State: 0,

                    voltageMin: null,
                    voltageMax: null,
                    voltageState: 0,

                    equipmentId: ''

                },
                loading: false
            }
        },
        methods: {
            closeModal(val) {
                this.$emit('input', val);
            },
            initForm() {
                this.warningSettingsForm = {
                    id: '',
                    equipmentId: '',
                    allState: 0,
                    intervalTime: 0,
                    waterLevel1Min: null,
                    waterLevel1Max: null,
                    waterLevel1State: 0,
                    waterLevel2Min: null,
                    waterLevel2Max: null,
                    waterLevel2State: 0,
                    instantaneousFlow1Min: null,
                    instantaneousFlow1Max: null,
                    instantaneousFlow1State: 0,
                    instantaneousFlow2Min: null,
                    instantaneousFlow2Max: null,
                    instantaneousFlow2State: 0,
                    hourlyWater1Min: null,
                    hourlyWater1Max: null,
                    hourlyWater1State: 0,
                    hourlyWater2Min: null,
                    hourlyWater2Max: null,
                    hourlyWater2State: 0,
                    voltageMin: null,
                    voltageMax: null,
                    voltageState: 0
                }
            },
            handelSubmit() {
                this.$refs['warningSettingsForm'].validate((valid) => {
                    this.loading = true;
                    if (valid) {
                        if (this.warningSettingsForm.id) {
                            updateTWarningSettings(this.warningSettingsForm).then(res => {
                                if (res && res.success) {
                                    this.closeModal(false);
                                    this.$emit('handleSearch');
                                    this.$Message.success('预警设置成功！');
                                } else {
                                    this.$Message.error(res.msg);
                                }
                            }).finally(res => {
                                this.loading = false;
                            })
                        } else {
                            addTWarningSettings(this.warningSettingsForm).then(res => {
                                if (res && res.success) {
                                    this.closeModal(false);
                                    this.$emit('handleSearch');
                                    this.$Message.success('预警设置成功！');
                                } else {
                                    this.$Message.error(res.msg);
                                }
                            }).finally(res => {
                                this.loading = false;
                            })
                        }
                    } else {
                        this.loading = false;
                        this.$Message.error('表单验证不通过！');
                    }
                });
            }
        },
        watch: {
            value(val) {
                this.show = val;
            },
            show(val) {
                this.editTitle = this.modalTitle;
                this.initForm();
                if (val) {
                    if (this.TEquipmentManagementId) {
                        getWarningSettingsByEquipmentId({equipmentId: this.TEquipmentManagementId}).then(res => {
                            if (res && res.success) {
                                if (res.data) {
                                    this.warningSettingsForm = {
                                        id: res.data.id,
                                        equipmentId: this.TEquipmentManagementId,
                                        allState: res.data.allState,
                                        intervalTime: res.data.intervalTime,
                                        waterLevel1Min: res.data.waterLevel1Min,
                                        waterLevel1Max: res.data.waterLevel1Max,
                                        waterLevel1State: res.data.waterLevel1State,
                                        waterLevel2Min: res.data.waterLevel2Min,
                                        waterLevel2Max: res.data.waterLevel2Max,
                                        waterLevel2State: res.data.waterLevel2State,
                                        instantaneousFlow1Min: res.data.instantaneousFlow1Min,
                                        instantaneousFlow1Max: res.data.instantaneousFlow1Max,
                                        instantaneousFlow1State: res.data.instantaneousFlow1State,
                                        instantaneousFlow2Min: res.data.instantaneousFlow2Min,
                                        instantaneousFlow2Max: res.data.instantaneousFlow2Max,
                                        instantaneousFlow2State: res.data.instantaneousFlow2State,
                                        hourlyWater1Min: res.data.hourlyWater1Min,
                                        hourlyWater1Max: res.data.hourlyWater1Max,
                                        hourlyWater1State: res.data.hourlyWater1State,
                                        hourlyWater2Min: res.data.hourlyWater2Min,
                                        hourlyWater2Max: res.data.hourlyWater2Max,
                                        hourlyWater2State: res.data.hourlyWater2State,
                                        voltageMin: res.data.voltageMin,
                                        voltageMax: res.data.voltageMax,
                                        voltageState: res.data.voltageState,
                                    }
                                } else {
                                    this.warningSettingsForm.equipmentId = this.TEquipmentManagementId;
                                }
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
