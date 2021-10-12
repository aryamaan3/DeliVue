<template>
  <div id="resto">
    <md-app>
      <md-app-toolbar class="md-primary">
        <div class="md-toolbar-tools">
          <h3>{{ name }}</h3>
        </div>
      </md-app-toolbar>
      <md-app-drawer md-permanent="full">
        <md-toolbar class="md-transparent" md-elevation="0">
          Navigation
        </md-toolbar>

        <md-list>
          <md-list-item v-on:click="aboutClicked">
            <md-icon>help_outline</md-icon>
            <span class="md-list-item-text">À propos</span>
          </md-list-item>

          <md-list-item v-on:click="mapClicked">
            <md-icon>map</md-icon>
            <span class="md-list-item-text">Localisation</span>
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
        <div class="about" v-if="page === 'about'">
          <About
            :cuisine="cuisine"
            :borough="borough"
            :grades="grades"
            :building="building"
            :street="street"
            :zipcode="zipcode"
            :coordonnees="coordonnees"
          />
        </div>
        <div class="mapContainer" v-if="page === 'map'">
          <Map :coordinates="coordonnees" />
        </div>
        <div class="menu" v-if="page === 'menu'">
          Menu
        </div>
        <div class="edit" v-if="page === 'edit'">
          Edit
        </div>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
import About from "./About.vue";
import Map from "./Map.vue";

export default {
  name: "Resto",
  props: ["id"],
  data: () => {
    return {
      restoData: "null",
      coordonnees: [0, 0],
      cuisine: "null",
      borough: "null",
      grades: "null",
      address: "null",
      name: "null",
      zipcode: "null",
      building: "null",
      street: "null",
      page: "",
    };
  },
  components: {
    About,
    Map,
  },
  created() {
    //fetch resto data
    fetch("http://localhost:8080/api/restaurants/" + this.id, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
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
      })
      .catch((error) => {
        console.log(error);
      });
    this.page = "about";
  },
  methods: {
    mapClicked() {
      this.page = "map";
    },
    aboutClicked() {
      this.page = "about";
    },
    menuClicked() {
      this.page = "menu";
    },
    editClicked() {
      this.page = "edit";
    },
  },
};
</script>

<style scoped>
</style>
