<!-- the template to display when things are broken at bottom of screen-->
<template>
  <v-snackbar v-model="show" :color="color" :timeout="timeout">
    {{ message }}
    <v-btn text color="white" @click.native="show = false" icon>
      <v-icon>mdi-close</v-icon>
    </v-btn>
  </v-snackbar>
</template>

<script>
// send error messages when things are broken
export default {
  computed: {
    message() {
      return this.$store.state.snackbar.message;
    },
    color() {
      return this.$store.state.snackbar.type;
    },
    show: {
      get() {
        return this.$store.state.snackbar.show;
      },
      set() {
        this.$store.commit("snackbar/hide");
      }
    }
  },
  data: () => {
    return {
      timeout: 2500
    };
  }
};
</script>
