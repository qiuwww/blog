<template>
  <div class="leftTotalDiv">
    <row class="titleName">
        泸州市
    </row>
    <div v-show="indexShow">
        <row>
          <Input @on-focus="indexShow=!indexShow;" suffix="ios-search" :border="false" placeholder="请输入搜索关键词"  style="width: 100%" />
        </row>
        <row style="margin-top: 1vh">
          <ButtonGroup size="large" style="width: 100%">
            <Button @click="statisticsShow=true" :type="statisticsShow === true ? 'primary' : 'default'"  style="width: 50%"> <Icon type="md-list-box" />辖区概况</Button>
            <Button @click="statisticsShow=false" :type="statisticsShow === false ? 'primary' : 'default'"   style="width: 50%"><Icon type="ios-podium" />数据统计</Button>
          </ButtonGroup>
        </row>
        <row v-if="statisticsShow" style="margin: 1vh 0;text-align: center;">
          <Col style="margin: 0.5vh 0" v-for="(item,i) in areaList" span="8">
            <p class="pValue">{{ item.value }}</p>
            <a class="aValue">
              <img style="height: 0.5vw;" :src=item.icon />
              {{ item.name }}</a>
          </Col>
        </row>
        <row v-if="!statisticsShow" style="margin: 1vh 0;">
          <Col style="margin: 0.5vh 0"  span="24">
            <span class="titleBankground">事件统计</span>
            <Col v-for="item in sjtj" style="margin: 0.5vh 0"  span="24">
              <div style="height: 20vh;width: 100%;overflow: hidden;">
                <div class="statisticsClass">
                  <span>{{ item.name }}</span>
                  <div style="float: right;display: flex;margin: auto;">
                    <span>事件总数:{{item.total}}</span>
                    <Divider style="background-color: #bfdefd;height: 1vw;" type="vertical" />
                    <span>办结率:{{ (item.value/item.total).toFixed(2)*100}}%</span>
                  </div>
                </div>
                <div class="statistics-text">
                  <div style="margin: auto;"><p style="color: red;font-weight: 900;">{{item.total-item.value}}</p><p class="p-title">未办结</p></div>
                  <Divider style="background-color: #bfdefd;height: 1vw;margin: auto;" type="vertical" />
                  <div style="margin: auto;"><p style="font-weight: 900;">{{item.value}}</p><p class="p-title">已办结</p></div>
                </div>
                <div style="width: 100%;background-color: rgb(242 247 255);display: flex;">
                  <div style="margin: auto;width: 80%;">
                    <span style="float: right">办结率</span>
                    <Progress  :percent="(item.value/item.total).toFixed(2)*100" hide-info status="active"></Progress>
                    <span :style="{marginLeft: (item.value/item.total).toFixed(2)*100+'%'}">{{ (item.value/item.total).toFixed(2)*100}}%</span>
                  </div>
                </div>
                <div style="width: 100%;background-color: rgb(242 247 255);display: flex;">
                  <div>同周比</div>
                  <div class="arrow-up"></div>
                  <div>3%</div>
                  <div style="text-align: right;flex: 1;">日环比</div>
                  <div class="arrow-down"></div>
                  <div>1%</div>
                </div>
              </div>
            </Col>
            <Col style="margin: 0.5vh 0"  span="24">
              <span class="titleBankground">人口统计</span>
              <div ref="flowCharts" style="height: 20vh;width: 100%;overflow: hidden;"></div>
            </Col>
            <Col style="margin: 0.5vh 0"  span="24">
              <span class="titleBankground">房屋统计</span>
              <div ref="houseCharts" style="height: 20vh;width: 100%;overflow: hidden;"></div>
            </Col>
            <Col style="margin: 0.5vh 0"  span="24">
              <span class="titleBankground">单位统计</span>
              <div ref="companyCharts" style="height: 30vh;width: 100%;overflow: hidden;"></div>
            </Col>
          </Col>
        </row>
        <row v-if="statisticsShow" style="margin: 1vh 0;">
          <Tabs class="statistics" size="small">
            <TabPane label="今日事件" style="margin: 1vh 0;">
                <img v-if="homePageList.length==0" style="width: 100%;margin-top: 50%;" src="/img/qsy.png">
                <row v-for="(item,i) in homePageList" @click.native="getInfo(item,'1')">
                  <Col span="18">
                    <p class="pTextShow">{{ item.title }}</p>
                    <a class="aTextShow">{{ item.eventsTypeName }}<Divider type="vertical" />{{ item.address }}</a>
                    <a class="aTextShow">{{ item.createTime }}</a>
                    <Divider />
                  </Col>
                  <Col span="6">
                    <Tag style="float: right;margin: 0.5vh 0;" color="#c8cacc">已完成</Tag>
                  </Col>
                </row>
            </TabPane>
            <TabPane label="待办事件">
              <img v-if="homePageLogList.length==0" style="width: 100%;margin-top: 50%;" src="/img/qsy.png">
              <row v-for="(item,i) in homePageLogList" @click.native="getInfo(item,'1')">
                <Col span="18">
                  <p class="pTextShow">{{ item.title }}</p>
                  <a class="aTextShow">{{ item.eventsTypeName }}<Divider type="vertical" />{{ item.address }}</a>
                  <a class="aTextShow">{{ item.createTime }}</a>
                  <Divider />
                </Col>
                <Col span="6">
                  <Tag style="float: right;margin: 0.5vh 0;" color="#00a600">未完成</Tag>
                </Col>
              </row>
            </TabPane>
            <TabPane label="超期事件">
              <img v-if="homePageTimeList.length==0" style="width: 100%;margin-top: 50%;" src="/img/qsy.png">
              <row v-for="(item,i) in homePageTimeList" @click.native="getInfo(item,'1')">
                <Col span="18">
                  <p class="pTextShow">{{ item.title }}</p>
                  <a class="aTextShow">{{ item.eventsTypeName }}<Divider type="vertical" />{{ item.address }}</a>
                  <a class="aTextShow">{{ item.createTime }}</a>
                  <Divider />
                </Col>
                <Col span="6">
                  <Tag style="float: right;margin: 0.5vh 0;" color="#ff0000">已超时</Tag>
                </Col>
              </row>
            </TabPane>
          </Tabs>
        </row>
    </div >
    <div v-if="!indexShow">
      <row>
        <div class="back" @click="indexShow=!indexShow"><Icon type="ios-arrow-back" />返回</div>
      </row>
      <row>
        <Input border="false" v-model="eventSearchForm.queryStr" placeholder="请输入搜索关键词"  style="width: 100%;margin: 1vh 0;" />
<!--        <Input border="false" placeholder="当事人姓名"  style="width: 100%;margin: 1vh 0;" />-->
        <Input v-if="advanced"  border="false" placeholder="当事人电话"  style="width: 100%;margin: 1vh 0;" />
        <Input v-if="advanced" border="false" placeholder="请输入事件编号"  style="width: 100%;margin: 1vh 0;" />
        <Input v-if="advanced" border="false" placeholder="事件状态"  style="width: 100%;margin: 1vh 0;" />
        <Input v-if="advanced" border="false" placeholder="事件来源"  style="width: 100%;margin: 1vh 0;" />
        <Input v-if="advanced" border="false" placeholder="事件类型"  style="width: 100%;margin: 1vh 0;" />
        <Input v-if="advanced" border="false" placeholder="创建时间" style="width: 100%;margin: 1vh 0;"
               v-model="eventSearchForm.createTime" size="small" align="left" value-format="yyyy-MM-dd" type="date"  />
      </row>
      <row>
        <Button @click="seachAllLoad()"  type="info">搜索</Button>
        <Button @click="claerAll()">重置</Button>
<!--        <Button v-if="!advanced" @click="advanced=true" style="margin: 1vh 0;float: right;color:#9B9B9B;" type="text">高级搜索</Button>-->
<!--        <Button v-if="advanced" @click="advanced=false" style="margin: 1vh 0;float: right;color:#9B9B9B;" type="text">收起</Button>-->
      </row>
      <row>
        <Tabs size="small"  v-model="seachType" v-loading="tableLoading">
          <TabPane label="全部" name="0" class="TabPaneBox">
            <img v-if="loadList.length==0" style="width: 100%;margin-top: 50%;" src="/img/qsy.png">
            <row v-for="(item,i) in loadList">
              <Col span="18">
                <p class="pTextShow">{{ item.title }}</p>
                <a class="aTextShow">{{ item.eventsTypeName }}<Divider type="vertical" />{{ item.address }}</a>
                <a class="aTextShow">{{ item.createTime }}</a>
                <Divider />
              </Col>
              <Col span="6">
                <Tag style="float: right;margin: 0.5vh 0;" color="#c8cacc">已完成</Tag>
              </Col>
            </row>
          </TabPane>
          <TabPane label="事件" name="1" class="TabPaneBox">
            <img v-if="loadList.length==0" style="width: 100%;margin-top: 50%;" src="/img/qsy.png">
            <row v-for="(item,i) in loadList" style="cursor: pointer;" @click.native="getInfo(item,'1')">
              <Col span="18">
                <p class="pTextShow">{{ item.title }}</p>
                <a class="aTextShow">{{ item.eventsTypeName }}<Divider type="vertical" />{{ item.address }}</a>
                <a class="aTextShow">{{ item.createTime }}</a>
                <Divider />
              </Col>
              <Col span="6">
                <Tag style="float: right;margin: 0.5vh 0;" color="#c8cacc">已完成</Tag>
              </Col>
            </row>
<!--            <Page :total="40" size="small" style="text-align: center;"/>-->
          </TabPane>
          <TabPane label="人口" name="2" class="TabPaneBox">
            <img v-if="loadList.length==0" style="width: 100%;margin-top: 50%;" src="/img/qsy.png">
            <row v-for="(item,i) in loadList">
              <Col span="6">
                <img style="height: 7vh;" src="/img/tx_wzp.png" />
              </Col>
              <Col span="18">
                <p class="pTextShow">{{ item.NAME }}</p>
                <a class="aTextShow">{{ item.nation }}<Divider type="vertical" />{{ item.person_type }}</a>
                <a class="aTextShow">{{ item.residence_address }}</a>
                <Divider />
              </Col>
            </row>
          </TabPane>
          <TabPane label="房屋" name="3" class="TabPaneBox">
            <img v-if="loadList.length==0" style="width: 100%;margin-top: 50%;" src="/img/qsy.png">
            <row v-for="(item,i) in loadList">
              <Col span="6">
                <img style="height: 7vh;" src="/img/tx_wzp2.png" />
              </Col>
              <Col span="18">
                <p style="margin-top: 0.25vw;" class="aTextShow">{{ item.buildingName }}</p>
                <a class="aTextShow">{{ item.buildingTypeName }}<Divider type="vertical" />{{ item.buildingAddress }}</a>
                <a class="aTextShow">{{ item.community }}</a>
                <Divider />
              </Col>
            </row>
          </TabPane>
          <TabPane label="单位" name="4" class="TabPaneBox">
            <img v-if="loadList.length==0" style="width: 100%;margin-top: 50%;" src="/img/qsy.png">
            <row v-for="(item,i) in loadList">
              <Col span="6">
                <img style="height: 7vh;" src="/img/tx_wzp2.png" />
              </Col>
              <Col span="18">
                <p class="pTextShow">{{ item.name }}</p>
                <a class="aTextShow">法人:{{ item.principalName }}</a>
                <a class="aTextShow">{{ item.streetName }}<Divider type="vertical" />{{ item.gridsName }}</a>
                <Divider />
              </Col>
            </row>
          </TabPane>
          <TabPane label="部件" name="5" class="TabPaneBox">
            <img v-if="loadList.length==0" style="width: 100%;margin-top: 50%;" src="/img/qsy.png">
            <row v-for="(item,i) in loadList">
              <Col span="6">
                <img style="height: 7vh;" src="/img/tx_wzp.png" />
              </Col>
              <Col span="18">
                <p class="pTextShow">设备名称:摄像机{{ item.name }}</p>
                <a class="aTextShow">状态:运行中{{ item.sex }}</a>
                <a class="aTextShow">所属单位:{{ item.lowerDepartment }}</a>
                <Divider />
              </Col>
            </row>
          </TabPane>
          <TabPane label="网格" name="6" class="TabPaneBox">
            <img v-if="loadList.length==0" style="width: 100%;margin-top: 50%;" src="/img/qsy.png">
            <row v-for="(item,i) in loadList">
              <Col span="6">
                <img style="height: 7vh;" src="/img/tx_wzp2.png" />
              </Col>
              <Col span="18">
                <p style="margin-top: 1.25vw;" class="aTextShow">{{ item.name }}</p>
                <a class="aTextShow">所属街道:{{ item.streetName }}</a>
                <a class="aTextShow">所属社区:{{ item.communityName }}</a>
              </Col>
            </row>
          </TabPane>
          <TabPane label="网格员" name="7" class="TabPaneBox">
            <img v-if="loadList.length==0" style="width: 100%;margin-top: 50%;" src="/img/qsy.png">
            <row v-for="(item,i) in loadList">
              <Col span="6">
                <img style="height: 7vh;" src="/img/tx_wzp.png" />
              </Col>
              <Col span="18">
                <p class="pTextShow">{{ item.name }}</p>
                <a class="aTextShow">性别:{{ item.sex }}</a>
                <a class="aTextShow">{{ item.streetName }}<Divider type="vertical" />{{ item.post }}</a>
                <Divider />
              </Col>
            </row>
          </TabPane>
          <TabPane label="党组织" name="8" class="TabPaneBox">
            <img v-if="loadList.length==0" style="width: 100%;margin-top: 50%;" src="/img/qsy.png">
            <row v-for="(item,i) in loadList">
              <Col span="18">
                <p class="pTextShow">{{ item.title }}</p>
                <a class="aTextShow">{{ item.eventsTypeName }}<Divider type="vertical" />{{ item.address }}</a>
                <a class="aTextShow">{{ item.createTime }}</a>
                <Divider />
              </Col>
              <Col span="6">
                <Tag style="float: right;margin: 0.5vh 0;" color="#c8cacc">已完成</Tag>
              </Col>
            </row>
          </TabPane>
        </Tabs>
      </row>
    </div>
  </div>

</template>

<script>
  import {getAllLoad} from '@/api/events'
  import echarts from 'echarts'
  import {sendAjax} from "../../tBottomToolManagement/dataMapping";
  import {queryBasicGridsList} from '@/api/zhsq/basicGrids/basicGrids'
  import { getpartymemberList } from '@/api/zhsq/partymember/index'
  import { getPartyBranchList } from '@/api/zhsq/partyManage/index'
  import {queryTZhsqGridMemberList} from '@/api/zhsq/tZhsqGridMember/tZhsqGridMember'
  import {queryTUrbancomponentsList} from '@/api/zhsq/tUrbancomponents/tUrbancomponents'
  import {queryBasicPersonDynamicList} from '@/api/zhsq/basicPerson/basicPerson'
  import {queryTBuildingArchivesList} from '@/api/zhsq/tBuildingArchives/tBuildingArchives'
  import {queryBasicSocialOrganizationList} from '@/api/zhsq/basicSocialOrganization/basicSocialOrganization'
  export default {
		name: "leftTotal",
    data() {
      return{
          areaList:[ {name:'党支部',icon:require("@/assets/images/dangzhibu.png"),value:"0",color:'#f0f0f0'},
            {name:'党员数量',icon:require("@/assets/images/dangyuan.png"),value:"0",color:'#f0f0f0'},
            {name:'网格数量',icon:require("@/assets/images/wangge.png"),value:"0",color:'#f0f0f0'},
            {name:'网格员数',icon:require("@/assets/images/wanggeyuan.png"),value:"0",color:'#f0f0f0'},
            {name:'网格事件',icon:require("@/assets/images/shijian.png"),value:"20",color:'#f0f0f0'},
            {name:'城市部件',icon:require("@/assets/images/bujian.png"),value:"0",color:'#f0f0f0'},
            {name:'实有人口',icon:require("@/assets/images/renkou.png"),value:"0",color:'#f0f0f0'},
            {name:'实有房屋',icon:require("@/assets/images/fangwu.png"),value:"0",color:'#f0f0f0'},
            {name:'实有单位',icon:require("@/assets/images/danwe.png"),value:"0",color:'#f0f0f0'}],
          grindList:[
            {name:'张莉莉',phone:"15296845698",icon:"ios-contact"},
            {name:'李德佳',phone:"15296845698",icon:"ios-contact"},
          ],
          sjtj:[
            {name:'设备设施检测',total:120,value:50},
            {name:'消防检测',total:20,value:10},
            {name:'自办自结',total:12,value:4},
          ],
          indexShow:true,
          advanced:false,
          statisticsShow:true,
          eventSearchForm:{
            createTime: "",
            dataFrom: "",
            eventsTypeId: "",
            gridId: "",
            pageNum: 1,
            pageSize: 10,
            queryStr: "",
            endTime:true
          },
          loadList:[],
          homePageList:[],
          homePageTimeList:[],
          homePageLogList:[],
          tableLoading:false,
          flowCharts:null,
          houseCharts:null,
          companyCharts:null,
          seachList:{'0':{label:'任务',url:""},
                     '1':{label:'设备',url:""}},
          seachType:'0'
      }
    },
    created(){
        this.init()
    },
    mounted() {

    },
    methods:{
        //页面初始化查询事件
		    init(){
          this.queryBasicGrids()
          this.getPartyBranch()
          this.getpartymember()
          this.queryTZhsqGridMember()
          this.queryTUrbancomponents()
          this.queryBasicPersonDynamic()
          this.queryTBuildingArchives()
          this.queryBasicSocialOrganization()
          this.homePageIncident()
          this.overTime()
          this.backlog()
        },
        //视角定位
        flyTo(done) {
          let location =[ 105.482455, 28.511638 ]
          let view=this.map.getView();
          let duration = 2000;
          let zoom = view.getZoom();
          let parts = 2;
          let called = false;
          function callback(complete) {
            --parts;
            if (called) {
              return;
            }
            if (parts === 0 || !complete) {
              called = true;
              done(complete);
            }
          }
          view.animate(
            {
              center: location,
              duration: duration,
            },
            callback
          );
          view.animate(
            {
              zoom: zoom - 1,
              duration: duration / 2,
            },
            {
              zoom: zoom,
              duration: duration / 2,
            },
            callback
          );
        },
		    //首页事件查询
        homePageIncident(){
          //获取当前时间
          var date = new Date();
          var year = date.getFullYear();
          var month = date.getMonth() + 1;
          var day = date.getDate();
          if (month < 10) {
            month = "0" + month;
          }
          if (day < 10) {
            day = "0" + day;
          }
          var nowDate = year + "-" + month + "-" + day;
          this.eventSearchForm.createTime=nowDate
          let _this=this;
          _this.tableLoading=true
          getAllLoad(this.eventSearchForm).then(res => {
            _this.tableLoading=false
            if (res&&res.data&&res.data.records){
              _this.homePageList=res.data.records
              _this.claerAll()
            }
          })
        },
        //首页超期事件查询
        overTime(){
         let eventSearchForm={
              createTime: "",
              dataFrom: "",
              eventsTypeId: "",
              gridId: "",
              pageNum: 1,
              pageSize: 10,
              queryStr: "",
              endTime:true,
              status:"0,1,3"
          }
          let _this=this;
          _this.tableLoading=true
          getAllLoad(eventSearchForm).then(res => {
            _this.tableLoading=false
            if (res&&res.data&&res.data.records){
              _this.homePageTimeList=res.data.records
              _this.claerAll()
            }
          })
        },
        //首页待办事件查询
        backlog(){
          let eventSearchForm={
            createTime: "",
            dataFrom: "",
            eventsTypeId: "",
            gridId: "",
            pageNum: 1,
            pageSize: 10,
            queryStr: "",
            status:"1"
          }
          let _this=this;
          _this.tableLoading=true
          getAllLoad(eventSearchForm).then(res => {
            _this.tableLoading=false
            if (res&&res.data&&res.data.records){
              _this.homePageLogList=res.data.records
              _this.claerAll()
            }
          })
        },
		    //搜索
        seachAllLoad(){
          let url=''
          let _this=this;
          let type="post";
          let img="/img/archives/lou_on.png"
          switch (this.seachType) {
            case "0":
              this.incident()
              break;
            case "1":
              this.incident()
              break;
            case "2":
              url='api/basicPerson/queryBasicPersonDynamicList'
              type="GET"
              break;
            case "3":
              url='api/tBuildingArchives/queryTBuildingArchivesList'
              type="GET"
              break;
            case "4":
              url='api/basicSocialOrganization/queryBasicSocialOrganizationList'
              type="GET"
              break;
            case "5":
              url='api/tUrbancomponents/queryTUrbancomponentsList'
              type="GET"
              break;
            case "6":
              url='api/basicGrids/queryBasicGridsList'
              type="GET"
              break;
            case "7":
              url='api/tZhsqGridMember/queryTZhsqGridMemberList'
              type="GET"
              break;
            default:
          }

          if (url!=''){
            _this.tableLoading=true
            //修改
            sendAjax({
              url: url,
              type:type,
              data: {buildingType:"2,3,4,5,6,7,8,9"},
              contentType: "application/json",
              success: function (result) {
                _this.tableLoading=false
                _this.loadList=result.data.records;
                // let data={val:result.data.records,type:_this.seachType}
                // _this.$emit('Invert',data)
              },
            });
          }
        },
        //获取信息展示
        getInfo(val,type){
          let data={val:[val],type:type}
          this.$emit('Invert',data)
        },
        //重置
        claerAll(){
          this.loadList=[];
          this.eventSearchForm={
              createTime: "",
              dataFrom: "",
              eventsTypeId: "",
              gridId: "",
              pageNum: 1,
              pageSize: 10,
              queryStr: "",
          }
        },
        //图表人口统计
        flowChartsCreat(){
           let data = [{
             "name": "流动人口",
             "value": 501220
           }, {
             "name": "户籍人口",
             "value": 3504520
           }, {
             "name": "其他",
             "value": 28825
           }]
           let option= {
             title: {
               text: 4105285,
               subtext:'总数' ,
               textStyle: {
                 color: '#000000',
                 fontSize: 12,
                 // align: 'center'
               },
               x: 'center',
               y: 'center',
             },
             tooltip: {
               trigger: 'item'
             },
             legend: {
               left: 'left',
               type: 'scroll',
               icon: "circle",
               textStyle: {
                 fontSize: 10,
               },
             },
             series: [
               {
                 name: '人口统计',
                 type: 'pie',
                 radius: ['30%', '55%'],
                 data: data,
                 color: ["#1885ff","#ff7a5a",'#ffc518'],
                 emphasis: {
                   itemStyle: {
                     shadowBlur: 10,
                     shadowOffsetX: 0,
                     shadowColor: 'rgba(0, 0, 0, 0.5)'
                   }
                 }
               }
             ]
           };
           this.flowCharts = echarts.init(this.$refs.flowCharts);
           this.flowCharts.setOption(option)
         },
        //图表房屋统计
        houseChartsCreat(){
          let data = [{
            "name": "住房",
            "value": 200
          }, {
            "name": "宿舍",
            "value": 50
          }, {
            "name": "仓库",
            "value": 45
          }, {
            "name": "办公",
            "value": 132
          }, {
            "name": "商铺",
            "value": 288
          }, {
            "name": "其它",
            "value": 658
          }]
          let option= {
            tooltip: {
              trigger: 'item'
            },
            legend: {
              left: 'left',
              type: 'scroll',
              icon: "circle",
              textStyle: {
                fontSize: 10,
              },
            },
            series: [
              {
                name: '人口统计',
                type: 'pie',
                data: data,
                radius: '55%',
                //color: ["#1885ff","#ff7a5a",'#ffc518'],
                emphasis: {
                  itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          };
          this.houseCharts = echarts.init(this.$refs.houseCharts);
          this.houseCharts.setOption(option)
        },
        //图表单位统计
        companyChartsCreat(){
          let data = [{
            "name": "学校",
            "value": 3
          }, {
            "name": "政务机关",
            "value": 5
          }, {
            "name": "医院",
            "value": 12
          }, {
            "name": "旅游",
            "value": 16
          }, {
            "name": "网吧",
            "value": 28
          }, {
            "name": "交通",
            "value": 35
          }, {
            "name": "商贸",
            "value": 6
          }, {
            "name": "物流",
            "value": 19
          }, {
            "name": "公共区域",
            "value": 19
          }, {
            "name": "危化品存放单位",
            "value": 10
          }]
          let option= {
            title: {
              text: 356,
              subtext:'总单位数' ,
              textStyle: {
                color: '#000000',
                fontSize: 12,
                // align: 'center'
              },
              x: 'center',
              y: 'center',
            },
            tooltip: {
              trigger: 'item',
              textStyle: {
                fontSize: 8,
                // align: 'center'
              },
            },
            legend: {
              left: 'left',
              type: 'scroll',
              icon: "circle",
              textStyle: {
                fontSize: 10,
              },
            },
            series: [
              {
                name: '单位统计',
                type: 'pie',
                data: data,
                radius: ['40%', '65%'],
                //color: ["#1885ff","#ff7a5a",'#ffc518'],
                emphasis: {
                  itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          };
          this.companyCharts = echarts.init(this.$refs.companyCharts);
          this.companyCharts.setOption(option)
        },
        //事件查询
        incident(){
          let _this=this;
          _this.tableLoading=true
          getAllLoad(this.eventSearchForm).then(res => {
            _this.tableLoading=false
            if (res){
              _this.loadList=res.data.records
              //let data={val:res.data.records,type:"1"}
              //_this.$emit('Invert',data)
            }
          })
        },
        //网格统计
        queryBasicGrids(){
          let _this=this;
          queryBasicGridsList({}).then(res => {
            if (res&&res.data&&res.data.total){
              _this.areaList[2].value=res.data.total
            }
          })
        },
        //党员统计
        getpartymember(){
          let _this=this;
          getpartymemberList({}).then(res => {
            if (res&&res.data&&res.data.total) {
              _this.areaList[1].value = res.data.total
            }
          })
        },
        //党支部统计
        getPartyBranch(){
          let _this=this;
          getPartyBranchList({}).then(res => {
            if (res&&res.data&&res.data.total) {
              _this.areaList[0].value = res.data.total
            }
          })
        },
        //网格员统计
        queryTZhsqGridMember(){
          let _this=this;
          queryTZhsqGridMemberList({}).then(res => {
            if (res&&res.data&&res.data.total){
            _this.areaList[3].value=res.data.total
            }
          })
        },
        //城市部件统计
        queryTUrbancomponents(){
          let _this=this;
          queryTUrbancomponentsList({}).then(res => {
            if (res&&res.data&&res.data.total) {
              _this.areaList[5].value = res.data.total
            }
          })
        },
        //辖区人口统计
        queryBasicPersonDynamic(){
          let _this=this;
          queryBasicPersonDynamicList({}).then(res => {
            if (res&&res.data&&res.data.total){
            _this.areaList[6].value=res.data.total
            }
          })
        },
        //房屋统计
        queryTBuildingArchives(){
          let _this=this;
          queryTBuildingArchivesList({buildingType:1}).then(res => {
            if (res&&res.data&&res.data.total){
            _this.areaList[7].value=res.data.total
            }
          })
        },
        //单位统计
        queryBasicSocialOrganization(){
            let _this=this;
          queryBasicSocialOrganizationList({}).then(res => {
            if (res&&res.data&&res.data.total){
              _this.areaList[8].value=res.data.total
            }
            })
        }
    },
    watch: {
		  //tab页面切换效果
      statisticsShow(val){
        if (!val){
          let _this=this;
          this.$nextTick(function (){
             _this.flowChartsCreat()
             _this.houseChartsCreat()
             _this.companyChartsCreat()
          })
        }
      },
      //切换类型清除查询条件 查询默认信息
      seachType(){
        this.loadList=[]
        this.eventSearchForm={
          createTime: "",
          dataFrom: "",
          eventsTypeId: "",
          gridId: "",
          pageNum: 1,
          pageSize: 10,
          queryStr: "",
        }
        this.seachAllLoad();
      },
      //切换搜索功能
      indexShow(val){
        if(!val){
          this.loadList=[]
          this.eventSearchForm={
            createTime: "",
            dataFrom: "",
            eventsTypeId: "",
            gridId: "",
            pageNum: 1,
            pageSize: 10,
            queryStr: "",
          }
          this.seachAllLoad();
        }
      }
    }
	}
</script>

<style lang="less">
.leftTotalDiv{
  width: 300px;
  position: absolute;
  z-index: 9;
  left: 0px;
  top: 80px;
  padding: 1vw;
  background-color: #ffffff;
  /* padding: 20px; */
  height: calc(100vh - 90px);
  overflow-y: auto;
  overflow-x: hidden;
  &::-webkit-scrollbar{
    width:0;
  };
  .ivu-btn {
    margin-right: 0px;
  }
  .back{
    display: table;
    cursor: pointer;
  }
  .pValue{
    font-size: 0.5vw;
    font-weight: 600;
  }
  .aValue{
    font-size: 0.5vw;
    color: #9B9B9B;
  }
  .titleName{
    font-size: 1vw;
    font-weight: 600;
    margin-bottom: 1vh;
  }
  .statistics{
    .ivu-tabs-nav-scroll {
      display: inline-block;
    }
  }
  .ivu-tabs-nav-wrap {
    text-align: center;
  }
  .pTextShow{
    display: -webkit-box;
    text-overflow: ellipsis;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp:2;
    margin: 0.5vh 0;
    font-size: 0.7vw;
  }
  .aTextShow{
    display: -webkit-box;
    text-overflow: ellipsis;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp:1;
    font-size: 0.5vw;
    color: #9B9B9B;
  }
  .wangGe{
    font-size: 0.7vw;
  }
  .ivu-divider-horizontal {
    margin: 12px 0;
  }
  .ivu-input {
    background-color: rgba(155, 155, 155,0.1);
  }
  .titleBankground{
    background:-webkit-gradient(linear, left top, left bottom, from(#fff), to(#e8f1ff), color-stop(0.5, #fff), color-stop(0.5,#e8f1ff));
    font-size: 1vw;
    font-weight: 600;
  }
  .imgStyle{
    width: 100%;
    margin-top: 50%;
  }
  .statisticsClass{
    height: 20%;
    width: 100%;
    overflow: hidden;
    display: flex;
    font-size: 0.4vw;
    background-image: url(/img/zhsqImage/title.png);
    background-size: 100% 100%;
  }
  .statisticsClass span{
    color: #1885ff;
    align-self: center;
    font-weight: 600;
    margin: auto;
  }
  .p-title{
    font-size: 0.3vw;
    color: #a5a6a7;
    text-align: center;
  }
  .arrow-up{
    width: 0;
    height: 0;
    border-bottom: 0.4vw solid green;
    border-left: 0.4vw solid transparent;
    border-right: 0.4vw solid transparent;
  }
  .arrow-down{
    width: 0;
    height: 0;
    border-top: 0.4vw solid red;
    border-left: 0.4vw solid transparent;
    border-right: 0.4vw solid transparent;
  }
  .ivu-progress-inner {
    background-color: #c3c2c2;
  }
  .statistics-text{
    height: 40%;
    width: 100%;
    overflow: hidden;
    background-color: rgb(242, 247, 255);
    display: flex;
    text-align: center;
  }
  .buildTextShow{

  }
  .TabPaneBox{
    overflow-y: auto;
    height: 70vh;
  }
  .TabPaneBox::-webkit-scrollbar {

    display: none; /* Chrome Safari */

  }
}
</style>
