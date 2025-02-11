<template>
  <div class="search tBigScreenList">
    <Card>
      <Row v-show="openSearch" @keydown.enter.native="handleSearch">
        <Form ref="searchForm" :model="searchForm" inline :label-width="70">
          <Form-item label="大屏名称">
            <Input v-model="searchForm.name" placeholder="请输入大屏名称"/>
          </Form-item>
          <!--<Form-item label="大屏描述">
            <Input v-model="searchForm.details" placeholder="请输入大屏描述"/>
          </Form-item>
          <Form-item label="大屏url">
            <Input v-model="searchForm.url" placeholder="请输入大屏url"/>
          </Form-item>-->
          <Form-item label="创建时间">
            <DatePicker v-model="selectDate" type="daterange" format="yyyy-MM-dd" clearable @on-change="selectDateRange"
                        placeholder="选择起始时间"></DatePicker>
          </Form-item>
          <Form-item style="margin-left:-60px" class="br">
            <Button @click="handleSearch" type="primary" icon="ios-search">搜索</Button>
            <Button @click="handleReset">重置</Button>
            <!--<a class="drop-down" @click="dropDown">
              {{dropDownContent}}
              <Icon :type="dropDownIcon"></Icon>
            </a>-->
          </Form-item>
        </Form>
      </Row>
      <Row class="operation">
        <Button @click="addTBigScreen" type="primary" icon="md-add">新增</Button>
        <Button @click="getDataList" icon="md-sync">刷新</Button>
        <Button type="dashed" @click="openSearch=!openSearch">{{openSearch ? '关闭搜索' : '开启搜索'}}</Button>
      </Row>
      <Row class="cardContent" :gutter="16">
        <Col span="6" class="cardScreen" v-for="(item,i) in data" :value="i" :key="item.id">
          <card :padding="10" class="cardWidth">
            <div slot="title">
              <img :src="'/tempfile/' + item.img" class="screenImg" :style="{height: imgHeight + 'px'}">
            </div>
            <List item-layout="vertical">
              <ListItem class="cardList">
                <div class="listTitle">
                  <span class="titleName" :title="item.name">{{item.name}}</span>
                  <a @click="visitScreen(item.url)">前往访问</a>
                </div>
                <p class="details">{{item.details}}</p>
                <Divider/>
                <template slot="action">
                  <li class="update" @click="handleEdit(item.id.toString())">
                    <Icon type="ios-create-outline"/>
                    修改
                  </li>
                  <li class="delete" @click="deleteData(item.id.toString())">
                    <Icon type="md-trash"/>
                    删除
                  </li>
                </template>
              </ListItem>
            </List>
          </card>
        </Col>
        <Spin size="large" fix v-if="loading"></Spin>
      </Row>
      <Row type="flex" justify="end" class="page">
        <Page :current="searchForm.pageNumber" :total="total" :page-size="searchForm.pageSize" @on-change="changePage"
              @on-page-size-change="changePageSize" :page-size-opts="[8,16,24]" size="small" show-total show-elevator
              show-sizer transfer></Page>
      </Row>
    </Card>
    <updateTBigScreen v-model="updateShow" :TBigScreenId="TBigScreenId" :modalTitle="title"
                      v-on:handleSearch="handleSearch"></updateTBigScreen>
  </div>
</template>
<script>
  import {deleteTBigScreen, queryTBigScreenList} from '@/api/tBigScreen/tBigScreen'
  import updateTBigScreen from './updateTBigScreen'

  export default {
    components: {
      updateTBigScreen
    },
    data() {
      return {
        drop: false,
        dropDownContent: "展开",
        dropDownIcon: "ios-arrow-down",
        search: '',
        data: [],
        openSearch: true,//打开搜索
        loading: true, // 表单加载状态
        selectList: [], // 多选数据
        searchForm: {
          name: '',
          details: '',
          type:'1',
          url: '',
          // 搜索框对应data对象
          //pageNumber: 1, // 当前页数
          //pageSize: 8, // 页面大小
          startDate: null,//开始时间
          endDate: null,//结束时间
          sort: 'createTime', // 默认排序字段
          order: 'desc' // 默认排序方式
        },
        total: 0,
        title: '',
        TBigScreenId: '',
        updateShow: false,
        tableHeight: 200,
        selectDate: null,
        imgHeight: `${document.documentElement.clientWidth}` * 0.1,
        WinWidth: 0
      }
    },
    methods: {
      //前往访问 点击事件
      visitScreen(url){
        if (!url){
          this.$Message.error({
            content: '该大屏url为空',
            duration: 3
          });
          return;
        }
        // console.log(window.location.host);
        window.open(url);
      },
      //展开 收起
      dropDown() {
        if (this.drop) {
          this.dropDownContent = "展开";
          this.dropDownIcon = "ios-arrow-down";
        } else {
          this.dropDownContent = "收起";
          this.dropDownIcon = "ios-arrow-up";
        }
        this.drop = !this.drop;
      },
      //时间选择事件
      selectDateRange(v) {
        if (v) {
          this.searchForm.startDate = v[0];
          this.searchForm.endDate = v[1];
        }
      },
      //新增
      addTBigScreen() {
        this.title = '新增';
        this.updateShow = true
        this.TBigScreenId = '';
      },
      //编辑
      handleEdit(id) {
        this.title = '编辑';
        this.TBigScreenId = id;
        this.updateShow = true;
      },
      //查看
      /*handleEdit(row, index) {
        this.title = '查看';
        this.TBigScreenId = row.id.toString();
        this.updateShow = true;
      },*/
      //分页查询
      getDataList() {
        this.loading = true;
        this.searchForm.id = null;
        queryTBigScreenList(this.searchForm).then(res => {
          if (res && res.success) {
            this.loading = false;
            this.data = res.data.records;
            this.total = res.data.total;
          }
        });
      },
      //单一删除
      deleteData(id) {
        this.$Modal.confirm({
          title: "确认删除",
          content: "您确认要删除所点击选的数据?",
          loading: true,
          onOk: () => {
            this.userLoading = true;
            var ids = [];
            ids.push(id);
            this.patchdeleteData(ids);
          },
          onCancel: () => {
            this.$Message.info('取消了当前的操作行为！');
          },
        });
      },
      //删除（后台）
      patchdeleteData(ids) {
        if (ids == undefined || ids == null || ids.length == 0) {
          this.$Message.error('没有选择的数据');
          return;
        }
        deleteTBigScreen({ids: ids}).then(res => {
          this.userLoading = false;
          this.$Modal.remove();
          if (res && res.success) {
            this.modalTaskVisible = false;
            this.$Message.success('删除成功');
            this.getDataList();
          } else {
            this.$Message.error('删除失败');
          }
        });
      },
      //改变页码
      changePage(v) {
        this.searchForm.pageNumber = v;
        this.getDataList();
      },
      //改变每页显示数据的条数
      changePageSize(v) {
        this.searchForm.pageSize = v;
        this.getDataList();
      },
      //查询
      handleSearch() {
        this.searchForm.pageNumber = 1;
        this.searchForm.pageSize = 8;
        this.getDataList();
      },
      //重置
      handleReset() {
        this.$refs.searchForm.resetFields();
        this.searchForm.name = '';
        this.searchForm.details = '';
        this.searchForm.url = '';
        this.searchForm.pageNumber = 1;
        this.searchForm.pageSize = 8;
        this.searchForm.startDate = null;
        this.searchForm.endDate = null;
        this.selectDate = null;
        // 重新加载数据
        this.getDataList();
      },
    },
    mounted() {
      window.onresize = () => {
        this.WinWidth = `${document.documentElement.clientWidth}`;
      }
      this.getDataList();
      //this.tableHeight = window.innerHeight - this.$refs.tBigScreenTable.$el.offsetTop - 270
    },
    watch: {
      WinWidth(newValue,oldValue){
        this.imgHeight = newValue * 0.1
      }
    }
  }
</script>
<style lang="less" scoped>
  .tBigScreenList {
    .ivu-input-wrapper, .ivu-date-picker{
      width: 200px;
    }

    .ivu-form .ivu-form-item-label {
      text-align: left;
      padding: 0px 0px 0px 0;
    }

    .ivu-form-item-content > .ivu-btn {
      margin-right: 10px !important;
    }

    .cardContent {
      .addScreen {
        height: 333px;
        line-height: 333px;
        text-align: center;

        &:hover {
          color: #2d8cf0;
          cursor: pointer;
        }
      }

      .ivu-list-vertical .ivu-list-item-action > li {
        padding: 0;
      }

      .cardScreen {
        margin: 10px 0;
        min-width: 170px;

        .cardWidth{
          width: 85%;
        }

        .ivu-list-item {
          padding: 0;
        }

        .screenImg {
          width: 100%;
          /*max-height: 200px;*/
          object-fit: cover;
          border-radius: 4px 4px 0 0;
        }

        .cardList {
          text-align: justify;
          font-size: .7vw;

          .listTitle {
            display: flex;
            justify-content: space-between;
            white-space: nowrap;

            .titleName {
              overflow: hidden;
              text-overflow: ellipsis;
              font-weight: bold;
            }
          }

          .details {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }

          .ivu-divider-horizontal {
            margin: 10px 0;
          }

          .ivu-list-vertical .ivu-list-item-action {
            margin-top: 0 !important;
          }

          .update {
            width: 50%;
            font-size: .7vw;

            &:hover {
              color: #2d8cf0;
            }
          }

          .delete {
            width: 50%;
            font-size: .7vw;

            &:hover {
              color: #ed4014;
            }
          }
        }
      }
    }
  }
</style>
<style lang="less">
  .cardScreen {
    .ivu-card-head {
      padding: 0;
    }

    .ivu-list-vertical .ivu-list-item-action {
      margin-top: 10px;
    }
  }
</style>
