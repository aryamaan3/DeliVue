<template>
  <div>
    <form @submit.prevent="submitForm">
      <md-field>
        <label>ID - Non Modifiable</label>
        <md-input readonly v-model="iD"></md-input>
      </md-field>
      <md-field>
        <label>Nom</label>
        <md-input :placeholder="nom" required v-model="form.name"></md-input>
      </md-field>
      <md-field>
        <label>Cuisine</label>
        <md-input :placeholder="cui" required v-model="form.cuisine"></md-input>
      </md-field>
      <md-button type="submit" class="md-primary">Modifier</md-button>
    </form>
  </div>
</template>

<script>
export default {
  name: "Edit",
  props: ["id", "name", "cuisine"],
  data: () => ({
    iD: "",
    nom: "",
    cui: "",
    required: null,
    form: {
      name: "",
      cuisine: "",
    },
  }),
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.iD = this.id;
      this.nom = this.name;
      this.cui = this.cuisine;
      this.form.name = this.name;
      this.form.cuisine = this.cuisine;
    },
    submitForm() {
      let formData = new FormData();
      formData.append("_id", this.iD);
      formData.append("name", this.form.name);
      formData.append("cuisine", this.form.cuisine);
      console.log(formData);
      //fetch to put the data
      fetch("http://localhost:8080/api/restaurants/" + this.iD, {
        method: "PUT",
        body: formData,
      })
        .then(function (responseJSON) {
          responseJSON.json().then(function (res) {
            // Maintenant res est un vrai objet JavaScript
            console.log(res);
          });
        })
        .catch(function (err) {
          console.log(err);
        });
      window.location.reload();
    },
  },
};
</script>