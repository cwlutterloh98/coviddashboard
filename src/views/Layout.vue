<!-- content -->
<template>
  <v-app>
    <app-snack-bar />
    <the-app-bar />

    <v-content class="grey lighten-3">
          <v-container class="red  text-center">
          <h3>Note Covid is a quickly changing situation and the data is just a snapshot utilizing the currently available numbers</h3>
          </v-container>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
// import components for button alerts
import TheAppBar from "../components/TheAppBar.vue";
import AppSnackBar from "../components/AppSnackBar.vue";
export default {
  components: {
    TheAppBar,
    AppSnackBar
  }
};
</script>

<style></style>
