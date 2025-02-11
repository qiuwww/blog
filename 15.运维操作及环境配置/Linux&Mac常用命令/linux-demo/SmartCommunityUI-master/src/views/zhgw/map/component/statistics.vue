<template>
  <Modal v-model="modalShow" draggable  title="分类统计" :mask-closable="false" :mask="false" class="statisticspage" width="570" @on-cancel="cancelModal">
    <Form :label-width="80">
      <FormItem label="选择条件">
	<Row>
		<Col span="8">
        <Select @on-change="layerliston" v-model="searchForm.url">
          <Option v-for="(item, i)  in layerlist" :value="item.id" :key="item.id">{{ item.value }}</Option>
        </Select>
		 </Col>
		<Col span="8">
			<Select @on-change="childrenliston" v-model="searchForm.layer">
			  <Option v-for="(item, i)  in childrenlist" :value="item.id" :key="item.id">{{ item.value }}</Option>
			</Select>
		</Col>
		<Col span="6">
			<Select @on-select="showliston" v-model="searchForm.fields">
			  <Option v-for="(item, i)  in showlist" :value="item.value" :key="item.value">{{ item.value }}</Option>
			</Select>
		</Col>
	</Row>
      </FormItem>
    </Form>
    <div style="height: 20px;"></div>
    <Tabs v-show="Tabsshow">
      <TabPane  label="表格">
	    <Table width="534" border :columns="tabList.content" :data="tabList.data"></Table>
	  </TabPane>
	  <TabPane  label="图表">
	  	<div  id="eacherstatistics" style="height: 534px;width: 534px;" />
	  </TabPane>
    </Tabs>
  </Modal>
</template>

<script>
  import { loadModules } from 'esri-loader';
  import { statisticsConfig,strstatistics } from '@/api/zhgw/pointclickconfig';
  import echarts from 'echarts'

  export default {
    name: "statistics",
	props: {
	    value: {
	        type: Boolean,
	        default: false,
	    }
	},
    data() {
      return {
		modalShow:this.value,
        layerlist: statisticsConfig.layer,
        childrenlist: [],
		showlist:[],
        searchForm: {
			url: "",
			layer:"",
			fields:"",
		},
		statisticsForm:[],
		Tabsshow:false,
        tabList: {
			content: [],
			data:[],
		}
      }
    },
    methods: {
		//图层选择
      layerliston(evt) {
        if (evt) {
          this.childrenlist = statisticsConfig.layer[evt - 1].layer
		  this.searchForm.layer=""
		  this.searchForm.fields=""
		  this.showlist=[]
		  this.tabList={
		  	content: [],
		  	data:[],
		  }
		  this.Tabsshow=false
        }
      },
	  //子图层选择
      childrenliston(evt) {
        if (evt) {
		   this.statisticsForm = this.childrenlist[evt - 1]
		   this.showlist=[]
		   this.tabList={
		   	content: [],
		   	data:[],
		   }
		   this.Tabsshow=false
		   this.searchForm.fields=""
		   this.childrenlist[evt - 1].statistics.forEach(elements => {
			   var list={value:elements[0]}
			   this.showlist.push(list)
		   })
		   //this.statistics()
        }
      },
	  //切换展示
      showliston(evt) {
		  this.tabList={
		  	content: [],
		  	data:[],
		  }
		 this.statistics(evt.value)
		 this.Tabsshow=true
      },
      //统计
      statistics(evt) {
        let _this = this;
        //定义查询对象
        var queryTask = new this.$parent.$parent.QueryTask(this.statisticsForm.url);
        //定义查询参数对象
        var query = new this.$parent.$parent.Query();
        //查询条件，类似于sql语句的where子句
        query.where = "1 = 1";
        //返回的字段信息：*代表返回全部字段
        query.outFields = [evt];
        //是否返回几何形状
        query.returnGeometry = false;
        //执行属性查询
        queryTask.execute(query).then(function (results) {
          if (results) {
			_this.statisticsForm.statistics.forEach(element => {
				if(evt!=element[0]){
					return
				}
				var res = []
				var arr=strstatistics(results,element)
				var name={
					title: element[0],
					key: element[0],
					width: 265,
				}
				res.push(name);
				var name2={
					title: element[1],
					key: element[1],
					width: 265,
				}
				res.push(name2);
				var ary = {
					label: element[0],
					name: element[0],
					content: res,
					data:arr[0],
				}
				_this.tabList=ary;
				_this.eachersetoption(element[0],arr[1])
			})
			// list.forEach(element => {
			// 		if(element[1]=="数量"){

			// 		}
			// 	});
			// results.fields.forEach(element => {
			// 	if(element.type=="string"){
			// 	var ary=[]
			// 	var columns=[]
			// 	var echarscolumns=[]
			// 	results.features.forEach(elements => {
			// 		if(elements.attributes[element.alias]){
			// 			ary.push(elements.attributes[element.alias])
			// 		}else{
			// 			ary.push("空值")
			// 		}
			// 	})
			// 	var res = []
			// 	ary.sort()
			// 	for(var i = 0;i<ary.length;)
			// 	{
			// 	 var count = 0;
			// 	 for(var j=i;j<ary.length;j++)
			// 	 {

			// 	  if(ary[i] == ary[j])
			// 	  {
			// 	   count++;
			// 	  }

			// 	 }
			// 	 var tableinfo={
			// 		 [element.alias]: ary[i],
			// 		 数量: count,
			// 	 }
			// 	 var eacharinfo={
			// 	 	value: count,
			// 		name: ary[i],
			// 	 }
			// 	 echarscolumns.push(eacharinfo);
			// 	 columns.push(tableinfo);
			// 	 //[ary[i],count]
			// 	 i+=count;
			// 	}
			// 	var name={
			// 		title: element.alias,
			// 		key: element.alias,
			// 		width: 265,
			// 	}
			// 	res.push(name);
			// 	var name2={
			// 		title: "数量",
			// 		key: "数量",
			// 		width: 265,
			// 	}
			// 	res.push(name2);
			// 	}
			// 	var ary = {
			// 	  label: element.alias,
			// 	  name: element.alias,
			// 	  content: res,
			// 	  data:columns,
			// 	}
			// 	_this.tabList.push(ary);
			// 	_this.eachersetoption(element.alias,echarscolumns)
			// })
          }
        });
      },
	  cancelModal(){
		  this.$parent.statisticsShow = false;
	  },
	  //eachers图表激活和赋值
	  eachersetoption(name,columns){
		  this.$nextTick(function(){
		    /*现在数据已经渲染完毕*/
			let myChart = echarts.init(document.getElementById(`eacherstatistics`));
			myChart.setOption({
			     tooltip: {
			       trigger: 'item',
			       formatter: '{a} <br/>{b}: {c} ({d}%)'
			     },
			     series: [{
			       name: name,
			       type: 'pie',
			       radius: ['35%', '55%'],
			       avoidLabelOverlap: false,
			       label: {
			         show: true,
			         formatter: '{b}:{d}%',
			         fontSize: '15'
			       },
			       data: columns
			     }],
			     color: [
			       'rgba(255, 127, 39,1)',
			       'rgba(31, 132, 239,1)'
			     ],
			     itemStyle: {
			       borderWidth: 5,
			       borderColor: 'rgba(255, 255, 255, 1)'
			     }
			   });
		  })
	  }
    },
    mounted() {
    },
	watch: {
	    value(val) {
	        this.modalShow = val;
			this.searchForm={
				url: "",
				layer:"",
				fields:"",
			}
			this.statisticsForm=[]
			this.childrenlist=[]
			this.Tabsshow=false
			this.showlist=[]
			this.tabList={
				content: [],
				data:[],
			}
	    },
	},

  }
</script>

<style lang="less">
  .statisticspage {
    .ivu-modal-no-mask

  {
    z-index: 10 !important;
  }

  .ivu-modal {
    position: absolute;
    top: 125px ;
    left: 15px ;
  }

  .ivu-modal-footer {
    display: none;
  }

  .ivu-modal-content {
    color: #FFFFFF;
    background-color: rgba(30, 36, 50, 0.6);
    border: 1px solid rgba(32, 160, 255, 0.6);
    border-radius: 5px !important;
  }

  .ivu-modal-header-inner {
    color: #FFFFFF;
  }

  .ivu-select-placeholder {
    background-color: #74787d !important;
    color: #fff !important;
  }

  .ivu-select-selected-value {
    background-color: #74787d !important;
    color: #fff !important;
  }

  .ivu-tabs-nav {
    color: white;
  }

  .ivu-tabs-tab-active {
    color: #fff !important;
  }

  .ivu-form-item-label {
    color: #fff !important;
  }
  .ivu-tabs-tabpane {
    color: white;
  }
  .ivu-table td{
    background-color:rgba(30, 36, 50, 0.6);
    color: #fff;
   }
   .ivu-table th {
      background-color:rgba(30, 36, 50, 0.6);
      color: #fff;
   }
  }
</style>
