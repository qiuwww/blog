<template>
  <div class="app-container" style="padding: 8px;">

    <Card>
      <!--工具栏-->
      <Row v-show="openSearch" @keydown.enter.native="searchButton">
        <Form ref="searchForm" :model="query" inline :label-width="70">
          <Form-item label="搜索条件">
            <Input type="text" v-model="query.appName" placeholder="输入应用名称查询" clearable style="width: 200px" />
          </Form-item>
          <Form-item label="创建时间">
            <DatePicker v-model="query.createTime" type="daterange" format="yyyy-MM-dd"
                        show-week-numbers placement="bottom-end" placeholder="开始日期 -- 结束日期"
                        style="width: 205px"></DatePicker>
          </Form-item>
          <Form-item style="margin-left:-35px" class="br">
            <Button @click="searchButton" type="primary" icon="ios-search" :loading="searchLoading">搜索</Button>
            <Button @click="resetButton">重置</Button>
          </Form-item>
        </Form>
      </Row>
      <Row class="operation" style="margin-top: 10px">
        <Button @click="addShowModal" type="primary" icon="md-add">新增</Button>
        <Dropdown :transfer=true>
          <Button>
            更多操作
            <Icon type="md-arrow-dropdown"/>
          </Button>
          <DropdownMenu slot="list">
            <DropdownItem name="edit" @click.native="getDataList">
              <Icon type="md-sync"></Icon>
              刷新
            </DropdownItem>
            <DropdownItem name="delete" @click.native="delAll">
              <Icon type="md-trash"></Icon>
              批量删除
            </DropdownItem>
            <!--            <DropdownItem name="delete" @click.native="downloadServer">-->
            <!--              <Icon type="md-arrow-down"></Icon>-->
            <!--              导出本页数据-->
            <!--            </DropdownItem>-->
          </DropdownMenu>
        </Dropdown>
        <Button type="dashed" @click="openSearch=!openSearch">{{openSearch ? '关闭搜索' : '开启搜索'}}</Button>
        <Button type="dashed" @click="openTip=!openTip">{{openTip ? '关闭提示' : '开启提示'}}</Button>
<!--        <Icon type="ios-cloud-upload" />-->
        <Button style="margin-left: 30px" v-if="rowId" @click="sysRestore" type="info" icon="ios-cloud-upload">系统还原</Button>
        <Button style="margin-left: 5px" v-if="rowId" @click="stateSearch" type="info" icon="ios-cloud-upload">状态查询</Button>
        <Button style="margin-left: 5px" v-if="rowId" @click="startButton" type="success" icon="ios-cloud-upload">启动</Button>
        <Button style="margin-left: 5px" v-if="rowId" @click="stopButton" type="error" icon="ios-cloud-upload">停止</Button>
        <Button style="margin-left: 5px" v-if="rowId" @click="deployButton" type="warning" icon="ios-cloud-upload">一键部署</Button>


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
      <!--提示-->
      <Row v-show="openTip" style="margin-top: 10px">
        <Alert show-icon>
          已选择
          <span class="select-count">{{selectCount}}</span> 项
          <a class="select-clear" @click="clearSelectAll">清空</a>
          <span style="float: right;">点击右上角按钮配置动态列↑</span>
        </Alert>
      </Row>
      <!--table-->
      <Row style="margin-top: 10px">
        <Table :columns="columns" :data="tableData" :loading="tableLoading" ref="table"
               @on-sort-change="changeSort" @on-selection-change="showSelect" :highlight-row="true"
               @on-row-click="clickTable"
        >
          <template slot-scope="{ row, index }" slot="action">
            <Button type="primary" @click="lookShowModal(row, index)" size="small">
              <Icon type="ios-eye-outline"/>
              查看
            </Button>
            <Dropdown :transfer=true>
              <Button size="small">
                更多操作
                <Icon type="md-arrow-dropdown"/>
              </Button>
              <DropdownMenu slot="list">
                <DropdownItem name="edit" @click.native="editShowModal(row, index)">
                  <Icon type="ios-create-outline"/>
                  修改
                </DropdownItem>
                <DropdownItem name="delete" @click.native="handleDel(row, index)" :loading="delOneLoading">
                  <Icon type="md-trash"></Icon>
                  删除
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </template>
        </Table>
      </Row>
      <!--分页组件-->
      <Row type="flex" justify="end" class="page">
        <!--分页组件-->
        <Page :current="searchForm.page+1" :total="total"
              :page-size="searchForm.size"
              @on-change="changePage"
              @on-page-size-change="changePageSize"
              :page-size-opts="[10,20,50,100]" size="small"
              show-total show-elevator show-sizer transfer>
        </Page>
      </Row>
    </Card>
    <!--表单组件-->
    <updateForm v-model="updateForm"  :modalTitle="modalTitle" :rowData="currentRow"
                v-on:getDataList="getDataList"/>
    <!-- 系统还原 -->
    <sysRestore v-model="sysRestoreShow"  :currentId="rowId" :sysRestoreData="sysRestoreData"></sysRestore>

    <!-- 上传 -->
    <deploy v-model="deployShow"  :currentId="rowId" ></deploy>
  </div>

</template>

<script>
  import {queryDeployList,del,deployHistory,serverStatus,startServer,stopServer} from '@/api/mnt/deploy'
  // import {queryLocalStorageList,del} from '@/api/tools/localStorage'
  import { formartDate , nginxUrl } from '@/api/tools/tool'
  import updateForm from './form'
  import sysRestore from './sysRestore'
  import deploy from './deploy'

  export default {
    components: { updateForm ,sysRestore,deploy},
    data() {
      return {
        deployShow:false,
        //搜索栏
        openSearch:true,
        //提示框
        openTip:true,
        //搜索加载条
        searchLoading:false,
        //查询条件
        query:{
          //模糊查询条件
          appName:'',
          //创建时间
          createTime:[],
        },
        // 多选计数
        selectCount: 0,
        //默认全选
        colOptions: ["应用名称", "服务器列表","部署日期"],
        colSelect: ["应用名称", "服务器列表","部署日期"],
        currentRow:null,
        selectList:[],
        //table列数据
        columns: this.getColumns(),
        //table数据
        tableData:[],
        //table数据加载条
        tableLoading:false,
        //分页条件
        searchForm: {
          id:'',
          page: 0, // 当前页数
          size: 10, // 页面大小
          sort: 'id,desc',//排序
        },
        //总数据条数
        total:0,
        //单挑删除加载条
        delOneLoading:false,
        //表单页面展示
        updateForm:false,
        //应用集合
        apps: [],
        //服务器集合
        deploys:[],
        //当前行
        currentRow:null,
        modalTitle:'',
        //系统还原
        sysRestoreShow:false,
        rowId:null,
        sysRestoreData:{},
        rowIndex:'',
        rowData:{},

      }
    },
    mounted() {
      //获取列表数据
      this.getDataList();
    },
    methods: {
      //部署按钮
      deployButton(){
        this.deployShow=true;
      },
      //停止按钮
      stopButton(){
        stopServer().then(res => {
        })
      },
      //开始按钮
      startButton(){
        startServer().then(res => {
        })
      },
      //状态查询
      stateSearch(){
        if(this.rowData){
          serverStatus(this.rowData).then(res => {
          })
        }
      },
      //系统还原
      sysRestore(){
        this.sysRestoreShow=true
      },
      //获取列表数据
      getDataList(){
        var _this = this;
        _this.tableLoading = true;
        _this.searchForm.id = null;
        queryDeployList(_this.searchForm).then(res => {
          _this.tableLoading = false;
          _this.tableData = res.content;
          _this.total = res.totalElements;
        });
      },
      //查询按钮
      searchButton: function () {
        var _this = this;
        //加载条
        _this.searchLoading=true;
        //拼装查询条件
        var data = {
          'page': _this.searchForm.page,
          'size': _this.searchForm.size,
          'sort': _this.searchForm.sort,
        };
        if (_this.query.appName) {
          data['appName'] = _this.query.appName;
        }
        if (_this.query.createTime && (_this.query.createTime[0] || _this.query.createTime[1])) {
          //拼接时间数组格式
          var startDate = formartDate(_this.query.createTime[0],"yyyy-MM-dd HH:mm:ss");
          var endDate = formartDate(_this.query.createTime[1],"yyyy-MM-dd HH:mm:ss");
          //处理结束时间
          endDate =  endDate.replace("00:00:00", "23:59:59");
          var temp = startDate+','+endDate;
          data.createTime = temp;
        }
        queryDeployList(data).then(res => {
          this.searchLoading = false;
          this.tableData = res.content;
          this.total = res.totalElements;
        });
      },
      //单击table行
      clickTable(row,index){
        var _this = this;
        _this.rowData = row;
        _this.rowId = row.id;
        var data = {
          'page': 0,
          'size': 10,
          'sort': 'deployDate,desc',
          'deployId':row.id
        };
        deployHistory(data).then(res =>{
          this.sysRestoreData=res;
        })
      },

      //新增按钮
      addShowModal(){
        this.modalTitle = '新增';
        this.updateForm = true;
        this.currentRow = null;
      },
      //编辑
      editShowModal(row, index){
        this.modalTitle = '编辑';
        this.updateForm = true;
        this.currentRow = row;
      },
      lookShowModal(row, index){
        this.modalTitle = '查看';
        this.updateForm = true;
        this.currentRow = row;

      },
      //重置按钮
      resetButton(){
        this.query.appName='';
        this.query.createTime='';
      },
      //多选删除
      delAll(){
        if(this.selectCount <= 0) {
          this.$Message.warning('您还未选择要删除的数据');
          return;
        }
        this.$Modal.confirm({
          title: '确认删除',
          content: '您确认要删除所选的 ' + this.selectCount + '条数据?',
          loading: true,
          onOk: () => {
            let ids =[];
            this.selectList.forEach(function(e) {
              ids.push(e.id );
            });
            this.delServer(ids);
          },
          onCancel: () => {
            this.$Message.info('取消了当前的操作行为！');
          }
        });
      },

      //动态列改变
      checkboxChange(data){
        var columnss =  this.getColumns();
        this.columns= columnss.filter(function(v){ return data.indexOf(v.title) > -1 || v. type== 'selection'})
      },
      //清空选择
      clearSelectAll() {
        this.$refs.localFileTable.selectAll(false);
      },
      //表格列数据
      getColumns(){
        let columnss = [
          {
            type: 'selection',
            width: 60,
            align: 'center',
          },
          {
            title: '应用名称',
            align: 'center',
            key: 'app',
            sortable: false,
            tooltip:true,
            render:(h,params) => {
              if(params.row.app){
                return h("span",params.row.app.name )
              }
            }
          },
          {
            title: '服务器列表',
            align: 'center',
            key: 'servers',
            sortable: false,
            tooltip:true,
          },
          {
            title: '部署日期',
            align: 'center',
            key: 'createTime',
            sortable: false,
            tooltip:true,
            render:(h,params) => {
              if(params.row.createTime){
                return h("span",formartDate(params.row.createTime,'yyyy年MM月dd日'))
              }
            }
          },
          {
            title:'操作',
            align: 'center',
            slot: 'action',
            fixed: "right",
            width: 200,
          }
        ];
        this.initTableColumn(columnss);
        return columnss;
      },
      //title提示
      initTableColumn(columnss) {
        for (let i = 0; i < columnss.length; i++) {
          if ( columnss[i]. type!= 'selection' && columnss[i]. title!= '操作' && columnss[i]. title .indexOf("时间")==-1) {
            if(!columnss[i].render){
              this.$set(columnss[i], 'render', (h, params) => {
                return h('div', [
                  h('span', {
                    style: {
                      display: 'block',
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
      //删除（后台）
      delServer(ids) {
        var _this = this;
        if (ids == undefined || ids == null || ids.length == 0) {
          this.$Message.error('没有选择的数据');
          return;
        }
        del(ids).then(res => {
          _this.delOneLoading = true;
          _this.$Modal.remove();
          if (!res) {
            _this.$Message.success('删除成功');
            _this.getDataList();
          } else {
            _this.$Message.error('删除失败');
          }
        });
      },
      //改变排序方式
      changeSort(e) {
        this.searchForm.sort = e.key;
        this.searchForm.order = e.order;
        if(e.order == 'normal') {
          this.searchForm.order = '';
        }
        this.getDataList();
      },
      //显示选择
      showSelect(e) {
        this.selectList = e;
        this.selectCount = e.length;
      },
      //改变页码
      changePage(v) {
        this.searchForm.page = v-1;
        this.getDataList();
        this.clearSelectAll();
      },
      //改变每页显示数据的条数
      changePageSize(v) {
        this.searchForm.size = v;
        this.getDataList();
      },


    },
  }
</script>

