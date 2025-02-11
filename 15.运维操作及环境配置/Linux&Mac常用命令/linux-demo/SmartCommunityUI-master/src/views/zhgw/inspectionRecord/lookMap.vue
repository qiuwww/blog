<template>
  <Modal v-model="show" :title="mapTitle"  :mask-closable="false" width="1000px" class="lookMap">
    <!--地图-->
    <div id="arcgisMap" class="map"></div>
    <div slot="footer">
      <Button type="text" @click="show=false">取消</Button>
    </div>
  </Modal>
</template>

<script>
  import { loadModules } from 'esri-loader';

  const options = {
    // 可以使用自定义资源加载,arcgis 官网加载太慢了,经常加载失败.后面会讲到自己本地如何配置资源
    url: 'http://139.129.103.13:8013/arcgis_js_api/library/4.16/init.js',
    //url: 'http://192.168.1.3:8088/library/4.16/init.js',
    css: true
  };

  export default {
    name: "lookMap",
    props: {
      value: {
        type: Boolean,
        default: false
      },
      modalTitle: {
        type: String
      }
    },
    data(){
      return{
        view:null,
        show:this.value,
        mapTitle:this.modalTitle,
        mapData:null,
      }
    },
    methods:{
      closeModal(val) {
        this.$emit('input', val);
      },
      loadModules(){
        let spatialReference = {
          wkid: 4326
        };
        // lazy load the required ArcGIS API for JavaScript modules and CSS
        loadModules(['esri/Map',
          'esri/views/MapView',
          "esri/layers/WebTileLayer",
          "esri/Basemap",
          "esri/layers/GeoJSONLayer"], options)//{ css: true }
          .then(([Map, MapView,WebTileLayer,Basemap,GeoJSONLayer]) => {

            const mapBaseLayer = new WebTileLayer({
              urlTemplate: "http://{subDomain}.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILECOL={col}&TILEROW={row}&TILEMATRIX={level}&tk=8bc8ba83cc36ea2049915ab81bd0cb6f",
              subDomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
              copyright: '天地图'
            });

            const anoBaseLayer = new WebTileLayer({
              urlTemplate: "http://{subDomain}.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILECOL={col}&TILEROW={row}&TILEMATRIX={level}&tk=8bc8ba83cc36ea2049915ab81bd0cb6f",
              subDomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
              copyright: '天地图注记'
            });

            const imgBasemap = new Basemap({
              baseLayers: [mapBaseLayer,anoBaseLayer],
              title: "影像图",
              id: "img_w",
              spatialReference: spatialReference
            });

            const template = {
              title: "Earthquake Info",
              content: "Magnitude {mag} {type} hit {place} on {time}",
              fieldInfos: [
                {
                  fieldName: "time",
                  format: {
                    dateFormat: "short-date-short-time"
                  }
                }
              ]
            };

            const  geoJsonLayer = new GeoJSONLayer({
              // url: this.mapData
              url:'Warehous/测试3.json',
              // url:'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson',
              // copyright: "USGS Earthquakes",
              // popupTemplate: template,
              // renderer: renderer //optional
            });
            // map.add(geoJSONLayer);  // adds the layer to the map

            const map = new Map({
              // basemap: 'topo-vector'
              basemap: imgBasemap,
              layers: [geoJsonLayer]
            });

            this.view = new MapView({
              container: "arcgisMap",
              map: map,
              center: [105.437583, 28.875387],
              zoom: 17
            });
          });
      }
    },
    watch:{
      value(val) {
        this.show = val;
      },
      show(val) {
        if (val){
          this.mapTitle = this.modalTitle;
          this.loadModules();
        }else{
          if (this.view != null){
            this.view.destroy();
          }
          this.closeModal(val);
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .lookMap{
    .map{
      width: 100%;
      height: 500px;
    }
  }
</style>
