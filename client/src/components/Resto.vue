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

          <md-list-item v-on:click="mapClicked" v-if="borough!=='null'">
            <md-icon>map</md-icon>
            <span class="md-list-item-text">Localisation</span>
          </md-list-item>

          <md-list-item v-on:click="galerieClicked">
            <md-icon>photo_library</md-icon>
            <span class="md-list-item-text">Galerie</span>
          </md-list-item>

          <md-list-item v-on:click="menuClicked">
            <md-icon>restaurant_menu</md-icon>
            <span class="md-list-item-text">Menu</span>
          </md-list-item>

          <md-list-item v-on:click="editClicked">
            <md-icon>edit</md-icon>
            <span class="md-list-item-text">Modifier</span>
          </md-list-item>
        </md-list>
      </md-app-drawer>
      <md-app-content class="contents">
        <div class="about" v-if="page === 'about'">
          <About
            v-if="isMounted === true"
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
          <Map :coordinates="coordonnees" v-if="isMounted === true" />
        </div>
        <div class="menu" v-if="page === 'menu'">
          <Menu v-if="isMounted === true" />
        </div>
        <div class="edit" v-if="page === 'edit'">
          <Edit
            :id="id"
            :name="name"
            :cuisine="cuisine"
            v-if="isMounted === true"
          />
        </div>
        <div class="gallery" v-if="page === 'gallery'">
          <md-list>
            <md-list-item>
              <md-icon>videocam</md-icon>
              <div class="md-list-item-text">
                <h3>Videos</h3>
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/kkAxBzX8jYI"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
                {{/**https://www.w3schools.com/html/html_youtube.asp */}}
              </div>
            </md-list-item>
            <md-list-item>
              <md-icon>image</md-icon>
              <div class="md-list-item-text">
                <h3>Images</h3>
                <img
                  src="https://bstatic.ccmbg.com/www.linternaute.com/img/restaurant/villes/440x293/1.jpg"
                  alt="photo du resto"
                />
              </div>
            </md-list-item>
          </md-list>
        </div>
      </md-app-content>
    </md-app>
  </div>
</template>

<script>
import About from "./About.vue";
import Map from "./Map.vue";
import Menu from "./Menu.vue";
import Edit from "./Edit.vue";

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
      isMounted: false,
    };
  },
  components: {
    About,
    Map,
    Menu,
    Edit,
  },
  mounted() {
    // se fait avant le mounted des components enfants
    //fetch resto data
    fetch("http://localhost:8080/api/restaurants/" + this.id, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.restaurant.borough) {
          //verifie si le resto contient toutes les données
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
        }
        else{
          this.name = data.restaurant.name;
          this.cuisine = data.restaurant.cuisine;
        }
        this.isMounted = true; // pour que les components enfants soit pas chargés avant celui ci
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
    galerieClicked() {
      this.page = "gallery";
    },
  },
};
</script>

<style scoped>
.about {
  overflow: scroll;
}
</style>
