<template>
  <div class="search">
    <Card :padding="10">
      <Row type="flex" >
        <Col :span="span" style="width:100%;padding:0 10px;">
          <Row v-show="openSearch" @keydown.enter.native="handleSearch">
            <Form ref="searchForm" :model="searchForm" inline :label-width="85" style="margin-top:10px">
              <Form-item label="数据库名称" prop="name">
                <Input
                  type="text"
                  v-model="searchForm.name"
                  placeholder="请输入数据库名称"
                  clearable
                  style="width: 200px"
                />
              </Form-item>
              <Form-item label="日期" prop="createTime" :label-width="50">
                <DatePicker type="datetimerange" format="yyyy-MM-dd HH:mm:ss" :editable="false" v-model="createTime" @on-change="selectDate" placement="bottom-end" placeholder="开始时间 - 结束时间"></DatePicker>
              </Form-item>
              <Form-item style="margin-left:-35px;" class="br">
                <Button @click="handleSearch" type="primary" icon="ios-search">搜索</Button>
                <Button @click="handleReset">重置</Button>
              </Form-item>
            </Form>
          </Row>

          <Row class="operation">
            <Button @click="addDb" type="primary" icon="md-add">添加数据库</Button>
            <Dropdown>
                <Button>
                    更多操作
                    <Icon type="md-arrow-dropdown" />
                </Button>
                <DropdownMenu slot="list">
                    <DropdownItem @click.native="getDataList"><Icon type="md-sync" style="margin-right:5px" />刷新</DropdownItem>
                    <DropdownItem @click.native="delAll"><Icon type="md-trash" style="margin-right:5px"/>批量删除</DropdownItem>
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

          <Row v-show="openTip" style="margin-top:9px">
            <Alert show-icon>
              已选择
              <span class="select-count">{{selectCount}}</span> 项
              <a class="select-clear" @click="clearSelectAll">清空</a>
            </Alert>
          </Row>

          <!-- 表单 -->
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
                          <DropdownItem @click.native="editFrame(row,index)"><Icon type="ios-create-outline" style="margin-right: 5px;"/>修改</DropdownItem>
                          <DropdownItem @click.native="remove(row,index)"><Icon type="md-trash" style="margin-right: 5px;"/>删除</DropdownItem>
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

    <Modal :title="modalTitle" v-model="modalVisible" :mask-closable="false" :width="700">
      <Form ref="form" :model="form" :label-width="100" :rules="formValidate" :disabled="disabled" class="database">
        <FormItem label="连接名称" prop="name"  >
          <Input v-model="form.name" placeholder="请输入连接名称" type="text" :maxlength=50 style=""/>
        </FormItem>
        <FormItem label="JDBC地址" prop="jdbcUrl"  >
              <Input v-model="form.jdbcUrl" placeholder="请输入JDBC地址" type="text" :maxlength=200 >
                <Button slot="append" @click="textDb">测试</Button>
              </Input>
        </FormItem>
        <FormItem label="用户" prop="userName" >
          <Input v-model="form.userName" placeholder="请输入用户" type="text" :maxlength=50 />
        </FormItem>
        <FormItem label="密码" prop="pwd" >
          <Input  v-model="form.pwd" placeholder="请输入密码" type="password" :maxlength=50 />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="handelCancel">取消</Button>
        <Button type="primary" :loading="submitLoading" v-if="showBtn" @click="handelSubmit">提交</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { add,edit,del,queryDbList,testDbConnection } from '@/api/mnt/database'
export default {
  name: 'DataBase',
  data() {
    return {
      openSearch:true,//搜索显示
      createTime:'',//时间
      span: 18,
      openTip:true,
      colOptions:["数据库名称","连接地址","用户名","创建时间","操作"],
      colSelect:["数据库名称","连接地址","用户名","创建时间","操作"],
      selectCount: 0, // 多选计数
      searchForm:{
        name:'',
        jdbcUrl:'',
        createTime:null,
        page: 1,// 当前页数
        size: 10, // 页面大小
        sort: "name", // 默认排序字段
      },
      form:{
        id:null,
        name:'',
        jdbcUrl:'',
        userName:'',
        pwd:''
      },
      formValidate:this.getFormValidate(),//表单验证
      submitLoading:false,//加载
      loading:false,//表单加载
      columns:this.getUserColumns(),//表单列
      data:[],//表单数据
      total:0,
      modalVisible:false,//弹窗显示
      modalTitle:'',//标题
      disabled:false,//输入框禁用
      showBtn:true,//表单的提交按钮
    }
  },
  mounted(){
    this.getDataList(); // 获取表单数据
  },
  methods: {
    textDb(){//测试
      testDbConnection(this.form).then(res => {
        if(res){
          this.$Message.success('连接成功');
        }else{
          this.$Message.error('连接失败');
        }
      })
    },
    handelSubmit(){//提交按钮
      this.$refs.form.validate(valid => {//是否通过表单验证
        if(valid){
          this.submitLoading = true;
          if(this.modalTitle == "添加数据库"){
            add(this.form).then(res => {
              this.submitLoading = false;
              if(res){
                this.$Message.success("添加成功");
                this.getDataList();
                this.modalVisible = false;
              }else {
                this.$Message.success("添加失败");
              }
            })
          }else if(this.modalTitle == "修改数据库"){
            edit(this.form).then(res => {
              this.submitLoading = false;
              this.$Message.success("修改成功");
              this.getDataList();
              this.modalVisible = false;
            })
          }
        }
      });
    },
    selectDate(v){//时间选择
      this.searchForm.createTime = v.join(",");
    },
    handleSearch(){//搜索按钮
      this.searchForm.page = 1;
      this.searchForm.size = 10;
      this.getDataList();
    },
    handleReset(){//重置按钮
      this.$refs.searchForm.resetFields();
      this.createTime = '';
      this.searchForm.page = 1;
      this.searchForm.size = 10;
      // 重新加载数据
      this.getDataList();
    },
    handelCancel(){//弹窗中的取消按钮
      this.modalVisible = false;
    },
    viewFrame(v){//查看按钮
      this.$refs.form.resetFields();
      this.initData(v);
      this.modalTitle = '查看数据库';
      this.showBtn = false;
      this.disabled = true;
      this.modalVisible = true;
    },
    editFrame(v){//修改按钮
      this.$refs.form.resetFields();
      this.initData(v);
      this.modalTitle = '修改数据库';
      this.showBtn = true;
      this.disabled = false;
      this.modalVisible = true;
    },
    initData(v){
      this.form.id = v.id;
      this.form.name = v.name;
      this.form.jdbcUrl = v.jdbcUrl;
      this.form.userName = v.userName;
      this.form.pwd = v.pwd;
    },
    addDb(){//添加数据库按钮
      this.$refs.form.resetFields();
      this.modalTitle = '添加数据库';
      this.showBtn = true;
      this.disabled = false;
      this.modalVisible = true;
    },
    remove(v){//单一删除
      this.$Modal.confirm({
        title: "确认删除",
        content: "您确认要删除?",
        loading: true,
        onOk: () => {
          let ids = [];
          ids.push(v.id);
          this.patchdeleteData(ids);
        }
      });
    },
    delAll(){//批量删除
      if (this.selectCount <= 0) {
        this.$Message.warning("您还未选择要删除的数据");
        return;
      }
      this.$Modal.confirm({
        title: "确认删除",
        content: "您确认要删除所选的 " + this.selectCount + " 条数据?",
        loading: true,
        onOk: () => {
          let ids = [];
          this.selectList.forEach(function(e) {
            ids.push(e.id);
          });
          this.patchdeleteData(ids);
        }
      });
    },
    patchdeleteData(ids) {//删除
      if (ids == undefined || ids == null || ids.length == 0) {
        this.$Message.error('没有选择的数据');
          return;
      }
      del(ids).then(res => {
        this.$Modal.remove();
        this.$Message.success('删除成功');
        this.clearSelectAll();//清空所有的选择
        this.getDataList();
      });
    },
    exportData(){//导出本页数据
      this.$refs.table.exportCsv({
        filename: '数据库信息表单',
        original: true,
        quoted:true
      });
    },
    clearSelectAll(){//清空所有
      this.$refs.table.selectAll(false);
    },
    getDataList(){// 获取表单数据
      this.loading = true;
      this.searchForm.id = null;
      if(this.searchForm.createTime == '' || this.searchForm.createTime == ','){
        this.searchForm.createTime = null;
      }
      queryDbList(this.searchForm).then(res => {
        this.loading = false;
        this.data = res.content;
        this.total = res.totalElements;
      })
    },
    changeSort(e){//当点击排序时触发
      this.searchForm.sort = e.key;
      this.searchForm.order = e.order;
      if (e.order == "normal") {
          this.searchForm.order = "";
      }
      this.getDataList();
    },
    changePage(v){//分页
      this.searchForm.page = v;
      this.getDataList();
    },
    changePageSize(v){//分页
      this.searchForm.size = v;
      this.getDataList();
    },
    showSelect(e){//表格选择框
      this.selectList = e;
      this.selectCount = e.length;
    },
    checkboxChange(data){//动态列
      var columnss =  this.getUserColumns();
      this.columns= columnss.filter(function(v){ return data.indexOf(v.title) > -1 || v. type== 'selection'});
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
            title: "数据库名称",
            key:'name',
            sortable: true,
            align: "center"
        },
        {
            title: "连接地址",
            key: "jdbcUrl",
            sortable: true,
            align: "center"
        },
        {
            title: "用户名",
            key: "userName",
            sortable: true,
            align: "center"
        },
        {
            title: "创建时间",
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
    getFormValidate(){//表单验证
      return {
        name: [
          { required: true, message: '连接名称不能为空！', trigger: 'blur' },
          { type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur' }
        ],
        jdbcUrl: [
          { required: true, message: 'JDBC地址不能为空！', trigger: 'blur' },
          { type: 'string', max: 200, message: '数据的最大长度为200！', trigger: 'blur' }
        ],
        userName: [
          { required: true, message: '用户不能为空！', trigger: 'blur' },
          { type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur' }
        ],
        pwd: [
          { required: true, message: '密码不能为空！', trigger: 'blur' },
          { type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur' }
        ]
      }
    }
  }
}
</script>

<style lang="less" scoped>
.database{
  .ivu-input-wrapper{
    width: 100% !important;
  }
}
</style>
