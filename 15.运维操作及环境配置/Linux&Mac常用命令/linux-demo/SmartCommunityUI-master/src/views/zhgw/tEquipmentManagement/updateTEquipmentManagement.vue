<style lang="less" scoped>
  .tEquipmentManagement {
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
      width: 100%;
    }

    .ivu-input-number {
      width: 100% !important;
    }

    .mapcontainer {
      position: fixed;
      z-index: 999;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
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
  }
</style>c
<template>
  <Modal v-model="show" :title="editTitle" :mask-closable="false" :width="600">
    <Form ref="tEquipmentManagementForm" :label-width="90" :model="tEquipmentManagementForm" :rules="tEquipmentManagementFormRule"
          class="tEquipmentManagement">
      <Row>
        <Col span="12">
          <FormItem label="设备编号" prop="number">
            <Input v-bind:disabled="disabled" type="text" :maxlength=20 v-model="tEquipmentManagementForm.number" placeholder="请输入设备编号"/>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="设备名称" prop="name">
            <Input v-bind:disabled="disabled" type="text" :maxlength=50 v-model="tEquipmentManagementForm.name" placeholder="请输入设备名称"/>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="类型" prop="type">
            <Select v-bind:disabled="disabled" v-model="tEquipmentManagementForm.type" placeholder="请选择类型" clearable>
              <Option v-for="(item, i)  in typePriority" :key="item.id" :value="item.id.toString()">{{item.label}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="分组" prop="equipmentPacketId">
            <Select v-model="tEquipmentManagementForm.equipmentPacketId" placeholder="请选择类型" clearable>
              <Option v-for="(item, i)  in equipmentPacketPriority" :key="item.id" :value="item.id.toString()">{{item.packetName}}</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="经纬度" prop="equipmentPosition">
            <Input :maxlength=100 v-model="tEquipmentManagementForm.equipmentPosition" placeholder="请标注经纬度" icon="md-map" :readonly="true"
                   @on-click="checkMap"/>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="24">
          <FormItem label="设备地址" prop="address">
            <Input v-bind:disabled="disabled" :maxlength=100 v-model="tEquipmentManagementForm.address" placeholder="请输入设备地址"/>
          </FormItem>
        </Col>
      </Row>
    </Form>
    <div slot="footer">
      <Button type="text" @click="show=false">取消</Button>
      <Button type="primary" :loading="loading" @click="handelSubmit">提交</Button>
    </div>

    <!-- 地图弹窗 -->
    <plot v-model="showMap" modalTitle="选择坐标点" @resultPoint="getPosition" divId="updateTEquipmentManagement"
          :objData="pointArr" iconPath="/img/archives/shanghu_off.png" :selectType="selectTypee"></plot>
  </Modal>
</template>
<script>
    import {addTEquipmentManagement, updateTEquipmentManagement, getTEquipmentManagement} from '@/api/zhgw/tEquipmentManagement/tEquipmentManagement'
    import {getDictDataByType} from '@/api/index';
    import plot from "@/views/gismap/components/plot";
    import {getAllTEquipmentPacket} from '@/api/zhgw/tEquipmentPacket/tEquipmentPacket'

    export default {
        name: "updateTEquipmentManagement",
        components: {
            plot
        },
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
                loading: true,
                disabled: false,
                typePriority: [],
                equipmentPacketPriority: [],
                tEquipmentManagementForm: {
                    number: '',
                    name: '',
                    address: '',
                    equipmentPosition: '',
                    equipmentPacketId: '',
                    type: '',
                },
                tEquipmentManagementFormRule: this.getTEquipmentManagementFormRule(),
                showMap: false,
                pointArr: [],
                selectTypee: 'Point',

            }
        },
        methods: {
            //获取坐标点
            getPosition(obj, type) {
                this.tEquipmentManagementForm.equipmentPosition = JSON.stringify(obj.flatCoordinates);
            },
            //点击地图图标
            checkMap() {
                if (this.tEquipmentManagementForm.equipmentPosition) {
                    this.pointArr = JSON.parse(this.tEquipmentManagementForm.equipmentPosition);
                }
                this.showMap = true;
            },
            getTypePriority() {
                getDictDataByType('equipment_type').then(res => {
                    if (res && res.success) {
                        this.typePriority = res.data;
                    }
                });

                getAllTEquipmentPacket({}).then(res => {
                    if (res && res.success) {
                        this.equipmentPacketPriority = res.data;
                    }
                });
            },
            handelSubmit() {
                this.$refs['tEquipmentManagementForm'].validate((valid) => {
                    this.loading = true;
                    if (valid) {
                        if (this.TEquipmentManagementId != null && this.TEquipmentManagementId.trim().length > 0) {
                            this.tEquipmentManagementForm.id = this.TEquipmentManagementId;
                            updateTEquipmentManagement(this.tEquipmentManagementForm).then(res => {
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
                            addTEquipmentManagement(this.tEquipmentManagementForm).then(res => {
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
                this.tEquipmentManagementForm = {
                    number: '',
                    name: '',
                    address: '',
                    equipmentPosition: '',
                    equipmentPacketId: '',
                    type: '',
                };
            },
            getTEquipmentManagementFormRule() {
                return {
                    number: [
                        {required: true, message: '设备编号不能为空！', trigger: 'blur'},
                        {type: 'string', max: 20, message: '数据的最大长度为20！', trigger: 'blur'}
                    ],
                    name: [
                        {required: true, message: '设备名称不能为空！', trigger: 'blur'},
                        {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
                    ],
                    address: [
                        {required: true, message: '地址不能为空！', trigger: 'blur'},
                        {type: 'string', max: 100, message: '数据的最大长度为100！', trigger: 'blur'}
                    ],
                    equipmentPosition: [
                        {required: true, message: '经纬度不能为空！', trigger: 'blur'},
                        {type: 'string', max: 100, message: '数据的最大长度为100！', trigger: 'blur'}
                    ],
                    type: [
                        {required: true, message: '类型不能为空！', trigger: 'blur', pattern: /.+/},
                    ],
                }
            }
        },
        watch: {
            value(val) {
                this.show = val;
            },
            show(val) {
                this.getTypePriority(),
                    this.initForm();
                this.loading = false;
                this.editTitle = this.modalTitle;
                if (val) {
                    this.$refs['tEquipmentManagementForm'].resetFields();
                    if (this.TEquipmentManagementId != null && this.TEquipmentManagementId.trim().length > 0) {
                        getTEquipmentManagement({id: this.TEquipmentManagementId}).then(res => {
                            if (res && res.code == 200) {
                                this.tEquipmentManagementForm.number = res.data.number;
                                this.tEquipmentManagementForm.name = res.data.name;
                                this.tEquipmentManagementForm.address = res.data.address;
                                this.tEquipmentManagementForm.equipmentPosition = res.data.equipmentPosition;
                                this.tEquipmentManagementForm.equipmentPacketId = res.data.equipmentPacketId;
                                this.tEquipmentManagementForm.type = res.data.type;
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
