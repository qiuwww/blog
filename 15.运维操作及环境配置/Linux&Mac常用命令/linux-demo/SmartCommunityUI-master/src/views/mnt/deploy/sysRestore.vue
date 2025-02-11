<template>
  <Modal v-model="show"  :mask-closable="false"  title="系统还原" width="800px">
    <!--工具栏-->
    <Form ref="searchForm" :model="query" inline :label-width="70">
      <Form-item label="创建时间">
        <DatePicker v-model="query.createTime" type="daterange" format="yyyy-MM-dd"
                    show-week-numbers placement="bottom-end" placeholder="开始日期 -- 结束日期"
                    style="width: 205px"></DatePicker>
      </Form-item>
      <Form-item style="margin-left:-35px" class="br">
        <Button @click="searchButton" type="primary" icon="ios-search" :loading="searchLoading">搜索</Button>
      </Form-item>
    </Form>

    <!--table-->
    <Table :loading="tableLoading" :data="tableData" :columns="columns" style="width: 100%"
           @on-sort-change="changeSort" @on-selection-change="showSelect"
           @on-row-click="showRow">
    </Table>

    <!--分页组件-->
    <Page :current="searchForm.page+1" :total="total"
          :page-size="searchForm.size"
          @on-change="changePage"
          @on-page-size-change="changePageSize"
          :page-size-opts="[10,20,50,100]" size="small"
          show-total show-elevator show-sizer>
    </Page>
    <div slot="footer">
      <Button @click="show=false">
        取消
      </Button >
      <Button type='primary' :loading="loading" @click="doSubmit">
        确定
      </Button>
    </div>
  </Modal>
</template>

<script>
  import { deployHistory} from '@/api/mnt/deploy'
  import { reducte } from '@/api/mnt/deployHistory'
  import { formartDate } from '@/api/tools/tool'
  export default {
    props: {
      value: {
        type: Boolean,
        default: false
      },
      currentId: {
        type: String,
        default: ''
      },
      sysRestoreData:{
        type:Object,
      }
    },
    data() {
      return {
        id:'',
        tableData:[],
        columns:this.getColumns(),
        //分页条件
        searchForm: {
          id:'',
          page: 0, // 当前页数
          size: 10, // 页面大小
          sort: 'deployDate,desc',//排序
        },
        //总数据条数
        total:0,
        tableLoading:false,
        show:false,
        query:{
          //创建时间
          createTime:[],
        },
        searchLoading:false,
        currentChoose:'',
        loading:false,


        submitLoading: false,
        dialog: false,
        history: [],
        radio: '',
        appNames: '',
        selectRow: {}
      }
    },
    created() {
    },
    methods: {
      //table数据
      getDataList(){
        var _this =this;
        _this.tableLoading=true;
        _this.searchForm["deployId"]= this.id;
        deployHistory(_this.searchForm).then(res =>{
          console.log(res);
          _this.tableLoading = false;
          _this.tableData = res.content;
          _this.total = res.totalElements;
        })
      },
      //表格列数据
      getColumns(){
        let columnss = [
          {
            // type: 'selection',
            title:"",
            width: 60,
            key:"id",
            align: 'center',
            render: (h, params) => {
              let id = params.row.id;
              let flag = false;
              if (this.currentChoose === id) {
                flag = true
              } else {
                flag = false
              }
              let self = this;
              return h('div', [
                h('Radio', {
                  props: {
                    value: flag
                  },
                  on: {
                    'on-change': () => {
                      self.currentChoose = id;
                    }
                  }
                })
              ])
            }
          },
          {
            title: '应用名称',
            align: 'center',
            key: 'appName',
            sortable: false,
            tooltip:true,
          },
          {
            title: '部署ip',
            align: 'center',
            key: 'ip',
            sortable: false,
            tooltip:true,
          },
          {
            title: '部署时间',
            align: 'center',
            key: 'deployDate',
            sortable: false,
            tooltip:true,
            render:(h,params) => {
              if(params.row.deployDate){
                return h("span",formartDate(params.row.createTime,'yyyy-MM-dd HH:mm:ss'))
              }
            }
          },
          {
            title:'部署人员',
            align: 'center',
            key: 'deployUser',
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
        if (_this.query.createTime && (_this.query.createTime[0] || _this.query.createTime[1])) {
          //拼接时间数组格式
          var startDate = formartDate(_this.query.createTime[0],"yyyy-MM-dd HH:mm:ss");
          var endDate = formartDate(_this.query.createTime[1],"yyyy-MM-dd HH:mm:ss");
          //处理结束时间
          endDate =  endDate.replace("00:00:00", "23:59:59");
          var temp = startDate+','+endDate;
          data.createTime = temp;
        }
        data["deployId"]= this.id;
        deployHistory(data).then(res => {
          this.searchLoading = false;
          this.tableData = res.content;
          this.total = res.totalElements;
        });
      },
      showRow(row) {
        this.selectRow = row
      },
      doSubmit() {
        if (this.selectIndex === '') {
          this.$message.error('请选择要还原的备份')
        } else {
          this.submitLoading = true;
          // console.log(this.selectRow);
          reducte(JSON.stringify(this.selectRow))
            .then(res => {
              this.dialog = false
              this.submitLoading = false
              this.appNames = ''
            })
            .catch(err => {
              this.submitLoading = false
              console.log('error:' + err.response.data.message)
            })
        }
      }
    },
    watch: {
      value(val) {
        this.show = val;
      },
      currentId(val) {
        this.id = val;
      },
      show(val){
        if(val){
          if(this.sysRestoreData){
            this.tableData=this.sysRestoreData.content;
            this.total=this.sysRestoreData.totalElements;
          }

        }else {
          this.$emit('input', val);
        }

      }
    },
  }
</script>

<style scoped>
</style>
