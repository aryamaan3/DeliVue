<template>
  <div id="resto">
      <form v-on:submit="ajouterRestaurant">
        <label>
            Nom : <input type="text" required v-model="name">
        </label>
        <label>
            Cuisine : <input type="text" required v-model="cuisine">
        </label>

        <button>Ajouter</button>
    </form>

    
    <form v-on:input="search">
        <label>
            Rechercher un restau : <input type="text" required v-model="recherche">
        </label>
    </form>

    <h1>Nombre de restaurants : {{nbTotal}}</h1>
    <div class="slidecontainer">
        <input v-on:input="slideChanged($event)" type="range" min="5" max="100" value="5" class="slider" id="myRange">
        <p id="valeurSlide">{{range}}</p>
    </div>
    <table>
        <tr>
            <th>Name</th>
            <th>Cuisine </th>
            <th>Operations </th>
        </tr>
        <tbody>
            <tr v-for="r,index in restaurants" v-bind:key="index" v-bind:style="{backgroundColor:getColor(index)}"
                v-bind:class="{bordureRouge:(index === 2)}">
                <td>{{r.name}}</td>
                <td> {{r.cuisine}}</td>
                <td>
                    <md-button v-on:click="supprimerRestaurant(index)" class="md-icon-button">
                        <md-icon>delete</md-icon>
                    </md-button>
                    <md-button v-on:click="restoClicked(index)" class="md-icon-button">
                        <md-icon>info</md-icon>
                    </md-button>
                </td>
            </tr>
        </tbody>
    </table>
    <md-button :disabled="nbPage===0" class="md-icon-button" v-on:click="getRestaurantsFromServer($event)" value="0"><md-icon id="previous">navigate_before</md-icon></md-button>
    <md-button :disabled="nbPage===nbTotal" class="md-icon-button" v-on:click="getRestaurantsFromServer($event)" value="1"><md-icon id="next">navigate_next</md-icon></md-button>
    
  </div>
</template>

<script>

export default {
  name: 'Resto',
  components: {
  }, 
  mounted() {
    this.getRestaurantsFromServer();
  },
  data: function () {
    return({
            restaurants: [],
            name: '',
            cuisine: '', 
            recherche:'',
            nbPage: 0, 
            range: 5, 
            nomSearched: '', 
            nbTotal:0
    })},
  methods: {
    supprimerRestaurant(index) {
        console.log(this.restaurants[index]._id);
        // fetch delete restaurant
        fetch('http://localhost:8080/api/restaurants/'+this.restaurants[index]._id, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            this.getRestaurantsFromServer();
        })
    },
    ajouterRestaurant(event) {
        // eviter le comportement par defaut
        event.preventDefault()
        console.log("in ajouter", this.name, this.cuisine)
        let formData = new FormData();
        formData.append('name', this.name);
        formData.append('cuisine', this.cuisine);
        // post fetch
        fetch('http://localhost:8080/api/restaurants', {
            method: 'POST',
            body: formData
        }).then((response) => {
            if (response.ok) {
                console.log(response)
                this.getRestaurantsFromServer();
            } else {
                    console.log("pas ok")
            }
        })


    },
    getColor(index) {
        return (index % 2) ? 'lightBlue' : 'pink';
    }, 
    getRestaurantsFromServer(isSuivant) {
        if(isSuivant){
            if(isSuivant.target.id === "next"){
                this.nbPage++;
            }
            else{
                if (this.nbPage > 0) {
                    this.nbPage--;
                }
            }
        }
        fetch('http://localhost:8080/api/restaurants?page='+this.nbPage+"&pagesize="+this.range+"&name="+this.nomSearched, {
            method: 'GET'
        }).then((resto) => {
            resto.json().then((resto) => { //no lo sait
                for (let i = 0; i < resto.data.length; i++) {
                    this.restaurants = resto.data;

                }
                this.nbTotal = resto.count;
                this.longeur = this.restaurants.length;
            });
        }).catch(function(error) {
            console.log(error);
        });
    }, 
    slideChanged(event) {
        if(event.target.value){
            this.range = event.target.value;
        }
        this.getRestaurantsFromServer()
    }, 
    search(event) {
        event.preventDefault();
        this.nomSearched = this.recherche
        this.getRestaurantsFromServer()
    }, 
    restoClicked(index) {
        // change router
        this.$router.push({
            path: '/resto/'+this.restaurants[index]._id
        })
    }

  }
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Material+Icons");
#resto {
    width: 100%;
}

</style>