<template>
  <div id="layermanage" style="margin-left: 10px;"></div>
</template>
<script>
import { mapConfig } from "./config";
export default {
  data() {
    return {};
  },
  methods: {
    layermanageInit() {
      //基础图层初始化
      var html = "<div style='width:252px;'>";
      for (let i = 0; i < mapConfig.baselayers2.length; i++) {
        var baselayers = mapConfig.baselayers2[i];
        var toolHtml = "";
        toolHtml =
          ' <div onclick="layeraddtest(' +
          i +
          ')" class="chart" style="height: 125px;width: 126px;"><h5  style="font-size: 1rem;">' +
          baselayers.name +
          "</h5>" +
          '<img src="' +
          "/static/img/11_online_tdt_only.e6ce5755.jpg" +
          '" onerror="imgerrorfun();" class="chart-area" style="display: inline;height: 91.89px;width: 113.89px;"/></div>';
        html += toolHtml;
      }
      html += "</div>";
      document.getElementById("layermanage").innerHTML = html;
    }
    //   for (var i in mapConfig.baselayers) {

    // }
  },
  mounted() {
    this.layermanageInit();
  }
};
</script>>
