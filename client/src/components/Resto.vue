<template>
  <div id="resto">
    <md-app>
        <md-app-toolbar class="md-primary">
            <div class="md-toolbar-tools">
            <h3>{{name}}</h3>
            </div>
        </md-app-toolbar>
        <md-app-drawer md-permanent="full">
        <md-toolbar class="md-transparent" md-elevation="0">
          Navigation
        </md-toolbar>

        <md-list>
          <md-list-item>
            <md-icon>help_outline</md-icon>
            <span class="md-list-item-text">À propos</span>
          </md-list-item>

          <md-list-item>
            <md-icon>map</md-icon>
            <span class="md-list-item-text">Map</span>
          </md-list-item>

          <md-list-item>
            <md-icon>restaurant_menu</md-icon>
            <span class="md-list-item-text">Menu</span>
          </md-list-item>

          <md-list-item>
            <md-icon>edit</md-icon>
            <span class="md-list-item-text">Modifier</span>
          </md-list-item>

        </md-list>
      </md-app-drawer>
        <md-app-content>
            <About :cuisine = "cuisine" :borough = "borough" :grades = "grades" :building = "building" :street = "street" :zipcode = "zipcode" :coordonnees = "coordonnees" />
        </md-app-content>
    </md-app>
  </div>
</template>

<script>
import About from './About.vue'

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

    }
  },
  components: {
      About
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
  }
}
</script>

<style scoped>

</style>
