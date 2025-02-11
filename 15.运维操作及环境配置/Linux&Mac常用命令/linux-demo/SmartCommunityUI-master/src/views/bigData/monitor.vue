<template>
	<el-row class="tabs-content w100">
		<div class="left" style="">
			<!-- 设备统计情况 -->
			<div class="shebeistyle">
				<h2 class="box-title">设备统计情况</h2>
				<!-- 三个图 -->
				<div class="ringbox">
					<div class="shebeicharts">
						<div class="ring" ref="ring1"></div>
						<div class="ringTitle">
							{{ ring.chewei.title }}
						</div>
					</div>

					<div class="shebeicharts">
						<div class="ring" ref="ring2"></div>
						<div class="ringTitle">
							{{ ring.fangke.title }}
						</div>
					</div>

					<div class="shebeicharts">
						<div class="ring" ref="ring3"></div>
						<div class="ringTitle">
							{{ ring.jiankong.title }}
						</div>
					</div>
				</div>
			</div>

			<!-- 车位实时统计 -->
			<div class="cheweistyle">
				<h2 class="box-title">车位，车辆实时统计</h2>
				  <div class=" carnumberliststyle">
				  	<div class="cheweippolo" :id='radio1==1?"backgroundstyle":""'   @click="cheweichangeone">车位</div>
				  	<div class="chelinagfjd"   :id='radio1==2?"backgroundstyle":""'  @click="cheweichangetwo">车辆</div>
				  </div>
				  <!-- this.carNUmberMethods cheweitongji-->
				<div class="cheweibox" v-show="radio1==1">
					<div ref='cheweitongji' class="cheweitongji"></div>
				</div>
				<div class="cheweibox" v-show="radio1==2" style="margin-top: 12px;">
					<div ref='carNUmber' class="cheweitongji"></div>
				</div>
			</div>

			<!-- 本月新增访客登记数 -->
			<div class="fangkestyle">
				<h2 class="box-title">本月新增访客登记数</h2>
				<div class="fangkebox">
					<div ref='fangkedengji'></div>
				</div>
			</div>
		</div>

		<div class="middle">
			<div class="middle-top">
				<Map v-if="tab == 2" @change="handleChange" />
			</div>
			<!-- 人员进出统计 -->
			<div class="renyuanjinchubox">
				<h2 class="box-title">人员进出统计</h2>
				<!-- -->
				<div class="renyuantongjibox">
					<div ref='tongjicharts'></div>
				</div>

			</div>
		</div>

		<div class="right">
			<!-- 视频表格 -->
			<div class="video-style">
				<h2 class="box-title">监控情况</h2>
				<div style="display: flex;justify-content: space-around;">
					<div class="video-box">
						<div class="mov_viedeo">
							<video-player class=" shipingliu" :options="playerOptions" />
						</div>
						<div class="mov_title">
							<p class="video-title">
								{{ video[0].title }}
							</p>
							<p class="video-code">编号：{{ video[0].code }}</p>
						</div>
					</div>

					<div class="video-box">
						<div class="mov_viedeo">
							<video-player class=" shipingliu" :options="playerOptions" />
						</div>
						<div class="mov_title">
							<p class="video-title">
								{{ video[1].title }}
							</p>
							<p class="video-code">编号：{{ video[1].code }}</p>
						</div>
					</div>
				</div>
			</div>

			<!-- 预警消息 -->
			<div class="warring-BOx">
				<h2 class="box-title">最新预警消息</h2>
				<!-- 预警盒子 -->
				<div class="warring-style">
					<ul>
						<li v-for="(item, index) in yujingList">
							<div class="warring-icon"></div>
							<div class="warring-time">{{ item.time }}</div>
							<div class="warring-messecg">{{ item.type }}</div>
							<div class="warring-form">{{ item.opention }}</div>
						</li>
					</ul>
				</div>

			</div>

			<!-- <div class="volunteer-grid-person"></div> -->
			<!-- 设备列表盒子 -->
			<div class="shebei-ListBox">
				<h2 class="box-title">设备列表</h2>
				<!-- 按钮 -->
				<div class="shebeibtn-box">
					<div>监控设备</div>
					<div>访客机</div>
					<div>车位设备</div>
				</div>
				<div class="shebei-liststyleLi">
					<ul>
						<li v-for="(item, index) in shebeiList">
							<div class="list-name">{{item.name}}</div>
							<div class="list-code">{{item.code}}</div>
							<div style="margin-left: 45px;" :class="item.online ? 'list-online' : 'list-notOnline'">{{ item.online == 1 ? "在线":"离线" }}</div>
							<div class="list-detail" style="display: flex;">
								<span class="">查看详情</span>
								<div title="查看详情页面" style="width: 18px;height:13px ; display: flex;" class="list-detail-icon">
								</div>

							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</el-row>
</template>
<script>
	import Map from "./work3DWu";
	import {
		bigData,
		eventsTypeData,
		taskTypeData,
		getCarOutNumlist
	} from "@/api/utils";


	export default {
		components: {
			Map
		},
		props: ["tab"],
		data() {
			return {
				ring: {
					chewei: {
						title: "车位设备",
						all: 1000,
						online: 981,
						reta: 98.1,
						notOnline: 19
					},
					fangke: {
						title: "访客机",
						all: 1000,
						online: 964,
						reta: 96.4,
						notOnline: 36
					},
					jiankong: {
						title: "监控设备",
						all: 1000,
						online: 976,
						reta: 97.6,
						notOnline: 24
					}
				},
				radio1:1,
				task: {
					yAxis: ["清水沟社区", "台柳路社区", "河西社区", "河崖社区"], // 任务 类型
					dataAll: [423, 326, 436, 237], // 对应数据
					kongxian: [306, 52, 60, 82] // 对应数据
				},
				initPeopleObj: {
					xAxis: ["清水沟社区", "台柳路社区", "河西社区", "河崖社区"],
					data: [220, 132, 301, 334]
				},
				RenInOutStic: [
					["清水沟社区", 1493, 325, 138],
					["台柳路社区", 1176, 336, 153],
					["河西社区", 1558, 236, 112],
					["河崖社区", 1216, 547, 348],
					// ["锦绣华府",77, 68, 23],
					// ["魔方大厦", 94, 53, 20]
				],
				yujingList: [{
						time: "2020-09-28 16:32:17",
						type: "高空抛物",
						opention: "（来源：XDFJk001）"
					},
					{
						time: "2020-08-24 15:25:02",
						type: "通道阻塞",
						opention: "（来源：WLJk0122）"
					},
					{
						time: "2020-07-23 12:16:29",
						type: "高空抛物",
						opention: "（来源：XDFJk014）"
					},
					{
						time: "2020-07-22 22:10:29",
						type: "高空抛物",
						opention: "（来源：XDFJk011）"
					},
					{
						time: "2020-07-18 20:50:05",
						type: "其他类型",
						opention: "（来源：XDFJk004）"
					},
					{
						time: "2020-07-17 05:06:36",
						type: "其他类型",
						opention: "（来源：XDFJk005）"
					},
					{
						time: "2020-07-16 12:00:03",
						type: "通道阻塞",
						opention: "（来源：XDFJk001）"
					}
				],
				video: [{
						url: "/video/VID20201009102221",
						code: "VID20201009102221",
						title: "新港花园监控1"
					},
					{
						url: "/video/VID20201009102500",
						code: "VID20201009102500",
						title: "新港花园监控2"
					}
				],
				shebeiList: [
					// type 1 监控设备 2 车位 3 访客 online 1 在线 0 不在线
					{
						type: 1,
						name: "新东方监控",
						code: "XDFJk001",
						online: 1
					},
					{
						type: 2,
						name: "锦绣华府车位",
						code: "CWBJH009",
						online: 1
					},
					{
						type: 3,
						name: "蓝光CC访客机",
						code: "LGFKJ1563",
						online: 1
					},
					{
						type: 1,
						name: "蔚蓝监控",
						code: "WLJk011",
						online: 0
					},
					{
						type: 2,
						name: "新港花园车位",
						code: "XGCWB124",
						online: 0
					},
					{
						type: 3,
						name: "魔方大厦监控",
						code: "MFFKJ155",
						online: 0
					}
				],
				playerOptions: {
					playbackRates: [0.7, 1.0, 1.5, 2.0], // 播放速度
					autoplay: false, // 如果true,浏览器准备好时开始回放。
					controls: true, // 控制条
					preload: "auto", // 视频预加载
					muted: false, // 默认情况下将会消除任何音频。
					loop: true, // 导致视频一结束就重新开始。
					language: "zh-CN",
					aspectRatio: "4:3", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
					fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
					sources: [{
						type: "video/mp4",
						src: "video/VID20201009102221.mov" // 你所放置的视频的地址，最好是放在服务器上
					}],
					// poster: "", //你的封面地址（覆盖在视频上面的图片）
					width: document.documentElement.clientWidth,
					notSupportedMessage: "此视频暂无法播放，请稍后再试" // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
				},
				tabItem: ""
			};
		},

		props: ["tab"],

		async mounted() {
			this.initZheXian();
			this.initRenInOutStic();
			this.initRingOne();
			this.initRingTwo();
			this.initRingThree();
			this.carNUmberMethods()
			this.getcaroutlist()
		},

		watch: {
			tab: {
				handler(n, o) {

					this.cheweitongji();
					this.initChewei();


				}
			}
		},
		methods: {
			carTable(){
				this.radio1=!this.radio1
			},
			//车辆进出统计
			async getcaroutlist(){
				const {data} =await getCarOutNumlist({
					// gridId:''
				})

				console.log(1111111)
			},
			// 设备情况统计 -》 num：第几个ring data ：需要渲染的数据
			//333
			initRingThree() {
				const that = this;
				var getfpkszb = [96];
				var getfpkszb1 = [0.01];

				const mychart = this.$echarts.init(this.$refs.ring3);
				mychart.setOption({
					title: {

						text: getfpkszb + '%',


						textStyle: {
							color: 'rgba(62, 253, 228, 1)',
							center: ['50%', '50%'],
							fontSize: 16
						},
						subtextStyle: {
							color: '#B1B1B1',
						},
						itemGap: 20,
						left: 'center',
						top: '43%'
					},
					tooltip: {
						trigger: "item",
						formatter: "{a} <br/>{b}: {c} ({d}%)"
					},
					angleAxis: {
						max: 100,
						clockwise: true, // 逆时针
						// 隐藏刻度线
						show: false
					},
					radiusAxis: {
						type: 'category',
						show: true,
						axisLabel: {
							show: false,
						},
						axisLine: {
							show: false,

						},
						axisTick: {
							show: false
						},
					},
					polar: {
						center: ['50%', '50%'],
						radius: '145%' //图形大小
					},
					series: [{
						stack: 'one',
						type: 'bar',
						data: getfpkszb,
						showBackground: true,
						coordinateSystem: 'polar',
						roundCap: true,
						barWidth: 15,
						silent: true,
						itemStyle: {
							normal: {
								opacity: 1,
								color: { //图形渐变颜色方法，四个数字分别代表，右，下，左，上，offset表示0%到100%
									type: 'linear',
									x: 1,
									y: 0,
									x2: 0, //从左到右 0-1
									y2: 1,
									colorStops: [{
										offset: 0.1,
										color: 'rgba(62, 253, 228, 0.1)'
									},
									{
										offset: 0.2,
										color: 'rgba(62, 253, 228, 0.2)'
									},
									{
										offset: 0.3,
										color: 'rgba(62, 253, 228, 0.3)'
									},
									{
										offset: 0.4,
										color: 'rgba(62, 253, 228, 0.4)'
									},
									{
										offset: 0.5,
										color: 'rgba(62, 253, 228, 0.5)'
									},
									{
										offset: 0.6,
										color: 'rgba(62, 253, 228, 0.6)'
									},
									{
										offset: 0.7,
										color: 'rgba(62, 253, 228, 0.7)'
									},
									{
										offset: 0.8,
										color: 'rgba(62, 253, 228, 0.8)'
									},
									{
										offset: 1,
										color: 'rgba(62, 253, 228, 1)'
									}],
								},
								borderColor: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
									offset: 0,
									color: 'RGBA(54, 150, 231, 0)'
								}, {
									offset: 1,
									color: 'RGBA(54, 150, 231, 0)'
								}]),
								borderWidth: 3
							}
						},
					}, {
						stack: 'one',
						type: 'bar',
						data: getfpkszb1,
						showBackground: true,

						coordinateSystem: 'polar',
						roundCap: true,
						barWidth: 15,
						silent: true,
						itemStyle: {
							normal: {
								opacity: 1,
								color: { //图形渐变颜色方法，四个数字分别代表，右，下，左，上，offset表示0%到100%
									type: 'linear',
									x: 1,
									y: 0,
									x2: 0, //从左到右 0-1
									y2: 1,
									colorStops: [{
										offset: 0.1,
										color: 'rgba(62, 253, 228, 0.1)'
									},
									{
										offset: 0.2,
										color: 'rgba(62, 253, 228, 0.2)'
									},
									{
										offset: 0.3,
										color: 'rgba(62, 253, 228, 0.3)'
									},
									{
										offset: 0.4,
										color: 'rgba(62, 253, 228, 0.4)'
									},
									{
										offset: 0.5,
										color: 'rgba(62, 253, 228, 0.5)'
									},
									{
										offset: 0.6,
										color: 'rgba(62, 253, 228, 0.6)'
									},
									{
										offset: 0.7,
										color: 'rgba(62, 253, 228, 0.7)'
									},
									{
										offset: 0.8,
										color: 'rgba(62, 253, 228, 0.8)'
									},
									{
										offset: 1,
										color: 'rgba(62, 253, 228, 1)'
									}],
								},
								borderColor: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
									offset: 0,
									color: 'rgba(62, 253, 228, 1)'
								}, {
									offset: 1,
									color: 'rgba(62, 253, 228, 1)'
								}]),
								borderWidth: 2.5
							}
						},

					}]

				});
			},
			cheweichangeone(){
				this.radio1=1
			},
		    cheweichangetwo(){
				this.radio1=2
			},
			carNUmberMethods(){
				const mychart = this.$echarts.init(this.$refs.carNUmber);
				var  category= [{
				        name: "进车记录数",
				        value: 2500
				    },
				    {
				        name: "出车记录数",
				        value: 8000
				    },
				    {
				        name: "实有车辆数",
				        value: 3000
				    },
				].reverse(); // 类别
				var total = 10000; // 数据总数
				var  datas = [];
				category.forEach(value => {
				    datas.push(value.value);
				});
				mychart.setOption({

					    xAxis: {
					        max: total,
					        splitLine: {
					            show: false
					        },
					        axisLine: {
					            show: false
					        },
					        axisLabel: {
					            show: false
					        },
					        axisTick: {
					            show: false
					        }
					    },
					    grid: {
							width:"65%",
					        left:95,
					        top: 15, // 设置条形图的边距
					        bottom: 20
					    },
					    yAxis: [{
					        type: "category",
					        inverse: false,
					        data: category,
					        axisLine: {
					            show: false
					        },
					        axisTick: {
					            show: false
					        },
					        axisLabel: {
					            show: false
					        }
					    }],
					    series: [{
					            // 内
					            type: "bar",
					            barWidth:22,
					            legendHoverLink: false,
					            silent: true,
					            itemStyle: {
					                normal: {
					                    color: function(params) {
					                        var color;
					                        if(params.dataIndex==2){
					                             color = {
					                                type: "linear",
					                                x: 0,
					                                y: 0,
					                                x2: 1,
					                                y2: 0,
					                                colorStops: [{
					                                        offset: 0,
					                                        color: "#0742B9" // 0% 处的颜色
					                                    },
					                                    {
					                                        offset: 1,
					                                        color: "#1BDFFC" // 100% 处的颜色
					                                    }
					                                ]
					                            }
					                            }else if(params.dataIndex==1){
					                            color = {
					                                type: "linear",
					                                x: 0,
					                                y: 0,
					                                x2: 1,
					                                y2: 0,
					                                colorStops: [{
					                                        offset: 0,
					                                        color: "#07B3B9" // 0% 处的颜色
					                                    },
					                                    {
					                                        offset: 1,
					                                        color: "#1BFC6A" // 100% 处的颜色
					                                    }
					                                ]
					                            }
					                            }else if(params.dataIndex==0){
					                            color = {
					                                type: "linear",
					                                x: 0,
					                                y: 0,
					                                x2: 1,
					                                y2: 0,
					                                colorStops: [{
					                                        offset: 0,
					                                        color: "#FA9F55" // 0% 处的颜色
					                                    },
					                                    {
					                                        offset: 1,
					                                        color: "#FFF267" // 100% 处的颜色
					                                    }
					                                ]
					                            }
					                            }
					                            return color;
					                    },
					                }
					            },
					            label: {
					                normal: {
					                    show: true,
					                    position: "left",
					                    formatter: "{b}",
					                    textStyle: {
					                        color: "#fff",
					                        fontSize: 15
					                    }
					                }
					            },
					            data: category,
					            z: 1,
					            animationEasing: "elasticOut"
					        },
					        {
					            // 分隔
					            type: "pictorialBar",
					            itemStyle: {
					                normal:{
					                    color:"#061348"
					                }
					            },
					            symbolRepeat: "fixed",
					            symbolMargin: 6,
					            symbol: "rect",
					            symbolClip: true,
					            symbolSize: [2, 23],
					            symbolPosition: "start",
					            symbolOffset: [1, -1],
					            symbolBoundingData: this.total,
					            data: category,
					            z: 2,
					            animationEasing: "elasticOut"
					        },
					        {
					            // 外边框
					            type: "pictorialBar",
					            symbol: "rect",
					            symbolBoundingData: total,
					            itemStyle: {
					                normal: {
					                    color: "none"
					                }
					            },
					            label: {
					                normal: {
					                	formatter: (params) => {
					                		var text;
					                    	text = '{f|  '+params.data+' 辆}';
					                        return text;
					    				},
					    				rich:{
					    					a: {
					    			            color: 'pink'
					    			        },
					    			        b: {
					    			        	color: 'pink'
					    			        },
					    			        c:{
					    			        	color: 'pink'
					    			        },
					    			        d:{
					    			        	color:"pink"
					    			        },
					    			        f:{
					    			        	color:"#ffffff"
					    			        }
					    				},
					    				position: 'right',
					    				distance: 10, // 向右偏移位置
					    				show: true
					                }
					            },
					            data: datas,
					            z: 0,
					            animationEasing: "elasticOut"
					        },
					        {
					            name: "外框",
					            type: "bar",
					            barGap: "-120%", // 设置外框粗细
					            data: [total, total, total,total,total,total,total,total,total,total,total,total,total,total,total,total,total,total,total,total],
					            barWidth: 30,
					            itemStyle: {
					                normal: {
					                    color: "#062A6E", // 填充色
					                    barBorderColor: "#1379C8", // 边框色
					                    barBorderWidth: 1, // 边框宽度
					                    // barBorderRadius: 0, //圆角半径
					                    label: {
					                        // 标签显示位置
					                        show: false,
					                        position: "top" // insideTop 或者横向的 insideLeft
					                    }
					                }
					            },
					            z: 0
					        }
					    ]

				})
			},
			//22222
			initRingTwo() {
				const that = this;
				var getfpkszb = [92];
				var getfpkszb1 = [0.01];

				const mychart = this.$echarts.init(this.$refs.ring2);
				mychart.setOption({
					title: {
						text: getfpkszb + '%',
						textStyle: {
							color: 'rgba(244, 182, 47, 0.8)',
							fontSize: 16
						},
						subtextStyle: {
							color: '#B1B1B1',
						},
						itemGap: 20,
						left: 'center',
						top: '43%'
					},
					tooltip: {
						trigger: "item",
						formatter: "{a} <br/>{b}: {c} ({d}%)"
					},
					angleAxis: {
						max: 100,
						clockwise: true, // 逆时针
						// 隐藏刻度线
						show: false
					},
					radiusAxis: {
						type: 'category',
						show: true,
						axisLabel: {
							show: false,
						},
						axisLine: {
							show: false,

						},
						axisTick: {
							show: false
						},
					},
					polar: {
						center: ['50%', '50%'],
						radius: '150%' //图形大小
					},
					series: [{
						stack: 'one',
						type: 'bar',
						data: getfpkszb,
						showBackground: true,
						coordinateSystem: 'polar',
						roundCap: true,
						barWidth: 15,
						silent: true,
						itemStyle: {
							normal: {
								opacity: 1,
								color: { //图形渐变颜色方法，四个数字分别代表，右，下，左，上，offset表示0%到100%
									type: 'linear',
									x: 1,
									y: 0,
									x2: 0, //从左到右 0-1
									y2: 1,
									colorStops: [{
										offset: 0.1,
										color: 'rgba(244, 182, 47, 0.1)'
									},
									{
										offset: 0.2,
										color: 'rgba(244, 182, 47, 0.2)'
									},
									{
										offset: 0.3,
										color: 'rgba(244, 182, 47, 0.3)'
									},
									{
										offset: 0.4,
										color: 'rgba(244, 182, 47, 0.4)'
									},
									{
										offset: 0.5,
										color: 'rgba(244, 182, 47, 0.5)'
									},
									{
										offset: 0.6,
										color: 'rgba(244, 182, 47, 0.6)'
									},
									{
										offset: 0.7,
										color: 'rgba(244, 182, 47, 0.7)'
									},
									{
										offset: 0.8,
										color: 'rgba(244, 182, 47, 0.9)'
									},
									{
										offset: 1,
										color: 'rgba(244, 182, 47, 1)'
									}],
								},
								borderColor: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
									offset: 0,
									color: 'RGBA(54, 150, 231, 0)'
								}, {
									offset: 1,
									color: 'RGBA(54, 150, 231, 0)'
								}]),
								borderWidth: 3
							}
						},
					}, {
						stack: 'one',
						type: 'bar',
						data: getfpkszb1,
						showBackground: true,

						coordinateSystem: 'polar',
						roundCap: true,
						barWidth: 15,
						silent: true,
						itemStyle: {
							normal: {
								opacity: 1,
								color: { //图形渐变颜色方法，四个数字分别代表，右，下，左，上，offset表示0%到100%
									type: 'linear',
									x: 1,
									y: 0,
									x2: 0, //从左到右 0-1
									y2: 1,
									colorStops: [{
										offset: 0.1,
										color: 'rgba(244, 182, 47, 0.1)'
									},
									{
										offset: 0.2,
										color: 'rgba(244, 182, 47, 0.2)'
									},
									{
										offset: 0.3,
										color: 'rgba(244, 182, 47, 0.3)'
									},
									{
										offset: 0.4,
										color: 'rgba(244, 182, 47, 0.4)'
									},
									{
										offset: 0.5,
										color: 'rgba(244, 182, 47, 0.5)'
									},
									{
										offset: 0.6,
										color: 'rgba(244, 182, 47, 0.6)'
									},
									{
										offset: 0.7,
										color: 'rgba(244, 182, 47, 0.7)'
									},
									{
										offset: 0.8,
										color: 'rgba(244, 182, 47, 0.9)'
									},
									{
										offset: 1,
										color: 'rgba(244, 182, 47, 1)'
									}],
								},
								borderColor: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
									offset: 0,
									color: 'rgba(244, 182, 47, 1)'
								}, {
									offset: 1,
									color: 'rgba(244, 182, 47, 1)'
								}]),
								borderWidth: 2.5
							}
						},

					}]

				});

			},
			// 1111111
			initRingOne() {
				const that = this;
				var getfpkszb = [94];
				var getfpkszb1 = [0.01];
				const mychart = this.$echarts.init(this.$refs.ring1);
				mychart.setOption({
					title: {
						text: getfpkszb + '%',

						textStyle: {
							color: 'rgba(61, 166, 255, 1)',
							fontSize: 16
						},
						subtextStyle: {
							color: '#B1B1B1',
						},
						itemGap: 20,
						left: 'center',
						top: '43%'
					},
					tooltip: {
						trigger: "item",
						formatter: "{a} <br/>{b}: {c} ({d}%)"
					},
					angleAxis: {
						max: 100,
						clockwise: true, // 逆时针
						// 隐藏刻度线
						show: false
					},
					radiusAxis: {
						type: 'category',
						show: true,
						axisLabel: {
							show: false,
						},
						axisLine: {
							show: false,

						},
						axisTick: {
							show: false
						},
					},
					polar: {
						center: ['50%', '50%'],
						radius: '150%' //图形大小
					},
					series: [{
						stack: 'one',
						type: 'bar',
						data: getfpkszb,
						showBackground: true,
						coordinateSystem: 'polar',
						roundCap: true,
						barWidth: 15,
						silent: true,
						itemStyle: {
							normal: {
								opacity: 1,

									color: { //图形渐变颜色方法，四个数字分别代表，右，下，左，上，offset表示0%到100%
										type: 'linear',
										x: 1,
										y: 0,
										x2: 0, //从左到右 0-1
										y2: 1,
										colorStops: [{
											offset: 0.1,
											color: 'rgba(61, 166, 255, 0.1)'
										},
										{
											offset: 0.2,
											color: 'rgba(61, 166, 255, 0.1)'
										},
										{
											offset: 0.3,
											color: 'rgba(61, 166, 255, 0.2)'
										},
										{
											offset: 0.4,
											color: 'rgba(61, 166, 255, 0.2)'
										},
										{
											offset: 0.5,
											color: 'rgba(61, 166, 255, 0.6)'
										},
										{
											offset: 0.6,
											color: 'rgba(61, 166, 255, 0.6)'
										},
										{
											offset: 0.7,
											color: 'rgba(61, 166, 255, 1)'
										},
										{
											offset: 0.8,
											color: 'rgba(61, 166, 255, 1)'
										},
										{
											offset: 1,
											color: 'rgba(61, 166, 255, 1)'
										}],
									},
								borderColor: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
									offset: 0,
									color: 'RGBA(54, 150, 231, 0)'
								}, {
									offset: 1,
									color: 'RGBA(54, 150, 231, 0)'
								}]),
								borderWidth: 3
							}
						},
					}, {
						stack: 'one',
						type: 'bar',
						data: getfpkszb1,
						showBackground: true,
						coordinateSystem: 'polar',
						roundCap: true,
						barWidth: 15,
						silent: true,
						itemStyle: {
							normal: {
								opacity: 1,
								color: { //图形渐变颜色方法，四个数字分别代表，右，下，左，上，offset表示0%到100%
									type: 'linear',
									x: 1,
									y: 0,
									x2: 0, //从左到右 0-1
									y2: 1,
									colorStops: [{
										offset: 0.1,
										color: 'rgba(61, 166, 255, 0.1)'
									},
									{
										offset: 0.2,
										color: 'rgba(61, 166, 255, 0.1)'
									},
									{
										offset: 0.3,
										color: 'rgba(61, 166, 255, 0.2)'
									},
									{
										offset: 0.4,
										color: 'rgba(61, 166, 255, 0.2)'
									},
									{
										offset: 0.5,
										color: 'rgba(61, 166, 255, 0.6)'
									},
									{
										offset: 0.6,
										color: 'rgba(61, 166, 255, 0.6)'
									},
									{
										offset: 0.7,
										color: 'rgba(61, 166, 255, 1)'
									},
									{
										offset: 0.8,
										color: 'rgba(61, 166, 255, 1)'
									},
									{
										offset: 1,
										color: 'rgba(61, 166, 255, 1)'
									}],
								},
								borderColor: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
									offset: 0,
									color: 'rgba(61, 166, 255, 1)'
								}, {
									offset: 1,
									color: 'rgba(61, 166, 255, 1)'
								}]),
								borderWidth: 2.5
							}
						},

					}]

				});
			},
			cheweitongji() {
				const mychart = this.$echarts.init(this.$refs.cheweitongji);
				mychart.setOption({
					grid: {
						left: "20%",
						// height: "56%",
						top: '32%',
					},
					tooltip: {
						trigger: 'item',
						backgroundColor: 'RGBA(16, 69, 164, 1)',
						axisPointer: { // 坐标轴指示器，坐标轴触发有效
							type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
						},
						formatter: function(params) {
							let res = "";
							let titmsg='<span style ="font-size:12px;color:#01DFF4;">' + params.name  + '</span>';
							let dotHtml = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#1197b8"></span>';
							res = titmsg + "<br/>" + "<div style='width:120%;height:2px;background:#010D34;margin-left:-10%'></div>"+ dotHtml + params.value + " 个";
							return res;
						},
						textStyle: {
							color: "#fff",
							fontSize: 12
						}
					},
					color: ['#4472C5', '#ED7C30', '#80FF80', '#FF8096', '#800080'],
					legend: {
						itemWidth: 20,
						itemHeight: 8,
						right: "5.2%",
						top: '3.5%',
						show: true,
						data: [{
								name: '空闲车位',
								icon: "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAQEAYAAAAnkKEaAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAAASAAAAEgARslrPgAAARRJREFUWMPtlT0KwkAQhd8mkNIDeAErwcZOsPYU1kKsvEGOYeUVrDyCnkGw105CLOLPPouJKARRd5NsRF/zMcWy+80MLJALNXW3C5DkbCb1ZiP14SAkK6CmThKp12upp1Nhu43iQ5LjsfB8rlDUgMejcDgsQvxh4pdLPQTfZZoKWy1Tew+AggrDrPRKWK0SEwTC0cimAQR7PdcqdjF/f7YBzaZrBbuYv//LVv6phrFHdnC3c61gl+3WsgGrlWsFuyyXFodJst8Xal2P7+1d3r7tTqeALpJkFNVD7BVvg5pMSlgnkhwMhIuFMI7dCu/3wvn8vrHFRH3QGE3daABQUL5fQudzF4KnE6A85SVJBff9888v5gq32joDY3s/1gAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMC0xMS0wM1QyMjoxODoyNyswODowMIaMltAAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjAtMTEtMDNUMjI6MTg6MjcrMDg6MDD30S5sAAAAR3RFWHRzdmc6YmFzZS11cmkAZmlsZTovLy9ob21lL2FkbWluL2ljb24tZm9udC90bXAvaWNvbl9iaDEyMTdkZDB0ai90dWxpLnN2Zz5oIowAAAAASUVORK5CYII=",
								textStyle: {
									color: 'rgba(255, 255, 255, 1)',
								},

							},
							{
								name: '车位总个数',
								icon: "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAQEAYAAAAnkKEaAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAAASAAAAEgARslrPgAAAhlJREFUWMPtllFI01EUh3/nrqbNNgtNpgW99KCNZj04BDXopRgRxYJVFoiQmmwTepgQkUKMhCAlRokvxcBMYYRQ9BTofHFQ0GJiDqknMzWUFsrM+b+nl9aDEOqV9Ufye7pcLuec75x74RLWcPxconbAXFEhi+Uz+cPjISv8SNXUoIPGUWm14ig/wC2TCdkmh5xwLC3xCJLIn55GELlYHh7mFAq0A8FgvK107FpOPL7VNJRZ2Jcn9vcN+XwY4bP0uauL/LgNk8GQddHN8o0qcSadpiYO4EhDQ6y9zHdlIRRSbkBm4nxK2uRcNIoQXBgUQm/PdTmIfMyvrMh+em0ostvjltLrbncisdkwght5Svvq9W4b8QxfkESB0SjM3K7dbG5WDSPwlh0kqqv19lFmEG9or3r9AnYcxveSEr09VOF9KMKcev3b58r/BXpJl/m5+tMVXA4vimdn9RZRhV18CAMzM8oNoHqqx5NoVG8RVegV5uEfHVVvwD1e5dXubpTjI/qY9RbaMHV4gQtSokMaZVtPj3IDYifLemubIhFM0QIKAwG9vdbl96D4BG6w1tr6gWzhq+FYTDUcrd049jjh6b/odIqfUvD9lhbkoQ6nq6rwCHkImM3/2peH8BTvk0l6hz04H4lQLj7xWGfnn8FtEdroQcfkpLf3ocWScqUaqTD7X2TtjuHu7l3p9LjbFnZfWlzMdr4ddvhP+QWl0r3J0Z0UIAAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMC0xMS0wM1QyMjoxOToyNSswODowMP7R7McAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjAtMTEtMDNUMjI6MTk6MjUrMDg6MDCPjFR7AAAAR3RFWHRzdmc6YmFzZS11cmkAZmlsZTovLy9ob21lL2FkbWluL2ljb24tZm9udC90bXAvaWNvbl9kaTJkY205bDhlaS90dWxpLnN2Z4TSY5wAAAAASUVORK5CYII=",
								textStyle: {
									color: 'rgba(255, 255, 255, 1)'
								},

							},
						],
					},
					xAxis: {
						// nameGap: 8,
						show: true,
						triggerEvent: true,
						position: "top", //x轴的位置
						offset: 5, // 往上偏移
						splitLine: {
							show: true,
							lineStyle: {
								type: 'solid',
								color: 'rgba(97, 161, 205, 0.3)', //左边线的颜色
							}
						},
						axisLine: {
							show: false,
						},
						axisLabel: {
							show: true,
							color: "#fff"
						},
						type: "value"
					},
					yAxis: {
						show: true,
						type: "category",
						data: this.task.yAxis.reverse(),
						boundaryGap: false,
						axisLabel: {
							clickable: true,
							interval: 0,
							color: "#FFFFFF",
							rotate: 0,
							margin: 12
						},
						splitLine: {
							show: false
						},
						axisLine: {
							show: false
						},
						axisTick: {
							show: false
						}
					},
					series: [{
							name: "空闲车位",
							data: this.task.kongxian,
							stack: '总数',
							type: "bar",
							barWidth: 14,
							itemStyle: {
								normal: {
									barBorderRadius: 25,
									color: new this.$echarts.graphic.LinearGradient(1, 0, 0, 0, [{
											offset: 1,
											color: "#01154F"
										},
										{
											offset: 0,
											color: "#00ffff"
										}
									]),
									label: {
										show: false, // 开启显示
										position: "right", // 在上方显示
										textStyle: {
											// 数值样式
											color: "#26E5FF",
											fontSize: 12
										}
									}
								}
							}
						},
						{
							name: "车位总个数",
							stack: '总数',
							data: this.task.dataAll,
							type: "bar",
							barWidth: 14,
							// barWidth: "7",
							barCategoryGap: "80%",
							itemStyle: {
								normal: {
									barBorderRadius: [0, 25, 25, 0],
									color: new this.$echarts.graphic.LinearGradient(1, 0, 0, 0, [{
											offset: 1,
											color: "#011B53"
										},
										{
											offset: 0,
											color: "#2FD7A7"
										}
									]),
									label: {
										show: false, // 开启显示
										position: "right", // 在上方显示
										textStyle: {
											// 数值样式
											color: "#ffffff",
											fontSize: 16
										}
									}
								}
							}
						},

					]
				});

			},
			initChewei() {
				const mychart = this.$echarts.init(this.$refs.cheweishishi);
				mychart.setOption({
					grid: {
						width: "65%",
						left: "20%",
						// height: "56%",
						// top:'10%',
					},
					legend: {
						icon: "circle",
						itemWidth: 8,
						top: 10,
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

						axisLine: {
							show: false
						},
						axisLabel: {
							show: false
						},
						type: "value"
					},
					yAxis: {
						type: "category",
						data: this.task.yAxis.reverse(),
						boundaryGap: false,
						axisLabel: {
							clickable: true,
							interval: 0,
							color: "#71BDFF",
							rotate: 0,
						},
						splitLine: {
							show: false
						},
						axisLine: {
							show: false
						}
					},
					series: [{
							name: "车位总个数",
							data: this.task.dataAll,
							type: "bar",
							barWidth: 14,
							// barWidth: "7",
							barCategoryGap: "80%",
							itemStyle: {
								normal: {
									barBorderRadius: 5,
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
											fontSize: 16
										}
									}
								}
							}
						},
						{
							name: "空闲车位",
							data: this.task.kongxian,
							type: "bar",
							barWidth: 14,
							itemStyle: {
								normal: {
									barBorderRadius: 5,
									color: new this.$echarts.graphic.LinearGradient(1, 0, 0, 0, [{
											offset: 1,
											color: "#13C2FF"
										},
										{
											offset: 0,
											color: "#26E5FF"
										}
									]),
									label: {
										show: true, // 开启显示
										position: "right", // 在上方显示
										textStyle: {
											// 数值样式
											color: "#26E5FF",
											fontSize: 12
										}
									}
								}
							}
						}
					]
				});
			},
			initZheXian() {
				const that = this;
				const mychart = this.$echarts.init(this.$refs.fangkedengji);
				mychart.setOption({
					grid: {
						left: "15%"
					},
					tooltip: {
						trigger: 'axis',
						backgroundColor: 'RGBA(16, 69, 164, 1)',
						axisPointer: { // 坐标轴指示器，坐标轴触发有效
							type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
						},
						formatter: '<span style ="font-size:12px;color:#01DFF4;">  {b} </span><br/>'+'<hr> {c}人',
						textStyle: {
							color: "#fff",
							fontSize: 12
						}
					},
					legend: {
						show: true,
						right: 20,
						textStyle: {
							color: "rgba(43, 128, 255, 1)"
						},
						name: "登记数",
					},
					color: [
						"#088FF8",
					].reverse(),
					xAxis: {
						type: "category",
						data: this.initPeopleObj.xAxis,
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
						max: 500,
						axisLabel: {
							clickable: true,
							interval: 0,
							formatter: '{value} 人',
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
						data: that.initPeopleObj.data,
						type: "line",
						name: "登记数",
						smooth: false,
						symbol: "circle", //挂点类型
						symbolSize: 8, //拐点大小数
						color: ['#0076BC'], //拐点颜色
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
												offset: 1,
												color: "rgba(0,0,0,0)"
											}
										]
									)
								},
								lineStyle: {
									// 线的颜色
									color: "#2B80FF"
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
			initRenInOutStic() {
				const that = this;
				const mychart = this.$echarts.init(this.$refs.tongjicharts);
				mychart.setOption({
					color: ["#5F45FF", "#02CDFF", "#0090FF"],
					legend: {
						orient: "horizontal",
						top: "6%",
						right: "8%",
						itemWidth: 19,
						itemHeight: 9,
						data: [{
								name: "本月访问次数", // 图例文字内容
								// icon: "roundRect" // 图例图形的形状，有多个可选值：'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'，
								//也可引用自定义的图片
								icon: "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAQEAYAAAAnkKEaAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAAASAAAAEgARslrPgAAAeVJREFUWMPtlk9I02EYxz/Pu/Aw0LpItk6F0KE0QjzpTqYwO3ToENEfRjRIdIM6rPuUQAV3EBRDqhlBYFQHD5EJ/ghyByFjp4EQdBCFggbbwf3Y7+k0D0Ko71g/RD/Hl5fneT/f533hFXYRfdbzQr3OTo1JGzI4qBVZQMNhOaNJpKWFfrkOwSD1JsQ2WirxmiCysaFzjKLLy6akj2Fy8uW1z0ticrla28iOeP/Vs6rxuHbINqTT/OQKBAJ1Fz0o69wB19VmSUAsNvfhU0Ekk7EOYGfiKbmMZLP0yBMwxm/PPQnrLJTLgfyJG9De/nz846pIPn/QMkZXzU1kaOjQiFf5Ig+goaEyVjkHAwO2ZYxOMYZ2d/vtY02U92B/fiN3+YOEQn57WHOLCtif//Bc+X+gbQzX8nSNpuiDrS2/Raz5oQ9hc9M6AGnVdchm/faw5pJMwcqKdQBeUlIwPU2UXlD122ffLOkoeJ6cJAczM9YBvBpf/CXiOPpV78PIiN9ee1Id1Kx0QDKZkcV5kbU123Kye+Heu77zqpGIPNJvkEjQrN+hq4uLMgyNjf/bV9OcgkJBnnIaHMcT3sDERHVwtdaX/W68HY+0qtfUpL/NBaT+X2S3XFxAXXf+rSNiisV69zvmmCPKX4mHp5g/BSUiAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIwLTExLTAzVDIxOjQyOjU3KzA4OjAwV/bPjAAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMC0xMS0wM1QyMTo0Mjo1NyswODowMCardzAAAABFdEVYdHN2ZzpiYXNlLXVyaQBmaWxlOi8vL2hvbWUvYWRtaW4vaWNvbi1mb250L3RtcC9pY29uX3YzeHV5YTVndS90dWxpLnN2Z39aqnAAAAAASUVORK5CYII="
							}, {
								name: "本周访问次数", // 图例文字内容
								// icon: "roundRect" // 图例图形的形状，有多个可选值：'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'，
								//也可引用自定义的图片
								icon: "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAQEAYAAAAnkKEaAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAAASAAAAEgARslrPgAAAcNJREFUWMPtlj9IW1EUh79zn4aqKKGT1UVxa8GiJFscXB26dhdSECPiohCoQ7GdlCBBQjrVToJCqZTiIigUEgX/IQ5SLJSC6ChqwBe8p4NKhyLqfaQPqd90p3PO9zv3whX+YuOz2nhc8voF6e8nwyra1cUvnUEaGylRgtpaKk0dO+jpKS38QPb3eS0f0KUlfWlnIZuFWFzM9nbQNvLnuD6nOjAgVYxDJsO5ToHnVVz0rlRTDeWy+upDMgmxmMj0dIAALjfu2a9IsYjlFRgTtueNRNgC39czuwft7RB/K7K7e9cyRnI2haRS90b8Cp/nEIlIwVuEvj7XMoZJeYwmEmH7OJPWKXCf3/CTKNLUFLaHM99pBvf578+Vvw4rg0GerqFZR+DwMGwPZ1q1Ew4O3APoBSgWw/ZwZoQ8FArOAWjavINcDmENVMP2uf3kvAdr9YXZg3zevQwd30SWlynJUxgbC9vrRi4XpeeahOFh6BCRzc0AAVygjzoTIqOjqvIEenpIsgMLC9RLGo6PQxOOEoWjI4bIwvy8WvMRursvfoATE8HzvDUrbWobGqDmE/IvvsjeG7RchmdzYk5OKt/vgQf+S34DCH2UKHGiUBEAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjAtMTEtMDNUMjI6MDY6MzMrMDg6MDBhLl0uAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIwLTExLTAzVDIyOjA2OjMzKzA4OjAwEHPlkgAAAEZ0RVh0c3ZnOmJhc2UtdXJpAGZpbGU6Ly8vaG9tZS9hZG1pbi9pY29uLWZvbnQvdG1wL2ljb25fejRxMnZvcnlheC90dWxpLnN2ZwXbkIMAAAAASUVORK5CYII="
							},
							{
								name: "今日访问次数",
								icon: "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAQEAYAAAAnkKEaAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAZiS0dEAAAAAAAA+UO7fwAAAAlwSFlzAAAASAAAAEgARslrPgAAAY5JREFUWMPt1r9KXEEUgPHfuQYhgqYVU+QJYgLBSreyiY1NHiCVhaiL2cIitSRpshtisbEU21Q+QHCrvYEUgpVNIEWMVkHQIm7YSZN/IAF3L3qR+FXDMJxzvnNmYMIZXn1J3YkJ0qhYWMCmVKlgVYyOYp6hIRfPXenkBM/F/j5pS9rexjRra9TyyHZ3iyaJP8vGdEpLS/hGo4FHDAxcgmivfKDTIa0wN0ftXsTGRoEG/J54W+Q5PpFlZVueg8ecnhJPGR9n+U3E3l6vQTLSA7G4eIXEf7HB4CCpyfx8v0EyvJCmpsq2KcAt+q8/I6pibKxsiwI8o//6r9KV/xcfizzdjPSVw8OyLQrwkoODAg1QIc/LtuifuE27XaAB6TvNJuqkVLZOD9yh2yV9Zn29QANqeUSrhU1WV8u2Ogc/B5Xes7LCk4jY2ek3WJzdarRTmpkhZqlWSTmTk9hieLgE4WWOjnCfVot0k3r9r8EVIs5/9PXD1B0Z4casuIwvcnondTosvI3s+Pji811zzX/JD052eRgxyPVKAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIwLTExLTAzVDIyOjA4OjMzKzA4OjAwf+dtnQAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMC0xMS0wM1QyMjowODozMyswODowMA661SEAAABIdEVYdHN2ZzpiYXNlLXVyaQBmaWxlOi8vL2hvbWUvYWRtaW4vaWNvbi1mb250L3RtcC9pY29uXzB2ZmZ1cWNsbDdlay90dWxpLnN2Z//09LMAAAAASUVORK5CYII="
							},
						],
						textStyle: {
							color: "rgba(159, 206, 255, 1)"
						},
					},
					grid: {
						width: "80%",
						left: "13.5%"
					},

					tooltip: {
						trigger: "item",
						backgroundColor: "RGBA(16, 69, 164, 1)",
						formatter: function(params) {
							let res = "";
							let titmsg='<span style ="font-size:12px;color:#01DFF4;">' + params.name  + '</span>';
							let dotHtml = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#5F45FF"></span>';
							res = titmsg + "<br/>" + "<div style='width:100%;height:2px;background:#010D34;margin-left:0'></div>"+ dotHtml +'本月访问次数:'+ params.value[1] + "人"+ "<br/>"
							+ dotHtml+'本周访问次数:'+ params.value[2] + "人" + "<br/>" + dotHtml+'今日访问次数:'+ params.value[3] + "人";
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
							["product", "本月访问次数", "本周访问次数", "今日访问次数"]
						].concat(that.RenInOutStic)
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
							margin: 12,
							color: "rgba(1, 223, 244, 1)",
							rotate: 0
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
						// type: "value",
						axisLabel: {
							clickable: true,
							interval: 0,
							formatter: '{value} 次',
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
							name: '本月访问次数',
							itemStyle: {
								barBorderRadius: [20, 20, 20, 20]
							}
						},
						{
							type: "bar",
							barWidth: 13.5,
							name: '本周访问次数',
							itemStyle: {
								barBorderRadius: [20, 20, 20, 20]
							}
						},
						{
							type: "bar",
							barWidth: 13.5,
							name: '今日访问次数',
							barGap: '45%',
							itemStyle: {
								barBorderRadius: [20, 20, 20, 20]
							}
						}
					]
				});
			},
			// 地图改变 ，后函数
			handleChange(communityId) {
				// console.log(communityId);
				this.communityId = communityId;
				this.getData();
			},
			handleGetItem(number) {
				// 点击切换设备 列表
				this.tabItem = number;
			}
		}
	};
</script>
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
<!-- 11111111111111111111111111111111111111111111111111111111111111111111 -->
<style lang="scss" scoped>
	.videTable-box {
		width: 510px;
		height: 289px;
	}

	.renyuanjinchubox {
		width: 768px;
		height: 289px;
		position: absolute;
		top: 642px;
		margin-left: 32px;
		background-image: url('../../assets/background/zhlngjiankuang2@2x.png');
		background-size: 100% 100%;
	}

	.renyuantongjibox {
		width: 768px;
		height: 271px;

		div {
			width: 768px;
			height: 271px;
		}
	}

	.warring-style::-webkit-scrollbar {
		display: none;
	}

	.warring-style {
		width: 471px;
		height: 220px;
		overflow: hidden;
		overflow: scroll;
		margin: 20px 20px 20px 20px;

		ul {
			width: 471px;
			height: 100%;

			li {
				div {
					text-align: lrft;
				}

				display: flex;
				align-items: center;
				justify-content: space-between;
				flex-direction: row;
				flex-wrap: wrap;
				margin-top: 13px;
				width: 471px;
				height: 31px;
				background-image: url('../../assets/background/yujingxiaoxi@2x.png');
				background-size: 100% 100%;

				.warring-icon {
					width: 22px !important;
					height: 22px !important;
					margin-left: 13px;
					background-image: url('../../assets/background/yujing@2x.png');
					background-size: 100% 100% !important;
				}

				.warring-time {
					font-size: 14px;
					font-family: Adobe Heiti Std;
					font-weight: normal;
					color: #FFFFFF;
					margin-left: -32px !important;
					line-height: 28px;
				}

				.warring-messecg {
					font-size: 14px;
					font-family: Adobe Heiti Std;
					font-weight: normal;
					color: #FFFFFF;
					line-height: 28px;
				}

				.warring-form {
					font-size: 14px;
					font-family: Adobe Heiti Std;
					font-weight: normal;
					color: #0786A9;
					line-height: 28px;
				}
			}
		}
	}

	.list-online {
		color: #01DFF4;
	}

	.list-notOnline {
		color: #087096;
	}

	.shebei-liststyleLi::-webkit-scrollbar {
		display: none;
	}

	.shebei-liststyleLi {
		width: 470px;
		height: 170px;
		overflow: hidden;
		overflow: scroll;
		margin: 20px 20px 20px 20px;

		ul {
			width: 470px;
			height: 170px;

			li {
				display: flex;
				align-items: center;
				justify-content: space-between;
				flex-direction: row;
				flex-wrap: wrap;
				margin-top: 9px;
				height: 26px;
				display: flex;
				align-items: center;
				background-image: url('../../assets/background/yujingxiaoxi@2x.png');
				background-size: 100% 100%;

				div {
					text-align: center;
				}

				.list-name {
					flex: 1;
					color: #FFF;
					margin-left: 27px;
					text-align: left !important;
				}

				.list-code {
					flex: 1;
					color: #FFF;
					margin-left: 10px;
					text-align: left !important;
				}

				.list-detail {
					flex: 1;
					color: #FFFFFF;
					margin-left: 35px !important;

				}

				.list-detail-icon {
					width: 18px;
					height: 13px;
					margin-left: 8px;
					margin-right: 4px;
					background-image: url('../../assets/background/chakan@2x.png');
					background-size: 100% 100%;
				}
			}
		}
	}
	.cheweippolo{
		border-radius: 4px 0px 0px 4px;
	}
	#backgroundstyle{
		background-color: rgba(8, 172, 255, 1);
	}
	.chelinagfjd{
		border-radius: 0 4px 4px 0;
	}
.carnumberliststyle{
	position: absolute;
	z-index: 999;
	        border-radius: 4px !important;
			display: flex;
		    margin: 10px 0 0 20px;

		div {
			width: 76px;
			height: 24px;
			color: #F9F9F9;
			background-color: rgba(8, 172, 255, 0.25);
			display: flex;
			justify-content: center;
			align-items: center;

	// 		&:hover {
	// 			background-color: rgba(8, 172, 255, 1);
	// 		}

			&:active {
				background-color: rgba(8, 172, 255, 1);
			}
		}

}
	.shebeibtn-box {
		display: flex;
		margin: 30px 0 0 20px;

		div {
			width: 117px;
			height: 24px;
			margin-left: 7px;
			color: #F9F9F9;
			background-color: rgba(8, 172, 255, 0.25);
			display: flex;
			justify-content: center;
			align-items: center;

			&:hover {
				background-color: rgba(8, 172, 255, 1);
			}

			&::active {
				background-color: rgba(8, 172, 255, 1);
			}
		}
	}

	.shebei-ListBox {
		width: 510px;
		height: 289px;
		margin-top: 32px;
		position: relative;
		margin-left: 1.5px;
		background-image: url('../../assets/background/wuliankuang@2x.png');
		background-size: 100% 100%;
	}

	.warring-BOx {
		margin-top:31px;
		width: 510px;
		height: 289px;
		margin-left: 1.5px;
		position: relative;
		background-image: url('../../assets/background/wuliankuang@2x.png');
		background-size: 100% 100%;
	}

	.video-style {
		width: 510px;
		height: 289px;
		margin-left: 1.5px;
		position: relative;
		background-image: url('../../assets/background/wuliankuang@2x.png');
		background-size: 100% 100%;
	}

	.shebeistyle {
		width: 510px;
		height: 289px;
		margin-top: 2.5px;
		margin-left: -1.5px;
		position: relative;
		background-image: url('../../assets/background/wuliankuang@2x.png');
		background-size: 100% 100%;
	}

	.video-box {
		width: 200px;
		height: 228px;
		margin-top: 12px;
	}

	.mov_viedeo {
		width: 200px;
		height: 150px;
	}

	.video-title {
		margin-top: 5px;
		height: 16px;
		font-size: 16px;
		font-family: Adobe Heiti Std;
		font-weight: normal;
		color: #FFFDEF;
		line-height: 28px;
	}

	.video-code {
		margin-top: 12px;
		height: 14px;
		font-size: 14px;
		font-family: Adobe Heiti Std;
		font-weight: normal;
		color: #01DFF4;
		line-height: 28px;
	}

	.mov_title {
		width: 200px;
		height: 78px;
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

	.cheweibox {
		width: 510px;
		height: 271px;

		div {
			width: 510px;
			height: 271px;
		}
	}

	.fangkebox {
		width: 510px !important;
		height: 271px !important;

		div {
			width: 510px !important;
			height: 271px !important;
		}
	}

	.ringbox {
		width: 100%;
		height: 100%;
		display: flex;

		.shebeicharts {
			width: 118px;
			height: 178px;
			margin-top: 42px;
			margin-left: 37px;
		}
	}

	.cheweistyle {
		width: 510px;
		height: 289px;
		margin-top: 30px;
		margin-left: -1.5px;
		position: relative;
		background-image: url('../../assets/background/wuliankuang@2x.png');
		background-size: 100% 100%;
	}

	.fangkestyle {
		width: 510px;
		height: 289px;
		margin-left: -1.5px;
		margin-top: 30px;
		position: relative;
		background-image: url('../../assets/background/wuliankuang@2x.png');
		background-size: 100% 100%;
	}
</style>
<style lang="scss">
	.tableHeader {
		background-color: rgba(250, 250, 250, 0.1) !important;

		.cell {
			color: #71bdff;
		}
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
		width: 510px;
		/*background: pink;*/
		height: 100%;
		position: relative;
		z-index: 20;

		.sex-ring {
			position: relative;
			height: 24%;
			margin-bottom: 25px;
			width: 100%;
		}

		.left-middle {
			width: 100%;
			position: relative;
			height: 37%;
			margin-bottom: 25px;
		}

		.population-rose {
			width: 100%;
			position: absolute;
			bottom: 45px;
			height: 29%;

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
			margin-left: 32px;
			padding-bottom: -4%;
			box-sizing: border-box;
			padding-bottom: 0.052083rem;
			// background: yellow;
			height: 593px;
			overflow: hidden;
			// left: -5%;
			z-index: 1;
			margin-top: 19px;
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
		left: -2px;
		background: linear-gradient(89deg,
			rgba(47, 128, 241, 0.5) 6%,
			rgba(47, 128, 241, 0) 99%);
	}

	.right {
		width: 510px;
		height: 100%;
		position: relative;
		margin-right: 20px;

		.right-middle {
			width: 100%;
			position: relative;
			height: 16%;
			margin-bottom: 35px;

			.newYuJingWarp {
				width: 422px;
				height: 120px;
			}

			.newYuJing {
				width: 100%;
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);

				.yuJinItem {
					display: flex;
					height: 40px;
					line-height: 40px;
					position: relative;
					justify-content: space-between;

					.yuJinIcon {
						width: 26px;
						height: 28px;
						margin-left: 7px;
						margin-right: 10px;
						display: inline-block;
						position: absolute;
						top: 50%;
						transform: translateY(-50%);
					}

					.yuJinText {
						font-size: 13px;
						text-align: center;

						font-family: Microsoft YaHei, Microsoft YaHei-Regular;
						color: #ffffff;
					}

					.yuJinTime {
						// width: 128px;
						font-weight: 400;
						display: inline-block;
						margin-left: 36px;
					}

					.yuJinType {
						font-weight: 700;
						display: inline-block;
					}

					.yuJinOpention {
						font-size: 13px;
						font-weight: 400;
						font-family: Microsoft YaHei, Microsoft YaHei-Regular;
						text-align: right;
						color: #bad7ff;
						display: inline-block;
					}
				}

				.backgroundOpcity {
					background: rgba(255, 255, 255, 0.1);
				}
			}
		}

		.population-attribute {
			position: relative;
			width: 510px;
			margin-bottom: 30px;
			// max-height: 360px;
			height: 36%;
			display: flex;
			flex-direction: column;
			padding: 0 14px;

			.shipingWarp {
				width: 100%;
				height: 100%;
				position: relative;

				.shipin {
					// position: absolute;
					// left: 48%;
					// transform: translateX(-50%);
					// top: 12%;
					margin: 40px auto 12px 23px;
					width: 360px;
					height: 240px;
					background: pink;


				}

				.textWarp {
					width: 360px;
					margin: 0 auto;

					.jianKongTitle {
						text-align: left;
						font-size: 18px;
						font-family: Microsoft YaHei, Microsoft YaHei-Regular;
						font-weight: 400;
						text-align: left;
						color: #ffffff;
						margin-bottom: 5px;
					}

					.jiankongcode {
						font-size: 16px;
						font-family: Microsoft YaHei, Microsoft YaHei-Regular;
						font-weight: 400;
						text-align: left;
						color: #71bdff;
					}
				}
			}
		}

		// .volunteer-grid-person {
		//   height: 40%;
		//   background: url(./icons/shebei.png) no-repeat center;
		//   background-size: 100% 100%;
		// }

		.volunteer-grid-person {
			position: absolute;
			height: 37.22%;
			width: 100%;

			// bottom: 45px;
			.right-charts-title-top {
				height: 100%;
				width: 100%;

				.shebeiListContent {
					width: 420px;
					height: 304px;
					margin: 0 auto;
					// background: pink;
					overflow: hidden;
					position: relative;

					.shebeiListWarp {
						width: 420px;

						.shebeiListItem {
							display: flex;
							justify-content: space-between;

							.shebeiMsg {
								width: 316px;
								height: 40px;
								background: rgba(99, 134, 185, 0.3);
								border: 1px solid rgba(99, 134, 185, 0.5);
								display: flex;
								position: relative;
								line-height: 40px;

								.shebeiIcon {
									width: 14px;
									height: 14px;
									border-radius: 2px;
									margin: 13px;
									display: inline-block;
								}

								.shebeiItemText {
									font-size: 13px;
									font-family: Microsoft YaHei, Microsoft YaHei-Regular;
									font-weight: 400;
									text-align: left;
									color: #ffffff;
									margin-right: 10px;
									margin-left: 10px;
									display: inline-block;
								}

								.online {
									font-size: 13px;
									font-family: Microsoft YaHei, Microsoft YaHei-Regular;
									font-weight: 400;
									font-style: normal;
									text-align: right;
									color: #26e5ff;
									line-height: 40px;
									display: inline-block;
									position: absolute;
									right: 20px;
								}

								.notOnline {
									font-size: 13px;
									font-family: Microsoft YaHei, Microsoft YaHei-Regular;
									font-weight: 400;
									font-style: normal;
									text-align: right;
									line-height: 40px;
									color: rgba(121, 145, 181, 1);
									display: inline-block;
									position: absolute;
									right: 20px;
								}
							}

							.shebeiDetails {
								width: 100px;
								height: 40px;
								background: rgba(99, 134, 185, 0.3);
								border: 1px solid rgba(99, 134, 185, 0.5);
								display: flex;
								justify-content: center;

								i {
									font-style: normal;
									line-height: 40px;
									font-size: 13px;
									font-family: Microsoft YaHei, Microsoft YaHei-Regular;
									font-weight: 400;
									text-align: center;
									color: #bad7ff;
									margin-right: 5px;
								}
							}
						}
					}
				}

				.shebeiListTab {
					margin: 23px auto;
					width: 272px;
					height: 32px;
					border: #71bdff 1px solid;
					position: relative;

					.tabItemIsActive {
						position: absolute;
						top: -5px;
						left: -10px;
						width: 113px;
						height: 41px;
						background: url(./icons/dq_y.svg);
						font-size: 14px;
						line-height: 41px;
						font-family: Microsoft YaHei, Microsoft YaHei-Bold;
						font-weight: 700;
						text-align: center;
						color: #ffffff;
						text-align: center;
						line-height: 42px;
						text-shadow: 0px 0px 8px #ffcc00;

						&:hover {}
					}

					.tabItemIsActive1 {
						position: absolute;
						top: -5px;
						left: 31%;
						width: 113px;
						height: 41px;
						background: url(./icons/dq_y.svg);
						font-size: 14px;
						line-height: 41px;
						font-family: Microsoft YaHei, Microsoft YaHei-Bold;
						font-weight: 700;
						text-align: center;
						color: #ffffff;
						line-height: 42px;
						text-shadow: 0px 0px 8px #ffcc00;

						&::after {
							content: "";
							position: absolute;
							display: none;
							height: 60%;
							top: 20%;
							border-left: #71bdff 1px solid;
							right: -1px;
						}

						&:hover {}
					}

					.tabItemIsActive2 {
						position: absolute;
						top: -5px;
						left: 64%;
						width: 113px;
						height: 41px;
						background: url(./icons/dq_y.svg);
						font-size: 14px;
						line-height: 41px;
						font-family: Microsoft YaHei, Microsoft YaHei-Bold;
						font-weight: 700;
						text-align: center;
						color: #ffffff;
						line-height: 42px;
						text-shadow: 0px 0px 8px #ffcc00;
					}

					.tabitem {
						position: absolute;
						width: 90px;
						left: 0%;
						height: 32px;
						float: left;
						color: rgba(113, 189, 255, 1);
						line-height: 32px;
						text-align: center;
						cursor: pointer;

						&:hover {
							position: absolute;
							top: -5px;
							left: -10px;
							width: 113px;
							height: 41px;
							background: url(./icons/dq_y.svg);
							font-size: 14px;
							line-height: 41px;
							font-family: Microsoft YaHei, Microsoft YaHei-Bold;
							font-weight: 700;
							text-align: center;
							color: #ffffff;
							text-align: center;
							line-height: 42px;
							text-shadow: 0px 0px 8px #ffcc00;

							&::after {
								content: "";
								position: absolute;
								display: none;
								height: 60%;
								top: 20%;
								border-left: #71bdff 1px solid;
								right: -1px;
							}
						}
					}

					.tabitem1 {
						position: absolute;
						width: 90px;
						height: 32px;
						left: 33%;
						float: left;
						color: rgba(113, 189, 255, 1);
						line-height: 32px;
						text-align: center;
						cursor: pointer;

						&:hover {
							position: absolute;
							top: -5px;
							left: 31%;
							width: 113px;
							height: 41px;
							background: url(./icons/dq_y.svg);
							font-size: 14px;
							line-height: 41px;
							font-family: Microsoft YaHei, Microsoft YaHei-Bold;
							font-weight: 700;
							text-align: center;
							color: #ffffff;
							line-height: 42px;
							text-shadow: 0px 0px 8px #ffcc00;

							&::after {
								content: "";
								position: absolute;
								display: none;
								height: 60%;
								top: 20%;
								border-left: #71bdff 1px solid;
								right: -1px;
							}
						}
					}

					.tabitem2 {
						position: absolute;
						width: 90px;
						height: 32px;
						left: 66%;
						float: left;
						color: rgba(113, 189, 255, 1);
						line-height: 32px;
						text-align: center;
						cursor: pointer;

						&:hover {
							position: absolute;
							top: -5px;
							left: 64%;
							width: 113px;
							height: 41px;
							background: url(./icons/dq_y.svg);
							font-size: 14px;
							line-height: 41px;
							font-family: Microsoft YaHei, Microsoft YaHei-Bold;
							font-weight: 700;
							text-align: center;
							color: #ffffff;
							line-height: 42px;
							text-shadow: 0px 0px 8px #ffcc00;
						}
					}

					.borderRight {
						&::after {
							content: "";
							position: absolute;
							height: 60%;
							top: 20%;
							border-left: #71bdff 1px solid;
							right: -1px;
						}
					}
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

		.ringWarp {
			position: absolute;
			width: 360px;
			height: 133px;
			padding: 11.5px 0;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			display: flex;
			justify-content: space-between;


		}
	}

	.ring {
		height: 118px;
		width: 118px;
		position: relative;
	}

	.ringTitle {
		width: 118px;
		height: 30px;
		margin-top: 24px;
		background-image: url("../../assets/background/cheweishebei.png");
		background-size: 100% 100%;
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 13px;
		font-family: Adobe Heiti Std;
		font-weight: normal;
		color: #FFF;
		z-index: 20;
		line-height: 25px;
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

			// border-bottom: #ccc 1px;
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

	.cheweishishi {
		height: 100%;
		// margin-top: 10%;
	}

	::v-deep .video-js .vjs-big-play-button {
		background: url("../../assets/background/bofang@2x.png") repeat !important;
		width: 40px !important;
		background-size: 100% 100% !important;
		position: absolute !important;
		top: 40% !important;
		left: 40% !important;
		border: none !important;
		height: 40px !important;
	}

	::v-deep .video-js .vjs-icon-placeholder {
		display: none !important;
	}
	.carTabstyle{
        border-radius: 4px;
		display: flex;
		justify-content: center;
		position: absolute;
		top:0;
		left:0;
		margin-top: 26px;
		margin-left: 16px;

	}
	.carTabstylebox{
		background-color: #2D80CC;
	}
	.carTabsboxone{
		width: 60px;
		height: 24px;
		border-radius: 4px 0 0 4px;
		background: #2D80CC;
		color: #fff;
		display:flex;
		justify-content: center;
		font-size: 14px;
	}

	.carTabsboxtwo{
		width: 60px;
		height: 24px;
		display:flex;
		justify-content: center;
		border-radius: 0 4px 4px 0;
		background: #2D80CC;
		color: #fff;
		font-size: 14px;
	}
	.carTabsbox .is-active{

		background:#033B6F;

	}
</style>
