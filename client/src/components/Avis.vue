<template>
  <div class="avis">
    <div class="noAvis" v-if="renderGrades === false">
      <h3>Personne a donné son avis pour ce restaurant. Soyez le premier!</h3>
    </div>
    <div class="yesAvis" v-if="renderGrades === true">
      <md-list>
        <md-list-item>
          <md-icon>rate_review</md-icon>
          <div class="md-list-item-text">
            <h3>Moyenne</h3>
            <p>{{ avgGrades }}</p>
          </div>
        </md-list-item>

        <md-list-item v-for="(grade, index) in grades" :key="index">
          <md-avatar>
            <img
              :src="`https://placeimg.com/40/40/people/${index}`"
              alt="People"
            />
            {{/**https://stackoverflow.com/questions/40899532/how-to-pass-a-value-from-vue-data-to-href */}}
          </md-avatar>
          <div class="md-list-item-text">
            <p>Date : {{ grade.date.split("T")[0] }}</p>
            <p>{{ grade.grade }} : {{ grade.score }}</p>
          </div>
        </md-list-item>
      </md-list>
    </div>
    <div class="addReview">
      <md-button
        v-on:click="addReviewClicked"
        class="md-primary buttonCustomColor buttonCustomBackground"
        v-if="addReview !== true"
      >
        Ajouter un avis
        <md-icon class="buttonCustomColor">rate_review</md-icon>
      </md-button>
      <div class="inputReview" v-if="addReview === true">
        <form>
          <md-datepicker v-model="selectedDate">
            <label>Date</label>
            <md-input v-model="selectedDate" class="hide" required> </md-input>
          </md-datepicker>
          <md-field>
            <label>Score</label>
            <md-input type="number" v-model="grade" required></md-input>
          </md-field>
            <md-autocomplete v-model="score" :md-options="scores">
                <label>Grade</label>
                <md-input v-model="score" class="hide" required> </md-input>
            </md-autocomplete>
            <md-button class="md-primary buttonCustomColor buttonCancel" v-on:click="addReviewClicked">
                Annuler
                <md-icon class="buttonCustomColor">check</md-icon>
            </md-button>
            <md-button v-on:click="newReview" type="submit" class="md-primary buttonCustomColor buttonValidate">
                Valider
                <md-icon class="buttonCustomColor">check</md-icon>
            </md-button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Avis",
  props: ["grades", "id"],
  data: () => ({
    addReview: false,
    selectedDate: "",
    score: "", 
    grade: "", 
    scores: [
        'A', 'B', 'C', 'P', 'Z'
    ], 
    renderGrades: true,
    avgGrades: 0
  }),
  mounted() {
    if (this.grades.length === 0){
      this.renderGrades = false;
    }
    this.avgGrades = this.average(this.grades);
  },
  methods: {
    average(array) {
      if (array && this.renderGrades) {
        let grades = [];
        let gradesAvg = 0;
        for (let i = 0; i < array.length; i++) {
          //on met tous les grades dans une liste
          grades.push(array[i].score);
        }
        gradesAvg = grades.reduce((a, b) => a + b) / array.length; //on calcule la moyenne
        gradesAvg = gradesAvg.toFixed(2); //max 2 nombres apres la virgule

        let ratings = [];
        for (let i = 0; i < array.length; i++) {
          //on met tous les ratings dans une liste
          ratings.push(array[i].grade);
        }
        let avgScore = ratings
          .sort(
            (
              a,
              b //on trie la liste
            ) =>
              ratings.filter((v) => v === a).length - //on compte le rating le plus frequent de la liste
              ratings.filter((v) => v === b).length //https://stackoverflow.com/questions/1053843/get-the-element-with-the-highest-occurrence-in-an-array
          )
          .pop();
        avgScore += " : ";
        avgScore += gradesAvg; //on concatene le rating et la moyenne pour l'affichage
        return avgScore;
      }
      return 0;
    },
    addReviewClicked() {
      this.addReview = !this.addReview;
    },
    newReview() {
      let review ={
            "date": this.selectedDate, 
            "grade": this.score, 
            "score": parseInt(this.grade)
        }
        console.log(review)
      let formData = new FormData();
      formData.append("newGrade", JSON.stringify(review));
      fetch("http://localhost:8080/api/restaurants/review/" + this.id, {
        method: "PUT",
        body: formData,
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
        });
    },
  },
};
</script>

<style scoped>
.buttonCustomColor {
  color: snow !important;
}
.buttonCustomBackground {
  background-color: slategrey !important;
}
.buttonCancel{
    background-color:tomato !important;
}
.buttonValidate{
    background-color:yellowgreen !important;
}
.hide{
    display: none !important;
}
</style>
