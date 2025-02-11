<template>
	<div class="mapboxstyle">
		<div class="w100 h100" ref="party3d"></div>
	</div>

</template>

<script>
import echartsGl from "echarts-gl";
import { getmap } from "@/api/utils";
import geoJson from "@/mapData.json";
import { queryAllList } from "@/api/zhsq/basicGrids/basicGrids";

export default {
  data() {
    return {
      data: {
        type: "FeatureCollection",
        features: []
      },
    map:null,
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
        const {data} = await queryAllList({});
        // ;
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
                    arrNew.push([point.lng, point.lat]);
                  }
                }
                let turfPolygon = turf.polygon([arrNew]);
                let center = turf.centerOfMass(turfPolygon);
                // 创建纯文本标记
                let text = new AMap.Text({
                  text: i.name,
                  anchor: 'center', // 设置文本标记锚点
                  cursor: 'pointer',
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
              }
            });
          }
        });
      }
    },
    onClick(params) {
      console.log(params);
    },
    initMap() {
      this. map = new AMap.Map(this.$refs.party3d,{
        mapStyle: 'amap://styles/6790e7df96daba8a8bf28061f0862191', //设置地图的显示样式
        zoom:16,//层级
        center: new AMap.LngLat( 105.363867, 28.75983),//青岛120.392609, 36.127108
      });
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
</style>
