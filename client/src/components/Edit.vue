<template>
  <div>
    <md-field>
      <label>ID - Non Modifiable</label>
      <md-input :placeholder="iD" readonly></md-input>
    </md-field>
    <md-field>
      <label>Nom</label>
      <md-input :placeholder="nom"></md-input>
    </md-field>
    <md-field>
      <label>Cuisine</label>
      <md-input :placeholder="cui" ></md-input>
    </md-field>
  </div>
</template>

<script>
  export default {
    name: 'Edit',
    props: ["id", "name", "cuisine"],
    data: () => ({
        iD: '',
        nom: '',
        cui: ''
    }),
    mounted() {
        console.log("in edit")
        this.init()
    }, 
    methods:{
        init(){
            this.iD = this.id
            this.nom = this.name
            this.cui = this.cuisine
            console.log(this.id)
        }
    }
  }
</script>