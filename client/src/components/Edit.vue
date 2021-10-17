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
      <div class="advanced" v-if="advanced === true">
        <md-field>
          <label>Quartier</label>
          <md-input v-model="form.borough"></md-input>
        </md-field>
        <md-field>
          <label>Numero</label>
          <md-input v-model="form.building"></md-input>
        </md-field>
        <md-field>
          <label>Rue</label>
          <md-input v-model="form.street"></md-input>
        </md-field>
        <md-field>
          <label>Latitude</label>
          <md-input v-model="form.lat"></md-input>
        </md-field>
        <md-field>
          <label>Longitude</label>
          <md-input v-model="form.long"></md-input>
        </md-field>
        <md-field>
          <label>Code Postal</label>
          <md-input v-model="form.zip"></md-input>
        </md-field>
      </div>
      <md-switch v-model="advanced" class="md-primary"
        >Paramètres Avancés</md-switch
      >
      <md-button type="submit" class="md-primary"
        >Modifier <md-icon>check</md-icon></md-button
      >
    </form>
  </div>
</template>

<script>
export default {
  name: "Edit",
  props: [
    "id",
    "name",
    "cuisine",
    "borough",
    "building",
    "coords",
    "zip",
    "avis",
    "street",
  ],
  data: () => ({
    iD: "",
    nom: "",
    cui: "",
    advanced: false,
    required: null,
    form: {
      name: "",
      cuisine: "",
      borough: "",
      building: "",
      lat: "",
      zip: "",
      grades: "",
      long: "",
    },
  }),
  mounted() {
    this.init();
    console.log(this.$props);
  },
  methods: {
    init() {
      this.iD = this.id;
      this.nom = this.name;
      this.cui = this.cuisine;
      this.form.name = this.name;
      this.form.cuisine = this.cuisine;
      this.form.borough = this.borough;
      this.form.building = this.building;
      this.form.zip = this.zip;
      this.form.long = this.coords[0];
      this.form.lat = this.coords[1];
      this.form.street = this.street;
    },
    submitForm() {
      let formData = new FormData();
      formData.append("_id", this.iD);
      formData.append("name", this.form.name);
      formData.append("cuisine", this.form.cuisine);
      formData.append("borough", this.form.borough);
      formData.append("building", this.form.building);
      formData.append("lat", this.form.lat);
      formData.append("lng", this.form.long);
      formData.append("zipcode", this.form.zip);
      formData.append("street", this.form.street);

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
    advancedEdit() {
      this.advanced = !this.advanced;
    },
  },
};
</script>