<style lang="less">
  .search {
    .searchRow {
      .ivu-select {
        width: 200px;
      }
    }
  }
</style>
<style scoped>
  @import '../../../styles/default/indexHome.css';
</style>
<template>
  <Tabs style="margin-top: 5px;" value="name1">
    <TabPane label="档案列表" name="name1">
      <basic-person-list @handleSearch="handleSearchPage"></basic-person-list>

    </TabPane>
    <TabPane label="老人档案" name="name3" >
      <old-man-list @handleSearch="getDataList" ref="oldManList"></old-man-list>
    </TabPane>
    <TabPane label="人口档案统计" name="name2" v-if="permitIds.includes('archive_staff_renkou_tongji')">
      <div ref="personType" style="height: 500px;width: 50%;margin-top: 100px;float: left;"></div>
      <div ref="specialPerson" style="height: 500px;width: 50%;margin-top: 100px;float: right;"></div>
    </TabPane>
  </Tabs>

</template>
<script>
  import {
    deleteBasicPerson,
    queryBasicPersonList,
    count,
    getSpecialPersonCount
  } from '@/api/zhsq/basicPerson/basicPerson'
  import {personTypeData, communityData} from '@/api/tools/zhsqSelectData'
  import {queryAllList} from "@/api/zhsq/basicGrids/basicGrids"
  import lookBasicPerson from '../basicPerson/lookBasicPerson'
  import basicPersonList from '../basicPerson/basicPersonList'
  import oldManList from '../oldMan/oldManList'
  import {formartDate} from '@/api/tools/tool'
  import echarts from 'echarts';
  import {getDictionary, getStreet, getCommunity} from '@/api/index';
  import {mapGetters} from "vuex";

  export default {
    components: {
      lookBasicPerson,
      basicPersonList,
      oldManList
    },
    computed: {
      ...mapGetters(["permitIds"])
    },
    data() {
      return {
        personType: {},
        specialPerson: {},
        uploadPersonShow: false,
        //人口类型
        personTypeData: [],
        //街道
        streetData: [],
        //社区
        communityData: [],
        //网格
        gridData: [],
        deleteShow: false,
        drop: false,
        dropDownContent: "展开",
        dropDownIcon: "ios-arrow-down",
        search: '',
        data: [],
        columns: this.getBasicPersonColumns(),
        openSearch: true,//打开搜索
        openTip: true,//打开提示
        loading: true, // 表单加载状态
        selectCount: 0, // 多选计数
        selectList: [], // 多选数据
        searchForm: {
          // 搜索框对应data对象
          name: '',
          phone: null,
          cardId: '',
          personType: '',
          ownedCommunity: '',
          ownedGridId: '',
          pageNumber: 1, // 当前页数
          pageSize: 10, // 页面大小
          startDate: null,//开始时间
          endDate: null,//结束时间
          sort: 'create_time', // 默认排序字段
          order: 'desc' // 默认排序方式
        },
        gridName: '',
        total: 0,
        title: '',
        BasicPersonId: '',
        updateShow: false,
        tableHeight: 200,
        gridsData: [],
        colOptions: ["姓名", "性别", "人口类型", "身份证号", "所属社区", "所属网格", "创建时间", "操作"],
        colSelect: ["姓名", "性别", "人口类型", "身份证号", "所属社区", "所属网格", "创建时间", "操作"],
      }
    },
    methods: {
      //刷新老人档案
      handleSearchPage(){
        this.$refs.oldManList.getDataList();
        this.getDataList();
      },
      //获取街道
      getStreetData() {
        getStreet({}).then(res => {
          if (res && res.success) {
            this.streetData = res.data;
          }
        });
      },
      //街道改变
      streetChange(e) {
        if (e) {
          //社区
          this.searchForm.communityId = '';
          this.communityData = [];
          //网格
          this.searchForm.houseGridId = '';
          this.gridData = [];
          getCommunity({streetId: e.value}).then(res => {
            if (res && res.success) {
              this.communityData = res.data;
            }
          });
        }
        this.getDataList();
      },
      //社区改变
      communityChange(e) {
        if (e) {
          //网格
          this.searchForm.houseGridId = '';
          this.gridData = [];
          queryAllList({communityId: e.value}).then(res => {
            if (res.data.length > 0) {
              this.gridData = res.data;
            }
          });
        }
        this.getDataList();
      },
      //人口类型
      getPersonType() {
        getDictionary({fieldName: 'personTypeDatas'}).then(res => {
          if (res && res.success) {
            this.personTypeData = res.data;
          }
        });
      },
      //导出
      exportData() {
        let excolumns = this.columns.filter(function (v) {
          return v.title != "操作" && v.type != 'selection'
        });
        this.$refs.table.exportCsv({
          filename: '本页数据',
          columns: excolumns,
          data: this.data
        });
      },
      //列表上方更多操作
      handleDropdown(name) {
        if (name == "refresh") {
          this.getDataList();
        } else if (name == "removeAll") {
          this.delAll();
        } else if (name == "export") {

        } else if (name == "uploadPerson") {
          this.uploadPersonShow = true;
          this.title = "上传";
        }
      },
      //展开 收起
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
      //查看
      handleLook(row, index) {
        this.title = '查看人员';
        this.gridName = row.gridName;
        this.BasicPersonId = row.id.toString();
        this.deleteShow = true;
      },
      //分页查询
      getDataList() {
        this.loading = true;
        this.searchForm.id = null;
        this.selectCount = 0;
        queryBasicPersonList(this.searchForm).then(res => {
          if (res && res.success) {
            this.loading = false;
            this.data = res.data.records;
            this.total = res.data.total;
            //人口类型
            this.getPersonType();
            //街道
            this.getStreetData();
          }
        });
        //数据统计 人口类别分布
        count({}).then(res => {
          if (res.data) {
            let countData = res.data;
            //合江亭网格一...
            let item = [], changzhu = [], huji = [], liudong = [], jingwai = [], waichu = [];

            countData.map(i => {
              item.push(i.community + i.grid);
              changzhu.push(i.usually);
              huji.push(i.huji);
              liudong.push(i.liudong);
              jingwai.push(i.jingwai);
              waichu.push(i.waichu);
            });
            let legend=[ "常住人口", "户籍人口", "流动人口", "境外人口", "外出人口"];
            this.listArr=[changzhu,huji,liudong,jingwai , waichu ];

            let option = {
              tooltip: {
                trigger: 'axis',
              },
              color: ["#FFCC21", "#67ACFE",  "#86B4F8", "#95DAFF", "#B4BAFF" ],

              legend: {
                top: 10,
                left: 200,
                itemWidth: 10,
                itemHeight: 10,
                icon: 'roundRect',
                // padding: [5, 10],
                textStyle: {
                  fontSize: 14,
                  color: '#000000',
                  padding: [3, 0, 0, 0]
                },

                data: legend,
              },
              grid: {
                left: '10%',
                top: '8%',
                right: '5%',
                bottom: '19%',
              },
              xAxis: {
                type: 'category',
                axisLabel: {
                  color: '#000000',
                  fontSize: 10,
                  formatter: function (value) {
                    let str = "";
                    if (value && value.length > 0) {
                      for (let i = 0; i < value.length; i = i + 2) {
                        if (i + 2 < value.length) {
                          str += value.substring(i, i + 2) + "\n";
                        } else {
                          str += value.substring(i, value.length );
                        }
                      }
                    }
                    return str;
                  }
                },
                axisLine: {
                  show: false,
                  lineStyle: {
                    color: '#000000'
                  },
                  width: 5
                },
                axisTick: {
                  show: false,
                },
                data:item,
              },
              yAxis: {
                type: 'value',
                axisLabel: {
                  color: '#000000',

                },
                axisLine: {
                  lineStyle: {
                    color: '#000000'
                  },
                  width: 5
                },
                axisTick: {
                  show: false,
                },
                splitLine: {
                  lineStyle: {
                    color: 'rgba(150, 164, 244, 0.3)'
                  }
                },
              },
              series: [

              ]
            };
            for (let i = 0; i < legend.length; i++) {
              option.series.push({
                name: legend[i],
                type: 'bar',
                stack: '人群总量',
                barWidth: '45%',
                label: {
                  show: false,
                  position: 'insideRight'
                },
                data:this.listArr[i]
              })
            }

            this.personType.setOption(option);
          }
        });

        //数据统计 特殊人群分布
        getSpecialPersonCount({}).then(res => {
            if (res && res.success) {
              let countData = res.data;
              //合江亭网格一...
              let item = [], shejiang = [], xidu = [], xingshi = [], shangfang = [], jingshen = [], shexie = [];
              countData.map(i => {
                item.push(i.community + i.grid);
                shejiang.push(i.shejiang);
                xidu.push(i.xidu);
                xingshi.push(i.xingshi);
                shangfang.push(i.shangfang);
                jingshen.push(i.jingshen);
                shexie.push(i.shexie);
              });

              let option = {
                backgroundColor: '#ffffff00',
                tooltip: {
                  trigger: 'axis',
                  axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                  }
                },
                grid: {
                  left: '10%',
                  top: '8%',
                  right: '5%',
                  bottom: '19%',
                },
                legend: {
                  show: true,
                  icon: 'roundRect',
                  stack: '社区',
                  orient: 'horizontal',
                  top: '0.5%',
                  right: '8%',
                  itemWidth: 18.5,
                  itemHeight: 6,
                  itemGap: 30,
                  data: ['涉疆涉藏', '吸毒人员', '刑释人员', '上访人员', '精神智障患者', '涉邪人员'],
                  textStyle: {
                    // color: '#FFFFFF'
                    // color: '#C9C8CD'
                  }
                },
                xAxis: [{
                  type: 'category',
                  data: item,
                  axisLabel: {
                    show: true,
                    fontSize: 10,
                    textStyle: {
                      // color: "#000000" //X轴文字颜色
                    },
                    formatter: function (value) {
                      let str = "";
                      if (value && value.length > 0) {
                        for (let i = 0; i < value.length; i = i + 2) {
                          if (i + 2 < value.length) {
                            str += value.substring(i, i + 2) + "\n";
                          } else {
                            str += value.substring(i, value.length );
                          }
                        }
                      }
                      return str;
                    }
                  },
                  axisLine: {
                    show: true //不显示x轴
                  },
                  axisTick: {
                    show: true //不显示刻度
                  },
                  // boundaryGap: false,
                  splitLine: {
                    show: true,
                    width: 0.08,
                    lineStyle: {
                      type: "solid",
                      color: "#f5f7f9"
                    }
                  },
                  axisPointer: { //轴指示器
                    type: 'shadow',
                    z: 1,
                    shadowStyle: {
                      color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                          offset: 0,
                          color: 'rgba(18,155,249,0)' // 0% 处的颜色
                        }, {
                          offset: 1,
                          color: 'rgba(18,155,249,1)' // 100% 处的颜色
                        }],
                        global: false // 缺省为 false
                      },
                      shadowColor: 'rgba(0, 0, 0, 0.2)',
                      shadowBlur: 5
                    }
                  },

                }],
                yAxis: [{
                  type: 'value',
                  // scale: true, //坐标轴起点不限制0
                  axisLabel: {
                    show: true,
                    textStyle: {
                      fontSize: 12,
                      // color: "#000000" //X轴文字颜色
                    }
                  },
                  splitLine: {
                    show: true,
                  },
                  axisTick: {
                    show: true, //不显示刻度
                  },
                  axisLine: {
                    show: true,
                  },
                  nameTextStyle: {
                    color: "#FFFFFF"
                  },
                  splitArea: {
                    show: false
                  }
                }],
                series: [
                  {
                    name: '涉疆涉藏',
                    type: 'bar',
                    barWidth: '45%',
                    data: shejiang,
                    stack: '特殊人口总量',
                    itemStyle: {
                      normal: {
                        color: "#5aff82"
                      },
                    },
                  },
                  {
                    name: '吸毒人员',
                    type: 'bar',
                    barWidth: '45%',
                    data: xidu,
                    stack: '特殊人口总量',
                    itemStyle: {
                      normal: {
                        color: "#3ace83"
                      },
                    },
                  },
                  {
                    name: '刑释人员',
                    type: 'bar',
                    barWidth: '45%',
                    data: xingshi,
                    stack: '特殊人口总量',
                    itemStyle: {
                      normal: {
                        color: "#7e7e7e"
                      },
                    },
                  },
                  {
                    name: '上访人员',
                    type: 'bar',
                    barWidth: '45%',
                    stack: '特殊人口总量',
                    data: shangfang,
                    itemStyle: {
                      normal: {
                        color: "#ffcc00"
                      },
                    },

                  },
                  {
                    name: '精神智障患者',
                    type: 'bar',
                    data: jingshen,
                    barWidth: '45%',
                    stack: '特殊人口总量',
                    markLine: {
                      lineStyle: {
                        type: 'dashed'
                      },
                      data: [
                        [{type: 'min'}, {type: 'max'}]
                      ]
                    },
                    itemStyle: {
                      normal: {
                        color: "#13c2ff"
                      },
                    },
                  },
                  {
                    name: '涉邪人员',
                    type: 'bar',
                    barWidth: '45%',
                    data: shexie,
                    stack: '特殊人口总量',
                    itemStyle: {
                      normal: {
                        color: "#7a7eff"
                      },
                    },
                  }
                ]
              };


              this.specialPerson.setOption(option);
              // this.specialPerson.setOption({
              //   tooltip: {
              //     trigger: 'axis',
              //     axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              //       type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
              //     }
              //   },
              //   legend: {
              //     data: ['涉疆涉藏', '吸毒人员', '刑释人员', '上访人员', '精神智障患者', '涉邪人员']
              //   },
              //   grid: {
              //     left: '3%',
              //     right: '4%',
              //     bottom: '3%',
              //     containLabel: true
              //   },
              //   xAxis: [
              //     {
              //       type: 'category',
              //       data: item//['合江亭社区一网格', '合江亭社区二网格', '合江亭社区三网格', '青莲社区一网格']
              //     }
              //   ],
              //   yAxis: [
              //     {
              //       type: 'value'
              //     }
              //   ],
              //   axisLabel: {
              //     interval: 0,
              //     formatter: function (value) {
              //       var ret = "";//拼接加\n返回的类目项
              //       var maxLength = 2;//每项显示文字个数
              //       var valLength = value.length;//X轴类目项的文字个数
              //       var rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数
              //       if (rowN > 1)//如果类目项的文字大于3,
              //       {
              //         for (var i = 0; i < rowN; i++) {
              //           var temp = "";//每次截取的字符串
              //           var start = i * maxLength;//开始截取的位置
              //           var end = start + maxLength;//结束截取的位置
              //           //这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧
              //           temp = value.substring(start, end) + "\n";
              //           ret += temp; //凭借最终的字符串
              //         }
              //         return ret;
              //       } else {
              //         return value;
              //       }
              //     }
              //   },
              //   series: [
              //     {
              //       name: '涉疆涉藏',
              //       type: 'bar',
              //       data: shejiang
              //     },
              //     {
              //       name: '吸毒人员',
              //       type: 'bar',
              //       stack: '广告',
              //       data: xidu
              //     },
              //     {
              //       name: '刑释人员',
              //       type: 'bar',
              //       stack: '广告',
              //       data: xingshi
              //     },
              //     {
              //       name: '上访人员',
              //       type: 'bar',
              //       stack: '广告',
              //       data: shangfang
              //     },
              //     {
              //       name: '精神智障患者',
              //       type: 'bar',
              //       data: jingshen,
              //       markLine: {
              //         lineStyle: {
              //           type: 'dashed'
              //         },
              //         data: [
              //           [{type: 'min'}, {type: 'max'}]
              //         ]
              //       }
              //     },
              //     {
              //       name: '涉邪人员',
              //       type: 'bar',
              //       data: shexie
              //     }
              //   ]
              // });
            }
          }
        )

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
            this.$Message.info('取消了当前的操作行为！');
          },
        });
      }
      ,
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
      }
      ,
      //删除（后台）
      patchdeleteData(ids) {
        if (ids == undefined || ids == null || ids.length == 0) {
          this.$Message.error('没有选择的数据');
          return;
        }
        deleteBasicPerson({ids: ids}).then(res => {
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
      }
      ,
      //改变页码
      changePage(v) {
        this.searchForm.pageNumber = v;
        this.getDataList();
        this.clearSelectAll();
      }
      ,
      //改变每页显示数据的条数
      changePageSize(v) {
        this.searchForm.pageSize = v;
        this.getDataList();
      }
      ,
      //改变排序方式
      changeSort(e) {
        this.searchForm.sort = e.key;
        this.searchForm.order = e.order;
        if (e.order == 'normal') {
          this.searchForm.order = '';
        }
        this.getDataList();
      }
      ,
      //查询
      handleSearch() {
        this.searchForm.pageNumber = 1;
        this.searchForm.pageSize = 10;
        this.getDataList();
      }
      ,
      //重置
      handleReset() {
        this.searchForm.pageNumber = 1;
        this.searchForm.pageSize = 10;
        this.searchForm.name = '';
        this.searchForm.phone = null;
        this.searchForm.cardId = '';
        this.searchForm.personType = '';
        this.searchForm.streetId = '';
        this.searchForm.communityId = '';
        this.communityData = [];
        this.searchForm.ownedGridId = '';
        this.gridData = [];
        // 重新加载数据
        this.getDataList();
      }
      ,
      //显示选择
      showSelect(e) {
        this.selectList = e;
        this.selectCount = e.length;
      }
      ,
      //清空选择
      clearSelectAll() {
        this.$refs.table.selectAll(false);
      }
      ,
      //获取列表字段
      getBasicPersonColumns() {
        return [
          {
            type: 'selection',
            width: 60,
            align: 'center',
          },
          {
            title: '姓名',
            align: 'center',
            key: 'name',
            sortable: false,
            tooltip: true,
            minWidth: 70
          },
          {
            title: '性别',
            align: 'center',
            key: 'sex',
            tooltip: true,
            sortable: false,
            minWidth: 70
          },
          {
            title: '人口类型',
            align: 'center',
            key: 'personType',
            tooltip: true,
            sortable: false,
            minWidth: 100,
            render: (h, param) => {
              if (param.row.personType) {
                let tempArr = this.personTypeData.filter(item => item.number.toString() === param.row.personType.toString());
                if (tempArr.length > 0) {
                  // return h('span', tempArr[0].name)
                  return h('Tooltip', {
                    props: {
                      content: tempArr[0].name,
                      placement: 'bottom',
                      transfer: true
                    }
                  }, tempArr[0].name)
                } else {
                  // return h('span', '暂无');
                  return h('Tooltip', {
                    props: {
                      content: '暂无',
                      placement: 'bottom',
                      transfer: true
                    }
                  }, '暂无')
                }
              } else {
                // return h('span', '暂无');
                return h('Tooltip', {
                  props: {
                    content: '暂无',
                    placement: 'bottom',
                    transfer: true
                  }
                }, '暂无')
              }
            }
          },
          {
            title: '身份证号',
            align: 'center',
            key: 'cardId',
            tooltip: true,
            sortable: false,
            minWidth: 100
          },
          {
            title: '所属社区',
            align: 'center',
            key: 'communityName',
            tooltip: true,
            sortable: false,
            minWidth: 100
          },
          {
            title: '所属网格',
            align: 'center',
            key: 'ownedGrid',
            tooltip: true,
            sortable: false,
            minWidth: 100
          },
          {
            title: '创建时间',
            align: 'center',
            key: 'createTime',
            minWidth: 170,
            tooltip: true,
            render: (h, params) => {
              /*return h('div',
                  formartDate(params.row.createTime, 'yyyy-MM-dd HH:mm:ss')
              )*/
              return h('Tooltip', {
                props: {
                  content: formartDate(params.row.createTime, 'yyyy-MM-dd HH:mm:ss'),
                  placement: 'bottom',
                  transfer: true
                }
              }, formartDate(params.row.createTime, 'yyyy-MM-dd HH:mm:ss'))
            }
          },
          {
            title: '操作',
            align: 'center',
            slot: 'action',
            width: 200,
          }
        ]
      }
      ,
      //动态列实现
      checkboxChange: function (data) {
        var columnss = this.getBasicPersonColumns();
        this.columns = columnss.filter(function (v) {
          return data.indexOf(v.title) > -1 || v.type == 'selection'
        })
      }
    },
    mounted() {
      this.personType = echarts.init(this.$refs.personType);
      this.specialPerson = echarts.init(this.$refs.specialPerson);
      this.getDataList();
    }
  }
</script>
<style scoped="less">
  .operation {
    margin-bottom: 10px;
  }
</style>
