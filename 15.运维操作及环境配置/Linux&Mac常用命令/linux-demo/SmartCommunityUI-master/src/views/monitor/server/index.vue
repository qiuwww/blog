<template>
  <div class="app-container">
    <Card>
      <!--工具栏-->
      <Row v-show="openSearch" @keydown.enter.native="searchButton">
        <Form ref="searchForm" :model="query" inline :label-width="70">
          <Form-item label="搜索条件">
            <Input type="text" v-model="query.blurry" placeholder="输入名称或者服务器地址" clearable style="width: 200px" />
          </Form-item>
          <Form-item style="margin-left:-35px" class="br">
            <Button @click="searchButton" type="primary" icon="ios-search" :loading="searchLoading">搜索</Button>
            <Button @click="query.blurry=''">重置</Button>
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
            <DropdownItem name="delete" @click.native="downloadServer">
              <Icon type="md-arrow-down"></Icon>
              导出本页数据
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Button type="dashed" @click="openSearch=!openSearch">{{openSearch ? '关闭搜索' : '开启搜索'}}</Button>
        <Button type="dashed" @click="openTip=!openTip">{{openTip ? '关闭提示' : '开启提示'}}</Button>

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
        <Table :columns="columns" :data="tableData" :loading="tableLoading" ref="serverTable" v-if="isTableShow"
           @on-sort-change="changeSort" @on-selection-change="showSelect"
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
    <serverForm v-model="serverFormShow" :serverId="serverId" :modalTitle="modalTitle" :rowData="currentRow"
                v-on:getDataList="getDataList"/>
  </div>
</template>

<script>
  import {  del, queryServerList } from '@/api/monitor/server'
  import serverForm from './serverForm'
  export default {
    name: 'ServerMonitor',
    components: { serverForm },
    data() {
      return {
        //table列数据
        columns: this.getColumns(),
        //table数据加载条
        tableLoading:false,
        //搜索加载条
        searchLoading:false,
        //单挑删除加载条
        delOneLoading:false,
        //table是否展示（刷新时使用）
        isTableShow:true,
        //table数据
        tableData:[],
        //分页条件
        searchForm: {
          id:'',
          page: 0, // 当前页数
          size: 10, // 页面大小
          sort: 'sort,asc',//排序
        },
        //查询条件
        query:{
          //模糊查询条件
          blurry:'',
        },
        //总数据条数
        total:0,
        //搜索栏
        openSearch:true,
        //提示框
        openTip:true,
        //表单展示
        serverFormShow:false,
        //modal标题
        modalTitle:'',
        //当条数据id
        serverId:'',
        // 多选计数
        selectCount: 0,
        //默认全选
        colOptions: ["状态", "名称","地址","端口","CPU使用率", "CPU内核数","物理内存","磁盘使用情况","交换空间","操作"],
        colSelect: ["状态", "名称","地址","端口","CPU使用率", "CPU内核数","物理内存","磁盘使用情况","交换空间","操作"],
        currentRow:null,
        selectList:[],
      }
    },
    created() {
      //获取列表数据
      this.getDataList();
    },
    methods: {
      //获取列表数据
      getDataList(){
        var _this = this;
        _this.tableLoading = true;
        _this.searchForm.id = null;
        queryServerList(_this.searchForm).then(res => {
          _this.tableLoading = false;
          _this.tableData = res.content;
          _this.total = res.totalElements;
        });
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
            title: '状态',
            align: 'center',
            key: 'state',
            sortable: false,
            tooltip:true,
            width:50,
            render:(h, params) => {
              if(params.row.state){
                let icon = '';
                //成功图标
                if(params.row.state == '1' ){
                  icon="ios-checkmark-circle";
                }
                //失败图标
                if(params.row.state == '0'){
                  icon="ios-close-circle";
                }
                return h("Icon",{
                  props: {
                    type: icon,
                  },
                })
              }

            }
          },
          {
            title: '名称',
            align: 'center',
            key: 'name',
            sortable: false,
            tooltip:true,
          },
          {
            title: '地址',
            align: 'center',
            key: 'address',
            sortable: false,
            tooltip:true,
          },
          {
            title: '端口',
            align: 'center',
            key: 'port',
            sortable: false,
            tooltip:true,
            width:80,
          },
          {
            title: 'CPU使用率',
            align: 'center',
            key: 'cpuRate',
            sortable: false,
            width:100,
            tooltip:true,
            render:(h,params) =>{
              if(!params.row.cpuRate){
                return h("span",0)
              }else {
                return h("span",(Math.floor(params.row.cpuRate * 10000) / 100) + '%')
              }

            }
          },
          {
            title: 'CPU内核数',
            align: 'center',
            key: 'cpuCore',
            width:100,
            sortable: false,
            tooltip:true,
          },
          {
            title: '物理内存',
            align: 'center',
            key: 'memTotal',
            sortable: false,
            tooltip:true,
            render:(h, params) => {
              var _this = this;
              if(params.row.memTotal){
                return h("div", [
                  h("span",{
                    style:{
                    }
                  },_this.formatMem(params.row)),
                  h("Progress",{
                    props: {
                      percent: _this.percentNumber(params.row.memUsed,params.row.memTotal),
                      strokeWidth:5,
                      strokeColor:'#ff4949',
                      hideInfo:true,
                    },
                  })
                ])
              }
            }
          },
          {
            title: '磁盘使用情况',
            align: 'center',
            key: 'diskTotal',
            sortable: false,
            tooltip:true,
            render:(h, params) => {
              var _this = this;
              if(params.row.diskTotal){
                return h("div", [
                  h("span",{
                    style:{
                    }
                  },_this.formatDisk(params.row)),
                  h("Progress",{
                    props: {
                      percent: _this.percentNumber(params.row.diskUsed,params.row.diskTotal),
                      strokeWidth:5,
                      strokeColor:'#13ce66',
                      hideInfo:true,
                    },
                  })
                ])
              }
            }
          },
          {
            title: '交换空间',
            align: 'center',
            key: 'swapTotal',
            sortable: false,
            tooltip:true,
            render:(h, params) => {
              var _this = this;
              if(params.row.swapTotal){
                return h("div", [
                  h("span",{
                    style:{
                    }
                  },_this.formatSwap(params.row)),
                  h("Progress",{
                    props: {
                      percent: _this.percentNumber(params.row.swapUsed,params.row.swapTotal),
                      strokeWidth:5,
                      strokeColor:'#ffba00',
                      hideInfo:true,
                    },
                  })
                ])
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
        //  title提示
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
        if (_this.query.blurry) {
          data['blurry'] = _this.query.blurry;
        }
        queryServerList(data).then(res => {
          this.searchLoading = false;
          this.tableData = res.content;
          this.total = res.totalElements;
        });
      },
      //新增按钮
      addShowModal(){
        this.modalTitle = '新增';
        this.serverFormShow = true;
        this.currentRow = null;
        this.serverId='';
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
      //导出
      downloadServer(){

      },
      //动态列改变
      checkboxChange(data){
        var columnss =  this.getColumns();
        this.columns= columnss.filter(function(v){ return data.indexOf(v.title) > -1 || v. type== 'selection'})
      },
      //清空选择
      clearSelectAll() {
        this.$refs.serverTable.selectAll(false);
      },
      //点击编辑
      editShowModal(row, index){
        this.modalTitle = '编辑';
        this.serverId=row.id.toString();
        this.serverFormShow = true;
        this.currentRow = row;
      },
      //点击编辑
      lookShowModal(row, index){
        this.modalTitle = '查看';
        this.serverFormShow = true;
        this.currentRow = row;
      },
      //单一删除
      handleDel(row, index){
        var _this = this;
        this.$Modal.confirm({
          title:"确认删除",
          content: "您确认要删除所点击选的数据?",
          loading: true,
          onOk: () => {
            _this.delOneLoading = true;
            var ids = [];
            ids.push(row.id);
            _this.delServer(ids);
          },
          onCancel: () => {
            this.$Message.info('取消了当前的操作行为！');
          },
        });
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
      //处理百分比
      percentNumber(value, total) {
        if (!value || !total) {
          return 0
        }
        return value / total * 100
      },
      formatMem(row, column) {
        return this.convertToGb(row.memUsed) + ' / ' + this.convertToGb(row.memTotal)
      },
      formatDisk(row, column) {
        return this.convertToGb(row.diskUsed) + ' / ' + this.convertToGb(row.diskTotal)
      },
      formatSwap(row, column) {
        return this.convertToGb(row.swapUsed) + ' / ' + this.convertToGb(row.swapTotal)
      },
      convertToGb(num) {
        if (!num) {
          return '-'
        }
        let unit = 'G'
        if (num > 1024) {
          num = num / 1024
          unit = 'T'
        }
        num = Math.floor(num * 100) / 100
        return num + unit
      },
      formatCpuRate(row, column) {
        const value = row.cpuRate
        if (!value) {
          return 0
        }
        return (Math.floor(value * 10000) / 100) + '%'
      },
      percentStatus(value, total) {
        const percent = this.percentNumber(value, total)
        if (percent < 60) {
          return 'success'
        } else if (percent < 90) {
          return 'warning'
        } else {
          return 'exception'
        }
      },
    }
  }
</script>

<style scoped>
  .el-col {
    text-align: center;
  }
</style>
