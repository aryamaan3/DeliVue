
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
        <l-tile-layer
            :url="url"
        >
        </l-tile-layer>
        <l-marker
            :lat-lng="coordonnees"
        >
            <l-icon ref="icon">
                <img class="restaurant-icon" :src="markerImg"/>
            </l-icon>
        </l-marker>
    </l-map>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker, LIcon } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';


export default {
  name: 'Map',
  components: {
    LMap,
    LTileLayer, 
    LMarker, 
    LIcon
  }, 
  data :() => {
      return {
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        center: [ 49.1193089, 6.1757156 ],
        zoom: 12
      }
  },
  methods: {
    zoomUpdated (zoom) {
        this.zoom = zoom;
        console.log(this.coordonnees)
    },
    centerUpdated (center) {
        this.center = center;
    }
  }
}
</script>

<style scoped>

</style>
