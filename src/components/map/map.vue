<template>
  <div id="map" class="map">
    <div id="info"></div>
  </div>
</template>

<script>
import 'ol/ol.css';
import Feature from 'ol/Feature';
import LineString from 'ol/geom/LineString';
import Map from 'ol/Map';
import Stamen from 'ol/source/Stamen';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import View from 'ol/View';
import Point from 'ol/geom/Point';
// import {Stroke, Style} from 'ol/style';
import {Circle as CircleStyle, Text, Fill, Stroke, Style} from 'ol/style';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {getVectorContext} from 'ol/render';
import { transform, fromLonLat } from "ol/proj";

export default {
  name: "map",
  data() {
    return {
      map: null
    }
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      var tileLayer = new TileLayer({
        // source: new Stamen({
        //   layer: 'toner',
        // })
        source: new OSM()
      });

      var map = new Map({
        layers: [tileLayer],
        target: 'map',
        view: new View({
          // center: [0, 0],
          center: fromLonLat([114.601667, 20.714082]), //104.912777, 34.730746
          zoom: 12,
        }),
      });

      var style = new Style({
        stroke: new Stroke({
          color: '#35cf06',
          width: 2,
        }),
      });

      var style2 = new Style({
        image: new CircleStyle({
          radius: 5,
          fill: new Fill({
            color: 'rgba(255, 153, 0, 0.4)',
          }),
          stroke: new Stroke({
            color: 'rgba(0, 255, 198, 0.2)',
            width: 3,
          }),
        }),
      });

      const features = [];

      var url = 'http://localhost:9000/ocean/gis/getData/5f4b450fbbf722103d5bab1d';

      const infoList = {};

      var pointSource = new VectorSource({
        loader: function () {
          // var url = url;
          fetch(url)
            .then(function (response) {
              return response.json();
            })
            .then(function (json) {
              var flightsData = json.body.datas;
              for (var i = 0; i < flightsData.length; i++) {
                // console.log(flightsData[i].recv)
                // console.log(flightsData[i])

                var info = flightsData[i].info;
                // console.log(info)
                var id = i+1;
                infoList.id = info;

                var recv = flightsData[i].recv.lonlat;
                var send = flightsData[i].send.lonlat;

                var flag = flightsData[i].send.flag;//发送接收位置是否还有其他信息

                var pf = new Point(send);
                var pt = new Point(recv);
                // console.log(pf);
                // console.log(pt);
                pf.transform('EPSG:4326', 'EPSG:3857');
                pt.transform('EPSG:4326', 'EPSG:3857');
                // var ff = new Feature(pf);

                var featureSendData = {geometry: pf, id: id};
                var featureRecvData = {geometry: pt, id: id};
                // var ff, tt;

                if(flag) {
                  $.each(flightsData[i].send.data, function (index, item) {
                    featureSendData.depth = index + ": " + item + "\n";
                  });
                  $.each(flightsData[i].recv.data, function (index, item) {
                    featureRecvData.depth = index + ": " + item + "\n";
                  });
                }


                var ff = new Feature(featureSendData);
                var tt = new Feature(featureRecvData);

                // pointSource.addFeature(new Feature(pf));
                pointSource.addFeature(ff);
                pointSource.addFeature(tt);

              }
            });
        },
        // features: features,
      });

      const styleCache = {};
      var pointLayer = new VectorLayer({
        source: pointSource,
        style: function (feature) {
          const size = 6;
          let style = styleCache[size];
          // console.log("======");
          if (!style) {
            style = new Style({
              image: new CircleStyle({
                radius: 10,
                stroke: new Stroke({
                  color: '#fff',
                }),
                fill: new Fill({
                  color: '#3399CC',
                }),
              }),
            });
            styleCache[size] = style;
          }
          return style;
        },
      })

      var flightsSource = new VectorSource({
        wrapX: false,
        // attributions:
        //   'Flight data by ' +
        //   '<a href="http://openflights.org/data.html">OpenFlights</a>,',
        loader: function () {
          // var url = 'http://localhost:10002/lhx/gis/flights/json';
          fetch(url)
            .then(function (response) {
              return response.json();
            })
            .then(function (json) {
              // console.log(json)
              var flightsData = json.body.datas;
              // console.log(flightsData.length)
              for (var i = 0; i < flightsData.length; i++) {
                // console.log(flightsData[i])
                // console.log(flightsData[i].recv)
                // console.log(flightsData[i].recv.lonlat);
                var recv = flightsData[i].recv.lonlat;
                var send = flightsData[i].send.lonlat;
                // console.log(recv)

                // create an arc circle between the two locations
                var arcGenerator = new arc.GreatCircle(
                  {x: send[0], y: send[1]},
                  {x: recv[0], y: recv[1]}
                );

                // var point = new Point([from[1], from[0]]);
                // point.transform('EPSG:4326', 'EPSG:3857');
                // console.log(point);

                var arcLine = arcGenerator.Arc(100, {offset: 10});
                if (arcLine.geometries.length === 1) {
                  var line = new LineString(arcLine.geometries[0].coords);
                  line.transform('EPSG:4326', 'EPSG:3857');
                  // console.log('---line----');
                  // console.log(line);

                  var feature = new Feature({
                    geometry: line,
                    finished: false,
                  });
                  // add the feature with a delay so that the animation
                  // for all features does not start at the same time
                  addLater(feature, i * 50);
                }
              }
              tileLayer.on('postrender', this.animateFlights);
            });
        },
      });

      var flightsLayer = new VectorLayer({
        source: flightsSource,
        style: function (feature) {
          // console.log("-----1")
          // if the animation is still active for a feature, do not
          // render the feature with the layer style
          if (feature.get('finished')) {
            return style;
          } else {
            return null;
          }
        },
      });

      // map.addLayer(flightsLayer);
      // map.addLayer(pointLayer);
      map.on('click', function (evt) {
        this.displayFeatureInfo(evt.pixel);
      });
    },

    animateFlights(event) {
      var pointsPerMs = 0.05;
      var vectorContext = getVectorContext(event);
      var frameState = event.frameState;
      vectorContext.setStyle(style);

      var features = flightsSource.getFeatures();
      // console.log("length: " + features.length)
      for (var i = 0; i < features.length; i++) {
        var feature = features[i];

        if (!feature.get('finished')) {
          // only draw the lines for which the animation has not finished yet
          var coords = feature.getGeometry().getCoordinates();
          // console.log('----coords----');
          // console.log(coords);

          // console.log(coords[0]);
          // console.log(coords[99]);

          var elapsedTime = frameState.time - feature.get('start');
          var elapsedPoints = elapsedTime * pointsPerMs;

          if (elapsedPoints >= coords.length) {
            feature.set('finished', true);
          }

          var maxIndex = Math.min(elapsedPoints, coords.length);
          var currentLine = new LineString(coords.slice(0, maxIndex));

          // directly draw the line with the vector context
          vectorContext.drawGeometry(currentLine);
        }
      }
      // tell OpenLayers to continue the animation
      map.render();
    },

    addLater(feature, timeout) {
      window.setTimeout(function () {
        feature.set('start', new Date().getTime());
        flightsSource.addFeature(feature);
      }, timeout);
    },

    displayFeatureInfo(pixel) {
      var info = $('#info');
      info.tooltip({
        animation: false,
        trigger: 'manual',
      });

      console.log("-------");
      console.log(pixel);
      info.css({
        left: pixel[0] + 'px',
        top: pixel[1] - 15 + 'px',
        // background-color: #fff
      });

      console.log("-------info");
      console.log(info);

      var feature = map.forEachFeatureAtPixel(pixel, function (feature) {
        return feature;
      });
      console.log("--------feature");
      console.log(feature)
      // console.log(feature.id_);
      if (feature) {
        // info.attr('data-original-title', feature.get('name')).tooltip('show');
        info.attr('data-original-title', feature.get('depth')).tooltip('show');
        var id = feature.get("id");
        // console.log(infoList.id);
        var html = get_contaion(infoList.id);
        // console.log(feature.id_);
        // console.log(html);
        $("#geoinfo").html(html);

      } else {
        info.tooltip('hide');
      }
    },

    get_contaion(data){
      var html = "<table>";
      html += "<tr>";
      html += "<th>名称</th>";
      html += "<th>参数</th>";
      html += "</tr>";
      $.each(data, function (index, item) {
        console.log(index+ " : " + item);
        html += "<tr>";
        // $.each(item, function (vlaIndex, valItem) {
        html += "<td>";
        html += index;
        html += "</td>";
        html += "<td>";
        html += item;
        html += "</td>";
        // });
        html += "</tr>";
      });
      html += "</table>";
      return html;
    },


  }
}
</script>

<style scoped>
  .map {
    width: 100%;
    height:400px;
  }
  #map {
    position: relative;
  }
  #info {
    position: absolute;
    height: 1px;
    width: 1px;
    z-index: 100;
  }
  .tooltip.in {
    opacity: 1;
  }
  .tooltip.top .tooltip-arrow {
    border-top-color: red !important;
  }

  /* 控制tooltip 气泡框样式 */
  .tooltip-inner {
    /*border: 2px solid blue;
    background-color: #yellow;*/
    max-width: 200px;
    padding: .25rem .5rem;
    color: #000 !important;
    text-align: center;
    background-color: #fff !important;
    border-radius: .25rem;
  }

  /* 控制tooltip三角样式 */
  .arrow::before {
    top: 0;
    border-width: .4rem .4rem 0;
    border-top-color: #fff !important;
    border-bottom-color: #fff !important;
  }

  table
  {
    padding: 0;
    margin: 0;
    border-collapse: collapse;
  }
  td
  {
    border: 1px solid #009999;
    padding: 6px 6px 6px 12px;
    color: #4f6b72;
    text-align: center;
  }
  th
  {
    border: 1px solid #009999;
    padding: 6px 6px 6px 12px;
    color: #4f6b72;
    text-align: center;
  }
</style>
