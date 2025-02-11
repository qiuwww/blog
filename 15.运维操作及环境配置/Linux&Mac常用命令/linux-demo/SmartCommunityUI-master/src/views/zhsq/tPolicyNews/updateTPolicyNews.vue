<style lang="less">
.tPolicyNews {
  .ivu-modal {
    width: 800px !important;
    top: 50%;
    transform: translateY(-50%);
  }

  .imgWrap:hover .shadow {
    display: block;
    z-index: 3;
    width: 100%;
  }

  .ivu-date-picker .ivu-select-dropdown {
    width: auto;
    padding: 0;
    overflow: visible;
    max-height: none;
    z-index: 20000;
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
  <Modal v-model="show" :title="editTitle" :mask-closable="false" class="tPolicyNews">
    <Form ref="tPolicyNewsForm" :model="tPolicyNewsForm" :rules="tPolicyNewsFormRule"
           :label-width="90">
      <Row>
        <Col span="12">
          <FormItem label="新闻类型" prop="type">

            <Select v-bind:disabled="disabled" v-model="tPolicyNewsForm.type" placeholder="请选择" style="width: 211px!important;" transfer>
              <Option v-for="(item, i) in typeData" :key="i" :value="item.number">{{
                  item.name
                }}
              </Option>
            </Select>
          </FormItem>
        </Col>

        <Col span="12"><FormItem label="是否隐藏" prop="isShow">
          <RadioGroup  v-model="tPolicyNewsForm.isShow">
            <Radio v-bind:disabled="disabled" :label="'0'">是</Radio>
            <Radio v-bind:disabled="disabled" :label="'1'">否</Radio>
          </RadioGroup>
        </FormItem> </Col>

      </Row>
      <Row>
        <Col span="12">
            <FormItem label="新闻标题" prop="name">
              <Input v-bind:disabled="disabled" style="width: 211px!important;" type="text" :maxlength=50 v-model="tPolicyNewsForm.name"
                     placeholder="请输入新闻标题"/>
            </FormItem>
        </Col>
        <Col span="12">
            <FormItem label="发布单位" prop="issuedBy">
              <Input v-model="tPolicyNewsForm.issuedBy" v-bind:disabled="disabled" style="width: 211px!important;" type="text"  placeholder="请输入发布单位"></Input>
            </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
            <FormItem label="发布日期" prop="createTimeTime">
              <DatePicker v-bind:disabled="disabled" style="width: 100%;" type="datetime" placeholder="请输入发布日期"
                          v-model="tPolicyNewsForm.createTimeTime " @on-change="setCreateTime"
                          format="yyyy-MM-dd HH:mm:ss"></DatePicker>
            </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="24">
          <FormItem label="发布内容">
            <!--  富文本-->
            <myWangEditor :editorContent="tPolicyNewsForm.content"
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
  addTPolicyNews,
  getTPolicyNews,
  updateTPolicyNews
} from '@/api/zhsq/tPolicyNews/tPolicyNews'
import {formartDate} from '@/api/tools/tool'
import myWangEditor from "../../zhsq/components/myWangEditor";
import {
  getDictionary,
} from '@/api/index';
import uploadHeaderImg from '@/components/uploadHeaderImg'

export default {
  name: "updateTPolicyNews",
  components: {
    myWangEditor,
    uploadHeaderImg
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    TPolicyNewsId: {
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
      tPolicyNewsForm: {
        type: '',
        isShow: '',
        name: '',
        imgUrl: '',
        createTime: '',
        issuedBy: '',
        content: ''
      },
      typeData:[],//公告类型集
      tPolicyNewsFormRule: this.getTPolicyNewsFormRule()
    }
  },
  methods: {
    setCreateTime(e) {
      this.tPolicyNewsForm.createTime = e;
    },
    getTypeData(){
      let _this = this;
      //政策新闻类型
      getDictionary({fieldName: 'policy_news_type'}).then(resp => {
        if (resp && resp.success) {
          _this.typeData = resp.data;
          /*let temp = resp.data.filter(item => item.number == res.data.type);
          _this.data.typeName = temp[0].name;*/
        }
      });
    },
    handelSubmit() {
      this.$refs['tPolicyNewsForm'].validate((valid) => {
        this.loading = true;
        if (valid) {
          let editorContent = this.$refs.myWangEditor.getEditorData();
          this.tPolicyNewsForm.content = editorContent;
          if (this.TPolicyNewsId != null && this.TPolicyNewsId.trim().length > 0) {
            this.tPolicyNewsForm.id = this.TPolicyNewsId;
            updateTPolicyNews(this.tPolicyNewsForm).then(res => {
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
            addTPolicyNews(this.tPolicyNewsForm).then(res => {
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
    onFileUploadSuccess(res, file) {
      this.tPolicyNewsForm.imgUrl = res.data;
    },
    onFileUploadError(file) {
      this.$Message.error('图片上传失败！');
    },
    onRemovePath() {
      this.tPolicyNewsForm.imgUrl = '';
    },
    closeModal(val) {
      this.$emit('input', val);
    },

    initForm() {
      this.tPolicyNewsForm = {
        type: '',
        isShow: '1',
        name: '',
        imgUrl: '',
        createTimeTime: '',
        createTime: '',
        issuedBy: '',
        content: ''
      };
    },
    getTPolicyNewsFormRule() {
      return {
        type: [
          {required: true, message: '公告类型不能为空！', trigger: 'blur'},
          {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
        ],
        isShow: [
          {required: true, message: '是否隐藏不能为空！', trigger: 'blur', pattern: /.+/},
        ],
        name: [
          {required: true, message: '公告标题不能为空！', trigger: 'blur'},
          {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
        ],
        createTimeTime: [
          {required: true, message: '发布日期不能为空！', trigger: 'blur', pattern: /.+/},
        ],
        issuedBy: [
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
      this.getTypeData();

      this.loading = false;
      this.editTitle = this.modalTitle;
      if (this.editTitle == "查看") {
        this.disabled = true;
      } else {
        this.disabled = false;
      }
      if (val) {
        this.$refs['tPolicyNewsForm'].resetFields();
        if (this.TPolicyNewsId != null && this.TPolicyNewsId.trim().length > 0) {
          getTPolicyNews({id: this.TPolicyNewsId}).then(res => {
            if (res) {
              if (res.code === 200) {
                this.tPolicyNewsForm.type = res.data.type.toString();
                this.tPolicyNewsForm.isShow = res.data.isShow;
                this.tPolicyNewsForm.name = res.data.name;
                this.tPolicyNewsForm.content = res.data.content;
                if (res.data.createTime !== '') {
                  this.tPolicyNewsForm.createTimeTime = formartDate(new Date(res.data.createTime).getTime(), 'yyyy-MM-dd hh:mm:ss');
                  this.tPolicyNewsForm.createTime = formartDate(new Date(res.data.createTime).getTime(), 'yyyy-MM-dd hh:mm:ss');
                }
                this.tPolicyNewsForm.issuedBy = res.data.issuedBy;
                if(res.data.imgUrl && res.data.imgUrl != '' && res.data.imgUrl != null){
                  this.tPolicyNewsForm.imgUrl = res.data.imgUrl;
                }else {//占位图
                  this.tPolicyNewsForm.imgUrl = '/img/tx_wzp2.png';
                }
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
