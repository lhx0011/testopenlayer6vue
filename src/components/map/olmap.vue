<template>
  <div id="map">

  </div>
</template>

<script>
import "ol/ol.css";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
export default {
  name: "olmap",
  data() {
    return {
      map: null
    };
  },
  mounted() {
    this.getGisMap();
  },
  created() {
    this.getGisMap();
  },
  methods: {
    getGisMap() {
      // var mapcontainer = this.$refs.rootmap;
      this.map = new Map({
        target: "map",
        layers: [
          new TileLayer({
            source: new OSM()
          })
        ],
        view: new View({
          projection: "EPSG:4326",    //使用这个坐标系
          center: [114.064839,22.548857],  //深圳
          zoom: 12
        })
      });
    }
  }
};
</script>

<style>
#map {
  width: 400px;
  height: 250px;
}
/*隐藏ol的一些自带元素*/
.ol-attribution,.ol-zoom { display: none;}

</style>
