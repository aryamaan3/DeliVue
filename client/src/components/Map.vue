
<template>
  <div id="map">
    <l-map
      :center="center"
      :zoom="zoom"
      class="map"
      ref="map"
      @update:zoom="zoomUpdated"
      @update:center="centerUpdated"
    >
      <l-tile-layer :url="url"> </l-tile-layer>
      <l-marker :lat-lng="coords">
        <l-icon
          icon-url="http://simpleicon.com/wp-content/uploads/map-marker-1.png"
        />
      </l-marker>
    </l-map>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker, LIcon } from "vue2-leaflet";
import "leaflet/dist/leaflet.css";

export default {
  name: "Map",
  props: ["coordinates"],
  components: {
    LMap,
    LTileLayer,
    LMarker, 
    LIcon
  },
  mounted() {
    this.init();
  },
  data: () => {
    return {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      center: [0, 0],
      zoom: 12,
      coords : [0, 0]
    };
  },
  methods: {
    init(){
        let x = this.coordinates
        this.coords[0] = x[1]
        this.coords[1] = x[0]
        console.log(this.coords)
        //this.coords = this.coordinates
        this.center = this.coords
    },
    zoomUpdated(zoom) {
      this.zoom = zoom;
    },
    centerUpdated(center) {
      this.center = center;
    },
  },
};
</script>

<style scoped>
#map {
  width: 70vw;
  height: 86vh;
}
</style>
