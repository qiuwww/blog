<template>
  <Modal v-model="show" :title="editTitle" :mask-closable="false">
    <Form ref="sysSettingForm" :model="sysSettingForm" :rules="sysSettingFormRule">
      <FormItem label="名称" prop="name" :label-width="80">
        <Input type="text" :maxlength=50 v-model="sysSettingForm.name" placeholder="请输入名称"/>
      </FormItem>
      <FormItem label="是否开启" prop="value">
        <RadioGroup v-model="sysSettingForm.value">
          <Radio v-for="(item, i)  in valueRadio" :label="item.value">{{item.label}}</Radio>
        </RadioGroup>
      </FormItem>
    </Form>
    <div slot="footer">
      <Button type="text" @click="show=false">取消</Button>
      <Button type="primary" :loading="loading" @click="handelSubmit">提交</Button>
    </div>
  </Modal>
</template>
<script>
    import {addSysSetting, updateSysSetting, getSysSetting} from '@/api/sysSetting/sysSetting'
    import {getDictDataByType} from '@/api/index';
    import {formartDate} from '@/api/tools/tool'

    export default {
        name: "updateSysSetting",
        props: {
            value: {
                type: Boolean,
                default: false
            },
            SysSettingId: {
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
                loading: false,
                sysSettingForm: {
                    name: '',
                    value: '',
                },
                valueRadio: [{label: '是', value: 1}, {label: '否', value: 0}],
                sysSettingFormRule: this.getSysSettingFormRule()
            }
        },
        methods: {
            handelSubmit() {
                this.$refs['sysSettingForm'].validate((valid) => {
                    if (valid) {
                        this.loading = true;
                        if (this.SysSettingId != null && this.SysSettingId.trim().length > 0) {
                            this.sysSettingForm.id = this.SysSettingId;
                            updateSysSetting(this.sysSettingForm).then(res => {
                                if (res && res.code == 200) {
                                    this.closeModal(false);
                                    this.$emit('handleSearch');
                                    this.$Message.success('保存成功');
                                } else {
                                    this.$Message.error(res.message);
                                }
                            }).finally(() => {
                                this.loading = false;
                            })
                        } else {
                            addSysSetting(this.sysSettingForm).then(res => {
                                if (res && res.code == 200) {
                                    this.closeModal(false);
                                    this.$emit('handleSearch');
                                    this.$Message.success('保存成功');
                                } else {
                                    this.$Message.error(res.message);
                                }
                            }).finally(() => {
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
            initForm() {
                this.sysSettingForm = {
                    name: '',
                    value: '',
                };
            },
            getSysSettingFormRule() {
                return {
                    name: [
                        {required: true, message: '名称不能为空！', trigger: 'blur'},
                        {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
                    ],
                    value: [
                        {required: true,pattern:/^[0-9]+$/, message: '是否开启不能为空！', trigger: 'blur' },
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
                this.loading = false;
                this.editTitle = this.modalTitle;
                if (val) {
                    this.$refs['sysSettingForm'].resetFields();
                    if (this.SysSettingId != null && this.SysSettingId.trim().length > 0) {
                        getSysSetting({id: this.SysSettingId}).then(res => {
                            if (res && res.code == 200) {
                                this.sysSettingForm.name = res.data.name;
                                this.sysSettingForm.value = res.data.value;
                            } else {
                                this.$Message.error(res.message);
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
