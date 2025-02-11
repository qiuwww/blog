<template>
  <div>
    <Modal v-model="show" :title="modalTitle" :mask-closable="false" class="personDownload" :draggable="false"
           width="860">
      <div>
        <div style="padding-left:26px">
          <Button @click="handleCheckAll" class="selectAll">全选/反选</Button>
        </div>
        <div class="checkboxGroupDiv">
          <CheckboxGroup v-model="selectField">
            <Checkbox v-for="(item,i) in firstCheckbox" :label="item.label" :value="item.name"></Checkbox>
          </CheckboxGroup>
        </div>

      </div>
      <div slot="footer">
        <Button type="text" @click="show=false">取消</Button>
        <Button type="primary" :loading="loading" @click="handelSubmit">导出</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  import {
    downloadDynamics
  } from '@/api/zhsq/basicPerson/basicPerson'
  export default {
    name: "download",
    props: {
      value: {
        type: Boolean,
        default: false
      },
      BasicPersonId: {
        type: String
      },
      modalTitle: {
        type: String,
        default: "选择导出数据"
      }
    },
    data() {
      return {
        loading:false,//是否有等待效果
        show:false,
        //原始的
        firstCheckbox:[ ],
        //选中的字段
        selectField:[],
        indeterminate: true,
        checkAll: true,//是否全选
        Field:{},//传回后台的字段
      }
    },
    methods: {
      initForm(){
        this.firstCheckbox=[
          {"name":"NAME","label":"姓名"},
          {"name":"house_name","label":"所属小区"},
          {"name":"owned_grid","label":"所属网格"},
          {"name":"community_name","label":"所属社区"},
          {"name":"street_name","label":"所属街道"},
          {"name":"person_type","label":"人口类型"},
          {"name":"phone","label":"联系电话"},
          {"name":"create_time","label":"创建时间"},
          {"name":"build_archive_name","label":"楼栋号"},
          {"name":"unit","label":"单元号"},
          {"name":"floor","label":"楼层号"},
          {"name":"door_number","label":"房号"},
          {"name":"sex","label":"性别"},
          {"name":"card_id","label":"身份证号码"},
          {"name":"nation","label":"民族"},
          {"name":"political_face","label":"政治面貌"},
          {"name":"party_relationship_managemen","label":"党员关系管理地"},
          {"name":"party_relationship_managemen_address","label":"党员关系管理地址"},
          {"name":"work_address","label":"工作单位"},
          {"name":"occupation","label":"职业"},
          {"name":"religious_belief","label":"宗教信仰"},
          {"name":"marital_status","label":"婚姻状况"},
          {"name":"military_service","label":"兵役情况"},
          {"name":"is_preferential_treatment","label":"是否优抚对象"},
          {"name":"serious_illness","label":"现大病详细"},
          {"name":"is_disabled","label":"是否残疾人"},
          {"name":"disability_type","label":"伤残类型"},
          {"name":"disability_level","label":"伤残等级"},
          {"name":"is_minimum_living","label":"是否低保"},
          {"name":"is_lonely","label":"是否失独"},
          {"name":"relation_ship","label":"与房主关系"},
          {"name":"host_name","label":"房主姓名"},
          {"name":"host_gender","label":"房主性别"},
          {"name":"host_card","label":"房主身份证号码"},
          {"name":"host_contact","label":"房主联系方式"},
          {"name":"host_permanent_address","label":"房主户籍地址"},
          {"name":"host_current_address","label":"房主现居地址"},
          {"name":"house_type","label":"房屋类型"},
          {"name":"house_classification","label":"房屋分类建筑性质"},
          {"name":"house_nature","label":"建筑性质描述"},
          {"name":"have_property","label":"有无物业管理"},
          {"name":"province","label":"省"},
          {"name":"city","label":"市"},
          {"name":"county","label":"区/县"},
          {"name":"house_address","label":"详细地址"},
          {"name":"create_id","label":"录入人"},
        ]
      },
      handleCheckAll () {
        this.selectField = [];
        if (this.checkAll) {
          for(var i = 0; i < this.firstCheckbox .length; i++){
            if(this.firstCheckbox[i]){
              this.selectField.push(this.firstCheckbox[i].label)
            }
          }
        }
        this.checkAll = !this.checkAll;
      },
      handelSubmit(){

        this.Field={};
        if(this.selectField.length==0){
          this.$Message.error('请选择您要导出的字段！！')
          return;
        }
        this.loading = true;
        for(let i =0 ;i<this.selectField.length;i++){
          let param = this.firstCheckbox.filter(item => item.label == this.selectField[i]);
          if(param && param.length>0){
            this.Field[param[0].name] = this.selectField[i];
          }
        }
        this.exportData();
      },
      exportData() { // 导出人口数据
        let _this = this;
        let map = {};
        map.searchForm = _this.$parent.searchForm;
        map.Field = _this.Field;
        downloadDynamics(map).then(res => {
          _this.loading = false;
          let content = res
          let blob = new Blob([content], { type: 'application/ms-excel' })
          let fileName = '人口管理数据.xlsx'
          if ('download' in document.createElement('a')) { // 非IE下载
            const elink = document.createElement('a')
            elink.download = fileName
            elink.style.display = 'none'
            elink.href = URL.createObjectURL(blob)
            document.body.appendChild(elink)
            elink.click()
            URL.revokeObjectURL(elink.href) // 释放URL 对象
            document.body.removeChild(elink)
          } else { // IE10+下载
            navigator.msSaveBlob(blob, fileName)
          }
          _this.closeModal(false);
        }).catch(function(error) {
          _this.loading = false;
          _this.$Message.error('数据导出失败')
        })
      },
      closeModal(val) {
        this.$emit('input', val)
      },
    },
    watch: {
      value(val) {
        this.show = val
      },
      show(val) {
        this.initForm()
        this.selectField = this.$parent.colOptions
        if (val) {
        }
      }
    },

  }
</script>

<style lang="less">
  .personDownload {
    font-size: 14px;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    font-weight: 400;
    color: #3e3e3e;
    line-height: 21px;
    .ivu-checkbox-wrapper{
      width: 150px;
      height: 40px;

    }
    .checkboxGroupDiv{
      padding-left: 38px;
      padding-top: 10px;
    }
    .selectAll{
      text-align: center;
      background: #ffffff;
      border: 1px solid #cccccc;
      border-radius: 16px;
      font-size: 14px;
      font-family: Microsoft YaHei, Microsoft YaHei-Regular;
      font-weight: 400;
      color: #3e3e3e;
    }
  }
</style>
