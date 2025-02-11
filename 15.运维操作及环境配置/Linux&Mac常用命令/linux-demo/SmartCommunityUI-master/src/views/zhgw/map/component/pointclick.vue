<template>

</template>

<script>
  import { loadModules } from 'esri-loader';
  import {PointConfig} from '@/api/zhgw/pointclickconfig';
  export default {
    name: "pointclick",
    data() {
      return {
        soilURL: [],
      }
    },
    methods: {
      //点选查询
      seachlayer() {
        loadModules(["esri/Map",
          "esri/views/MapView",
          "esri/layers/TileLayer",
          "esri/tasks/IdentifyTask",
          "esri/tasks/support/IdentifyParameters"])
          .then(([Map, MapView, TileLayer, IdentifyTask, IdentifyParameters]) => {
            var identifyTask, params;
            // URL to the map service where the identify will be performed
            var view = this.$parent.view
            var _this = this;
            view.when(function () {
              view.on("click", executeIdentifyTask);
            });

            // Executes each time the view is clicked
            function executeIdentifyTask(event) {
              if (!_this.$parent.pointclickShow) {
                return
              }             
              var soilURL = "http://192.168.1.200:6080/arcgis/rest/services/WSGK/MapServer";
              identifyTask = new IdentifyTask(soilURL);
              params = new IdentifyParameters();
              params.width = view.width;
              params.tolerance = 10;
              params.returnGeometry = true;
              params.layerOption = IdentifyParameters.LAYER_OPTION_ALL;
              //params.layerIds = 1;
              params.height = view.height;
              params.geometry = event.mapPoint;
              params.mapExtent = view.extent;
              document.getElementById("arcgisMap").style.cursor = "wait";
              identifyTask
                .execute(params)
                .then(function (response) {
                  var results = response.results;
                  return results.map(function (result) {
                    var feature = result.feature;
                    var content = "<div style='float:left;width:400px;'>";
                    var title ="";
                    //  feature.attributes.forEach(element => {
                    // 	console.log(element)
                    // 	content +="<b>:</b>"+element;
                    // })
                    var objkey = Object.keys(feature.attributes)
                    for (var i = 0; i < objkey.length; i++) {
                      // if(i==0){
                      // 	content +="<b>"+objkey[i]+":</b>"+feature.attributes[objkey[i]];
                      // }else{
                      // 	content +="<br><b>"+objkey[i]+":</b>"+feature.attributes[objkey[i]];
                      // }
					  if(objkey[i]=="物探点号"){
						  title +=objkey[i] + ":"+feature.attributes[objkey[i]]
					  }
                      content += "<span style='width:100%;display:flex;'><span style='text-align: end;width: 24%;padding: 5px;'>" + objkey[i] + "：</span><span style='flex:1;word-break: break-all;padding: 5px;border:1px solid #000000;width: 76%;'>" + feature.attributes[objkey[i]] + "</span></span><br/>";
                    }
                    content += "</div>";
                    feature.popupTemplate = {
                      // autocasts as new PopupTemplate()
                      title: title,
                      content: content
                    };
                    return feature;
                  });
                })
                .then(showPopup);
              function showPopup(response) {
                if (response.length > 0) {
                  view.popup.open({
                    features: response,
                    location: event.mapPoint
                  });
                }
                document.getElementById("arcgisMap").style.cursor = "auto";
              }
            }

          });
      },
    },
    mounted() {		
    },
  }
</script>

<style lang="less">
</style>
