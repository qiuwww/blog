<template>
  <div class="search">
    <Card>
      <Row v-show="openSearch" @keydown.enter.native="handleSearch">
        <Form ref="searchForm" :model="searchForm" inline :label-width="70" label-position="left">
          <Form-item label="企业名">
            <Input v-model="searchForm.companyName" type="text" placeholder="请输入" clearable style="width: 200px"/>
          </Form-item>
          <Form-item label="所属行业">
            <Input v-model="searchForm.companyIndustry" type="text" placeholder="请输入" clearable style="width: 200px"/>
          </Form-item>
          <Form-item label="责任人">
            <Input v-model="searchForm.responsible" type="text" placeholder="请输入" clearable style="width: 200px"/>
          </Form-item>
          <Form-item label="地理位置" v-show="itemShow">
            <Input v-model="searchForm.positionChar" type="text" placeholder="请输入" clearable style="width: 200px"/>
          </Form-item>
          <Form-item label="企业性质" v-show="itemShow">
            <Input v-model="searchForm.companyNature" type="text" placeholder="请输入" clearable style="width: 200px"/>
          </Form-item>
          <Form-item label="企业电话" v-show="itemShow">
            <Input v-model="searchForm.companyPhone" type="text" placeholder="请输入" clearable style="width: 200px"/>
          </Form-item>
          <Form-item style="margin-left:-70px" class="br">
            <Button type="primary" icon="ios-search" @click="handleSearch">搜索</Button>
            <Button @click="handleReset">重置</Button>
            <a @click.prevent="switchSearch" class="switchSearch">
              {{varSearch}}
              <Icon :type="iconSearch"/>
            </a>
          </Form-item>
        </Form>
      </Row>
      <Row class="operation">
        <Button type="primary" icon="md-add" @click="addTCompany">新增</Button>
        <!-- <Button icon="md-trash" @click="delAll">批量删除</Button> -->
        <Dropdown>
          <Button>
            更多操作
            <Icon type="md-arrow-dropdown"/>
          </Button>
          <DropdownMenu slot="list">
            <DropdownItem @click.native="getDataList">刷新</DropdownItem>
            <DropdownItem @click.native="delAll">批量删除</DropdownItem>
            <DropdownItem @click.native="exportData">导出本页数据</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Button type="dashed" @click="openSearch=!openSearch">{{ openSearch ? '关闭搜索' : '开启搜索' }}</Button>
        <Button type="dashed" @click="openTip=!openTip">{{ openTip ? '关闭提示' : '开启提示' }}</Button>
        <!-- <Dropdown style="position:absolute;right: 0;">
          <Button icon="md-apps"></Button>
          <DropdownMenu slot="list" style="width:500px;padding:0 20px;">
            <Checkbox @change="hideCol">企业名</Checkbox>
            <Checkbox @change="hideCol">xyz坐标</Checkbox>
            <Checkbox @change="hideCol">地理位置</Checkbox>
            <Checkbox @change="hideCol">企业的性质</Checkbox>
            <Checkbox @change="hideCol">企业联系电话</Checkbox>
          </DropdownMenu>
        </Dropdown> -->
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
          <span class="select-count">{{ selectCount }}</span> 项
          <a class="select-clear" @click="clearSelectAll">清空</a>
        </Alert>
      </Row>
      <Row>
        <Table ref="table" :loading="loading" border :columns="columns" sortable="custom" :data="data"
               @on-sort-change="changeSort" @on-selection-change="showSelect">
          <template slot="action" slot-scope="{ row, index }">
            <Button type="primary" size="small" @click="viewData(row, index)">查看</Button>
            <Dropdown :transfer=true>
              <Button style="padding: 0 7px;height: 23.5px;">
                更多操作
                <Icon type="ios-arrow-down"/>
              </Button>
              <DropdownMenu slot="list">
                <DropdownItem @click.native="handleEdit(row, index)">修改</DropdownItem>
                <DropdownItem @click.native="deleteData(row, index)">删除</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </template>
        </Table>
      </Row>
      <Row type="flex" justify="end" class="page">
        <Page :current="searchForm.pageNumber" :total="total" :page-size="searchForm.pageSize"
              :page-size-opts="[10,20,50,100]" size="small" show-total show-elevator show-sizer @on-change="changePage"
              @on-page-size-change="changePageSize"/>
      </Row>
    </Card>
    <updateTCompany v-model="updateShow" :t-company-id="TCompanyId" :modal-title="title" @handleSearch="handleSearch"/>
  </div>
</template>
<script>
    import {deleteTCompany, queryTCompanyList} from '@/api/tCompany/tCompany'
    import {formartDate} from '@/api/tools/tool'
    import updateTCompany from './updateTCompany'

    export default {
        components: {
            updateTCompany
        },
        data() {
            return {
                search: '',
                data: [],
                columns: this.getTCompanyColumns(),
                openSearch: true, // 打开搜索
                openTip: true, // 打开提示
                loading: true, // 表单加载状态
                selectCount: 0, // 多选计数
                selectList: [], // 多选数据
                searchForm: {
                    // 搜索框对应data对象
                    value: '', // 查询
                    pageNumber: 1, // 当前页数
                    pageSize: 10, // 页面大小
                    startDate: '', // 开始时间
                    endDate: '', // 结束时间
                    sort: 'createTime', // 默认排序字段
                    order: 'desc', // 默认排序方式
                    companyName: '',
                    positionNum: '',
                    positionChar: '',
                    companyNature: '',
                    companyPhone: '',
                    responsible: '',//责任人
                },
                total: 0,
                title: '',
                TCompanyId: '',
                updateShow: false,
                tableHeight: 200,
                varSearch: '展开',//内容：展开
                flasSearch: false,//内容没有展开
                iconSearch: 'ios-arrow-down',//图标
                itemShow: false,//展开显示
                colOptions: ["企业名", "地理位置", "企业的性质", "企业联系电话", "操作"], //默认全选
                colSelect: ["企业名", "地理位置", "企业的性质", "企业联系电话", "操作"],
            }
        },
        mounted() {
            this.getDataList();
            // this.tableHeight = window.innerHeight - this.$refs.tCompanyTable.$el.offsetTop - 270
        },
        methods: {
            //查看 弹出框
            viewData(row, index) {
                this.title = '查看';
                this.TCompanyId = row.id.toString();
                this.updateShow = true;
            },
            //导出数据
            exportData() {
                this.$refs.table.exportCsv({
                    filename: '重点企业表单',
                    original: true,
                    quoted: true,
                    // separator:';'
                });
            },
            //点击展开
            switchSearch() {
                this.flasSearch = !this.flasSearch;
                if (this.flasSearch) {
                    this.varSearch = '收起';
                    this.iconSearch = "ios-arrow-up";
                    this.itemShow = true;
                } else {
                    this.varSearch = '展开';
                    this.iconSearch = 'ios-arrow-down';
                    this.itemShow = false;
                }
            },
            // 新增
            addTCompany() {
                this.title = '新增';
                this.updateShow = true
                this.TCompanyId = '';
            },
            // 修改
            handleEdit(row, index) {
                this.title = '修改';
                this.TCompanyId = row.id.toString();
                this.updateShow = true;
            },
            // 分页查询
            getDataList() {
                this.loading = true;
                this.searchForm.id = null;
                queryTCompanyList(this.searchForm).then(res => {
                    if (res && res.success) {
                        this.loading = false;
                        this.data = res.data.records;// 表单数据
                        this.total = res.data.total;// 总数据
                    }
                });
                console.log(this.total);
            },
            // 单一删除
            deleteData(row, index) {
                this.$Modal.confirm({
                    title: '确认删除',
                    content: '您确认要删除所点击选的数据?',
                    loading: true,
                    onOk: () => {
                        this.userLoading = true;
                        var ids = [];
                        ids.push(row.id);
                        this.patchdeleteData(ids);
                    },
                    onCancel: () => {
                        this.$Message.info('取消了当前的操作行为！');
                    }
                });
            },
            // 批量删除
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
            // 删除（后台）
            patchdeleteData(ids) {
                if (ids == undefined || ids == null || ids.length == 0) {
                    this.$Message.error('没有选择的数据');
                    return;
                }
                deleteTCompany({ids: ids}).then(res => {
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
            // 改变页码
            changePage(v) {
                this.searchForm.pageNumber = v;
                this.getDataList();
                this.clearSelectAll();
            },
            // 改变每页显示数据的条数
            changePageSize(v) {
                this.searchForm.pageSize = v;
                this.getDataList();
            },
            // 改变排序方式
            changeSort(e) {
                this.searchForm.sort = e.key;
                this.searchForm.order = e.order;
                if (e.order == 'normal') {
                    this.searchForm.order = '';
                }
                this.getDataList();
            },
            // 查询
            handleSearch() {
                this.searchForm.pageNumber = 1;
                this.searchForm.pageSize = 10;
                this.getDataList();
            },
            // 重置
            handleReset() {
                this.$refs.searchForm.resetFields();
                this.searchForm.pageNumber = 1;
                this.searchForm.pageSize = 10;
                this.searchForm.value = 10;

                this.searchForm.companyName = '';
                this.searchForm.companyIndustry = '';
                this.searchForm.responsible = '';
                this.searchForm.positionChar = '';
                this.searchForm.companyNature = '';
                this.searchForm.companyPhone = '';

                // 重新加载数据
                this.getDataList();
            },
            // 显示选择
            showSelect(e) {
                this.selectList = e;
                this.selectCount = e.length;
            },
            // 清空选择
            clearSelectAll() {
                this.$refs.table.selectAll(false);
            },
            //隐藏列
            checkboxChange: function (data) {
                var columnss = this.getTCompanyColumns();
                this.columns = columnss.filter(function (v) {
                    return data.indexOf(v.title) > -1 || v.type == 'selection'
                });
            },
            // 获取列表字段
            getTCompanyColumns() {
                var columnss = [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '企业名',
                        align: 'center',
                        key: 'companyName',
                        sortable: false
                    },
                    {
                        title: '企业法人',
                        align: 'center',
                        key: 'responsible',
                        sortable: false
                    }, {
                        title: '营业执照',
                        align: 'center',
                        key: 'businessLicence',
                        sortable: false
                    },
                    {
                        title: '所属行业',
                        align: 'center',
                        key: 'industryType',
                        sortable: false
                    },
                    {
                        title: '企业隶属关系',
                        align: 'center',
                        key: 'enterpriseRelation',
                        sortable: false,
                        width:150
                    },
                    {
                        title: '注册登记类型',
                        align: 'center',
                        key: 'registryType',
                        sortable: false
                    },
                    {
                        title: '企业规模',
                        align: 'center',
                        key: 'enterpriseScale',
                        sortable: false
                    },
                    {
                        title: '成立日期',
                        align: 'center',
                        key: 'foundDate',
                        sortable: false,
                        width:150,
                        render: (h, params) => {
                            return h('div',
                                formartDate(params.row.foundDate, 'yyyy-MM-dd')
                            )
                        }
                    },
                    {
                        title: '经营状态',
                        align: 'center',
                        key: 'businessStatus',
                        sortable: false
                    },
                    {
                        title: '企业联系方式',
                        align: 'center',
                        key: 'companyPhone',
                        sortable: false
                    },
                    {
                        title: '操作',
                        align: 'center',
                        slot: 'action',
                        width: 200,
                        fixed: 'right',
                    }
                ]
                this.initTableColumn(columnss);
                return columnss;
            },
            //title提示
            initTableColumn(columnss) {
                //  title提示
                for (let i = 0; i < columnss.length; i++) {
                    if (columnss[i].type != 'selection' && columnss[i].title != '操作' && columnss[i].title.indexOf("时间") == -1) {
                        if (!columnss[i].render) {
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
<style scoped="less">
  .operation {
    margin-bottom: 10px;
    position: relative;
  }

  .switchSearch {
    padding: 0 15px;
  }
</style>
