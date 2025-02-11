<style lang="less">
.tZhsqAnounceInfo {
  .ivu-modal {
    width: 800px !important;
    top: 50%;
    transform: translateY(-50%);
  }


  .ivu-form-item {
    width: 100%;
    margin-bottom: 25px!important;
  }

  .ivu-input-wrapper {
    width: auto !important;
  }
  .myWangEditor {
    margin-left: 0px;
    width: 605px;
    .w-e-text{
      min-height: 300px;
    }
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
}
</style>
<template>
  <Modal v-model="show" :title="editTitle" :mask-closable="false" class="tZhsqAnounceInfo">
    <Form ref="tZhsqAnounceInfoForm" :model="tZhsqAnounceInfoForm" :rules="tZhsqAnounceInfoFormRule"
           :label-width="120">
      <Row>
        <Col span="12">
          <FormItem label="公告类型" prop="infoType">

            <Select v-model="tZhsqAnounceInfoForm.infoType" placeholder="请选择" style="width: 213px" transfer>
              <Option v-for="(item, i) in infoTypeData" :key="i" :value="item.id.toString()">{{
                  item.typeName
                }}
              </Option>
            </Select>
          </FormItem>
        </Col>

        <Col span="12"><FormItem label="是否隐藏" prop="infoShow">
          <RadioGroup  v-model="tZhsqAnounceInfoForm.infoShow">
            <Radio v-bind:disabled="disabled" :label="'0'">是</Radio>
            <Radio v-bind:disabled="disabled" :label="'1'">否</Radio>
          </RadioGroup>
        </FormItem> </Col>

      </Row>
      <Row>
        <Col span="12"><FormItem label="公告排序" prop="infoSort">
          <Tooltip trigger="hover" placement="right" content="值越小越靠前，支持小数">
            <InputNumber style="width: 213px;" :max="1000" :min="0" v-bind:disabled="disabled" v-model="tZhsqAnounceInfoForm.infoSort" placeholder="请输入排序码"/>
          </Tooltip>
        </FormItem> </Col>

        <Col span="12">
          <FormItem label="公告标题" prop="infoTitle">
            <Input v-bind:disabled="disabled" style="width: 221px!important;" type="text" :maxlength=50 v-model="tZhsqAnounceInfoForm.infoTitle"
                   placeholder="请输入公告标题"/>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="发布日期" prop="createTimeTime">
            <DatePicker v-bind:disabled="disabled" style="width:100%;" type="datetime" placeholder="请输入发布日期"
                        v-model="tZhsqAnounceInfoForm.createTimeTime " @on-change="setCreateTime"
                        format="yyyy-MM-dd HH:mm:ss"></DatePicker>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="发布单位" prop="infoAuthor">
            <Input v-model="tZhsqAnounceInfoForm.infoAuthor" style="width: 221px!important;" type="text"></Input>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="24">
          <FormItem label="发布内容">
            <!--  富文本-->
            <myWangEditor :editorContent="tZhsqAnounceInfoForm.infoContent"
                          ref="myWangEditor"></myWangEditor>
          </FormItem>
        </Col>

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
  addTZhsqAnounceInfo,
  getTZhsqAnounceInfo,
  updateTZhsqAnounceInfo
} from '@/api/zhsq/tZhsqAnounceInfo/tZhsqAnounceInfo'
import {formartDate} from '@/api/tools/tool'
import myWangEditor from "../../zhxc/components/myWangEditor";
import {
  queryAllTZhsqAnnounceTypeList
} from '@/api/zhsq/tZhsqAnnounceType/tZhsqAnnounceType'
export default {
  name: "updateTZhsqAnounceInfo",
  components: {myWangEditor},
  props: {
    value: {
      type: Boolean,
      default: false
    },
    TZhsqAnounceInfoId: {
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
      //编辑表单
      tZhsqAnounceInfoForm: {
        infoType: '',
        infoShow: '',
        infoSort: 0,
        infoTitle: '',
        createTime: '',
        infoAuthor: '',
        infoContent: ''
      },
      infoTypeData:[],//公告类型集
      tZhsqAnounceInfoFormRule: this.getTZhsqAnounceInfoFormRule()
    }
  },
  methods: {
    setCreateTime(e) {
      this.tZhsqAnounceInfoForm.createTime = e;
    },
    /**
     * 查询公告类型
     */
    queryAllTZhsqAnnounceType(){
      let _this = this;
      queryAllTZhsqAnnounceTypeList().then(res => {
        if (res) {
          if (res.code == 200) {
            _this.infoTypeData = res.data;
          } else {
            _this.$Message.error(res.msg);
          }
        } else {
          _this.$Message.error('查询公告类型失败');
        }
      }).catch(err => {
        _this.$Message.error('查询公告类型失败');
      });
    },
    handelSubmit() {
      this.$refs['tZhsqAnounceInfoForm'].validate((valid) => {
        this.loading = true;
        if (valid) {
          let editorContent = this.$refs.myWangEditor.getEditorData();
          this.tZhsqAnounceInfoForm.infoContent = editorContent;
          if (this.TZhsqAnounceInfoId != null && this.TZhsqAnounceInfoId.trim().length > 0) {
            this.tZhsqAnounceInfoForm.id = this.TZhsqAnounceInfoId;
            updateTZhsqAnounceInfo(this.tZhsqAnounceInfoForm).then(res => {
              this.loading = false;
              if (res) {
                if (res.code == 200) {
                  this.closeModal(false);
                  this.$emit('handleSearch');
                  this.$Message.success('保存成功');
                } else {
                  this.$Message.error(res.msg);
                }
              } else {
                this.$Message.error('保存失败');
              }
            }).catch(err => {
              this.loading = false;
            });
          } else {
            addTZhsqAnounceInfo(this.tZhsqAnounceInfoForm).then(res => {
              this.loading = false;
              if (res) {
                if (res.code == 200) {
                  this.closeModal(false);
                  this.$emit('handleSearch');
                  this.$Message.success('保存成功');
                } else {
                  this.$Message.error(res.msg);
                }
              } else {
                this.$Message.error('保存失败');
              }
            }).catch(err => {
              this.loading = false;
            });
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
      this.tZhsqAnounceInfoForm = {
        infoType: '',
        infoShow: '0',
        infoSort: 0,
        infoTitle: '',
        createTimeTime: '',
        createTime: '',
        infoAuthor: '',
        infoContent: ''
      };
    },
    getTZhsqAnounceInfoFormRule() {
      return {
        infoType: [
          {required: true, message: '公告类型不能为空！', trigger: 'blur'},
          {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
        ],
        infoShow: [
          {required: true, message: '是否隐藏不能为空！', trigger: 'blur', pattern: /.+/},
        ],
        infoSort: [
          {required: true,type: "number",message: "公告排序不能为空",trigger: "blur"}
        ],
        infoTitle: [
          {required: true, message: '公告标题不能为空！', trigger: 'blur'},
          {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
        ],
        createTimeTime: [
          {required: true, message: '发布日期不能为空！', trigger: 'blur', pattern: /.+/},
        ],
        infoAuthor: [
          {required: true, message: '发布单位不能为空！', trigger: 'blur'},
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
      this.queryAllTZhsqAnnounceType();

      this.loading = false;
      this.editTitle = this.modalTitle;
      if (this.editTitle == "查看") {
        this.disabled = true;
      } else {
        this.disabled = false;
      }
      if (val) {
        this.$refs['tZhsqAnounceInfoForm'].resetFields();
        if (this.TZhsqAnounceInfoId != null && this.TZhsqAnounceInfoId.trim().length > 0) {
          getTZhsqAnounceInfo({id: this.TZhsqAnounceInfoId}).then(res => {
            if (res) {
              if (res.code === 200) {
                this.tZhsqAnounceInfoForm.infoType = res.data.infoType;
                this.tZhsqAnounceInfoForm.infoShow = res.data.infoShow;
                this.tZhsqAnounceInfoForm.infoSort = parseInt(res.data.infoSort) ;
                this.tZhsqAnounceInfoForm.infoTitle = res.data.infoTitle;
                this.tZhsqAnounceInfoForm.infoContent = res.data.infoContent;
                if (res.data.createTime !== '') {
                  this.tZhsqAnounceInfoForm.createTimeTime = formartDate(new Date(res.data.createTime).getTime(), 'yyyy-MM-dd hh:mm:ss');
                  this.tZhsqAnounceInfoForm.createTime = formartDate(new Date(res.data.createTime).getTime(), 'yyyy-MM-dd hh:mm:ss');
                }
                this.tZhsqAnounceInfoForm.infoAuthor = res.data.infoAuthor;
              } else {
                this.$Message.error(res.msg);
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
