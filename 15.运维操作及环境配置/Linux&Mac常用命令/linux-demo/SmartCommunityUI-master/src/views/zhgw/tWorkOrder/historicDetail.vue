<template>
  <Modal v-model="show" :title="editTitle" :mask-closable="false" width="900">
    <div class="search">
      <Card style="margin-bottom:10px;">
        <p slot="title">
          <span>流程审批进度历史</span>
        </p>
        <Row style="position:relative">
          <Table :loading="loading" border :columns="columns" :data="data" ref="table"></Table>
          <Spin size="large" fix v-if="loading"></Spin>
        </Row>
      </Card>
      <Card>
        <p slot="title">
          <span>实时流程图</span>
        </p>
        <Row style="position:relative">
          <img :src="imgUrl"/>
          <Spin size="large" fix v-if="loadingImg"></Spin>
        </Row>
      </Card>
    </div>
  </Modal>
</template>

<script>
    import {getHighlightImg} from "@/api/activiti";
    import {historicFlow} from "@/api/zhgw/tWorkOrderTask/tWorkOrderTask"
    import util from "@/libs/util";
    import {getToken} from "@/utils/auth.js"

    export default {
        name: "historicDetail",
        props: {
            procInstId: {
                type: String
            },
            value: {
                type: Boolean,
                default: false
            },
            modalTitle: {
                type: String
            }
        },
        data() {
            return {
                show: this.value,
                editTitle: this.modalTitle,
                type: 0,
                loading: false, // 表单加载状态
                loadingImg: false,
                columns: [
                    // 表头
                    {
                        type: "selection",
                        width: 60,
                        align: "center"
                    },
                    {
                        type: "index",
                        width: 60,
                        align: "center"
                    },
                    {
                        title: "任务名称",
                        key: "name",
                        minWidth: 130,
                        sortable: true
                    },
                    {
                        title: "处理人",
                        key: "assignees",
                        align: "center",
                        sortable: true,
                        minWidth: 130,
                        render: (h, params) => {
                            if (params.row.assignees) {
                                return h(
                                    "div",
                                    params.row.assignees.map(function (item, index) {
                                        if (item.isExecutor) {
                                            return h("span", [
                                                h("Badge", {
                                                    style: {
                                                        "margin-right": "8px"
                                                    },
                                                    props: {
                                                        status: "success",
                                                        text: item.username
                                                    }
                                                })
                                            ]);
                                        } else {
                                            return h("span", [
                                                h("Badge", {
                                                    style: {
                                                        "margin-right": "8px"
                                                    },
                                                    props: {
                                                        status: "default",
                                                        text: item.username
                                                    }
                                                })
                                            ]);
                                        }
                                    })
                                );
                            }
                        }
                    },
                    {
                        title: "审批操作",
                        key: "deleteReason",
                        align: "center",
                        minWidth: 120,
                        sortable: true
                    },
                    {
                        title: "审批意见",
                        key: "comment",
                        align: "center",
                        minWidth: 120,
                        sortable: true
                    },
                    {
                        title: "耗时",
                        key: "duration",
                        align: "center",
                        minWidth: 100,
                        sortable: true,
                        render: (h, params) => {
                            return h("div", util.millsToTime(params.row.duration));
                        }
                    },
                    {
                        title: "创建时间",
                        key: "createTime",
                        width: 170,
                        sortType: "asc",
                        sortable: true
                    },
                    {
                        title: "完成时间",
                        key: "endTime",
                        width: 170,
                        sortable: true
                    },
                    {
                        title: "状态",
                        align: "center",
                        minWidth: 100,
                        render: (h, params) => {
                            let text = "",
                                color = "";
                            if (params.row.endTime) {
                                color = "blue";
                                text = "已办理";
                            } else {
                                color = "default";
                                text = "待处理";
                            }
                            return h("div", [
                                h(
                                    "Tag",
                                    {
                                        props: {
                                            color: color
                                        }
                                    },
                                    text
                                )
                            ]);
                        }
                    }
                ],
                data: [],
                id: "",
                imgUrl: "",
                backRoute: ""
            };
        },
        methods: {
            init() {
                this.imgUrl =
                    getHighlightImg +
                    this.procInstId +
                    "?accessToken=" +
                    getToken() +
                    "&time=" +
                    new Date();
                this.getDataList();
            },
            getDataList() {
                this.loading = true;
                historicFlow({id: this.procInstId}).then(res => {
                    this.loading = false;
                    if (res && res.success) {
                        this.data = res.data;
                        if (!res.data || res.data.length == 0) {
                            this.$Modal.info({
                                title: "未找到该记录审批历史数据",
                                content: "历史数据可能已被删除"
                            });
                        }
                    }
                });
            },
            closeModal(val) {
                this.$emit('input', val);
            }
        },
        watch: {
            value(val) {
                this.show = val;
            },
            show(val) {
                this.editTitle = this.modalTitle;
                this.init();
                if (val) {

                } else {
                    this.closeModal(val);
                }
            }
        }
    };
</script>
