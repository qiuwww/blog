<template>
  <Modal v-model="modalShow" title="管线" :mask-closable="false" :mask="false" class="pipelineLayerTableIndex" width="200"
         footer-hide @on-cancel="onCancel">
    <Table border :columns="pipelineLayerTableColums" :data="tableData" :width="180" highlight-row @on-row-click="onRowClick"></Table>
  </Modal>
</template>

<script>
    export default {
        name: "pipelineLayerTableIndex",
        props: {
            value: {
                type: Boolean,
                default: false,
            },
            allData: {
                type: Array,
                default: () => []
            }
        },
        data() {
            return {
                modalShow: this.value,
                tableData: [],
                pipelineLayerTableColums: [
                    {
                        align: "center",
                        title: '管线编号',
                        key: 'name',
                    }
                ]
            };
        },
        methods: {
            //关闭表格界面
            onCancel() {
                this.$parent.$parent.pipelineLayerTableShow = false;
            },
            onRowClick(row, index) {
                //高亮选中的线
                this.$parent.$parent.setLineHeight(row);
            }
        },
        watch: {
            value(val) {
                this.modalShow = val;
            },
            allData(val){
                this.tableData = val;
            }
        }
    };
</script>
<style lang="less">
  .pipelineLayerTableIndex {
    .ivu-modal {
      position: absolute;
      top: 80px;
      right: 15px !important;
      max-height: 40%;
    }

    .ivu-modal-content {
      color: #FFFFFF;
      background-color: rgba(30, 36, 50, 0.6);
      border: 1px solid rgba(32, 160, 255, 0.6);
      border-radius: 5px !important;
    }

    .ivu-modal-header-inner {
      color: #FFFFFF;
    }

    .ivu-table-body {
      max-height: calc(50vh - 100px);
      overflow-y: auto;
      overflow-x: hidden;
    }

    /*-------滚动条整体样式----*/

    .ivu-table-body::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }

    /*滚动条里面小方块样式*/

    .ivu-table-body::-webkit-scrollbar-thumb {
      border-radius: 100px;
      -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      background: #212020;
    }

    /*滚动条里面轨道样式*/

    .ivu-table-body::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      border-radius: 0;
      background: rgba(0, 0, 0, 0.1);
    }

    .ivu-page-item a {
      color: #fff;
    }

    .ivu-page-item-active a {
      color: #2d8cf0 !important;
    }


    .ivu-table-header {
      background-color: rgba(30, 36, 50, 0.6);
      color: #fff;
    }

    .ivu-table td {
      background-color: rgba(30, 36, 50, 0.6);
      color: #fff;
    }

    .ivu-table th {
      background-color: rgba(30, 36, 50, 0.6);
      color: #fff;
    }

    .ivu-table-row-hover td {
      background-color: rgba(0, 191, 255) !important;
      color: #fff;
    }

    .ivu-table-row-highlight {
      background-color: rgba(0, 191, 255) !important;
    }

    .ivu-table-row-highlight td {
      background-color: rgba(0, 191, 255) !important;
    }

    .ivu-form .ivu-form-item-label {
      color: #fff;
    }

    .ivu-select-dropdown {
      background-color: rgba(30, 36, 50, 0.6) !important;
      color: #fff !important;
    }

    .ivu-select-item-selected, .ivu-select-item-selected:hover {
      background-color: #2d8cf0 !important;
      color: #fff !important;
    }

    .pageClass li {
      background-color: rgba(30, 36, 50, 0.2);
      color: #fff !important;
    }

    .pageClass li i {
      color: #fff !important;
    }

    .ivu-select-placeholder {
      background-color: rgba(30, 36, 50, 0.6) !important;
      color: #fff !important;
    }

    .ivu-select-selected-value {
      background-color: rgba(30, 36, 50, 0.6) !important;
      color: #fff !important;
    }
  }
</style>
