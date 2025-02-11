<template>
  <el-row class="tabs-content w100">
    <div class="left" style="margin-top: -20px;">
      <!-- 人口情况统计  左1-->
      <div class="Gridtask-status">
        <h2 class="box-title ">人口情况统计</h2>
        <!-- 象形图盒子 -->
        <div class="taskBox-onep">
          <div id="container" class="taskcharts"></div>
          <div class="onp_backdroundimg"></div>
        </div>
        <!-- 下面的6个盒子 -->
        <div class="Statistical-sixbox">
          <div v-for="(item, i)  in populationData">
            <div class="namelist">
              <span class="teshurenqun UnidreamLED">{{item.number}}</span>
              <span
                style="color:#37D3FF ; margin-left: 20px;font-size: 12px;margin-top: 2px; font-weight: normal;">人</span>
            </div>
            <div class="numberlist" style="margin-top: 4px;">{{ item.name }}</div>
          </div>
        </div>
      </div>
      <!-- 实有房屋情况 左2-->
      <div class="housingsituation">
        <h2 class="box-title">房屋实有情况</h2>
        <div class="hous-img-box">
          <div class="hous-img" style="margin-left: 76px;">
            <div class="houstiele">自住房</div>
            <div class="housFont">{{houseTypedata.map(i=>{return i.zizhu}) | sum}}套</div>
          </div>
          <div class="hous-img" style="margin-left: 63px;">
            <div class="houstiele">租赁房</div>
            <div class="housFont">{{houseTypedata.map(i=>{return i.zulin}) | sum}}套</div>
          </div>
        </div>
        <div class="hous-img-box-two">
          <div class="hous-img" style="margin-left: 76px;">
            <div class="houstiele">空置房</div>
            <div class="housFont">{{houseTypedata.map(i=>{return i.kongzhi}) | sum}}套</div>
          </div>
          <div class="hous-img" style="margin-left: 63px;">
            <div class="houstiele">其他</div>
            <div class="housFont">{{houseTypedata.map(i=>{return i.qita}) | sum}}套</div>
          </div>
        </div>
        <div class="table-box">
          <div>
            <el-table :data="houseTypedata" :header-cell-style="{
			        'font-size': '12px',
			        'color':'#01DFF4',
			     }"
                      :cell-style="handleCellstyle" style="width: 100%;">
              <el-table-column width="105px" prop="house_name" label="小区名字"/>
              <el-table-column prop="zizhu" label="自住房"/>
              <el-table-column prop="zulin" label="租赁房"/>
              <el-table-column prop="kongzhi" label="空置房"/>
              <el-table-column prop="qita" label="其他"/>
              <el-table-column prop="vacancyRate" width="100px" :render-header="tableAction" label="空置率">
                <!-- `${(scope.row.kongzhi * 100 / scope.row.zulin + scope.row.zizhu + scope.row.kongzhi).toFixed(2)  }%` -->
                <template slot-scope="scope">
                  {{
                  hand(scope.row.kongzhi, scope.row.zulin, scope.row.zizhu)
                  }}
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>

    <div class="middle">
      <div class="middle-top">


        <Map @change="handleChange"/>
      </div>
      <!-- 社会组织 -->
      <div class="middle-bottom">
        <h2 class="box-title-one">社会组织</h2>
        <h2 class="box-title-two">个体商户档案</h2>

        <div style="width:768px;height:289px; display: flex;">
          <!-- 图一 -->
          <div class="boxOne-poi">
            <div ref="shehuizuzhi"></div>
          </div>
          <div class="boxOne-p">
            <div ref="shanghudangan"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="right">
      <!-- 网格事件状态 -->
      <div class="Gridevent-status">
        <h2 class="box-title">网格事件状态</h2>
        <!-- 雷达图 -->
        <div class="Radar-chart-box">
          <div class="taskBox-onep_renda">
            <div ref="chartsreda"></div>
          </div>

          <div class="Statisticalchart">
            <!-- 雷达下面的2排盒子 -->
            <div class="Statistical">
              <div v-for="(item, i)  in eventListBottm">
                <div class="namelist">
                  <span class=" UnidreamLED teshurenqun">{{item.number}}</span>
                  <span style="color:#37D3FF ; margin-left: 20px;font-size: 12px;margin-top: 2px">件</span>
                </div>
                <div class="numberlist" style="font-weight: bold;">{{ item.name }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 任务状态 -->
      <div class="Gridtask-statusslo  classsrtle_on2">
        <h2 class="box-title">网格任务状态</h2>
        <!-- 象形图盒子 -->
        <div class="taskBox">
          <div ref="taskcharts" class="taskcharts"></div>
        </div>
        <!-- 下面的6个盒子 -->
        <div class="Statistical-sixbox">
          <div v-for="(item, i)  in EventDataList">
            <div class="namelist">
              <span class="  teshurenqun UnidreamLED">{{item.number}}</span>
              <span style="color:#37D3FF ; margin-left: 20px;font-size: 12px; margin-top: 2px">件</span>
            </div>
            <div class="numberlist">{{ item.name }}</div>
          </div>
        </div>
      </div>
    </div>
  </el-row>
</template>

<script>
  import Highcharts from "highcharts/highstock";
  import HelpHint from "./components/HelpHint.vue.vue";
  import Map from "./work";
  import {
    bigData,
    eventsTypeData,
    taskTypeData
  } from "@/api/utils";

  import {
    getTaskMap
  } from "@/api/engineering";

  export default {
    components: {
      Map,
      HelpHint
    },
    filters: {
      /*这里来数组求和 */
      sum(arr) {
        return eval(arr.join("+"))
      }
    },
    data() {
      return {
        tab: 1,
        time: "",
        date: "",
        week: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
        timerID: "",
        sheShiList: [],
        renwuTypeechart: [],
        volunteer: "",
        gridMember: "",
        DigDataList: [],
        EventDataList: [],
        buildingType: {
          // 建筑类型
          jingdian: 0, // 景点
          qita: 0, // 其他
          zhuzhai: 0, // 住宅
          bangong: 0, // 办公楼
          gongchang: 0, // 工厂
          gongyuan: 0, // 公园
          gonggong: 0 // 公共设施,
        },
        tableType: [],
        houseTypedata: [],
        socialTypedata: [],
        personTypeData: [],
        GirdEventtongji: [],
        merchantTypeData: [],
        populationData: [],
        eventListBottm: [],
        buildingTypeData: [],
        GirdEventJUmin: [],
        GirdEventWangGE: [],
        communityId: '',
        personType: {
          allNumber: 155604,
          type: ["流动人口", "境外人口", "外出人口", "常住人口", "户籍人口"],
          data: [{
            value: 12131,
            name: "流动人口"
          },
            {
              value: 5036,
              name: "境外人口"
            },
            {
              value: 23061,
              name: "外出人口"
            },
            {
              value: 73213,
              name: "常住人口"
            },
            {
              value: 42163,
              name: "户籍人口"
            }
          ]
        },
        // 事件
        redaData: {
          type: [
            // 类型
            {
              text: "邻里纠纷"
            },
            {
              text: "环境问题"
            },
            {
              text: "设施损坏"
            },
            {
              text: "违章举报"
            },
            {
              text: "民生诉求"
            },
            {
              text: "其他问题"
            }
          ],
          resident: [160, 140, 160, 140, 160, 140], // 居民app
          street: [140, 270, 140, 170, 140, 170] // 街道 app
        },
        personAttribute: [{
          name: "老龄人员",
          number: "23341",
          icon: "tsrq_lr"
        },
          {
            name: "退伍军人",
            number: "98",
            icon: "tsrq_twjr"
          },
          {
            name: "党员",
            number: "313",
            icon: "tsrq_dy"
          },
          {
            name: "社区志愿者",
            number: "652",
            icon: "tsrq_zyz"
          },
          {
            name: "重点人员",
            number: "968",
            icon: "tsrq_zdry"
          },
          {
            name: "普通居民",
            number: "23032",
            icon: "tsrq_ptry"
          }
        ],
        eventList: [{
          name: "派单",
          number: "12"
        },
          {
            name: "处理中",
            number: "16"
          },
          {
            name: "待核查",
            number: "12"
          },
          {
            name: "已完成",
            number: "10"
          },
          {
            name: "已驳回",
            number: "7"
          },
          {
            name: "已结束",
            number: "18"
          },
          {
            name: "待派遣",
            number: "21"
          },
          {
            name: "待审核",
            number: "26"
          }
        ],
        taskList: [{
          name: "待接收",
          number: "19"
        },
          {
            name: "待处理",
            number: "52"
          },
          {
            name: "待派遣",
            number: "16"
          },
          {
            name: "待审核",
            number: "37"
          },
          {
            name: "待结束",
            number: "120"
          },
          {
            name: "待接收",
            number: "40"
          }
        ],
        HouseList: [{
          name: "自住房",
          number: "16170",
          proportion: "70%"
        },
          {
            name: "租赁房",
            number: "2310",
            proportion: "10%"
          },
          {
            name: "空置房",
            number: "2293",
            proportion: "10%"
          },
          {
            name: "其他",
            number: "2327",
            proportion: "10%"
          }
        ],
        tableData: [{
          zizhu: 3100,
          qita: 20,
          house_name: "新东方",
          zulin: 380,
          kongzhi: 293
        },
          {
            zizhu: 2290,
            qita: 26,
            house_name: "新港花园",
            zulin: 390,
            kongzhi: 264
          },
          {
            zizhu: 1735,
            qita: 24,
            house_name: "蓝光CC",
            zulin: 185,
            kongzhi: 181
          },
          {
            zizhu: 3655,
            qita: 50,
            house_name: "蔚蓝卡地亚",
            zulin: 585,
            kongzhi: 926
          },
          {
            zizhu: 695,
            qita: 10,
            house_name: "锦绣华府",
            zulin: 376,
            kongzhi: 246
          },
          {
            zizhu: 4695,
            qita: 0,
            house_name: "魔方大厦",
            zulin: 394,
            kongzhi: 383
          }
        ],
        organization: {
          sociology: {
            name: "个体商户",
            number: "126",
            compare: "较去年增长12",
            percent: "+6.7%",
            fall: 0 // 0 是降低 1 是增长
          },
          enterprise: {
            name: "企业商户",
            number: "126",
            compare: "较去年降低12",
            percent: "-6.7%",
            fall: 1
          }
        },
        store: {
          xAxis: ["批发商", "公益", "餐饮", "一般", "民生"],
          data: [300, 164, 255, 624, 237]
        },
        task: {
          yAxis: [
            "日常巡检",
            "社区走访",
            "纠纷协调",
            "公益活动",
            "信息排除"
          ].reverse(), // 任务 类型
          data: [140, 120, 60, 30, 10].reverse() // 对应数据
        },
        shehuiList: [{
          name: "企业",
          number: "235",
          icon: "bigDataBase_SH"
        },
          // {
          //   name: "企业",
          //   number: "134",
          //   icon: "bigDataBase_QY"
          // },
          {
            name: "社会团体",
            number: "14",
            icon: "bigDataBase_SHTT"
          },
          {
            name: "教育机构",
            number: "56",
            icon: "bigDataBase_JYJG"
          },
          {
            name: "非盈利性组织",
            number: "14",
            icon: "bigDataBase_FYL"
          },
          {
            name: "卫生事业",
            number: "4",
            icon: "bigDataBase_WSSY"
          },
          {
            name: "其他",
            number: "223",
            icon: "bigDataBase_QT"
          }
        ]
      };
    },
    // filters: {
    //   sum(arr) {
    //     return eval(arr.join("+"));
    //   }
    // },
    computed: {
      handleChecked() {
        return this.tab;
      }
    },
    created() {
      this.GetBigData();
      const el = document.documentElement;
      const rfs =
        el.requestFullScreen ||
        el.webkitRequestFullScreen ||
        el.mozRequestFullScreen ||
        el.msRequestFullScreen;

      // typeof rfs != "undefined" && rfs
      if (rfs) {
        rfs.call(el);
      } else if (typeof window.ActiveXObject !== "undefined") {
        // for IE，这里其实就是模拟了按下键盘的F11，使浏览器全屏
        const wscript = new ActiveXObject("WScript.Shell");
        if (wscript != null) {
          wscript.SendKeys("{F11}");
        }
      }
    },
    async mounted() {
      this.GetGirdtype()
      this.getTask();
      this.initStore();
      this.initTask();
    },
    beforeDestroy() {
      const el = document;
      const cfs =
        el.cancelFullScreen ||
        el.webkitCancelFullScreen ||
        el.mozCancelFullScreen ||
        el.exitFullScreen;

      // typeof cfs != "undefined" && cfs
      if (cfs) {
        cfs.call(el);
      } else if (typeof window.ActiveXObject !== "undefined") {
        // for IE，这里和fullScreen相同，模拟按下F11键退出全屏
        const wscript = new ActiveXObject("WScript.Shell");
        if (wscript != null) {
          wscript.SendKeys("{F11}");
        }
      }
    },
    methods: {
      //数据大屏数据
      async GetBigData() {
        const {
          data
        } = await bigData({
          communityId: this.communityId
        });
        this.DigDataList = data;
        this.tableType = data.tableType
        this.houseTypedata = data.houseType
        this.buildingTypeData = data.buildingType
        this.populationData = [{
          name: '老龄人员',
          number: data.tableType[0].laoren
        },
          {
            name: '退伍军人',
            number: data.tableType[0].tuihu
          },
          {
            name: '入党人员',
            number: data.tableType[0].dangyuan
          },
          {
            name: '社区志愿者',
            number: data.volunteer
          },
          {
            name: '重点人员',
            number: data.tableType[0].teshu
          },
          {
            name: '普通人员',
            number: data.tableType[0].putong
          }
        ];

        this.personTypeData = [
          {
            name: "户籍人口",
            y: data.personType[0].huji,
            h: 40
          },
          {
            name: "境外人口",
            y: data.personType[0].jingwai,
            h: 35
          },
          {
            name: "外出人口",
            y: data.personType[0].waichu,
            h: 18
          },
          {
            name: "流动人口",
            y: data.personType[0].liudong,
            h: 6
          },

          {
            name: "常住人口",
            y: data.personType[0].usually,
            h: 50
          },

        ];
        this.socialTypedata = [{
          name: "个体商户",
          number: data.socialType.shanghu,
        },
          {
            name: "企业",
            number: data.socialType.geti,
          },
          {
            name: "教育机构",
            number: data.socialType.jiaoyu,
          },
          {
            name: "社会团体",
            number: data.socialType.tuanti,
          },
          {
            name: "卫生事业",
            number: data.socialType.weisheng,
          },
          {
            name: "非盈利机构",
            number: data.socialType.feiyingli,
          },
          {
            name: "其他",
            number: data.socialType.qita,
          }
        ]

        this.merchantTypeData = [{
          name: "一般类",
          number: data.merchantType.yiban,
        },
          {
            name: "批发类",
            number: data.merchantType.pifa,
          },
          {
            name: "民生类",
            number: data.merchantType.minsheng,
          },
          {
            name: "公益类",
            number: data.merchantType.gongyi,
          },
          {
            name: "餐饮类",
            number: data.merchantType.canyin,
          },
        ]
        this.show3D();
        this.shehuizuzhi();
        this.shanghudangan();
      },
      //3d环图
      show3D() {
        var each = Highcharts.each,
          round = Math.round,
          cos = Math.cos,
          sin = Math.sin,
          deg2rad = Math.deg2rad;
        Highcharts.wrap(
          Highcharts.seriesTypes.pie.prototype,
          "translate",
          function (proceed) {
            proceed.apply(this, [].slice.call(arguments, 1));
            // Do not do this if the chart is not 3D
            if (this.chart.is3d && !this.chart.is3d()) {
              return;
            }
            var series = this,
              chart = series.chart,
              options = chart.options,
              seriesOptions = series.options,
              depth = seriesOptions.depth || 0,
              options3d = options.chart.options3d,
              alpha = options3d.alpha,
              beta = options3d.beta,
              z = seriesOptions.stacking ?
                (seriesOptions.stack || 0) * depth :
                series._i * depth;
            z += depth / 2;
            if (seriesOptions.grouping !== false) {
              z = 0;
            }
            each(series.data, function (point) {
              var shapeArgs = point.shapeArgs,
                angle;
              point.shapeType = "arc3d";
              var ran = point.options.h;
              shapeArgs.z = z;
              shapeArgs.depth = depth * 0.75 + ran;
              shapeArgs.alpha = alpha;
              shapeArgs.beta = beta;
              shapeArgs.center = series.center;
              shapeArgs.ran = ran;
              angle = (shapeArgs.end + shapeArgs.start) / 2;
              point.slicedTranslation = {
                translateX: round(
                  cos(angle) * seriesOptions.slicedOffset * cos(alpha * deg2rad)
                ),
                translateY: round(
                  sin(angle) * seriesOptions.slicedOffset * cos(alpha * deg2rad)
                )
              };
            });
          }
        );
        (function (H) {
          H.wrap(Highcharts.SVGRenderer.prototype, "arc3dPath", function (
            proceed
          ) {
            // Run original proceed method
            var ret = proceed.apply(this, [].slice.call(arguments, 1));
            ret.zTop = (ret.zOut + 0.5) / 100;
            return ret;
          });
        })(Highcharts);

        Highcharts.chart("container", {
          chart: {
            // marginRight: 120,
            backgroundColor: "rgba(0,0,0,0)",
            type: "pie",
            animation: false,
            events: {
              load: function () {
                var each = Highcharts.each,
                  points = this.series[0].points;
                each(points, function (p, i) {
                  p.graphic.attr({
                    translateY: -p.shapeArgs.ran
                  });
                  p.graphic.side1.attr({
                    translateY: -p.shapeArgs.ran
                  });
                  p.graphic.side2.attr({
                    translateY: -p.shapeArgs.ran
                  });
                });
              }
            },
            options3d: {
              enabled: true,
              alpha: 65,
              beta: 0
            }
          },
          colors: ['rgba(242, 146, 78, 1)', 'rgba(246, 191, 83, 1)', '#94D2F3', '#1B55A5', '#279DAA'].reverse(),
          legend: {
            maxHeight: 300,
            align: "right", //水平方向位置
            layout: "vertical",
            verticalAlign: "middle", //垂直方向位置
            itemMarginTop: 10,
            itemStyle: {
              color: "#fff"
            },
            x: -25,
            itemCheckboxStyle: {
              height: "1px"
            }
          },
          tooltip: {
            trigger: "item",
            backgroundColor: '#1045A4',
            valueSuffix: '人', //数据后面单位
            borderColor: 'RGBA(16, 69, 164, 0)',

            style: {
              color: "#fff",
              fontSize: "12px",
              fontWeight: "blod",
              fontFamily: "Courir new"
            }

          },
          credits: {
            enabled: false
          }, //去水印
          title: {
            text: ""
          }, //不显示
          plotOptions: {
            pie: {
              innerSize: '60%',
              allowPointSelect: false,
              cursor: "pointer",
              depth: 45,
              dataLabels: {
                enabled: false
              },
              showInLegend: true
            }
          },
          series: [{
            type: "pie",
            name: "",
            data: this.personTypeData.reverse()
          }]
        });
      },

      //象形图
      taskcharts() {
        const mychart = this.$echarts.init(this.$refs.taskcharts);
        mychart.setOption({
          tooltip: {
            trigger: "item",
            backgroundColor: "RGBA(16, 69, 164, 1)",
            formatter: function (params) {
              let res = "";
              let titmsg = '<span style ="font-size:12px;color:#01DFF4;">' + params.name + '</span>';
              let dotHtml = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#1197b8"></span>';
              res = titmsg + "<br/>" + "<div style='width:120%;height:2px;background:#010D34;margin-left:-10%'></div>" + dotHtml + params.value + " 个";
              return res;
            },
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
            },
            textStyle: {
              color: "#fff",
              fontSize: 12
            }
          },
          xAxis: {

            splitLine: {
              show: false
            },
            offset: 10,
            axisLine: {
              lineStyle: {
                color: "#999"
              }
            },
            axisLabel: {
              margin: 10,
              interval: 0
            }
          },
          yAxis: {
            data: this.renwuTypeechart.map(i => {
              return i.name
            }),
            inverse: true,
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              margin: 10,
              color: "rgba(255, 255, 255, 1)",
              fontSize: 12,
              interval: 0
            }
          },
          grid: {
            top: "center",
            height: '100%',
            left: 120,
            right: 100
          },
          series: [{
            type: "pictorialBar",
            symbol: "rect",
            symbolRepeat: "fixed",
            symbolMargin: 2.6,
            symbolClip: true,
            symbolSize: [6, 20], //单个symbol大小
            symbolBoundingData: 200,
            data: this.renwuTypeechart.map(i => {
              return i.count
            }),
            z: 10,

            legendHoverLink: true,
            barWidth: 6,
            itemStyle: {
              normal: {
                color: function (params) {
                  var colorList = ["#94F7F4", "#60EABC", "#29FFD6", "#9dff98", "#94F7F4", "#60EABC", "#29FFD6", "#9dff98", "#94F7F4", "#60EABC", "#29FFD6", "#9dff98",];
                  return colorList[params.dataIndex];
                }
              }
            }
          },
            {
              type: "pictorialBar",
              symbol: "rect",
              symbolRepeat: "fixed",
              symbolMargin: 2.6,
              symbolSize: [6, 20], //单个symbol大小
              data: this.renwuTypeechart.map(i => {
                return i.count
              }),
              z: 5,
              animationDuration: 0,
              legendHoverLink: true,
              barWidth: 6,
              itemStyle: {
                normal: {
                  color: "RGBA(48, 138, 150, 0.4)"
                }
              },
              label: {
                show: true,
                position: "right",
                distance: 15,
                formatter: "{c}个",
                color: "rgba(2, 223, 244, 1)"
              }
            }
          ]
        });
      },

      //社会组织
      shehuizuzhi() {
        //数组去最大值
        let arrlist = [];
        arrlist = this.socialTypedata.map(item => {
          return item.number;
        });
        let arrbox = arrlist.map(i => {
          return 24 - i
        })
        // console.log(arrbox)
        let arrnum = new Array(10).fill(20 - Math.max(...arrlist));
        const mychart = this.$echarts.init(this.$refs.shehuizuzhi);
        mychart.setOption({
          color: ["#3398DB"],
          tooltip: {
            trigger: "axis",
            backgroundColor: "RGBA(16, 69, 164, 1)",
            formatter: function (params) {
              let res = "";
              let titmsg = '<span style ="font-size:12px;color:#01DFF4;">' + params[2].axisValue + '</span>';
              let dotHtml = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#1197b8"></span>';
              res = titmsg + "<br/>" + "<div style='width:120%;height:2px;background:#010D34;margin-left:-10%'></div>" + dotHtml + params[2].value + " 家";
              return res;
            },

            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
            },
            textStyle: {
              color: "#fff",
              fontSize: 12
            }
          },
          grid: {
            top: "10%",
            left: "3%",
            right: "4%",
            bottom: "0",
            containLabel: true
          },
          xAxis: [{
            type: "category",
            // offset: 5,
            data: this.socialTypedata.map(item => {
              return item.name;
            }),
            boundaryGap: ['20%', '20%'],
            axisLabel: {
              interval: 0,
              color: "rgba(1, 223, 244, 1)",
              rotate: 20
            },
            axisLine: {
              show: true,
              onZero: false,
              lineStyle: {
                color: "rgba(101, 198, 231, .3)",
                width: 1
              }
            },
            axisTick: {
              show: true,
              alignWithLabel: true
            }
          }],
          yAxis: [{
            type: "value",
            axisLabel: {
              interval: 0,
              color: "rgba(1, 223, 244, 1)",
              formatter: "{value} 家"
            },
            axisLine: {
              show: true,
              onZero: true,
              lineStyle: {
                color: "rgba(21, 49, 91, 1) ",
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "rgba(102, 198, 231,1)",
                opacity: 0.2
              }
            }
          }],
          series: [

            {
              //透明底片
              name: "",
              type: "bar",
              barWidth: 15,
              stack: "1",
              symbolOffset: [0, 0],
              z: 20,
              itemStyle: {
                color: "rgba(9, 124, 141, 0)"
              },
              data: [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5]
            },

            {
              //三个最低下的圆片
              name: "",
              type: "pictorialBar",
              stack: "1",
              symbolSize: [15, 7],
              symbolOffset: [0, -0.5],
              z: 20,
              itemStyle: {
                color: "rgba(9, 124, 141, 1)"
              },
              data: [1, 1, 1, 1, 1, 1, 1,]
            },

            //下半截柱状图
            {
              type: "bar",
              barWidth: 15,
              stack: "1",
              z: 12,
              barGap: "-100%",
              itemStyle: {
                //lenged文本
                opacity: 1,
                normal: {
                  color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: "rgba(12, 140, 159, 1)"
                  },
                    {
                      offset: 1,
                      color: "rgba(27, 223, 252, 1)"
                    }
                  ]),
                },
              },
              label: {
                show: true,
                position: "outside",
                distance: 10,
                formatter: "{c}家",
                textStyle: {
                  // 数值样式
                  color: "#fff",
                  fontSize: 12
                }
              },
              data: this.socialTypedata.map(item => {
                return item.number;
              })
            },

            {
              type: "pictorialBar",
              symbolSize: [15, 7],
              symbolOffset: [0, -8.5],
              z: 25,
              stack: "1",
              symbolPosition: "end",
              itemStyle: {
                color: "RGBA(1, 214, 244, 1)"
              },
              data: this.socialTypedata.map(item => {
                return item.number;
              })
            },

            {
              type: "bar",
              barWidth: 15,
              symbolOffset: [0, 5],
              z: 12,
              stack: "1",
              itemStyle: {
                color: "RGBA(6, 67, 98, 1)",
                opacity: 0.4
              },
              symbolPosition: "end",
              data: arrbox
            },
            {
              type: "pictorialBar",
              symbolSize: [15, 7],
              symbolOffset: [0, -12],
              z: 12,
              stack: "1",
              symbolPosition: "end",
              itemStyle: {
                color: "RGBA(22, 194, 220, 0.3)"
              },
              data: [1, 1, 1, 1, 1, 1, 1,]
            }
          ]
        });
      },
      //商户档案
      shanghudangan() {
        //数组去最大值
        let arrlist = [];
        arrlist = this.merchantTypeData.map(i => {
          return i.number
        });
        let arrboxnum = arrlist.map(i => {
          return 24 - i
        })
        let arrnum = new Array(10).fill(Math.max(...arrlist) + 9);
        const mychart = this.$echarts.init(this.$refs.shanghudangan);
        mychart.setOption({
          color: ["#3398DB"],
          tooltip: {
            trigger: "axis",
            backgroundColor: "RGBA(16, 69, 164, 1)",
            formatter: function (params) {
              let res = "";
              let titmsg = '<span style ="font-size:12px;color:#01DFF4;">' + params[2].axisValue + '</span>';
              let dotHtml = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#1197b8"></span>';
              res = titmsg + "<br/>" + "<div style='width:120%;height:2px;background:#010D34;margin-left:-10%'></div>" + dotHtml + params[2].value + " 家";
              return res;
            },
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
            },
            textStyle: {
              color: "#fff",
              fontSize: 12
            }
          },
          grid: {
            top: "10%",
            left: "3%",
            right: "4%",
            bottom: "0",
            containLabel: true
          },
          xAxis: [{
            type: "category",
            data: this.merchantTypeData.map(i => {
              return i.name
            }),
            axisLabel: {
              interval: 0,
              color: "rgba(1, 223, 244, 1)",
              rotate: 20
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "rgba(101, 198, 231, .3)"
              }
            },
            axisTick: {
              show: true,
              alignWithLabel: true
            }
          }],
          yAxis: [{
            type: "value",
            axisLabel: {
              interval: 0,
              color: "rgba(1, 223, 244, 1)",
              formatter: "{value} 家"
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "rgba(21, 49, 91, 1) "
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "rgba(102, 198, 231,1)",
                opacity: 0.2
              }
            }
          }],
          series: [
            {
              //
              name: "",
              type: "bar",
              barWidth: 15,
              stack: "1",
              symbolOffset: [0, 0],
              z: 20,
              itemStyle: {
                color: "rgba(9, 124, 141, 0)"
              },
              data: [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5]
            },
            {
              //三个最低下的圆片
              name: "",
              type: "pictorialBar",
              symbolSize: [15, 7],
              stack: "1",
              symbolOffset: [0, -0.5],
              z: 20,
              itemStyle: {
                color: "rgba(30, 128, 228, 1)"
              },
              data: [1, 1, 1, 1, 1, 1, 1, 1]
            },

            //下半截柱状图
            {
              type: "bar",
              barWidth: 15,
              stack: "1",
              barGap: "-100%",
              z: 12,
              itemStyle: {
                //lenged文本
                opacity: 0.8,
                normal: {
                  color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: "rgba(18, 81, 210, 1)"
                  },
                    {
                      offset: 1,
                      color: "rgba(27, 223, 252, 1)"
                    }
                  ]),
                },

              },
              label: {
                show: true,
                position: "outside",
                distance: 10,
                stack: "1",
                formatter: "{c}家",
                textStyle: {
                  // 数值样式
                  color: "#fff",
                  fontSize: 12
                }
              },
              data: this.merchantTypeData.map(i => {
                return i.number
              }),
            },

            {
              type: "pictorialBar",
              symbolSize: [15, 7],
              symbolOffset: [0, -8.5],
              z: 25,
              stack: "1",
              symbolPosition: "end",
              itemStyle: {
                color: "rgba(22, 187, 237, 1)",
                opacity: 0.7
              },
              data: this.merchantTypeData.map(i => {
                return i.number
              }),
            },

            {
              type: "bar",
              symbolSize: [15, 7],
              symbolOffset: [0, 5],
              z: 12,
              stack: "1",
              itemStyle: {
                color: "rgba(18, 81, 210, 0.4)",
                opacity: 0.7
              },
              symbolPosition: "end",
              data: arrboxnum
            },
            {
              type: "pictorialBar",
              stack: "1",
              z: 12,
              symbolSize: [15, 7],
              symbolOffset: [0, -12],
              itemStyle: {
                color: "rgba(22, 187, 237, 0.4)"
              },
              data: [1, 1, 1, 1, 1, 1, 1,]
            }
          ]
        });
      },
      //表格操作提示
      tableAction() {
        return this.$createElement(
          "HelpHint", {
            props: {
              content: "空置率=空置房屋/房屋总数"
            },
          },
          "空置率"
        );
      },

      //网格事件状态数据
      async GetGirdtype(gridId) {
        // const {
        // 	data
        // } = await eventsTypeData({
        // 	gridId
        // })
        let data = {
          "allStatus": {
            "todo": 31,
            "toDispatch": 33,
            "toUserEnd": 5,
            "twoExamine": 1,
            "toExamine": 19,
            "toEnd": 0,
            "beReceived": 33,
            "totalCount": 149,
            "isEnd": 19
          },
          "streetSide": [{"name": "测试类型", "totalCount": 0}, {"name": "环境问题", "totalCount": 1}, {
            "name": "设施问题",
            "totalCount": 0
          }, {"name": "其他", "totalCount": 0}, {"name": "设备设施检测", "totalCount": 4}, {
            "name": "消防设备检测",
            "totalCount": 11
          }, {"name": "测试数据", "totalCount": 1}, {"name": "紧急事件", "totalCount": 10}, {
            "name": "聚众事件",
            "totalCount": 5
          }, {"name": "投诉事件", "totalCount": 18}, {"name": "报修事件", "totalCount": 3}, {"name": "测试类型", "totalCount": 0}],
          "resident": [{"name": "测试类型", "totalCount": 1}, {"name": "环境问题", "totalCount": 0}, {
            "name": "设施问题",
            "totalCount": 2
          }, {"name": "其他", "totalCount": 1}, {"name": "设备设施检测", "totalCount": 14}, {
            "name": "消防设备检测",
            "totalCount": 9
          }, {"name": "测试数据", "totalCount": 9}, {"name": "紧急事件", "totalCount": 23}, {
            "name": "聚众事件",
            "totalCount": 9
          }, {"name": "投诉事件", "totalCount": 16}, {"name": "报修事件", "totalCount": 11}, {"name": "测试类型", "totalCount": 1}]
        };

        this.eventListBottm = [{
          name: "待接收",
          number: data.allStatus.beReceived
        },
          {
            name: "待处理",
            number: data.allStatus.todo
          },
          {
            name: "待派遣",
            number: data.allStatus.toDispatch
          },
          {
            name: "待审核",
            number: data.allStatus.toExamine
          },
          {
            name: "待结束",
            number: data.allStatus.toEnd
          },
          {
            name: "待评价",
            number: data.allStatus.toUserEnd
          },
          {
            name: "已结束",
            number: data.allStatus.isEnd
          },
          {
            name: "待审核",
            number: data.allStatus.toExamine
          },
        ];

        this.GirdEventJUmin = data.streetSide
        this.GirdEventWangGE = data.resident
        this.chartsreda();
      },

      hand(a, b, c) {
        // hand( scope.row.kongzhi , scope.row.zulin , scope.row.zizhu)
        const baifenlv = ((a * 100) / (a + b + c)).toFixed(2);
        return baifenlv + "%";
      },

      getEvents(gridId) {
        // const {
        // 	data
        // } = await eventsTypeData({
        // 	gridId
        // });
        // data.type.length ?
        // 	(this.redaData.type = data.type.map(i => {
        // 		return {
        // 			text: i
        // 		};
        // 	})) :
        // 	"";
        // data.street ? (this.redaData.street = data.street) : "";
        // data.resident ? (this.redaData.resident = data.resident) : "";
        // // this.initReda();
      },
      // 任务数据
      async getTask(gridId) {
        let data = {
          "bigData": [{"name": "撒", "count": 1}, {"name": "测试数据CCC", "count": 1}, {
            "name": "测试数据DDD",
            "count": 1
          }, {"name": "测试数据类型AAA", "count": 1}, {"name": "测试数据bbbb", "count": 1}],
          "allStatistics": {
            "toReject": 15,
            "doing": 14,
            "beReceived": 26,
            "invalid": 10,
            "distribute": 3,
            "totalCount": 90,
            "beVerified": 3,
            "isEnd": 22,
            "isComplete": 29
          }
        };
        this.renwuTypeechart = data.bigData
        this.EventDataList = [{
          name: '代派单',
          number: data.allStatistics.distribute
        },
          {
            name: '处理中',
            number: data.allStatistics.doing
          },
          {
            name: '待核查',
            number: data.allStatistics.beVerified
          },
          {
            name: '已完成',
            number: data.allStatistics.isComplete
          },
          {
            name: '已驳回',
            number: data.allStatistics.toReject
          },
          {
            name: '已结束',
            number: data.allStatistics.isEnd
          },
        ]
        this.taskcharts();
      },
      async getData(gridId) {
        const {
          data
        } = await bigData({
          gridId
        });

        const getiFall =
          data.socialType.newGeti - data.socialType.lastGeti > 0 ||
          data.socialType.newGeti - data.socialType.lastGeti == 0;
        const lastGeti =
          data.socialType.lastGeti > 0 ? data.socialType.lastGeti : 1;

        const qiyeFall =
          data.socialType.newShanghu - data.socialType.lastShanghu > 0 ||
          data.socialType.newShanghu - data.socialType.lastShanghu == 0;
        const lastShanghu =
          data.socialType.lastShanghu > 0 ? data.socialType.lastShanghu : 1;
        this.organization = {
          sociology: {
            name: "个体商户",
            number: data.socialType.newGeti,
            compare: `较去年${getiFall ? "增长" : "下降"}${data.socialType
              .newGeti - data.socialType.lastGeti}`,
            percent: `${(
              ((data.socialType.newGeti - data.socialType.lastGeti) * 100) /
              lastGeti
            ).toFixed(2)}%`,
            fall: getiFall ? 0 : 1 // 0 是降低 1 是增长
          },
          enterprise: {
            name: "企业商户",
            number: "126",
            compare: `较去年${qiyeFall ? "增长" : "下降"}${data.socialType
              .newShanghu - data.socialType.lastShanghu}`,
            percent: `${(
              (data.socialType.newShanghu - data.socialType.lastShanghu) /
              lastShanghu
            ).toFixed(2)}%`,
            fall: qiyeFall ? 0 : 1 // 0 是降低 1 是增长
          }
        };

        this.volunteer = data.volunteer;
        this.gridMember = data.gridMember;
        // 人口类型
        this.personType.data = [{
          value: data.personType[0].liudong,
          name: "流动人口"
        },
          {
            value: data.personType[0].jingwai,
            name: "境外人口"
          },
          {
            value: data.personType[0].waichu,
            name: "外出人口"
          },
          {
            value: data.personType[0].usually,
            name: "常住人口"
          },
          {
            value: data.personType[0].huji,
            name: "户籍人口"
          }
        ];
        // 特殊人群
        this.personAttribute = [{
          name: "老龄人口",
          number: data.population[0].jingshen
        },
          {
            name: "退伍军人",
            number: data.population[0].xingshi
          },
          {
            name: "入党人员",
            number: data.population[0].xidu
          },
          {
            name: "社区志愿者",
            number: data.population[0].shejiang
          },
          {
            name: "上访人员",
            number: data.population[0].shangfang
          }
        ];
        // 建筑类型
        this.buildingType = data.buildingType;
        let zizhu = 0;
        let zulin = 0;
        let kongzhi = 0;
        let qita = 0;

        data.houseType.forEach(e => {
          zizhu += e.zizhu;
          zulin += e.zulin;
          kongzhi += e.kongzhi;
          qita += qita;
        });
        const all = zizhu + zulin + kongzhi;
        // 房屋类型
        this.HouseList = [{
          name: "自住房",
          number: zizhu,
          proportion: `${((zizhu * 100) / all).toFixed(2)}%`
        },
          {
            name: "租赁房",
            number: zulin,
            proportion: `${((zulin * 100) / all).toFixed(2)}%`
          },
          {
            name: "空置房",
            number: kongzhi,
            proportion: `${((kongzhi * 100) / all).toFixed(2)}%`
          }
        ];
        this.tableData = data.houseType;

        // this.store.data = [
        //   data.merchantType.pifa,
        //   data.merchantType.gongyi,
        //   data.merchantType.canyin,
        //   data.merchantType.yiban,
        //   data.merchantType.minsheng
        // ];
        this.sheShiList = [{
          name: "景点",
          number: data.buildingType.jingdian
        },
          {
            name: "公园",
            number: data.buildingType.gongyuan
          },
          {
            name: "住宅",
            number: data.buildingType.zhuzhai
          },
          {
            name: "办公楼",
            number: data.buildingType.bangong
          },
          {
            name: "工厂",
            number: data.buildingType.gongchang
          },
          {
            name: "公共设施",
            number: data.buildingType.gonggong
          },
          {
            name: "其他",
            number: data.buildingType.qita
          }
        ];
      },
      handleTabs(tabs) {
        this.tab = tabs;
      },
      handleReturn() {
        this.$router.go(-1);
      },
      // 地图改变 ，后函数
      handleChange(gridId) {
        this.getData(gridId.id);
      },
      // 人口 玫瑰花图
      initPerson() {
        const that = this;
        const mychart = this.$echarts.init(this.$refs.sexRing);
        mychart.setOption({
          color: [
            "#088FF8",
            "#FFCC00",
            "#7A7EFF",
            "#3ACE83",
            "#EE5C5C"
          ].reverse(),
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          graphic: [{
            //环形图中间添加文字
            type: "text", //通过不同top值可以设置上下显示
            left: (_ => {
              let str = String(that.personType.allNumber);
              if (str.length < 2) {
                return "40%";
              } else if (str.length > 2 && str.length < 6) {
                return "35%";
              } else {
                return "32.5%";
              }
            })(),
            top: "45%",
            style: {
              text: String(that.personType.allNumber),
              // text: String(32546) ,
              textAlign: "center",
              fill: "#fff", //文字的颜色
              width: 70,
              height: 30,
              fontSize: 17,
              fontFamily: "Microsoft YaHei"
            }
          },
            {
              //环形图中间添加文字
              type: "text", //通过不同top值可以设置上下显示
              left: "32%",
              top: "55%",
              style: {
                text: "总人口数",
                textAlign: "center",
                fill: "#71Bdff", //文字的颜色
                width: 30,
                height: 30,
                fontSize: 18,
                fontFamily: "Microsoft YaHei"
              }
            }
          ],

          legend: {
            icon: "circle",
            right: 20,
            top: "center",
            padding: 10,
            orient: "vertical",
            //   itemHeight: "4",
            itemGap: 20,
            itemWidth: 8,
            width: 40,
            height: "50%",
            align: "left",
            textStyle: {
              color: "#fff"
            },
            data: this.personType.type
          },

          series: [{
            name: "人口分布",
            type: "pie",
            radius: ["35%", "50%"],
            center: ["40%", "50%"],
            // roseType: 'area',
            stillShowZeroSum: false,
            label: {
              show: true,
              formatter: "{d}%"
              // color: "#fff",
            },
            labelLine: {
              //引导线设置
              normal: {
                show: true //引导线显示
              }
            },
            data: this.personType.data
          }]
        });
      },
      chartsreda() {
        const mychart = this.$echarts.init(this.$refs.chartsreda);
        mychart.setOption({
          grid: {
            left: "40%",
            top: "center",
            height: "100%",
            width: "100%"
          },
          tooltip: {
            trigger: "item",
            backgroundColor: "RGBA(16, 69, 164, 1)",

            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
            },
            textStyle: {
              color: "#fff",
              fontSize: 12
            }
          },
          legend: {
            data: ["居民上报", "网格员上报"],
            bottom: "6%",
            orient: "vertical",
            right: "2%",
            itemWidth: 10,
            itemHeight: 10,
            icon: "circle", //  这个字段控制形状
            textStyle: {
              color: "#fff"
            },
            itemGap: 12 //间距
          },

          width: "90%",
          height: "90%",
          color: ["#2EFFFD", "#FFB858"], //颜色
          radar: {
            indicator: this.GirdEventJUmin.map(i => {
              return {
                name: i.name
              }
            }),
            radius: 60,
            splitArea: {
              areaStyle: {
                shadowColor: "rgba(234, 3, 3, 1)",
                opacity: 0,
                shadowBlur: 0.5
              }
            },
            splitLine: {
              lineStyle: {
                type: "dotted", //分割线样式
                color: "#0F63AA"
              }
            },
            axisLine: {
              symbol: "circle",
              symbolSize: 5,
              lineStyle: {
                color: "#2DC6FF"
              }
            },
            shape: "circle",
            name: {
              textStyle: {
                color: "#fff" // 文字颜色
              }
            },
            splitNumber: 3
          },
          /*  */
          series: [{
            // name: "预算 vs 开销（Budget vs spending）",
            width: "100%",
            height: 172,
            type: "radar",
            symbol: "none",
            data: [{
              value: this.GirdEventJUmin.map(i => {
                return i.totalCount
              }),
              name: "居民上报",
              areaStyle: {
                color: "#2EFFFD"
              }
            },
              {
                value: this.GirdEventWangGE.map(i => {
                  return i.totalCount
                }),
                name: "网格员上报",
                areaStyle: {
                  color: "#FFB858"
                }
              }
            ]
          }]
        });

      },

      // 商户 柱状图
      initStore() {
        if(!this.store && !this.store.data){
          return
        }
        const mychart = this.$echarts.init(this.$refs.store);
        mychart.setOption({
          grid: {
            show: false
          },
          xAxis: {
            // nameGap: 8,
            triggerEvent: true,
            splitLine: {
              show: false
            },
            axisLabel: {
              clickable: true,
              interval: 0,
              color: "#71BDFF",
              rotate: 45
            },
            axisLine: {},
            type: "category",
            data: this.store.xAxis
          },
          yAxis: {
            type: "value",
            splitLine: {
              show: false
            },
            axisLabel: {
              color: "#7991B5",
              interval: 0
            }
          },
          series: [{
            data: this.store.data,
            type: "bar",
            barWidth: "20",
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 1,
                  color: "#1B5AFB"
                },
                  {
                    offset: 0,
                    color: "#13C2FF"
                  }
                ]),
                label: {
                  show: true, // 开启显示
                  position: "top", // 在上方显示
                  textStyle: {
                    // 数值样式
                    color: "#ffffff",
                    fontSize: 12
                  }
                }
              }
            }
          }]
        });
      },
      // 任务 柱状图
      initTask() {
        const mychart = this.$echarts.init(this.$refs.two);
        mychart.setOption({
          grid: {
            width: "65%",
            left: "15%",
            height: "56%"
          },
          xAxis: {
            // nameGap: 8,
            triggerEvent: true,
            splitLine: {
              show: false
            },

            axisLine: {
              show: false
            },
            axisLabel: {
              show: false
            },
            type: "value"
          },
          // max: 20,
          yAxis: {
            type: "category",
            data: this.task.yAxis,
            boundaryGap: false,
            axisLabel: {
              clickable: true,
              interval: 0,
              color: "#71BDFF",
              rotate: 0,
              fontSize: 14
            },
            // max:5,
            // splitNumber : 5,
            splitLine: {
              show: false
            },
            axisLine: {
              show: false
            }
          },
          series: [{
            data: this.task.data,
            type: "bar",

            barCateGoryGap: "40",
            // barGap: "200%",
            barWidth: "14",
            itemStyle: {
              normal: {
                barBorderRadius: 7,
                color: new this.$echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                  offset: 1,
                  color: "#1B5AFB"
                },
                  {
                    offset: 0,
                    color: "#13C2FF"
                  }
                ]),
                label: {
                  show: true, // 开启显示
                  position: "right", // 在上方显示
                  textStyle: {
                    // 数值样式
                    color: "#ffffff",
                    fontSize: 12
                  }
                }
              }
            }
          }]
        });
      },
      handleCellstyle({
                        row,
                        column,
                        rowIndex,
                        columnIndex
                      }) {
        if ((rowIndex + 2) % 2) {
          return {
            "background-color": "rgba(19, 121, 200, 0.3) !important",
            'color': "#01DFF4 !important",
            'font-size': '12px',
            'letter-spacing': '1.5px'
          };
        } else {
          return {
            color: "#01DFF4 !important",
            'font-size': '12px',
            'letter-spacing': '1.5px'
          };
        }
      },
      tableRowClassName: function (row, rowIndex) {
        if ((rowIndex + 1) % 2) {
          return "warm-row";
        } else {
          return "warm-row";
        }
      },

    }
  };
</script>
<style lang="scss" scoped>
  .demography {
    width: 510px;
    height: 448px;
    position: relative;
    background-image: url("../../assets/background/jc2.png");
    background-size: 100% 100%;
  }

  .taskBox-onep_renda {
    width: 510px !important;
    height: 220px !important;
    margin-top: 5px;
    margin-left: -36px;

    div {
      width: 510px !important;
      height: 220px !important;

    }
  }

  /*   margin-top: -127px;
	    margin-left:92px; */
  .onp_backdroundimg {
    width: 241px;
    height: 103px;
    position: absolute;
    top: 48%;
    left: 39.6%;
    transform: translateX(-50%);
    background-image: url("../../assets/background/DZphoto.png");
    background-size: 100% 100%;
  }

  .taskBox-onep {
    width: 510px !important;
    height: 230px !important;
    position: relative;

    .taskcharts {
      width: 510px !important;
      height: 240px !important;
      // background-image:url("../../assets/background/dizuo.png"); ;
      //    background-size: 100% 100%;
    }
  }

  .housingsituation {
    width: 510px;
    height: 430px;
    margin-top: 65px;
    background-image: url("../../assets/background/jc2.png");
    background-size: 100% 100%;
  }

  .Gridevent-status {
    width: 510px;
    height: 430px;
    margin-top: 1px !important;
    margin-left: 3.5px;
    background-image: url("../../assets/background/jc2.png");
    background-size: 100% 100%;
  }

  .Gridtask-status {
    width: 510px;
    height: 430px;
    margin-top: 17px;
    background-image: url("../../assets/background/jc2.png");
    background-size: 100% 100%;
  }

  .Gridtask-statusslo {
    width: 510px;
    height: 430px;
    margin-top: 25px;
    background-image: url("../../assets/background/jc2.png");
    background-size: 100% 100%;
  }

  .taskBox {
    width: 100%;
    height: 220px;
    margin-top: 20px;

    div {
      width: 100% !important;
      height: 220px !important
    }
  }

  .taskBox::-webkit-scrollbar {
    display: none;
  }

  .takeSix {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-left: 40px;
    margin-top: 20px;
  }

  .takeSix-box {
    display: flex;
    justify-content: center;
    margin-left: 30px;
    align-items: center;
    width: 113px;
    height: 42px;
    background: linear-gradient(rgba(55, 211, 255, 0.1),
      rgba(55, 211, 255, 0.2),
      rgba(55, 211, 255, 0.3),
      rgba(55, 211, 255, 0.4),
      rgba(55, 211, 255, 0.5),
      rgba(55, 211, 255, 0.6));
    border-bottom: 2px solid rgba(0, 250, 250, 1);
    margin-left: 10px;
    font-size: 22px;
    font-weight: 400;
    margin-top: 17px;
    color: #ffffff;
  }

  .box-title {
    display: flex;
    justify-content: center;
    font-size: 20px;
    font-family: Adobe Heiti Std;
    font-weight: bold;
    color: #2aa8d3;
    line-height: 34px;
    background: linear-gradient(92deg,
      #00ebff 0%,
      #bef3fa 50.68359375%,
      #00ebff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .box-title-one {
    display: flex;
    margin-top: -5px;
    font-size: 20px;
    width: 190px;
    margin-left: 141px;
    font-family: Adobe Heiti Std;
    font-weight: bold;
    color: #2aa8d3;
    line-height: 44px;
    background: linear-gradient(92deg,
      #00ebff 0%,
      #bef3fa 50.68359375%,
      #00ebff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .box-title-two {
    width: 190px;
    margin: -46px 0 0 534px;
    font-size: 20px;
    font-family: Adobe Heiti Std;
    font-weight: bold;
    color: #2aa8d3;
    line-height: 44px;
    background: linear-gradient(92deg,
      #00ebff 0%,
      #bef3fa 50.68359375%,
      #00ebff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .hous-img-box {
    width: 100%;
    height: 42px;
    display: flex;

    margin-top: 38px;

    .hous-img {
      width: 128px;
      height: 38px;
      background-image: url("../../assets/background/fangwu1.png");
      background-size: 100% 100%;
    }
  }

  .hous-img-box-two {
    width: 100%;
    height: 42px;
    display: flex;

    margin-top: 26px;

    .hous-img {
      width: 128px;
      height: 38px;
      background-image: url("../../assets/background/fangwu1.png");
      background-size: 100% 100%;
    }
  }

  .table-box {
    width: 100%;
    height: 230px;
    overflow: hidden;
    overflow: scroll;
    margin-top: 24px;
  }

  .table-box::-webkit-scrollbar {
    display: none;
  }

  .Radar-chart-box {
    height: 100%;
    width: 100%;
  }

  .houstiele {
    text-align: center;
    height: 13px;
    font-size: 10px;
    font-family: Adobe Heiti Std;
    font-weight: normal;
    color: #02dff4;
    line-height: 14px;
    margin-top: 3px;
  }

  .housFont {
    text-align: center;
    height: 13px;
    font-size: 10px;
    font-family: Adobe Heiti Std;
    font-weight: normal;
    color: #ffffff;
    line-height: 14px;
    margin-top: 3px;
  }

  .chartsreda {
  }

  .Statisticalchart {
    width: 100%;
    margin-top: 20px;
    height: 140px;
    display: flex;
  }

  .Statistical {
    width: 100% px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-right: 12px;

    div {
      .namelist {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 113px;
        height: 42px;
        background: linear-gradient(rgba(55, 211, 255, 0.05),
          rgba(55, 211, 255, 0.15),
          rgba(55, 211, 255, 0.3),
          rgba(55, 211, 255, 0.4),
        );
        border-bottom: 2px solid rgba(0, 250, 250, 1);
        margin-left: 10px;
        font-size: 22px;
        font-weight: 400;
        color: #ffffff;
      }

      .numberlist {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 4px;
        height: 13px;
        letter-spacing: 1.2px;
        font-size: 12px;
        font-family: Adobe Heiti Std;
        font-weight: normal;
        color: #01dff4;
        line-height: 20px;
      }
    }
  }

  .Statistical-one {
    width: 100% px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-right: 12px;
    margin-top: 22px;

    div {
      margin-top: 4px;

      .namelist {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 133px;
        height: 42px;
        background: linear-gradient(rgba(55, 211, 255, 0.1),
          rgba(55, 211, 255, 0.2),
          rgba(55, 211, 255, 0.3),
          rgba(55, 211, 255, 0.4),
          rgba(55, 211, 255, 0.5),
          rgba(55, 211, 255, 0.6));
        border-bottom: 2px solid rgba(0, 250, 250, 1);
        margin-left: 10px;
        font-size: 22px;
        font-weight: 400;
        color: #ffffff;
      }

      .numberlist {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 4px;
        height: 13px;
        letter-spacing: 1.2px;
        font-size: 12px;
        font-family: Adobe Heiti Std;
        font-weight: normal;
        color: #01dff4;
        line-height: 20px;
      }
    }
  }

  .boxOne-p {
    width: 360px !important;
    height: 220px !important;

    div {
      width: 360px !important;
      height: 220px !important;
    }
  }

  .boxOne-poi {
    width: 360px !important;
    height: 232px !important;
    margin-left: 24px;

    div {
      width: 360px !important;
      height: 232px !important;
    }
  }

  .takeSix {
    width: 100% px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    div {
      .namelist {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 113px;
        height: 42px;
        border-bottom: 2px solid rgba(0, 250, 250, 1);
        margin-left: 10px;
        font-size: 22px;
        font-weight: 400;
        color: #ffffff;
      }

      .numberlist {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 4px;
        height: 13px;
        letter-spacing: 1.2px;
        font-size: 12px;
        font-family: Adobe Heiti Std;
        font-weight: normal;
        color: #01dff4;
        line-height: 20px;
      }
    }
  }

  .Statistical-sixbox {
    width: 100% px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-left: 40px;
    margin-right: 40px;
    margin-top: 6px;

    div {
      margin-top: 6px;

      .namelist {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 113px;
        height: 42px;
        background: linear-gradient(rgba(55, 211, 255, 0.05),
          rgba(55, 211, 255, 0.15),
          rgba(55, 211, 255, 0.3),
          rgba(55, 211, 255, 0.4),
        );
        border-bottom: 2px solid rgba(0, 250, 250, 1);
        margin-left: 10px;
        margin-top: 5px;
        font-size: 22px;
        font-weight: 400;
        color: #ffffff;
      }

      .numberlist {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 4px;
        height: 13px;
        font-size: 12px;
        letter-spacing: 1.2px;

        font-weight: bold;
        color: #01DFF4;
        line-height: 20px;
      }
    }
  }

  .Statistical-two {
    width: 100%;
    height: 42px;
    margin-top: 29px;
    display: flex;

    div {
      width: 113px;
      height: 42px;
      background: #37d3ff;
      opacity: 0.4;
      margin-left: 12px;
    }
  }
</style>
<style lang="scss" scoped>
  .teshurenqun {
    display: inline-block;
    margin-right: 0px;
    width: 14px;
    /* margin-top: 5px; */
  }

  .tabs-content {
    box-sizing: border-box;
    padding-left: 10px;
    display: flex;
    justify-content: space-around;
    height: calc(100% - 56px);
    /* min-height: 1024px; */
    position: relative;
    z-index: 15;
  }

  .teshurenqun1 {
    display: inline-block;
    margin-right: 5px;
    width: 20px;
    height: 20px;
  }

  .bunbox {
    margin-bottom: 15px 5px 0 0;
  }
</style>
<style lang="scss">

</style>
<style lang="scss" scoped>
  .onechanrts {
    margin-top: -2px !important;
  }

  html {
    overflow-y: hidden;
  }

  // 隐藏竖滚动条
  body {
    overflow-y: hidden;
  }

  // 隐藏竖滚动条
  // html {overflow-x: hidden;}   隐藏横滚动条
  .rise {
    color: #ff3862;
  }

  .warm-row {
    color: #f44336;
  }

  .fall {
    color: #00dbc5;
  }

  .el-table {
    background: rgba(0, 0, 0, 0);
    border: none;
    color: white !important;

    &::before {
      display: none;
    }

    ::v-deep tbody tr:hover > td {
      background-color: rgba(250, 250, 250, 0.3) !important;
    }

    ::v-deep thead {
      text-align: center;
      color: #71bdff !important;
    }

    ::v-deep th.is-leaf {
      border-bottom: 1px solid #71bdff;
    }

    ::v-deep td {
      border-bottom: 1px solid rgba(112, 112, 112, 0.3);
    }

    ::v-deep th,
    ::v-deep tr {
      background-color: rgba(0, 0, 0, 0);
    }

    ::v-deep .el-table__header-wrapper {
      background: rgba(0, 0, 0, 0);
    }

    ::v-deep .el-table__body-wrapper {
      &::-webkit-scrollbar {
        width: 4px;
      }

      &::-webkit-scrollbar-track {
        width: 4px;
        background: rgba(0, 0, 0, 0);
      }

      &::-webkit-scrollbar-thumb {
        background: #7991b5;
        border-radius: 4px;
      }

      &::-webkit-scrollbar-button {
        display: none;
      }

      .el-table__body {
        width: calc(100% - 4px) !important;
      }
    }
  }

  .background1 {
    background: #088ff8;
    box-shadow: 0 5px 10px 1px #088ff8;
  }

  .background2 {
    background: #ffcc00;
    box-shadow: 0 5px 10px 1px #ffcc00;
  }

  .background3 {
    background: #7991b5;
    box-shadow: 0 5px 10px 1px #7991b5;
  }

  .background4 {
    background: #26e5ff;
    box-shadow: 0 5px 10px 1px #26e5ff;
  }

  .buled {
    background: #000633;
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }

  .img {
    background-image: url("../../assets/background/dsj@2x.png");
    background-repeat: repeat;
    background-size: 100% 100%;
  }

  .p3 {
    box-sizing: border-box;
    padding: 3px;
  }

  .charts {
    height: 80%;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  .person-attribute-warp {
    position: absolute;
    width: 90%;
    height: 80%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: left;
    flex-direction: row;
    flex-wrap: wrap;

    .person-attribute {
      width: 33%;
      display: inline-block;

      .name {
        height: 20px;
        line-height: 20px;
        margin-bottom: 5px;
        color: #71bdff;
        position: relative;

        .text {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }

    .right-border {
      position: relative;

      &::after {
        content: "";
        display: block;
        width: 1px;
        height: 30%;
        position: absolute;
        right: 20px;
        top: 30%;
        background: #3083f2;
        transform: translateY(-50%);
      }
    }
  }

  .left {
    width: 510px;
    /*background: pink;*/
    height: 100%;

    position: relative;
    z-index: 20;

    .sex-ring {
      position: relative;
      height: 52%;
      margin-bottom: 15px;
    }

    .population-rose {
      position: absolute;
      bottom: 45px;
      width: 100%;
      height: 42%;

      .left-top {
        height: 39%;
        padding-left: 20px;
        padding-right: 20px;

        & > .warp {
          display: flex;

          .everyOne {
            padding-top: 40px;
            margin: 2px;
            //   margin-top: 6px;
            min-width: 85px;
            overflow: hidden;

            .name {
              color: #71bdff;
              margin-bottom: 6px;
              font-size: 14px;
            }
          }
        }
      }

      .left-bottom {
        height: 61%;
      }
    }
  }

  .center {
    text-align: center;
    position: relative;
    display: flex;
    justify-content: center;
    line-height: 22px;
  }

  .middle {
    position: relative;
    width: 838px;
    height: 100%;
    margin-top: 25px;
    z-index: 10;

    .middle-top {
      width: 768px;
      // margin-left: 4%;
      position: relative;
      margin-top: -10px !important;
      padding-bottom: -4%;
      box-sizing: border-box;
      // padding-bottom: 0.052083rem;
      // background: yellow;
      height: 587px;
      overflow: hidden;
      // left: -5%;
      z-index: 1;
      position: absolute;
      margin-left: 36px;


      .sheshi {
        position: absolute;
        top: 0;
        width: 100%;
        height: 54px;
        display: flex;
        justify-content: space-around;

        .sheshi-everyOne {
          position: relative;
          width: 120px;
          height: 54px;

          .sheshi-content {
            opacity: 0.8;
            background: #080843;
            border: 1px solid #131d81;
            height: 48px;
            line-height: 48px;

            .sheshi-name {
              font-size: 13px;
              font-family: Microsoft YaHei, Microsoft YaHei-Regular;
              font-weight: 400;
              text-align: left;
              color: #71bdff;
              font-style: normal;
              text-align: center;
              display: inline-block;
              width: 50%;
            }

            .sheshi-number {
              font-size: 18px;
              font-family: Roboto, Roboto-Regular;
              font-weight: 400;
              text-align: right;
              color: #ffffff;
              font-style: normal;
              text-align: center;
              display: inline-block;
              width: 50%;
            }
          }
        }
      }
    }

    .middle-bottom {
      position: absolute;
      left: 36px;
      top: 633px;
      z-index: 5;
      width: 768px;
      height: 270px;
      margin-bottom: 32px;
      background-image: url("../../assets/background/zhongjiankuang@2x.png");
      background-size: 100% 100%;

      .middle-bottom-left {
        width: 100%;
        position: absolute;
        left: 0;
        bottom: 0;
        height: 100%;
        z-index: 4;
      }

      .middle-bottom-right {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 28%;
        height: 100%;
        // background: #ffcc00;
        z-index: 4;

        .volunteer {
          position: absolute;
          width: 80%;
          height: 80%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);

          .gridPerson {
            position: relative;
            width: 100%;
            height: 50%;
            background: url(./dk_rs.svg) no-repeat center;
            background-size: 100% 100%;

            .personNumber {
              display: inline-block;
              color: #ffffff;
              font-size: 16px;
              position: absolute;
              font-style: normal;
              width: 50%;
              text-align: center;
              top: 20%;
              left: 0;
            }

            .personUnit {
              display: inline-block;
              color: #ffffff;
              font-size: 16px;
              position: absolute;
              width: 50%;
              text-align: center;
              bottom: 25%;
              left: 0;
              font-style: normal;
            }

            .title {
              position: absolute;
              display: inline-block;
              color: #ffffff;
              font-size: 16px;
              font-style: normal;
              width: 40%;
              height: 100%;

              text-align: center;
              top: 50%;
              right: 10%;
              display: inline-block;
            }
          }
        }
      }
    }
  }

  .mid-bottom-left-content {
    position: absolute;
    top: 56%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    //   height: 80%;
    display: flex;

    justify-content: space-between;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .charts-title {
    padding-left: 10px;
    left: -2px;
    background: linear-gradient(89deg,
      rgba(47, 128, 241, 0.5) 6%,
      rgba(47, 128, 241, 0) 99%);
  }

  .classsrtle_on2 {
    height: 430px !important;
    margin-top: 67px !important;
    margin-left: 1.7px !important;
  }

  .right {
    width: 540px;
    height: 100%;

    position: relative;
    left: 4px;
    z-index: 20;

    .population-attribute {
      position: relative;
      margin-bottom: 15px;
      height: 52%;

      .right-charts-title-top {
        height: 70%;
        width: 100%;
      }

      .right-charts-title-bottom {
        height: 30%;
        width: 100%;
        position: relative;

        .grid-task-warp {
          display: flex;
          justify-content: space-between;
          flex-direction: row;
          flex-wrap: wrap;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          height: 80%;
          width: 90%;

          .grid-task {
            width: 80px;

            box-sizing: border-box;

            .name {
              color: #71bdff;
            }

            .taskNumber {
              height: 28px;
              border-radius: 3px;
              padding: 2px;
              text-align: center;
              border: rgba(113, 189, 255, 0.5) 1px solid;
              text-align: center;

              .textNumber {
                height: 28px;
                display: flex;
                position: relative;
                justify-content: center;
              }
            }
          }
        }

        &::before {
          content: "";
          display: inline-block;
          position: absolute;
          width: 80%;
          height: 0;
          top: 0px;
          left: 50%;
          transform: translateX(-50%);
          border-top: rgba(99, 134, 185, 0.3) 1px solid;
        }
      }
    }

    .volunteer-grid-person {
      position: absolute;
      height: 42%;
      width: 100%;
      bottom: 45px;

      .right-charts-title-top {
        height: 60%;
        width: 100%;
        display: flex;
        margin-left: 32px;
      }

      .right-charts-title-bottom {
        height: 40%;
        width: 100%;
        position: absolute;

        .grid-task-warp {
          display: flex;
          justify-content: space-between;
          flex-direction: row;
          flex-wrap: wrap;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          height: 80%;
          width: 90%;

          .grid-task {
            width: 80px;

            box-sizing: border-box;

            .name {
              color: #71bdff;
            }

            .taskNumber {
              height: 28px;
              border-radius: 3px;
              padding: 2px;
              text-align: center;
              border: rgba(113, 189, 255, 0.5) 1px solid;
              text-align: center;

              .textNumber {
                height: 28px;
                display: flex;
                position: relative;
                justify-content: center;
              }
            }
          }
        }

        &::before {
          content: "";
          display: inline-block;
          position: absolute;
          width: 80%;
          height: 0;
          top: 0px;
          left: 50%;
          transform: translateX(-50%);
          border-top: rgba(99, 134, 185, 0.3) 1px solid;
        }
      }
    }
  }

  .left-charts-content-top {
    background: url("../../assets/background/sdj_dk.png") repeat;
    position: relative;
    width: 100%;
    height: 60%;
    border: #2535cb 1px solid;
    border-bottom: none;
    // box-shadow: 0 0 10px 2px rgba(37, 53, 203, 0.6);

    .charts-title {
      position: absolute;
      color: white;
      height: 16px;
      font-size: 16px;
      line-height: 16px;
      text-shadow: white 0 0 5px;
      top: -10px;
    }
  }

  .left-charts-content-bottom {
    background: url("../../assets/background/sdj_dk.png") repeat;
    position: relative;
    width: 100%;
    height: 40%;
    border: #2535cb 1px solid;
    border-top: none;
    // box-shadow: 0 0 10px 2px rgba(37, 53, 203, 0.6);

    .charts-title {
      position: absolute;
      color: white;
      height: 16px;
      font-size: 16px;
      line-height: 16px;
      text-shadow: white 0 0 5px;
      top: -10px;
    }
  }


  .charts-content {
    background: url("../../assets/background/sdj_dk.png") repeat;
    position: relative;
    width: 100%;
    height: 100%;
    border: #2535cb 1px solid;
    box-shadow: 0 0 10px 2px rgba(37, 53, 203, 0.6);

    .charts-title {
      position: absolute;
      color: white;
      height: 16px;
      font-size: 16px;
      line-height: 16px;
      text-shadow: white 0 0 5px;
      top: -10px;
    }
  }

  // individual icon msg sociology name number compareMsg compare percent
  .mid-content-left {
    position: absolute;
    width: 60%;
    height: 100%;
    left: 0;

    .charts-title {
      position: absolute;
      color: white;
      height: 16px;
      font-size: 16px;
      line-height: 16px;
      text-shadow: white 0 0 5px;
      top: -10px;
    }

    .individual {
      width: 33%;
      height: 80px;
      display: flex;

      .shehuiIcon {
        width: 60px;
        height: 60px;
      }

      .shehuiText {
        flex: 1;

        .textNumber {
          height: 30px;
          display: flex;
          position: relative;
        }

        .sheHuiName {
          font-size: 13px;
          color: #71bdff;
        }
      }
    }

    //   .individual {
    //     position: absolute;
    //     top: 0;
    //     height: 50%;
    //     width: 100%;
    //     box-sizing: border-box;
    //     display: flex;
    //     border-bottom: #ccc 1px;
    //     .icon {
    //       position: relative;

    //       width: 30%;
    //       height: 100%;
    //       .icon-warp {
    //         background: rgba(8, 143, 248, 0.3);
    //         display: inline-block;
    //         position: absolute;
    //         top: 50%;
    //         left: 50%;
    //         transform: translate(-50%, -50%);
    //         width: 30px;
    //         height: 30px;
    //         border-radius: 15px;
    //         overflow: hidden;
    //         i {
    //           font-size: 30px;
    //         }
    //       }
    //     }
    //     .msg {
    //       position: relative;
    //       width: 70%;
    //       box-sizing: border-box;
    //       padding-right: 30px;
    //       display: flex;
    //       flex-direction: column;
    //       justify-content: center;
    //       i {
    //         font-style: normal;
    //         margin-left: 10px;
    //       }
    //       .sociology {
    //         overflow: hidden;
    //         .name {
    //           float: left;
    //           font-size: 16px;
    //           font-weight: bold;
    //           color: white;
    //         }
    //         .number {
    //           float: right;
    //           font-size: 14px;
    //           color: white;
    //         }
    //       }
    //       .compareMsg {
    //         overflow: hidden;
    //         .compare {
    //           float: left;
    //           font-size: 12px;
    //           font-weight: bold;
    //           color: #71bdff;
    //           .percent {
    //             float: right;
    //             font-size: 12px;
    //             font-weight: bold;
    //           }
    //         }
    //       }
    //     }
    //   }
    //   .enterprise {
    //     position: absolute;
    //     top: 50%;
    //     height: 50%;
    //     width: 100%;
    //     box-sizing: border-box;
    //     display: flex;
    //     border-bottom: #ccc 1px;
    //     .icon {
    //       position: relative;

    //       width: 30%;
    //       height: 100%;
    //       .icon-warp {
    //         background: rgba(8, 143, 248, 0.3);
    //         display: inline-block;
    //         position: absolute;
    //         top: 50%;
    //         left: 50%;
    //         transform: translate(-50%, -50%);
    //         width: 30px;
    //         height: 30px;
    //         border-radius: 15px;
    //         overflow: hidden;
    //         i {
    //           font-size: 30px;
    //         }
    //       }
    //     }
    //     .msg {
    //       position: relative;
    //       width: 70%;
    //       box-sizing: border-box;
    //       padding-right: 30px;
    //       display: flex;
    //       flex-direction: column;
    //       justify-content: center;
    //       i {
    //         font-style: normal;
    //         margin-left: 10px;
    //       }
    //       .sociology {
    //         overflow: hidden;
    //         .name {
    //           float: left;
    //           font-size: 16px;
    //           font-weight: bold;
    //           color: white;
    //         }
    //         .number {
    //           float: right;
    //           font-size: 14px;
    //           color: white;
    //         }
    //       }
    //       .compareMsg {
    //         overflow: hidden;
    //         .compare {
    //           float: left;
    //           font-size: 12px;
    //           font-weight: bold;
    //           color: #71bdff;
    //           .percent {
    //             float: right;
    //             font-size: 12px;
    //             font-weight: bold;
    //           }
    //         }
    //       }
    //     }
    //   }
  }

  .mid-content-right {
    position: absolute;
    width: 40%;
    height: 100%;
    right: 0;

    .charts-title {
      position: absolute;
      color: white;
      height: 16px;
      font-size: 16px;
      line-height: 16px;
      text-shadow: white 0 0 5px;
      top: -10px;
      left: 5px;
    }

    .store {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 50%;
      left: 50%;
      margin-left: 10px;
      transform: translate(-50%, -50%);
      // background: pink;
    }
  }

  .top-left-title {
    position: absolute;
    top: -4px;
    left: 0;
    width: 5%;
    height: 12px;
    border-left: 4px #3083f2 solid;
  }

  .top-mid-title {
    position: absolute;
    z-index: 5;
    top: -8px;
    left: 0;
    width: 5%;
    height: 20px;
    border-left: 2px #3083f2 solid;
  }

  .mid-left-title {
    position: absolute;
    top: 60%;
    left: 0;
    width: 5%;
    height: 20px;
    transform: translateY(-50%);
    border-left: 2px #3083f2 solid;
  }

  .mid-mid-title {
    position: absolute;
    top: 0%;
    left: 50%;
    width: 5%;
    height: 20px;
    transform: translateY(-50%);
    border-left: 2px #3083f2 solid;
  }

  .top-left {
    position: absolute;
    top: 0;
    left: 0;
    width: 5px;
    height: 5px;
    border-top: 1px #3083f2 solid;
    border-left: 1px #3083f2 solid;
  }

  .top-right {
    position: absolute;
    top: 0;
    right: 0;
    width: 5px;
    height: 5px;
    border-top: 1px #3083f2 solid;
    border-right: 1px #3083f2 solid;
  }

  .bottom-left {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 5px;
    height: 5px;
    border-bottom: 1px #3083f2 solid;
    border-left: 1px #3083f2 solid;
  }

  .bottom-right {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 5px;
    height: 5px;
    border-bottom: 1px #3083f2 solid;
    border-right: 1px #3083f2 solid;
  }

</style>
<style scoped>
  .borderRing {
    position: absolute;
    transform: translate(-50%, -50%);
    left: 40%;
    top: 52%;
    width: 45%;
    padding-bottom: 45%;
    height: 0;
    border-radius: 50%;
    border: rgba(113, 189, 255, 0.5) 1px solid;
    z-index: 300;
  }

  .right-charts-title-top {
    height: 70%;
    width: 100%;
  }

  ::v-deep .el-table__header-wrapper {
    background: linear-gradient(to right, rgba(19, 121, 200, 0.01), rgba(19, 121, 200, 0.05), rgba(19, 121, 200, 0.15), rgba(19, 121, 200, 0.20), rgba(19, 121, 200, 0.25), rgba(19, 121, 200, 0.35), rgba(19, 121, 200, 0.45), rgba(19, 121, 200, 0.55), rgba(19, 121, 200, 0.45), rgba(19, 121, 200, 0.35), rgba(19, 121, 200, 0.25), rgba(19, 121, 200, 0.15), rgba(19, 121, 200, 0.05), rgba(19, 121, 200, 0.01)) !important;
    width: 100%;
    border-top: 1.5px solid #ddd;
    /* border-bottom: 1.5px solid #ddd; */
    border-image: linear-gradient(to right, rgba(92, 255, 249, 0.01), rgba(92, 255, 249, 0.2), rgba(92, 255, 249, 0.3), rgba(92, 255, 249, 0.4), rgba(92, 255, 249, 0.5), rgba(92, 255, 249, 0.6), rgba(92, 255, 249, 0.7), rgba(92, 255, 249, 0.6), rgba(92, 255, 249, 0.5), rgba(92, 255, 249, 0.4), rgba(92, 255, 249, 0.3), rgba(92, 255, 249, 0.2), rgba(92, 255, 249, 0.1), rgba(92, 255, 249, 0.01)) 20 20;
  }

  ::v-deep .el-table[data-v-2faa2710] th.is-leaf {
    border: rgba(0, 0, 0, 0);
  }

  ::v-depp .atooltip {
    background: rgba(36, 113, 216, 1) !important;
  }
</style>
