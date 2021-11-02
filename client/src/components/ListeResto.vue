<template>
  <div id="resto">
    <h1>Base de données de restaurants</h1>

    <div class="addandsearch">
      <div class="add" align="left">
        <md-button
          class="md-primary impButton addButton"
          v-if="add === false"
          v-on:click="addClicked"
        >
          Ajouter
          <md-icon class="impButton">add</md-icon>
        </md-button>

        <form v-on:submit="ajouterRestaurant" v-if="add === true">
          <label> Nom : <input type="text" required v-model="name" /> </label>
          <label>
            Cuisine : <input type="text" required v-model="cuisine" />
          </label>

            <button @click="show = !show" class="md-icon-button addButton">
              <md-icon class="impButton">add</md-icon>
            </button>
        </form>
        <transition
            name="custom-classes-transition"
            leave-active-class="animated bounceOutRight"
          >
        <md-icon v-if="show">send</md-icon>
        </transition>
      </div>

      <object class="search" align="right">
        <form v-on:input="search" v-on:keydown.enter.prevent="search">
          <label>
            <input type="text" required v-model="recherche" />
            <md-icon>search</md-icon>
          </label>
        </form>
      </object>
    </div>

    <h3 v-if="nbTotal === 0">
      Il n'y a pas de restaurant qui correspond à votre recherche
    </h3>
    <div class="slidecontainer" v-if="nbTotal > 4">
      <input
        v-on:input="slideChanged($event)"
        type="range"
        min="5"
        max="100"
        value="5"
        class="slider"
        id="myRange"
      />{{ range }}
    </div>

    <table class="table" v-if="nbTotal > 0">
      <tr>
        <th>Nom</th>
        <th>Cuisine</th>
        <th>Ville</th>
        <th>Opérations</th>
      </tr>
      <tbody>
        <tr
          v-for="(r, index) in restaurants"
          v-bind:key="index"
          v-bind:style="{ backgroundColor: getColor(index) }"
          class="row"
        >
          <td>{{ r.name }}</td>
          <td>{{ r.cuisine }}</td>
          <td>{{ r.borough }}</td>
          <td>
            <md-button
              v-on:click="supprimerRestaurant(index)"
              class="md-icon-button"
            >
              <md-icon>delete</md-icon>
            </md-button>
            <md-button v-on:click="restoClicked(index)" class="md-icon-button">
              <md-icon>info</md-icon>
            </md-button>
          </td>
        </tr>
      </tbody>
    </table>
    <md-button
      :disabled="nbPage === 0"
      class="md-icon-button"
      v-on:click="getRestaurantsFromServer($event)"
      value="0"
      ><md-icon id="previous">navigate_before</md-icon></md-button
    >
    <md-button
      :disabled="nbPage + 1 > nbTotal / range"
      class="md-icon-button"
      v-on:click="getRestaurantsFromServer($event)"
      value="1"
      ><md-icon id="next">navigate_next</md-icon></md-button
    >
    <h2 v-if="nbTotal > 0">Nombre Total : {{ nbTotal }}</h2>
  </div>
</template>

<script>
export default {
  name: "Resto",
  components: {},
  mounted() {
    this.getRestaurantsFromServer();
    console.log();
  },
  data: function () {
    return {
      restaurants: [],
      name: "",
      cuisine: "",
      recherche: "",
      nbPage: 0,
      range: 5,
      nomSearched: "",
      nbTotal: 0,
      add: false,
      show:false
    };
  },
  methods: {
    supprimerRestaurant(index) {
      console.log(this.restaurants[index]._id);
      // fetch delete restaurant
      fetch(
        "http://localhost:8080/api/restaurants/" + this.restaurants[index]._id,
        {
          method: "DELETE",
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.getRestaurantsFromServer();
        });
    },
    ajouterRestaurant(event) {
      // eviter le comportement par defaut
      event.preventDefault();
      let formData = new FormData();
      formData.append("name", this.name);
      formData.append("cuisine", this.cuisine);
      // post fetch
      fetch("http://localhost:8080/api/restaurants", {
        method: "POST",
        body: formData,
      }).then((response) => {
        if (response.ok) {
          console.log(response);
          this.getRestaurantsFromServer();
        } else {
          console.log("pas ok");
        }
      });
      this.name = "";
      this.cuisine = "";

      this.addClicked();
    },
    getColor(index) {
      return index % 2 ? "slategrey" : "slategrey";
    },
    getRestaurantsFromServer(isSuivant) {
      if (isSuivant) {
        if (isSuivant.target.id === "next") {
          this.nbPage++;
        } else {
          if (this.nbPage > 0) {
            this.nbPage--;
          }
        }
      }
      fetch(
        "http://localhost:8080/api/restaurants?page=" +
          this.nbPage +
          "&pagesize=" +
          this.range +
          "&name=" +
          this.nomSearched,
        {
          method: "GET",
        }
      )
        .then((resto) => {
          resto.json().then((resto) => {
            //no lo sait
            for (let i = 0; i < resto.data.length; i++) {
              this.restaurants = resto.data;
            }
            this.nbTotal = resto.count;
            this.longeur = this.restaurants.length;
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    slideChanged(event) {
      if (event.target.value) {
        this.range = event.target.value;
      }
      this.getRestaurantsFromServer();
    },
    search(event) {
      event.preventDefault();
      this.nomSearched = this.recherche;
      this.getRestaurantsFromServer();
    },
    restoClicked(index) {
      // change router
      this.$router.push({
        path: "/resto/" + this.restaurants[index]._id,
      });
    },
    addClicked() {
      this.add = !this.add;
      this.show = false;
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Material+Icons");
@import url("https://cdn.jsdelivr.net/npm/animate.css@3.5.1");

#resto {
  width: 100%;
  margin-top: 10px;
}

.table {
  width: 100%;
}
.md-icon-button {
  cursor: pointer;
}

.slidecontainer {
  margin: 5px;
}

.addandsearch {
  display: flex;
  justify-content: space-between;
}

.search {
  margin-top: 15px;
}
.row {
  color: snow;
}
.impButton {
  color: snow !important;
}
.addButton {
  background-color: slategrey !important;
}
</style>