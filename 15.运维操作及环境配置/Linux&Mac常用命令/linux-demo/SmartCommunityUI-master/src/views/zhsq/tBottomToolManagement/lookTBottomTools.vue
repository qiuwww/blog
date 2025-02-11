<style lang="less" scoped>
.tDataService{
  .form-item-input {
    width: 200px;
  }
  .ivu-form-item-error-tip {
    left: 80px;
  }
  .ivu-form .ivu-form-item-label {
    width: 120px;
  }
  .ivu-input-wrapper {
    width: 190px;
  }
  .ivu-select{
    width: 190px !important;
  }
}
</style>
<template>
  <Modal v-model="show" :title="editTitle"  :mask-closable="false" width="620px">
    <Form ref="tDataServiceForm" :model="tDataServiceForm" :label-width="90" class="tDataService"><!-- :rules="tDataServiceFormRule" -->
      <Row>
        <Col span="12">
          <FormItem label="服务名称" prop="name">
            {{tDataServiceForm.name}}
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="级别" prop="level">
            {{tDataServiceForm.level}}
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="所属街道" prop="format">
            <p style="word-wrap:break-word;">{{tDataServiceForm.streetName}}</p>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="所属社区" prop="type">
            {{tDataServiceForm.communityName}}
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="所属网格" prop="checked">
            {{tDataServiceForm.griddingName}}
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="上级服务" prop="checked">
            {{selectModel}}
          </FormItem>
        </Col>
      </Row>
<!--      <Row>-->
<!--        <Col span="24">-->
<!--          <FormItem label="服务地址" prop="url">-->
<!--            <p style="word-wrap:break-word;">{{tDataServiceForm.url}}</p>-->
<!--          </FormItem>-->
<!--        </Col>-->
<!--      </Row>-->
<!--      <Row>-->
<!--        <Col span="24">-->
<!--          <FormItem label="服务参数" prop="params">-->
<!--            <p style="word-wrap:break-word;">{{tDataServiceForm.params}}</p>-->
<!--          </FormItem>-->
<!--        </Col>-->
<!--      </Row>-->
      <Row>
        <Col span="24">
          <FormItem label="备注" prop="remarks">
            {{tDataServiceForm.remarks}}
          </FormItem>
        </Col>
      </Row>
    </Form>
    <div slot="footer">
      <Button type="text" @click="show=false">取消</Button>
    </div>
  </Modal>
</template>
<script>
import {addTDataService,updateTDataService,getTZhsqBottomTool} from '@/api/zhsq/tZhsqBottomTool/tZhsqBottomTool'
import { getDictDataByType } from '@/api/index';
import { formartDate } from '@/api/tools/tool'
export default {
  name: "lookTDataService",
  props: {
    value: {
      type: Boolean,
      default: false
    },
    TDataServiceId: {
      type: String
    },
    modalTitle: {
      type: String
    }
  },
  data() {
    return {
      show: this.value,
      editTitle: this.modalTitle,//对话框标题
      loading: true,//加载
      disabled:false,//表单编辑状态
      selectModel:'',//上级服务名称
      typePriority :[],//服务类型名称
      tDataServiceForm: {
        name:'',
        params:'',
        checked:'',
        type:'',
        remarks:'',
        level:'',
        format:'',
        url:'',
      },
      formatProperty:[],
      // tDataServiceFormRule: this.getTDataServiceFormRule(),
    }
  },
  methods: {

    //获取服务类型
    getTypePriority(){
      getDictDataByType('type').then(res => {//服务格式
        if (res && res.success) {
          this.typePriority = res.data;
        }else {
          this.$Message.error(res.msg);
        }
      }).catch(err => {
        this.$Message.error('获取服务格式字典数据失败');
      });
      getDictDataByType('service_format').then(res => {//服务类型
        if (res && res.success) {
          this.formatProperty = res.data;
        }else {
          this.$Message.error(res.msg);
        }
      }).catch(err => {
        this.$Message.error('获取服务类型字典数据失败');
      });
    },
    handelSubmit() {
      this.$refs['tDataServiceForm'].validate((valid) => {
        if (valid) {
          if(this.TDataServiceId!=null&&this.TDataServiceId.trim().length>0){
            this.tDataServiceForm.id=this.TDataServiceId;
            updateTDataService(this.tDataServiceForm).then(res => {
              if (res && res.code == 200) {
                this.closeModal(false);
                this.$emit('handleSearch');
                this.$Message.success('保存成功');
              }else {
                this.$Message.error(res.msg);
              }
            }).catch(err => {
              this.$Message.error('修改图层数据失败');
            });
          }else{
            addTDataService(this.tDataServiceForm).then(res => {
              if (res && res.code == 200) {
                this.closeModal(false);
                this.$emit('handleSearch');
                this.$Message.success('保存成功');
              }else{
                this.$Message.error(res.msg);
              }
            })
          }
        } else {
          this.loading = true;
          this.$Message.error('表单验证不通过！');
        }
        setTimeout(() => {
          this.loading = false;
          this.$nextTick(() => {
            this.loading = true;
          });
        }, 1000);
      });
    },
    closeModal(val) {
      this.$emit('input', val);
    },
    initForm(){
      this.tDataServiceForm= {
        name:'',
        params:'',
        checked:'',
        type:'',
        remarks:'',
        level:'',
        format:'',
        url:'',
      };
    },
    getTDataServiceFormRule() {
      return {
        name: [
          {required: true, message: '服务名称不能为空！', trigger: 'blur'},
          {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
        ],
        level: [
          {required: true, message: '级别不能为空！', trigger: 'blur'},
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
      this.loading=false;
      this.editTitle = this.modalTitle;
      if(val) {
        this.$refs['tDataServiceForm'].resetFields();
        if(this.TDataServiceId!=null&&this.TDataServiceId.trim().length>0){
          getTZhsqBottomTool({id: this.TDataServiceId}).then(res => {
            if (res && res.code == 200) {
              this.tDataServiceForm.name = res.data.name;
              this.tDataServiceForm.streetName = res.data.streetName;
              this.tDataServiceForm.communityName = res.data.communityName;
              this.tDataServiceForm.remarks = res.data.remarks;
              this.tDataServiceForm.level = res.data.level;
              this.tDataServiceForm.griddingName = res.data.griddingName;

              if(res.data.pid!="0"){
                getTZhsqBottomTool({id:res.data.pid}).then(re => {
                  this.selectModel = re.data.name;
                })
              }
              this.tDataServiceForm.format = res.data.formatName;
            } else {
              this.$Message.error(res.msg);
            }
          }).catch(err => {
            this.$Message.error('查询图层数据失败');
          });
        }
      } else {
        this.closeModal(val);
      }
    }
  }
}
</script>
