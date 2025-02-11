<template>
  <div class="app-container">
    <!--工具栏-->
    <Card>
      <Row v-show="openSearch" @keydown.enter.native="searchButton">
        <Form ref="searchForm" :model="query" inline :label-width="70" onSubmit="return false">
          <Form-item label="搜索条件">
            <Input type="text" v-model="query.blurry" placeholder="输入名称或者描述搜索" clearable style="width: 200px" />
          </Form-item>
          <Form-item label="创建时间">
            <DatePicker v-model="query.createTime" type="daterange" format="yyyy-MM-dd"
                        show-week-numbers placement="bottom-end" placeholder="开始日期 -- 结束日期"
                        style="width: 205px"></DatePicker>
          </Form-item>
          <Form-item style="margin-left:-35px" class="br">
            <Button @click="searchButton" type="primary" icon="ios-search">搜索</Button>
            <Button @click="resetButton">重置</Button>
          </Form-item>
        </Form>
      </Row>
      <Row class="operation">
        <Button @click="showModalFunction" type="primary" icon="md-add">新增</Button>
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
            <DropdownItem name="delete" @click.native="downloadRoles">
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
      <Row v-show="openTip" style="margin-top: 9px">
        <Alert show-icon>
          已选择
          <span class="select-count">{{selectCount}}</span> 项
          <a class="select-clear" @click="clearSelectAll">清空</a>
          <span style="float: right;">点击右上角按钮配置动态列↑</span>
        </Alert>
      </Row>
      <Row :gutter="15" style="margin-top: 9px">
        <!--角色管理-->
        <Col :xs="24" :sm="24" :md="16" :lg="16" :xl="17" style="margin-bottom: 10px">
          <Card class="box-card" >
            <div slot="title" class="clearfix" style="height: 32px" >
              <span class="role-span">角色列表</span>
            </div>
            <Row>
              <Table :columns="columns" :data="tableData" :loading="loading" ref="roleTable"
                     @on-row-click="handleCurrentChange" @on-sort-change="changeSort"
                     @on-selection-change="showSelect" v-if="isTableShow">
                <template slot-scope="{ row, index }" slot="action">
                  <Button type="primary" @click="handleEdit(row, index)" size="small">
                    <Icon type="ios-eye-outline"/>
                    查看
                  </Button>
                  <Dropdown :transfer=true>
                    <Button size="small">
                      更多操作
                      <Icon type="md-arrow-dropdown"/>
                    </Button>
                    <DropdownMenu slot="list">
                      <DropdownItem name="edit" @click.native="handleEdit(row, index)">
                        <Icon type="ios-create-outline"/>
                        修改
                      </DropdownItem>
                      <DropdownItem name="edit" @click.native="handleService(row, index)">
                        <Icon type="ios-create-outline"/>
                        服务权限
                      </DropdownItem>
                      <DropdownItem name="delete" @click.native="handleDel(row, index)">
                        <Icon type="md-trash"></Icon>
                        删除
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </template>
              </Table>
            </Row>
            <Row>
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
        </Col>
        <!-- 菜单授权 -->
        <Col :xs="24" :sm="24" :md="8" :lg="8" :xl="7" >
          <Card class="box-card" >
            <div slot="title" class="clearfix">
              <Tooltip class="item"  content="选择指定角色分配菜单" placement="top">
                <span class="role-span">菜单分配</span>
              </Tooltip>
              <!--            :disabled="!showButton"  v-permission="['admin','roles:edit']"-->
              <Button
                :loading="menuLoading"
                :disabled="!showButton"
                icon="el-icon-check"
                size="default"
                style="float: right; padding: 6px 9px"
                type="primary"
                @click="saveMenu"
              >保存</Button>
            </div>
            <!--          @on-check-change="checkChange" @on-select-change="selectChange"-->
            <Tree :data="menus" :show-checkbox="true"
                  ref="menu" v-if="isRouterAlive" class="rightCol" v-loading="treeLoading"></Tree>
          </Card>
        </Col>
      </Row>
    </Card>
    <!-- 表单渲染 -->
    <Modal v-model="showModal" width="520px" :title="title" :mask-closable="false">
      <Form ref="form" :model="form" :rules="rules"  :label-width="80">
        <Row>
          <Col span="12">
            <FormItem label="角色名称" prop="name">
              <Input v-model="form.name" style="width: 145px;" />
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="角色权限" prop="permission">
              <Input v-model="form.permission" style="width: 145px;" />
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem :label="label.dataScope" >
              <Select v-model="form.dataScope" style="width: 145px" placeholder="请选择数据范围" @change="changeScope">
                <Option
                  v-for="(item, i)  in dateScopes"
                  :key="item"
                  :label="item"
                  :value="item"
                />
              </Select>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem :label="label.level" >
              <InputNumber v-model="form.level" style="width: 145px;"></InputNumber>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="24">
            <FormItem v-if="form.dataScope === '自定义'" :label="label.depts">
              <!--            <Select v-model="form.depts" :options="depts" multiple  placeholder="请选择" />-->
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="24">
            <FormItem :label="label.remark" >
              <Input v-model="form.remark" style="width: 390px;" :rows="2" type="textarea" />
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div slot="footer" class="dialog-footer">
        <Button type="text" @click="showModal=false">取消</Button>
        <Button type="primary" :loading="addButtonLoading" @click="addRole">
          <span v-if="!addButtonLoading">确认</span>
          <span v-else>Loading...</span>
        </Button>
      </div>
    </Modal>

    <!-- 服务权限 -->
    <Modal v-model="showService" width="520px" :title="title" :mask-closable="false" @on-ok="updataAuthority">
      <Tree :data="pidPriority" show-checkbox ref="tree" :render="renderContent" :loading="treeLoading"></Tree>
    </Modal>
  </div>
</template>

<script>
  import {queryRoleList,getLevel,add,edit,del,editMenu,get,downloadRoles} from '@/api/system/role'
  import { getDepts } from '@/api/system/dept'
  import { getMenusTree } from '@/api/system/menu'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  import { formartDate } from '@/api/tools/tool'
  import { downloadFile } from '@/utils/index'
  import {queryTDataServiceList,updateAuthority} from '@/api/zhgw/tDataService/tDataService'

  export default {
    name: 'Role',
    data() {
      return {
        //表格列
        columns:this.getColumns(),
        //分页查询条件
        searchForm: {
          // 搜索框对应data对象
          id:'',
          page: 0, // 当前页数
          size: 10, // 页面大小
          sort: 'level,asc',//排序
        },
        //表格数据
        tableData:[],
        //总条数
        total:0,
        //表格加载条
        loading:false,
        //树状菜单数据
        menus: [],
        //展示Modal
        showModal:false,
        //Modal标题
        title:'',
        //表单字段
        form:{
          id:'',
          //角色名称
          name:'',
          //角色权限
          permission:'',
          //数据范围
          dataScope:'',
          //角色级别
          level:3,
          //描述信息
          remark:'',
        },
        label: {
          dataScope: '\xa0\xa0\xa0' + '数据范围',
          level: '\xa0\xa0\xa0' + '角色级别',
          remark: '\xa0\xa0\xa0' + '描述信息',
          depts: '\xa0\xa0\xa0' + '数据权限',
        },
        //新增保存按钮加载条
        addButtonLoading:false,
        //删除按钮加载条
        delButtonLoading:false,
        //删除确认弹框
        delModalShow:false,
        //待删除id
        ids:[],
        //查询条件
        query:{
          //模糊查询条件
          blurry:'',
          //创建时间
          createTime:[],
        },
        //菜单树保存按钮
        showButton: false,
        //菜单树保存按钮 加载
        menuLoading: false,
        //刷新tree
        isRouterAlive: true,
        //刷新table
        isTableShow: true,
        //部门数据getCheckedNodes
        depts: [],
        //当前行id
        currentId: 0,
        level: 3,
        //数据范围
        dateScopes: ['全部', '本级', '自定义'],
        //表单验证规则
        rules: {
          name: [
            { required: true, message: '请输入名称', trigger: 'blur' }
          ],
          permission: [
            { required: true, message: '请输入权限', trigger: 'blur' }
          ]
        },
        downloadTitle:"角色数据",
        // 多选计数
       selectCount: 0,
        // 多选数据
        selectList: [],
        //打开搜索
        openSearch: true,
        //打开提示
        openTip: true,
        //默认全选
        colOptions: ["名称", "数据权限","角色权限","角色级别","描述", "创建日期","操作"],
        colSelect: ["名称", "数据权限","角色权限","角色级别","描述", "创建日期","操作"],
        showService:false,
        pidPriority:[],
        treeLoading:false,
      }
    },
    created() {
      //获取表格数据
      this.getDataList();
      this.getMenus();
      getLevel().then(data => {
        this.level = data.level
      });
    },
    methods: {
      //树控件 图标
      renderContent(h, {root, node, data}) {
          let icon = "";
          if (data.level == 1) {
              icon = "md-list-box";
          } else if (data.level == 2) {
              icon = "md-list";
          } else if (data.level >=3) {
              icon = "md-radio-button-on";
          } else {
              icon = "md-radio-button-off";
          }
          return h("span", [
              h("span", [
                  h("Icon", {
                      props: {
                          type: icon,
                          size: "16"
                      },
                      style: {
                          "margin-right": "8px",
                          "margin-bottom": "3px"
                      }
                  }),
                  h("span", data.name)
              ])
          ]);
      },
      //服务权限确定事件
      updataAuthority(){
        let roleId = this.form.id;
        let terrArr = this.$refs.tree.getCheckedNodes();
        let arr = [];
        terrArr.forEach(item => {
          arr.push(item.id);
        });
        updateAuthority({roleId:roleId,serviceId:JSON.stringify(arr)}).then(res => {
          if(res && res.success){
            this.$Message.success(res.msg);
          }
        })
      },
      //初始化树结构
			getTreeData(data){
				if (data) {
					for (let i in data) {
						var item = data[i];
						data[i].title = data[i].name;
						data[i].value = data[i].id;
            data[i].expand = false;
            data[i].checked = data[i].pick;
						if (data[i].children) {
							data[i].children = this.getTreeData(data[i].children);
						}
					}
				}
				return data;
			},
      //初始化树数据
			initTree(){
				queryTDataServiceList({tDataService:this.searchForm,roleId:this.form.id}).then(res => {
					if(res && res.success) {
						this.pidPriority = this.getTreeData(res.data.records);
					}
				});
			},
      //分页查询
      getDataList() {
        this.loading = true;
        this.searchForm.id = null;
        queryRoleList(this.searchForm).then(res => {
          this.loading = false;
          res.content.forEach(function (item , index) {
            item.createTime = formartDate(item.createTime,"yyyy年mm月dd日")
          });
          this.tableData = res.content;
          this.total = res.totalElements;
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
            title: '名称',
            align: 'center',
            key: 'name',
            sortable: false,
            tooltip:true,
          },
          {
            title: '数据权限',
            align: 'center',
            key: 'dataScope',
            sortable: false,
            tooltip:true,
          },
          {
            title: '角色权限',
            align: 'center',
            key: 'permission',
            sortable: false,
            tooltip:true,
          },
          {
            title: '角色级别',
            align: 'center',
            key: 'level',
            sortable: false,
            tooltip:true,
          },
          {
            title: '描述',
            align: 'center',
            key: 'remark',
            sortable: false,
            tooltip:true,
          },
          {
            title: '创建日期',
            align: 'center',
            key: 'createTime',
            sortable: false,
            tooltip:true,
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
      //改变页码
      changePage(v) {
        this.searchForm.page = v-1;
        this.getDataList();
        this.clearSelectAll();
      },
      //清空选择
      clearSelectAll() {
        this.$refs.roleTable.selectAll(false);
      },
      //改变每页显示数据的条数
      changePageSize(v) {
        this.searchForm.size = v;
        this.getDataList();
      },
      // 获取所有菜单
      getMenus() {
        this.treeLoading = true;
        getMenusTree().then(res => {
          this.treeLoading = false;
          if(res){
            this.menus = res;
          }
        })
      },
      //展示Modal
      showModalFunction(){
        this.showModal=true;
        this.addButtonLoading=false;
        this.form.id = null;
        this.form.name = null;
        this.form.permission = null;
        this.form.dataScope = null;
        this.form.remark = null;
        this.form.level = 3;
        this.title="新增角色"
      },
      // 表格触发单选
      handleCurrentChange(val) {
        if (val) {
          const _this = this;
          // 清空菜单的选中
          _this.clearAllNodes();
          // 保存当前的角色id
          _this.currentId = val.id;
          _this.showButton = this.level <= val.level;
          // 菜单数据需要特殊处理（根据id选中当前行包含的数据）
          var ids = [];
          val.menus.forEach(function(data, index) {
            ids.push(data.id)
          });
          _this.checkedNodesByIds(ids,_this.menus);
          _this.reloadTree();
        }
      },
      //刷新tree组件
      reloadTree(){
        this.isRouterAlive = false;
        this.$nextTick(() => (this.isRouterAlive = true));
      },
      //刷新table组件
      reloadTable(){
        this.isTableShow = false;
        this.$nextTick(() => (this.isTableShow = true));
      },
      //tree清空勾选节点
      clearAllNodes(){
        let checkedMenu = [];
        checkedMenu = this.$refs.menu.getCheckedNodes();
        if(checkedMenu.length>0){
          checkedMenu.forEach(function (data,index) {
            data.checked = false ;
          })
        }
      },
      //tree选中传入id所在的节点
      checkedNodesByIds(ids,data){
        var _this = this;
        if(ids && ids.length >0 && data && data.length>0){
          data.forEach(function (item,index) {
            if(item.children){
              _this.checkedNodesByIds(ids,item.children)
            }
            if(ids.indexOf(item.id) > -1 && !item.children){
              item.checked = true;
            }
          })
        }else {
          _this.clearAllNodes()
        }
      },
      //新增/修改 角色
      addRole(){
        var _this = this;
        _this.addButtonLoading = true;
        var data = _this.form;
        if(_this.form.id){
          edit(data).then(res => {
            _this.addButtonLoading = false;
            if(!res){
              _this.$Message.success('修改成功');
              _this.showModal = false;
              _this.getDataList()
            }else {
              _this.$Message.error('修改失败');
            }
          });
        }else {
          add(data).then(res => {
            _this.addButtonLoading = false;
            if(res){
              _this.$Message.success('保存成功');
              _this.showModal = false;
              _this.getDataList()
            }else {
              _this.$Message.error('保存失败');
            }
          });
        }

      },
      handleService(row, index){//服务权限
        this.showService = true;
        this.title = "分配服务权限";
        this.form.id = row.id;
        this.initTree();
      },
      //修改按钮
      handleEdit(row, index){
        this.showModal = true;
        this.title="编辑角色";
        this.form.id = row.id;
        this.form.name = row.name;
        this.form.permission = row.permission;
        this.form.dataScope = row.dataScope;
        this.form.remark = row.remark;
        this.form.level = row.level;
      },
      //删除按钮
      handleDel(row, index){
        var _this = this;
        _this.ids = [];
        _this.ids.push(row.id);
        _this.delButtonLoading = true;

        _this.$confirm(`确认删除选中的`+_this.ids.length+`条数据?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          del(_this.ids).then(res => {
            _this.delButtonLoading = false;
            if(!res){
              _this.$Message.success('删除成功');
              _this.getDataList()
            }else {
              _this.$Message.error('删除失败');
            }
          });
        }).catch(() => {
        })
        // _this.delModalShow = true;

      },
      //查询按钮
      searchButton: function () {
        var _this = this;
        var data = {
          'page': _this.searchForm.page,
          'size': _this.searchForm.size,
          'sort': _this.searchForm.sort,
        };
        if (_this.query.blurry) {
          data.blurry = _this.query.blurry;
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
        queryRoleList(data).then(res => {
          this.loading = false;
          res.content.forEach(function (item, index) {
            item.createTime = formartDate(item.createTime, "yyyy年mm月dd日")
          });
          this.tableData = res.content;
          this.total = res.totalElements;
        });
      },
      //重置按钮
      resetButton(){
        this.query.blurry='';
        this.query.createTime='';
      },
      // 保存菜单
      saveMenu() {
        var _this = this;
        //加载条
        _this.menuLoading = true;
        //获取选择的节点
        let checkedMenu = [];
        checkedMenu = _this.$refs.menu.getCheckedAndIndeterminateNodes();
        var ids = [];
        checkedMenu.forEach(function (item,index) {
          ids.push({id:item.id});
        });
        var data={id : this.currentId ,menus:ids};
        editMenu(data).then(res => {
          _this.$Message.success('保存成功');
          _this.menuLoading = false;
          _this.update();
        }).catch(err => {
          _this.menuLoading = false;
        });
      },
      // 改变数据
      update() {
        var _this = this;
        //更新数据
        get(_this.currentId).then(res => {
          //更新表格当行数据
          _this.tableData.forEach(function (item ,index) {
            if(item.id == _this.currentId){
              _this.tableData[index] = res;
            }
          });
          //刷新表格
          _this.reloadTable()
        });

      },
      // 获取部门数据
      getDepts() {
        getDepts({ enabled: true }).then(res => {
          this.depts = res.content
        })
      },
      // 如果数据权限为自定义则获取部门数据
      changeScope() {
        if (this.form.dataScope === '自定义') {
          this.getDepts()
        }
      },
      //导出
      downloadRoles(){
        var _this = this;
        var data = {};
        if (_this.query.blurry) {
          data["blurry"] = _this.query.blurry;
        }
        if (_this.query.createTime && (_this.query.createTime[0] || _this.query.createTime[1])) {
          //拼接时间数组格式
          var startDate = formartDate(_this.query.createTime[0],"yyyy-MM-dd HH:mm:ss");
          var endDate = formartDate(_this.query.createTime[1],"yyyy-MM-dd HH:mm:ss");
          //处理结束时间
          endDate =  endDate.replace("00:00:00", "23:59:59");
          var temp = startDate+','+endDate;
          data["createTime"] = temp;
        }
        downloadRoles(data).then(function (res) {
          downloadFile(res,_this.downloadTitle,'xlsx')
        })
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
            this.patchdeleteData(ids);
          },
          onCancel: () => {
            this.$Message.info('取消了当前的操作行为！');
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
      //删除（后台）
      patchdeleteData(ids) {
        var _this = this;
        if(ids == undefined || ids == null || ids.length == 0) {
          _this.$Message.error('没有选择的数据');
          return;
        }
        del(ids).then(res => {
          this.userLoading = false;
          this.$Modal.remove();
          if(!res){
            _this.$Message.success('删除成功');
            _this.getDataList()
          }else {
            _this.$Message.error('删除失败');
          }
        });
      },
      //动态列改变
      checkboxChange(data){
        var columnss =  this.getColumns();
        this.columns= columnss.filter(function(v){ return data.indexOf(v.title) > -1 || v. type== 'selection'})
      },
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .role-span {
    font-weight: bold;color: #303133;
    font-size: 15px;
  }
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
  /deep/ .el-input-number .el-input__inner {
    text-align: left;
  }
  .rightCol {
    height: calc(100vh - 385px);
    overflow-y: hidden;
    overflow-x: hidden;

  }
  /*-------滚动条整体样式----*/
  .rightCol:hover {
    overflow-y: scroll;
  }
  .rightCol:hover::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }

  /*滚动条里面小方块样式*/

  .rightCol:hover::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #7b7a7a;
  }

  /*滚动条里面轨道样式*/

  .rightCol:hover::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 0;
    background: rgba(0, 0, 0, 0.1);
  }
</style>
