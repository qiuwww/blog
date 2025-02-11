<style lang="less" scoped>
  @import "../../../styles/tree&table-common.less";
</style>
<style lang="less">
  .userModal {
    .powerDrop {
      position: absolute;
      right: 10px;

      .powerMenu {
        left: -196px !important;
        max-height: 300px;
        overflow-y: auto;

        &::-webkit-scrollbar {
          display: none;
        }
      }
    }
  }
</style>
<template>
  <div class="search">
    <Card>
      <Row type="flex" justify="space-between">
        <Col v-if="expand" span="3">
          <Alert show-icon>
            当前选择：
            <span class="select-title">{{editTitle}}</span>
            <a class="select-clear" v-if="editTitle" @click="cancelEdit">取消选择</a>
          </Alert>
          <Input
            v-model="searchKey"
            suffix="ios-search"
            @on-change="search"
            placeholder="输入部门名称搜索"
            clearable
          />
          <div class="tree-bar" :style="{maxHeight: maxHeight}">
            <Tree ref="tree" :data="treeData" @on-select-change="selectTree"></Tree>
            <Spin size="large" fix v-if="treeLoading"></Spin>
          </div>
        </Col>

        <div class="expand">
          <Icon :type="expandIcon" size="16" @click="changeExpand"/>
        </div>

        <Col :span="span">
          <Row v-show="openSearch" @keydown.enter.native.prevent="handleSearch">
            <Form ref="searchForm" :model="searchForm" inline :label-width="70" onSubmit="return false">
              <Form-item label="用户名称" prop="blurry">
                <Input
                  type="text"
                  v-model="searchForm.blurry"
                  placeholder="请输入"
                  clearable
                  style="width: 200px"
                />
              </Form-item>
              <Form-item label="状态" prop="enabled">
                <Select
                  v-model="searchForm.enabled"
                  placeholder="请选择"
                  clearable
                  style="width: 200px">
                  <Option value="true">启用</Option>
                  <Option value="false">禁用</Option>
                </Select>
              </Form-item>
              <Form-item style="margin-left:-35px;" class="br">
                <Button @click="handleSearch" type="primary" icon="ios-search">搜索</Button>
                <Button @click="handleReset">重置</Button>
              </Form-item>
            </Form>
          </Row>
          <Row class="operation">
            <Button @click="addFrame" type="primary" icon="md-add">添加用户</Button>
            <Dropdown>
              <Button>
                更多操作
                <Icon type="md-arrow-dropdown"/>
              </Button>
              <DropdownMenu slot="list">
                <DropdownItem @click.native="getDataList">
                  <Icon type="ios-refresh-circle-outline"/>
                  刷新数据
                </DropdownItem>
                <DropdownItem @click.native="delAll">
                  <Icon type="md-trash"/>
                  批量删除
                </DropdownItem>
                <DropdownItem @click.native="updateStateTrue">
                  <Icon type="ios-power-outline"/>
                  批量启用
                </DropdownItem>
                <DropdownItem @click.native="updateStateFalse">
                  <Icon type="ios-play-outline"/>
                  批量停用
                </DropdownItem>
                <DropdownItem @click.native="exportData">
                  <Icon type="ios-arrow-round-down"/>
                  导出本页数据
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Button type="dashed" @click="openSearch=!openSearch">{{openSearch ? "关闭搜索" : "开启搜索"}}</Button>
            <Button type="dashed" @click="openTip=!openTip">{{openTip ? "关闭提示" : "开启提示"}}</Button>

            <div style="float: right;position: absolute;right: 10px;">
              <Poptip transfer trigger="click" placement="bottom-end" title="动态列">
                <Button icon="md-list"></Button>
                <div slot="content" style="position:relative;min-height:5vh">
                  <Checkbox-group v-model="colOptions" @on-change="checkboxChange">
                    <checkbox v-for="(item,i) in colSelect" :label="item" :key="item"></checkbox>
                  </Checkbox-group>
                </div>
              </Poptip>
            </div>

          </Row>
          <Row v-show="openTip">
            <Alert show-icon>
              已选择
              <span class="select-count">{{selectCount}}</span> 项
              <a class="select-clear" @click="clearSelectAll">清空</a>
            </Alert>
          </Row>
          <Row>
            <Table
              :loading="loading"
              border
              :columns="columns"
              :data="data"
              sortable="custom"
              @on-sort-change="changeSort"
              @on-selection-change="showSelect"
              ref="table"
            >
              <template slot="action" slot-scope="{ row, index }">
                <Button type="primary" size="small" @click.native="viewFrame(row,index)">
                  <Icon type="ios-eye-outline"/>
                  查看
                </Button>
                <Dropdown :transfer=true>
                  <Button style="padding: 0 7px;height: 23.5px;">
                    更多操作
                    <Icon type="ios-arrow-down"/>
                  </Button>
                  <DropdownMenu slot="list">
                    <DropdownItem @click.native="editFrame(row,index)">
                      <Icon type="ios-create-outline"/>
                      修改
                    </DropdownItem>
                    <DropdownItem @click.native="remove(row,index)">
                      <Icon type="md-trash"></Icon>
                      删除
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </template>
            </Table>
          </Row>
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

    <Modal :title="modalTitle" v-model="modalVisible" :mask-closable="false" :width="650" class="userModal">
      <Form ref="form" :model="form" :label-width="80" :rules="formValidate" :disabled="disabled">
        <Row>
          <Col span="12">
            <FormItem label="用户名" prop="username">
              <Input v-model="form.username" placeholder="请输入用户名" type="text" :maxlength="50"/>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="密码" prop="password">
              <Input type="password" v-model="form.password" :placeholder="pwdLabel" :maxlength="50"
                     :disabled="editDisabled"/>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="电话" prop="phone">
              <Input v-model="form.phone" placeholder="请输入电话" type="text" :maxlength="50"/>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="昵称" prop="nickName">
              <Input v-model="form.nickName" placeholder="请输入昵称" type="text" :maxlength="50"/>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="邮箱" prop="email">
              <Input v-model="form.email" placeholder="请输入邮箱" type="text" :maxlength="50"/>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="性别" prop="sex">
              <RadioGroup v-model="form.sex">
                <Radio label="男" v-model="form.sex" true-value="男">男</Radio>
                <Radio label="女" v-model="form.sex" true-value="女">女</Radio>
              </RadioGroup>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="部门" prop="dept.id">
              <TreeSelect v-model="form.dept.id" :data="treeData" v-width="228" @on-change="openDept"/>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="岗位" prop="job.id">
              <Select v-model="form.job.id" @on-open-change="openJob">
                <Option v-for="(item, i)  in jobList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="数据权限" prop="power.deptId">
              <TreeSelect v-model="form.power.deptId" :data="powerTree" v-width="228" @on-change="handleCheckChange" />

              <!--              <i-input v-model="form.power.name" placeholder="请选择数据权限" readonly></i-input>-->
              <!--              <Dropdown trigger="custom" :visible="powerVisible" placement="bottom-end" transfer-class-name="powerMenu"-->
              <!--                        class="powerDrop">-->
              <!--                <a href="javascript:void(0)" @click="powerVisible=!powerVisible">-->
              <!--                  <Icon type="ios-arrow-down" :class="{powerVisibleIcon:powerVisible}"></Icon>-->
              <!--                </a>-->
              <!--                <DropdownMenu slot="list" style="min-width: 219px;padding: 0 10px;">-->
              <!--                  <Tree :data="powerTree" @on-select-change="handleCheckChange"></Tree>-->
              <!--                </DropdownMenu>-->
              <!--              </Dropdown>-->
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="状态" prop="enabled">
              <RadioGroup v-model="form.enabled">
                <Radio :label=1 v-model="form.enabled" :true-value=1>启用</Radio>
                <Radio :label=0 v-model="form.enabled" :true-value=0>禁用</Radio>
              </RadioGroup>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="24">
            <FormItem label="角色" prop="roles">
              <Select v-model="form.roles" multiple @on-change="selectRole">
                <Option v-for="(item, i)  in roleList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <Button type="text" @click="modalVisible = false">取消</Button>
        <Button type="primary" :loading="submitLoading" v-if="showBtn" @click="handelSubmit">提交</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
  import {add, edit, getAllUsers, deleteUser, patchUpdateState, getDeptTree} from "@/api/system/user"
  import {getDepts} from "@/api/system/dept"
  import {getAll} from "@/api/system/role"
  import {getAllJob} from "@/api/system/job"
  import {
    editDictData,
    deleteData,
  } from "@/api/index";

  export default {
    data() {
      return {
        openSearch: true,
        openTip: true,
        treeLoading: false, // 树加载状态
        maxHeight: "500px",
        loading: false, // 表格加载状态
        editTitle: "", // 编辑节点名称
        searchKey: "", // 搜索树
        expand: true,
        span: 20,
        expandIcon: "ios-arrow-back",
        selectNode: {},
        treeData: [], // 树数据
        selectCount: 0, // 多选计数
        selectList: [], // 多选数据
        searchForm: {// 搜索框对应data对象
          blurry: '',
          deptId: 0,//部门id
          page: 1, // 当前页数
          size: 10, // 页面大小
          sort: "username", // 默认排序字段
        },
        modalType: 0, // 添加或编辑标识
        modalVisible: false, // 添加或编辑显示
        dictModalTitle: "",
        modalTitle: "", // 添加或编辑标题
        dictForm: {
          title: "",
          type: "",
          description: "",
          sortOrder: ""
        },
        form: {// 添加或编辑表单对象初始化数据
          id: null,
          username: null,
          nickName: "",
          sex: '男',
          email: "",
          enabled: 1,
          roles: [],
          job: {
            id: null
          },
          dept: {
            id: ''
          },
          phone: "",
          password: null,
          power: {
            id: null,
            name: null,
            deptId: '',
            attribute: null
          }
        },
        formValidate: this.getFormValidate(),// 表单验证规则
        columns: this.getUserColumns(),
        submitLoading: false, // 添加或编辑提交状态
        data: [], //表单数据
        total: 0, // 表单数据总数
        colOptions: ["用户名", "昵称", "性别", "电话", "邮箱", "部门/岗位", "状态", "创建时间", "操作"], //默认全选
        colSelect: ["用户名", "昵称", "性别", "电话", "邮箱", "部门/岗位", "状态", "创建时间", "操作"],
        deptList: this.deptListItem(),//部门 选择器
        roleList: this.roleListItem(),//角色 选择器
        disabled: false,//禁用密码输入框
        pwdLabel: "请输入密码",
        showBtn: true,//显示提交按钮
        jobList: [],//岗位 选择器
        deptId: null,//部门的id
        // changeRolesValue: [],
        cRoles: [],
        editDisabled: false,
        powerVisible: false,
        powerTree: []
      };
    },
    watch: {
      deptId: function (val) {// 根据id查询岗位
        if (this.deptId != null) {
          let _this = this;
          let jobArray = [];
          getAllJob(this.deptId).then(res => {
            for (let i = 0; i < res.content.length; i++) {
              jobArray.push({"value": res.content[i].id, "label": res.content[i].name});
            }
            _this.jobList = jobArray;
          });
        }
      },
      //对话框显示与关闭
      modalVisible: function (v) {
        if (!v) {
          this.handelCancel()
        }
      }
    },
    methods: {
      selectRole(v) {//角色选择
        let cRoles1 = [];
        for (let i = 0; i < v.length; i++) {
          cRoles1.push({id: v[i]});
        }
        this.cRoles = cRoles1;
      },
      //选择部门
      openDept(v) {
        if (v) {
          this.deptId = v;
        }
      },
      //选择岗位
      openJob(v) {
        if (v == true) {
          if (this.deptId == null) {
            this.$Message.warning({content: "请先选择部门", duration: 3});
          }
        }
      },
      roleListItem() {//角色 选择器
        getAll().then(res => {
          let roles = []
          for (let i = 0; i < res.length; i++) {
            roles.push('{"value":' + res[i].id + ',"label":"' + res[i].name + '"}');
          }
          roles = '[' + roles + ']';
          this.roleList = jQuery.parseJSON(roles);
        })
      },
      deptListItem() {//部门 选择器
        // getDepts().then(res => {
        //   if(res && res.con){
        //     this.deptList = res.contont;
        //   }
        //
        // });
      },
      selectDept(v) {//部门选择事件
        this.deptId = v;
      },
      exportData() {//导出本页数据
        this.$refs.table.exportCsv({
          filename: '用户信息表单',
          original: true,
          quoted: true
        });
      },
      checkboxChange(data) {//隐藏列
        var columnss = this.getUserColumns();
        this.columns = columnss.filter(function (v) {
          return data.indexOf(v.title) > -1 || v.type == 'selection'
        });
      },
      init() {//初始化
        this.getAllDict();// 获取树数据
        this.getDataList(); // 获取表单数据
      },
      getAllDict() {// 获取树数据
        this.treeLoading = true;
        getDepts().then(res => {
          this.treeLoading = false;
          if (res.content) {
            this.treeData = this.getTreeData(res.content, true);
          }
        });
      },
      //通过id查询权限
      getPowerDataById(id) {
        let resData=null;
        if (id && this.powerTree) {
          for (let i in this.powerTree) {
            let item = this.powerTree[i];
            if(item && item.label && item.id ){
              if(item.id == id){
                resData = item;
                break
              } else {
                if(item.children) {
                  let res  =  this.getChildrenPowerDataById(id,item.children);
                  if(res!=null){
                    resData = res;
                  }
                }
              }
            }
          }
        }
        return resData;
      },
      //通过id查询子权限
      getChildrenPowerDataById(id,children) {
        let resData=null;
        if (id && children) {
          for (let i in children) {
            let item = children[i];
            if(item && item.label && item.id ){
              if(item.id == id){
                resData = item;
                break
              }
              else {
                if(item.children) {
                  let res  =  this.getChildrenPowerDataById(id,item.children);
                  if(res!=null){
                    resData = res;
                  }
                }
              }
            }
          }
        }
        return resData;
      },
      getTreeData(data, flag) {
        let resData=[];
        if (data) {
          for (let i in data) {
            let item = data[i];
            if(item && data[i].label && data[i].id){
              data[i].title = data[i].label;
              data[i].value = data[i].id;
              data[i].expand = flag;
              if (item.children) {
                data[i].children = this.getTreeData(data[i].children, flag);
              }
              resData.push(item);
            }
          }
        }
        return resData;
      },
      getDataList() {// 获取表单数据
        this.loading = true;
        if (!this.searchForm.deptId) {//模糊查询
          this.searchForm.deptId = 0;
        }
        if (!this.searchForm.blurry) {//模糊查询
          this.searchForm.blurry = "";
        }
        if (!this.searchForm.enabled) {
          this.searchForm.enabled = "";
        }
        getAllUsers(this.searchForm).then(res => {
          this.loading = false;
          if (res && res.success) {
            this.data = res.data.content;
            this.total = res.data.totalElements;
          }
        });
      },
      search() {// 搜索树
        if (this.searchKey) {
          this.treeLoading = true;
          getDepts({name: this.searchKey}).then(res => {
            this.treeLoading = false;
            let parent = [];
            for (let i = 0; i < res.content.length; i++) {
              parent.push('{"title":"' + res.content[i].name + '","id":' + res.content[i].id + '}');
            }
            parent = '[' + parent + ']';
            this.treeData = jQuery.parseJSON(parent);
          })
        } else {
          this.getAllDict();// 为空重新加载
        }
      },
      selectTree(v) {//选择树
        if (v.length > 0) {
          this.editTitle = v[0].title;
          // 重新加载表
          this.searchForm.page = 1;
          this.searchForm.size = 10;
          this.searchForm.deptId = v[0].id;
          this.getDataList();
        } else {
          this.cancelEdit();
        }
      },
      cancelEdit() {//取消选择
        let data = this.$refs.tree.getSelectedNodes()[0];
        if (data) {
          data.selected = false;
        }
        // 取消选择后获取全部数据
        this.searchForm.page = 1;
        this.searchForm.size = 10;
        this.searchForm.deptId = 0;
        this.editTitle = "";
        this.getDataList();
      },
      changeSelect(v) {
        this.selectCount = v.length;
        this.selectList = v;
      },
      changeExpand() {//扩展 收缩按钮
        this.expand = !this.expand;
        if (this.expand) {
          this.expandIcon = "ios-arrow-back";
          this.span = 20;
        } else {
          this.expandIcon = "ios-arrow-forward";
          this.span = 23;
        }
      },
      changePage(v) {//分页
        this.searchForm.page = v;
        this.getDataList();
        this.clearSelectAll();
      },
      changePageSize(v) {//分页
        this.searchForm.size = v;
        this.getDataList();
      },
      handleSearch() {//搜索
        this.searchForm.page = 1;
        this.searchForm.size = 10;
        this.getDataList();
      },
      handleReset() {//重置
        this.$refs.searchForm.resetFields();
        this.searchForm.page = 1;
        this.searchForm.size = 10;
        // 重新加载数据
        this.getDataList();
      },
      changeSort(e) {//当点击排序时触发
        this.searchForm.sort = e.key;
        this.searchForm.order = e.order;
        if (e.order == "normal") {
          this.searchForm.order = "";
        }
        this.getDataList();
      },
      showSelect(e) {//表格选择框
        this.selectList = e;
        this.selectCount = e.length;
      },
      clearSelectAll() {//清楚所有选择
        this.$refs.table.selectAll(false);
      },
      //用户数据权限树 点击事件
      handleCheckChange(v) {
        if(v){
          let res = this.getPowerDataById(v);
          if(res){
            this.form.power.name = res.title;
            this.form.power.deptId = res.id;
            this.form.power.attribute = res.attribute;
          }
        }
      },
      //用户数据权限树
      getDeptTree() {
        getDeptTree().then(res => {
          if (res && res.success) {
            this.powerTree = this.getTreeData(res.data.tree, false);
          }
        })
      },
      addFrame() {//添加数据按钮弹窗
        this.$refs.form.resetFields();
        this.modalType = 0;
        this.modalTitle = "添加数据";
        this.disabled = false;
        this.editDisabled = false;
        this.modalVisible = true;//弹出框显示
        this.form.power.name = null;
        this.form.power.deptId = '';
        this.form.dept.id = '';
        this.form.job.id = null;
        this.pwdLabel = "请输入密码";
        this.getDeptTree();
        this.showBtn = true;
      },
      editFrame(v, i) {//修改
        this.$refs.form.resetFields();
        this.changerData(v);
        this.modalType = 1;
        this.modalTitle = "修改数据";
        this.disabled = false;
        this.editDisabled = true;
        this.pwdLabel = "不能修改";
        this.showBtn = true;
        this.getDeptTree();
        this.modalVisible = true;
      },
      viewFrame(v) {//查看
        this.$refs.form.resetFields();
        this.changerData(v);
        this.modalTitle = "查看数据";
        this.disabled = true;
        this.editDisabled = false;
        this.pwdLabel = "不能查看";
        this.showBtn = false;
        this.getDeptTree();
        this.modalVisible = true;//弹出框显示
      },
      changerData(v) {
        this.deptId = v.dept.id;
        this.form.id = v.id;
        this.form.username = v.username;
        this.form.nickName = v.nickName;
        if (v.power != null) {
          this.form.power.id = v.power.id;
          this.form.power.deptId = v.power.deptId;
        }
        this.form.sex = v.sex;
        this.form.email = v.email;
        if (v.enabled) {
          this.form.enabled = 1;
        } else {
          this.form.enabled = 0;
        }
        if (v.roles[0] != null) {
          this.form.roles = [];
          for (let i in v.roles) {
            if (v.roles[i]) {
              this.form.roles.push(v.roles[i].id);
            }
          }
        }
        this.form.job.id = v.job.id;
        this.form.dept.id = v.dept.id;
        this.form.phone = v.phone;
      },
      handelCancel() {//取消按钮
        this.jobList = '';
        this.deptId = null;
        this.modalVisible = false;
        this.powerVisible = false;
        this.deptId = 0;
        this.$refs.form.resetFields();
      },
      handelSubmit() {//提交按钮
        this.$refs.form.validate(valid => {
          if (valid) {
            this.submitLoading = true;
            let cEnabled;
            if (this.form.enabled == 1) {
              cEnabled = 'true';
            } else if (this.form.enabled == 0) {
              cEnabled = 'false';
            }
            if (this.modalType == 0) {// 添加
              add({
                id: this.form.id,
                username: this.form.username,
                nickName: this.form.nickName,
                sex: this.form.sex,
                email: this.form.email,
                enabled: cEnabled,
                roles: this.cRoles,
                job: this.form.job,
                dept: this.form.dept,
                phone: this.form.phone,
                password: this.form.password,
                power: this.form.power
              }).then(res => {
                this.submitLoading = false;
                if (res) {
                  this.$Message.success("操作成功");
                  this.getDataList();
                  this.modalVisible = false;
                }
              }).catch(err => {
                this.submitLoading = false;
              });
            } else if (this.modalType == 1) {//修改
              this.submitLoading = true;

              // 编辑
              edit({
                id: this.form.id,
                username: this.form.username,
                nickName: this.form.nickName,
                sex: this.form.sex,
                email: this.form.email,
                enabled: cEnabled,
                roles: this.cRoles,
                job: this.form.job,
                dept: this.form.dept,
                phone: this.form.phone,
                power: this.form.power
              }).then(res => {
                this.submitLoading = false;
                if (res != null) {
                  this.$Message.success("修改成功");
                  this.modalVisible = false;
                  this.getDataList();
                }
              }).catch(err => {
                this.submitLoading = false;
              })
            }
          }
        });
      },
      // 删除（后台）
      patchdeleteData(ids) {
        if (ids == undefined || ids == null || ids.length == 0) {
          this.$Message.error('没有选择的数据');
          return;
        }
        deleteUser({ids: ids}).then(res => {
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
      remove(v) {
        this.$Modal.confirm({
          title: "确认删除",
          content: "您确认要删除?",
          loading: true,
          onOk: () => {
            // 删除
            let ids = [];
            ids.push(v.id);
            this.patchdeleteData(ids);
          }
        });
      },
      delAll() {
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
            this.selectList.forEach(function (e) {
              ids.push(e.id);
            });
            this.patchdeleteData(ids);
          }
        });
      },
      getFormValidate() {//表单验证
        return {
          username: [
            {required: true, message: '用户名不能为空！', trigger: 'blur'},
            {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
          ],
          password: [
            {message: '密码不能为空！', trigger: 'blur'},
            {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
          ],
          nickName: [
            {required: true, message: '昵称不能为空！', trigger: 'blur'},
            {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
          ],
          phone: [
            {required: true, message: '电话不能为空！', trigger: 'blur'},
            {pattern: /^[0-9]+$/, message: '请输入数字格式', trigger: 'blur'},
            {pattern: /^1[3456789]\d{9}$/, message: "电话格式不正确", trigger: "blur"},
            {type: 'string', max: 11, message: '电话的最大长度为11！', trigger: 'blur'}
          ],
          email: [
            {required: true, message: '邮箱不能为空！', trigger: 'blur'},
            {pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, message: "邮箱不正确", trigger: "blur"},
            {type: 'string', max: 50, message: '邮箱的最大长度为50！', trigger: 'blur'}
          ],
          'dept.id': [
            {type: 'number', required: true, message: '部门不能为空！', trigger: 'change'}
          ],
          'job.id': [
            {type: 'number', required: true, message: '岗位不能为空！', trigger: 'change'}
          ],
          'power.deptId': [
            {required: false, message: '数据权限不能为空！', trigger: 'change'}
          ],
          roles: [
            {type: 'array', required: true, message: '角色不能为空！', trigger: 'change'}
          ]
        }
      },
      getUserColumns() {// 获取列表字段  表头
        return [
          {
            type: "selection",
            width: 60,
            align: "center"
          },
          {
            title: "用户名",
            key: 'username',
            width: 100,
            sortable: true,
            tooltip: true,
            align: "center"
          },
          {
            title: "昵称",
            key: "nickName",
            minWidth: 150,
            sortable: true,
            tooltip: true,
            align: "center"
          },
          {
            title: "性别",
            key: "sex",
            width: 90,
            sortable: true,
            tooltip: true,
            align: "center"
          },
          {
            title: "电话",
            key: "phone",
            width: 150,
            tooltip: true,
            sortable: true,
            align: "center"
          },
          {
            title: "邮箱",
            key: "email",
            width: 200,
            sortable: true,
            tooltip: true,
            align: "center"
          },
          {
            title: "部门/岗位",
            key: "dept",
            width: 150,
            sortable: true,
            align: "center",
            tooltip: true,
            render: (h, params) => {
              let name = "";
              if (params.row.dept != null) {
                if (params.row.dept.name != null) {
                  name = params.row.dept.name;
                }
              }
              return h('Tooltip', {
                props: {
                  content: name,
                  placement: 'bottom',
                  transfer: true
                }
              }, name);
            }
          },
          {
            title: "状态",
            key: "enabled",
            align: "center",
            width: 130,
            align: "center",
            tooltip: true,
            render: (h, params) => {
              return h('div', [
                h('i-switch', { //数据库1是已处理，0是未处理
                  props: {
                    type: 'primary',
                    value: params.row.enabled  //控制开关的打开或关闭状态，官网文档属性是value
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    'on-change': (value) => {//触发事件是on-change,用双引号括起来，
                      //参数value是回调值，并没有使用到
                      this.changeEnabled(params) //params.index是拿到table的行序列，可以取到对应的表格值
                    }
                  }
                },)
              ]);
            }
          },
          {
            title: "创建时间",
            key: "createTime",
            width: 200,
            sortable: true,
            tooltip: true,
            align: "center",
            render: (h, params) => {
              if (params.row.createTime) {
                return h("div"), [
                  h("Time", {
                    props: {
                      type: "datetime",
                      time: params.row.createTime
                    }
                  })
                ]
              }
            }
          },
          {
            title: "操作",
            width: 200,
            align: "center",
            fixed: "right",
            slot: 'action'
          }
        ];
      },
      // 改变状态
      changeEnabled(params) {
        let label = "";
        params.row.enabled = !params.row.enabled;
        if (params.row.enabled) {
          label = "启用";
        } else {
          label = "禁用";
        }
        this.$Modal.confirm({
          title: '提示',
          content: '您确定 "' + label + '" ' + params.row.username + '用户, 是否继续？',
          onOk: () => {
            let ids = [params.row.id];
            this.patchUpdateState(ids, params.row.enabled);
          },
          onCancel: () => {
            params.row.enabled = !params.row.enabled;
          }
        });
      },
      //批量启用
      updateStateTrue() {
        if (this.selectCount <= 0) {
          this.$Message.warning("您还未选择要启用的数据");
          return;
        }
        this.$Modal.confirm({
          title: "确认更新",
          content: "您确认要启用所选的 " + this.selectCount + " 个用户?",
          loading: true,
          onOk: () => {
            let ids = [];
            this.selectList.forEach(function (e) {
              ids.push(e.id);
            });
            this.patchUpdateState(ids, true);
          }
        });
      },
      //批量禁用
      updateStateFalse() {
        if (this.selectCount <= 0) {
          this.$Message.warning("您还未选择要启用的数据");
          return;
        }
        this.$Modal.confirm({
          title: "确认更新",
          content: "您确认要禁用所选的 " + this.selectCount + " 个用户?",
          loading: true,
          onOk: () => {
            let ids = [];
            this.selectList.forEach(function (e) {
              ids.push(e.id);
            });
            this.patchUpdateState(ids, false);
          }
        });
      },
      // 更新状态（后台）
      patchUpdateState(ids, enabled) {
        if (ids == undefined || ids == null || ids.length == 0) {
          this.$Message.error('没有选择的数据');
          return;
        }
        patchUpdateState({ids: ids, enabled: enabled}).then(res => {
          this.userLoading = false;
          this.$Modal.remove();
          if (res && res.success) {
            this.modalTaskVisible = false;
            this.$Message.success('更新状态成功');
            this.getDataList();
          } else {
            this.$Message.error('更新状态失败');
          }
        });
      },
    },
    mounted() {
      // 计算高度
      let height = document.documentElement.clientHeight;
      this.maxHeight = Number(height - 287) + "px";
      this.init();
    }
  };
</script>
