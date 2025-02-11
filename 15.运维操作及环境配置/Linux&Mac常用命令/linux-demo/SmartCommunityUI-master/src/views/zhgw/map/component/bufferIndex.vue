<template>
  <Modal v-model="modalShow" title="管线" :mask-closable="false" :mask="false" class="bufferIndex" width="600" draggable footer-hide @on-cancel="onCancel">
    <div>
      <Tree :data="treeData" show-checkbox class="leftTree"></Tree>
      <Table border :columns="tableColumns" :data="tableData" class="rightTable" :width="400"></Table>
    </div>

      <Input v-model="bufferRadius" type="number" :min="1" style="width: 400px;float: left;margin-top: 20px;margin-bottom: 10px;">
        <span slot="prepend">缓冲半径：</span>
        <span slot="append">（单位/米）</span>
      </Input>
      <Button type="primary" style="float:right;margin-top: 20px;margin-bottom: 10px;">缓冲分析</Button>
  </Modal>
</template>

<script>
    import {MapConfig} from '@/api/zhgw/config';
    import {loadModules} from 'esri-loader';

    const options = {
        // 可以使用自定义资源加载,arcgis 官网加载太慢了,经常加载失败.后面会讲到自己本地如何配置资源
        url: 'http://139.129.103.13:8013/arcgis_js_api/library/4.16/init.js',
        //url: 'http://192.168.1.3:8088/library/4.16/init.js',
        css: true
    };

    export default {
        name: "pipelineLayerTableIndex",
        props: {
            value: {
                type: Boolean,
                default: false,
            },
            fieldColumnsData: {
                type: Array,
                default: () => []
            }
        },
        data() {
            return {
                modalShow: this.value,
                treeData: [{
                    title: '所有图层',
                    expand: true,
                    checked: true,
                    children: []
                }],
                tableColumns: [
                    {
                        align: "center",
                        title: '字段名称',
                        key: 'name',
                        width: 140
                    },
                    {
                        align: "center",
                        title: '字段值',
                        key: 'value',
                    }
                ],
                tableData: [],
                bufferRadius: ''
            };
        },
        methods: {
            //关闭表格界面
            onCancel() {
                this.$parent.$parent.bufferIndexShow = false;
            },
            getZtreeCheckData() {
                let ztreeNodes = this.$parent.$parent.$parent.getZtreeNodes();
                let children = [];
                let parentTId = '';
                for (let i = 0; i < ztreeNodes.length; i++) {
                    if (ztreeNodes[i].name == '王氏骨科') {
                        children.push({
                            title: '王氏骨科',
                            expand: true,
                            children: []
                        });
                        parentTId = ztreeNodes[i].tId;
                        break;
                    }
                }

                let filter = ztreeNodes.filter(item => item.parentTId == parentTId);
                for (let i = 0; i < filter.length; i++) {
                    children[0].children.push({
                        title: filter[i].name,
                        layerId: filter[i].params.layerId
                    })
                }

                this.treeData[0].children = children;
            }
        },
        watch: {
            value(val) {
                this.modalShow = val;
                if (val) {
                    this.getZtreeCheckData();
                }
            },
            fieldColumnsData(val) {
                this.tableData = val;
            }
        }
    };
</script>
<style lang="less">
  .bufferIndex {
    .leftTree {
      float: left;
      width: 150px;
      color: #fff;

      .ivu-tree-title {
        color: #fff;
      }

      .ivu-tree-title:hover {
        background-color: grey !important;
      }

      .ivu-tree-title-selected, .ivu-tree-title-selected:hover {
        background-color: grey !important;
      }
    }


    .rightTable {
      float: right;
    }

    .ivu-table-tip {
      overflow: hidden;
    }

    .ivu-page-total {
      color: #fff;
    }

    .ivu-modal {
      position: absolute;
      top: 340px;
      left: 15px !important;
      max-height: 50%;
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
      max-height: calc(40vh - 50px);
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
