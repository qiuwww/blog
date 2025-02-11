<template>
  <!--表单组件-->
  <Modal v-model="show" :title="modalTitle"  :mask-closable="false" width="500px">
    <Form ref="form"  :model="form" :rules="rules"  :label-width=80>
      <FormItem label="应用" prop="appId">
        <Select v-model="form.appId" placeholder="请选择" v-bind:disabled="disabled" style="width: 370px">
          <Option v-for="(item, i)  in apps" :value="item.id"  :key="item.id">{{ item.name }}</Option>
        </Select>
      </FormItem>
<!--      prop="deploys"-->
      <FormItem label="服务器" prop="deploys">
        <Select v-model="form.deploys" multiple placeholder="请选择" v-bind:disabled="disabled" style="width: 370px">
          <Option v-for="(item, i)  in deploys" :value="item.id"  :key="item.id">{{ item.name }}</Option>
        </Select>
      </FormItem>
    </Form>
    <div slot="footer">
      <Button @click="show=false">
        取消
      </Button >
      <Button type='primary' :loading="loading" @click="handelSubmit">
        确定
      </Button>
    </div>
  </Modal>

</template>
<script>
  import {getApps,getServers,edit,add} from '@/api/mnt/deploy'
  export default {
    name: "deployForm",
    props: {
      value: {
        type: Boolean,
        default: false
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
        currentId:null,
        form: {
          id:null,
          appId:null,
          deploys:[],
        },
        //验证
        rules: this.getRules(),
        //只读
        disabled:false,
        loading:false,
        deploys:[],
        apps:[],
      }
    },
    methods: {
      //获取app数据
      getAppList(){
        var _this = this;
        getApps().then(res => {
          _this.apps = res.content;
        })
      },
      //获取服务器数据
      getDeploys(){
        var _this = this;
        getServers().then(res => {
          _this.deploys = res.content;
        })
      },
      //提交
      handelSubmit() {
        var _this = this;
        this.loading = true;
        this.$refs['form'].validate((valid) => {
          if (valid) {
            var data = [];
            this.form.deploys.forEach(function (item ,index) {
              data.push({id:item});
            });
            this.form.deploys = data;
            var app ={id:this.form.appId};
            this.form["app"] = app;
            //修改
            if(_this.currentId!=null&&_this.currentId.trim().length>0){
              _this.form.id = _this.currentId;
              edit(_this.form).then(res => {
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
              add(this.form).then(res => {
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
            this.$Message.error('表单验证不通过！');
            _this.loading = false;
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
        this.form= {
          id:null,
          appId:null,
          deploys:[],
        };
      },
      getRules(){
        return {
          appId: [
                {required: true,type:'number', message:'请选择应用！', trigger: 'blur'},
              ],
          deploys: [
                {required: true,type:'array', message: '请选择服务！', trigger: 'blur'},
             ],
        }
      },


    },
    watch: {
      value(val) {
        this.show = val;
      },
      show(val) {
        var _this = this;
        _this.disabled = false;
        _this.initForm();
        if(_this.modalTitle == "查看") {
          this.disabled = true;
        }
        if(val) {
          _this.$refs['form'].resetFields();
          if(_this.rowData){
            _this.currentId = _this.rowData.id;
            if(_this.rowData.app && _this.rowData.app.id){
              _this.form.appId = _this.rowData.app.id;
            }
            if(_this.rowData.deploys && _this.rowData.deploys.length>0 ){
              _this.rowData.deploys.forEach(function (item,index) {
                 if(item.id){
                   _this.form.deploys.push(item.id);
                 }
              })
            }

          }
        } else {
          this.closeModal(val);
        }
      }
    },
    mounted(){
      //获取服务数据
      this.getAppList();
      //获取服务器数据
      this.getDeploys();
      this.height = Math.floor(document.body.scrollHeight * 0.95) + "px";
      this.width = Math.floor(document.body.scrollWidth *  0.95) + "px";
    },
  }
</script>
