<style lang="less" scoped>

</style>
<template>
  <div class="app-container">
    <Card :padding="10">
      <Row type="flex" >
        <Col :span="span" style="width:100%;padding:0 10px;">
          <Row v-show="openSearch" @keydown.enter.native="handleSearch">
            <Form ref="searchForm" :model="searchForm" inline :label-width="60" style="margin-top:10px">
              <Form-item label="表名称" prop="name">
                <Input
                  type="text"
                  v-model="searchForm.name"
                  placeholder="请输入表名称"
                  clearable
                  style="width: 200px"
                />
              </Form-item>
              <Form-item style="margin-left:-65px;" class="br">
                <Button @click="handleSearch" type="primary" icon="ios-search">搜索</Button>
                <Button @click="handleReset">重置</Button>
              </Form-item>
            </Form>
          </Row>

          <Row class="operation">
            <Button @click="sync" type="success" icon="ios-sync" :loading="syncLoading">同步</Button>
            <Dropdown>
              <Button>
                更多操作
                <Icon type="md-arrow-dropdown" />
              </Button>
              <DropdownMenu slot="list">
                <DropdownItem @click.native="getDataList"><Icon type="md-sync" style="margin-right:5px" />刷新</DropdownItem>
                <!-- <DropdownItem @click.native="delAll"><Icon type="md-trash" style="margin-right:5px"/>批量删除</DropdownItem> -->
                <DropdownItem @click.native="exportData"><Icon type="md-arrow-down" style="margin-right:5px"/>导出本页数据</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Button type="dashed" @click="openSearch=!openSearch">{{openSearch ? "关闭搜索" : "开启搜索"}}</Button>
            <Button type="dashed" @click="openTip=!openTip">{{openTip ? "关闭提示" : "开启提示"}}</Button>

            <!-- 动态列 -->
            <div style="float: right;position: absolute;right: 10px;">
              <Poptip transfer trigger="click" placement="bottom-end" title="动态列">
                <Button icon="md-list"></Button>
                <div slot="content" style="position:relative;min-height:5vh">
                  <Checkbox-group v-model="colOptions" @on-change="checkboxChange">
                    <checkbox v-for="(item,i) in colSelect" :label="item" :key="item" ></checkbox>
                  </Checkbox-group>
                </div>
              </Poptip>
            </div>
          </Row>

          <Row v-show="openTip" style="margin-top:10px;">
            <Alert show-icon>
              已选择
              <span class="select-count">{{ selectCount }}</span> 项
              <a class="select-clear" @click="clearSelectAll">清空</a>
            </Alert>
          </Row>

          <!--表格渲染-->
          <Row>
            <Table ref="table" :loading="loading" border sortable="custom" :columns="columns" :data="data" @on-sort-change="changeSort" @on-selection-change="showSelect">
              <!-- 更多操作 -->
              <template slot="action" slot-scope="{ row, index }">
                <Button type="primary" size="small" @click.native="viewFrame(row,index)" icon="ios-eye-outline">查看</Button>
                <Dropdown :transfer=true >
                  <Button style="padding: 0 7px;height: 23.5px;">
                    更多操作
                    <Icon type="ios-arrow-down" />
                  </Button>
                  <DropdownMenu slot="list">
                    <DropdownItem @click.native="toDownload(row)"><Icon type="ios-create-outline" style="margin-right: 5px;"/>下载</DropdownItem>
                    <DropdownItem @click.native="editFrame(row)"><Icon type="ios-create-outline" style="margin-right: 5px;"/>编辑</DropdownItem>
                    <DropdownItem @click.native="toGen(row)"><Icon type="ios-create-outline" style="margin-right: 5px;"/>生成</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </template>
            </Table>
          </Row>

          <!-- 分页组件 -->
          <Row type="flex" justify="end" class="page">
            <Page
              :current="searchForm.page"
              :total="total"
              :page-size="searchForm.size"
              @on-change="changePage"
              @on-page-size-change="changePageSize"
              :page-size-opts="[10,20,50,100]"
              size="small"
              show-total
              show-elevator
              show-sizer
              transfer
            ></Page>
          </Row>

        </Col>
      </Row>
    </Card>

  </div>
</template>

<script>

  import { generator, sync,queryTablesList } from '@/api/generator/generator'
  import { downloadFile } from '@/utils/index'
  import pagination from '@crud/Pagination'
  export default {
    name: 'GeneratorIndex',
    data() {
      return {
        data:[],//表单数据
        searchForm:{
          name:'',
          page:1,
          size:10,
          sort:'id,desc'
        },
        columns:this.getUserColumns(),//表单列
        syncLoading: false,
        total:0,
        loading:false,
        colOptions:["表名","数据库引擎","用户字符编码集","备注","创建日期","操作"],
        colSelect:["表名","数据库引擎","用户字符编码集","备注","创建日期","操作"],
        selectCount: 0, // 多选计数
        openSearch:true,//搜索显示
        openTip:true,
        span: 18,
      }
    },
    mounted(){
      this.getDataList(); // 获取表单数据
    },
    methods: {
      toDownload(row){//下载
        // 打包下载
        generator(row.tableName, 2).then(data => {
          downloadFile(data, row.tableName, 'zip')
        });
      },
      toGen(row){//生成
        // 生成代码
        generator(row.tableName, 0).then(data => {
          this.$Message.success('生成成功');
        });
      },
      sync(){//同步
        const tables = []
        this.$refs.table.getSelection().forEach(val => {
          tables.push(val.tableName)
        })
        this.syncLoading = true
        sync(tables).then(() => {
          this.$Message.success('同步成功');
          // this.crud.refresh()
          // this.crud.notify('同步成功', CRUD.NOTIFICATION_TYPE.SUCCESS)
          this.syncLoading = false
        }).then(() => {
          this.syncLoading = false
        })
      },
      clearSelectAll(){//清空选择
        this.$refs.table.selectAll(false);
      },
      viewFrame(row){//查看
        this.$router.push({path:'/sys-tools/generator/preview/' + row.tableName});//跳转
      },
      editFrame(row){//编辑
        this.$router.push({path:'/sys-tools/generator/config/' + row.tableName});//跳转
      },
      handleReset(){//重置按钮
        this.$refs.searchForm.resetFields();
        this.searchForm.name = '';
        this.searchForm.page = 1;
        this.searchForm.size = 10;
        // 重新加载数据
        this.getDataList();
      },
      handleSearch(){//搜索按钮
        this.searchForm.page = 1;
        this.searchForm.size = 10;
        this.getDataList();
      },
      exportData(){//导出本页
        let excolumns = this.columns.filter(function(v){ return v.title!="操作" && v. type!= 'selection'});
        this.$refs.table.exportCsv({
          filename: '本页数据',
          columns: excolumns,
          data:this.data
        });
      },
      checkboxChange(data){//多选框
        var columnss =  this.getUserColumns();
        this.columns= columnss.filter(function(v){ return data.indexOf(v.title) > -1 || v. type== 'selection'});
      },
      changePage(v){//分页
        this.searchForm.page = v;
        this.getDataList();
      },
      changePageSize(v){//分页
        this.searchForm.size = v;
        this.getDataList();
      },
      changeSort(e){//当点击排序时触发
        this.searchForm.sort = e.key;
        this.searchForm.order = e.order;
        if (e.order == "normal") {
          this.searchForm.order = "";
        }
        this.getDataList();
      },
      showSelect(e){//表格选择框
        this.selectList = e;
        this.selectCount = e.length;
      },
      getDataList(){// 获取表单数据
        this.loading = true;
        queryTablesList({
          page:this.searchForm.page - 1,
          size:this.searchForm.size,
          sort:this.searchForm.sort,
          name:this.searchForm.name
        }).then(res => {
          this.loading = false;
          this.data = res.content;
          this.total = res.totalElements;
        })
      },
      initTableColumn(columnss){//title提示
        for (let i = 0; i < columnss.length; i++) {
          if ( columnss[i]. type!= 'selection' && columnss[i]. title!= '操作' && columnss[i]. title .indexOf("时间")==-1) {
            if(!columnss[i].render){
              this.$set(columnss[i], 'render', (h, params) => {
                return h('div', [
                  h('span', {
                    style: {
                      display: 'inline-block',
                      width: '100%',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    },
                    domProps: {
                      title: params.row[params.column.key]
                    }
                  }, params.row[params.column.key])
                ])

              });
            }
            this.$set(columnss[i], 'renderHeader', (h, params) => {
              return h('div', [
                h('span', {
                  style: {
                    display: 'inline-block',
                    width: '100%',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    marginBottom: '-6px'
                  },
                  domProps: {
                    title: params.column.title
                  }
                }, params.column.title)
              ])
            })
          }
        }
      },
      getUserColumns(){// 获取列表字段  表头
        var columnss = [
          {
            type: "selection",
            width: 60,
            sortable: true,
            align: "center"
          },
          {
            title: "表名",
            key:'tableName',
            sortable: true,
            align: "center"
          },
          {
            title: "数据库引擎",
            key: "engine",
            sortable: true,
            align: "center"
          },
          {
            title: "用户字符编码集",
            key: "coding",
            sortable: true,
            align: "center"
          },
          {
            title: "备注",
            key: "remark",
            sortable: true,
            align: "center"
          },
          {
            title: "创建日期",
            key: "createTime",
            sortable: true,
            align: "center",
            render:(h,params) => {
              return h("div"),[
                h("Time",{
                  props:{
                    type: "datetime",
                    time: params.row.createTime
                  }
                })
              ]
            }
          },
          {
            title: "操作",
            sortable: true,
            align: "center",
            slot: 'action'
          }
        ];
        this.initTableColumn(columnss);//title提示
        return columnss;
      },
    }
  }
</script>
