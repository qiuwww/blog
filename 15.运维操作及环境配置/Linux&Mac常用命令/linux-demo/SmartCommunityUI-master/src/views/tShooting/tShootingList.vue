<style scoped="less">
  .operation{
    margin-bottom: 10px;
    position: relative;
  }
  .switchSearch{
    padding: 0 15px;
  }
</style>

<template>
  <div class="search">
    <Card>
      <Row v-show="openSearch" @keydown.enter.native="handleSearch">
        <Form ref="searchForm" :model="searchForm" inline :label-width="70">
          <Form-item label="隐患名称">
            <Input type="text" v-model="searchForm.name" placeholder="请输入" clearable style="width: 200px"/>
          </Form-item>
          <span v-if="drop">
            <Form-item label="状态" prop="status">
              <Select v-model="searchForm.state" placeholder="请选择" clearable style="width: 200px">
                <Option value="1">正常</Option>
                <Option value="0">已删除</Option>
              </Select>
            </Form-item>
          </span>
          <Form-item style="margin-left:-35px" class="br">
            <Button @click="handleSearch" type="primary" icon="ios-search">搜索</Button>
            <Button @click="handleReset">重置</Button>
            <a class="switchSearch" @click="dropDown">
              {{dropDownContent}}
              <Icon :type="dropDownIcon"></Icon>
            </a>
          </Form-item>
        </Form>
      </Row>
      <Row class="operation">
        <Button @click="addTShooting" type="primary" icon="md-add">新增</Button>
        <Dropdown @on-click="handleDropdown">
          <Button>
            更多操作
            <Icon type="md-arrow-dropdown"/>
          </Button>
          <DropdownMenu slot="list">
            <DropdownItem name="refresh">刷新</DropdownItem>
            <DropdownItem name="delAll">批量删除</DropdownItem>
            <DropdownItem name="export">导出本页数据</DropdownItem>
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

      <Row v-show="openTip">
        <Alert show-icon>
          已选择
          <span class="select-count">{{selectCount}}</span> 项
          <a class="select-clear" @click="clearSelectAll">清空</a>
          <span style="float: right;">点击右上角按钮配置动态列↑</span>
        </Alert>
      </Row>
      <Row>
        <Table :loading="loading" border :columns="columns" sortable="custom" :data="data" @on-sort-change="changeSort"
               @on-selection-change="showSelect" ref="table" width="100%">
          <template slot-scope="{ row, index }" slot="action">
            <Button type="primary" @click="handleLook(row, index)" size="small">查看</Button>
            <Dropdown :transfer=true>
              <Button size="small">
                更多操作
                <Icon  type="md-arrow-dropdown"/>
              </Button>
              <DropdownMenu slot="list">
                <DropdownItem name="edit" @click.native="handleEdit(row, index)">
                   <Icon type="ios-create-outline" />
                    修改
                  </DropdownItem>
                <DropdownItem name="delete" @click.native="deleteData(row, index)">
                  <Icon type="md-trash"></Icon>
                    删除
                  </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </template>
        </Table>
      </Row>
      <Row type="flex" justify="end" class="page">
        <Page :current="searchForm.pageNumber" :total="total" :page-size="searchForm.pageSize" @on-change="changePage"
              @on-page-size-change="changePageSize" :page-size-opts="[10,20,50,100]" size="small" show-total show-elevator
              show-sizer></Page>
      </Row>
    </Card>
    <!--图片预览-->
    <div class="images" v-viewer="{movable: false}" >
      <img v-for="(item, i)  in images" :src="item" :key="Math.random()" style="display: none; ">
    </div>

    <updateTShooting v-model="updateShow" :TShootingId="TShootingId" :modalTitle="title"  v-on:handleSearch="handleSearch"></updateTShooting>
<!--    视频预览-->
    <myVideo v-model="pluginShow" :modalTitle="title" :videoUrl="videoUrl"></myVideo>
  </div>
</template>
<script>
    import {deleteTShooting, queryTShootingList} from '@/api/tShooting/tShooting'
    import {formartDate,nginxUrl} from '@/api/tools/tool'
    import updateTShooting from './updateTShooting'
    import myVideo from "./myVideo";
    export default {
        components: {
            updateTShooting,myVideo
        },
        data() {
            return {
                videoUrl:'',
                pluginShow:false,
                images:[],
                drop: false,
                dropDownContent: "展开",
                dropDownIcon: "ios-arrow-down",
                data: [],
                columns: this.getTShootingColumns(),
                openSearch: true,//打开搜索
                openTip: true,//打开提示
                loading: true, // 表单加载状态
                selectCount: 0, // 多选计数
                selectList: [], // 多选数据
                searchForm: {
                    // 搜索框对应data对象
                    name: '',
                    state:'',
                    value: '',//查询
                    pageNumber: 1, // 当前页数
                    pageSize: 10, // 页面大小
                    startDate: '',//开始时间
                    endDate: '',//结束时间
                    sort: 'createTime', // 默认排序字段
                    order: 'desc' // 默认排序方式
                },
                total: 0,
                title: '',
                TShootingId: '',
                updateShow: false,
                tableHeight: 200,
                colOptions: ["排查清单名称","排查清单类别","检查频率","专项分类","编制日期","隐患等级", "隐患类型","隐患坐标点","隐患描述", "检查地点","违规部门","风险等级","可能导致事故"," 备注","创建时间","操作"], //默认全选
                colSelect: ["排查清单名称","排查清单类别","检查频率","专项分类","编制日期","隐患等级", "隐患类型","隐患坐标点","隐患描述", "检查地点","违规部门","风险等级","可能导致事故"," 备注","创建时间","操作"]
            }
        },
        methods: {
            //新增
            addTShooting() {
                this.title = '新增';
                this.updateShow = true
                this.TShootingId = '';
            },
            //编辑
            handleEdit(row, index) {
                this.title = '编辑';
                this.TShootingId = row.id.toString();
                this.updateShow = true;
            },
            //查看
            handleLook(row, index) {
              this.title = '查看';
              this.TShootingId = row.id.toString();
              this.updateShow = true;
            },
            //分页查询
            getDataList() {
                this.loading = true;
                this.searchForm.id = null;
                queryTShootingList(this.searchForm).then(res => {
                    if (res && res.success) {
                        this.loading = false;
                        this.data = res.data.records;
                        this.total = res.data.total;
                    }
                });
            },
            //单一删除
            deleteData(row, index) {
                this.$Modal.confirm({
                    title: "确认删除",
                    content: "您确认要删除所点击选的数据?",
                    loading: true,
                    onOk: () => {
                        this.userLoading = true;
                        var ids = [];
                        ids.push(row.id);
                        this.patchdeleteData(ids);
                    },
                    onCancel: () => {
                        //this.$Message.info('取消了当前的操作行为！');
                    },
                });
            },
            //批量删除
            delAll() {
                if (this.selectCount <= 0) {
                    this.$Message.warning('您还未选择要删除的数据');
                    return;
                }
                this.$Modal.confirm({
                    title: '确认删除',
                    content: '您确认要删除所选的 ' + this.selectCount + '条数据?',
                    loading: true,
                    onOk: () => {
                        let ids = [];
                        this.selectList.forEach(function (e) {
                            ids.push(e.id);
                        });
                        this.patchdeleteData(ids);
                    },
                    onCancel: () => {
                        this.$Message.info('取消了当前的操作行为！');
                    }
                });
            },
            //删除（后台）
            patchdeleteData(ids) {
                if (ids == undefined || ids == null || ids.length == 0) {
                    this.$Message.error('没有选择的数据');
                    return;
                }
                deleteTShooting({ids: ids}).then(res => {
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
                this.clearSelectAll();
            },
            //改变每页显示数据的条数
            changePageSize(v) {
                this.searchForm.pageSize = v;
                this.getDataList();
            },
            //改变排序方式
            changeSort(e) {
                this.searchForm.sort = e.key;
                this.searchForm.order = e.order;
                if (e.order == 'normal') {
                    this.searchForm.order = '';
                }
                this.getDataList();
            },
            //查询
            handleSearch() {
                this.searchForm.pageNumber = 1;
                this.searchForm.pageSize = 10;
                this.getDataList();
            },
            //重置
            handleReset() {
                this.$refs.searchForm.resetFields();
                this.searchForm.pageNumber = 1;
                this.searchForm.pageSize = 10;
                this.searchForm.value = 10;
                // 重新加载数据
                this.getDataList();
            },
            //显示选择
            showSelect(e) {
                this.selectList = e;
                this.selectCount = e.length;
            },
            //清空选择
            clearSelectAll() {
                this.$refs.table.selectAll(false);
            },
            //获取列表字段
            getTShootingColumns() {
                return [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center',
                    },
                    {
                        title: '排查清单名称',
                        align: 'center',
                        key: 'name',
                        sortable: false,
                        width:180,
                        tooltip:true,
                    },
                    {
                        title: '排查清单类别',
                        align: 'center',
                        key: 'category',
                        sortable: false,
                        width:150,
                        tooltip:true,
                    },
                    {
                        title: '检查频率',
                        align: 'center',
                        key: 'checkFrequency',
                        sortable: false,
                        width:100,
                        tooltip:true,
                    },
                    {
                        title: '专项分类',
                        align: 'center',
                        key: 'classification',
                        sortable: false,
                        width:120,
                        tooltip:true,
                    },
                    {
                        title: '编制日期',
                        align: 'center',
                        key: 'preparedDate',
                        sortable: false,
                        width:130,
                        tooltip:true,
                        render: (h, params) => {
                            return h('div',
                                formartDate(params.row.preparedDate, 'yyyy-MM-dd')
                            )
                        }
                    },
                     {
                        title: '隐患类型',
                        align: 'center',
                        key: 'type',
                        sortable: false,
                        width:100,
                         tooltip:true,
                    },
                    {
                        title: '隐患等级',
                        align: 'center',
                        key: 'level',
                        sortable: false,
                        width:100,
                        tooltip:true,
                    },
                    {
                        title: '隐患描述',
                        align: 'center',
                        key: 'description',
                        sortable: false,
                        width:180,
                        tooltip:true,
                    },
                    {
                        title: '隐患图片',
                        align: 'center',
                        key: 'imgPath',
                        width: 120,
                        sortable: false,
                        tooltip:true,
                        render: (h, params) => {
                          if(params.row.imgPath){
                            return  h('img',{
                              style: {
                                cursor: "pointer",
                                width: "50%",
                                height: "40px",
                                "object-fit": "contain",
                              },
                              attrs: {
                                alt:"暂无",
                                src: nginxUrl+params.row.imgPath,
                              },
                              on: {
                                click: () => {
                                  this.showFile(params.row);
                                }
                              }
                            })
                          }else {
                              return  h("div","暂无")
                            }
                        }
                    },{
                        title: '隐患视频',
                        align: 'center',
                        key: 'videoPath',
                        sortable: false,
                        width: 120,
                        tooltip:true,
                        render: (h, params) => {
                          if(params.row.videoPath){
                            return  h('video',{
                              style: {
                                cursor: "pointer",
                                width: "50%",
                                height: "40px",
                                "object-fit": "contain",
                              },
                              attrs: {
                                alt:"暂无",
                                src: params.row.videoPath.indexOf("http://")>-1?params.row.videoPath:nginxUrl+params.row.videoPath,
                              },
                              on: {
                                click: () => {
                                  this.videoPlay(params.row);
                                }
                              }
                            })
                          }else {
                              return  h("div","暂无")
                            }
                        }
                    },
                    {
                        title: '检查地点',
                        align: 'center',
                        key: 'address',
                        sortable: false,
                        width:180,
                        tooltip:true,
                    },
                    {
                        title: '风险等级',
                        align: 'center',
                        key: 'riskLevel',
                        sortable: false,
                        width:120,
                        tooltip:true,
                    },
                    {
                        title: '可能导致事故',
                        align: 'center',
                        width:140,
                        key: 'mayCause',
                        sortable: false,
                        tooltip:true,
                    },
                    {
                        title: '创建时间',
                        key: 'createTime',
                        sortable: true,
                        align: 'center',
                        width: 170,
                        tooltip:true,
                        render: (h, params) => {
                            return h('div',
                                formartDate(params.row.createTime, 'yyyy-MM-dd HH:mm:ss')
                            )
                        }
                    },
                    {
                        fixed: 'right',
                        width: 180,
                        title: '操作',
                        align: 'center',
                        slot: 'action',
                        tooltip:true,
                    }
                ];
            },

            handleDropdown(name) {
                if (name == "refresh") {
                    this.getDataList();
                } else if (name == "export") {
                  let excolumns = this.columns.filter(function(v){ return v.title!="操作" && v. type!= 'selection'});
                  this.$refs.table.exportCsv({
                    filename: '本页数据',
                    columns: excolumns,
                    data:this.data
                  });
                }else if(name == "delAll"){
                    this.delAll();
                }
            },
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
            //预览文件
            showFile(row){
              this.images = [];
              this.images.push(nginxUrl+row.imgPath);
              const viewer = this.$el.querySelector('.images').$viewer;
              viewer.show()
            },
            //视频预览
            videoPlay(row){
                this.title=  row.address + row.type + "视频";
                this.pluginShow = true;
                this.videoUrl = row.videoPath.indexOf('http://')>-1?row.videoPath:nginxUrl + row.videoPath;
            },
            //动态列实现
            checkboxChange:function (data) {
              var columnss =  this.getTShootingColumns();
              this.columns= columnss.filter(function(v){ return data.indexOf(v.title) > -1 || v. type== 'selection'})
            },
        },
        mounted() {
            this.getDataList();
        }
    }
</script>
