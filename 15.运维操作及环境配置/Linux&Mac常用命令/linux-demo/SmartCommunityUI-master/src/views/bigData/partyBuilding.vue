<template>
	<el-row class="tabs-content w100">
		<!-- 左边 -->
		<div class="left-box">
			<!-- 党支部分布情况 -->
			<div class="spread-Box">
				<h2 class="box-title">党支部分布情况</h2>
				<div class="Bigboxstyleover" style="display: flex; margin-top: 26px;">
					<div class="dangyuan-styleBOx" v-for="(item,index) in partyOrganizationAnalysis">
						<div class="shequ-name">{{item.communityName}}</div>
						<div class="shequ-png">
							<!-- 盒子里面的小点 -->
							<div class="png-number">
								<div v-for="nnum in 1" ref='xiaodian' class="xiaodian">
								</div>
							</div>
							<div class="ppoLIst Unidream">
								{{item.count}}
							</div>
							<!-- 盒子里面数字 -->
						</div>
					</div><!-- <img src="./icons/leng%20(10).png"> -->
				</div>
			</div>

			<!-- 党员分布情况-->
			<div class="Distribution">
				<h2 class="box-title">党员分布情况</h2>
				<!-- 党员分布 象形图 -->
				<div class="Distributionstyle">
					<div ref='Distribution'></div>
				</div>
			</div>

			<!-- 党员关系转移情况  -->
			<div class="transfer-style">
				<h2 class="box-title">党员关系转移情况</h2>
				<div class="transfer-box">
					<div ref='transfer'></div>
				</div>
			</div>
		</div>

		<div class="middle ">
			<!-- 地图 -->
			<div class="middle-top">
				<Map v-if="tab == 3" @change="handleChange" />
			</div>
			<!-- 三会一课分布 -->
			<div class="meeting-style">
				<h2 class="box-title" style="margin-left: 20px;">三会一课分布</h2>
				<div class="meeting-box">
					<div ref='meetingCharts'></div>
				</div>
			</div>

		</div>

		<div class="right-box">
			<!-- 党员概况 -->
			<div class="survey-style">
				<h2 class="box-title">党员概况</h2>
				<div class="taskBox-onep">
					<div id="container-one" class="conNer_one"></div>
					<div class="bacgrround_imgstyle"></div>
				</div>
			</div>

			<!-- 学习情况统计 -->
			<div class="study-style">
				<h2 class="box-title">学习情况统计</h2>
				<div class="study-box">
					<!-- 左边部分 -->
					<div class="Water-chart">
						<div ref='Waterchart' style=""></div>
					</div>
					<!--右边部分-->
					<div class="Water-title">
						<div style="margin-top: 8px;">
							<h4 style="color: #fff;margin-top: -8px;">学习文章</h4>
							<div class="text-number">{{studeyLIStdata.articlesCount}} <span style="font-size: 14px; color: #fff;">篇</span>
							</div>
						</div>
						<div style="margin-top: 25px;">
							<h4 style="color: #fff;">学习完成度</h4>
							<div class="text-number">{{studeyLIStdata.complete}}%</div>
						</div>
					</div>
				</div>
			</div>

			<!-- 党群活动情况 -->
			<div class="Activities">
				<h2 class="box-title">党群活动情况</h2>
				<div class="Activities-Charts">
					<div ref='Activities'></div>
				</div>
			</div>

		</div>
	</el-row>
</template>

<script>
	import Highcharts from 'highcharts/highstock';
	import HighchartsMore from 'highcharts/highcharts-more';
	import HighchartsDrilldown from 'highcharts/modules/drilldown';
	import Highcharts3D from 'highcharts/highcharts-3d';
	import Map from "./work3D";

	import {
		partyBuilding
	} from "@/api/utils";

	export default {
		components: {
			Map
		},
		props: ["tab"],
		data() {
			return {
				dangyuanfenbudata: [{
						name: '清水沟社区',
						number: 1,
					},
					{
						name: '台柳路社区',
						number: 1,
					},
					{
						name: '河西社区',
						number: 1,
					},
					{
						name: '河崖社区',
						number: 1,
					},
				],
				zuzhi: {
					xAxis: ["清水沟社区", "台柳路社区", "河西社区", "河崖社区"], // 任务 类型
					data: [
						["清水沟社区", 24, 15, 25],
						["台柳路社区", 26, 31, 15],
						["河西社区", 27, 18, 13],
						["河崖社区", 26, 14, 27],
						//   ["台柳路西社区党委", 4, 8, 9, 16],
						//   ["河崖东社区党委", 10, 12, 6, 16]
					] // 对应数据
				},
				partynumber: {
					xAxis: ["清水沟社区", "台柳路社区", "河西社区", "河崖社区"], // 活动情况
					data: [18, 20, 12, 11] //
				},
				partyMassesAnalysis: {
					xAxis: ["河崖社区", "河西社区", "台柳路社区", "清水沟社区"], // 任务 类型
					data: [32, 41, 27, 48] // 对应数据
				},
				// 学习
				learnAnalysis: {
					articlesCount: 54,
					complete: 73
				},
				// 党员
				partyMemberAgeAnalysis: {
					totalPartyMember: 313,
					year35To45Total: 147,
					year46To54Total: 37,
					year55To59Total: 23,
					yearover60Total: 20,
					yearunder35Total: 80
				},
				communityId: '',
				partyOrganizationAnalysis: [],
				partyMemberDataPost: [],
				MunberChangeList: [],
				gaikuangLIstL: [],
				studeyLIStdata: [],
				SanHUidatalist: [],
				patyNUmberLIStArr: [],
				partyMemberDistributeAnalysis: [{
						partyCommitteeName: "清水沟社区党委",
						count: 64
					},
					{
						partyCommitteeName: "台柳路社区党委",
						count: 72
					},
					{
						partyCommitteeName: "河西社区党委",
						count: 58
					},
					{
						partyCommitteeName: "河崖社区党委",
						count: 67
					},
					// {
					//   partyCommitteeName: "台柳路西社区党委",
					//   count: 5
					// },
					// {
					//   partyCommitteeName: "河崖东社区党委",
					//   count: 38
					// }
				],
				initPeopleObj: {
					xAxis: ["4月", "5月", "6月", "7月", "8月", "9月"],
					data: [2, 6, 12, 19, 14, 8],
					datatwo: [4, 7, 7, 19, 15, 21, ]
				},
				dangyuannianji: ["60岁以上", "35岁以下", "36至45岁", "46至54岁", "55至59岁"],
				sanhuiyike: [
					["清水沟社区党委", 23, 15, 25, 30],
					["台柳路社区党委", 6, 10, 15, 30],
					["河西社区党委", 18, 13, 12, 33],
					["河崖社区党委", 22, 26, 27, 25],
					//   ["台柳路西社区党委", 4, 8, 9, 16],
					//   ["河崖东社区党委", 10, 12, 6, 16]
				]
			};
		},

		computed: {
			dangyuanfenbuMax() {
				let max = this.partyMemberDistributeAnalysis[0].count;
				this.partyMemberDistributeAnalysis.map(i => {
					if (i.count > max) {
						max = i.count;
					}
				});
				const list = this.partyMemberDistributeAnalysis.map(i => {
					return {
						...i,
						reta: `${100 - ((i.count * 100) / max).toFixed(2)}%`
					};
				});
				return list;
			}
		},
		watch: {
			tab(n) {
				if (n == 3) {
					this.initZuZhi();
					this.initPeople();
					this.initPeopleRing();

					this.initDangqun();
					this.initxuexi();
					this.initSanHuiYike();

					// console.log(this.dangyuanfenbuMax);

					// 初始化党员分布
					// this.dangyuanfenbuMax()
				}
			}
		},
		created() {
			// 获取数据
			this.handleGetData();
		},
		filters: {
			toNUmfled(str) {
				return (str * 100.00).toFixed(2)
			}
		},
		mounted() {
			// this.diandian()
			// this.dangyuangaikuang();
			// this.Waterchart();
			// this.Distribution();
			// this.transfer();
			// this.meetingCharts();
			// this.Activities();

		},

		methods: {
			// 地图改变 ，后函数
			handleChange(communityId) {
				// console.log(communityId);
				this.communityId = communityId;
				this.getData();
			},

			// 获取页面数据
			async handleGetData() {
				const {
					data
				} = await partyBuilding({
					communityId: ''
				});

				console.log(111111111111)
				this.partyOrganizationAnalysis = data.partyOrganizationAnalysis
				this.partyMemberDataPost = data.partyMemberDistributeAnalysis
				this.MunberChangeList = data.partyInOutAnalysis
				this.SanHUidatalist = data.threeLessonsAnalysis
				// this.gaikuangLIstL = data.partyMemberAgeAnalysis
				this.gaikuangLIstL = [
					{
						y: this.partyMemberAgeAnalysis.yearover60Total,
						h:6,
						name: "60岁以上"
					},

					{
						y: this.partyMemberAgeAnalysis.year46To54Total,
						h: 12,
						name: "46至54岁"
					},
					{
						y: this.partyMemberAgeAnalysis.yearunder35Total,
						h:20,
						name: "35岁以下"
					},

                    {
						y: this.partyMemberAgeAnalysis.year55To59Total,
						h:30,
						name: "55至59岁"
					},

					{
						y: this.partyMemberAgeAnalysis.year35To45Total,
						h: 40,
						name: "36至45岁"
					},
				];
				this.studeyLIStdata = data.learnAnalysis
				this.patyNUmberLIStArr = data.partyMassesAnalysis
				this.Distribution();
				this.transfer(); //党员转移
				this.meetingCharts() //三会分布
				this.dangyuangaikuang(); //党员概况
				this.Waterchart();
				this.Activities()
			},
			//水波图
			Waterchart() {
				const mychart = this.$echarts.init(this.$refs.Waterchart);
				mychart.setOption({
					title: {},
					series: [{
						name: '水球图',
						type: 'liquidFill',
						radius: '100%',
						center: ['50%', '50%'],
						textStyle: {
							fontSize: 16,
							color: 'RGBA(252, 176, 26, 1)',
							fontWeight: 'normal'
						},
						waveAnimation: 10, // 动画时长
						amplitude: 10, // 振幅
						data: [this.studeyLIStdata.complete / 100],
						color: 'rgba(68, 197, 253,1)',
						label: {
							normal: {
								color: '#44C5FD',
								textStyle: {
									fontSize: 16,
									color: 'RGBA(252, 176, 26, 1)',
									fontWeight: 'normal'
								}
							}
						},
						outline: {
							show: true,
							borderDistance: 5,
							itemStyle: {
								borderColor: 'rgba(68, 197, 253,1)',
								borderWidth: 2
							}
						},
						backgroundStyle: {
							color: 'rgba(68, 197, 253,.3)'
						}
					}]
				})
			},
			//党员概况11
			dangyuangaikuang() {

				var each = Highcharts.each,
					round = Math.round,
					cos = Math.cos,
					sin = Math.sin,
					deg2rad = Math.deg2rad;
				Highcharts.wrap(Highcharts.seriesTypes.pie.prototype, 'translate', function(proceed) {
					proceed.apply(this, [].slice.call(arguments, 1));
					// Do not do this if the chart is not 3D
					if (!this.chart.is3d()) {
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
						z = seriesOptions.stacking ? (seriesOptions.stack || 0) * depth : series._i * depth;
					z += depth / 2;
					if (seriesOptions.grouping !== false) {
						z = 0;
					}
					each(series.data, function(point) {
						var shapeArgs = point.shapeArgs,
							angle;
						point.shapeType = 'arc3d';
						var ran = point.options.h;
						shapeArgs.z = z;
						shapeArgs.depth = depth * 0.75 + ran;
						shapeArgs.alpha = alpha;
						shapeArgs.beta = beta;
						shapeArgs.center = series.center;
						shapeArgs.ran = ran;
						angle = (shapeArgs.end + shapeArgs.start) / 2;
						point.slicedTranslation = {
							translateX: round(cos(angle) * seriesOptions.slicedOffset * cos(alpha * deg2rad)),
							translateY: round(sin(angle) * seriesOptions.slicedOffset * cos(alpha * deg2rad))
						};
					});
				});
				(function(H) {
					H.wrap(Highcharts.SVGRenderer.prototype, 'arc3dPath', function(proceed) {
						// Run original proceed method
						var ret = proceed.apply(this, [].slice.call(arguments, 1));
						ret.zTop = (ret.zOut + 0.5) / 100;
						return ret;
					});
				}(Highcharts));
				Highcharts.chart('container-one', {
					chart: {
						marginRight: 120,
						mmarginTOp: -10,
						backgroundColor: 'rgba(0,0,0,0)',
						type: 'pie',
						animation: false,
						events: {
							load: function() {
								var each = Highcharts.each,
									points = this.series[0].points;
								each(points, function(p, i) {
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
					colors: ['rgba(242, 146, 78, 1)', 'rgba(246, 191, 83, 1)', '#94D2F3', '#1B55A5', '#279DAA'],
					tooltip: {
						trigger: "item",
						valueSuffix: '人', //数据后面
						backgroundColor: '#1045A4',
						borderColor: 'RGBA(16, 69, 164, 0)',
						style: {
							color: "#fff",
							fontSize: "12px",
							fontWeight: "blod",
							fontFamily: "Courir new"
						}

					},
					legend: {
						align: 'right', //水平方向位置
						layout: 'vertical',
						verticalAlign: 'middle', //垂直方向位置
						itemMarginTop: 10,
						x: -20,
						itemStyle: {
							color: "#fff"
						},

					},
					credits: {
						enabled: false,
					}, //去水印
					title: {
						text: ''
					}, //不显示
					plotOptions: {
						pie: {
							innerSize: 100,
							allowPointSelect: false,
							cursor: 'pointer',
							depth: 40,
							dataLabels: {
								enabled: false
							},
							showInLegend: true,
						}
					},
					series: [{
						type: 'pie',
						name: '',
						data: this.gaikuangLIstL
					}]
				});

			},
			//党员活动情况
			Activities() {
				const that = this;
				const mychart = this.$echarts.init(this.$refs.Activities);
				mychart.setOption({
					tooltip: {
						trigger: 'axis',
						formatter: '{c}人',
						axisPointer: { // 坐标轴指示器，坐标轴触发有效
							type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
						},
						grid: {
							right: '20',
							left: "center",
							// height: "56%",
							// top:'10%',
						},
					},
					tooltip: {
						trigger: 'axis',
						formatter: '{a}<br/>{b}:{c}人',
						backgroundColor: 'RGBA(16, 69, 164, 1)',
						axisPointer: { // 坐标轴指示器，坐标轴触发有效
							type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
						},
						textStyle: {
							color: "#fff",
							fontSize: 12
						}
					},
					legend: {
						show: true,
						right: 30,
						top: 10,
						data: [{
							name: '活动次数',
							textStyle: {
								color: 'rgba(0, 161, 255, 1)'
							}
						}, ],

					},
					color: [
						"#088FF8",
						"#FFCC00",
						"#7A7EFF",
						"#3ACE83",
						"#EE5C5C",
						'rgba(0, 161, 255, 1)'
					].reverse(),
					xAxis: {
						type: "category",
						data: this.patyNUmberLIStArr.map(i => {
							return i.communityName
						}),
						axisLabel: {
							clickable: true,
							interval: 0,
							color: "rgba(1, 223, 244, 1)",
							rotate: 30, //坐标显示倾斜°
						},
						axisLine: {
							lineStyle: {
								color: "rgba(101, 198, 231, 0.3)"
							}
						},
						axisTick: {
							show: false,
							alignWithLabel: true
						},

					},
					yAxis: {
						type: "value",
						show: true,
						axisLabel: {
							clickable: true,
							formatter: "{value} 次",
							interval: 0,
							color: "rgba(1, 223, 244, 1)",
							rotate: 0
						},
						splitLine: {
							show: true, //分割线
							lineStyle: {
								color: "rgba(101, 198, 231, 0.3)"
							},
						},
						axisLine: {
							lineStyle: {
								color: "rgba(101, 198, 231, 0.3)"
							}
						},
						axisTick: {
							show: false
						},

					},
					series: [{
						name: '活动次数',
						data: this.patyNUmberLIStArr.map(i => {
							return i.count
						}),
						type: "line",
						symbolSize: 10,
						smooth: false,
						itemStyle: {
							normal: {
								lineStyle: {
									// 线的颜色
									color: "rgba(28, 168, 221, 1)",
									width: 2.5
								},
								borderColor: 'rgba(28, 168, 221, 1)', // 拐点边框颜色
								// 以及在折线图每个日期点顶端显示数字
								label: {
									show: false,
									position: "top",
									textStyle: {
										color: "white"
									}
								}
							}
						},
					}]
				});

			},
			//三会一课
			meetingCharts() {
				const that = this;
				const mychart = this.$echarts.init(this.$refs.meetingCharts);
				mychart.setOption({
					color: ["#5F45FF", "#02CDFF", "#0090FF", "RGBA(43, 156, 146, 1)"],
					legend: {
						orient: "horizontal",
						top: "4.5%",
						right: "8%",
						itemWidth: 18,
						itemHeight: 9,
						textStyle: {
							color: "rgba(159, 206, 255, 1)",
						},
						data: [{
								name: "党小组会", // 图例文字内容
								// icon: "roundRect" // 图例图形的形状，有多个可选值：'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'，
								//也可引用自定义的图片
								icon: "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAQEAYAAAAnkKEaAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAAASAAAAEgARslrPgAAAeVJREFUWMPtlk9I02EYxz/Pu/Aw0LpItk6F0KE0QjzpTqYwO3ToENEfRjRIdIM6rPuUQAV3EBRDqhlBYFQHD5EJ/ghyByFjp4EQdBCFggbbwf3Y7+k0D0Ko71g/RD/Hl5fneT/f533hFXYRfdbzQr3OTo1JGzI4qBVZQMNhOaNJpKWFfrkOwSD1JsQ2WirxmiCysaFzjKLLy6akj2Fy8uW1z0ticrla28iOeP/Vs6rxuHbINqTT/OQKBAJ1Fz0o69wB19VmSUAsNvfhU0Ekk7EOYGfiKbmMZLP0yBMwxm/PPQnrLJTLgfyJG9De/nz846pIPn/QMkZXzU1kaOjQiFf5Ig+goaEyVjkHAwO2ZYxOMYZ2d/vtY02U92B/fiN3+YOEQn57WHOLCtif//Bc+X+gbQzX8nSNpuiDrS2/Raz5oQ9hc9M6AGnVdchm/faw5pJMwcqKdQBeUlIwPU2UXlD122ffLOkoeJ6cJAczM9YBvBpf/CXiOPpV78PIiN9ee1Id1Kx0QDKZkcV5kbU123Kye+Heu77zqpGIPNJvkEjQrN+hq4uLMgyNjf/bV9OcgkJBnnIaHMcT3sDERHVwtdaX/W68HY+0qtfUpL/NBaT+X2S3XFxAXXf+rSNiisV69zvmmCPKX4mHp5g/BSUiAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIwLTExLTAzVDIxOjQyOjU3KzA4OjAwV/bPjAAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMC0xMS0wM1QyMTo0Mjo1NyswODowMCardzAAAABFdEVYdHN2ZzpiYXNlLXVyaQBmaWxlOi8vL2hvbWUvYWRtaW4vaWNvbi1mb250L3RtcC9pY29uX3YzeHV5YTVndS90dWxpLnN2Z39aqnAAAAAASUVORK5CYII="
							}, {
								name: "支部委员会", // 图例文字内容
								// icon: "roundRect" // 图例图形的形状，有多个可选值：'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'，
								//也可引用自定义的图片
								icon: "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAQEAYAAAAnkKEaAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAAASAAAAEgARslrPgAAAcNJREFUWMPtlj9IW1EUh79zn4aqKKGT1UVxa8GiJFscXB26dhdSECPiohCoQ7GdlCBBQjrVToJCqZTiIigUEgX/IQ5SLJSC6ChqwBe8p4NKhyLqfaQPqd90p3PO9zv3whX+YuOz2nhc8voF6e8nwyra1cUvnUEaGylRgtpaKk0dO+jpKS38QPb3eS0f0KUlfWlnIZuFWFzM9nbQNvLnuD6nOjAgVYxDJsO5ToHnVVz0rlRTDeWy+upDMgmxmMj0dIAALjfu2a9IsYjlFRgTtueNRNgC39czuwft7RB/K7K7e9cyRnI2haRS90b8Cp/nEIlIwVuEvj7XMoZJeYwmEmH7OJPWKXCf3/CTKNLUFLaHM99pBvf578+Vvw4rg0GerqFZR+DwMGwPZ1q1Ew4O3APoBSgWw/ZwZoQ8FArOAWjavINcDmENVMP2uf3kvAdr9YXZg3zevQwd30SWlynJUxgbC9vrRi4XpeeahOFh6BCRzc0AAVygjzoTIqOjqvIEenpIsgMLC9RLGo6PQxOOEoWjI4bIwvy8WvMRursvfoATE8HzvDUrbWobGqDmE/IvvsjeG7RchmdzYk5OKt/vgQf+S34DCH2UKHGiUBEAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjAtMTEtMDNUMjI6MDY6MzMrMDg6MDBhLl0uAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIwLTExLTAzVDIyOjA2OjMzKzA4OjAwEHPlkgAAAEZ0RVh0c3ZnOmJhc2UtdXJpAGZpbGU6Ly8vaG9tZS9hZG1pbi9pY29uLWZvbnQvdG1wL2ljb25fejRxMnZvcnlheC90dWxpLnN2ZwXbkIMAAAAASUVORK5CYII="
							},
							{
								name: "党支部大会",
								icon: "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAQEAYAAAAnkKEaAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAAASAAAAEgARslrPgAAAY5JREFUWMPt1r9KXEEUgPHfuQYhgqYVU+QJYgLBSreyiY1NHiCVhaiL2cIitSRpshtisbEU21Q+QHCrvYEUgpVNIEWMVkHQIm7YSZN/IAF3L3qR+FXDMJxzvnNmYMIZXn1J3YkJ0qhYWMCmVKlgVYyOYp6hIRfPXenkBM/F/j5pS9rexjRra9TyyHZ3iyaJP8vGdEpLS/hGo4FHDAxcgmivfKDTIa0wN0ftXsTGRoEG/J54W+Q5PpFlZVueg8ecnhJPGR9n+U3E3l6vQTLSA7G4eIXEf7HB4CCpyfx8v0EyvJCmpsq2KcAt+q8/I6pibKxsiwI8o//6r9KV/xcfizzdjPSVw8OyLQrwkoODAg1QIc/LtuifuE27XaAB6TvNJuqkVLZOD9yh2yV9Zn29QANqeUSrhU1WV8u2Ogc/B5Xes7LCk4jY2ek3WJzdarRTmpkhZqlWSTmTk9hieLgE4WWOjnCfVot0k3r9r8EVIs5/9PXD1B0Z4casuIwvcnondTosvI3s+Pji811zzX/JD052eRgxyPVKAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIwLTExLTAzVDIyOjA4OjMzKzA4OjAwf+dtnQAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMC0xMS0wM1QyMjowODozMyswODowMA661SEAAABIdEVYdHN2ZzpiYXNlLXVyaQBmaWxlOi8vL2hvbWUvYWRtaW4vaWNvbi1mb250L3RtcC9pY29uXzB2ZmZ1cWNsbDdlay90dWxpLnN2Z//09LMAAAAASUVORK5CYII="
							},
							{
								name: '党课',
								icon: "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAQEAYAAAAnkKEaAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAAASAAAAEgARslrPgAAAg1JREFUWMPtlk9I02EYx7/P+0slcXYSxAKFmnRpRKQJU/vHqmWUERjSxQ5Dh7qL6EnZQaEOw4G/g3kRhTpIHcSldIqtQmcYCNKfOWUnZV4C0a3YT9/H0zwIob5j/pD8nF5eXp73/Xyf94WXsIfy1ywnpioq5EVupu7WVnLwPTTW1MAHOy4VF+MlimDk5yPLsI44JhMJiiKIW6urzDSO5WBQu0FjWq+uR2wk7icXFjLdh9IDq7795v3P9nZoeMx//H74kYcVTcu26KGD+YAEvIZBS3hGjS5X9K4WeNA5OqocQLrjPCdTwhUOYxI5/EoIs0X3ZRkbuJZKiSZxRtbbbJFhokfTkchhywj5m92UbGs7NuJpzsOC2dxcucFV4onbrVpGkJfvIFZdbbaPMvXswIr6+QVqcR2fSkrM9lCFi+BEUP38x+fK/wP6ihyMqT9dwbcxi7K1NbNFVOEWfMT3eFw5AIA+43k4bLaIKtREX3BqZiaTAF7w1uAgrNhGgNlsoQNTB4NapMRpCoiRoSHlAJY8RA8rQyGUUQHm+vrM9tqXdKOa8Q1Xu7qib4nq3s3Pq5ajvRPl+lbPxC+nk6+Is1Tp8eAmOzFtt6MU5xCzWI5c+DJi8K6vw0HjsIZC/Jc6uKO/f7dxGUIHXXhhgOXUYmFhygeSi9n/Ihf4wMmEYfxoINHwdHMz2/udcMJ/yg4jpbu9dKaA/QAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMC0xMS0wM1QyMjoxMDo0OSswODowMAMLpP4AAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjAtMTEtMDNUMjI6MTA6NDkrMDg6MDByVhxCAAAAR3RFWHRzdmc6YmFzZS11cmkAZmlsZTovLy9ob21lL2FkbWluL2ljb24tZm9udC90bXAvaWNvbl9lczZldWdpODNwYi90dWxpLnN2Z2m+74cAAAAASUVORK5CYII="
							}
						]
					},
					grid: {
						left: "13.5%"
					},
					tooltip: {
						trigger: "item",
						backgroundColor: "RGBA(16, 69, 164, 1)",
						formatter: function(params) {
							let res = "";
							let titmsg='<span style ="font-size:12px;color:#01DFF4;">' + params.name  + '</span>';
							let dotHtmlA = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#5F45FF"></span>';
							let dotHtmlB = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#02CDFF"></span>';
							let dotHtmC = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#0090FF"></span>';
							let dotHtmD = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:RGBA(43, 156, 146, 1)"></span>';
							res = titmsg + "<br/>" + "<div style='width:100%;height:2px;background:#010D34;margin-left:0'></div>"+ dotHtmlA +'党小组会:'+ params.value[1] + "次"+ "<br/>"
							+ dotHtmlB+'支部委员会:'+ params.value[2] + "次" + "<br/>" + dotHtmC+'党支部大会:'+ params.value[3] + "次" + "<br/>" + dotHtmD+'党课:'+ params.value[4] + "次";
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
					dataset: {
						source: [
							["product", "党小组会", "支部委员会", "党支部大会", "党课"]
						].concat(
							(i => {
								// console.log(that);
								return that.sanhuiyike;
							})()
						)
					},
					xAxis: {
						type: "category",
						spiltLine: {
							show: true //想要不显示网格线，改为false
						},
						axisLine: {
							show: true,
							lineStyle: {
								color: "rgba(101, 198, 231, 0.3)"
							}
						},
						axisLabel: {
							clickable: true,
							interval: 0,
							color: "rgba(1, 223, 244, 1)",
							rotate: 0
						},
						axisTick: {
							show: false
						}
					},
					yAxis: {
						// type: "value",
						axisLabel: {
							clickable: true,
							interval: 0,
							formatter: "{value} 次",
							color: "rgba(1, 223, 244, 1)",
							rotate: 0
						},
						splitLine: {
							show: true,
							lineStyle: {
								color: "rgba(101, 198, 231, 0.2)"
							}
						},
						axisLine: {
							show: true,
							lineStyle: {
								color: "rgba(101, 198, 231, 0.3)"
							}
						},
						axisTick: {
							show: false
						}
					},
					// Declare several bar series, each will be mapped
					// to a column of dataset.source by default.
					series: [{
							type: "bar",
							barWidth: 13.5,
							name: '党小组会',
							itemStyle: {
								barBorderRadius: [20, 20, 20, 20]
							}
						},
						{
							type: "bar",
							barWidth: 13.5,
							name: '支部委员会',
							itemStyle: {
								barBorderRadius: [20, 20, 20, 20]
							}
						},
						{
							type: "bar",
							barWidth: 13.5,
							name: '党支部大会',
							itemStyle: {
								barBorderRadius: [20, 20, 20, 20]
							}
						},
						{
							type: "bar",
							barWidth: 13.5,
							barGap: '45%',
							name: '党课',
							itemStyle: {
								barBorderRadius: [20, 20, 20, 20]
							}
						},
					]
				});

			},

			//党员转移情况
			transfer() {
				const that = this;
				const mychart = this.$echarts.init(this.$refs.transfer);
				mychart.setOption({
					tooltip: {
						trigger: 'axis',
						backgroundColor: 'RGBA(16, 69, 164, 1)',
						formatter: '{a}<br/>{b}:{c}人',
						axisPointer: { // 坐标轴指示器，坐标轴触发有效
							type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
						},
						textStyle: {
							color: "#fff",
							fontSize: 12
						}
					},

					legend: {
						textStyle: {

						},
						show: true,
						right: 20,
						data: [{
								name: '转出',
								textStyle: {
									color: 'rgba(43, 128, 255, 1)'
								}
							},
							{
								name: '转入',
								textStyle: {
									color: 'rgba(240, 132, 59, 1)'
								}
							},

						],
					},
					color: [
						"rgba(240, 132, 59, 1)",
						"rgba(43, 128, 255, 1)",
					].reverse(),
					xAxis: {
						type: "category",
						data: this.MunberChangeList.map(i => {
							return i.date
						}),
						axisLabel: {
							clickable: true,
							interval: 0,
							margin: 12,
							color: "rgba(1, 223, 244, 1)",
							rotate: 0
						},
						axisLine: {
							lineStyle: {
								color: "rgba(101, 198, 231, 0.3)"
							}
						},
						axisTick: {
							show: true,
							alignWithLabel: true,
							lineStyle: {
								color: "rgba(110, 168, 194, 1)",
								width: 2
							}
						},

					},
					yAxis: {
						type: "value",
						show: true,
						axisLabel: {
							clickable: true,
							interval: 0,
							color: "rgba(1, 223, 244, 1)",
							rotate: 0,
							formatter: "{value} 人"
						},
						splitLine: {
							show: true, //分割线
							lineStyle: {
								color: "rgba(101, 198, 231, 0.3)"
							},
						},
						axisLine: {
							lineStyle: {
								color: "rgba(101, 198, 231, 0.3)"
							}
						},
						axisTick: {
							show: false
						},

					},
					series: [{
							name: '转出',
							data: this.MunberChangeList.map(i => {
								return i.partyInNumber
							}),
							type: "line",
							smooth: false,
							symbol: "circle",
							symbolSize: 7,
							itemStyle: {
								normal: {
									areaStyle: {
										type: "default",
										// 渐变色实现
										color: new that.$echarts.graphic.LinearGradient(
											0,
											0,
											0,
											1, // 变化度
											// 三种由深及浅的颜色
											[{
													offset: 0,
													color: "rgba(43, 128, 255, 0.8)"
												},
												{
													offset: 0.5,
													color: "rgba(43, 128, 255, 0.4)"
												},
												{
													offset: 1,
													color: "rgba(0,0,0,0)"
												}
											]
										)
									},
									lineStyle: {
										// 线的颜色
										color: "#2B80FFrgba(43, 128, 255, 1)"
									},
									// 以及在折线图每个日期点顶端显示数字
									// label: {
									// 	show: true,
									// 	position: "top",
									// 	textStyle: {
									// 		color: "white"
									// 	}
									// }
								}
							},
							areaStyle: {}
						},
						{
							name: '转入',
							data: this.MunberChangeList.map(i => {
								return i.partyOutNumber
							}),
							type: "line",
							smooth: false,
							symbol: "circle",
							symbolSize: 7,
							itemStyle: {
								normal: {
									areaStyle: {
										type: "default",
										// 渐变色实现
										color: new that.$echarts.graphic.LinearGradient(
											0,
											0,
											0,
											1, // 变化度
											// 三种由深及浅的颜色
											[{
													offset: 0,
													color: "rgba(240, 132, 60, 1)"
												},
												{
													offset: 0.5,
													color: "rgba(240, 132, 60, .5)"
												},
												{
													offset: 1,
													color: "rgba(0,0,0,0)"
												}
											]
										)
									},
									lineStyle: {
										// 线的颜色
										color: "rgba(240, 132, 60, 1)"
									},
									// 以及在折线图每个日期点顶端显示数字
									// label: {
									// 	show: true,
									// 	position: "top",
									// 	textStyle: {
									// 		color: "white"
									// 	}
									// }
								}
							},
							areaStyle: {}
						},
					]
				});

			},
			//党员分布
			Distribution() {
				const mychart = this.$echarts.init(this.$refs.Distribution);
				let maxLIst=this.partyMemberDataPost.map(i => {
					return i.count
				});
				let  MaxArr=Math.max(...maxLIst)
				console.log(MaxArr)
				mychart.setOption({
					tooltip: {
						trigger: 'item',
						backgroundColor: 'RGBA(16, 69, 164, 1)',
						formatter: '{b}：{c}人',
						axisPointer: { // 坐标轴指示器，坐标轴触发有效
							type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
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
						axisTick: {
							show: false
						},
						axisLine: {
							show: false,
							lineStyle: {
								color: "#999"
							}
						},
						axisLabel: {
							interval: 0,
							show: false,
							margin: 10
						}
					},
					yAxis: {
						data: this.partyMemberDataPost.map(i => {
							return i.communityName
						}),
						axisTick: {
							show: false
						},
						axisLine: {
							show: false
						},

						axisLabel: {
							interval: 0,
							margin: 10,
							color: "#fff",
							fontSize: 16
						}
					},
					 dataZoom:[
						 {//gundongtiao
						    show: false,
						    orient: 'vertical',
						    start: 0,
						    end: 30,
							width:8,
							color:'rgb(185,253,244,0.3)',
						  },
						   {
						    type:'inside',
						    yAxisIndex:0,
						    zoomOnMouseWheel:false,  //滚轮是否触发缩放
						    moveOnMouseMove:true,  //鼠标滚轮触发滚动
						    moveOnMouseWheel:true
						            }
						  ],
					grid: {
						left: '23%',
						right: '10%',
						top: '10%'
					},
					series: [{
						// current data
						type: 'pictorialBar',
						stack: "1",
						symbol: "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAA2CAYAAADd0Vm+AAAEyklEQVRYha2US2xUVRyHj5qIlKml7bShnU6nD/qYTlso5VGQDjUQE1YaCMaEhY8oxhh14yvEgIkrRRYEw8Z4WZgYDZEF004f8547nWdp0IgmVF25IVKCC83cc8+5PxfDmZ65A7fltif5Fuc7c//fnGTmErKGVbuI/TULuFqzgNs1C/i7poBrjgIm1vLsqstxHS9uLhh4EFuu45V1DXcuorWmYMCKxhtw2Q7UFvDhlrwBKxx5fGY74CjgO0fegBW1eUzbv0EeX9fmDFiDK7YDdQUcfzpnwJI8TtoOfAo8vjVv/FKX43gwxi3bw8u3+Bn1W7OGWpflqCBn5J0LaFl3QKytWTxfn+Of1+f4Fw0FHN+QoY0ZeJsKGGlZhKfq7AZcTQWM1Bcw+OiDc3ihIWvcaMhwCBqzxo/OHF5vyOK1hiz/3nR2qzGzxn+1M4OzjWkOW2T4BcvhzRkcc6Y51kNzBm89NNCUNv5qmudYF2mDb1/Cpqrh2zLoaJ7n2Aha5uGvCrRkcGxbimEjaEnzU1WB1hT/oCXFsBG0pvjFqoArxX9oVRk2AleKpasDKv/VpTK4VIY2lRfbUvwfsV+VFL/jSvF/pf1tAI+Vhw//hC1ulf/XlmRoSzK4VTbtTvFLYr86/Iw7yS/LrjsPdznQnoLPnWQQeFR+3p3kp2VnRbvKT3lU/naFS+JwOdCRZC+1JxgEngQ72Z7k78jOkiR7oyOJQxVO5R+VA54kP+cpDYYnwdCtYrRD5e/JzooOlb/bPY/mCpfkl1dukGBXO+I6BPvT2NyZ4J/IzpIEP0sIIZ1xVhSuM6Fny4HOBPuzM66jBLtDCCFdSf38irOmO6F/WQrovwnXFWdF3004SF8KrV0xHRJZQgjpirNLJv9QuhPsIiGEdMfZVdn3qthB+uL6s9ujOgQ9UXaJEEJ6ouwb2Vshntke4x/LvjfGXiY9Mf5+T1RHmRh/kxBCemPscoW35P6XSrBjsu+L6xdIX5QpvREdAm9MP0IIqfJW9N0P+GLYWXEWZZOkP6Iv9kV0lGB8SEU9IYT0R5my4ldhJeDojzJdmvcH8YZ1rT9M0R+m8Ib1ZfHL6o9QRfjV8EZKAUII8Ubo7/IZ8YX1M94whTdMMRDWT4sPDkSoIvxq+KTAQIS9Wj6Lsq9KL7uwPj4c1sflt+tgiCoDIYoKwvodX0hfNntfaCVACCHDUbpvMKRPEKs1GKKKL0QhMxpC3XAMbWY/aAqsaQ2FqDI4RyFDCCEngCfM3nZgaI5C5ugSNo3G4DT7YTuBHXNUGZ6lkBEBs985ayOwc44qO2YpZETA7G0Fds1RZWRGg4wImP3ILLUX2DWjQUYEzH7UTmD3DFVGpzXIiIDZj87YCOyZocruaQ0yR5ewaSIGp9nvsRUIUmVPUIPM0WApYPZ77QT2BamyN6hBRgTM3lZgLEiVfVMaZETA7MeCNgNjUxpkRMDs7QWmqDI2qUGmHDD5sUkbgQNTmrJ/sggZETD7A5NFe4EDpYfLiIDZH7QTOBjQlGcCRciIgNnbCowHNOVgoAgZETD7cZuBK+PXipCZiOGp52bRbPbj17RvHzngDxQvHgpo9/wBbdkf0O76A9rdEzfx5OEwGsXeH9CWDwW0e/5J7dzD5vwPW9dol+SzbAQAAAAASUVORK5CYII=",
						symbolRepeat: "fixed",
						symbolMargin: [5, 0],
						symbolClip: true,
						symbolSize: [12, 27],

						data: this.partyMemberDataPost.map(i => {
							return i.count
						}),
						markLine: {
							symbol: 'none',
							label: {
								formatter: 'max: {c}',
								position: 'start'
							},
							lineStyle: {
								color: 'rgba(0,0,0,0)',
								type: 'dotted',
								opacity: 0.2,
								width: 2
							},
							data: [{
								type: 'max'
							}]
						},
						z: 10
					}, {
						// full data
						type: 'pictorialBar',
						stack: "1",

						itemStyle: {
							normal: {
								opacity: 0.2
							}
						},
						label: {
							show: true,
							position: 'right',
							distance: -5,
							offset: [10, 0],
							formatter: '{c}人',
							color: '#02DFF4',
							fontSize: 14
						},
						animationDuration: 0,
						type: 'pictorialBar',
						symbol: "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAA2CAYAAADd0Vm+AAAEyklEQVRYha2US2xUVRyHj5qIlKml7bShnU6nD/qYTlso5VGQDjUQE1YaCMaEhY8oxhh14yvEgIkrRRYEw8Z4WZgYDZEF004f8547nWdp0IgmVF25IVKCC83cc8+5PxfDmZ65A7fltif5Fuc7c//fnGTmErKGVbuI/TULuFqzgNs1C/i7poBrjgIm1vLsqstxHS9uLhh4EFuu45V1DXcuorWmYMCKxhtw2Q7UFvDhlrwBKxx5fGY74CjgO0fegBW1eUzbv0EeX9fmDFiDK7YDdQUcfzpnwJI8TtoOfAo8vjVv/FKX43gwxi3bw8u3+Bn1W7OGWpflqCBn5J0LaFl3QKytWTxfn+Of1+f4Fw0FHN+QoY0ZeJsKGGlZhKfq7AZcTQWM1Bcw+OiDc3ihIWvcaMhwCBqzxo/OHF5vyOK1hiz/3nR2qzGzxn+1M4OzjWkOW2T4BcvhzRkcc6Y51kNzBm89NNCUNv5qmudYF2mDb1/Cpqrh2zLoaJ7n2Aha5uGvCrRkcGxbimEjaEnzU1WB1hT/oCXFsBG0pvjFqoArxX9oVRk2AleKpasDKv/VpTK4VIY2lRfbUvwfsV+VFL/jSvF/pf1tAI+Vhw//hC1ulf/XlmRoSzK4VTbtTvFLYr86/Iw7yS/LrjsPdznQnoLPnWQQeFR+3p3kp2VnRbvKT3lU/naFS+JwOdCRZC+1JxgEngQ72Z7k78jOkiR7oyOJQxVO5R+VA54kP+cpDYYnwdCtYrRD5e/JzooOlb/bPY/mCpfkl1dukGBXO+I6BPvT2NyZ4J/IzpIEP0sIIZ1xVhSuM6Fny4HOBPuzM66jBLtDCCFdSf38irOmO6F/WQrovwnXFWdF3004SF8KrV0xHRJZQgjpirNLJv9QuhPsIiGEdMfZVdn3qthB+uL6s9ujOgQ9UXaJEEJ6ouwb2Vshntke4x/LvjfGXiY9Mf5+T1RHmRh/kxBCemPscoW35P6XSrBjsu+L6xdIX5QpvREdAm9MP0IIqfJW9N0P+GLYWXEWZZOkP6Iv9kV0lGB8SEU9IYT0R5my4ldhJeDojzJdmvcH8YZ1rT9M0R+m8Ib1ZfHL6o9QRfjV8EZKAUII8Ubo7/IZ8YX1M94whTdMMRDWT4sPDkSoIvxq+KTAQIS9Wj6Lsq9KL7uwPj4c1sflt+tgiCoDIYoKwvodX0hfNntfaCVACCHDUbpvMKRPEKs1GKKKL0QhMxpC3XAMbWY/aAqsaQ2FqDI4RyFDCCEngCfM3nZgaI5C5ugSNo3G4DT7YTuBHXNUGZ6lkBEBs985ayOwc44qO2YpZETA7G0Fds1RZWRGg4wImP3ILLUX2DWjQUYEzH7UTmD3DFVGpzXIiIDZj87YCOyZocruaQ0yR5ewaSIGp9nvsRUIUmVPUIPM0WApYPZ77QT2BamyN6hBRgTM3lZgLEiVfVMaZETA7MeCNgNjUxpkRMDs7QWmqDI2qUGmHDD5sUkbgQNTmrJ/sggZETD7A5NFe4EDpYfLiIDZH7QTOBjQlGcCRciIgNnbCowHNOVgoAgZETD7cZuBK+PXipCZiOGp52bRbPbj17RvHzngDxQvHgpo9/wBbdkf0O76A9rdEzfx5OEwGsXeH9CWDwW0e/5J7dzD5vwPW9dol+SzbAQAAAAASUVORK5CYII=",
						symbolRepeat: "fixed",
						symbolMargin: [5, 0],
						symbolSize: [12, 27],
						data: this.partyMemberDataPost.map(i => {
							return i.count
						}),
						z: 5
					}]
				});


			},
			// 党组织 zhuzhuangtu
			initZuZhi() {
				const that = this;
				const mychart = this.$echarts.init(this.$refs.zuzhi);
				mychart.setOption({
					grid: {
						show: false
					},
					legend: {
						icon: "circle",
						itemWidth: 8,
						textStyle: {
							color: "#fff"
						}
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
							rotate: 0
						},
						axisLine: {
							show: true,
							lineStyle: {
								color: "#71bdff"
							}
						},
						type: "category",
						// data: this.zuzhi.xAxis
					},
					dataset: {
						source: [
							["product", "5年以下", "5-10年", "10年以上"]
						].concat(
							(i => {
								// console.log(that);
								return that.zuzhi.data;
							})()
						)
					},
					yAxis: {
						type: "value",
						splitLine: {
							show: false
						},
						axisLabel: {
							color: "#7991B5"
						}
					},
					series: [{
							type: "bar",
							barWidth: 10,
							itemStyle: {
								// borderWidth:10,
								normal: {
									color: new that.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
											offset: 0,
											color: "rgba(8,143,248,1)"
										}, //柱图渐变色
										{
											offset: 1,
											color: "rgba(27,93,251,1)"
										} //柱图渐变色
									]),
									label: {
										show: false, // 开启显示
										position: "top", // 在上方显示
										textStyle: {
											// 数值样式
											color: "#ffffff",
											fontSize: 12
										}
									}
								}
							}
						},
						{
							type: "bar",
							barWidth: 10,
							itemStyle: {
								normal: {
									color: new that.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
											offset: 1,
											color: "rgba(25,212,174,1)"
										}, //柱图渐变色
										{
											offset: 0,
											color: "rgba(14,161,102,1)"
										} //柱图渐变色
									]),
									label: {
										show: false, // 开启显示
										position: "top", // 在上方显示
										textStyle: {
											// 数值样式
											color: "#ffffff",
											fontSize: 12
										}
									}
								}
							}
						},
						{
							type: "bar",
							barWidth: 10,
							itemStyle: {
								normal: {
									color: new that.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
											offset: 1,
											color: "rgba(43,200,255,1)"
										}, //柱图渐变色
										{
											offset: 0,
											color: "rgba(48,131,242,1)"
										} //柱图渐变色
									]),
									label: {
										show: false, // 开启显示
										position: "top", // 在上方显示
										textStyle: {
											// 数值样式
											color: "#ffffff",
											fontSize: 12
										}
									}
								}
							}
						},

					]
				});
			},
			// 党员 关系 转移 折线图
			initPeople() {
				const that = this;
				const mychart = this.$echarts.init(this.$refs.peopleMove);
				mychart.setOption({
					color: [
						"#088FF8",
						"#FFCC00",
						"#7A7EFF",
						"#3ACE83",
						"#EE5C5C"
					].reverse(),
					xAxis: {
						type: "category",
						data: this.initPeopleObj.xAxis,
						axisLabel: {
							clickable: true,
							interval: 0,
							color: "#71BDFF",
							rotate: 0
						},
						axisLine: {
							show: true,
							lineStyle: {
								color: "#71bdff"
							}
						}
					},
					yAxis: {
						type: "value",
						axisLabel: {
							clickable: true,
							interval: 0,
							color: "#71BDFF",
							rotate: 0
						},
						splitLine: {
							show: false
						}
					},
					series: [{
						data: that.initPeopleObj.data,
						type: "line",
						smooth: true,
						itemStyle: {
							normal: {
								areaStyle: {
									type: "default",
									// 渐变色实现
									color: new that.$echarts.graphic.LinearGradient(
										0,
										0,
										0,
										1, // 变化度
										// 三种由深及浅的颜色
										[{
												offset: 0,
												color: "#2BC8FF"
											},

											{
												offset: 1,
												color: "rgba(0,0,0,0)"
											}
										]
									)
								},
								lineStyle: {
									// 线的颜色
									color: "#349e85"
								},
								// 以及在折线图每个日期点顶端显示数字
								label: {
									show: true,
									position: "top",
									textStyle: {
										color: "white"
									}
								}
							}
						},
						areaStyle: {}
					}]
				});
			},
			//
			initxuexi() {
				const that = this;
				const mychart = this.$echarts.init(this.$refs.xuexi);
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
						formatter: "{a} <br/>{b}: {c} ({d}%)"
					},
					legend: {
						show: false,
						orient: "vertical",
						left: 10,
						data: ["学习文章", "未学习文章"]
					},
					series: [{
						name: "学习",
						type: "pie",
						center: ["50%", "50%"],
						radius: ["40%", "70%"],
						avoidLabelOverlap: false,
						label: {
							show: false,
							position: "center"
						},
						// emphasis: {
						//   label: {
						//     show: true,
						//     fontSize: "30",
						//     fontWeight: "bold"
						//   }
						// },
						labelLine: {
							show: false
						},
						data: [{
								value: that.learnAnalysis.articlesCount,
								name: "学习文章",
								itemStyle: {
									color: new that.$echarts.graphic.LinearGradient(
										0,
										0,
										0,
										1, // 变化度
										// 三种由深及浅的颜色
										[{
												offset: 0,
												color: "#2Bf8ff"
											},

											{
												offset: 1,
												color: "#19d4ae"
											}
										]
									)
								}
							},
							{
								value: (_ => {
									return (
										that.learnAnalysis.articlesCount /
										(that.learnAnalysis.complete / 100) -
										that.learnAnalysis.articlesCount
									);
								})(),
								name: "未学习文章",
								itemStyle: {
									color: "rgba(43,248,255,0.2)"
								}
							}
						]
					}]
				});
			},

			// 党员  环图
			initPeopleRing() {
				const that = this;
				const mychart = this.$echarts.init(this.$refs.ring);
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
						formatter: "{a} <br/>{b}: {c} ({d}%)"
					},
					legend: {
						show: false,
						orient: "vertical",
						left: 10,
						data: ["60岁以上", "35岁以下", "36至45岁", "46至54岁", "55至59岁"]
					},
					title: [{
							text: `${that.partyMemberAgeAnalysis.totalPartyMember}`,
							left: "center",
							top: "44%",
							textStyle: {
								color: "#fff",
								fontSize: 18,
								align: "center"
							}
						},
						{
							text: `党员总数`,
							left: "center",
							top: "50%",
							textStyle: {
								color: "#71bdff",
								fontSize: 16,
								align: "center"
							}
						}
					],
					series: [{
						name: "",
						type: "pie",
						center: ["50%", "50%"],
						radius: ["40%", "60%"],
						// avoidLabelOverlap: false,
						// label: {
						//   show: ,
						//   position: "center"
						// },
						label: {
							show: true,
							formatter: "{b} - {d}%",
							color: "#fff"
						},
						emphasis: {
							label: {
								show: true,
								fontSize: "30",
								fontWeight: "bold"
							}
						},
						labelLine: {
							show: true
						},
						data: [{
								value: that.partyMemberAgeAnalysis.yearover60Total,
								name: "60岁以上"
							},
							{
								value: that.partyMemberAgeAnalysis.yearunder35Total,
								name: "35岁以下"
							},
							{
								value: that.partyMemberAgeAnalysis.year35To45Total,
								name: "36至45岁"
							},
							{
								value: that.partyMemberAgeAnalysis.year46To54Total,
								name: "46至54岁"
							},
							{
								value: that.partyMemberAgeAnalysis.year55To59Total,
								name: "55至59岁"
							}
						]
					}]
				});
			},
			// 党群
			initDangqun() {
				const that = this;
				const mychart = this.$echarts.init(this.$refs.dangqun);
				mychart.setOption({
					color: [
						"#088FF8",
						"#FFCC00",
						"#7A7EFF",
						"#3ACE83",
						"#EE5C5C"
					].reverse(),
					xAxis: {
						type: "category",
						data: this.partyMassesAnalysis.xAxis,
						axisLabel: {
							clickable: true,
							interval: 0,
							color: "#71BDFF",
							rotate: 0
						},
						axisLine: {
							show: true,
							lineStyle: {
								color: "#71bdff"
							}
						}
					},
					yAxis: {
						type: "value",
						axisLabel: {
							clickable: true,
							interval: 0,
							color: "#71BDFF",
							rotate: 0
						},
						splitLine: {
							show: false
						}
					},
					series: [{
						data: this.partyMassesAnalysis.data,
						type: "line",
						smooth: true,
						itemStyle: {
							normal: {
								areaStyle: {
									type: "default",
									// 渐变色实现
									color: new that.$echarts.graphic.LinearGradient(
										0,
										0,
										0,
										1, // 变化度
										// 三种由深及浅的颜色
										[{
												offset: 0,
												color: "#2BC8FF"
											},

											{
												offset: 1,
												color: "rgba(0,0,0,0)"
											}
										]
									)
								},
								lineStyle: {
									// 线的颜色
									color: "#349e85"
								},
								// 以及在折线图每个日期点顶端显示数字
								label: {
									show: true,
									position: "top",
									textStyle: {
										color: "white"
									}
								}
							}
						},
						areaStyle: {}
					}]
				});
			},
			// diandian(){
			// 	const diandian=this.$refs.xiaodian
			// 	console.log(diandian)
			// 	 diandian.style.left = Math.floor(20*Math.random()*20)+"px";
			// 	 diandian.style.top = Math.floor(20*Math.random()*20)+"px";

			// },
			// 三会一课 sanhuiyike
			initSanHuiYike() {
				const that = this;
				const mychart = this.$echarts.init(this.$refs.sanhuiyike);
				mychart.setOption({
					legend: {
						icon: "circle",
						itemWidth: 8,
						width: "50",
						orient: "vertical",
						right: 10,
						top: "center",
						textStyle: {
							color: "#fff"
						},
						formatter: `\n {name}`
					},
					grid: {
						width: "80%",
						left: "50"
					},
					tooltip: {},
					dataset: {
						source: [
							["product", "党小组会", "支部委员会", "党支部大会", "党课"]
						].concat(
							(i => {
								// console.log(that);
								return that.sanhuiyike;
							})()
						)
					},
					xAxis: {
						type: "category",
						spiltLine: {
							show: true //想要不显示网格线，改为false
						},
						axisLine: {
							show: true,
							lineStyle: {
								color: "#71bdff"
							}
						},
						axisLabel: {
							clickable: true,
							interval: 0,
							color: "#71BDFF",
							rotate: 0
						}
					},
					yAxis: {
						// type: "value",
						axisLabel: {
							clickable: true,
							interval: 0,
							color: "#71BDFF",
							rotate: 0
						},
						axisLine: {
							show: true,
							lineStyle: {
								color: "#71bdff"
							}
						},
						splitLine: {
							show: false
						}
					},
					// Declare several bar series, each will be mapped
					// to a column of dataset.source by default.
					series: [{
							type: "bar",
							barWidth: 10,
							itemStyle: {
								// borderWidth:10,
								normal: {
									color: new that.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
											offset: 0,
											color: "rgba(8,143,248,1)"
										}, //柱图渐变色
										{
											offset: 1,
											color: "rgba(27,93,251,1)"
										} //柱图渐变色
									]),
									label: {
										show: false, // 开启显示
										position: "top", // 在上方显示
										textStyle: {
											// 数值样式
											color: "#ffffff",
											fontSize: 12
										}
									}
								}
							}
						},
						{
							type: "bar",
							barWidth: 10,
							itemStyle: {
								normal: {
									color: new that.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
											offset: 1,
											color: "rgba(25,212,174,1)"
										}, //柱图渐变色
										{
											offset: 0,
											color: "rgba(14,161,102,1)"
										} //柱图渐变色
									]),
									label: {
										show: false, // 开启显示
										position: "top", // 在上方显示
										textStyle: {
											// 数值样式
											color: "#ffffff",
											fontSize: 12
										}
									}
								}
							}
						},
						{
							type: "bar",
							barWidth: 10,
							itemStyle: {
								normal: {
									color: new that.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
											offset: 1,
											color: "rgba(43,200,255,1)"
										}, //柱图渐变色
										{
											offset: 0,
											color: "rgba(48,131,242,1)"
										} //柱图渐变色
									]),
									label: {
										show: false, // 开启显示
										position: "top", // 在上方显示
										textStyle: {
											// 数值样式
											color: "#ffffff",
											fontSize: 12
										}
									}
								}
							}
						},
						{
							type: "bar",
							barWidth: 10,
							itemStyle: {
								normal: {
									color: new that.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
											offset: 1,
											color: "rgba(122,126,255,1)"
										}, //柱图渐变色
										{
											offset: 0,
											color: "rgba(101,53,216,1)"
										} //柱图渐变色
									]),
									label: {
										show: false, // 开启显示
										position: "top", // 在上方显示
										textStyle: {
											// 数值样式
											color: "#ffffff",
											fontSize: 12
										}
									}
								}
							}
						}
					]
				});
			}
		}
	};
</script>

<style lang="scss" scoped>
	.right-box {
		width: 510px;
		height: 100%;
		position: relative;
	}

	.survey-style {
		width: 510px;
		height: 289px;
		margin-left: -10.5px !important;
		background-image: url("../../assets/background/wuliankuang@2x.png");
		background-size: 100% 100%;
	}

	.Activities {
		width: 510px;
		height: 289px;
		margin-top: 30px;
		margin-left: -10.5px !important;
		background-image: url("../../assets/background/wuliankuang@2x.png");
		background-size: 100% 100%;
	}

	.Activities-Charts {
		width: 510px;
		height: 271px;

		div {
			margin-left: 15px;
			width: 510px;
			height: 271px;
		}
	}

	.study-style {
		width: 510px;
		height: 289px;
		margin-left: -10.5px !important;
		margin-top: 30px;
		background-image: url("../../assets/background/wuliankuang@2x.png");
		background-size: 100% 100%;
	}

	.study-box {
		width: 386px;
		display: flex;
		height: 178px;
		margin: 46px 62px 46px 60px;
		position: relative;
		background-image: url("../../assets/background/xuexiqingkuang@2x.png");
		background-size: 100% 100%;
	}

	.text-number {
		width: 170px;
		height: 38px;
		color: #FCB019;
		display: flex;
		font-size: 24px;
		font-weight: bold;
		margin-top: 6px;
		align-items: center;
		justify-content: center;
		background-image: url("../../assets/background/xuexiwenzhang@2x.png");
		background-size: 100% 100%;
	}

	.Water-title {
		width: 170px;
		height: 170px;
		position: absolute;
		right: 0;
	}

	.Water-chart {
		width: 178px;
		height: 178px;
		display: flex;
		justify-content: center;
		align-items: center;

		div {
			width: 100px;
			height: 100px;
		}
	}

	.meeting-box {
		width: 768x;
		height: 271px;

		div {
			width: 768px;
			height: 271px;
		}
	}

	// 22
	.meeting-style {
		width: 768px;
		height: 289px;
		position: absolute;
		top: 642px;
		left: 27px;
		background-image: url('../../assets/background/zhlngjiankuang2@2x.png');
		background-size: 100% 100%;


	}

	.dangyuan-styleBOx {
		width: 100px;
		height: 200px;
		margin-left: 24px;

		.shequ-name {
			width: 100px;
			height: 30px;
			display: flex;
			font-weight: bold;
			color: #ffffff;
			justify-content: center;
			align-items: center;
			background-image: url("../../assets/background/cheweishebei@2x.png");
			background-size: 100% 100%;
		}

		.shequ-png {
			width: 100px;
			height: 185px;
			display: flex;
			background-image: url("../../assets/background/dianchi@2x.png");
			background-size: 100% 100%;
			margin-top: -15px;

			.png-number {
				width: 100px;
				height: 65px;
				position: relative;
				margin-top: 60px;
				display: flex;
				justify-content: center;
				align-items: center;
			}

			.ppoLIst {
				width: 100px;
				height: 65px;

				margin-top: 105px;
				margin-left: -20px;
				display: flex;
				font-size: 32px;
				color: #00A1FF;

				align-items: center;
			}

			.png-title {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 100px;
				margin-top: 110px;
				text-align: center;
				font-size: 35px;
				font-weight: 400;
				color: #FEFEFE;

			}

		}
	}

	.box-title {
		display: flex;
		justify-content: center;
		font-size: 20px;
		font-family: Adobe Heiti Std;
		font-weight: bold;
		color: #2AA8D3;
		line-height: 34px;
		background: linear-gradient(92deg, #00EBFF 0%, #BEF3FA 50.68359375%, #00EBFF 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.Distributionstyle {
		width: 510px;
		height: 271px;

		div {
			width: 510px;
			height: 271px;
		}
	}

	.transfer-style {
		margin-top: 30px;
		width: 510px;
		height: 289px;
		margin-left: -3.5px;
		background-image: url("../../assets/background/wuliankuang@2x.png");
		background-size: 100% 100%;
	}

	.transfer-box {
		width: 510px;
		height: 271px;

		div {
			width: 510px;
			height: 271px;
		}
	}

	.Distribution {
		margin-top: 30px;
		width: 510px;
		height: 289px;
		margin-left: -3.5px;
		background-image: url("../../assets/background/wuliankuang@2x.png");
		background-size: 100% 100%;
	}

	.spread-Box {
		width: 510px;
		height: 289px;
		margin-left: -3.5px;
		background-image: url("../../assets/background/wuliankuang@2x.png");
		background-size: 100% 100%;
	}

	.left-box {
		width: 510px;
		height: 100%;
		margin-top: 2.1px;
		position: relative;
	}
</style>
<style scoped>
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
</style>
<style lang="scss" scoped>
	.tableHeader {
		background-color: rgba(250, 250, 250, 0.1) !important;

		.cell {
			color: #71bdff;
		}
	}

	.taskBox-onep {
		width: 510px !important;
		height: 220px !important;

		.conNer_one {
			width: 510px !important;
			height: 240px !important;
		}
	}

	.bacgrround_imgstyle {
		width: 241px;
		height: 103px;
		position: absolute;
		margin-top: -128px;
		margin-left: 79px;
		background-image: url("../../assets/background/dizuo.png");
		background-size: 100% 100%;
	}

	.xiaodian {
		width: 8px;
		height: 8px;
		box-shadow: rgba(11, 234, 255, 1) 0px 0px 20px;

		margin-left: 24px !important;
		margin-top: 10px;
		background: rgba(0, 234, 255, 1);
		border-radius: 4px;
	}
</style>
<style lang="scss" scoped>
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

		::v-deep tbody tr:hover>td {
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
				// .el-table__row {
				// .el-table_1_column_1 {
				//   background-color: rgba(250, 250, 250, 0.05) !important;
				// }
				// .el-table_1_column_2 {
				//   background-color: rgba(250, 250, 250, 0) !important;
				// }
				// .el-table_1_column_3 {
				//   background-color: rgba(250, 250, 250, 0.05) !important;
				// }
				// .el-table_1_column_4 {
				//   background-color: rgba(250, 250, 250, 0) !important;
				// }
				// .el-table_1_column_5 {
				//   background-color: rgba(250, 250, 250, 0.05) !important;
				// }
				// }
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

	.buled {
		background: #000633;
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}

	.header {
		width: 100%;
		height: 56px;
		/*background: pink;*/
		float: left;
		position: relative;
		border-bottom: none;
		margin-bottom: 20px;

		.title {
			font-size: 26px;
			font-weight: bold;
			color: white;
			margin-left: 15px;
		}

		.tabs {
			width: 473px;
			height: 52px;
			position: absolute;
			bottom: -26px;
			right: 400px;
			display: flex;
			justify-content: space-between;

			.tabs-item {
				width: 131px;
				height: 52px;
				line-height: 52px;
				text-shadow: 0px 0px 10px #13c2ff;
				background-image: url("../../assets/background/dsj_btn_ms1.png");
				background-size: 100% 100%;
				background-repeat: no-repeat;
				color: #13c2ff;
				font-size: 18px;
				text-align: center;
				cursor: pointer;
				transition: all 0.3s;
			}

			.checked {
				color: #ffffff;
				font-weight: bold;
				background-image: url("../../assets/background/dsj_btn_rk2.png");
			}
		}

		.time {
			position: absolute;
			right: 150px;
			top: 50%;
			transform: translateY(-50%);

			.time-content {
				color: #daf6ff;
				text-shadow: 0 0 20px #0aafe6, 0 0 20px rgba(10, 175, 230, 0);
			}
		}

		.return-btn-warp {
			display: inline-block;
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			right: 50px;
			width: 40px;
			height: 40px;
			border: 3px solid rgba(113, 189, 255, 0.5);
			border-radius: 20px;
			box-shadow: 0px 0px 10px 5px rgba(113, 189, 255, 0.5);
			transition: all 0.3s;

			.return-btn {
				display: inline-block;
				color: #13c2ff;
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				text-shadow: 0px 0px 10px 3px rgba(113, 189, 255, 0.4);
			}

			&:hover {
				box-shadow: 0px 0px 6px 5px rgba(113, 189, 255, 0.8);

				.return-btn {
					text-shadow: 0px 0px 10px 3px rgba(113, 189, 255, 1);
				}
			}
		}
	}

	// .tabs-content {
	//   //margin-top: 60px;
	//   box-sizing: border-box;
	//   padding-left: 10px;
	//   display: flex;
	//   justify-content: space-around;
	//   height: calc(100% - 56px);
	//   position: relative;
	//   z-index: 15;
	// }

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
		width: 80%;
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
				color: #71bdff;
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
		position: relative;
		width: 434px;
		height: 100%;

		.sex-ring {
			position: relative;
			height: 31%;
			width: 100%;
			margin-bottom: 15px;
		}

		.population-rose {
			position: absolute;
			bottom: 45px;
			width: 100%;
			height: 30%;

			.left-top {
				height: 20%;
				padding-left: 20px;
				padding-right: 20px;

				&>.warp {
					display: flex;

					.everyOne {
						margin: 2px;
						min-width: 60px;
						overflow: hidden;

						.name {
							color: #71bdff;
						}
					}
				}
			}

			.left-bottom {
				height: 80%;
			}
		}
	}

	.center {
		text-align: center;
	}

	.middle {
		position: relative;
		width: 838px;
		height: 100%;
		margin: 0 0 0 0;
		z-index: 10;

		.middle-top {
			width: 768px;
			// margin-left: 4%;
			position: relative;
			padding-bottom: -4%;
			left: 26px !important;
			box-sizing: border-box;
			overflow: hidden;
			padding-bottom: 0.052083rem;
			// background: yellow;
			height: 593px;
			// left: -5%;
			z-index: 1;
			margin-top: 18px;
			position: absolute;


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
			z-index: 5;
			bottom: 45px;
			left: 0;
			// top:71%;
			width: 100%;
			height: 28%;

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
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 80%;
		height: 60%;
	}

	.charts-title {
		padding-left: 10px;
		padding-right: 20px;
		width: 170px !important;
		left: -2px;
		line-height: 25px;
		height: 25px;
		background: linear-gradient(89deg,
			rgba(47, 128, 241, 0.5) 6%,
			rgba(47, 128, 241, 0) 99%);
	}

	.right {
		position: relative;
		width: 434px;
		height: 100%;

		.population-attribute {
			position: relative;
			margin-bottom: 15px;
			height: 33%;

			.right-charts-title-top {
				height: 100%;
				width: 100%;
				position: absolute;
				top: 0;
				left: 0;
				z-index: 50;
			}

			.ringWarp {
				position: absolute;
				width: 53.9%;
				height: 70%;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				border: #71bdff 1px dotted;
				border-radius: 50%;
				z-index: 40;
			}

			.right-charts-title-bottom {
				height: 30%;
				width: 100%;
				position: relative;

				.grid-task-warp {
					display: flex;
					justify-content: space-around;
					flex-direction: row;
					flex-wrap: wrap;
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					height: 80%;
					width: 80%;

					.grid-task {
						width: 25%;
						box-sizing: border-box;
						padding-right: 10px;

						.name {
							color: #71bdff;
						}

						.taskNumber {
							border-radius: 5px;
							padding: 2px;
							text-align: center;
							border: #71bdff 1px solid;
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
					border-top: #ccc 1px solid;
				}
			}
		}

		.volunteer-grid-person {
			position: relative;
			height: 26.64%;
			margin-bottom: 15px;

			.right-charts-title-top {
				height: 60%;
				width: 100%;
			}

			.right-charts-title-bottom {
				height: 40%;
				width: 100%;
				position: relative;

				.grid-task-warp {
					display: flex;
					justify-content: space-around;
					flex-direction: row;
					flex-wrap: wrap;
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					height: 80%;
					width: 80%;

					.grid-task {
						width: 25%;
						box-sizing: border-box;
						padding-right: 10px;

						.name {
							color: #71bdff;
						}

						.taskNumber {
							border-radius: 5px;
							padding: 2px;
							text-align: center;
							border: #71bdff 1px solid;
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
					border-top: #ccc 1px solid;
				}
			}
		}
	}

	.left-charts-content-top {
		background: url("../../assets/background/sdj_dk.png") repeat;
		position: relative;
		width: 100%;
		height: 100%;
		border: #2535cb 1px solid;
		// border-bottom: none;
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
		width: 100%;
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
			position: absolute;
			top: 0;
			height: 50%;
			width: 100%;
			box-sizing: border-box;
			display: flex;
			border-bottom: #ccc 1px;

			.icon {
				position: relative;

				width: 30%;
				height: 100%;

				.icon-warp {
					background: rgba(8, 143, 248, 0.3);
					display: inline-block;
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					width: 30px;
					height: 30px;
					border-radius: 15px;
					overflow: hidden;

					i {
						font-size: 30px;
					}
				}
			}

			.msg {
				position: relative;
				width: 70%;
				box-sizing: border-box;
				padding-right: 30px;
				display: flex;
				flex-direction: column;
				justify-content: center;

				i {
					font-style: normal;
					margin-left: 10px;
				}

				.sociology {
					overflow: hidden;

					.name {
						float: left;
						font-size: 16px;
						font-weight: bold;
						color: white;
					}

					.number {
						float: right;
						font-size: 14px;
						color: white;
					}
				}

				.compareMsg {
					overflow: hidden;

					.compare {
						float: left;
						font-size: 12px;
						font-weight: bold;
						color: #71bdff;

						.percent {
							float: right;
							font-size: 12px;
							font-weight: bold;
						}
					}
				}
			}
		}

		.enterprise {
			position: absolute;
			top: 50%;
			height: 50%;
			width: 100%;
			box-sizing: border-box;
			display: flex;
			border-bottom: #ccc 1px;

			.icon {
				position: relative;

				width: 30%;
				height: 100%;

				.icon-warp {
					background: rgba(8, 143, 248, 0.3);
					display: inline-block;
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					width: 30px;
					height: 30px;
					border-radius: 15px;
					overflow: hidden;

					i {
						font-size: 30px;
					}
				}
			}

			.msg {
				position: relative;
				width: 70%;
				box-sizing: border-box;
				padding-right: 30px;
				display: flex;
				flex-direction: column;
				justify-content: center;

				i {
					font-style: normal;
					margin-left: 10px;
				}

				.sociology {
					overflow: hidden;

					.name {
						float: left;
						font-size: 16px;
						font-weight: bold;
						color: white;
					}

					.number {
						float: right;
						font-size: 14px;
						color: white;
					}
				}

				.compareMsg {
					overflow: hidden;

					.compare {
						float: left;
						font-size: 12px;
						font-weight: bold;
						color: #71bdff;

						.percent {
							float: right;
							font-size: 12px;
							font-weight: bold;
						}
					}
				}
			}
		}
	}

	.mid-content-right {
		position: absolute;
		width: 50%;
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
			width: 80%;
			height: 80%;
			top: 10%;
			left: 10%;
			// background: pink;
		}
	}

	.top-left-title {
		position: absolute;
		top: -4px;
		left: 3px;
		width: 5%;
		height: 12px;
		border-left: 4px #3083f2 solid;
		z-index: 22;
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
	.dangyuanfenbuAll {
		display: flex;
		width: 100%;
		height: 93%;
		margin-top: 7%;
		justify-content: space-around;
		flex-direction: column;
		padding-bottom: 15px;
	}

	.dangyuanfenbuItem {
		height: 22px;
		width: 100%;
		display: flex;
		margin: 5px;
	}

	.pic {
		width: 270px;
		background: url(../../assets/background/renNocolor.png) no-repeat;
		background-size: 265px 22px;
		background-position: left;
		margin-left: 10px;
		display: flex;
	}

	.colorPic {
		flex: 1;
		height: 100%;
		background: url(../../assets/background/renColor.png);
		background-repeat: no-repeat;
		background-position: left;
		background-size: 265px 22px;
	}

	.opcity {
		float: left;
		background: rgba(0, 0, 0, 0);
	}

	.dangyuanfenbu_Num {
		margin-left: 10px;
		width: 40px;
		color: #26e5ff;
		line-height: 22px;
		font-size: 18px;
	}

	.xuexi {
		position: absolute;
		height: 148px;
		width: 80%;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		display: flex;
	}

	.xuexipic {
		width: 148px;
		height: 148px;
		/* background: purple; */
		border-radius: 50%;
		border: rgba(113, 189, 255, 0.5) 1px solid;
		background-color: rgba(8, 8, 67, 0.5);
		position: relative;
	}

	.context {
		width: 100%;
		height: 100%;
	}

	.text-content {
		/* margin-left: 148px; */
		flex: 1;
	}

	.con1 {
		padding: 10px;
		height: 50%;
		width: 100%;
		border-bottom: 1px rgba(113, 189, 255, 0.5) solid;
	}

	.con2 {
		padding: 10px;
		height: 50%;
		width: 100%;
	}

	.taskBox {
		width: 510px;
		height: 260px;
		margin-top: 20px;
	}
</style>
<style scoped>
	.borderRing {
		position: absolute;
		transform: translate(-50%, -50%);
		left: 50%;
		top: 50%;
		width: 55%;
		padding-bottom: 55%;
		height: 0;
		border-radius: 50%;
		border: rgba(113, 189, 255, 0.5) 1px dashed;
		z-index: 300;
	}
</style>
<style lang="scss" scoped>
	.shuzi0 {
		width: 15px;
		height: 22px;
		background: url("../../assets/background/number/num_0@2x.png") repeat;
		background-size: 100% 100%;
	}

	.shuzi1 {
		width: 15px;
		height: 22px;
		background: url("../../assets/background/number/num_1@2x.png") repeat;
		background-size: 100% 100%;
	}

	.shuzi2 {
		width: 15px;
		height: 22px;
		background: url("../../assets/background/number/num_2@2x.png") repeat;
		background-size: 100% 100%;
	}

	.shuzi3 {
		width: 15px;
		height: 22px;
		background: url("../../assets/background/number/num_3@2x.png") repeat;
		background-size: 100% 100%;
	}

	.shuzi4 {
		width: 15px;
		height: 22px;
		background: url("../../assets/background/number/num_4@2x.png") repeat;
		background-size: 100% 100%;
	}

	.shuzi5 {
		width: 15px;
		height: 22px;
		background: url("../../assets/background/number/num_5@2x.png") repeat;
		background-size: 100% 100%;
	}

	.shuzi6 {
		width: 15px;
		height: 22px;
		background: url("../../assets/background/number/num_6@2x.png") repeat;
		background-size: 100% 100%;
	}

	.shuzi7 {
		width: 15px;
		height: 22px;
		background: url("../../assets/background/number/num_7@2x.png") repeat;
		background-size: 100% 100%;
	}

	.shuzi8 {
		width: 15px;
		height: 22px;
		background: url("../../assets/background/number/num_8@2x.png") repeat;
		background-size: 100% 100%;
	}

	.shuzi9 {
		width: 15px;
		height: 22px;
		background: url("../../assets/background/number/num_9@2x.png") repeat;
		background-size: 100% 100%;
	}

	.numberstylePO {
		position: absolute;
		top: 67px
	}

	.Bigboxstyleover {
		overflow-x: scroll;
		/*添加横向滚动条*/
		white-space: nowrap;
		/*不换行*/
	}

	.Bigboxstyleover::-webkit-scrollbar {
		display: none;
	}
</style>
