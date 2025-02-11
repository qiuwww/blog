<template>
	<div class="mapboxstyle">
		<div class="w100 h100 " ref="base3d111"></div>
	</div>

</template>

<script>
import echartsGl from "echarts-gl";
import {getmap} from "@/api/utils";
import geoJson from "@/mapData.json";
import {queryAllList} from "@/api/zhsq/basicGrids/basicGrids";

export default {
  data() {
    return {
      data: {
        type: "FeatureCollection",
        features: []
      },
      theItem: "", // 当前选中的地图 名称
      myChart: {},
      map: null,
      texts:[],
    };
  },
  created() {
    // this.getData();
  },
  async mounted() {

    this.initMap();
    await this.getData();
  },

  methods: {
    async getData() {
      if (this.map) {
        this.texts = [];
        const {data} = await queryAllList({});
        data.map(i => {
          let path = [];
          // console.log(i)
          if (i.position) {
            let arr = JSON.parse(i.position);
            let arrNew = [];
            for (let j = 0; j < arr.length; j += 2) {
              let Lng = new AMap.LngLat(arr[j], arr[j + 1]);
              path.push(Lng);
            }

            let that = this;
            AMap.convertFrom(path, 'gps', function (status, result) {
              if (result.info === 'ok') {
                path = result.locations; // Array.<LngLat>
                // console.log([[arrNew]]);
                var polygon = new AMap.Polygon({
                  path: path,
                  fillColor: 'rgba(69,132,237,0.4)', // 多边形填充颜色
                  borderWeight: 2, // 线条宽度，默认为 1
                  strokeColor: 'rgb(69,132,237)', // 线条颜色
                });
                that.map.add(polygon);
                let PathP = polygon.getPath()
                for (let p in PathP) {
                  let point = PathP[p];
                  if (point) {
                    if(point.lng && point.lat){
                      arrNew.push([point.lng, point.lat]);
                    }
                  }
                }
                arrNew.push(arrNew[0]);
                if(arrNew.length>=4){
                  let turfPolygon = turf.polygon([arrNew]);
                  let center = turf.centerOfMass(turfPolygon);
                  let visible = true;
                  let zoom = that.map.getZoom();
                  if(zoom>14){
                    visible = true;
                  }
                  else {
                    visible = false;
                  }
                  // 创建纯文本标记
                  let text = new AMap.Text({
                    text: i.name,
                    anchor: 'center', // 设置文本标记锚点
                    cursor: 'pointer',
                    visible:visible,
                    style: {
                      'padding': '.75rem 1.25rem',
                      'margin-bottom': '1rem',
                      'border-radius': '.25rem',
                      'background-color': 'rgb(255,255,255,0)',
                      'width': '15rem',
                      'border-width': 0,
                      'text-align': 'center',
                      'font-size': '10px',
                      'color': 'rgb(255,255,255)',
                    },
                    position: center.geometry.coordinates
                  });
                  text.setMap(that.map);
                  that.texts.push(text);
                }
              }
            });
          }
        });
      }

    },
    onClick(params) {
      console.log(params);
      this.theItem = params.name;
      this.initMap();

    },
    initMap() {
      this.map = new AMap.Map(this.$refs.base3d111, {
        mapStyle: 'amap://styles/6790e7df96daba8a8bf28061f0862191', //设置地图的显示样式
        zoom: 16,//层级
        center: new AMap.LngLat( 105.363867, 28.75983),//青岛120.392609, 36.127108
      });
      let that = this;
      this.map .on('zoomend', function(ev) {
        let zoom = that.map.getZoom();
        let visible = true;
        if(zoom>14){
          visible = true;
        }
        else {
          visible = false;
        }
        for(let i=0;i< that.texts.length;i++){
          if(that.texts[i]){
            if(visible){
              that.texts[i].show();
            }
            else{
              that.texts[i].hide();
            }
          }
        }
      });
      // 设置图表实例的配置项以及数据，万能接口，所有参数和数据的修改都可以通过setOption完成，ECharts 会合并新的参数和数据，然后刷新图表。
      // that.myChart.setOption(option);
      // that.myChart.on("click", params => {
      //   that.onClick(params);
      // });
    }
  }
};
</script>

<style lang="scss" scoped>
	.mapboxstyle{
		width: 100%;
		height: 100%;
		overflow: hidden;
		background-image: url("../../assets/background/ditukuang.png");
		background-size: 100% 100%;
	}
  .mapboxstyle .amap-container{
    height: 100%;
  }
</style>
