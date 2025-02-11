<template>
  <!--表单组件-->
  <Modal v-model="show" :title="modalTitle"  :mask-closable="false" width="500px" @on-ok="handelSubmit">
    <Form ref="serverForm" :inline="true" :model="serverForm" :rules="rules"  :label-width=80>
      <FormItem label="名称" prop="name">
        <Input v-model="serverForm.name" style="width: 370px;" v-bind:disabled="disabled"/>
      </FormItem>
      <FormItem label="地址" prop="address">
        <Input v-model="serverForm.address" style="width: 370px;" v-bind:disabled="disabled" />
      </FormItem>
      <Row>
        <Col span="12">
          <FormItem label="端口" prop="port">
            <InputNumber v-model="serverForm.port" v-bind:disabled="disabled"/>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="排序" prop="sort">
            <InputNumber v-model="serverForm.sort" v-bind:disabled="disabled"/>
          </FormItem>
        </Col>
      </Row>

    </Form>
  </Modal>

</template>
<script>
  import { add, edit, del, queryServerList } from '@/api/monitor/server'
  export default {
    name: "serverForm",
    props: {
      value: {
        type: Boolean,
        default: false
      },
      serverId: {
        type: String
      },
      modalTitle: {
        type: String
      },
      rowData: {
        type: Object
      }
    },
    data() {
      return {
        show:false,
        serverForm: {
          //名称
          name:'',
          //地址
          address:'',
          //端口
          port:0,
          //排序
          sort:0,
        },
        //验证
        rules: {
          name: [
            { required: true, message: '请输入名称', trigger: 'blur' }
          ],
          address: [
            { required: true, message: '请输入IP', trigger: 'blur' }
          ],
          port: [
            { required: true, message: '请输入访问端口', trigger: 'blur', type: 'number' }
          ]
        },
        //只读
        disabled:false,
        loading:false,
      }
    },
    methods: {
      //提交
      handelSubmit() {
        var _this = this;
        this.loading = true;
        this.$refs['serverForm'].validate((valid) => {
          if (valid) {
            //修改
            if(_this.serverId!=null&&_this.serverId.trim().length>0){
              edit(_this.serverForm).then(res => {
                _this.loading = false;
                if(!res ){
                  _this.$emit('getDataList');
                  _this.$Message.success('修改成功');

                }else {
                  _this.$Message.error('修改失败');
                }
                _this.show=false;
              })
            }else{
              //新增
              add(this.serverForm).then(res => {
                _this.loading = false;
                if(res && res.id){
                  _this.$emit('getDataList');
                  _this.$Message.success('保存成功');

                }else {
                  _this.$Message.error('保存失败');
                }
                _this.show=false;
              })
            }
          } else {
            this.loading = false;
            this.$Message.error('表单验证不通过！');
          }
        });
      },
      //关闭弹框
      closeModal(val) {
        this.initForm();
        this.$emit('input', val);
      },
      //清空表单
      initForm(){
        //清空表单
        this.serverForm= {
          //名称
          name:'',
          //地址
          address:'',
          //端口
          port:0,
          //排序
          sort:0,
        };
      },

    },
    watch: {
      value(val) {
        this.show = val;
      },
      show(val) {
        this.disabled = false;
        this.initForm();
        if(this.modalTitle == "查看") {
          this.disabled = true;
        }
        if(val) {
          this.$refs['serverForm'].resetFields();
          if(this.rowData){
            this.serverForm = this.rowData;
          }
        } else {
          this.closeModal(val);
        }
      }
    },
    created(){
      this.height = Math.floor(document.body.scrollHeight * 0.95) + "px";
      this.width = Math.floor(document.body.scrollWidth *  0.95) + "px";
    },
  }
</script>
