import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

// viewtify is the theme options
const opts = {
  theme: {
    themes: {
      light: {
        primary: "#263238",
        secondary: "#b0bec5",
        accent: "#ffee58",
        error: "#D32F2F"
      }
    }
  }
};

Vue.use(Vuetify);

export default new Vuetify(opts);
