<template>
  <div id="resto">
    <md-app>
        <md-app-toolbar class="md-primary">
            <div class="md-toolbar-tools">
            <h3>{{name}}</h3>
            </div>
        </md-app-toolbar>
        <md-app-content>
            <md-list>
            <md-list-item>
                <md-icon>restaurant</md-icon>
                <div class="md-list-item-text">
                <h3>Cuisine</h3>
                <p>{{ cuisine }}</p>
                </div>
            </md-list-item>
            <md-list-item>
                <md-icon>apartment</md-icon>
                <div class="md-list-item-text">
                <h3>Borough</h3>
                <p>{{ borough }}</p>
                </div>
            </md-list-item>
            <md-list-item>
                <md-icon>rate_review</md-icon>
                <div class="md-list-item-text">
                <h3>Avis Moyen</h3>
                <p> {{average(grades)}}</p>
                </div>
            </md-list-item>
            <md-list-item>
                <md-icon>place</md-icon>
                <div class="md-list-item-text">
                <h3>Address</h3>
                <p> {{building}}</p>
                <p> {{street}}</p>
                <p> {{zipcode}}</p>
                </div>
            </md-list-item>
            </md-list>
            <div class="map">
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
        </md-app-content>
    </md-app>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker, LIcon } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';

export default {
  name: 'Resto',
  props: ['id'],
  data: () => {
    return {
      restoData: 'null', 
      coordonnees: [49.1193089, 6.1757156],
      cuisine: 'null',
      borough: 'null',
      grades: 'null',
      address: 'null',
      name: 'null',
      zipcode: 'null',
      building: 'null',
      street: 'null',
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      center: [ 49.1193089, 6.1757156 ],
      zoom: 12,
      markerImg: "https://img.icons8.com/doodle/48/000000/pizza--v1.png"

    }
  },
  components: {
    LMap,
    LTileLayer, 
    LMarker, 
    LIcon
  },
  mounted() {
    this.init();
  },
  methods: {
    init(){
        //fetch resto data
        fetch('http://localhost:8080/api/restaurants/' + this.id, {
            method: 'GET',})
            .then(response => response.json())
            .then(data => {
                this.restoData = data.restaurant;
                this.coordonnees = data.restaurant.address.coord;
                this.center = data.restaurant.address.coord;
                this.cuisine = data.restaurant.cuisine;
                this.borough = data.restaurant.borough;
                this.grades = data.restaurant.grades;
                this.address = data.restaurant.address;
                this.name = data.restaurant.name;
                this.zipcode = data.restaurant.address.zipcode;
                this.building = data.restaurant.address.building;
                this.street = data.restaurant.address.street;
                console.log(this.restoData)
            })
            .catch(error => {
                console.log(error);
            });

    }, 
    average(array) {
        if(array){
            let grades = []
            let gradesAvg = 0
            for(let i = 0; i < array.length; i++){
                grades.push(array[i].score)
            }
            gradesAvg = grades.reduce((a, b) => a + b) / array.length;

            let ratings = []
            for (let i = 0; i < array.length; i++){
                ratings.push(array[i].grade)
            }
            let avgScore = ratings.sort((a,b) =>
                ratings.filter(v => v===a).length
                - ratings.filter(v => v===b).length
            ).pop();
            avgScore += " : "
            avgScore += gradesAvg
            return avgScore
        }
        return 0;
    }, 
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

<style>
 .map {
    width: 100%;
    height: 100%;
 }
</style>
