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
      <md-list-item v-if="borough !== 'null'">
        <md-icon>apartment</md-icon>
        <div class="md-list-item-text">
          <h3>Quartier</h3>
          <p>{{ borough }}</p>
        </div>
      </md-list-item>
      <md-list-item v-if="building !== '' || street !== '' || zipcode !== ''">
        <md-icon>place</md-icon>
        <div class="md-list-item-text">
          <h3>Addresse</h3>
          <p>{{ building }}</p>
          <p>{{ street }}</p>
          <p>{{ zipcode }}</p>
        </div>
      </md-list-item>
    </md-list>
  </div>
</template>

<script>
export default {
  name: "About",
  props: [
    "cuisine",
    "borough",
    "grades",
    "building",
    "street",
    "zipcode",
    "coordonnees",
  ],
  components: {},
  methods: {
  },
};
</script>

<style scoped>
</style>