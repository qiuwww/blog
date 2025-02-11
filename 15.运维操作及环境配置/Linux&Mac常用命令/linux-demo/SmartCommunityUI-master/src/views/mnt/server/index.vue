<template>
  <div class="search">
    <Card :padding="10">
      <Row type="flex" >
        <Col :span="span" style="width:100%;padding:0 10px;">
          <Row v-show="openSearch" @keydown.enter.native="handleSearch">
            <Form ref="searchForm" :model="searchForm" inline :label-width="85" style="margin-top:10px">
              <Form-item label="服务器名称" prop="blurry">
                <Input
                  type="text"
                  v-model="searchForm.blurry"
                  placeholder="请输入服务器名称"
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
            <Button @click="addServer" type="primary" icon="md-add">添加服务器</Button>
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

    <Modal :title="modalTitle" v-model="modalVisible" :mask-closable="false" :width="650">
      <Form ref="form" :model="form" :label-width="90" :rules="formValidate" inline :disabled="disabled">
        <FormItem label="服务器名" prop="name"  >
          <Input v-model="form.name" placeholder="请输入服务器名" type="text" :maxlength=50 style="width:190px" />
        </FormItem>
        <FormItem label="密码" prop="password"  >
          <Input type="password" v-model="form.password" placeholder="请输入密码" :maxlength=50 style="width:190px" />
        </FormItem>
        <FormItem label="IP地址" prop="ip" >
          <Input v-model="form.ip" placeholder="请输入IP地址" type="text" :maxlength=50 style="width:190px" />
        </FormItem>
        <FormItem label="端口" prop="port" >
          <InputNumber  v-model="form.port" placeholder="请输入端口" :max="65535" :min="0" style="width:190px"></InputNumber>
        </FormItem>
        <FormItem label="账号" prop="account" >
          <Input v-model="form.account" placeholder="请输入账号" type="text" :maxlength=50 style="width:190px" />
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
import { add,del,edit,queryServerList } from '@/api/mnt/serverDeploy'
export default {
  name: 'Server',
  data() {
    return {
      total: 0, // 表单数据总数
      searchForm:{//传输数据
        blurry:'',
        createTime:null,
        page:1,// 当前页数
        size: 10, // 页面大小
        sort: "name", // 默认排序字段
      },
      form:{
        id:0,
        name:'',
        password:'',
        ip:'',
        port:null,
        account:''
      },
      colOptions:["服务器名","IP","端口","账号","创建日期","操作"],
      colSelect:["服务器名","IP","端口","账号","创建日期","操作"],
      columns: this.getUserColumns(),//表单列
      data: [],//表单数据
      loading: false,//表单加载
      span: 18,
      openSearch: true,
      openTip: true,
      selectCount: 0, // 多选计数
      time:[],//时间选择器
      modalVisible:false,//弹窗显示
      modalTitle:'',//弹窗标题
      disabled:false,//输入框禁用
      formValidate:this.getFormValidate(),//表单验证
      showBtn:true,//提交按钮显示
      submitLoading:false,//加载
      createTime:[],
    }
  },
  mounted(){
    this.getDataList(); // 获取表单数据
  },
  methods: {
    selectDate(v){
      this.searchForm.createTime = v.join(",");
    },
    viewFrame(v){//查看窗口
      this.$refs.form.resetFields();
      this.modalTitle = '查看服务器';
      this.disabled = true;
      this.showBtn = false;
      this.changerData(v);
      this.modalVisible = true;
    },
    editFrame(v){//修改窗口
      this.$refs.form.resetFields();
      this.modalTitle = '修改服务器';
      this.modalType = 1;
      this.showBtn = true;
      this.disabled = false;
      this.changerData(v);
      this.modalVisible = true;
    },
    changerData(v){
      this.form.id = v.id;
      this.form.account = v.account;
      this.form.ip = v.ip;
      this.form.name = v.name;
      this.form.password = v.password;
      this.form.port = v.port;
    },
    remove(v){//删除
      this.$Modal.confirm({
        title: "确认删除",
        content: "您确认要删除?",
        loading: true,
        onOk: () => {// 删除
          let ids = [];
          ids.push(v.id);
          this.patchdeleteData(ids);
        }
      });
    },
    // 删除（后台）
    patchdeleteData(ids) {
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
    handelCancel(){//弹窗取消按钮
      this.modalVisible = false;
    },
    handelSubmit(){//弹窗提交按钮
      this.$refs.form.validate(valid => {//是否通过表单验证
        if(valid){
          this.submitLoading = true;
          // debugger;
          if (this.modalType == 0) {// 添加
            add(this.form).then(res =>{
              this.submitLoading = false;
              if(res){
                this.$Message.success("操作成功");
                this.getDataList();
                this.modalVisible = false;
              }
            });
          }else if (this.modalType == 1){//修改
            edit(this.form).then(res => {
              this.$Message.success("操作成功");
              this.submitLoading = false;
              this.modalVisible = false;
              this.getDataList();
            });
          }
        }
      })
    },
    addServer(){//添加按钮
      this.$refs.form.resetFields();
      this.modalTitle = '添加服务器';
      this.modalType = 0;
      this.showBtn = true;
      this.disabled = false;
      this.modalVisible = true;
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
    exportData(){//导出本页数据
      this.$refs.table.exportCsv({
					filename: '服务器信息表单',
					original: true,
					quoted:true
				});
    },
    clearSelectAll() {//清除所有选择
        this.$refs.table.selectAll(false);
    },
    handleSearch(){//搜索
      this.searchForm.page = 1;
      this.searchForm.size = 10;
      this.getDataList();
    },
    handleReset(){//重置
      this.$refs.searchForm.resetFields();
      this.createTime = '';
      this.searchForm.page = 1;
      this.searchForm.size = 10;
      // 重新加载数据
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
      if(this.searchForm.createTime == '' || this.searchForm.createTime == ','){
        this.searchForm.createTime = null;
      }
      queryServerList(this.searchForm).then(res => {
        this.loading = false;
        this.data = res.content;
        this.total = res.totalElements;
      })
    },
    getFormValidate(){//表单验证
      return {
        name: [
          { required: true, message: '服务器名不能为空！', trigger: 'blur' },
          { type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空！', trigger: 'blur' },
          { type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur' }
        ],
        ip: [
          { required: true, message: 'ip地址不能为空！', trigger: 'blur' },
          { type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur' }
        ],
        port: [
          { type: 'number', required: true, message: '端口不能为空！', trigger: 'blur' }
        ],
        account: [
          { required: true, message: '账号不能为空！', trigger: 'blur' },
          { type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur' }
        ]
      }
    },
    checkboxChange(data){//动态列
      var columnss =  this.getUserColumns();
      this.columns= columnss.filter(function(v){ return data.indexOf(v.title) > -1 || v. type== 'selection'});
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
            title: "服务器名",
            key:'name',
            sortable: true,
            align: "center"
        },
        {
            title: "IP",
            key: "ip",
            sortable: true,
            align: "center"
        },
        {
            title: "端口",
            key: "port",
            sortable: true,
            align: "center"
        },
        {
            title: "账号",
            key: "account",
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
      this.initTableColumn(columnss);//动态列
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
    }
  }
}
</script>

<style lang="less" scoped>

</style>
