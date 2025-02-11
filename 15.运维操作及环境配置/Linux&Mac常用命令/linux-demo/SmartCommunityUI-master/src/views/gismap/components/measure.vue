<template>
  <div>
    <form class="form-inline">
      <label>Measurement type &nbsp;</label>
      <select id="type">
        <option value="length">Length (LineString)</option>
        <option value="area">Area (Polygon)</option>
      </select>
    </form>
  </div>
</template>
<script>
import "ol/ol.css";
import Map from "ol/Map";
import { unByKey } from "ol/Observable";
import Overlay from "ol/Overlay";
import { getCenter } from "ol/extent";
import { getArea, getLength } from "ol/sphere";
import View from "ol/View";
import { LineString, Polygon } from "ol/geom";
import Draw from "ol/interaction/Draw";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { OSM, Vector as VectorSource, XYZ } from "ol/source";
import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style";

export default {
  data() {
    return {};
  },
  methods: {
  },
  mounted() {
    var source=this.$parent.source;
    var vector=this.$parent.vector;
    var map = this.$parent.map;
    map.addLayer(vector);
    var raster = new TileLayer({
      source: new XYZ({
        url:
          "http://t1.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=8bc8ba83cc36ea2049915ab81bd0cb6f"
      })
    });
    var sketch;
    var helpTooltipElement;
    var helpTooltip;
    var measureTooltipElement;
    var measureTooltip;
    var continuePolygonMsg = "Click to continue drawing the polygon";
    var continueLineMsg = "Click to continue drawing the line";

    /**
     * Handle pointer move.
     * @param {import("../src/ol/MapBrowserEvent").default} evt The event.
     */
    var pointerMoveHandler = function(evt) {
      if (evt.dragging) {
        return;
      }
      /** @type {string} */
      var helpMsg = "Click to start drawing";

      if (sketch) {
        var geom = sketch.getGeometry();
        if (geom instanceof Polygon) {
          helpMsg = continuePolygonMsg;
        } else if (geom instanceof LineString) {
          helpMsg = continueLineMsg;
        }
      }

      helpTooltipElement.innerHTML = helpMsg;
      helpTooltip.setPosition(evt.coordinate);

      helpTooltipElement.classList.remove("hidden");
    };
    //var mapExtent = this.$parent.map.getView().calculateExtent(this.$parent.map.getSize())
    //var map_center = getCenter(mapExtent)
    // var map = new Map({
    //   layers: [raster, vector],
    //   target: "map",
    //   view: new View({
    //     center: map_center,
    //     zoom: 15
    //   })
    // });

    map.on("pointermove", pointerMoveHandler);

    map.getViewport().addEventListener("mouseout", function() {
      helpTooltipElement.classList.add("hidden");
    });

    var typeSelect = document.getElementById("type");

    var draw; // global so we can remove it later

    /**
     * Format length output.
     * @param {LineString} line The line.
     * @return {string} The formatted length.
     */
    var formatLength = function(line) {
      var length = getLength(line,{projection: "EPSG:4326"});
      var output;
      if (length > 100) {
        output = Math.round((length / 1000) * 100) / 100 + " " + "km";
      } else {
        output = Math.round(length * 100) / 100 + " " + "m";
      }
      return output;
    };

    /**
     * Format area output.
     * @param {Polygon} polygon The polygon.
     * @return {string} Formatted area.
     */
    var formatArea = function(polygon) {
      var area = getArea(polygon,{projection: "EPSG:4326"});
      var output;
      if (area > 10000) {
        output =
          Math.round((area / 1000000) * 100) / 100 + " " + "km<sup>2</sup>";
      } else {
        output = Math.round(area * 100) / 100 + " " + "m<sup>2</sup>";
      }
      return output;
    };

    function addInteraction() {
      var type = typeSelect.value == "area" ? "Polygon" : "LineString";
      draw = new Draw({
        source: source,
        type: type,
        style: new Style({
          fill: new Fill({
            color: "rgba(255, 255, 255, 0.2)"
          }),
          stroke: new Stroke({
            color: "rgba(0, 0, 0, 0.5)",
            lineDash: [10, 10],
            width: 2
          }),
          image: new CircleStyle({
            radius: 5,
            stroke: new Stroke({
              color: "rgba(0, 0, 0, 0.7)"
            }),
            fill: new Fill({
              color: "rgba(255, 255, 255, 0.2)"
            })
          })
        })
      });
      map.addInteraction(draw);

      createMeasureTooltip();
      createHelpTooltip();

      var listener;
      draw.on("drawstart", function(evt) {
        // set sketch
        sketch = evt.feature;

        /** @type {import("../src/ol/coordinate.js").Coordinate|undefined} */
        var tooltipCoord = evt.coordinate;

        listener = sketch.getGeometry().on("change", function(evt) {
          var geom = evt.target;
          var output;
          if (geom instanceof Polygon) {
            output = formatArea(geom);
            tooltipCoord = geom.getInteriorPoint().getCoordinates();
          } else if (geom instanceof LineString) {
            output = formatLength(geom);
            tooltipCoord = geom.getLastCoordinate();
          }
          measureTooltipElement.innerHTML = output;
          measureTooltip.setPosition(tooltipCoord);
        });
      });

      draw.on("drawend", function() {
        measureTooltipElement.className = "ol-tooltip ol-tooltip-static";
        measureTooltip.setOffset([0, -7]);
        // unset sketch
        sketch = null;
        // unset tooltip so that a new one can be created
        measureTooltipElement = null;
        createMeasureTooltip();
        unByKey(listener);
        map.un("pointermove", pointerMoveHandler);
        map.removeInteraction(draw);
        helpTooltipElement.classList.add("hidden");
      });
    }

    /**
     * Creates a new help tooltip
     */
    function createHelpTooltip() {
      if (helpTooltipElement) {
        helpTooltipElement.parentNode.removeChild(helpTooltipElement);
      }
      helpTooltipElement = document.createElement("div");
      helpTooltipElement.className = "ol-tooltip hidden";
      helpTooltip = new Overlay({
        element: helpTooltipElement,
        offset: [15, 0],
        positioning: "center-left"
      });
      map.addOverlay(helpTooltip);
    }

    /**
     * Creates a new measure tooltip
     */
    function createMeasureTooltip() {
      if (measureTooltipElement) {
        measureTooltipElement.parentNode.removeChild(measureTooltipElement);
      }
      measureTooltipElement = document.createElement("div");
      measureTooltipElement.className = "ol-tooltip ol-tooltip-measure";
      measureTooltip = new Overlay({
        element: measureTooltipElement,
        offset: [0, -15],
        positioning: "bottom-center"
      });
      map.addOverlay(measureTooltip);
    }

    /**
     * Let user change the geometry type.
     */
    typeSelect.onchange = function() {
      map.removeInteraction(draw);
      addInteraction();
    };

    addInteraction();
    let result={helpTooltip, draw};
    // helpTooltip
    // draw
    // 将draw传到使用界面 用于关闭
    this.$emit('result',result );
  }
};
</script>
<style>
.map {
  width: 100%;
  height: 400px;
}
.ol-tooltip {
  position: relative;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  color: white;
  padding: 4px 8px;
  opacity: 0.7;
  white-space: nowrap;
  font-size: 12px;
}
.ol-tooltip-measure {
  opacity: 1;
  font-weight: bold;
}
.ol-tooltip-static {
  background-color: #ffcc33;
  color: black;
  border: 1px solid white;
}
.ol-tooltip-measure:before,
.ol-tooltip-static:before {
  border-top: 6px solid rgba(0, 0, 0, 0.5);
  border-right: 6px solid transparent;
  border-left: 6px solid transparent;
  content: "";
  position: absolute;
  bottom: -6px;
  margin-left: -7px;
  left: 50%;
}
.ol-tooltip-static:before {
  border-top-color: #ffcc33;
}
</style>
