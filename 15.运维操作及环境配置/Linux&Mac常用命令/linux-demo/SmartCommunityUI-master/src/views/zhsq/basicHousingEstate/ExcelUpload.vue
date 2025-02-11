<style lang="less" scoped>
  .showInfoClass{
    max-height: 500px;
  }
</style>

<template>
  <Modal v-model="show" :title="editTitle" :mask-closable="false" :draggable="false" class="looktTSubstances" width="900" v-loading="loading">
    <Upload
      multiple
      type="drag"
      accept="xls,xlsx"
      :format="fileTypeArr"
      :on-success="uploadSuccess"
      :on-error="uploadError"
      :on-progress="uploadProgress"
      :action="api"
      :headers="upHeaders"
      ref="upload">
      <div style="padding: 20px 0">
        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
        <p>请选择上传的文件</p>
      </div>
    </Upload>
    <Modal v-model="showInfo" :closable=false class="showInfoClass"  title="导入结果" width="900">
      <div style="max-height: 400px; overflow: auto" >
<!--        <List v-for="(item, i) in contentStr"  >-->
<!--          <ListItem >{{item}}</ListItem>-->
<!--        </List>-->
        <Table stripe :columns="columns1" :data="contentStr"></Table>
      </div>
      <div slot="footer">
        <Button type="primary"  @click="closeAllModal">关闭</Button>
      </div>
    </Modal>
    <div slot="footer">
      <Button type="text"  @click="closeMaxModal">取消</Button>
      <Button type="primary" :loading="loading" @click="closeMaxModal">确定</Button>
      <Button type="primary" :loading="loading"  @click="downloadExcel">下载模板文件</Button>
    </div>
  </Modal>
</template>
<script>
  import {exportExcel} from  '@/api/index'
  import { getToken } from '@/utils/auth'
  import Cookies from "js-cookie";
  export default {
    name: "ExcelUpload",
    props: {
      value: {
        type: Boolean,
        default: false
      },
      modalTitle: {
        type: String
      },
      actions:{
        type:String
      }
    },
    data() {
      return {
        showInfo:false,
        contentStr:[],
        fileTypeArr:["xls","xlsx"],//文件类型
        show: this.value,//是否显示
        editTitle: this.modalTitle,//标题
        loading: false,
        api:this.actions,
        upHeaders:{
          "User-Type":'Gov_User',
          'Authorization':getToken(),
        },
        //导入结果表格的列
        columns1: [
          {
            title: '序号',
            align: 'center',
            tooltip: true,
            key: 'number'
          },
          {
            title: '校验结果',
            align: 'center',
            tooltip: true,
            key: 'success'
          },
          {
            title: '失败原因',
            align: 'center',
            tooltip: true,
            key: 'msg'
          }
        ],
      }
    },
    methods: {
      closeModal(val) {
        this.$emit('input', val);
      },
      uploadSuccess( response, file, fileList){
        this.loading = false
        if(response){
          if(response.success){
            this.contentStr = response.data;
            this.showInfo = true;
          }else {
            this.$Message.error(response.msg);
          }
        }
        else {
          this.$Message.error("导入失败");
        }

      },
      uploadError( event, file, fileList){
        this.loading = false
        this.$Message.error("导入失败,网络错误，上传导入文件失败");
      },
      uploadProgress( event, file, fileList){
        this.loading = true
      },
      closeAllModal(){//关闭
        this.showInfo=false;
      },
      closeMaxModal(){//关闭
        this.show=false;
        this.closeModal(false)
        this.$emit('handleSearch')
      },
      downloadExcel(){
        let type = '';
        let fileName = "人口管理.xls";
        if(this.api.indexOf("basicPerson")>-1){
          type=1;
          fileName = "人口管理.xls";
        }
        else if(this.api.indexOf("basicHousingEstate")>-1){
          type=2;
          fileName = "小区档案.xls";
        }
        else if(this.api.indexOf("tZhsqPropertyManagement")>-1){
          type=3;
          fileName = "物业档案.xls";
        }
        else if(this.api.indexOf("basicGrids")>-1){
          type=4;
          fileName = "网格档案.xls";
        }
        else if(this.api.indexOf("tBuildingArchives")>-1){
          type=5;
          fileName = "楼栋档案.xls";
        }
        else if(this.api.indexOf("importGridMemberExcel")>-1){
          type=6;
          fileName = "网格员.xls";
        }
        else if(this.api.indexOf("importGridLengthExcel")>-1){
          type=7;
          fileName = "网格长.xls";
        }
        else if(this.api.indexOf("tZhsqCommunityCadres")>-1){
          type=8;
          fileName = "社区干部.xls";
        }
        else if(this.api.indexOf("tZhsqVolunteer")>-1){
          type=9;
          fileName = "街道志愿者.xls";
        }
        else if(this.api.indexOf("basicHousing")>-1){
          type=10;
          fileName = "房屋档案.xls";
        }

        else {
          this.$Message.error('下载模板失败！请联系管理员！！！');
          return;
        }
        var _this = this;
        exportExcel({type:type}).then(res => {
          const content = res;
          const blob = new Blob([content], {type: 'application/ms-excel'});
          if ('download' in document.createElement('a')) { // 非IE下载
            const elink = document.createElement('a');
            elink.download = fileName;
            elink.style.display = 'none';
            elink.href = URL.createObjectURL(blob);
            document.body.appendChild(elink);
            elink.click();
            URL.revokeObjectURL(elink.href); // 释放URL 对象
            document.body.removeChild(elink);
          } else { // IE10+下载
            navigator.msSaveBlob(blob, fileName);
          }
          _this.isExportShow = false;
        }).catch(function (error) {
          _this.$Message.error('数据导出失败');
          _this.isExportShow = false;
        });
      }

    },
    watch: {
      value(val) {
        this.show = val;
      },
      show(val) {
        this.loading = false;
        this.editTitle = this.modalTitle;
        if (!val) {
          this.closeModal(val);
          this.$refs.upload.clearFiles();//清空已上传的文件列表
        }
      }
    },
    created() {
      this.height = Math.floor(document.body.scrollHeight * 0.95) + "px";
      this.width = Math.floor(document.body.scrollWidth * 0.95) + "px";
    },
  }
</script>
