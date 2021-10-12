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
            <md-list-item>
                <md-icon>image</md-icon>
                <div class="md-list-item-text">
                <h3>Images</h3>
                <img src="https://bstatic.ccmbg.com/www.linternaute.com/img/restaurant/villes/440x293/1.jpg" alt="photo du resto">
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
            for(let i = 0; i < array.length; i++){
                grades.push(array[i].score)
            }
            gradesAvg = grades.reduce((a, b) => a + b) / array.length;
            gradesAvg = (gradesAvg).toFixed(2) //max 2 nombres apres la virgule

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
    }
  }
}
</script>

<style scoped>

</style>