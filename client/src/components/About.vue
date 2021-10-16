<template>
    <div class="about">
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
                <h3>Addresse</h3>
                <p> {{building}}</p>
                <p> {{street}}</p>
                <p> {{zipcode}}</p>
                </div>
            </md-list-item>
            </md-list>
    </div>
</template>

<script>

export default {
  name: 'About',
  props: ['cuisine', 'borough', 'grades', 'building', 'street', 'zipcode', 'coordonnees'],
  components: {
  }, 
  methods: {
      average(array) {
        if(array){
            let grades = []
            let gradesAvg = 0
            for(let i = 0; i < array.length; i++){ //on met tous les grades dans une liste
                grades.push(array[i].score)
            }
            gradesAvg = grades.reduce((a, b) => a + b) / array.length; //on calcule la moyenne
            gradesAvg = (gradesAvg).toFixed(2) //max 2 nombres apres la virgule

            let ratings = []
            for (let i = 0; i < array.length; i++){ //on met tous les ratings dans une liste
                ratings.push(array[i].grade)
            }
            let avgScore = ratings.sort((a,b) => //on trie la liste
                ratings.filter(v => v===a).length //on compte le rating le plus frequent de la liste
                - ratings.filter(v => v===b).length //https://stackoverflow.com/questions/1053843/get-the-element-with-the-highest-occurrence-in-an-array
            ).pop();
            avgScore += " : "
            avgScore += gradesAvg //on concatene le rating et la moyenne pour l'affichage
            return avgScore
        }
        return 0;
    }
  }
}
</script>

<style scoped>

</style>