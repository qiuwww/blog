<style lang="less">
  .looktTSubstancesConstruct{
    .ivu-modal {
      width: 580px !important;
      top: 50%;
      transform: translateY(-50%);
    }
    .ivu-col-span-sm-12 {
      padding-left: 7px !important;
    }
  }
</style>

<template>
  <Modal v-model="show" :title="editTitle" :mask-closable="false" class="looktTSubstancesConstruct">
    <Card :bordered="false" dis-hover class="ivu-mt i-table-no-border">
      <DescriptionList title="" :col="2">
        <Description term="物质名称：">{{tSubstancesLookForm.name}}</Description>
        <Description term="规格型号：">{{tSubstancesLookForm.specificationModel}}</Description>
        <Description term="标准：">{{tSubstancesLookForm.standard}}</Description>
        <Description term="所属单位：">{{tSubstancesLookForm.affiliatedUnit}}</Description>
        <Description term="数量：">{{tSubstancesLookForm.numbers}}</Description>
        <Description term="单位：">{{tSubstancesLookForm.unit}}</Description>
        <Description term="存放位置：">{{tSubstancesLookForm.parkingPosition}}</Description>
        <Description term="地图位置：">{{tSubstancesLookForm.mapLocation}}</Description>
        <Description term="备注：">{{tSubstancesLookForm.remark}}</Description>
      </DescriptionList>
    </Card>

  </Modal>
</template>
<script>
  import {addTSubstances, updateTSubstances, getTSubstances} from '@/api/tSubstances/tSubstances'
  import Map from "../../components/mars-map/Main.vue";

  export default {
    name: "lookTSubstances",
    components: {
      Map
    },
    props: {
      value: {
        type: Boolean,
        default: false
      },
      TSubstancesId: {
        type: String
      },
      modalTitle: {
        type: String
      }
    },
    data() {
      return {
        show: this.value,//是否显示
        editTitle: this.modalTitle,//标题
        loading: true,
        tSubstancesLookForm: {
          name: '',
          specificationModel: '',
          standard: '',
          numbers: '',
          unit: '',
          affiliatedUnit: '',
          parkingPosition: '',
          mapLocation: '',
          remark: '',
        }

      }
    },
    methods: {

      //提交数据
      closeModal(val) {
        this.$emit('input', val);
      },
      //初始化表单
      initForm() {
        this.tSubstancesLookForm = {
          name: '',
          specificationModel: '',
          standard: '',
          numbers: '',
          unit: '',
          affiliatedUnit: '',
          parkingPosition: '',
          mapLocation: '',
          remark: '',
        };
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
          if (this.TSubstancesId != null && this.TSubstancesId.trim().length > 0) {
            getTSubstances({id: this.TSubstancesId}).then(res => {
              if (res && res.code == 200) {
                this.tSubstancesLookForm.name = res.data.name;
                this.tSubstancesLookForm.specificationModel = res.data.specificationModel;
                this.tSubstancesLookForm.standard = res.data.standard;
                this.tSubstancesLookForm.numbers = res.data.number;
                this.tSubstancesLookForm.unit = res.data.unit;
                this.tSubstancesLookForm.affiliatedUnit = res.data.affiliatedUnit;
                this.tSubstancesLookForm.parkingPosition = res.data.parkingPosition;
                this.tSubstancesLookForm.mapLocation = res.data.mapLocation;
                this.tSubstancesLookForm.remark = res.data.remark;
              } else {
                this.$Message.error(res.message);
              }
            });
          }
        } else {
          this.closeModal(val);
        }
      }
    },
    created() {
      this.height = Math.floor(document.body.scrollHeight * 0.95) + "px";
      this.width = Math.floor(document.body.scrollWidth * 0.95) + "px";
    },
  }
</script>
