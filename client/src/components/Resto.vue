<template>
  <div id="resto">
    <md-app>
        <md-app-toolbar class="md-primary">
            <div class="md-toolbar-tools">
            <h3>{{restoData.name}}</h3>
            </div>
        </md-app-toolbar>
        <md-app-content>
            <md-list>
            <md-list-item>
                <md-icon>restaurant</md-icon>
                <div class="md-list-item-text">
                <h3>Cuisine</h3>
                <p>{{ restoData.cuisine }}</p>
                </div>
            </md-list-item>
            <md-list-item>
                <md-icon>apartment</md-icon>
                <div class="md-list-item-text">
                <h3>Borough</h3>
                <p>{{ restoData.borough }}</p>
                </div>
            </md-list-item>
            <md-list-item>
                <md-icon>rate_review</md-icon>
                <div class="md-list-item-text">
                <h3>Avis Moyen</h3>
                <p> {{average(restoData.grades)}}</p>
                </div>
            </md-list-item>
            <md-list-item>
                <md-icon>place</md-icon>
                <div class="md-list-item-text">
                <h3>Address</h3>
                <p> {{restoData.address.building}}</p>
                <p> {{restoData.address.street}}</p>
                <p> {{restoData.address.zipcode}}</p>
                </div>
            </md-list-item>
            </md-list>
            
        </md-app-content>
    </md-app>
  </div>
</template>

<script>

export default {
  name: 'Resto',
  props: ['id'],
  data: () => {
    return {
      restoData: 'null'
    }
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
            avgScore += " :"
            avgScore += gradesAvg
            return avgScore
        }
        return 0;
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
