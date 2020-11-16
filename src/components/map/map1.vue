<template>
  <div id="map"></div>
</template>

<script>
import 'ol/ol.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

export default {
  name: "map1",
  data() {
    return {
      map: null
    }
  },
  mounted() {
    this.getGisMap();
    this.testdata();
  },
  created() {
    this.getGisMap();
    this.testdata();
  },
  methods:{
    testdata() {
      console.log("===test data=====")
    },
    getGisMap() {
      this.map = new Map({
        target: 'map',
        layers: [
          new TileLayer({
            source: new OSM()
          })
        ],
        view: new View({
          center: [0, 0],
          zoom: 0
        })
      });
    }
  }
}

</script>

<style scoped>
#map {
  width: 400px;
  height: 250px;
}
</style>
