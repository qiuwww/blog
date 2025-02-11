<style lang="less">
  .job {
    .ivu-modal {
      width: 400px !important;
      top: 50%;
      transform: translateY(-50%);
    }

    .form-item-input {
      width: 300px;
    }

    .ivu-form-item-error-tip {
      left: 80px;
    }

    .ivu-form .ivu-form-item-label {
      width: 100px;
      text-align: right !important;
    }

    .ivu-select, .vue-treeselect,ivu-input-number ,ivu-input-number-default{
      width: 213px !important;
    }

    .vue-treeselect {
      height: 32px;
      float: left;
    }

    .ivu-input-wrapper {
      width: 213px !important;
    }

    .ivu-form-item-content {
      height: 32px;
    }

    .ivu-dropdown {
      position: absolute;
      bottom: -1px;
      right: 70px;
    }

    .ivu-dropdown .ivu-select-dropdown {
      width: 213px;
      left: -184px !important;
    }
  }
</style>
<template>
  <Modal v-model="show" :title="editTitle" :mask-closable="false" class="job">
    <Form ref="jobForm" :model="jobForm" :rules="jobFormRule">

      <FormItem label="名称" prop="name">
        <Input v-bind:disabled="disabled" type="text" :maxlength=50 v-model="jobForm.name" placeholder="请输入岗位名称"/>
      </FormItem>

      <FormItem label="状态" prop="enabled">
        <RadioGroup v-bind:disabled="disabled" v-model="jobForm.enabled">
          <Radio v-for="(item,index) in enabledRadio" v-bind:disabled="disabled" :key="item.label" :value="item.label" :label="item.label">
            {{item.label}}
          </Radio>
        </RadioGroup>
      </FormItem>

      <FormItem label="排序" prop="sort" style="height: 44px">
        <InputNumber v-bind:disabled="disabled" number :maxlength=50 v-model="jobForm.sort" placeholder="请输入岗位排序" style=" width: 213px"/>
      </FormItem>

      <FormItem label="所属部门" prop="deptId">
        <i-input v-bind:disabled="disabled" v-model="selectModel" placeholder="请选择" readonly>
        </i-input>
        <Dropdown trigger="custom" :visible="departVisible" placement="bottom-end">
          <a href="javascript:void(0)" @click="departVisible=!departVisible">
            <Icon type="ios-arrow-down" v-bind:class="{departVisibleSelectIcon:departVisible}"></Icon>
          </a>
          <DropdownMenu slot="list">
            <Tree v-bind:data="deptIdPriority" @on-select-change="handleCheckChange">
            </Tree>
          </DropdownMenu>
        </Dropdown>

      </FormItem>

    </Form>
    <div slot="footer">
      <Button type="text" @click="show=false">取消</Button>
      <Button type="primary" :loading="loading" @click="handelSubmit">提交</Button>
    </div>
  </Modal>
</template>
<script>
  import {add, edit, getJob} from '@/api/system/job'
  import {getDept} from '@/api/system/dept'
  import {getDictDataByType} from '@/api/index';
  import {formartDate} from '@/api/tools/tool'

  export default {
    name: "updateJob",
    props: {
      value: {
        type: Boolean,
        default: false
      },
      JobId: {
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
        enabledRadio: [],
        deptIdPriority: [],
        departVisible: false,
        jobForm: {
          name: '',
          enabled: '启用',
          sort: 999,
          deptId: '',
          createTime:''
        },
        list: [],
        selectModel: "",
        jobFormRule: this.getJobFormRule()
      }
    },
    methods: {
      getEnabledRadio() {
        getDictDataByType('job_status').then(res => {
          if (res && res.success) {
            this.enabledRadio = res.data;
          }
        });
      },
      getDeptIdPriority() {
        getDept("").then(res => {
          if (res.content) {
            this.deptIdPriority = this.getTreeData(res.content);
          }
        });
      },
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
      handelSubmit() {
        this.loading = true;
        this.$refs['jobForm'].validate((valid) => {
          if (this.jobForm.enabled == "启用") {
            this.jobForm.enabled = true;
          } else {
            this.jobForm.enabled = false;
          }
          if (valid) {
            if (this.JobId != null && this.JobId.trim().length > 0) {
              this.jobForm.id = this.JobId;
              if(this.jobForm.deptId){
                this.jobForm.dept={}
                this.jobForm.dept.id = this.jobForm.deptId;
              }
              edit(this.jobForm).then(res => {
                this.loading = false;

                  this.closeModal(false);
                  this.$emit('handleSearch');
                  this.$Message.success('保存成功');

              })
            } else {

              add(this.jobForm).then(res => {
                this.loading = false;
                if (res) {
                  this.closeModal(false);
                  this.$emit('handleSearch');
                  this.$Message.success('保存成功');
                } else {
                  this.$Message.error('保存失败');
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
        this.jobForm = {
          name: '',
          enabled: '启用',
          sort: 999,
          deptId: '',
          createTime:""
        };
        this.selectModel = "";
        this.departVisible = false;
      },
      getJobFormRule() {
        return {
          name: [
            {required: true, message: '名称不能为空！', trigger: 'blur'},
            {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
          ],
          enabled: [
            {required: true, message: '状态不能为空！', trigger: 'blur', pattern: /.+/},
          ],
          sort: [
            {required: true, message: '排序不能为空！', trigger: 'blur', type: 'number',},
          ],
          deptId: [
            {required: true, pattern: /^[0-9]+$/, message: '所属部门不能为空！', trigger: 'blur'},
          ],
        }
      },
      handleCheckChange(data) {
        this.list = [];

        ;
        this.jobForm.deptId = data[0].value;
        this.jobForm.dept = {};
        this.jobForm.dept.id = data[0].value;
        this.departVisible = false;
        this.selectModel = data[0].title;
      }
    },
    watch: {
      value(val) {
        this.show = val;
      },
      show(val) {
        this.getEnabledRadio(),
          this.getDeptIdPriority(),
          this.initForm();
        this.loading = false;
        this.departVisible = false;
        this.editTitle = this.modalTitle;
        if (this.editTitle == "查看") {
          this.disabled = true;
        } else {
          this.disabled = false;
        }
        if (val) {
          this.$refs['jobForm'].resetFields();
          if (this.JobId != null && this.JobId.trim().length > 0) {
            getJob({id: this.JobId}).then(res => {
              if (res.id) {
                this.jobForm.name = res.name;
                this.jobForm.enabled = res.enabled;
                this.jobForm.sort = res.sort;
                this.jobForm.deptId = res.dept.id;
                this.jobForm.createTime = res.createTime;
                if (res.enabled) {
                  this.jobForm.enabled = "启用";
                } else {
                  this.jobForm.enabled = "停用";
                }
                if (res.dept) {
                  this.selectModel = res.dept.name;
                }

              } else {
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
