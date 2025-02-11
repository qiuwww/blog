<style lang="less">
@import "./historicDetail.less";
@import "../../../styles/single-common.less";
</style>
<template>
  <div class="search">
    <Card style="margin-bottom:10px;">
      <div slot="title">
        <div class="edit-head">
          <a @click="close" class="back-title">
            <Icon type="ios-arrow-back" />返回
          </a>
          <div class="head-name">流程审批进度历史</div>
          <span></span>
          <a @click="close" class="window-close">
            <Icon type="ios-close" size="31" class="ivu-icon-ios-close" />
          </a>
        </div>
      </div>
      <Row style="position:relative">
        <Table :loading="loading" border :columns="columns" :data="data" ref="table"></Table>
        <div class="img-title">实时流程图</div>
        <Row style="position:relative;display: flex;justify-content: center;">
          <img :src="imgUrl" />
          <Spin size="large" fix v-if="loadingImg"></Spin>
        </Row>
        <Spin size="large" fix v-if="loading"></Spin>
      </Row>
    </Card>
  </div>
</template>

<script>
import { getHighlightImg, historicFlow } from "@/api/activiti";
import util from "@/libs/util";
export default {
  name: "historic_detail",
  props: {
    procInstId: String
  },
  data() {
    return {
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
          minWidth: 120,
          sortable: true
        },
        {
          title: "处理人",
          key: "assignees",
          align: "center",
          sortable: true,
          minWidth: 150,
          render: (h, params) => {
            if (params.row.assignees) {
              return h(
                "div",
                params.row.assignees.map(function(item, index) {
                  if (item.isExecutor) {
                    return h(
                      "Tooltip",
                      {
                        props: {
                          placement: "top",
                          content: item.username
                        }
                      },
                      [
                        h(
                          "Tag",
                          {
                            style: {
                              "margin-right": "8px"
                            },
                            props: {
                              type: "border",
                              color: "primary"
                            }
                          },
                          item.nickname
                        )
                      ]
                    );
                  } else {
                    return h(
                      "Tooltip",
                      {
                        props: {
                          placement: "top",
                          content: item.username
                        }
                      },
                      [
                        h(
                          "Tag",
                          {
                            style: {
                              "margin-right": "8px"
                            },
                            props: {
                              type: "border"
                            }
                          },
                          item.nickname
                        )
                      ]
                    );
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
          minWidth: 150,
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
          width: 100,
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
          width: 120,
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
      if (this.$route.query.id) {
        this.id = this.$route.query.id;
        this.backRoute = this.$route.query.backRoute;
      } else {
        this.id = this.procInstId;
      }
      this.imgUrl =
        getHighlightImg +
        this.id +
        "?accessToken=" +
        "" +
        "&time=" +
        new Date();
      this.getDataList();
    },
    getDataList() {
      this.loading = true;
      historicFlow(this.id).then(res => {
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
    // 关闭当前页面
    close() {
      if (this.$route.query.id) {
        this.$store.commit("removeTag", "historic_detail");
        localStorage.pageOpenedList = JSON.stringify(
          this.$store.state.app.pageOpenedList
        );
        this.$router.push({
          name: this.backRoute
        });
      } else {
        this.$emit("close", true);
      }
    }
  },
  mounted() {
    this.init();
  },
  watch: {
    // 监听路由变化
    $route(to, from) {
      if (to.name == "historic_detail") {
        this.init();
      }
    }
  }
};
</script>
