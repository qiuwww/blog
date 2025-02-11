<template>
  <div class="left-class">
    <div style=" height: 70px;margin-top: 10px">
      <div class="city">{{ this.city }} </div>
      <img style="width: 16px;height: 16px;float: right; position: absolute;top: 35px;left: 55px;" src="/img/faviconmap/location.png">
      <div class="time_tem_wea">
        <span style="">{{ this.time }}</span>
        <span style="    position: absolute; right:0px; top: 25px;">
           <Tooltip :content="weaName" placement="bottom" style="width: 35px;height: 32px">
              <img style="width: 35px;height: 32px;float: right;    top: 7px;position: relative;" :src="weaImg">
           </Tooltip>
          {{ this.tem_wea }}</span>
      </div>

    </div>
    <Row>
      <div style="border-top: solid 1px #dedede;border-bottom: solid 1px #dedede; height: 310px;position: relative;">
        <p class="yaqurenkou">
          {{ totalName }}统计
        </p>
        <Select
          v-model="communityId"
          autocomplete="off"
          style="width:130px;float: right;margin-top: 20px;margin-right:0px;position:relative;z-index: 10;"
          clearable
          label-in-value
          @on-change="onCommunityChange"
        >
          <Option v-for="(item, i)  in communitySelectData" :key="item.id" :value="item.id.toString()">{{ item.name }}</Option>
        </Select>

        <div ref="visitChart" style="height: 320px;width: 300px;position: absolute;top:45px; left: -10px;"></div>
        <!-- <div class="totalnum" style="font-size: 15px;font-weight: bold;text-align: center;transform: translate(84px,175px);">总数:{{ personTotal }}</div> -->
      </div>
      <div style="height: 380px;">
        <p class="wanggerenyuan">
          网格人员档案
        </p>
        <Collapse v-model="value1" simple>
          <Panel name="1">
            <span style="font-size: 15px;font-weight: bold;">网格长</span>
            <div slot="content" style="display: flex;flex-wrap: wrap;">
              <div v-for="(item,i) in gridlead" class="headerClass">
                <Tooltip :content="initGrid(item)" placement="bottom">
                  <Avatar :src="item.headPortrait" />
                  <span class="xingming">
                    {{ item.name }}

                  </span>
                </Tooltip>
              </div>

            </div>
          </Panel>
          <Panel name="2">
            <span style="font-size: 15px;font-weight: bold;">专职网格员</span>
            <div slot="content" style="display: flex;flex-wrap: wrap;">
              <div v-for="(item,i) in fulltimegrid" class="headerClass">
                <Tooltip :content=" initGrid(item)" placement="bottom">
                  <Avatar :src="item.headPortrait" />
                  <span class="xingming">
                    {{ item.name }}
                  </span>
                </Tooltip>
              </div>
            </div>
          </Panel>
          <Panel name="3">
            <span style="font-size: 15px;font-weight: bold;">兼职网格员</span>
            <div slot="content" style="display: flex;flex-wrap: wrap;">
              <div v-for="(item,i) in parttimegrid" class="headerClass">
                <Tooltip :content=" initGrid(item) " placement="bottom">

                  <Avatar :src="item.headPortrait" />
                  <span class="xingming">
                    {{ item.name }}
                  </span>
                </Tooltip>
              </div>
            </div>
          </Panel>
        </Collapse>
      </div>
    </Row>
  </div>
</template>
<script>
import {
  formartDate
} from '@/api/tools/tool'
import echarts from 'echarts'
import axios from 'axios'
import {
  queryAllTZhsqGridMemberListByAnyWayWhere
} from '@/api/zhsq/tZhsqGridMember/tZhsqGridMember'

import {
  getPersonDataMaleToFemaleratio
} from '@/api/zhsq/basicPerson/basicPerson'
import {
  getCommunity
} from '../../../api'
import vPinyin from '@/assets/vue-py';
export default {
  data() {
    return {
      communityId: '',
      communitySelectData: [],
      personTotal: '',
      city: '',
      tem_wea: '',
      time: '',
      gridlead: [],
      fulltimegrid: [],
      parttimegrid: [],
      value1: '1',
      totalName: '',
      weaImg:"/img/tq/yin.png",
      weaName:"阴"
    }
  },
  mounted() {
    this.visitChart = echarts.init(this.$refs.visitChart)
    this.getwether()
    // this.layermanageInit(this.communityId,true)
  },
  created() {
    this.getGridMemberList(this.communityId)
    getCommunity({}).then(res => {
      if (res && res.success) {
        this.communitySelectData = res.data
        let UserObj=JSON.parse(sessionStorage.getItem("UserObj"));
        if(UserObj && UserObj.communityId && res.data && res.data.length>0  ){
          this.communitySelectData = res.data.filter(item=>item.id==UserObj.communityId)
        }
      }
    })
  },
  methods: {
    // 社区修改
    onCommunityChange(e) {
      if (e) {
        this.communityId = e.value
      } else {
        this.communityId = ''
      }
      this.layermanageInit(this.communityId)
      this.getGridMemberList(this.communityId)
    },
    // 获取天气
    getwether() {
      this.time = formartDate(new Date().getTime(), 'yyyy年MM月dd日www')
      axios({
        method: 'get',
        url: 'https://www.tianqiapi.com/free/day?appid=74118432&appsecret=w5b1Ghc4&vue=1'
      }).then((response) => {
        this.city = response.data.city
        this.weaImg = "/img/tq/"+vPinyin.chineseToPinYin(response.data.wea) +".png"
        this.weaName= response.data.wea;
        this.tem_wea = ""+ response.data.tem_day + '℃/' + response.data.tem_night + '℃'
      }, function(response) {
        console.log('错误信息：' + response)
      })
    },
    // 加载echars图表
    layermanageInit(communityId, isFather) {

      let searchForm = {}
      searchForm.communityId = communityId;
      let UserObj=JSON.parse(sessionStorage.getItem("UserObj"));
      if(UserObj && UserObj.gridId ){
        searchForm.gridId = UserObj.gridId;
      }
      this.communityId = communityId
      const _this = this
      getPersonDataMaleToFemaleratio(searchForm).then(res => {
        if (res && res.success) {
          const data = []

          let name = ''
          if (_this.$parent.Btsq || _this.$parent.BtAll) {
            _this.personTotal = res.data.personType[0].usually + res.data.personType[0].huji + res.data.personType[0].liudong +
              res.data.personType[0].jingwai + res.data.personType[0].waichu
            data.push({ value: res.data.personType[0].usually, name: '常住人口' })
            data.push({ value: res.data.personType[0].huji, name: '户籍人口' })
            data.push({ value: res.data.personType[0].liudong, name: '流动人口' })
            data.push({ value: res.data.personType[0].jingwai, name: '境外人口' })
            data.push({ value: res.data.personType[0].waichu, name: '外出人口' })
            name = '人口'
          } else if (_this.$parent.Btzz) {
            name = '社会组织'
            const dataType = res.data.socialType
            _this.personTotal = dataType.geti + dataType.shanghu + dataType.tuanti +
              dataType.jiaoyu + dataType.feiyingli + dataType.weisheng + dataType.qita
            data.push({ value: dataType.geti, name: '个体商户' })
            data.push({ value: dataType.shanghu, name: '企业' })
            data.push({ value: dataType.tuanti, name: '社会团体' })
            data.push({ value: dataType.jiaoyu, name: '教育机构' })
            data.push({ value: dataType.feiyingli, name: '非盈利性组织' })
            data.push({ value: dataType.weisheng, name: '卫生事业组织' })
            data.push({ value: dataType.qita, name: '其他' })
          } else if (_this.$parent.Btfw) {
            name = '房屋档案'
            const dataType = res.data.houseType
            let kongzhi = 0
            let qita = 0
            let zizhu = 0
            let zulin = 0
            if (dataType && dataType.length > 0) {
              for (var i in dataType) {
                let item = dataType[i]
                if (item && item.kongzhi && item.qita && item.zizhu && item.zizhu) {
                  kongzhi += item.kongzhi
                  qita += item.qita
                  zizhu += item.zizhu
                  zulin += item.zizhu
                }
              }
            }
            _this.personTotal = kongzhi + qita + zizhu + zulin
            data.push({ value: kongzhi, name: '空置' })
            data.push({ value: qita, name: '其他' })
            data.push({ value: zizhu, name: '自住' })
            data.push({ value: zulin, name: '租赁' })
          } else if (_this.$parent.Btss) {
            name = '公共设施'
            const dataType = res.data.buildingType
            // _this.personTotal = dataType.bangong+dataType.gongchang+dataType.gonggong
            //   +dataType.gongyuan+dataType.qita+dataType.zhuzhai;
            _this.personTotal = dataType.bangong + dataType.gongchang + dataType.gonggong +
              dataType.gongyuan + dataType.qita
            data.push({ value: dataType.bangong, name: '办公楼' })
            data.push({ value: dataType.gongchang, name: '工厂' })
            data.push({ value: dataType.gonggong, name: '公共设施' })
            data.push({ value: dataType.gongyuan, name: '公园景点' })
            // data.push({value:dataType.zhuzhai,name:"住宅"});
            data.push({ value: dataType.qita, name: '其他' })
          } else if (_this.$parent.Btsh) {
            name = '商户档案'
            const dataType = res.data.merchantType
            _this.personTotal = dataType.canyin + dataType.gongyi + dataType.minsheng +
              dataType.pifa + dataType.yiban
            data.push({ value: dataType.canyin, name: '餐饮娱乐类' })
            data.push({ value: dataType.gongyi, name: '公益类' })
            data.push({ value: dataType.minsheng, name: ' 民生类' })
            data.push({ value: dataType.pifa, name: '批发类' })
            data.push({ value: dataType.yiban, name: '一般类' })
          } else if (_this.$parent.Btsj) {
            name = '事件'
            const dataType = res.data.urgentType
            _this.personTotal = dataType.putong + dataType.yiban + dataType.jingji

            data.push({ value: dataType.putong, name: '普通' })
            data.push({ value: dataType.yiban, name: '一般' })
            data.push({ value: dataType.jingji, name: '紧急' })
            // data.push({value:dataType.pifa,name:"空闲"});
          }
          let setMapName = ''
          if (_this.$parent.Btsq) {
            setMapName = '社区'
          } else if (_this.$parent.BtAll) {
            setMapName = '全部'
          } else {
            setMapName = name
          }
          if (!isFather) {
            this.$parent.linkageLeftGisMap(this.communityId, setMapName)
          }
          // else{
          //   this.$parent.linkageLeftGisMap("", setMapName)
          // }
          this.totalName = name

          this.visitChart.setOption({
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
            title: {
              /* text: `总数：` \n +this.personTotal, */
              text: `  总数 \n${this.personTotal} `,
              left: 'center',
              top: 'center',
              textStyle: {
                color: '#000',
                fontSize: 16,
                align: 'center'
              }
            },
            legend: {
              top:10,
              orient: 'horizontal',
              left: 10,
              textStyle: {
                color: '#3e3e3e',
                fontSize: 12,

              },
              icon: 'roundRect',
              data: data,
            },
            series: [{
              name: name,
              type: 'pie',
              minAngle:45,
              radius: ['35%', '55%'],       //饼图大小
              center: ['50%', '50%'],
              avoidLabelOverlap: true,
              label: {
                position: 'inner',
                formatter: '{d}%',
                textStyle: {
                  color: '#3e3e3e',
                  fontSize: 12,
                },
              },
              data: data
            }],
            color: [
              '#7A7EFF',
              '#088FF8',
              '#3AD4E6',
              '#3BD687',
              '#FFCC00',
              '#FF842B',
              '#EE5C5C'
            ],
            itemStyle: {
              borderWidth: 5,
              borderColor: 'rgba(255, 255, 255, 1)'
            }
          })


         //  var rich = {
         //    white: {
         //      color: '#ddd',
         //      align: 'center',
         //      padding: [3, 0]
         //    }
         //  };
         //  var placeHolderStyle = {
         //    normal: {
         //      label: {
         //        show: false
         //      },
         //      labelLine: {
         //        show: false
         //      },
         //      color: 'rgba(0, 0, 0, 0)',
         //      borderColor: 'rgba(0, 0, 0, 0)',
         //      borderWidth: 0
         //    }
         //  };
         //  let datas = [];
         //  let scaleData  =data;
         //  var color=['#00ffff','#00cfff','#006ced','#ffe000','#ffa800','#ff5b00','#ff3000']
         //  for (var i = 0; i < scaleData.length; i++) {
         //    datas.push({
         //      value: scaleData[i].value,
         //      name: scaleData[i].name,
         //      itemStyle: {
         //        normal: {
         //          borderWidth: 4,
         //          shadowBlur: 200,
         //          borderColor:color[i],
         //          shadowColor: color[i]
         //        }
         //      }
         //    }, {
         //      value: 2,
         //      name: '',
         //      itemStyle: placeHolderStyle
         //    });
         //  }
         //  var seriesObj = [{
         //    name: '',
         //    type: 'pie',
         //    clockWise: false,
         //    radius: [50, 80],
         //    hoverAnimation: false,
         //    itemStyle: {
         //      normal: {
         //        label: {
         //          show: true,
         //          position: 'outside',
         //          color: '#ddd',
         //          formatter: function(params) {
         //            var percent = 0;
         //            var total = 0;
         //            for (var i = 0; i < scaleData.length; i++) {
         //              total += scaleData[i].value;
         //            }
         //            percent = ((params.value / total) * 100).toFixed(0);
         //            if(params.name !== '') {
         //              return params.name + '\n{white|' + '占比' + percent + '%}';
         //            }else {
         //              return '';
         //            }
         //          },
         //          rich: rich
         //        },
         //        labelLine: {
         //          length:30,
         //          length2:100,
         //          show: true,
         //          color:'#00ffff'
         //        }
         //      }
         //    },
         //    data: datas
         //  }];
         // let option = {
         //    backgroundColor: '#f8f8f7e6',
         //    tooltip: {
         //      show: false
         //    },
         //    legend: {
         //      show: false
         //    },
         //    toolbox: {
         //      show: false
         //    },
         //    series: seriesObj
         //  }
         //  this.visitChart.setOption(option);
        }
      });

    },
    // 查询网格员
    getGridMemberList(communityId) {
      this.gridlead = []
      this.fulltimegrid = []
      this.parttimegrid = []

      let searchForm = {}
      searchForm.communityId = communityId;
      let UserObj=JSON.parse(sessionStorage.getItem("UserObj"));
      if(UserObj && UserObj.gridId ){
        searchForm.gridId = UserObj.gridId;
      }
      queryAllTZhsqGridMemberListByAnyWayWhere(searchForm).then(res => {
        if (res && res.success) {
          res.data.forEach(element => {
            if (element.post == '网格长') {
              if (element.headPortrait == null || element.headPortrait == '') {
                element.headPortrait = '/img/archives/tx_mr.png'
                this.gridlead.push(element)
              } else {
                this.gridlead.push(element)
              }
            } else if (element.post == '专职网格员') {
              if (element.headPortrait == null || element.headPortrait == '') {
                element.headPortrait = '/img/archives/tx_mr.png'
                this.fulltimegrid.push(element)
              } else {
                this.fulltimegrid.push(element)
              }
            } else if (element.post == '兼职网格员') {
              if (element.headPortrait == null || element.headPortrait == '') {
                element.headPortrait = '/img/archives/tx_mr.png'
                this.parttimegrid.push(element)
              } else {
                this.parttimegrid.push(element)
              }
            }
          })
        }
      }).catch(err => {
        this.gridlead = []
        this.fulltimegrid = []
        this.parttimegrid = []
        this.$Message.error("查询网格人员异常,请联系管理员!!!!")
      });
    },
    initGrid(item) {
      let str = ''
      if (item.gridsPersonGrids && item.gridsPersonGrids.length > 0) {
        item.gridsPersonGrids.forEach(function(i) {
          str += ',' + i.gridsName
        })
        if (str != '') {
          str = str.substring(1)
        }
      }
      return str
    }
  }
}
</script>

<style lang="less" >
.left-class {
  width: 300px;
  /*height: 100%;*/
  position: absolute;
  z-index: 9;
  left: 0px;
  top: 20px;
  background-color:#f8f8f7e6;
  padding: 20px;
  height: calc(100vh - 30px);
  overflow-y: auto;
  overflow-x: hidden;
  .headerClass {
    width: 25%;
    text-align: center;
    font-size: 14px;
  }

  .ivu-avatar {
    display: block !important;
    margin: 0 auto;
    width: 60px;
    height: 60px;
    margin-bottom: 8px;
  }
  .time_tem_wea{
    margin-top: 5px;
    height: 21px;
    font-size: 15px;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    font-weight: 400;
    text-align: left;
    color: #7e7e7e;
    line-height: 21px;
  }
  .city{
    width: 32px;
    height: 21px;
    font-size: 16px;
    font-family: Microsoft YaHei, Microsoft YaHei-Bold;
    font-weight: 700;
    text-align: left;
    color: #3e3e3e;
    line-height: 26px;
  }
  .yaqurenkou{
    float: left;
    margin-top: 20px;
    width: 110px;
    height: 21px;
    font-size: 16px;
    font-family: Microsoft YaHei, Microsoft YaHei-Bold;
    font-weight: 700;
    text-align: left;
    color: #3e3e3e;
    line-height: 26px;
  }
  .wanggerenyuan{
    margin-top: 20px;
    margin-bottom: 20px;
    width: 96px;
    height: 21px;
    font-size: 16px;
    font-family: Microsoft YaHei, Microsoft YaHei-Bold;
    font-weight: 700;
    text-align: left;
    color: #3e3e3e;
    line-height: 26px;
  }
  .xingming{
    margin-top: 8px;
    width: 39px;
    height: 17px;
    font-size: 13px;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    font-weight: 400;
    text-align: center;
    color: #3e3e3e;
  }
  .ivu-collapse-simple {
    border-left: none;
    border-right: none;
    border-top: none;
    border-bottom: none !important;
    background-color: #5c5d7500;
    .ivu-collapse-content {
    	padding:0!important;
      background-color: #5c5d7500;
    }
  }
  .ivu-collapse>.ivu-collapse-item {
    border: none !important;
  }
  .ivu-collapse-header{
    height: 17px;
    font-size: 13px;
    font-family: Microsoft YaHei, Microsoft YaHei-Bold;
    font-weight: 700;
    text-align: left;
    color: #3e3e3e;
  }

}
.left-class {
  overflow: hidden;
}

.left-class:hover {
  overflow-y: scroll;
}

.left-class:hover::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}

.left-class:hover::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 5px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #aaa;
}

.left-class:hover::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  background: #ededed;
  display: none;
}
.totalnum{

}
</style>
